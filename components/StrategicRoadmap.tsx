
import React from 'react';
import { 
  ArrowRight, ShieldAlert, Cpu, HeartHandshake, TrendingUp, Gem, 
  ChevronDown, Target, Zap, Briefcase, Lock, CheckCircle2, Gavel, Smartphone, Globe, Activity, LayoutGrid
} from 'lucide-react';

interface StrategicRoadmapProps {
  onCtaClick: () => void;
  onBack: () => void;
}

const pillars = [
  {
    id: 'JusTech',
    title: 'JusTech',
    subtitle: 'Auditoria Jurídica & Blindagem',
    description: 'Varredura exaustiva e síncrona de todas as bases governamentais (SENATRAN, ANTT, DNIT). Nossa IA identifica vícios formais (ex: falta de aferição do INMETRO) e aplica a Autodenúncia (Res. 6.074) para converter multas em advertência.',
    icon: <Gavel size={40} />,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    tags: ['40% Desconto SNE', 'IA de Nulidade', '100% Cobertura']
  },
  {
    id: 'GovTech',
    title: 'GovTech',
    subtitle: 'Conformidade Governamental 2026',
    description: 'Domínio completo sobre o novo Marco Regulatório. Emissão automática de RNTRC Digital, DT-e e integração com o barramento de Seguros (Lei 14.599). O Monitriip DIS 4.0 audita a transmissão de logs via API REST.',
    icon: <Smartphone size={40} />,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    tags: ['RNTRC Digital', 'Interoperabilidade', 'Monitriip DIS 4.0']
  },
  {
    id: 'GestTech',
    title: 'GestTech',
    subtitle: 'Sistema Erro Zero & Qualidade',
    description: 'Gestão baseada em Balanced Scorecard (BSC) e ISO 9000. O módulo SASSMAQ Nexus utiliza visão computacional para detectar comportamento de risco, fadiga e uso de EPIs no pátio em tempo real.',
    icon: <Activity size={40} />,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    tags: ['BSC 2026', 'ISO 9000', 'SASSMAQ Nexus']
  },
  {
    id: 'EduTech',
    title: 'EduTech',
    subtitle: 'Academia Inteligente & Híbrida',
    description: 'A primeira academia que cria o curso para você. Tecnologia generativa monta grades exclusivas baseadas na necessidade da frota (TAC, ETC, Internacional), com interação síncrona entre humanos e IA.',
    icon: <Globe size={40} />,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    tags: ['IA Generativa', 'Personalização', 'Híbrido']
  }
];

const StrategicRoadmap: React.FC<StrategicRoadmapProps> = ({ onCtaClick, onBack }) => {
  return (
    <div className="bg-slate-950 min-h-screen text-white relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-rose-900/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        
        {/* Header Storytelling - "Inteligência Acoplada" */}
        <div className="text-center mb-20 animate-fade-in-up">
          <button onClick={onBack} className="text-gray-500 hover:text-white mb-8 text-sm flex items-center justify-center gap-2 mx-auto transition-colors">
             ← Voltar ao Início
          </button>
          
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-widest mb-6">
             <Target size={14} /> Metodologia Proprietária HELONEX
          </div>
          
          <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight mb-8">
            Visão Estratégica: <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">Inteligência Acoplada</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-center text-left max-w-5xl mx-auto mb-16">
             <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 relative backdrop-blur-sm shadow-xl">
                <p className="text-lg text-gray-300 leading-relaxed mb-6 font-light">
                   A HELONEX <strong>não é um software</strong> de gestão logística tradicional nem um serviço de despachante. 
                   <br/><br/>
                   Somos o <strong className="text-white">Cérebro de Auditoria e Conformidade</strong> do transporte brasileiro, transformando informação bruta em decisões estratégicas.
                </p>
                <div className="border-l-4 border-rose-500 pl-4">
                   <p className="text-sm text-gray-400 italic">
                      "O transportador não precisa migrar seu software atual — ele instala a HELONEX para blindar seu jurídico e automatizar a conformidade."
                   </p>
                </div>
             </div>

             <div className="relative">
                {/* Visual Representation of "Coupled Intelligence" */}
                <div className="absolute inset-0 bg-rose-500/10 blur-[60px] rounded-full"></div>
                <div className="relative bg-slate-900 rounded-2xl border border-rose-500/30 p-6 flex flex-col items-center gap-4 shadow-2xl">
                   {/* Top Layer (Helonex) */}
                   <div className="w-full bg-gradient-to-r from-rose-600 to-orange-600 rounded-xl p-4 text-center shadow-lg transform translate-y-2 z-10 border border-white/10">
                      <Cpu size={32} className="mx-auto text-white mb-2" />
                      <h3 className="text-white font-bold text-lg">HELONEX CORE</h3>
                      <p className="text-[10px] text-white/80 uppercase font-bold tracking-widest">Camada de Inteligência</p>
                   </div>
                   
                   {/* Connector */}
                   <div className="h-8 w-px border-l-2 border-dashed border-rose-500/50"></div>
                   
                   {/* Bottom Layer (ERPs) */}
                   <div className="w-full bg-slate-800 rounded-xl p-4 text-center border border-white/5 opacity-80">
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2">Sistemas Compatíveis (Nativo)</p>
                      <div className="flex justify-center gap-4 text-gray-400 font-bold text-sm">
                         <span>TOTVS</span>
                         <span>•</span>
                         <span>SENIOR</span>
                         <span>•</span>
                         <span>BSOFT</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="mt-8">
             <ChevronDown className="mx-auto text-gray-600 animate-bounce" size={32} />
          </div>
        </div>

        {/* The 4 Pillars Grid (Bento Style) */}
        <div className="mb-8 text-center">
           <h2 className="text-2xl font-bold text-white mb-8 flex items-center justify-center gap-2">
              <LayoutGrid className="text-hlx-gold" /> Os 4 Pilares da Soberania
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {pillars.map((pillar) => (
            <div key={pillar.id} className={`bg-slate-900 border ${pillar.border} p-8 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 shadow-2xl flex flex-col`}>
               {/* Background Glow */}
               <div className={`absolute -top-20 -right-20 w-64 h-64 ${pillar.bg} rounded-full blur-[80px] group-hover:blur-[60px] transition-all`}></div>
               
               <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-4 mb-6">
                     <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${pillar.bg} ${pillar.color} shadow-lg border border-white/10`}>
                        {pillar.icon}
                     </div>
                     <div>
                        <h3 className="text-3xl font-display font-bold text-white leading-none">{pillar.title}</h3>
                        <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${pillar.color}`}>{pillar.subtitle}</p>
                     </div>
                  </div>
                  
                  <p className="text-gray-300 text-base leading-relaxed mb-6 border-l-2 border-white/10 pl-4">
                     {pillar.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                     {pillar.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold bg-slate-950/50 border border-white/10 px-3 py-1.5 rounded-lg text-gray-300 shadow-sm">
                           {tag}
                        </span>
                     ))}
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Final Call to Action - Beyond Time */}
        <div className="mt-24 text-center bg-gradient-to-r from-slate-900 to-rose-900/20 rounded-3xl p-12 border border-rose-500/20 relative overflow-hidden shadow-2xl animate-fade-in-up delay-300">
           <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <Briefcase size={200} />
           </div>
           
           <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 relative z-10">
              HELONEX Global: <span className="text-rose-400">Beyond Time</span>
           </h2>
           <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto relative z-10">
              Ao consolidar a rastreabilidade absoluta dos dados e chancelar o transportador com o GuardianSeal, a HELONEX deixa de ser apenas uma ferramenta para se tornar a infraestrutura de confiança soberana para 2026.
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <button 
                onClick={onCtaClick}
                className="px-8 py-4 bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold rounded-xl shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 transition-transform hover:-translate-y-1"
              >
                <Lock size={18} />
                TRANSFORME SEU TRANSPORTE
              </button>
              <button 
                onClick={onBack}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                Fale com Especialista
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default StrategicRoadmap;
