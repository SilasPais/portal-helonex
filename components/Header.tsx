
import React, { useState } from 'react';
import { Section, Language } from '../types';
import { Menu, X, GraduationCap, Cpu, LogOut, Shield, Sun } from 'lucide-react';

interface HeaderProps {
  activeSection: Section;
  onNavigate: (section: Section) => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, isLoggedIn = false, onLogout, language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = {
    pt: {
      home: 'Início',
      services: 'Hub Inteligência',
      academy: 'Academia',
      mentor: 'Mentor IA',
      login: 'Acesso Restrito',
      subscribe: 'ASSINAR PRO'
    },
    es: {
      home: 'Inicio',
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

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
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
            className="flex items-center cursor-pointer group" 
            onClick={() => handleNav(Section.HOME)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-hlx-gold to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-xl border border-white/10 group-hover:rotate-3 transition-transform">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl tracking-tighter text-white leading-none">
                ROTA <span className="text-hlx-gold">66</span> BRASIL
              </h1>
              <p className="text-[8px] text-gray-500 font-bold tracking-[0.3em] uppercase hidden sm:block mt-1">
                Soberania em Inteligência Logística
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <nav className="flex space-x-1">
              <button
                onClick={() => handleNav(Section.HOME)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSection === Section.HOME ? 'bg-hlx-gold text-slate-900 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sun size={14} /> {t[language].home}
              </button>
              <button
                onClick={() => handleNav(Section.SERVICES)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSection === Section.SERVICES ? 'bg-hlx-gold text-slate-900 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Shield size={14} /> {t[language].services}
              </button>
              <button
                onClick={() => handleNav(Section.ACADEMY)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSection === Section.ACADEMY ? 'bg-hlx-gold text-slate-900 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <GraduationCap size={14} /> {t[language].academy}
              </button>
              <button
                onClick={() => handleNav(Section.MENTOR)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSection === Section.MENTOR ? 'bg-hlx-gold text-slate-900 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Cpu size={14} /> {t[language].mentor}
              </button>
            </nav>
            
            <div className="h-6 w-px bg-white/10 mx-2"></div>

            <div className="flex items-center gap-2">
               {isLoggedIn ? (
                 <>
                   <button
                    onClick={() => handleNav(Section.CLIENT_PANEL)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-white/10 text-xs font-bold transition-colors"
                   >
                     PAINEL
                   </button>
                   <button onClick={handleLogoutClick} className="text-gray-500 hover:text-red-400 p-2"><LogOut size={18} /></button>
                 </>
               ) : (
                 <>
                   <button
                    onClick={() => handleNav(Section.LOGIN)}
                    className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-all"
                  >
                    {t[language].login}
                  </button>
                   <button
                    onClick={() => handleNav(Section.OPPORTUNITY)}
                    className="bg-hlx-gold hover:bg-yellow-400 text-slate-900 px-5 py-2 rounded-lg font-bold text-xs shadow-lg shadow-yellow-500/20 transition-all"
                  >
                    {t[language].subscribe}
                  </button>
                 </>
               )}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10 p-4 space-y-2">
          <button onClick={() => handleNav(Section.HOME)} className="flex items-center gap-3 w-full p-3 text-sm font-bold text-gray-300 hover:bg-white/5 rounded-lg">
            <Sun size={18} /> {t[language].home}
          </button>
          <button onClick={() => handleNav(Section.SERVICES)} className="flex items-center gap-3 w-full p-3 text-sm font-bold text-gray-300 hover:bg-white/5 rounded-lg">
            <Shield size={18} /> {t[language].services}
          </button>
          <button onClick={() => handleNav(Section.ACADEMY)} className="flex items-center gap-3 w-full p-3 text-sm font-bold text-gray-300 hover:bg-white/5 rounded-lg">
            <GraduationCap size={18} /> {t[language].academy}
          </button>
          <button onClick={() => handleNav(Section.MENTOR)} className="flex items-center gap-3 w-full p-3 text-sm font-bold text-gray-300 hover:bg-white/5 rounded-lg">
            <Cpu size={18} /> {t[language].mentor}
          </button>
          <div className="pt-4 border-t border-white/5 space-y-2">
            {!isLoggedIn ? (
              <>
                <button onClick={() => handleNav(Section.LOGIN)} className="w-full p-3 text-sm font-bold text-gray-300">Login</button>
                <button onClick={() => handleNav(Section.OPPORTUNITY)} className="w-full p-3 text-sm font-bold bg-hlx-gold text-slate-900 rounded-lg">Assinar</button>
              </>
            ) : (
              <button onClick={() => handleNav(Section.CLIENT_PANEL)} className="w-full p-3 text-sm font-bold bg-slate-800 text-white rounded-lg">Painel do Assinante</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
