import React, { useState, useEffect } from 'react';
import { TransportRoute, GeoPoint, SafeStop } from '../types';
import { MapPin, Navigation, AlertTriangle, Scale, ShieldAlert, Crosshair, Info, Layers, Truck, ShieldCheck, Fuel, Coffee, Siren, Lock, Wifi, CheckCircle } from 'lucide-react';
import { guardianEngine } from '../services/guardianSystem';

interface RoutesMapProps {
  routes: TransportRoute[];
  points: GeoPoint[];
}

const RoutesMap: React.FC<RoutesMapProps> = ({ routes, points }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<GeoPoint | SafeStop | null>(null);
  const [activeRoutes, setActiveRoutes] = useState<TransportRoute[]>(routes);
  const [safeStops, setSafeStops] = useState<SafeStop[]>([]);
  const [isGrConnected, setIsGrConnected] = useState(false);

  useEffect(() => {
      // Carrega pontos seguros e injeta nos dados de rota mockados
      const stops = guardianEngine.getSafeStops();
      setSafeStops(stops);
      
      // Simulação de GPS em tempo real
      const interval = setInterval(() => {
          setIsGrConnected(prev => Math.random() > 0.1); // Simula oscilação GR
          setActiveRoutes(prevRoutes => prevRoutes.map(route => {
              if (!route.currentVehiclePosition) {
                  // Inicializa posição na origem
                  const origin = points.find(p => p.id === route.originId);
                  return { ...route, currentVehiclePosition: { x: origin?.x || 50, y: origin?.y || 50 }, deviationAlert: false };
              }
              
              // Movimenta o caminhão levemente
              let newX = route.currentVehiclePosition.x + (Math.random() - 0.4); // Viés positivo
              let newY = route.currentVehiclePosition.y + (Math.random() - 0.4);
              
              // Verifica desvio da rota (Geofence Simplificado)
              // Em produção, isso usaria algoritmos de "Distance from Polyline"
              const origin = points.find(p => p.id === route.originId);
              const dest = points.find(p => p.id === route.destinationId);
              let isDeviation = false;
              
              if (origin && dest) {
                  // Linha imaginária da rota
                  // Se a distância perpendicular do ponto atual à linha for grande -> Desvio
                  // Lógica simplificada: Se afastar muito da média
                  const idealX = (origin.x + dest.x) / 2;
                  if (Math.abs(newX - idealX) > 30) isDeviation = true;
              }

              return {
                  ...route,
                  currentVehiclePosition: { x: newX, y: newY },
                  deviationAlert: isDeviation
              };
          }));
      }, 2000);

      return () => clearInterval(interval);
  }, [points]);

  const getPointById = (id: string) => points.find(p => p.id === id);

  const displayedRoutes = selectedRouteId 
    ? activeRoutes.filter(r => r.id === selectedRouteId)
    : activeRoutes;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return '#ef4444'; // Red
      case 'HIGH': return '#f97316'; // Orange
      case 'MEDIUM': return '#eab308'; // Yellow
      default: return '#3b82f6'; // Blue
    }
  };

  const renderSafeStopIcon = (type: string, size: number = 4) => {
      switch(type) {
          case 'GAS_STATION': return <text fontSize={size}>⛽</text>;
          case 'POLICE': return <text fontSize={size}>🚔</text>;
          case 'HOTEL': return <text fontSize={size}>🏨</text>;
          default: return <text fontSize={size}>📍</text>;
      }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[600px] animate-fade-in-up">
      
      {/* SIDEBAR: LISTA DE ROTAS & TELEMETRIA */}
      <div className="w-full lg:w-1/3 bg-slate-900 border border-white/10 rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-slate-950 flex justify-between items-center">
          <h3 className="text-white font-bold flex items-center gap-2">
            <Navigation className="text-hlx-gold" size={18} /> Central de Roteirização
          </h3>
          <div className="flex items-center gap-2">
             <Wifi size={14} className={isGrConnected ? "text-green-500 animate-pulse" : "text-red-500"} />
             <span className="text-[10px] text-gray-400 font-bold uppercase">{isGrConnected ? "GR ON" : "SEM SINAL GR"}</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {activeRoutes.map(route => (
            <button
              key={route.id}
              onClick={() => setSelectedRouteId(route.id === selectedRouteId ? null : route.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                selectedRouteId === route.id 
                  ? 'bg-slate-800 border-hlx-gold shadow-lg shadow-hlx-gold/10' 
                  : 'bg-slate-950 border-white/5 hover:border-white/20'
              }`}
            >
              {route.deviationAlert && (
                  <div className="absolute inset-0 bg-red-500/10 border-2 border-red-500 animate-pulse z-0 pointer-events-none"></div>
              )}
              <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-white text-sm">{route.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      route.deviationAlert ? 'bg-red-600 text-white' : 
                      route.riskScore > 80 ? 'bg-red-500/20 text-red-400' : 
                      route.riskScore > 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {route.deviationAlert ? 'DESVIO DE ROTA' : `Risco: ${route.riskScore}%`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={12} /> {getPointById(route.originId)?.label} 
                    <span className="text-gray-600">➔</span> 
                    {getPointById(route.destinationId)?.label}
                  </div>
              </div>
            </button>
          ))}
        </div>

        {/* LEGENDA & STATUS */}
        <div className="p-4 bg-slate-950 border-t border-white/10 text-xs text-gray-400 space-y-2">
          <p className="font-bold text-white mb-2 uppercase tracking-wider">Legenda de Segurança</p>
          <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-green-400" /> Ponto Averbado (Seguro)</div>
          <div className="flex items-center gap-2"><AlertTriangle size={14} className="text-red-500" /> Zona de Risco (Roubo)</div>
          <div className="flex items-center gap-2"><Truck size={14} className="text-hlx-gold" /> Veículo Rastreável</div>
        </div>
      </div>

      {/* MAPA VETORIAL (SVG) */}
      <div className="flex-1 bg-[#0B1120] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center shadow-2xl group">
        
        {/* GRID DE FUNDO (EFEITO RADAR) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.1),transparent_70%)]"></div>

        {/* MAPA SVG ABSTRATO (BRASIL SIMPLIFICADO) */}
        <svg viewBox="0 0 100 100" className="w-full h-full p-8 relative z-10" style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}>
          
          {/* Contorno Abstrato (Apenas visual) */}
          <path d="M30,90 L20,60 L30,40 L60,20 L90,40 L80,80 Z" fill="none" stroke="#1e293b" strokeWidth="0.5" />

          {/* DESENHO DAS ROTAS & VEÍCULOS */}
          {displayedRoutes.map(route => {
            const origin = getPointById(route.originId);
            const dest = getPointById(route.destinationId);
            if (!origin || !dest) return null;

            return (
              <g key={route.id}>
                {/* Linha da Rota Planejada */}
                <line 
                  x1={origin.x} y1={origin.y} 
                  x2={dest.x} y2={dest.y} 
                  stroke={route.deviationAlert ? '#ef4444' : route.status === 'WARNING' ? '#f59e0b' : '#3b82f6'} 
                  strokeWidth="0.5" 
                  strokeDasharray={route.status === 'WARNING' ? "2,1" : "0"}
                  className="opacity-50 animate-pulse"
                />
                
                {/* Veículo (Truck) */}
                {route.currentVehiclePosition && (
                    <g transform={`translate(${route.currentVehiclePosition.x}, ${route.currentVehiclePosition.y})`}>
                        {/* Aura de Risco se desviado */}
                        {route.deviationAlert && <circle r="4" fill="red" opacity="0.3" className="animate-ping" />}
                        
                        <circle r="1.5" fill={route.deviationAlert ? "red" : "#f59e0b"} stroke="white" strokeWidth="0.2" />
                        <text y="-2.5" x="0" textAnchor="middle" fontSize="2" fill="white" fontWeight="bold">🚛</text>
                    </g>
                )}
              </g>
            );
          })}

          {/* PONTOS DE APOIO (SAFE STOPS) */}
          {safeStops.map(stop => (
              <g 
                key={stop.id} 
                onMouseEnter={() => setHoveredPoint(stop)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="cursor-pointer hover:opacity-100 transition-opacity"
                opacity={selectedRouteId ? 0.8 : 0.6}
              >
                  <circle cx={stop.x} cy={stop.y} r="1" fill={stop.insuranceApproved ? "#22c55e" : "#64748b"} />
                  <text x={stop.x - 2} y={stop.y + 1.5}>
                      {renderSafeStopIcon(stop.type)}
                  </text>
                  {stop.insuranceApproved && (
                      <circle cx={stop.x + 2} cy={stop.y - 2} r="0.5" fill="#22c55e" className="animate-pulse" />
                  )}
              </g>
          ))}

          {/* DESENHO DOS PONTOS (CIDADES/HUBS) */}
          {points.map(point => (
            <g 
              key={point.id} 
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="cursor-pointer transition-all hover:opacity-100"
              style={{ opacity: selectedRouteId ? (displayedRoutes.some(r => r.originId === point.id || r.destinationId === point.id || r.pointsOfInterest.includes(point.id)) ? 1 : 0.2) : 1 }}
            >
              {/* Círculo de Alcance (Radar) */}
              {point.riskLevel === 'CRITICAL' && (
                <circle cx={point.x} cy={point.y} r="6" fill={getRiskColor(point.riskLevel)} fillOpacity="0.1" className="animate-ping" />
              )}
              
              {/* Ponto Central */}
              <circle 
                cx={point.x} 
                cy={point.y} 
                r={point.type === 'HUB' ? 2 : 1.5} 
                fill={getRiskColor(point.riskLevel)} 
                stroke="#0f172a"
                strokeWidth="0.5"
              />

              {/* Ícone (SVG Text) */}
              {point.type === 'WEIGH_STATION' && <text x={point.x} y={point.y - 3} textAnchor="middle" fontSize="3">⚖️</text>}
              {point.type === 'RISK_ZONE' && <text x={point.x} y={point.y - 3} textAnchor="middle" fontSize="3">⚠️</text>}

            </g>
          ))}

        </svg>

        {/* TOOLTIP FLUTUANTE INTELIGENTE */}
        {hoveredPoint && (
          <div 
            className="absolute bg-slate-900/95 border border-white/20 p-4 rounded-xl shadow-2xl backdrop-blur-md z-50 pointer-events-none w-64 animate-fade-in-up"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {'name' in hoveredPoint ? (
                // É um SafeStop
                <>
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-bold text-sm">{(hoveredPoint as SafeStop).name}</h4>
                        {(hoveredPoint as SafeStop).insuranceApproved ? <ShieldCheck size={16} className="text-green-400"/> : <Lock size={16} className="text-gray-500"/>}
                    </div>
                    <div className="space-y-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase flex w-fit items-center gap-1 ${
                            (hoveredPoint as SafeStop).insuranceApproved ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                            {(hoveredPoint as SafeStop).insuranceApproved ? <CheckCircle size={10}/> : <Lock size={10}/>}
                            {(hoveredPoint as SafeStop).insuranceApproved ? 'PERNOITE AVERBADO' : 'NÃO COBERTO'}
                        </span>
                        <p className="text-xs text-gray-300">
                            {(hoveredPoint as SafeStop).type === 'GAS_STATION' ? 'Posto de Combustível' : 
                             (hoveredPoint as SafeStop).type === 'POLICE' ? 'Posto Policial' : 'Hotel/Pátio'}
                        </p>
                    </div>
                </>
            ) : (
                // É um GeoPoint
                <>
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-bold text-sm">{(hoveredPoint as GeoPoint).label}</h4>
                        {(hoveredPoint as GeoPoint).type === 'WEIGH_STATION' && <Scale size={14} className="text-orange-400"/>}
                        {(hoveredPoint as GeoPoint).type === 'RISK_ZONE' && <ShieldAlert size={14} className="text-red-400"/>}
                        {(hoveredPoint as GeoPoint).type === 'HUB' && <Layers size={14} className="text-blue-400"/>}
                    </div>
                    <div className="space-y-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            (hoveredPoint as GeoPoint).riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                            (hoveredPoint as GeoPoint).riskLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-blue-500/20 text-blue-400'
                        }`}>
                            Risco: {(hoveredPoint as GeoPoint).riskLevel}
                        </span>
                        <p className="text-xs text-gray-300 leading-tight">
                            {(hoveredPoint as GeoPoint).details || 'Ponto estratégico logístico.'}
                        </p>
                    </div>
                </>
            )}
          </div>
        )}

        {/* UI OVERLAY */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           <div className="bg-black/60 backdrop-blur-sm p-2 rounded text-xs font-mono text-green-400 border border-green-500/20">
             GPS LINK: {isGrConnected ? "ESTÁVEL (4G)" : "OFFLINE (BUFFER)"}
           </div>
           {activeRoutes.some(r => r.deviationAlert) && (
               <div className="bg-red-600/90 backdrop-blur-sm p-2 rounded text-xs font-bold text-white border border-red-400 animate-pulse flex items-center gap-2">
                   <Siren size={14} /> ALERTA DE DESVIO DETECTADO
               </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default RoutesMap;