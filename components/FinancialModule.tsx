
import React, { useState } from 'react';
import { 
  Wallet, TrendingUp, TrendingDown, FileText, Download, CreditCard, 
  DollarSign, Calendar, Search, CheckCircle, AlertCircle, ChevronRight,
  ArrowUpRight, ArrowDownLeft, PieChart
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// DADOS MOCKADOS (SIMULAÇÃO DO BANCO DE DADOS)
const TRANSACTIONS = [
  { id: 't1', date: '15/03/2026', desc: 'Renovação RNTRC (ETC)', type: 'out', value: 850.00, status: 'completed', category: 'Regulatório' },
  { id: 't2', date: '12/03/2026', desc: 'Cashback Diesel (Rede Graal)', type: 'in', value: 45.20, status: 'completed', category: 'Cashback' },
  { id: 't3', date: '10/03/2026', desc: 'Mensalidade Helonex PRO', type: 'out', value: 297.00, status: 'completed', category: 'Assinatura' },
  { id: 't4', date: '05/03/2026', desc: 'Curso MOPP (João Silva)', type: 'out', value: 150.00, status: 'completed', category: 'Educação' },
  { id: 't5', date: '01/03/2026', desc: 'Estorno Pagamento Duplicado', type: 'in', value: 150.00, status: 'completed', category: 'Reembolso' },
];

const INVOICES = [
  { id: 'nf-1023', date: '15/03/2026', amount: 850.00, status: 'paid', link: '#' },
  { id: 'nf-0998', date: '10/03/2026', amount: 297.00, status: 'paid', link: '#' },
  { id: 'nf-0945', date: '05/03/2026', amount: 150.00, status: 'overdue', link: '#' },
];

const FinancialModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'statement' | 'invoices'>('overview');

  const renderOverview = () => (
    <div className="space-y-6 animate-fade-in-up">
      {/* CARDS DE RESUMO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-white/10 shadow-lg relative overflow-hidden">
           <div className="absolute right-0 top-0 p-4 opacity-5"><Wallet size={80} /></div>
           <p className="text-gray-400 text-xs font-bold uppercase mb-2">Saldo em Conta (Cashback)</p>
           <h3 className="text-3xl font-display font-bold text-white mb-4">R$ 1.245,80</h3>
           <div className="flex gap-2">
             <button className="flex-1 bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2 rounded transition-colors">
               Usar Saldo
             </button>
             <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 rounded transition-colors">
               Adicionar Crédito
             </button>
           </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-white/5">
           <div className="flex items-center gap-3 mb-4">
             <div className="bg-red-500/20 p-2 rounded-lg text-red-400"><ArrowUpRight size={20} /></div>
             <div>
               <p className="text-xs text-gray-400 font-bold uppercase">Despesas (Mês)</p>
               <h3 className="text-xl font-bold text-white">R$ 1.297,00</h3>
             </div>
           </div>
           <p className="text-xs text-gray-500">
             <span className="text-red-400 font-bold">+12%</span> em relação a fevereiro.
           </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-white/5">
           <div className="flex items-center gap-3 mb-4">
             <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><ArrowDownLeft size={20} /></div>
             <div>
               <p className="text-xs text-gray-400 font-bold uppercase">Economia Gerada</p>
               <h3 className="text-xl font-bold text-white">R$ 450,00</h3>
             </div>
           </div>
           <p className="text-xs text-gray-500">
             Economia via Clube de Compras e SNE.
           </p>
        </div>
      </div>

      {/* GRÁFICO DE FLUXO */}
      <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
          <PieChart className="text-hlx-gold" size={18} /> Fluxo Financeiro (6 Meses)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { name: 'Jan', entrada: 4000, saida: 2400 },
              { name: 'Fev', entrada: 3000, saida: 1398 },
              { name: 'Mar', entrada: 2000, saida: 9800 },
              { name: 'Abr', entrada: 2780, saida: 3908 },
              { name: 'Mai', entrada: 1890, saida: 4800 },
              { name: 'Jun', entrada: 2390, saida: 3800 },
            ]}>
              <defs>
                <linearGradient id="colorSaida" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }} />
              <Area type="monotone" dataKey="saida" stroke="#ef4444" fillOpacity={1} fill="url(#colorSaida)" name="Despesas" />
              <Area type="monotone" dataKey="entrada" stroke="#22c55e" fillOpacity={1} fill="url(#colorEntrada)" name="Entradas/Bônus" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderStatement = () => (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden animate-fade-in-up">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950">
        <div>
          <h3 className="text-white font-bold text-lg">Extrato Detalhado</h3>
          <p className="text-xs text-gray-400">Últimas movimentações na sua conta Helonex.</p>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-hlx-gold hover:text-white transition-colors">
          <Download size={16} /> Exportar OFX/PDF
        </button>
      </div>
      
      <div className="divide-y divide-white/5">
        {TRANSACTIONS.map((t) => (
          <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                t.type === 'in' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-slate-800 border-white/10 text-gray-400'
              }`}>
                {t.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
              </div>
              <div>
                <p className="text-white font-bold text-sm">{t.desc}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{t.date}</span>
                  <span>•</span>
                  <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] uppercase">{t.category}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-mono font-bold ${t.type === 'in' ? 'text-green-400' : 'text-white'}`}>
                {t.type === 'in' ? '+' : '-'} R$ {t.value.toFixed(2)}
              </p>
              <p className="text-[10px] text-gray-500 uppercase">{t.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden animate-fade-in-up">
      <div className="p-6 border-b border-white/10 bg-slate-950">
        <h3 className="text-white font-bold text-lg">Notas Fiscais & Faturas</h3>
        <p className="text-xs text-gray-400">Documentos fiscais emitidos pela Helonex para sua contabilidade.</p>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-800 text-gray-400 text-xs uppercase font-bold">
          <tr>
            <th className="p-4">Nº Nota</th>
            <th className="p-4">Data Emissão</th>
            <th className="p-4">Valor</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {INVOICES.map((nf) => (
            <tr key={nf.id} className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 font-mono text-white font-bold">{nf.id}</td>
              <td className="p-4 text-gray-400">{nf.date}</td>
              <td className="p-4 text-white">R$ {nf.amount.toFixed(2)}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                  nf.status === 'paid' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'
                }`}>
                  {nf.status === 'paid' ? 'Paga' : 'Vencida'}
                </span>
              </td>
              <td className="p-4 text-right">
                <button className="text-hlx-blue hover:text-white text-xs font-bold flex items-center justify-end gap-1 ml-auto">
                  <Download size={14} /> XML/PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      
      {/* HEADER DE NAVEGAÇÃO INTERNA */}
      <div className="flex gap-2 border-b border-white/10 pb-1 overflow-x-auto custom-scrollbar">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'overview' ? 'border-hlx-gold text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
        >
          <PieChart size={16} /> Visão Geral
        </button>
        <button 
          onClick={() => setActiveTab('statement')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'statement' ? 'border-hlx-gold text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
        >
          <FileText size={16} /> Extrato
        </button>
        <button 
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'invoices' ? 'border-hlx-gold text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
        >
          <FileText size={16} /> Notas Fiscais
        </button>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'statement' && renderStatement()}
      {activeTab === 'invoices' && renderInvoices()}

    </div>
  );
};

export default FinancialModule;
