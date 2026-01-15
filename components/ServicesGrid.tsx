
import React, { useState } from 'react';
import { ServiceCardProps } from '../types';
import { 
  Bus, AlertTriangle, Map, FileCheck, ShieldAlert, Globe, Scale, 
  Crown, Gavel, Briefcase, Activity, ArrowUpRight, Smartphone, Zap, BrainCircuit, ScanFace, Star
} from 'lucide-react';

interface ServicesGridProps {
  onServiceSelect: (id: string) => void;
}

type UniverseType = 'ECOSYSTEM' | 'CARGO' | 'PASSENGER' | 'LEGAL';

const CustomTruckIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 10V19C1 20.1046 1.89543 21 3 21H16C16.5523 21 17 20.5523 17 20V19H20C20.5523 19 21 18.5523 21 18V13.8284C21 13.298 20.7893 12.7893 20.4142 12.4142L18.5858 10.5858C18.2107 10.2107 17.702 10 17.1716 10H17V5C17 3.89543 16.1046 3 15 3H3C1.89543 3 1 3.89543 1 5V10Z" />
    <circle cx="5.5" cy="19.5" r="2.5" />
    <circle cx="16.5" cy="19.5" r="2.5" />
  </svg>
);

const ServiceCard: React.FC<ServiceCardProps & { onClick: () => void; universe: UniverseType; isFeatured?: boolean }> = ({ 
  id, title, description, icon, category, onClick, universe, isFeatured 
}) => {
  
  const getTheme = () => {
    if (id === 'rntrc-tac') return 'border-hlx-gold bg-gradient-to-b from-slate-900 to-[#1e1a0a] shadow-xl scale-[1.03]';
    if (isFeatured) return 'border-hlx-gold/40 bg-slate-900 shadow-lg';
    return 'border-white/5 bg-slate-800/50 hover:border-white/20';
  };

  const getIconColor = () => {
    if (universe === 'ECOSYSTEM') return 'text-hlx-gold bg-hlx-gold/10';
    if (universe === 'PASSENGER') return 'text-blue-400 bg-blue-500/10';
    if (universe === 'LEGAL') return 'text-red-400 bg-red-500/10';
    return 'text-green-400 bg-green-500/10';
  };

  return (
    <div onClick={onClick} className={`relative rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col h-full cursor-pointer border ${getTheme()}`}>
      {isFeatured && (
        <div className="absolute top-0 right-0 bg-hlx-gold text-slate-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1">
          <Star size={10} fill="currentColor" /> {universe === 'ECOSYSTEM' ? 'EXCLUSIVO' : 'DESTAQUE'}
        </div>
      )}

      <div className="p-6 md:p-8 flex-grow relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${getIconColor()}`}>
          {icon}
        </div>
        
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block text-gray-500 group-hover:text-hlx-gold transition-colors">
          {category}
        </span>
        
        <h3 className="text-lg md:text-xl font-display font-bold mb-3 leading-tight text-white group-hover:text-hlx-gold transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 leading-relaxed font-light">
          {description}
        </p>
      </div>

      <div className="p-4 border-t border-white/5 flex justify-between items-center mt-auto bg-black/20 group-hover:bg-white/5 transition-colors">
        <span className="text-[11px] text-gray-500 group-hover:text-white transition-colors font-bold uppercase tracking-widest">
            {universe === 'ECOSYSTEM' ? 'Ativar Vantagem' : 'Ver Detalhes'}
        </span>
        <ArrowUpRight size={16} className="text-gray-500 group-hover:text-hlx-gold transition-colors" />
      </div>
    </div>
  );
};

const ServicesGrid: React.FC<ServicesGridProps> = ({ onServiceSelect }) => {
  const [activeUniverse, setActiveUniverse] = useState<UniverseType>('ECOSYSTEM');

  const allServices: (ServiceCardProps & { universe: UniverseType; isFeatured?: boolean })[] = [
    { id: 'idt-tech', title: 'Tecnologia IDT', category: 'Autonomia Digital', description: 'Emita RNTRC, CIOT e Licenças de graça via Gov.br, sem intermediários ou taxas abusivas.', icon: <Smartphone size={24} />, universe: 'ECOSYSTEM', isFeatured: true },
    { id: 'marketing-placa', title: 'Clube Marketing Placa', category: 'Economia Real', description: 'O poder da compra coletiva. Descontos em Diesel, Pneus e Seguros para membros.', icon: <Zap size={24} />, universe: 'ECOSYSTEM', isFeatured: true },
    { id: 'mentor-ia', title: 'Mentor IA Estratégico', category: 'Consultoria 24h', description: 'Auditoria jurídica e operacional via IA treinada nas normas da ANTT e Legislação 2026.', icon: <BrainCircuit size={24} />, universe: 'ECOSYSTEM' },
    { id: 'rntrc-tac', title: 'RNTRC Digital (TAC)', category: 'Autônomo', description: 'Registro oficial na ANTT para Pessoa Física. Habilitação imediata com soberania de dados.', icon: <CustomTruckIcon size={24} />, universe: 'CARGO', isFeatured: true },
    { id: 'sassmaq', title: 'Auditoria SASSMAQ', category: 'Qualidade & QSMS', description: 'Consultoria e tecnologia de visão computacional para certificação de transporte químico.', icon: <ScanFace size={24} />, universe: 'CARGO', isFeatured: true },
    { id: 'passengers-charter', title: 'Fretamento ANTT (TAF)', category: 'Turismo', description: 'Regularização para viagens interestaduais e gestão de lista de passageiros (Res. 4.777).', icon: <Bus size={24} />, universe: 'PASSENGER', isFeatured: true },
    { id: 'insurance', title: 'Seguros Obrigatórios', category: 'Lei 14.599', description: 'Gestão de RCTR-C e averbação automática integrada ao sistema ANTT.', icon: <FileCheck size={24} />, universe: 'LEGAL', isFeatured: true },
    { id: 'fines', title: 'Gestão de Multas (SNE)', category: 'JusTech', description: 'Monitoramento Renainf e protocolos de autodenúncia para conversão em advertência.', icon: <Gavel size={24} />, universe: 'LEGAL' }
  ];

  const displayedServices = allServices.filter(s => s.universe === activeUniverse);

  return (
    <div className="py-16 md:py-24 bg-slate-950 relative" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-hlx-gold font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-3">Ecossistema de Soluções</h2>
          <h3 className="text-3xl md:text-6xl font-display font-bold text-white">Hub de Inteligência</h3>
        </div>

        <div className="flex overflow-x-auto md:justify-center gap-4 mb-16 pb-4 custom-scrollbar px-2">
          {[
            { id: 'ECOSYSTEM', label: 'Mundo Assinante', icon: Crown },
            { id: 'CARGO', label: 'Carga & Logística', icon: CustomTruckIcon },
            { id: 'PASSENGER', label: 'Passageiros', icon: Bus },
            { id: 'LEGAL', label: 'Jurídico & Fiscal', icon: Gavel },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveUniverse(tab.id as UniverseType)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all border-2 flex-shrink-0 whitespace-nowrap
                ${activeUniverse === tab.id 
                  ? 'bg-slate-800 border-hlx-gold text-white shadow-[0_0_30px_rgba(245,158,11,0.15)] scale-105' 
                  : 'bg-slate-900 border-white/5 text-gray-500 hover:border-white/20 hover:bg-slate-800'}
              `}
            >
              {React.createElement(tab.icon as any, { size: 20, className: activeUniverse === tab.id ? 'text-hlx-gold' : 'text-gray-500' })}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in-up">
          {displayedServices.map((service, idx) => (
            <ServiceCard key={idx} {...service} onClick={() => onServiceSelect(service.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;
