
import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, AlertTriangle, ShieldAlert, Sun, Scale } from 'lucide-react';
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
      <div className="bg-amber-500/10 border-b border-amber-500/20 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-amber-500/20 p-3 rounded-lg flex-shrink-0">
              <ShieldAlert className="text-amber-500" size={32} />
            </div>
            <div>
              <h4 className="text-amber-500 font-bold font-display text-lg mb-2 uppercase tracking-wide flex items-center gap-2">
                Aviso Legal & Regulação Responsiva
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                <strong>NÃO POSSUÍMOS VÍNCULO</strong> com a ANTT (Federal), ARTESP (SP), DETRO (RJ) ou qualquer órgão governamental.
                O <strong>Portal HELONEX</strong> é uma plataforma privada de inteligência logística.
                <br/><br/>
                <strong className="text-white">NOTA TÉCNICA 2026:</strong> Nossos processos seguem estritamente a lógica da <strong>Regulação Responsiva (Resolução ANTT 6.033)</strong>.
                Nosso foco não é apenas a emissão de documentos, mas a manutenção do seu <strong>IQT (Índice de Qualidade do Transporte)</strong> em níveis de excelência.
              </p>
              
              <div className="bg-slate-900/50 p-4 rounded border border-amber-500/10">
                <p className="text-xs text-gray-400 font-bold uppercase mb-2">O QUE NÃO FAZEMOS (NÃO ATENDEMOS):</p>
                <ul className="text-xs text-gray-400 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <li className="flex items-center gap-2"><span className="text-red-500">×</span> Multas de Trânsito (Defesa)</li>
                  <li className="flex items-center gap-2"><span className="text-red-500">×</span> Serasa / Limpa Nome</li>
                  <li className="flex items-center gap-2"><span className="text-red-500">×</span> ID-Jovem / Passe-Livre</li>
                  <li className="flex items-center gap-2"><span className="text-red-500">×</span> CNH Social / Detran</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-hlx-gold to-orange-500 rounded flex items-center justify-center mr-2 shadow-lg">
                <span className="font-display font-bold text-slate-900 text-xs">HLX</span>
              </div>
              <h3 className="text-white font-bold text-lg font-display">HELONEX BRASIL</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              <strong>O Ecossistema da Prosperidade.</strong><br/>
              Inteligência Logística e Regulatória.<br/>
              Powered by <strong>HELONEX GOVTECH</strong>.
            </p>
            <p className="text-hlx-gold text-xs font-bold mb-4">"NÃO VENDEMOS LICENÇAS, CUIDAMOS DE VIDAS."</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-hlx-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-hlx-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-hlx-gold transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display tracking-wider">INSTITUCIONAL</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><button onClick={(e) => handleLinkClick(e, 'Quem Somos')} className="hover:text-hlx-gold transition-colors text-left">Quem Somos</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'Filosofia')} className="hover:text-hlx-gold transition-colors text-left">Filosofia HELONEX</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'Portal HELONEX')} className="hover:text-hlx-gold transition-colors text-left">Portal do Cliente</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'Academia')} className="hover:text-hlx-gold transition-colors text-left">Academia</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'Localizacao')} className="hover:text-hlx-gold transition-colors text-left">Localização</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display tracking-wider">SERVIÇOS</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><button onClick={(e) => handleLinkClick(e, 'RNTRC Digital')} className="hover:text-hlx-gold transition-colors text-left">RNTRC Digital</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'Passageiros')} className="hover:text-hlx-gold transition-colors text-left">ANTT Passageiros</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'MOPP')} className="hover:text-hlx-gold transition-colors text-left">Licenças Especiais (MOPP)</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'Consultoria')} className="hover:text-hlx-gold transition-colors text-left">Consultoria Especializada</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-display tracking-wider">CONTATO</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-hlx-gold mt-1 flex-shrink-0" />
                <span>Atendimento Nacional<br/>(Online e Presencial)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-hlx-gold flex-shrink-0" />
                <span>0800 660 6666</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-hlx-gold flex-shrink-0" />
                <span>contato@helonex.global</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} HELONEX BRASIL (Assessoria Nacional ao Transporte Terrestre). Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors">Termos de Uso</button>
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors">Privacidade</button>
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors flex items-center gap-1"><ShieldAlert size={12}/> LGPD</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
