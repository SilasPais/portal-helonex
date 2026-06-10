
import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, ArrowRight, ShieldCheck, Info, BarChart3, Repeat } from 'lucide-react';
import { TaxSimulation } from '../types';

const FiscalReformSimulator: React.FC = () => {
    const [revenue, setRevenue] = useState(50000); // Faturamento Mensal
    const [dieselSpend, setDieselSpend] = useState(15000); // Gasto Diesel
    const [tiresSpend, setTiresSpend] = useState(3000); // Gasto Pneus
    const [sim, setSim] = useState<TaxSimulation | null>(null);

    useEffect(() => {
        // Lógica simplificada da Reforma 2026
        // Atual: PIS/COFINS (3.65% ou 9.25%) + ICMS (aprox 12% frete inter)
        // Reforma: IVA Dual (aprox 26.5%) mas com crédito INTEGRAL sobre diesel e pneus
        
        const currentPisCofins = revenue * 0.0925;
        const currentIcms = revenue * 0.12;
        
        const newRate = 0.265; // Projeção IBS/CBS
        const grossTax = revenue * newRate;
        
        // O "Pulo do Gato": Crédito sobre insumos que hoje é limitado
        const creditDiesel = dieselSpend * newRate; 
        const creditTires = tiresSpend * newRate;
        
        const finalTax = grossTax - creditDiesel - creditTires;
        
        setSim({
            currentPisCofins,
            currentIcms,
            newCbs: grossTax * 0.35, // Proporção estimada CBS
            newIbs: grossTax * 0.65, // Proporção estimada IBS
            creditDiesel,
            creditTires,
            netImpact: (currentPisCofins + currentIcms) - finalTax
        });
    }, [revenue, dieselSpend, tiresSpend]);

    return (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl animate-fade-in-up">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-white font-bold text-xl flex items-center gap-2">
                        <Calculator className="text-hlx-gold" /> Simulador de Reforma 2026
                    </h3>
                    <p className="text-gray-400 text-sm">Projeção IBS/CBS e Créditos de Insumos.</p>
                </div>
                <span className="bg-hlx-blue/20 text-hlx-blue text-[10px] font-bold px-2 py-1 rounded border border-hlx-blue/30 uppercase">Beta Test</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Faturamento Frete (Mês)</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-3 text-gray-600" size={16} />
                        <input type="number" value={revenue} onChange={e => setRevenue(Number(e.target.value))} className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 p-2.5 text-white font-mono" />
                    </div>
                </div>
                <div>
                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Gasto Diesel (Mês)</label>
                    <div className="relative">
                        <Repeat className="absolute left-3 top-3 text-gray-600" size={16} />
                        <input type="number" value={dieselSpend} onChange={e => setDieselSpend(Number(e.target.value))} className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 p-2.5 text-white font-mono" />
                    </div>
                </div>
                <div>
                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Gasto Pneus (Mês)</label>
                    <div className="relative">
                        <BarChart3 className="absolute left-3 top-3 text-gray-600" size={16} />
                        <input type="number" value={tiresSpend} onChange={e => setTiresSpend(Number(e.target.value))} className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 p-2.5 text-white font-mono" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-t border-white/5 pt-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Imposto Atual (Total)</span>
                        <span className="text-red-400 font-bold">R$ {(sim?.currentPisCofins || 0 + (sim?.currentIcms || 0)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Novo IBS/CBS 2026 (Bruto)</span>
                        <span className="text-white font-bold">R$ {(sim?.newIbs || 0 + (sim?.newCbs || 0)).toLocaleString()}</span>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                        <div className="flex justify-between items-center">
                            <span className="text-green-400 font-bold text-xs">CRÉDITO RECUPERÁVEL (Diesel+Pneus)</span>
                            <span className="text-green-400 font-black">R$ {(sim?.creditDiesel || 0 + (sim?.creditTires || 0)).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-hlx-gold/20 flex flex-col items-center text-center">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-2 tracking-widest">Saldo de Eficiência Fiscal</p>
                    <div className={`text-4xl font-display font-bold ${sim?.netImpact && sim.netImpact > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {sim?.netImpact && sim.netImpact > 0 ? '+' : ''} R$ {sim?.netImpact.toLocaleString()}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-4 leading-relaxed italic">
                        * Sob a Reforma de 2026, empresas eficientes lucram com a não cumulatividade. 
                        <strong> A Helonex monitora esses créditos 24h.</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FiscalReformSimulator;
