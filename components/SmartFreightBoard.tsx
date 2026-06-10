
import React, { useState, useEffect } from 'react';
import { 
  Package, MapPin, DollarSign, Truck, ShieldCheck, Star, 
  ArrowRight, Filter, AlertCircle, CheckCircle, Zap, Lock, Unlock, ShieldAlert
} from 'lucide-react';
import { guardianEngine } from '../services/guardianSystem';
import { FreightOffer, CompanyProfile } from '../types';

const MOCK_FREIGHTS: FreightOffer[] = [
    { 
        id: 'fr-01', origin: 'São Paulo, SP', destination: 'Rio de Janeiro, RJ', 
        cargoType: 'E-commerce (Alto Valor)', vehicleTypeRequired: 'VUC', 
        price: 2200, distance: 430, shipperName: 'Mercado Livre Log', 
        minScoreRequired: 90, // Exige Selo Ouro/Diamante
        matchReason: 'Sua frota tem rastreador validado e Score Alto.' 
    },
    { 
        id: 'fr-02', origin: 'Betim, MG', destination: 'Salvador, BA', 
        cargoType: 'Peças Automotivas', vehicleTypeRequired: 'TRUCK', 
        price: 9500, distance: 1200, shipperName: 'Stellantis', 
        minScoreRequired: 85, 
        matchReason: 'Você tem curso MOPP e Seguro em dia.' 
    },
    { 
        id: 'fr-03', origin: 'Curitiba, PR', destination: 'Porto Alegre, RS', 
        cargoType: 'Refrigerado', vehicleTypeRequired: 'TOCO', 
        price: 3200, distance: 750, shipperName: 'FrioLog', 
        minScoreRequired: 70, 
        matchReason: 'Rota compatível com seu histórico.' 
    },
    { 
        id: 'fr-04', origin: 'Goiânia, GO', destination: 'Santos, SP', 
        cargoType: 'Grãos (Saca)', vehicleTypeRequired: 'BITREM', 
        price: 12000, distance: 900, shipperName: 'AgroX', 
        minScoreRequired: 60 
    },
    { 
        id: 'fr-05', origin: 'Campinas, SP', destination: 'Recife, PE', 
        cargoType: 'Farmacêutico', vehicleTypeRequired: 'CARRETA', 
        price: 18000, distance: 2600, shipperName: 'PharmaGlobal', 
        minScoreRequired: 95, 
        matchReason: 'Exclusivo para Helonex Diamante.' 
    }
];

const SmartFreightBoard: React.FC = () => {
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [matches, setMatches] = useState<FreightOffer[]>([]);
  const [viewMode, setViewMode] = useState<'MATCHES' | 'ALL'>('MATCHES');

  useEffect(() => {
    const data = guardianEngine.getCompanyData();
    setCompany(data);
    
    if (data) {
        const myScore = data.reputation?.score || 50;
        const myVehicles = data.vehicles || [];
        
        const processed = MOCK_FREIGHTS.map(f => {
            let isCompatible = true;
            let reason = f.matchReason;

            if (myScore < f.minScoreRequired) {
                isCompatible = false;
                reason = `Requer Nível Maior (Score ${f.minScoreRequired})`;
            }

            if (myVehicles.length > 0 && isCompatible) {
                const hasVehicle = myVehicles.some(v => v.type === f.vehicleTypeRequired || (f.vehicleTypeRequired === 'VUC' && v.type === 'VAN'));
                if (!hasVehicle) {
                    reason = `Falta Veículo ${f.vehicleTypeRequired} no cadastro.`;
                }
            }

            return { ...f, isCompatible, dynamicReason: reason };
        });

        setMatches(processed);
    }
  }, []);

  if (!company) return null;

  const displayedFreights = viewMode === 'MATCHES' 
    ? matches.filter(m => (m as any).isCompatible) 
    : matches;

  return (
    <div className="bg-slate-900 border-2 border-white/20 rounded-2xl p-6 shadow-xl animate-fade-in-up h-full flex flex-col">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Zap className="text-yellow-400 fill-yellow-400" size={28} /> 
                    CARGAS DISPONÍVEIS
                </h3>
                <p className="text-gray-300 text-base mt-1">Oportunidades seguras para você.</p>
            </div>
            
            {/* BOTÕES DE FILTRO GRANDES */}
            <div className="flex w-full md:w-auto bg-slate-950 p-2 rounded-xl border border-white/20 gap-2">
                <button 
                    onClick={() => setViewMode('MATCHES')}
                    className={`flex-1 md:flex-none px-6 py-3 rounded-lg text-sm font-bold transition-all uppercase tracking-wide ${
                        viewMode === 'MATCHES' 
                        ? 'bg-green-600 text-white shadow-lg ring-2 ring-green-400 ring-offset-2 ring-offset-slate-900' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                    COMPATÍVEIS ({matches.filter((m:any) => m.isCompatible).length})
                </button>
                <button 
                    onClick={() => setViewMode('ALL')}
                    className={`flex-1 md:flex-none px-6 py-3 rounded-lg text-sm font-bold transition-all uppercase tracking-wide ${
                        viewMode === 'ALL' 
                        ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                    VER TODAS ({matches.length})
                </button>
            </div>
        </div>

        <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2 flex-1 max-h-[600px]">
            {displayedFreights.map((offer: any) => (
                <div 
                    key={offer.id} 
                    className={`bg-slate-800 border-2 rounded-xl p-5 transition-all group relative overflow-hidden shadow-md ${
                        offer.isCompatible 
                        ? 'border-green-500/50 hover:border-hlx-gold hover:bg-slate-700 cursor-pointer' 
                        : 'border-red-500/30 opacity-80'
                    }`}
                >
                    
                    {/* Badge de Status GRANDE */}
                    <div className={`absolute top-0 right-0 text-xs font-bold px-4 py-2 rounded-bl-xl flex items-center gap-2 uppercase tracking-wider ${
                        offer.isCompatible ? 'bg-hlx-gold text-slate-900' : 'bg-red-600 text-white'
                    }`}>
                        {offer.isCompatible ? <><Star size={14} fill="currentColor" /> APROVADA PARA VOCÊ</> : <><Lock size={14} /> REQUISITOS NÃO ATENDIDOS</>}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mt-6 md:mt-2 mb-4">
                        <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 shrink-0 ${
                                offer.isCompatible ? 'bg-slate-900 border-green-500/50 text-green-400' : 'bg-slate-900 border-red-500/30 text-red-500'
                            }`}>
                                {offer.isCompatible ? <Package size={32} /> : <Lock size={32} />}
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-xl">{offer.cargoType}</h4>
                                <p className="text-sm text-gray-300 font-medium uppercase flex items-center gap-1 mt-1">
                                    <ShieldCheck size={16} className="text-blue-400"/> {offer.shipperName}
                                </p>
                            </div>
                        </div>
                        <div className="text-left md:text-right w-full md:w-auto bg-slate-950/50 p-3 rounded-lg border border-white/10 md:bg-transparent md:border-none md:p-0">
                            <p className="text-xs text-gray-400 uppercase font-bold">Valor do Frete</p>
                            <p className={`text-3xl font-black ${offer.isCompatible ? 'text-green-400' : 'text-gray-500'}`}>
                                R$ {offer.price.toLocaleString()}
                            </p>
                            <p className="text-sm text-white font-bold">{offer.distance} km</p>
                        </div>
                    </div>

                    {/* Rota com Ícones Grandes */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 bg-slate-950 p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 text-base text-gray-200 font-bold w-full">
                            <div className="bg-blue-500/20 p-2 rounded-full text-blue-400"><MapPin size={20} /></div> 
                            {offer.origin.split(',')[0]}
                        </div>
                        <ArrowRight size={24} className="text-gray-500 rotate-90 sm:rotate-0" />
                        <div className="flex items-center gap-2 text-base text-gray-200 font-bold w-full justify-end sm:justify-start">
                            <div className="bg-orange-500/20 p-2 rounded-full text-orange-400"><MapPin size={20} /></div> 
                            {offer.destination.split(',')[0]}
                        </div>
                    </div>

                    {/* Footer da Card */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-col gap-2 w-full md:w-auto">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Truck size={18} /> Veículo: <span className="text-white font-bold uppercase">{offer.vehicleTypeRequired}</span>
                            </div>
                            {offer.dynamicReason && (
                                <span className={`text-sm font-bold flex items-center gap-2 p-2 rounded ${
                                    offer.isCompatible ? 'text-hlx-gold bg-yellow-900/20 border border-yellow-500/30' : 'text-red-300 bg-red-900/20 border border-red-500/30'
                                }`}>
                                    {offer.isCompatible ? <CheckCircle size={16} /> : <AlertCircle size={16} />} 
                                    {offer.dynamicReason}
                                </span>
                            )}
                        </div>
                        
                        {offer.isCompatible ? (
                            <button className="w-full md:w-auto text-base font-black bg-hlx-gold hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl shadow-lg shadow-yellow-500/20 hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-wide">
                                <Unlock size={20}/> PEGAR ESTA CARGA
                            </button>
                        ) : (
                            <button className="w-full md:w-auto text-sm font-bold bg-slate-700 text-gray-400 px-6 py-3 rounded-xl border border-white/5 cursor-not-allowed flex items-center justify-center gap-2">
                                <Lock size={18}/> NÍVEL INSUFICIENTE
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {displayedFreights.length === 0 && (
                <div className="text-center py-16 bg-slate-800/50 rounded-2xl border-2 border-dashed border-white/20">
                    <ShieldAlert size={64} className="text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Nenhuma carga encontrada</h3>
                    <p className="text-gray-400 text-base max-w-md mx-auto">
                        Tente mudar o filtro para "Ver Todas" ou melhore seu Score IQT para desbloquear mais oportunidades.
                    </p>
                </div>
            )}
        </div>
    </div>
  );
};

export default SmartFreightBoard;
