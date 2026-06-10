
import React from 'react';
import { ArrowRight, Truck, Building2, User, Anchor, ShieldCheck, Zap, Globe, Gavel, GraduationCap, Sparkles, Server, TrendingUp, Bus, Landmark, Milestone, Sun, Scale } from 'lucide-react';
import { Language, UserContext, MacroSegment, UserPersona } from '../types';

interface HeroProps {
  onCtaClick: () => void;
  onNavigateToNews: () => void;
  onNavigateToRoadmap: () => void;
  language: Language;
  userContext?: UserContext | null;
  onUpdateContext: (ctx: UserContext) => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, userContext, onUpdateContext }) => {
  
  const handlePersonaSelect = (macro: MacroSegment, persona: UserPersona) => {
    const newContext: UserContext = {
        macro,
        persona,
        goal: 'GROW',
        mode: 'FULL_MANAGEMENT',
        needsOnboarding: false
    };
    onUpdateContext(newContext);
    
    setTimeout(() => {
        const servicesSection = document.getElementById('services-section');
        if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative bg-slate-950 border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501746734258-dd130d41eaee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-900/80"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
                <div>
                    <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-hlx-gold/10 border border-hlx-gold/20 text-hlx-gold text-xs font-bold uppercase tracking-widest mb-4">
                        <Scale size={14} /> A Nova Forma de Poder Jurídico & Tecnológico
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                        Sistemas Operacional <br/>
                        <span className="text-hlx-gold">da Luz (S-O-L).</span>
                    </h1>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed border-l-4 border-hlx-gold pl-6">
                    <strong>HELONEX</strong> não é apenas software. É o ecossistema definitivo que une <strong>IA Especialista</strong>, <strong>Defesa Jurídica (Helonex Resolve)</strong> e <strong>Compliance Governamental</strong>. Auditamos, defendemos e garantimos o seu direito de operar e lucrar.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                        <div className="bg-green-500/10 p-2 rounded text-green-400"><Server size={20} /></div>
                        <div>
                            <h4 className="text-white font-bold text-sm">Tecnologia GovTech</h4>
                            <p className="text-xs text-gray-400 mt-1">Conexão direta com ANTT, Senatran e Receita.</p>
                        </div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                        <div className="bg-blue-500/10 p-2 rounded text-blue-400"><Gavel size={20} /></div>
                        <div>
                            <h4 className="text-white font-bold text-sm">Poder JusTech</h4>
                            <p className="text-xs text-gray-400 mt-1">Corte Arbitral Digital para resolução de conflitos e multas.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl animate-fade-in-up">
                <h3 className="text-2xl font-bold text-white mb-2">Acesse o Ecossistema</h3>
                <p className="text-gray-400 text-sm mb-6">Selecione sua operação para ativar a Inteligência Artificial dedicada.</p>

                <div className="space-y-3">
                    <button 
                        onClick={() => handlePersonaSelect('CARGO', 'TAC')}
                        className={`w-full p-5 rounded-xl border text-left flex items-center gap-4 transition-all group ${userContext?.macro === 'CARGO' ? 'bg-hlx-gold border-hlx-gold shadow-lg shadow-yellow-500/20' : 'bg-slate-800 border-white/5 hover:border-hlx-gold/50'}`}
                    >
                        <div className={`p-3 rounded-lg ${userContext?.macro === 'CARGO' ? 'bg-slate-900 text-hlx-gold' : 'bg-slate-900 text-gray-400 group-hover:text-white'}`}>
                            <Truck size={24} />
                        </div>
                        <div>
                            <h4 className={`font-bold text-base ${userContext?.macro === 'CARGO' ? 'text-slate-900' : 'text-white'}`}>Logística de Cargas</h4>
                            <p className={`text-xs ${userContext?.macro === 'CARGO' ? 'text-slate-800' : 'text-gray-500'}`}>RNTRC, CIOT, Seguros e Defesa de Multas.</p>
                        </div>
                        <ArrowRight className={`ml-auto ${userContext?.macro === 'CARGO' ? 'text-slate-900' : 'text-gray-600 group-hover:text-white'}`} size={18} />
                    </button>

                    <button 
                        onClick={() => handlePersonaSelect('PASSENGER', 'PASS_CHARTER_EVENTUAL')}
                        className={`w-full p-5 rounded-xl border text-left flex items-center gap-4 transition-all group ${userContext?.macro === 'PASSENGER' ? 'bg-hlx-blue border-hlx-blue shadow-lg shadow-blue-500/20' : 'bg-slate-800 border-white/5 hover:border-hlx-blue/50'}`}
                    >
                        <div className={`p-3 rounded-lg ${userContext?.macro === 'PASSENGER' ? 'bg-slate-900 text-hlx-blue' : 'bg-slate-900 text-gray-400 group-hover:text-white'}`}>
                            <Bus size={24} />
                        </div>
                        <div>
                            <h4 className={`font-bold text-base ${userContext?.macro === 'PASSENGER' ? 'text-slate-900' : 'text-white'}`}>Mobilidade de Passageiros</h4>
                            <p className={`text-xs ${userContext?.macro === 'PASSENGER' ? 'text-slate-800' : 'text-gray-500'}`}>TAF, Monitriip e Licenciamento Estadual.</p>
                        </div>
                        <ArrowRight className={`ml-auto ${userContext?.macro === 'PASSENGER' ? 'text-slate-900' : 'text-gray-600 group-hover:text-white'}`} size={18} />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
