
import React from 'react';
// Fix: Added missing ShieldCheck icon to the imports
import { 
  ArrowRight, ShieldAlert, Cpu, HeartHandshake, TrendingUp, Gem, 
  ChevronDown, Target, Zap, Briefcase, Lock, CheckCircle2, Gavel, Smartphone, Globe, Activity, LayoutGrid, ArrowLeft, BookOpen, Landmark, Building, Fuel, Users, Dna, GitFork, UserCheck, BarChart, HardHat, FileText, Scale, Heart, Shield, Anchor, Bot, AlertTriangle, ShieldCheck
} from 'lucide-react';

const Page: React.FC<{children: React.ReactNode, isFirst?: boolean, isLast?: boolean, bgColor?: string, bgImage?: string}> = ({ children, isFirst = false, isLast = false, bgColor = 'bg-slate-950', bgImage }) => (
  <section className={`h-screen w-full flex snap-start items-center justify-center p-4 md:p-8 lg:p-16 relative overflow-hidden ${bgColor}`}>
    {bgImage && (
        <>
            <div className={`absolute inset-0 bg-cover bg-center opacity-10 ${bgImage}`}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950 to-slate-950/90"></div>
        </>
    )}
    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10 animate-fade-in-up">
      {children}
    </div>
    {!isLast && <ChevronDown className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 animate-bounce z-20" />}
  </section>
);

const StrategicRoadmap: React.FC<{onCtaClick: () => void, onBack: () => void}> = ({ onCtaClick, onBack }) => {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-auto custom-scrollbar relative bg-slate-950">
      <button onClick={onBack} className="fixed top-6 left-6 z-50 text-gray-400 hover:text-white bg-black/30 backdrop-blur-sm p-3 rounded-full flex items-center gap-2 transition-all">
        <ArrowLeft size={20} />
      </button>

      {/* Página 1: Visão Estratégica */}
      <Page isFirst bgImage="bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')]">
        <div className="lg:col-span-2 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-hlx-gold/10 text-hlx-gold rounded-full text-xs font-bold uppercase tracking-widest border border-hlx-gold/20 mb-6">
            <ShieldCheck size={14} /> Beyond Time • Inteligência Acoplada
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold text-white leading-tight mb-4">
            A Era da <span className="text-hlx-gold">Soberania Digital</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A HELONEX não é um software tradicional. Somos o <strong>Cérebro de Auditoria</strong> que blinda seu jurídico e garante o Selo ESG perante a ANTT sob o rigor do Sistema Erro Zero.
          </p>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-xs text-gray-500 uppercase font-bold mb-2">Compatibilidade Total</p>
            <div className="flex justify-center gap-4 text-gray-400 text-xs font-mono">
              <span>TOTVS</span> • <span>SENIOR</span> • <span>BSOFT</span> • <span>SINCRE</span>
            </div>
          </div>
        </div>
      </Page>

      {/* Página 2: Os 3 Terremotos */}
      <Page bgColor="bg-slate-900">
        <div className="text-left">
          <AlertTriangle size={64} className="text-hlx-gold mb-6" />
          <h2 className="text-5xl font-display font-bold text-white mb-6">Os 3 Terremotos <br/>de 2026</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-red-500/20 p-3 rounded-lg text-red-400 shrink-0"><Gavel size={24}/></div>
              <div>
                <h4 className="text-white font-bold">Terremoto Legal</h4>
                <p className="text-sm text-gray-400">Fim do "Comando e Controle". Início da Regulação Responsiva calibrada pelo IQT.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-orange-500/20 p-3 rounded-lg text-orange-400 shrink-0"><BarChart size={24}/></div>
              <div>
                <h4 className="text-white font-bold">Terremoto Fiscal</h4>
                <p className="text-sm text-gray-400">Reforma Tributária (CBS/IBS). Recuperação de créditos de insumos e alíquota reduzida.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-cyan-500/20 p-3 rounded-lg text-cyan-400 shrink-0"><Cpu size={24}/></div>
              <div>
                <h4 className="text-white font-bold">Terremoto Digital</h4>
                <p className="text-sm text-gray-400">Monitriip DIS 4.0 e Intercâmbio de Seguros Obrigatórios via API ANTT.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
            <div className="relative w-80 h-80 bg-gradient-to-br from-hlx-gold/20 to-transparent rounded-full flex items-center justify-center">
                <Dna size={120} className="text-hlx-gold animate-pulse"/>
                <div className="absolute inset-0 border border-hlx-gold/10 rounded-full animate-spin-slow"></div>
            </div>
        </div>
      </Page>

      {/* Página 3: Módulo BizBuilder */}
      <Page>
        <div className="lg:col-span-1">
          <LayoutGrid size={64} className="text-blue-400 mb-6" />
          <h2 className="text-5xl font-display font-bold text-white mb-6">BizBuilder: <br/>O Business Lego</h2>
          <p className="text-gray-300 text-lg mb-8">
            Monte seu plano de carreira e negócio usando modelos de sucesso pré-auditados. Do "Visto de Entrada" ao "GuardianSeal".
          </p>
          <div className="space-y-3">
             <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg border border-white/5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-white text-sm font-bold">Nível 01: Visto de Entrada (Evitar Multas)</span>
             </div>
             <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg border border-white/5">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <span className="text-white text-sm font-bold">Nível 02: Selo Prata (ROI e Redução de Custos)</span>
             </div>
             <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg border border-white/5">
                <div className="w-2 h-2 rounded-full bg-hlx-gold"></div>
                <span className="text-white text-sm font-bold">Nível 03: Selo Ouro/ESG (Crédito BNDES)</span>
             </div>
             <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg border border-hlx-gold/30">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="text-white text-sm font-bold">Nível 04: GuardianSeal (Soberania Digital)</span>
             </div>
          </div>
        </div>
        <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
           <h4 className="text-hlx-gold font-bold mb-4 flex items-center gap-2"><Smartphone size={20}/> Incubadora 4.0</h4>
           <p className="text-gray-400 text-sm mb-6">Operamos como um <strong>Sebrae Online 4.0</strong> focado em reduzir a mortalidade de transportadoras através da rastreabilidade total.</p>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                 <p className="text-white font-bold">700h</p>
                 <p className="text-[10px] text-gray-500 uppercase">Economia Admin/Ano</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                 <p className="text-white font-bold">40%</p>
                 <p className="text-[10px] text-gray-500 uppercase">Redução com SNE</p>
              </div>
           </div>
        </div>
      </Page>

      {/* Página Final: Call to Action */}
      <Page isLast bgColor="bg-slate-900" bgImage="bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')]">
        <div className="lg:col-span-2 text-center">
          <Gem size={48} className="mx-auto text-hlx-gold mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Beyond Time. <br/>Sua Verdade Regulatória.
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Assuma o papel de juiz da sua própria eficiência. Transforme-se em um profissional soberano e protegido.
          </p>
          <button 
            onClick={onCtaClick}
            className="group px-10 py-5 bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold rounded-xl shadow-2xl shadow-yellow-500/40 transition-all flex items-center justify-center gap-3 text-lg mx-auto"
          >
            QUERO O SEU VISTO DE CONFIANÇA
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </Page>
    </div>
  );
};

export default StrategicRoadmap;
