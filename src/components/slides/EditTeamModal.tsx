import React, { useState } from 'react';
import { useDualDev, TeamInfo } from '../../context/DualDevContext';
import { X, Save, RotateCcw, Users } from 'lucide-react';

interface EditTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditTeamModal: React.FC<EditTeamModalProps> = ({ isOpen, onClose }) => {
  const { teamInfo, setTeamInfo } = useDualDev();

  const [formData, setFormData] = useState<TeamInfo>({ ...teamInfo });

  if (!isOpen) return null;

  const handleMemberChange = (index: number, value: string) => {
    const updated = [...formData.members];
    updated[index] = value;
    setFormData({ ...formData, members: updated });
  };

  const handleSave = () => {
    setTeamInfo(formData);
    onClose();
  };

  const handleReset = () => {
    const defaults: TeamInfo = {
      teamName: 'DualDev Core Team',
      members: [
        'Pessoa 1 (Abertura & Visão Geral)',
        'Pessoa 2 (Trilhas & 100 Desafios)',
        'Pessoa 3 (Arquitetura & Execução)',
        'Pessoa 4 (Lógica dos Interpretadores)',
        'Pessoa 5 (Demonstração & Conclusão)'
      ],
      trackCategory: 'Tema Livre | Educação & Tecnologia',
      turmaTurno: '261A - tarde'
    };
    setFormData(defaults);
    setTeamInfo(defaults);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 select-none">
      <div className="relative w-full max-w-lg bg-[#0f172a] border border-purple-900/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Topo do Modal */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141f35] border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-[#EA580C]" />
            <h3 className="text-sm font-bold text-white">
              Personalizar Dados do Slide 1 (Equipe)
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário de Edição */}
        <div className="p-6 overflow-y-auto space-y-4 max-h-[75vh] text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Nome da Equipe ou Desenvolvedor(a):
            </label>
            <input 
              type="text"
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0b101b] border border-slate-700 text-white focus:outline-none focus:border-purple-500 font-medium"
              placeholder="Ex: Pontooi & Equipe DualDev"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Categoria / Trilha do Desafio:
            </label>
            <input 
              type="text"
              value={formData.trackCategory}
              onChange={(e) => setFormData({ ...formData, trackCategory: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0b101b] border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              placeholder="Ex: Tema Livre | Halloween Tech | WebJornal"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Turma e Turno:
            </label>
            <input 
              type="text"
              value={formData.turmaTurno}
              onChange={(e) => setFormData({ ...formData, turmaTurno: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#0b101b] border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              placeholder="Ex: 261A - tarde"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Nomes dos 5 Integrantes:
            </label>
            <div className="space-y-2 mt-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 text-center font-bold text-orange-400">{i + 1}.</span>
                  <input 
                    type="text"
                    value={formData.members[i] || ''}
                    onChange={(e) => handleMemberChange(i, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[#0b101b] border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-500"
                    placeholder={`Nome do Integrante ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="px-6 py-3.5 bg-[#141f35] border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white text-xs"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#EA580C] hover:bg-orange-500 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
