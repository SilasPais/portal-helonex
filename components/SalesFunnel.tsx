import React from 'react';
import { CheckCircle, Zap, Shield, Globe, Lock, ArrowRight, PlayCircle, Truck, Bus, Anchor, Layers, Calculator, Crown, Sun, Briefcase } from 'lucide-react';

interface SalesFunnelProps {
  onBuyAccess: () => void;
  onBack: () => void;
}

const SalesFunnel: React.FC<SalesFunnelProps> = ({ onBuyAccess, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      
      <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-center bg-[url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="absolute inset-0 bg-slate-900/90 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-900"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto animate-fade-in-up">
          <span className="inline-block py-1.5 px-4 rounded-full bg-hlx-blue/20 text-hlx-blue border border-hlx-blue/30 text-xs font-bold uppercase tracking-widest mb-6 flex items-center justify-center gap-2 w-fit mx-auto">
            <Shield size={14} /> GovTech & Legal Tech
          </span>
          <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight mb-8">
            Assuma o Controle da<br/>
            <span className="text-hlx-gold">Sua Transportadora.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Abandone a ineficiência. Tenha acesso direto ao sistema que organiza sua frota, monitora vencimentos e treina sua equipe com a inteligência do <strong>Ecossistema HELONEX</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onBuyAccess}
              className="group relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-slate-900 transition-all duration-200 bg-hlx-gold rounded-lg hover:bg-yellow-400 shadow-lg shadow-yellow-500/20"
            >
              ATIVAR SISTEMA PRO
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onBack}
              className="inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-white transition-all duration-200 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
            >
              Conhecer a Metodologia
            </button>
          </div>
        </div>
      </div>

      <div className="py-20 bg-slate-950 border-t border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white">O Custo da Desinformação</h2>
            <p className="text-gray-400 mt-4">Comparativo real entre o modelo analógico e o modelo tecnológico HELONEX.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
             <div className="bg-slate-900/50 p-8 rounded-2xl border border-red-500/20 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
               <h3 className="text-red-400 font-bold text-xl mb-6 flex items-center gap-2">
                 <span className="text-red-500 text-2xl">×</span> Modelo Analógico (Manual)
               </h3>
               <ul className="space-y-4 mb-8">
                 <li className="flex justify-between text-gray-400 border-b border-white/5 pb-2">
                   <span>Custo Operacional</span>
                   <span className="font-bold text-white">Alto (Ineficiência)</span>
                 </li>
                 <li className="flex justify-between text-gray-400 border-b border-white/5 pb-2">
                   <span>Risco de Erro Humano</span>
                   <span className="font-bold text-red-500">MUITO ALTO</span>
                 </li>
                 <li className="flex justify-between text-gray-400 border-b border-white/5 pb-2">
                   <span>Controle do Processo</span>
                   <span className="font-bold text-red-500">ZERO</span>
                 </li>
               </ul>
               <div className="text-center pt-4">
                 <p className="text-sm text-gray-500 mb-1">Resultado</p>
                 <p className="text-xl font-bold text-red-500">Vulnerabilidade Jurídica.</p>
               </div>
             </div>

             <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-8 rounded-2xl border border-hlx-gold shadow-2xl relative transform md:scale-105">
               <div className="absolute top-0 right-0 bg-hlx-gold text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">PREMIUM</div>
               <h3 className="text-hlx-gold font-bold text-xl mb-6 flex items-center gap-2">
                 <CheckCircle className="text-hlx-gold" /> Modelo Tecnológico (Plataforma)
               </h3>
               <ul className="space-y-4 mb-8">
                 <li className="flex justify-between text-gray-300 border-b border-white/5 pb-2">
                   <span>Sistema Autônomo (GovTech)</span>
                   <span className="font-bold text-white">ILIMITADO</span>
                 </li>
                 <li className="flex justify-between text-gray-300 border-b border-white/5 pb-2">
                   <span>Mentor Estratégico (IA)</span>
                   <span className="font-bold text-white">24 HORAS</span>
                 </li>
                 <li className="flex justify-between text-gray-300 border-b border-white/5 pb-2">
                   <span>Soberania de Dados</span>
                   <span className="font-bold text-white">TOTAL</span>
                 </li>
               </ul>
               <div className="text-center pt-4">
                 <p className="text-sm text-gray-400 mb-1">Assinatura Anual</p>
                 <p className="text-4xl font-display font-bold text-white">R$ 297,00</p>
                 <p className="text-xs text-hlx-gold mt-2">Menos de R$ 1,00 por dia para sua segurança.</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-hlx-navy relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-hlx-gold font-bold tracking-widest uppercase text-sm mb-4">Tecnologia Proprietária</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-12">
            Inteligência que Gera <br/>Prosperidade
          </h3>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-slate-800 p-6 rounded-xl border border-white/5 hover:border-hlx-gold/30 transition-colors">
              <Zap className="text-hlx-gold mb-4" size={32} />
              <h4 className="font-bold text-white text-lg mb-2">Agilidade Processual</h4>
              <p className="text-gray-400 text-sm">Automação de processos repetitivos. O que levava dias, agora leva minutos.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-white/5 hover:border-hlx-gold/30 transition-colors">
              <Shield className="text-hlx-gold mb-4" size={32} />
              <h4 className="font-bold text-white text-lg mb-2">Blindagem Jurídica</h4>
              <p className="text-gray-400 text-sm">Monitoramento preventivo de multas e vencimentos (Matriz de Risco).</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-white/5 hover:border-hlx-gold/30 transition-colors">
              <Globe className="text-hlx-gold mb-4" size={32} />
              <h4 className="font-bold text-white text-lg mb-2">Visão Global</h4>
              <p className="text-gray-400 text-sm">Do RNTRC nacional à expansão no Mercosul. Uma rota completa de crescimento.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-1 border border-hlx-gold/30 shadow-2xl">
            <div className="bg-slate-900 rounded-[22px] p-8 md:p-12 text-center">
              <h3 className="text-gray-400 uppercase tracking-widest text-sm font-bold mb-4">Plano Anual - HELONEX PRO</h3>
              <div className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                R$ 297<span className="text-2xl text-gray-500 font-sans font-normal">/ano</span>
              </div>
              <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
                Tenha o "Departamento de Trânsito" completo dentro da sua empresa.
              </p>

              <div className="grid md:grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-10">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-hlx-gold" />
                  <span className="text-gray-300">Plataforma GovTech Completa</span>
                </div>
                 <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-hlx-gold" />
                  <span className="text-gray-300">Mentoria IA Ilimitada</span>
                </div>
                 <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-hlx-gold" />
                  <span className="text-gray-300">Cursos de Capacitação</span>
                </div>
                 <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-hlx-gold" />
                  <span className="text-gray-300">Comunidade de Elite</span>
                </div>
              </div>

              <button 
                onClick={onBuyAccess}
                className="w-full md:w-auto px-12 py-5 text-xl font-bold text-slate-900 bg-hlx-gold rounded-xl hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20"
              >
                COMEÇAR AGORA
              </button>
              
              <p className="mt-6 text-xs text-gray-500">
                Garantia de 7 dias ou seu dinheiro de volta. Sem letras miúdas (Yosher).
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SalesFunnel;