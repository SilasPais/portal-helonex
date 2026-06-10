
import React, { useState } from 'react';
import { Globe, Truck, Anchor, ShieldCheck, Calculator, FileText, AlertTriangle, Milestone, Ship, Radio } from 'lucide-react';
import { PRF_OVERSIZED_RATE } from '../types';

const CriticalMissions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'oversized' | 'hazmat' | 'international'>('oversized');
  
  // Oversized Calc State
  const [distance, setDistance] = useState(0);
  const [speedLimit, setSpeedLimit] = useState(30);

  const calculateOversized = () => {
    const rate = speedLimit <= 30 ? PRF_OVERSIZED_RATE : PRF_OVERSIZED_RATE * 0.8;
    return distance * rate;
  };

  return (
    <div className="bg-slate-950 p-4 md:p-8 animate-fade-in-up max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-4">
           <AlertTriangle size={14} /> Auditoria de Missões Críticas
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Operações de <span className="text-hlx-gold">Alta Complexidade</span></h2>
        <p className="text-gray-400 text-lg">Cérebro de Auditoria para Cargas Especiais, Internacionais e Multimodalidade.</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
         {[
           { id: 'oversized', label: 'Superdimensionadas (AET)', icon: Milestone },
           { id: 'hazmat', label: 'Produtos Perigosos', icon: Radio },
           { id: 'international', label: 'Mercosul (TRIC/OTM)', icon: Globe },
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap border transition-all flex items-center gap-2 ${
               activeTab === tab.id ? 'bg-hlx-gold text-slate-900 border-hlx-gold' : 'bg-slate-900 text-gray-500 border-white/5 hover:text-white'
             }`}
           >
             <tab.icon size={18} /> {tab.label}
           </button>
         ))}
      </div>

      {activeTab === 'oversized' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
           <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-xl">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2"><Calculator size={20} className="text-hlx-gold" /> Simulador de Tarifas PRF</h3>
              <div className="space-y-6">
                 <div>
                    <label className="text-xs text-gray-500 uppercase font-black block mb-2">Distância Total da Missão (KM)</label>
                    <input type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-xl font-mono outline-none focus:border-hlx-gold" />
                 </div>
                 <div>
                    <label className="text-xs text-gray-500 uppercase font-black block mb-2">Velocidade Máxima Autorizada</label>
                    <div className="flex gap-4">
                       {[30, 40, 60].map(v => (
                         <button key={v} onClick={() => setSpeedLimit(v)} className={`flex-1 py-3 rounded-lg border font-bold ${speedLimit === v ? 'bg-hlx-gold text-slate-900 border-hlx-gold' : 'bg-slate-800 text-gray-400 border-white/10'}`}>
                            {v} Km/h
                         </button>
                       ))}
                    </div>
                 </div>
                 <div className="p-4 bg-slate-950 rounded-xl border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Taxa Estimada Escolta PRF</p>
                    <div className="text-3xl font-black text-white">R$ {calculateOversized().toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                    <p className="text-[10px] text-hlx-gold mt-2">Base Legal: R$ {speedLimit <= 30 ? '16,07' : '12,85'}/km</p>
                 </div>
              </div>
           </div>
           
           <div className="space-y-6">
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                 <h4 className="text-white font-bold mb-4 flex items-center gap-2"><FileText size={18} className="text-blue-400" /> Checklist AET Erro Zero</h4>
                 <div className="space-y-3">
                    {['Autorização Especial (AET) Válida', 'Cronotacógrafo Aferido', 'Placas de Advertência Refletivas', 'Veículo Batedor Vinculado'].map(check => (
                      <div key={check} className="flex items-center gap-3 text-sm text-gray-400">
                         <ShieldCheck size={16} className="text-green-500" /> {check}
                      </div>
                    ))}
                 </div>
              </div>
              <button className="w-full py-4 bg-hlx-blue text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                 SOLICITAR ACOMPANHAMENTO TÉCNICO
              </button>
           </div>
        </div>
      )}

      {activeTab === 'international' && (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 text-center animate-fade-in">
           <Globe size={64} className="text-blue-400 mx-auto mb-6" />
           <h3 className="text-2xl font-bold text-white mb-2">Módulo TRIC & Mercosul</h3>
           <p className="text-gray-400 mb-8 max-w-xl mx-auto">Emissão de MIC-DTA, CRT e gestão de permissões originárias e complementares sob contrato único.</p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-slate-950 p-6 rounded-xl border border-white/5">
                 <h4 className="text-white font-bold mb-1">Argentina / Chile</h4>
                 <p className="text-xs text-gray-500 uppercase">Seguro Carta Azul Ativo</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-xl border border-white/5">
                 <h4 className="text-white font-bold mb-1">Uruguai / Paraguai</h4>
                 <p className="text-xs text-gray-500 uppercase">Aduana Integrada</p>
              </div>
           </div>
        </div>
      )}
      
      {activeTab === 'hazmat' && (
        <div className="p-20 text-center text-gray-500 border-2 border-dashed border-white/5 rounded-3xl">
           <Radio size={48} className="mx-auto mb-4 animate-pulse text-orange-500" />
           <p>Auditoria SASSMAQ & MOPP 4.0 em carregamento...</p>
        </div>
      )}
    </div>
  );
};

export default CriticalMissions;
