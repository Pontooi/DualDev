import React, { useState } from 'react';
import { TrackId } from '../types';
import { useDualDev } from '../context/DualDevContext';
import { useCodeRunner } from '../hooks/useCodeRunner';
import { CodeEditor } from '../components/CodeEditor';
import { ConsoleOutput } from '../components/ConsoleOutput';
import { LanguageIcon } from '../components/LanguageIcon';
import { Terminal } from 'lucide-react';

const ALL_LANGUAGES: TrackId[] = ['java', 'python', 'javascript', 'html', 'css'];

const PRESETS: Record<TrackId, { name: string; code: string }[]> = {
  java: [
    {
      name: 'Classe & Método main',
      code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Bem-vindo ao Playground Java no DualDev!");\n        int ano = 2026;\n        System.out.println("Executando em: " + ano);\n    }\n}`,
    },
    {
      name: 'Métodos com Parâmetros',
      code: `public class Matematica {\n    public static double calcularImc(double peso, double altura) {\n        return peso / (altura * altura);\n    }\n\n    public static void main(String[] args) {\n        double imc = calcularImc(75.0, 1.78);\n        System.out.printf("IMC Calculado: %.2f", imc);\n    }\n}`,
    },
    {
      name: 'Loops e Arrays',
      code: `public class Tabuada {\n    public static void main(String[] args) {\n        int numero = 7;\n        System.out.println("Tabuada do " + numero + ":");\n        for (int i = 1; i <= 10; i++) {\n            System.out.println(numero + " x " + i + " = " + (numero * i));\n        }\n    }\n}`,
    },
  ],
  python: [
    {
      name: 'Entrada, Saída e Condicionais',
      code: `nome = "Explorador"\npontos = 250\nprint(f"Olá, {nome}! Bem-vindo ao DualDev.")\nif pontos >= 200:\n    print("Classificação: Desenvolvedor Ouro!")\nelse:\n    print("Classificação: Iniciante.")\n`,
    },
    {
      name: 'Funções e Listas',
      code: `def analisar_notas(notas):\n    return sum(notas) / len(notas), max(notas), min(notas)\n\nmedia, maior, menor = analisar_notas([8.5, 9.0, 10.0])\nprint(f"Média: {media:.2f} | Maior: {maior} | Menor: {menor}")\n`,
    },
    {
      name: 'Módulos math e random',
      code: `import math\nimport random\n\nnumero = 16\nraiz = math.sqrt(numero)\nsorteado = random.randint(1, 100)\n\nprint(f"Raiz quadrada de {numero}: {raiz}")\nprint(f"Número aleatório sorteado: {sorteado}")\nprint(f"Valor de PI arredondado: {round(math.pi, 2)}")\n`,
    },
    {
      name: 'Manipulação de Listas e Strings',
      code: `linguagens = ["Python", "JavaScript", "Java"]\nlinguagens.append("TypeScript")\n\nprint(f"Total de linguagens: {len(linguagens)}")\nfor lang in linguagens:\n    print(f"• {lang.upper()}")\n`,
    },
  ],
  javascript: [
    {
      name: 'ES6 Moderno & Arrays',
      code: `const techs = [\n  { nome: 'Java', tipo: 'Backend' },\n  { nome: 'Python', tipo: 'IA & Scripts' },\n  { nome: 'JavaScript', tipo: 'Fullstack' },\n  { nome: 'HTML & CSS', tipo: 'Web Front-end' },\n];\n\ntechs.forEach(t => console.log(\`• \${t.nome} (\${t.tipo})\`));\n`,
    },
    {
      name: 'Cálculo com Reducer & Filtros',
      code: `const precos = [19.90, 49.90, 120.00, 15.00, 89.00];\nconst caros = precos.filter(p => p > 30);\nconst total = precos.reduce((acc, curr) => acc + curr, 0);\n\nconsole.log("Valores acima de R$30:", caros);\nconsole.log(\`Valor Total: R$ \${total.toFixed(2)}\`);\n`,
    },
  ],
  html: [
    {
      name: 'Landing Page com Cards & Botão',
      code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>DualDev Showcase</title>
</head>
<body>
  <div class="header">
    <h1 class="titulo">DualDev Academy</h1>
    <p>Plataforma prática e moderna para acelerar seu aprendizado em programação.</p>
  </div>

  <div class="container">
    <div class="card">
      <h2>🚀 Código em Tempo Real</h2>
      <p>Veja suas alterações de HTML e CSS aplicadas instantaneamente no navegador.</p>
      <button class="btn">Explorar Trilhas</button>
    </div>

    <div class="card">
      <h2>💡 Feedback Instantâneo</h2>
      <p>Execute scripts em Python, Java e JavaScript com console interativo integrado.</p>
      <button class="btn" style="background:#ffbe82;color:#0b101b;">Saiba Mais</button>
    </div>
  </div>
</body>
</html>`,
    },
    {
      name: 'Formulário Moderno de Cadastro',
      code: `<div class="container" style="max-width: 480px; margin: 2rem auto; font-family: sans-serif;">
  <div class="card" style="padding: 2rem; border-radius: 12px; background: #141f30; border: 1px solid #1e293b; color: #fff;">
    <h2 style="margin-top: 0; color: #6fb7db;">Criar Conta de Desenvolvedor</h2>
    <p style="color: #94a3b8; font-size: 0.9rem;">Junte-se à comunidade DualDev e suba de nível!</p>
    
    <form style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
      <div>
        <label style="display: block; font-size: 0.85rem; margin-bottom: 0.3rem; color: #cbd5e1;">Nome Completo</label>
        <input type="text" placeholder="Ex: Lucas Silva" style="width: 100%; padding: 0.6rem; border-radius: 6px; border: 1px solid #334155; background: #0b101b; color: #fff;" />
      </div>

      <div>
        <label style="display: block; font-size: 0.85rem; margin-bottom: 0.3rem; color: #cbd5e1;">Linguagem Favorita</label>
        <select style="width: 100%; padding: 0.6rem; border-radius: 6px; border: 1px solid #334155; background: #0b101b; color: #fff;">
          <option>Python</option>
          <option>Java</option>
          <option>JavaScript</option>
          <option>HTML & CSS</option>
        </select>
      </div>

      <button type="button" class="btn" style="background: #6fb7db; color: #0b101b; font-weight: bold; border: none; padding: 0.75rem; border-radius: 6px; cursor: pointer; margin-top: 0.5rem;">
        Cadastrar Grátis
      </button>
    </form>
  </div>
</div>`,
    },
    {
      name: 'Cartão de Perfil do Desenvolvedor',
      code: `<div style="display: flex; justify-content: center; align-items: center; min-height: 320px; font-family: sans-serif;">
  <div style="background: linear-gradient(145deg, #10192a, #152238); border: 1px solid #1e293b; border-radius: 16px; padding: 2rem; width: 340px; text-align: center; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);">
    <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #ffbe82, #6fb7db); margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
      👨‍💻
    </div>
    <h3 style="margin: 0; color: #ffffff; font-size: 1.25rem;">Dev DualDev</h3>
    <p style="margin: 0.25rem 0 1rem; color: #6fb7db; font-size: 0.85rem;">Full-Stack Engineer</p>
    <p style="color: #94a3b8; font-size: 0.85rem; line-height: 1.4;">Construindo soluções modernas, limpas e escaláveis com foco em experiência do usuário.</p>
    
    <div style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.25rem;">
      <span style="background: #1e293b; color: #ffbe82; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 9999px;">Python</span>
      <span style="background: #1e293b; color: #6fb7db; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 9999px;">JavaScript</span>
      <span style="background: #1e293b; color: #86efac; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 9999px;">CSS3</span>
    </div>
  </div>
</div>`,
    },
  ],
  css: [
    {
      name: 'Dark Card & Gradiente Suave',
      code: `/* Estilização aplicada ao container de demonstração */
.card {
  background: linear-gradient(145deg, #111a28, #18263a);
  border: 1px solid #1e293b;
  border-radius: 14px;
  padding: 1.75rem;
  box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 32px -4px rgba(111, 183, 219, 0.2);
}

.titulo {
  color: #ffbe82;
  font-size: 1.75rem;
  letter-spacing: -0.5px;
}

.btn {
  background: linear-gradient(135deg, #6fb7db, #ffbe82);
  color: #0b101b;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.9;
}`,
    },
    {
      name: 'Grid Flexbox Responsivo & Sombras',
      code: `.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: stretch;
  padding: 1rem;
}

.box {
  flex: 1 1 240px;
  background: #0e1726;
  border: 1px solid #1e293b;
  border-left: 4px solid #6fb7db;
  border-radius: 8px;
  padding: 1.25rem;
  color: #e2e8f0;
}

.box:hover {
  border-left-color: #ffbe82;
}`,
    },
    {
      name: 'Botões Interativos com Efeito Pulse',
      code: `.btn {
  background: #6fb7db;
  color: #0b101b;
  font-weight: bold;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
}

.btn:hover {
  background: #ffbe82;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 190, 130, 0.4);
}

.card {
  border: 2px dashed #334155;
  border-radius: 12px;
  padding: 1.5rem;
  background: #0b121e;
}`,
    },
  ],
};

export const PlaygroundPage: React.FC = () => {
  const { currentTrackId, recordCodeExecution } = useDualDev();
  const initialLanguage: TrackId = ALL_LANGUAGES.includes(currentTrackId)
    ? currentTrackId
    : 'python';

  const [selectedLanguage, setSelectedLanguage] = useState<TrackId>(initialLanguage);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [code, setCode] = useState<string>(PRESETS[initialLanguage][0].code);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'output' | 'tests' | 'preview'>(
    initialLanguage === 'html' || initialLanguage === 'css' ? 'preview' : 'output'
  );

  const {
    executionResult,
    isRunning,
    runCode,
    clearOutput,
  } = useCodeRunner(recordCodeExecution);

  const handleLanguageChange = (lang: TrackId) => {
    setSelectedLanguage(lang);
    setSelectedPresetIndex(0);
    setCode(PRESETS[lang][0].code);
    clearOutput();
    if (lang === 'html' || lang === 'css') {
      setActiveConsoleTab('preview');
    } else {
      setActiveConsoleTab('output');
    }
  };

  const handleRun = () => {
    if (selectedLanguage === 'html' || selectedLanguage === 'css') {
      setActiveConsoleTab('preview');
    }
    runCode(selectedLanguage, code);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4 bg-[#0b101b]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ffbe82] to-[#6fb7db] text-slate-950 shadow-xs">
              <Terminal className="h-4 w-4" />
            </div>
            <span>Playground Livre</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Escreva e execute códigos livremente em 5 tecnologias com visualização e console ao vivo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {ALL_LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                selectedLanguage === lang
                  ? 'bg-[#6fb7db] text-slate-950 font-bold shadow-xs'
                  : 'bg-[#141f30] text-slate-300 hover:text-white border border-slate-700/80'
              }`}
            >
              <LanguageIcon trackId={lang} className="w-3.5 h-3.5" />
              <span>{lang.toUpperCase()}</span>
            </button>
          ))}

          <select
            value={selectedPresetIndex}
            onChange={(e) => {
              const idx = parseInt(e.target.value, 10);
              setSelectedPresetIndex(idx);
              setCode(PRESETS[selectedLanguage][idx].code);
              clearOutput();
            }}
            className="bg-[#141f30] border border-slate-700 text-slate-200 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#ffbe82]/40 font-medium"
          >
            {PRESETS[selectedLanguage].map((preset, idx) => (
              <option key={idx} value={idx} className="bg-[#0e1626]">
                Modelo: {preset.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[580px]">
        <div className="h-[580px]">
          <CodeEditor
            code={code}
            onChange={setCode}
            onRun={handleRun}
            onReset={() => setCode(PRESETS[selectedLanguage][selectedPresetIndex]?.code || PRESETS[selectedLanguage][0].code)}
            trackId={selectedLanguage}
            isRunning={isRunning}
          />
        </div>

        <div className="h-[580px]">
          <ConsoleOutput
            result={executionResult}
            testResults={[]}
            onClear={clearOutput}
            activeSubTab={activeConsoleTab}
            setActiveSubTab={setActiveConsoleTab}
            trackId={selectedLanguage}
            code={code}
          />
        </div>
      </div>
    </div>
  );
};
