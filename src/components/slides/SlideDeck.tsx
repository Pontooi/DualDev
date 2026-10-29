import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDualDev } from '../../context/DualDevContext';
import { Slide1Cover } from './Slide1Cover';
import { Slide2IdeaObjective } from './Slide2IdeaObjective';
import { Slide3Solution } from './Slide3Solution';
import { Slide4Demo } from './Slide4Demo';
import { Slide5TechFuture } from './Slide5TechFuture';
import { SpeakerNotesModal } from './SpeakerNotesModal';
import { EditTeamModal } from './EditTeamModal';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Printer, 
  Users, 
  Edit3, 
  Laptop, 
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';

const slideMetadata = [
  { id: 1, title: 'Capa & Identificação', targetTime: '30 seg', targetSeconds: 30 },
  { id: 2, title: 'Ideia & Objetivo', targetTime: '2 min', targetSeconds: 120 },
  { id: 3, title: 'A Solução & Diferencial', targetTime: '2 min 30 seg', targetSeconds: 150 },
  { id: 4, title: 'Demonstração Prática', targetTime: '4 min', targetSeconds: 240 },
  { id: 5, title: 'Tecnologias & Futuro', targetTime: '1 min', targetSeconds: 60 }
];

export const SlideDeck: React.FC = () => {
  const { setActiveTab } = useDualDev();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Cronômetro da apresentação
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const toggleTimer = () => setIsTimerRunning((prev) => !prev);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < slideMetadata.length - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Atalhos de teclado para navegação suave nos slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isNotesOpen || isEditOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Backspace') {
        e.preventDefault();
        prevSlide();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'p' && (e.ctrlKey || e.metaKey)) {
        // Deixa o print nativo do navegador agir
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isNotesOpen, isEditOpen]);

  const handlePrint = () => {
    window.print();
  };

  const renderCurrentSlide = (index: number) => {
    switch (index) {
      case 0:
        return <Slide1Cover onOpenEditModal={() => setIsEditOpen(true)} onOpenNotesModal={() => setIsNotesOpen(true)} />;
      case 1:
        return <Slide2IdeaObjective />;
      case 2:
        return <Slide3Solution />;
      case 3:
        return <Slide4Demo />;
      case 4:
        return <Slide5TechFuture />;
      default:
        return <Slide1Cover onOpenEditModal={() => setIsEditOpen(true)} onOpenNotesModal={() => setIsNotesOpen(true)} />;
    }
  };

  const currentMeta = slideMetadata[currentSlide];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-between p-2 sm:p-4 md:p-6 print:p-0 print:bg-white select-none relative"
    >
      {/* Barra de Controle Superior (Oculta na Impressão) */}
      <header className="print:hidden w-full max-w-7xl mx-auto mb-3 flex flex-wrap items-center justify-between gap-3 bg-[#0e1626]/90 border border-slate-800 rounded-2xl px-4 py-2.5 backdrop-blur-md shadow-lg">
        {/* Identificação do Slide Atual */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#3B0764] text-white text-xs font-bold border border-purple-500/40">
            <Layers className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>SLIDE {currentSlide + 1} / {slideMetadata.length}</span>
          </div>

          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-white tracking-tight">
              {currentMeta.title}
            </span>
            <span className="text-[10px] text-purple-300">
              Tempo recomendado no modelo Proz: <strong className="text-orange-400">{currentMeta.targetTime}</strong>
            </span>
          </div>
        </div>

        {/* Cronômetro Central da Apresentação */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#131d2e] rounded-xl border border-slate-700/80">
          <Clock className="w-3.5 h-3.5 text-[#ffbe82]" />
          <span className="font-mono text-xs font-bold text-white tabular-nums tracking-wider">
            {formatTime(timerSeconds)}
          </span>

          <div className="h-3 w-px bg-slate-700" />

          <button
            onClick={toggleTimer}
            className={`p-1 rounded-md transition-colors ${
              isTimerRunning 
                ? 'text-amber-400 hover:bg-amber-400/20' 
                : 'text-emerald-400 hover:bg-emerald-400/20'
            }`}
            title={isTimerRunning ? 'Pausar cronômetro' : 'Iniciar cronômetro'}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          <button
            onClick={resetTimer}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zerar cronômetro"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ferramentas de Apresentação */}
        <div className="flex items-center gap-2">
          {/* Botão Roteiro dos 5 Integrantes */}
          <button
            onClick={() => setIsNotesOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3B0764] hover:bg-purple-900 text-white text-xs font-semibold border border-purple-500/30 transition-colors shadow-xs"
            title="Abrir o roteiro dividido para 5 integrantes"
          >
            <Users className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">Roteiro 5 Pessoas</span>
          </button>

          {/* Botão de Edição dos Dados da Equipe */}
          <button
            onClick={() => setIsEditOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700"
            title="Editar nomes, equipe e turma"
          >
            <Edit3 className="w-3.5 h-3.5 text-purple-300" />
            <span>Editar Equipe</span>
          </button>

          {/* Botão Imprimir / Exportar para PDF */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700"
            title="Exportar apresentação completa para PDF ou imprimir"
          >
            <Printer className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">PDF / Imprimir</span>
          </button>

          {/* Botão de Tela Cheia */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
            title={isFullscreen ? 'Sair da tela cheia (F)' : 'Modo apresentação tela cheia (F)'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Botão de Ir para Plataforma */}
          <button
            onClick={() => setActiveTab('academia')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EA580C] hover:bg-orange-600 text-white text-xs font-bold transition-colors shadow-sm"
            title="Abrir a plataforma web interativa DualDev"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Plataforma DualDev</span>
          </button>
        </div>
      </header>

      {/* Viewport Principal dos Slides (Proporção Widescreen 16:9 Estilo PowerPoint / PDF) */}
      <main className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center items-center relative print:w-full print:max-w-none print:m-0">
        
        {/* Visualização de Apresentação em Tela (Apenas Slide Ativo) */}
        <div className="w-full aspect-[16/9] max-h-[82vh] relative print:hidden">
          {renderCurrentSlide(currentSlide)}

          {/* Botões Flutuantes de Avançar e Voltar */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xs text-white border border-white/20 transition-all ${
              currentSlide === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-70 hover:opacity-100 hover:scale-105'
            }`}
            title="Slide anterior (Seta para a esquerda)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === slideMetadata.length - 1}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xs text-white border border-white/20 transition-all ${
              currentSlide === slideMetadata.length - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-70 hover:opacity-100 hover:scale-105'
            }`}
            title="Próximo slide (Seta para a direita ou Espaço)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* MODO IMPRESSÃO: Renderiza todos os 5 slides em sequência com quebra de página limpa */}
        <div className="hidden print:block w-full">
          {slideMetadata.map((_, idx) => (
            <div key={idx} className="w-full aspect-[16/9] page-break-after mb-8 print:mb-0 print:break-after-page print:h-screen">
              {renderCurrentSlide(idx)}
            </div>
          ))}
        </div>
      </main>

      {/* Barra de Navegação Inferior (Thumbnails / Navegador de Slides) */}
      <footer className="print:hidden w-full max-w-7xl mx-auto mt-3 flex items-center justify-between gap-3 bg-[#0e1626]/80 border border-slate-800 rounded-2xl px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {slideMetadata.map((slide, index) => {
            const isActive = currentSlide === index;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#3B0764] text-white border border-[#EA580C]/50 shadow-md scale-102'
                    : 'bg-[#141f35] text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  isActive ? 'bg-[#EA580C] text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  {slide.id}
                </span>
                <span>{slide.title}</span>
                <span className="text-[10px] text-purple-300 font-mono opacity-80">
                  ({slide.targetTime})
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
          <span>Use as setas <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">→</kbd> ou <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">Espaço</kbd></span>
        </div>
      </footer>

      {/* Modal de Roteiro dos 5 Apresentadores */}
      <SpeakerNotesModal 
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        activeSlideIndex={currentSlide}
      />

      {/* Modal de Personalização dos Dados da Equipe */}
      <EditTeamModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
};
