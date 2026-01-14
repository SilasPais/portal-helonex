import React from 'react';
import { Heart, Flower2, Radio, Newspaper, Mic, Coffee, ArrowRight } from 'lucide-react';
import { Section } from '../types';

interface CommunitySectionProps {
  onNavigate?: (section: Section) => void;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ onNavigate }) => {
  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-white/5 relative overflow-hidden z-0">
        
        {/* Warm glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6">
                    <Heart size={16} className="fill-orange-400" /> A Alma do Transporte
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                    Tecnologia Fria, <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Coração Quente.</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                    Não vendemos apenas licenças, cuidamos de vidas. A tecnologia resolve a burocracia para que sobre tempo para o que realmente importa: a família e a estrada.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                
                {/* 1. Cantinho da Mulher */}
                <div className="bg-slate-800/80 border border-pink-500/20 rounded-2xl p-6 md:p-8 hover:border-pink-500/50 transition-all group relative overflow-hidden shadow-lg hover:shadow-pink-900/20">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Flower2 size={120} className="text-pink-500" />
                    </div>
                    <div className="w-14 h-14 bg-pink-500/20 rounded-full flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
                        <Heart size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Cantinho da Mulher</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        Espaço dedicado às mulheres do transporte (motoristas, gestoras e esposas). 
                        Rede de apoio, capacitação e força feminina na logística.
                    </p>
                    <button className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-2 hover:text-pink-300 transition-colors">
                        <ArrowRight size={14} /> Junte-se ao Grupo
                    </button>
                </div>

                {/* 2. Notícias do Trecho */}
                <div className="bg-slate-800/80 border border-amber-500/20 rounded-2xl p-6 md:p-8 hover:border-amber-500/50 transition-all group relative overflow-hidden shadow-lg hover:shadow-amber-900/20">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Radio size={120} className="text-amber-500" />
                    </div>
                    <div className="w-14 h-14 bg-amber-500/20 rounded-full flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform">
                        <Newspaper size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Notícias do Trecho</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        Informação sem filtro. Condição das estradas, mudanças na lei e preço do diesel. 
                        Jornalismo feito por quem pisa no asfalto.
                    </p>
                    <button 
                        onClick={() => onNavigate && onNavigate(Section.NEWS_BOARD)}
                        className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 hover:text-amber-300 transition-colors"
                    >
                        <ArrowRight size={14} /> Ler Jornal & Classificados
                    </button>
                </div>

                {/* 3. A Fala das Estradas */}
                <div className="bg-slate-800/80 border border-green-500/20 rounded-2xl p-6 md:p-8 hover:border-green-500/50 transition-all group relative overflow-hidden shadow-lg hover:shadow-green-900/20">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Mic size={120} className="text-green-500" />
                    </div>
                    <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
                        <Coffee size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">A Voz da Estrada</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        O olhar humano. Histórias de vida, "causos" da rodagem e o fórum oficial da Comunidade Helonex. 
                        Aqui sua opinião tem valor.
                    </p>
                    <button className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-2 hover:text-green-300 transition-colors">
                        <ArrowRight size={14} /> Entrar na Roda
                    </button>
                </div>

            </div>
        </div>
      </div>
  );
};

export default CommunitySection;