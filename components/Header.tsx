
import React, { useState } from 'react';
import { Section, Language, UserContext } from '../types';
import { Menu, X, GraduationCap, Cpu, LogOut, Shield, Sun, Truck, ShieldCheck, Crown, Star, Landmark, Milestone } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import QualitySeal from './QualitySeal';

interface HeaderProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onNavigateToService: (id: string) => void;
  userContext?: UserContext | null;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, isLoggedIn = false, onLogout, language, setLanguage, onNavigateToService, userContext }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = {
    pt: {
      home: 'Início',
      manifesto: 'O Manifesto',
      services: 'Sistemas',
      academy: 'Academia',
      mentor: 'Mentor IA',
      login: 'Acesso',
      subscribe: 'ASSINAR PRO'
    },
    es: {
      home: 'Inicio',
      manifesto: 'El Legado',
      services: 'Servicios',
      academy: 'Academia',
      mentor: 'Mentor IA',
      login: 'Ingresar',
      subscribe: 'SUSCRIBIRME'
    }
  };

  const handleNav = (section: Section) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  if ([Section.LOGIN, Section.ADMIN_PANEL, Section.REGISTER, Section.COURSE_PLAYER].includes(activeSection)) {
     return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-hlx-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div 
            className="flex items-center cursor-pointer group active:scale-95 transition-transform" 
            onClick={() => handleNav(Section.HOME)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-hlx-gold to-orange-500 rounded-lg flex items-center justify-center mr-3 shadow-xl border border-white/10 group-hover:rotate-3 transition-transform">
              <Sun className="text-slate-900" size={24} />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl tracking-tighter text-white leading-none uppercase">
                HELO<span className="text-hlx-gold">NEX</span>
              </h1>
              <p className="text-[8px] text-hlx-gold font-bold tracking-[0.3em] uppercase hidden sm:block mt-1">
                Soberania Logística Global
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {userContext && <QualitySeal context={userContext} />}
            <GlobalSearch onNavigate={onNavigate} onNavigateToService={onNavigateToService} />
            
            <nav className="flex space-x-1">
              {[
                { id: Section.HOME, label: t[language].home, icon: Sun },
                { id: Section.MANIFESTO, label: t[language].manifesto, icon: Star },
                { id: Section.SERVICES, label: t[language].services, icon: Shield },
                { id: Section.ACADEMY, label: t[language].academy, icon: GraduationCap },
                { id: Section.MENTOR, label: t[language].mentor, icon: Cpu },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                    activeSection === item.id ? 'bg-hlx-gold text-slate-900 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={14} /> {item.label}
                </button>
              ))}
            </nav>
            
            <div className="h-6 w-px bg-white/10"></div>

            <div className="flex items-center gap-2">
               {isLoggedIn ? (
                 <>
                   <button
                    onClick={() => handleNav(Section.CLIENT_PANEL)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-white/10 text-xs font-bold transition-all active:scale-95"
                   >
                     PAINEL
                   </button>
                   <button onClick={onLogout} className="text-gray-500 hover:text-red-400 p-2 transition-transform active:scale-90"><LogOut size={18} /></button>
                 </>
               ) : (
                 <>
                   <button onClick={() => handleNav(Section.LOGIN)} className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-all active:scale-95">{t[language].login}</button>
                   <button onClick={() => handleNav(Section.OPPORTUNITY)} className="bg-hlx-gold hover:bg-yellow-400 text-slate-900 px-5 py-2 rounded-lg font-bold text-xs shadow-lg transition-all active:scale-95">{t[language].subscribe}</button>
                 </>
               )}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 p-2 active:scale-90 transition-transform">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10 p-0 animate-fade-in-up">
          <div className="p-4 border-b border-white/10">
            <GlobalSearch 
              onNavigate={onNavigate} 
              onNavigateToService={onNavigateToService} 
              onResultClick={() => setIsMenuOpen(false)} 
            />
          </div>
          <div className="p-4 space-y-2">
            <button onClick={() => handleNav(Section.HOME)} className="flex items-center gap-3 w-full p-3 text-sm font-bold text-gray-300 hover:bg-white/5 rounded-lg active:scale-95 transition-transform"> <Sun size={18} /> {t[language].home} </button>
            <button onClick={() => handleNav(Section.MANIFESTO)} className="flex items-center gap-3 w-full p-3 text-sm font-bold text-gray-300 hover:bg-white/5 rounded-lg active:scale-95 transition-transform"> <Star size={18} /> {t[language].manifesto} </button>
            <button onClick={() => handleNav(Section.SERVICES)} className="flex items-center gap-3 w-full p-3 text-sm font-bold text-gray-300 hover:bg-white/5 rounded-lg active:scale-95 transition-transform"> <Shield size={18} /> {t[language].services} </button>
            <button onClick={() => handleNav(Section.ACADEMY)} className="flex items-center gap-3 w-full p-3 text-sm font-bold text-gray-300 hover:bg-white/5 rounded-lg active:scale-95 transition-transform"> <GraduationCap size={18} /> {t[language].academy} </button>
            <button onClick={() => handleNav(Section.MENTOR)} className="flex items-center gap-3 w-full p-3 text-sm font-bold text-gray-300 hover:bg-white/5 rounded-lg active:scale-95 transition-transform"> <Cpu size={18} /> {t[language].mentor} </button>
            {!isLoggedIn ? (
              <button onClick={() => handleNav(Section.OPPORTUNITY)} className="w-full p-4 text-sm font-black bg-gradient-to-r from-hlx-gold to-orange-500 text-slate-900 rounded-lg active:scale-95 transition-transform shadow-lg flex items-center justify-center gap-2">
                <Crown size={18} /> SEJA ASSINANTE
              </button>
            ) : (
              <button onClick={() => handleNav(Section.CLIENT_PANEL)} className="w-full p-3 text-sm font-bold bg-slate-800 text-white rounded-lg active:scale-95 transition-transform">PAINEL DO ASSINANTE</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
