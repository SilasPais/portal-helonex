
import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, BrainCircuit, Heart, Eye, AlertTriangle, Battery, 
  MapPin, Phone, Coffee, Wind, ShieldCheck, PlayCircle, Radio, Camera, ScanFace, Gauge, Play, Wifi
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { guardianEngine } from '../services/guardianSystem';
import { analyzeSentinelFrame } from '../services/geminiService';
import { Driver, SentinelAnalysis } from '../types';
import { supabase } from '../lib/supabase'; // Importando cliente Supabase

// Componente Visual do Cérebro (SVG Dinâmico)
const BrainViz: React.FC<{ stressLevel: number }> = ({ stressLevel }) => {
  const getBrainColor = () => {
    if (stressLevel > 7) return "#ef4444"; // Red (Crítico)
    if (stressLevel > 4) return "#a855f7"; // Purple (Alerta)
    return "#3b82f6"; // Blue (Normal)
  };

  const color = getBrainColor();
  const pulseSpeed = stressLevel > 7 ? "0.5s" : "2s";

  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto flex items-center justify-center">
      {/* Halo de Pulsação */}
      <div 
        className="absolute inset-0 rounded-full opacity-20 animate-ping"
        style={{ backgroundColor: color, animationDuration: pulseSpeed }}
      ></div>
      
      {/* SVG Cérebro Simplificado */}
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-24 h-24 md:w-32 md:h-32 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
        <path d="M12 7c-1.5 0-2 1.5-3 2" className="animate-pulse" style={{ animationDuration: '1.5s' }} />
        <path d="M12 12c1.5 0 2-1.5 3-2" className="animate-pulse" style={{ animationDuration: '1.2s' }} />
        <path d="M12 17c-1.5 0-2-1.5-3-2" className="animate-pulse" style={{ animationDuration: '0.8s' }} />
      </svg>
      
      <div className="absolute bottom-0 text-center w-full">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
          {stressLevel > 7 ? 'CRÍTICO' : stressLevel > 4 ? 'ALERTA' : 'NORMAL'}
        </span>
      </div>
    </div>
  );
};

const NeuroTelemetry: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  
  // States para a Análise Sentinela
  const [isScanning, setIsScanning] = useState(false);
  const [sentinelResult, setSentinelResult] = useState<SentinelAnalysis | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false); // Status da conexão Supabase

  useEffect(() => {
    const company = guardianEngine.getCompanyData();
    if (company && company.drivers) {
      setDrivers(company.drivers);
      if (company.drivers.length > 0) {
        setSelectedDriverId(company.drivers[0].id);
      }
    }
  }, []);

  // --- SUBSCRIÇÃO EM TEMPO REAL (SUPABASE) ---
  useEffect(() => {
    // 1. Canal de Subscrição para INSERTs na tabela
    const channel = supabase
      .channel('neuro_telemetry_live')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'neuro_telemetry' },
        (payload) => {
          // Quando o Python inserir um novo dado, o React recebe aqui
          console.log('⚡ DADO RECEBIDO DA ESTRADA:', payload.new);
          
          // Filtra se é o motorista selecionado (ou se nenhum selecionado, mostra o que chegar)
          if (payload.new.driver_id === selectedDriverId || !selectedDriverId) {
             
             // Mapeia do Banco (snake_case) para o Frontend (camelCase/Interfaces)
             setSentinelResult({
                 nivel_estresse: payload.new.stress_level,
                 nivel_fadiga: payload.new.fatigue_level,
                 alerta_preventivo: payload.new.alert_message,
                 acao_gestor: payload.new.action_recommendation,
                 fundamentacao_legal: "Monitoramento em Tempo Real (Via Satélite/4G)"
             });
             
             // Efeito visual de scan rápido ao receber dados
             setIsScanning(true);
             setTimeout(() => setIsScanning(false), 800);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
            setIsLiveConnected(true);
            console.log("📡 Conectado ao canal de telemetria.");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedDriverId]);

  const selectedDriver = drivers.find(d => d.id === selectedDriverId);

  // Função Manual (Fallback se não estiver usando o script Python)
  const captureFrameManual = async () => {
      if (!selectedDriver) return;
      setIsScanning(true);
      setSentinelResult(null);

      const telemetryContext = `Velocidade: 80km/h - Modo Manual`;

      setTimeout(async () => {
          try {
              const response = await fetch(selectedDriver.photoUrl || "https://via.placeholder.com/150");
              const blob = await response.blob();
              const reader = new FileReader();
              reader.onloadend = async () => {
                  const base64data = reader.result as string;
                  const result = await analyzeSentinelFrame(base64data, telemetryContext);
                  setSentinelResult(result);
                  setIsScanning(false);
              };
              reader.readAsDataURL(blob);
          } catch (e) {
              console.error("Erro manual", e);
              setIsScanning(false);
          }
      }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 animate-fade-in-up">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">
             <BrainCircuit size={14} /> Sentinela Helonex (IoT)
          </div>
          <h1 className="text-3xl font-display font-bold text-white">Neuro-Telemetria Cognitiva</h1>
          <p className="text-gray-400 text-sm">Painel de controle biológico em tempo real.</p>
        </div>
        <div className="flex gap-4">
           <div className={`px-4 py-2 rounded-lg border text-center transition-colors ${isLiveConnected ? 'bg-green-900/20 border-green-500/30' : 'bg-slate-900 border-white/10'}`}>
             <p className="text-[10px] text-gray-500 uppercase font-bold">Status do Link</p>
             <p className={`text-sm font-bold flex items-center gap-1 justify-center ${isLiveConnected ? 'text-green-400' : 'text-gray-500'}`}>
                <Wifi size={14} className={isLiveConnected ? "animate-pulse" : ""} /> 
                {isLiveConnected ? 'CONECTADO AO VEÍCULO' : 'AGUARDANDO LINK...'}
             </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SIDEBAR */}
        <div className="lg:col-span-3 bg-slate-900 border border-white/10 rounded-xl overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 bg-slate-950 border-b border-white/10">
            <h3 className="font-bold text-white text-sm">Cabines Conectadas</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {drivers.map(driver => (
              <button
                key={driver.id}
                onClick={() => setSelectedDriverId(driver.id)}
                className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${
                  selectedDriverId === driver.id 
                    ? 'bg-purple-600/20 border border-purple-500/50' 
                    : 'bg-slate-800 border border-transparent hover:bg-slate-700'
                }`}
              >
                <div className="relative">
                  <img src={driver.photoUrl || "https://via.placeholder.com/40"} alt={driver.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                    sentinelResult && sentinelResult.nivel_fadiga > 5 ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                  }`}></div>
                </div>
                <div className="text-left flex-1">
                  <p className={`text-sm font-bold ${selectedDriverId === driver.id ? 'text-white' : 'text-gray-300'}`}>{driver.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{driver.cnhCategory} • {isLiveConnected ? 'Transmitindo' : 'Offline'}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ÁREA CENTRAL */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. VISÃO COMPUTACIONAL */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-4 flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Camera className="text-hlx-gold" size={18} /> Feed do Sentinela
                    </h3>
                    {isScanning && <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded animate-pulse">RECEBENDO DADOS...</span>}
                </div>
                
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-white/20 group">
                    {selectedDriver ? (
                        <>
                            <img 
                                src={selectedDriver.photoUrl} 
                                alt="Driver View" 
                                className={`w-full h-full object-cover opacity-80 ${isScanning ? 'scale-105 transition-transform duration-[500ms]' : ''}`} 
                            />
                            
                            {isScanning && (
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent w-full h-full animate-[scan_1s_linear_infinite] border-b-2 border-purple-500/50"></div>
                            )}

                            {/* HUD */}
                            <div className="absolute top-2 left-2 text-[10px] font-mono text-green-400 bg-black/50 px-2 rounded">
                                CAM_01 | 1080p | 30FPS
                            </div>
                            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-green-400 bg-black/50 px-2 rounded flex flex-col">
                                <span>FACE_DETECT: TRUE</span>
                                <span>DATA_LINK: {isLiveConnected ? 'OK' : 'WAITING'}</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-600">Sem Sinal</div>
                    )}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-slate-950 p-2 rounded border border-white/5 text-center">
                        <Gauge size={16} className="text-blue-400 mx-auto mb-1" />
                        <span className="text-xs text-gray-400">Velocidade</span>
                        <div className="text-white font-bold font-mono">80 km/h</div>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-white/5 text-center">
                        <AlertTriangle size={16} className="text-yellow-400 mx-auto mb-1" />
                        <span className="text-xs text-gray-400">Alertas</span>
                        <div className="text-white font-bold font-mono">{sentinelResult ? '1 Ativo' : 'Normal'}</div>
                    </div>
                    <button 
                        onClick={captureFrameManual}
                        className="bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold rounded flex flex-col items-center justify-center transition-colors border border-white/10"
                    >
                        <ScanFace size={20} />
                        <span className="text-xs">Teste Manual</span>
                    </button>
                </div>
            </div>

            {/* 2. CÉREBRO DIGITAL (ANÁLISE IA) */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-500/30 rounded-xl p-6 flex flex-col shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <BrainCircuit size={150} />
                </div>

                <h3 className="text-white font-bold flex items-center gap-2 mb-6 relative z-10">
                    <BrainCircuit className="text-purple-400" size={18} /> Diagnóstico Cognitivo (IA)
                </h3>

                <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                    {sentinelResult ? (
                        <div className="w-full animate-fade-in-up">
                            {/* Passando o nível de estresse atual (multiplicado por 10 para escala 0-100 se necessário, ou direto 0-10) */}
                            <BrainViz stressLevel={sentinelResult.nivel_estresse * 10} />
                            
                            <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
                                <div className="text-center bg-slate-950/50 p-3 rounded-lg border border-white/5">
                                    <p className="text-xs text-gray-500 uppercase font-bold">Fadiga (0-10)</p>
                                    <div className={`text-2xl font-mono font-bold ${sentinelResult.nivel_fadiga > 5 ? 'text-red-400' : 'text-green-400'}`}>
                                        {sentinelResult.nivel_fadiga}
                                    </div>
                                </div>
                                <div className="text-center bg-slate-950/50 p-3 rounded-lg border border-white/5">
                                    <p className="text-xs text-gray-500 uppercase font-bold">Estresse (0-10)</p>
                                    <div className={`text-2xl font-mono font-bold ${sentinelResult.nivel_estresse > 5 ? 'text-orange-400' : 'text-blue-400'}`}>
                                        {sentinelResult.nivel_estresse}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-slate-800 p-3 rounded-lg border-l-4 border-hlx-gold">
                                    <p className="text-[10px] text-hlx-gold font-bold uppercase mb-1">Helô (Assistente de Cabine):</p>
                                    <p className="text-sm text-white italic">"{sentinelResult.alerta_preventivo}"</p>
                                </div>
                                <div className="bg-slate-800 p-3 rounded-lg border-l-4 border-blue-500">
                                    <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">Ação do Gestor (GesTech):</p>
                                    <p className="text-xs text-gray-300">{sentinelResult.acao_gestor}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            {isScanning ? (
                                <div className="flex flex-col items-center gap-3">
                                    <BrainCircuit size={48} className="animate-pulse text-purple-500" />
                                    <p>Processando dados do veículo...</p>
                                </div>
                            ) : (
                                <>
                                    <ScanFace size={48} className="mx-auto mb-2 opacity-30" />
                                    <p className="text-sm">Aguardando Evento Sentinela...</p>
                                    <p className="text-xs mt-2 opacity-50">Rode o script Python no caminhão para enviar dados.</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default NeuroTelemetry;
