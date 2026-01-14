import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { StatData } from '../types';
import { Activity, Bell, CheckCircle, AlertOctagon } from 'lucide-react';

const data: StatData[] = [
  { name: 'Jan', compliance: 65, risk: 40 },
  { name: 'Fev', compliance: 72, risk: 35 },
  { name: 'Mar', compliance: 78, risk: 25 },
  { name: 'Abr', compliance: 85, risk: 20 },
  { name: 'Mai', compliance: 82, risk: 22 },
  { name: 'Jun', compliance: 95, risk: 10 },
];

const Base44Dashboard: React.FC = () => {
  return (
    <div className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-hlx-gold" />
              <span className="text-hlx-gold font-mono text-sm uppercase">Painel de Inteligência HELONEX (IA)</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Sua Frota Sob <span className="text-hlx-blue text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Controle Total</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-xl">
              Monitoramento preditivo de vencimentos, elegibilidade de mercado (TAM/SAM/SOM) e conformidade regulatória em tempo real.
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-hlx-blue text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold border border-blue-500/30">
            Acessar Painel do Cliente
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-xl p-6 shadow-xl">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" /> Índice de Conformidade vs. Risco
            </h3>
            <div style={{ width: '100%', height: 300, minHeight: 300 }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="compliance" stroke="#22c55e" fillOpacity={1} fill="url(#colorCompliance)" name="Conformidade" />
                  <Area type="monotone" dataKey="risk" stroke="#ef4444" fillOpacity={1} fill="url(#colorRisk)" name="Risco Regulatório" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-xl p-6 shadow-xl flex flex-col">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Bell size={18} className="text-hlx-gold" /> Alertas Críticos (Mentor IA)
            </h3>
            
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg">
                <div className="flex justify-between items-start">
                  <h4 className="text-red-400 font-bold text-sm">Resolução ANTT 5982</h4>
                  <AlertOctagon size={16} className="text-red-500" />
                </div>
                <p className="text-gray-400 text-xs mt-1">Sua frota possui 2 veículos com RNTRC vencendo em 15 dias.</p>
              </div>

              <div className="bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-lg">
                <div className="flex justify-between items-start">
                  <h4 className="text-orange-400 font-bold text-sm">Curso MOPP</h4>
                  <AlertOctagon size={16} className="text-orange-500" />
                </div>
                <p className="text-gray-400 text-xs mt-1">Motorista João Silva precisa renovar MOPP até 30/11.</p>
              </div>

              <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <div className="flex justify-between items-start">
                  <h4 className="text-blue-400 font-bold text-sm">Oportunidade de Mercado</h4>
                  <Activity size={16} className="text-blue-500" />
                </div>
                <p className="text-gray-400 text-xs mt-1">Nova demanda de Carga Especial na rota SP-MG detectada.</p>
              </div>
            </div>
            
            <button className="mt-6 w-full py-2 border border-white/20 rounded text-sm text-gray-300 hover:bg-white/5 transition-colors">
              Ver Relatório Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base44Dashboard;