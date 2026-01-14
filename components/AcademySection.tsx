import React from 'react';
import { BookOpen, Award, Users, Video, Globe, Hammer, CheckCircle, GraduationCap, PlayCircle, Cpu, Layers, Layout, Target } from 'lucide-react';

interface AcademySectionProps {
  onNavigateToMap?: () => void;
}

const AcademySection: React.FC<AcademySectionProps> = ({ onNavigateToMap }) => {
  return (
    <div className="py-24 bg-gradient-to-b from-slate-900 to-hlx-navy relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-hlx-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-4">
               <div className="bg-purple-500/10 p-2 rounded text-purple-400 border border-purple-500/20">
                 <Cpu size={20} />
               </div>
               <span className="text-purple-400 font-bold tracking-widest uppercase text-xs">Educação Híbrida (Humano + IA)</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              A Primeira Academia que <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-hlx-gold to-orange-500">Cria o Curso para Você.</span>
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 border-l-4 border-hlx-gold pl-4">
              Preparamos você 🫵 para o Transporte Nacional, Internacional e para ser Multimodal. Não vendemos apenas aulas gravadas. Nosso <strong>Engenheiro Pedagógico (IA)</strong> monta uma grade exclusiva baseada na <strong>SUA</strong> necessidade real, seja você Autônomo, Transportadora ou Embarcador.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
               <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                 <Target className="text-green-500 mt-1" size={24} />
                 <div>
                   <h4 className="text-white font-bold text-sm">Por Perfil</h4>
                   <p className="text-xs text-gray-400">Trilhas específicas para TAC, ETC e Gestores de Frota.</p>
                 </div>
               </div>
               <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 flex items-start gap-3">
                 <Layers className="text-blue-500 mt-1" size={24} />
                 <div>
                   <h4 className="text-white font-bold text-sm">Por Tema</h4>
                   <p className="text-xs text-gray-400">Internacional, Produtos Perigosos, Jurídico e Gestão.</p>
                 </div>
               </div>
            </div>

            <button 
              onClick={onNavigateToMap}
              className="w-full md:w-auto px-8 py-4 bg-hlx-blue hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-3 border border-blue-500/30 group"
            >
              <GraduationCap size={24} />
              <span className="text-lg">ACESSAR CATÁLOGO COMPLETO</span>
              <PlayCircle size={18} className="text-blue-300 group-hover:text-white" />
            </button>
          </div>

          <div className="lg:w-1/2 relative h-[500px] w-full flex items-center justify-center">
            
            <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute w-[300px] h-[300px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>

            <div className="absolute z-20 bg-slate-900 border border-purple-500/50 p-6 rounded-2xl shadow-2xl shadow-purple-900/40 w-64 text-center transform hover:scale-105 transition-transform cursor-pointer" onClick={onNavigateToMap}>
               <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                 <Cpu size={32} className="text-white" />
               </div>
               <h4 className="text-white font-bold text-lg mb-1">Crie seu Curso</h4>
               <p className="text-xs text-purple-300 mb-3">Tecnologia Generativa HELONEX</p>
               <span className="text-[10px] bg-purple-900/50 text-purple-200 px-2 py-1 rounded border border-purple-500/30">Personalizado</span>
            </div>

            <div className="absolute top-10 left-10 z-10 bg-slate-800 p-4 rounded-xl border border-white/5 shadow-xl w-48 animate-float-slow">
               <div className="flex items-center gap-3 mb-2">
                 <div className="bg-green-500/20 p-2 rounded text-green-500"><Globe size={18} /></div>
                 <div>
                   <p className="text-white font-bold text-xs">Internacional</p>
                   <p className="text-[10px] text-gray-500">Mercosul & Chile</p>
                 </div>
               </div>
               <div className="h-1 bg-slate-700 rounded-full overflow-hidden"><div className="w-3/4 h-full bg-green-500"></div></div>
            </div>

            <div className="absolute bottom-20 right-0 z-10 bg-slate-800 p-4 rounded-xl border border-white/5 shadow-xl w-48 animate-float-delayed">
               <div className="flex items-center gap-3 mb-2">
                 <div className="bg-hlx-gold/20 p-2 rounded text-hlx-gold"><Hammer size={18} /></div>
                 <div>
                   <p className="text-white font-bold text-xs">Legislação</p>
                   <p className="text-[10px] text-gray-500">RNTRC & ANTT</p>
                 </div>
               </div>
               <div className="h-1 bg-slate-700 rounded-full overflow-hidden"><div className="w-1/2 h-full bg-hlx-gold"></div></div>
            </div>

            <div className="absolute bottom-10 left-20 z-0 bg-slate-800/60 p-4 rounded-xl border border-white/5 blur-[2px] w-40">
               <div className="flex items-center gap-2 mb-2">
                 <div className="bg-blue-500/20 p-2 rounded text-blue-500"><Users size={16} /></div>
                 <p className="text-gray-300 font-bold text-xs">Gestão de Frota</p>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademySection;