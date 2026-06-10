
import React, { useState, useEffect } from 'react';
import { 
  Truck, Bus, Scale, Gavel, Crown, Zap, Briefcase, 
  BrainCircuit, Globe, FileCheck, Smartphone, Building2, 
  ScanFace, ArrowUpRight, ShieldCheck, HeartHandshake, Map, AlertTriangle, FilterX, MapPin, Handshake
} from 'lucide-react';
import { UserContext } from '../types';

interface ServicesGridProps {
  onServiceSelect: (id: string) => void;
  userContext?: UserContext | null;
}

type UniverseType = 'CARGO' | 'PASSENGER' | 'LEGAL' | 'ECOSYSTEM';

const ServiceCard: React.FC<{ 
  id: string;
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  category: string; 
  onClick: () => void; 
  universe: UniverseType; 
  isFeatured?: boolean;
}> = ({ id, title, description, icon, category, onClick, universe, isFeatured }) => {
  
  const getTheme = () => {
    if (universe === 'ECOSYSTEM') return 'border-hlx-gold/20 bg-slate-900/50 hover:border-hlx-gold/60';
    if (universe === 'CARGO') return 'border-green-500/20 bg-slate-900/50 hover:border-green-500/60';
    if (universe === 'PASSENGER') return 'border-blue-500/20 bg-slate-900/50 hover:border-blue-500/60';
    return 'border-red-500/20 bg-slate-900/50 hover:border-red-500/60';
  };

  return (
    <div onClick={onClick} className={`relative rounded-2xl overflow-hidden p-6 border cursor-pointer transition-all duration-300 group hover:-translate-y-1 active:scale-[0.98] shadow-xl flex flex-col h-full ${getTheme()}`}>
      {isFeatured && (
        <div className="absolute top-0 right-0 bg-hlx-gold text-slate-900 text-[9px] font-black px-2 py-1 rounded-bl-lg tracking-tighter z-10">
          MAIS PROCURADO
        </div>
      )}
      
      <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      
      <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block text-gray-500 group-hover:text-white transition-colors">
        {category}
      </span>

      <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-hlx-gold transition-colors">{title}</h3>
      <p className="text-xs text-gray-400 leading-relaxed flex-grow">{description}</p>
      
      <div className="mt-6 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white">
        <span>Acessar</span>
        <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </div>
    </div>
  );
};

const ServicesGrid: React.FC<ServicesGridProps> = ({ onServiceSelect, userContext }) => {
  const [activeUniverse, setActiveUniverse] = useState<UniverseType | 'ALL'>('ALL');

  // Ajusta o filtro inicial baseado no contexto se ele mudar
  useEffect(() => {
    if (userContext?.macro === 'CARGO') setActiveUniverse('CARGO');
    else if (userContext?.macro === 'PASSENGER') setActiveUniverse('PASSENGER');
    else setActiveUniverse('ALL');
  }, [userContext]);

  const allServices = [
    // --- CARGA ---
    {
        id: 'rntrc-tac',
        title: 'Emitir RNTRC (TAC)',
        category: 'Documentação',
        description: 'Tire ou renove seu registro na ANTT sem depender de terceiros. 100% Online.',
        icon: <Truck size={28} className="text-green-400" />, 
        universe: 'CARGO',
        isFeatured: true,
        targetPersonas: ['TAC']
    },
    {
        id: 'zmrc-sp',
        title: 'ZMRC / VUC São Paulo',
        category: 'Mobilidade Urbana',
        description: 'Gestão de Autorização Especial (AET) e Rodízio para rodar no centro expandido de SP.',
        icon: <MapPin size={28} className="text-green-400" />, 
        universe: 'CARGO',
        targetPersonas: ['ETC', 'TAC', 'OWN_CARGO_IND']
    },
    {
        id: 'rntrc-etc',
        title: 'Gestão de Frota (ETC)',
        category: 'Gestão',
        description: 'Controle de placas, vencimentos de RT e inclusão de veículos na frota da empresa.',
        icon: <Building2 size={28} className="text-green-400" />, 
        universe: 'CARGO',
        targetPersonas: ['ETC', 'FLEET_MANAGER']
    },
    {
        id: 'tric-otm',
        title: 'Habilitação Internacional (TRIC/OTM)',
        category: 'Soberania Global',
        description: 'Licença Originária para Mercosul e Operador Multimodal. Sua frota sem fronteiras.',
        icon: <Globe size={28} className="text-hlx-gold" />, 
        universe: 'CARGO',
        isFeatured: true,
        targetPersonas: ['ETC', 'FLEET_MANAGER']
    },
    
    // --- PASSAGEIROS ---
    {
        id: 'passengers-charter',
        title: 'Licença ANTT (TAF)',
        category: 'Interestadual',
        description: 'Habilitação para turismo e fretamento contínuo sob a nova regra de Regulação Responsiva.',
        icon: <Bus size={28} className="text-blue-400" />,
        universe: 'PASSENGER',
        isFeatured: true
    },
    {
        id: 'state-auth',
        title: 'Licença Estadual (DER)',
        category: 'Intermunicipal',
        description: 'Regularize sua van ou ônibus para rodar dentro do estado (ARTESP, DER, AGERBA).',
        icon: <Map size={28} className="text-blue-400" />,
        universe: 'PASSENGER'
    },

    // --- JURÍDICO & COMPLIANCE (Para Todos) ---
    {
        id: 'helonex-resolve',
        title: 'Helonex Resolve (ODR)',
        category: 'Corte Arbitral Digital',
        description: 'Mediação online para conflitos de frete, estadia e avarias. Acordo rápido com validade jurídica.',
        icon: <Handshake size={28} className="text-red-400" />,
        universe: 'LEGAL',
        isFeatured: true
    },
    {
        id: 'fines',
        title: 'Radar de Multas (SNE)',
        category: 'Proteção CNH',
        description: 'Monitoramento diário. Habilitamos o desconto de 40% via SNE caso o recurso não seja estratégico.',
        icon: <AlertTriangle size={28} className="text-red-400" />,
        universe: 'LEGAL'
    },
    {
        id: 'insurance',
        title: 'Seguros Obrigatórios',
        category: 'RCTR-C / RC-DC',
        description: 'Averbação automática. Evite o bloqueio do seu RNTRC por falta de seguro.',
        icon: <FileCheck size={28} className="text-red-400" />,
        universe: 'LEGAL'
    },

    // --- ECOSSISTEMA (Para Todos) ---
    {
        id: 'idt-tech',
        title: 'Método IDT (EduTech)',
        category: 'Capacitação',
        description: 'Cursos que geram dinheiro. MOPP, Indivisíveis e Gestão na palma da mão.',
        icon: <Smartphone size={28} className="text-hlx-gold" />,
        universe: 'ECOSYSTEM',
        isFeatured: true
    },
    {
        id: 'mentor-ia',
        title: 'Tira-Dúvidas 24h',
        category: 'Suporte',
        description: 'Pergunte qualquer coisa sobre legislação para nossa IA especializada.',
        icon: <BrainCircuit size={28} className="text-hlx-gold" />,
        universe: 'ECOSYSTEM'
    },
    {
        id: 'helonex-vision',
        title: 'Helonex Vision',
        category: 'Auditoria Visual',
        description: 'Monitoramento por IA integrado a ISO/SASSMAQ. Identifica não-conformidades e propõe correções em tempo real.',
        icon: <ScanFace size={28} className="text-hlx-gold" />,
        universe: 'ECOSYSTEM',
        isFeatured: true
    }
  ];

  // Filtro Inteligente
  const displayedServices = allServices.filter(s => {
    // 1. Se filtro manual estiver ativo, respeita ele (exceto Legal e Eco que aparecem sempre se relevante)
    if (activeUniverse !== 'ALL') {
        if (s.universe === activeUniverse) return true;
        if (s.universe === 'LEGAL' || s.universe === 'ECOSYSTEM') return true; // Sempre mostra Legal/Eco
        return false;
    }
    
    // 2. Se tiver UserContext, filtra pelo contexto
    if (userContext) {
        if (s.targetPersonas && !s.targetPersonas.includes(userContext.persona)) return false;
        // Serviços universais (Legal/Eco) sempre aparecem
        if (s.universe === 'LEGAL' || s.universe === 'ECOSYSTEM') return true;
        // Serviços do macro segmento (Cargo/Passageiro)
        if (userContext.macro === 'CARGO' && s.universe === 'CARGO') return true;
        if (userContext.macro === 'PASSENGER' && s.universe === 'PASSENGER') return true;
        return false;
    }

    // 3. Default: Mostra tudo se não tiver contexto nem filtro
    return true;
  });

  return (
    <div className="py-20 px-4 bg-slate-950 relative" id="services-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          {userContext && (
             <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-slate-800 border border-white/10 text-xs text-gray-400">
                <span className="font-bold text-white">Perfil Ativo:</span> {userContext.persona}
                <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="ml-2 hover:text-red-400"><FilterX size={12} /></button>
             </div>
          )}
          <h2 className="text-hlx-gold font-bold tracking-[0.2em] uppercase text-xs mb-2">Acervo Tecnológico</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter">Soluções Aplicadas</h3>
        </div>

        {/* Abas de Navegação */}
        <div className="flex gap-2 mb-12 pb-4 overflow-x-auto custom-scrollbar md:justify-center justify-start px-4 md:px-0 -mx-4 md:mx-0">
          {[
            { id: 'ALL', label: 'Ver Tudo', icon: Crown },
            { id: 'CARGO', label: 'Cargas', icon: Truck },
            { id: 'PASSENGER', label: 'Passageiros', icon: Bus },
            { id: 'LEGAL', label: 'Jurídico', icon: Scale },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveUniverse(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs transition-all active:scale-95 border whitespace-nowrap flex-shrink-0 first:ml-4 last:mr-4 md:first:ml-0 md:last:mr-0
                ${activeUniverse === tab.id 
                  ? 'bg-slate-800 border-hlx-gold text-white shadow-lg' 
                  : 'bg-slate-900 border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'}
              `}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service) => (
            <ServiceCard 
              key={service.id} 
              {...service} 
              onClick={() => onServiceSelect(service.id)} 
              universe={service.universe as UniverseType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;
