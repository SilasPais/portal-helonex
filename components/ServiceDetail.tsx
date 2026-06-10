
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, FileText, Shield, Scale, Clock, Bot, Loader2, Send, ChevronRight, ShieldAlert, Handshake, Gavel, AlertTriangle, TrendingUp } from 'lucide-react';
import { sendMessageToMentor } from '../services/geminiService';
import ServiceCheckout from './ServiceCheckout';
import AiAlert from '../src/shared/AiAlert';
import { UserContext } from '../types';

const SERVICE_DETAILS: Record<string, any> = {
  'tric-otm': {
    title: 'Habilitação Internacional (TRIC/OTM)',
    description: 'Licença Originária para Transporte Rodoviário Internacional de Cargas (Mercosul) e Operador de Transporte Multimodal.',
    price: 'Sob Consulta (Projeto)',
    paymentConditions: 'Parcelamento em até 12x.',
    timeline: '90 a 120 dias (ANTT)',
    legalBasis: 'Acordo ATIT (Mercosul) & Lei 9.611/98 (OTM)',
    requirements: [
      'Capital Social Integralizado (R$ 130k+).',
      'Frota Própria Mínima (Cavalos Mecânicos).',
      'Certidões Negativas Federais/Estaduais.'
    ],
    documents: ['Contrato Social Consolidado', 'CRLV da Frota', 'Balanço Patrimonial'],
    warning: 'A habilitação internacional exige idoneidade financeira comprovada. Nossa IA pré-audita seu balanço antes do protocolo.',
    risks: [
      'Apreensão de veículo em fronteira.',
      'Multas aduaneiras em dólar.',
      'Perda de carga por falta de MIC/DTA.'
    ],
    benefits: [
      'Fretes em Dólar (Receita Cambial).',
      'Isenção de ICMS na exportação.',
      'Acesso a cargas de alto valor agregado.'
    ]
  },
  'rntrc-tac': {
    title: 'RNTRC Digital - Autônomo (TAC)',
    description: 'Soberania Digital para o motorista autônomo. Regularização direta na ANTT sem dependência de terceiros.',
    price: 'GRÁTIS (Módulo IDT)',
    paymentConditions: 'Incluso no Plano Helonex Pro.',
    timeline: 'Instantâneo via API Gov.br',
    legalBasis: 'Resolução ANTT nº 5.982/2022',
    requirements: [
      'Conta Gov.br Nível Prata ou Ouro.',
      'CPF Regular sem dívidas impeditivas na ANTT.',
      'Veículo em nome do titular com placa vermelha.'
    ],
    documents: ['CNH Digital', 'CRLV-e', 'Selfie para Prova de Vida'],
    warning: 'ALERTA ERRO ZERO: Não pague despachantes para emitir um documento que é seu direito gratuito. Use nossa Tecnologia IDT.',
    risks: [
      'Multa de R$ 3.000,00 por transporte irregular.',
      'Apreensão do veículo em fiscalização.',
      'Impedimento de carregar em grandes embarcadores.'
    ],
    benefits: [
      'Acesso a fretes diretos sem atravessadores.',
      'Isenção de Vale-Pedágio Obrigatório.',
      'Linhas de crédito exclusivas para caminhoneiros.'
    ]
  },
  'passengers-charter': {
    title: 'Fretamento Interestadual (TAF)',
    description: 'Habilitação ANTT para empresas de turismo e fretamento contínuo sob a nova regra de Regulação Responsiva.',
    price: 'R$ 3.200,00',
    paymentConditions: 'Investimento Anual ou 12x.',
    timeline: '45 a 60 dias (Monitorado)',
    legalBasis: 'Resolução ANTT 4.777 & Novo Marco 6.033',
    requirements: [
      'Idade Máxima Frota (Micro/Van): 15 anos.',
      'Ônibus > 15 anos: Laudo ITL Semestral Obrigatório.',
      'Capital Social Integralizado conforme frota.',
      'SAC 0800 Ativo (Evite multa de R$ 5.813,00).'
    ],
    documents: ['Contrato Social', 'Certidões Negativas', 'Seguro APP R$ 4.2M'],
    warning: 'PONTO CRÍTICO: A ausência de SAC 0800 ativo gera multa imediata de R$ 5.813,00 por CNPJ conforme Portaria 2026.',
    risks: [
      'Multa de R$ 7.500,00 por viagem clandestina.',
      'Transbordo de passageiros em rodovia.',
      'Responsabilidade criminal em caso de acidente.'
    ],
    benefits: [
      'Autorização para viagens em todo território nacional.',
      'Emissão de Monitriip simplificada.',
      'Acesso a licitações públicas de transporte.'
    ]
  },
  'insurance': {
    title: 'Seguros Obrigatórios Lei 14.599',
    description: 'Monitoramento e intercâmbio automático de apólices RCTR-C, RC-DC e RC-V para o barramento ANTT.',
    price: 'Sob Cotação',
    paymentConditions: 'Averbado via sistema.',
    timeline: '24h para Homologação',
    legalBasis: 'Lei 14.599/2023 | SUROC 27',
    requirements: [
      'RNTRC Ativo.',
      'Transmissão XML até 10/03/2026 (Risco de suspensão).',
      'Validação de intercâmbio automática seguradora-ANTT.'
    ],
    documents: ['Apólice Vigente', 'Dados da Carga', 'XML do CT-e'],
    warning: 'A não averbação de seguro anula a validade do RNTRC e expõe a empresa a responsabilidade civil total em caso de sinistro.',
    risks: [
      'Suspensão imediata do RNTRC.',
      'Pagamento integral da carga em caso de roubo.',
      'Multa por averbação não realizada.'
    ],
    benefits: [
      'Conformidade automática com a Lei 14.599.',
      'Proteção patrimonial total.',
      'Redução no custo do seguro pela gestão de risco.'
    ]
  },
  'rntrc-etc': {
    title: 'Gestão de Frota (ETC)',
    description: 'Auditoria de Responsáveis Técnicos (RT) e regularização de frota ilimitada conforme Resolução 5.982.',
    price: 'Sob Consulta (Plano PRO)',
    paymentConditions: 'Incluso no Plano Helonex Pro.',
    timeline: '5 dias úteis',
    legalBasis: 'Resolução ANTT nº 5.982/2022',
    requirements: [
      'CNPJ Ativo com CNAE de transporte.',
      'Responsável Técnico (RT) com certificação válida.',
      'Frota com CRLV-e em nome da empresa.'
    ],
    documents: ['Contrato Social', 'Documentos do RT', 'CRLV-e da Frota'],
    warning: 'A falta de um RT válido pode suspender toda a sua operação. Nosso sistema monitora isso 24/7.',
    risks: [
      'Multa por falta de Responsável Técnico.',
      'Bloqueio de emissão de CTe.',
      'Perda de contratos corporativos.'
    ],
    benefits: [
      'Gestão ilimitada de veículos na frota.',
      'Auditoria automática de vencimentos.',
      'Painel de gestão de motoristas incluso.'
    ]
  },
  'fines': {
    title: 'Radar de Multas (JusTech)',
    description: 'Monitoramento diário de infrações de trânsito e ANTT. Análise de nulidade via IA e geração de recursos.',
    price: 'R$ 29,90/mês',
    paymentConditions: 'Recursos cobrados à parte (Success Fee).',
    timeline: 'Monitoramento Diário',
    legalBasis: 'CTB / Resoluções CONTRAN',
    requirements: [
      'Renavam dos veículos cadastrado.',
      'CNPJ/CPF do proprietário.',
      'Adesão ao SNE (Opcional).'
    ],
    documents: ['Notificação da Autuação', 'CNH do Condutor'],
    warning: 'Não perca o prazo de indicação de condutor. Multas NIC dobram o valor da infração.',
    crossSell: {
      title: 'Disputa Complexa? (Frete/Estadia)',
      description: 'Para conflitos contratuais, falta de pagamento ou avarias, use nossa Corte Digital.',
      linkId: 'helonex-resolve',
      linkLabel: 'ACESSAR HELONEX RESOLVE (ODR)'
    },
    risks: [
      'Suspensão da CNH por pontuação.',
      'Multas NIC (Não Indicação de Condutor) dobradas.',
      'Bloqueio de licenciamento do veículo.'
    ],
    benefits: [
      'Habilitamos o desconto de 40% via SNE caso o recurso não seja estratégico.',
      'Anulação de multas com vícios processuais.',
      'Gestão centralizada de toda a frota.'
    ]
  },
  'helonex-resolve': {
    title: 'Helonex Resolve (ODR)',
    description: 'Corte Arbitral Digital para resolução de conflitos logísticos (Estadia, Avarias, Inadimplência) com validade jurídica extrajudicial.',
    price: 'R$ 550,00',
    paymentConditions: '+ 7,5% de Taxa de Êxito (Somente se receber).',
    timeline: 'Acordo em média de 5 a 10 dias',
    legalBasis: 'Lei 13.140/2015 (Mediação) e Art. 840 CC',
    requirements: [
      'Evidências documentais (CT-e, Canhoto, E-mails).',
      'Aceite dos Termos de Mediação.',
      'Pagamento da Taxa de Abertura (Setup).'
    ],
    documents: ['Contrato de Transporte', 'Comprovante de Entrega', 'Troca de Mensagens'],
    warning: 'A mediação online é 90% mais rápida e barata que a justiça comum. O acordo gerado aqui é um Título Executivo Extrajudicial.',
    iconSuffix: <Shield size={14} className="inline ml-1 text-hlx-gold" />,
    risks: [
      'Processos judiciais lentos (3 a 5 anos).',
      'Custos advocatícios elevados.',
      'Perda do cliente por conflito mal gerido.'
    ],
    benefits: [
      'Resolução em dias, não anos.',
      'Validade jurídica de sentença judicial.',
      'Preservação do relacionamento comercial.'
    ]
  },
  'helonex-vision': {
    title: 'Helonex Vision (Auditoria Visual)',
    description: 'Sistema de processamento de imagens em tempo real integrado a banco de dados normativo (ISO/SASSMAQ).',
    price: 'Sob Cotação (Projeto Customizado)',
    paymentConditions: 'Implantação + Mensalidade de Monitoramento.',
    timeline: '15 a 30 dias para Setup',
    legalBasis: 'Normas ISO 9001, 14001, 45001 e Manual SASSMAQ',
    requirements: [
      'Infraestrutura de câmeras (IP/DVR) compatível.',
      'Conexão estável de internet.',
      'Adesão ao Plano Helonex Enterprise.'
    ],
    documents: ['Planta de Câmeras', 'Manual de Processos Internos', 'Termo de Privacidade de Dados'],
    warning: 'O diferencial não é gravar, é entender. O sistema identifica desvios normativos e propõe a correção imediata.',
    risks: [
      'Não conformidades críticas em auditorias presenciais.',
      'Acidentes de trabalho por falha de comportamento.',
      'Perda de certificações ISO/SASSMAQ.'
    ],
    benefits: [
      'Auditoria 24/7 sem custo de pessoal.',
      'Redução drástica de acidentes e multas.',
      'Treinamento contextual automático para a equipe.'
    ]
  }
};

interface ServiceDetailProps {
  serviceId: string;
  onBack: () => void;
  onConsultMentor: () => void;
  onNavigateToMap: () => void;
  onUpdateContext?: (context: UserContext) => void;
  userContext?: UserContext | null;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, onBack, onConsultMentor, onNavigateToMap, onUpdateContext, userContext }) => {
  const [currentId, setCurrentId] = useState(serviceId);
  const service = SERVICE_DETAILS[currentId];
  const [mentorQuestion, setMentorQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [mentorResponse, setMentorResponse] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const handleAskMentor = async () => {
    if (!mentorQuestion.trim() || !service) return;
    setIsAsking(true);
    setMentorResponse('');
    const context = `Contexto do Serviço: ${service.title}. Base Legal: ${service.legalBasis}.`;
    try {
      const response = await sendMessageToMentor(`${context}\n\nPERGUNTA DO USUÁRIO: ${mentorQuestion}`, []);
      setMentorResponse(response);
    } catch (error) {
      setMentorResponse('Ocorreu um erro ao consultar o mentor. Tente novamente.');
    } finally {
      setIsAsking(false);
    }
  };

  const handleNavigateToService = (id: string) => {
      setCurrentId(id);
      setMentorResponse('');
      setMentorQuestion('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckoutSuccess = (context: UserContext) => {
    setShowCheckout(false);
    if (onUpdateContext) {
      onUpdateContext(context);
    }
    // Redirecionar ou mostrar feedback
    onBack(); // Por enquanto volta para o catálogo, mas idealmente iria para o Dashboard
  };

  if (!service) {
    return (
      <div className="bg-slate-950 min-h-screen py-12 text-center text-white p-8">
        <h2 className="text-2xl font-bold mb-4">Serviço Não Encontrado</h2>
        <p className="text-gray-400 mb-6">O serviço que você está procurando não foi localizado.</p>
        <button onClick={onBack} className="bg-hlx-gold text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
          Voltar ao Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen py-12 animate-fade-in relative">
      {showCheckout && (
        <ServiceCheckout 
          serviceId={currentId}
          serviceTitle={service.title}
          price={service.price}
          onClose={() => setShowCheckout(false)}
          onSuccess={handleCheckoutSuccess}
          existingContext={userContext}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Catálogo
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{service.title}</h1>
              <p className="text-gray-300 text-lg">{service.description}</p>
            </div>
            
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
              <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><ShieldAlert size={20} /> ALERTA ERRO ZERO</h4>
              <p className="text-red-200/80 text-sm italic">
                "{service.warning}" 
                {service.iconSuffix}
              </p>
            </div>

            {/* NOVA SEÇÃO: RISCOS VS BENEFÍCIOS (O CONTRATO DE TER E NÃO TER) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950/50 p-5 rounded-xl border border-red-900/30">
                <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2 border-b border-red-900/30 pb-2 uppercase text-sm">
                  <AlertTriangle size={16} /> Riscos da Irregularidade
                </h3>
                <ul className="space-y-3">
                  {service.risks?.map((risk: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-red-500 mt-1">✕</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-950/50 p-5 rounded-xl border border-green-900/30">
                <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2 border-b border-green-900/30 pb-2 uppercase text-sm">
                  <TrendingUp size={16} /> Benefícios da Soberania
                </h3>
                <ul className="space-y-3">
                  {service.benefits?.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle size={14} className="text-green-500 mt-1 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800 p-5 rounded-xl border border-white/5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                  <CheckCircle size={18} className="text-green-400" /> Requisitos Essenciais
                </h3>
                <ul className="space-y-2">
                  {service.requirements.map((req: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                      <ChevronRight size={14} className="text-hlx-gold mt-1 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800 p-5 rounded-xl border border-white/5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                  <FileText size={18} className="text-blue-400" /> Documentos Necessários
                </h3>
                <ul className="space-y-2">
                  {service.documents.map((doc: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                      <ChevronRight size={14} className="text-hlx-gold mt-1 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Base Jurídica</h3>
              <div className="flex items-center gap-2 bg-slate-800 p-3 rounded-lg border border-white/10 w-fit">
                <Scale size={18} className="text-gray-400" />
                <span className="text-sm text-gray-300 font-mono">{service.legalBasis}</span>
              </div>
            </div>

            {/* CROSS SELL RESOLVE - LINK NO JUSTECH */}
            {service.crossSell && (
                <div className="mt-8 bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-500/30 p-6 rounded-xl flex items-center justify-between gap-6 group hover:border-hlx-gold/50 transition-all cursor-pointer" onClick={() => handleNavigateToService(service.crossSell.linkId)}>
                    <div>
                        <h4 className="text-white font-bold flex items-center gap-2 text-lg">
                            <Handshake className="text-hlx-gold" /> {service.crossSell.title}
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">{service.crossSell.description}</p>
                    </div>
                    <button className="bg-hlx-gold text-slate-900 font-bold px-4 py-3 rounded-lg text-xs whitespace-nowrap shadow-lg hover:bg-yellow-400 transition-colors flex items-center gap-2">
                        <Gavel size={16} /> {service.crossSell.linkLabel}
                    </button>
                </div>
            )}

          </div>

          <div className="space-y-6 sticky top-24">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="border-b border-white/10 pb-4 mb-4">
                <p className="text-sm text-gray-400 font-bold uppercase mb-1">Investimento</p>
                <h2 className="text-3xl font-bold text-white">{service.price}</h2>
                <p className="text-xs text-gray-500">{service.paymentConditions}</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-bold flex items-center gap-2"><Clock size={16} /> Prazo Estimado</span>
                <span className="text-white font-bold">{service.timeline}</span>
              </div>
            </div>

            <button 
              onClick={() => setShowCheckout(true)}
              className="w-full py-4 bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase hover:scale-[1.02] active:scale-[0.98]"
            >
              {currentId === 'helonex-resolve' ? 'ABRIR DISPUTA (R$ 550)' : 'INICIAR PROTOCOLO'}
            </button>
            
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Bot size={20} className="text-hlx-blue" /> Auditoria com IA
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                Tire suas dúvidas sobre este serviço diretamente com a Helô.
              </p>
              <textarea 
                value={mentorQuestion}
                onChange={(e) => setMentorQuestion(e.target.value)}
                placeholder="Ex: Qual o prazo para recorrer dessa multa?"
                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-hlx-blue outline-none resize-none h-20"
              />
              <button 
                onClick={handleAskMentor}
                disabled={isAsking}
                className="w-full mt-3 py-3 bg-hlx-blue hover:bg-blue-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAsking ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                Consultar
              </button>

              {mentorResponse && (
                <div className="mt-4 p-4 bg-slate-800/50 border border-white/10 rounded-lg animate-fade-in">
                  <p className="text-sm text-gray-300 whitespace-pre-wrap">{mentorResponse}</p>
                  <AiAlert />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
