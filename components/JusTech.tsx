
import React, { useState } from 'react';
import { 
  Scale, ShieldCheck, Gavel, FileText, Lock, 
  ArrowRight, Users, BookOpen, Handshake
} from 'lucide-react';
import ODRConsole from './ODRConsole';
import PrivacyCenter from './PrivacyCenter';
import ConciliationSimulator from './ConciliationSimulator';
import JusTechMediation from './JusTechMediation';

const JusTech: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState<'DASHBOARD' | 'ODR' | 'PRIVACY' | 'SIMULATOR' | 'MEDIATION'>('DASHBOARD');

  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-white uppercase">JusTech</h2>
          <p className="text-gray-400">Justiça Digital, Resolução de Conflitos e Conformidade LGPD.</p>
        </div>
        <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowRight className="rotate-180" /> Voltar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => setActiveModule('MEDIATION')}
          className="bg-gradient-to-br from-slate-900 to-slate-800 border border-hlx-gold/30 p-6 rounded-2xl hover:border-hlx-gold cursor-pointer transition-all group shadow-lg shadow-hlx-gold/5"
        >
          <div className="w-12 h-12 bg-hlx-gold/20 rounded-xl flex items-center justify-center text-hlx-gold mb-4 group-hover:scale-110 transition-transform">
            <Handshake size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Câmara de Conciliação</h3>
          <p className="text-hlx-gold text-xs mt-1 font-bold uppercase tracking-wider">Mediação Expressa</p>
          <p className="text-gray-400 text-xs mt-2">Evite tribunais com nossa IA mediadora.</p>
        </div>

        <div 
          onClick={() => setActiveModule('ODR')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-hlx-gold/10 rounded-xl flex items-center justify-center text-hlx-gold mb-4 group-hover:scale-110 transition-transform">
            <Scale size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Resolução de Disputas (ODR)</h3>
          <p className="text-gray-500 text-xs mt-2">Mediação online, acordos extrajudiciais e arbitragem.</p>
        </div>

        <div 
          onClick={() => setActiveModule('PRIVACY')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
            <Lock size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Privacidade & LGPD</h3>
          <p className="text-gray-500 text-xs mt-2">Gestão de dados, consentimento e conformidade.</p>
        </div>

        <div 
          onClick={() => setActiveModule('SIMULATOR')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <Gavel size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Simulador de Acordos</h3>
          <p className="text-gray-500 text-xs mt-2">Cálculo de riscos e propostas de conciliação.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen className="text-hlx-gold" /> Biblioteca Jurídica Inteligente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
            <h4 className="text-white font-bold text-sm">Marco Civil da Internet</h4>
            <p className="text-xs text-gray-500 mt-1">Direitos e deveres no uso da internet no Brasil.</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
            <h4 className="text-white font-bold text-sm">Lei do Motorista (13.103/2015)</h4>
            <p className="text-xs text-gray-500 mt-1">Regulamentação da profissão e tempo de direção.</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
            <h4 className="text-white font-bold text-sm">Código de Defesa do Consumidor</h4>
            <p className="text-xs text-gray-500 mt-1">Aplicabilidade em contratos de transporte.</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
            <h4 className="text-white font-bold text-sm">Resoluções ANTT</h4>
            <p className="text-xs text-gray-500 mt-1">Atualizações sobre RNTRC, CIOT e Vale-Pedágio.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8">
      {activeModule === 'DASHBOARD' && renderDashboard()}
      {activeModule === 'ODR' && (
        <div>
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao JusTech
          </button>
          <ODRConsole />
        </div>
      )}
      {activeModule === 'PRIVACY' && (
        <div>
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao JusTech
          </button>
          <PrivacyCenter onClose={() => setActiveModule('DASHBOARD')} />
        </div>
      )}
      {activeModule === 'SIMULATOR' && (
        <div>
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao JusTech
          </button>
          <ConciliationSimulator />
        </div>
      )}
      {activeModule === 'MEDIATION' && (
        <div className="animate-fade-in-up max-w-4xl mx-auto">
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao JusTech
          </button>
          
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Câmara de Conciliação (Mediação Expressa)</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto border-l-4 border-hlx-gold pl-4 text-left italic">
              "Evite anos de desgaste em tribunais. Utilize a Inteligência Artificial da Helonex para calcular o risco jurídico do seu conflito e propor um Acordo Extrajudicial com validade legal."
            </p>
          </div>

          <JusTechMediation />
        </div>
      )}
    </div>
  );
};

export default JusTech;
