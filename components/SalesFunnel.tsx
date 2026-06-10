
import React, { useState } from 'react';
import { 
  CheckCircle, Zap, Shield, Globe, Lock, ArrowRight, PlayCircle, 
  Truck, Bus, Anchor, Layers, Calculator, Crown, Sun, Briefcase, 
  Gavel, GraduationCap, Handshake, Eye, Activity, Star, ChevronDown, 
  Magnet, Server, Database, TrendingDown, AlertOctagon, Scale
} from 'lucide-react';

interface SalesFunnelProps {
  onBuyAccess: () => void;
  onBack: () => void;
}

const SalesFunnel: React.FC<SalesFunnelProps> = ({ onBuyAccess, onBack }) => {
  const [activeTab, setActiveTab] = useState<'individual' | 'corporate'>('individual');

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden pb-24">
      
      {/* HERO SECTION */}
      <div className="relative pt-24 pb-12 px-4 text-center bg-[url('https://images.unsplash.com/photo-1492138786289-d35ea832da43?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-slate-900/90 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-900"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto animate-fade-in-up">
          <span className="inline-block py-1.5 px-4 rounded-full bg-hlx-gold/20 text-hlx-gold border border-hlx-gold/30 text-[10px] font-bold uppercase tracking-widest mb-6 animate-pulse">
            <Crown size={14} className="inline mr-1" /> Modelo de Negócio 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
            Sistemas Operacional <br/>
            <span className="text-hlx-gold">da Luz (S-O-L).</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Do cadastro gratuito à blindagem corporativa. Escolha o nível de soberania que sua operação exige hoje.
          </p>

          <div className="flex justify-center gap-4 mb-12">
             <button 
                onClick={() => setActiveTab('individual')}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeTab === 'individual' ? 'bg-hlx-gold text-slate-900' : 'bg-slate-800 text-gray-400 border border-white/10'}`}
             >
                Para Motoristas & Pequenas Frotas
             </button>
             <button 
                onClick={() => setActiveTab('corporate')}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeTab === 'corporate' ? 'bg-hlx-blue text-white' : 'bg-slate-800 text-gray-400 border border-white/10'}`}
             >
                Para Médias & Grandes Empresas
             </button>
          </div>
        </div>
      </div>

      {/* ARQUITETURA DE NEGÓCIO */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {activeTab === 'individual' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* PILAR 1: O ÍMÃ (FREEMIUM) */}
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all flex flex-col">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                        <Magnet size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Acesso Gratuito</h3>
                    <p className="text-sm text-gray-400 mb-6 min-h-[40px]">A porta de entrada. Regularize-se sem custo e entre para a comunidade.</p>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-start gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/> 
                            <div>
                                <strong>RNTRC Digital Assistido</strong>
                                <p className="text-xs text-gray-500">Validador de requisitos automático.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/> 
                            <div>
                                <strong>Raio-X de Conformidade</strong>
                                <p className="text-xs text-gray-500">Diagnóstico de IQT e Multas.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0"/> 
                            <div>
                                <strong>NewsBoard Oficial</strong>
                                <p className="text-xs text-gray-500">Monitoramento do DOU em tempo real.</p>
                            </div>
                        </li>
                    </ul>
                    <button onClick={onBuyAccess} className="w-full py-3 border border-white/10 rounded-xl text-sm font-bold text-gray-300 hover:bg-white/5">
                        Criar Conta Grátis
                    </button>
                </div>

                {/* PILAR 2: A ASSINATURA (RECORRÊNCIA) - CORE */}
                <div className="bg-slate-900 border-2 border-hlx-gold rounded-2xl p-8 relative transform md:-translate-y-4 shadow-2xl shadow-hlx-gold/10 flex flex-col">
                    <div className="absolute top-0 right-0 bg-hlx-gold text-slate-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">Recomendado</div>
                    <div className="w-12 h-12 bg-hlx-gold rounded-full flex items-center justify-center mb-6">
                        <Shield size={24} className="text-slate-900" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Helonex Guardião</h3>
                    <p className="text-sm text-gray-400 mb-6 min-h-[40px]">Manutenção preventiva da saúde jurídica e operacional da sua empresa.</p>
                    
                    <div className="mb-6">
                        <span className="text-3xl font-bold text-white">R$ 29,90</span><span className="text-gray-500 text-sm">/mês</span>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-start gap-3 text-sm text-white">
                            <CheckCircle size={16} className="text-hlx-gold mt-0.5 shrink-0"/> 
                            <div>
                                <strong>Monitoramento 360°</strong>
                                <p className="text-xs text-gray-400">Varredura diária de CNH, RNTRC e Multas.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-white">
                            <CheckCircle size={16} className="text-hlx-gold mt-0.5 shrink-0"/> 
                            <div>
                                <strong>Mentor IA Ilimitado</strong>
                                <p className="text-xs text-gray-400">Consultas sobre Lei 14.599 e Seguros.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-white">
                            <CheckCircle size={16} className="text-hlx-gold mt-0.5 shrink-0"/> 
                            <div>
                                <strong>Clube de Vantagens Ativo</strong>
                                <p className="text-xs text-gray-400">Descontos reais em Pneus e Diesel.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-white">
                            <CheckCircle size={16} className="text-hlx-gold mt-0.5 shrink-0"/> 
                            <div>
                                <strong>Cloud Documental</strong>
                                <p className="text-xs text-gray-400">Gestão de CRLV-e, Apólices e Laudos.</p>
                            </div>
                        </li>
                    </ul>
                    <button onClick={onBuyAccess} className="w-full py-4 bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg">
                        Assinar Guardião
                    </button>
                </div>

                {/* PILAR 3: PAY-PER-USE (BALCÃO DE SERVIÇOS) */}
                <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/50 transition-all flex flex-col">
                    <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                        <Briefcase size={24} className="text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Balcão de Serviços</h3>
                    <p className="text-sm text-gray-400 mb-6 min-h-[40px]">Soluções de alta complexidade ("Cirurgias") contratadas sob demanda.</p>
                    
                    <div className="space-y-4 mb-8 flex-1">
                        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                            <div>
                                <span className="text-gray-300 flex items-center gap-2"><Gavel size={14} className="text-red-400"/> JusTech (Recursos)</span>
                                <p className="text-[9px] text-gray-500 ml-6">*Multas &gt; R$ 1.500</p>
                            </div>
                            <span className="text-blue-400 font-bold text-right">R$ 550 + 7,5%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                            <span className="text-gray-300 flex items-center gap-2"><Globe size={14} className="text-green-400"/> Licenças (AET/TRIC)</span>
                            <span className="text-blue-400 font-bold">Sob Consulta</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                            <span className="text-gray-300 flex items-center gap-2"><Handshake size={14} className="text-hlx-gold"/> Helonex Resolve (ODR)</span>
                            <span className="text-blue-400 font-bold">R$ 550 + 7,5%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                            <span className="text-gray-300 flex items-center gap-2"><GraduationCap size={14} className="text-purple-400"/> EduTech Premium</span>
                            <span className="text-blue-400 font-bold">Por Curso</span>
                        </div>
                    </div>
                    
                    <button className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors">
                        Ver Tabela Completa
                    </button>
                </div>

            </div>
        ) : (
            <div className="animate-fade-in space-y-8">
                
                {/* HEADLINE B2B */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-display font-bold text-white mb-2">
                        Blindagem de Frota & <span className="text-hlx-blue">JusTech Corporativo</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Sistema integrado de monitoramento e defesa. Pague pelo volume da sua frota e tenha uma banca jurídica digital à disposição.
                    </p>
                </div>

                {/* TABELA DE GRADUAÇÃO (TIERED PRICING) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* TIER 1: PEQUENAS FROTAS */}
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all flex flex-col">
                        <div className="mb-4">
                            <span className="text-xs font-bold bg-slate-800 text-gray-400 px-2 py-1 rounded uppercase">Start</span>
                            <h3 className="text-xl font-bold text-white mt-2">1 a 10 Veículos</h3>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">R$ 35,00</span>
                            <span className="text-gray-500 text-sm">/placa/mês</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm text-gray-400"><CheckCircle size={14} className="text-green-500"/> Monitoramento 24h</li>
                            <li className="flex items-center gap-2 text-sm text-gray-400"><CheckCircle size={14} className="text-green-500"/> Alertas via WhatsApp</li>
                            <li className="flex items-center gap-2 text-sm text-gray-400"><CheckCircle size={14} className="text-green-500"/> Painel Básico</li>
                        </ul>
                        <button onClick={onBuyAccess} className="w-full py-3 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/5">
                            Começar Agora
                        </button>
                    </div>

                    {/* TIER 2: MÉDIAS FROTAS (ALVO) */}
                    <div className="bg-slate-900 border-2 border-hlx-gold rounded-2xl p-6 relative transform md:-translate-y-2 shadow-2xl shadow-hlx-gold/10 flex flex-col">
                        <div className="absolute top-0 right-0 bg-hlx-gold text-slate-900 text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase">Melhor Custo-Benefício</div>
                        <div className="mb-4">
                            <span className="text-xs font-bold bg-hlx-gold/20 text-hlx-gold px-2 py-1 rounded uppercase">Standard</span>
                            <h3 className="text-xl font-bold text-white mt-2">11 a 50 Veículos</h3>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">R$ 25,00</span>
                            <span className="text-gray-500 text-sm">/placa/mês</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm text-white"><CheckCircle size={14} className="text-hlx-gold"/> <strong>Monitoramento 24h</strong></li>
                            <li className="flex items-center gap-2 text-sm text-white"><CheckCircle size={14} className="text-hlx-gold"/> <strong>JusTech Híbrido Ativo</strong></li>
                            <li className="flex items-center gap-2 text-sm text-white"><CheckCircle size={14} className="text-hlx-gold"/> Painel Gestor de Frotas</li>
                            <li className="flex items-center gap-2 text-sm text-white"><CheckCircle size={14} className="text-hlx-gold"/> Relatórios Gerenciais</li>
                        </ul>
                        <button onClick={onBuyAccess} className="w-full py-3 bg-hlx-gold text-slate-900 font-bold rounded-xl text-sm hover:bg-yellow-400 shadow-lg">
                            Migrar Frota
                        </button>
                    </div>

                    {/* TIER 3: GRANDES FROTAS */}
                    <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all flex flex-col">
                        <div className="mb-4">
                            <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-1 rounded uppercase">Enterprise</span>
                            <h3 className="text-xl font-bold text-white mt-2">Acima de 51</h3>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">R$ 19,90</span>
                            <span className="text-gray-500 text-sm">/placa/mês</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center gap-2 text-sm text-gray-400"><CheckCircle size={14} className="text-blue-500"/> Tudo do plano Standard</li>
                            <li className="flex items-center gap-2 text-sm text-gray-400"><CheckCircle size={14} className="text-blue-500"/> API de Integração (ERP)</li>
                            <li className="flex items-center gap-2 text-sm text-gray-400"><CheckCircle size={14} className="text-blue-500"/> Gerente de Conta Dedicado</li>
                        </ul>
                        <button onClick={onBuyAccess} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors">
                            Falar com Consultor
                        </button>
                    </div>

                </div>

                {/* JUSTECH DETAIL BOX */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-red-500/20 rounded-xl text-red-400">
                                <Gavel size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Modelo JusTech B2B</h3>
                                <p className="text-gray-400 text-sm">Advocacia de Precisão sob Demanda</p>
                            </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Diferente de escritórios tradicionais que cobram mensalidades fixas altas, nós operamos no modelo de sucesso. Você paga uma taxa administrativa mínima por recurso protocolado e dividimos o ganho no êxito.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-slate-950 px-4 py-2 rounded-lg border border-white/5">
                                <span className="block text-[10px] text-gray-500 uppercase font-bold">Taxa de Recurso</span>
                                <span className="text-xl font-bold text-white">R$ 550,00</span>
                            </div>
                            <div className="bg-slate-950 px-4 py-2 rounded-lg border border-white/5">
                                <span className="block text-[10px] text-gray-500 uppercase font-bold">Taxa de Sucesso</span>
                                <span className="text-xl font-bold text-green-400">7,5%</span>
                                <span className="text-[10px] text-gray-500 ml-1">do valor economizado</span>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/3 w-full bg-slate-950 p-6 rounded-xl border border-white/5">
                        <h4 className="text-white font-bold text-sm mb-4 border-b border-white/10 pb-2">Simulação Real</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Multa Evitada:</span>
                                <span className="text-white font-bold">R$ 5.869,00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Custo Fixo:</span>
                                <span className="text-red-400">R$ 550,00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Êxito (7,5%):</span>
                                <span className="text-red-400">R$ 440,17</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-white/10">
                                <span className="text-green-400 font-bold">Economia Líquida:</span>
                                <span className="text-green-400 font-bold">R$ 4.878,83</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )}

      </div>

      {/* CTA FINAL */}
      <div className="py-12 px-4 text-center relative z-10 mt-12">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
            Inovação "Business Lego": O DIY da sua Carreira.
          </h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm">
            Construa sua empresa nível por nível. O sistema carrega os POPs operacionais e PAPs de gestão automaticamente.
          </p>

          <button 
            onClick={onBuyAccess}
            className="w-full md:w-auto px-12 py-5 text-xl font-bold text-slate-900 bg-hlx-gold rounded-xl hover:bg-yellow-400 transition-colors shadow-2xl shadow-yellow-500/20 flex items-center justify-center gap-3 mx-auto"
          >
            COMEÇAR MINHA JORNADA <ArrowRight size={24} />
          </button>
      </div>

    </div>
  );
};

export default SalesFunnel;
