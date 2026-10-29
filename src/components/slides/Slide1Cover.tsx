import React from 'react';
import { ProzLogo } from './ProzLogo';
import { useDualDev } from '../../context/DualDevContext';
import { Monitor, Code2, Users, Edit3 } from 'lucide-react';

interface Slide1CoverProps {
  onOpenEditModal: () => void;
  onOpenNotesModal: () => void;
}

export const Slide1Cover: React.FC<Slide1CoverProps> = ({ 
  onOpenEditModal,
  onOpenNotesModal 
}) => {
  const { teamInfo } = useDualDev();

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-[#3B0764] text-white rounded-2xl shadow-2xl overflow-hidden border border-purple-900/50 select-none">
      {/* Luz ambiente difusa sutil de fundo para profundidade */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-orange-500/15 blur-3xl" />

      {/* Topo: Logo Proz Educação e Emblema do Desafio Web */}
      <header className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <ProzLogo variant="white" />
          
          <div className="h-8 w-px bg-white/20 hidden sm:block" />

          {/* Emblema Desafio de Desenvolvimento Web Outubro/2026 */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium tracking-wide text-purple-200">
                Desafio de Desenvolvimento
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none">
                  Web
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-orange-600 text-white tracking-wider">
                  Outubro/2026
                </span>
              </div>
            </div>

            <div className="hidden sm:flex h-9 w-12 items-center justify-center rounded-md border border-white/30 bg-purple-900/40 text-purple-200">
              <Monitor className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Botão de edição rápida dos dados da equipe */}
        <button
          onClick={onOpenEditModal}
          className="print:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-purple-100 hover:text-white text-xs font-medium backdrop-blur-xs transition-colors"
          title="Editar dados da equipe e projeto"
        >
          <Edit3 className="w-3.5 h-3.5 text-orange-400" />
          <span className="hidden sm:inline">Personalizar Equipe</span>
        </button>
      </header>

      {/* Centro: Título do Projeto e Trilha */}
      <div className="relative z-10 my-auto py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 backdrop-blur-xs border border-white/15 text-orange-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Code2 className="w-3.5 h-3.5" />
          <span>Projeto de Conclusão do Desafio</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white text-balance drop-shadow-sm font-serif sm:font-sans">
          DUALDEV
        </h1>
        <p className="text-lg sm:text-2xl font-light text-purple-200 mt-2 tracking-wide">
          Academia Web de Programação & Execução Sem Servidor
        </p>

        <p className="mt-4 text-sm sm:text-base font-semibold text-orange-400">
          Categoria / Trilha:{' '}
          <span className="text-purple-100 font-normal">
            [{teamInfo.trackCategory || 'Tema Livre | Educação & Tecnologia'}]
          </span>
        </p>
      </div>

      {/* Rodapé: Card Branco de Identificação da Equipe + Tempo (30 seg) */}
      <div className="relative z-10 w-full bg-white text-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl border border-purple-200/60 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3B0764]">
            <Users className="w-4 h-4 text-orange-500" />
            <span>IDENTIFICAÇÃO DA EQUIPE OU PARTICIPANTE</span>
          </div>

          <ul className="text-xs sm:text-sm text-slate-700 space-y-1">
            <li className="flex items-baseline gap-2">
              <span className="text-purple-900 font-bold">• Nome da Equipe ou Desenvolvedor(a):</span>
              <span className="font-semibold text-slate-900">{teamInfo.teamName}</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-purple-900 font-bold">• Integrantes:</span>
              <span className="text-slate-800 font-medium">
                {teamInfo.members && teamInfo.members.length > 0 
                  ? teamInfo.members.join(', ')
                  : '5 Integrantes'}
              </span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="text-purple-900 font-bold">• Turma e Turno:</span>
              <span className="text-slate-800 font-medium">[{teamInfo.turmaTurno}]</span>
            </li>
          </ul>
        </div>

        {/* Badge Oficial de Tempo da Proz: (30 seg) */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
          <button 
            onClick={onOpenNotesModal}
            className="print:hidden text-xs text-purple-900 hover:text-purple-700 font-semibold underline underline-offset-2 flex items-center gap-1"
          >
            Ver Roteiro da Pessoa 1
          </button>
          <span className="text-xl sm:text-2xl font-black text-[#3B0764] tabular-nums">
            (30 seg)
          </span>
        </div>
      </div>
    </div>
  );
};
