
import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, BrainCircuit, Landmark, ArrowRight, CheckCircle2, AlertTriangle, X, DollarSign, PieChart, Gem, Users, Sparkles } from 'lucide-react';
import { guardianEngine } from '../services/guardianSystem';

interface PatrimonialDiagnosticProps {
  onClose: () => void;
  onComplete: () => void;
}

const PatrimonialDiagnostic: React.FC<PatrimonialDiagnosticProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [alchemicalStage, setAlchemicalStage] = useState(''); // Estado para a mensagem alquímica
  const [result, setResult] = useState<any>(null);

  const questions = [
    {
      id: 'brandRegistry',
      category: 'IDENTIDADE & MARCA (GovTech)',
      question: 'Sua marca (o nome na porta do caminhão) é registrada no INPI ou qualquer um pode copiá-la amanhã?',
      options: [
        { value: 'registered', label: 'Tenho o Registro (R®) Oficial.', score: 100 },
        { value: 'logo_only', label: 'Só tenho o CNPJ e o Logo.', score: 50 },
        { value: 'none', label: 'Não pensei nisso ainda.', score: 0 }
      ],
      insight: 'Sem registro, sua reputação não é sua. É um ativo de risco zero no balanço.'
    },
    {
      id: 'regulatoryHealth',
      category: 'SAÚDE REGULATÓRIA (JusTech)',
      question: 'Se a fiscalização parasse sua frota hoje, qual seria o prejuízo estimado?',
      options: [
        { value: 'perfect', label: 'Zero. Tudo auditado (Erro Zero).', score: 100 },
        { value: 'minor_risks', label: 'Talvez uma multa leve.', score: 60 },
        { value: 'critical', label: 'Risco real de apreensão.', score: 0 }
      ],
      insight: 'Passivo Oculto: Multas não geridas destroem o Valuation na hora de uma venda.'
    },
    {
      id: 'humanCapital',
      category: 'CAPITAL HUMANO & RETENÇÃO',
      question: 'Como você garante que seus melhores motoristas não vão para a concorrência?',
      options: [
        { value: 'gamification', label: 'Uso o Módulo de Premiação Helonex (Turnover Zero).', score: 120 }, // Bonus Score
        { value: 'salary', label: 'Pago o piso da categoria e exijo cumprimento.', score: 50 },
        { value: 'high_turnover', label: 'Alta rotatividade. Motorista vem e vai.', score: 10 }
      ],
      insight: 'Empresas com baixa rotatividade valem até 30% mais. O mercado paga caro por equipes estáveis e engajadas.'
    },
    {
      id: 'processDependence',
      category: 'CAPITAL INTELECTUAL (GesTech)',
      question: 'Se você viajar por 30 dias e desligar o celular, a empresa continua faturando?',
      options: [
        { value: 'autonomous', label: 'Sim, tenho processos escritos (POPs).', score: 100 },
        { value: 'partial', label: 'Funciona, mas com problemas.', score: 50 },
        { value: 'owner_dependent', label: 'A empresa para. Eu sou a empresa.', score: 10 }
      ],
      insight: 'Empresas dependentes do dono valem pouco. Empresas baseadas em processos são ativos vendáveis.'
    },
    {
      id: 'customerContracts',
      category: 'CARTEIRA DE CLIENTES',
      question: 'Como é a sua relação contratual com os embarcadores/clientes?',
      options: [
        { value: 'recurring', label: 'Contratos de longo prazo (Receita Recorrente).', score: 100 },
        { value: 'mixed', label: 'Misto (Contratos + Spot).', score: 70 },
        { value: 'spot', label: '100% Spot (Vivo de frete do dia).', score: 30 }
      ],
      insight: 'Receita recorrente aumenta o múltiplo de avaliação da sua empresa (EBITDA).'
    }
  ];

  const handleAnswer = (option: any) => {
    setAnswers({ ...answers, [questions[step].id]: option.value });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    setIsCalculating(true);
    
    // Sequência Alquímica de Processamento
    const stages = [
        "⚗️ Fase 1 (Nigredo): Coletando o 'Chumbo' (Dados Brutos)...",
        "🌫️ Fase 2 (Albedo): Purificando Riscos e Passivos...",
        "✨ Fase 3 (Citrinitas): Transmutando Processos em Sabedoria...",
        "💎 Fase 4 (Rubedo): Cristalizando o Ouro (Valuation)..."
    ];

    let currentStage = 0;
    setAlchemicalStage(stages[0]);

    const interval = setInterval(() => {
        currentStage++;
        if (currentStage < stages.length) {
            setAlchemicalStage(stages[currentStage]);
        }
    }, 1200);

    setTimeout(() => {
      clearInterval(interval);
      // Simulação de Cálculo de Valuation Simplificado (DCF Proxy)
      const fleetValue = 500000; // Valor base simulado da frota (Tangível)
      
      let intangibleScore = 0;
      let humanCapitalBonus = 0;

      Object.entries(answers).forEach(([key, val]: [string, any]) => {
         if (val === 'registered' || val === 'perfect' || val === 'autonomous' || val === 'recurring') {
             intangibleScore += 20;
         } else if (val === 'gamification') {
             intangibleScore += 20;
             humanCapitalBonus = 150000; // Bônus direto no Valuation por ter equipe de elite
         } else if (val === 'logo_only' || val === 'minor_risks' || val === 'partial' || val === 'mixed' || val === 'salary') {
             intangibleScore += 10;
         }
      });

      // Cálculo do Intangível (Marca + Processos + Pessoas)
      // Se tiver o módulo de premiação, o multiplicador é maior
      const multiplier = (intangibleScore / 100) * (humanCapitalBonus > 0 ? 1.5 : 1.0); 
      
      const intangibleValue = (fleetValue * multiplier) + humanCapitalBonus;
      const totalValue = fleetValue + intangibleValue;
      
      const report = {
        tangibleValue: fleetValue,
        intangibleValue: intangibleValue,
        potentialGrowth: fleetValue * 0.8, // Potencial se tudo fosse 100%
        rating: intangibleScore > 80 ? 'A' : intangibleScore > 50 ? 'B' : 'C',
        details: answers
      };

      guardianEngine.saveValuation(report); // Salvar no sistema
      setResult(report);
      setIsCalculating(false);
      onComplete(); // Notifica pai para refresh
    }, 5000); // Tempo total aumentado para mostrar a narrativa
  };

  if (result) {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in-up">
        <div className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-hlx-gold/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="p-8 text-center bg-gradient-to-b from-slate-800 to-slate-900 relative">
             <div className="absolute top-4 right-4">
                <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24}/></button>
             </div>
             <div className="inline-flex p-3 rounded-full bg-hlx-gold/20 text-hlx-gold mb-4 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-pulse">
                <Gem size={48} />
             </div>
             <h2 className="text-3xl font-display font-bold text-white mb-2">Seu Ouro Corporativo</h2>
             <p className="text-gray-400">Valuation Helonex (Ativos Tangíveis + Intangíveis)</p>
          </div>

          <div className="p-8 space-y-8">
             {/* Total Value Hero */}
             <div className="text-center mb-8">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Valor Total do Negócio (Enterprise Value)</p>
                <div className="text-5xl font-display font-bold text-white text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-hlx-gold to-orange-500">
                   R$ {(result.tangibleValue + result.intangibleValue).toLocaleString()}
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-xl border border-white/5 text-center">
                   <p className="text-xs text-gray-400 uppercase font-bold mb-1">Valor da Frota (Tangível)</p>
                   <p className="text-xl font-bold text-white">R$ {result.tangibleValue.toLocaleString()}</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-green-500/30 text-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-green-500/5"></div>
                   <p className="text-xs text-green-400 uppercase font-bold mb-1 flex items-center justify-center gap-1">
                      <TrendingUp size={12} /> Intangível (Marca/Time)
                   </p>
                   <p className="text-xl font-bold text-green-400">R$ {result.intangibleValue.toLocaleString()}</p>
                </div>
             </div>

             {/* Feedback sobre Capital Humano */}
             {result.details.humanCapital === 'gamification' ? (
                 <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-xl flex items-start gap-4">
                    <div className="p-2 bg-green-500/20 rounded-lg text-green-400 shrink-0">
                       <Users size={24} />
                    </div>
                    <div>
                       <h4 className="text-green-400 font-bold mb-1">Alquimia Completa: Retenção de Talentos</h4>
                       <p className="text-sm text-gray-300 leading-relaxed">
                          Você transformou o "chumbo" da rotatividade no "ouro" da equipe de elite. O mercado paga um prêmio alto por isso.
                       </p>
                    </div>
                 </div>
             ) : (
                 <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl flex items-start gap-4">
                    <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400 shrink-0">
                       <AlertTriangle size={24} />
                    </div>
                    <div>
                       <h4 className="text-yellow-400 font-bold mb-1">Resíduo Detectado: Capital Humano</h4>
                       <p className="text-sm text-gray-300 leading-relaxed">
                          Sua empresa vale menos porque ainda carrega o peso da rotatividade. 
                          <br/><strong>Transmutação:</strong> Ative o Módulo de Premiação para blindar sua equipe.
                       </p>
                    </div>
                 </div>
             )}

             <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl flex items-start gap-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 shrink-0">
                   <BrainCircuit size={24} />
                </div>
                <div>
                   <h4 className="text-blue-400 font-bold mb-1">Oportunidade de Ouro</h4>
                   <p className="text-sm text-gray-300 leading-relaxed">
                      Existe um potencial oculto de <strong>R$ {result.potentialGrowth.toLocaleString()}</strong> na sua operação. 
                      Use a Gestão da Qualidade para refinar esses processos.
                   </p>
                </div>
             </div>

             <button onClick={onClose} className="w-full py-4 bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                SALVAR PLANO DE VALORIZAÇÃO
                <ArrowRight size={20} />
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in-up">
      <div className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-white/10">
                 <span className="font-display font-bold text-white">{step + 1}</span>
              </div>
              <div>
                 <h3 className="text-white font-bold text-lg">Raio-X de Prosperidade</h3>
                 <p className="text-xs text-gray-400">{questions[step].category}</p>
              </div>
           </div>
           <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={24}/></button>
        </div>

        {/* Content */}
        {isCalculating ? (
           <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-900/50">
              <div className="relative mb-8">
                 <Sparkles size={80} className="text-hlx-gold animate-spin-slow" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Gem size={32} className="text-white animate-pulse" />
                 </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 animate-fade-in-up key={alchemicalStage}">
                 {alchemicalStage}
              </h3>
              
              <div className="w-64 bg-slate-800 h-2 rounded-full overflow-hidden mt-4 mx-auto">
                 <div className="h-full bg-gradient-to-r from-gray-600 via-hlx-gold to-white animate-[loading_5s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
              </div>
              
              <p className="text-gray-400 text-sm mt-4 italic">
                 "Do Chumbo dos dados brutos ao Ouro da Gestão."
              </p>
           </div>
        ) : (
           <div className="flex-1 p-8 flex flex-col">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8 leading-tight">
                 {questions[step].question}
              </h2>

              <div className="space-y-4 flex-1">
                 {questions[step].options.map((opt: any, idx: number) => (
                    <button 
                       key={idx}
                       onClick={() => handleAnswer(opt)}
                       className="w-full text-left p-5 rounded-xl bg-slate-800 border border-white/5 hover:border-hlx-gold hover:bg-slate-700 transition-all group flex items-center justify-between"
                    >
                       <span className="text-gray-300 font-medium group-hover:text-white">{opt.label}</span>
                       <ArrowRight size={18} className="text-gray-600 group-hover:text-hlx-gold opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                 ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-start gap-3">
                 <ShieldCheck size={20} className="text-hlx-gold shrink-0 mt-1" />
                 <p className="text-sm text-gray-400 italic">
                    <strong>Insight Helonex:</strong> {questions[step].insight}
                 </p>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default PatrimonialDiagnostic;
