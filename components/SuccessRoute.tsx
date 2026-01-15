
import React, { useState } from 'react';
import { 
  Trophy, MapPin, Truck, Star, Award, ChevronRight, 
  TrendingUp, Zap, Lock, CheckCircle, Share2, FileText, 
  Download, QrCode, ShieldCheck
} from 'lucide-react';

interface Level {
  id: number;
  name: string;
  minKm: number;
  iconType: 'truck' | 'map' | 'award' | 'globe' | 'trophy';
  benefit: string;
}

const LEVELS: Level[] = [
  { id: 1, name: "Motorista de Pátio", minKm: 0, iconType: 'truck', benefit: "Acesso ao Painel Básico" },
  { id: 2, name: "Rodagem Nacional", minKm: 1000, iconType: 'map', benefit: "Desconto em Certificados Digitais" },
  { id: 3, name: "Capitão de Frota", minKm: 5000, iconType: 'award', benefit: "Mentoria IA Prioritária" },
  { id: 4, name: "Rei da Fronteira", minKm: 12000, iconType: 'globe', benefit: "Acesso VIP a Cursos Internacionais" },
  { id: 5, name: "Lenda da Estrada", minKm: 25000, iconType: 'trophy', benefit: "Consultoria Jurídica Mensal Grátis" }
];

const LevelIcon = ({ type, size = 18 }: { type: string, size?: number }) => {
  switch (type) {
    case 'truck': return <Truck size={size} />;
    case 'map': return <MapPin size={size} />;
    case 'award': return <Award size={size} />;
    case 'trophy': return <Trophy size={size} />;
    case 'globe': return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    );
    default: return <Truck size={size} />;
  }
};

const STUDENT_DATA = {
  name: "Transportadora Silva & Filhos",
  type: "Empresa de Transporte (ETC)",
  since: "2023",
  currentKm: 3450,
  completedTasks: [
    { id: 1, title: "Cadastro da Empresa (CNPJ)", xp: 500, date: "10/10/2024", category: "Administrativo" },
    { id: 2, title: "Curso RNTRC: Módulo 1", xp: 250, date: "12/10/2024", category: "Certificação" },
    { id: 3, title: "Cadastro do 1º Veículo", xp: 1000, date: "15/10/2024", category: "Frota" },
    { id: 4, title: "Emissão de CIOT Teste", xp: 300, date: "20/10/2024", category: "Financeiro" },
    { id: 5, title: "Curso MOPP: Introdução", xp: 1400, date: "25/10/2024", category: "Segurança" }
  ],
  nextTasks: [
    { id: 6, title: "Curso RUTA: Módulo Argentina", xp: 2000, type: "course" },
    { id: 7, title: "Cadastrar 3 Veículos", xp: 1500, type: "action" },
    { id: 8, title: "Quiz: Legislação 2026", xp: 500, type: "quiz" }
  ]
};

const CERTIFIED_VALUES = [
  { name: "AVODÁ", desc: "Excelência no Serviço", active: true },
  { name: "YOSHER", desc: "Integridade e Compliance", active: true },
  { name: "PRUDÊNCIA", desc: "Gestão de Riscos", active: true },
  { name: "CHOCHMÁ", desc: "Inteligência Logística", active: false }, 
  { name: "TZEDAKÁ", desc: "Responsabilidade Social", active: false }
];

interface SuccessRouteProps {
  onBack: () => void;
}

const SuccessRoute: React.FC<SuccessRouteProps> = ({ onBack }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const currentLevelIndex = LEVELS.findIndex((lvl, idx) => {
    const nextLvl = LEVELS[idx + 1];
    return STUDENT_DATA.currentKm >= lvl.minKm && (!nextLvl || STUDENT_DATA.currentKm < nextLvl.minKm);
  });
  const currentLevel = LEVELS[currentLevelIndex];
  const nextLevel = LEVELS[currentLevelIndex + 1];

  const levelFloor = currentLevel.minKm;
  const levelCeiling = nextLevel ? nextLevel.minKm : currentLevel.minKm * 1.5;
  const progressPercent = Math.min(100, Math.max(0, ((STUDENT_DATA.currentKm - levelFloor) / (levelCeiling - levelFloor)) * 100));

  return (
    <div className="bg-slate-900 min-h-full rounded-2xl border border-white/5 overflow-hidden flex flex-col animate-fade-in-up relative">
      <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-8 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Trophy size={150} />
        </div>

        <div className="flex justify-between items-start mb-6 relative z-10">
          <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
            <ChevronRight size={20} className="rotate-180" /> Voltar ao Dashboard
          </button>
          
          <button 
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-hlx-blue hover:bg-blue-600 text-white rounded-lg font-bold shadow-lg transition-all border border-blue-400/30 animate-pulse"
          >
            <Share2 size={18} />
            Gerar CV Certificado
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-hlx-gold text-slate-900 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                <LevelIcon type={currentLevel.iconType} size={14} /> Nível {currentLevel.id}
              </div>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-hlx-blue font-bold text-sm">Próximo: {nextLevel ? nextLevel.name : 'Máximo Atingido'}</span>
            </div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">{currentLevel.name}</h1>
            <p className="text-gray-400 max-w-lg">
              Você já percorreu <span className="text-white font-bold">{STUDENT_DATA.currentKm} Km de Conhecimento</span>. 
              Sua frota está ficando mais inteligente a cada aula.
            </p>
          </div>

          <div className="w-full md:w-1/3 bg-slate-800/50 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
             <div className="flex justify-between text-xs text-gray-400 mb-2 uppercase font-bold">
               <span>Progresso para Nível {currentLevel.id + 1}</span>
               <span>{Math.floor(progressPercent)}%</span>
             </div>
             <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden mb-2 relative">
               <div 
                  className="h-full bg-gradient-to-r from-hlx-gold to-orange-500 transition-all duration-1000 ease-out relative"
                  style={{ width: `${progressPercent}%` }}
               >
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
               </div>
             </div>
             <p className="text-xs text-right text-hlx-gold">
               Faltam {nextLevel ? nextLevel.minKm - STUDENT_DATA.currentKm : 0} Km para evoluir
             </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 relative">
             <h3 className="text-white font-bold text-xl mb-8 flex items-center gap-2">
               <MapPin className="text-hlx-orange" /> Sua Jornada na HELONEX
             </h3>
             <div className="absolute left-4 top-16 bottom-0 w-1 bg-slate-800 rounded-full"></div>
             <div className="space-y-8 relative z-10">
               {STUDENT_DATA.nextTasks.map((task) => (
                 <div key={task.id} className="flex gap-6 opacity-60 hover:opacity-100 transition-opacity group cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center flex-shrink-0 z-10 shadow-lg group-hover:border-hlx-gold group-hover:bg-hlx-gold group-hover:text-slate-900 transition-all">
                       <Lock size={14} />
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 flex-1 group-hover:border-hlx-gold/30 transition-all">
                       <div className="flex justify-between items-start">
                         <h4 className="text-white font-bold">{task.title}</h4>
                         <span className="text-xs font-bold text-hlx-gold bg-hlx-gold/10 px-2 py-1 rounded">+{task.xp} Km</span>
                       </div>
                    </div>
                 </div>
               ))}
               <div className="flex gap-6 items-center py-4">
                  <div className="w-12 h-12 rounded-full bg-hlx-gold shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center flex-shrink-0 z-20 -ml-1.5 animate-pulse border-4 border-slate-900">
                     <Truck size={20} className="text-slate-900 fill-slate-900" />
                  </div>
                  <div className="px-4 py-2 bg-hlx-gold/10 border border-hlx-gold/30 rounded-lg text-hlx-gold text-sm font-bold">
                    VOCÊ ESTÁ AQUI ({STUDENT_DATA.currentKm} Km)
                  </div>
               </div>
               {[...STUDENT_DATA.completedTasks].reverse().map((task) => (
                 <div key={task.id} className="flex gap-6">
                    <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 z-10 shadow-lg border-4 border-slate-900">
                       <CheckCircle size={14} className="text-slate-900" />
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-green-500/20 flex-1 opacity-70 hover:opacity-100 transition-opacity">
                       <div className="flex justify-between items-start">
                         <h4 className="text-gray-300 font-bold line-through decoration-green-500/50">{task.title}</h4>
                         <span className="text-xs text-green-500 font-mono">Concluído em {task.date}</span>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-hlx-blue/20 to-slate-900 p-6 rounded-xl border border-hlx-blue/30">
               <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                 <Star className="text-yellow-400 fill-yellow-400" size={16} /> Benefício Ativo
               </h4>
               <p className="text-hlx-blue font-bold text-lg">{currentLevel.benefit}</p>
            </div>
          </div>
        </div>
      </div>

      {showShareModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in-up">
          <div className="bg-slate-50 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden text-slate-900 flex flex-col max-h-[90vh]">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 flex justify-between items-start text-white">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-hlx-gold to-hlx-orange rounded-lg flex items-center justify-center shadow-lg">
                    <span className="font-display font-bold text-white text-xl">HLX</span>
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl uppercase tracking-wider">Passaporte Profissional</h2>
                    <p className="text-xs text-hlx-gold uppercase tracking-widest">Portal HELONEX Brasil • Certificado de Qualidade</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-white">
                <Lock size={20} /> Fechar
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-200 pb-6 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{STUDENT_DATA.name}</h3>
                  <p className="text-gray-600 font-medium">{STUDENT_DATA.type} • Membro desde {STUDENT_DATA.since}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200 flex items-center gap-1">
                      <ShieldCheck size={12} /> Cadastro Verificado
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="w-24 h-24 bg-white p-2 rounded-lg border border-gray-200 shadow-sm mx-auto md:ml-auto">
                    <QrCode className="w-full h-full text-slate-900" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Validar em: helonex.global/validar</p>
                </div>
              </div>
              <div className="mb-8">
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-hlx-blue" /> Competências Técnicas Comprovadas
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {STUDENT_DATA.completedTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle size={16} className="text-green-500" />
                        <div>
                          <p className="text-sm font-bold text-slate-700">{task.title}</p>
                          <p className="text-[10px] text-gray-500 uppercase">{task.category}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">{task.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 border-t border-gray-200 flex flex-col md:flex-row gap-4">
              <button className="flex-1 py-3 bg-hlx-blue hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2">
                <Share2 size={18} /> Copiar Link do Perfil
              </button>
              <button className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2">
                <Download size={18} /> Baixar PDF Oficial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessRoute;
