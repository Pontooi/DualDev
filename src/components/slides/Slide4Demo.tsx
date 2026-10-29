import React, { useState } from 'react';
import { ProzLogo } from './ProzLogo';
import { useDualDev } from '../../context/DualDevContext';
import { 
  ExternalLink, 
  Github, 
  Play, 
  CheckCircle2, 
  Terminal, 
  Laptop, 
  Compass, 
  Maximize2,
  X
} from 'lucide-react';

export const Slide4Demo: React.FC = () => {
  const { setActiveTab } = useDualDev();
  const [showLiveEmbed, setShowLiveEmbed] = useState(false);

  const publishedUrl = 'https://pontooi.github.io/DualDev/';
  const repoUrl = 'https://github.com/Pontooi/DualDev';

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden select-none">
      {/* Topo Oficial Proz */}
      <header className="w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-[#EA580C] uppercase mb-1">
              DESAFIO DE DESENVOLVIMENTO WEB
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3B0764] tracking-tight">
              Demonstração Prática da Aplicação{' '}
              <span className="text-[#3B0764] tabular-nums font-bold">
                (4 min)
              </span>
            </h2>
          </div>

          <ProzLogo variant="dark" />
        </div>

        {/* Linha Divisória Laranja da Identidade Proz */}
        <div className="w-full h-1 bg-[#EA580C] rounded-full mt-4" />
      </header>

      {/* Banner Laranja Oficial: MOMENTO DA DEMONSTRAÇÃO AO VIVO */}
      <div className="my-3 w-full bg-[#EA580C] text-white rounded-2xl p-4 sm:p-5 shadow-md flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black tracking-wider uppercase block text-orange-100">
            MOMENTO DA DEMONSTRAÇÃO AO VIVO
          </span>
          <p className="text-xs sm:text-sm font-medium text-white mt-0.5">
            Mantenha este slide visível enquanto alterna para o navegador e executa o fluxo real da aplicação!
          </p>
        </div>

        <button
          onClick={() => setActiveTab('academia')}
          className="print:hidden shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#EA580C] font-bold text-xs shadow-md hover:bg-orange-50 transition-colors"
          title="Alternar imediatamente para a plataforma DualDev"
        >
          <Play className="w-3.5 h-3.5 fill-[#EA580C]" />
          <span>Iniciar Demo na Plataforma</span>
        </button>
      </div>

      {/* Grid de 2 Cards: Roteiro à Esquerda + Links à Direita */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch my-auto py-2">
        
        {/* Card 1: Roteiro sugerido para a demonstração (7 colunas) */}
        <div className="md:col-span-7 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#F8FAFC] border-2 border-slate-300 shadow-sm">
          <div>
            <h3 className="text-sm font-black text-[#3B0764] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#EA580C]" />
              ROTEIRO SUGERIDO PARA A DEMONSTRAÇÃO:
            </h3>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <span className="h-5 w-5 rounded-full bg-purple-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-slate-900">Tela Inicial:</strong> Abrir o projeto publicado e apresentar o layout visual inicial, a identidade visual e o seletor de trilhas.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="h-5 w-5 rounded-full bg-purple-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-slate-900">Execução das Funcionalidades:</strong> Escolher um exercício prático (ex: Python ou JavaScript), interagir com o editor e clicar no botão "Executar".
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="h-5 w-5 rounded-full bg-purple-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-slate-900">Fluxo Real do Usuário:</strong> Mostrar o teste sendo validado instantaneamente com mensagem verde de sucesso, ganho de XP e nível.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="h-5 w-5 rounded-full bg-purple-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-slate-900">Playground & Responsividade:</strong> Demonstrar o laboratório aberto para testes livres de código e a rápida adaptação de tela.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 text-purple-900 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Execução 100% no cliente sem depender de rede externa
            </span>
          </div>
        </div>

        {/* Card 2: Links do Projeto (5 colunas - Fundo Roxo) */}
        <div className="md:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#3B0764] text-white shadow-lg border border-purple-900">
          <div>
            <h3 className="text-xs font-black text-orange-400 uppercase tracking-widest mb-4">
              LINKS DO PROJETO
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-semibold text-purple-200 uppercase tracking-wider mb-1">
                  Aplicação Publicada:
                </p>
                <a 
                  href={publishedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl bg-purple-900/60 hover:bg-purple-900 border border-purple-400/30 text-white font-mono text-xs transition-colors"
                >
                  <span className="truncate">{publishedUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-orange-300 shrink-0 ml-2 group-hover:scale-110 transition-transform" />
                </a>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-purple-200 uppercase tracking-wider mb-1">
                  Repositório no GitHub:
                </p>
                <a 
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl bg-purple-900/60 hover:bg-purple-900 border border-purple-400/30 text-white font-mono text-xs transition-colors"
                >
                  <span className="truncate">{repoUrl}</span>
                  <Github className="w-3.5 h-3.5 text-orange-300 shrink-0 ml-2 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-purple-950/70 border border-purple-800/60 text-xs text-purple-200 space-y-1.5">
              <p className="font-semibold text-orange-300">
                💡 Dica para a Apresentação:
              </p>
              <p className="text-[11px] leading-relaxed">
                Deixe as abas já abertas antes do início da apresentação! Se não for possível executar ao vivo: utilize a demonstração embutida nesta mesma tela.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-800/80 flex items-center justify-between gap-2">
            <button
              onClick={() => setShowLiveEmbed(true)}
              className="print:hidden w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Demonstração Rápida em Janela</span>
            </button>
          </div>
        </div>

      </div>

      {/* Modal / Overlay de Demonstração Rápida caso o apresentador queira rodar sem sair do slide */}
      {showLiveEmbed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 sm:p-6">
          <div className="relative w-full max-w-5xl h-[85vh] bg-[#0b101b] rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0e1626] border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#ffbe82]" />
                <span className="font-bold text-xs text-white">Demonstração ao Vivo • DualDev Academy</span>
              </div>
              <button 
                onClick={() => setShowLiveEmbed(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 bg-slate-900 overflow-hidden relative">
              <iframe 
                src={publishedUrl}
                title="DualDev Live Demo"
                className="w-full h-full border-none"
              />
            </div>

            <div className="px-4 py-2.5 bg-[#0e1626] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Se preferir, alterne para a aba oficial: <a href={publishedUrl} target="_blank" rel="noreferrer" className="text-[#9FD6F2] underline">{publishedUrl}</a></span>
              <button
                onClick={() => {
                  setShowLiveEmbed(false);
                  setActiveTab('academia');
                }}
                className="text-[#ffbe82] hover:underline font-semibold"
              >
                Abrir na aba de Academia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rodapé com Dica de Fala */}
      <footer className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
        <span>DualDev • Desafio de Desenvolvimento Web Proz</span>
        <span className="text-[#3B0764] font-semibold">Fala sugerida: Pessoa 5 (Duração alvo: 4 minutos)</span>
      </footer>
    </div>
  );
};
