
import React, { useEffect, useState } from 'react';
import { 
  Truck, FileCheck, AlertTriangle, Calendar, Plus, 
  ShieldCheck, TrendingUp, AlertOctagon, Zap, Search, MoreHorizontal, X, ExternalLink, BookOpen, Trophy, ArrowRight, GraduationCap, Lock, Key, CreditCard,
  FileKey, RefreshCw, Landmark, Siren, Building2, Eye, BrainCircuit, Activity, Scale, Gavel, FileText, Printer, Calculator, Download, DollarSign, Wallet,
  Receipt, ShoppingCart, Users, UserCheck, Stethoscope, Clock, ShieldAlert, CheckCircle2, PlayCircle, MapPin, ZapOff, Anchor, Pill, Gauge, Trash2, HardHat, Percent, UserPlus, GaugeCircle, Info, Flame, AlertCircle, Leaf, Scan, Camera, QrCode, Wifi, Settings, Signal, HelpCircle, Server, Smartphone, Cpu, Cable, Router, User, List, UploadCloud, FileInput, CheckSquare, ClipboardList, Bookmark, LifeBuoy, Send, MessageSquare, ChevronRight, Tag,
  Sparkles, Star, Ban, FileWarning, Plane, Coins, Repeat, Globe, Sun, Briefcase, Thermometer, Armchair, Smile, Cloud, HeartPulse, Wrench, RefreshCcw, Bell, CheckSquare as ChecklistIcon, Target, Map, Heart, Gem, PieChart, Award, Medal, HeartHandshake, Microscope, Database, Save, ClipboardCheck, FileDigit, BarChart4, Radio, LayoutGrid, LayoutGrid as LayoutGridIcon, Phone, Layers, Newspaper, Milestone, Terminal, Sprout, Compass, Handshake
} from 'lucide-react';
import { guardianEngine } from '../services/guardianSystem';
import { notificationService } from '../services/notificationService';
import { CompanyProfile, Monitriip4Status, SAC_OMISSION_FINE, ServiceRequest } from '../types';
import FiscalReformSimulator from './FiscalReformSimulator';
import BizBuilder from './BizBuilder';
import FleetManager from './FleetManager';
import FinancialModule from './FinancialModule';
import IssuanceModule from './IssuanceModule';
import ChecklistModule from './ChecklistModule';
import RiskMonitor from './RiskMonitor';
import NeuroTelemetry from './NeuroTelemetry';
import AnalyticsHub from './AnalyticsHub';
import QualityManagement from './QualityManagement';
import RoutesMap from './RoutesMap';
import BackupManager from './BackupManager';
import ApiDocs from './ApiDocs';
import CriticalMissions from './CriticalMissions';
import DOUIntelligence from './DOUIntelligence';
import ZmrcManager from './ZmrcManager';
import CareerTreeModule from './CareerTreeModule';
import StrategicDecisionModule from './StrategicDecisionModule'; 
import HelonexResolve from './HelonexResolve';
import ImplementationDossier from './ImplementationDossier';
import DigitalIdentityCard from './DigitalIdentityCard'; 
import SmartFreightBoard from './SmartFreightBoard'; 
import { FinanceManager } from './FinanceManager';

interface ClientDashboardProps {
  onNavigateToSuccess?: () => void;
}

type DashboardTab = 'control_tower' | 'checklist' | 'risk_monitor' | 'issuance' | 'biz_builder' | 'finance' | 'accounting' | 'neuro' | 'quality' | 'routes' | 'calculator' | 'analytics' | 'fleet' | 'api_docs' | 'critical' | 'dou' | 'zmrc' | 'career_tree' | 'strategy' | 'resolve' | 'dossier';

const ClientDashboard: React.FC<ClientDashboardProps> = ({ onNavigateToSuccess }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('control_tower');
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [showBackupModal, setShowBackupModal] = useState(false);
  
  // Status System (Mock)
  const [systemHealth, setSystemHealth] = useState(98);

  const refreshData = () => {
    const companyData = guardianEngine.getCompanyData();
    setCompany(companyData);
  };

  useEffect(() => {
    refreshData();
    notificationService.scheduleSmartAlerts();
  }, []);

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'AGUARDANDO_PAGAMENTO': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
          case 'EM_ANALISE': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
          case 'CONCLUIDO': return 'bg-green-500/20 text-green-400 border-green-500/50';
          case 'ACAO_REQUERIDA': return 'bg-red-500/20 text-red-400 border-red-500/50';
          default: return 'bg-slate-800 text-gray-400';
      }
  };

  if (!company) return <div className="p-8 text-white flex justify-center h-screen items-center bg-[#0F172A]"><div className="animate-spin text-hlx-gold"><RefreshCw size={60} /></div></div>;

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col md:flex-row text-slate-100 font-sans">
      
      {/* SIDEBAR TÁTICA - LARGURA AUMENTADA E ÍCONES GRANDES */}
      <aside className="w-full md:w-80 bg-[#161f32] border-r border-white/10 flex flex-col z-20 h-screen sticky top-0 overflow-y-auto custom-scrollbar shadow-2xl">
         <div className="p-6 border-b border-white/10 bg-[#0f1523]">
            <h2 className="text-white font-display font-bold text-3xl flex items-center gap-3 tracking-wide">
               <div className="w-10 h-10 bg-gradient-to-br from-hlx-gold to-orange-600 rounded-xl flex items-center justify-center text-slate-900 shadow-lg">
                  <Landmark size={24} />
               </div>
               HELONEX
            </h2>
            <div className="mt-6 flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-xl">
               <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 absolute top-0 left-0 animate-ping"></div>
               </div>
               <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Status do Sistema</p>
                  <p className="text-sm text-green-400 font-mono font-bold">{systemHealth}% ONLINE</p>
               </div>
            </div>
         </div>

         <nav className="flex-1 py-6 px-4 space-y-2">
            <p className="px-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Principal</p>
            
            <button onClick={() => setActiveTab('control_tower')} className={`w-full flex items-center gap-4 px-5 py-4 text-base font-bold rounded-xl transition-all group ${activeTab === 'control_tower' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 ring-1 ring-blue-400' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
               <Activity size={24} className={activeTab === 'control_tower' ? 'text-white' : 'text-gray-500 group-hover:text-white'} />
               Torre de Controle
            </button>

            <button onClick={() => setActiveTab('resolve')} className={`w-full flex items-center gap-4 px-5 py-4 text-base font-bold rounded-xl transition-all group ${activeTab === 'resolve' ? 'bg-green-600 text-white shadow-lg shadow-green-900/40 ring-1 ring-green-400' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
               <Handshake size={24} className={activeTab === 'resolve' ? 'text-white' : 'text-gray-500 group-hover:text-white'} />
               Helonex Resolve
            </button>

            <button onClick={() => setActiveTab('strategy')} className={`w-full flex items-center gap-4 px-5 py-4 text-base font-bold rounded-xl transition-all group ${activeTab === 'strategy' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 ring-1 ring-purple-400' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>
               <Compass size={24} className={activeTab === 'strategy' ? 'text-white' : 'text-gray-500 group-hover:text-white'} />
               Estratégia
            </button>

            <p className="px-2 text-xs font-bold text-gray-500 uppercase tracking-widest mt-8 mb-3">Gestão Diária</p>
            
            {[
              { id: 'fleet', label: 'Minha Frota', icon: Truck },
              { id: 'risk_monitor', label: 'Risco & Jornada', icon: ShieldAlert },
              { id: 'finance', label: 'Financeiro', icon: Wallet },
              { id: 'accounting', label: 'Contabilidade S-O-L', icon: DollarSign },
              { id: 'issuance', label: 'Emitir Documentos', icon: FileText },
              { id: 'checklist', label: 'Checklist (Vistoria)', icon: ClipboardCheck },
              { id: 'zmrc', label: 'ZMRC / Rodízio SP', icon: MapPin },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DashboardTab)}
                className={`w-full flex items-center gap-4 px-5 py-4 text-sm font-bold rounded-xl transition-all group ${
                  activeTab === tab.id 
                    ? 'bg-slate-800 text-white border border-hlx-gold/50 shadow-md' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon size={20} className={activeTab === tab.id ? 'text-hlx-gold' : 'text-gray-500 group-hover:text-gray-300'} />
                {tab.label}
              </button>
            ))}

            <p className="px-2 text-xs font-bold text-gray-500 uppercase tracking-widest mt-8 mb-3">Inteligência</p>
            
            {[
                { id: 'analytics', label: 'Relatórios', icon: BarChart4 },
                { id: 'dou', label: 'Diário Oficial', icon: Newspaper },
                { id: 'career_tree', label: 'Carreira', icon: Sprout },
                { id: 'dossier', label: 'Dossiê Técnico', icon: Terminal },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as DashboardTab)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-sm font-bold rounded-xl transition-all group ${
                    activeTab === tab.id 
                        ? 'bg-slate-800 text-white border border-hlx-gold/50 shadow-md' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                    <tab.icon size={20} className={activeTab === tab.id ? 'text-hlx-gold' : 'text-gray-500 group-hover:text-gray-300'} />
                    {tab.label}
                </button>
            ))}
         </nav>
      </aside>

      <main className="flex-1 flex flex-col bg-[#0B1120] relative overflow-y-auto custom-scrollbar h-screen">
        
        {/* TOP BAR AUMENTADA */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#161f32]/95 backdrop-blur sticky top-0 z-10 shadow-md">
           <div className="flex items-center gap-4">
              <span className="text-gray-400 bg-slate-900 p-2 rounded-lg"><Layers size={24}/></span>
              <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Painel Ativo</span>
                  <h1 className="text-white font-bold text-xl leading-none uppercase">{activeTab.replace('_', ' ')}</h1>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <button onClick={() => setShowBackupModal(true)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-white/10 font-bold text-sm transition-all shadow-md">
                  <RefreshCcw size={18} />
                  <span className="hidden md:inline">Backup</span>
              </button>
              
              <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                 <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-white leading-tight">{company.name}</p>
                    <p className="text-xs text-hlx-gold font-bold">{company.type} • {company.cnpj}</p>
                 </div>
                 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hlx-blue to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg border-2 border-white/10">
                    {company.name.substring(0, 2).toUpperCase()}
                 </div>
              </div>
           </div>
        </header>

        <div className="p-6 md:p-8 max-w-[1920px] mx-auto w-full">
           {activeTab === 'control_tower' && (
             <div className="space-y-8 animate-fade-in-up">
                
                {/* 0. IDENTIDADE DIGITAL & SCORE DE REPUTAÇÃO */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><CreditCard className="text-hlx-gold" size={28}/> Carteira Digital</h3>
                        <DigitalIdentityCard company={company} />
                    </div>
                    <div>
                        {/* 1. BOLSA DE FRETES INTELIGENTE (TRADE HUB) */}
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Briefcase className="text-green-400" size={28}/> Trade Hub</h3>
                        <SmartFreightBoard />
                    </div>
                </div>

                {/* 2. MESA DE PROCESSOS (LIFE CYCLE HUB) */}
                <div className="bg-[#161f32] border-2 border-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-6 opacity-5"><Layers size={150} /></div>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 relative z-10 gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white flex items-center gap-3"><ClipboardList className="text-hlx-gold" size={28}/> Minha Mesa de Processos</h3>
                            <p className="text-gray-400 mt-1">Acompanhe seus pedidos de regularização e cursos.</p>
                        </div>
                        <button className="bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all">
                            <Plus size={20} /> Novo Processo
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {company.activeRequests && company.activeRequests.map(req => (
                            <div key={req.id} className="bg-slate-900 p-5 rounded-2xl border-2 border-white/10 hover:border-hlx-gold/50 transition-all cursor-pointer group shadow-md hover:shadow-xl hover:-translate-y-1">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`text-xs font-black px-3 py-1.5 rounded-lg border uppercase tracking-wider ${getStatusColor(req.status)}`}>
                                        {req.status.replace('_', ' ')}
                                    </span>
                                    <span className="text-xs text-gray-400 font-bold">{req.lastUpdate}</span>
                                </div>
                                <h4 className="text-white font-bold text-lg mb-2 group-hover:text-hlx-gold transition-colors leading-tight">{req.title}</h4>
                                <p className="text-sm text-gray-300 mb-4">{req.target}</p>
                                <div className="text-xs text-gray-400 bg-slate-950 p-3 rounded-xl border border-white/5 flex items-center gap-2">
                                    <Info size={16} className="text-blue-400" /> 
                                    <span>Etapa: <strong className="text-white">{req.step}</strong></span>
                                </div>
                            </div>
                        ))}
                        <button className="bg-slate-900/50 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center p-6 text-gray-400 hover:text-white hover:border-white/40 hover:bg-slate-800 transition-all gap-3 min-h-[180px]">
                            <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                                <Plus size={32} />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-wider">Iniciar Serviço</span>
                        </button>
                    </div>
                </div>

                {/* 3. WIDGETS DE ALTO NÍVEL (KPIs) - Versão Big */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-[#161f32] p-6 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-4 opacity-5"><Truck size={80}/></div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Disponibilidade</p>
                        <div className="flex items-end gap-3">
                            <h3 className="text-4xl font-display font-bold text-white">92%</h3>
                            <span className="text-green-400 text-sm font-bold mb-1 flex items-center bg-green-500/10 px-2 rounded">▲ 4%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-3 rounded-full mt-4 overflow-hidden border border-white/5">
                            <div className="bg-blue-500 h-full w-[92%]"></div>
                        </div>
                    </div>

                    <div className="bg-[#161f32] p-6 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-4 opacity-5"><AlertTriangle size={80}/></div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Risco Regulatório</p>
                        <div className="flex items-end gap-3">
                            <h3 className="text-4xl font-display font-bold text-white">Baixo</h3>
                            <span className="text-green-400 text-sm font-bold mb-1 bg-green-500/10 px-2 rounded">98/100</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 font-bold">Nenhuma multa crítica.</p>
                    </div>

                    <div className="bg-[#161f32] p-6 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-4 opacity-5"><Wallet size={80}/></div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Receita Projetada</p>
                        <div className="flex items-end gap-3">
                            <h3 className="text-4xl font-display font-bold text-white">R$ 45k</h3>
                            <span className="text-green-400 text-sm font-bold mb-1 bg-green-500/10 px-2 rounded">▲ 12%</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 font-bold">Baseado em contratos.</p>
                    </div>

                    <div className="bg-gradient-to-br from-hlx-gold/20 to-[#161f32] p-6 rounded-2xl border border-hlx-gold/30 shadow-lg relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-4 opacity-10"><Gem size={80} className="text-hlx-gold"/></div>
                        <p className="text-hlx-gold text-xs font-bold uppercase tracking-wider mb-2">Valuation</p>
                        <div className="flex items-end gap-3">
                            <h3 className="text-4xl font-display font-bold text-white">Nível A</h3>
                            <span className="text-slate-900 text-xs font-bold mb-1 bg-hlx-gold px-2 py-0.5 rounded shadow">Ouro</span>
                        </div>
                        <p className="text-xs text-gray-300 mt-4 font-bold">Empresa valorizada.</p>
                    </div>
                </div>

                <FiscalReformSimulator />
             </div>
           )}

           {activeTab === 'resolve' && <HelonexResolve />}
           {activeTab === 'strategy' && <StrategicDecisionModule />}
           {activeTab === 'career_tree' && <CareerTreeModule />}
           {activeTab === 'zmrc' && <ZmrcManager />}
           {activeTab === 'biz_builder' && <BizBuilder />}
           {activeTab === 'fleet' && <FleetManager />}
           {activeTab === 'finance' && <FinancialModule />}
           {activeTab === 'accounting' && <FinanceManager />}
           {activeTab === 'issuance' && <IssuanceModule />}
           {activeTab === 'checklist' && <ChecklistModule />}
           {activeTab === 'risk_monitor' && <RiskMonitor />}
           {activeTab === 'quality' && <QualityManagement />}
           {activeTab === 'routes' && <RoutesMap routes={[]} points={[]} />}
           {activeTab === 'analytics' && <AnalyticsHub />}
           {activeTab === 'api_docs' && <ApiDocs />}
           {activeTab === 'critical' && <CriticalMissions />}
           {activeTab === 'dou' && <DOUIntelligence />}
           {activeTab === 'dossier' && <ImplementationDossier />}
        </div>
      </main>

      {showBackupModal && <BackupManager onClose={() => setShowBackupModal(false)} />}
    </div>
  );
};

export default ClientDashboard;
