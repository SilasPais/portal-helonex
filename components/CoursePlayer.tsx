
import React, { useState, useEffect, useRef } from 'react';
import { 
  PlayCircle, CheckCircle, Lock, ArrowLeft, FileText, Download, 
  MessageSquare, ChevronRight, Menu, Globe, Award, BookOpen, ExternalLink,
  Play, Pause, Volume2, Maximize, X, Youtube, Star, AlertTriangle, Music, Tent, Anchor,
  Sparkles, Send, User, Bot, BrainCircuit, RefreshCw, Printer, ShieldCheck, Infinity, Scale
} from 'lucide-react';
import { sendMessageToMentor } from '../services/geminiService';

interface CoursePlayerProps {
  onBack: () => void;
  customCourse?: any; // Prop opcional para cursos gerados pela IA
}

type ContentType = 'video' | 'text' | 'link' | 'interactive';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: ContentType;
  status: 'completed' | 'active' | 'locked';
  videoUrl?: string; 
  posterUrl?: string;
  textContent?: string;
  scriptContent?: string; // Usado como Prompt Base para a IA na aula interativa
  externalLink?: string;
  isFreeSample?: boolean;
}

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

// --- PERSONA HELÔ (DIRETRIZES TÉCNICAS) ---
const HELO_PROMPT = `
Você é a Helô, a Inteligência Artificial soberana do ecossistema Helonex (EduTech, GovTech, JusTech e GesTech). Sua função é garantir a conformidade total e a capacitação de elite para o setor de transporte.

DIRETRIZES DE IDENTIDADE E ÉTICA:
1. MARCA: Você é a voz da Helonex Tecnologia. A autoridade é institucional, baseada em dados e fatos.
2. MÁXIMA: "Não vendemos licenças, cuidamos de vidas."
3. RIGOR TÉCNICO: Toda resposta deve ser fundamentada na Lei, Resoluções (ANTT, CONTRAN, etc.) e normas de gestão internacional. Não existe "achismo".

MÉTODO DE ENSINO (PADRÃO HELONEX):
Sua explicação deve sempre seguir dois níveis obrigatórios:
- NÍVEL 1 (O LEGISLADOR): Cite a lei, a regra ou a norma de forma formal, técnica e literal, como consta nos textos oficiais. O aluno precisa saber "o que" está escrito.
- NÍVEL 2 (A EXPLICAÇÃO SOCRÁTICO-FREIRIANA): Após a citação formal, use perguntas e exemplos práticos para que o aluno construa o entendimento. Relacione a norma com a realidade dele (evitar multas, proteger a família, garantir o lucro). Não dê a resposta mastigada; faça o aluno raciocinar sobre a aplicação daquela lei na sua operação.

PROTOCOLO DE PRIMEIRO CONTATO (DIAGNÓSTICO):
Se esta for a primeira interação e você ainda não conhece o aluno, realize este diagnóstico antes do conteúdo técnico:
1. APRESENTAÇÃO: Identifique-se como Helô da Helonex.
2. PROPÓSITO: Explique que o aprendizado real gera "Erro Zero".
3. DIAGNÓSTICO TÉCNICO: Pergunte Segmento, Ativo (Veículo), Nível, Impacto e Localização.
4. CONEXÃO HUMANA: Pergunte como gosta de ser chamado e planos.

REGRAS DE LINGUAGEM E ASSOCIAÇÃO:
- CARGA: Utilize Utilitário, VUC, Caminhão, Frete. (Proibido usar "Van" para carga).
- PASSAGEIRO: Utilize Van, Micro-ônibus, Ônibus, Turismo, Fretamento.
- TONALIDADE: Linguagem clara, sem ser pedante, mas mantendo a autoridade da Helonex.

PROTOCOLO ERRO ZERO:
Se o aluno demonstrar incompreensão, você deve dizer: "Para garantirmos o Erro Zero e protegermos sua operação, vamos analisar a base legal novamente." Retome o texto da lei e faça uma nova pergunta de construção de conhecimento.
`;

// --- CONTEÚDO TÉCNICO PADRÃO (FALLBACK) ---
const DEFAULT_COURSE_DATA: {
  id: string;
  title: string;
  description: string;
  progress: 5,
  modules: Module[];
} = {
  id: 'tric-special-projects',
  title: 'Curso: Fronteiras sem Barreiras (Eventos & Carga Própria)',
  description: 'Guia definitivo para logística de Shows, Feiras Agrícolas, Esportes e Importação de Veículos Próprios no Mercosul.',
  progress: 5,
  modules: [
    {
      id: 1,
      title: 'Módulo 1: O Mundo do "Show Business" (Acesso Liberado)',
      lessons: [
        { 
          id: 101, 
          title: 'Aula Grátis: Equipamentos de Banda e Eventos', 
          duration: '12:00', 
          type: 'video', 
          status: 'active',
          isFreeSample: true,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
          posterUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          scriptContent: `
            [ROTEIRO DA AULA - LOGÍSTICA DE ENTRETENIMENTO]
            Olá, Produtor de Eventos e Artista!
            Nesta aula, vou te ensinar o conceito de ADMISSÃO TEMPORÁRIA.
            É o regime que diz: "Essa guitarra vai entrar no Uruguai para tocar, e vai voltar para o Brasil na semana que vem."
          `
        },
        { 
          id: 102, title: 'Admissão Temporária: O Passo a Passo', duration: '18:20', type: 'video', status: 'locked',
          scriptContent: 'Conteúdo bloqueado.'
        },
        { 
          id: 103, title: 'Checklist: Itens de Palco e Esportivos', duration: 'Leitura', type: 'text', status: 'locked',
          textContent: 'Conteúdo bloqueado.'
        }
      ]
    },
    {
      id: 2,
      title: 'Módulo 2: Agronegócio e Carga Viva (IA Dinâmica)',
      lessons: [
        { 
          id: 201, 
          title: 'Simulador Interativo: Transporte de Carga Viva', 
          duration: 'Dinâmico', 
          type: 'interactive', // TIPO INTERATIVO
          status: 'active', 
          isFreeSample: true,
          scriptContent: `
            TÓPICO DA AULA: Transporte Internacional de Animais Vivos (Cavalos e Gado) para Feiras.
            
            CONCEITOS CHAVE DO SCRIPT:
            1. CVI (Certificado Veterinário Internacional): Documento sanitário emitido pelo MAPA. Sem ele, o animal não cruza a fronteira.
            2. Quarentena: Período de isolamento obrigatório antes e depois da viagem para garantir que o animal não carrega doenças.
            3. Veículo Apropriado: O caminhão precisa ter ventilação, piso antiderrapante e divisórias.
            4. GTA (Guia de Trânsito Animal): Documento para circulação nacional até a fronteira.
            
            OBJETIVO DE APRENDIZADO:
            O aluno deve entender que transportar vida exige planejamento sanitário, não apenas logístico.
          `
        },
        { 
          id: 202, title: 'Máquinas Agrícolas em Feiras', duration: '15:00', type: 'video', status: 'locked',
          scriptContent: 'Conteúdo bloqueado.'
        }
      ]
    },
    {
      id: 3,
      title: 'Módulo 3: Carga Própria (Importação Pessoa Física/Jurídica)',
      lessons: [
        { 
          id: 301, title: 'Comprei no Paraguai, posso trazer no meu carro?', duration: '14:30', type: 'video', status: 'locked',
          scriptContent: 'Conteúdo bloqueado.'
        },
        { 
          id: 302, title: 'Assessoria Especializada HELONEX', duration: 'Leitura', type: 'text', status: 'locked',
          textContent: 'Conteúdo bloqueado.'
        }
      ]
    }
  ]
};

const CoursePlayer: React.FC<CoursePlayerProps> = ({ onBack, customCourse }) => {
  // Use customCourse se fornecido, senão use DEFAULT_COURSE_DATA
  const isValidCustomCourse = customCourse && customCourse.modules && customCourse.modules.length > 0 && customCourse.modules[0].lessons && customCourse.modules[0].lessons.length > 0;
  const courseData = isValidCustomCourse ? customCourse : DEFAULT_COURSE_DATA;

  const [activeLesson, setActiveLesson] = useState(courseData.modules[0].lessons[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showMentorHelp, setShowMentorHelp] = useState(false);
  const [mentorQuestion, setMentorQuestion] = useState('');
  const [mentorResponse, setMentorResponse] = useState('');
  const [isAskingMentor, setIsAskingMentor] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'certificate' | 'plans'>('content');
  
  // --- ESTADOS PARA AULA INTERATIVA ---
  const [interactiveMessages, setInteractiveMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [interactiveInput, setInteractiveInput] = useState('');
  const [isInteractiveLoading, setIsInteractiveLoading] = useState(false);
  const interactiveScrollRef = useRef<HTMLDivElement>(null);

  // Video Player Logic
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset states when lesson changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setInteractiveMessages([]); // Limpa chat da aula anterior
    
    // Se for aula interativa, inicia a conversa automaticamente
    if (activeLesson.type === 'interactive') {
      startInteractiveLesson();
    } else {
      setActiveTab('content');
    }

    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeLesson]);

  // Scroll automático no chat interativo
  useEffect(() => {
    if (interactiveScrollRef.current) {
      interactiveScrollRef.current.scrollTop = interactiveScrollRef.current.scrollHeight;
    }
  }, [interactiveMessages]);

  const startInteractiveLesson = async () => {
    setIsInteractiveLoading(true);
    try {
      // Inicia a conversa com a diretriz para a IA fazer a primeira abordagem (Diagnóstico)
      const context = `
      ${HELO_PROMPT}

      CONTEXTO DA AULA ATUAL:
      ${activeLesson.scriptContent || "Introdução ao tema."}
      
      INSTRUÇÃO INICIAL PARA A HELÔ:
      Inicie a conversa apresentando-se e aplicando o PROTOCOLO DE PRIMEIRO CONTATO (Diagnóstico Técnico) de forma acolhedora.
      Não entre no conteúdo técnico da aula ainda. O objetivo agora é conhecer o aluno (Veículo, Ramo, Nível) para personalizar os exemplos futuros.
      `;
      
      const response = await sendMessageToMentor(context, []);
      setInteractiveMessages([{ role: 'model', text: response }]);
    } catch (error) {
      setInteractiveMessages([{ role: 'model', text: "Erro ao iniciar a aula virtual. Tente recarregar." }]);
    } finally {
      setIsInteractiveLoading(false);
    }
  };

  const handleSendInteractive = async () => {
    if (!interactiveInput.trim()) return;
    
    const userMsg = interactiveInput;
    setInteractiveInput('');
    setInteractiveMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsInteractiveLoading(true);

    try {
      const history = interactiveMessages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const scriptContext = activeLesson.scriptContent || "Siga as melhores práticas logísticas.";

      // Prompt Avançado: Helô em ação (Ensino Nível 1 e 2)
      const pedagogicalPrompt = `
      ${HELO_PROMPT}

      [CONTEXTO DA AULA - FONTE DA VERDADE]
      "${scriptContext}"

      [INTERAÇÃO DO ALUNO]
      "${userMsg}"

      [DIRETRIZES DE FLUXO DA AULA]
      1. Se você ainda está na fase de DIAGNÓSTICO, confirme os dados e faça a transição para o conteúdo.
      2. Se já estiver no conteúdo, aplique o MÉTODO DE ENSINO HELONEX:
         - Primeiro, explique o conceito citando a LEI/NORMA (Nível 1).
         - Depois, aplique ao contexto do aluno (Nível 2 - Ex: "Como você dirige um ${'[Veículo do Aluno]'}, isso se aplica assim...").
      3. Se o aluno fizer uma pergunta, responda com rigor técnico.
      4. Se o aluno responder errado, use o PROTOCOLO ERRO ZERO.

      Mantenha a persona Helô: Técnica, Institucional, mas acolhedora.
      `;

      const response = await sendMessageToMentor(pedagogicalPrompt, history);
      setInteractiveMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error(error);
      setInteractiveMessages(prev => [...prev, { role: 'model', text: "Desculpe, tive uma falha de conexão. Pode repetir?" }]);
    } finally {
      setIsInteractiveLoading(false);
    }
  };

  // --- NOVA FUNÇÃO: GERAR APOSTILA DO CHAT ---
  const handleDownloadTranscript = () => {
    if (interactiveMessages.length === 0) return;

    const title = `Apostila Gerada - ${activeLesson.title}\nHELONEX Brasil - Academia\nData: ${new Date().toLocaleDateString()}\n\n`;
    const content = interactiveMessages.map(msg => {
      const role = msg.role === 'user' ? 'ALUNO' : 'HELÔ (IA HELONEX)';
      return `[${role}]:\n${msg.text}\n-----------------------------------\n`;
    }).join('\n');

    const disclaimer = `
-----------------------------------
⚠️ AVISO LEGAL: 
Conteúdo gerado por Inteligência Artificial (Helonex). 
Não substitui consulta oficial aos órgãos reguladores ou profissionais técnicos.
-----------------------------------`;

    const fullText = title + content + disclaimer;
    
    // Cria um blob e força o download
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Apostila-HELONEX-${activeLesson.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveTab('content');
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleAskMentor = async () => {
    if (!mentorQuestion.trim()) return;
    setIsAskingMentor(true);
    
    const context = `
      ${HELO_PROMPT}
      Curso: "${courseData.title}"
      Aula Atual: "${activeLesson.title}"
      
      CONTEÚDO TÉCNICO DA AULA (BASE DE VERDADE):
      "${activeLesson.scriptContent || activeLesson.textContent || 'Conteúdo geral sobre o tema.'}"
      
      INSTRUÇÃO:
      O aluno tem uma dúvida. Responda baseando-se estritamente no conteúdo acima e na Legislação vigente.
      Use o Nível 1 (Lei) e Nível 2 (Prática).
    `;
    
    const response = await sendMessageToMentor(`${context}\n\nPERGUNTA DO ALUNO: ${mentorQuestion}`, []);
    setMentorResponse(response);
    setIsAskingMentor(false);
  };

  const renderContentArea = () => {
    // VISUALIZAÇÃO DE PLANOS
    if (activeTab === 'plans') {
        return (
            <div className="animate-fade-in-up">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Escolha seu Nível de Acesso</h2>
                    <p className="text-gray-400">O conhecimento atualizado é o único ativo que blinda sua transportadora.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Plano Padrão */}
                    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 relative hover:border-white/30 transition-colors">
                        <h3 className="text-lg font-bold text-white mb-2">Acesso Temporário</h3>
                        <p className="text-gray-400 text-sm mb-4">Para quem precisa resolver um problema pontual agora.</p>
                        <div className="text-3xl font-bold text-white mb-6">R$ 197 <span className="text-sm font-normal text-gray-500">/curso</span></div>
                        <ul className="space-y-3 mb-8 text-sm text-gray-300">
                            <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Acesso por 12 meses</li>
                            <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Certificado de Conclusão</li>
                            <li className="flex gap-2"><X size={16} className="text-red-500"/> Sem atualizações legais pós-compra</li>
                        </ul>
                        <button className="w-full py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors">Selecionar</button>
                    </div>

                    {/* Plano Vitalício (LIVING COURSE) */}
                    <div className="bg-gradient-to-b from-hlx-blue/20 to-slate-900 border border-hlx-gold rounded-xl p-6 relative transform md:scale-105 shadow-xl">
                        <div className="absolute top-0 right-0 bg-hlx-gold text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">RECOMENDADO</div>
                        <h3 className="text-lg font-bold text-hlx-gold mb-2 flex items-center gap-2">
                            <Infinity size={20} /> Acesso Vitalício (Vivo)
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">Um organismo vivo. O curso se atualiza conforme a lei muda.</p>
                        <div className="text-3xl font-bold text-white mb-6">R$ 297 <span className="text-sm font-normal text-gray-500">/único</span></div>
                        <ul className="space-y-3 mb-8 text-sm text-white">
                            <li className="flex gap-2"><CheckCircle size={16} className="text-green-400"/> <strong>Acesso Eterno</strong></li>
                            <li className="flex gap-2"><CheckCircle size={16} className="text-green-400"/> <strong>Atualizações em Tempo Real (Lei)</strong></li>
                            <li className="flex gap-2"><CheckCircle size={16} className="text-green-400"/> Mentor IA Dedicado</li>
                            <li className="flex gap-2"><CheckCircle size={16} className="text-green-400"/> Download de Apostilas Geradas</li>
                        </ul>
                        <button className="w-full py-3 bg-hlx-gold text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20">
                            GARANTIR VITALÍCIO
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // RENDERIZAÇÃO DE CONTEÚDO BLOQUEADO (PAYWALL)
    if (activeLesson.status === 'locked') {
      return (
        <div className="space-y-6">
           <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-white/10 aspect-video flex flex-col items-center justify-center text-center p-8 group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470229722913-7ea9959f074d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10 blur-sm"></div>
              
              <div className="relative z-10 bg-slate-950/80 p-8 rounded-2xl border border-hlx-gold/30 shadow-2xl max-w-lg">
                <Lock size={48} className="text-hlx-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Conteúdo Exclusivo</h3>
                <p className="text-gray-400 mb-6">
                  Esta aula técnica contém segredos sobre regimes aduaneiros especiais.
                  Desbloqueie o acesso Vitalício para ter atualização constante.
                </p>
                <button 
                    onClick={() => setActiveTab('plans')}
                    className="w-full py-3 bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold rounded-lg transition-all shadow-lg shadow-yellow-500/20"
                >
                  VER OPÇÕES DE ACESSO
                </button>
              </div>
           </div>
        </div>
      );
    }

    // --- RENDERIZAÇÃO DA SALA DE AULA INTERATIVA (NOVO) ---
    if (activeLesson.type === 'interactive') {
      return (
        <div className="space-y-6 animate-fade-in-up">
          {/* 
             MOBILE FIX: h-auto no mobile, aspect-video ou altura fixa no desktop.
             Adicionado max-h-[85vh] para evitar overflow da tela no mobile.
          */}
          <div className="mx-auto w-full aspect-[9/16] md:aspect-video md:h-[500px] max-h-[85vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl relative border border-hlx-blue/50 flex flex-col">
            
            {/* Header da Sala Virtual */}
            <div className="bg-slate-950 p-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hlx-blue to-purple-600 flex items-center justify-center animate-pulse">
                   <BrainCircuit size={20} className="text-white" />
                 </div>
                 <div>
                   <h3 className="text-white font-bold text-sm">Aula Viva (Helô IA)</h3>
                   <p className="text-xs text-hlx-blue">Módulo: {activeLesson.title}</p>
                 </div>
               </div>
               
               <div className="flex gap-2">
                   <button 
                        onClick={handleDownloadTranscript}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 py-2 rounded-lg border border-white/10 transition-colors"
                        title="Baixar Apostila desta conversa"
                   >
                        <Printer size={16} className="text-green-400" />
                        <span className="hidden sm:inline">Gerar Apostila</span>
                   </button>
                   <button onClick={startInteractiveLesson} className="text-gray-500 hover:text-white p-2" title="Reiniciar Aula">
                        <RefreshCw size={18} />
                   </button>
               </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={interactiveScrollRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[#0f172a] custom-scrollbar scroll-smooth"
            >
              {interactiveMessages.length === 0 && isInteractiveLoading && (
                 <div className="flex justify-center items-center h-full">
                    <div className="flex flex-col items-center gap-3">
                      <Sparkles className="text-hlx-gold animate-spin" size={32} />
                      <p className="text-gray-400 text-sm">A Helô está preparando o ambiente...</p>
                    </div>
                 </div>
              )}

              {interactiveMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[85%] md:max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-slate-700' : 'bg-hlx-blue'}`}>
                      {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                    </div>

                    {/* Balão */}
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                      msg.role === 'user' 
                        ? 'bg-slate-700 text-white rounded-tr-none' 
                        : 'bg-slate-800 border border-white/5 text-gray-200 rounded-tl-none'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>

                  </div>
                </div>
              ))}

              {isInteractiveLoading && interactiveMessages.length > 0 && (
                 <div className="flex justify-start">
                   <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-white/5 ml-11">
                     <div className="flex gap-1">
                       <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                       <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                       <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                     </div>
                   </div>
                 </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-950 border-t border-white/10 flex-shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={interactiveInput}
                  onChange={(e) => setInteractiveInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendInteractive()}
                  placeholder="Responda ou faça uma pergunta sobre a aula..."
                  className="w-full bg-slate-900 text-white rounded-lg pl-4 pr-12 py-4 border border-white/10 focus:border-hlx-blue focus:ring-1 focus:ring-hlx-blue outline-none"
                  autoFocus
                />
                <button 
                  onClick={handleSendInteractive}
                  disabled={!interactiveInput.trim() || isInteractiveLoading}
                  className="absolute right-2 top-2 p-2 bg-hlx-blue text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-500 mt-2 flex items-center justify-center gap-1 hidden md:flex">
                <Scale size={10} className="text-gray-400"/>
                Aviso: A IA pode apresentar erros. Consulte órgãos oficiais para validação crítica.
              </p>
            </div>

          </div>
        </div>
      );
    }

    // RENDERIZAÇÃO DE CONTEÚDO LIBERADO (AULA VÍDEO)
    if (activeLesson.type === 'video') {
      const isYouTube = activeLesson.videoUrl?.includes('youtube.com') || activeLesson.videoUrl?.includes('youtu.be');

      return (
        <div className="space-y-6">
          <div className="mx-auto max-w-[400px] md:max-w-[800px] aspect-[9/16] md:aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative group border border-white/10 flex flex-col">
             {isYouTube ? (
               <div className="w-full h-full relative group">
                  <iframe 
                    src={activeLesson.videoUrl} 
                    title={activeLesson.title}
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
               </div>
             ) : (
               <>
                 <video 
                   ref={videoRef}
                   src={activeLesson.videoUrl} 
                   poster={activeLesson.posterUrl}
                   className="w-full h-full object-cover"
                   onTimeUpdate={handleTimeUpdate}
                   onEnded={() => setIsPlaying(false)}
                   onClick={togglePlay}
                   playsInline
                 />
                 {!isPlaying && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-hlx-gold/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)] backdrop-blur-sm animate-pulse">
                       <Play size={32} className="text-slate-900 ml-1" />
                     </div>
                   </div>
                 )}
                 <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/90 to-transparent flex items-end px-4 pb-6 gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={togglePlay} className="text-white hover:text-hlx-gold transition-colors">
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <div className="flex-1 mb-1.5">
                       <input 
                         type="range" 
                         min="0" 
                         max={duration || 100} 
                         value={currentTime} 
                         onChange={handleSeek}
                         className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-hlx-gold"
                       />
                    </div>
                    <span className="text-xs text-white font-mono mb-1.5 whitespace-nowrap">
                      {formatTime(currentTime)} / {formatTime(duration || 0)}
                    </span>
                    <button className="text-white hover:text-hlx-gold mb-0.5"><Volume2 size={20} /></button>
                    <button onClick={() => videoRef.current?.requestFullscreen()} className="text-white hover:text-hlx-gold mb-0.5"><Maximize size={20} /></button>
                 </div>
               </>
             )}
          </div>

          {/* SCRIPT & NOTES */}
          <div className="bg-slate-900 border border-white/5 rounded-xl p-6 md:p-8 shadow-lg mt-8">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                  <div className="bg-hlx-blue/20 p-2 rounded text-hlx-blue">
                    <FileText size={20} />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-white">Guia de Estudo & Roteiro</h2>
               </div>
               
               {activeLesson.isFreeSample && (
                 <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30 uppercase tracking-wide flex items-center gap-1">
                   <Star size={12} fill="currentColor" /> Aula Gratuita
                 </span>
               )}
            </div>
            <div className="bg-slate-950 p-4 md:p-6 rounded-lg border border-white/5 font-mono text-xs md:text-sm text-gray-400 leading-relaxed whitespace-pre-line">
              {activeLesson.scriptContent || activeLesson.textContent}
            </div>
          </div>
        </div>
      );
    } 
    
    return null; // Fallback
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans relative">
      
      {/* MOBILE BACKDROP */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR (CURRICULUM) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-slate-900 border-r border-white/5 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-4/5 sm:w-80
        md:relative md:translate-x-0
        ${sidebarOpen ? 'md:w-80' : 'md:w-0 md:border-none'}
        md:flex md:flex-col
      `}>
        <div className="p-4 md:p-6 border-b border-white/5 bg-slate-900 z-10 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="text-[10px] font-bold text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                 <Music size={10} /> {customCourse ? 'PERSONALIZADO (IA)' : 'EVENTOS & PROJETOS'}
               </span>
            </div>
            <h2 className="text-white font-bold text-base md:text-lg leading-tight mb-2 pr-2">{courseData.title}</h2>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="bg-green-500 h-full" style={{ width: `${courseData.progress}%` }}></div>
            </div>
            <p className="text-xs text-gray-500">{courseData.progress}% Liberado (Degustação)</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white p-1"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar w-full">
          {courseData.modules.map((module) => (
            <div key={module.id} className="border-b border-white/5">
              <div className="p-4 bg-slate-800/50 flex justify-between items-center cursor-pointer hover:bg-slate-800 transition-colors">
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">{module.title}</h3>
              </div>
              <div>
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className={`w-full text-left p-4 flex items-start gap-3 border-l-4 transition-all ${
                      activeLesson.id === lesson.id 
                        ? 'bg-hlx-gold/10 border-hlx-gold' 
                        : 'border-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {lesson.type === 'interactive' ? <BrainCircuit size={16} className="text-purple-400" /> : 
                       lesson.status === 'active' ? <PlayCircle size={16} className={activeLesson.id === lesson.id ? 'text-hlx-gold' : 'text-gray-400'} /> :
                       <Lock size={16} className="text-gray-600" />}
                    </div>
                    <div>
                      <p className={`text-sm font-medium leading-tight ${activeLesson.id === lesson.id ? 'text-white' : 'text-gray-400'}`}>
                        {lesson.title}
                      </p>
                      <span className="text-[10px] text-gray-600 flex items-center gap-1 mt-1">
                        {lesson.type === 'video' ? 'Video' : lesson.type === 'interactive' ? 'Aula Viva (IA)' : 'Leitura'} • {lesson.duration}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-white/5 bg-slate-900">
           <button 
             onClick={() => setActiveTab('plans')}
             className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
           >
             <CheckCircle size={18} />
             DESBLOQUEAR CURSO
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative h-full w-full">
        <header className="h-16 bg-slate-900 border-b border-white/5 flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-20">
          <div className="flex items-center gap-4 overflow-hidden">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white flex-shrink-0">
              <Menu size={24} />
            </button>
            <h1 className="text-white font-bold truncate text-sm md:text-base">
              {activeTab === 'plans' ? 'Planos de Acesso' : activeTab === 'certificate' ? 'Certificado' : activeLesson.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* Oculta botão de mentor na aula interativa pois ela JÁ É o mentor */}
            {activeLesson.type !== 'interactive' && (
              <button 
                onClick={() => setShowMentorHelp(!showMentorHelp)}
                className="flex items-center gap-2 px-2 py-1.5 md:px-3 bg-hlx-blue/20 text-hlx-blue border border-hlx-blue/30 rounded-full text-xs md:text-sm font-bold hover:bg-hlx-blue hover:text-white transition-all"
              >
                <MessageSquare size={16} />
                <span className="hidden sm:inline">Mentor IA</span>
              </button>
            )}
            <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white text-xs md:text-sm">
              <ArrowLeft size={16} /> <span className="hidden sm:inline">Voltar</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-6 flex flex-col items-center w-full">
          <div className="w-full max-w-5xl">
            {activeTab === 'content' || activeTab === 'plans' ? (
              <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 w-full">
                  {renderContentArea()}
                  
                   {activeTab === 'content' && (
                     <div className="mt-8 flex justify-end">
                      {activeLesson.isFreeSample ? (
                        <button 
                            onClick={() => setActiveTab('plans')}
                            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-hlx-gold text-slate-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-all transform hover:-translate-y-1"
                        >
                          <Infinity size={18} />
                          QUERO O CURSO COMPLETO
                        </button>
                      ) : (
                        <button disabled className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-slate-800 text-gray-500 font-bold rounded-lg cursor-not-allowed">
                          <Lock size={18} />
                          Bloqueado
                        </button>
                      )}
                    </div>
                   )}
                </div>

                <div className="space-y-6 w-full">
                  {/* Seção de Mentor Flutuante (Oculta na aula interativa para não duplicar) */}
                  {showMentorHelp && activeLesson.type !== 'interactive' && (
                     <div className="bg-slate-900 border border-hlx-gold/30 rounded-xl p-4 shadow-2xl animate-fade-in-up">
                        <div className="flex items-center gap-2 mb-4 text-hlx-gold">
                          <MessageSquare size={20} />
                          <h3 className="font-bold">Mentor de Aula</h3>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-lg mb-4 min-h-[100px] text-sm text-gray-300 border border-white/5 max-h-[200px] overflow-y-auto">
                          {mentorResponse ? (
                            <p>{mentorResponse}</p>
                          ) : (
                            <p className="text-gray-500 italic">"Olá! Sou seu tutor virtual. Estou analisando a aula: '{activeLesson.title}'. Tem alguma dúvida sobre o trâmite?"</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={mentorQuestion}
                            onChange={(e) => setMentorQuestion(e.target.value)}
                            placeholder="Escreva sua dúvida..."
                            className="flex-1 bg-slate-800 text-white text-sm rounded-lg px-3 py-2 border border-white/10 focus:border-hlx-gold outline-none w-full"
                          />
                          <button 
                            onClick={handleAskMentor}
                            disabled={isAskingMentor}
                            className="bg-hlx-gold text-slate-900 p-2 rounded-lg font-bold hover:bg-yellow-400 flex-shrink-0"
                          >
                            {isAskingMentor ? '...' : <ChevronRight />}
                          </button>
                        </div>
                        <p className="text-[9px] text-gray-500 mt-2 text-center">
                           Aviso: Respostas geradas por IA. Não substitui consulta oficial.
                        </p>
                     </div>
                  )}

                  <div className="bg-slate-900 border border-white/5 rounded-xl p-6">
                      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Download size={18} className="text-hlx-blue" /> Arquivos Úteis
                      </h3>
                      <div className="space-y-2">
                        <button disabled className="w-full flex items-center justify-between p-3 bg-slate-950 rounded border border-white/5 opacity-50 cursor-not-allowed">
                          <div className="flex items-center gap-3">
                            <FileText className="text-gray-500" size={18} />
                            <div>
                              <p className="text-xs font-bold text-gray-300">Planilha Inventário.xlsx</p>
                              <span className="text-[10px] text-red-400">Exclusivo Assinantes</span>
                            </div>
                          </div>
                          <Lock size={14} className="text-gray-600" />
                        </button>
                         <button disabled className="w-full flex items-center justify-between p-3 bg-slate-950 rounded border border-white/5 opacity-50 cursor-not-allowed">
                          <div className="flex items-center gap-3">
                            <FileText className="text-gray-500" size={18} />
                            <div>
                              <p className="text-xs font-bold text-gray-300">Modelo Carta DST.docx</p>
                              <span className="text-[10px] text-red-400">Exclusivo Assinantes</span>
                            </div>
                          </div>
                          <Lock size={14} className="text-gray-600" />
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 animate-fade-in-up w-full">
                <div className="bg-slate-800 border border-hlx-gold/30 p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-2xl text-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                      <Award size={200} />
                   </div>
                   <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Certificado de Conclusão</h2>
                   <p className="text-gray-400 mb-8 text-sm md:text-base">
                     Para emitir seu diploma oficial, você precisa completar 100% das aulas e ser assinante.
                   </p>
                   <button disabled className="w-full md:w-auto px-8 py-4 bg-slate-700 text-gray-500 font-bold rounded-lg flex items-center justify-center gap-2 mx-auto cursor-not-allowed">
                     <Lock size={18} />
                     Download Disponível em Breve
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursePlayer;
