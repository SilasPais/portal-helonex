
import React, { useState } from 'react';
import { 
  Truck, DollarSign, AlertTriangle, Activity, 
  ArrowRight, BarChart2, Shield, Settings 
} from 'lucide-react';
import FleetManager from './FleetManager';
import FinancialModule from './FinancialModule';
import RiskMonitor from './RiskMonitor';
import QualityManagement from './QualityManagement';

const GesTech: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeModule, setActiveModule] = useState<'DASHBOARD' | 'FLEET' | 'FINANCE' | 'RISK' | 'QUALITY'>('DASHBOARD');

  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-white uppercase">GesTech</h2>
          <p className="text-gray-400">Gestão de Frotas, Finanças e Monitoramento de Riscos.</p>
        </div>
        <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowRight className="rotate-180" /> Voltar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => setActiveModule('FLEET')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
            <Truck size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Gestão de Frotas</h3>
          <p className="text-gray-500 text-xs mt-2">Controle de veículos, manutenção e pneus.</p>
        </div>

        <div 
          onClick={() => setActiveModule('FINANCE')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
            <DollarSign size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Módulo Financeiro</h3>
          <p className="text-gray-500 text-xs mt-2">Contas a pagar/receber, fluxo de caixa e DRE.</p>
        </div>

        <div 
          onClick={() => setActiveModule('RISK')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Monitor de Riscos</h3>
          <p className="text-gray-500 text-xs mt-2">Prevenção de acidentes, roubos e avarias.</p>
        </div>

        <div 
          onClick={() => setActiveModule('QUALITY')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <Activity size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Gestão da Qualidade</h3>
          <p className="text-gray-500 text-xs mt-2">ISO 9001, SASSMAQ e indicadores de desempenho.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart2 className="text-hlx-gold" /> Indicadores Financeiros
          </h3>
          <div className="space-y-6">
             <div className="flex justify-between items-end">
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold">Faturamento Mensal</p>
                   <h4 className="text-2xl text-white font-bold">R$ 1.250.000,00</h4>
                </div>
                <span className="text-green-400 text-xs font-bold bg-green-500/10 px-2 py-1 rounded">+12% vs Mês Anterior</span>
             </div>
             <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '75%' }}></div>
             </div>
             <div className="flex justify-between items-end">
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold">Custo Operacional</p>
                   <h4 className="text-2xl text-white font-bold">R$ 850.000,00</h4>
                </div>
                <span className="text-red-400 text-xs font-bold bg-red-500/10 px-2 py-1 rounded">+5% vs Mês Anterior</span>
             </div>
             <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '68%' }}></div>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="text-hlx-gold" /> Status da Frota
          </h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-center">
                <h4 className="text-3xl font-bold text-white">45</h4>
                <p className="text-xs text-gray-500 uppercase mt-1">Veículos Ativos</p>
             </div>
             <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-center">
                <h4 className="text-3xl font-bold text-yellow-500">3</h4>
                <p className="text-xs text-gray-500 uppercase mt-1">Em Manutenção</p>
             </div>
             <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-center">
                <h4 className="text-3xl font-bold text-green-500">98%</h4>
                <p className="text-xs text-gray-500 uppercase mt-1">Disponibilidade</p>
             </div>
             <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-center">
                <h4 className="text-3xl font-bold text-blue-500">12</h4>
                <p className="text-xs text-gray-500 uppercase mt-1">Viagens em Curso</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8">
      {activeModule === 'DASHBOARD' && renderDashboard()}
      {activeModule === 'FLEET' && (
        <div className="h-full">
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao GesTech
          </button>
          <FleetManager />
        </div>
      )}
      {activeModule === 'FINANCE' && (
        <div className="h-full">
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao GesTech
          </button>
          <FinancialModule />
        </div>
      )}
      {activeModule === 'RISK' && (
        <div className="h-full">
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao GesTech
          </button>
          <RiskMonitor />
        </div>
      )}
      {activeModule === 'QUALITY' && (
        <div className="h-full">
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao GesTech
          </button>
          <QualityManagement />
        </div>
      )}
    </div>
  );
};

export default GesTech;
