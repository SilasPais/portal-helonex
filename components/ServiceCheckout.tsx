
import React, { useState } from 'react';
import { 
  CheckCircle, CreditCard, Upload, User, 
  ArrowRight, ShieldCheck, Gift, Loader2, X 
} from 'lucide-react';
import { UserContext, UserPersona, MacroSegment } from '../types';

interface ServiceCheckoutProps {
  serviceId: string;
  serviceTitle: string;
  price: string;
  onClose: () => void;
  onSuccess: (context: UserContext) => void;
  existingContext?: UserContext | null;
}

const ServiceCheckout: React.FC<ServiceCheckoutProps> = ({ 
  serviceId, serviceTitle, price, onClose, onSuccess, existingContext 
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [macro, setMacro] = useState<MacroSegment | ''>('');
  const [persona, setPersona] = useState<UserPersona | ''>('');
  const [name, setName] = useState('');
  const [doc, setDoc] = useState('');

  React.useEffect(() => {
    if (existingContext) {
      setMacro(existingContext.macro);
      setPersona(existingContext.persona);
      setStep(2); // Pula identificação se já existe contexto
    }
  }, [existingContext]);

  const handleNext = () => {
    if (step === 1 && (!macro || !persona)) return;
    if (step === 3 && (!name || !doc)) return;
    setStep(prev => prev + 1);
  };

  const handlePayment = () => {
    setLoading(true);
    // Simulação de processamento
    setTimeout(() => {
      setLoading(false);
      setStep(5); // Sucesso
    }, 2000);
  };

  const handleFinish = () => {
    // Cria ou atualiza o contexto do usuário
    const newContext: UserContext = existingContext ? {
      ...existingContext,
      mode: 'FULL_MANAGEMENT' // Upgrade de modo se já for cliente
    } : {
      macro: macro as MacroSegment,
      persona: persona as UserPersona,
      goal: 'GROW', // Assumindo que quem contrata quer crescer
      mode: 'FULL_MANAGEMENT',
      needsOnboarding: false
    };
    onSuccess(newContext);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950">
          <div>
            <h2 className="text-xl font-bold text-white">Contratação Segura</h2>
            <p className="text-xs text-gray-400">Ambiente Criptografado Helonex</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1">
          <div 
            className="bg-hlx-gold h-full transition-all duration-500" 
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          
          {/* STEP 1: PERFIL (PERSONA) */}
          {step === 1 && (
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-2xl font-bold text-white">Vamos personalizar sua experiência</h3>
              <p className="text-gray-400">Para configurar sua licença corretamente, precisamos saber seu perfil operacional.</p>
              
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-300 uppercase">Qual seu segmento principal?</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setMacro('CARGO')}
                    className={`p-4 rounded-xl border text-left transition-all ${macro === 'CARGO' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-white/10 text-gray-400 hover:bg-slate-700'}`}
                  >
                    <span className="block font-bold mb-1">Cargas</span>
                    <span className="text-xs opacity-80">Caminhões, Carretas, VUCs</span>
                  </button>
                  <button 
                    onClick={() => setMacro('PASSENGER')}
                    className={`p-4 rounded-xl border text-left transition-all ${macro === 'PASSENGER' ? 'bg-green-600 border-green-400 text-white' : 'bg-slate-800 border-white/10 text-gray-400 hover:bg-slate-700'}`}
                  >
                    <span className="block font-bold mb-1">Passageiros</span>
                    <span className="text-xs opacity-80">Ônibus, Vans, Escolar</span>
                  </button>
                </div>
              </div>

              {macro && (
                <div className="space-y-4 animate-fade-in">
                  <label className="block text-sm font-bold text-gray-300 uppercase">Qual seu modelo de trabalho?</label>
                  <div className="grid grid-cols-1 gap-3">
                    {macro === 'CARGO' ? (
                      <>
                        <button onClick={() => setPersona('TAC')} className={`p-3 rounded-lg border text-left ${persona === 'TAC' ? 'bg-hlx-gold text-slate-900 border-yellow-400 font-bold' : 'bg-slate-800 border-white/10 text-gray-400'}`}>Sou Autônomo (TAC)</button>
                        <button onClick={() => setPersona('ETC')} className={`p-3 rounded-lg border text-left ${persona === 'ETC' ? 'bg-hlx-gold text-slate-900 border-yellow-400 font-bold' : 'bg-slate-800 border-white/10 text-gray-400'}`}>Sou Transportadora (ETC)</button>
                        <button onClick={() => setPersona('SHIPPER')} className={`p-3 rounded-lg border text-left ${persona === 'SHIPPER' ? 'bg-hlx-gold text-slate-900 border-yellow-400 font-bold' : 'bg-slate-800 border-white/10 text-gray-400'}`}>Sou Embarcador (Indústria/Agro)</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setPersona('PASS_CHARTER_EVENTUAL')} className={`p-3 rounded-lg border text-left ${persona === 'PASS_CHARTER_EVENTUAL' ? 'bg-hlx-gold text-slate-900 border-yellow-400 font-bold' : 'bg-slate-800 border-white/10 text-gray-400'}`}>Turismo Eventual</button>
                        <button onClick={() => setPersona('PASS_CHARTER_CONT')} className={`p-3 rounded-lg border text-left ${persona === 'PASS_CHARTER_CONT' ? 'bg-hlx-gold text-slate-900 border-yellow-400 font-bold' : 'bg-slate-800 border-white/10 text-gray-400'}`}>Fretamento Contínuo (Fábricas)</button>
                        <button onClick={() => setPersona('PASS_SCHOOL')} className={`p-3 rounded-lg border text-left ${persona === 'PASS_SCHOOL' ? 'bg-hlx-gold text-slate-900 border-yellow-400 font-bold' : 'bg-slate-800 border-white/10 text-gray-400'}`}>Transporte Escolar</button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: REVISÃO & PROMOÇÃO */}
          {step === 2 && (
            <div className="space-y-6 animate-slide-up">
              <div className="bg-gradient-to-r from-hlx-gold to-orange-500 p-1 rounded-2xl">
                <div className="bg-slate-900 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Gift size={120} /></div>
                  <div className="relative z-10">
                    <span className="bg-white text-slate-900 text-xs font-black px-2 py-1 rounded uppercase tracking-widest mb-2 inline-block">Oferta Exclusiva</span>
                    <h3 className="text-2xl font-bold text-white mb-2">Contrate Agora e Ganhe</h3>
                    <p className="text-gray-300 mb-4">Ao finalizar a contratação do <strong>{serviceTitle}</strong>, você ganha automaticamente:</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-white font-bold"><CheckCircle className="text-green-400" size={18} /> 12 Meses de Assinatura Helonex PRO</li>
                      <li className="flex items-center gap-2 text-white font-bold"><CheckCircle className="text-green-400" size={18} /> Acesso ao Mentor IA 24h</li>
                      <li className="flex items-center gap-2 text-white font-bold"><CheckCircle className="text-green-400" size={18} /> Plano de Carreira Personalizado</li>
                    </ul>
                    <div className="text-3xl font-bold text-hlx-gold">{price} <span className="text-sm text-gray-500 font-normal line-through"> + R$ 997/ano</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DADOS CADASTRAIS */}
          {step === 3 && (
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-2xl font-bold text-white">Dados do Titular</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nome Completo / Razão Social</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-hlx-gold outline-none"
                    placeholder="Digite aqui..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">CPF / CNPJ</label>
                  <input 
                    type="text" 
                    value={doc}
                    onChange={e => setDoc(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:border-hlx-gold outline-none"
                    placeholder="000.000.000-00"
                  />
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Upload size={18} className="text-blue-400"/> Upload de Documentos (Opcional agora)</h4>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-white/30 transition-colors cursor-pointer bg-slate-950/50">
                    <p className="text-gray-400 text-sm">Arraste seus documentos aqui ou clique para selecionar</p>
                    <p className="text-xs text-gray-600 mt-2">(CNH, CRLV, Contrato Social)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PAGAMENTO */}
          {step === 4 && (
            <div className="space-y-6 animate-slide-up text-center">
              <h3 className="text-2xl font-bold text-white">Pagamento Seguro</h3>
              <p className="text-gray-400">Ambiente criptografado de ponta a ponta.</p>
              
              <div className="bg-white p-6 rounded-xl max-w-sm mx-auto">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg" alt="Pix" className="h-8 mx-auto mb-4" />
                <div className="bg-gray-100 p-4 rounded border border-gray-200 mb-4">
                  <div className="w-48 h-48 bg-gray-900 mx-auto mb-2 flex items-center justify-center text-white text-xs">QR CODE MOCK</div>
                  <p className="text-xs text-gray-500 font-mono break-all">00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913Helonex Tech6008Sao Paulo62070503***6304E2CA</p>
                </div>
                <p className="text-sm font-bold text-gray-800">Valor: {price}</p>
              </div>

              <button 
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle /> Confirmar Pagamento</>}
              </button>
            </div>
          )}

          {/* STEP 5: SUCESSO */}
          {step === 5 && (
            <div className="text-center space-y-6 animate-fade-in py-8">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                <CheckCircle size={48} className="text-white" />
              </div>
              <h2 className="text-3xl font-display font-bold text-white">Parabéns!</h2>
              <p className="text-gray-300 text-lg max-w-md mx-auto">
                Seu pedido foi recebido e sua <strong>Assinatura PRO</strong> já está ativa.
              </p>
              <div className="bg-slate-800 p-6 rounded-xl max-w-md mx-auto border border-white/10">
                <h4 className="text-hlx-gold font-bold mb-2">Próximos Passos:</h4>
                <ul className="text-left text-sm text-gray-400 space-y-2">
                  <li className="flex items-center gap-2"><ArrowRight size={14} className="text-blue-400"/> Nossa equipe analisará seus documentos em até 2h.</li>
                  <li className="flex items-center gap-2"><ArrowRight size={14} className="text-blue-400"/> Você receberá notificações via WhatsApp.</li>
                  <li className="flex items-center gap-2"><ArrowRight size={14} className="text-blue-400"/> Seu painel de gestão já está liberado.</li>
                </ul>
              </div>
              <button 
                onClick={handleFinish}
                className="bg-hlx-gold text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-yellow-400 transition-colors shadow-lg"
              >
                Acessar Meu Painel
              </button>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        {step < 4 && (
          <div className="p-6 border-t border-white/10 bg-slate-950 flex justify-between">
            {step > 1 ? (
              <button onClick={() => setStep(prev => prev - 1)} className="text-gray-400 hover:text-white font-bold px-4 py-2">Voltar</button>
            ) : (
              <div></div>
            )}
            <button 
              onClick={handleNext}
              disabled={step === 1 && (!macro || !persona) || step === 3 && (!name || !doc)}
              className="bg-hlx-blue text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {step === 2 ? 'Continuar para Dados' : step === 3 ? 'Ir para Pagamento' : 'Próximo'} <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCheckout;
