
import React, { useState, useEffect } from 'react';
import { 
  Truck, Wrench, Settings, AlertTriangle, Calendar, DollarSign, 
  Filter, Search, Plus, CheckCircle, Clock, Battery, Gauge, PenTool, 
  Layers, ShieldAlert, FileText, Calculator, Activity, ArrowRight,
  TrendingUp, Circle, CircleDashed, Info, ChevronRight, Save, Package, 
  ShoppingCart, BarChart3, AlertCircle, History,
  RefreshCw, ShieldCheck, Zap, X, FileCheck, Globe, Scale, Lock, Map as MapIcon
} from 'lucide-react';
import { guardianEngine } from '../services/guardianSystem';
import { Vehicle, MaintenanceRecord, TireRecord, InventoryItem, License } from '../types';

const FleetManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'maintenance' | 'tires' | 'documents'>('overview');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  
  // New Vehicle Form
  const [newPlate, setNewPlate] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newType, setNewType] = useState('TRUCK');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const company = guardianEngine.getCompanyData();
    if (company) {
      setVehicles(company.vehicles || []);
      setInventory(company.inventory || []);
      if (company.vehicles?.length > 0 && !selectedVehicleId) {
          setSelectedVehicleId(company.vehicles[0].id);
      }
    }
  };

  const handleAddVehicle = () => {
      const newVehicle: Vehicle = {
          id: `v_${Date.now()}`,
          plate: newPlate.toUpperCase(),
          model: newModel,
          year: new Date().getFullYear(),
          type: newType as any,
          rntrcStatus: 'PENDING',
          insuranceStatus: 'PENDING',
          currentValue: 0,
          odometer: 0,
          licenses: [],
          tires: [],
          maintenanceHistory: []
      };
      guardianEngine.addVehicle(newVehicle);
      refreshData();
      setShowAddVehicle(false);
      setSelectedVehicleId(newVehicle.id);
      alert(`Veículo ${newVehicle.plate} adicionado com sucesso ao Dossiê da Frota.`);
  };

  const activeVehicle = vehicles.find(v => v.id === selectedVehicleId) || null;

  // --- SUB-COMPONENT: REGULATORY DOCS (Novo) ---
  const RegulatoryPanel: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
      return (
          <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-lg gap-4">
                  <div>
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Scale className="text-hlx-gold" size={28}/> Dossiê Regulatório</h3>
                      <p className="text-sm text-gray-400 mt-1">Licenças e Autorizações Vinculadas à Placa <span className="text-white font-bold">{vehicle.plate}</span></p>
                  </div>
                  <button className="bg-hlx-gold text-slate-950 px-6 py-4 rounded-xl font-bold text-sm flex items-center gap-3 hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-900/20 w-full md:w-auto justify-center">
                      <Plus size={18}/> SOLICITAR NOVA LICENÇA
                  </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Cards de Licenças */}
                  {vehicle.licenses && vehicle.licenses.length > 0 ? vehicle.licenses.map(lic => (
                      <div key={lic.id} className="bg-slate-900 border-2 border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all group relative overflow-hidden shadow-lg">
                          <div className="flex justify-between items-start mb-6">
                              <div className={`p-3 rounded-xl ${lic.type === 'AETC' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                                  {lic.type === 'AETC' ? <MapIcon size={24}/> : <FileCheck size={24}/>}
                              </div>
                              <span className={`text-xs font-bold px-3 py-1.5 rounded uppercase border ${
                                  lic.status === 'ACTIVE' || lic.status === 'VALID' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 
                                  lic.status === 'EXPIRING' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                                  'bg-red-500/10 text-red-400 border-red-500/30'
                              }`}>
                                  {lic.status}
                              </span>
                          </div>
                          <h4 className="text-white font-bold text-lg mb-2">{lic.name}</h4>
                          <p className="text-sm text-gray-400 mb-6">Vence em: <strong className="text-white">{new Date(lic.expiryDate).toLocaleDateString()}</strong></p>
                          
                          <div className="flex gap-3">
                              <button className="flex-1 py-3 bg-slate-800 text-white text-sm font-bold rounded-xl border border-white/10 hover:bg-slate-700 hover:border-white/30 transition-all">VER DIGITAL</button>
                              {lic.status === 'EXPIRING' && <button className="flex-1 py-3 bg-yellow-500 text-slate-900 text-sm font-bold rounded-xl hover:bg-yellow-400 transition-all">RENOVAR</button>}
                          </div>
                      </div>
                  )) : (
                      <div className="col-span-3 text-center p-16 bg-slate-900/50 border-2 border-dashed border-white/10 rounded-2xl">
                          <ShieldAlert size={64} className="mx-auto text-gray-600 mb-6" />
                          <p className="text-gray-400 text-lg font-bold">Nenhuma licença vinculada a este veículo.</p>
                          <p className="text-sm text-gray-500 mt-2">Inicie um processo regulatório (AETC, ANTT, TAF) para blindar esta placa.</p>
                      </div>
                  )}
              </div>
          </div>
      );
  };

  // --- SUB-COMPONENT: TIRE MAP ---
  const TireMap: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
    const getTireByPos = (pos: string) => vehicle.tires?.find(t => t.position === pos);

    const TireDot = ({ pos }: { pos: string }) => {
      const tire = getTireByPos(pos);
      const statusColor = !tire ? 'bg-slate-800' : tire.treadDepth < 3 ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : tire.treadDepth < 6 ? 'bg-yellow-500' : 'bg-green-500';
      
      return (
        <div className="flex flex-col items-center gap-2 group relative">
          <div className={`w-12 h-16 rounded-md border-2 border-white/20 transition-all cursor-pointer ${statusColor} hover:scale-110 hover:border-white flex items-center justify-center text-[10px] font-bold text-slate-900 shadow-md`}>
             {pos}
          </div>
          {tire && (
              <div className="absolute bottom-full mb-2 hidden group-hover:block z-50 bg-slate-900 border border-white/20 p-3 rounded-xl shadow-2xl w-48">
                  <p className="text-xs text-white font-bold uppercase">{tire.brand} {tire.model}</p>
                  <div className="grid grid-cols-2 gap-2 mt-2 border-t border-white/10 pt-2">
                      <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase">Sulco</p>
                          <p className={`text-sm font-bold ${tire.treadDepth < 3 ? 'text-red-400' : 'text-white'}`}>{tire.treadDepth}mm</p>
                      </div>
                      <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase">Pressão</p>
                          <p className="text-sm text-white font-bold">{tire.pressure} PSI</p>
                      </div>
                  </div>
              </div>
          )}
        </div>
      );
    };

    return (
      <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl flex flex-col items-center shadow-xl">
         <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10 flex items-center gap-2"><Circle size={18}/> Gestão de Pneus (Eixos)</h4>
         
         <div className="relative w-64 h-96 bg-slate-800/50 rounded-[3rem] border-2 border-white/10 flex flex-col justify-around py-10 px-6">
            {/* Eixo 1 (Direcional) */}
            <div className="flex justify-between w-full">
               <TireDot pos="E1-E" />
               <TireDot pos="E1-D" />
            </div>

            {/* Chassis Line */}
            <div className="w-2 h-24 bg-slate-700 mx-auto rounded-full"></div>

            {/* Eixo 2 (Tração) */}
            <div className="flex justify-between w-full">
               <div className="flex gap-2">
                  <TireDot pos="E2-EE" />
                  <TireDot pos="E2-IE" />
               </div>
               <div className="flex gap-2">
                  <TireDot pos="E2-ID" />
                  <TireDot pos="E2-ED" />
               </div>
            </div>
         </div>
         <p className="mt-6 text-xs text-gray-500 font-mono bg-slate-950 px-4 py-2 rounded-lg border border-white/5">Legenda: E=Eixo, D/E=Direita/Esquerda, I/E=Interna/Externa</p>
      </div>
    );
  };

  const renderOverview = () => {
    if (!activeVehicle) return null;
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><TrendingUp size={80}/></div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Disponibilidade</p>
              <h3 className="text-4xl font-display font-bold text-white mt-1">98%</h3>
              <p className="text-sm text-green-400 mt-2 flex items-center gap-1 font-bold"><CheckCircle size={14}/> Pronta para Frete</p>
           </div>
           <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-xl">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Odômetro Atual</p>
              <h3 className="text-3xl font-display font-bold text-white mt-1">{activeVehicle.odometer?.toLocaleString()} km</h3>
              <p className="text-sm text-gray-500 mt-2">Média: 12.000 km/mês</p>
           </div>
           <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-xl">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Próxima Revisão</p>
              <h3 className="text-3xl font-display font-bold text-hlx-gold mt-1">15.000 km</h3>
              <p className="text-sm text-gray-500 mt-2">Estimada em: 42 dias</p>
           </div>
           <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 shadow-xl">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Custo por KM (CPK)</p>
              <h3 className="text-3xl font-display font-bold text-blue-400 mt-1">R$ 4.12</h3>
              <p className="text-sm text-green-400 mt-2 font-bold">▼ 4.5% vs mês anterior</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-white font-bold flex items-center gap-3 text-xl"><Activity size={24} className="text-hlx-gold"/> Performance de Consumo</h3>
                 <div className="flex gap-3">
                    <span className="bg-slate-800 px-3 py-1.5 rounded-lg text-xs text-gray-300 uppercase font-bold border border-white/10">Diesel S10</span>
                    <span className="bg-green-500/10 px-3 py-1.5 rounded-lg text-xs text-green-400 uppercase font-bold border border-green-500/30">Média: 2.8 km/l</span>
                 </div>
              </div>
              <div className="h-72 flex flex-col items-center justify-center bg-slate-950 rounded-xl border border-white/10 border-dashed relative">
                  <BarChart3 size={64} className="text-slate-800 mb-3" />
                  <p className="text-gray-500 text-base font-bold">Gráfico de Telemetria</p>
                  <p className="text-sm text-gray-600 mt-1">Conectando dados via API Helonex Vision...</p>
              </div>
           </div>

           <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex flex-col shadow-xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-3 text-lg"><ShieldAlert size={24} className="text-red-500"/> Alertas de Engenharia</h3>
              <div className="space-y-4 flex-1">
                 <div className="bg-red-500/10 border-l-4 border-red-500 p-5 rounded-r-xl group cursor-pointer hover:bg-red-500/20 transition-all">
                    <p className="text-white font-bold text-sm">Desgaste Crítico (TWI)</p>
                    <p className="text-xs text-red-300 mt-1 font-medium">Pneu E2-ED atingiu 2.8mm. Risco iminente de segurança e multa.</p>
                 </div>
                 <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-5 rounded-r-xl group cursor-pointer hover:bg-yellow-500/20 transition-all">
                    <p className="text-white font-bold text-sm">Vencimento Extintor</p>
                    <p className="text-xs text-yellow-300 mt-1 font-medium">Faltam 5 dias para o vencimento da carga do extintor ABC.</p>
                 </div>
                 <div className="bg-blue-500/10 border-l-4 border-blue-500 p-5 rounded-r-xl group cursor-pointer hover:bg-blue-500/20 transition-all">
                    <p className="text-white font-bold text-sm">Estoque Baixo</p>
                    <p className="text-xs text-blue-300 mt-1 font-medium">Filtro de Óleo Scania atingiu nível de reposição (5 unid).</p>
                 </div>
              </div>
              <button className="w-full mt-6 py-4 bg-hlx-gold text-slate-950 font-bold rounded-xl text-sm hover:bg-yellow-400 transition-colors shadow-lg">GERAR ORDENS DE SERVIÇO</button>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B1120]">
      
      {/* Sidebar de Veículos - WIDER AND LARGER ITEMS */}
      <div className="w-96 bg-slate-900 border-r border-white/10 flex flex-col h-full overflow-hidden shadow-2xl z-10">
          <div className="p-6 bg-slate-950 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-white font-bold flex items-center gap-3 text-lg"><Truck size={24} className="text-hlx-gold"/> Frota Ativa</h3>
              <button onClick={() => setShowAddVehicle(true)} className="p-3 bg-green-600 hover:bg-green-500 text-white rounded-xl transition-colors shadow-lg"><Plus size={20}/></button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
              {vehicles.map(v => (
                  <button 
                    key={v.id} 
                    onClick={() => setSelectedVehicleId(v.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all relative overflow-hidden group shadow-md ${
                        selectedVehicleId === v.id 
                        ? 'bg-slate-800 border-hlx-gold shadow-xl scale-[1.02]' 
                        : 'bg-slate-950/80 border-white/5 hover:bg-slate-800 hover:border-white/20'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-white text-xl font-mono">{v.plate}</span>
                          <span className="text-[10px] bg-slate-900 border border-white/10 px-2 py-1 rounded text-gray-400 uppercase font-bold">{v.type}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-4 font-medium">{v.model} • {v.year}</p>
                      
                      {/* Status Bars - Thicker */}
                      <div className="flex gap-2">
                          <div className={`h-2 flex-1 rounded-full ${v.rntrcStatus === 'VALID' ? 'bg-green-500' : 'bg-red-500'}`} title="RNTRC Status"></div>
                          <div className={`h-2 flex-1 rounded-full ${v.insuranceStatus === 'VALID' ? 'bg-blue-500' : 'bg-red-500'}`} title="Seguro Status"></div>
                          <div className="h-2 flex-1 rounded-full bg-gray-600" title="Manutenção Status"></div>
                      </div>
                  </button>
              ))}
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-[#0B1120] overflow-y-auto custom-scrollbar">
          {activeVehicle ? (
              <div className="p-8 md:p-12">
                  {/* Vehicle Header */}
                  <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
                      <div>
                          <div className="flex items-baseline gap-4 mb-1">
                             <h1 className="text-4xl md:text-5xl font-display font-bold text-white">{activeVehicle.plate}</h1>
                             <span className="text-sm font-bold bg-slate-800 px-3 py-1 rounded-lg text-gray-400 border border-white/10">{activeVehicle.type}</span>
                          </div>
                          <p className="text-gray-400 text-lg">{activeVehicle.model} • {activeVehicle.year} • <span className="text-hlx-gold font-bold">R$ {activeVehicle.currentValue?.toLocaleString()}</span></p>
                      </div>
                      <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-2xl border border-white/10 shadow-lg">
                          {[
                              { id: 'overview', label: 'Dashboard', icon: <Activity size={18}/> },
                              { id: 'documents', label: 'Legal & Licenças', icon: <Scale size={18}/> },
                              { id: 'maintenance', label: 'Manutenção', icon: <Wrench size={18}/> },
                              { id: 'tires', label: 'Pneus', icon: <Circle size={18}/> },
                          ].map(t => (
                              <button 
                                  key={t.id}
                                  onClick={() => setActiveTab(t.id as any)}
                                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all uppercase tracking-tight flex items-center gap-2 ${activeTab === t.id ? 'bg-slate-700 text-white shadow-lg border border-white/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                              >
                                  {t.icon} {t.label}
                              </button>
                          ))}
                      </div>
                  </div>

                  {activeTab === 'overview' && renderOverview()}
                  {activeTab === 'documents' && <RegulatoryPanel vehicle={activeVehicle} />}
                  {activeTab === 'tires' && <TireMap vehicle={activeVehicle} />}
                  {activeTab === 'maintenance' && (
                      <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-white/10">
                          <Wrench size={64} className="mx-auto text-gray-600 mb-6" />
                          <h3 className="text-2xl font-bold text-white">Módulo de Manutenção</h3>
                          <p className="text-gray-400 mt-2">Em breve: Controle de OS e Histórico de Peças.</p>
                      </div>
                  )}

              </div>
          ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                  <Truck size={80} className="opacity-20" />
                  <p className="text-xl font-bold">Selecione um veículo ou adicione um novo à frota.</p>
                  <button onClick={() => setShowAddVehicle(true)} className="px-8 py-4 bg-hlx-gold text-slate-900 font-bold rounded-xl shadow-lg hover:bg-yellow-400 transition-all">
                      ADICIONAR PRIMEIRO VEÍCULO
                  </button>
              </div>
          )}
      </div>

      {/* Modal Add Vehicle */}
      {showAddVehicle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
              <div className="bg-slate-900 w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl p-8 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                      <h3 className="text-white font-bold text-2xl">Adicionar Veículo</h3>
                      <button onClick={() => setShowAddVehicle(false)} className="text-gray-400 hover:text-white p-2 bg-slate-800 rounded-xl transition-colors"><X size={24}/></button>
                  </div>
                  <div className="space-y-6">
                      <div>
                          <label className="text-sm font-bold text-gray-400 block mb-2 uppercase">Placa</label>
                          <input className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-lg font-mono uppercase focus:border-hlx-gold outline-none transition-colors" 
                                 value={newPlate} onChange={e => setNewPlate(e.target.value)} placeholder="ABC-1234" autoFocus />
                      </div>
                      <div>
                          <label className="text-sm font-bold text-gray-400 block mb-2 uppercase">Modelo</label>
                          <input className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-lg focus:border-hlx-gold outline-none transition-colors" 
                                 value={newModel} onChange={e => setNewModel(e.target.value)} placeholder="Ex: Scania R450" />
                      </div>
                      <div>
                          <label className="text-sm font-bold text-gray-400 block mb-2 uppercase">Tipo</label>
                          <select className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-lg focus:border-hlx-gold outline-none transition-colors appearance-none"
                                  value={newType} onChange={e => setNewType(e.target.value)}>
                              <option value="TRUCK">Caminhão</option>
                              <option value="BUS">Ônibus</option>
                              <option value="VAN">Van/Utilitário</option>
                          </select>
                      </div>
                      <button onClick={handleAddVehicle} className="w-full py-5 bg-hlx-gold text-slate-900 font-bold rounded-xl text-lg shadow-xl hover:bg-yellow-400 transition-all transform active:scale-95 mt-4">
                          CONFIRMAR CADASTRO
                      </button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default FleetManager;
