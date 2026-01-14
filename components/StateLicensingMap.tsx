import React, { useState } from 'react';
import { ArrowLeft, MapPin, Bus, CheckCircle, Wallet, MessageSquare, FileText, Landmark, AlertTriangle, BookOpen, Building2, UserCheck, Wrench, Clock, Rocket, ShieldCheck, Radio } from 'lucide-react';

interface StateLicensingMapProps {
  onBack: () => void;
  onConsultMentor: () => void;
}

interface StateInfo {
  id: string;
  name: string;
  agency: string;
  description: string;
  timeline: string;
  companyReqs: string[];
  fleetReqs: string[];
  infraReqs: string[];
  strategyUpsell: string[];
}

const STATE_DATA: Record<string, StateInfo> = {
  'SP': { 
    id: 'SP', name: 'São Paulo', agency: 'ARTESP / EMTU', 
    description: 'Regulação de Alta Complexidade. O mercado mais exigente do país.',
    timeline: '90 a 120 dias (Fila de Análise Técnica)',
    companyReqs: [
      'Capital Social Integralizado (Mínimo exigido por veículo).',
      'Certidões Negativas de Débitos (Federal, Estadual, Municipal) da Matriz e Sócios.',
      'CNAE específico de Transporte Rodoviário de Passageiros (Fretamento/Turismo).'
    ],
    fleetReqs: [
      'Idade Máxima Rigorosa: 15 anos (Rodoviário) / Consultar Urbano.',
      'Vistoria Técnica Acreditada (ITL/Inmetro) obrigatória.',
      'Veículos em nome da empresa (Próprio ou Arrendamento Mercantil).'
    ],
    infraReqs: [
      'Comprovação de Garagem/Pátio compatível com a frota.',
      'Canal de Atendimento ao Usuário (SAC/Ouvidoria).',
      'Responsável Técnico na manutenção.'
    ],
    strategyUpsell: [
      'Gestão de Escala de Motoristas (Academia HELONEX).',
      'Auditoria de Vencimento de Frota (IA HELONEX).',
      'Seguro RCTR-C e APP Coletivo (Condição Especial).'
    ]
  },
  'RJ': { 
    id: 'RJ', name: 'Rio de Janeiro', agency: 'DETRO-RJ', 
    description: 'Departamento de Transportes Rodoviários do RJ.',
    timeline: '60 a 90 dias',
    companyReqs: [
      'Registro na Junta Comercial (JUCERJA) atualizado.',
      'Regularidade Fiscal e Trabalhista (FGTS/INSS).',
      'Pagamento de DUDA (Taxa Estadual) inicial.'
    ],
    fleetReqs: [
      'Vistoria Visual Padronizada (Faixas DETRO obrigatórias).',
      'Vistoria Mecânica em postos credenciados.',
      'Idade de Frota conforme regulamento (Turismo x Fretamento).'
    ],
    infraReqs: [
      'Garagem comprovada no estado do RJ.',
      'Sistema de Bilhetagem (se aplicável a linha regular).'
    ],
    strategyUpsell: [
      'Layout e Identidade Visual (Consultoria de Branding).',
      'Curso de Direção Defensiva para Motoristas (Academia).'
    ]
  },
  'MG': { 
    id: 'MG', name: 'Minas Gerais', agency: 'DER-MG', 
    description: 'Departamento de Edificações e Estradas de Rodagem.',
    timeline: '60 a 90 dias',
    companyReqs: [
      'Cadastro CGF (Cadastro Geral de Fretamento).',
      'Certidão de Falência e Concordata.',
      'Prova de Regularidade Fiscal Estadual (MG).'
    ],
    fleetReqs: [
      'Laudo de Inspeção Veicular (LIV) emitido por engenheiro credenciado.',
      'Seguro de Responsabilidade Civil (Apólice Específica DER-MG).',
      'Motoristas com Curso de Transporte Coletivo averbado.'
    ],
    infraReqs: [
      'Manutenção preventiva comprovada.',
      'Estrutura operacional em MG.'
    ],
    strategyUpsell: [
      'Emissão de Laudos Técnicos (Parceiros HELONEX).',
      'Seguro de Frota com cobertura DER.'
    ]
  },
  'RS': { 
    id: 'RS', name: 'Rio Grande do Sul', agency: 'DAER-RS', 
    description: 'Departamento Autônomo de Estradas de Rodagem.',
    timeline: '45 a 60 dias',
    companyReqs: [
      'Registro no DAER (Modalidades: Turismo, Contínuo, Eventual).',
      'CADASTUR Obrigatório para modalidade Turismo.',
      'Certidões Criminais dos Sócios.'
    ],
    fleetReqs: [
      'Laudo de Vistoria Anual (Engenheiro Mecânico).',
      'Seguro APP (Acidentes Pessoais a Passageiros).',
      'Tacógrafo aferido pelo Inmetro.'
    ],
    infraReqs: [
      'SAC 0800 para passageiros (Turismo).',
      'Programa de Manutenção Preventiva.'
    ],
    strategyUpsell: [
      'Integração CADASTUR + DAER (Pacote Único).',
      'Marketing Digital para Turismo (Academia HELONEX).'
    ]
  },
  'PR': { 
    id: 'PR', name: 'Paraná', agency: 'DER-PR', 
    description: 'Foco intenso na segurança viária e seguros.',
    timeline: '30 a 60 dias',
    companyReqs: [
      'Registro de Fretamento Eventual ou Contínuo.',
      'Contrato Social com Capital Mínimo compatível.',
      'Alvará de Funcionamento.'
    ],
    fleetReqs: [
      'Idade de Frota: Máx 15 anos (Micro) / 20 anos (Ônibus).',
      'Vistoria Veicular periódica.',
      'Lista de Passageiros Digital (Sistema DER).'
    ],
    infraReqs: [
      'Apólice de Seguro de Responsabilidade Civil (R$ 2.653.000,00 ref).',
      'Sistema de Gestão de Passageiros.'
    ],
    strategyUpsell: [
      'Cotação de Seguro RC Obrigatório (Melhores Taxas).',
      'Sistema Emissor de Lista de Passageiros.'
    ]
  },
  'CE': { 
    id: 'CE', name: 'Ceará', agency: 'ARCE', 
    description: 'Agência Reguladora do Estado do Ceará (Lei 13.094/01).',
    timeline: '60 a 90 dias',
    companyReqs: [
      'Inscrição no Cadastro de Transportes Rodoviários (CTR).',
      'Certidão Negativa de Débitos Estaduais (Sefaz-CE).',
      'Capital Social integralizado.'
    ],
    fleetReqs: [
      'Idade Limite: 15 anos (Ônibus) / 12 anos (Micro-ônibus).',
      'Vistoria Veicular ARCE.',
      'Motoristas: CNH D/E e Curso de Condutor de Passageiros.'
    ],
    infraReqs: [
      'Bilhete de Passagem Eletrônico (BPe) para linhas regulares.',
      'Garagem com área de manutenção e limpeza.'
    ],
    strategyUpsell: [
      'Implantação de Sistema de BPe (Parceiro Tecnológico).',
      'Treinamento de Atendimento ao Cliente.'
    ]
  },
  'BA': { 
    id: 'BA', name: 'Bahia', agency: 'AGERBA', 
    description: 'Regulação rigorosa com taxas semestrais.',
    timeline: '60 a 90 dias',
    companyReqs: [
      'Certificado de Registro (CR) junto à AGERBA.',
      'Comprovação de idoneidade financeira.',
      'Certidões Cíveis e Criminais dos sócios.'
    ],
    fleetReqs: [
      'Idade Média da Frota controlada.',
      'Vistoria Veicular credenciada.',
      'Tacógrafo em dia.'
    ],
    infraReqs: [
      'Pagamento de Taxa de Fiscalização Semestral.',
      'SAC (Serviço de Atendimento ao Cliente).'
    ],
    strategyUpsell: [
      'Gestão de Pagamento de Taxas (Alerta IA).',
      'Renovação Automática de CR.'
    ]
  },
  'TO': { 
    id: 'TO', name: 'Tocantins', agency: 'ATR', 
    description: 'Agência Tocantinense de Regulação.',
    timeline: '60 a 90 dias (Até publicação da Habilitação)',
    companyReqs: [
      'Contrato Social consolidado com objeto de transporte.',
      'Capital Social Mínimo Integralizado (Compatível com frota).',
      'Certidões Negativas (Federal, Estadual TO, Municipal, FGTS, Trabalhista).',
      'Prova de idoneidade dos sócios (Nada Consta Criminal).'
    ],
    fleetReqs: [
      'CRLV Categoria Aluguel (Placa Vermelha).',
      'Idade Limite da Frota (Resolução ATR vigente).',
      'Laudo de Vistoria Técnica Veicular (Aprovado).',
      'Motoristas: Vínculo CLT e Curso de Transporte Coletivo (Res. 168/789).'
    ],
    infraReqs: [
      'Seguro de Responsabilidade Civil (RCTR) e APP.',
      'SAC 0800 (Obrigatório para atendimento ao usuário).',
      'Adesão ao Sistema de Gestão da ATR (Credenciamento).'
    ],
    strategyUpsell: [
      'Implementação de Monitriip/Rastreador (IA HELONEX).',
      'Assessoria na contratação do Seguro Obrigatório.',
      'Plano de Manutenção Preventiva (Gestão de Frota).'
    ]
  },
  'PA': { 
    id: 'PA', name: 'Pará', agency: 'ARCON', 
    description: 'Agência de Regulação e Controle.',
    timeline: '60 a 90 dias',
    companyReqs: [
      'Registro de Operador de Transporte (ROT).',
      'Certidões Negativas completas.',
      'Capital Social Mínimo.'
    ],
    fleetReqs: [
      'Selo de Vistoria ARCON (Afixação Obrigatória).',
      'Idade de Frota controlada.',
      'Seguro APP vigente.'
    ],
    infraReqs: [
      'Garagem e ponto de apoio.',
      'Atendimento ao usuário.'
    ],
    strategyUpsell: [
      'Regularização de Selo ARCON.',
      'Gestão de multas regulatórias.'
    ]
  },
  'MS': { 
    id: 'MS', name: 'Mato Grosso do Sul', agency: 'AGEMS', 
    description: 'Decreto 9.234/98 (Rigor Fiscal).',
    timeline: '60 a 90 dias',
    companyReqs: [
      'VEDAÇÃO: Proibido opção pelo Simples Nacional.',
      'Capital Social: 15.000 UFERMS (Ônibus) / 4.000 (Micro).',
      'Balanço Patrimonial auditado.'
    ],
    fleetReqs: [
      'Idade Máxima: 15 anos (Geral).',
      'Vistoria AGEMS rigorosa.',
      'Seguro RC Obrigatório.'
    ],
    infraReqs: [
      'Emissão de CT-eOS (Modelo 67) Obrigatória.',
      'Garagem comprovada.'
    ],
    strategyUpsell: [
      'Assessoria Contábil Especializada (Parceiros).',
      'Sistema Emissor de CT-eOS homologado.'
    ]
  },
  'DEFAULT': { 
    id: 'BR', name: 'Outros Estados', agency: 'Agência Estadual / DER', 
    description: 'Consultoria Personalizada conforme legislação local.',
    timeline: '60 a 90 dias (Média Nacional)',
    companyReqs: [
      'CNPJ com CNAE de Transporte (4929-9 ou similar).',
      'Contrato Social e Certidões Negativas.',
      'Inscrição Estadual Ativa.'
    ],
    fleetReqs: [
      'Veículos Categoria Aluguel (Placa Vermelha).',
      'Laudo de Inspeção Veicular (ITL/Inmetro).',
      'Motoristas habilitados e com curso específico.'
    ],
    infraReqs: [
      'Seguro APP (Acidentes Pessoais).',
      'Seguro RCTR-C (Responsabilidade Civil).',
      'Cadastro no órgão regulador local.'
    ],
    strategyUpsell: [
      'Diagnóstico Regulatório Completo.',
      'Habilitação ANTT (Interestadual) Simultânea.',
      'Implementação de Gestão de Frota Digital.'
    ]
  }
};

const StateLicensingMap: React.FC<StateLicensingMapProps> = ({ onBack, onConsultMentor }) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleStateClick = (uf: string) => {
    setSelectedState(uf);
  };

  const activeData = selectedState && STATE_DATA[selectedState] ? STATE_DATA[selectedState] : STATE_DATA['DEFAULT'];
  
  const displayInfo = selectedState ? (STATE_DATA[selectedState] || { ...STATE_DATA['DEFAULT'], name: `Estado: ${selectedState}` }) : null;

  return (
    <div className="bg-slate-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} /> Voltar
          </button>
          
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Plano de Carreira <span className="text-hlx-gold">Empresarial</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Selecione a UF de origem. Não entregamos apenas papéis; estruturamos sua empresa para cumprir os requisitos de Capital, Frota, Equipe e Tecnologia exigidos pelas Agências Reguladoras.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4 bg-slate-800 p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
               <MapPin size={120} className="text-hlx-blue" />
             </div>
             
             <h3 className="text-white font-bold mb-6 flex items-center gap-2">
               <MapPin className="text-hlx-orange" /> Selecione a UF Base
             </h3>

             <div className="grid grid-cols-5 gap-2 relative z-10">
               {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map((uf) => (
                 <button
                   key={uf}
                   onClick={() => handleStateClick(uf)}
                   className={`p-2 rounded-lg font-bold text-sm transition-all duration-300 border ${
                     selectedState === uf 
                      ? 'bg-hlx-gold text-slate-900 border-hlx-gold scale-110 shadow-lg shadow-orange-500/50' 
                      : 'bg-slate-700 text-gray-300 border-white/5 hover:bg-slate-600 hover:border-white/20'
                   }`}
                 >
                   {uf}
                 </button>
               ))}
             </div>

             <div className="mt-8 bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
               <p className="text-xs text-blue-200">
                 <strong>Nota Estratégica:</strong> Nossa assessoria cuida da alimentação dos sistemas governamentais. As taxas públicas são calculadas à parte e entregues para seu pagamento.
               </p>
             </div>
          </div>

          <div className="lg:col-span-8 relative">
            {displayInfo ? (
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-hlx-gold/30 rounded-2xl p-8 shadow-2xl animate-fade-in-up">
                
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 border-b border-white/10 pb-6 gap-4">
                  <div>
                    <span className="text-hlx-orange font-bold tracking-widest text-xs uppercase mb-1 block">Jurisdição & Competência</span>
                    <h2 className="text-4xl font-display font-bold text-white">{displayInfo.agency}</h2>
                    <p className="text-gray-400 mt-1 text-lg">{displayInfo.name}</p>
                    <p className="text-gray-500 text-sm mt-2 max-w-xl">{displayInfo.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-hlx-gold/10 p-3 rounded-lg">
                      <Bus size={32} className="text-hlx-gold" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-hlx-gold font-bold border border-hlx-gold/30 px-2 py-1 rounded-full">
                      <Clock size={12} /> Prazo: {displayInfo.timeline}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  
                  <div className="bg-slate-950/50 p-5 rounded-xl border border-white/5 hover:border-hlx-blue/30 transition-colors">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                      <Building2 size={18} className="text-hlx-blue" /> Empresa & Sócios
                    </h3>
                    <ul className="space-y-3">
                      {displayInfo.companyReqs.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                          <CheckCircle size={14} className="text-hlx-blue mt-1 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/50 p-5 rounded-xl border border-white/5 hover:border-hlx-orange/30 transition-colors">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                      <Bus size={18} className="text-hlx-orange" /> Frota & Motoristas
                    </h3>
                    <ul className="space-y-3">
                      {displayInfo.fleetReqs.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                          <CheckCircle size={14} className="text-hlx-orange mt-1 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/50 p-5 rounded-xl border border-white/5 hover:border-green-500/30 transition-colors md:col-span-2">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                      <Wrench size={18} className="text-green-500" /> Estrutura & Tecnologia Obrigatória
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {displayInfo.infraReqs.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                          <Radio size={14} className="text-green-500 mt-1 flex-shrink-0" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="bg-gradient-to-r from-hlx-gold/10 to-hlx-orange/10 p-6 rounded-xl border border-hlx-gold/20 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Rocket size={100} />
                  </div>
                  <h3 className="text-hlx-gold font-bold mb-4 flex items-center gap-2 text-lg">
                    <Rocket size={20} /> Plano de Aceleração HELONEX
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Enquanto cuidamos da burocracia, sugerimos implementar estas soluções para blindar sua operação e garantir a aprovação:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                     {displayInfo.strategyUpsell.map((tip, idx) => (
                       <div key={idx} className="flex items-center gap-2 text-sm text-white bg-slate-900/40 p-2 rounded border border-white/5">
                         <ShieldCheck size={14} className="text-green-400" />
                         {tip}
                       </div>
                     ))}
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl border border-white/5">
                   <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                     <div>
                       <h4 className="text-white font-bold flex items-center gap-2">
                         <Wallet size={18} className="text-hlx-gold" /> Investimento na Assessoria
                       </h4>
                       <p className="text-gray-400 text-sm mt-1">
                         Honorários Técnicos para Gestão do Processo Completo.
                       </p>
                     </div>
                     <div className="text-right">
                        <span className="text-3xl font-bold text-white block">R$ 2.800,00</span>
                        <span className="text-xs text-gray-500">ou 12x no Cartão de Crédito</span>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <button 
                        onClick={onConsultMentor}
                        className="py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 border border-white/10"
                      >
                        <MessageSquare size={18} />
                        Tirar Dúvidas com IA
                      </button>
                      <button className="py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20">
                        <FileText size={18} />
                        Solicitar Contrato e Checklist
                      </button>
                   </div>
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-800/50 rounded-2xl border border-white/5 border-dashed">
                <div className="bg-slate-800 p-6 rounded-full mb-6 animate-pulse">
                  <MapPin size={48} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Inicie seu Planejamento</h3>
                <p className="text-gray-400 text-center px-6 max-w-md">
                  Clique na sigla do seu estado no mapa ao lado para visualizar os requisitos técnicos de empresa, frota e estrutura exigidos pela agência local.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StateLicensingMap;