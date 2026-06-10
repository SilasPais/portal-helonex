
import React, { useState, useEffect } from 'react';
import { Newspaper, Bell, Search, AlertCircle, Scale, Building, ExternalLink } from 'lucide-react';
import { DOUNews } from '../types';

const DOUIntelligence: React.FC = () => {
  const [news, setNews] = useState<DOUNews[]>([
    {
      id: '1',
      agency: 'ANTT',
      title: 'Resolução nº 6.074: Novas regras de IQT',
      impact: 'CRITICAL',
      summary: 'Define os parâmetros para o Índice de Qualidade do Transportador e a calibração de multas responsivas.',
      link: '#'
    },
    {
      id: '2',
      agency: 'SENATRAN',
      title: 'Portaria nº 120/2026: Balanças HS-WIM',
      impact: 'HIGH',
      summary: 'Novos requisitos técnicos para aferição de balanças dinâmicas em rodovias federais.',
      link: '#'
    }
  ]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="bg-slate-950 p-4 md:p-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
           <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] font-bold uppercase tracking-widest mb-4 animate-pulse">
              <Bell size={12} /> Live Tracking Diário Oficial
           </div>
           <h2 className="text-3xl md:text-5xl font-display font-bold text-white">Ro-DOU <span className="text-hlx-gold">Intelligence</span></h2>
           <p className="text-gray-400 mt-2 max-w-2xl">Vigilância sistêmica de todas as publicações da ANTT, Contran e Senatran. Nós lemos o DOU para você não ser pego de surpresa.</p>
        </div>
        <div className="relative w-full md:w-64">
           <Search className="absolute left-3 top-3 text-gray-500" size={18} />
           <input type="text" placeholder="Filtrar resoluções..." className="w-full bg-slate-900 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white text-sm outline-none focus:border-hlx-gold" />
        </div>
      </div>

      <div className="grid gap-4">
        {news.map(item => (
          <div key={item.id} className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:bg-slate-800 transition-all flex flex-col md:flex-row gap-6 group">
             <div className="md:w-32 flex-shrink-0">
                <span className="text-xs font-black text-gray-500 uppercase tracking-tighter block mb-2">{item.agency}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getImpactColor(item.impact)}`}>
                   Impacto: {item.impact}
                </span>
             </div>
             
             <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-hlx-gold transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.summary}</p>
             </div>

             <div className="md:w-48 flex items-center justify-end">
                <button className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white transition-colors bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
                   Ver na íntegra <ExternalLink size={14} />
                </button>
             </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-hlx-gold/10 border border-hlx-gold/20 p-6 rounded-2xl text-center">
         <p className="text-hlx-gold font-bold text-sm">IA HELONEX: Atualizamos seu POP (Procedimento Operacional Padrão) automaticamente a cada nova resolução.</p>
      </div>
    </div>
  );
};

export default DOUIntelligence;
