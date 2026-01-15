
import React, { useState } from 'react';
import { Section, Language } from '../types';
import { Menu, X, Truck, GraduationCap, ShieldCheck, Cpu, Zap, User, LogOut, LayoutDashboard, Shield, Sun } from 'lucide-react';

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

  const navItems = [
    { id: Section.HOME, label: t[language].home, icon: <Sun size={16} /> },
    { id: Section.SERVICES, label: t[language].services, icon: <Shield size={16} /> },
    { id: Section.ACADEMY, label: t[language].academy, icon: <GraduationCap size={16} /> },
    { id: Section.MENTOR, label: t[language].mentor, icon: <Cpu size={16} /> },
  ];

  const handleNav = (section: Section) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    setIsMenuOpen(false);
  };

  if (activeSection === Section.LOGIN || activeSection === Section.ADMIN_PANEL || activeSection === Section.REGISTER) {
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
              <h1 className="font-display font-bold text-2xl tracking-tighter text-white">
                HELO<span className="text-hlx-gold">NEX</span>
              </h1>
              <p className="text-[8px] text-gray-500 font-bold tracking-[0.3em] uppercase hidden sm:block">
                Soberania em Inteligência Logística
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <nav className="flex space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-hlx-gold text-slate-900 shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
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
    </header>
  );
};

export default Header;
