import React, { useState } from 'react';
import { ArrowLeft, Globe, PlayCircle, CheckCircle, MessageSquare, Lock, X, Send, Sparkles, GraduationCap, Tent, Music, Tractor, Gavel, RefreshCw, Infinity, Cpu, Loader2, BrainCircuit, Filter, User, Briefcase, Truck, BookOpen, Layers, Bus, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { sendMessageToMentor } from '../services/geminiService';

interface InternationalMapProps {
  onBack: () => void;
  onConsultMentor: () => void;
  onStartCourse?: (courseData?: any) => void;
  language: Language;
}

interface CourseCard {
  id: string;
  category: 'internacional' | 'nacional' | 'gestao' | 'seguranca';
  profile: 'todos' | 'empresario' | 'motorista';
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  active: boolean;
  special?: boolean;
  aiPowered?: boolean;
}

const COURSE_CATALOG: CourseCard[] = [
  {
    id: 'AI_CREATOR',
    category: 'gestao',
    profile: 'todos',
    title: 'CRIE SEU CURSO COM IA',
    description: 'Não achou o que procura? Nossa Inteligência Artificial cria uma ementa personalizada sobre QUALQUER tema logístico em segundos.',
    icon: <Cpu size={32} className="text-white" />,
    tags: ['Personalizado', 'Ilimitado', 'Tecnologia HELONEX'],
    active: true,
    aiPowered: true
  },
  {
    id: 'PASSENGERS_2026',
    category: 'nacional',
    profile: 'empresario',
    title: 'Novo Marco Passageiros 2026',
    description: 'Domine a Resolução 6.033 e 6.074. Evite apreensão de ônibus por "Serviço Não Autorizado".',
    icon: <Bus size={32} className="text-blue-400" />,
    tags: ['Regulação Responsiva', 'ANTT', 'IQT'],
    active: true
  },
  {
    id: 'TRIC_SUL',
    category: 'internacional',
    profile: 'empresario',
    title: 'Transporte Internacional (TRIC)',
    description: 'Habilitação para Argentina, Chile, Paraguai e Uruguai. Regras do ATIT e Seguros.',
    icon: <Globe size={32} className="text-green-400" />,
    tags: ['Mercosul', 'MIC/DTA', 'Aduana'],
    active: true
  },
  {
    id: 'MOPP_UPDATE',
    category: 'seguranca',
    profile: 'motorista',
    title: 'Atualização MOPP (Digital)',
    description: 'Reciclagem obrigatória para condutores de produtos perigosos. Integração com CNH Digital.',
    icon: <ShieldAlert size={32} className="text-orange-400" />,
    tags: ['Obrigatório', 'Segurança', 'DETRAN'],
    active: true
  },
  {
    id: 'FLEET_MGMT',
    category: 'gestao',
    profile: 'empresario',
    title: 'Gestão de Custos de Frota',
    description: 'Aprenda a calcular o KM rodado, depreciação e custos fixos/variáveis.',
    icon: <Layers size={32} className="text-purple-400" />,
    tags: ['Financeiro', 'Gestão', 'Planilhas'],
    active: true
  },
  {
    id: 'TAC_POWER',
    category: 'nacional',
    profile: 'motorista',
    title: 'Autônomo de Sucesso (TAC)',
    description: 'Como emitir CIOT, calcular frete mínimo e usar o aplicativo Gov.br.',
    icon: <Truck size={32} className="text-yellow-400" />,
    tags: ['TAC', 'MEI', 'Frete'],
    active: true
  }
];

const InternationalMap: React.FC<InternationalMapProps> = ({ onBack, onConsultMentor, onStartCourse, language }) => {
  const [filter, setFilter] = useState<'todos' | 'internacional' | 'nacional' | 'gestao' | 'seguranca'>('todos');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStart = async (course: CourseCard) => {
    if (course.aiPowered) {
      if(confirm("Deseja iniciar o Criador de Cursos IA?")) {
         setIsGenerating(true);
         // Simulation of generation
         setTimeout(() => {
             setIsGenerating(false);
             if (onStartCourse) onStartCourse({ 
                 id: 'custom_ai', 
                 title: 'Curso Gerado por IA', 
                 modules: [{ id: 1, title: 'Módulo 1', lessons: [{ id: 101, title: 'Introdução IA', type: 'interactive', status: 'active', duration: 'Adaptativo' }] }] 
             });
         }, 1500);
      }
    } else {
      if (onStartCourse) onStartCourse();
    }
  };

  const filteredCourses = filter === 'todos' ? COURSE_CATALOG : COURSE_CATALOG.filter(c => c.category === filter);

  return (
    <div className="bg-slate-950 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} /> Voltar
            </button>
            <h1 className="text-3xl font-display font-bold text-white">Academia <span className="text-hlx-gold">Logística</span></h1>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {['todos', 'internacional', 'nacional', 'gestao', 'seguranca'].map(f => (
                <button 
                    key={f} 
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${filter === f ? 'bg-hlx-gold text-slate-900 border-hlx-gold' : 'text-gray-400 border-white/10 hover:border-white/30'}`}
                >
                    {f}
                </button>
            ))}
        </div>

        {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-64">
                <Loader2 size={48} className="text-hlx-gold animate-spin mb-4" />
                <p className="text-white font-bold">A Inteligência Artificial está montando sua grade curricular...</p>
                <p className="text-gray-500 text-sm">Analisando 15.000 normas e leis.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                    <div key={course.id} onClick={() => handleStart(course)} className="bg-slate-900 border border-white/10 rounded-xl p-6 hover:border-hlx-gold/50 cursor-pointer group transition-all relative overflow-hidden">
                        {course.aiPowered && <div className="absolute top-0 right-0 bg-purple-600 text-white text-[9px] font-bold px-2 py-1 rounded-bl">IA GENERATIVE</div>}
                        
                        <div className="mb-4 bg-slate-800 w-14 h-14 rounded-lg flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                            {course.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-hlx-gold transition-colors">{course.title}</h3>
                        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{course.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {course.tags.map(tag => (
                                <span key={tag} className="text-[10px] bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default InternationalMap;