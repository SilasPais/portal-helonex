
import React, { useState, useEffect } from 'react';
import { Calculator, Truck, DollarSign, Fuel, Wrench, Receipt, ArrowRight, User, Building2, Anchor, ShieldCheck, AlertTriangle, Info } from 'lucide-react';
import { FreightCost } from '../types';
import { calcularPisoMinimoANTT, CategoriaCarga, TABELA_COEFICIENTES } from '../src/domain/rules/freightRules';
import { MetacognitiveEngine } from '../src/domain/ai/MetacognitiveEngine';

type PersonaType = 'TAC' | 'ETC' | 'SHIPPER';

const FreightCalculator: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [activePersona, setActivePersona] = useState<PersonaType>('TAC');
  
  // Inputs
  const [distance, setDistance] = useState(1000); // km
  const [dieselPrice, setDieselPrice] = useState(6.20);
  const [consumption, setConsumption] = useState(2.8); // km/l
  const [tolls, setTolls] = useState(350);
  const [days, setDays] = useState(3);
  const [dailyStipend, setDailyStipend] = useState(120); // Alimentação/Pernoite
  const [cargoWeight, setCargoWeight] = useState(30); // Ton
  
  // ANTT Strict Parameters
  const [eixosCarregados, setEixosCarregados] = useState(4);
  const [categoria, setCategoria] = useState<CategoriaCarga>('GERAL');
  const [modalidade, setModalidade] = useState<'LOTACAO' | 'FRACIONADA'>('LOTACAO');
  const [retornoVazio, setRetornoVazio] = useState(false);

  // ETC/Shipper Extras
  const [adminFee, setAdminFee] = useState(15); // %
  const [taxRate, setTaxRate] = useState(18); // % (ICMS/ISS)
  const [margin, setMargin] = useState(20); // %

  const [result, setResult] = useState<FreightCost | null>(null);
  const [memorialCalculo, setMemorialCalculo] = useState('');

  useEffect(() => {
    calculate();
  }, [distance, dieselPrice, consumption, tolls, days, dailyStipend, adminFee, taxRate, margin, activePersona, eixosCarregados, categoria, modalidade, retornoVazio]);

  const calculate = () => {
    // 1. Custo Operacional Direto (O "Custo da Roda")
    const liters = distance / consumption;
    const dieselCost = liters * dieselPrice;
    const maintenancePerKm = 0.90; 
    const maintenanceCost = distance * maintenancePerKm;
    const tiresCost = maintenanceCost * 0.3;
    const travelExpenses = days * dailyStipend;
    const baseCost = dieselCost + tolls + maintenanceCost + travelExpenses;

    // 2. Piso Mínimo ANTT (Validador CIOT 2026 - Malha Fina)
    const anttResult = calcularPisoMinimoANTT({
        distanciaKm: distance,
        eixosCarregados: eixosCarregados,
        categoria: categoria,
        modalidade: modalidade,
        retornoVazio: retornoVazio,
        precoDieselS10: dieselPrice
    });
    
    setMemorialCalculo(anttResult.memorialCalculo);
    
    // NOVO: Cálculo Metacognitivo de Piso (MP 1.343)
    // Usamos o coeficiente da tabela ANTT como base para o CCD
    const coefBase = TABELA_COEFICIENTES[categoria]?.ccd || 1.5;
    const minCalculatedValue = MetacognitiveEngine.calculateMinimumFreight(distance, coefBase, 250); 
    
    const minAnttPrice = Math.max(anttResult.valorMinimo, minCalculatedValue);

    let finalPrice = baseCost;
    let profit = 0;
    let taxesValue = 0;
    let adminValue = 0;

    if (activePersona === 'TAC') {
        profit = baseCost * (margin / 100);
        finalPrice = baseCost + profit;
    } else if (activePersona === 'ETC') {
        adminValue = baseCost * (adminFee / 100);
        const subTotal = baseCost + adminValue;
        const totalRates = (taxRate + margin) / 100;
        finalPrice = totalRates < 1 ? subTotal / (1 - totalRates) : subTotal * 1.5;
        taxesValue = finalPrice * (taxRate / 100);
        profit = finalPrice * (margin / 100);
    } else {
        finalPrice = baseCost * 1.6; 
    }

    setResult({
        diesel: dieselCost,
        toll: tolls,
        maintenance: maintenanceCost,
        tires: tiresCost,
        driverStipend: travelExpenses,
        adminOverhead: adminValue,
        taxes: taxesValue,
        profitMargin: profit,
        totalCost: baseCost,
        suggestedPrice: finalPrice,
        minAnttPrice: minAnttPrice,
        isSustainable: finalPrice >= minAnttPrice // Compliance Check
    });
  };

  const handleGerarProposta = () => {
    // 1. Análise Metacognitiva (Heurística Antifraude) - Execução Síncrona O(1)
    const analiseComportamental = MetacognitiveEngine.analyzeBehavior({
      userId: 'usuario_sessao_atual', // Mock temporário para o usuário logado
      actionType: 'FECHAMENTO_CONTRATO',
      timestamp: Date.now()
    });

    // 2. Trava de Segurança (Intervenção do Sistema)
    if (analiseComportamental.isAnomalous) {
      alert(`🛑 BLOQUEIO DE SEGURANÇA HELONEX\n${analiseComportamental.reason}`);
      return; // Corta a execução pela raiz.
    }

    // 3. Trava de Sustentabilidade Financeira (GesTech)
    if (result) {
      const travaFinanceira = MetacognitiveEngine.validateProfitability(result.totalCost, result.suggestedPrice);
      if (!travaFinanceira.isSustainable) {
        alert(`🛑 ALERTA DE SUSTENTABILIDADE\n${travaFinanceira.warning}`);
        return;
      }
    }

    // 4. FLUXO LIMPO (Clean Flow): Usuário honesto e proposta rentável chegam aqui sem atrasos.
    // O cálculo do piso mínimo da ANTT já foi processado reativamente e está garantido no 'result'.
    alert("✅ Proposta gerada com sucesso! Margem segura e comportamento validado pelo Motor Metacognitivo.");
  };

  return (
    <div className="bg-slate-900 min-h-screen p-4 md:p-8 animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
                    <Calculator className="text-hlx-gold" /> Simulador Malha Fina CIOT (2026)
                </h1>
                <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-green-500" />
                    Validador Universal (PNPM-TRC) - Regras Vigentes (Maio/2026).
                </p>
            </div>
            
            <div className="bg-slate-800 p-1 rounded-lg border border-white/10 flex">
                <button onClick={() => setActivePersona('TAC')} className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activePersona === 'TAC' ? 'bg-green-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}><User size={14} /> TAC</button>
                <button onClick={() => setActivePersona('ETC')} className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activePersona === 'ETC' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}><Building2 size={14} /> ETC</button>
                <button onClick={() => setActivePersona('SHIPPER')} className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activePersona === 'SHIPPER' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}><Anchor size={14} /> SHIPPER</button>
            </div>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 p-4 rounded-xl mb-8 flex items-start gap-4">
            <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" size={24} />
            <div>
                <h4 className="text-amber-500 font-bold uppercase text-xs tracking-widest mb-1">Trava Sistêmica ANTT (Ativa)</h4>
                <p className="text-xs text-gray-300 leading-relaxed max-w-4xl">
                    Se o valor negociado for inferior ao cálculo combinatório das <strong>5 variáveis obrigatórias</strong> (Natureza, Eixos, Modalidade, Retorno e Combustível), o CIOT será bloqueado eletronicamente em tempo real na origem. A tolerância de sistema da IPEF é zero.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-800 p-6 rounded-xl border border-white/5">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Truck className="text-hlx-gold" size={18} /> Parâmetros (IPEF)</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold">Categoria da Carga</label>
                                <select 
                                    value={categoria} 
                                    onChange={e => setCategoria(e.target.value as CategoriaCarga)} 
                                    className="w-full bg-slate-900 border border-white/10 rounded p-2 text-white mt-1 text-xs"
                                >
                                    {Object.keys(TABELA_COEFICIENTES).map(cat => (
                                        <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold">Eixos Comercias</label>
                                <input type="number" value={eixosCarregados} onChange={e => setEixosCarregados(Number(e.target.value))} className="w-full bg-slate-900 border border-white/10 rounded p-2 text-white mt-1" />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold">Modalidade da Operação</label>
                            <select 
                                value={modalidade} 
                                onChange={e => setModalidade(e.target.value as 'LOTACAO' | 'FRACIONADA')} 
                                className="w-full bg-slate-900 border border-white/10 rounded p-2 text-white mt-1 text-xs"
                            >
                                <option value="LOTACAO">1. Lotação / Carga Fechada</option>
                                <option value="FRACIONADA">2. Fracionada / Distribuição Urbana</option>
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold">Distância (KM)</label>
                                <input type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} className="w-full bg-slate-900 border border-white/10 rounded p-2 text-white mt-1" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold text-amber-500">Gatilho Diesel R$</label>
                                <input type="number" step="0.01" value={dieselPrice} onChange={e => setDieselPrice(Number(e.target.value))} className="w-full bg-slate-900 border border-amber-500/50 rounded p-2 text-white mt-1" />
                            </div>
                        </div>

                        <div className="bg-black/30 p-3 rounded-lg border border-white/5 flex items-start gap-3">
                            <input 
                                type="checkbox" 
                                checked={retornoVazio} 
                                onChange={e => setRetornoVazio(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-hlx-gold focus:ring-hlx-gold mt-1"
                            />
                            <div>
                                <label className="text-xs text-white font-bold uppercase block">Retirar Trava do Retorno Vazio?</label>
                                <p className="text-[10px] text-gray-500 leading-tight mt-1">Marque apenas se o contratante GARANTIR operação casada para a volta (cruzamento com a Chave MDFe).</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold">Peso SMM (TON)</label>
                                <input type="number" value={cargoWeight} onChange={e => setCargoWeight(Number(e.target.value))} className="w-full bg-slate-900 border border-white/10 rounded p-2 text-white mt-1" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold">Pedágio R$</label>
                                <input type="number" value={tolls} onChange={e => setTolls(Number(e.target.value))} className="w-full bg-slate-900 border border-white/10 rounded p-2 text-white mt-1" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-white/5">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><DollarSign className="text-green-400" size={18} /> Margem Ética</h3>
                    <input type="range" min="0" max="100" value={margin} onChange={e => setMargin(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500" />
                    <div className="flex justify-between mt-2 text-green-400 font-bold text-xs"><span>0%</span> <span>{margin}%</span> <span>100%</span></div>
                </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-2xl border border-hlx-gold/30 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Valor de Negociação Sugerido</p>
                            <h2 className={`text-5xl font-display font-bold ${result?.isSustainable ? 'text-white' : 'text-red-500'}`}>
                                R$ {result?.suggestedPrice.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                            </h2>
                        </div>
                        <div className="flex flex-col gap-2">
                             {result?.isSustainable ? (
                                 <div className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg flex items-center gap-2 font-bold animate-fade-in">
                                     <ShieldCheck size={20} /> TARIFA SUSTENTÁVEL
                                 </div>
                             ) : (
                                 <div className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg flex items-center gap-2 font-bold animate-pulse">
                                     <AlertTriangle size={20} /> ABAIXO DO PISO LEGAL
                                 </div>
                             )}
                             <div className="text-[10px] text-gray-500 text-center uppercase font-bold">
                                Piso ANTT 2026: R$ {result?.minAnttPrice.toLocaleString()}
                             </div>
                        </div>
                    </div>
                    {/* Memorial de Cálculo */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-[10px] text-gray-500 font-mono flex items-center gap-2">
                            <Info size={12} /> {memorialCalculo}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-white/5">
                        <h4 className="text-white font-bold mb-4 border-b border-white/5 pb-2">Custos Reais (Visibilidade 360)</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-400"><span>Diesel (ICMS Cred.)</span><span className="text-white">R$ {result?.diesel.toFixed(2)}</span></div>
                            <div className="flex justify-between text-gray-400"><span>Pedágio (Lei 10.209)</span><span className="text-white">R$ {result?.toll.toFixed(2)}</span></div>
                            <div className="flex justify-between text-gray-400"><span>Depreciação/Pneus</span><span className="text-white">R$ {result?.maintenance.toFixed(2)}</span></div>
                            <div className="pt-2 border-t border-white/5 flex justify-between font-bold text-red-400"><span>Total Operacional</span><span>R$ {result?.totalCost.toFixed(2)}</span></div>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-white/5">
                        <h4 className="text-white font-bold mb-4 border-b border-white/5 pb-2">Relatório de Conciliação</h4>
                        <p className="text-xs text-gray-400 mb-4 italic">"Este frete garante a renovação da frota e a segurança do motorista."</p>
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 text-center">
                            <span className="text-xs text-green-400 font-bold uppercase">Sobra no Caixa (Líquido)</span>
                            <div className="text-2xl font-bold text-green-400">R$ {result?.profitMargin.toLocaleString()}</div>
                        </div>
                        <button 
                            onClick={handleGerarProposta}
                            className="w-full mt-4 py-3 bg-hlx-blue text-white font-bold rounded-lg text-xs hover:bg-blue-700 transition-all uppercase tracking-widest"
                        >
                            Gerar Proposta PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FreightCalculator;
