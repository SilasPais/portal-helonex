
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, DollarSign, LogOut, 
  Bell, GraduationCap, FileText, Menu, X, Book,
  Handshake, Gavel, TrendingUp, CheckCircle, AlertCircle,
  Truck, ShieldAlert, Activity, Eye, FileCheck, Wallet, ArrowUpRight, ArrowDownLeft, Clock, Filter,
  Landmark
} from 'lucide-react';
import CourseManagement from './CourseManagement';
import DocumentationModule from './DocumentationModule';
import RevenueModelTable from './RevenueModelTable';
import AetcBackoffice from './AetcBackoffice';
import { guardianEngine } from '../../services/guardianSystem';
import { Enrollment } from '../../types';

interface AdminPanelProps {
  onLogout: () => void;
}

type AdminTab = 'dashboard' | 'govtech' | 'aetc_backoffice' | 'justech' | 'nexus' | 'edutech' | 'resolve' | 'users' | 'documentation';

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <div className="text-white p-8 bg-slate-900 rounded-3xl">Painel Executivo em Construção</div>;
      case 'aetc_backoffice': return <AetcBackoffice />;
      case 'edutech': return <CourseManagement />;
      case 'documentation': return <DocumentationModule />;
      case 'resolve': return <div className="text-white p-8 bg-slate-900 rounded-3xl">Gestão Helonex Resolve ODR</div>;
      default: return <div className="text-white p-8 bg-slate-900 rounded-3xl">Módulo em Integração</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 relative">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/10 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative`}>
        <div className="p-6 border-b border-white/5 h-20 flex items-center gap-3">
          <div className="w-8 h-8 bg-hlx-gold rounded flex items-center justify-center font-bold text-slate-900">A</div>
          <h2 className="text-white font-bold text-sm">HELONEX ADMIN</h2>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
           <button onClick={() => { setActiveTab('dashboard'); closeSidebar(); }} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all ${activeTab === 'dashboard' ? 'bg-hlx-blue text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}>
             <LayoutDashboard size={18} /> Dashboard
           </button>
           
           <p className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Células Operacionais</p>
           
           <button onClick={() => { setActiveTab('aetc_backoffice'); closeSidebar(); }} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all ${activeTab === 'aetc_backoffice' ? 'bg-hlx-gold text-slate-950 font-bold' : 'text-gray-400 hover:bg-white/5'}`}>
             <Landmark size={18} /> Backoffice AETC/SUE
           </button>

           <button onClick={() => { setActiveTab('resolve'); closeSidebar(); }} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all ${activeTab === 'resolve' ? 'bg-green-600/20 text-green-400 border border-green-500/30' : 'text-gray-400 hover:bg-white/5'}`}>
             <Handshake size={18} /> Resolve (ODR)
           </button>

           <button onClick={() => { setActiveTab('edutech'); closeSidebar(); }} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all ${activeTab === 'edutech' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30' : 'text-gray-400 hover:bg-white/5'}`}>
             <GraduationCap size={18} /> EduTech
           </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={onLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={18} /> Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen custom-scrollbar w-full">
          <div className="md:hidden mb-4 flex items-center gap-2">
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white bg-slate-900 rounded-lg"><Menu size={24}/></button>
              <span className="font-bold text-white uppercase text-xs tracking-widest">Painel Admin</span>
          </div>
          {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;
