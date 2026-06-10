
import React, { useState } from 'react';
import { 
  BookOpen, Clock, Users, Target, Award, Layers, 
  FileText, Zap, ChevronDown, ChevronRight, Share2, AlertCircle, Bus, ShieldCheck,
  PlayCircle, Video, Lock, Edit3, Eye, CheckCircle, XCircle
} from 'lucide-react';

type BSCEvel = 'Operacional' | 'Tático' | 'Estratégico';

interface CourseLesson {
  id: string;
  title: string;
  type: 'VIDEO' | 'TEXT' | 'QUIZ';
  duration: string;
  status: 'DRAFT' | 'REVIEW' | 'PUBLISHED';
  contentUrl?: string; // Link do vídeo ou PDF
  scriptPreview?: string; // O texto que a IA gerou ou o roteiro da aula
}

interface CourseModule {
  id: number;
  title: string;
  duration: string;
  objectives: string[]; 
  lessons: CourseLesson[]; // Adicionado detalhe das aulas
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

// DADOS MOCKADOS EXPANDIDOS COM CONTEÚDO REAL PARA VALIDAÇÃO
const COURSE_CATALOG: CourseSpec[] = [
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
        painPoint: 'Risco de cassação do TAF por baixo IQT.',
        gain: 'Segurança jurídica total operando no modelo de Regulação Responsiva.'
      }
    ],
    modules: [
      {
        id: 1,
        title: 'O Novo Marco Regulatório (Res. 6.033 & 6.074)',
        duration: '2h 00 min',
        objectives: ['Transição para a Regulação Responsiva.', 'O papel do IQT.'],
        lessons: [
            { 
                id: 'L1-01', title: 'Introdução: O Fim do Comando e Controle', type: 'VIDEO', duration: '15:00', status: 'PUBLISHED',
                contentUrl: 'https://example.com/video1.mp4',
                scriptPreview: 'ROTEIRO: Iniciar explicando que a ANTT não quer mais apenas multar, mas sim classificar as empresas. Explicar o conceito de IQT (Índice de Qualidade do Transportador). Se o IQT for alto, a fiscalização é menor.'
            },
            { 
                id: 'L1-02', title: 'Dosimetria das Penas: Como calcular o risco', type: 'TEXT', duration: '10:00', status: 'REVIEW',
                scriptPreview: 'DOCUMENTO TÉCNICO: Tabela de infrações atualizada 2026. Mostrar que a reincidência agora multiplica o valor da multa por 3x se a empresa estiver no nível Vermelho do Monitriip.'
            }
        ]
      },
      {
        id: 2,
        title: 'Monitriip DIS 4.0: Auditoria Digital',
        duration: '1h 30 min',
        objectives: ['Transmissão de Logs.', 'Hardware Portaria 9/2025.'],
        lessons: [
            { 
                id: 'L2-01', title: 'Hardware Homologado: O que comprar?', type: 'VIDEO', duration: '20:00', status: 'DRAFT',
                scriptPreview: 'ROTEIRO: Mostrar equipamentos da Mix, Sascar e Positron que atendem a latência de 1 minuto exigida. Alertar sobre equipamentos 2G que vão parar de funcionar.'
            }
        ]
      }
    ],
    associatedProducts: []
  },
  {
    id: 'rntrc-expert',
    title: 'RNTRC na Prática (Soberania Digital)',
    category: 'Nacional - ANTT',
    totalDuration: '3h 00min',
    lastUpdate: '01/02/2026',
    valueProposition: 'Ensine o transportador a realizar seu cadastro gratuito no Gov.br, eliminando o custo de terceiros.',
    targetAudience: [],
    modules: [
      {
        id: 1,
        title: 'Acesso Gov.br Prata/Ouro',
        duration: '40 min',
        objectives: ['Recuperação de conta', 'Validação Facial'],
        lessons: [
            {
                id: 'L1-RNTRC', title: 'Nivelando a Conta Gov.br', type: 'VIDEO', duration: '12:00', status: 'PUBLISHED',
                scriptPreview: 'Tutorial de tela: Acessar gov.br, clicar em selos de confiabilidade, validar bancário.'
            }
        ]
      }
    ],
    associatedProducts: []
  }
];

const CourseManagement: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<CourseSpec>(COURSE_CATALOG[0]);
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson | null>(null); // Estado para o modal de validação

  const handleValidateLesson = (status: 'PUBLISHED' | 'DRAFT') => {
      if(!selectedLesson) return;
      // Lógica de atualização (Mock)
      const updatedLesson = { ...selectedLesson, status };
      setSelectedLesson(updatedLesson);
      alert(`Conteúdo ${status === 'PUBLISHED' ? 'APROVADO' : 'REJEITADO'} com sucesso!`);
  };

  return (
    <div className="space-y-6 animate-fade-in-up h-full flex flex-col">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-xl border border-white/10 shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
            <BookOpen className="text-hlx-gold" size={28} />
            Gestão Acadêmica & Validação
          </h2>
          <p className="text-gray-400 text-sm">
            Auditoria de conteúdo pedagógico. Você tem o controle final sobre o que os alunos veem.
          </p>
        </div>
        <div className="bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/30 text-blue-400 text-xs font-bold uppercase">
            Admin Mode: Editor
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* COLUNA ESQUERDA: LISTA DE CURSOS */}
        <div className="lg:col-span-4 space-y-4 flex flex-col h-full">
          <div className="bg-slate-800 rounded-xl border border-white/5 overflow-hidden flex-1">
            <div className="p-4 border-b border-white/5 bg-slate-900/50">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">Catálogo de Cursos</h3>
            </div>
            <div className="p-2 space-y-1 overflow-y-auto max-h-[600px] custom-scrollbar">
              {COURSE_CATALOG.map(course => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`w-full text-left p-4 rounded-lg text-sm transition-all flex flex-col gap-1 group ${
                    selectedCourse.id === course.id 
                    ? 'bg-hlx-gold text-slate-900 font-bold shadow-lg' 
                    : 'bg-slate-900/50 text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                      <span className="truncate">{course.title}</span>
                      {selectedCourse.id === course.id && <ChevronRight size={16} />}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider ${selectedCourse.id === course.id ? 'text-slate-800' : 'text-gray-600'}`}>
                      {course.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: DETALHES E CONTEÚDO (CMS) */}
        <div className="lg:col-span-8 space-y-6 overflow-y-auto custom-scrollbar h-[calc(100vh-250px)] pr-2">
          
          {/* Info do Curso */}
          <div className="bg-slate-800 rounded-xl border border-white/5 p-6 shadow-lg">
             <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-hlx-blue uppercase bg-hlx-blue/10 px-2 py-1 rounded border border-hlx-blue/20">
                    {selectedCourse.category}
                  </span>
                  <h1 className="text-2xl font-bold text-white mt-2 mb-1">{selectedCourse.title}</h1>
                </div>
                <div className="text-right">
                   <p className="text-xs text-gray-500 uppercase font-bold">Última Atualização</p>
                   <p className="text-white font-mono">{selectedCourse.lastUpdate}</p>
                </div>
             </div>
             <p className="text-gray-300 italic leading-relaxed border-l-4 border-hlx-gold pl-4 bg-slate-900/30 p-3 rounded-r-lg">
                 "{selectedCourse.valueProposition}"
             </p>
          </div>

          {/* Estrutura de Módulos e Aulas (CMS) */}
          <div className="bg-slate-800 rounded-xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-slate-900/80 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2"><Layers size={18}/> Estrutura Curricular</h3>
              <span className="text-xs text-gray-500">{selectedCourse.modules.length} Módulos</span>
            </div>
            
            <div className="divide-y divide-white/5">
              {selectedCourse.modules.map((module) => (
                <div key={module.id} className="p-5">
                   <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-bold text-lg">{module.title}</h4>
                        <span className="text-xs text-gray-500 bg-slate-900 px-2 py-1 rounded border border-white/10">{module.duration}</span>
                   </div>
                   
                   {/* Lista de Aulas do Módulo */}
                   <div className="space-y-2 pl-4 border-l-2 border-white/10">
                       {module.lessons.map(lesson => (
                           <div key={lesson.id} className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-all group">
                               <div className="flex items-center gap-3">
                                   {lesson.type === 'VIDEO' ? <Video size={16} className="text-blue-400"/> : <FileText size={16} className="text-orange-400"/>}
                                   <div>
                                       <p className="text-sm font-medium text-white">{lesson.title}</p>
                                       <div className="flex items-center gap-2 mt-1">
                                           <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                                               lesson.status === 'PUBLISHED' ? 'text-green-400 border-green-500/30 bg-green-500/10' :
                                               lesson.status === 'REVIEW' ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' :
                                               'text-gray-400 border-gray-500/30 bg-gray-500/10'
                                           }`}>
                                               {lesson.status === 'PUBLISHED' ? 'Publicado' : lesson.status === 'REVIEW' ? 'Em Revisão' : 'Rascunho'}
                                           </span>
                                           <span className="text-[10px] text-gray-500">{lesson.duration}</span>
                                       </div>
                                   </div>
                               </div>
                               <button 
                                onClick={() => setSelectedLesson(lesson)}
                                className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded text-xs font-bold border border-white/10 flex items-center gap-2 transition-colors"
                               >
                                   <Eye size={14} /> Validar Conteúdo
                               </button>
                           </div>
                       ))}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE VALIDAÇÃO DE CONTEÚDO */}
      {selectedLesson && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in-up">
              <div className="bg-slate-900 w-full max-w-3xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                  
                  {/* Modal Header */}
                  <div className="p-6 border-b border-white/10 bg-slate-950 flex justify-between items-center">
                      <div>
                          <h3 className="text-xl font-bold text-white flex items-center gap-2">
                              {selectedLesson.type === 'VIDEO' ? <Video size={20} className="text-blue-400"/> : <FileText size={20} className="text-orange-400"/>}
                              {selectedLesson.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">ID: {selectedLesson.id} • Duração: {selectedLesson.duration}</p>
                      </div>
                      <button onClick={() => setSelectedLesson(null)} className="text-gray-400 hover:text-white"><XCircle size={24}/></button>
                  </div>

                  {/* Modal Body (Content Preview) */}
                  <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0f172a]">
                      <div className="mb-6">
                          <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                              <Edit3 size={14} /> Roteiro / Conteúdo Gerado (IA)
                          </h4>
                          <div className="bg-slate-800 p-6 rounded-xl border border-white/5 font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                              {selectedLesson.scriptPreview || "Conteúdo não disponível para pré-visualização."}
                          </div>
                      </div>

                      {selectedLesson.type === 'VIDEO' && (
                          <div className="mb-6">
                              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                                  <PlayCircle size={14} /> Preview de Mídia
                              </h4>
                              <div className="aspect-video bg-black rounded-xl flex items-center justify-center border border-white/10">
                                  <p className="text-gray-500 text-sm">Simulação do Player de Vídeo</p>
                              </div>
                          </div>
                      )}
                  </div>

                  {/* Modal Footer (Actions) */}
                  <div className="p-6 border-t border-white/10 bg-slate-950 flex justify-between items-center gap-4">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                          <ShieldCheck size={14} className="text-green-500" />
                          <span>Auditoria Administrativa</span>
                      </div>
                      <div className="flex gap-3">
                          <button 
                            onClick={() => handleValidateLesson('DRAFT')}
                            className="px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-bold transition-colors"
                          >
                              Rejeitar / Revisar
                          </button>
                          <button 
                            onClick={() => handleValidateLesson('PUBLISHED')}
                            className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold shadow-lg flex items-center gap-2 transition-colors"
                          >
                              <CheckCircle size={16} /> Aprovar & Publicar
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default CourseManagement;
