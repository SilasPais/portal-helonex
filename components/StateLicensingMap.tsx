
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
    description: 'Regulação Intermunicipal de Alta Complexidade. Auditoria HELONEX focada no IQT estadual.',
    timeline: '90 a 120 dias (Fila de Análise Técnica)',
    companyReqs: [
      'Capital Social Integralizado (Mínimo exigido por veículo no Fretamento).',
      'Certidões Negativas Estaduais de SP (Dívida Ativa).',
      'CNAE 4929-9/02 - Transporte Rodoviário Coletivo de Passageiros.'
    ],
    fleetReqs: [
      'Idade Máxima: 15 anos para Rodoviário.',
      'Vistoria Técnica Semestral Obrigatória em oficinas ARTESP.',
      'Veículos obrigatoriamente com placa vermelha de SP.'
    ],
    infraReqs: [
      'Pátio de estacionamento com certidão de zoneamento.',
      'Canal de Atendimento 0800 para reclamações ARTESP.',
      'Responsável Técnico cadastrado no sistema GBS.'
    ],
    strategyUpsell: [
      'Auditoria Mensal de Vencimento HELONEX/ARTESP.',
      'Curso Especializado HELONEX para Condutores.',
      'Seguro APP com coberturas estaduais integradas.'
    ]
  },
  'RJ': { 
    id: 'RJ', name: 'Rio de Janeiro', agency: 'DETRO-RJ', 
    description: 'Departamento de Transportes Rodoviários do RJ. Monitoramento Monitriip DIS 4.0 exigido.',
    timeline: '60 a 90 dias',
    companyReqs: [
      'Inscrição Estadual de Transportador Ativa no RJ.',
      'Certidão de Idoneidade Financeira emitida pelo DETRO.',
      'Taxa de DUDA de Cadastro Intermunicipal.'
    ],
    fleetReqs: [
      'Identificação Visual Padronizada (Faixas DETRO).',
      'Vistoria Mecânica e de Higiene Anual.',
      'Limite de idade de frota rigoroso para micro-ônibus.'
    ],
    infraReqs: [
      'Garagem administrativa no estado do RJ.',
      'Sistema de Monitoramento Integrado ao DETRO.'
    ],
    strategyUpsell: [
      'Layout e Adesivagem Padrão DETRO.',
      'Defesa de Multas JusTech Posto Fiscal RJ.'
    ]
  },
  'MG': { 
    id: 'MG', name: 'Minas Gerais', agency: 'DER-MG', 
    description: 'Agência de Fretamento e Regular intermunicipal de MG.',
    timeline: '60 a 90 dias',
    companyReqs: [
      'Registro CGF (Cadastro Geral de Fretamento).',
      'Certidão Negativa de Falência (Socio).',
      'Comprovante de Regularidade de ICMS MG.'
    ],
    fleetReqs: [
      'LIV (Laudo de Inspeção Veicular) por engenheiro DER.',
      'Seguro APP Coletivo conforme legislação MG.',
      'Carteira do Motorista (DER) para o condutor.'
    ],
    infraReqs: [
      'Livro de Manutenção preventiva auditável.',
      'Ponto de apoio em Minas Gerais.'
    ],
    strategyUpsell: [
      'Emissão de Laudos LIV via Parceiros HELONEX.',
      'Software de Escala DER-MG Integrado.'
    ]
  },
  'BA': { 
    id: 'BA', name: 'Bahia', agency: 'AGERBA', 
    description: 'Agência Estadual de Regulação de Transportes da Bahia.',
    timeline: '60 a 120 dias',
    companyReqs: [
      'Certificado de Registro (CR) AGERBA.',
      'Regularidade com a Secretaria da Fazenda da Bahia.',
      'Capital Social compatível com a quantidade de assentos da frota.'
    ],
    fleetReqs: [
      'Selo de Vistoria AGERBA Anual.',
      'Idade média da frota controlada (Sistema AGERBA).',
      'Seguro de Responsabilidade Civil e Acidentes.'
    ],
    infraReqs: [
      'Pagamento de Taxa de Fiscalização Semestral (TFR).',
      'SAC 24h para passageiros intermunicipais.'
    ],
    strategyUpsell: [
      'Gestão de Taxas AGERBA (Calendário Automático).',
      'Treinamento de Atendimento HELONEX.'
    ]
  },
  'RS': { 
    id: 'RS', name: 'Rio Grande do Sul', agency: 'DAER-RS', 
    description: 'Departamento Autônomo de Estradas de Rodagem do RS.',
    timeline: '45 a 60 dias',
    companyReqs: [
      'Registro DAER (Turismo ou Contínuo).',
      'CADASTUR ativo e vinculado ao CNPJ.',
      'Certidões Criminais dos Sócios (Estadual e Federal).'
    ],
    fleetReqs: [
      'Vistoria de Engenharia Mecânica Anual.',
      'Tacógrafo Aferido INMETRO.',
      'Cintos de segurança operantes em todos os assentos.'
    ],
    infraReqs: [
      'Protocolo de Higienização de Frota.',
      'Sistema de Gestão de Lista de Passageiros DAER.'
    ],
    strategyUpsell: [
      'Pacote DAER + CADASTUR Integrado.',
      'Marketing Digital HELONEX para Rotas da Serra Gaúcha.'
    ]
  },
  'DEFAULT': { 
    id: 'BR', name: 'Brasil Regional', agency: 'Agência Estadual / DER local', 
    description: 'Consultoria Personalizada conforme legislação de cada UF (Selo HELONEX 2026).',
    timeline: '60 a 90 dias (Média Nacional)',
    companyReqs: [
      'CNPJ com CNAE de Transporte (4929-9).',
      'Certidões Negativas de Débito Estaduais.',
      'Inscrição Estadual Válida.'
    ],
    fleetReqs: [
      'Veículos Categoria Aluguel (Placa Vermelha).',
      'Laudo de Inspeção Veicular (ITL/Inmetro).',
      'Seguro APP com cobertura para todos os ocupantes.'
    ],
    infraReqs: [
      'Ponto de apoio ou Garagem na UF sede.',
      'Atendimento ao Usuário (SAC 0800).'
    ],
    strategyUpsell: [
      'Diagnóstico de Conformidade Regional.',
      'Integração com Monitriip Federal (ANTT).',
      'Plano de Carreira HELONEX para Condutores.'
    ]
  }
};

const StateLicensingMap: React.FC<StateLicensingMapProps> = ({ onBack, onConsultMentor }) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleStateClick = (uf: string) => {
    setSelectedState(uf);
  };

  const activeData = selectedState && STATE_DATA[selectedState] ? STATE_DATA[selectedState] : STATE_DATA['DEFAULT'];
  
  return (
    <div className="bg-slate-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} /> Voltar ao Hub
          </button>
          
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Mapa de <span className="text-hlx-gold">Fretamento Intermunicipal</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Clique no estado sede para visualizar o dossiê completo de concessão estadual. Garantia **Erro Zero HELONEX** na habilitação das UFs brasileiras.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4 bg-slate-800 p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
               <MapPin size={120} className="text-hlx-blue" />
             </div>
             
             <h3 className="text-white font-bold mb-6 flex items-center gap-2">
               <MapPin className="text-hlx-orange" /> Selecione a UF Sede
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
                 <strong>Auditoria HELONEX:</strong> Para operar transporte regional, o cadastro estadual é mandatório. O desrespeito a esta regra anula a cobertura de seguros interestaduais.
               </p>
             </div>
          </div>

          <div className="lg:col-span-8 relative">
            {selectedState ? (
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-hlx-gold/30 rounded-2xl p-8 shadow-2xl animate-fade-in-up">
                
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 border-b border-white/10 pb-6 gap-4">
                  <div>
                    <span className="text-hlx-orange font-bold tracking-widest text-xs uppercase mb-1 block">Órgão Regulador Estadual</span>
                    <h2 className="text-4xl font-display font-bold text-white">{activeData.agency}</h2>
                    <p className="text-gray-400 mt-1 text-lg">{activeData.name} (Habilitação Regional)</p>
                    <p className="text-gray-500 text-sm mt-2 max-w-xl">{activeData.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-hlx-gold/10 p-3 rounded-lg">
                      <Bus size={32} className="text-hlx-gold" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-hlx-gold font-bold border border-hlx-gold/30 px-2 py-1 rounded-full">
                      <Clock size={12} /> Prazo Estimado: {activeData.timeline}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-950/50 p-5 rounded-xl border border-white/5 hover:border-hlx-blue/30 transition-colors">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                      <Building2 size={18} className="text-hlx-blue" /> Requisitos da Empresa
                    </h3>
                    <ul className="space-y-3">
                      {activeData.companyReqs.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                          <CheckCircle size={14} className="text-hlx-blue mt-1 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/50 p-5 rounded-xl border border-white/5 hover:border-hlx-orange/30 transition-colors">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
                      <Bus size={18} className="text-hlx-orange" /> Frota & Operação
                    </h3>
                    <ul className="space-y-3">
                      {activeData.fleetReqs.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                          <CheckCircle size={14} className="text-hlx-orange mt-1 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-hlx-gold/10 to-hlx-orange/10 p-6 rounded-xl border border-hlx-gold/20 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Rocket size={100} />
                  </div>
                  <h3 className="text-hlx-gold font-bold mb-4 flex items-center gap-2 text-lg">
                    <Rocket size={20} /> Plano de Ação HELONEX
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                     {activeData.strategyUpsell.map((tip, idx) => (
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
                         <Wallet size={18} className="text-hlx-gold" /> Assessoria Técnica HELONEX
                       </h4>
                       <p className="text-gray-400 text-sm mt-1">Gestão de Licenciamento Estadual.</p>
                     </div>
                     <div className="text-right">
                        <span className="text-3xl font-bold text-white block">R$ 3.200,00</span>
                        <span className="text-xs text-gray-500 font-bold uppercase">Taxa Única por UF</span>
                     </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <button 
                        onClick={onConsultMentor}
                        className="py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 border border-white/10"
                      >
                        <MessageSquare size={18} /> Consultar Mentor IA
                      </button>
                      <button className="py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg">
                        <FileText size={18} /> Iniciar Processo de Cadastro
                      </button>
                   </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-800/50 rounded-2xl border border-white/5 border-dashed">
                <div className="bg-slate-800 p-6 rounded-full mb-6 animate-pulse">
                  <MapPin size={48} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Auditando Mapa Regional...</h3>
                <p className="text-gray-400 text-center px-6 max-w-md">
                  Selecione uma sigla estadual para carregar as regras específicas da agência estadual correspondente.
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
