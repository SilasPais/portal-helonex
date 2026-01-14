import React, { useEffect, useState } from 'react';
import { ShoppingCart, ArrowRight, Lock, CheckCircle, Flame, ShieldCheck, Tag, TrendingDown, Server } from 'lucide-react';
import { guardianEngine } from '../services/guardianSystem';
import { MarketplaceOffer } from '../types';

interface MarketplaceTeaserProps {
  onNavigateToStore: () => void;
}

const MarketplaceTeaser: React.FC<MarketplaceTeaserProps> = ({ onNavigateToStore }) => {
  const [offers, setOffers] = useState<MarketplaceOffer[]>([]);

  useEffect(() => {
    const allOffers = guardianEngine.getAllOffers();
    const publicOffers = allOffers.filter(o => o.targetRules.isPublicAvailable).slice(0, 4);
    setOffers(publicOffers);
  }, []);

  const calculateSavings = (pub: number, member: number) => {
    if(pub === 0 || member === 0) return 0;
    return Math.round(((pub - member) / pub) * 100);
  };

  return (
    <div className="py-12 md:py-20 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest mb-4">
               <Server size={14} /> Hub de Tecnologia & Soluções
            </div>
            <h2 className="text-2xl md:text-5xl font-display font-bold text-white mb-2">
              Somos o Maior Player de <span className="text-hlx-gold">Tecnologia do Setor.</span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-sm md:text-lg">
              Muito além de documentos. Somos o Ecossistema que conecta Despachantes, Contadores, Advogados e Fornecedores em uma única plataforma de alta performance.
            </p>
          </div>
          
          <button 
            onClick={onNavigateToStore}
            className="group flex items-center gap-3 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-white/10 transition-all shadow-lg whitespace-nowrap text-sm md:text-base w-full md:w-auto justify-center"
          >
            ACESSAR CLUBE DE BENEFÍCIOS
            <ArrowRight size={20} className="text-hlx-gold group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up delay-100">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-slate-900 border border-white/10 rounded-2xl p-1 relative overflow-hidden group hover:border-hlx-gold/50 transition-colors">
              
              {offer.publicPrice > 0 && offer.memberPrice > 0 && (
                 <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10 shadow-lg">
                   -{calculateSavings(offer.publicPrice, offer.memberPrice)}% OFF
                 </div>
              )}

              <div className="bg-slate-800/50 rounded-xl p-4 md:p-5 h-full flex flex-col">
                
                <div className="flex justify-between items-start mb-4">
                   <div className="p-3 bg-slate-950 rounded-lg border border-white/5 group-hover:border-hlx-gold/30 transition-colors">
                      {offer.category === 'Combustivel' ? <Flame className="text-orange-500" size={20} /> :
                       offer.category === 'Seguros' ? <ShieldCheck className="text-blue-500" size={20} /> :
                       offer.category === 'Manutencao' ? <Tag className="text-gray-400" size={20} /> : <ShoppingCart className="text-purple-500" size={20} />}
                   </div>
                   {offer.targetRules.companyType?.includes('TAC') && (
                     <span className="text-[9px] font-bold text-blue-300 bg-blue-500/10 px-2 py-1 rounded uppercase">Exclusivo TAC</span>
                   )}
                </div>

                <h3 className="text-white font-bold text-base md:text-lg mb-2 leading-tight min-h-[3rem] line-clamp-2">
                  {offer.title}
                </h3>
                
                <p className="text-gray-400 text-xs mb-4 md:mb-6 line-clamp-2 flex-1">
                  {offer.description}
                </p>

                <div className="bg-slate-950 rounded-lg p-3 border border-white/5 mb-4 group-hover:border-white/10 transition-colors">
                   <div className="flex justify-between items-center mb-1 border-b border-white/5 pb-1">
                      <span className="text-[10px] text-gray-500 uppercase font-medium">Mercado:</span>
                      <span className="text-xs text-gray-400 line-through decoration-red-500/50">
                        {offer.publicPrice > 0 ? `R$ ${offer.publicPrice.toFixed(2)}` : 'Sem Acesso'}
                      </span>
                   </div>
                   <div className="flex justify-between items-center pt-1">
                      <span className="text-[10px] text-hlx-gold uppercase font-bold flex items-center gap-1">
                        <CheckCircle size={10} /> Plataforma:
                      </span>
                      <span className="text-base md:text-lg font-bold text-white">
                        {offer.memberPrice > 0 ? `R$ ${offer.memberPrice.toFixed(2)}` : 'GRÁTIS'}
                      </span>
                   </div>
                </div>

                <button 
                  onClick={onNavigateToStore}
                  className="w-full py-3 bg-white/5 hover:bg-hlx-gold hover:text-slate-900 text-gray-300 font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-yellow-500/20"
                >
                  <Lock size={14} className="group-hover:hidden" />
                  <span className="group-hover:hidden">DESBLOQUEAR OFERTA</span>
                  <span className="hidden group-hover:inline">RESGATAR AGORA</span>
                </button>

              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
           <p className="text-xs md:text-sm text-gray-500 flex items-center justify-center gap-2">
             <ShieldCheck size={16} className="text-green-500" />
             Parceiros homologados e auditados pela equipe de Compliance HELONEX.
           </p>
        </div>

      </div>
    </div>
  );
};

export default MarketplaceTeaser;