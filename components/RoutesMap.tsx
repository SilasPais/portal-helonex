
import React, { useState } from 'react';
import { TransportRoute, GeoPoint } from '../types';
import { MapPin, Navigation, AlertTriangle, Scale, ShieldAlert, Crosshair, Info, Layers } from 'lucide-react';

interface RoutesMapProps {
  routes: TransportRoute[];
  points: GeoPoint[];
}

const RoutesMap: React.FC<RoutesMapProps> = ({ routes, points }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<GeoPoint | null>(null);

  const getPointById = (id: string) => points.find(p => p.id === id);

  // Filtra pontos a exibir (apenas os da rota selecionada ou todos se nenhuma selecionada)
  const displayedRoutes = selectedRouteId 
    ? routes.filter(r => r.id === selectedRouteId)
    : routes;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return '#ef4444'; // Red
      case 'HIGH': return '#f97316'; // Orange
      case 'MEDIUM': return '#eab308'; // Yellow
      default: return '#3b82f6'; // Blue
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[600px] animate-fade-in-up">
      
      {/* SIDEBAR: LISTA DE ROTAS */}
      <div className="w-full lg:w-1/3 bg-slate-900 border border-white/10 rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-slate-950 flex justify-between items-center">
          <h3 className="text-white font-bold flex items-center gap-2">
            <Navigation className="text-hlx-gold" size={18} /> Rotas Monitoradas
          </h3>
          <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">LIVE</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {routes.map(route => (
            <button
              key={route.id}
              onClick={() => setSelectedRouteId(route.id === selectedRouteId ? null : route.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedRouteId === route.id 
                  ? 'bg-slate-800 border-hlx-gold shadow-lg shadow-hlx-gold/10' 
                  : 'bg-slate-950 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white text-sm">{route.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  route.riskScore > 80 ? 'bg-red-500/20 text-red-400' : 
                  route.riskScore > 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  Risco: {route.riskScore}%
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin size={12} /> {getPointById(route.originId)?.label} 
                <span className="text-gray-600">➔</span> 
                {getPointById(route.destinationId)?.label}
              </div>
            </button>
          ))}
        </div>

        {/* LEGENDA */}
        <div className="p-4 bg-slate-950 border-t border-white/10 text-xs text-gray-400 space-y-2">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Zona Crítica (Roubo/Acidente)</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Balança/Posto Fiscal</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Hub Logístico</div>
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

          {/* DESENHO DAS ROTAS */}
          {displayedRoutes.map(route => {
            const origin = getPointById(route.originId);
            const dest = getPointById(route.destinationId);
            if (!origin || !dest) return null;

            return (
              <g key={route.id}>
                {/* Linha da Rota */}
                <line 
                  x1={origin.x} y1={origin.y} 
                  x2={dest.x} y2={dest.y} 
                  stroke={route.status === 'WARNING' ? '#f59e0b' : '#3b82f6'} 
                  strokeWidth="0.5" 
                  strokeDasharray={route.status === 'WARNING' ? "2,1" : "0"}
                  className="opacity-50 animate-pulse"
                />
                {/* Marcadores Intermediários (Se houver) */}
                {route.pointsOfInterest.map(pid => {
                   const pt = getPointById(pid);
                   if(!pt) return null;
                   // Em um mapa real, calcularíamos a projeção. Aqui assumimos que o ponto já tem X/Y corretos.
                   return null; 
                })}
              </g>
            );
          })}

          {/* DESENHO DOS PONTOS (NODES) */}
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

              {/* Ícone (Opcional, simplificado via SVG) */}
              {point.type === 'WEIGH_STATION' && (
                 <text x={point.x} y={point.y - 3} textAnchor="middle" fill={getRiskColor(point.riskLevel)} fontSize="3" fontWeight="bold">⚖️</text>
              )}
              {point.type === 'RISK_ZONE' && (
                 <text x={point.x} y={point.y - 3} textAnchor="middle" fill={getRiskColor(point.riskLevel)} fontSize="3" fontWeight="bold">⚠️</text>
              )}

            </g>
          ))}

        </svg>

        {/* TOOLTIP FLUTUANTE */}
        {hoveredPoint && (
          <div 
            className="absolute bg-slate-900/90 border border-white/20 p-4 rounded-xl shadow-2xl backdrop-blur-md z-50 pointer-events-none w-64 animate-fade-in-up"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="flex justify-between items-start mb-2">
               <h4 className="text-white font-bold text-sm">{hoveredPoint.label}</h4>
               {hoveredPoint.type === 'WEIGH_STATION' && <Scale size={14} className="text-orange-400"/>}
               {hoveredPoint.type === 'RISK_ZONE' && <ShieldAlert size={14} className="text-red-400"/>}
               {hoveredPoint.type === 'HUB' && <Layers size={14} className="text-blue-400"/>}
            </div>
            
            <div className="space-y-2">
               <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  hoveredPoint.riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                  hoveredPoint.riskLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-blue-500/20 text-blue-400'
               }`}>
                 Risco: {hoveredPoint.riskLevel}
               </span>
               <p className="text-xs text-gray-300 leading-tight">
                 {hoveredPoint.details || 'Ponto estratégico logístico.'}
               </p>
            </div>
          </div>
        )}

        {/* UI OVERLAY */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           <div className="bg-black/60 backdrop-blur-sm p-2 rounded text-xs font-mono text-green-400 border border-green-500/20">
             SYSTEM STATUS: ONLINE
           </div>
           <div className="bg-black/60 backdrop-blur-sm p-2 rounded text-xs font-mono text-blue-400 border border-blue-500/20 flex items-center gap-2">
             <Crosshair size={12} /> TRACKING ACTIVE
           </div>
        </div>

      </div>
    </div>
  );
};

export default RoutesMap;
