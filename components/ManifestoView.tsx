
import React from 'react';
import { 
  ShieldCheck, Heart, Map, Gavel, GraduationCap, 
  ArrowRight, Gem, Sun, Star, Zap, Activity, Users,
  HeartHandshake, Scale, Compass, Milestone, Sparkles, Handshake, Layers, BookOpen, BrainCircuit
} from 'lucide-react';

interface ManifestoViewProps {
  onStart: () => void;
}

const ManifestoView: React.FC<ManifestoViewProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-hlx-gold selection:text-slate-950 font-sans">
      
      {/* HERO: A PONTE */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465447142348-e9952c393450?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/80 to-slate-950"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-slide-up">
           <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-hlx-gold/10 border border-hlx-gold/20 text-hlx-gold text-xs font-bold tracking-[0.3em] uppercase mb-8 animate-pulse">
              <Compass size={16} /> Visão Institucional
           </div>
           <h1 className="text-5xl md:text-8xl font-display font-bold leading-none mb-4 tracking-tighter text-white">
              HELONEX
           </h1>
           <h2 className="text-2xl md:text-4xl font-display text-hlx-gold mb-12 uppercase tracking-widest">Tecnologia & Humanidade</h2>
           <p className="text-xl md:text-3xl text-gray-200 font-light italic leading-relaxed mb-12">
             "Sistemas organizam dados.<br className="hidden md:block"/> Pessoas transformam o mundo."
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                onClick={() => document.getElementById('manifesto-content')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-sm tracking-widest uppercase"
              >
                Nossos Princípios
              </button>
              <button 
                onClick={onStart}
                className="px-8 py-4 bg-hlx-gold text-slate-950 font-bold rounded-xl shadow-2xl shadow-yellow-500/20 hover:bg-yellow-400 transition-all flex items-center justify-center gap-3 text-sm tracking-widest uppercase"
              >
                Acessar Plataforma
              </button>
           </div>
        </div>
      </section>

      {/* CONTEÚDO DO MANIFESTO FUNDACIONAL */}
      <section id="manifesto-content" className="py-24 px-4 bg-slate-950 relative">
        <div className="max-w-4xl mx-auto space-y-24">
          
          <div className="text-center space-y-6">
             <h3 className="text-hlx-gold font-bold uppercase tracking-widest">Carta de Princípios</h3>
             <h2 className="text-4xl md:text-6xl font-display font-bold text-white">A CONEXÃO</h2>
             <p className="text-lg text-gray-400 leading-relaxed italic">
                "A HELONEX é o elo entre a exigência regulatória e a realidade operacional. Simplificamos o complexo para que você foque no crescimento."
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-10 bg-slate-900/50 rounded-3xl border border-white/5 text-center">
                <Scale className="text-hlx-gold mx-auto mb-6" size={40} />
                <h4 className="font-bold text-white mb-4">Verdade dos Dados</h4>
                <p className="text-sm text-gray-400">Decisões baseadas em fatos e legislação, não em suposições. Auditoria técnica imparcial.</p>
             </div>
             <div className="p-10 bg-slate-900/50 rounded-3xl border border-white/5 text-center">
                <Heart className="text-red-500 mx-auto mb-6" size={40} />
                <h4 className="font-bold text-white mb-4">Foco no Humano</h4>
                <p className="text-sm text-gray-400">A tecnologia deve servir à vida. Priorizamos a segurança e a dignidade do operador.</p>
             </div>
             <div className="p-10 bg-slate-900/50 rounded-3xl border border-white/5 text-center">
                <Zap className="text-hlx-gold mx-auto mb-6" size={40} />
                <h4 className="font-bold text-white mb-4">Clareza Operacional</h4>
                <p className="text-sm text-gray-400">Combatemos a burocracia desnecessária com automatização inteligente e acessível.</p>
             </div>
          </div>

          {/* CAPÍTULO I: BLINDAGEM */}
          <div className="bg-slate-900 p-12 rounded-[3rem] border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5"><ShieldCheck size={200} /></div>
             <h4 className="text-hlx-gold font-bold text-xs uppercase tracking-widest mb-4">Capítulo I</h4>
             <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">Segurança e Compliance</h2>
             
             <div className="space-y-6">
                <div className="flex gap-4">
                   <div className="w-1.5 h-auto bg-hlx-gold rounded-full"></div>
                   <div>
                      <h5 className="font-bold text-white">Soberania de Dados</h5>
                      <p className="text-gray-400 text-sm">Seus dados pertencem a você. Utilizamos criptografia de ponta para garantir privacidade e controle.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-1.5 h-auto bg-hlx-gold rounded-full"></div>
                   <div>
                      <h5 className="font-bold text-white">Neutralidade Técnica</h5>
                      <p className="text-gray-400 text-sm">Nossos algoritmos de mediação e auditoria são isentos, focados estritamente na conformidade legal.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-1.5 h-auto bg-hlx-gold rounded-full"></div>
                   <div>
                      <h5 className="font-bold text-white">Prevenção de Riscos</h5>
                      <p className="text-gray-400 text-sm">Atuamos de forma preditiva, alertando sobre passivos antes que se tornem prejuízos.</p>
                   </div>
                </div>
             </div>
          </div>

          {/* CAPÍTULO II: GOVERNANÇA */}
          <div className="text-center space-y-12">
             <div className="inline-flex flex-col">
                <h4 className="text-hlx-gold font-bold text-xs uppercase tracking-widest mb-4">Capítulo II</h4>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white">Padrão de Governança</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="bg-slate-900 p-8 rounded-2xl border border-white/5">
                   <h5 className="text-white font-bold mb-2">Responsabilidade Corporativa</h5>
                   <p className="text-gray-400 text-sm italic">"Liberdade econômica com responsabilidade civil e ambiental."</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-2xl border border-white/5">
                   <h5 className="text-white font-bold mb-2">Transparência em Processos</h5>
                   <p className="text-gray-400 text-sm italic">"O que é público deve ser auditável. O que é estratégico deve ser protegido."</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-2xl border border-white/5">
                   <h5 className="text-white font-bold mb-2">Independência de Mercado</h5>
                   <p className="text-gray-400 text-sm italic">"A HELONEX mantém sua autonomia técnica para servir aos interesses dos seus usuários."</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-2xl border border-white/5">
                   <h5 className="text-white font-bold mb-2">Educação Contínua</h5>
                   <p className="text-gray-400 text-sm italic">"Transformamos falhas operacionais em oportunidades de aprendizado e melhoria."</p>
                </div>
             </div>
          </div>

          {/* FINAL JURAMENTO */}
          <div className="text-center py-12 border-t border-white/10">
             <div className="flex justify-center gap-8 mb-12">
                <div className="flex flex-col items-center">
                   <ShieldCheck className="text-hlx-gold mb-3" size={48} />
                   <p className="font-bold uppercase text-[10px] tracking-widest text-gray-500">Proteção Ativa</p>
                </div>
                <div className="flex flex-col items-center">
                   <GraduationCap className="text-hlx-gold mb-3" size={48} />
                   <p className="font-bold uppercase text-[10px] tracking-widest text-gray-500">Capacitação Real</p>
                </div>
                <div className="flex flex-col items-center">
                   <Handshake className="text-hlx-gold mb-3" size={48} />
                   <p className="font-bold uppercase text-[10px] tracking-widest text-gray-500">Acordos Justos</p>
                </div>
             </div>
             
             <button onClick={onStart} className="px-12 py-6 bg-white text-slate-950 font-black rounded-full text-xl shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 transition-all">
                CONCORDAR E INICIAR
             </button>
             
             <div className="mt-16 opacity-30">
                <h3 className="font-display font-bold text-2xl">HELONEX</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.5em]">Inteligência Logística Soberana</p>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ManifestoView;
