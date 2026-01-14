
import React, { useState } from 'react';
import { 
  Search, ShieldCheck, MapPin, Star, Filter, Truck, Package, 
  ArrowRight, CheckCircle2, AlertTriangle, Briefcase, Building2, User, Bus
} from 'lucide-react';
import { VerifiedProvider, FreightDemand } from '../types';

// Mock Data para Embarcadores
const VERIFIED_PROVIDERS: VerifiedProvider[] = [
  {
    id: 'prov_1',
    name: 'TransRápido Logística',
    segment: 'CARGO',
    sealLevel: 'GOLD',
    location: 'São Paulo, SP',
    fleetSize: 45,
    rating: 4.8,
    verified: true
  },
  {
    id: 'prov_2',
    name: 'Expresso Horizonte',
    segment: 'PASSENGER',
    sealLevel: 'DIAMOND',
    location: 'Curitiba, PR',
    fleetSize: 12,
    rating: 5.0,
    verified: true
  },
  {
    id: 'prov_3',
    name: 'Carga Pesada Transportes',
    segment: 'CARGO',
    sealLevel: 'SILVER',
    location: 'Betim, MG',
    fleetSize: 8,
    rating: 4.2,
    verified: true
  }
];

const ShipperPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'post_demand'>('search');
  const [demandForm, setDemandForm] = useState<Partial<FreightDemand>>({ type: 'CARGO' });

  const getSealColor = (level: string) => {
    switch (level) {
      case 'DIAMOND': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'GOLD': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'SILVER': return 'text-gray-300 bg-gray-500/10 border-gray-500/30';
      default: return 'text-amber-600 bg-amber-600/10 border-amber-600/30';
    }
  };

  const filteredProviders = VERIFIED_PROVIDERS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
             <Briefcase size={16} /> Painel do Contratante
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Marketplace de <span className="text-hlx-gold">Confiança</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Encontre transportadores auditados pelo Sistema Helonex. 
            Reduza seu risco solidário contratando apenas quem possui o Selo de Qualidade.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-900 p-1 rounded-xl border border-white/10 flex">
            <button 
              onClick={() => setActiveTab('search')}
              className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'search' ? 'bg-slate-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              <Search size={16} /> Buscar Transportador
            </button>
            <button 
              onClick={() => setActiveTab('post_demand')}
              className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'post_demand' ? 'bg-hlx-gold text-slate-900 shadow' : 'text-gray-400 hover:text-white'}`}
            >
              <Package size={16} /> Publicar Demanda
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        {activeTab === 'search' && (
          <div className="animate-fade-in-up">
            <div className="max-w-3xl mx-auto mb-8 relative">
              <input 
                type="text" 
                placeholder="Busque por cidade, nome da empresa ou tipo de veículo..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-hlx-gold focus:ring-1 focus:ring-hlx-gold outline-none"
              />
              <Search className="absolute left-4 top-4 text-gray-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map(provider => (
                <div key={provider.id} className="bg-slate-900 border border-white/10 rounded-xl p-6 hover:border-hlx-gold/30 transition-all group relative overflow-hidden">
                  {/* Seal Badge */}
                  <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl border-b border-l text-[10px] font-bold uppercase tracking-wider ${getSealColor(provider.sealLevel)}`}>
                    Selo {provider.sealLevel}
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xl border border-white/10">
                      {provider.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">{provider.name}</h3>
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <MapPin size={10} /> {provider.location}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Segmento</span>
                      <span className="text-white font-bold flex items-center gap-1">
                        {provider.segment === 'CARGO' ? <Truck size={12}/> : <Bus size={12}/>}
                        {provider.segment === 'CARGO' ? 'Cargas' : 'Passageiros'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avaliação</span>
                      <span className="text-yellow-400 font-bold flex items-center gap-1">
                        <Star size={12} fill="currentColor" /> {provider.rating}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Frota Auditada</span>
                      <span className="text-white font-bold">{provider.fleetSize} Veículos</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                      <ShieldCheck size={14} /> Auditado
                    </div>
                    <button className="text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors">
                      Ver Perfil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'post_demand' && (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-white/10 rounded-2xl p-8 animate-fade-in-up">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <Package className="text-hlx-gold" /> Detalhes da Demanda
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Tipo</label>
                  <select 
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-hlx-gold outline-none"
                    value={demandForm.type}
                    onChange={e => setDemandForm({...demandForm, type: e.target.value as any})}
                  >
                    <option value="CARGO">Transporte de Carga</option>
                    <option value="PASSENGER">Fretamento / Passageiros</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Data Prevista</label>
                  <input 
                    type="date" 
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-hlx-gold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Título da Demanda</label>
                <input 
                  type="text" 
                  placeholder="Ex: Transporte de 15 ton de Grãos ou Ônibus para Excursão"
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-hlx-gold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Origem</label>
                  <input 
                    type="text" 
                    placeholder="Cidade/UF"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-hlx-gold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Destino</label>
                  <input 
                    type="text" 
                    placeholder="Cidade/UF"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-hlx-gold outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-gray-400 font-bold uppercase mb-3">Requisitos de Segurança</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-hlx-gold" />
                    <span className="text-sm text-gray-300">Exigir Selo Prata+</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-hlx-gold" />
                    <span className="text-sm text-gray-300">Rastreamento Obrigatório</span>
                  </label>
                </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl mt-6 shadow-lg transition-transform hover:-translate-y-1">
                Publicar para a Rede Helonex
              </button>
              <p className="text-center text-xs text-gray-500 mt-2">
                Sua demanda será enviada apenas para transportadores qualificados.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ShipperPanel;
