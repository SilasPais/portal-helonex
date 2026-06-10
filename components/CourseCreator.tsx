
import React, { useState } from 'react';
import { Sparkles, BrainCircuit, Rocket, ChevronRight, Loader2, BookOpen, User, Target, Zap } from 'lucide-react';
import { generateCustomCourse } from '../services/geminiService';
import { GeneratedCourse } from '../types';

interface CourseCreatorProps {
  onCourseCreated: (course: GeneratedCourse) => void;
  onCancel: () => void;
}

const CourseCreator: React.FC<CourseCreatorProps> = ({ onCourseCreated, onCancel }) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Intermediário');
  const [profile, setProfile] = useState('Motorista');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    
    // Simulação de etapas de carregamento para UX
    const steps = [
        "Invocando metodologia Socrática...",
        "Conectando à realidade do asfalto...",
        "Aplicando conceito Erro Zero...",
        "Construindo plano de carreira..."
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
        setLoadingStep(stepIdx);
        stepIdx = (stepIdx + 1) % steps.length;
    }, 1500);

    try {
      const course = await generateCustomCourse(topic, level, profile);
      clearInterval(interval);
      if (course) {
        onCourseCreated(course);
      } else {
        alert("A Helô estava muito ocupada auditando uma frota. Tente novamente.");
        setIsLoading(false);
      }
    } catch (e) {
      clearInterval(interval);
      setIsLoading(false);
      alert("Erro na conexão com o Núcleo EduTech.");
    }
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto min-h-[500px] animate-fade-in-up">
      
      {/* LADO ESQUERDO: VISUAL & CONCEITO */}
      <div className="md:w-1/3 bg-gradient-to-br from-indigo-900 to-slate-900 p-8 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none">
           <BrainCircuit size={200} className="text-white" />
        </div>
        
        <div className="relative z-10">
           <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} /> Empreendedorismo do Asfalto
           </div>
           <h2 className="text-3xl font-display font-bold text-white mb-4">
             Crie seu Plano de <br/>Carreira Digital.
           </h2>
           <p className="text-indigo-200 text-sm leading-relaxed">
             Não vendemos cursos, criamos autonomia. A Helô usa pedagogia socrática (diálogo) para transformar conhecimento em sabedoria e prudência na estrada.
           </p>
        </div>

        <div className="mt-8 relative z-10">
           <div className="flex items-center gap-3 text-sm text-indigo-300 mb-2">
              <Rocket size={16} /> <span>Geração em 15 segundos</span>
           </div>
           <div className="flex items-center gap-3 text-sm text-indigo-300">
              <Zap size={16} /> <span>Conceito Erro Zero</span>
           </div>
        </div>
      </div>

      {/* LADO DIREITO: FORMULÁRIO WIZARD */}
      <div className="md:w-2/3 bg-slate-950 p-8 flex flex-col justify-center relative">
        {isLoading ? (
           <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="relative">
                 <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                 <BrainCircuit size={64} className="text-indigo-400 animate-pulse relative z-10" />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-white mb-2">Engenharia Pedagógica Ativa</h3>
                 <p className="text-gray-400 text-sm font-mono animate-pulse">
                    { ["Invocando metodologia Socrática...", "Conectando à realidade do asfalto...", "Aplicando conceito Erro Zero...", "Construindo plano de carreira..."][loadingStep] }
                 </p>
              </div>
              <div className="w-64 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-[loading_2s_ease-in-out_infinite] w-full origin-left"></div>
              </div>
           </div>
        ) : (
           <div className="space-y-6 max-w-md mx-auto w-full">
              
              <div>
                 <label className="text-xs font-bold text-gray-400 uppercase mb-2 block flex items-center gap-2">
                    <Target size={14} /> Qual competência você quer dominar hoje?
                 </label>
                 <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Ex: Gestão de Pneus, Carga Viva, Calcular Frete, Lei do Descanso..."
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-600"
                    autoFocus
                 />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block flex items-center gap-2">
                       <BookOpen size={14} /> Nível & Didática
                    </label>
                    <select 
                       value={level}
                       onChange={(e) => setLevel(e.target.value)}
                       className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none appearance-none"
                    >
                       <option value="Explorador (Iniciante)">Explorador (Modo Estrada/Áudio)</option>
                       <option value="Operacional (Prático)">Operacional (Checklist)</option>
                       <option value="Estratégico (Gestão)">Estratégico (Gestor)</option>
                       <option value="Jurídico (Avançado)">Jurídico (Leis Puras)</option>
                    </select>
                 </div>
                 
                 <div>
                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block flex items-center gap-2">
                       <User size={14} /> Seu Perfil
                    </label>
                    <select 
                       value={profile}
                       onChange={(e) => setProfile(e.target.value)}
                       className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white focus:border-indigo-500 outline-none appearance-none"
                    >
                       <option value="Motorista">Motorista Autônomo (CEO do Caminhão)</option>
                       <option value="Gestor de Frota">Gestor de Frota</option>
                       <option value="Embarcador">Embarcador</option>
                       <option value="Estudante">Estudante de Logística</option>
                    </select>
                 </div>
              </div>

              {level.includes('Explorador') && (
                 <div className="bg-indigo-500/10 border border-indigo-500/30 p-3 rounded-lg flex items-start gap-3">
                    <Sparkles size={18} className="text-indigo-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-indigo-200">
                       <strong>Modo Anti-Sono Ativo:</strong> A Helô usará linguagem clara, direta e dialógica, ideal para ouvir enquanto dirige. Cuidamos da sua vida.
                    </p>
                 </div>
              )}

              <div className="pt-4 flex gap-3">
                 <button 
                    onClick={onCancel}
                    className="px-6 py-4 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                 >
                    Cancelar
                 </button>
                 <button 
                    onClick={handleGenerate}
                    disabled={!topic.trim()}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    <BrainCircuit size={20} />
                    GERAR PLANO DE CARREIRA
                 </button>
              </div>

           </div>
        )}
      </div>

    </div>
  );
};

export default CourseCreator;
