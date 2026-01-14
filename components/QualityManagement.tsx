import React, { useState, useEffect } from 'react';
import { 
  BarChart, Activity, AlertTriangle, Target, Users, CheckCircle2, 
  PlusCircle, ArrowRight, BrainCircuit, FileText, ClipboardList, 
  Search, Filter, ChevronDown, ChevronUp, Shield, Award, Zap,
  Briefcase, Truck, Bus, Layers, Wrench, Microscope, Scale, RefreshCw
} from 'lucide-react';
import { BSCIndicator, NonConformity, QualityMultiplier, ActionPlan5W2H } from '../types';
import { guardianEngine } from '../services/guardianSystem';

type ContextType = 'GLOBAL' | 'CARGO' | 'PASSENGER';

const QualityManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hub' | 'bsc' | 'rnc' | 'plans' | 'gamification'>('hub');
  const [context, setContext] = useState<ContextType>('GLOBAL');
  
  // Data States
  const [bscData, setBscData] = useState<BSCIndicator[]>([]);
  const [ncData, setNcData] = useState<NonConformity[]>([]);
  const [multipliers, setMultipliers] = useState<QualityMultiplier[]>([]);
  
  // RNC Form State
  const [isNcModalOpen, setIsNcModalOpen] = useState(false);
  const [newNc, setNewNc] = useState<Partial<NonConformity>>({ 
    title: '', severity: 'Media', origin: 'Indicador', description: '' 
  });

  useEffect(() => {
    refreshData();
  }, [context]);

  const refreshData = () => {
    // Simula filtragem de dados baseada no contexto
    let allBsc = guardianEngine.getBSCIndicators();
    if (context === 'CARGO') {
        allBsc = [
            { id: 'bsc_c1', name: 'Índice de Avarias', perspective: 'Processos Internos', target: 0.5, actual: 1.2, unit: '%', trend: 'down', owner: 'Expedição', linkedTo: [] },
            { id: 'bsc_c2', name: 'SASSMAQ Compliance', perspective: 'Processos Internos', target: 95, actual: 88, unit: '%', trend: 'up', owner: 'QSMS', linkedTo: [] },
            ...allBsc.filter(i => i.perspective === 'Financeira')
        ];
    } else if (context === 'PASSENGER') {
        allBsc = [
            { id: 'bsc_p1', name: 'IQT (Qualidade ANTT)', perspective: 'Clientes', target: 90, actual: 82, unit: 'pts', trend: 'stable', owner: 'Tráfego', linkedTo: [] },
            { id: 'bsc_p2', name: 'Pontualidade Monitriip', perspective: 'Processos Internos', target: 98, actual: 94, unit: '%', trend: 'up', owner: 'TI', linkedTo: [] },
            ...allBsc.filter(i => i.perspective === 'Financeira')
        ];
    }

    setBscData(allBsc);
    setNcData(guardianEngine.getNonConformities());
    setMultipliers(guardianEngine.getQualityMultipliers());
  };

  const handleOpenNc = () => {
    const id = `NC-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`;
    const nc: NonConformity = {
      id,
      code: id,
      title: newNc.title || 'Nova Não Conformidade',
      origin: newNc.origin as any,
      severity: newNc.severity as any,
      status: 'Aberta',
      description: newNc.description || '',
      identifiedBy: 'Usuário',
      dateOpen: new Date().toISOString().split('T')[0]
    };
    guardianEngine.addNonConformity(nc);
    setIsNcModalOpen(false);
    setNewNc({ title: '', severity: 'Media', origin: 'Indicador', description: '' });
    refreshData();
    alert("Não Conformidade registrada. Inicie a análise de causa raiz.");
  };

  const renderToolsHub = () => {
      // Helper para adaptar a descrição ao contexto selecionado
      const getContextDesc = (toolId: string, defaultText: string) => {
          if (context === 'CARGO') {
              switch (toolId) {
                  case 'ishikawa': return 'Investigue avarias, tombamentos ou atrasos na entrega. Foco em: Condições da Via (Meio) e Manutenção (Máquina).';
                  case '5wh2': return 'Planeje a manutenção preventiva da frota pesada. Onde: Oficina. Quando: Km exato. Quem: Mecânico Chefe.';
                  case '5porques': return 'Por que o pneu estourou? Pressão baixa. Por que? Falta de calibragem. Por que? Negligência no checklist.';
                  case 'pdca': return 'Melhore o consumo de diesel. Plan: Meta de média. Do: Treinamento. Check: Telemetria. Act: Bonificação.';
                  case 'matriz_risco': return 'Priorize riscos SASSMAQ: Vazamento Químico (Crítico) vs. Farol Queimado (Médio).';
                  case 'swot': return 'Forças: Frota Nova. Fraquezas: Dependência de um embarcador. Oportunidades: Agronegócio.';
              }
          }
          if (context === 'PASSENGER') {
              switch (toolId) {
                  case 'ishikawa': return 'Analise reclamações no SAC. Foco em: Ar-condicionado (Máquina) e Cortesia do Motorista (Mão de Obra).';
                  case '5wh2': return 'Plano de limpeza da frota. Quem: Equipe de Apoio. Quando: Intervalo de viagem. Como: Protocolo Sanitário.';
                  case '5porques': return 'Por que o ônibus atrasou? Trânsito. Por que não previu? Roteirização falha. Por que? Sistema desatualizado.';
                  case 'pdca': return 'Eleve o IQT (Índice de Qualidade). Plan: Reduzir quebras. Do: Revisão preventiva. Check: Monitriip.';
                  case 'matriz_risco': return 'Priorize: Falha no Freio (Gravíssimo) vs. Wi-Fi Lento (Leve). Segurança do passageiro em 1º lugar.';
                  case 'swot': return 'Forças: Marca forte. Fraquezas: Frota antiga. Ameaças: Aplicativos de carona.';
              }
          }
          return defaultText;
      };

      const tools = [
          {
              id: 'ishikawa',
              title: 'Diagrama de Ishikawa',
              subtitle: 'Espinha de Peixe',
              icon: <Activity size={24} />,
              desc: getContextDesc('ishikawa', 'Identifique a causa raiz de problemas analisando 6M: Método, Material, Mão de Obra, Máquina, Medida e Meio Ambiente.'),
              color: 'text-red-400',
              bg: 'bg-red-500/10',
              border: 'border-red-500/30'
          },
          {
              id: '5wh2',
              title: 'Plano de Ação 5W2H',
              subtitle: 'Execução Tática',
              icon: <ClipboardList size={24} />,
              desc: getContextDesc('5wh2', 'Transforme ideias em ação: What, Why, Where, When, Who, How, How Much.'),
              color: 'text-blue-400',
              bg: 'bg-blue-500/10',
              border: 'border-blue-500/30'
          },
          {
              id: '5porques',
              title: 'Os 5 Porquês',
              subtitle: 'Profundidade Analítica',
              icon: <BrainCircuit size={24} />,
              desc: getContextDesc('5porques', 'Pergunte "Por que?" 5 vezes sucessivas para chegar à raiz do defeito e evitar soluções paliativas.'),
              color: 'text-purple-400',
              bg: 'bg-purple-500/10',
              border: 'border-purple-500/30'
          },
          {
              id: 'pdca',
              title: 'Ciclo PDCA',
              subtitle: 'Melhoria Contínua',
              icon: <RefreshCw size={24} />,
              desc: getContextDesc('pdca', 'Plan (Planejar), Do (Executar), Check (Verificar), Act (Agir). O motor da ISO 9000.'),
              color: 'text-green-400',
              bg: 'bg-green-500/10',
              border: 'border-green-500/30'
          },
          {
              id: 'matriz_risco',
              title: 'Matriz de Risco (GUT)',
              subtitle: 'Priorização',
              icon: <Scale size={24} />,
              desc: getContextDesc('matriz_risco', 'Classifique problemas por Gravidade, Urgência e Tendência para saber o que resolver primeiro.'),
              color: 'text-orange-400',
              bg: 'bg-orange-500/10',
              border: 'border-orange-500/30'
          },
          {
              id: 'swot',
              title: 'Análise SWOT',
              subtitle: 'Estratégia',
              icon: <Target size={24} />,
              desc: getContextDesc('swot', 'Forças, Fraquezas, Oportunidades e Ameaças. Essencial para o Planejamento Estratégico.'),
              color: 'text-hlx-gold',
              bg: 'bg-hlx-gold/10',
              border: 'border-hlx-gold/30'
          }
      ];

      return (
          <div className="animate-fade-in-up space-y-8">
              <div className="text-center max-w-3xl mx-auto mb-8">
                  <h2 className="text-3xl font-bold text-white mb-3">O Arsenal da Qualidade 4.0</h2>
                  <p className="text-gray-400">
                      Selecione a ferramenta metodológica adequada. 
                      O sistema adaptou as orientações para o contexto: <strong className="text-hlx-gold">{context === 'GLOBAL' ? 'Geral' : context === 'CARGO' ? 'Transporte de Carga' : 'Transporte de Passageiros'}</strong>.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map(tool => (
                      <div key={tool.id} className={`p-6 rounded-2xl border ${tool.border} bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer group relative overflow-hidden flex flex-col`}>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.bg} ${tool.color}`}>
                              {tool.icon}
                          </div>
                          <h3 className="text-white font-bold text-lg">{tool.title}</h3>
                          <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${tool.color}`}>{tool.subtitle}</p>
                          <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                              {tool.desc}
                          </p>
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 group-hover:text-white transition-colors mt-auto">
                              <span>ABRIR FERRAMENTA</span>
                              <ArrowRight size={14} />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      );
  };

  const renderBSC = () => {
    const perspectives = [
      { id: 'Financeira', color: 'text-green-400', border: 'border-green-500/30' },
      { id: 'Clientes', color: 'text-blue-400', border: 'border-blue-500/30' },
      { id: 'Processos Internos', color: 'text-purple-400', border: 'border-purple-500/30' },
      { id: 'Aprendizado e Crescimento', color: 'text-yellow-400', border: 'border-yellow-500/30' }
    ];

    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Target className="text-hlx-gold" /> Balanced Scorecard (BSC 2026)
              </h2>
              <p className="text-gray-400 text-sm">Visão Estratégica: {context === 'GLOBAL' ? 'Empresa Completa' : context === 'CARGO' ? 'Divisão de Cargas' : 'Divisão de Passageiros'}</p>
            </div>
            <div className="flex gap-2">
                <button className="bg-slate-800 text-gray-300 px-4 py-2 rounded-lg text-sm border border-white/10 hover:bg-slate-700">
                Baixar PDF
                </button>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                Reunião de Análise Crítica
                </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {perspectives.map((persp) => {
              const indicators = bscData.filter(i => i.perspective === persp.id);
              return (
                <div key={persp.id} className={`bg-slate-800/50 rounded-xl border ${persp.border} p-5 relative overflow-hidden`}>
                  <h3 className={`font-bold text-sm uppercase tracking-wider mb-4 ${persp.color}`}>{persp.id}</h3>
                  <div className="space-y-4">
                    {indicators.map(ind => (
                      <div key={ind.id} className="bg-slate-900 p-3 rounded-lg border border-white/5 flex justify-between items-center group hover:border-white/20 transition-colors cursor-pointer">
                        <div>
                          <p className="text-white font-medium text-sm">{ind.name}</p>
                          <p className="text-[10px] text-gray-500">Dono: {ind.owner}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className={`text-lg font-bold ${ind.actual >= ind.target ? 'text-green-400' : 'text-red-400'}`}>
                              {ind.actual}{ind.unit}
                            </span>
                            <span className="text-[10px] text-gray-500">Meta: {ind.target}{ind.unit}</span>
                          </div>
                          {ind.trend === 'up' ? <span className="text-[10px] text-green-500">▲ Tendência Alta</span> : 
                           ind.trend === 'down' ? <span className="text-[10px] text-red-500">▼ Queda</span> :
                           <span className="text-[10px] text-gray-500">Estável</span>}
                        </div>
                      </div>
                    ))}
                    {indicators.length === 0 && <p className="text-xs text-gray-600 italic">Sem indicadores definidos para este contexto.</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderRNC = () => {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row justify-between items-center bg-slate-800 p-4 rounded-xl border border-white/5 gap-4">
          <div>
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <AlertTriangle className="text-red-500" /> Gestão de Não Conformidades
            </h3>
            <p className="text-xs text-gray-400">Metodologia ISO 9000 & Regulação Responsiva</p>
          </div>
          <button 
            onClick={() => setIsNcModalOpen(true)}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg w-full md:w-auto justify-center"
          >
            <PlusCircle size={16} /> Nova RNC
          </button>
        </div>

        <div className="grid gap-4">
          {ncData.map(nc => (
            <div key={nc.id} className="bg-slate-900 border border-white/10 rounded-xl p-5 hover:border-hlx-gold/30 transition-all group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    nc.severity === 'Critica' ? 'bg-red-500/20 text-red-400' : 
                    nc.severity === 'Alta' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {nc.severity}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 font-mono">{nc.code}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded border ${
                  nc.status === 'Aberta' ? 'border-red-500 text-red-400' : 'border-green-500 text-green-400'
                }`}>
                  {nc.status}
                </span>
              </div>
              
              <h4 className="text-white font-bold text-lg mb-2">{nc.title}</h4>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{nc.description}</p>
              
              <div className="bg-slate-950 p-3 rounded-lg border border-white/5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <BrainCircuit size={14} className="text-purple-400" />
                  <strong>Análise de Causa (IA):</strong> {nc.rootCauseAnalysis ? 'Concluída' : 'Pendente'}
                </div>
                {nc.rootCauseAnalysis && (
                  <p className="text-xs text-gray-500 pl-6 italic">"{nc.rootCauseAnalysis.details}"</p>
                )}
              </div>

              <div className="mt-4 flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <button className="text-xs text-gray-300 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded border border-white/10">
                  Ver Detalhes
                </button>
                <button className="text-xs text-white bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded font-bold shadow-lg">
                  Plano de Ação (5W2H)
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Nova RNC */}
        {isNcModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-slate-900 rounded-xl border border-white/10 w-full max-w-md p-6">
              <h3 className="text-white font-bold text-lg mb-4">Registrar Não Conformidade</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Título</label>
                  <input 
                    className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white" 
                    value={newNc.title} onChange={e => setNewNc({...newNc, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Gravidade</label>
                    <select 
                      className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white"
                      value={newNc.severity} onChange={e => setNewNc({...newNc, severity: e.target.value as any})}
                    >
                      <option value="Baixa">Baixa</option>
                      <option value="Media">Média</option>
                      <option value="Alta">Alta</option>
                      <option value="Critica">Crítica</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Origem</label>
                    <select 
                      className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white"
                      value={newNc.origin} onChange={e => setNewNc({...newNc, origin: e.target.value as any})}
                    >
                      <option value="Indicador">Indicador</option>
                      <option value="Auditoria">Auditoria</option>
                      <option value="Reclamacao">Reclamação</option>
                      <option value="Monitriip">Monitriip</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Descrição</label>
                  <textarea 
                    className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white h-24" 
                    value={newNc.description} onChange={e => setNewNc({...newNc, description: e.target.value})}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={() => setIsNcModalOpen(false)} className="text-gray-400 hover:text-white px-4 py-2">Cancelar</button>
                  <button onClick={handleOpenNc} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-bold">Registrar</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderGamification = () => {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="bg-gradient-to-r from-purple-900/40 to-slate-900 rounded-xl p-6 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Award className="text-yellow-400" /> Qualidade Humana
          </h2>
          <p className="text-gray-300">
            Reconhecimento para quem faz a diferença. Multiplicadores que identificam e resolvem problemas ganham destaque e bônus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {multipliers.map((user, idx) => (
            <div key={user.id} className="bg-slate-800 rounded-xl p-5 border border-white/5 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-9xl font-bold text-white/5 -z-0 pointer-events-none">
                {idx + 1}
              </div>
              <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold text-white border-2 border-hlx-gold relative z-10">
                {user.name.charAt(0)}
              </div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg">{user.name}</h3>
                <p className="text-hlx-gold text-xs uppercase font-bold tracking-wider mb-2">{user.role}</p>
                <div className="flex gap-2">
                  {user.badges.map(b => (
                    <span key={b} className="text-[9px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-auto text-right relative z-10">
                <div className="text-2xl font-bold text-white">{user.points}</div>
                <div className="text-xs text-gray-500">XP</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & CONTEXT SWITCHER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-6 gap-4">
            <div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">Central da Qualidade 4.0</h1>
                <p className="text-gray-400 text-sm">Governança, Estratégia e Melhoria Contínua.</p>
            </div>
            
            <div className="bg-slate-900 p-1 rounded-lg border border-white/10 flex">
                <button 
                    onClick={() => setContext('GLOBAL')} 
                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${context === 'GLOBAL' ? 'bg-slate-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                    GLOBAL
                </button>
                <button 
                    onClick={() => setContext('CARGO')} 
                    className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${context === 'CARGO' ? 'bg-green-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                    <Truck size={14} /> CARGA
                </button>
                <button 
                    onClick={() => setContext('PASSENGER')} 
                    className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${context === 'PASSENGER' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                    <Bus size={14} /> PASSAGEIROS
                </button>
            </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex overflow-x-auto gap-2 mb-8 border-b border-white/10 pb-1 custom-scrollbar">
          <button onClick={() => setActiveTab('hub')} className={`px-4 py-3 flex items-center gap-2 text-sm font-bold border-b-2 transition-all ${activeTab === 'hub' ? 'border-hlx-gold text-white' : 'border-transparent text-gray-400'}`}>
            <Wrench size={18} /> Hub de Ferramentas
          </button>
          <button onClick={() => setActiveTab('bsc')} className={`px-4 py-3 flex items-center gap-2 text-sm font-bold border-b-2 transition-all ${activeTab === 'bsc' ? 'border-hlx-gold text-white bg-white/5' : 'border-transparent text-gray-400'}`}>
            <Target size={18} /> Painel Estratégico (BSC)
          </button>
          <button onClick={() => setActiveTab('rnc')} className={`px-4 py-3 flex items-center gap-2 text-sm font-bold border-b-2 transition-all ${activeTab === 'rnc' ? 'border-red-500 text-red-400 bg-red-500/5' : 'border-transparent text-gray-400'}`}>
            <AlertTriangle size={18} /> RNC & Ishikawa
          </button>
          <button onClick={() => setActiveTab('plans')} className={`px-4 py-3 flex items-center gap-2 text-sm font-bold border-b-2 transition-all ${activeTab === 'plans' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-gray-400'}`}>
            <ClipboardList size={18} /> Planos 5W2H
          </button>
          <button onClick={() => setActiveTab('gamification')} className={`px-4 py-3 flex items-center gap-2 text-sm font-bold border-b-2 transition-all ${activeTab === 'gamification' ? 'border-purple-500 text-purple-400 bg-purple-500/5' : 'border-transparent text-gray-400'}`}>
            <Users size={18} /> Multiplicadores
          </button>
        </div>

        {/* CONTENT RENDER */}
        {activeTab === 'hub' && renderToolsHub()}
        {activeTab === 'bsc' && renderBSC()}
        {activeTab === 'rnc' && renderRNC()}
        {activeTab === 'gamification' && renderGamification()}
        {activeTab === 'plans' && (
          <div className="text-center py-20 bg-slate-900 rounded-xl border border-white/5">
            <ClipboardList size={64} className="mx-auto text-gray-700 mb-4" />
            <h3 className="text-xl text-white font-bold">Laboratório de Planos de Ação</h3>
            <p className="text-gray-400 max-w-md mx-auto mt-2">
              Use a metodologia 5W2H para transformar as análises de causa raiz em tarefas executáveis. Módulo integrado ao calendário da equipe.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityManagement;