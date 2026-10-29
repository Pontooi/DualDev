import React from 'react';
import { ProzLogo } from './ProzLogo';
import { Check, Layers, Layout, Award } from 'lucide-react';

export const Slide3Solution: React.FC = () => {
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
              A Solução — Funcionalidades, Telas e Diferencial{' '}
              <span className="text-[#3B0764] tabular-nums font-bold">
                (2 min 30 seg)
              </span>
            </h2>
          </div>

          <ProzLogo variant="dark" />
        </div>

        {/* Linha Divisória Laranja da Identidade Proz */}
        <div className="w-full h-1 bg-[#EA580C] rounded-full mt-4" />
      </header>

      {/* Grid de 3 Cards Arredondados */}
      <div className="my-auto py-4 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        
        {/* Card 1: RECURSOS PRINCIPAIS */}
        <div className="flex flex-col justify-between p-6 rounded-3xl bg-[#FAF5FF]/70 border-2 border-purple-900/20 shadow-sm hover:border-purple-900/40 transition-colors">
          <div>
            <div className="mb-3">
              <span className="text-[10px] font-extrabold tracking-wider text-purple-700 uppercase">
                RECURSOS PRINCIPAIS
              </span>
              <h3 className="text-lg font-black text-[#3B0764] tracking-tight flex items-center gap-2 mt-0.5">
                <Layers className="w-4 h-4 text-[#EA580C]" />
                Principais Funcionalidades
              </h3>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed mt-4">
              <div className="flex items-start gap-2">
                <div className="h-4 w-4 rounded-full bg-purple-900/10 text-purple-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <strong className="text-slate-900">5 Trilhas & 100 Lições:</strong> Java, Python, JavaScript, HTML e CSS com exatamente 20 desafios práticos progressivos cada.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-4 w-4 rounded-full bg-purple-900/10 text-purple-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <strong className="text-slate-900">Execução no Navegador:</strong> O código é interpretado localmente com retorno em milissegundos e sem filas de servidor.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-4 w-4 rounded-full bg-purple-900/10 text-purple-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <strong className="text-slate-900">Gamificação & Playground:</strong> Pontos de XP, níveis, conquistas desbloqueáveis e laboratório livre para testes.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-100 text-[11px] text-purple-900 font-semibold">
            100% interativo e prático
          </div>
        </div>

        {/* Card 2: INTERFACE & UX */}
        <div className="flex flex-col justify-between p-6 rounded-3xl bg-[#F8FAFC] border-2 border-slate-300 shadow-sm hover:border-slate-400 transition-colors">
          <div>
            <div className="mb-3">
              <span className="text-[10px] font-extrabold tracking-wider text-slate-600 uppercase">
                INTERFACE & UX
              </span>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2 mt-0.5">
                <Layout className="w-4 h-4 text-purple-700" />
                Telas & Recursos-Chave
              </h3>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed mt-4">
              <div className="flex items-start gap-2">
                <div className="h-4 w-4 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <strong className="text-slate-900">Layout Ergonômico em 3 Blocos:</strong> Teoria didática à esquerda, Editor com numeração de linhas à direita e Terminal logo abaixo.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-4 w-4 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <strong className="text-slate-900">Experiência Ágil & Fluida:</strong> Atalhos de teclado (Ctrl+Enter para rodar), dicas contextuais e solução para consulta.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-4 w-4 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <strong className="text-slate-900">Feedback Visual Imediato:</strong> Selos comemorativos verdes em casos aprovados e diagnósticos claros em caso de erro.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-700 font-semibold">
            Navegação limpa e intuitiva
          </div>
        </div>

        {/* Card 3: DIFERENCIAL */}
        <div className="flex flex-col justify-between p-6 rounded-3xl bg-[#FFF7ED]/70 border-2 border-orange-500/25 shadow-sm hover:border-orange-500/40 transition-colors">
          <div>
            <div className="mb-3">
              <span className="text-[10px] font-extrabold tracking-wider text-[#EA580C] uppercase">
                DIFERENCIAL
              </span>
              <h3 className="text-lg font-black text-[#EA580C] tracking-tight flex items-center gap-2 mt-0.5">
                <Award className="w-4 h-4 text-purple-900" />
                Diferencial da Proposta
              </h3>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed mt-4">
              <div className="flex items-start gap-2">
                <div className="h-4 w-4 rounded-full bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <strong className="text-slate-900">Zero Instalação:</strong> O aluno não precisa baixar gigabytes de programas ou ter privilégios de administrador.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-4 w-4 rounded-full bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <strong className="text-slate-900">Engenharia Client-Side:</strong> Simulador e analisador de sintaxe para Java e Python desenvolvidos em TypeScript puro.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-4 w-4 rounded-full bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <strong className="text-slate-900">Acessibilidade Total:</strong> Funciona até em computadores antigos ou conexões fracas de internet.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-orange-100 text-[11px] text-[#C2410C] font-semibold">
            Inclusão digital e performance
          </div>
        </div>

      </div>

      {/* Rodapé com Dica de Fala */}
      <footer className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
        <span>DualDev • Desafio de Desenvolvimento Web Proz</span>
        <span className="text-[#3B0764] font-semibold">Falas sugeridas: Pessoas 3 e 4 (Duração alvo: 2 min 30 seg)</span>
      </footer>
    </div>
  );
};
