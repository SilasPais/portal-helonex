
import React from 'react';
import { QrCode, ShieldCheck, Star, Award, CheckCircle, Truck, Zap } from 'lucide-react';
import { CompanyProfile } from '../types';

interface DigitalIdentityCardProps {
  company: CompanyProfile;
}

const DigitalIdentityCard: React.FC<DigitalIdentityCardProps> = ({ company }) => {
  const reputation = company.reputation || { 
      score: 50, 
      tier: 'BRONZE', 
      capabilities: ['Cadastro Básico'], 
      badges: ['CNPJ Ativo'] 
  };

  const getTierGradient = (tier: string) => {
      switch(tier) {
          case 'DIAMANTE': return 'from-cyan-500 via-blue-600 to-purple-600';
          case 'OURO': return 'from-yellow-400 via-orange-500 to-yellow-600';
          case 'PRATA': return 'from-slate-300 via-slate-400 to-slate-500';
          default: return 'from-amber-700 via-amber-800 to-amber-900';
      }
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-3xl overflow-hidden shadow-2xl transition-all hover:scale-[1.02] cursor-pointer group border-2 border-white/10">
        {/* Background Animado */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getTierGradient(reputation.tier)} opacity-95`}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/20 rounded-full blur-[50px] group-hover:blur-[70px] transition-all"></div>

        <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
            
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border-2 border-white/40 shadow-inner">
                        <ShieldCheck size={32} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className="font-display font-black text-2xl leading-none uppercase tracking-widest drop-shadow-md">HELONEX ID</h3>
                        <p className="text-xs font-bold opacity-90 font-mono tracking-wide uppercase mt-1">Soberania Digital • {reputation.tier}</p>
                    </div>
                </div>
                <div className="text-right bg-black/20 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-4xl font-black font-display tracking-tighter leading-none">{reputation.score}</div>
                    <div className="text-[10px] uppercase font-bold text-center mt-1">Score IQT</div>
                </div>
            </div>

            {/* Status GR - NOVIDADE: Validação de Risco Integrada */}
            <div className="flex justify-between items-center my-4">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border-2 backdrop-blur-md shadow-lg ${
                    reputation.score > 70 
                    ? 'bg-green-900/40 border-green-400/50 text-white' 
                    : 'bg-red-900/40 border-red-400/50 text-white'
                }`}>
                    <div className={`w-3 h-3 rounded-full border border-white/50 ${reputation.score > 70 ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="text-xs font-black uppercase tracking-widest">
                        {reputation.score > 70 ? 'GR LIBERADO' : 'GR RESTRITO'}
                    </span>
                </div>
                
                <div className="flex gap-1 bg-black/20 p-1.5 rounded-full border border-white/10">
                    {reputation.badges.slice(0, 3).map((badge: string, idx: number) => (
                        <div key={idx} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-sm" title={badge}>
                            <Star size={14} fill="white" className="text-white"/>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Info & Footer */}
            <div>
                <div className="font-mono text-2xl font-bold tracking-widest drop-shadow-md mb-6 bg-black/10 px-4 py-2 rounded-lg border border-white/5 inline-block">
                    {company.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")}
                </div>
                
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs font-bold uppercase opacity-80 mb-1 tracking-wider">Titular da Conta</p>
                        <p className="font-black text-lg truncate max-w-[200px] leading-tight drop-shadow-sm">{company.name}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                            {reputation.capabilities.map((cap: string, i: number) => (
                                <span key={i} className="text-[10px] bg-white/20 px-2 py-1 rounded border border-white/30 uppercase font-black flex items-center gap-1 shadow-sm">
                                    <Zap size={10} fill="currentColor" /> {cap}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-1.5 rounded-xl shadow-xl">
                        <QrCode size={56} className="text-slate-900" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DigitalIdentityCard;
