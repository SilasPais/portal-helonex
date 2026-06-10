
import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, Globe, BrainCircuit, Anchor, CheckCircle2, 
  ArrowRight, DollarSign, Layers, Megaphone, HeartHandshake, FileText, Scale, Siren,
  GraduationCap, Zap, Gavel, Cpu
} from 'lucide-react';

interface SolutionShowcaseProps {
  onNavigateToLogin: () => void;
  onNavigateToPlans: () => void;
}

const SolutionShowcase: React.FC<SolutionShowcaseProps> = ({ onNavigateToLogin, onNavigateToPlans }) => {
  
  return (
    <div className="bg-slate-950 min-h-screen w-full overflow-x-hidden">
      
      {/* SEÇÃO DE IDENTIDADE & DIFERENCIAIS */}
      <div className="py-24 bg-gradient-to-b from-slate-950 to-hlx-navy relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                  Por que a Helonex é <span className="text-hlx-gold">Única?</span>
               </h2>
               <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                  Criamos uma nova categoria de inteligência logística. 
                  Combinamos tecnologia governamental, jurídico preditivo e educação de elite para potencializar seus resultados.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               
               {/* DIFERENCIAL 1: JUS-TECH / MULTAS */}
               <div className="bg-slate-900 border border-red-500/20 p-8 rounded-2xl hover:border-red-500/50 transition-all group relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 bg-red-500/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
                  <Gavel size={40} className="text-red-500 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">Defesa Implacável</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                     Nossa IA analisa cada milímetro da notificação. Se encontrarmos erro formal, anulamos.
                  </p>
                  <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-lg">
                     <p className="text-xs text-red-200 font-bold flex items-center gap-2">
                        <Zap size={12} /> Garantia SNE 40%
                     </p>
                     <p className="text-[10px] text-red-300 mt-1">
                        Habilitamos o desconto oficial de 40% via SNE instantaneamente caso o recurso não seja estratégico.
                     </p>
                  </div>
               </div>

               {/* DIFERENCIAL 2: GOV-TECH / INTEGRAÇÃO */}
               <div className="bg-slate-900 border border-green-500/20 p-8 rounded-2xl hover:border-green-500/50 transition-all group relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 bg-green-500/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all"></div>
                  <Cpu size={40} className="text-green-500 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">Conexão GovTech</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                     Integração nativa com ANTT, Senatran e Receita Federal. Seus dados trafegam por vias expressas digitais.
                  </p>
                  <ul className="text-xs text-gray-300 space-y-2">
                     <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500"/> RNTRC em tempo real</li>
                     <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-green-500"/> Validação de CNH diária</li>
                  </ul>
               </div>

               {/* DIFERENCIAL 3: MÉTODO IDT (EDUCAÇÃO) */}
               <div className="bg-slate-900 border border-purple-500/20 p-8 rounded-2xl hover:border-purple-500/50 transition-all group relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 bg-purple-500/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
                  <GraduationCap size={40} className="text-purple-500 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">Método IDT</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                     "Inteligência Direcionada ao Transporte". Não formamos alunos, formamos Operadores de Elite.
                  </p>
                  
                  {/* IDT Animation/Graphic */}
                  <div className="flex items-center justify-between bg-slate-950/50 p-3 rounded-lg border border-purple-500/20 mb-4">
                     <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-[8px] text-purple-400 font-bold">DATA</div>
                        <span className="text-[8px] text-gray-500 mt-1 uppercase">Entrada</span>
                     </div>
                     <ArrowRight size={12} className="text-purple-500 animate-pulse" />
                     <div className="flex flex-col items-center">
                        <Cpu size={14} className="text-purple-400 animate-spin-slow" />
                        <span className="text-[8px] text-gray-500 mt-1 uppercase">Processo</span>
                     </div>
                     <ArrowRight size={12} className="text-purple-500 animate-pulse" />
                     <div className="flex flex-col items-center">
                        <GraduationCap size={14} className="text-hlx-gold" />
                        <span className="text-[8px] text-gray-500 mt-1 uppercase">Curso</span>
                     </div>
                  </div>

                  <p className="text-xs text-purple-300 bg-purple-500/10 p-2 rounded border border-purple-500/20">
                     Cursos que geram dinheiro imediato, não apenas certificados de parede.
                  </p>
               </div>

               {/* DIFERENCIAL 4: RIQUEZA / RESULTADO */}
               <div className="bg-slate-900 border border-hlx-gold/20 p-8 rounded-2xl hover:border-hlx-gold/50 transition-all group relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 bg-hlx-gold/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-hlx-gold/20 transition-all"></div>
                  <DollarSign size={40} className="text-hlx-gold mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">Gerador de Riqueza</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                     Transformamos passivos (multas, processos) em ativos (compliance, economia, eficiência).
                  </p>
                  <div className="text-center">
                     <p className="text-3xl font-bold text-white">ROI 10x</p>
                     <p className="text-[10px] text-gray-500 uppercase">Retorno sobre Investimento</p>
                  </div>
               </div>

            </div>
         </div>
      </div>

      {/* ROI & CTA FINAL */}
      <div className="py-20 bg-slate-950 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-display font-bold text-white mb-8">
            O Acervo Helonex está à sua disposição.
          </h3>
          <p className="text-gray-400 mb-12 text-lg">
            Mais de 50 ferramentas integradas. Do cálculo de frete à defesa jurídica no STF. 
            Tudo em uma única assinatura.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={onNavigateToLogin}
              className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors border border-white/10 flex items-center justify-center gap-2"
            >
              Acessar Minha Conta
            </button>
            <button 
              onClick={onNavigateToPlans}
              className="px-10 py-4 bg-hlx-gold text-slate-900 font-bold rounded-xl hover:bg-yellow-400 shadow-xl shadow-yellow-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Liberar Acesso Total <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SolutionShowcase;
