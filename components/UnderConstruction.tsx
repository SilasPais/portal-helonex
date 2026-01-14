import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import { Section } from '../types';

interface UnderConstructionProps {
  onBack: () => void;
  areaName?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ onBack, areaName = "Esta Seção" }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-slate-900">
      <div className="bg-hlx-gold/10 p-6 rounded-full mb-6 animate-pulse">
        <Construction size={64} className="text-hlx-gold" />
      </div>
      
      <h2 className="text-3xl font-display font-bold text-white mb-4">
        Conteúdo em Desenvolvimento
      </h2>
      
      <p className="text-gray-400 max-w-lg mb-8 text-lg">
        O conteúdo referente a <span className="text-hlx-orange font-bold">{areaName}</span> está sendo finalizado pela nossa equipe técnica e jurídica.
      </p>

      <div className="bg-slate-800 p-4 rounded-lg border border-white/10 max-w-md w-full mb-8">
        <h3 className="text-sm font-bold text-gray-300 uppercase mb-2">Status do Desenvolvimento:</h3>
        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
          <div className="bg-hlx-blue h-full w-[70%]"></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Estrutura</span>
          <span>Conteúdo</span>
          <span>Validação Jurídica</span>
        </div>
      </div>

      <button 
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-white/10"
      >
        <ArrowLeft size={18} />
        Voltar para o Início
      </button>
    </div>
  );
};

export default UnderConstruction;