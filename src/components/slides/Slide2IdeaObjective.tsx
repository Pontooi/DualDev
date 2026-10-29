import React from 'react';
import { ProzLogo } from './ProzLogo';
import { Lightbulb, Target, Sparkles, BookOpen, Compass } from 'lucide-react';

export const Slide2IdeaObjective: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden select-none">
      {/* Topo Oficial Proz: Cabeçalho com Kicker Laranja e Título Roxo */}
      <header className="w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-[#EA580C] uppercase mb-1">
              DESAFIO DE DESENVOLVIMENTO WEB
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3B0764] tracking-tight">
              Ideia & Objetivo — O Porquê do Projeto{' '}
              <span className="text-[#3B0764] tabular-nums font-bold">
                (2 min)
              </span>
            </h2>
          </div>

          <ProzLogo variant="dark" />
        </div>

        {/* Linha Divisória Laranja da Identidade Proz */}
        <div className="w-full h-1 bg-[#EA580C] rounded-full mt-4" />
      </header>

      {/* Conteúdo: 2 Grandes Cards Arredondados */}
      <div className="my-auto py-4 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        
        {/* Card 1: A IDEIA DO PROJETO */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#FAF5FF]/70 border-2 border-purple-900/15 shadow-sm hover:border-purple-900/30 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-xl bg-purple-900/10 flex items-center justify-center text-[#3B0764]">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#3B0764] tracking-tight">
                1. A IDEIA DO PROJETO
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div>
                <p className="font-bold text-[#3B0764] flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                  Motivação
                </p>
                <p className="pl-3 border-l border-purple-200">
                  O primeiro contato com a programação é repleto de barreiras: instalar compiladores pesados, configurar variáveis de ambiente (PATH) e resolver erros de setup. Muitos desistem antes mesmo da 1ª linha.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#3B0764] flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                  Público-Alvo
                </p>
                <p className="pl-3 border-l border-purple-200">
                  Estudantes da Proz Educação, alunos do ensino técnico/médio, pessoas leigas que nunca viram código e profissionais em transição de carreira.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#3B0764] flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                  Contexto
                </p>
                <p className="pl-3 border-l border-purple-200">
                  Criar um ambiente 100% web, leve e instantâneo que roda em qualquer computador com navegador — sem custo e sem instalação.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-purple-100 flex items-center gap-2 text-[11px] text-purple-900 font-semibold">
            <Compass className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Foco na eliminação de atritos técnicos iniciais</span>
          </div>
        </div>

        {/* Card 2: O OBJETIVO DO PROJETO */}
        <div className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#FFF7ED]/70 border-2 border-orange-500/20 shadow-sm hover:border-orange-500/35 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-xl bg-orange-600/10 flex items-center justify-center text-[#EA580C]">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#EA580C] tracking-tight">
                2. O OBJETIVO DO PROJETO
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div>
                <p className="font-bold text-[#C2410C] flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-900" />
                  Objetivo principal
                </p>
                <p className="pl-3 border-l border-orange-200">
                  Oferecer uma academia digital completa para aprendizado simultâneo de 5 pilares do desenvolvimento: <strong className="text-slate-900">Java, Python, JavaScript, HTML e CSS</strong>.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#C2410C] flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-900" />
                  Como funciona a proposta
                </p>
                <p className="pl-3 border-l border-orange-200">
                  100 atividades práticas divididas em 20 desafios progressivos por trilha. O estudante digita no editor integrado e recebe validação automática em tempo real.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#C2410C] flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-900" />
                  Resultado esperado
                </p>
                <p className="pl-3 border-l border-orange-200">
                  O aluno constrói autonomia de raciocínio lógico, experimenta linguagens de back-end e front-end e se mantém motivado pelo sistema de gamificação (XP e medalhas).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-orange-100 flex items-center gap-2 text-[11px] text-[#C2410C] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-900" />
            <span>Aprendizagem ativa com feedback no mesmo segundo</span>
          </div>
        </div>

      </div>

      {/* Rodapé com Dica de Fala */}
      <footer className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
        <span>DualDev • Desafio de Desenvolvimento Web Proz</span>
        <span className="text-[#3B0764] font-semibold">Fala sugerida: Pessoa 2 (Duração alvo: 2 minutos)</span>
      </footer>
    </div>
  );
};
