import React from 'react';
import { ProzLogo } from './ProzLogo';
import { Code, Cpu, Rocket, ShieldCheck, GitBranch } from 'lucide-react';

export const Slide5TechFuture: React.FC = () => {
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
              Tecnologias, Aprendizados & Próximos Passos{' '}
              <span className="text-[#3B0764] tabular-nums font-bold">
                (1 min)
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
        
        {/* Card 1: STACK TÉCNICA */}
        <div className="flex flex-col justify-between p-6 rounded-3xl bg-[#FAF5FF]/70 border-2 border-purple-900/20 shadow-sm hover:border-purple-900/40 transition-colors">
          <div>
            <div className="mb-3">
              <span className="text-[10px] font-extrabold tracking-wider text-purple-700 uppercase">
                STACK TÉCNICA
              </span>
              <h3 className="text-lg font-black text-[#3B0764] tracking-tight flex items-center gap-2 mt-0.5">
                <Code className="w-4 h-4 text-[#EA580C]" />
                Tecnologias Utilizadas
              </h3>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed mt-4">
              <div>
                <p className="font-bold text-[#3B0764] mb-0.5">• Tecnologias utilizadas:</p>
                <p className="text-slate-600">
                  React 19, TypeScript, Tailwind CSS, Vite, Lucide Icons e interpretadores client-side em JavaScript puro.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#3B0764] mb-0.5">• Aplicação prática:</p>
                <p className="text-slate-600">
                  Arquitetura modular em componentes, validação estrita de tipos com TypeScript e execução de código sem custos de infraestrutura de servidor.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#3B0764] mb-0.5">• Ferramentas:</p>
                <p className="text-slate-600">
                  Git, GitHub Pages, GitHub Actions (CI/CD para build e publicação automática), VS Code e terminal Linux.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-100 flex items-center gap-1.5 text-[11px] text-purple-900 font-semibold">
            <GitBranch className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Deploy automatizado via GitHub Actions</span>
          </div>
        </div>

        {/* Card 2: DESAFIOS SUPERADOS */}
        <div className="flex flex-col justify-between p-6 rounded-3xl bg-[#F8FAFC] border-2 border-slate-300 shadow-sm hover:border-slate-400 transition-colors">
          <div>
            <div className="mb-3">
              <span className="text-[10px] font-extrabold tracking-wider text-slate-600 uppercase">
                DESAFIOS SUPERADOS
              </span>
              <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2 mt-0.5">
                <Cpu className="w-4 h-4 text-purple-700" />
                Dificuldades & Aprendizados
              </h3>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed mt-4">
              <div>
                <p className="font-bold text-slate-900 mb-0.5">• Principal Desafio:</p>
                <p className="text-slate-600">
                  Emular o comportamento de linguagens compiladas e interpretadas de backend (Java e Python) com total segurança dentro da sandbox do navegador.
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-900 mb-0.5">• Solução Encontrada:</p>
                <p className="text-slate-600">
                  Construção de analisadores léxicos/sintáticos em TypeScript, captura de saídas de texto (stdout) e testes automatizados orientados a especificações.
                </p>
              </div>

              <div>
                <p className="font-bold text-slate-900 mb-0.5">• Aprendizado:</p>
                <p className="text-slate-600">
                  Salto qualitativo em lógica de programação, versionamento em equipe no Git e configuração de pipelines no GitHub Actions.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-[11px] text-slate-700 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Segurança e isolamento 100% no cliente</span>
          </div>
        </div>

        {/* Card 3: EVOLUÇÃO FUTURA */}
        <div className="flex flex-col justify-between p-6 rounded-3xl bg-[#FFF7ED]/70 border-2 border-orange-500/25 shadow-sm hover:border-orange-500/40 transition-colors">
          <div>
            <div className="mb-3">
              <span className="text-[10px] font-extrabold tracking-wider text-[#EA580C] uppercase">
                EVOLUÇÃO FUTURA
              </span>
              <h3 className="text-lg font-black text-[#EA580C] tracking-tight flex items-center gap-2 mt-0.5">
                <Rocket className="w-4 h-4 text-purple-900" />
                Próximas Melhorias
              </h3>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed mt-4">
              <div>
                <p className="font-bold text-[#C2410C] mb-0.5">• Melhoria 1:</p>
                <p className="text-slate-600">
                  Sincronização em nuvem com banco de dados para salvar perfis de alunos e criar ranking competitivo entre as turmas da Proz Educação.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#C2410C] mb-0.5">• Melhoria 2:</p>
                <p className="text-slate-600">
                  Expansão para novas trilhas de alta demanda: Banco de Dados SQL, C#, Node.js e React avançado.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#C2410C] mb-0.5">• Melhoria 3:</p>
                <p className="text-slate-600">
                  Modo "Duelo Dev" colaborativo em tempo real para dois estudantes resolverem desafios em dupla (Pair Programming).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-orange-100 flex items-center gap-1.5 text-[11px] text-[#C2410C] font-semibold">
            <Rocket className="w-3.5 h-3.5 text-purple-900" />
            <span>Roadmap contínuo pós-desafio</span>
          </div>
        </div>

      </div>

      {/* Rodapé com Dica de Fala */}
      <footer className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
        <span>DualDev • Desafio de Desenvolvimento Web Proz</span>
        <span className="text-[#3B0764] font-semibold">Conclusão da equipe (Duração alvo: 1 minuto)</span>
      </footer>
    </div>
  );
};
