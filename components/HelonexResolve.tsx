
import React, { useState, useEffect } from 'react';
import { 
  Activity, ShieldCheck, AlertTriangle, TrendingUp, 
  BrainCircuit, CheckCircle, XCircle, ArrowRight, 
  BarChart2, Zap, RefreshCw, Layers, Database
} from 'lucide-react';
import { helonexCore } from '../services/helonexCore';
import { ProcessStats, Zone } from '../types';
import ODRConsole from './ODRConsole';

const HelonexResolve: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState<(ProcessStats & { currentValue?: number, zScore?: number, zone?: Zone, lastUpdate?: number })[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [showODR, setShowODR] = useState(false);

  useEffect(() => {
    // Initial Load
    refreshData();
    
    // Simulate real-time ingestion
    const interval = setInterval(() => {
      simulateIngestion();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setSystemHealth(helonexCore.getSystemHealth());
  };

  const simulateIngestion = () => {
    // Simula dados chegando de vários módulos
    const modules = [
      { id: 'PROC-001', module: 'GOV', mean: 24, std: 4 },
      { id: 'PROC-002', module: 'GES', mean: 3.80, std: 0.50 },
      { id: 'PROC-003', module: 'JUS', mean: 85, std: 5 },
      { id: 'PROC-004', module: 'EDU', mean: 70, std: 10 },
    ] as const;

    const randomProc = modules[Math.floor(Math.random() * modules.length)];
    // Gera valor com base na normal (Box-Muller transform)
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    const value = randomProc.mean + (z * randomProc.std); // Normal distribution

    // Ocasionalmente gera anomalia
    const anomaly = Math.random() > 0.8 ? (Math.random() > 0.5 ? 3 : -3) * randomProc.std : 0;
    
    helonexCore.ingestMetric({
      id: randomProc.id,
      name: 'Simulated Metric',
      module: randomProc.module,
      value: value + anomaly,
      unit: 'unit',
      timestamp: Date.now()
    });

    refreshData();
  };

  const getZoneColor = (zone?: Zone) => {
    switch (zone) {
      case 'GREEN': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'YELLOW': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'RED': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  if (showODR) {
    return (
      <div className="animate-fade-in">
        <button onClick={() => setShowODR(false)} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowRight className="rotate-180" size={20} /> Voltar ao Painel Central
        </button>
        <ODRConsole />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 font-sans text-slate-50 animate-fade-in">
      
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-hlx-gold/10 rounded-xl border border-hlx-gold/20">
            <BrainCircuit className="text-hlx-gold" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">Helonex Core Engine</h1>
            <p className="text-gray-400 text-sm">Motor de Inteligência Preditiva e Segurança Estatística</p>
          </div>
        </div>
      </header>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Activity size={80} /></div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Índice de Variância (IV)</p>
          <h3 className="text-3xl font-display font-bold text-white">0.85<span className="text-sm text-gray-500">σ</span></h3>
          <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><TrendingUp size={12} /> Alta Estabilidade</p>
        </div>
        <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck size={80} /></div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Eficácia Preventiva</p>
          <h3 className="text-3xl font-display font-bold text-green-400">92%</h3>
          <p className="text-xs text-gray-500 mt-2">Alertas tratados antes de crise</p>
        </div>
        <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Zap size={80} /></div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">MTTR (Recuperação)</p>
          <h3 className="text-3xl font-display font-bold text-white">14<span className="text-sm text-gray-500">min</span></h3>
          <p className="text-xs text-blue-400 mt-2">Tempo médio de correção</p>
        </div>
        <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Layers size={80} /></div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Aderência à Norma</p>
          <h3 className="text-3xl font-display font-bold text-hlx-gold">98.5%</h3>
          <p className="text-xs text-gray-500 mt-2">Padrão Six Sigma</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Process Monitor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Activity size={20} className="text-blue-400"/> Monitoramento Ativo (Z-Score)</h2>
            <button onClick={refreshData} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"><RefreshCw size={16} /></button>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-gray-500 uppercase text-[10px] font-black tracking-widest border-b border-white/5">
                <tr>
                  <th className="p-5">Processo / Módulo</th>
                  <th className="p-5 text-center">Valor Atual</th>
                  <th className="p-5 text-center">Média (μ)</th>
                  <th className="p-5 text-center">Z-Score (σ)</th>
                  <th className="p-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {systemHealth.map(proc => (
                  <tr key={proc.id} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setSelectedProcess(proc.id)}>
                    <td className="p-5">
                      <div className="font-bold text-white">{proc.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono mt-1">{proc.id} • {proc.name.includes('JusTech') ? 'JusTech' : proc.name.includes('SUE') ? 'GovTech' : 'GesTech'}</div>
                    </td>
                    <td className="p-5 text-center font-mono text-gray-300">
                      {proc.currentValue?.toFixed(2)}
                    </td>
                    <td className="p-5 text-center font-mono text-gray-500">
                      {proc.mean.toFixed(2)}
                    </td>
                    <td className="p-5 text-center">
                      <span className={`font-mono font-bold ${Math.abs(proc.zScore || 0) > 2 ? 'text-red-500' : Math.abs(proc.zScore || 0) > 1 ? 'text-yellow-500' : 'text-green-500'}`}>
                        {proc.zScore?.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getZoneColor(proc.zone)}`}>
                        {proc.zone}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Log / PDCA Cycle */}
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl">
             <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Database size={20} className="text-purple-400"/> Ciclo PDCA Automatizado</h3>
             <div className="space-y-4">
                {systemHealth.filter(p => p.zone !== 'GREEN').length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    <CheckCircle size={40} className="mx-auto mb-4 text-green-500/50" />
                    <p>Todos os sistemas operando dentro da normalidade (Zona Verde).</p>
                  </div>
                ) : (
                  systemHealth.filter(p => p.zone !== 'GREEN').map(proc => (
                    <div key={proc.id} className="bg-slate-950 border border-white/5 p-4 rounded-xl flex items-start gap-4 animate-fade-in">
                        <div className={`p-2 rounded-lg ${proc.zone === 'RED' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                           <AlertTriangle size={20} />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-white font-bold text-sm">{proc.name} - Desvio Detectado</h4>
                           <p className="text-gray-400 text-xs mt-1">
                             {proc.zone === 'RED' 
                               ? "CRÍTICO: Desvio superior a 2σ. Ação corretiva imediata iniciada. Bloqueio preventivo de novas requisições." 
                               : "ALERTA: Tendência de desvio identificada (1σ < Z < 2σ). Monitoramento intensificado."}
                           </p>
                           {proc.name.includes('JusTech') && proc.zone === 'RED' && (
                             <button onClick={() => setShowODR(true)} className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-colors">
                               ABRIR CONSOLE DE CRISE (ODR)
                             </button>
                           )}
                        </div>
                        <span className="text-[10px] font-mono text-gray-600">{new Date().toLocaleTimeString()}</span>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>

        {/* Sidebar / Details */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><BrainCircuit size={120} /></div>
              <h3 className="text-xl font-bold text-white mb-4">Base de Conhecimento</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                O sistema aprende com cada desvio. A média (μ) é recalibrada automaticamente a cada 100 ciclos de estabilidade, garantindo que a "normalidade" evolua com o mercado.
              </p>
              
              <div className="space-y-4">
                 <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Última Recalibragem</p>
                    <p className="text-white font-mono text-sm">PROC-002 (Custo/KM)</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-green-400">
                       <ArrowRight size={12} /> μ ajustado de 3.75 para 3.80
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 border border-white/10 p-6 rounded-3xl">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest text-gray-500">Legenda Z-Score</h3>
              <div className="space-y-3">
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-300">|Z| ≤ 1 (Zona Verde)</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-gray-300">1 &lt; |Z| ≤ 2 (Zona Amarela)</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-300">|Z| &gt; 2 (Zona Vermelha)</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default HelonexResolve;
