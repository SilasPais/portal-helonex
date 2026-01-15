
import React from 'react';
import { Hammer, Scale, Heart, Lightbulb, ShieldCheck, Award, Briefcase, Quote, Handshake, Users } from 'lucide-react';

const PhilosophySection: React.FC = () => {
  const principles = [
    {
      term: "AVODÁ",
      translation: "Trabalho & Serviço",
      icon: <Hammer size={32} />,
      description: "Excelência no servir. Para nós, o trabalho é um serviço sagrado. Cada processo regularizado é uma família protegida e um negócio que prospera."
    },
    {
      term: "YOSHER",
      translation: "Integridade & Retidão",
      icon: <Scale size={32} />,
      description: "Reputação acima do lucro. Transparência total. Sem atalhos perigosos. A confiança é a base da segurança jurídica no transporte."
    },
    {
      term: "TZEDAKÁ",
      translation: "Justiça Social",
      icon: <Heart size={32} />,
      description: "Equilíbrio e prosperidade. Garantimos que seu investimento em conformidade retorne como segurança patrimonial e valor de mercado."
    },
    {
      term: "CHOCHMÁ",
      translation: "Sabedoria Estratégica",
      icon: <Lightbulb size={32} />,
      description: "Inteligência acoplada. Usamos IA para decifrar a burocracia, transformando passivos regulatórios em vantagens competitivas reais."
    },
    {
      term: "PRUDÊNCIA",
      translation: "Gestão Erro Zero",
      icon: <ShieldCheck size={32} />,
      description: "Prevenção como estratégia. Nossa metodologia blinda a operação contra riscos previsíveis através de auditoria contínua."
    }
  ];

  return (
    <div className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-hlx-gold/10 border border-hlx-gold/30 text-hlx-gold text-xs font-bold tracking-widest uppercase mb-6">
             <Award size={16} /> O Código da Prosperidade
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
            Fundamentos do <span className="text-hlx-gold">Ecossistema HELONEX</span>
          </h2>
          <div className="max-w-4xl mx-auto bg-slate-900/50 border border-white/10 rounded-2xl p-8 relative backdrop-blur-sm shadow-2xl">
             <Quote className="absolute top-6 left-6 text-hlx-gold/20" size={48} />
             <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-serif italic relative z-10">
               "Acreditamos que a Burocracia não é um obstáculo, mas um Campo de Batalha onde a Inteligência vence a Ineficiência. 
               Cuidamos de vidas através da Tecnologia Soberana."
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-16">
          {principles.map((p, idx) => (
            <div key={idx} className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-hlx-gold/30 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-hlx-gold mb-4 group-hover:scale-110 transition-transform shadow-lg border border-white/5">
                {p.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-1">{p.term}</h3>
              <p className="text-[10px] font-mono text-hlx-blue uppercase tracking-widest mb-3">{p.translation}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-5xl mx-auto">
           <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                 <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                    <Handshake size={32} className="text-white" />
                 </div>
                 <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-6">
                    Compromisso com a <span className="text-green-400">Geração de Riqueza</span>
                 </h3>
                 <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                    Nosso ecossistema existe para gerar riqueza para o indivíduo, sua família e para a nação. 
                    Promovemos a **Justiça Social** transformando transportadores informais em empresários de elite.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PhilosophySection;
