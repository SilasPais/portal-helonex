
import React, { useState } from 'react';
import { 
  GraduationCap, BookOpen, Users, Award, 
  ArrowRight, PlayCircle, PenTool 
} from 'lucide-react';
import AcademySection from './AcademySection';
import CareerTreeModule from './CareerTreeModule';
import MentorChat from './MentorChat';
import CourseCreator from './CourseCreator';

interface EduTechProps {
  onBack: () => void;
  initialModule?: 'DASHBOARD' | 'ACADEMY' | 'CAREER' | 'MENTOR' | 'CREATOR';
}

const EduTech: React.FC<EduTechProps> = ({ onBack, initialModule = 'DASHBOARD' }) => {
  const [activeModule, setActiveModule] = useState<'DASHBOARD' | 'ACADEMY' | 'CAREER' | 'MENTOR' | 'CREATOR'>(initialModule);

  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-bold text-white uppercase">EduTech</h2>
          <p className="text-gray-400">Capacitação, Mentoria e Desenvolvimento de Carreira.</p>
        </div>
        <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2">
          <ArrowRight className="rotate-180" /> Voltar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => setActiveModule('ACADEMY')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Academia Helonex</h3>
          <p className="text-gray-500 text-xs mt-2">Cursos, certificações e trilhas de aprendizado.</p>
        </div>

        <div 
          onClick={() => setActiveModule('CAREER')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-4 group-hover:scale-110 transition-transform">
            <Award size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Árvore de Carreira</h3>
          <p className="text-gray-500 text-xs mt-2">Planejamento de carreira e evolução profissional.</p>
        </div>

        <div 
          onClick={() => setActiveModule('MENTOR')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Mentoria IA</h3>
          <p className="text-gray-500 text-xs mt-2">Orientação personalizada 24/7 com especialistas virtuais.</p>
        </div>

        <div 
          onClick={() => setActiveModule('CREATOR')}
          className="bg-slate-900 border border-white/10 p-6 rounded-2xl hover:border-hlx-gold/50 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
            <PenTool size={24} />
          </div>
          <h3 className="text-white font-bold text-lg">Criador de Cursos</h3>
          <p className="text-gray-500 text-xs mt-2">Ferramentas para instrutores e criação de conteúdo.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <PlayCircle className="text-hlx-gold" /> Cursos em Destaque
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all group cursor-pointer">
            <div className="h-32 bg-blue-900/20 flex items-center justify-center group-hover:bg-blue-900/30 transition-colors">
              <BookOpen size={40} className="text-blue-400" />
            </div>
            <div className="p-4">
              <h4 className="text-white font-bold text-sm">Legislação de Trânsito 2026</h4>
              <p className="text-xs text-gray-500 mt-1">Atualizações do CTB e novas resoluções.</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Iniciante</span>
                <span className="text-[10px] text-gray-400">4h 30m</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all group cursor-pointer">
            <div className="h-32 bg-green-900/20 flex items-center justify-center group-hover:bg-green-900/30 transition-colors">
              <Award size={40} className="text-green-400" />
            </div>
            <div className="p-4">
              <h4 className="text-white font-bold text-sm">Gestão de Frotas Eficiente</h4>
              <p className="text-xs text-gray-500 mt-1">Redução de custos e manutenção preventiva.</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded">Intermediário</span>
                <span className="text-[10px] text-gray-400">8h 15m</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all group cursor-pointer">
            <div className="h-32 bg-purple-900/20 flex items-center justify-center group-hover:bg-purple-900/30 transition-colors">
              <Users size={40} className="text-purple-400" />
            </div>
            <div className="p-4">
              <h4 className="text-white font-bold text-sm">Liderança e Gestão de Pessoas</h4>
              <p className="text-xs text-gray-500 mt-1">Desenvolvendo equipes de alta performance.</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded">Avançado</span>
                <span className="text-[10px] text-gray-400">12h 00m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8">
      {activeModule === 'DASHBOARD' && renderDashboard()}
      {activeModule === 'ACADEMY' && (
        <div className="h-full">
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao EduTech
          </button>
          <AcademySection />
        </div>
      )}
      {activeModule === 'CAREER' && (
        <div className="h-full">
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao EduTech
          </button>
          <CareerTreeModule />
        </div>
      )}
      {activeModule === 'MENTOR' && (
        <div className="h-full">
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao EduTech
          </button>
          <MentorChat />
        </div>
      )}
      {activeModule === 'CREATOR' && (
        <div className="h-full">
          <button onClick={() => setActiveModule('DASHBOARD')} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowRight className="rotate-180" size={20} /> Voltar ao EduTech
          </button>
          <CourseCreator onCourseCreated={() => setActiveModule('DASHBOARD')} onCancel={() => setActiveModule('DASHBOARD')} />
        </div>
      )}
    </div>
  );
};

export default EduTech;
