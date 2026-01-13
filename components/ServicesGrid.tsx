
import React, { useState } from 'react';
import { ServiceCardProps } from '../types';
import { 
  Bus, AlertTriangle, Map, FileCheck, Anchor, 
  ShieldAlert, UserCheck, Globe, CreditCard, Scale, 
  Users, Crown, Gavel, Briefcase, FileText, Activity, ArrowUpRight, GraduationCap, Building2,
  Zap, Rocket, Smartphone, LineChart, BrainCircuit,
  Box, Snowflake, Flame, Layers, Package, HeartHandshake, Calculator, GraduationCap as SchoolIcon, ScanFace, CheckCircle2
} from 'lucide-react';

interface ServicesGridProps {
  onServiceSelect: (id: string) => void;
}

type UniverseType = 'ECOSYSTEM' | 'CARGO' | 'PASSENGER' | 'LEGAL';

// ÍCONE DE CAMINHÃO CUSTOMIZADO
const CustomTruckIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1 10V19C1 20.1046 1.89543 21 3 21H16C16.5523 21 17 20.5523 17 20V19H20C20.5523 19 21 18.5523 21 18V13.8284C21 13.298 20.7893 12.7893 20.4142 12.4142L18.5858 10.5858C18.2107 10.2107 17.702 10 17.1716 10H17V5C17 3.89543 16.1046 3 15 3H3C1.89543 3 1 3.89543 1 5V10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 10H17.1716C17.702 10 18.2107 10.2107 18.5858 10.5858L20.4142 12.4142C20.7893 12.7893 21 13.298 21 13.8284V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="5.5" cy="19.5" r="2.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="16.5" cy="19.5" r="2.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
    <path d="M17 5V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 6H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ServiceCard: React.FC<ServiceCardProps & { onClick: () => void; universe: UniverseType; isFeatured?: boolean }> = ({ 
  id, title, description, icon, category, onClick, universe, isFeatured 
}) => {
  
  // Lógica de Estilização Dinâmica dos Cards
  const getCardStyle = () => {
    // 1. Destaque MÁXIMO (RNTRC TAC)
    if (id === 'rntrc-tac') {
      return 'bg-gradient-to-b from-slate-900 to-amber-950/40 border-2 border-hlx-gold shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_0_50px_rgba(245,158,11,0.3)] hover:border-yellow-400';
    }
    // 2. Destaque ECOSSISTEMA
    if (universe === 'ECOSYSTEM' || isFeatured) {
      return 'bg-slate-900 border border-hlx-gold/30 hover:border-hlx-gold shadow-lg hover:shadow-hlx-gold/10';
    }
    // 3. Estilo Padrão (Clean)
    return 'bg-slate-900 border border-white/5 hover:border-white/20 hover:bg-slate-800';
  };

  const getIconStyle = () => {
    if (id === 'rntrc-tac') return 'text-slate-900 bg-hlx-gold';
    if (universe === 'ECOSYSTEM' || isFeatured) return 'text-hlx-gold bg-hlx-gold/10';
    
    switch (universe) {
      case 'PASSENGER': return 'text-blue-400 bg-blue-500/10';
      case 'LEGAL': return 'text-red-400 bg-red-500/10';
      default: return 'text-green-400 bg-green-500/10';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`
        relative rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col h-full cursor-pointer transform hover:-translate-y-1
        ${getCardStyle()}
      `}
    >
      {/* Badge de Destaque */}
      {(isFeatured || id === 'rntrc-tac' || universe === 'ECOSYSTEM') && (
        <div className={`absolute top-0 right-0 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider ${id === 'rntrc-tac' ? 'bg-hlx-gold text-slate-900 shadow-md' : 'bg-white/5 text-gray-300 border-l border-b border-white/10'}`}>
          {id === 'rntrc-tac' ? 'Recomendado' : universe === 'ECOSYSTEM' ? 'Exclusivo' : 'Destaque'}
        </div>
      )}

      <div className="p-6 md:p-8 flex-grow flex flex-col">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${getIconStyle()}`}>
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 24 }) : icon}
        </div>
        
        <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${
          (isFeatured || universe === 'ECOSYSTEM') ? 'text-hlx-gold' : 'text-gray-500'
        }`}>
          {category}
        </span>
        
        <h3 className="text-lg md:text-xl font-display font-bold text-white mb-3 leading-tight group-hover:text-hlx-gold transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 leading-relaxed font-light">
          {description}
        </p>
      </div>

      <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex justify-between items-center mt-auto">
        <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">
            {universe === 'ECOSYSTEM' ? 'Desbloquear Vantagem' : 'Acessar Serviço'}
        </span>
        <div className="bg-white/5 p-1.5 rounded-full group-hover:bg-white/10 transition-colors">
           <ArrowUpRight size={14} className="text-gray-400 group-hover:text-white" />
        </div>
      </div>
    </div>
  );
};

const ServicesGrid: React.FC<ServicesGridProps> = ({ onServiceSelect }) => {
  const [activeUniverse, setActiveUniverse] = useState<UniverseType>('ECOSYSTEM');

  const allServices: (ServiceCardProps & { universe: UniverseType; isFeatured?: boolean; tags?: string[] })[] = [
    // --- MUNDO DO ASSINANTE (ECOSYSTEM) ---
    {
        id: 'idt-tech',
        title: 'Tecnologia IDT',
        category: 'Autonomia Digital',
        description: 'Faça você mesmo. Emita RNTRC, CIOT e Licenças de graça conectando ao Gov.br.',
        icon: <Smartphone />,
        universe: 'ECOSYSTEM',
        isFeatured: true
    },
    {
        id: 'marketing-placa',
        title: 'Clube de Compras',
        category: 'Economia Real',
        description: 'Poder de compra coletiva. Diesel, Pneus e Peças com desconto de frota.',
        icon: <Zap />,
        universe: 'ECOSYSTEM',
        isFeatured: true
    },
    {
        id: 'mentor-ia',
        title: 'Mentor IA Estratégico',
        category: 'Consultoria 24h',
        description: 'Tire dúvidas sobre multas, rotas e leis com nossa Inteligência Artificial.',
        icon: <BrainCircuit />,
        universe: 'ECOSYSTEM'
    },
    {
        id: 'fleet-manager',
        title: 'Gestão de Frota',
        category: 'GesTech',
        description: 'Controle de vencimentos (CNH, Tacógrafo) e manutenção preventiva.',
        icon: <Briefcase />,
        universe: 'ECOSYSTEM'
    },
    {
        id: 'opp-consultant',
        title: 'Oportunidades',
        category: 'Inteligência de Mercado',
        description: 'Análise de rotas lucrativas e cálculo de frete ideal por região.',
        icon: <LineChart />,
        universe: 'ECOSYSTEM'
    },
    
    // --- CARGO ---
    {
      id: 'rntrc-tac',
      title: 'RNTRC Digital (TAC)',
      category: 'Autônomo',
      description: 'Registro na ANTT para Pessoa Física. Certificado oficial e adesivos.',
      icon: <CustomTruckIcon />, 
      universe: 'CARGO',
      isFeatured: true
    },
    {
      id: 'rntrc-etc',
      title: 'RNTRC Digital (Empresa)',
      category: 'Transportadora',
      description: 'Gestão de frota ilimitada e Responsável Técnico (RT) vinculado.',
      icon: <Building2 />,
      universe: 'CARGO'
    },
    {
      id: 'sassmaq',
      title: 'Auditoria SASSMAQ',
      category: 'Qualidade',
      description: 'Preparação para certificação química e auditoria de pátio.',
      icon: <ScanFace />,
      universe: 'CARGO',
      isFeatured: true
    },
    {
      id: 'aet',
      title: 'AET (Cargas Especiais)',
      category: 'Excesso de Peso',
      description: 'Autorizações para Bitrem, Cegonha e Cargas Indivisíveis.',
      icon: <Scale />,
      universe: 'CARGO'
    },
    {
      id: 'tric',
      title: 'Licença Internacional',
      category: 'Mercosul',
      description: 'Habilitação para Argentina, Chile, Paraguai e Uruguai (MIC/DTA).',
      icon: <Globe />,
      universe: 'CARGO'
    },
    {
      id: 'mopp',
      title: 'Produtos Perigosos',
      category: 'Licenças Especiais',
      description: 'Cadastro IBAMA, Polícia Federal e Civil para cargas de risco.',
      icon: <AlertTriangle />,
      universe: 'CARGO'
    },

    // --- PASSENGER ---
    {
      id: 'passengers-charter',
      title: 'Fretamento ANTT',
      category: 'Turismo (TAF)',
      description: 'Autorização de Viagem para Circuito Fechado Interestadual.',
      icon: <Bus />,
      universe: 'PASSENGER',
      isFeatured: true
    },
    {
      id: 'passengers-regular',
      title: 'Linhas Regulares',
      category: 'Rodoviária (TAR)',
      description: 'Gestão de Termo de Autorização (Res. 6.033) e IQT.',
      icon: <Building2 />,
      universe: 'PASSENGER'
    },
    {
      id: 'state-auth',
      title: 'Fretamento Estadual',
      category: 'Intermunicipal',
      description: 'Regularização ARTESP, DER, DETRO e AGERBA.',
      icon: <Map />,
      universe: 'PASSENGER'
    },
    {
      id: 'school-transport',
      title: 'Transporte Escolar',
      category: 'PNATE',
      description: 'Vistoria semestral e cursos para condutores.',
      icon: <SchoolIcon />,
      universe: 'PASSENGER'
    },

    // --- LEGAL ---
    {
      id: 'insurance',
      title: 'Seguros Obrigatórios',
      category: 'RCTR-C / RC-DC',
      description: 'Emissão e Averbação automática (Lei 14.599).',
      icon: <FileCheck />,
      universe: 'LEGAL',
      isFeatured: true
    },
    {
      id: 'fines',
      title: 'Gestão de Multas',
      category: 'Defesa Técnica',
      description: 'Monitoramento SNE e adesão ao desconto de 40%.',
      icon: <Gavel />,
      universe: 'LEGAL'
    },
    {
      id: 'tax-reform',
      title: 'Planejamento Fiscal',
      category: 'Fiscal 2026',
      description: 'Recuperação de créditos de PIS/COFINS e Diesel.',
      icon: <Calculator />,
      universe: 'LEGAL'
    },
    {
      id: 'compliance',
      title: 'Compliance',
      category: 'Auditoria',
      description: 'Análise de risco da frota e motoristas (Matriz de Risco).',
      icon: <ShieldAlert />,
      universe: 'LEGAL'
    }
  ];

  const displayedServices = allServices.filter(s => s.universe === activeUniverse);

  return (
    <div className="py-20 bg-slate-950 transition-colors duration-500 relative" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-hlx-gold font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">Painel de Soluções</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white">
            O Que Você Precisa Hoje?
          </h3>
        </div>

        {/* NAVEGAÇÃO DE UNIVERSOS (TABS MODERNAS) - RESPONSIVA */}
        <div className="flex overflow-x-auto md:flex-wrap md:justify-center gap-4 mb-12 pb-4 md:pb-0 custom-scrollbar snap-x px-4 md:px-0">
            {[
                { id: 'ECOSYSTEM', label: 'Mundo do Assinante', icon: Crown },
                { id: 'CARGO', label: 'Carga & Logística', icon: CustomTruckIcon },
                { id: 'PASSENGER', label: 'Passageiros & Turismo', icon: Bus },
                { id: 'LEGAL', label: 'Jurídico & Fiscal', icon: Gavel },
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveUniverse(tab.id as UniverseType)}
                    className={`
                        flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 border-2 flex-shrink-0 snap-center whitespace-nowrap
                        ${activeUniverse === tab.id 
                            ? 'bg-slate-800 border-hlx-gold text-white shadow-[0_0_20px_rgba(245,158,11,0.2)] md:scale-105' 
                            : 'bg-slate-900 border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300'
                        }
                    `}
                >
                    {React.createElement(tab.icon as any, { 
                        size: 20, 
                        className: activeUniverse === tab.id ? 'text-hlx-gold' : 'text-gray-500' 
                    })}
                    {tab.label}
                </button>
            ))}
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {displayedServices.map((service, idx) => (
            <ServiceCard 
              key={idx} 
              {...service} 
              onClick={() => onServiceSelect(service.id)}
            />
          ))}
        </div>

        {/* MENSAGEM DE RODAPÉ DA SEÇÃO */}
        <div className="mt-12 text-center">
           <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
             <Activity size={16} className="text-hlx-gold" />
             Todos os serviços incluem suporte técnico da equipe Helonex.
           </p>
        </div>

      </div>
    </div>
  );
};

export default ServicesGrid;
