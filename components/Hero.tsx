
import React from 'react';
import { TrendingUp, Award, Radio, ArrowRight, ShieldCheck, BrainCircuit, Route, MapPin, Zap } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  onCtaClick: () => void;
  onNavigateToNews: () => void;
  onNavigateToRoadmap: () => void;
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, onNavigateToNews, onNavigateToRoadmap, language }) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 pt-20 pb-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
         <div className="absolute top-20 left-20 w-72 h-72 bg-hlx-gold/30 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-800 border border-hlx-gold/30 text-xs font-bold text-hlx-gold mb-8 animate-fade-in-up shadow-[0_0_15px_rgba(245,158,11,0.2)]">
           <Zap size={14} className="text-hlx-gold" />
           <span className="uppercase tracking-widest">Soberania Digital • Ecossistema HELONEX</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-6 leading-tight animate-fade-in-up">
          O Futuro do Transporte é <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-hlx-gold via-orange-400 to-orange-600">Inteligência Logística.</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up">
          A maior rede de inteligência GovTech, JusTech e Gestão de Risco do Brasil. 
          Transformamos conformidade regulatória em lucro sustentável.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
           <button 
             onClick={onCtaClick}
             className="group px-10 py-5 bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold rounded-xl shadow-2xl shadow-yellow-500/40 transition-all flex items-center justify-center gap-3 text-lg"
           >
             ACESSAR HUB DE SOLUÇÕES
             <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
           </button>
           
           <button 
             onClick={onNavigateToRoadmap}
             className="px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-3 text-lg"
           >
             <BrainCircuit size={22} />
             Visão Estratégica 2026
           </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-left max-w-5xl mx-auto animate-fade-in-up">
           <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="p-2 bg-green-500/10 rounded-lg text-green-400"><ShieldCheck size={20} /></div>
              <div>
                <h4 className="text-white font-bold text-sm">GovTech</h4>
                <p className="text-xs text-gray-500">Regularidade 360°</p>
              </div>
           </div>
           <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><TrendingUp size={20} /></div>
              <div>
                <h4 className="text-white font-bold text-sm">JusTech</h4>
                <p className="text-xs text-gray-500">Blindagem de Multas</p>
              </div>
           </div>
           <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Award size={20} /></div>
              <div>
                <h4 className="text-white font-bold text-sm">GesTech</h4>
                <p className="text-xs text-gray-500">Erro Zero (ISO 9000)</p>
              </div>
           </div>
           <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm cursor-pointer group" onClick={onNavigateToNews}>
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 group-hover:bg-amber-500/20"><Radio size={20} /></div>
              <div>
                <h4 className="text-white font-bold text-sm group-hover:text-amber-400 transition-colors">Diário do Trecho</h4>
                <p className="text-xs text-gray-500">Notícias e Negócios</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
