import React, { useState } from 'react';
import { Code2, Zap, Copy, Check, Sparkles } from 'lucide-react';
import { TrackId } from '../types';
import { getSnippetsByTrack } from '../data/snippets';
import { LanguageIcon } from '../components/LanguageIcon';
import { tracks } from '../data/tracks';

export const SobrePage: React.FC = () => {
  const [selectedSnippetTrack, setSelectedSnippetTrack] = useState<TrackId>('java');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentSnippets = getSnippetsByTrack(selectedSnippetTrack);

  const handleCopySnippet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10 bg-[#0b101b]">
      {/* Cabeçalho */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-[#ffbe82] to-[#6fb7db] text-slate-950 shadow-xs mb-1">
          <Code2 className="h-6 w-6 stroke-[2.3]" />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Sobre o DualDev
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Plataforma de ensino prático para dominar linguagens de programação diretamente no navegador e no celular.
        </p>
      </div>

      {/* Snippets e Atalhos */}
      <div className="aero-card p-6 sm:p-8 space-y-6 bg-[#0f172a]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Zap className="h-4 w-4 text-[#ffbe82]" />
              <span>Snippets Inteligentes (Estilo VS Code)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
              Digite o prefixo (ex: <code className="text-[#ffbe82] font-mono px-1 py-0.5 rounded bg-black/30">sout</code> ou <code className="text-[#ffbe82] font-mono px-1 py-0.5 rounded bg-black/30">def</code>) e pressione <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[#9FD6F2]">Tab</kbd> para autocompletar.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141f30] border border-[#9FD6F2]/30 text-[#9FD6F2] text-xs font-semibold shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-[#ffbe82]" />
            <span>Atalho Rápido: Tab</span>
          </div>
        </div>

        {/* Seleção de Linguagem para Snippets */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {tracks.map((t) => {
            const isSelected = t.id === selectedSnippetTrack;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedSnippetTrack(t.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#6fb7db] text-slate-950 shadow-xs'
                    : 'bg-[#141f30] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <LanguageIcon trackId={t.id} className="w-3.5 h-3.5" />
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* Lista de Snippets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {currentSnippets.map((snip) => (
            <div
              key={snip.id}
              className="p-3.5 rounded-lg border border-slate-800 bg-[#0c1422] space-y-2 hover:border-[#6fb7db]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#ffbe82]/15 border border-[#ffbe82]/30 text-[#ffbe82] font-mono text-xs font-bold">
                    {snip.prefix}
                  </span>
                  <span className="text-xs font-semibold text-white">{snip.label}</span>
                </div>

                <button
                  onClick={() => handleCopySnippet(snip.id, snip.body)}
                  title="Copiar snippet"
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {copiedId === snip.id ? (
                    <Check className="h-3.5 w-3.5 text-[#86efac]" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400">{snip.description}</p>

              <pre className="p-2 rounded bg-[#070c14] border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                {snip.body}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
