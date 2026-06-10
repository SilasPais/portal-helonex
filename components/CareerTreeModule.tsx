
import React, { useState } from 'react';
import { 
  Sprout, Truck, Bus, Trophy, Star, ChevronRight, Lock, Unlock, 
  Map, GraduationCap, ShieldCheck, Heart, Gem, ArrowUpRight, 
  BookOpen, Users, Globe, Building2, Anchor,
  CheckCircle2, Target, ClipboardList, PlayCircle, Scale, Wallet, Smartphone
} from 'lucide-react';

type CareerBranch = 'CARGO' | 'PASSENGER';

interface CareerNode {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  description: string;
  status: 'COMPLETED' | 'ACTIVE' | 'LOCKED';
  icon: any;
  requirements: string[];
  rewards: string[]; 
  actionPlan: string[]; 
}

const CARGO_TREE: CareerNode[] = [
  {
    id: 'c1', level: 1, title: 'Gênese (A Semente)', subtitle: 'O Despertar Profissional',
    description: 'A entrada no mundo do transporte. Regularização documental e entendimento das regras do jogo.',
    status: 'COMPLETED', icon: Sprout,
    requirements: ['CNH C/D/E com EAR', 'Cadastro RNTRC (TAC)', 'Curso MOPP (Desejável)'],
    rewards: ['Habilitação Legal para Transportar', 'Acesso a Fretes de Plataforma'],
    actionPlan: ['Agendar exame toxicológico', 'Solicitar registro na ANTT via Helonex GovTech', 'Abrir conta Gov.br Prata/Ouro']
  },
  {
    id: 'c2', level: 2, title: 'Enraizamento (Operacional)', subtitle: 'Eficiência no Asfalto',
    description: 'Domínio da máquina e da estrada. Redução de custos operacionais e direção econômica.',
    status: 'ACTIVE', icon: Truck,
    requirements: ['Curso de Mecânica Básica', 'Controle de Pneus e Diesel', 'Seguro de Carga (RCTR-C)'],
    rewards: ['Redução de 15% no Custo Operacional', 'Aumento da Margem de Lucro'],
    actionPlan: ['Instalar app de telemetria básica', 'Criar planilha de custo por KM', 'Contratar seguro de responsabilidade civil']
  }
];

const PASSENGER_TREE: CareerNode[] = [
  {
    id: 'p1', level: 1, title: 'Introdução ao Fretamento', subtitle: 'Capítulo 1 e 6: Base Legal',
    description: 'Entendimento do setor e regularização obrigatória. Sem base legal, não há negócio.',
    status: 'COMPLETED', icon: Scale,
    requirements: ['CNH D/E', 'Cadastro ANTT/TAF', 'Certificado Cadastur'],
    rewards: ['Imunidade contra apreensões', 'Visto de Entrada no Mercado'],
    actionPlan: ['Estudar Resolução 4.777', 'Validar Seguro APP', 'Vistoria Semestral ITL']
  },
  {
    id: 'p2', level: 2, title: 'Inteligência de Mercado', subtitle: 'Capítulo 2 e 3: O Modelo',
    description: 'Definição de nicho e persona (Lucas Aventureiro vs Maria Protetora). Construção da oferta única.',
    status: 'ACTIVE', icon: Target,
    requirements: ['Análise SWOT do Negócio', 'Definição de Personas', 'Modelo de Negócio (Canvas)'],
    rewards: ['Aumento de 20% no Valor do Frete', 'Fidelização por Especialidade'],
    actionPlan: ['Pesquisa de campo regional', 'Escolha da frota ideal (Van vs Micro)', 'Contratos de Fretamento Contínuo']
  },
  {
    id: 'p3', level: 3, title: 'Engenharia de Lucro', subtitle: 'Capítulo 4 e 5: Marketing & Finanças',
    description: 'Precificação estratégica e posicionamento digital. Transformando km rodado em riqueza.',
    status: 'LOCKED', icon: Wallet,
    requirements: ['Planilha de Custos Fixos/Var', 'Site/Redes Sociais Ativos', 'Parcerias com Agências'],
    rewards: ['Sustentabilidade Financeira', 'Presença de Marca Soberana'],
    actionPlan: ['Cálculo de ROI por viagem', 'Campanhas de Tráfego Pago', 'Programa de Indicações']
  },
  {
    id: 'p4', level: 4, title: 'Mestre de Operações', subtitle: 'Capítulo 7, 8 e 9: Gestão & Riscos',
    description: 'Logística impecável e atendimento de elite. Mitigação de riscos em tempo real.',
    status: 'LOCKED', icon: ShieldCheck,
    requirements: ['POP de Atendimento VIP', 'Plano de Mitigação de Riscos', 'Monitriip DIS 4.0'],
    rewards: ['Operação Erro Zero', 'Redução de Custos de Manutenção'],
    actionPlan: ['Treinar motoristas em crises', 'Checklist Digital por viagem', 'Auditoria de Custos Geográficos']
  },
  {
    id: 'p5', level: 5, title: 'Selo Diamante Helonex', subtitle: 'A Soberania e o Legado',
    description: 'Referência nacional em transporte de vidas. Prosperidade consolidada e valuation máximo.',
    status: 'LOCKED', icon: Gem,
    requirements: ['Empresa Autogerenciável', 'Frota Nível A', 'Certificado de Excelência Silas Pais'],
    rewards: ['Independência Financeira', 'Legado Profissional', 'Acesso a Investidores'],
    actionPlan: ['Consultoria de Expansão', 'Renovação de Frota Preditiva', 'Planejamento Sucessório']
  }
];

const CareerTreeModule: React.FC = () => {
  const [activeTree, setActiveTree] = useState<CareerBranch>('PASSENGER');
  const [selectedNode, setSelectedNode] = useState<CareerNode | null>(null);

  const currentData = activeTree === 'CARGO' ? CARGO_TREE : PASSENGER_TREE;

  if (!selectedNode) {
      const active = currentData.find(n => n.status === 'ACTIVE') || currentData[0];
      setSelectedNode(active);
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 animate-fade-in-up">
      <div className="text-center mb-10">
         <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-hlx-gold/10 border border-hlx-gold/30 text-hlx-gold text-xs font-bold uppercase tracking-widest mb-4">
            <Smartphone size={14} /> Trilha da Prosperidade Master
         </div>
         <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Mapa de Desenvolvimento <span className="text-hlx-gold">Soberano</span>
         </h2>
         <p className="text-gray-400 text-lg max-w-3xl mx-auto italic">
            "Não é apenas transportar, é construir um negócio de sucesso." - Especialização em Fretamento baseada na metodologia Silas Pais.
         </p>
      </div>

      <div className="flex justify-center mb-12">
         <div className="bg-slate-900 p-1 rounded-xl border border-white/10 flex">
            <button onClick={() => { setActiveTree('CARGO'); setSelectedNode(CARGO_TREE[0]); }} className={`px-6 py-3 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${activeTree === 'CARGO' ? 'bg-green-600 text-white' : 'text-gray-500'}`}><Truck size={16}/> Cargas</button>
            <button onClick={() => { setActiveTree('PASSENGER'); setSelectedNode(PASSENGER_TREE[1]); }} className={`px-6 py-3 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${activeTree === 'PASSENGER' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}><Bus size={16}/> Passageiros</button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
         <div className="lg:col-span-4 relative">
            <div className="absolute left-8 top-8 bottom-8 w-1 bg-slate-800 rounded-full"></div>
            <div className="space-y-8 relative z-10">
               {currentData.map((node) => (
                  <div key={node.id} onClick={() => setSelectedNode(node)} className={`flex items-center gap-4 cursor-pointer transition-all ${selectedNode?.id === node.id ? 'scale-105' : 'opacity-60'}`}>
                     <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${node.status === 'COMPLETED' ? 'bg-green-500 text-slate-900' : node.status === 'ACTIVE' ? 'bg-hlx-gold text-slate-900' : 'bg-slate-800 text-gray-500 border-white/10'}`}>
                        <node.icon size={28} />
                     </div>
                     <div className="bg-slate-900 border border-white/10 p-4 rounded-xl flex-1">
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Nível {node.level}</p>
                        <h4 className="text-white font-bold text-sm">{node.title}</h4>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-8">
            {selectedNode && (
               <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden h-full flex flex-col">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><selectedNode.icon size={250} /></div>
                  <div className="mb-8 border-b border-white/10 pb-6">
                     <span className="text-hlx-gold font-bold text-sm uppercase tracking-widest">{selectedNode.subtitle}</span>
                     <h2 className="text-4xl font-display font-bold text-white mb-4 mt-2">{selectedNode.title}</h2>
                     <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">{selectedNode.description}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                     <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="text-blue-400" size={18}/> Metas do Capítulo</h4>
                        <ul className="space-y-2">
                           {selectedNode.requirements.map((r, i) => <li key={i} className="text-sm text-gray-400 flex gap-2"><span>•</span> {r}</li>)}
                        </ul>
                     </div>
                     <div className="bg-hlx-gold/5 p-6 rounded-2xl border border-hlx-gold/20">
                        <h4 className="text-hlx-gold font-bold mb-4 flex items-center gap-2"><Star size={18}/> Ganho em Valuation</h4>
                        <ul className="space-y-2">
                           {selectedNode.rewards.map((r, i) => <li key={i} className="text-sm text-gray-400 flex gap-2"><Gem size={14} className="text-hlx-gold shrink-0 mt-1"/> {r}</li>)}
                        </ul>
                     </div>
                  </div>
                  <div className="mt-auto bg-slate-800/50 p-6 rounded-xl border border-white/5">
                     <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-widest">Plano de Execução (Helonex IA)</h4>
                     <div className="grid md:grid-cols-3 gap-4">
                        {selectedNode.actionPlan.map((a, i) => <div key={i} className="bg-slate-900 p-3 rounded text-xs text-gray-300 border border-white/5">{a}</div>)}
                     </div>
                     <button className="w-full mt-6 py-4 bg-hlx-gold text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2">
                        <PlayCircle size={20}/> INICIAR MÓDULO {selectedNode.level}
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default CareerTreeModule;
