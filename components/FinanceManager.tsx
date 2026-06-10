import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  FileText, 
  TrendingUp, 
  ShieldAlert, 
  Wallet, 
  Plus, 
  Trash2, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  ExternalLink,
  History,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Entry {
  id: string;
  date: string;
  description: string;
  type: 'INCOME' | 'EXPENSE';
  value: number;
  category: string;
}

interface TaxEstimate {
  grossIncome: number;
  taxableIncome: number;
  exemptIncome: number;
  deductibleExpenses: number;
  netTaxable: number;
  irpfEstimate: number;
  inssTac11: number;
  inssTac20: number;
  meiBase: number;
  meiComplement: number;
}

export const FinanceManager: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [activeTab, setActiveTab] = useState<'ENTRIES' | 'TAX' | 'SOCIAL' | 'GUIDES'>('ENTRIES');
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [newEntry, setNewEntry] = useState<Omit<Entry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    description: '',
    type: 'INCOME',
    value: 0,
    category: 'Frete'
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hlx_finance_entries');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('hlx_finance_entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (newEntry.value <= 0 || !newEntry.description) return;
    const entry: Entry = { ...newEntry, id: Math.random().toString(36).substr(2, 9) };
    setEntries([entry, ...entries]);
    setShowEntryModal(false);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      description: '',
      type: 'INCOME',
      value: 0,
      category: 'Frete'
    });
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const calculateTaxes = (): TaxEstimate => {
    const grossIncome = entries.filter(e => e.type === 'INCOME').reduce((acc, curr) => acc + curr.value, 0);
    const deductibleExpenses = entries.filter(e => e.type === 'EXPENSE').reduce((acc, curr) => acc + curr.value, 0);
    
    // TAC Rules: 40% exempt, 60% taxable (IN RFB 1500/2014)
    const exemptIncome = grossIncome * 0.40;
    const taxableBase = grossIncome * 0.60;
    
    // Livro Caixa: Deduct actual expenses from the taxable base
    const netTaxable = Math.max(0, taxableBase - deductibleExpenses);

    // Tabela Progressiva IRPF 2026 (Mensal)
    // Isento até 2.428,80
    // 7.5% - 2.428,81 a 2.826,65 (Dedução 182,16)
    // 15% - 2.826,66 a 3.751,05 (Dedução 394,88)
    // 22.5% - 3.751,06 a 4.664,68 (Dedução 676,27)
    // 27.5% - Acima de 4.664,68 (Dedução 909,53)
    
    let irpf = 0;
    const base = netTaxable;

    if (base > 4664.68) irpf = (base * 0.275) - 909.53;
    else if (base > 3751.05) irpf = (base * 0.225) - 676.27;
    else if (base > 2826.65) irpf = (base * 0.15) - 394.88;
    else if (base > 2428.80) irpf = (base * 0.075) - 182.16;

    const minWage2026 = 1621; // Base 2026
    
    return {
      grossIncome,
      taxableIncome: taxableBase,
      exemptIncome,
      deductibleExpenses,
      netTaxable,
      irpfEstimate: Math.max(0, irpf),
      inssTac11: minWage2026 * 0.11,
      inssTac20: minWage2026 * 0.20,
      meiBase: 194.52, // Básico (5% + ISS/ICMS)
      meiComplement: minWage2026 * 0.15 // Complemento para fechar 20%
    };
  };

  const tax = calculateTaxes();

  return (
    <div className="bg-slate-950 min-h-screen text-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3 italic">
              <Calculator className="text-hlx-gold" /> GESTÃO CONTÁBIL S-O-L
            </h1>
            <p className="text-gray-400 text-sm mt-1">Soberania Fiscal para o Transportador Autônomo</p>
          </div>
          <div className="flex gap-2">
            <button 
                onClick={() => {
                   const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
                   const url = URL.createObjectURL(blob);
                   const link = document.createElement('a');
                   link.href = url;
                   link.download = `helonex_financeiro_${new Date().toISOString().split('T')[0]}.json`;
                   link.click();
                }}
                className="bg-slate-800 text-white px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 border border-white/10 hover:bg-slate-700 transition-all"
            >
                <Download size={18} /> Exportar
            </button>
            <button 
                onClick={() => setShowEntryModal(true)}
                className="bg-hlx-gold text-black px-6 py-3 rounded-xl font-black text-sm uppercase flex items-center gap-2 hover:bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all"
            >
                <Plus size={18} /> Novo Lançamento
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mt-8 border-b border-white/10 overflow-x-auto pb-1">
          {[
            { id: 'ENTRIES', label: 'Livro Caixa', icon: History },
            { id: 'TAX', label: 'Carnê-Leão / IR', icon: FileText },
            { id: 'SOCIAL', label: 'Previdência (INSS)', icon: ShieldAlert },
            { id: 'GUIDES', label: 'Passo a Passo / Guias', icon: Info }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-2 flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'text-hlx-gold border-b-2 border-hlx-gold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'ENTRIES' && (
            <motion.div 
              key="entries"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Stats Summary */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl">
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <PieChart size={14} /> Balanço do Período
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <span className="text-gray-400 text-xs block mb-1">Receita Líquida</span>
                      <div className="text-2xl font-mono font-bold text-green-400">R$ {tax.grossIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs block mb-1">Despesas Operacionais</span>
                      <div className="text-2xl font-mono font-bold text-red-500">R$ {tax.deductibleExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                      <span className="text-gray-400 text-xs block mb-1">Saldo em Caixa</span>
                      <div className="text-3xl font-mono font-bold text-white">R$ {(tax.grossIncome - tax.deductibleExpenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-950/20 border border-hlx-gold/20 p-6 rounded-2xl">
                   <div className="flex items-start gap-4">
                      <div className="p-3 bg-hlx-gold/20 rounded-xl">
                        <Info className="text-hlx-gold" size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-hlx-gold">Dica de Soberania</h4>
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                          Documente todas as despesas com combustível, manutenção e pedágio. Mesmo com a isenção de 40%, o excesso de custos pode ser deduzido no Carnê-Leão via Livro Caixa.
                        </p>
                      </div>
                   </div>
                </div>
              </div>

              {/* Transactions List */}
              <div className="lg:col-span-2 bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-white font-bold flex items-center gap-2">Últimos Lançamentos</h3>
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                  {entries.length === 0 ? (
                    <div className="p-20 text-center text-gray-600">
                      <History size={48} className="mx-auto mb-4 opacity-20" />
                      <p>Nenhum lançamento registrado este mês.</p>
                    </div>
                  ) : (
                    <table className="w-full text-left">
                      <thead className="bg-slate-950/50 text-[10px] uppercase font-black text-gray-500 tracking-tighter">
                        <tr>
                          <th className="p-4">Data</th>
                          <th className="p-4">Descrição</th>
                          <th className="p-4">Categoria</th>
                          <th className="p-4 text-right">Valor</th>
                          <th className="p-4"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {entries.map(e => (
                          <tr key={e.id} className="hover:bg-white/5 transition-colors group">
                            <td className="p-4 text-xs font-mono text-gray-400">{e.date}</td>
                            <td className="p-4 text-sm font-medium text-white">{e.description}</td>
                            <td className="p-4">
                              <span className="bg-slate-800 text-[10px] px-2 py-1 rounded-md text-gray-400 font-bold uppercase">{e.category}</span>
                            </td>
                            <td className={`p-4 text-sm font-mono font-bold text-right ${e.type === 'INCOME' ? 'text-green-400' : 'text-red-500'}`}>
                              {e.type === 'INCOME' ? '+' : '-'} R$ {e.value.toLocaleString('pt-BR')}
                            </td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={() => deleteEntry(e.id)}
                                className="p-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'TAX' && (
            <motion.div 
              key="tax"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Carnê-Leão Breakdown */}
              <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <TrendingUp size={120} className="text-hlx-gold" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-8">Estimativa Carnê-Leão 2026</h3>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5">
                    <span className="text-sm font-bold text-gray-400">Receita Bruto (Mensal)</span>
                    <span className="text-lg font-mono font-bold">R$ {tax.grossIncome.toLocaleString('pt-BR')}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl">
                      <span className="text-[10px] font-black text-green-500 uppercase block mb-1">Parcela Isenta (40%)</span>
                      <span className="text-md font-mono font-bold text-green-400">R$ {tax.exemptIncome.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl">
                      <span className="text-[10px] font-black text-hlx-gold uppercase block mb-1">Base Tributável (60%)</span>
                      <span className="text-md font-mono font-bold text-hlx-gold">R$ {tax.taxableIncome.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold text-gray-400">Imposto Estimado</span>
                      <div className="text-3xl font-mono font-bold text-white">R$ {tax.irpfEstimate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl text-center">
                    <p className="text-xs text-blue-300 leading-relaxed italic">
                      Tabela Progressiva 2026 aplicada. <br/> Isenção até R$ 2.428,80 na base de cálculo líquida.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action/Advice */}
              <div className="space-y-6">
                <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl">
                   <h4 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldAlert className="text-red-500" /> Alerta de Conformidade</h4>
                   <p className="text-sm text-gray-400 leading-relaxed mb-6">
                     Se o seu rendimento tributável ultrapassou o teto de isenção no mês, você é obrigado a pagar o DARF via programa Carnê-Leão. O não pagamento gera multas pesadas.
                   </p>
                   <a 
                    href="https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/preenchimento/carne-leao" 
                    target="_blank" 
                    className="w-full bg-hlx-gold text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                   >
                     Acessar Carnê-Leão Web <ExternalLink size={16} />
                   </a>
                </div>

                <div className="bg-green-900/10 border border-green-500/20 p-8 rounded-3xl">
                   <h4 className="text-green-400 font-bold mb-4">Vantagem Exclusiva TAC</h4>
                   <p className="text-sm text-gray-300 leading-relaxed">
                     Como TAC, você possui 40% de isenção automática. Ao migrar para MEI, seu faturamento pode ser tributado integralmente se não houver um contador separando o que é receita da empresa e o que é lucro distribuído.
                   </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'SOCIAL' && (
            <motion.div 
              key="social"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* TAC Contributions */}
              <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-hlx-gold/20 rounded-full flex items-center justify-center">
                    <UserCircle className="text-hlx-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Contribuição TAC (PF)</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex justify-between items-center font-bold">
                    <span className="text-gray-400 font-bold uppercase text-xs">Simplificado (11% SM)</span>
                    <span className="text-white">R$ {tax.inssTac11.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 ml-2">Apenas idade e auxílio-doença. Não conta tempo de contribuição.</p>

                  <div className="p-4 bg-hlx-gold/5 rounded-xl border border-hlx-gold/20 flex justify-between items-center font-bold mt-6">
                    <span className="text-hlx-gold font-bold uppercase text-xs tracking-tighter">Normal (20% SM)</span>
                    <span className="text-hlx-gold">R$ {tax.inssTac20.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-hlx-gold font-bold ml-2">Garante aposentadoria por TEMPO DE CONTRIBUIÇÃO.</p>
                </div>
              </div>

              {/* MEI Complement Simulator */}
              <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl border-l-4 border-l-amber-500">
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                  MEI Caminhoneiro (Proteção Total)
                </h3>

                <div className="space-y-6">
                   <div className="flex justify-between border-b border-white/5 pb-4">
                      <span className="text-sm text-gray-400">Guia DAS (Básico / 5%)</span>
                      <span className="font-mono font-bold">R$ {tax.meiBase.toFixed(2)}</span>
                   </div>
                   
                   <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-white">Complemento Exigido (15%)</span>
                      <span className="text-xl font-mono font-bold text-amber-500">R$ {tax.meiComplement.toFixed(2)}</span>
                   </div>

                  <div className="bg-amber-950/30 border border-amber-500/30 p-6 rounded-2xl mt-4">
                      <h4 className="text-amber-500 font-bold text-sm mb-2 flex items-center gap-2">
                        <History size={16} /> Como Garantir a Proteção TAC?
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4 font-bold uppercase tracking-tighter">
                        Para ter o mesmo direito que você tinha no TAC de se aposentar por tempo de serviço, você deve emitir uma guia complementar do INSS (código 1910).
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-gray-300">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                          <span>Mantenha seu tempo acumulado de motorista.</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-300">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                          <span>Garante aposentadoria antes dos 65 anos.</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'GUIDES' && (
            <motion.div 
              key="guides"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-12 pb-12"
            >
              {/* Layout for categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* INSS TAC GUIDE */}
                <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl">
                  <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><ShieldAlert size={20} /></div>
                    Recolher INSS (TAC)
                  </h3>
                  <div className="space-y-4">
                    <p className="text-xs text-gray-400 leading-relaxed">Siga estes passos para emitir sua GPS (Guia da Previdência Social):</p>
                    <div className="space-y-3">
                      {[
                        "Acesse o site meu.inss.gov.br e faça login gov.br.",
                        "Busque pelo serviço 'Emitir GPS'.",
                        "Informe seu PIS/NIT e escolha o código.",
                        "Código 1007 (Plano Normal - 20%) - RECOMENDADO.",
                        "Código 1163 (Plano Simplificado - 11%).",
                        "Preencha o valor e pague até o dia 15 do mês seguinte."
                      ].map((step, i) => (
                        <div key={i} className="flex gap-3 text-xs text-gray-300">
                          <span className="text-hlx-gold font-black">{i+1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                    <a href="https://meu.inss.gov.br" target="_blank" className="block text-center bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold mt-6 transition-all">Acessar Meu INSS</a>
                  </div>
                </div>

                {/* IRPF TAC GUIDE */}
                <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl">
                  <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><FileText size={20} /></div>
                    Recolher IRPF (TAC)
                  </h3>
                  <div className="space-y-4">
                    <p className="text-xs text-gray-400 leading-relaxed">Emita o Carnê-Leão e pague o DARF mensalmente:</p>
                    <div className="space-y-3">
                      {[
                        "Acesse o portal e-CAC da Receita Federal.",
                        "Abra o sistema 'Carnê-Leão Web'.",
                        "Lançe sua receita bruta de frete.",
                        "O sistema aplicará os 40% de isenção automaticamente.",
                        "Emita o DARF com código 0190.",
                        "Pague até o último dia útil do mês seguinte."
                      ].map((step, i) => (
                        <div key={i} className="flex gap-3 text-xs text-gray-300">
                          <span className="text-hlx-gold font-black">{i+1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                    <a href="https://cav.receita.fazenda.gov.br" target="_blank" className="block text-center bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold mt-6 transition-all">Acessar e-CAC</a>
                  </div>
                </div>

                {/* MEI COMPLEMENT GUIDE */}
                <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl md:col-span-2 border-t-4 border-t-amber-500">
                  <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500"><TrendingUp size={20} /></div>
                    MEI: Complemento INSS (Código 1910)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-xs text-gray-400 leading-relaxed font-bold uppercase tracking-tight text-amber-500">Para não perder o tempo de aposentadoria conquistado como TAC:</p>
                      <div className="space-y-3">
                        {[
                          "Acesse o Sistema de Acréscimos Legais (SAL) da Receita.",
                          "Escolha 'Contribuinte Individual'.",
                          "Use o Código de Pagamento 1910.",
                          "Preencha com o valor de 15% do Salário Mínimo (R$ 243,15).",
                          "Preencha a competência atual.",
                          "Pague esta guia junto com o seu boleto DAS mensal."
                        ].map((step, i) => (
                          <div key={i} className="flex gap-3 text-xs text-gray-300">
                            <span className="text-white font-black">{i+1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-black/30 p-6 rounded-2xl flex flex-col justify-center items-center text-center">
                       <ShieldAlert className="text-amber-500 mb-4" size={40} />
                       <h4 className="text-white font-bold mb-2">Atenção Crítica</h4>
                       <p className="text-[10px] text-gray-400 leading-relaxed italic">
                        O pagamento do DAS convencional do MEI garante apenas aposentadoria por idade. Sem este complemento (1910), você pode ter que trabalhar até os 65 anos, mesmo tendo décadas de frete acumulados.
                       </p>
                       <a href="https://www27.receita.fazenda.gov.br/simulacao-gps/" target="_blank" className="w-full bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-xl font-bold mt-6 transition-all">Emitir GPS Complementar</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* FINAL CTA */}
              <div className="bg-gradient-to-r from-hlx-gold to-amber-400 p-8 rounded-3xl text-black text-center shadow-2xl">
                 <h3 className="text-2xl font-black italic uppercase mb-2">Precisa de Assessoria Especializada?</h3>
                 <p className="font-bold mb-6 opacity-80">Regularização ANTT, CIOT, Planejamento Tributário e Previdenciário.</p>
                 <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <a href="https://wa.me/5511987639773" className="bg-black text-white px-8 py-4 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-zinc-900 transition-all shadow-xl">
                      <Phone size={18} /> WhatsApp (11) 98763-9773
                    </a>
                    <a href="https://antt.net.br" className="bg-white text-black px-8 py-4 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 hover:bg-gray-100 transition-all shadow-xl">
                      <Globe size={18} /> Acessar antt.net.br
                    </a>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Entry Modal */}
      {showEntryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowEntryModal(false)}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-hlx-gold/20 w-full max-w-md p-8 rounded-3xl relative z-10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold text-white italic">Novo Lançamento</h2>
                <button onClick={() => setShowEntryModal(false)} className="text-gray-500 hover:text-white">
                    <Trash2 size={24} />
                </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-gray-500 uppercase mb-2 block">Tipo de Movimentação</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setNewEntry({...newEntry, type: 'INCOME'})}
                    className={`py-3 rounded-xl text-xs font-bold transition-all border ${newEntry.type === 'INCOME' ? 'bg-green-600/20 border-green-500 text-green-400' : 'bg-slate-800 border-transparent text-gray-400'}`}
                  >
                    Receita (Frete)
                  </button>
                  <button 
                    onClick={() => setNewEntry({...newEntry, type: 'EXPENSE'})}
                    className={`py-3 rounded-xl text-xs font-bold transition-all border ${newEntry.type === 'EXPENSE' ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-slate-800 border-transparent text-gray-400'}`}
                  >
                    Despesa Operacional
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-500 uppercase mb-2 block">Identificação / Nota</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white placeholder:text-gray-700 focus:border-hlx-gold outline-none" 
                  placeholder="Ex: Frete São Paulo x BH"
                  value={newEntry.description}
                  onChange={e => setNewEntry({...newEntry, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase mb-2 block">Valor Líquido (R$)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-hlx-gold font-mono font-bold outline-none" 
                    value={newEntry.value}
                    onChange={e => setNewEntry({...newEntry, value: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase mb-2 block">Data da Operação</label>
                  <input 
                    type="date" 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white text-xs font-bold outline-none" 
                    value={newEntry.date}
                    onChange={e => setNewEntry({...newEntry, date: e.target.value})}
                  />
                </div>
              </div>

              <button 
                onClick={addEntry}
                className="w-full bg-hlx-gold text-black font-black py-4 rounded-2xl mt-4 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all font-mono font-bold uppercase tracking-widest text-sm shadow-xl"
              >
                Confirmar no Livro Caixa
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer Branding */}
      <div className="max-w-6xl mx-auto mt-12 pb-8 border-t border-white/5 pt-8 text-center">
         <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-loose">
            Esta ferramenta utiliza as alíquotas oficiais da Medida Provisória 1.343/2026, Instrução Normativa RFB 1.500/2014 e Resoluções INSS 2026. <br/>
            Desenvolvimento: HELONEX BRASIL TECNOLOGIA. Todos os direitos reservados.
         </p>
      </div>
    </div>
  );
};

const UserCircle = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const Phone = ({ className, size }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const Globe = ({ className, size }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
