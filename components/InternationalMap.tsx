
import React, { useState } from 'react';
import { ArrowLeft, Globe, PlayCircle, CheckCircle, MessageSquare, Lock, X, Send, Sparkles, GraduationCap, Cpu, Loader2, BrainCircuit, Filter, Truck, BookOpen, Bus } from 'lucide-react';
import { Language } from '../types';
import CourseCreator from './CourseCreator';

interface InternationalMapProps {
  onBack: () => void;
  onConsultMentor: () => void;
  onStartCourse?: (courseData?: any) => void;
  language: Language;
}

interface CourseCard {
  id: string;
  category: 'internacional' | 'nacional' | 'gestao' | 'seguranca';
  title: string;
  description: string;
  iconName: string;
  tags: string[];
  active: boolean;
  aiPowered?: boolean;
}

const COURSE_CATALOG: CourseCard[] = [
  {
    id: 'AI_CREATOR',
    category: 'gestao',
    title: 'CRIAR CURSO NOVO (IA)',
    description: 'Não achou o que queria? A Helô cria uma trilha personalizada para você em 15 segundos.',
    iconName: 'cpu',
    tags: ['Personalizado', 'Ilimitado'],
    active: true,
    aiPowered: true
  },
  {
    id: 'PASSENGERS_MASTER',
    category: 'nacional',
    title: 'Novo Marco Passageiros 2026',
    description: 'Domine a Resolução 6.033 e a Fiscalização Responsiva da ANTT.',
    iconName: 'bus',
    tags: ['ANTT', 'IQT'],
    active: true
  },
  {
    id: 'TRIC_BASICO',
    category: 'internacional',
    title: 'Habilitação TRIC (Mercosul)',
    description: 'Tudo sobre permissão originária e complementar para o transporte internacional.',
    iconName: 'globe',
    tags: ['Mercosul', 'Aduana'],
    active: true
  }
];

const CourseIcon = ({ name, size = 32 }: { name: string, size?: number }) => {
  switch (name) {
    case 'cpu': return <Sparkles size={size} className="text-purple-400" />;
    case 'bus': return <Bus size={size} className="text-blue-400" />;
    case 'globe': return <Globe size={size} className="text-green-400" />;
    default: return <BookOpen size={size} className="text-gray-400" />;
  }
};

const InternationalMap: React.FC<InternationalMapProps> = ({ onBack, onConsultMentor, onStartCourse }) => {
  const [filter, setFilter] = useState<string>('todos');
  const [showCreator, setShowCreator] = useState(false);

  const handleStart = (course: CourseCard) => {
    if (course.aiPowered) {
      setShowCreator(true);
    } else if (onStartCourse) {
      onStartCourse();
    }
  };

  const handleCourseCreated = (courseData: any) => {
      setShowCreator(false);
      if (onStartCourse) {
          onStartCourse(courseData);
      }
  };

  const filtered = filter === 'todos' ? COURSE_CATALOG : COURSE_CATALOG.filter(c => c.category === filter);

  if (showCreator) {
      return (
          <div className="bg-slate-950 min-h-screen p-4 md:p-8 flex items-center justify-center">
              <div className="w-full max-w-5xl">
                  <CourseCreator 
                    onCourseCreated={handleCourseCreated} 
                    onCancel={() => setShowCreator(false)} 
                  />
              </div>
          </div>
      );
  }

  return (
    <div className="bg-slate-950 min-h-screen p-8 text-white animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2 font-bold transition-all">
            <ArrowLeft size={20} /> VOLTAR AO HUB
          </button>
          <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
            ACADEMIA <span className="text-hlx-gold">LOGÍSTICA</span>
          </h1>
        </div>

        <div className="flex gap-4 mb-10 overflow-x-auto pb-4 custom-scrollbar">
          {['todos', 'internacional', 'nacional', 'gestao', 'seguranca'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${filter === cat ? 'bg-hlx-gold text-slate-900 border-hlx-gold shadow-lg shadow-yellow-500/20' : 'text-gray-500 border-white/10 hover:border-white/30'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <div 
                key={course.id} 
                onClick={() => handleStart(course)} 
                className={`bg-slate-900 border rounded-2xl p-8 cursor-pointer group transition-all hover:translate-y-[-4px] shadow-lg shadow-black/40 ${course.aiPowered ? 'border-purple-500/50 hover:border-purple-400 bg-gradient-to-b from-slate-900 to-purple-900/10' : 'border-white/10 hover:border-hlx-gold/50'}`}
              >
                <div className={`mb-6 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-white/5 ${course.aiPowered ? 'bg-purple-500/20' : 'bg-slate-950'}`}>
                  <CourseIcon name={course.iconName} />
                </div>
                <h3 className={`text-xl font-bold text-white mb-3 transition-colors ${course.aiPowered ? 'text-purple-300' : 'group-hover:text-hlx-gold'}`}>{course.title}</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed h-12 line-clamp-2">{course.description}</p>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold bg-white/5 text-gray-500 px-3 py-1 rounded border border-white/5 uppercase tracking-tighter">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InternationalMap;
