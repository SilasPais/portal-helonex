
import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Radio, AlertTriangle, Lock, Unlock, MapPin, 
  Navigation, Crosshair, Siren, PhoneCall, CheckCircle, Activity, 
  AlertOctagon, Wifi, Thermometer, Truck, X
} from 'lucide-react';
import { RiskEvent } from '../types';

const RiskMonitor: React.FC = () => {
  const [threatLevel, setThreatLevel] = useState<'LOW' | 'ELEVATED' | 'HIGH' | 'SEVERE'>('LOW');
  const [events, setEvents] = useState<RiskEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<RiskEvent | null>(null);

  useEffect(() => {
    const mockEvents: RiskEvent[] = [
      {
        id: 'evt-001',
        type: 'JAMMING',
        severity: 'CRITICAL',
        vehicleId: 'V-102',
        plate: 'ABC-1234',
        driverName: 'João Silva',
        location: 'BR-116, Km 200 (Área de Sombra)',
        timestamp: new Date(),
        status: 'ACTIVE'
      },
      {
        id: 'evt-002',
        type: 'ROUTE_DEVIATION',
        severity: 'HIGH',
        vehicleId: 'V-055',
        plate: 'XYZ-9876',
        driverName: 'Carlos Mendes',
        location: 'Acesso Não Autorizado - Vila Maria',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min atrás
        status: 'INVESTIGATING'
      }
    ];
    setEvents(mockEvents);
    setThreatLevel('HIGH');

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newEvent: RiskEvent = {
          id: `evt-${Date.now()}`,
          type: Math.random() > 0.5 ? 'STOP' : 'DOOR_OPEN',
          severity: 'MEDIUM',
          vehicleId: `V-${Math.floor(Math.random() * 100)}`,
          plate: 'NEW-0000',
          driverName: 'Motorista Padrão',
          location: 'Monitoramento Ativo',
          timestamp: new Date(),
          status: 'ACTIVE'
        };
        setEvents(prev => [newEvent, ...prev].slice(0, 10));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'THEFT': return <AlertOctagon size={18} />; // Trocado Skull por AlertOctagon (Safe)
      case 'JAMMING': return <Wifi size={18} />; // Trocado WifiOff por Wifi (Safe)
      case 'ACCIDENT': return <Siren size={18} />;
      case 'DOOR_OPEN': return <Unlock size={18} />;
      default: return <AlertTriangle size={18} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'HIGH': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'MEDIUM': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    }
  };

  const handleAction = (action: string) => {
    alert(`Comando Enviado ao Veículo: ${action}\nProtocolo: CMD-${Date.now()}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 animate-fade-in-up">
      
      {/* HEADER TÁTICO */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-6 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-2 animate-pulse">
             <Radio size={14} /> Monitoramento Ativo
          </div>
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
            Torre de Controle <span className="text-red-500">24h</span>
          </h1>
          <p className="text-gray-400 text-sm">Gerenciamento de Crise e Pronta Resposta.</p>
        </div>

        {/* DEFCON INDICATOR */}
        <div className="flex items-center gap-4 bg-slate-900 border border-white/10 p-4 rounded-xl shadow-lg">
           <div className="text-right">
             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Nível de Ameaça</p>
             <p className={`text-2xl font-black ${
               threatLevel === 'SEVERE' ? 'text-red-600 animate-pulse' : 
               threatLevel === 'HIGH' ? 'text-orange-500' : 'text-green-500'
             }`}>
               DEFCON {threatLevel === 'SEVERE' ? '1' : threatLevel === 'HIGH' ? '2' : '3'}
             </p>
           </div>
           <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
             threatLevel === 'SEVERE' ? 'border-red-600 bg-red-900/20' : 
             threatLevel === 'HIGH' ? 'border-orange-500 bg-orange-900/20' : 'border-green-500 bg-green-900/20'
           }`}>
             <ShieldAlert size={32} className={threatLevel === 'SEVERE' ? 'text-red-600' : threatLevel === 'HIGH' ? 'text-orange-500' : 'text-green-500'} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUNA 1: FEED DE INCIDENTES */}
        <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 bg-slate-950 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} className="text-red-400" /> Eventos Recentes
            </h3>
            <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400">{events.length} Ativos</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {events.map(event => (
              <div 
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-slate-800 ${
                  selectedEvent?.id === event.id 
                    ? 'bg-slate-800 border-l-4 border-l-red-500 border-white/10' 
                    : 'bg-slate-900/50 border-transparent border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`flex items-center gap-2 px-2 py-1 rounded text-[10px] font-bold uppercase border ${getSeverityColor(event.severity)}`}>
                    {getEventIcon(event.type)} {event.type.replace('_', ' ')}
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{event.timestamp.toLocaleTimeString()}</span>
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{event.vehicleId} • {event.plate}</h4>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <MapPin size={10} /> {event.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA 2 & 3: MAPA TÁTICO E AÇÕES */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* MAPA RADAR (MOCK VISUAL) */}
          <div className="flex-1 bg-black rounded-xl border border-white/10 relative overflow-hidden group min-h-[350px]">
             {/* Grid Radar Effect */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.1),transparent_70%)] opacity-20 animate-pulse"></div>
             <div className="absolute inset-0" style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}></div>
             
             {/* Center Crosshair */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-900 opacity-30">
               <Crosshair size={300} />
             </div>

             {/* Veículo Selecionado no Mapa */}
             {selectedEvent && (
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                 <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                 <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white z-10"></div>
                 <div className="mt-2 bg-black/80 text-white text-xs px-2 py-1 rounded border border-red-500/50">
                   ALVO: {selectedEvent.plate}
                 </div>
               </div>
             )}

             <div className="absolute top-4 left-4">
               <span className="bg-black/60 text-green-400 font-mono text-xs px-2 py-1 rounded border border-green-500/30">
                 SAT-LINK: ONLINE
               </span>
             </div>
          </div>

          {/* PAINEL DE AÇÃO (COMMAND CENTER) */}
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6 shadow-xl">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-white font-bold text-lg flex items-center gap-2">
                 <Lock size={20} className="text-hlx-gold" /> Painel de Comandos
               </h3>
               {selectedEvent ? (
                 <span className="text-xs text-white bg-slate-800 px-3 py-1 rounded">
                   Veículo Selecionado: <strong>{selectedEvent.plate}</strong>
                 </span>
               ) : (
                 <span className="text-xs text-gray-500 italic">Nenhum evento selecionado</span>
               )}
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => handleAction('BLOQUEIO TOTAL')}
                  disabled={!selectedEvent}
                  className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl flex flex-col items-center gap-2 hover:bg-red-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Lock size={24} className="text-red-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-red-200">BLOQUEIO IMEDIATO</span>
                </button>

                <button 
                  onClick={() => handleAction('ACIONAR SIRENE')}
                  disabled={!selectedEvent}
                  className="p-4 bg-slate-800 border border-white/10 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Siren size={24} className="text-yellow-400" />
                  <span className="text-xs font-bold text-white">Disparar Sirene</span>
                </button>

                <button 
                  onClick={() => handleAction('CHAMAR POLÍCIA')}
                  disabled={!selectedEvent}
                  className="p-4 bg-blue-900/30 border border-blue-500/50 rounded-xl flex flex-col items-center gap-2 hover:bg-blue-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PhoneCall size={24} className="text-blue-400" />
                  <span className="text-xs font-bold text-blue-200">Acionar 190 (API)</span>
                </button>

                <button 
                  onClick={() => handleAction('CHECKLIST REMOTO')}
                  disabled={!selectedEvent}
                  className="p-4 bg-slate-800 border border-white/10 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle size={24} className="text-green-400" />
                  <span className="text-xs font-bold text-white">Checklist Remoto</span>
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RiskMonitor;
