
import React from 'react';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { Section } from '../types';

interface BreadcrumbsProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
}

interface BreadcrumbStep {
  label: string;
  section: Section;
  icon?: React.ReactNode;
  active?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeSection, onNavigate }) => {
  
  // Mapeamento da Hierarquia do Site (O Mapa Mental)
  const getPath = (section: Section): BreadcrumbStep[] | null => {
    const home: BreadcrumbStep = { label: 'Início', section: Section.HOME, icon: <Home size={14} /> };
    
    switch (section) {
      case Section.HOME:
        return null; // Não mostra na Home
      
      case Section.SERVICES:
        return [home, { label: 'Catálogo de Serviços', section: Section.SERVICES }];
      
      case Section.SERVICE_DETAIL:
        return [
            home, 
            { label: 'Catálogo de Serviços', section: Section.SERVICES }, 
            { label: 'Detalhes Técnicos', section: Section.SERVICE_DETAIL, active: true }
        ];
      
      case Section.STATE_LICENSING:
        return [
            home, 
            { label: 'Catálogo de Serviços', section: Section.SERVICES }, 
            { label: 'Licenciamento Estadual', section: Section.STATE_LICENSING, active: true }
        ];

      case Section.ACADEMY:
        return [home, { label: 'Academia', section: Section.ACADEMY }];

      case Section.INTERNATIONAL_MAP:
        return [
            home, 
            { label: 'Academia', section: Section.ACADEMY },
            { label: 'Mapa Internacional', section: Section.INTERNATIONAL_MAP, active: true }
        ];

      case Section.COURSE_PLAYER:
        return [
            home, 
            { label: 'Academia', section: Section.ACADEMY },
            { label: 'Mapa Internacional', section: Section.INTERNATIONAL_MAP },
            { label: 'Sala de Aula', section: Section.COURSE_PLAYER, active: true }
        ];

      case Section.DASHBOARD:
        return [home, { label: 'Painel do Cliente', section: Section.DASHBOARD, active: true }];
      
      case Section.CLIENT_PANEL:
        return [home, { label: 'Área do Assinante', section: Section.CLIENT_PANEL, active: true }];

      case Section.MENTOR:
        return [home, { label: 'Mentor IA', section: Section.MENTOR, active: true }];

      case Section.OPPORTUNITY:
        return [home, { label: 'Assinatura', section: Section.OPPORTUNITY, active: true }];

      case Section.UNDER_CONSTRUCTION:
        return [home, { label: 'Em Construção', section: Section.UNDER_CONSTRUCTION, active: true }];

      case Section.LOGIN:
        return [home, { label: 'Login', section: Section.LOGIN, active: true }];

      case Section.ADMIN_PANEL:
        return [home, { label: 'Administração', section: Section.ADMIN_PANEL, active: true }];

      case Section.SOLUTION_SHOWCASE:
        return [home, { label: 'Soluções & Planos', section: Section.SOLUTION_SHOWCASE, active: true }];

      case Section.NEWS_BOARD:
        return [home, { label: 'Diário do Trecho', section: Section.NEWS_BOARD, active: true }];

      default:
        return [home];
    }
  };

  const path = getPath(activeSection);

  if (!path) return null;

  return (
    // FIX: 'relative' no mobile para rolar com a página e não cobrir conteúdo. 'sticky' apenas no desktop (md:sticky).
    <div className="bg-slate-900 border-b border-white/5 relative md:sticky md:top-20 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-sm overflow-x-auto whitespace-nowrap custom-scrollbar">
          
          {/* Botão de Voltar Rápido (Mobile Friendly) */}
          <button 
            onClick={() => onNavigate(path[path.length - 2]?.section || Section.HOME)}
            className="mr-4 md:hidden flex items-center gap-1 text-gray-400 hover:text-white border-r border-white/10 pr-4 active:scale-95 transition-transform"
          >
            <ArrowLeft size={16} /> Voltar
          </button>

          {path.map((step, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight size={14} className="text-gray-600 mx-2" />}
              
              <button
                onClick={() => !step.active && onNavigate(step.section)}
                disabled={step.active}
                className={`flex items-center gap-2 transition-all ${
                  step.active 
                    ? 'text-hlx-gold font-bold cursor-default' 
                    : 'text-gray-400 hover:text-white active:scale-95'
                }`}
              >
                {step.icon && step.icon}
                {step.label}
              </button>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
