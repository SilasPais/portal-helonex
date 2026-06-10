
import React, { useState, useEffect } from 'react';
import { 
  Wallet, TrendingUp, TrendingDown, FileText, Download, CreditCard, 
  DollarSign, Calendar, Search, CheckCircle, AlertCircle, ChevronRight,
  ArrowUpRight, ArrowDownLeft, PieChart, MapPin, Fuel, Calculator, Filter, 
  BarChart4, Receipt, Building2, Truck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';
import { FinancialRecord, FinanceCategory, FinanceStatus, TaxOpportunity } from '../types';

// --- MOCK DATA ROBUSTO ---
const MOCK_FINANCIALS: FinancialRecord[] = [
    // Receitas (Fretes)
    { id: 'f1', date: '2026-03-10', dueDate: '2026-03-20', description: 'Frete CT-e 1230 - SP x BA', type: 'RECEITA', category: 'FRETE_BRUTO', value: 12500.00, status: 'PENDENTE', costCenter: 'ABC-1234', documentNumber: '1230' },
    { id: 'f2', date: '2026-03-05', dueDate: '2026-03-05', description: 'Frete CT-e 1229 - MG x SP', type: 'RECEITA', category: 'FRETE_BRUTO', value: 4200.00, status: 'PAGO', costCenter: 'XYZ-9876', documentNumber: '1229' },
    
    // Despesas (Operacionais)
    { id: 'd1', date: '2026-03-11', dueDate: '2026-03-11', description: 'Abastecimento Posto Graal', type: 'DESPESA', category: 'DIESEL', value: 1800.00, status: 'PAGO', costCenter: 'ABC-1234' },
    { id: 'd2', date: '2026-03-12', dueDate: '2026-03-12', description: 'Troca de Pneu (Emergência)', type: 'DESPESA', category: 'PNEUS', value: 2400.00, status: 'PAGO', costCenter: 'ABC-1234' },
    { id: 'd3', date: '2026-03-10', dueDate: '2026-03-10', description: 'Vale Pedágio (Sem Parar)', type: 'DESPESA', category: 'PEDAGIO', value: 350.00, status: 'PAGO', costCenter: 'ABC-1234' },
    { id: 'd4', date: '2026-03-10', dueDate: '2026-03-10', description: 'Adiantamento Motorista João', type: 'DESPESA', category: 'ADIANTAMENTO', value: 1500.00, status: 'PAGO', costCenter: 'ABC-1234' },
    { id: 'd5', date: '2026-03-15', dueDate: '2026-03-15', description: 'Almoço/Jantar (Diária)', type: 'DESPESA', category: 'ALIMENTACAO', value: 120.00, status: 'AGENDADO', costCenter: 'ABC-1234' },
    
    // Despesas (Administrativas)
    { id: 'a1', date: '2026-03-25', dueDate: '2026-03-25', description: 'Contador Mensal', type: 'DESPESA', category: 'ADMINISTRATIVO', value: 1200.00, status: 'PENDENTE', costCenter: 'ADM' },
    { id: 'a2', date: '2026-03-20', dueDate: '2026-03-20', description: 'Seguro Frota Mensal', type: 'DESPESA', category: 'SEGUROS', value: 3500.00, status: 'PENDENTE', costCenter: 'ADM' },
];

const TAX_OPPORTUNITY: TaxOpportunity = {
    id: 'tax-01',
    routeId: 'SP-BA',
    recommendedState: 'Minas Gerais (Betim)',
    currentStopState: 'Bahia',
    icmsDifference: 6, // 18% vs 12%
    estimatedSavings: 450.00,
    fuelStationPartner: 'Rede Graal - Betim'
};

const FinancialModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cashflow' | 'apar' | 'intelligence'>('cashflow');
  const [transactions, setTransactions] = useState<FinancialRecord[]>(MOCK_FINANCIALS);
  const [filterType, setFilterType] = useState<'ALL' | 'RECEITA' | 'DESPESA'>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PAGO' | 'PENDENTE'>('ALL');

  // Cálculos de Resumo
  const totalRevenue = transactions.filter(t => t.type === 'RECEITA').reduce((acc, t) => acc + t.value, 0);
  const totalExpenses = transactions.filter(t => t.type === 'DESPESA').reduce((acc, t) => acc + t.value, 0);
  const balance = totalRevenue - totalExpenses;
  const pendingRevenue = transactions.filter(t => t.type === 'RECEITA' && t.status === 'PENDENTE').reduce((acc, t) => acc + t.value, 0);
  const pendingExpense = transactions.filter(t => t.type === 'DESPESA' && (t.status === 'PENDENTE' || t.status === 'AGENDADO')).reduce((acc, t) => acc + t.value, 0);

  // Dados para Gráficos
  const cashFlowData = [
      { name: 'Semana 1', entrada: 4200, saida: 2500, saldo: 1700 },
      { name: 'Semana 2', entrada: 0, saida: 4320, saldo: -2620 },
      { name: 'Semana 3', entrada: 12500, saida: 1200, saldo: 8680 }, // Projeção recebimento
      { name: 'Semana 4', entrada: 5000, saida: 3500, saldo: 10180 },
  ];

  const expenseBreakdown = [
      { name: 'Diesel', value: 1800, color: '#f59e0b' },
      { name: 'Pneus', value: 2400, color: '#ef4444' },
      { name: 'Admin/Seguro', value: 4700, color: '#3b82f6' },
      { name: 'Pedágio', value: 350, color: '#a855f7' },
      { name: 'RH/Diária', value: 1620, color: '#10b981' },
  ];

  const renderCashFlow = () => (
    <div className="space-y-6 animate-fade-in-up">
        {/* CARDS DE KPI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-white/10 p-4 rounded-xl">
                <p className="text-gray-400 text-xs font-bold uppercase">Saldo Atual (Real)</p>
                <h3 className={`text-2xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-500'}`}>R$ {balance.toLocaleString()}</h3>
            </div>
            <div className="bg-slate-900 border border-green-500/30 p-4 rounded-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 p-2 opacity-10"><ArrowUpRight size={40} className="text-green-500"/></div>
                <p className="text-green-400 text-xs font-bold uppercase">A Receber (Previsto)</p>
                <h3 className="text-2xl font-bold text-white">R$ {pendingRevenue.toLocaleString()}</h3>
            </div>
            <div className="bg-slate-900 border border-red-500/30 p-4 rounded-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 p-2 opacity-10"><ArrowDownLeft size={40} className="text-red-500"/></div>
                <p className="text-red-400 text-xs font-bold uppercase">A Pagar (Agendado)</p>
                <h3 className="text-2xl font-bold text-white">R$ {pendingExpense.toLocaleString()}</h3>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 border border-blue-500/30 p-4 rounded-xl">
                <p className="text-blue-300 text-xs font-bold uppercase">Fluxo Projetado (Fim Mês)</p>
                <h3 className="text-2xl font-bold text-white">R$ {(balance + pendingRevenue - pendingExpense).toLocaleString()}</h3>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* GRÁFICO DE FLUXO DE CAIXA */}
            <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="text-hlx-gold" size={18} /> Projeção de Fluxo de Caixa
                </h3>
                <div className="w-full" style={{ height: 288, minHeight: 288 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={cashFlowData}>
                            <defs>
                                <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }} />
                            <Area type="monotone" dataKey="saldo" stroke="#22c55e" fillOpacity={1} fill="url(#colorSaldo)" name="Saldo Acumulado" />
                            <Area type="monotone" dataKey="saida" stroke="#ef4444" fill="none" name="Saídas" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* BREAKDOWN DE CUSTOS (DRE SIMPLIFICADO) */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                    <PieChart className="text-blue-400" size={18} /> Onde vai o dinheiro?
                </h3>
                <div className="w-full" style={{ height: 240, minHeight: 240 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={expenseBreakdown}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} tick={{fill: '#94a3b8', fontSize: 10}} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                {expenseBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-400">
                    <p>Maior ofensor: <strong>Manutenção/Pneus</strong> (R$ 2.400). Verifique alinhamento e calibragem.</p>
                </div>
            </div>
        </div>
    </div>
  );

  const renderAPAR = () => {
      const filtered = transactions.filter(t => {
          if (filterType !== 'ALL' && t.type !== filterType) return false;
          if (filterStatus !== 'ALL') {
              if (filterStatus === 'PENDENTE' && (t.status === 'PENDENTE' || t.status === 'AGENDADO')) return true;
              if (t.status !== filterStatus) return false;
          }
          return true;
      });

      return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-hlx-gold" />
                    <span className="text-sm font-bold text-white">Filtros:</span>
                </div>
                <div className="flex gap-2">
                    <select 
                        value={filterType} onChange={e => setFilterType(e.target.value as any)}
                        className="bg-slate-800 text-white text-sm rounded-lg border border-white/10 p-2 outline-none focus:border-hlx-gold"
                    >
                        <option value="ALL">Todas Transações</option>
                        <option value="RECEITA">Entradas (Receitas)</option>
                        <option value="DESPESA">Saídas (Despesas)</option>
                    </select>
                    <select 
                        value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)}
                        className="bg-slate-800 text-white text-sm rounded-lg border border-white/10 p-2 outline-none focus:border-hlx-gold"
                    >
                        <option value="ALL">Todos Status</option>
                        <option value="PAGO">Pago / Recebido</option>
                        <option value="PENDENTE">Pendente / Agendado</option>
                    </select>
                </div>
                <button className="bg-hlx-gold text-slate-900 text-sm font-bold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors">
                    + Nova Transação
                </button>
            </div>

            {/* Tabela */}
            <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950 text-gray-400 uppercase text-xs font-bold">
                            <tr>
                                <th className="p-4">Vencimento</th>
                                <th className="p-4">Descrição</th>
                                <th className="p-4">Categoria</th>
                                <th className="p-4">Centro Custo</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Valor</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map(item => (
                                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors group">
                                    <td className="p-4 text-gray-300 font-mono">{new Date(item.dueDate).toLocaleDateString()}</td>
                                    <td className="p-4 text-white font-medium">
                                        {item.description}
                                        {item.documentNumber && <span className="block text-[10px] text-gray-500">Doc: {item.documentNumber}</span>}
                                    </td>
                                    <td className="p-4">
                                        <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-gray-300 uppercase font-bold border border-white/5">
                                            {item.category.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400 text-xs">
                                        {item.costCenter === 'ADM' ? <span className="flex items-center gap-1"><Building2 size={10}/> ADM</span> : <span className="flex items-center gap-1"><Truck size={10}/> {item.costCenter}</span>}
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
                                            item.status === 'PAGO' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                            item.status === 'VENCIDO' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                                            'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className={`p-4 text-right font-bold ${item.type === 'RECEITA' ? 'text-green-400' : 'text-red-400'}`}>
                                        {item.type === 'RECEITA' ? '+' : '-'} R$ {item.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                                    </td>
                                    <td className="p-4 text-center">
                                        <button className="text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                            <FileText size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="p-8 text-center text-gray-500">Nenhum lançamento encontrado para os filtros selecionados.</div>
                )}
            </div>
        </div>
      );
  };

  const renderIntelligence = () => (
      <div className="space-y-6 animate-fade-in-up">
          <div className="bg-gradient-to-r from-slate-900 to-blue-900/30 border border-blue-500/30 p-8 rounded-xl relative overflow-hidden">
              <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      <Fuel className="text-blue-400" /> Inteligência Tributária Geográfica
                  </h2>
                  <p className="text-gray-300 max-w-2xl">
                      Nosso algoritmo analisa sua rota e a alíquota de ICMS de cada estado para sugerir o ponto ótimo de abastecimento.
                  </p>
              </div>
              <div className="absolute right-0 top-0 p-8 opacity-10 pointer-events-none">
                  <MapPin size={150} />
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <AlertCircle className="text-hlx-gold" size={18} /> Oportunidade Detectada
                  </h3>
                  
                  <div className="bg-slate-950 p-4 rounded-lg border border-white/5 space-y-4">
                      <div className="flex justify-between items-start border-b border-white/5 pb-4">
                          <div>
                              <p className="text-xs text-gray-500 uppercase font-bold">Rota Atual</p>
                              <p className="text-white font-bold">{TAX_OPPORTUNITY.routeId}</p>
                          </div>
                          <div className="text-right">
                              <p className="text-xs text-gray-500 uppercase font-bold">Parada Estimada</p>
                              <p className="text-red-400 font-bold line-through decoration-red-500/50">{TAX_OPPORTUNITY.currentStopState}</p>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                          <div className="bg-green-500/20 p-3 rounded-full text-green-400">
                              <CheckCircle size={24} />
                          </div>
                          <div>
                              <p className="text-sm text-gray-300">Recomendação Helonex:</p>
                              <p className="text-lg font-bold text-white">Abastecer em {TAX_OPPORTUNITY.recommendedState}</p>
                              <p className="text-xs text-green-400">Diferença ICMS: {TAX_OPPORTUNITY.icmsDifference}% a menos.</p>
                          </div>
                      </div>

                      <div className="bg-green-900/20 border border-green-500/30 p-3 rounded-lg flex justify-between items-center">
                          <span className="text-sm text-green-300 font-bold">Economia Prevista (Tanque Cheio):</span>
                          <span className="text-xl font-bold text-green-400">R$ {TAX_OPPORTUNITY.estimatedSavings.toFixed(2)}</span>
                      </div>

                      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-colors text-sm">
                          Gerar Rota para {TAX_OPPORTUNITY.fuelStationPartner}
                      </button>
                  </div>
              </div>

              <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                  <div className="p-4 bg-slate-800 rounded-full mb-4">
                      <Calculator size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-white font-bold mb-2">Simulador de Crédito</h3>
                  <p className="text-sm text-gray-400 mb-6">
                      Calcule quanto de crédito PIS/COFINS e ICMS você pode recuperar baseado no seu regime tributário.
                  </p>
                  <button className="px-6 py-2 border border-white/20 rounded-lg text-sm text-white hover:bg-white/5 transition-colors">
                      Acessar Simulador Completo
                  </button>
              </div>
          </div>
      </div>
  );

  return (
    <div className="space-y-6">
      
      {/* HEADER DE NAVEGAÇÃO INTERNA */}
      <div className="flex gap-2 border-b border-white/10 pb-1 overflow-x-auto custom-scrollbar">
        <button 
          onClick={() => setActiveTab('cashflow')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'cashflow' ? 'border-hlx-gold text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
        >
          <BarChart4 size={16} /> Fluxo de Caixa (DRE)
        </button>
        <button 
          onClick={() => setActiveTab('apar')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'apar' ? 'border-hlx-gold text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
        >
          <Receipt size={16} /> Contas a Pagar/Receber
        </button>
        <button 
          onClick={() => setActiveTab('intelligence')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'intelligence' ? 'border-hlx-gold text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
        >
          <Fuel size={16} /> Inteligência Tributária
        </button>
      </div>

      {activeTab === 'cashflow' && renderCashFlow()}
      {activeTab === 'apar' && renderAPAR()}
      {activeTab === 'intelligence' && renderIntelligence()}

    </div>
  );
};

export default FinancialModule;
