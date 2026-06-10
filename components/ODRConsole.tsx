
import React, { useState, useEffect, useRef } from 'react';
import { 
  Scale, ShieldCheck, Gavel, Handshake, AlertTriangle, 
  Clock, Lock, Key, BrainCircuit, PenTool, Fingerprint, 
  Send, FileText, Download, Eye, Zap, History, X, Loader2,
  CheckCircle, ArrowRight, MessageSquare, ShieldAlert, UploadCloud, File,
  MinusCircle, PlusCircle, Check
} from 'lucide-react';
import { auditMessageSentiment, processResolveCore } from '../services/geminiService';
import { MetacognitiveEngine } from '../src/domain/ai/MetacognitiveEngine';

// Utilitário simples de Hash (Simulação SHA-256 no browser para integridade de provas)
const calculateHash = async (file: File): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("SHA256-" + Math.random().toString(36).substring(2, 15).toUpperCase());
        }, 1200);
    });
};

const ODRConsole: React.FC = () => {
  const [view, setView] = useState<'AUTH' | 'ROOM'>('AUTH');
  const [tab, setTab] = useState<'OVERVIEW' | 'CHAT' | 'EVIDENCES' | 'ZOPA' | 'SIGN'>('OVERVIEW');
  
  // Auth State
  const [protocol, setProtocol] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');

  // Data State
  const [dispute, setDispute] = useState<any>(null);
  const [bid, setBid] = useState<number>(0);
  const [zopaStatus, setZopaStatus] = useState<'WAITING' | 'SUBMITTED' | 'MATCH' | 'NO_MATCH'>('WAITING');
  const [zopaRecommendation, setZopaRecommendation] = useState('');
  const [legalClauses, setLegalClauses] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  
  // Chat State
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{author: string, text: string, time: string, isSystem?: boolean}[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sentinelBlock, setSentinelBlock] = useState<{reason: string, suggestion: string} | null>(null);

  // Evidence State
  const [evidences, setEvidences] = useState<{name: string, hash: string, status: 'VALID' | 'PENDING'}[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (tab === 'CHAT') {
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  }, [chatMessages, tab]);

  const handleLogin = () => {
    // Protocolo de demonstração padrão
    if ((protocol === 'ODR-2026-8892' || protocol === '777') && (accessKey === '777' || accessKey === 'admin')) {
      const mockDispute = {
        protocol: 'ODR-2026-8892',
        requester: 'Transportadora Silva Ltda',
        respondent: 'Indústria Metal-X',
        value: 12500.00,
        type: 'ESTADIA_LOGISTICA',
        status: 'OPEN',
        timeline: [
          { date: '2026-03-10 08:00', text: 'Protocolo aberto pelo Reclamante.' },
          { date: '2026-03-10 09:30', text: 'Evidência AudTech vinculada: Log de GPS (BR-116).' },
          { date: '2026-03-10 14:00', text: 'Parte reclamada acessou o cofre.' }
        ]
      };
      setDispute(mockDispute);
      setChatMessages([
          { author: 'Helonex Sentinela', text: 'Bem-vindos à Sala de Mediação Segura. Todas as mensagens são auditadas pela IA para garantir o Protocolo Yosher (Integridade). Mantenham o foco na resolução justa.', time: '08:00', isSystem: true }
      ]);
      setEvidences([
          { name: 'log_gps_br116.json', hash: 'SHA256-8A7S9D8A7S9', status: 'VALID' },
          { name: 'cte_12345_assinado.pdf', hash: 'SHA256-991A2B3C4D', status: 'VALID' }
      ]);
      setView('ROOM');
      setError('');
    } else {
      setError('Acesso negado. Protocolo ou Chave de Segurança inválidos.');
    }
  };

  const handleSendMessage = async () => {
      if (!message.trim()) return;
      setIsSending(true);
      setSentinelBlock(null);

      // Auditoria da IA Sentinela Heurística (MetacognitiveEngine)
      const sentinelResult = MetacognitiveEngine.sentinelFilter(message);
      
      if (!sentinelResult.isPolite) {
          setSentinelBlock({
              reason: "Linguagem hostil ou termos proibidos detectados pelo Motor Sentinela.",
              suggestion: "O sistema removeu termos agressivos. Reformule sua mensagem para manter o rito processual e a validade jurídica."
          });
          setIsSending(false);
          return;
      }

      // Auditoria do Core Engine (Nova Integração)
      const coreResult = await processResolveCore({
          task: "SENTINEL_MODERATION",
          dispute_id: dispute.protocol,
          message: message
      });

      if (coreResult.sentinelAnalysis && !coreResult.sentinelAnalysis.isPolite) {
          setSentinelBlock({
              reason: "Bloqueio pelo Core Engine: Linguagem hostil detectada.",
              suggestion: "Reformule sua proposta focando em fatos técnicos e cláusulas do Art. 840 CC."
          });
          setIsSending(false);
          return;
      }

      // Auditoria da IA Sentinela (Gemini) para semântica (Backup)
      const audit = await auditMessageSentiment(message);

      if (audit.isHostile) {
          setSentinelBlock({
              reason: audit.reason || "Linguagem não construtiva detectada.",
              suggestion: audit.suggestion || "Para manter a validade jurídica deste processo, reformule sua mensagem focando em evidências."
          });
          setIsSending(false);
          return;
      }

      setChatMessages(prev => [...prev, {
          author: 'Você',
          text: message,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
      setMessage('');
      setIsSending(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      setIsUploading(true);
      const hash = await calculateHash(file);
      setEvidences(prev => [...prev, { name: file.name, hash, status: 'VALID' }]);
      setIsUploading(false);
  };

  const handleZopaSubmit = async () => {
    setZopaStatus('SUBMITTED');
    
    // Simulamos que a outra parte (Reclamada) aceita pagar até R$ 11.000,00
    const ofertaOutraParte = 11000; 

    // Integração com o Core Engine para cálculo de ZOPA e Cláusulas Jurídicas
    const coreResult = await processResolveCore({
        task: "ZOPA_CALCULATION",
        dispute_id: dispute.protocol,
        valorCausa: dispute.value,
        ofertaA: bid,
        ofertaB: ofertaOutraParte,
        tipoConflito: dispute.type
    });

    setZopaRecommendation(coreResult.recommendation || "Análise concluída pelo Core Engine.");
    setLegalClauses(coreResult.legalClauses || "");

    if (coreResult.status === 'MATCHED') {
      setZopaStatus('MATCH');
      setDispute({...dispute, settledValue: coreResult.settlementValue, status: 'MATCHED'});
    } else {
      setZopaStatus('NO_MATCH');
    }
  };

  if (view === 'AUTH') {
      return (
        <div className="flex items-center justify-center min-h-[600px] animate-fade-in bg-slate-950 p-6">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Scale size={150} /></div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-hlx-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-hlx-gold/30 shadow-lg shadow-yellow-900/20">
                <Lock className="text-hlx-gold" size={32} />
              </div>
              <h2 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Cofre de Mediação</h2>
              <p className="text-gray-400 text-sm mt-1">Sala Blindada para Resolução de Conflitos</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1.5 ml-1">Protocolo Seguro</label>
                <input 
                  type="text" 
                  value={protocol}
                  onChange={e => setProtocol(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white font-mono outline-none focus:border-hlx-gold transition-all"
                  placeholder="Ex: ODR-2026-8892"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1.5 ml-1">Chave de Acesso (777)</label>
                <input 
                  type="password" 
                  value={accessKey}
                  onChange={e => setAccessKey(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-hlx-gold transition-all"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20 animate-pulse">{error}</p>}
              <button 
                onClick={handleLogin}
                className="w-full py-4 bg-hlx-gold hover:bg-yellow-400 text-slate-950 font-bold rounded-xl shadow-xl shadow-yellow-900/30 transition-all flex items-center justify-center gap-2 group"
              >
                <ShieldCheck size={20} /> DESTRAVAR SALA SEGURA
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-600 mt-8 uppercase font-bold tracking-tighter">Powered by Helonex JusTech ODR</p>
          </div>
        </div>
      );
  }

  return (
    <div className="flex h-[750px] bg-slate-950 rounded-3xl border border-white/10 overflow-hidden animate-fade-in shadow-2xl m-4">
      {/* Sidebar de Status */}
      <aside className="w-80 bg-slate-900 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5 bg-slate-950">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Conexão Blindada</span>
          </div>
          <h3 className="text-white font-bold text-sm font-mono flex items-center gap-2">
            <Fingerprint size={16} className="text-hlx-gold" /> {dispute.protocol}
          </h3>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {[
            { id: 'OVERVIEW', label: 'Dossiê do Caso', icon: FileText },
            { id: 'CHAT', label: 'Diálogo Monitorado', icon: MessageSquare },
            { id: 'EVIDENCES', label: 'Cofre de Provas', icon: ShieldCheck },
            { id: 'ZOPA', label: 'Cálculo de Acordo', icon: BrainCircuit },
            { id: 'SIGN', label: 'Validação Final', icon: PenTool },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as any)}
              className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold flex items-center gap-4 transition-all ${tab === item.id ? 'bg-hlx-gold text-slate-950 shadow-2xl' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 bg-slate-950/50 border-t border-white/5">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400"><Gavel size={18}/></div>
                <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Mediador Helonex</p>
                    <p className="text-xs text-white font-bold">Protocolo ODR-v2</p>
                </div>
            </div>
            <button className="w-full py-2 bg-red-600/10 text-red-400 border border-red-500/30 rounded-lg text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all">Encerrar Mediação</button>
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0F172A]">
        
        {tab === 'OVERVIEW' && (
          <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-blue-500/20 p-6 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><PlusCircle size={60}/></div>
                <p className="text-[10px] text-blue-400 font-bold uppercase mb-2 tracking-widest">Parte Reclamante</p>
                <h4 className="text-white font-bold text-xl">{dispute.requester}</h4>
              </div>
              <div className="bg-slate-900 border border-red-500/20 p-6 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5"><MinusCircle size={60}/></div>
                <p className="text-[10px] text-red-400 font-bold uppercase mb-2 tracking-widest">Parte Reclamada</p>
                <h4 className="text-white font-bold text-xl">{dispute.respondent}</h4>
              </div>
            </div>

            <div className="bg-slate-900 border border-white/5 p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-8">
                 <h4 className="text-hlx-gold font-bold flex items-center gap-3 text-lg"><History size={20}/> Histórico Auditado de Eventos</h4>
                 <span className="text-[10px] text-gray-500 uppercase font-black">Timestamp Servidor</span>
              </div>
              <div className="space-y-8 relative border-l-2 border-white/5 ml-3 pl-8">
                {dispute.timeline.map((item: any, idx: number) => (
                  <div key={idx} className="relative animate-fade-in" style={{ animationDelay: `${idx * 150}ms` }}>
                    <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-hlx-gold shadow-[0_0_10px_#f59e0b]"></div>
                    <p className="text-[10px] text-hlx-gold font-mono font-bold mb-1">{item.date}</p>
                    <p className="text-sm text-gray-300 font-medium leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'CHAT' && (
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-[#0B1120]">
                    {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.isSystem ? 'justify-center' : msg.author === 'Você' ? 'justify-end' : 'justify-start'}`}>
                            {msg.isSystem ? (
                                <div className="bg-blue-500/10 border border-blue-500/30 px-6 py-3 rounded-full text-xs text-blue-300 flex items-center gap-3 shadow-xl">
                                    <ShieldCheck size={16} /> {msg.text}
                                </div>
                            ) : (
                                <div className={`max-w-[70%] p-4 rounded-2xl shadow-xl ${msg.author === 'Você' ? 'bg-hlx-gold text-slate-950 rounded-tr-none' : 'bg-slate-800 text-white rounded-tl-none border border-white/5'}`}>
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                    <div className="flex justify-between items-center mt-2 opacity-60">
                                        <span className="text-[9px] font-black uppercase tracking-tighter">{msg.author}</span>
                                        <span className="text-[9px] font-mono">{msg.time}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-6 bg-slate-900 border-t border-white/10 relative">
                    {sentinelBlock && (
                        <div className="absolute bottom-full left-6 right-6 mb-4 bg-red-900/95 backdrop-blur-xl border border-red-500 p-6 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-slide-up">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-500/20 rounded-xl text-red-400"><ShieldAlert size={28}/></div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-white text-lg">Bloqueio Sentinela IA</h4>
                                    <p className="text-sm text-red-200 mt-1">{sentinelBlock.reason}</p>
                                    <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
                                        <p className="text-xs text-white leading-relaxed"><strong>💡 Sugestão Técnica:</strong> {sentinelBlock.suggestion}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSentinelBlock(null)} className="text-gray-400 hover:text-white p-1"><X size={20}/></button>
                            </div>
                        </div>
                    )}
                    <div className="flex gap-4">
                        <textarea 
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                            placeholder="Proponha uma solução baseada em fatos..."
                            className="flex-1 bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-hlx-gold outline-none resize-none h-16 transition-all"
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={isSending || !message.trim()}
                            className="p-4 bg-hlx-gold text-slate-950 rounded-2xl hover:bg-yellow-400 transition-all disabled:opacity-50 shadow-lg shadow-yellow-900/20"
                        >
                            {isSending ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                        </button>
                    </div>
                </div>
            </div>
        )}

        {tab === 'EVIDENCES' && (
            <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar h-full">
                <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center hover:border-hlx-gold/50 transition-all bg-slate-900/50 group">
                    <input type="file" id="evidence-upload" className="hidden" onChange={handleFileUpload} />
                    <label htmlFor="evidence-upload" className="cursor-pointer flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center text-hlx-gold group-hover:scale-110 transition-transform shadow-xl">
                            {isUploading ? <Loader2 size={40} className="animate-spin" /> : <UploadCloud size={40} />}
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-xl">Protocolo de Prova Imutável</h3>
                            <p className="text-gray-400 text-sm mt-2">Arraste arquivos para calcular o Hash Digital SHA-256.</p>
                        </div>
                    </label>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck size={14} className="text-green-500" /> Acervo de Provas Vinculadas
                    </h4>
                    {evidences.map((ev, idx) => (
                        <div key={idx} className="bg-slate-900 p-5 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><File size={24}/></div>
                                <div>
                                    <p className="text-white font-bold">{ev.name}</p>
                                    <p className="text-[10px] text-gray-500 font-mono mt-1">HASH: {ev.hash}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30 font-bold uppercase">Auditado</span>
                                <button className="p-2 text-gray-500 hover:text-white transition-colors"><Download size={18}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {tab === 'ZOPA' && (
          <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-green-900/10 to-transparent">
            <div className="max-w-md w-full bg-slate-900 border border-green-500/30 rounded-3xl p-8 shadow-2xl relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Zap size={150} className="text-green-500" /></div>
              
              <div className="text-center mb-8 relative z-10">
                 <h3 className="text-2xl font-display font-bold text-white mb-2">Motor ZOPA</h3>
                 <p className="text-gray-400 text-xs uppercase tracking-widest font-black">Zone of Possible Agreement</p>
              </div>

              {zopaStatus === 'WAITING' ? (
                <div className="space-y-6 relative z-10">
                  <p className="text-sm text-gray-300 leading-relaxed text-center">
                    Insira o valor que você está disposto a aceitar/pagar para encerrar esta disputa hoje. A outra parte não verá este valor, a menos que haja um "Match" (ZOPA).
                  </p>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-green-500 font-bold">R$</span>
                    <input 
                      type="number" 
                      value={bid || ''}
                      onChange={e => setBid(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-2xl font-mono text-center focus:border-green-500 outline-none transition-all shadow-inner"
                      placeholder="0,00"
                    />
                  </div>
                  <button 
                    onClick={handleZopaSubmit}
                    disabled={!bid}
                    className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Zap size={20} className="fill-white" /> SUBMETER PROPOSTA SIGILOSA
                  </button>
                </div>
              ) : zopaStatus === 'SUBMITTED' ? (
                <div className="text-center py-12 animate-pulse">
                  <Loader2 size={48} className="text-hlx-gold animate-spin mx-auto mb-4" />
                  <p className="text-white font-bold">Analisando Convergência via IA...</p>
                  <p className="text-gray-500 text-xs mt-2 uppercase">Auditando limites de ambas as partes</p>
                </div>
              ) : zopaStatus === 'MATCH' ? (
                <div className="text-center animate-fade-in space-y-6">
                   <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                      <Handshake size={40} className="text-white" />
                   </div>
                   <div>
                      <h4 className="text-green-400 font-bold text-2xl">ZOPA IDENTIFICADA!</h4>
                      <p className="text-gray-300 text-sm mt-2">Ambas as partes entraram na zona de acordo. O valor justo calculado é:</p>
                   </div>
                   <div className="bg-white/5 border border-green-500/30 p-6 rounded-2xl">
                      <p className="text-3xl font-display font-bold text-white">R$ {dispute.settledValue.toLocaleString()}</p>
                   </div>
                   {zopaRecommendation && (
                     <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <p className="text-xs text-green-200 leading-relaxed italic">{zopaRecommendation}</p>
                     </div>
                   )}
                   <button onClick={() => setTab('SIGN')} className="w-full py-4 bg-hlx-gold text-slate-950 font-bold rounded-2xl hover:bg-yellow-400 transition-all">PROSSEGUIR PARA ASSINATURA</button>
                </div>
              ) : (
                <div className="text-center animate-fade-in space-y-6">
                   <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border border-red-500/50">
                      <AlertTriangle size={40} className="text-red-500" />
                   </div>
                   <h4 className="text-red-400 font-bold text-xl">SEM CONVERGÊNCIA</h4>
                   {zopaRecommendation && (
                     <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <p className="text-xs text-red-200 leading-relaxed italic">{zopaRecommendation}</p>
                     </div>
                   )}
                   <p className="text-gray-400 text-sm">Os valores propostos estão fora da zona de acordo. Sugerimos usar o Chat de Diálogo para alinhar as expectativas.</p>
                   <button onClick={() => setZopaStatus('WAITING')} className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold">TENTAR NOVAMENTE</button>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'SIGN' && (
            <div className="flex-1 flex flex-col items-center justify-center p-10 bg-[#0B1120]">
                {!isSigned ? (
                    <div className="max-w-2xl w-full bg-slate-900 border border-white/10 rounded-3xl p-10 shadow-2xl">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white">Finalização do Acordo</h3>
                                <p className="text-gray-400 text-sm mt-1">Validade Jurídica de Título Extrajudicial (Art. 840 CC)</p>
                            </div>
                            <div className="p-3 bg-hlx-gold/20 rounded-xl text-hlx-gold"><PenTool size={32}/></div>
                        </div>

                        <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 mb-8 text-sm text-gray-300 leading-relaxed font-mono">
                            <p className="mb-4">EUV, Parte Reclamante e Reclamada, dou fé ao acordo firmado via Protocolo {dispute.protocol}.</p>
                            <p>VALOR: R$ {dispute.settledValue ? dispute.settledValue.toLocaleString() : 'Pendente'}</p>
                            {legalClauses && (
                                <div className="mt-4 pt-4 border-t border-white/10 text-[10px] text-hlx-gold">
                                    <p className="font-bold mb-2 uppercase tracking-widest">Cláusulas de Transação (Art. 840 CC):</p>
                                    <p>{legalClauses}</p>
                                </div>
                            )}
                            <p className="mt-4">Este ato goza de proteção criptográfica e log de IP auditado.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/30">
                                <ShieldCheck className="text-blue-400" size={20}/>
                                <p className="text-xs text-blue-200">Ao clicar, você utiliza sua Identidade Digital Helonex para assinar este termo irrevogavelmente.</p>
                            </div>
                            <button 
                                onClick={() => setIsSigned(true)}
                                className="w-full py-5 bg-hlx-gold text-slate-950 font-bold rounded-2xl text-xl hover:bg-yellow-400 shadow-2xl shadow-yellow-900/20 transition-all flex items-center justify-center gap-3"
                            >
                                <Fingerprint size={28} /> ASSINAR ACORDO AGORA
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center animate-fade-in-up">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.5)]">
                            <Check size={48} className="text-white" />
                        </div>
                        <h2 className="text-4xl font-display font-bold text-white mb-4">CONFLITO RESOLVIDO!</h2>
                        <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg">O termo de acordo foi assinado por ambas as partes e enviado para os e-mails registrados. Status: <strong>ENCERRADO COM SUCESSO</strong>.</p>
                        
                        <div className="flex gap-4 justify-center">
                            <button className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-slate-700 transition-all border border-white/10">
                                <Download size={20}/> BAIXAR ACORDO (PDF)
                            </button>
                            <button onClick={() => window.location.reload()} className="px-8 py-4 bg-hlx-blue text-white font-bold rounded-xl flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg">
                                VOLTAR AO DASHBOARD
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}

      </main>
    </div>
  );
};

export default ODRConsole;
