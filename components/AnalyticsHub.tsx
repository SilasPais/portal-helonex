
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { Filter, Download, Calendar, Truck, User, TrendingUp, DollarSign } from 'lucide-react';

const DATA_COST_PER_KM = [
  { name: 'ABC-1234', cost: 4.20 },
  { name: 'XYZ-9876', cost: 3.80 },
  { name: 'BRA-2E19', cost: 5.10 },
  { name: 'HEL-0001', cost: 3.95 },
];

const DATA_PROFIT_MARGIN = [
  { name: 'Jan', margin: 12 },
  { name: 'Fev', margin: 15 },
  { name: 'Mar', margin: 10 },
  { name: 'Abr', margin: 18 },
  { name: 'Mai', margin: 20 },
  { name: 'Jun', margin: 17 },
];

const DATA_MAINTENANCE = [
  { name: 'Preventiva', value: 70, color: '#22c55e' },
  { name: 'Corretiva', value: 30, color: '#ef4444' },
];

const AnalyticsHub: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedVehicle, setSelectedVehicle] = useState('ALL');

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* HEADER & FILTERS */}
      <div className="bg-slate-900 border border-white/10 p-6 rounded-xl flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-hlx-gold" /> Analytics & Relatórios
          </h2>
          <p className="text-gray-400 text-sm">Visão 360º da performance da frota.</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <div className="bg-slate-800 border border-white/10 rounded-lg p-2 flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <select 
              value={dateRange} onChange={e => setDateRange(e.target.value)}
              className="bg-transparent text-white text-sm outline-none"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 3 meses</option>
              <option value="ytd">Ano Atual (YTD)</option>
            </select>
          </div>

          <div className="bg-slate-800 border border-white/10 rounded-lg p-2 flex items-center gap-2">
            <Truck size={16} className="text-gray-400" />
            <select 
              value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)}
              className="bg-transparent text-white text-sm outline-none"
            >
              <option value="ALL">Toda a Frota</option>
              <option value="ABC-1234">ABC-1234</option>
              <option value="XYZ-9876">XYZ-9876</option>
            </select>
          </div>

          <button className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg border border-white/10 transition-colors" title="Exportar Relatório PDF/Excel">
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GRÁFICO 1: CUSTO POR KM (VEÍCULO) */}
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <DollarSign size={18} className="text-blue-400" /> Custo por KM Rodado (R$)
          </h3>
          <div className="w-full" style={{ height: 256, minHeight: 256 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA_COST_PER_KM} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }} cursor={{fill: 'transparent'}} />
                <Bar dataKey="cost" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Custo/Km" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Benchmark Ideal: R$ 3.50 ~ R$ 4.00</p>
        </div>

        {/* GRÁFICO 2: MARGEM DE LUCRO (TEMPO) */}
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-green-400" /> Margem de Lucro Líquida (%)
          </h3>
          <div className="w-full" style={{ height: 256, minHeight: 256 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DATA_PROFIT_MARGIN}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }} />
                <Line type="monotone" dataKey="margin" stroke="#22c55e" strokeWidth={3} dot={{r: 4}} name="Margem %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Tendência de alta nos últimos 3 meses.</p>
        </div>

        {/* GRÁFICO 3: TIPO DE MANUTENÇÃO */}
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Filter size={18} className="text-purple-400" /> Perfil de Manutenção
          </h3>
          <div className="w-full h-full flex items-center justify-center" style={{ height: 256, minHeight: 256 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DATA_MAINTENANCE}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DATA_MAINTENANCE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Meta: Manter Corretiva abaixo de 20%.
          </p>
        </div>

        {/* TABELA SINTÉTICA */}
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
           <h3 className="text-white font-bold mb-4">Top 5 Rotas Mais Lucrativas</h3>
           <table className="w-full text-sm text-left">
             <thead className="text-gray-500 border-b border-white/10">
               <tr>
                 <th className="pb-2">Rota</th>
                 <th className="pb-2 text-right">Faturamento</th>
                 <th className="pb-2 text-right">Margem</th>
               </tr>
             </thead>
             <tbody className="text-gray-300">
               <tr className="border-b border-white/5">
                 <td className="py-2">SP -&gt; RJ (Carga Seca)</td>
                 <td className="py-2 text-right">R$ 15.400</td>
                 <td className="py-2 text-right text-green-400">22%</td>
               </tr>
               <tr className="border-b border-white/5">
                 <td className="py-2">MT -&gt; PR (Grãos)</td>
                 <td className="py-2 text-right">R$ 28.900</td>
                 <td className="py-2 text-right text-green-400">18%</td>
               </tr>
               <tr>
                 <td className="py-2">MG -&gt; BA (Industrial)</td>
                 <td className="py-2 text-right">R$ 12.100</td>
                 <td className="py-2 text-right text-yellow-400">12%</td>
               </tr>
             </tbody>
           </table>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsHub;
