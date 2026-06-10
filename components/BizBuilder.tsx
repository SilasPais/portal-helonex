
import React, { useState } from 'react';
import { Layers, ChevronRight, CheckCircle2, ShieldAlert, TrendingUp, Gem, Lock, Target, Zap, Rocket } from 'lucide-react';
import { MaturityLevel, UserContext } from '../types';

interface BizStep {
  level: MaturityLevel;
  title: string;
  subtitle: string;
  focus: string;
  items: string[];
  icon: any;
  color: string;
}

const BIZ_STEPS_CARGO: BizStep[] = [
  {
    level: MaturityLevel.LEVEL_01_BASIC,
    title: 'Nível 01: Básico (Visto de Entrada)',
    subtitle: 'Sobrevivência & Compliance',
    focus: 'Evitar multas e suspensões imediatas.',
    items: ['Regularização RNTRC (TAC/ETC)', 'Adesão ao SNE (40% desc)', 'Checklist de Saída Ativo', 'Configuração de Seguros RCTR-C'],
    icon: ShieldAlert,
    color: 'border-blue-500 text-blue-400'
  },
  {
    level: MaturityLevel.LEVEL_02_SILVER,
    title: 'Nível 02: Intermediário (Selo Prata)',
    subtitle: 'Eficiência & ROI',
    focus: 'Redução de custos operacionais e margem.',
    items: ['Gestão de Pneus (LifeCycle)', 'Telemetria Monitriip DIS 4.0', 'Custo por KM Automatizado', 'Academia Helonex: MOPP/Especial'],
    icon: TrendingUp,
    color: 'border-slate-400 text-slate-300'
  },
  {
    level: MaturityLevel.LEVEL_03_GOLD_ESG,
    title: 'Nível 03: Avançado (Selo Ouro/ESG)',
    subtitle: 'Sustentabilidade & Crédito',
    focus: 'Acesso a Fundo Clima e Crédito Verde.',
    items: ['Inventário de Emissões (MelhorAR)', 'RhTec: Premiação por Economia', 'Certificação SASSMAQ Vision', 'Plano de Manutenção Preditiva'],
    icon: Zap,
    color: 'border-yellow-500 text-yellow-400'
  },
  {
    level: MaturityLevel.LEVEL_04_GUARDIAN,
    title: 'Nível 04: Excelência (GuardianSeal)',
    subtitle: 'Soberania Digital Total',
    focus: 'Gestão da Qualidade Total e Valor de Mercado.',
    items: ['BSC (Balanced Scorecard) Ativo', 'Auditoria Procedimental IA', 'HSM Cloud (ICP-Brasil)', 'Ciclo Erro Zero Consolidado'],
    icon: Gem,
    color: 'border-orange-500 text-orange-400'
  }
];

const BIZ_STEPS_PASSENGER: BizStep[] = [
  {
    level: MaturityLevel.LEVEL_01_BASIC,
    title: 'Nível 01: Básico (Visto de Entrada)',
    subtitle: 'Segurança & Legalidade',
    focus: 'Garantir autorização de viagem e segurança.',
    items: ['Regularização ANTT (TAF)', 'Seguro APP Passageiros', 'Laudo ITL (Inspeção Veicular)', 'Cadastro de Motoristas'],
    icon: ShieldAlert,
    color: 'border-blue-500 text-blue-400'
  },
  {
    level: MaturityLevel.LEVEL_02_SILVER,
    title: 'Nível 02: Intermediário (Selo Prata)',
    subtitle: 'Conforto & Gestão',
    focus: 'Melhoria da experiência e controle de frota.',
    items: ['Monitriip Passageiros', 'Gestão de Manutenção Preventiva', 'Controle de Escala de Motoristas', 'Pesquisa de Satisfação Digital'],
    icon: TrendingUp,
    color: 'border-slate-400 text-slate-300'
  },
  {
    level: MaturityLevel.LEVEL_03_GOLD_ESG,
    title: 'Nível 03: Avançado (Selo Ouro/ESG)',
    subtitle: 'Sustentabilidade & Marca',
    focus: 'Diferenciação no mercado de turismo/fretamento.',
    items: ['Frota Verde (Emissões)', 'Treinamento de Atendimento (EduTech)', 'Certificação ISO 9001', 'Wi-Fi e Entretenimento a Bordo'],
    icon: Zap,
    color: 'border-yellow-500 text-yellow-400'
  },
  {
    level: MaturityLevel.LEVEL_04_GUARDIAN,
    title: 'Nível 04: Excelência (GuardianSeal)',
    subtitle: 'Referência Nacional',
    focus: 'Liderança de mercado e contratos premium.',
    items: ['Governança Corporativa', 'Auditoria de Segurança Viária', 'Expansão de Linhas/Rotas', 'Selo de Excelência ANTT'],
    icon: Gem,
    color: 'border-orange-500 text-orange-400'
  }
];

interface BizBuilderProps {
  userContext?: UserContext | null;
}

const BizBuilder: React.FC<BizBuilderProps> = ({ userContext }) => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = userContext?.macro === 'PASSENGER' ? BIZ_STEPS_PASSENGER : BIZ_STEPS_CARGO;

  return (
    <div className="bg-slate-950 p-4 md:p-8 animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-hlx-gold/10 border border-hlx-gold/30 text-hlx-gold text-xs font-bold tracking-widest uppercase mb-6">
             <Rocket size={16} /> Módulo BizBuilder: O Business Lego
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
             Monte sua Rota de <span className="text-hlx-gold">Sucesso</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
             Use nossos modelos pré-auditados para construir sua transportadora nível 4.0. Arraste as peças da conformidade e blinde seu lucro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-4">
                {steps.map((step, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`w-full p-6 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                            activeStep === idx 
                            ? 'bg-slate-800 border-hlx-gold shadow-lg shadow-yellow-500/10' 
                            : 'bg-slate-900 border-white/5 hover:border-white/20'
                        }`}
                    >
                        <div className="flex items-center gap-4 relative z-10">
                            <div className={`p-3 rounded-xl bg-slate-950 border ${step.color} group-hover:scale-110 transition-transform`}>
                                <step.icon size={24} />
                            </div>
                            <div>
                                <h4 className={`font-bold text-sm ${activeStep === idx ? 'text-white' : 'text-gray-500'}`}>{step.title}</h4>
                                <p className="text-xs text-gray-500 uppercase font-black tracking-tighter">{step.subtitle}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="lg:col-span-8 bg-slate-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Layers size={250} />
                </div>

                <div className="relative z-10 flex-1">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-hlx-gold font-bold text-xs uppercase tracking-widest block mb-2">Foco Estratégico</span>
                            <h3 className="text-2xl font-bold text-white leading-tight">{steps[activeStep].focus}</h3>
                        </div>
                        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${steps[activeStep].color} bg-slate-950`}>
                            {activeStep + 1}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {steps[activeStep].items.map((item, i) => (
                            <div key={i} className="bg-slate-950 p-5 rounded-2xl border border-white/5 hover:border-hlx-gold/30 transition-all flex items-center gap-4 group cursor-default">
                                <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-slate-900 transition-colors">
                                    <CheckCircle2 size={18} />
                                </div>
                                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 bg-hlx-blue/10 border border-hlx-blue/30 p-6 rounded-2xl">
                        <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                           <Target size={18} /> Impacto no Valuation
                        </h4>
                        <p className="text-sm text-gray-400">
                           Ao completar este nível, seu multiplicador de valor intangível cresce <strong>+15%</strong>. Sua empresa torna-se um ativo auditável e vendável.
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">Status: {activeStep === 0 ? 'Concluído' : 'Pendente de Auditoria'}</p>
                    <button className="px-8 py-3 bg-hlx-gold text-slate-900 font-bold rounded-xl hover:bg-yellow-400 transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/20">
                        {activeStep === 3 ? 'Solicitar Visto GuardianSeal' : 'Desbloquear Próximo Nível'}
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BizBuilder;
