
import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ShieldAlert, Sun } from 'lucide-react';
import { Section } from '../types';

interface FooterProps {
  onNavigateToConstruction?: (area: string) => void;
  onOpenPrivacy: () => void;
  onNavigate?: (section: Section) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateToConstruction, onOpenPrivacy, onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, area: string) => {
    e.preventDefault();
    if (area === 'Quem Somos' && onNavigate) {
        onNavigate(Section.ABOUT);
        return;
    }
    if (onNavigateToConstruction) {
      onNavigateToConstruction(area);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-0 pb-8">
      <div className="bg-hlx-blue/10 border-b border-hlx-blue/20 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-hlx-blue/20 p-3 rounded-lg flex-shrink-0">
              <ShieldAlert className="text-hlx-blue" size={32} />
            </div>
            <div>
              <h4 className="text-hlx-blue font-bold font-display text-lg mb-2 uppercase tracking-wide">
                Aviso Legal & Regulação Responsiva
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                <strong>NÃO POSSUÍMOS VÍNCULO</strong> com a ANTT ou qualquer órgão governamental.
                O <strong>Portal HELONEX</strong> é uma plataforma privada de inteligência.
                Nossos processos seguem a lógica da <strong>Regulação Responsiva (Resolução ANTT 6.033)</strong> para garantir seu IQT.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-hlx-gold to-orange-500 rounded flex items-center justify-center mr-2 shadow-lg">
                <Sun className="text-white" size={16} />
              </div>
              <h3 className="text-white font-bold text-lg font-display">HELONEX BRASIL</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Ecossistema de Inteligência Logística.<br/>
              Powered by <strong>HELONEX GOVTECH</strong>.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-hlx-gold"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-hlx-gold"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-hlx-gold"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display tracking-wider uppercase text-sm">Institucional</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><button onClick={(e) => handleLinkClick(e, 'Quem Somos')} className="hover:text-hlx-gold transition-colors">Quem Somos</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'Filosofia')} className="hover:text-hlx-gold transition-colors">Filosofia Helonex</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'Compliance')} className="hover:text-hlx-gold transition-colors">Compliance & LGPD</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display tracking-wider uppercase text-sm">Serviços</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><button onClick={(e) => handleLinkClick(e, 'GovTech')} className="hover:text-hlx-gold transition-colors">GovTech (ANTT/RNTRC)</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'EduTech')} className="hover:text-hlx-gold transition-colors">EduTech (Cursos)</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'JusTech')} className="hover:text-hlx-gold transition-colors">JusTech (Jurídico)</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display tracking-wider uppercase text-sm">Contato</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-hlx-gold mt-1" />
                <span>Atendimento Nacional Digital</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-hlx-gold" />
                <span>suporte@helonex.global</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} HELONEX BRASIL. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors">Privacidade</button>
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors">LGPD</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
