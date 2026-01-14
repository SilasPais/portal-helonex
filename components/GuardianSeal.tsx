
import React from 'react';
import { ShieldCheck, Award, QrCode, CheckCircle, TrendingUp, Lock } from 'lucide-react';
import { QualitySealData, MaturityLevel } from '../types';

interface GuardianSealProps {
  data: QualitySealData;
}

const GuardianSeal: React.FC<GuardianSealProps> = ({ data }) => {
  
  const getTheme = (level: MaturityLevel) => {
    switch (level) {
      case MaturityLevel.EXPONENCIAL: return { 
        gradient: 'from-yellow-400 via-orange-500 to-yellow-600', 
        border: 'border-yellow-500', 
        text: 'text-yellow-400',
        label: 'OURO'
      };
      case MaturityLevel.CONSOLIDADO: return { 
        gradient: 'from-gray-300 via-gray-400 to-gray-500', 
        border: 'border-gray-400', 
        text: 'text-gray-300',
        label: 'PRATA'
      };
      case MaturityLevel.QUALIFICADO: return { 
        gradient: 'from-amber-600 via-amber-700 to-amber-800', 
        border: 'border-amber-700', 
        text: 'text-amber-600',
        label: 'BRONZE'
      };
      default: return { 
        gradient: 'from-blue-500 via-blue-600 to-blue-700', 
        border: 'border-blue-500', 
        text: 'text-blue-400',
        label: 'STANDARD'
      };
    }
  };

  const theme = getTheme(data.level);

  return (
    <div className="relative group">
      {/* Efeito de Brilho Holográfico no Hover */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt`}></div>
      
      <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-2xl">
        
        {/* SELO VISUAL (ESQUERDA) */}
        <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center">
           {/* Anéis do Selo */}
           <div className={`absolute inset-0 rounded-full border-4 ${theme.border} opacity-50 border-dashed animate-[spin_10s_linear_infinite]`}></div>
           <div className={`absolute inset-2 rounded-full border-2 ${theme.border} opacity-30`}></div>
           
           {/* Miolo do Selo */}
           <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]`}>
              <div className="bg-slate-900 w-28 h-28 rounded-full flex flex-col items-center justify-center text-center p-2 border border-white/20">
                 <ShieldCheck size={32} className={theme.text} />
                 <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${theme.text}`}>Helonex</span>
                 <span className="text-white font-display font-bold text-lg leading-none mt-1">{theme.label}</span>
                 <span className="text-[8px] text-gray-400 mt-1">Nível {data.level}</span>
              </div>
           </div>
        </div>

        {/* INFORMAÇÕES (CENTRO) */}
        <div className="flex-1 text-center md:text-left">
           <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Award size={18} className={theme.text} />
              <span className={`text-xs font-bold uppercase tracking-widest ${theme.text}`}>Certificado de Qualidade</span>
           </div>
           <h3 className="text-2xl font-bold text-white mb-1">{data.levelName}</h3>
           <p className="text-gray-400 text-sm mb-4 max-w-sm">
             Esta empresa atende aos requisitos de conformidade ANTT 2026 e gestão da qualidade auditada pelo sistema Helonex.
           </p>
           
           {/* Termômetro de Qualidade */}
           <div className="space-y-1">
             <div className="flex justify-between text-xs text-gray-300 font-bold uppercase">
               <span>Score de Eficiência</span>
               <span>{data.score}/100</span>
             </div>
             <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-1000`} 
                  style={{ width: `${data.score}%` }}
                ></div>
             </div>
           </div>
        </div>

        {/* QR CODE & VALIDAÇÃO (DIREITA) */}
        <div className="flex flex-col items-center gap-3 bg-slate-950 p-4 rounded-xl border border-white/5">
           <div className="bg-white p-2 rounded-lg">
              <QrCode size={64} className="text-slate-900" />
           </div>
           <div className="text-center">
              <p className="text-[9px] text-gray-500 uppercase font-bold">Validação Digital</p>
              <p className="text-[10px] font-mono text-gray-300">{data.hash}</p>
              <div className="mt-1 flex items-center justify-center gap-1 text-[9px] text-green-500 bg-green-500/10 px-2 py-0.5 rounded">
                 <CheckCircle size={10} /> Ativo
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default GuardianSeal;
