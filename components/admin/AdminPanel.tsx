
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, DollarSign, ShieldAlert, Settings, LogOut, 
  Search, Filter, Download, MoreVertical, Bell, Activity, Lock, 
  Map, CheckCircle, Clock, CircleDashed, Hammer, GraduationCap, FileText, Send, CreditCard, Banknote
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CourseManagement from './CourseManagement';
import { guardianEngine } from '../../services/guardianSystem';
import { Enrollment } from '../../types';

interface AdminPanelProps {
  onLogout: () => void;
}

// ... (DADOS DE CHART MANTIDOS) ...
const REVENUE_DATA = [
  { name: 'Jan', revenue: 45000, users: 120 },
  { name: 'Fev', revenue: 52000, users: 135 },
  { name: 'Mar', revenue: 49000, users: 140 },
  { name: 'Abr', revenue: 63000, users: 180 },
  { name: 'Mai', revenue: 75000, users: 210 },
  { name: 'Jun', revenue: 92000, users: 250 },
];

const ROADMAP_DATA = [
  {
    phase: "FASE 1: Fundação (MVP)",
    status: "completed",
    progress: 100,
    items: [{ task: "Arquitetura Frontend", status: "done" }]
  },
  // ...
];

type AdminTab = 'dashboard' | 'users' | 'finance' | 'security' | 'settings' | 'roadmap' | 'courses' | 'enrollments';

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('enrollments');
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  
  // Estado para Modal de Gestão Completa (Secretaria + Financeiro)
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [modalTab, setModalTab] = useState<'finance' | 'credentials'>('finance');
  
  // Form States
  const [credentialsForm, setCredentialsForm] = useState({ login: '', password: '', link: 'https://plataforma-ead-parceiro.com.br' });
  const [financeForm, setFinanceForm] = useState({ value: 0, status: 'pending' as 'pending' | 'paid' | 'overdue', method: 'pix' as 'pix' | 'credit_card' | 'boleto' });

  useEffect(() => {
    if (activeTab === 'enrollments') {
        const data = guardianEngine.getAllEnrollments();
        setEnrollments(data);
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedEnrollment) {
        // Popula forms ao abrir modal
        setCredentialsForm({
            login: selectedEnrollment.credentials?.login || '',
            password: selectedEnrollment.credentials?.password || '',
            link: selectedEnrollment.credentials?.accessLink || 'https://plataforma-ead-parceiro.com.br'
        });
        setFinanceForm({
            value: selectedEnrollment.financials?.value || 0,
            status: selectedEnrollment.financials?.paymentStatus || 'pending',
            method: selectedEnrollment.financials?.paymentMethod || 'pix'
        });
    }
  }, [selectedEnrollment]);

  const handleUpdateEnrollment = () => {
      if (!selectedEnrollment) return;
      
      // Constrói objeto de atualização
      const updates: Partial<Enrollment> = {
          financials: {
              value: Number(financeForm.value),
              paymentStatus: financeForm.status,
              paymentMethod: financeForm.method,
              paymentDate: financeForm.status === 'paid' ? new Date().toISOString() : undefined
          }
      };

      // Se inseriu credenciais, assume que quer ativar
      if (credentialsForm.login && credentialsForm.password) {
          updates.status = 'active'; // Libera o curso
          updates.credentials = {
              login: credentialsForm.login,
              password: credentialsForm.password,
              accessLink: credentialsForm.link
          };
      }

      guardianEngine.updateEnrollment(selectedEnrollment.id, updates);

      // Refresh e Feedback
      setEnrollments(guardianEngine.getAllEnrollments());
      setSelectedEnrollment(null);
      alert("✅ Dados atualizados com sucesso!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'enrollments':
        return (
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-white font-bold text-xl">Gestão de Matrículas 360º</h3>
                        <p className="text-xs text-gray-400">Controle Financeiro e Acadêmico Unificado</p>
                    </div>
                    <button onClick={() => setEnrollments(guardianEngine.getAllEnrollments())} className="text-xs text-hlx-gold underline">Atualizar Lista</button>
                </div>

                <div className="bg-slate-800 rounded-xl border border-white/5 overflow-hidden shadow-xl">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-900 text-gray-400 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="p-4">Aluno / Data</th>
                                <th className="p-4">Curso</th>
                                <th className="p-4">Financeiro</th>
                                <th className="p-4">Secretaria</th>
                                <th className="p-4 text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {enrollments.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Nenhuma solicitação encontrada.</td></tr>
                            ) : (
                                enrollments.map(req => (
                                    <tr key={req.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <p className="text-white font-bold">{req.studentName}</p>
                                            <p className="text-xs text-gray-500">{req.requestDate}</p>
                                        </td>
                                        <td className="p-4 text-gray-300">
                                            {req.courseName}
                                            <p className="text-[10px] text-gray-500 uppercase">{req.partnerName}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                                                req.financials?.paymentStatus === 'paid' 
                                                ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                                                : 'bg-red-500/10 text-red-400 border-red-500/30'
                                            }`}>
                                                {req.financials?.paymentStatus === 'paid' ? 'PAGO' : 'PENDENTE'}
                                            </span>
                                            {req.financials?.value > 0 && <p className="text-xs text-gray-400 mt-1">R$ {req.financials.value}</p>}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase flex w-fit items-center gap-1 ${
                                                req.status === 'active' 
                                                ? 'text-blue-400 bg-blue-500/10' 
                                                : 'text-yellow-400 bg-yellow-500/10'
                                            }`}>
                                                {req.status === 'active' ? <CheckCircle size={10} /> : <Clock size={10} />}
                                                {req.status === 'active' ? 'LIBERADO' : 'AGUARDANDO'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => setSelectedEnrollment(req)}
                                                className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded text-xs font-bold border border-white/10 transition-colors"
                                            >
                                                Gerenciar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* MODAL DE GESTÃO UNIFICADA */}
                {selectedEnrollment && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in-up">
                        <div className="bg-slate-900 border border-white/10 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                            
                            {/* Header Modal */}
                            <div className="p-6 border-b border-white/5 bg-slate-950">
                                <h3 className="text-white font-bold text-lg">Gestão do Aluno: {selectedEnrollment.studentName}</h3>
                                <div className="flex gap-4 mt-4 text-sm">
                                    <button 
                                        onClick={() => setModalTab('finance')}
                                        className={`pb-2 border-b-2 transition-colors ${modalTab === 'finance' ? 'border-hlx-gold text-hlx-gold font-bold' : 'border-transparent text-gray-400'}`}
                                    >
                                        1. Financeiro
                                    </button>
                                    <button 
                                        onClick={() => setModalTab('credentials')}
                                        className={`pb-2 border-b-2 transition-colors ${modalTab === 'credentials' ? 'border-hlx-gold text-hlx-gold font-bold' : 'border-transparent text-gray-400'}`}
                                    >
                                        2. Credenciais (Secretaria)
                                    </button>
                                </div>
                            </div>

                            {/* Content Modal */}
                            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                                
                                {modalTab === 'finance' && (
                                    <div className="space-y-4 animate-fade-in-up">
                                        <div className="p-4 bg-slate-800 rounded-lg border border-white/5">
                                            <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Status do Pagamento</label>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => setFinanceForm({...financeForm, status: 'pending'})}
                                                    className={`flex-1 py-2 rounded text-xs font-bold border ${financeForm.status === 'pending' ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-white/10 text-gray-500'}`}
                                                >
                                                    Pendente
                                                </button>
                                                <button 
                                                    onClick={() => setFinanceForm({...financeForm, status: 'paid'})}
                                                    className={`flex-1 py-2 rounded text-xs font-bold border ${financeForm.status === 'paid' ? 'bg-green-500/20 border-green-500 text-green-400' : 'border-white/10 text-gray-500'}`}
                                                >
                                                    Pago (Confirmado)
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-400 uppercase">Valor (R$)</label>
                                                <input 
                                                    type="number" 
                                                    value={financeForm.value}
                                                    onChange={e => setFinanceForm({...financeForm, value: Number(e.target.value)})}
                                                    className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white mt-1"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-400 uppercase">Método</label>
                                                <select 
                                                    value={financeForm.method}
                                                    onChange={e => setFinanceForm({...financeForm, method: e.target.value as any})}
                                                    className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white mt-1"
                                                >
                                                    <option value="pix">PIX</option>
                                                    <option value="credit_card">Cartão de Crédito</option>
                                                    <option value="boleto">Boleto</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalTab === 'credentials' && (
                                    <div className="space-y-4 animate-fade-in-up">
                                        <p className="text-xs text-gray-400 bg-blue-500/10 p-3 rounded border border-blue-500/20">
                                            ℹ️ Insira aqui o login gerado na plataforma parceira ({selectedEnrollment.partnerName}). O aluno verá isso no painel dele.
                                        </p>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase">Login do Aluno</label>
                                            <input 
                                                type="text" 
                                                value={credentialsForm.login}
                                                onChange={e => setCredentialsForm({...credentialsForm, login: e.target.value})}
                                                className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white"
                                                placeholder="Ex: CPF ou Email"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase">Senha Provisória</label>
                                            <input 
                                                type="text" 
                                                value={credentialsForm.password}
                                                onChange={e => setCredentialsForm({...credentialsForm, password: e.target.value})}
                                                className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white"
                                                placeholder="******"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase">Link de Acesso (Plataforma Parceira)</label>
                                            <input 
                                                type="text" 
                                                value={credentialsForm.link}
                                                onChange={e => setCredentialsForm({...credentialsForm, link: e.target.value})}
                                                className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white text-xs"
                                            />
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Footer Modal */}
                            <div className="p-6 border-t border-white/5 flex justify-between bg-slate-950">
                                <button onClick={() => setSelectedEnrollment(null)} className="text-gray-400 hover:text-white text-sm">Cancelar</button>
                                <button 
                                    onClick={handleUpdateEnrollment}
                                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-bold text-sm shadow-lg shadow-green-900/20"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );

      case 'dashboard':
        return <div className="text-white">Dashboard View (Mantida)</div>;

      case 'courses':
        return <CourseManagement />;

      default:
        return <div className="text-white">Módulo em Desenvolvimento</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <div className="w-8 h-8 bg-hlx-gold rounded flex items-center justify-center font-bold text-slate-900">A</div>
          <div>
            <h2 className="text-white font-bold text-sm">ADMINISTRADOR</h2>
            <p className="text-xs text-gray-500">Master Access</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
           <button 
            onClick={() => setActiveTab('enrollments')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'enrollments' ? 'bg-hlx-blue text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <FileText size={18} /> Secretaria & Financeiro
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-auto">!</span>
          </button>

           <button 
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'courses' ? 'bg-hlx-blue text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <GraduationCap size={18} /> Gestão Acadêmica
          </button>

          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'dashboard' ? 'bg-hlx-blue text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard size={18} /> Visão Geral
          </button>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'users' ? 'bg-hlx-blue text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Users size={18} /> Gestão de Usuários
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={onLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={18} /> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen custom-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-white uppercase">{activeTab === 'enrollments' ? 'Secretaria' : activeTab.replace('_', ' ')}</h1>
            <p className="text-gray-400 text-sm">Painel de Controle Unificado HELONEX</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-slate-800 p-2 rounded-full text-gray-400 hover:text-white border border-white/5 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-slate-800"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-white text-sm font-bold">Admin Master</p>
                <p className="text-xs text-hlx-gold">Super User</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-hlx-blue border-2 border-hlx-gold overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Admin+Master&background=random" alt="Admin" />
              </div>
            </div>
          </div>
        </div>

        {renderContent()}

      </main>
    </div>
  );
};

export default AdminPanel;
