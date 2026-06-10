
import React, { useState } from 'react';
import { 
  Landmark, Map, Globe, FileText, ShieldCheck, 
  AlertTriangle, CheckCircle, ArrowRight, Truck 
} from 'lucide-react';
import StateLicensingMap from './StateLicensingMap';
import InternationalMap from './InternationalMap';
import ZmrcManager from './ZmrcManager';
import IssuanceModule from './IssuanceModule';

const GovTech: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState<'DASHBOARD' | 'STATE' | 'INTL' | 'ZMRC' | 'DOCS'>('DASHBOARD');

  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-white uppercase">GovTech</h2>
          <p className="text-gray-400">Gestão de Licenças, Documentos Fiscais e Conformidade Regulatória.</p>
        </div>
        <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowRight className="rotate-180" /> Voltar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => setActiveModule('STATE')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
            <Map size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Licenças Estaduais</h3>
          <p className="text-gray-500 text-xs mt-2">AETs, Licenças Especiais e Restrições por Estado.</p>
        </div>

        <div 
          onClick={() => setActiveModule('INTL')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
            <Globe size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Mercosul & Internacional</h3>
          <p className="text-gray-500 text-xs mt-2">Permissões de Viagem e Seguros Internacionais.</p>
        </div>

        <div 
          onClick={() => setActiveModule('ZMRC')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
            <Truck size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Logística Urbana (ZMRC)</h3>
          <p className="text-gray-500 text-xs mt-2">Gestão de VUCs, AETCs e Restrições Municipais.</p>
        </div>

        <div 
          onClick={() => setActiveModule('DOCS')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Emissor Fiscal</h3>
          <p className="text-gray-500 text-xs mt-2">CT-e, MDF-e, CIOT e Vale-Pedágio.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <ShieldCheck className="text-hlx-gold" /> Status de Conformidade
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <CheckCircle className="text-green-500" size={20} />
              <div>
                <p className="text-white font-bold">RNTRC - Transportadora</p>
                <p className="text-xs text-gray-500">Válido até 12/2028</p>
              </div>
            </div>
            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full">ATIVO</span>
          </div>
          
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <AlertTriangle className="text-yellow-500" size={20} />
              <div>
                <p className="text-white font-bold">Licença Especial (AET) - SP</p>
                <p className="text-xs text-gray-500">Vence em 15 dias</p>
              </div>
            </div>
            <button className="text-xs font-bold text-slate-900 bg-hlx-gold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors">RENOVAR</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8">
      {activeModule === 'DASHBOARD' && renderDashboard()}
      {activeModule === 'STATE' && (
        <div>
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao GovTech
          </button>
          <StateLicensingMap onBack={() => setActiveModule('DASHBOARD')} onConsultMentor={() => {}} />
        </div>
      )}
      {activeModule === 'INTL' && (
        <div>
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao GovTech
          </button>
          <InternationalMap onBack={() => setActiveModule('DASHBOARD')} onConsultMentor={() => {}} onStartCourse={() => {}} language="pt" />
        </div>
      )}
      {activeModule === 'ZMRC' && (
        <div>
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao GovTech
          </button>
          <ZmrcManager />
        </div>
      )}
      {activeModule === 'DOCS' && (
        <div>
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao GovTech
          </button>
          <IssuanceModule />
        </div>
      )}
    </div>
  );
};

export default GovTech;
