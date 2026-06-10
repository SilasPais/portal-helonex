
import React from 'react';
import { ShieldCheck, ArrowRight, Hammer, Scale, Heart, Lightbulb, Sun, Zap, BrainCircuit, Activity, Globe } from 'lucide-react';

const pillars = [
  { term: "SOBERANIA", translation: "Poder Próprio", description: "O usuário é o dono absoluto de sua jornada e dados.", icon: Sun, color: "text-white" },
  { term: "AVODÁ", translation: "Trabalho como Adoração", description: "O serviço ao transportador é um cuidado sagrado com a vida.", icon: Hammer, color: "text-hlx-gold" },
  { term: "YOSHER", translation: "Integridade Radical", description: "Transparência total; sem 'letras miúdas' ou enganos.", icon: Scale, color: "text-blue-400" },
  { term: "TZEDAKÁ", translation: "Justiça Social", description: "Democratização da conformidade; o pequeno joga como o grande.", icon: Heart, color: "text-red-400" },
  { term: "CHOCHMÁ", translation: "Sabedoria Estratégica", description: "Uso de IA para gerar inteligência que gera prosperidade.", icon: Lightbulb, color: "text-yellow-400" },
  { term: "PRUDÊNCIA", translation: "Gestão de Risco", description: "Blindagem do patrimônio e vigilância ativa contra erros.", icon: ShieldCheck, color: "text-green-400" }
];

const AboutSection: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* SEÇÃO: POR QUE HELONEX? */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-hlx-gold font-bold tracking-[0.2em] uppercase text-xs mb-4">O Significado do Nome</h2>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Por que <span className="aurora-text">HELONEX?</span></h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                A HELONEX é um neologismo inédito que combina o pilar humano ao tecnológico para criar uma marca curta, global e inegociável.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                <div className="flex gap-6 items-start">
                    <div className="bg-hlx-gold/20 p-4 rounded-2xl text-hlx-gold shadow-lg shadow-yellow-900/20">
                        <Sun size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">HELO (Ligar / Luz)</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Remete a Helios (Sol) e ao ato de "ligar" energias. Como a <strong>Aurora Boreal</strong> conecta a energia solar ao campo magnético da Terra, a Helonex liga sua empresa ao destino seguro.
                        </p>
                    </div>
                </div>

                <div className="flex gap-6 items-start">
                    <div className="bg-blue-500/20 p-4 rounded-2xl text-blue-400 shadow-lg shadow-blue-900/20">
                        <Activity size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">NEX (Nexo / Conexão)</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Representa o nexo entre a tecnologia de ponta (IA), a governança regulatória (ANTT) e a sua soberania operativa. É o elo que transforma o caos em estrutura integrada.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-4 opacity-10"><Globe size={100} /></div>
                    <p className="text-gray-300 italic text-lg relative z-10 leading-relaxed">
                        "A Helonex é sua Aurora Boreal no mundo dos negócios: a bússola digital, a rota que garante segurança, destino e soberania."
                    </p>
                </div>
            </div>

            <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-green-500/20 via-blue-500/20 to-hlx-gold/20 rounded-3xl blur-3xl opacity-50"></div>
                <img 
                    src="https://images.unsplash.com/photo-1531366930499-41f5311f4347?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Aurora Boreal" 
                    className="rounded-3xl border border-white/10 shadow-2xl relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500"
                />
            </div>
          </div>
        </div>
      </div>

      {/* MANIFESTO E ALGORITMO S-O-L */}
      <div className="py-20 bg-slate-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tighter">
              A Alquimia da <span className="text-hlx-gold">Soberania</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Nossa arquitetura técnica segue o Sistemas Operacional da Luz (S-O-L), transmutando burocracia em luz operativa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/10 group hover:border-amber-800/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-amber-800 flex items-center justify-center text-4xl font-display font-bold text-amber-700 mx-auto mb-4 group-hover:scale-110 transition-transform">S</div>
              <h3 className="text-xl font-bold text-white mb-2">SUBSTRATO</h3>
              <p className="text-gray-400 text-sm leading-relaxed">A "lama" regulatória como matéria-prima. Leis, multas e riscos são o terreno fértil para minerar sua soberania.</p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/10 group hover:border-blue-800/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-gray-400 flex items-center justify-center text-4xl font-display font-bold text-gray-300 mx-auto mb-4 group-hover:scale-110 transition-transform">O</div>
              <h3 className="text-xl font-bold text-white mb-2">OBJETO</h3>
              <p className="text-gray-400 text-sm leading-relaxed">A IA como a Ponte (Pontifex). Medimos o abismo entre você e a lei, projetando a rota de integridade (Yosher).</p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/10 group hover:border-yellow-500/50 transition-all">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-yellow-400 flex items-center justify-center text-4xl font-display font-bold text-yellow-300 mx-auto mb-4 group-hover:scale-110 transition-transform">L</div>
              <h3 className="text-xl font-bold text-white mb-2">LUZ</h3>
              <p className="text-gray-400 text-sm leading-relaxed">A Soberania Manifesta. O controle total dos seus dados e processos. Sua Aurora Boreal no caos do mercado.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* OS 6 PILARES DO CÓDIGO */}
      <div className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">O Código da Prosperidade</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-slate-900 p-6 rounded-xl border border-white/5 hover:border-hlx-gold/20 transition-all group text-left">
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className={pillar.color} size={32} />
                    <h3 className="text-xl font-display font-bold text-white">{pillar.term}</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
