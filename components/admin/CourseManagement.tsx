import React, { useState } from 'react';
import { 
  BookOpen, Clock, Users, Target, Award, Layers, 
  FileText, Zap, ChevronDown, ChevronRight, Share2, AlertCircle 
} from 'lucide-react';

type BSCEvel = 'Operacional' | 'Tático' | 'Estratégico';

interface CourseModule {
  id: number;
  title: string;
  duration: string;
  objectives: string[]; 
  resources: string[]; 
}

interface AssociatedProduct {
  name: string;
  type: 'Upsell' | 'Cross-sell';
  description: string;
}

interface CourseSpec {
  id: string;
  title: string;
  category: string;
  totalDuration: string;
  lastUpdate: string;
  targetAudience: {
    role: string;
    level: BSCEvel;
    painPoint: string; 
    gain: string; 
  }[];
  valueProposition: string;
  modules: CourseModule[];
  associatedProducts: AssociatedProduct[];
}

const COURSE_CATALOG: CourseSpec[] = [
  // --- NOVO CURSO BASEADO NO PDF (ATUALIZAÇÃO IQT/DIS 4.0) ---
  {
    id: 'passengers-master-2026',
    title: 'Master em Gestão de Passageiros: O Novo Marco 2026',
    category: 'Passageiros - Regulação & Tecnologia',
    totalDuration: '8h 30min',
    lastUpdate: '20/01/2026',
    valueProposition: 'Domine a Regulação Responsiva da ANTT, o Monitriip DIS 4.0 e as novas regras de fiscalização para blindar sua frota de apreensões.',
    targetAudience: [
      {
        role: 'Gestor de Fretamento',
        level: 'Estratégico',
        painPoint: 'Risco de cassação do TAF por infrações do Grupo VIII (Clandestinidade).',
        gain: 'Segurança jurídica total operando no modelo de Circuito Fechado.'
      },
      {
        role: 'Transportador Escolar',
        level: 'Tático',
        painPoint: 'Medo da apreensão por idade da frota (15 anos).',
        gain: 'Planejamento de renovação de frota e gestão de vistorias semestrais.'
      }
    ],
    modules: [
      {
        id: 1,
        title: 'O Novo Marco Regulatório (Res. 6.074/2025)',
        duration: '2h 00 min',
        objectives: [
          'Transição do "Comando e Controle" para "Regulação Responsiva".',
          'Os 8 Grupos de Infrações e a Dosimetria das Penas.',
          'Como usar a "Autodenúncia" para converter multas em advertências.'
        ],
        resources: ['Tabela de Infrações IN 41/2025', 'Modelo de Recurso Administrativo']
      },
      {
        id: 2,
        title: 'Tecnologia Obrigatória: Monitriip DIS 4.0',
        duration: '1h 30 min',
        objectives: [
          'Requisitos de Hardware (Portaria nº 9/2025): IMEI, GPS de Precisão e Biometria.',
          'Transmissão de Logs de Venda em Tempo Real.',
          'Como evitar multas automáticas por falha de transmissão.'
        ],
        resources: ['Checklist de Validação de Hardware', 'Manual de Integração API']
      },
      {
        id: 3,
        title: 'Regime de Autorização e Janelas de Mercado',
        duration: '1h 30 min',
        objectives: [
          'Solicitação de TAR para novas linhas (Res. 6.033).',
          'Gestão Digital via SIGMA (Alteração de Horários).',
          'Diferença entre Serviço Regular e Fretamento Eventual.'
        ],
        resources: ['Guia Prático do Sistema SIGMA']
      },
      {
        id: 4,
        title: 'Gestão de Frota Escolar e Rural',
        duration: '1h 00 min',
        objectives: [
          'Limite de Idade (15 anos) e Vistoria ITL.',
          'PNATE e transporte de professores na zona rural.',
          'Regras Estaduais (ARTESP/DER-MG).'
        ],
        resources: ['Planilha de Depreciação de Frota']
      }
    ],
    associatedProducts: [
      {
        name: 'Auditor Monitriip (Software)',
        type: 'Upsell',
        description: 'Sistema que valida os dados antes de enviar para a ANTT.'
      },
      {
        name: 'Seguro APP Coletivo',
        type: 'Cross-sell',
        description: 'Apólice obrigatória para liberação de licença de viagem.'
      }
    ]
  },
  {
    id: 'tric-special',
    title: 'Fronteiras sem Barreiras: Eventos & Carga Própria',
    category: 'Internacional - Projetos Especiais',
    totalDuration: '5h 20min',
    lastUpdate: '20/02/2026',
    valueProposition: 'Capacitar produtores de eventos, artistas e empresários do agro a realizar trâmites aduaneiros de admissão temporária sem intermediários.',
    targetAudience: [
      {
        role: 'Produtor de Eventos / Banda',
        level: 'Tático',
        painPoint: 'Equipamento retido na fronteira por falta de manifesto.',
        gain: 'Liberdade para fazer turnês no Mercosul sem sustos.'
      },
      {
        role: 'Empresário do Agronegócio',
        level: 'Estratégico',
        painPoint: 'Custo alto para levar animais e máquinas para feiras.',
        gain: 'Autonomia para emissão de CVI e trânsito aduaneiro.'
      }
    ],
    modules: [
      {
        id: 1,
        title: 'Regimes Aduaneiros Especiais',
        duration: '1h 30 min',
        objectives: [
          'Diferença entre Exportação Definitiva e Temporária.',
          'O que é Admissão Temporária.',
          'Uso do Carnê ATA (Passaporte de Mercadorias).'
        ],
        resources: ['Modelo de Manifesto de Carga', 'Lista de Inventário']
      },
      {
        id: 2,
        title: 'Logística de Carga Viva',
        duration: '1h 00 min',
        objectives: [
          'Exigências Sanitárias (MAPA/SENASA).',
          'Certificado Veterinário Internacional (CVI).',
          'Bem-estar animal no transporte.'
        ],
        resources: ['Guia de Trânsito Animal (GTA)']
      }
    ],
    associatedProducts: [
      {
        name: 'Consultoria Premium TRIC',
        type: 'Upsell',
        description: 'Venda de assessoria completa para grandes turnês ou projetos complexos.'
      },
      {
        name: 'Seguro RCTR-VI (Carta Azul)',
        type: 'Cross-sell',
        description: 'Seguro obrigatório para o veículo que fará o transporte.'
      }
    ]
  },
  {
    id: 'rntrc-expert',
    title: 'RNTRC na Prática (Brasil)',
    category: 'Nacional - ANTT',
    totalDuration: '3h 00min',
    lastUpdate: '01/02/2026',
    valueProposition: 'Ensinar o transportador a realizar seu cadastro gratuito no Gov.br, eliminando a "taxa de desconhecimento" cobrada pelo mercado.',
    targetAudience: [
      {
        role: 'Transportador Autônomo (TAC)',
        level: 'Operacional',
        painPoint: 'Medo de fiscalização e falta de dinheiro para pagar sindicato.',
        gain: 'Regularização imediata a custo zero.'
      },
      {
        role: 'Gestor de Frota',
        level: 'Tático',
        painPoint: 'Demora na inclusão de veículos novos na frota.',
        gain: 'Agilidade: Inclusão de veículo em 5 minutos via sistema.'
      }
    ],
    modules: [
      {
        id: 1,
        title: 'Acesso Gov.br e Requisitos',
        duration: '40 min',
        objectives: ['Recuperar senha Gov.br', 'Níveis de Conta (Prata/Ouro)', 'Validação Facial'],
        resources: ['App Gov.br']
      },
      {
        id: 2,
        title: 'Cadastro ETC e TAC',
        duration: '1h 20 min',
        objectives: ['Cadastro de Responsável Técnico', 'Vínculo de Frota (Renavam)', 'Emissão de Extrato'],
        resources: ['Resolução 5.982']
      }
    ],
    associatedProducts: [
      {
        name: 'Curso MOPP Online',
        type: 'Cross-sell',
        description: 'Motoristas TAC geralmente precisam de cursos especializados.'
      },
      {
        name: 'Emissão de CIOT',
        type: 'Upsell',
        description: 'Venda de sistema emissor de PEF/CIOT integrado.'
      }
    ]
  }
];

const CourseManagement: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<CourseSpec>(COURSE_CATALOG[0]);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  const toggleModule = (id: number) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* HEADER DA ÁREA */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
            <BookOpen className="text-hlx-gold" size={32} />
            Gestão Acadêmica & Engenharia Pedagógica
          </h2>
          <p className="text-gray-300 max-w-3xl text-lg">
            Visão de Raio-X dos produtos educacionais. Utilize estes dados para treinamento de equipe, alinhamento estratégico e aplicação de aulas presenciais.
          </p>
        </div>
        <div className="absolute right-0 top-0 p-6 opacity-5">
          <Layers size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR: LISTA DE CURSOS */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-800 rounded-xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-slate-900/50">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">Catálogo de Cursos</h3>
            </div>
            <div className="p-2">
              {COURSE_CATALOG.map(course => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`w-full text-left p-3 rounded-lg text-sm mb-1 transition-all flex items-center justify-between group ${
                    selectedCourse.id === course.id 
                    ? 'bg-hlx-gold text-slate-900 font-bold shadow-lg' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="truncate">{course.title}</span>
                  {selectedCourse.id === course.id && <ChevronRight size={16} />}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-white/5">
              <button className="w-full py-2 border border-dashed border-gray-600 rounded text-gray-500 text-xs hover:border-hlx-gold hover:text-hlx-gold transition-colors flex items-center justify-center gap-2">
                + Criar Novo Curso
              </button>
            </div>
          </div>

          {/* KPI RÁPIDO */}
          <div className="bg-slate-800 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-3 mb-2">
               <Clock className="text-blue-400" size={20} />
               <div>
                 <p className="text-xs text-gray-500">Carga Horária Total</p>
                 <p className="text-white font-bold">{selectedCourse.totalDuration}</p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <AlertCircle className="text-green-400" size={20} />
               <div>
                 <p className="text-xs text-gray-500">Última Atualização</p>
                 <p className="text-white font-bold">{selectedCourse.lastUpdate}</p>
               </div>
            </div>
          </div>
        </div>

        {/* ÁREA PRINCIPAL: DETALHES DO CURSO */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* 1. CABEÇALHO DO CURSO E PROPOSTA DE VALOR */}
          <div className="bg-slate-800 rounded-xl border border-white/5 p-6 shadow-lg">
             <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-hlx-blue uppercase bg-hlx-blue/10 px-2 py-1 rounded border border-hlx-blue/20">
                    {selectedCourse.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-1">{selectedCourse.title}</h1>
                </div>
                <button className="text-gray-400 hover:text-white p-2 bg-slate-700 rounded-lg">
                  <Share2 size={18} />
                </button>
             </div>
             
             <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-hlx-gold">
               <h4 className="text-hlx-gold font-bold text-sm uppercase mb-1 flex items-center gap-2">
                 <Target size={16} /> Propósito de Valor (The "Why")
               </h4>
               <p className="text-gray-300 italic leading-relaxed">"{selectedCourse.valueProposition}"</p>
             </div>
          </div>

          {/* 2. MATRIZ BSC (NÍVEIS DE ENSINO) */}
          <div className="grid md:grid-cols-3 gap-4">
            {selectedCourse.targetAudience.map((target, idx) => (
              <div key={idx} className="bg-slate-800 p-5 rounded-xl border border-white/5 hover:border-hlx-blue/30 transition-colors relative overflow-hidden group">
                <div className={`absolute top-0 left-0 w-1 h-full ${
                  target.level === 'Estratégico' ? 'bg-purple-500' :
                  target.level === 'Tático' ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                
                <div className="flex items-center gap-2 mb-3">
                   <Award size={18} className={
                     target.level === 'Estratégico' ? 'text-purple-400' :
                     target.level === 'Tático' ? 'text-blue-400' : 'text-green-400'
                   } />
                   <span className="font-bold text-white text-sm uppercase">{target.level}</span>
                </div>
                
                <h4 className="text-white font-bold text-sm mb-2">{target.role}</h4>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] text-red-400 font-bold uppercase">A Dor (Pain):</p>
                    <p className="text-xs text-gray-400 leading-snug">{target.painPoint}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-green-400 font-bold uppercase">O Ganho (Gain):</p>
                    <p className="text-xs text-gray-400 leading-snug">{target.gain}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. GRADE CURRICULAR DETALHADA */}
          <div className="bg-slate-800 rounded-xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-slate-900/80 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Layers className="text-hlx-orange" size={20} /> Grade Curricular & Objetivos de Ensino
              </h3>
              <span className="text-xs text-gray-500">{selectedCourse.modules.length} Módulos</span>
            </div>

            <div className="divide-y divide-white/5">
              {selectedCourse.modules.map((module) => (
                <div key={module.id} className="bg-slate-800">
                  <button 
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between p-5 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-900 w-10 h-10 rounded flex items-center justify-center text-gray-400 font-bold border border-white/10">
                        {module.id}
                      </div>
                      <div className="text-left">
                        <h4 className="text-white font-bold text-sm md:text-base">{module.title}</h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={12} /> {module.duration}
                        </p>
                      </div>
                    </div>
                    {expandedModules.includes(module.id) ? <ChevronDown className="text-hlx-gold" /> : <ChevronRight className="text-gray-500" />}
                  </button>

                  {expandedModules.includes(module.id) && (
                    <div className="px-5 pb-5 pl-[4.5rem] animate-fade-in-down">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold text-green-400 uppercase mb-2 flex items-center gap-1">
                            <Target size={12} /> Objetivos de Aprendizagem
                          </p>
                          <ul className="space-y-1">
                            {module.objectives.map((obj, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                <span className="text-green-500 mt-1.5">•</span> {obj}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                           <p className="text-xs font-bold text-blue-400 uppercase mb-2 flex items-center gap-1">
                            <FileText size={12} /> Material de Apoio (Mentor)
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {module.resources.map((res, i) => (
                              <span key={i} className="bg-slate-900 border border-white/10 px-2 py-1 rounded text-xs text-gray-400 hover:text-white hover:border-hlx-gold cursor-pointer transition-colors">
                                📄 {res}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. ESTRATÉGIA COMERCIAL (CROSS-SELL & UPSELL) */}
          <div className="bg-gradient-to-r from-green-900/20 to-slate-800 rounded-xl border border-green-500/20 p-6">
            <h3 className="font-bold text-white flex items-center gap-2 mb-4">
              <Zap className="text-yellow-400" size={20} /> Ecossistema de Vendas (Oportunidades)
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Este curso não é o fim, é o meio. Utilize o conteúdo para ofertar as seguintes soluções complementares:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              {selectedCourse.associatedProducts.map((prod, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-white/5 relative group hover:border-green-500/50 transition-colors">
                  <div className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    prod.type === 'Upsell' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {prod.type}
                  </div>
                  <h4 className="text-white font-bold text-sm mt-4 mb-2">{prod.name}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-300">
                    {prod.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseManagement;