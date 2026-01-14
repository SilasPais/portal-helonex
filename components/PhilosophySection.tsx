
import React from 'react';
import { Hammer, Scale, Heart, Lightbulb, ShieldCheck, Award, Briefcase, Quote, Handshake, Users } from 'lucide-react';

const PhilosophySection: React.FC = () => {
  const principles = [
    {
      term: "AVODÁ",
      translation: "Trabalho & Serviço",
      icon: <Hammer size={32} />,
      description: "Excelência no servir. Para nós, o trabalho não é apenas esforço físico, é um serviço sagrado à comunidade. Cada licença emitida é uma família sustentada."
    },
    {
      term: "YOSHER",
      translation: "Integridade & Retidão",
      icon: <Scale size={32} />,
      description: "Reputação acima do lucro. Transparência total nos processos. Sem letras miúdas, sem atalhos perigosos. A confiança é a moeda mais forte do transportador."
    },
    {
      term: "TZEDAKÁ",
      translation: "Justiça Social",
      icon: <Heart size={32} />,
      description: "Compartilhar o sucesso. Entendemos que o cliente muitas vezes usa suas últimas reservas para se regularizar. Nossa missão é garantir que esse investimento dê retorno."
    },
    {
      term: "CHOCHMÁ",
      translation: "Sabedoria Estratégica",
      icon: <Lightbulb size={32} />,
      description: "Integração Homem-Máquina. Utilizamos IA Generativa para transformar dados brutos em decisões inteligentes, aumentando o QI da sua transportadora."
    },
    {
      term: "PRUDÊNCIA",
      translation: "Conceito Erro Zero",
      icon: <ShieldCheck size={32} />,
      description: "Sustentabilidade através da prevenção. Nossa metodologia busca o Erro Zero em conformidade e segurança, blindando a operação de riscos previsíveis."
    }
  ];

  return (
    <div className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-5 pointer-events-none">
         <div className="absolute top-20 left-20 w-64 h-64 border border-hlx-gold/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
         <div className="absolute bottom-20 right-20 w-96 h-96 border border-hlx-blue/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-hlx-gold/10 border border-hlx-gold/30 text-hlx-gold text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]">
               <Award size={16} /> Filosofia Corporativa
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
            O Código da <span className="text-hlx-gold">Prosperidade</span>
          </h2>

          {/* DEFINIÇÃO MESTRA (MANIFESTO) */}
          <div className="max-w-4xl mx-auto bg-slate-900/50 border border-white/10 rounded-2xl p-8 relative backdrop-blur-sm">
             <Quote className="absolute top-6 left-6 text-hlx-gold/20 transform -scale-x-100" size={48} />
             <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-serif italic relative z-10">
               "A Filosofia Helonex é a crença de que a Burocracia não deve ser um obstáculo, mas um Fosso Competitivo. 
               Fundimos <strong className="text-white">Alta Tecnologia Regulatória (GovTech)</strong> com <strong className="text-white">Valores Éticos Milenares</strong> para 
               transformar passivos jurídicos em ativos de prosperidade."
             </p>
          </div>
        </div>

        {/* GRID DOS PILARES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {principles.map((p, idx) => (
            <div key={idx} className="bg-slate-900 border border-white/5 rounded-2xl p-8 hover:border-hlx-gold/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 {p.icon}
              </div>
              <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-hlx-gold mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/20 border border-white/5">
                {p.icon}
              </div>
              <div className="flex flex-col mb-4">
                <h3 className="text-2xl font-display font-bold text-white">{p.term}</h3>
                <span className="text-xs font-mono text-hlx-blue uppercase tracking-wider font-bold">
                  {p.translation}
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                {p.description}
              </p>
            </div>
          ))}
          
          <div className="bg-gradient-to-br from-hlx-blue to-slate-900 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-2xl md:col-span-3 lg:col-span-1 border border-white/10 group relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="bg-white/10 p-4 rounded-full mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500">
               <Briefcase size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-4 relative z-10">Compromisso Ético</h3>
            <p className="text-white/80 mb-6 font-medium text-sm relative z-10">
              Ao usar nossa plataforma, você se conecta a uma rede que valoriza o trabalho honesto e a legalidade como formas de ascensão social.
            </p>
            <div className="text-xs text-hlx-gold font-bold uppercase tracking-widest border-t border-white/10 pt-4 w-full relative z-10">
              Ecossistema HELONEX Global
            </div>
          </div>
        </div>

        {/* --- NOVO BLOCO: COMPROMISSO DE RIQUEZA (REGRA DO GANHA-GANHA) --- */}
        <div className="mt-20 max-w-5xl mx-auto">
           <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
              
              {/* Decorative Background */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-hlx-gold/10 rounded-full blur-[80px]"></div>

              <div className="relative z-10 flex flex-col items-center">
                 <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                    <Handshake size={32} className="text-white" />
                 </div>
                 
                 <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-6">
                    A Regra do <span className="text-green-400">Ganha-Ganha</span> em Ação
                 </h3>
                 
                 <div className="max-w-3xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed font-light">
                    <p>
                       "Nosso compromisso é <strong>gerar riqueza</strong> do indivíduo, da sua família, da sociedade onde ele está inserido, das organizações empresariais do País e da nação como um todo."
                    </p>
                    <p>
                       Acreditamos que vivemos em um ecossistema onde todos devem se beneficiar dos resultados que geramos. 
                       Trabalhamos incansavelmente para diminuir as diferenças sociais e promover a <strong>Justiça Social</strong> através da prosperidade compartilhada.
                    </p>
                 </div>

                 <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-white/5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                       <Users size={14} /> Família & Sociedade
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-white/5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                       <Award size={14} /> Organizações Fortes
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-white/5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                       <ShieldCheck size={14} /> Justiça Social
                    </span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default PhilosophySection;
