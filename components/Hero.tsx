
import React from 'react';
import { TrendingUp, Award, Coins, Gavel, CheckCircle, Radio, ArrowRight, Heart, ShieldCheck, PlayCircle, EyeOff, BrainCircuit, Smartphone, Activity, GraduationCap, Sun } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  onCtaClick: () => void;
  onNavigateToNews: () => void;
  onNavigateToRoadmap: () => void;
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, onNavigateToNews, onNavigateToRoadmap, language }) => {

  const t = {
    pt: {
      tags: ['Inovação 2026', 'Sistema Erro Zero', 'Auditoria Digital', 'Compliance', 'Blindagem'],
      title1: 'HELONEX BRASIL:',
      titleHighlight: 'Inteligência Logística de Próxima Geração',
      description: 'Transformamos a alta complexidade regulatória em lucro sustentável. "Não vendemos licenças, cuidamos de vidas." A maior GovTech para o transportador do planeta.',
      ctaPrimary: 'CONHECER O ECOSSISTEMA',
      ctaSecondary: 'Ver Roadmap Estratégico',
      footer: '* Tecnologia de Rastreabilidade de Dados e Conformidade Antecipada.',
    },
    es: {
      tags: ['Inovación 2026', 'Sistema Error Cero', 'Auditoría Digital', 'Compliance', 'Blindaje'],
      title1: 'HELONEX BRASIL:',
      titleHighlight: 'Inteligencia Logística de Próxima Generación',
      description: 'Transformamos la alta complejidad regulatoria en ventaja competitiva. "No vendemos licencias, cuidamos vidas." La mayor GovTech para el transporte.',
      ctaPrimary: 'CONOCER EL ECOSISTEMA',
      ctaSecondary: 'Ver Roadmap Estratégico',
      footer: '* Tecnología de Trazabilidad de Datos y Conformidad Anticipada.',
    }
  };

  const current = t[language];

  return (
    <div className="relative overflow-hidden bg-slate-950 border-b border-white/5 flex flex-col">
      
      {/* TICKER DE NOTÍCIAS */}
      <div 
        onClick={onNavigateToNews}
        className="bg-hlx-blue/20 border-b border-hlx-blue/20 backdrop-blur-md py-2 px-4 flex items-center justify-center sm:justify-between cursor-pointer hover:bg-hlx-blue/30 transition-all relative z-30 group flex-shrink-0"
      >
        <div className="flex items-center gap-2 text-hlx-blue">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>
          <Radio size={14} />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">HELONEX INFORMA:</span>
        </div>
        <div className="flex-1 mx-4 overflow-hidden hidden sm:block">
           <div className="animate-[marquee_25s_linear_infinite] whitespace-nowrap text-xs text-blue-200/90 font-medium">
             🚨 MARCO REGULATÓRIO: Fiscalização Responsiva (Res. 6.074) já está ativa • 🔍 Monitriip DIS 4.0 exige transmissão via API REST.
           </div>
        </div>
        <div className="flex items-center gap-1 text-hlx-blue text-[10px] sm:text-xs font-bold uppercase group-hover:translate-x-1 transition-transform">
          Ver Alertas <ArrowRight size={12} />
        </div>
      </div>

      {/* BACKGROUND VISUAL */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-hlx-blue/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-20 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* TEXTO E CTA */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-wrap gap-2">
              {current.tags.map((tag, idx) => (
                <div key={idx} className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-white/10 rounded-full shadow-sm backdrop-blur-sm">
                  <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-hlx-gold' : 'bg-hlx-blue'}`}></div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-300">{tag}</span>
                </div>
              ))}
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] text-white tracking-tight">
              {current.title1} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hlx-gold to-orange-500">
                {current.titleHighlight}
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed border-l-4 border-hlx-blue pl-6 py-2">
              {current.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onCtaClick}
                className="px-8 py-4 bg-gradient-to-r from-hlx-blue to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold rounded-lg shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 group"
              >
                <BrainCircuit size={20} /> 
                {current.ctaPrimary}
              </button>
              
              <button 
                onClick={onNavigateToRoadmap}
                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white font-bold rounded-lg border border-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-3 backdrop-blur-sm group"
              >
                <Activity size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                {current.ctaSecondary}
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 flex items-center gap-2 opacity-70">
              <CheckCircle size={14} className="text-green-500" />
              {current.footer}
            </p>
          </div>

          {/* DASHBOARD PREVIEW */}
          <div className="relative hidden lg:block animate-fade-in-up delay-200">
            <div className="relative bg-slate-900/60 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl overflow-hidden group hover:border-hlx-blue/30 transition-colors">
              
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-hlx-blue/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-hlx-blue to-blue-900 p-3 rounded-xl text-white shadow-lg">
                    <Sun size={28} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">Monitor HELONEX</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Gestão 360 de Ativos</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-green-400">ONLINE</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950/80 rounded-xl p-4 border border-hlx-blue/20 flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-hlx-blue border border-white/5">
                      <ShieldCheck size={24} />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between mb-1">
                         <h4 className="text-sm font-bold text-white">GovTech (Conformidade)</h4>
                         <span className="text-xs text-hlx-blue font-mono">100%</span>
                      </div>
                      <p className="text-xs text-gray-500">Documentação ANTT e Seguros em dia.</p>
                   </div>
                </div>

                <div className="bg-slate-900/80 rounded-xl p-4 border border-white/5 flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-hlx-gold border border-white/5">
                      <TrendingUp size={24} />
                   </div>
                   <div className="flex-1">
                      <h4 className="text-sm font-bold text-white">GesTech (Eficiência)</h4>
                      <p className="text-xs text-gray-400">Redução de custos operacionais detectada.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CORE PILARES */}
      <div className="bg-slate-900/80 border-t border-white/10 backdrop-blur-md relative z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            <div className="py-6 px-4 flex flex-col items-center text-center group cursor-pointer hover:bg-slate-800/50 transition-colors">
               <div className="text-green-400 mb-2 group-hover:scale-110 transition-transform"><Smartphone size={24} /></div>
               <h3 className="text-white font-bold text-sm">GovTech</h3>
               <p className="text-[10px] text-gray-500 uppercase tracking-wider">Regulatório 2026</p>
            </div>
            <div className="py-6 px-4 flex flex-col items-center text-center group cursor-pointer hover:bg-slate-800/50 transition-colors">
               <div className="text-hlx-blue mb-2 group-hover:scale-110 transition-transform"><Gavel size={24} /></div>
               <h3 className="text-white font-bold text-sm">JusTech</h3>
               <p className="text-[10px] text-gray-500 uppercase tracking-wider">Defesa & Compliance</p>
            </div>
            <div className="py-6 px-4 flex flex-col items-center text-center group cursor-pointer hover:bg-slate-800/50 transition-colors">
               <div className="text-purple-400 mb-2 group-hover:scale-110 transition-transform"><Activity size={24} /></div>
               <h3 className="text-white font-bold text-sm">GestTech</h3>
               <p className="text-[10px] text-gray-500 uppercase tracking-wider">Qualidade & Frota</p>
            </div>
            <div className="py-6 px-4 flex flex-col items-center text-center group cursor-pointer hover:bg-slate-800/50 transition-colors">
               <div className="text-hlx-gold mb-2 group-hover:scale-110 transition-transform"><GraduationCap size={24} /></div>
               <h3 className="text-white font-bold text-sm">EduTech</h3>
               <p className="text-[10px] text-gray-500 uppercase tracking-wider">Academia Híbrida</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
