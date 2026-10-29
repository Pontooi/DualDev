import React, { useMemo, useState } from 'react';
import { TrackId } from '../types';
import { RefreshCw, Smartphone, Monitor, Globe, ExternalLink } from 'lucide-react';

interface WebPreviewProps {
  code: string;
  trackId: TrackId;
  className?: string;
}

export const WebPreview: React.FC<WebPreviewProps> = ({ code, trackId, className = '' }) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [refreshKey, setRefreshKey] = useState(0);

  const srcDoc = useMemo(() => {
    if (trackId === 'html') {
      const trimmed = code.trim();
      // If code already has a full HTML structure, use it directly
      if (trimmed.toLowerCase().includes('<html') || trimmed.toLowerCase().includes('<!doctype')) {
        return code;
      }
      // Otherwise, wrap snippets in a clean, modern HTML5 document
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 1.5rem;
      background-color: #ffffff;
      color: #1e293b;
      line-height: 1.6;
    }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  ${code}
</body>
</html>`;
    }

    if (trackId === 'css') {
      // For CSS, apply user styles to an interactive showcase of HTML elements
      return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset base */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 1.5rem;
      background: #f8fafc;
      color: #0f172a;
      line-height: 1.5;
    }
    /* Estilos do Aluno */
    ${code}
  </style>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1 class="titulo">DualDev Web Design</h1>
      <p class="subtitulo">Visualização em tempo real dos seus estilos CSS.</p>
    </header>

    <main class="conteudo">
      <div class="card card-principal">
        <h2>Card de Exemplo</h2>
        <p>Este elemento herda suas classes como <code>.card</code>, <code>.container</code>, <code>h1</code>, <code>h2</code> e <code>p</code>.</p>
        <div class="botoes" style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn btn-primary botao">Botão Principal</button>
          <button class="btn btn-secondary">Secundário</button>
        </div>
      </div>

      <div class="grid-cards" style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
        <div class="card box item" style="flex: 1; min-width: 140px; padding: 1rem; border: 1px solid #cbd5e1; border-radius: 8px;">
          <h3>Item 1</h3>
          <p>Exemplo de layout flex / grid.</p>
        </div>
        <div class="card box item" style="flex: 1; min-width: 140px; padding: 1rem; border: 1px solid #cbd5e1; border-radius: 8px;">
          <h3>Item 2</h3>
          <p>Cores, sombras e bordas.</p>
        </div>
      </div>
    </main>
  </div>
</body>
</html>`;
    }

    // Default generic preview
    return `<!DOCTYPE html><html><body><pre>${code}</pre></body></html>`;
  }, [code, trackId]);

  return (
    <div className={`flex flex-col h-full bg-[#070d16] border border-slate-800 rounded-lg overflow-hidden ${className}`}>
      {/* Barra do Navegador Simulado */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0e1626] border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          {/* Bolinhas decorativas de janela */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* Barra de endereço URL */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#141f30] border border-slate-700/80 text-slate-300 font-mono text-[11px] truncate max-w-[200px] sm:max-w-[320px]">
            <Globe className="w-3 h-3 text-[#6fb7db] shrink-0" />
            <span className="truncate">
              {trackId === 'html' ? 'localhost:3000/index.html' : 'localhost:3000/styles.css'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Alternador Desktop / Mobile */}
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-1 rounded transition-colors ${
              deviceMode === 'desktop' ? 'bg-[#1a2638] text-[#9FD6F2]' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Desktop"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1 rounded transition-colors ${
              deviceMode === 'mobile' ? 'bg-[#1a2638] text-[#9FD6F2]' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Mobile (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            title="Recarregar página"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Área de Visualização do iframe */}
      <div className="flex-1 bg-[#1e293b]/50 overflow-auto flex items-center justify-center p-2 relative">
        <div
          className={`h-full bg-white transition-all duration-200 shadow-lg rounded overflow-hidden ${
            deviceMode === 'mobile' ? 'w-[375px] max-w-full border-2 border-slate-700' : 'w-full'
          }`}
        >
          <iframe
            key={refreshKey}
            srcDoc={srcDoc}
            title="Preview Web"
            sandbox="allow-scripts"
            className="w-full h-full border-none bg-white"
          />
        </div>
      </div>
    </div>
  );
};
