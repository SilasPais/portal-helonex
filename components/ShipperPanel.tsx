
import React, { useState } from 'react';
import { 
  Search, ShieldCheck, MapPin, Star, Filter, Truck, Package, 
  ArrowRight, CheckCircle2, AlertTriangle, Briefcase, Building2, User, Bus,
  TrendingUp, TrendingDown, DollarSign, Zap, Clock, ThumbsUp, RefreshCcw
} from 'lucide-react';
import { VerifiedProvider, FreightDemand } from '../types';
import BackupManager from './BackupManager';

// Mock Data para Embarcadores - Agora com Pricing IA
const VERIFIED_PROVIDERS: VerifiedProvider[] = [
  {
    id: 'prov_1',
    name: 'TransRápido Logística',
    segment: 'CARGO',
    sealLevel: 'GOLD',
    location: 'São Paulo, SP',
    fleetSize: 45,
    rating: 4.8,
    verified: true,
    // Novos campos
    trustScore: 98,
    pricePerKm: 4.50,
    matchesDemand: true
  },
  {
    id: 'prov_2',
    name: 'Expresso Horizonte',
    segment: 'PASSENGER',
    sealLevel: 'DIAMOND',
    location: 'Curitiba, PR',
    fleetSize: 12,
    rating: 5.0,
    verified: true,
    trustScore: 99,
    pricePerKm: 5.20,
    matchesDemand: false
  },
  {
    id: 'prov_3',
    name: 'Carga Pesada Transportes',
    segment: 'CARGO',
    sealLevel: 'SILVER',
    location: 'Betim, MG',
    fleetSize: 8,
    rating: 4.2,
    verified: true,
    trustScore: 85,
    pricePerKm: 4.10,
    matchesDemand: true
  }
];

const ShipperPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'post_demand' | 'analytics'>('search');
  const [demandForm, setDemandForm] = useState<Partial<FreightDemand>>({ type: 'CARGO' });
  const [dieselPrice, setDieselPrice] = useState(6.10);
  const [showBackupModal, setShowBackupModal] = useState(false);

  // IA Pricing Logic (Simulada)
  const marketAverage = 4.30;

  const calculateFreight = (basePrice: number, dieselCoefficient: number) => {
      // Fórmula simplificada: Base + (Diesel * Coeficiente de Consumo/Impacto)
      return basePrice + (dieselPrice * dieselCoefficient);
  };
  
  const getSealColor = (level: string) => {
    switch (level) {
      case 'DIAMOND': return 'text-cyan-400 bg-cyan-900/30 border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]';
      case 'GOLD': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50 shadow-[0_0_10px_rgba(250,204,21,0.2)]';
      case 'SILVER': return 'text-gray-300 bg-gray-800 border-gray-500/50';
      default: return 'text-amber-600 bg-amber-900/20 border-amber-600/30';
    }
  };

  const filteredProviders = VERIFIED_PROVIDERS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER TIPO "SPOT MARKET" */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
             <Briefcase size={14} /> Shipper Intelligence 2.0
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Marketplace de <span className="text-transparent bg-clip-text bg-gradient-to-r from-hlx-gold to-orange-500">Confiança</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Não contrate apenas frete. Contrate <strong>compliance</strong>. 
            Nossa IA filtra transportadores pelo Índice de Qualidade (IQT) e sugere o preço justo de mercado.
          </p>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex justify-between items-center mb-10">
          <div className="bg-slate-900 p-1.5 rounded-xl border border-white/10 flex shadow-xl mx-auto">
            <button 
              onClick={() => setActiveTab('search')}
              className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'search' ? 'bg-slate-700 text-white shadow ring-1 ring-white/10' : 'text-gray-400 hover:text-white'}`}
            >
              <Search size={16} /> Encontrar Parceiro
            </button>
            <button 
              onClick={() => setActiveTab('post_demand')}
              className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'post_demand' ? 'bg-hlx-gold text-slate-900 shadow' : 'text-gray-400 hover:text-white'}`}
            >
              <Package size={16} /> Publicar Carga
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'analytics' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              <TrendingUp size={16} /> Market Pricing
            </button>
          </div>
          <button onClick={() => setShowBackupModal(true)} className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-white/10 font-bold text-sm transition-all shadow-md">
             <RefreshCcw size={18} />
             <span>Backup</span>
          </button>
        </div>

        {/* CONTENT AREA: SEARCH (SMART MATCH) */}
        {activeTab === 'search' && (
          <div className="animate-fade-in-up">
            <div className="max-w-3xl mx-auto mb-8 relative">
              <input 
                type="text" 
                placeholder="Busque por rota, cidade ou tipo de veículo..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl py-5 pl-14 pr-4 text-white text-lg focus:border-hlx-gold focus:ring-1 focus:ring-hlx-gold outline-none shadow-2xl placeholder:text-gray-600"
              />
              <Search className="absolute left-5 top-5 text-gray-500" size={24} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProviders.map(provider => {
                  // Lógica visual de Pricing
                  const priceDiff = ((provider.pricePerKm! - marketAverage) / marketAverage) * 100;
                  const isGoodPrice = priceDiff < 0;

                  return (
                    <div key={provider.id} className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-hlx-gold/30 transition-all group relative overflow-hidden shadow-lg">
                      
                      {/* Seal Badge */}
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getSealColor(provider.sealLevel)}`}>
                        Selo {provider.sealLevel}
                      </div>

                      <div className="flex items-start gap-5 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-2xl border border-white/10 shrink-0">
                          {provider.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-xl leading-tight mb-1 group-hover:text-hlx-gold transition-colors">{provider.name}</h3>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                             <span className="flex items-center gap-1"><MapPin size={12}/> {provider.location}</span>
                             <span className="flex items-center gap-1"><Truck size={12}/> {provider.fleetSize} Veículos</span>
                          </div>
                        </div>
                      </div>

                      {/* KPIs de Confiança */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                         <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-center">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Trust Score</p>
                            <p className="text-lg font-bold text-green-400">{provider.trustScore}%</p>
                         </div>
                         <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-center">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Avaliação</p>
                            <p className="text-lg font-bold text-yellow-400 flex items-center justify-center gap-1"><Star size={14} fill="currentColor"/> {provider.rating}</p>
                         </div>
                         <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-center">
                            <p className="text-[10px] text-gray-500 uppercase font-bold">Sinistralidade</p>
                            <p className="text-lg font-bold text-white">0%</p>
                         </div>
                      </div>

                      {/* Pricing Insight */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex flex-col">
                           <span className="text-[10px] text-gray-500 uppercase font-bold">Oferta Sugerida</span>
                           <span className="text-xl font-bold text-white">R$ {provider.pricePerKm?.toFixed(2)}/km</span>
                        </div>
                        
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold ${isGoodPrice ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
                           {isGoodPrice ? <TrendingDown size={14}/> : <TrendingUp size={14}/>}
                           {Math.abs(priceDiff).toFixed(0)}% {isGoodPrice ? 'Abaixo' : 'Acima'} da Média
                        </div>

                        <button className="text-sm font-bold text-slate-900 bg-white hover:bg-hlx-gold px-6 py-2.5 rounded-lg transition-colors shadow-lg">
                          Contratar
                        </button>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        )}

        {/* CONTENT AREA: POST DEMAND (WIZARD) */}
        {activeTab === 'post_demand' && (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-white/10 rounded-2xl p-8 animate-fade-in-up shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Package size={200}/></div>

            <h3 className="text-white font-bold text-2xl mb-2 relative z-10">Publicar Demanda</h3>
            <p className="text-gray-400 text-sm mb-8 relative z-10">O algoritmo da Helonex enviará sua carga apenas para transportadores com Score de Confiança compatível.</p>
            
            <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Tipo de Operação</label>
                  <select 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-hlx-gold outline-none appearance-none"
                    value={demandForm.type}
                    onChange={e => setDemandForm({...demandForm, type: e.target.value as any})}
                  >
                    <option value="CARGO">Transporte de Carga</option>
                    <option value="PASSENGER">Fretamento / Passageiros</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Data Prevista</label>
                  <input 
                    type="date" 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-hlx-gold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Descrição da Carga</label>
                <input 
                  type="text" 
                  placeholder="Ex: 30 ton de Soja a granel ou Ônibus Leito para 44 pax"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-hlx-gold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Origem</label>
                  <div className="relative">
                     <MapPin className="absolute left-4 top-4 text-gray-600" size={18}/>
                     <input type="text" placeholder="Cidade/UF" className="w-full bg-slate-950 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-hlx-gold outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Destino</label>
                  <div className="relative">
                     <MapPin className="absolute left-4 top-4 text-gray-600" size={18}/>
                     <input type="text" placeholder="Cidade/UF" className="w-full bg-slate-950 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-hlx-gold outline-none" />
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30">
                 <h4 className="text-blue-400 font-bold text-sm mb-2 flex items-center gap-2"><ShieldCheck size={16}/> Filtro de Segurança (Compliance)</h4>
                 <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                       <input type="checkbox" className="accent-blue-500 w-4 h-4" defaultChecked />
                       <span className="text-sm text-gray-300 group-hover:text-white">Exigir IQT &gt; 80</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                       <input type="checkbox" className="accent-blue-500 w-4 h-4" defaultChecked />
                       <span className="text-sm text-gray-300 group-hover:text-white">Rastreador Obrigatório</span>
                    </label>
                 </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3">
                <Zap size={20} className="fill-white" />
                DISPARAR PARA REDE PREMIUM
              </button>
            </div>
          </div>
        )}

        {/* CONTENT AREA: MARKET ANALYTICS */}
        {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in-up">
                {/* Simulator Controls */}
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                            <Filter size={20} className="text-hlx-gold" /> Parâmetros de Cálculo (ANTT)
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">
                            Simulação baseada na Resolução ANTT nº 5.867/2020 (Piso Mínimo) e variações regionais.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-white/5">
                        <div className="text-right">
                            <label className="text-[10px] text-gray-500 uppercase font-bold block">Preço Médio Diesel (S10)</label>
                            <input 
                                type="number" 
                                value={dieselPrice}
                                onChange={(e) => setDieselPrice(Number(e.target.value))}
                                step="0.10"
                                className="bg-transparent text-white font-mono font-bold text-right outline-none w-24 border-b border-white/20 focus:border-hlx-gold"
                            />
                        </div>
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            <Zap size={20} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none"><DollarSign size={100}/></div>
                        <h3 className="text-white font-bold text-xl mb-6">Média de Frete (R$/KM)</h3>
                        
                        <div className="space-y-6">
                            {/* Carga Seca */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-400 text-sm">Carga Seca (Truck - 3 Eixos)</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-bold text-lg">R$ {calculateFreight(4.20, 0.4).toFixed(2)}</span>
                                        <span className="text-xs text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded flex items-center"><TrendingUp size={10}/> +2%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden"><div className="w-[60%] h-full bg-blue-500 transition-all duration-500" style={{ width: `${(calculateFreight(4.20, 0.4)/10)*100}%` }}></div></div>
                                <p className="text-[10px] text-gray-600 mt-1">Base ANTT: R$ 4.20 + Ajuste Diesel</p>
                            </div>

                            {/* Graneleiro */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-400 text-sm">Graneleiro (Bitrem - 7 Eixos)</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-bold text-lg">R$ {calculateFreight(5.50, 0.55).toFixed(2)}</span>
                                        <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded flex items-center"><TrendingDown size={10}/> -1.5%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden"><div className="w-[80%] h-full bg-orange-500 transition-all duration-500" style={{ width: `${(calculateFreight(5.50, 0.55)/10)*100}%` }}></div></div>
                                <p className="text-[10px] text-gray-600 mt-1">Base ANTT: R$ 5.50 + Ajuste Diesel</p>
                            </div>
                            
                            {/* Fretamento */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-400 text-sm">Fretamento (Ônibus Leito)</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-bold text-lg">R$ {calculateFreight(7.80, 0.35).toFixed(2)}</span>
                                        <span className="text-xs text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded flex items-center"><TrendingUp size={10}/> +5%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden"><div className="w-[90%] h-full bg-purple-500 transition-all duration-500" style={{ width: `${(calculateFreight(7.80, 0.35)/10)*100}%` }}></div></div>
                                <p className="text-[10px] text-gray-600 mt-1">Base Mercado + Sazonalidade</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                        <div className="w-20 h-20 bg-hlx-gold/20 rounded-full flex items-center justify-center mb-6">
                            <Clock size={40} className="text-hlx-gold" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">Tempo Médio de Contratação</h3>
                        <p className="text-4xl font-display font-bold text-white mb-4">42 minutos</p>
                        <p className="text-gray-400 text-sm max-w-xs">
                            No marketplace Helonex, cargas validadas são aceitas <strong>3x mais rápido</strong> que na média do mercado.
                        </p>
                    </div>
                </div>
            </div>
        )}

      </div>
      {showBackupModal && <BackupManager onClose={() => setShowBackupModal(false)} />}
    </div>
  );
};

export default ShipperPanel;
