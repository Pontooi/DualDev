import { ExecutionResult } from '../../types';

/**
 * Format any value according to Python standard console output representation.
 */
function formatPyValue(val: any): string {
  if (val === null || val === undefined) return 'None';
  if (typeof val === 'boolean') return val ? 'True' : 'False';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) {
    return '[' + val.map(formatPyValue).join(', ') + ']';
  }
  if (typeof val === 'object') {
    const pairs = Object.entries(val).map(([k, v]) => {
      const formattedV = typeof v === 'string' ? `'${v}'` : formatPyValue(v);
      return `'${k}': ${formattedV}`;
    });
    return '{' + pairs.join(', ') + '}';
  }
  return String(val);
}

/**
 * Safely strips inline comments starting with '#' that are outside quoted strings.
 */
function stripInlineComment(line: string): string {
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inBacktick = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const prev = i > 0 ? line[i - 1] : '';

    if (ch === "'" && !inDoubleQuote && !inBacktick && prev !== '\\') {
      inSingleQuote = !inSingleQuote;
    } else if (ch === '"' && !inSingleQuote && !inBacktick && prev !== '\\') {
      inDoubleQuote = !inDoubleQuote;
    } else if (ch === '`' && !inSingleQuote && !inDoubleQuote && prev !== '\\') {
      inBacktick = !inBacktick;
    } else if (ch === '#' && !inSingleQuote && !inDoubleQuote && !inBacktick) {
      return line.substring(0, i);
    }
  }
  return line;
}

/**
 * Converts Python f-strings f"..." or f'...' into JavaScript template literals `...`.
 * Handles formatting specifications such as {media_final:.1f} and {media:.2f}.
 */
function transpileFStrings(text: string): string {
  return text.replace(/\bf(["'])((?:(?!\1)[^\\]|\\.)*)\1/g, (_match, _quote, content) => {
    // Single pass replacement of expressions inside f-strings
    let converted = content.replace(/\{([^}]+)\}/g, (_m: string, expr: string) => {
      const formatMatch = expr.match(/^(.+?):\.(\d+)f$/);
      if (formatMatch) {
        return '${Number(' + formatMatch[1].trim() + ').toFixed(' + formatMatch[2] + ')}';
      }
      return '${_pyFmt(' + expr + ')}';
    });
    converted = converted.replace(/`/g, '\\`');
    return '`' + converted + '`';
  });
}

/**
 * Transpiles Python source code into executable JavaScript statements.
 */
function transpilePythonToJs(rawCode: string): string {
  const lines = rawCode.split('\n');
  let jsBody = '';
  const indentStack: number[] = [0];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const cleanLine = stripInlineComment(rawLine);
    const trimmed = cleanLine.trim();

    if (!trimmed) {
      continue;
    }

    // Indentation tracking
    const indent = rawLine.search(/\S/);
    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      jsBody += '}\n';
    }

    // 1. Pass statement: pass -> /* pass */;
    if (trimmed === 'pass') {
      jsBody += '/* pass */;\n';
      continue;
    }

    // 2. Python imports: import math, import random, from math import sqrt
    if (trimmed.startsWith('import ') || trimmed.startsWith('from ')) {
      const fromMatch = trimmed.match(/^from\s+([a-zA-Z0-9_]+)\s+import\s+(.+)$/);
      if (fromMatch) {
        const mod = fromMatch[1];
        const items = fromMatch[2].split(',').map((s) => s.trim()).join(', ');
        jsBody += `var { ${items} } = ${mod};\n`;
      } else {
        jsBody += `/* ${trimmed} */;\n`;
      }
      continue;
    }

    // 3. Process f-strings in the line
    let processedLine = transpileFStrings(trimmed);

    // 4. Python list slicing: numeros[0:3] -> numeros.slice(0, 3)
    processedLine = processedLine.replace(
      /\b([a-zA-Z0-9_]+)\[\s*(\d+|\w+)?\s*:\s*(\d+|\w+)?\s*\]/g,
      (_match, obj, start, end) => {
        const s = start !== undefined && start !== '' ? start : '0';
        const e = end !== undefined && end !== '' ? `, ${end}` : '';
        return `${obj}.slice(${s}${e})`;
      }
    );

    // 5. Python lambda expressions: lambda x: x * 2 -> ((x) => x * 2)
    processedLine = processedLine.replace(
      /\blambda\s+([a-zA-Z0-9_,\s]+):\s*(.+)$/,
      '(( $1 ) => $2)'
    );

    // 6. Python list comprehension: [x * x for x in valores] -> (valores).map(x => x * x)
    processedLine = processedLine.replace(
      /\[\s*(.+?)\s+for\s+([a-zA-Z0-9_]+)\s+in\s+([a-zA-Z0-9_().]+?)\s*\]/g,
      '($3).map(($2) => $1)'
    );

    // 7. Python print with custom 'end=' or 'sep='
    const printCustomMatch = processedLine.match(/\bprint\s*\((.*)\)/);
    if (printCustomMatch && (processedLine.includes('end=') || processedLine.includes('sep='))) {
      let inside = printCustomMatch[1];
      let endVal = "'\\n'";
      let sepVal = "' '";

      const endMatch = inside.match(/,\s*end\s*=\s*(['"][^'"]*['"]|[^,)]+)/);
      if (endMatch) {
        endVal = endMatch[1].trim();
        inside = inside.replace(endMatch[0], '');
      }

      const sepMatch = inside.match(/,\s*sep\s*=\s*(['"][^'"]*['"]|[^,)]+)/);
      if (sepMatch) {
        sepVal = sepMatch[1].trim();
        inside = inside.replace(sepMatch[0], '');
      }

      processedLine = processedLine.replace(
        printCustomMatch[0],
        `_pyPrintCustom([${inside}], ${sepVal}, ${endVal})`
      );
    }

    // 8. Python string & list & dict methods transpilation
    processedLine = processedLine.replace(/\.upper\(\)/g, '.toUpperCase()');
    processedLine = processedLine.replace(/\.lower\(\)/g, '.toLowerCase()');
    processedLine = processedLine.replace(/\.strip\(\)/g, '.trim()');
    processedLine = processedLine.replace(/\.lstrip\(\)/g, '.trimStart()');
    processedLine = processedLine.replace(/\.rstrip\(\)/g, '.trimEnd()');
    processedLine = processedLine.replace(/\.startswith\(/g, '.startsWith(');
    processedLine = processedLine.replace(/\.endswith\(/g, '.endsWith(');
    processedLine = processedLine.replace(/\.append\(/g, '.push(');
    processedLine = processedLine.replace(/\b([a-zA-Z0-9_]+)\.get\(([^)]+)\)/g, '_pyGet($1, $2)');

    // 9. def func(args):
    const defMatch = processedLine.match(/^def\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*:/);
    if (defMatch) {
      jsBody += `function ${defMatch[1]}(${defMatch[2]}) {\n`;
      indentStack.push(indent + 4);
      continue;
    }

    // 10. for x in range(...):
    const forRangeMatch = processedLine.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\(([^)]+)\)\s*:/);
    if (forRangeMatch) {
      const varName = forRangeMatch[1];
      const args = forRangeMatch[2].split(',').map((s) => s.trim());
      if (args.length === 1) {
        jsBody += `for (let ${varName} = 0; ${varName} < ${args[0]}; ${varName}++) {\n`;
      } else if (args.length === 2) {
        jsBody += `for (let ${varName} = ${args[0]}; ${varName} < ${args[1]}; ${varName}++) {\n`;
      } else {
        jsBody += `for (let ${varName} of pyRange(${args.join(', ')})) {\n`;
      }
      indentStack.push(indent + 4);
      continue;
    }

    // 11. for item in list:
    const forInMatch = processedLine.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+(.+)\s*:/);
    if (forInMatch) {
      jsBody += `for (let ${forInMatch[1]} of ${forInMatch[2]}) {\n`;
      indentStack.push(indent + 4);
      continue;
    }

    // 12. if condition:
    const ifMatch = processedLine.match(/^if\s+(.+)\s*:/);
    if (ifMatch) {
      let cond = ifMatch[1]
        .replace(/==/g, '===')
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')
        .replace(/\bis\s+None\b/g, '=== null')
        .replace(/\bis\s+not\s+None\b/g, '!== null');

      // Handle 'not in' and 'in' BEFORE replacing 'not'
      cond = cond.replace(/([a-zA-Z0-9_]+|"[^"]*"|'[^']*')\s+not\s+in\s+([a-zA-Z0-9_().]+)/g, '!_pyIn($1, $2)');
      cond = cond.replace(/([a-zA-Z0-9_]+|"[^"]*"|'[^']*')\s+in\s+([a-zA-Z0-9_().]+)/g, '_pyIn($1, $2)');
      cond = cond.replace(/\bnot\s+/g, '!');

      jsBody += `if (${cond}) {\n`;
      indentStack.push(indent + 4);
      continue;
    }

    // 13. elif condition:
    const elifMatch = processedLine.match(/^elif\s+(.+)\s*:/);
    if (elifMatch) {
      let cond = elifMatch[1]
        .replace(/==/g, '===')
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')
        .replace(/\bis\s+None\b/g, '=== null')
        .replace(/\bis\s+not\s+None\b/g, '!== null');

      cond = cond.replace(/([a-zA-Z0-9_]+|"[^"]*"|'[^']*')\s+not\s+in\s+([a-zA-Z0-9_().]+)/g, '!_pyIn($1, $2)');
      cond = cond.replace(/([a-zA-Z0-9_]+|"[^"]*"|'[^']*')\s+in\s+([a-zA-Z0-9_().]+)/g, '_pyIn($1, $2)');
      cond = cond.replace(/\bnot\s+/g, '!');

      jsBody += `else if (${cond}) {\n`;
      indentStack.push(indent + 4);
      continue;
    }

    // 14. else:
    if (processedLine === 'else:') {
      jsBody += `else {\n`;
      indentStack.push(indent + 4);
      continue;
    }

    // 15. while condition:
    const whileMatch = processedLine.match(/^while\s+(.+)\s*:/);
    if (whileMatch) {
      let cond = whileMatch[1]
        .replace(/==/g, '===')
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')
        .replace(/\bnot\s+/g, '!');
      jsBody += `while (${cond}) {\n`;
      indentStack.push(indent + 4);
      continue;
    }

    // 16. try: and except:
    if (processedLine === 'try:') {
      jsBody += `try {\n`;
      indentStack.push(indent + 4);
      continue;
    }

    if (processedLine.startsWith('except') && processedLine.endsWith(':')) {
      jsBody += `} catch (_pyErr) {\n`;
      indentStack.push(indent + 4);
      continue;
    }

    // 17. return statement (supports single or multiple return values: return a, b -> return [a, b];)
    if (processedLine.startsWith('return ') || processedLine === 'return') {
      const expr = processedLine.replace(/^return\s*/, '').trim();
      if (!expr) {
        jsBody += `return;\n`;
      } else if (expr.includes(',') && !expr.startsWith('[') && !expr.startsWith('{') && !expr.startsWith('(')) {
        jsBody += `return [${expr}];\n`;
      } else {
        jsBody += `return ${expr};\n`;
      }
      continue;
    }

    // 18. Assignment destructuring: a, b = func() -> var [a, b] = func();
    const destructureMatch = processedLine.match(/^([a-zA-Z0-9_]+(?:\s*,\s*[a-zA-Z0-9_]+)+)\s*=\s*(.+)$/);
    if (destructureMatch) {
      const vars = destructureMatch[1];
      const val = destructureMatch[2];
      jsBody += `var [${vars}] = ${val};\n`;
      continue;
    }

    // 19. Normal variable assignment: x = value
    // Handle tuples: posicao = (100, 200) -> var posicao = [100, 200];
    if (
      processedLine.includes('=') &&
      !processedLine.includes('==') &&
      !processedLine.includes('!=') &&
      !processedLine.includes('<=') &&
      !processedLine.includes('>=')
    ) {
      const eqIdx = processedLine.indexOf('=');
      const varPart = processedLine.substring(0, eqIdx).trim();
      let valPart = processedLine.substring(eqIdx + 1).trim();

      // Convert tuple literal: (a, b) -> [a, b]
      if (valPart.startsWith('(') && valPart.endsWith(')') && valPart.includes(',')) {
        valPart = '[' + valPart.slice(1, -1) + ']';
      }

      valPart = valPart
        .replace(/\bTrue\b/g, 'true')
        .replace(/\bFalse\b/g, 'false')
        .replace(/\bNone\b/g, 'null');

      // Check if assignment operator is +=, -=, *=, /=
      if (varPart.endsWith('+') || varPart.endsWith('-') || varPart.endsWith('*') || varPart.endsWith('/')) {
        jsBody += `${processedLine};\n`;
      } else {
        jsBody += `var ${varPart} = ${valPart};\n`;
      }
      continue;
    }

    // 20. General statements (function calls, print, increments, etc.)
    let gen = processedLine
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null');

    jsBody += `${gen};\n`;
  }

  while (indentStack.length > 1) {
    indentStack.pop();
    jsBody += '}\n';
  }

  return jsBody;
}

/**
 * In-browser sandbox executor for Python.
 */
export async function runPythonCode(rawCode: string): Promise<ExecutionResult> {
  const startTime = performance.now();
  const output: string[] = [];

  if (!rawCode || rawCode.trim().length === 0) {
    return {
      stdout: '',
      stderr: 'Aviso: Nenhum código Python fornecido.',
      executionTimeMs: 0,
    };
  }

  try {
    const jsBody = transpilePythonToJs(rawCode);

    const _pyFmt = (val: any): string => {
      if (Array.isArray(val)) return '[' + val.map(_pyFmt).join(', ') + ']';
      if (typeof val === 'boolean') return val ? 'True' : 'False';
      if (val === null || val === undefined) return 'None';
      return String(val);
    };

    const _pyIn = (item: any, container: any): boolean => {
      if (container === null || container === undefined) return false;
      if (typeof container === 'string') return container.includes(String(item));
      if (Array.isArray(container)) return container.includes(item);
      if (typeof container === 'object') return item in container;
      return false;
    };

    const pyPrint = (...args: any[]) => {
      if (args.length === 0) {
        output.push('\n');
        return;
      }
      const formatted = args.map(formatPyValue).join(' ') + '\n';
      output.push(formatted);
    };

    const _pyPrintCustom = (args: any[], sep = ' ', end = '\n') => {
      const text = args.map(formatPyValue).join(sep) + end;
      output.push(text);
    };

    const pyLen = (val: any) => {
      if (val === null || val === undefined) return 0;
      if (typeof val.length === 'number') return val.length;
      if (typeof val === 'object') return Object.keys(val).length;
      return 0;
    };

    const pyRange = (stopOrStart: number, maybeStop?: number, step = 1) => {
      const start = maybeStop !== undefined ? stopOrStart : 0;
      const end = maybeStop !== undefined ? maybeStop : stopOrStart;
      const result: number[] = [];
      if (step > 0) {
        for (let i = start; i < end; i += step) result.push(i);
      } else if (step < 0) {
        for (let i = start; i > end; i += step) result.push(i);
      }
      return result;
    };

    const pySum = (arr: any) => {
      if (!Array.isArray(arr)) return 0;
      return arr.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0);
    };

    const pyMax = (...args: any[]) => {
      const list = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
      return Math.max(...list);
    };

    const pyMin = (...args: any[]) => {
      const list = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
      return Math.min(...list);
    };

    const pyType = (val: any) => {
      if (val === null) return "<class 'NoneType'>";
      if (Array.isArray(val)) return "<class 'list'>";
      const t = typeof val;
      if (t === 'string') return "<class 'str'>";
      if (t === 'number') return Number.isInteger(val) ? "<class 'int'>" : "<class 'float'>";
      if (t === 'boolean') return "<class 'bool'>";
      if (t === 'object') return "<class 'dict'>";
      return `<class '${t}'>`;
    };

    const _pyGet = (obj: any, key: any, defaultVal: any = null) => {
      if (obj && typeof obj === 'object') {
        return obj[key] !== undefined ? obj[key] : defaultVal;
      }
      return defaultVal;
    };

    // Standard simulated modules for Python
    const math = {
      pi: Math.PI,
      e: Math.E,
      sqrt: Math.sqrt,
      pow: Math.pow,
      floor: Math.floor,
      ceil: Math.ceil,
      trunc: Math.trunc,
      abs: Math.abs,
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      asin: Math.asin,
      acos: Math.acos,
      atan: Math.atan,
      atan2: Math.atan2,
      log: Math.log,
      log10: Math.log10,
      log2: Math.log2,
      exp: Math.exp,
      radians: (deg: number) => (deg * Math.PI) / 180,
      degrees: (rad: number) => (rad * 180) / Math.PI,
      factorial: (n: number) => {
        let r = 1;
        for (let i = 2; i <= n; i++) r *= i;
        return r;
      },
    };

    const random = {
      random: Math.random,
      randint: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min,
      randrange: (start: number, stop?: number, step = 1) => {
        const s = stop !== undefined ? start : 0;
        const e = stop !== undefined ? stop : start;
        const range: number[] = [];
        for (let i = s; i < e; i += step) range.push(i);
        return range[Math.floor(Math.random() * range.length)];
      },
      choice: (arr: any[]) => arr[Math.floor(Math.random() * arr.length)],
      shuffle: (arr: any[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      },
      sample: (arr: any[], k: number) => {
        const copy = [...arr];
        const res: any[] = [];
        for (let i = 0; i < k && copy.length > 0; i++) {
          const idx = Math.floor(Math.random() * copy.length);
          res.push(copy.splice(idx, 1)[0]);
        }
        return res;
      },
    };

    const time = {
      time: () => Date.now() / 1000,
      sleep: (_sec: number) => {},
    };

    const json = {
      dumps: (obj: any) => JSON.stringify(obj),
      loads: (str: string) => JSON.parse(str),
    };

    const pyInput = (promptText = '') => {
      if (promptText) {
        output.push(String(promptText) + '\n');
      }
      return 'DualDev';
    };

    const pyRound = (val: any, dec = 0) => {
      const num = Number(val);
      if (isNaN(num)) return 0;
      return Number(Math.round(Number(num + 'e' + dec)) + 'e-' + dec);
    };

    const pySorted = (arr: any[]) => {
      if (!Array.isArray(arr)) return arr;
      return [...arr].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    };

    const pyReversed = (arr: any[]) => {
      if (!Array.isArray(arr)) return arr;
      return [...arr].reverse();
    };

    const pyEnumerate = (arr: any[]) => {
      if (!Array.isArray(arr)) return [];
      return arr.map((item, idx) => [idx, item]);
    };

    const pyZip = (a: any[], b: any[]) => {
      if (!Array.isArray(a) || !Array.isArray(b)) return [];
      const len = Math.min(a.length, b.length);
      const res: any[] = [];
      for (let i = 0; i < len; i++) res.push([a[i], b[i]]);
      return res;
    };

    // Instantiate sandboxed function
    const runner = new Function(
      'print',
      '_pyPrint',
      '_pyPrintCustom',
      'len',
      'range',
      'pyRange',
      'str',
      'int',
      'float',
      'bool',
      'sum',
      'max',
      'min',
      'type',
      'round',
      'abs',
      'sorted',
      'reversed',
      'enumerate',
      'zip',
      'any',
      'all',
      'input',
      'math',
      'random',
      'time',
      'json',
      '_pyGet',
      '_pyFmt',
      '_pyIn',
      `
      "use strict";
      ${jsBody}
      `
    );

    runner(
      pyPrint,
      pyPrint,
      _pyPrintCustom,
      pyLen,
      pyRange,
      pyRange,
      String,
      (v: any) => parseInt(v, 10),
      (v: any) => parseFloat(v),
      (v: any) => Boolean(v),
      pySum,
      pyMax,
      pyMin,
      pyType,
      pyRound,
      Math.abs,
      pySorted,
      pyReversed,
      pyEnumerate,
      pyZip,
      (arr: any[]) => (Array.isArray(arr) ? arr.some(Boolean) : false),
      (arr: any[]) => (Array.isArray(arr) ? arr.every(Boolean) : false),
      pyInput,
      math,
      random,
      time,
      json,
      _pyGet,
      _pyFmt,
      _pyIn
    );

    return {
      stdout: output.join(''),
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  } catch (err: any) {
    return {
      stdout: output.join(''),
      stderr: `Erro de Execução Python: ${err.message || String(err)}`,
      executionTimeMs: Math.round(performance.now() - startTime),
    };
  }
}
