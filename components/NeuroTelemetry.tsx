
import React, { useState, useEffect } from 'react';
import { 
  Activity, BrainCircuit, Heart, Eye, AlertTriangle, 
  MapPin, Phone, Coffee, ShieldCheck, Camera, ScanFace, Gauge, Wifi
} from 'lucide-react';
import { guardianEngine } from '../services/guardianSystem';
import { analyzeSentinelFrame } from '../services/geminiService';
// Fix: Use FatigueAnalysis instead of SentinelAnalysis for fatigue monitoring
import { Driver, FatigueAnalysis } from '../types';

const BrainViz: React.FC<{ stressLevel: number }> = ({ stressLevel }) => {
  const color = stressLevel > 70 ? "#ef4444" : stressLevel > 40 ? "#a855f7" : "#3b82f6";
  const pulseSpeed = stressLevel > 70 ? "0.5s" : "2s";

  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto flex items-center justify-center">
      <div className="absolute inset-0 rounded-full opacity-20 animate-ping" style={{ backgroundColor: color, animationDuration: pulseSpeed }}></div>
      <BrainCircuit size={80} className="relative z-10" style={{ color }} />
      <div className="absolute bottom-0 text-center w-full">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
          {stressLevel > 70 ? 'CRÍTICO' : stressLevel > 40 ? 'ALERTA' : 'NORMAL'}
        </span>
      </div>
    </div>
  );
};

const NeuroTelemetry: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  // Fix: Set state type to FatigueAnalysis
  const [sentinelResult, setSentinelResult] = useState<FatigueAnalysis | null>(null);

  useEffect(() => {
    const company = guardianEngine.getCompanyData();
    if (company && company.drivers) {
      setDrivers(company.drivers);
      if (company.drivers.length > 0) setSelectedDriverId(company.drivers[0].id);
    }
  }, []);

  const selectedDriver = drivers.find(d => d.id === selectedDriverId);

  const handleManualScan = async () => {
    if (!selectedDriver) return;
    setIsScanning(true);
    setSentinelResult(null);

    // Simulação Gemini Puro
    setTimeout(async () => {
      try {
        const photoUrl = selectedDriver.photoUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";
        const response = await fetch(photoUrl);
        
        if (!response.ok) {
          throw new Error('Falha ao carregar imagem');
        }
        
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          try {
            const result = await analyzeSentinelFrame(base64data, "Motorista em rota há 4 horas.");
            setSentinelResult(result);
          } catch (error) {
            console.error("Erro na análise Gemini:", error);
          } finally {
            setIsScanning(false);
          }
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        console.error("Erro ao processar imagem:", e);
        setIsScanning(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 animate-fade-in-up">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">
             <Activity size={14} /> Sistema Local Helonex
          </div>
          <h1 className="text-3xl font-display font-bold text-white">Análise de Fadiga Helô</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3 bg-slate-900 border border-white/10 rounded-xl flex flex-col h-[600px]">
          <div className="p-4 bg-slate-950 border-b border-white/10">
            <h3 className="font-bold text-white text-sm">Lista de Condutores</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {drivers.map(driver => (
              <button
                key={driver.id}
                onClick={() => setSelectedDriverId(driver.id)}
                className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${selectedDriverId === driver.id ? 'bg-purple-600/20 border border-purple-500/50' : 'bg-slate-800'}`}
              >
                <img src={driver.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                <span className="text-sm font-bold text-white">{driver.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-4 flex flex-col">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-white/20 mb-4">
              {selectedDriver && <img src={selectedDriver.photoUrl} className="w-full h-full object-cover opacity-60" />}
              {isScanning && <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent animate-pulse"></div>}
            </div>
            <button onClick={handleManualScan} disabled={isScanning} className="w-full py-4 bg-hlx-gold text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2">
              <ScanFace size={20} /> {isScanning ? 'Analisando via Gemini...' : 'Realizar Auditoria Facial'}
            </button>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col justify-center">
            {sentinelResult ? (
              <div className="animate-fade-in">
                {/* Fix: use nivel_estresse from FatigueAnalysis result */}
                <BrainViz stressLevel={sentinelResult.nivel_estresse * 10} />
                <div className="mt-6 space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-hlx-gold">
                    <p className="text-xs text-hlx-gold font-bold uppercase mb-1">Diagnóstico Helô:</p>
                    {/* Fix: use alerta_preventivo property */}
                    <p className="text-sm text-white italic">"{sentinelResult.alerta_preventivo}"</p>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-xs text-blue-400 font-bold uppercase mb-1">Recomendação:</p>
                    {/* Fix: use acao_gestor property */}
                    <p className="text-xs text-gray-300">{sentinelResult.acao_gestor}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <BrainCircuit size={48} className="mx-auto mb-4 opacity-20" />
                <p>Clique no botão para iniciar a análise neural do motorista selecionado.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuroTelemetry;
