
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToMentor, isAIAvailable, getMockResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import AiAlert from '../src/shared/AiAlert';
import { Send, Cpu, User, Loader2, Sparkles, Truck, ShieldCheck, Leaf, BarChart, X, Volume2, StopCircle, Copy, Printer, Check, Trash2, MessageCircle, HelpCircle } from 'lucide-react';

const SUGGESTIONS = [
  "CIOT é obrigatório para frota própria?",
  "Como calcular o piso pela MP 1.343?",
  "Multa por desvio de rota s/ CIOT?",
  "O que mudou no MDF-e em 2026?",
  "Piso mínimo tem que incluir pedágio?",
  "Quais os prazos do MONITRIIP 4.0?",
  "TAC x MEI x ETC: Qual o melhor?",
  "Outra dúvida"
];

const TOPICS = [
  { id: 'ANTT_REGULATORIO', label: 'ANTT & MP 1.343', icon: Truck, contextTag: 'fiscalização antt multa 6074 ciot obrigatorio todos' },
  { id: 'SEGUROS_14599', label: 'Seguros (Lei 14.599)', icon: ShieldCheck, contextTag: 'seguro 14599 rctr-c' },
  { id: 'SASSMAQ_ESG', label: 'SASSMAQ & Qualidade', icon: Leaf, contextTag: 'esg sassmaq qualidade' },
  { id: 'FISCAL_2026', label: 'Fiscal & SPED Nível II', icon: BarChart, contextTag: 'tributario reforma ibs cbs mdf-e integrado ciot' },
  { id: 'MONITRIIP', label: 'Tecnologia & Desvios', icon: Cpu, contextTag: 'monitriip tecnologia desvio rota recalculagem' },
];

const STORAGE_KEY = 'helonex_mentor_history_v2';

const MentorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Olá! Sou o **Helo Smart Bot**, seu auditor técnico e especialista em Cerco Eletrônico de Nível II. \n\nCom a vigência da **MP 1.343/2026** e a prorrogação pelo **Ato 32**, o CIOT agora é obrigatório para todas as operações vinculadas ao MDF-e. Como posso ajudar a blindar sua transportadora hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState<number | null>(null);
  const [copiedMsgIndex, setCopiedMsgIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const hydrated = JSON.parse(saved).map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
        setMessages(hydrated);
      } catch (e) { console.error(e); }
    }
    setIsOnline(isAIAvailable());
    return () => window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
       try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch (e) { }
    }
    scrollToBottom();
  }, [messages]);

  const typeMessage = async (text: string) => {
    setIsTyping(true);
    let currentText = "";
    const words = text.split(" ");
    
    // Add an empty message to fill
    setMessages(prev => [...prev, { role: 'model', text: "", timestamp: new Date() }]);
    
    for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? "" : " ") + words[i];
        const lastIdx = i;
        setMessages(prev => {
            const next = [...prev];
            next[next.length - 1].text = currentText;
            return next;
        });
        // Slower typing for reality feel, but fast enough for UX
        await new Promise(r => setTimeout(r, 15 + Math.random() * 20));
    }
    setIsTyping(false);
  };

  const handleSend = async (customMsg?: string) => {
    const msgText = customMsg || input;
    if (!msgText.trim() || isLoading || isTyping) return;

    const topicData = TOPICS.find(t => t.id === selectedTopic);
    let finalMessageText = msgText;

    if (topicData) {
      finalMessageText = `[MODO ESPECIALISTA: ${topicData.label}] DÚVIDA: ${msgText}`;
    }
    
    setMessages(prev => [...prev, { role: 'user', text: msgText, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);

    try {
      const contextWindow = messages.slice(-10).map(msg => ({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] }));
      let responseText = !isOnline ? getMockResponse(finalMessageText) : await sendMessageToMentor(finalMessageText, contextWindow);
      
      setIsLoading(false);
      await typeMessage(responseText);
    } catch (error) {
      setIsLoading(false);
      setMessages(prev => [...prev, { role: 'model', text: "⚠️ Falha de comunicação. Verifique seu sinal de internet.", timestamp: new Date() }]);
    }
  };

  return (
    <div className="bg-[#0F172A] py-8 md:py-12" id="mentor-section">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           
           {/* Sidebar do Chat (Contexto) */}
           <div className="hidden lg:flex flex-col gap-4">
              <div className="bg-slate-800 border border-white/10 rounded-2xl p-6">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-hlx-gold rounded-xl flex items-center justify-center text-slate-900">
                       <Cpu size={24} />
                    </div>
                    <div>
                       <h3 className="text-white font-bold">Helo Bot</h3>
                       <p className="text-[10px] text-gray-500 uppercase font-black">Personal Expert</p>
                    </div>
                 </div>
                 <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    Nossos agentes técnicos podem ajudar a anular multas manualmente ou orientar sobre licenciamento ANTT.
                 </p>
                 <button className="w-full py-2 bg-green-600/20 text-green-400 border border-green-500/30 rounded-lg text-xs font-bold hover:bg-green-600 hover:text-white transition-all">
                    Falar com Humano
                 </button>
              </div>

              <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4">
                 <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Tópicos Auditados</h4>
                 <div className="space-y-2">
                    {TOPICS.map(t => (
                       <button key={t.id} onClick={() => setSelectedTopic(t.id)} className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${selectedTopic === t.id ? 'bg-hlx-gold/20 text-hlx-gold' : 'text-gray-400 hover:bg-white/5'}`}>
                          <t.icon size={14} /> {t.label}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           {/* Janela do Chat Principal (Estilo Optimizer) */}
           <div className="lg:col-span-3 bg-[#1E293B] border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[700px] overflow-hidden">
              
              {/* Header do Chat */}
              <div className="bg-[#0F172A]/80 p-4 border-b border-white/5 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="relative">
                       <div className="w-10 h-10 bg-slate-700 rounded-full border-2 border-hlx-gold flex items-center justify-center">
                          <Sparkles className="text-hlx-gold" size={20} />
                       </div>
                       <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0F172A] animate-pulse"></div>
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-sm">Helonex Smart Bot</h4>
                       <span className="text-[10px] text-gray-500 font-mono">{new Date().toLocaleDateString()}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <button onClick={() => setMessages([{role:'model', text:'Memória reiniciada.', timestamp:new Date()}])} className="p-2 text-gray-500 hover:text-red-400"><Trash2 size={16} /></button>
                    <button className="bg-slate-800 text-gray-400 px-3 py-1 rounded text-[10px] font-bold border border-white/10">AJUDA</button>
                 </div>
              </div>

              {/* Área de Mensagens */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0F172A]/20 custom-scrollbar">
                 {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-last' : ''}`}>
                          <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#334155] text-white rounded-tr-none shadow-xl' : 'bg-[#1E293B] border border-white/5 text-gray-200 rounded-tl-none shadow-lg'}`}>
                             <p className="whitespace-pre-wrap">{msg.text}</p>
                             {msg.role === 'model' && <AiAlert />}
                          </div>
                          <p className={`text-[9px] text-gray-500 mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>{msg.timestamp.toLocaleTimeString()}</p>
                       </div>
                    </div>
                 ))}
                 {isLoading && <div className="text-xs text-gray-500 animate-pulse flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> IA Helonex está processando...</div>}
                 <div ref={messagesEndRef} />
              </div>

              {/* Rodapé Dinâmico: Sugestões + Input */}
              <div className="bg-[#0F172A]/60 p-4 border-t border-white/5">
                 
                 {/* Quick Reply Buttons (Sugestões estilo Outbyte) */}
                 {!isLoading && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                       {SUGGESTIONS.map(s => (
                          <button 
                            key={s} 
                            onClick={() => handleSend(s)}
                            className="bg-slate-800/50 hover:bg-slate-800 border border-white/5 text-gray-400 hover:text-white px-2 py-3 rounded-lg text-[10px] font-bold transition-all text-center h-full flex items-center justify-center leading-tight"
                          >
                             {s}
                          </button>
                       ))}
                    </div>
                 )}

                 <div className="relative">
                    <textarea 
                       value={input}
                       onChange={e => setInput(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                       placeholder="Faça uma pergunta sobre transporte..."
                       className="w-full bg-[#0F172A] border border-white/10 rounded-xl pl-4 pr-14 py-4 text-white focus:border-hlx-gold focus:ring-1 focus:ring-hlx-gold outline-none resize-none h-16 shadow-inner text-sm"
                    />
                    <button 
                       onClick={() => handleSend()}
                       disabled={isLoading || !input.trim()}
                       className="absolute right-3 top-3 p-3 bg-hlx-gold text-slate-900 rounded-lg hover:bg-yellow-400 transition-all disabled:opacity-50 shadow-lg"
                    >
                       <Send size={18} />
                    </button>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default MentorChat;
