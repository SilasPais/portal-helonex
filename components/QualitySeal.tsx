import React from 'react';
import { Shield, ShieldCheck, Gem, Crown, Star } from 'lucide-react';
import { UserContext, MaturityLevel } from '../types';

interface QualitySealProps {
  context: UserContext | null;
}

const QualitySeal: React.FC<QualitySealProps> = ({ context }) => {
  if (!context) return null;

  const getLevelInfo = (level?: MaturityLevel) => {
    switch (level) {
      case MaturityLevel.LEVEL_02_SILVER:
        return { icon: Shield, label: 'Selo Prata', color: 'text-slate-300', bg: 'bg-slate-300/10', border: 'border-slate-300/30' };
      case MaturityLevel.LEVEL_03_GOLD_ESG:
        return { icon: Star, label: 'Selo Ouro', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' };
      case MaturityLevel.LEVEL_04_GUARDIAN:
        return { icon: Crown, label: 'Guardian', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30' };
      default:
        return { icon: ShieldCheck, label: 'Membro', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30' };
    }
  };

  const info = getLevelInfo(context.maturityLevel);
  const Icon = info.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${info.border} ${info.bg} backdrop-blur-md transition-all hover:scale-105 cursor-help group relative`}>
      <Icon size={14} className={info.color} />
      <div className="flex flex-col leading-none">
        <span className={`text-[10px] font-bold uppercase ${info.color}`}>{info.label}</span>
        <span className="text-[8px] text-gray-400 font-mono uppercase tracking-wider">{context.persona}</span>
      </div>
      
      {/* Tooltip */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-slate-900 border border-white/10 p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <p className="text-xs text-white font-bold mb-1">
          {context.macro === 'PASSENGER' ? 'Segurança do Passageiro' : 'Segurança da Carga'}
        </p>
        <p className="text-[10px] text-gray-400">
          {context.macro === 'PASSENGER' 
            ? 'Sua frota de passageiros está sendo auditada para garantir viagens seguras e conformidade total.'
            : 'Sua operação de carga está sendo monitorada para garantir eficiência e proteção patrimonial.'}
        </p>
      </div>
    </div>
  );
};

export default QualitySeal;
