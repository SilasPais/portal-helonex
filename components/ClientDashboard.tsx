
import React, { useEffect, useState } from 'react';
import { 
  Truck, FileCheck, AlertTriangle, Calendar, Plus, 
  ShieldCheck, TrendingUp, AlertOctagon, Zap, Search, MoreHorizontal, X, ExternalLink, BookOpen, Trophy, ArrowRight, GraduationCap, Lock, Key, CreditCard,
  FileKey, RefreshCw, Landmark, Siren, Building2, Eye, BrainCircuit, Activity, Scale, Gavel, FileText, Printer, Calculator, Download, DollarSign, Wallet,
  Receipt, ShoppingCart, Users, UserCheck, Stethoscope, Clock, ShieldAlert, CheckCircle2, PlayCircle, MapPin, ZapOff, Anchor, Pill, Gauge, Trash2, HardHat, Percent, UserPlus, GaugeCircle, Info, Flame, AlertCircle, Leaf, Scan, Camera, QrCode, Wifi, Settings, Signal, HelpCircle, Server, Smartphone, Cpu, Cable, Router, User, List, UploadCloud, FileInput, CheckSquare, ClipboardList, Bookmark, LifeBuoy, Send, MessageSquare, ChevronRight, Tag,
  Sparkles, Star, Ban, FileWarning, Plane, Coins, Repeat, Globe, Sun, Briefcase, Thermometer, Armchair, Smile, Cloud, HeartPulse, Wrench, RefreshCcw, Bell, CheckSquare as ChecklistIcon, Target, Map, Heart, Gem, PieChart, Award, Medal, HeartHandshake, Microscope, Database
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { guardianEngine } from '../services/guardianSystem';
import { CompanyProfile, QualitySealData } from '../types';
import GuardianSeal from './GuardianSeal';
import PatrimonialDiagnostic from './PatrimonialDiagnostic';
import NeuroTelemetry from './NeuroTelemetry';
import FinancialModule from './FinancialModule';
import DriverRecognitionModule from './DriverRecognitionModule';
import QualityManagement from './QualityManagement';
import RoutesMap from './RoutesMap';
import IntegrationsHub from './IntegrationsHub';
import RiskMonitor from './RiskMonitor';

interface ClientDashboardProps {
  onNavigateToSuccess?: () => void;
}

type DashboardTab = 'audit_center' | 'risk_monitor' | 'integrations' | 'rhtec' | 'finance' | 'neuro' | 'wealth' | 'quality' | 'routes';

const ClientDashboard: React.FC<ClientDashboardProps> = ({ onNavigateToSuccess }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('audit_center');
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [showValuationModal, setShowValuationModal] = useState(false);

  const refreshData = () => {
    const companyData = guardianEngine.getCompanyData();
    setCompany(companyData);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleStartValuation = () => {
      setShowValuationModal(true);
  };

  if (!company) return <div className="p-8 text-white flex justify-center"><div className="animate-spin text-hlx-gold"><RefreshCw /></div></div>;

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER: CONCEITO DIAMANTE */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-6 gap-4">
           <div>
             <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded bg-cyan-500/10 flex items-center gap-1">
                    <Gem size={10} /> Helonex Auditoria Digital
                </span>
             </div>
             <h1 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2">
               Painel de Controle: {company.name}
             </h1>
             <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                <Microscope size={14} className="text-hlx-gold" />
                Status da Auditoria: <span className="text-green-400 font-bold">Conectado ao ERP</span>
             </p>
           </div>
           
           <div className="flex items-center gap-4">
              <div 
                onClick={onNavigateToSuccess}
                className="text-right hidden md:block cursor-pointer group"
                title="Ver Jornada de Sucesso"
              >
                 <p className="text-xs text-gray-500 uppercase font-bold group-hover:text-hlx-gold transition-colors">Health Score (Saúde)</p>
                 <div className="w-32 bg-slate-800 h-2 rounded-full mt-1 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-full w-[85%]"></div>
                 </div>
                 <p className="text-[10px] text-green-400 text-right mt-0.5 font-mono group-hover:underline">850/1000 pts</p>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-white/10 relative shadow-lg shadow-cyan-500/10">
                 <Bell size={20} className="text-gray-400" />
                 <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
              </div>
           </div>
        </div>
        
        {/* NAVEGAÇÃO ABAS (Scrollable mobile) */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-6 custom-scrollbar">
           {[
             { id: 'audit_center', label: 'Central de Auditoria', icon: ShieldCheck },
             { id: 'risk_monitor', label: 'Torre de Controle', icon: Target }, // Alterado de Radar para Target para segurança
             { id: 'quality', label: 'Gestão da Qualidade', icon: CheckSquare },
             { id: 'integrations', label: 'Integrações (API)', icon: Cable },
             { id: 'rhtec', label: 'RhTec & Motoristas', icon: HeartHandshake },
             { id: 'finance', label: 'Financeiro', icon: Wallet },
             { id: 'neuro', label: 'Neuro-Telemetria', icon: BrainCircuit },
             { id: 'routes', label: 'Rotas e Riscos', icon: Map },
             { id: 'wealth', label: 'Valuation', icon: TrendingUp },
           ].map(tab => (
             <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DashboardTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'bg-hlx-gold text-slate-900 shadow-lg shadow-yellow-500/20' 
                    : 'bg-slate-900 border border-white/10 text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
             >
                <tab.icon size={16} />
                {tab.label}
             </button>
           ))}
        </div>

        {/* ÁREA DE CONTEÚDO */}
        <div className="animate-fade-in-up min-h-[500px]">
           
           {/* 1. CENTRAL DE AUDITORIA (HOME) */}
           {activeTab === 'audit_center' && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Coluna Esquerda: Status Geral */}
                <div className="lg:col-span-2 space-y-6">
                   <div className="bg-slate-900 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldCheck size={80} /></div>
                      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <Activity className="text-green-400" /> Saúde da Operação
                      </h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                         <div className="bg-slate-950 p-3 rounded-lg border border-white/5">
                            <p className="text-xs text-gray-500 uppercase font-bold">Conformidade</p>
                            <p className="text-2xl font-bold text-white">98%</p>
                         </div>
                         <div className="bg-slate-950 p-3 rounded-lg border border-white/5">
                            <p className="text-xs text-gray-500 uppercase font-bold">Risco Legal</p>
                            <p className="text-2xl font-bold text-green-400">Baixo</p>
                         </div>
                         <div className="bg-slate-950 p-3 rounded-lg border border-white/5">
                            <p className="text-xs text-gray-500 uppercase font-bold">Frota Ativa</p>
                            <p className="text-2xl font-bold text-blue-400">{company.vehicles.length}</p>
                         </div>
                      </div>
                   </div>

                   {/* Lista de Alertas */}
                   <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <AlertTriangle className="text-yellow-500" /> Alertas do Guardião
                      </h3>
                      <div className="space-y-3">
                         <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <AlertCircle size={18} className="text-red-500 mt-0.5" />
                            <div>
                               <p className="text-sm font-bold text-white">RNTRC Vencendo (Placa XYZ-9876)</p>
                               <p className="text-xs text-gray-400">Faltam 15 dias. Renove agora para evitar multa de R$ 3.000,00.</p>
                               <button className="mt-2 text-xs bg-red-600 text-white px-3 py-1 rounded font-bold hover:bg-red-500">Resolver</button>
                            </div>
                         </div>
                         <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <Info size={18} className="text-blue-500 mt-0.5" />
                            <div>
                               <p className="text-sm font-bold text-white">Oportunidade Tributária</p>
                               <p className="text-xs text-gray-400">Identificamos R$ 4.500,00 em créditos de PIS/COFINS não aproveitados.</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Coluna Direita: Selo & Ações */}
                <div className="space-y-6">
                   {company.qualitySeal && <GuardianSeal data={company.qualitySeal} />}
                   
                   <div className="bg-slate-900 border border-white/10 rounded-xl p-4">
                      <h4 className="text-gray-400 text-xs font-bold uppercase mb-3">Ações Rápidas</h4>
                      <div className="grid grid-cols-2 gap-2">
                         <button className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-lg text-xs font-bold flex flex-col items-center gap-2 transition-colors border border-white/5">
                            <Truck size={20} className="text-blue-400" /> + Veículo
                         </button>
                         <button className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-lg text-xs font-bold flex flex-col items-center gap-2 transition-colors border border-white/5">
                            <UserPlus size={20} className="text-green-400" /> + Motorista
                         </button>
                         <button className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-lg text-xs font-bold flex flex-col items-center gap-2 transition-colors border border-white/5">
                            <FileText size={20} className="text-yellow-400" /> Emitir CIOT
                         </button>
                         <button className="bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-lg text-xs font-bold flex flex-col items-center gap-2 transition-colors border border-white/5">
                            <HelpCircle size={20} className="text-purple-400" /> Suporte
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {/* 2. RISK MONITOR (TORRE DE CONTROLE) */}
           {activeTab === 'risk_monitor' && <RiskMonitor />}

           {/* 3. RHTEC (DRIVER RECOGNITION) */}
           {activeTab === 'rhtec' && <DriverRecognitionModule segment={company.profileSegment} />}

           {/* 4. FINANCEIRO */}
           {activeTab === 'finance' && <FinancialModule />}

           {/* 5. NEURO TELEMETRIA */}
           {activeTab === 'neuro' && <NeuroTelemetry />}

           {/* 6. INTEGRAÇÕES */}
           {activeTab === 'integrations' && <IntegrationsHub />}

           {/* 7. VALUATION (WEALTH) */}
           {activeTab === 'wealth' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-hlx-gold/30 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hlx-gold via-orange-500 to-hlx-gold"></div>
                    <Gem size={64} className="text-hlx-gold mb-6 animate-pulse" />
                    <h2 className="text-3xl font-display font-bold text-white mb-4">
                       Quanto vale sua empresa hoje?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-md">
                       Descubra o valor real do seu negócio (Valuation) considerando ativos tangíveis (frota) e intangíveis (marca, processos e equipe).
                    </p>
                    <button 
                       onClick={handleStartValuation}
                       className="px-8 py-4 bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2"
                    >
                       <Calculator size={20} />
                       INICIAR DIAGNÓSTICO PATRIMONIAL
                    </button>
                 </div>
                 
                 <div className="bg-slate-900 border border-white/10 rounded-2xl p-8">
                    <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                       <TrendingUp className="text-green-400" /> Evolução Patrimonial
                    </h3>
                    <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-slate-700 rounded-xl bg-slate-950/50">
                       {company.valuationDiagnostic ? (
                          <div className="text-center">
                             <p className="text-sm">Última Avaliação: {new Date(company.valuationDiagnostic.date).toLocaleDateString()}</p>
                             <p className="text-2xl font-bold text-white mt-2">R$ {(company.valuationDiagnostic.score.tangibleValue + company.valuationDiagnostic.score.intangibleValue).toLocaleString()}</p>
                             <p className="text-xs text-green-400 mt-1">Rating: {company.valuationDiagnostic.score.rating}</p>
                          </div>
                       ) : (
                          <p>Nenhuma avaliação realizada ainda.</p>
                       )}
                    </div>
                 </div>
              </div>
           )}

           {/* 8. QUALIDADE (QMS) */}
           {activeTab === 'quality' && <QualityManagement />}

           {/* 9. ROTAS (MAPA) */}
           {activeTab === 'routes' && <RoutesMap 
              routes={[
                 { id: 'rt1', name: 'Rota da Soja (MT-PR)', originId: 'SINOP', destinationId: 'PARANAGUA', riskScore: 85, status: 'WARNING', pointsOfInterest: ['CUIABA', 'LONDRINA'] },
                 { id: 'rt2', name: 'Expresso Sudeste', originId: 'SP', destinationId: 'RJ', riskScore: 40, status: 'OK', pointsOfInterest: ['SJC'] }
              ]} 
              points={[
                 { id: 'SINOP', label: 'Sinop', x: 25, y: 35, type: 'HUB', riskLevel: 'LOW' },
                 { id: 'CUIABA', label: 'Cuiabá', x: 30, y: 45, type: 'WEIGH_STATION', riskLevel: 'MEDIUM' },
                 { id: 'LONDRINA', label: 'Londrina', x: 45, y: 70, type: 'RISK_ZONE', riskLevel: 'HIGH' },
                 { id: 'PARANAGUA', label: 'Paranaguá', x: 50, y: 80, type: 'HUB', riskLevel: 'LOW' },
                 { id: 'SP', label: 'São Paulo', x: 60, y: 75, type: 'HUB', riskLevel: 'LOW' },
                 { id: 'RJ', label: 'Rio de Janeiro', x: 70, y: 70, type: 'RISK_ZONE', riskLevel: 'CRITICAL', details: 'Alto índice de roubo de carga na Baixada.' },
                 { id: 'SJC', label: 'S. José dos Campos', x: 65, y: 72, type: 'WEIGH_STATION', riskLevel: 'LOW' }
              ]}
           />}

        </div>

      </div>

      {showValuationModal && (
         <PatrimonialDiagnostic 
            onClose={() => setShowValuationModal(false)}
            onComplete={() => {
                setShowValuationModal(false);
                refreshData();
            }}
         />
      )}
    </div>
  );
};

export default ClientDashboard;
