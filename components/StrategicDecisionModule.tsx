
import React, { useState } from 'react';
import { 
  BrainCircuit, ArrowRight, ShieldCheck, AlertTriangle, TrendingUp, 
  FileText, CheckCircle, Download, Printer, Loader2, Target, Scale, Zap,
  Briefcase, Wrench, ShieldAlert
} from 'lucide-react';
import { generateStrategicAnalysis } from '../services/geminiService';
import { StrategicAnalysis } from '../types';

const StrategicDecisionModule: React.FC = () => {
  const [decisionInput, setDecisionInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<StrategicAnalysis | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Consultando Base Legal 2026...",
    "Mapeando Procedimento Operacional (POP)...",
    "Mapeando Procedimento Administrativo (PAP)...",
    "Auditando Normas de Gestão da Qualidade Total...",
    "Simulando Possibilidades de Erro e Correções..."
  ];

  const handleAnalyze = async () => {
    if (!decisionInput.trim()) return;
    setIsProcessing(true);
    setAnalysis(null);

    let stepIdx = 0;
    const interval = setInterval(() => {
        setLoadingStep(stepIdx);
        stepIdx = (stepIdx + 1) % steps.length;
    }, 1500);

    try {
      const context = "Transportadora em busca de Soberania Digital. Foco: Crescimento Exponencial e Erro Zero via Helonex.";
      const result = await generateStrategicAnalysis(decisionInput, context);
      
      clearInterval(interval);
      if (result) {
        setAnalysis(result);
      } else {
        alert("A Helô precisa de mais detalhes para esta análise. Tente descrever o cenário completo.");
      }
    } catch (e) {
      clearInterval(interval);
      alert("Erro na conexão com o Núcleo Estratégico Helonex.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 animate-fade-in-up">
      
      {/* HEADER */}
      <div className="mb-10 text-center">
         <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-hlx-gold/10 border border-hlx-gold/30 text-hlx-gold text-xs font-bold uppercase tracking-widest mb-4">
            <BrainCircuit size={14} /> Sala de Guerra Helonex
         </div>
         <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Matriz de <span className="text-transparent bg-clip-text bg-gradient-to-r from-hlx-gold to-orange-500">Decisão Soberana</span>
         </h2>
         <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Diga-nos o que pretende realizar. Nossa IA modulará a estratégia, treinará o passo a passo e entregará os <strong>POPs</strong> e <strong>PAPs</strong> prontos para execução.
         </p>
      </div>

      {!analysis && (
        <div className="max-w-3xl mx-auto">
           <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              {isProcessing && (
                 <div className="absolute inset-0 bg-slate-900/90 z-20 flex flex-col items-center justify-center text-center">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-hlx-gold blur-xl opacity-20 rounded-full animate-pulse"></div>
                        <BrainCircuit size={64} className="text-hlx-gold animate-pulse relative z-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Processando Inteligência</h3>
                    <p className="text-gray-400 font-mono text-sm animate-pulse">{steps[loadingStep]}</p>
                 </div>
              )}

              <label className="block text-sm font-bold text-gray-400 uppercase mb-4 text-center">O que você pretende decidir ou implementar hoje?</label>
              <textarea 
                 value={decisionInput}
                 onChange={(e) => setDecisionInput(e.target.value)}
                 placeholder="Ex: Quero abrir uma filial de fretamento no Mato Grosso. Quais os riscos, base legal e procedimentos necessários?"
                 className="w-full h-40 bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-hlx-gold outline-none resize-none text-lg leading-relaxed placeholder:text-gray-600 mb-6"
              />
              
              <div className="flex justify-center">
                 <button 
                    onClick={handleAnalyze}
                    disabled={isProcessing || !decisionInput.trim()}
                    className="bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold px-12 py-4 rounded-xl shadow-lg shadow-yellow-500/20 transition-all flex items-center gap-3 disabled:opacity-50"
                 >
                    <Zap size={20} /> MODULAR ESTRATÉGIA ERRO ZERO
                 </button>
              </div>
           </div>
        </div>
      )}

      {analysis && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 animate-slide-up">
           
           {/* COLUNA ESQUERDA: ANÁLISE 360º */}
           <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-lg">
                 <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2 border-b border-white/5 pb-2"><Scale className="text-blue-400" /> Base Legal 2026</h3>
                 <div className="p-4 rounded-xl text-sm text-gray-300 leading-relaxed bg-slate-950/50">
                    {analysis.legalBasis}
                 </div>
              </div>

              <div className="bg-red-900/10 border border-red-500/30 rounded-2xl p-6 shadow-lg">
                 <h3 className="text-red-400 font-bold text-lg mb-4 flex items-center gap-2"><AlertTriangle /> Riscos & Pontos de Falha</h3>
                 <ul className="space-y-3">
                    {analysis.risks.map((risk, idx) => (
                       <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                          <span className="text-red-500 font-bold mt-1 shrink-0">•</span> {risk}
                       </li>
                    ))}
                 </ul>
              </div>

              <div className="bg-green-900/10 border border-green-500/30 rounded-2xl p-6 shadow-lg">
                 <h3 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp /> Ganhos de Valuation</h3>
                 <ul className="space-y-3">
                    {analysis.opportunities.map((opp, idx) => (
                       <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                          <CheckCircle className="text-green-500 w-4 h-4 mt-0.5 shrink-0" /> {opp}
                       </li>
                    ))}
                 </ul>
              </div>
           </div>

           {/* COLUNA DIREITA: OS ENTREGÁVEIS (POP & PAP) */}
           <div className="lg:col-span-8 space-y-10">
              
              {/* DOCUMENTO POP - OPERACIONAL */}
              <div className="bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border-t-8 border-blue-600">
                 <div className="bg-blue-50 p-6 border-b border-blue-100 flex justify-between items-center">
                    <div>
                       <h2 className="text-2xl font-display font-bold text-blue-900 leading-none">POP: PROCEDIMENTO OPERACIONAL PADRÃO</h2>
                       <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mt-1">Execução Tática / Operação em Pista</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                        <Wrench size={24} />
                    </div>
                 </div>

                 <div className="p-8 space-y-8">
                    <div className="flex gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg h-fit"><Target className="text-blue-700" size={24}/></div>
                        <div>
                            <h4 className="font-bold text-blue-900 mb-1">OBJETIVO DA OPERAÇÃO</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{analysis.popContent.objective}</p>
                        </div>
                    </div>

                    <div>
                       <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                          <FileText size={16} className="text-blue-600"/> Sequência de Ação (Checklist)
                       </h4>
                       <div className="grid grid-cols-1 gap-3">
                          {analysis.popContent.steps.map((step: string, idx: number) => (
                             <div key={idx} className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                                   {idx + 1}
                                </span>
                                <p className="text-slate-700 font-medium text-sm">{step}</p>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              {/* DOCUMENTO PAP - ADMINISTRATIVO */}
              <div className="bg-slate-50 text-slate-900 rounded-2xl shadow-2xl overflow-hidden border-t-8 border-orange-500">
                 <div className="bg-orange-50 p-6 border-b border-orange-100 flex justify-between items-center">
                    <div>
                       <h2 className="text-2xl font-display font-bold text-orange-900 leading-none">PAP: PROCEDIMENTO ADMINISTRATIVO PADRÃO</h2>
                       <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mt-1">Gestão, Burocracia e Documentação</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                        <Briefcase size={24} />
                    </div>
                 </div>

                 <div className="p-8 space-y-8">
                    {/* Simulação de Erro */}
                    <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                       <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2 uppercase text-xs tracking-widest">
                          <ShieldAlert size={18}/> Análise de Falha Previsível (Helonex)
                       </h4>
                       <p className="text-red-800 text-sm italic">"{analysis.errorSimulation}"</p>
                       <div className="mt-4 pt-4 border-t border-red-100">
                          <p className="text-[10px] font-black text-red-700 uppercase mb-2">Ação Corretiva Imediata (Contingência):</p>
                          <ul className="text-sm text-red-700 space-y-2 font-medium">
                             {analysis.correctiveActions.map((act: string, i: number) => <li key={i} className="flex gap-2"><span>•</span> {act}</li>)}
                          </ul>
                       </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                       <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                          <CheckCircle size={18} className="text-green-600"/> Fluxo Administrativo Auditado
                       </h4>
                       <div className="space-y-3">
                          <div className="text-sm text-slate-600 flex gap-3">
                             <div className="w-1 h-auto bg-orange-400 rounded"></div>
                             Conformidade Helonex detectada. Execute os trâmites burocráticos sugeridos para garantir que a operação acima ocorra com 100% de soberania e segurança jurídica.
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Footer Actions */}
                 <div className="bg-slate-100 p-6 border-t border-slate-200 flex justify-between items-center">
                    <button onClick={() => setAnalysis(null)} className="text-slate-500 hover:text-slate-900 font-bold text-sm uppercase tracking-tighter">Descartar e Iniciar Nova Matriz</button>
                    <div className="flex gap-3">
                       <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-bold hover:bg-slate-50 shadow-sm">
                          <Printer size={16} /> Imprimir Dossiê
                       </button>
                       <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 shadow-lg group">
                          <Download size={16} className="group-hover:translate-y-0.5 transition-transform" /> Baixar PDF Helonex
                       </button>
                    </div>
                 </div>
              </div>

           </div>

        </div>
      )}

    </div>
  );
};

export default StrategicDecisionModule;
