
import React, { useState } from 'react';
import { 
  Truck, Bus, Building2, User, ChevronRight, CheckCircle, 
  Globe, GraduationCap, Briefcase, Calculator, Users, Anchor, 
  Tractor, Warehouse, Map, Play, ShieldCheck, Sun, Layers, Server, Activity
} from 'lucide-react';
import { MacroSegment, UserPersona, UserGoal, UserContext, SystemMode } from '../types';

interface OnboardingCompassProps {
  onComplete: (context: UserContext) => void;
}

const OnboardingCompass: React.FC<OnboardingCompassProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [macro, setMacro] = useState<MacroSegment | null>(null);
  const [persona, setPersona] = useState<UserPersona | null>(null);
  const [goal, setGoal] = useState<UserGoal | null>(null);
  const [mode, setMode] = useState<SystemMode | null>(null);

  const handleMacroSelect = (sel: MacroSegment) => {
    setMacro(sel);
    setStep(2);
  };

  const handlePersonaSelect = (sel: UserPersona) => {
    setPersona(sel);
    setStep(3);
  };

  const handleGoalSelect = (sel: UserGoal) => {
    setGoal(sel);
    setStep(4); // Novo passo
  };

  const handleModeSelect = (sel: SystemMode) => {
      setMode(sel);
      if (macro && persona && goal) {
          onComplete({ macro, persona, goal, mode: sel, needsOnboarding: false });
      }
  };

  // --- CONFIGURAÇÃO DAS OPÇÕES ---

  const renderStep1 = () => (
    <div className="animate-slide-up">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Bem-vindo ao Helonex.</h2>
      <p className="text-gray-400 mb-8 text-lg">Para começar, o que você movimenta ou qual seu papel?</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button onClick={() => handleMacroSelect('CARGO')} className="group bg-slate-800 hover:bg-slate-700 border border-white/10 hover:border-hlx-gold p-8 rounded-2xl transition-all text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Truck size={80} /></div>
            <div className="bg-green-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform"><Truck size={28} /></div>
            <h3 className="text-xl font-bold text-white mb-2">Carga & Logística</h3>
            <p className="text-sm text-gray-400">Transportadoras, Caminhoneiros, Embarcadores e Frota Própria.</p>
        </button>

        <button onClick={() => handleMacroSelect('PASSENGER')} className="group bg-slate-800 hover:bg-slate-700 border border-white/10 hover:border-hlx-blue p-8 rounded-2xl transition-all text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Bus size={80} /></div>
            <div className="bg-blue-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform"><Bus size={28} /></div>
            <h3 className="text-xl font-bold text-white mb-2">Passageiros</h3>
            <p className="text-sm text-gray-400">Fretamento, Escolar, Turismo e Linhas Regulares.</p>
        </button>

        <button onClick={() => handleMacroSelect('CORPORATE')} className="group bg-slate-800 hover:bg-slate-700 border border-white/10 hover:border-purple-500 p-8 rounded-2xl transition-all text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Building2 size={80} /></div>
            <div className="bg-purple-500/20 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform"><Briefcase size={28} /></div>
            <h3 className="text-xl font-bold text-white mb-2">Gestão & Carreira</h3>
            <p className="text-sm text-gray-400">Estudantes, RH, Gestores de Frota e Profissionais Técnicos.</p>
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => {
    let options: { id: UserPersona, label: string, icon: any, desc: string }[] = [];

    if (macro === 'CARGO') {
        options = [
            { id: 'TAC', label: 'Autônomo (TAC)', icon: User, desc: 'Motorista dono do próprio caminhão.' },
            { id: 'ETC', label: 'Transportadora (ETC)', icon: Building2, desc: 'Empresa de transporte de cargas.' },
            { id: 'TRIC', label: 'Internacional (TRIC)', icon: Globe, desc: 'Transporte Mercosul.' },
            { id: 'SHIPPER', label: 'Embarcador', icon: Anchor, desc: 'Indústria que contrata frete.' },
            { id: 'OWN_CARGO_AGRO', label: 'Frota Própria (Agro)', icon: Tractor, desc: 'Transporte de produção própria.' },
            { id: 'OWN_CARGO_IND', label: 'Frota Própria (Ind)', icon: Warehouse, desc: 'Indústria com caminhões próprios.' },
        ];
    } else if (macro === 'PASSENGER') {
        options = [
            { id: 'PASS_CHARTER_EVENTUAL', label: 'Fretamento Turismo', icon: Map, desc: 'Viagens eventuais e turismo.' },
            { id: 'PASS_CHARTER_CONT', label: 'Fretamento Contínuo', icon: Users, desc: 'Transporte de funcionários.' },
            { id: 'PASS_SCHOOL', label: 'Transporte Escolar', icon: GraduationCap, desc: 'Transporte de estudantes.' },
            { id: 'PASS_LINE', label: 'Linha Regular', icon: Bus, desc: 'Rodoviária (Passagem).' },
        ];
    } else {
        options = [
            { id: 'STUDENT', label: 'Estudante Logística', icon: GraduationCap, desc: 'Aprendizado e carreira.' },
            { id: 'FLEET_MANAGER', label: 'Gestor de Frotas', icon: Truck, desc: 'Cuido dos veículos da empresa.' },
            { id: 'TECH_RESP', label: 'Responsável Técnico', icon: ShieldCheck, desc: 'RT assinando pela empresa.' },
            { id: 'HR_TRANSPORT', label: 'RH / DP', icon: Users, desc: 'Gestão de motoristas.' },
        ];
    }

    return (
        <div className="animate-slide-up">
            <button onClick={() => setStep(1)} className="text-gray-500 hover:text-white mb-6 flex items-center gap-2 text-sm"><ChevronRight className="rotate-180" size={16}/> Voltar</button>
            <h2 className="text-3xl font-display font-bold text-white mb-2">Qual sua categoria exata?</h2>
            <p className="text-gray-400 mb-8">Isso personaliza os requisitos legais que vamos monitorar.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {options.map(opt => (
                    <button key={opt.id} onClick={() => handlePersonaSelect(opt.id)} className="bg-slate-800 hover:bg-slate-700 border border-white/5 hover:border-white/20 p-4 rounded-xl text-left flex items-start gap-4 transition-all">
                        <div className="bg-slate-900 p-2 rounded-lg text-hlx-gold"><opt.icon size={20} /></div>
                        <div>
                            <h4 className="font-bold text-white text-sm">{opt.label}</h4>
                            <p className="text-xs text-gray-500 mt-1">{opt.desc}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
  };

  const renderStep3 = () => (
    <div className="animate-slide-up">
        <button onClick={() => setStep(2)} className="text-gray-500 hover:text-white mb-6 flex items-center gap-2 text-sm"><ChevronRight className="rotate-180" size={16}/> Voltar</button>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Qual seu objetivo principal hoje?</h2>
        <p className="text-gray-400 mb-8">Vamos limpar o painel e mostrar só o que importa agora.</p>

        <div className="grid grid-cols-1 gap-4 max-w-2xl">
            <button onClick={() => handleGoalSelect('LEGALIZE')} className="bg-slate-800 hover:bg-slate-700 p-6 rounded-xl border border-white/5 hover:border-red-500/50 flex items-center gap-4 group text-left transition-all">
                <div className="bg-red-500/10 p-3 rounded-full text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors"><ShieldCheck size={24} /></div>
                <div>
                    <h3 className="text-lg font-bold text-white">Regularizar & Evitar Multas</h3>
                    <p className="text-sm text-gray-400">Estou com documentos vencidos ou quero abrir minha empresa/cadastro agora.</p>
                </div>
                <ChevronRight className="ml-auto text-gray-600 group-hover:text-white" />
            </button>

            <button onClick={() => handleGoalSelect('MANAGE')} className="bg-slate-800 hover:bg-slate-700 p-6 rounded-xl border border-white/5 hover:border-blue-500/50 flex items-center gap-4 group text-left transition-all">
                <div className="bg-blue-500/10 p-3 rounded-full text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors"><Users size={24} /></div>
                <div>
                    <h3 className="text-lg font-bold text-white">Gerir Frota & Motoristas</h3>
                    <p className="text-sm text-gray-400">Já opero, preciso controlar vencimentos, manutenção e RH.</p>
                </div>
                <ChevronRight className="ml-auto text-gray-600 group-hover:text-white" />
            </button>

            <button onClick={() => handleGoalSelect('GROW')} className="bg-slate-800 hover:bg-slate-700 p-6 rounded-xl border border-white/5 hover:border-hlx-gold/50 flex items-center gap-4 group text-left transition-all">
                <div className="bg-hlx-gold/10 p-3 rounded-full text-hlx-gold group-hover:bg-hlx-gold group-hover:text-slate-900 transition-colors"><Sun size={24} /></div>
                <div>
                    <h3 className="text-lg font-bold text-white">Crescer & Lucrar</h3>
                    <p className="text-sm text-gray-400">Quero reduzir custos, vender mais, fazer valuation ou acessar crédito.</p>
                </div>
                <ChevronRight className="ml-auto text-gray-600 group-hover:text-white" />
            </button>
            
            <button onClick={() => handleGoalSelect('LEARN')} className="bg-slate-800 hover:bg-slate-700 p-6 rounded-xl border border-white/5 hover:border-purple-500/50 flex items-center gap-4 group text-left transition-all">
                <div className="bg-purple-500/10 p-3 rounded-full text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors"><GraduationCap size={24} /></div>
                <div>
                    <h3 className="text-lg font-bold text-white">Aprender & Capacitar</h3>
                    <p className="text-sm text-gray-400">Busco cursos, treinamentos (MOPP) e atualização profissional.</p>
                </div>
                <ChevronRight className="ml-auto text-gray-600 group-hover:text-white" />
            </button>
        </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="animate-slide-up">
        <button onClick={() => setStep(3)} className="text-gray-500 hover:text-white mb-6 flex items-center gap-2 text-sm"><ChevronRight className="rotate-180" size={16}/> Voltar</button>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Como a Helonex deve atuar?</h2>
        <p className="text-gray-400 mb-8">Defina o nível de integração que você deseja.</p>

        <div className="grid grid-cols-1 gap-6 max-w-2xl">
            {/* OPÇÃO 1: SISTEMA COMPLETO */}
            <button 
                onClick={() => handleModeSelect('FULL_MANAGEMENT')} 
                className="bg-slate-800 hover:bg-slate-700 p-8 rounded-2xl border border-white/10 hover:border-hlx-gold relative overflow-hidden group text-left transition-all"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5"><Server size={100} /></div>
                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-hlx-gold/20 p-3 rounded-xl text-hlx-gold"><Server size={32} /></div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Quero um Sistema Completo (ERP)</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Vou usar a Helonex para emitir documentos, controlar frota, financeiro e pneus. Quero substituir minhas planilhas ou sistema atual.
                        </p>
                        <div className="flex gap-2">
                            <span className="text-[10px] bg-slate-900 border border-white/10 px-2 py-1 rounded text-gray-400">Emissão CT-e</span>
                            <span className="text-[10px] bg-slate-900 border border-white/10 px-2 py-1 rounded text-gray-400">Gestão Frota</span>
                            <span className="text-[10px] bg-slate-900 border border-white/10 px-2 py-1 rounded text-gray-400">Financeiro</span>
                        </div>
                    </div>
                </div>
            </button>

            {/* OPÇÃO 2: AUDITORIA DE INTELIGÊNCIA */}
            <button 
                onClick={() => handleModeSelect('INTELLIGENCE_LAYER')} 
                className="bg-slate-800 hover:bg-slate-700 p-8 rounded-2xl border border-white/10 hover:border-blue-500 relative overflow-hidden group text-left transition-all"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5"><Activity size={100} /></div>
                <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-blue-500/20 p-3 rounded-xl text-blue-400"><Layers size={32} /></div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Quero Auditar meu Sistema Atual</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Já tenho um ERP (TOTVS, Senior, etc) e não quero trocar. Quero usar a Helonex para auditar riscos, gerar inteligência e prevenir multas.
                        </p>
                        <div className="flex gap-2">
                            <span className="text-[10px] bg-slate-900 border border-white/10 px-2 py-1 rounded text-gray-400">Integração API</span>
                            <span className="text-[10px] bg-slate-900 border border-white/10 px-2 py-1 rounded text-gray-400">Auditoria</span>
                            <span className="text-[10px] bg-slate-900 border border-white/10 px-2 py-1 rounded text-gray-400">JusTech</span>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-900">
            <div 
                className="h-full bg-gradient-to-r from-hlx-gold to-orange-500 transition-all duration-500" 
                style={{ width: `${(step / 4) * 100}%` }}
            ></div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-5xl">
                <div className="mb-8 text-center md:text-left">
                    <span className="text-xs font-bold text-hlx-gold uppercase tracking-[0.3em]">Bússola Helonex</span>
                </div>
                
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
            </div>
        </div>
        
        <div className="p-6 text-center text-gray-600 text-xs border-t border-white/5 bg-slate-950">
            <p>Seus dados moldam a plataforma. Você pode alterar seu perfil nas configurações a qualquer momento.</p>
        </div>
    </div>
  );
};

export default OnboardingCompass;
