
import React, { useState } from 'react';
import { 
  Calculator, Scale, Clock, TrendingDown, TrendingUp, 
  AlertTriangle, CheckCircle, FileText, Gavel, DollarSign, 
  ArrowRight, ShieldCheck, Download
} from 'lucide-react';

interface SimulationResult {
  litigationCost: number;
  litigationTime: string;
  conciliationCost: number;
  conciliationTime: string;
  savings: number;
  helonexFee: number;
  requesterPros: string[];
  respondentPros: string[];
  docPreview: string;
}

const ConciliationSimulator: React.FC = () => {
  const [claimValue, setClaimValue] = useState<number>(0);
  const [complexity, setComplexity] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);

  const calculateScenario = () => {
    if (claimValue <= 0) return;

    // --- PARÂMETROS DE MERCADO JURÍDICO 2026 ---
    const attorneyFeePct = 0.20; // 20% Honorários
    const courtCostsPct = 0.04; // 4% Custas Iniciais + Recursos
    const expertCost = complexity === 'HIGH' ? 3500 : complexity === 'MEDIUM' ? 1500 : 0; // Perícia
    const timeInflation = 0.30; // Custo do dinheiro no tempo (3 anos de processo)
    
    // Custo Total Litígio (Valor da Causa + Custos Extras)
    const litigationTotal = claimValue + (claimValue * attorneyFeePct) + (claimValue * courtCostsPct) + expertCost + (claimValue * timeInflation);
    
    // --- PARÂMETROS HELONEX RESOLVE (ODR) ---
    // Acordo geralmente implica um deságio para pagamento à vista (ex: 10% a 20%)
    const discountFactor = 0.15; // 15% de deságio para encerrar hoje
    const settlementValue = claimValue * (1 - discountFactor);
    
    // Taxa Helonex: Taxa Fixa (Setup) + Success Fee
    const baseFee = 550.00; // Taxa de abertura de protocolo
    const successFeePct = 0.075; // 7.5% sobre o valor do acordo
    const helonexFee = baseFee + (settlementValue * successFeePct);
    
    const conciliationTotal = settlementValue + helonexFee;

    const docPreview = `
TERMO DE PRÉ-ACORDO EXTRAJUDICIAL
Plataforma Helonex Resolve - Protocolo SIM-${Date.now()}

1. OBJETO: Quitação integral da disputa no valor originário de R$ ${claimValue.toLocaleString()}.
2. VALOR ACORDADO: R$ ${settlementValue.toLocaleString()}, a ser pago via PIX/CIOT.
3. CUSTAS DA PLATAFORMA: 
   - Taxa de Abertura: R$ 550,00
   - Taxa de Êxito (7,5%): R$ ${(settlementValue * successFeePct).toLocaleString()}
   - TOTAL HELONEX: R$ ${helonexFee.toLocaleString()}
4. CONDIÇÃO: O aceite deste termo implica na renúncia irrevogável de ações judiciais sobre este fato.
5. CELERIDADE: Este acordo encerra uma disputa projetada para durar 36 meses em apenas 5 dias.

Base Legal: Lei 13.140/2015 (Lei de Mediação) e Art. 840 Código Civil.
    `;

    setResult({
      litigationCost: litigationTotal,
      litigationTime: "36 a 60 Meses",
      conciliationCost: conciliationTotal,
      conciliationTime: "5 a 10 Dias",
      savings: litigationTotal - conciliationTotal,
      helonexFee: helonexFee,
      requesterPros: [
        "Recebimento Imediato (Liquidez)",
        "Fim do Stress Emocional",
        "Sem risco de perder a causa (Sucumbência)"
      ],
      respondentPros: [
        "Deságio no valor principal (~15%)",
        "Eliminação de Passivo Jurídico e Bloqueio Judicial",
        "Redução drástica de honorários e custas"
      ],
      docPreview
    });
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 animate-fade-in-up">
      
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
           <Calculator size={14} /> Inteligência Jurídica Preditiva
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Simulador de Conciliação</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A matemática é clara: um acordo "razoável" é sempre mais lucrativo que uma briga "excelente". 
          Calcule o custo do tempo e transforme o conflito em solução agora.
        </p>
      </div>

      {/* INPUTS */}
      <div className="max-w-xl mx-auto bg-slate-800 p-6 rounded-xl border border-white/5 mb-10">
         <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Valor da Disputa / Causa (R$)</label>
         <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
               <span className="absolute left-4 top-4 text-gray-500 font-bold">R$</span>
               <input 
                 type="number" 
                 value={claimValue || ''} 
                 onChange={e => setClaimValue(Number(e.target.value))}
                 className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white font-mono text-lg focus:border-hlx-gold outline-none"
                 placeholder="0,00"
               />
            </div>
            <select 
               value={complexity} 
               onChange={e => setComplexity(e.target.value as any)}
               className="bg-slate-900 border border-white/10 rounded-xl px-4 text-white text-sm outline-none focus:border-hlx-gold"
            >
               <option value="LOW">Simples (Ex: Estadia)</option>
               <option value="MEDIUM">Médio (Ex: Avaria)</option>
               <option value="HIGH">Complexo (Ex: Acidente)</option>
            </select>
         </div>
         <button 
           onClick={calculateScenario}
           className="w-full py-4 bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
         >
           <Scale size={20} /> CALCULAR CENÁRIOS
         </button>
      </div>

      {result && (
        <div className="animate-slide-up space-y-8">
           
           {/* COMPARATIVO VISUAL */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LADO LITÍGIO */}
              <div className="bg-red-900/10 border border-red-500/30 rounded-2xl p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10"><Gavel size={80} className="text-red-500" /></div>
                 <h3 className="text-red-400 font-bold text-lg mb-4 flex items-center gap-2"><Gavel size={20} /> Cenário Judicial</h3>
                 
                 <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm text-gray-300">
                       <span>Custo Projetado (3 anos):</span>
                       <span className="font-mono font-bold text-red-300">R$ {result.litigationCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-300">
                       <span>Tempo de Espera:</span>
                       <span className="font-mono font-bold text-red-300">{result.litigationTime}</span>
                    </div>
                    <div className="text-xs text-red-400/70 italic mt-2">
                       *Inclui honorários, custas, perícia e inflação.
                    </div>
                 </div>
              </div>

              {/* LADO ACORDO HELONEX */}
              <div className="bg-green-900/10 border border-green-500/30 rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-green-900/20">
                 <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldCheck size={80} className="text-green-500" /></div>
                 <h3 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2"><ShieldCheck size={20} /> Acordo Helonex</h3>
                 
                 <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm text-gray-300">
                       <span>Custo Final (Acordo + Taxas):</span>
                       <span className="font-mono font-bold text-green-300">R$ {result.conciliationCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-300">
                       <span>Tempo de Resolução:</span>
                       <span className="font-mono font-bold text-green-300">{result.conciliationTime}</span>
                    </div>
                    <div className="bg-green-500/20 px-3 py-1 rounded text-xs font-bold text-green-400 w-fit">
                       Economia Real: R$ {result.savings.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </div>
                 </div>
              </div>
           </div>

           {/* MATRIZ DE GANHA-GANHA */}
           <div className="bg-slate-800 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold text-center mb-6">Matriz de Transparência (Por que fechar agora?)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                    <h4 className="text-blue-400 font-bold text-sm uppercase mb-3 flex items-center gap-2"><ArrowRight /> Para quem Recebe (Credor)</h4>
                    <ul className="space-y-2">
                       {result.requesterPros.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                             <CheckCircle size={14} className="text-blue-500 mt-0.5" /> {item}
                          </li>
                       ))}
                    </ul>
                 </div>
                 <div>
                    <h4 className="text-orange-400 font-bold text-sm uppercase mb-3 flex items-center gap-2"><ArrowRight /> Para quem Paga (Devedor)</h4>
                    <ul className="space-y-2">
                       {result.respondentPros.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                             <CheckCircle size={14} className="text-orange-500 mt-0.5" /> {item}
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>

           {/* DETALHE DA TAXA HELONEX */}
           <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                 <div className="bg-hlx-gold/20 p-2 rounded-lg text-hlx-gold"><DollarSign size={20} /></div>
                 <div>
                    <p className="text-white font-bold text-sm">Custos da Plataforma</p>
                    <p className="text-xs text-gray-500">R$ 550,00 (Fixo) + 7,5% (Êxito)</p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-hlx-gold font-bold font-mono">R$ {result.helonexFee.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
              </div>
           </div>

           {/* GERADOR DE DOCUMENTO */}
           <div className="border-t border-white/10 pt-8">
              {!isGeneratingDoc ? (
                 <button 
                   onClick={() => setIsGeneratingDoc(true)}
                   className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                 >
                    <FileText size={18} /> MATERIALIZAR ACORDO (GERAR MINUTA)
                 </button>
              ) : (
                 <div className="animate-fade-in bg-slate-100 text-slate-900 p-6 rounded-xl shadow-2xl">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-300 pb-2">
                       <h4 className="font-bold text-lg flex items-center gap-2"><Gavel size={18}/> Minuta de Acordo</h4>
                       <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded">Rascunho Automático</span>
                    </div>
                    <pre className="whitespace-pre-wrap font-mono text-xs md:text-sm leading-relaxed mb-6">
                       {result.docPreview}
                    </pre>
                    <div className="flex gap-4">
                       <button className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2">
                          <CheckCircle size={18} /> VALIDAR E ENVIAR
                       </button>
                       <button className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg flex items-center justify-center gap-2">
                          <Download size={18} /> BAIXAR PDF
                       </button>
                    </div>
                 </div>
              )}
           </div>

        </div>
      )}

    </div>
  );
};

export default ConciliationSimulator;
