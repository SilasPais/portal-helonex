
import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Radio, AlertTriangle, Lock, Unlock, MapPin, 
  Navigation, Crosshair, Siren, PhoneCall, CheckCircle, Activity, 
  AlertOctagon, Wifi, Thermometer, Truck, X, Clock, Scale, Timer, Coffee
} from 'lucide-react';
import { RiskEvent } from '../types';

const RiskMonitor: React.FC = () => {
  const [threatLevel, setThreatLevel] = useState<'LOW' | 'ELEVATED' | 'HIGH' | 'SEVERE'>('LOW');
  const [events, setEvents] = useState<RiskEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<RiskEvent | null>(null);
  
  // States para Lei do Caminhoneiro
  const [drivingTime, setDrivingTime] = useState(270); // 4h30m (em minutos)
  const [dailyRest, setDailyRest] = useState(0); // minutos
  const maxDrivingTime = 330; // 5h30m (Lei 13.103)

  useEffect(() => {
    // MOCK DE EVENTOS OPERACIONAIS REAIS
    const mockEvents: RiskEvent[] = [
      {
        id: 'evt-rest',
        type: 'ROUTE_DEVIATION', // Usando um tipo compatível existente, mas a descrição explicará
        severity: 'HIGH',
        vehicleId: 'V-200',
        plate: 'ABC-1234',
        driverName: 'João Silva',
        location: 'BR-116, Km 300',
        timestamp: new Date(),
        status: 'ACTIVE',
      },
      {
        id: 'evt-weight',
        type: 'THEFT', // Placeholder para infração grave
        severity: 'CRITICAL',
        vehicleId: 'V-305',
        plate: 'XYZ-9988',
        driverName: 'Marcos Dias',
        location: 'Posto Fiscal PR',
        timestamp: new Date(Date.now() - 1000 * 60 * 10), 
        status: 'INVESTIGATING'
      }
    ];
    setEvents(mockEvents);
    setThreatLevel('HIGH');

    // Simulação de eventos chegando
    const interval = setInterval(() => {
      // Simulação do relógio de jornada
      setDrivingTime(prev => {
          if (prev >= maxDrivingTime) return prev; // Limite
          return prev + 1;
      });

      if (Math.random() > 0.7) {
        const types: any[] = ['STOP', 'DOOR_OPEN', 'ACCIDENT'];
        const newEvent: RiskEvent = {
          id: `evt-${Date.now()}`,
          type: types[Math.floor(Math.random() * types.length)],
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
    }, 10000); // 10 segundos na vida real = 1 minuto no simulador para ver a barra mexer devagar

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string, id: string) => {
    // Hack visual para mostrar ícones específicos baseado no ID simulado
    if (id === 'evt-rest') return <Clock size={18} />;
    if (id === 'evt-weight') return <Scale size={18} />;

    switch (type) {
      case 'THEFT': return <AlertOctagon size={18} />; 
      case 'JAMMING': return <Wifi size={18} />; 
      case 'ACCIDENT': return <Siren size={18} />;
      case 'DOOR_OPEN': return <Unlock size={18} />;
      default: return <AlertTriangle size={18} />;
    }
  };

  const getEventLabel = (type: string, id: string) => {
      if (id === 'evt-rest') return 'LEI DO DESCANSO';
      if (id === 'evt-weight') return 'EVASÃO BALANÇA';
      return type.replace('_', ' ');
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

  // Helper para formatar minutos em HH:MM
  const formatMinutes = (mins: number) => {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return `${h}h ${m < 10 ? '0' : ''}${m}m`;
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 animate-fade-in-up">
      
      {/* HEADER TÁTICO */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-6 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-2 animate-pulse">
             <Radio size={14} /> Torre de Controle 24h
          </div>
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
            Monitoramento de Risco
          </h1>
          <p className="text-gray-400 text-sm">Fiscalização ativa de Jornada (Lei 13.103) e Risco Patrimonial.</p>
        </div>

        {/* DEFCON INDICATOR */}
        <div className="flex items-center gap-4 bg-slate-900 border border-white/10 p-4 rounded-xl shadow-lg">
           <div className="text-right">
             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Nível de Ameaça</p>
             <p className={`text-2xl font-black ${
               threatLevel === 'SEVERE' ? 'text-red-600 animate-pulse' : 
               threatLevel === 'HIGH' ? 'text-orange-500' : 'text-green-500'
             }`}>
               {threatLevel === 'SEVERE' ? 'CRÍTICO' : threatLevel === 'HIGH' ? 'ALERTA' : 'NORMAL'}
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
                    {getEventIcon(event.type, event.id)} {getEventLabel(event.type, event.id)}
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{event.timestamp.toLocaleTimeString()}</span>
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{event.vehicleId} • {event.plate}</h4>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <MapPin size={10} /> {event.location}
                </p>
                {/* Detalhe extra para eventos específicos */}
                {event.id === 'evt-rest' && (
                    <p className="text-[10px] text-orange-400 mt-2 bg-orange-500/10 p-1 rounded border border-orange-500/20">
                        ⚠️ Dirigindo há 5h40 sem pausa. Infração iminente.
                    </p>
                )}
                {event.id === 'evt-weight' && (
                    <p className="text-[10px] text-red-400 mt-2 bg-red-500/10 p-1 rounded border border-red-500/20">
                        🚨 Veículo desviou rota da balança obrigatória.
                    </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA 2 & 3: MAPA TÁTICO E AÇÕES */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* WIDGET LEI DO CAMINHONEIRO (NOVO) */}
          {selectedEvent && (
              <div className="bg-slate-900 border border-white/10 rounded-xl p-4 flex gap-6 items-center">
                  <div className="flex-1">
                      <div className="flex justify-between items-end mb-2">
                          <h4 className="text-white font-bold flex items-center gap-2">
                              <Timer size={18} className="text-hlx-gold" /> Jornada Ativa (Lei 13.103)
                          </h4>
                          <span className={`text-xs font-bold ${drivingTime > 300 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                              {drivingTime > 300 ? 'LIMITE EXCEDIDO' : 'DENTRO DO LIMITE'}
                          </span>
                      </div>
                      
                      <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden mb-1 relative">
                          {/* Marca de 5h30m */}
                          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-red-500 z-10" title="Limite 5h30"></div>
                          <div 
                              className={`h-full transition-all duration-1000 ${drivingTime > 300 ? 'bg-red-500' : 'bg-green-500'}`} 
                              style={{ width: `${(drivingTime / maxDrivingTime) * 100}%` }}
                          ></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                          <span>0h</span>
                          <span>{formatMinutes(drivingTime)} dirigindo</span>
                          <span>Limite: 5h30m</span>
                      </div>
                  </div>

                  <div className="w-px h-12 bg-white/10"></div>

                  <div className="flex items-center gap-4">
                      <div className="text-center">
                          <Coffee className="text-blue-400 mx-auto mb-1" size={20} />
                          <p className="text-[10px] text-gray-400 uppercase font-bold">Descanso</p>
                          <p className="text-white font-bold text-lg">0h 30m</p>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded transition-colors">
                          Registrar Parada
                      </button>
                  </div>
              </div>
          )}

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
                  onClick={() => handleAction('ALERTAR MOTORISTA')}
                  disabled={!selectedEvent}
                  className="p-4 bg-slate-800 border border-white/10 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Siren size={24} className="text-yellow-400" />
                  <span className="text-xs font-bold text-white">Alerta Sonoro (Cabine)</span>
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
                  <span className="text-xs font-bold text-white">Auditoria Remota</span>
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RiskMonitor;
