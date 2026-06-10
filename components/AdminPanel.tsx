
import React, { useState, useEffect } from 'react';
import { 
  Users, DollarSign, LogOut, CheckCircle, GraduationCap, ClipboardCheck, Truck, Bus, RefreshCcw
} from 'lucide-react';
import CourseManagement from './admin/CourseManagement';
import RevenueModelTable from './admin/RevenueModelTable';
import BackupManager from './BackupManager';
import { guardianEngine } from '../services/guardianSystem';
import { Enrollment } from '../types';

interface AdminPanelProps {
  onLogout: () => void;
}

const SYSTEM_MASTER_CHECKLIST = [
  {
    category: "1. Transporte de Carga (Logística)",
    icon: Truck,
    subcategories: [
      {
        name: "Serviços Regulatórios ANTT",
        items: [
          { label: "RNTRC Digital (TAC/ETC)", status: "active", desc: "Emissão e Manutenção via API." },
          { label: "CIOT / Pagamento de Frete", status: "active", desc: "Homologação de Meios de Pagamento." }
        ]
      }
    ]
  },
  {
    category: "2. Transporte de Passageiros (Mobilidade)",
    icon: Bus,
    subcategories: [
      {
        name: "Gestão de Licenças Estaduais/Federais",
        items: [
          { label: "Monitriip DIS 4.0", status: "active", desc: "Monitoramento e Logs de Viagem." },
          { label: "Fretamento Eventual (TAF)", status: "active", desc: "Emissão de Licenças de Viagem." }
        ]
      }
    ]
  }
];

type AdminTab = 'audit' | 'enrollments' | 'revenue' | 'courses';

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('audit');
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [showBackupModal, setShowBackupModal] = useState(false);

  useEffect(() => {
    if (activeTab === 'enrollments') {
      setEnrollments(guardianEngine.getAllEnrollments());
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'audit':
        return (
          <div className="space-y-6 animate-fade-in">
            {SYSTEM_MASTER_CHECKLIST.map((section, idx) => {
              const SectionIcon = section.icon;
              return (
                <div key={idx} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-slate-950 p-4 border-b border-white/5 flex items-center gap-3">
                    <SectionIcon className="text-hlx-gold" size={24} />
                    <h3 className="text-white font-bold text-lg">{section.category}</h3>
                  </div>
                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    {section.subcategories.map((sub, sIdx) => (
                      <div key={sIdx}>
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-widest">{sub.name}</h4>
                        <div className="space-y-3">
                          {sub.items.map((item, iIdx) => (
                            <div key={iIdx} className="bg-slate-800/50 p-3 rounded-lg border border-white/5 flex items-start gap-3">
                              <CheckCircle size={16} className="text-green-500 mt-1" />
                              <div>
                                <p className="text-sm font-bold text-white">{item.label}</p>
                                <p className="text-[10px] text-gray-400">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      case 'enrollments':
        return (
          <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-gray-400 text-xs font-bold uppercase">
                <tr><th className="p-4">Aluno</th><th className="p-4">Curso</th><th className="p-4">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {enrollments.map(req => (
                  <tr key={req.id} className="hover:bg-white/5">
                    <td className="p-4 text-white font-bold">{req.studentName}</td>
                    <td className="p-4 text-gray-400">{req.courseName}</td>
                    <td className="p-4"><span className="text-xs font-bold uppercase text-hlx-gold bg-hlx-gold/10 px-2 py-1 rounded">{req.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'revenue': return <RevenueModelTable />;
      case 'courses': return <CourseManagement />;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white font-sans">
      <aside className="w-64 bg-slate-900 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-white font-display font-bold text-xl tracking-tighter">HELO<span className="text-hlx-gold">NEX</span></h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('audit')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'audit' ? 'bg-hlx-gold text-slate-900' : 'text-gray-400 hover:bg-white/5'}`}>
            <ClipboardCheck size={18} /> Auditoria Master
          </button>
          <button onClick={() => setActiveTab('enrollments')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'enrollments' ? 'bg-hlx-blue text-white' : 'text-gray-400 hover:bg-white/5'}`}>
            <Users size={18} /> Secretaria
          </button>
          <button onClick={() => setActiveTab('courses')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'courses' ? 'bg-hlx-blue text-white' : 'text-gray-400 hover:bg-white/5'}`}>
            <GraduationCap size={18} /> Cursos & EAD
          </button>
          <button onClick={() => setActiveTab('revenue')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'revenue' ? 'bg-hlx-blue text-white' : 'text-gray-400 hover:bg-white/5'}`}>
            <DollarSign size={18} /> Matriz de Receita
          </button>
          
          <button onClick={() => setShowBackupModal(true)} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-bold transition-all text-gray-400 hover:bg-white/5">
            <RefreshCcw size={18} /> Central de Backup
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={onLogout} className="text-red-400 hover:bg-red-500/10 w-full px-4 py-3 rounded-lg flex items-center gap-2 font-bold transition-all"><LogOut size={18} /> Sair</button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">{renderContent()}</main>

      {showBackupModal && <BackupManager onClose={() => setShowBackupModal(false)} />}
    </div>
  );
};

export default AdminPanel;
