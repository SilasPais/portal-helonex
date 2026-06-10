
import React from 'react';
import { Hammer, Scale, Heart, Lightbulb, ShieldCheck, Sun } from 'lucide-react';

const principles = [
  { 
    term: "SOBERANIA", 
    translation: "Autonomia Operacional", 
    description: "O usuário recupera o controle total de seus dados e decisões, sem dependência de terceiros.", 
    icon: Sun, 
    color: "text-white" 
  },
  { 
    term: "AVODÁ", 
    translation: "Excelência no Serviço", 
    description: "Trabalhar não é apenas bater ponto; é servir com técnica, precisão e cuidado extremo.", 
    icon: Hammer, 
    color: "text-hlx-gold" 
  },
  { 
    term: "YOSHER", 
    translation: "Integridade de Dados", 
    description: "Transparência radical. Algoritmos que não mentem e processos sem letras miúdas.", 
    icon: Scale, 
    color: "text-blue-400" 
  },
  { 
    term: "TZEDAKÁ", 
    translation: "Justiça Econômica", 
    description: "Democratizar a alta tecnologia para que o pequeno transportador compita de igual para igual.", 
    icon: Heart, 
    color: "text-red-400" 
  },
  { 
    term: "CHOCHMÁ", 
    translation: "Inteligência Estratégica", 
    description: "Uso de dados para antecipar problemas. Sair da reação e entrar na predição.", 
    icon: Lightbulb, 
    color: "text-yellow-400" 
  },
  { 
    term: "PRUDÊNCIA", 
    translation: "Gestão de Risco", 
    description: "Vigilância ativa e compliance. Blindagem patrimonial através da conformidade.", 
    icon: ShieldCheck, 
    color: "text-green-400" 
  }
];

const PhilosophySection: React.FC = () => {
  return (
    <div className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-hlx-gold/10 border border-hlx-gold/30 text-hlx-gold text-xs font-bold uppercase tracking-widest mb-6">
           <Sun size={14} /> Diretrizes do Código-Fonte
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
          Nossos <span className="text-hlx-gold">Valores</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-16">
          A tecnologia da Helonex é construída sobre alicerces éticos sólidos. Processamos a complexidade do mercado para devolver ordem, segurança e resultado.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="bg-slate-900/50 border border-white/5 rounded-2xl p-8 hover:border-hlx-gold/30 transition-all group hover:-translate-y-1 duration-300">
                <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-hlx-gold mb-6 group-hover:scale-110 transition-transform mx-auto border border-white/5 shadow-lg">
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-tighter">{p.term}</h3>
                <p className="text-[10px] font-mono text-hlx-blue uppercase mb-4 font-bold tracking-widest">{p.translation}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhilosophySection;
