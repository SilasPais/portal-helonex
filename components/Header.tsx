import React, { useState } from 'react';
import { Section, Language } from '../types';
import { Menu, X, Truck, GraduationCap, ShieldCheck, Cpu, Zap, User, LogOut, LayoutDashboard, Users } from 'lucide-react';

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
      services: 'Soluções GovTech',
      academy: 'Academia',
      community: 'Comunidade',
      mentor: 'Mentor IA',
      dashboard: 'Painel',
      login: 'Entrar',
      subscribe: 'ASSINAR PRO'
    },
    es: {
      home: 'Inicio',
      services: 'Soluciones',
      academy: 'Academia',
      community: 'Comunidad',
      mentor: 'Mentor IA',
      dashboard: 'Panel',
      login: 'Ingresar',
      subscribe: 'SUSCRIBIRME'
    }
  };

  const navItems = [
    { id: Section.HOME, label: t[language].home, icon: <ShieldCheck size={16} /> },
    { id: Section.SERVICES, label: t[language].services, icon: <Truck size={16} /> },
    { id: Section.ACADEMY, label: t[language].academy, icon: <GraduationCap size={16} /> },
    { id: Section.NEWS_BOARD, label: t[language].community, icon: <Users size={16} /> },
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
          
          {/* LOGO MASTER HELONEX */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => handleNav(Section.HOME)}
            title="Voltar ao Início"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-hlx-gold to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-lg border border-white/10 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} className="text-slate-900" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl tracking-wide text-white flex items-center gap-1">
                PORTAL <span className="text-hlx-gold">HELONEX</span>
              </h1>
              <p className="text-[9px] text-gray-400 font-bold tracking-[0.1em] uppercase hidden sm:block">
                INTELLIGENCE SYSTEM 2026
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm font-bold transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-hlx-gold text-slate-900 shadow-lg shadow-yellow-500/20 scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="h-6 w-px bg-white/20 mx-2"></div>

            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-white/10">
              <button onClick={() => setLanguage('pt')} className={`px-2 py-1 rounded text-[10px] font-bold ${language === 'pt' ? 'bg-hlx-gold text-slate-900' : 'text-gray-400 hover:text-white'}`}>BR</button>
              <button onClick={() => setLanguage('es')} className={`px-2 py-1 rounded text-[10px] font-bold ${language === 'es' ? 'bg-hlx-gold text-slate-900' : 'text-gray-400 hover:text-white'}`}>ES</button>
            </div>

            <div className="flex items-center gap-3">
               {isLoggedIn ? (
                 <>
                   <button
                    onClick={() => handleNav(Section.CLIENT_PANEL)}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-white/10 transition-colors"
                   >
                     <LayoutDashboard size={16} />
                     <span className="text-xs font-bold hidden lg:inline">{t[language].dashboard}</span>
                   </button>
                   <button
                    onClick={handleLogoutClick}
                    className="text-gray-400 hover:text-red-400 p-2"
                    title="Sair"
                   >
                     <LogOut size={18} />
                   </button>
                 </>
               ) : (
                 <>
                   <button
                    onClick={() => handleNav(Section.LOGIN)}
                    className="px-3 py-2 text-xs font-bold text-gray-200 border border-white/20 rounded-lg hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
                  >
                    <User size={14} />
                    {t[language].login}
                  </button>
                  <button
                    onClick={() => handleNav(Section.OPPORTUNITY)}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg shadow-green-500/20"
                  >
                    <Zap size={14} />
                    {t[language].subscribe}
                  </button>
                 </>
               )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-hlx-navy border-b border-white/10 shadow-xl backdrop-blur-md animate-fade-in-down z-50">
            <nav className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-3 text-sm font-bold p-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-hlx-gold text-slate-900'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                 {!isLoggedIn ? (
                   <>
                    <button onClick={() => handleNav(Section.LOGIN)} className="p-3 bg-slate-800 rounded-lg text-white font-bold text-xs text-center border border-white/10">Entrar</button>
                    <button onClick={() => handleNav(Section.OPPORTUNITY)} className="p-3 bg-green-600 rounded-lg text-white font-bold text-xs text-center shadow-lg">Assinar</button>
                   </>
                 ) : (
                    <button onClick={handleLogoutClick} className="col-span-2 p-3 bg-red-500/20 text-red-400 rounded-lg font-bold text-xs text-center border border-red-500/30">Sair</button>
                 )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
