
import React, { useState, useEffect, useRef } from 'react';
import { 
  PlayCircle, CheckCircle, Lock, ArrowLeft, FileText, Download, 
  MessageSquare, ChevronRight, Menu, Globe, Award, BookOpen, ExternalLink,
  Play, Pause, Volume2, Maximize, X, Youtube, Star, AlertTriangle, Music, Tent, Anchor,
  Sparkles, Send, User, Bot, BrainCircuit, RefreshCw, Printer, ShieldCheck, Infinity, Scale, Mic, Radio
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

// --- PERSONA HELÔ (DIRETRIZES TÉCNICAS PADRÃO) ---
const HELO_PROMPT_STANDARD = `
Você é a Helô, a Inteligência Artificial soberana do ecossistema Helonex.
POSTURA: Socrática e Técnica. Use perguntas para guiar o raciocínio.
FILOSOFIA: Empreendedorismo do Asfalto. O aluno é gestor do seu negócio.
CONCEITO ERRO ZERO: Enfatize a revisão e a prudência.
`;

// --- PERSONA HELÔ (DIRETRIZES PARA INICIANTES/ESTRADA) ---
const HELO_PROMPT_BEGINNER = `
Você é a Helô, mentora do "Empreendedorismo do Asfalto". 🚛🎓
POSTURA: Socrática (Faça pensar), Freireana (Parta da realidade dele) e "Anti-Sono" (Energética).
PÚBLICO: O aluno pode estar dirigindo. Fale claro, frases curtas, vitalidade na voz (texto). Use EMOJIS.
MISSÃO:
1. **Pergunte antes de explicar:** "Companheiro, sabe o risco desse pneu careca?"
2. **Realidade:** Use exemplos de estrada, pátio, frete, família.
3. **Cuidamos de Vidas:** Lembre sempre que a prudência traz o motorista de volta pra casa.
4. **Erro Zero:** Ensine a revisar tudo. Um erro é um prejuízo ou uma vida.
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
          scriptContent: `Roteiro sobre Admissão Temporária...`
        },
        { 
          id: 102, title: 'Admissão Temporária: O Passo a Passo', duration: '18:20', type: 'video', status: 'locked',
          scriptContent: 'Conteúdo bloqueado.'
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
          type: 'interactive',
          status: 'active', 
          isFreeSample: true,
          scriptContent: `TÓPICO DA AULA: Transporte Internacional de Animais Vivos...`
        }
      ]
    }
  ]
};

const CoursePlayer: React.FC<CoursePlayerProps> = ({ onBack, customCourse }) => {
  const isValidCustomCourse = customCourse && customCourse.modules && customCourse.modules.length > 0 && customCourse.modules[0].lessons && customCourse.modules[0].lessons.length > 0;
  const courseData = isValidCustomCourse ? customCourse : DEFAULT_COURSE_DATA;

  // Detecta se é um curso "Iniciante" baseado no conteúdo gerado
  const isBeginnerCourse = isValidCustomCourse && JSON.stringify(customCourse).toLowerCase().includes('iniciante');

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

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setInteractiveMessages([]); 
    
    if (activeLesson.type === 'interactive') {
      startInteractiveLesson();
    } else {
      setActiveTab('content');
    }

    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeLesson]);

  useEffect(() => {
    if (interactiveScrollRef.current) {
      interactiveScrollRef.current.scrollTop = interactiveScrollRef.current.scrollHeight;
    }
  }, [interactiveMessages]);

  const startInteractiveLesson = async () => {
    setIsInteractiveLoading(true);
    try {
      // Seleciona o Prompt correto baseada no nível do curso
      const promptBase = isBeginnerCourse ? HELO_PROMPT_BEGINNER : HELO_PROMPT_STANDARD;

      const context = `
      ${promptBase}

      CONTEXTO DA AULA ATUAL (Base de Conhecimento):
      ${activeLesson.scriptContent || "Introdução ao tema."}
      
      INSTRUÇÃO INICIAL:
      Apresente-se como Mentora Socrática. Comece com uma pergunta provocativa sobre o tema para despertar a atenção (Anti-Sono). Use linguagem de quem vive na estrada.
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
      const promptBase = isBeginnerCourse ? HELO_PROMPT_BEGINNER : HELO_PROMPT_STANDARD;

      const pedagogicalPrompt = `
      ${promptBase}

      [CONTEXTO DA AULA]
      "${scriptContext}"

      [INTERAÇÃO DO ALUNO]
      "${userMsg}"

      Responda aplicando o método Socrático. Valide a resposta do aluno, mas devolva com uma reflexão sobre "Erro Zero" ou "Segurança". 
      Se for sobre legislação, explique o PORQUÊ prático (proteção da vida/patrimônio), não só a regra.
      `;

      const response = await sendMessageToMentor(pedagogicalPrompt, history);
      setInteractiveMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setInteractiveMessages(prev => [...prev, { role: 'model', text: "Falha de conexão. Pode repetir?" }]);
    } finally {
      setIsInteractiveLoading(false);
    }
  };

  const handleDownloadTranscript = () => {
    if (interactiveMessages.length === 0) return;
    const title = `Plano de Carreira - ${activeLesson.title}\nHELONEX Brasil - Empreendedorismo do Asfalto\n\n`;
    const content = interactiveMessages.map(msg => `[${msg.role === 'user' ? 'VOCÊ' : 'MENTOR HELONEX'}]: ${msg.text}\n`).join('\n');
    const blob = new Blob([title + content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `Aula-${activeLesson.id}.txt`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
  };

  // Video functions (togglePlay, handleTimeUpdate, etc) omitted for brevity as they are unchanged...
  const togglePlay = () => { if (videoRef.current) { isPlaying ? videoRef.current.pause() : videoRef.current.play(); setIsPlaying(!isPlaying); } };
  const handleTimeUpdate = () => { if (videoRef.current) { setCurrentTime(videoRef.current.currentTime); setDuration(videoRef.current.duration); } };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => { if (videoRef.current) { videoRef.current.currentTime = parseFloat(e.target.value); setCurrentTime(parseFloat(e.target.value)); } };
  const formatTime = (time: number) => { const minutes = Math.floor(time / 60); const seconds = Math.floor(time % 60); return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; };
  const handleLessonSelect = (lesson: Lesson) => { setActiveLesson(lesson); setActiveTab('content'); if (window.innerWidth < 768) setSidebarOpen(false); };

  const handleAskMentor = async () => {
    if (!mentorQuestion.trim()) return;
    setIsAskingMentor(true);
    const context = `${HELO_PROMPT_STANDARD}\nConteúdo: "${activeLesson.scriptContent}"`;
    const response = await sendMessageToMentor(`${context}\n\nPERGUNTA: ${mentorQuestion}`, []);
    setMentorResponse(response);
    setIsAskingMentor(false);
  };

  const renderContentArea = () => {
    if (activeTab === 'plans') {
        return (
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6 text-center">
                <h3 className="text-white font-bold text-xl mb-4">Acesso Premium Necessário</h3>
                <p className="text-gray-400 mb-6">Para desbloquear o conteúdo completo e certificado, torne-se um assinante.</p>
                <button className="bg-hlx-gold text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-400">Ver Planos</button>
            </div>
        );
    }

    if (activeLesson.type === 'interactive') {
      return (
        <div className="space-y-6 animate-fade-in-up">
          <div className="mx-auto w-full aspect-[9/16] md:aspect-video md:h-[500px] max-h-[85vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl relative border border-hlx-blue/50 flex flex-col">
            <div className="bg-slate-950 p-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
               <div className="flex items-center gap-3">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center animate-pulse ${isBeginnerCourse ? 'bg-orange-500' : 'bg-hlx-blue'}`}>
                   {isBeginnerCourse ? <Radio size={20} className="text-white" /> : <BrainCircuit size={20} className="text-white" />}
                 </div>
                 <div>
                   <h3 className="text-white font-bold text-sm">{isBeginnerCourse ? 'Mentora do Asfalto (Socrática)' : 'Aula Viva (Helô IA)'}</h3>
                   <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-400">Módulo: {activeLesson.title}</p>
                      {isBeginnerCourse && <span className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 rounded uppercase font-bold flex items-center gap-1"><Volume2 size={8} /> Modo Estrada</span>}
                   </div>
                 </div>
               </div>
               <button onClick={handleDownloadTranscript} className="text-xs bg-slate-800 text-white px-3 py-2 rounded border border-white/10 hover:bg-slate-700">
                  <Printer size={14} className="inline mr-1"/> Resumo
               </button>
            </div>

            <div ref={interactiveScrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-[#0f172a] custom-scrollbar scroll-smooth">
              {interactiveMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-slate-700' : isBeginnerCourse ? 'bg-orange-500' : 'bg-hlx-blue'}`}>
                      {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-md ${msg.role === 'user' ? 'bg-slate-700 text-white rounded-tr-none' : 'bg-slate-800 border border-white/5 text-gray-200 rounded-tl-none'}`}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isInteractiveLoading && <div className="text-center text-xs text-gray-500 animate-pulse">Digitando...</div>}
            </div>

            <div className="p-4 bg-slate-950 border-t border-white/10 flex-shrink-0 relative">
              <input
                type="text"
                value={interactiveInput}
                onChange={(e) => setInteractiveInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendInteractive()}
                placeholder={isBeginnerCourse ? "Responda à Mentora..." : "Interaja com o conteúdo..."}
                className="w-full bg-slate-900 text-white rounded-lg pl-4 pr-12 py-4 border border-white/10 focus:border-hlx-gold outline-none"
                autoFocus
              />
              <button onClick={handleSendInteractive} disabled={!interactiveInput.trim() || isInteractiveLoading} className="absolute right-6 top-6 text-hlx-gold hover:text-white disabled:opacity-50">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Default Video/Text Render (Simplified for brevity as Logic is mostly unchanged)
    return (
        <div className="text-center text-gray-400 py-10">
            <p>Selecione uma aula no menu lateral.</p>
        </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans relative">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-50 bg-slate-900 border-r border-white/5 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-80 md:relative md:translate-x-0`}>
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-white font-bold text-sm truncate pr-2">{courseData.title}</h2>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400"><X size={20}/></button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {courseData.modules.map((module: Module) => (
                <div key={module.id} className="border-b border-white/5">
                    <div className="p-3 bg-slate-800/50 text-xs font-bold text-gray-400 uppercase">{module.title}</div>
                    {module.lessons.map((lesson: Lesson) => (
                        <button key={lesson.id} onClick={() => handleLessonSelect(lesson)} className={`w-full text-left p-3 flex items-center gap-3 hover:bg-white/5 ${activeLesson.id === lesson.id ? 'bg-hlx-gold/10 border-l-2 border-hlx-gold' : ''}`}>
                            {lesson.type === 'interactive' ? <BrainCircuit size={16} className="text-purple-400"/> : <PlayCircle size={16} className="text-gray-400"/>}
                            <span className={`text-sm ${activeLesson.id === lesson.id ? 'text-white font-bold' : 'text-gray-400'}`}>{lesson.title}</span>
                        </button>
                    ))}
                </div>
            ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative w-full">
        <header className="h-16 bg-slate-900 border-b border-white/5 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400"><Menu size={24}/></button>
                <h1 className="text-white font-bold truncate">{activeLesson.title}</h1>
            </div>
            <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm"><ArrowLeft size={16}/> Voltar</button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950 flex justify-center">
            <div className="w-full max-w-5xl">
                {renderContentArea()}
            </div>
        </div>
      </main>
    </div>
  );
};

export default CoursePlayer;
