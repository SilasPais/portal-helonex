
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, DollarSign, ShieldAlert, Settings, LogOut, 
  Search, Filter, Download, MoreVertical, Bell, Activity, Lock, 
  Map, CheckCircle, Clock, CircleDashed, Hammer, GraduationCap, FileText, Send, CreditCard, Banknote, ClipboardList, PenTool, Sparkles, Save, Handshake, ShoppingBag, FileSignature, Database, AlertOctagon, ClipboardCheck, Server, Truck, Bus, Scale, Gavel, Radio, Heart, Palette, Image as ImageIcon
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CourseManagement from './admin/CourseManagement';
import RevenueModelTable from './admin/RevenueModelTable';
import { guardianEngine } from '../services/guardianSystem';
import { sendMessageToMentor, generateMarketingAsset } from '../services/geminiService';
import { Enrollment, StandardProcedure, Partner, MonitriipLog, ClientComplianceStatus } from '../types';

interface AdminPanelProps {
  onLogout: () => void;
}

const SYSTEM_MASTER_CHECKLIST = [
  {
    category: "1. Transporte de Carga (Logística)",
    iconId: 'truck',
    subcategories: [
      {
        name: "Serviços Diretos (Regulatório)",
        items: [
          { label: "RNTRC - TAC (Autônomo)", status: "active", desc: "Emissão, Renovação e Inclusão de Veículo via API ANTT." },
          { label: "RNTRC - ETC (Empresa)", status: "active", desc: "Gestão de Frota, RT e Responsabilidade Técnica." },
          { label: "RNTRC - CTC (Cooperativa)", status: "pending", desc: "Módulo para gestão de cooperados." },
          { label: "Emissão de CIOT/PEF", status: "active", desc: "Integração Bancária para Pagamento Eletrônico de Frete." },
          { label: "Vale-Pedágio Obrigatório", status: "active", desc: "Vínculo com Operadoras de TAG (Sem Parar/Veloe)." },
          { label: "AET (Autorização Especial)", status: "active", desc: "Cargas Indivisíveis e Excesso de Peso (DNIT/DER)." },
          { label: "Licenças Internacionais (TRIC)", status: "active", desc: "Permissões Brasil-Mercosul e Chile (MIC/DTA)." }
        ]
      },
      {
        name: "Serviços Indiretos (Suporte)",
        items: [
          { label: "Seguro RCTR-C (Acidente)", status: "active", desc: "Apólice Obrigatória Lei 14.599 (Averbada)." },
          { label: "Seguro RC-DC (Roubo)", status: "active", desc: "Gestão de Apólices e Integração Averbadora." },
          { label: "Manutenção Preventiva", status: "active", desc: "Controle de Pneus, Óleo e Revisões." },
          { label: "Recuperação de Crédito", status: "planned", desc: "Módulo Fiscal para recuperação de ICMS/PIS/COFINS." }
        ]
      }
    ]
  },
  {
    category: "2. Transporte de Passageiros (Mobilidade)",
    iconId: 'bus',
    subcategories: [
      {
        name: "Serviços Diretos (ANTT & Estaduais)",
        items: [
          { label: "Monitriip DIS 4.0", status: "active", desc: "Transmissão de Logs 4G e Bilhetagem em Tempo Real." },
          { label: "Fretamento (TAF) - Circuito Fechado", status: "active", desc: "Emissão de Licença de Viagem e Lista de Passageiros." },
          { label: "Linhas Regulares (TAR)", status: "active", desc: "Gestão de IQT (Índice de Qualidade) e Horários." },
          { label: "Transporte Escolar (PNATE)", status: "active", desc: "Gestão de Vistorias Semestrais e Cursos." },
          { label: "Licenças Estaduais (ARTESP/DER)", status: "active", desc: "Mapeamento de exigências por UF (Módulo Mapa)." }
        ]
      },
      {
        name: "Serviços Indiretos",
        items: [
          { label: "Seguro APP (Passageiros)", status: "active", desc: "Cobertura de Morte/Invalidez por assento." },
          { label: "Laudos de Acessibilidade", status: "pending", desc: "Certificação de Cadeirante (INMETRO)." },
          { label: "Limpeza e Higienização", status: "planned", desc: "Certificado de Sanitização de Frota." }
        ]
      }
    ]
  },
  {
    category: "3. Academia HLX Nexos (EduTech)",
    iconId: 'grad',
    subcategories: [
      {
        name: "Cursos Regulatórios",
        items: [
          { label: "Curso MOPP (Mov. Prod. Perigosos)", status: "active", desc: "Integração com DETRAN para averbação na CNH." },
          { label: "Curso Transporte Coletivo", status: "active", desc: "Obrigatório para motoristas de ônibus/vans." },
          { label: "Curso Escolar", status: "active", desc: "Formação específica para transporte de estudantes." }
        ]
      },
      {
        name: "Gestão & Inteligência",
        items: [
          { label: "IA Creator (Gerador de Cursos)", status: "active", desc: "Criação de ementas personalizadas on-demand." },
          { label: "Gestão de Custos de Frota", status: "active", desc: "Cálculo de KM rodado e depreciação." }
        ]
      }
    ]
  },
  {
    category: "4. Gestão Jurídica (JusTech)",
    iconId: 'gavel',
    subcategories: [
      {
        name: "Defesa & Compliance",
        items: [
          { label: "SNE (Notificação Eletrônica)", status: "active", desc: "Adesão para 40% de desconto em multas." },
          { label: "Defesa Prévia (IA)", status: "active", desc: "Geração automática de peças jurídicas." },
          { label: "Indicação de Condutor", status: "active", desc: "Transferência de pontuação online." },
          { label: "LGPD & Privacidade", status: "active", desc: "Gestão de consentimento e portabilidade de dados." }
        ]
      }
    ]
  },
  {
    category: "5. SASSMAQ & Qualidade (Nexus)",
    iconId: 'radio',
    subcategories: [
      {
        name: "Auditoria & Tecnologia",
        items: [
          { label: "Vistoria Digital (Checklist)", status: "active", desc: "App para motorista realizar check pré-viagem." },
          { label: "Monitoramento de Câmeras", status: "active", desc: "IA para detecção de EPIs e riscos no pátio." },
          { label: "Gestão de Não-Conformidades", status: "active", desc: "RNC e Plano de Ação (5W2H)." }
        ]
      }
    ]
  },
  {
    category: "6. Marketplace & Parceiros",
    iconId: 'mkt',
    subcategories: [
      {
        name: "Clube de Vantagens",
        items: [
          { label: "Rede de Abastecimento", status: "active", desc: "Desconto em Diesel e Arla 32." },
          { label: "Peças e Pneus", status: "active", desc: "Acordos comerciais com grandes fornecedores." },
          { label: "Bancos e Financeiras", status: "active", desc: "Capital de giro e financiamento de frota." }
        ]
      }
    ]
  },
  {
    category: "7. Acesso e Perfis",
    iconId: 'users',
    subcategories: [
      {
        name: "Controle de Acesso",
        items: [
          { label: "Login Gov.br", status: "active", desc: "Autenticação via OAUTH Gov (Prata/Ouro)." },
          { label: "Perfil: Admin (Master)", status: "active", desc: "Visão total do sistema e métricas." },
          { label: "Perfil: Cliente (Transportador)", status: "active", desc: "Acesso à frota, cursos e documentos." },
          { label: "Perfil: Parceiro (Fornecedor)", status: "active", desc: "Gestão de ofertas no Marketplace." }
        ]
      }
    ]
  }
];

const SectionIcon = ({ id }: { id: string }) => {
  switch (id) {
    case 'truck': return <Truck className="text-hlx-gold" />;
    case 'bus': return <Bus className="text-blue-400" />;
    case 'grad': return <GraduationCap className="text-purple-400" />;
    case 'gavel': return <Gavel className="text-red-400" />;
    case 'radio': return <Radio className="text-cyan-400" />;
    case 'mkt': return <ShoppingBag className="text-green-400" />;
    case 'users': return <Users className="text-gray-400" />;
    default: return null;
  }
};

type AdminTab = 'system_audit' | 'dashboard' | 'users' | 'revenue_model' | 'security' | 'settings' | 'roadmap' | 'courses' | 'enrollments' | 'partners' | 'compliance' | 'quality' | 'marketing_ai';

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('system_audit');
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [procedures, setProcedures] = useState<StandardProcedure[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<StandardProcedure | null>(null);
  const [isEditingProc, setIsEditingProc] = useState(false);
  const [aiDraftPrompt, setAiDraftPrompt] = useState('');
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);
  const [procFilter, setProcFilter] = useState<'ALL' | 'POP' | 'PAP'>('ALL');
  const [partners, setPartners] = useState<Partner[]>([]);
  const [newPartnerName, setNewPartnerName] = useState('');
  const [monitriipLogs, setMonitriipLogs] = useState<MonitriipLog[]>([]);
  const [clientCompliance, setClientCompliance] = useState<ClientComplianceStatus[]>([]);
  const [imagePrompt, setImagePrompt] = useState('Ícone vetorial plano de um caminhão de carga pesado, estilo futurista, cores azul e dourado, fundo branco, alta qualidade');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [modalTab, setModalTab] = useState<'finance' | 'credentials'>('finance');
  const [credentialsForm, setCredentialsForm] = useState({ login: '', password: '', link: 'https://plataforma-ead-parceiro.com.br' });
  const [financeForm, setFinanceForm] = useState({ value: 0, status: 'pending' as 'pending' | 'paid' | 'overdue', method: 'pix' as 'pix' | 'credit_card' | 'boleto' });

  useEffect(() => {
    if (activeTab === 'enrollments') setEnrollments(guardianEngine.getAllEnrollments());
    if (activeTab === 'quality') setProcedures(guardianEngine.getAllProcedures());
    if (activeTab === 'partners') setPartners(guardianEngine.getAllPartners());
    if (activeTab === 'compliance') {
        setMonitriipLogs(guardianEngine.getMonitriipAudit());
        setClientCompliance(guardianEngine.getClientComplianceStatus());
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedEnrollment) {
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

  const handleAddPartner = () => {
      if (!newPartnerName) return;
      const newPart: Partner = {
          id: Math.random().toString(36).substr(2, 9),
          name: newPartnerName,
          category: 'Manutencao', 
          active: true,
          commissionRate: 5.0
      };
      guardianEngine.addPartner(newPart);
      setPartners(guardianEngine.getAllPartners());
      setNewPartnerName('');
      alert("Parceiro Cadastrado!");
  };

  const handleCreateProcedure = () => {
      const newProc: StandardProcedure = {
          id: Math.random().toString(36).substr(2, 9),
          code: 'NOVO-000',
          type: 'POP',
          scope: 'INTERNAL',
          title: 'Novo Procedimento',
          objective: '',
          version: '1.0',
          lastUpdate: new Date().toISOString().split('T')[0],
          content: '',
          tags: []
      };
      setSelectedProcedure(newProc);
      setIsEditingProc(true);
  };

  const handleSaveProcedure = () => {
      if (!selectedProcedure) return;
      guardianEngine.saveProcedure(selectedProcedure);
      setProcedures(guardianEngine.getAllProcedures()); 
      setIsEditingProc(false);
      setSelectedProcedure(null);
      alert("Procedimento Salvo com Sucesso (ISO 9000 Compliance).");
  };

  const handleGenerateWithAI = async () => {
      if (!aiDraftPrompt.trim() || !selectedProcedure) return;
      setIsGeneratingDoc(true);
      try {
          const prompt = `Aja como um Gestor da Qualidade ISO 9000. Crie um ${selectedProcedure.type} sobre: ${aiDraftPrompt}. Retorne em Markdown.`;
          const content = await sendMessageToMentor(prompt, []);
          setSelectedProcedure({ ...selectedProcedure, content: content, objective: `Gerado por IA: ${aiDraftPrompt}` });
      } catch (e) {
          alert("Erro ao gerar documento.");
      } finally {
          setIsGeneratingDoc(false);
      }
  };

  const handleGenerateImage = async () => {
      if (!imagePrompt) return;
      setIsGeneratingImage(true);
      try {
          const base64Img = await generateMarketingAsset(imagePrompt);
          if (base64Img) setGeneratedImage(base64Img);
      } catch (error) {
          alert("Erro na geração de imagem.");
      } finally {
          setIsGeneratingImage(false);
      }
  };

  const handleUpdateEnrollment = () => {
      if (!selectedEnrollment) return;
      const updates: Partial<Enrollment> = {
          financials: {
              value: Number(financeForm.value),
              paymentStatus: financeForm.status,
              paymentMethod: financeForm.method,
              paymentDate: financeForm.status === 'paid' ? new Date().toISOString() : undefined
          }
      };
      if (credentialsForm.login && credentialsForm.password) {
          updates.status = 'active'; 
          updates.credentials = {
              login: credentialsForm.login,
              password: credentialsForm.password,
              accessLink: credentialsForm.link
          };
      }
      guardianEngine.updateEnrollment(selectedEnrollment.id, updates);
      setEnrollments(guardianEngine.getAllEnrollments());
      setSelectedEnrollment(null);
      alert("✅ Dados atualizados com sucesso!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'revenue_model': return <RevenueModelTable />;
      case 'marketing_ai': return (
            <div className="space-y-8 animate-fade-in-up">
                <div className="bg-slate-900 border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3"><Palette className="text-purple-400" size={32} /> Marketing Studio</h2>
                        <p className="text-gray-400">Gere ativos visuais usando Gemini 2.5 Flash Image.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-800 rounded-xl p-6">
                        <textarea value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} className="w-full h-32 bg-slate-900 rounded-lg p-4 text-white" />
                        <button onClick={handleGenerateImage} disabled={isGeneratingImage} className="w-full mt-4 py-3 bg-purple-600 rounded-lg font-bold">
                            {isGeneratingImage ? 'Gerando...' : 'Gerar Imagem'}
                        </button>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-6 flex items-center justify-center">
                        {generatedImage ? <img src={generatedImage} className="rounded-lg max-w-full" alt="IA" /> : <p className="text-gray-500">Imagem gerada aparecerá aqui.</p>}
                    </div>
                </div>
            </div>
        );
      case 'quality': return (
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-xl">
                    <h3 className="text-white font-bold text-xl">Gestão da Qualidade</h3>
                    <button onClick={handleCreateProcedure} className="bg-green-600 px-4 py-2 rounded font-bold">Novo POP</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {procedures.map(proc => (
                        <div key={proc.id} onClick={() => { setSelectedProcedure(proc); setIsEditingProc(true); }} className="bg-slate-800 p-5 rounded-xl cursor-pointer">
                            <h4 className="text-white font-bold">{proc.code}</h4>
                            <p className="text-gray-400 text-sm">{proc.title}</p>
                        </div>
                    ))}
                </div>
                {isEditingProc && selectedProcedure && (
                    <div className="bg-slate-800 p-6 rounded-xl mt-6">
                        <input type="text" value={aiDraftPrompt} onChange={e => setAiDraftPrompt(e.target.value)} className="bg-slate-900 w-full mb-4 p-2 text-white" placeholder="Tema para IA..." />
                        <button onClick={handleGenerateWithAI} className="bg-purple-600 px-4 py-2 rounded mb-4">Gerar com IA</button>
                        <textarea value={selectedProcedure.content} onChange={e => setSelectedProcedure({...selectedProcedure, content: e.target.value})} className="w-full h-64 bg-slate-900 p-4 text-white font-mono" />
                        <button onClick={handleSaveProcedure} className="bg-green-600 px-6 py-2 rounded mt-4">Salvar</button>
                    </div>
                )}
            </div>
        );
      case 'system_audit': return (
          <div className="space-y-8 animate-fade-in-up">
             {SYSTEM_MASTER_CHECKLIST.map((section, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl overflow-hidden mb-6">
                   <div className="bg-slate-950 p-4 flex items-center gap-3">
                      <SectionIcon id={section.iconId} />
                      <h3 className="text-white font-bold text-lg">{section.category}</h3>
                   </div>
                   <div className="p-6 grid md:grid-cols-2 gap-8">
                      {section.subcategories.map((sub, sIdx) => (
                         <div key={sIdx}>
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-4">{sub.name}</h4>
                            <ul className="space-y-4">
                               {sub.items.map((item, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-3">
                                     <div className="mt-0.5">
                                        {item.status === 'active' ? <CheckCircle size={16} className="text-green-500" /> : <CircleDashed size={16} className="text-yellow-500" />}
                                     </div>
                                     <div>
                                        <p className="text-sm font-bold text-white">{item.label}</p>
                                        <p className="text-xs text-gray-500">{item.desc}</p>
                                     </div>
                                  </li>
                               ))}
                            </ul>
                         </div>
                      ))}
                   </div>
                </div>
             ))}
          </div>
        );
      case 'enrollments': return (
            <div className="space-y-6 animate-fade-in-up">
                <div className="bg-slate-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900 text-gray-400 text-xs font-bold uppercase">
                            <tr><th className="p-4">Aluno</th><th className="p-4">Curso</th><th className="p-4">Status</th><th className="p-4">Ação</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {enrollments.map(req => (
                                <tr key={req.id}>
                                    <td className="p-4 text-white">{req.studentName}</td>
                                    <td className="p-4 text-gray-400">{req.courseName}</td>
                                    <td className="p-4"><span className="text-xs">{req.status}</span></td>
                                    <td className="p-4"><button onClick={() => setSelectedEnrollment(req)} className="text-hlx-gold text-xs">Gerenciar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedEnrollment && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
                        <div className="bg-slate-900 p-8 rounded-xl max-w-md w-full">
                            <h3 className="text-white font-bold mb-4">Gerenciar Aluno</h3>
                            <button onClick={handleUpdateEnrollment} className="bg-green-600 w-full py-2 rounded mb-2">Ativar Aluno</button>
                            <button onClick={() => setSelectedEnrollment(null)} className="w-full py-2 text-gray-400">Fechar</button>
                        </div>
                    </div>
                )}
            </div>
        );
      default: return <div className="text-white">Em Desenvolvimento</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5"><h2 className="text-white font-bold">ADMIN PANEL</h2></div>
        <nav className="flex-1 p-4 space-y-2">
           <button onClick={() => setActiveTab('enrollments')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm ${activeTab === 'enrollments' ? 'bg-hlx-blue text-white' : 'text-gray-400'}`}><FileText size={18} /> Secretaria</button>
           <button onClick={() => setActiveTab('courses')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm ${activeTab === 'courses' ? 'bg-hlx-blue text-white' : 'text-gray-400'}`}><GraduationCap size={18} /> Acadêmico</button>
           <button onClick={() => setActiveTab('revenue_model')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm ${activeTab === 'revenue_model' ? 'bg-hlx-blue text-white' : 'text-gray-400'}`}><DollarSign size={18} /> Matriz Financeira</button>
           <button onClick={() => setActiveTab('marketing_ai')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm ${activeTab === 'marketing_ai' ? 'bg-hlx-blue text-white' : 'text-gray-400'}`}><Palette size={18} /> Marketing Studio</button>
           <button onClick={() => setActiveTab('system_audit')} className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm ${activeTab === 'system_audit' ? 'bg-hlx-blue text-white' : 'text-gray-400'}`}><ClipboardCheck size={18} /> Auditoria Sistema</button>
        </nav>
        <div className="p-4 border-t border-white/5"><button onClick={onLogout} className="text-red-400 flex items-center gap-2"><LogOut size={18} /> Sair</button></div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

export default AdminPanel;
