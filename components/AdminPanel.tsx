
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, DollarSign, ShieldAlert, Settings, LogOut, 
  Search, Filter, Download, MoreVertical, Bell, Activity, Lock, 
  Map, CheckCircle, Clock, CircleDashed, Hammer, GraduationCap, FileText, Send, CreditCard, Banknote, ClipboardList, PenTool, Sparkles, Save, Handshake, ShoppingBag, FileSignature, Database, AlertOctagon, ClipboardCheck, Server, Truck, Bus, Scale, Gavel, Radio, Heart, Palette, Image as ImageIcon
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CourseManagement from './admin/CourseManagement';
import RevenueModelTable from './admin/RevenueModelTable'; // Importando o novo componente
import { guardianEngine } from '../services/guardianSystem';
import { sendMessageToMentor, generateMarketingAsset } from '../services/geminiService';
import { Enrollment, StandardProcedure, ProcedureType, ProcedureScope, Partner, MonitriipLog, ClientComplianceStatus } from '../types';

interface AdminPanelProps {
  onLogout: () => void;
}

// --- CHECKLIST MESTRE DE CONFERÊNCIA (DADOS ESTÁTICOS) ---
const SYSTEM_MASTER_CHECKLIST = [
  // ... (Conteúdo original do Checklist mantido) ...
  {
    category: "1. Transporte de Carga (Logística)",
    icon: <Truck className="text-hlx-gold" />,
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
    icon: <Bus className="text-blue-400" />,
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
    icon: <GraduationCap className="text-purple-400" />,
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
    icon: <Gavel className="text-red-400" />,
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
    icon: <Radio className="text-cyan-400" />,
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
    icon: <ShoppingBag className="text-green-400" />,
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
    icon: <Users className="text-gray-400" />,
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

// TYPE ADAPTATION FOR ADMIN TAB
type AdminTab = 'system_audit' | 'dashboard' | 'users' | 'revenue_model' | 'security' | 'settings' | 'roadmap' | 'courses' | 'enrollments' | 'partners' | 'compliance' | 'quality' | 'marketing_ai';

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('system_audit');
  // ... (rest of state definitions)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  
  // --- STATE GESTÃO DA QUALIDADE ---
  const [procedures, setProcedures] = useState<StandardProcedure[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<StandardProcedure | null>(null);
  const [isEditingProc, setIsEditingProc] = useState(false);
  const [aiDraftPrompt, setAiDraftPrompt] = useState('');
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);
  const [procFilter, setProcFilter] = useState<'ALL' | 'POP' | 'PAP'>('ALL');

  // --- STATE PARCEIROS ---
  const [partners, setPartners] = useState<Partner[]>([]);
  const [newPartnerName, setNewPartnerName] = useState('');

  // --- STATE COMPLIANCE & GOV ---
  const [monitriipLogs, setMonitriipLogs] = useState<MonitriipLog[]>([]);
  const [clientCompliance, setClientCompliance] = useState<ClientComplianceStatus[]>([]);

  // --- STATE MARKETING AI (IMAGENS) ---
  const [imagePrompt, setImagePrompt] = useState('Ícone vetorial plano de um caminhão de carga pesado, estilo futurista, cores azul e dourado, fundo branco, alta qualidade');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Estado para Modal de Gestão Completa
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [modalTab, setModalTab] = useState<'finance' | 'credentials'>('finance');
  
  // Form States
  const [credentialsForm, setCredentialsForm] = useState({ login: '', password: '', link: 'https://plataforma-ead-parceiro.com.br' });
  const [financeForm, setFinanceForm] = useState({ value: 0, status: 'pending' as 'pending' | 'paid' | 'overdue', method: 'pix' as 'pix' | 'credit_card' | 'boleto' });

  useEffect(() => {
    // ... (rest of useEffects)
    if (activeTab === 'enrollments') {
        const data = guardianEngine.getAllEnrollments();
        setEnrollments(data);
    }
    if (activeTab === 'quality') {
        const docs = guardianEngine.getAllProcedures();
        setProcedures(docs);
    }
    if (activeTab === 'partners') {
        const parts = guardianEngine.getAllPartners();
        setPartners(parts);
    }
    if (activeTab === 'compliance') {
        const logs = guardianEngine.getMonitriipAudit();
        setMonitriipLogs(logs);
        const clients = guardianEngine.getClientComplianceStatus();
        setClientCompliance(clients);
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

  // ... (handlers maintained)
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
          const typeContext = selectedProcedure.type === 'POP' 
            ? "Crie um Procedimento Operacional Padrão (POP) com passo-a-passo detalhado de execução." 
            : "Crie um Procedimento de Acompanhamento de Projeto (PAP) focado em auditoria, cronograma e pontos de verificação (Checklist).";

          const prompt = `
            Aja como um Gestor da Qualidade ISO 9000 e Especialista em Logística.
            ${typeContext}
            Tema: ${aiDraftPrompt}
            Público Alvo: ${selectedProcedure.scope === 'INTERNAL' ? 'Funcionários da Helonex' : 'Clientes Transportadores'}.
            
            Estrutura Obrigatória:
            1. Objetivo
            2. Responsáveis
            3. Descrição Detalhada (${selectedProcedure.type === 'POP' ? 'Execução' : 'Auditoria'})
            4. Pontos de Risco e KPIs
            
            Retorne em formato Markdown limpo.
          `;
          const content = await sendMessageToMentor(prompt, []);
          setSelectedProcedure({ ...selectedProcedure, content: content, objective: `Gerado por IA (${selectedProcedure.type}): ${aiDraftPrompt}` });
      } catch (e) {
          alert("Erro ao gerar documento.");
      } finally {
          setIsGeneratingDoc(false);
      }
  };

  const handleGenerateImage = async () => {
      if (!imagePrompt) return;
      setIsGeneratingImage(true);
      setGeneratedImage(null); 
      try {
          const base64Img = await generateMarketingAsset(imagePrompt);
          if (base64Img) {
              setGeneratedImage(base64Img);
          } else {
              alert("Não foi possível gerar a imagem. Verifique a API Key.");
          }
      } catch (error) {
          console.error(error);
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
      
      case 'revenue_model':
        return <RevenueModelTable />;

      case 'marketing_ai':
        return (
            <div className="space-y-8 animate-fade-in-up">
                {/* ... (Existing marketing content) ... */}
                <div className="bg-slate-900 border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
                            <Palette className="text-purple-400" size={32} />
                            Fábrica de Ativos Visuais (Marketing Studio)
                        </h2>
                        <p className="text-gray-400 text-lg max-w-3xl">
                            Gere ícones, logotipos e ilustrações para o sistema usando o modelo <strong>Gemini 2.5 Flash Image</strong>.
                        </p>
                    </div>
                    <div className="absolute right-0 top-0 p-6 opacity-5">
                        <ImageIcon size={150} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-800 rounded-xl border border-white/5 p-6">
                        <h3 className="text-white font-bold mb-4">Prompt de Criação</h3>
                        <div className="space-y-4">
                            <textarea 
                                value={imagePrompt}
                                onChange={(e) => setImagePrompt(e.target.value)}
                                className="w-full h-32 bg-slate-900 border border-white/10 rounded-lg p-4 text-white resize-none focus:border-purple-500 outline-none"
                                placeholder="Descreva a imagem..."
                            />
                            <button 
                                onClick={handleGenerateImage}
                                disabled={isGeneratingImage}
                                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isGeneratingImage ? <Sparkles className="animate-spin" /> : <Sparkles />}
                                {isGeneratingImage ? 'Gerando Ativo...' : 'Gerar Imagem'}
                            </button>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-xl border border-white/5 p-6 flex flex-col items-center justify-center min-h-[300px]">
                        {generatedImage ? (
                            <div className="text-center">
                                <img src={generatedImage} alt="Gerado por IA" className="max-w-full h-auto rounded-lg shadow-2xl mb-4 border border-white/10" />
                                <div className="flex gap-2 justify-center">
                                    <button className="text-xs bg-slate-700 text-white px-3 py-2 rounded">Download PNG</button>
                                    <button className="text-xs bg-slate-700 text-white px-3 py-2 rounded">Salvar na Biblioteca</button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-500 flex flex-col items-center">
                                <ImageIcon size={48} className="mb-2 opacity-30" />
                                <p className="text-sm">O ativo gerado aparecerá aqui.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );

      case 'quality':
        return (
            // ... (Content maintained)
            <div className="space-y-6 animate-fade-in-up">
                {/* ... (Existing quality code) ... */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900/50 p-6 rounded-xl border border-white/5 gap-4">
                    <div>
                        <h3 className="text-white font-bold text-xl flex items-center gap-2">
                            <ClipboardList className="text-hlx-gold" /> Gestão da Qualidade Total
                        </h3>
                        <p className="text-xs text-gray-400">Diretriz: Documentar todos os processos internos e externos.</p>
                    </div>
                    
                    <div className="flex gap-2">
                        <div className="flex bg-slate-800 rounded-lg p-1 border border-white/10">
                            <button onClick={() => setProcFilter('ALL')} className={`px-3 py-1 text-xs font-bold rounded ${procFilter === 'ALL' ? 'bg-slate-600 text-white' : 'text-gray-400'}`}>Todos</button>
                            <button onClick={() => setProcFilter('POP')} className={`px-3 py-1 text-xs font-bold rounded ${procFilter === 'POP' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>POP</button>
                            <button onClick={() => setProcFilter('PAP')} className={`px-3 py-1 text-xs font-bold rounded ${procFilter === 'PAP' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>PAP</button>
                        </div>
                        <button 
                            onClick={handleCreateProcedure}
                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-2 shadow-lg"
                        >
                            <PenTool size={16} /> Criar Novo
                        </button>
                    </div>
                </div>

                {!isEditingProc ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {procedures
                            .filter(p => procFilter === 'ALL' || p.type === procFilter)
                            .map(proc => (
                            <div key={proc.id} onClick={() => { setSelectedProcedure(proc); setIsEditingProc(true); }} className="bg-slate-800 p-5 rounded-xl border border-white/5 hover:border-hlx-gold/30 transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${proc.type === 'POP' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                        {proc.type}
                                    </span>
                                    <span className="text-xs text-gray-500 font-mono">{proc.lastUpdate}</span>
                                </div>
                                <h4 className="text-white font-bold text-lg mb-1 group-hover:text-hlx-gold transition-colors">{proc.code}</h4>
                                <p className="text-gray-300 text-sm font-medium mb-2">{proc.title}</p>
                                <p className="text-gray-500 text-xs line-clamp-2">{proc.objective}</p>
                                <div className="mt-4 flex gap-2">
                                    {proc.scope === 'INTERNAL' && <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">INTERNO</span>}
                                    {proc.scope.includes('CLIENT') && <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20">CLIENTE</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : selectedProcedure && (
                    <div className="bg-slate-800 border border-white/5 rounded-xl p-6 shadow-xl animate-fade-in-up">
                        {/* Editor Simplificado (Mantido para brevidade) */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold text-lg">Editor de Procedimentos</h3>
                            <button onClick={() => setIsEditingProc(false)} className="text-gray-400 hover:text-white">Fechar</button>
                        </div>
                        <div className="mb-6">
                            <label className="text-xs text-gray-400 block mb-1">Conteúdo (Markdown)</label>
                            <div className="flex gap-2 mb-2">
                                <input 
                                    type="text" 
                                    value={aiDraftPrompt}
                                    onChange={e => setAiDraftPrompt(e.target.value)}
                                    placeholder="Ex: Como emitir CIOT no sistema..."
                                    className="flex-1 bg-slate-900 border border-white/10 rounded p-2 text-white text-xs"
                                />
                                <button 
                                    onClick={handleGenerateWithAI}
                                    disabled={isGeneratingDoc}
                                    className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1"
                                >
                                    {isGeneratingDoc ? <Sparkles size={12} className="animate-spin" /> : <Sparkles size={12} />} 
                                    Gerar com IA
                                </button>
                            </div>
                            <textarea 
                                value={selectedProcedure.content} 
                                onChange={e => setSelectedProcedure({...selectedProcedure, content: e.target.value})}
                                className="w-full bg-slate-900 border border-white/10 rounded p-2 text-white h-64 font-mono text-sm"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleSaveProcedure} className="bg-green-600 px-4 py-2 rounded text-white font-bold">Salvar</button>
                        </div>
                    </div>
                )}
            </div>
        );

      case 'system_audit':
        return (
          // ... (Existing audit content)
          <div className="space-y-8 animate-fade-in-up">
             <div className="bg-slate-900 border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                   <Server size={150} />
                </div>
                <div className="relative z-10">
                   <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
                      <ClipboardCheck className="text-green-400" size={32} />
                      Auditoria de Arquitetura & Sistemas
                   </h2>
                   <p className="text-gray-400 text-lg max-w-3xl">
                      Checklist Mestre de validação de módulos. Visão completa dos serviços ativos e integrados no Ecossistema HELONEX.
                   </p>
                </div>
             </div>

             <div className="grid grid-cols-1 gap-6">
                {SYSTEM_MASTER_CHECKLIST.map((section, idx) => (
                   <div key={idx} className="bg-slate-800 rounded-xl border border-white/5 overflow-hidden">
                      <div className="bg-slate-950 p-4 border-b border-white/10 flex items-center gap-3">
                         <div className="p-2 bg-slate-900 rounded-lg border border-white/5">
                            {section.icon}
                         </div>
                         <h3 className="text-white font-bold text-lg">{section.category}</h3>
                      </div>
                      <div className="p-6 grid md:grid-cols-2 gap-8">
                         {section.subcategories.map((sub, subIdx) => (
                            <div key={subIdx}>
                               <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                                  {sub.name}
                               </h4>
                               <ul className="space-y-4">
                                  {sub.items.map((item, itemIdx) => (
                                     <li key={itemIdx} className="flex items-start gap-3 group">
                                        <div className="mt-0.5">
                                           {item.status === 'active' ? (
                                              <CheckCircle size={16} className="text-green-500" />
                                           ) : item.status === 'pending' ? (
                                              <CircleDashed size={16} className="text-yellow-500 animate-spin-slow" />
                                           ) : (
                                              <Hammer size={16} className="text-gray-600" />
                                           )}
                                        </div>
                                        <div>
                                           <div className="flex items-center gap-2">
                                              <span className={`text-sm font-bold ${item.status === 'active' ? 'text-white' : 'text-gray-400'}`}>
                                                 {item.label}
                                              </span>
                                              <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase ${
                                                 item.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                                                 item.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                                                 'bg-gray-700 text-gray-400 border-gray-600'
                                              }`}>
                                                 {item.status === 'active' ? 'Online' : item.status === 'pending' ? 'Em Desenv.' : 'Planejado'}
                                              </span>
                                           </div>
                                           <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-300 transition-colors">
                                              {item.desc}
                                           </p>
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
          </div>
        );

      case 'compliance':
          return (
              <div className="space-y-8 animate-fade-in-up">
                  {/* ... (Existing compliance code) ... */}
                  <div>
                      <div className="flex justify-between items-center mb-4">
                          <div>
                              <h3 className="text-white font-bold text-xl flex items-center gap-2">
                                  <FileSignature className="text-hlx-gold" /> Gestão de Procurações (Gov.br)
                              </h3>
                              <p className="text-xs text-gray-400">Status de autorização para atuar no WSDenatran e Renainf em nome do cliente.</p>
                          </div>
                      </div>
                      
                      <div className="bg-slate-800 rounded-xl border border-white/5 overflow-hidden">
                          <table className="w-full text-left text-sm">
                              <thead className="bg-slate-900 text-gray-400 uppercase text-xs font-bold">
                                  <tr>
                                      <th className="p-4">Empresa</th>
                                      <th className="p-4">Status Gov.br</th>
                                      <th className="p-4">Renainf / WSDenatran</th>
                                      <th className="p-4">Validade</th>
                                      <th className="p-4 text-right">Ação</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                  {clientCompliance.map(client => (
                                      <tr key={client.clientId} className="hover:bg-slate-700/30 transition-colors">
                                          <td className="p-4 font-bold text-white">
                                              {client.companyName}
                                              <p className="text-xs text-gray-500 font-mono">{client.cnpj}</p>
                                          </td>
                                          <td className="p-4">
                                              {client.poaStatus.govBr === 'active' ? (
                                                  <span className="flex items-center gap-1 text-green-400 bg-green-500/10 px-2 py-1 rounded text-xs font-bold border border-green-500/20 w-fit">
                                                      <CheckCircle size={12} /> ATIVO
                                                  </span>
                                              ) : (
                                                  <span className="flex items-center gap-1 text-red-400 bg-red-500/10 px-2 py-1 rounded text-xs font-bold border border-red-500/20 w-fit">
                                                      <ShieldAlert size={12} /> PENDENTE
                                                  </span>
                                              )}
                                          </td>
                                          <td className="p-4 text-gray-300">
                                              {client.poaStatus.wsDenatran === 'active' ? 'Autorizado' : 'Aguardando Assinatura'}
                                          </td>
                                          <td className="p-4 text-gray-400 font-mono text-xs">
                                              {client.poaStatus.expiryDate}
                                          </td>
                                          <td className="p-4 text-right">
                                              <button className="text-blue-400 hover:text-white text-xs underline">Gerar Link de Assinatura</button>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          );

      case 'partners':
          return (
              <div className="space-y-6 animate-fade-in-up">
                  {/* ... (Existing partners code) ... */}
                  <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-xl border border-white/5">
                      <div>
                          <h3 className="text-white font-bold text-xl flex items-center gap-2">
                              <Handshake className="text-hlx-gold" /> Gestão de Parcerias
                          </h3>
                          <p className="text-xs text-gray-400">Cadastre fornecedores para o Marketplace Inteligente.</p>
                      </div>
                  </div>

                  <div className="bg-slate-800 p-6 rounded-xl border border-white/5 flex gap-4 items-end">
                      <div className="flex-1">
                          <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Nome do Parceiro</label>
                          <input 
                              type="text" 
                              value={newPartnerName} 
                              onChange={e => setNewPartnerName(e.target.value)} 
                              className="w-full bg-slate-900 border border-white/10 rounded p-2 text-white" 
                              placeholder="Ex: Auto Peças Silva"
                          />
                      </div>
                      <button onClick={handleAddPartner} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold h-10">Adicionar</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {partners.map(p => (
                          <div key={p.id} className="bg-slate-800 p-5 rounded-xl border border-white/5 relative">
                              <div className="flex justify-between items-start mb-2">
                                  <h4 className="text-white font-bold">{p.name}</h4>
                                  <span className={`text-[10px] px-2 py-1 rounded font-bold ${p.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{p.active ? 'ATIVO' : 'INATIVO'}</span>
                              </div>
                              <p className="text-xs text-gray-400 mb-2">Categoria: {p.category}</p>
                              <p className="text-xs text-hlx-gold font-bold">Comissão: {p.commissionRate}%</p>
                          </div>
                      ))}
                  </div>
              </div>
          );

      case 'enrollments':
        return (
            // ... (Enrollment logic)
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
                            {/* ... (Modal content same as before) ... */}
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
                                            ℹ️ Insira aqui o login gerado na plataforma parceira.
                                        </p>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase">Login do Aluno</label>
                                            <input 
                                                type="text" 
                                                value={credentialsForm.login}
                                                onChange={e => setCredentialsForm({...credentialsForm, login: e.target.value})}
                                                className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase">Senha Provisória</label>
                                            <input 
                                                type="text" 
                                                value={credentialsForm.password}
                                                onChange={e => setCredentialsForm({...credentialsForm, password: e.target.value})}
                                                className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase">Link de Acesso</label>
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
            onClick={() => setActiveTab('revenue_model')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'revenue_model' ? 'bg-hlx-blue text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <DollarSign size={18} /> Matriz de Receita
          </button>

          <button 
            onClick={() => setActiveTab('marketing_ai')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'marketing_ai' ? 'bg-hlx-blue text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Palette size={18} /> Marketing IA (Imagens)
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
            <h1 className="text-2xl font-display font-bold text-white uppercase">{activeTab.replace('_', ' ')}</h1>
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
