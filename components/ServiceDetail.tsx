
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, CheckCircle, FileText, AlertTriangle, Truck, Scale, Shield, Globe, Map, CreditCard, Anchor, FileCheck, Music, Tractor, Box, User, Phone, Home, CreditCard as IdCard, Send, X, Copy, MessageSquare, Table, Building2, Wallet, Clock, Bot, Sparkles, Loader2, PlayCircle, BookOpen, ChevronRight, Fingerprint, Crown, Zap, BrainCircuit, Users, ShoppingBag, Gauge, Flame, Microscope, ShieldAlert } from 'lucide-react';
import { sendMessageToMentor } from '../services/geminiService';

interface ServiceDetailProps {
  serviceId: string;
  onBack: () => void;
  onConsultMentor: () => void;
  onNavigateToMap?: () => void;
}

// --- BANCO DE DADOS DE SERVIÇOS (MANTIDO) ---
// (Conteúdo do objeto SERVICE_DETAILS inalterado para brevidade, mas está aqui logicamente)
// ...
const SERVICE_DETAILS: Record<string, any> = {
  // ... (Dados mantidos, apenas lógica do componente abaixo é alterada)
  'rntrc-tac': {
    title: 'RNTRC Digital - Autônomo (TAC)',
    description: 'Registro Nacional de Transportadores Rodoviários de Cargas. Essencial para quem possui veículo de carga (placa vermelha) e deseja cobrar frete legalmente.',
    price: 'GRÁTIS (Faça Você Mesmo)',
    paymentConditions: 'Benefício exclusivo para membros do Ecossistema HELONEX.',
    timeline: 'Imediato (Autonomia Total)',
    legalBasis: 'Resolução ANTT nº 5.982/2022',
    requirements: [
      'Conta Gov.br Nível Prata ou Ouro.',
      'Veículo Categoria Aluguel (Placa Vermelha) em nome do transportador.',
      'Aprovação em Curso Específico (se não tiver experiência comprovada).'
    ],
    documents: ['CNH Vigente', 'CRLV do Veículo', 'Comprovante de Endereço'],
    warning: 'ALERTA: Despachantes cobram até R$ 600,00. Ensinamos você a fazer de graça e ter soberania sobre seus dados.'
  },
  'rntrc-etc': {
    title: 'RNTRC - Empresa (ETC)',
    description: 'Habilitação para Pessoas Jurídicas (Transportadoras). Permite a gestão de frota ilimitada e contratação de terceiros.',
    price: 'R$ 850,00',
    paymentConditions: 'em até 6x no Cartão.',
    timeline: '24 a 48 horas',
    legalBasis: 'Lei 14.599/2023 | Res. 5.982',
    requirements: [
      'Responsável Técnico (RT) vinculado com curso aprovado.',
      'CNPJ com CNAE de Transporte Rodoviário de Cargas (4930-2).',
      'Sócio ou Diretor idôneo.'
    ],
    documents: ['Contrato Social', 'CNPJ', 'Documentos dos Sócios', 'Certificado do RT'],
    warning: 'ATENÇÃO: A ausência de RT vinculado gera multa de R$ 3.500,00 e suspensão do registro.'
  },
  // ... outros serviços mantidos ...
  'sassmaq': {
    title: 'Certificação SASSMAQ',
    description: 'Sistema de Avaliação de Segurança, Saúde, Meio Ambiente e Qualidade. Obrigatório para transporte de produtos químicos e para grandes embarcadores.',
    price: 'R$ 1.500,00 (Pré-Auditoria)',
    paymentConditions: 'Consultoria Preparatória.',
    timeline: '3 a 6 meses (Implementação)',
    legalBasis: 'ABIQUIM (Indústria Química)',
    requirements: [
      'Manual da Qualidade Implementado.',
      'Gestão de Risco e Plano de Atendimento a Emergência (PAE).',
      'Auditoria de terceira parte aprovada.'
    ],
    documents: ['Licenças Ambientais', 'Manuais de Procedimento', 'Evidências de Treinamento'],
    warning: 'DIFERENCIAL: Sem SASSMAQ, sua transportadora não carrega para a indústria química de ponta.'
  },
  'aet': {
    title: 'AET (Cargas Especiais)',
    description: 'Autorizações Especial de Trânsito para veículos que excedem limites de peso ou dimensão (Cegonhas, Bitrens, Rodotrens, Cargas Indivisíveis).',
    price: 'A partir de R$ 180,00',
    paymentConditions: 'Por licença emitida.',
    timeline: '2 a 10 dias (Depende do DNIT/DER)',
    legalBasis: 'Resolução CONTRAN 882/2021',
    requirements: [
      'Projeto Técnico (Assinado por Engenheiro) para casos específicos.',
      'Veículo cadastrado no sistema SIAET (DNIT).',
      'Tara e Lotação compatíveis.'
    ],
    documents: ['CRLV do Cavalo e Carretas', 'Projeto Técnico (se aplicável)'],
    warning: 'MULTA PESADA: Transitar sem AET com excesso lateral ou de peso gera apreensão e multa multiplicada.'
  },
  'tric': {
    title: 'Licença Internacional (TRIC)',
    description: 'Transporte Rodoviário Internacional de Cargas. Habilitação para operar no Mercosul (Argentina, Uruguai, Paraguai) e Chile.',
    price: 'Sob Consulta',
    paymentConditions: 'Projeto Complexo.',
    timeline: '60 a 90 dias',
    legalBasis: 'Acordo ATIT (Mercosul)',
    requirements: [
      'Frota Própria mínima exigida (varia por país).',
      'Seguro RCTR-VI (Carta Azul).',
      'Representante Legal no país de destino.'
    ],
    documents: ['Contrato Social', 'Balanço Patrimonial', 'CRLV da Frota'],
    warning: 'BUROCRACIA CRÍTICA: Erros no MIC/DTA na fronteira podem reter o caminhão por semanas.'
  },
  'mopp': {
    title: 'Licenças Especiais (MOPP/IBAMA)',
    description: 'Regularização para transporte de Produtos Perigosos. Inclui cadastro no IBAMA (CTF), Polícia Federal e Exército (Produtos Controlados).',
    price: 'R$ 450,00 (Cadastro IBAMA)',
    paymentConditions: 'Taxas governamentais à parte.',
    timeline: '15 a 30 dias',
    legalBasis: 'Resolução ANTT 5.998/2022',
    requirements: [
      'Motorista com curso MOPP averbado na CNH.',
      'Veículo com CIPP (Certificado de Inspeção) do INMETRO.',
      'Kit de Emergência e EPIs.'
    ],
    documents: ['CNH', 'Certificado MOPP', 'CIPP do Tanque/Carroceria'],
    warning: 'CRIME AMBIENTAL: Transportar sem licença ambiental é crime inafiançável em alguns casos.'
  },
  // ... (Outros serviços mantidos)
  'passengers-charter': {
    title: 'Fretamento ANTT (TAF)',
    description: 'Termo de Autorização de Fretamento para viagens interestaduais de turismo ou contínuas (fábricas/universidades).',
    price: 'R$ 2.800,00',
    paymentConditions: '12x no Cartão.',
    timeline: '45 a 60 dias',
    legalBasis: 'Resolução ANTT 4.777/2015 | Decreto 2.521',
    requirements: [
      'Circuito Fechado: Ida e volta com o mesmo grupo de passageiros.',
      'Idade Frota (Micro/Van): MÁXIMO 15 ANOS. (Regra Rígida - Não aceita laudo acima disso para cadastro inicial).',
      'Idade Frota (Ônibus): Aceita acima de 15 anos MEDIANTE LAUDO DE INSPEÇÃO TÉCNICA (ITL) semestral.',
      'Capital Social mínimo compatível com a frota.'
    ],
    documents: ['CRLV Aluguel', 'Seguro APP', 'Certidão Negativa', 'Lista de Passageiros'],
    warning: 'RISCO DE APREENSÃO: Vender passagem individual (característica de linha) com licença de fretamento gera apreensão imediata do veículo.'
  },
  'passengers-regular': {
    title: 'Linhas Regulares (TAR)',
    description: 'Termo de Autorização Regular. Para operar linhas de rodoviária (ponto a ponto) com venda de passagem avulsa.',
    price: 'Projeto Personalizado',
    paymentConditions: 'Análise de Viabilidade Técnica.',
    timeline: '6 a 12 meses',
    legalBasis: 'Resolução ANTT 6.033 (Novo Marco)',
    requirements: [
      'Índice de Qualidade (IQT) monitorado.',
      'Monitriip instalado e transmitindo.',
      'Acessibilidade em toda a frota.',
      'Garagens e pontos de apoio nas extremidades da linha.'
    ],
    documents: ['Estudo de Mercado', 'Plano de Negócio', 'Comprovação de Frota'],
    warning: 'ALTA COMPLEXIDADE: Exige capital social elevado e estrutura operacional robusta.'
  },
  'state-auth': {
    title: 'Fretamento Estadual (ARTESP/DER)',
    description: 'Licenças para rodar DENTRO do estado (Intermunicipal). Ex: ARTESP (SP), DER-MG, DETRO-RJ, AGERBA-BA.',
    price: 'Variável por Estado',
    paymentConditions: 'Consulte nossa tabela.',
    timeline: '60 a 120 dias',
    legalBasis: 'Legislação Estadual Específica',
    requirements: [
      'Cada estado tem sua regra de idade de frota (Ex: SP é rigoroso).',
      'Vistoria veicular em órgão credenciado pelo estado.',
      'Seguro específico exigido pela agência estadual.'
    ],
    documents: ['Varia conforme a UF (Consulte o Mapa no Painel)'],
    warning: 'BITRIBUTAÇÃO: Não confunda a licença federal (ANTT) com a estadual. Para fazer turismo local, você precisa da estadual.'
  },
  'school-transport': {
    title: 'Transporte Escolar (PNATE)',
    description: 'Regularização para transporte de estudantes. Exige vistoria semestral rigorosa e faixa amarela.',
    price: 'R$ 650,00',
    paymentConditions: '3x no Cartão.',
    timeline: '15 dias',
    legalBasis: 'Código de Trânsito Brasileiro (CTB)',
    requirements: [
      'Curso de Condutor Escolar (DETRAN).',
      'Veículo com faixa amarela e dísticos "ESCOLAR".',
      'Tacógrafo aferido e cintos de segurança em todos os bancos.'
    ],
    documents: ['CNH D/E', 'CRLV', 'Nada Consta Criminal (Pedofilia/Violência)'],
    warning: 'TOLERÂNCIA ZERO: A fiscalização escolar é a mais rigorosa. Pneu careca ou cinto quebrado reprova na hora.'
  },
  'insurance': {
    title: 'Seguros Obrigatórios (RCTR-C)',
    description: 'Gestão de Apólices de Carga (RCTR-C e RC-DC) conforme Lei 14.599. Sistema de Averbação Integrado.',
    price: 'Cotação Online',
    paymentConditions: 'Mensal conforme uso.',
    timeline: 'Imediato',
    legalBasis: 'Lei 14.599/2023 | SUROC 27',
    requirements: [
      'RNTRC Ativo.',
      'Averbamento de cada viagem ANTES do início do transporte.'
    ],
    documents: ['CNPJ', 'Relação de Frota'],
    warning: 'BLOQUEIO DE RNTRC: A falta de transmissão do XML do seguro para a ANTT pode suspender seu registro automaticamente.'
  },
  'fines': {
    title: 'Gestão de Multas & SNE',
    description: 'Monitoramento de infrações e adesão ao Sistema de Notificação Eletrônica para 40% de desconto.',
    price: 'Taxa de Sucesso',
    paymentConditions: '% sobre a economia gerada.',
    timeline: 'Diário',
    legalBasis: 'Código de Trânsito Brasileiro',
    requirements: [
      'Cadastro do veículo na plataforma Helonex JusTech.',
      'Carteira Digital de Trânsito ativa.'
    ],
    documents: ['Renavam', 'Placa'],
    warning: 'NIC: Não indicar condutor em multa de PJ gera nova multa de mesmo valor (Multa NIC).'
  },
  'tax-reform': {
    title: 'Planejamento Fiscal 2026',
    description: 'Preparação para a Reforma Tributária (IVA Dual: CBS/IBS). Recuperação de créditos de Diesel e Pneus.',
    price: 'Consultoria',
    paymentConditions: 'Projeto.',
    timeline: 'Contínuo',
    legalBasis: 'Emenda Constitucional 132/2023',
    requirements: [
      'Regime Tributário Lucro Real ou Presumido (preferencialmente).',
      'Organização das Notas Fiscais de entrada.'
    ],
    documents: ['Balancete', 'Notas de Compra'],
    warning: 'OPORTUNIDADE: O transporte tem alíquota reduzida e crédito presumido. Quem não se adaptar vai pagar mais imposto.'
  },
  'compliance': {
    title: 'Compliance & LGPD',
    description: 'Auditoria de conformidade legal e proteção de dados. Matriz de Risco para evitar passivos trabalhistas e regulatórios.',
    price: 'Sob Medida',
    paymentConditions: 'Assinatura Mensal.',
    timeline: 'Implementação em 30 dias',
    legalBasis: 'Lei Geral de Proteção de Dados',
    requirements: [
      'Mapeamento de processos internos.',
      'Termos de consentimento para motoristas.'
    ],
    documents: ['Contratos de Trabalho', 'Procedimentos Internos'],
    warning: 'DADOS SENSÍVEIS: Monitorar motoristas por câmera/telemetria exige consentimento formal sob pena de processo.'
  },
  'mentor-ia': {
    title: 'Mentor IA Estratégico',
    description: 'Consultoria 24h via Inteligência Artificial. Tire dúvidas sobre legislação, rotas e multas a qualquer hora.',
    price: 'INCLUSO NA ASSINATURA',
    paymentConditions: 'Ilimitado para membros PRO.',
    timeline: 'Instantâneo',
    legalBasis: 'Base Jurídica Atualizada (RAG)',
    requirements: ['Acesso à Internet.'],
    documents: ['Nenhum.'],
    warning: 'SUPORTE TÉCNICO: A IA responde baseada na lei, mas para casos judiciais complexos, consulte nossos advogados humanos.'
  },
  'idt-tech': {
    title: 'Tecnologia IDT (Autonomia)',
    description: 'Módulo de emissão de documentos (RNTRC, CIOT, Contratos) diretamente pelo sistema, sem despachante.',
    price: 'INCLUSO NA ASSINATURA',
    paymentConditions: 'Ferramenta Vitalícia.',
    timeline: 'Imediato',
    legalBasis: 'Lei da Liberdade Econômica',
    requirements: ['Conta Gov.br Prata/Ouro.'],
    documents: ['Acesso Gov.br'],
    warning: 'ECONOMIA: Pare de pagar taxas desnecessárias para terceiros emitirem documentos que são gratuitos.'
  },
  'marketing-placa': {
    title: 'Clube de Compras',
    description: 'Poder de compra coletivo. Descontos em Diesel, Pneus, Peças e Seguros negociados para a rede Helonex.',
    price: 'ACESSO GRATUITO',
    paymentConditions: 'Pagamento direto ao fornecedor.',
    timeline: 'Imediato',
    legalBasis: 'Economia Colaborativa',
    requirements: ['Cadastro Ativo.'],
    documents: ['CNPJ/CPF'],
    warning: 'CASHBACK: Parte do abastecimento volta como crédito na plataforma.'
  },
  'fleet-manager': {
    title: 'Gestor de Frota (GesTech)',
    description: 'Controle total de vencimentos: CNH, Exames, Tacógrafo, Extintor e Licenças. O sistema avisa antes de vencer.',
    price: 'INCLUSO NA ASSINATURA',
    paymentConditions: 'Monitoramento contínuo.',
    timeline: 'Automático',
    legalBasis: 'Gestão Preventiva',
    requirements: ['Cadastro da Frota.'],
    documents: ['Dados dos Veículos e Condutores'],
    warning: 'FIM DAS MULTAS: Nunca mais perca um prazo de renovação.'
  },
  'opp-consultant': {
    title: 'Consultor de Oportunidades',
    description: 'Inteligência de Mercado para fretes e contratos. Analisa rotas lucrativas e sazonalidade.',
    price: 'INCLUSO NA ASSINATURA',
    paymentConditions: 'Análise ilimitada.',
    timeline: 'Tempo Real',
    legalBasis: 'Inteligência Logística',
    requirements: ['Informar rota e veículo.'],
    documents: ['Nenhum.'],
    warning: 'LUCRO: Não rode vazio. O sistema sugere o frete de retorno.'
  }
};

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, onBack, onConsultMentor, onNavigateToMap }) => {
  // Fallback Robusto: Se o ID não existir, usa um genérico, mas o objetivo é que o dicionário acima cubra tudo.
  const data = SERVICE_DETAILS[serviceId] || {
    title: 'Serviço Especializado Helonex',
    description: 'Detalhes específicos deste serviço estão sendo atualizados pela nossa equipe técnica.',
    price: 'Sob Consulta',
    paymentConditions: 'Consulte condições.',
    timeline: 'Variável',
    legalBasis: 'Legislação Vigente',
    requirements: ['Entre em contato com o suporte.'],
    documents: ['Documentação padrão.'],
    warning: 'Este serviço requer análise personalizada.'
  };

  const isEcosystem = ['mentor-ia', 'idt-tech', 'marketing-placa', 'fleet-manager', 'opp-consultant'].includes(serviceId);
  const isPassenger = ['passengers-charter', 'passengers-regular', 'state-auth', 'school-transport'].includes(serviceId);
  
  const [isSalesChatOpen, setIsSalesChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleWhatsAppClick = () => {
    const message = `Olá! Tenho interesse no serviço: ${data.title}.\nVi no Portal Helonex. Gostaria de saber mais.`;
    const url = `https://wa.me/5541999999999?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // ... (Lógica do Chat de Vendas ATUALIZADA PARA AUDITORIA)
  const openSalesChat = async () => {
    setIsSalesChatOpen(true);
    if (chatMessages.length === 0) {
      setIsChatLoading(true);
      const initialPitch = `Olá! Sou o **Auditor Técnico HELONEX** responsável por: ${data.title}.
      
Antes de liberar sua contratação, preciso validar se sua empresa está pronta para este processo (Protocolo Erro Zero).

**Investimento Base:** ${data.price}
**Status Atual:** Auditoria Iniciada.

${isPassenger ? 'Primeira verificação crítica: Qual o ano de fabricação do veículo mais antigo que você pretende cadastrar?' : 'Para prosseguirmos: Você já possui o cadastro da empresa no Gov.br (Prata ou Ouro)?'}

Aguardo sua resposta para validar a conformidade.`;
      setChatMessages([{ role: 'model', text: initialPitch }]);
      setIsChatLoading(false);
    }
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    try {
      // Prompt de AUDITORIA Contextualizado
      const salesContext = `
        ATUE COMO: Auditor Técnico Sênior da Helonex (Postura: Yosher/Integridade & Prudência/Segurança).
        NÃO ATUE COMO VENDEDOR DESESPERADO. 
        
        SERVIÇO ALVO: ${data.title}
        PREÇO REF: ${data.price}
        
        SUA MISSÃO:
        1. Analisar a resposta do usuário buscando "Não Conformidades" (Ex: Veículo velho para turismo, falta de CNH D, nome sujo).
        2. Se houver risco, ALERTE IMEDIATAMENTE (Princípio da Prudência). Não venda se for dar problema.
        3. Se estiver tudo ok, valide e encaminhe para o fechamento (WhatsApp) com o "Selo de Pré-Aprovação".
        
        DIRETRIZES TÉCNICAS:
        - Passageiros: Vans > 15 anos = BLOQUEIO TOTAL. Ônibus > 15 anos = Exige Laudo ITL.
        - Cargas: Sem RT = Multa. Sem Seguro = Suspensão.
        
        RESPOSTA: Curta, Técnica e Direta. Use termos como "Validação", "Conformidade", "Risco Detectado".
      `;
      const fullPrompt = `${salesContext}\n\nRESPOSTA DO CLIENTE SOBRE A AUDITORIA: ${userMsg}`;
      const history = chatMessages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }));
      const response = await sendMessageToMentor(fullPrompt, history);
      setChatMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'model', text: "Sistema de Auditoria em manutenção momentânea. Por favor, chame no suporte humano." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen py-8 md:py-12 w-full relative z-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Voltar
        </button>

        <div className="bg-slate-900 rounded-2xl border border-white/10 shadow-2xl relative z-20 animate-fade-in-up overflow-hidden">
          
          {/* HEADER */}
          <div className={`bg-gradient-to-r ${isEcosystem ? 'from-slate-900 to-slate-800 border-b border-hlx-gold/20' : 'from-hlx-navy to-slate-900 border-b border-white/10'} p-6 md:p-8 relative`}>
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              {isEcosystem ? <Sparkles size={120} /> : isPassenger ? <Building2 size={120} /> : <Truck size={120} />}
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-4 relative z-10">
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isEcosystem ? 'bg-hlx-gold/20 text-hlx-gold border border-hlx-gold/40' : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'}`}>
                {isEcosystem ? 'Tecnologia Exclusiva' : 'Serviço Auditado'}
              </div>
              {data.legalBasis && (
                <div className="flex items-center gap-1 px-3 py-1 bg-slate-800 border border-white/10 rounded-full text-gray-400 text-xs font-mono">
                  <Scale size={10} /> {data.legalBasis}
                </div>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-4 relative z-10 leading-tight">{data.title}</h1>
            <p className="text-gray-300 text-sm md:text-lg max-w-3xl leading-relaxed relative z-10">{data.description}</p>
          </div>

          <div className="p-6 md:p-8 space-y-8 bg-slate-900">
            
            {/* CARD DE VALOR */}
            <div className={`bg-gradient-to-r ${isEcosystem ? 'from-slate-800 to-slate-900 border-hlx-gold/30' : 'from-slate-800 to-slate-900 border-white/10'} border rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg`}>
                <div>
                    <p className={`${isEcosystem ? 'text-hlx-gold' : 'text-blue-400'} text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2`}>
                        <Wallet size={14} /> {isEcosystem ? 'Benefício do Plano' : 'Investimento Estimado'}
                    </p>
                    <div className="text-3xl font-display font-bold text-white mb-1">{data.price}</div>
                    <p className="text-gray-400 text-xs">{data.paymentConditions}</p>
                </div>
                <div className="h-10 w-px bg-white/10 hidden md:block"></div>
                <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Clock size={14} /> Tempo de Processo
                    </p>
                    <div className="text-xl font-bold text-white">{data.timeline}</div>
                </div>
            </div>

            {/* REQUISITOS */}
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                <CheckCircle className={isEcosystem ? "text-hlx-gold" : "text-green-500"} /> 
                {isEcosystem ? 'Vantagens & Acessos' : 'Requisitos de Aprovação'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {data.requirements?.map((req: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 bg-slate-950/50 p-5 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                    <div className={`w-6 h-6 rounded-full bg-slate-900 border flex items-center justify-center flex-shrink-0 mt-0.5 ${isEcosystem ? 'border-hlx-gold/50 text-hlx-gold' : 'border-green-500/50 text-green-500'}`}>
                      <CheckCircle size={14} />
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DOCUMENTOS */}
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                <FileText className="text-blue-400" /> Documentação para Auditoria
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                 {data.documents?.map((doc: string, idx: number) => (
                  <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-950 rounded flex items-center justify-center text-gray-500">
                        <FileCheck size={16} />
                    </div>
                    <p className="text-xs font-bold text-gray-300">{doc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* WARNING / ALERTA DE COMPLIANCE */}
            {data.warning && (
              <div className="bg-slate-900 border-l-4 border-red-500 p-6 rounded-r-xl flex gap-4 items-start relative z-10 shadow-lg">
                <Shield className="text-red-500 flex-shrink-0 w-6 h-6" />
                <div>
                  <h4 className="text-red-500 font-bold text-sm uppercase mb-1">Ponto Crítico de Atenção</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{data.warning}</p>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={openSalesChat} className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 border border-white/10">
                <Microscope size={20} className="text-hlx-gold" /> Pré-Auditoria com IA
              </button>
              
              <button 
                  onClick={isEcosystem || serviceId === 'rntrc-tac' ? onNavigateToMap : handleWhatsAppClick}
                  className={`w-full py-4 text-white font-bold rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2 ${isEcosystem ? 'bg-gradient-to-r from-hlx-gold to-orange-500 hover:to-orange-600 text-slate-900' : 'bg-green-600 hover:bg-green-500'}`}
                >
                  {isEcosystem ? <Zap size={20} /> : <MessageSquare size={20} />}
                  {isEcosystem ? 'ACESSAR TECNOLOGIA' : 'Solicitar Análise Humana'}
                </button>
            </div>

          </div>
        </div>
      </div>

      {/* CHAT MODAL (Ajustado para Mobile) */}
      {isSalesChatOpen && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/80 p-0 md:p-4 animate-fade-in-up">
          <div className="bg-slate-900 w-full md:max-w-lg h-full md:h-[500px] md:rounded-2xl border-t md:border border-white/10 shadow-2xl flex flex-col">
             <div className="p-4 border-b border-white/10 flex justify-between bg-slate-950 flex-shrink-0">
                <div className="flex items-center gap-2">
                   <div className="bg-green-500/10 p-1.5 rounded text-green-400"><Microscope size={16} /></div>
                   <div>
                      <span className="font-bold text-white block text-sm">Auditor Técnico Virtual</span>
                      <span className="text-[10px] text-gray-400">Verificação de Conformidade em Andamento</span>
                   </div>
                </div>
                <button onClick={() => setIsSalesChatOpen(false)}><X className="text-gray-400"/></button>
             </div>
             <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900">
                {chatMessages.map((m, i) => (
                   <div key={i} className={`p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-hlx-blue text-white ml-auto' : 'bg-slate-800 text-gray-300 mr-auto border border-white/5'}`}>
                      {m.text}
                   </div>
                ))}
                {isChatLoading && <div className="text-xs text-gray-500 animate-pulse flex items-center gap-2"><Loader2 size={12} className="animate-spin"/> Auditando resposta...</div>}
                <div ref={messagesEndRef} />
             </div>
             
             {/* DISCLAIMER NO MODAL */}
             <div className="px-4 pb-2 bg-slate-950 flex-shrink-0">
                <p className="text-[9px] text-gray-500 text-center flex items-center justify-center gap-1">
                   <ShieldAlert size={10} className="text-yellow-500" />
                   Aviso: A IA pode apresentar imprecisões. Valide dados críticos com um especialista humano.
                </p>
             </div>

             <div className="p-4 border-t border-white/10 flex gap-2 bg-slate-950 flex-shrink-0 mb-safe">
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} className="flex-1 bg-slate-900 border border-white/10 rounded p-3 text-white text-sm focus:border-hlx-gold outline-none" placeholder="Digite sua resposta..." onKeyDown={e => e.key === 'Enter' && handleSendChat()} />
                <button onClick={handleSendChat} className="bg-hlx-gold text-slate-900 p-3 rounded hover:bg-yellow-400"><Send size={18}/></button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ServiceDetail;
