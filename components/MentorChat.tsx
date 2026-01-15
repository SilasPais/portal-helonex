
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToMentor, initializeGemini, getMockResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Cpu, User, Loader2, Sparkles, Scale, ShieldCheck, Truck, BarChart, Leaf, X, AlertTriangle, Wifi, WifiOff, Volume2, StopCircle, Copy, Printer, Check } from 'lucide-react';

const TOPICS = [
  { id: 'ANTT_REGULATORIO', label: 'ANTT & Multas', icon: Truck, contextTag: 'fiscalização antt multa 6074' },
  { id: 'SEGUROS_14599', label: 'Seguros (Lei 14.599)', icon: ShieldCheck, contextTag: 'seguro 14599 rctr-c' },
  { id: 'SASSMAQ_ESG', label: 'SASSMAQ & Qualidade', icon: Leaf, contextTag: 'esg sassmaq qualidade' },
  { id: 'FISCAL_2026', label: 'Fiscal & Tributário', icon: BarChart, contextTag: 'tributario reforma ibs cbs' },
  { id: 'MONITRIIP', label: 'Tecnologia & Monitriip', icon: Cpu, contextTag: 'monitriip tecnologia 4g' },
];

const MentorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Olá. Sou seu Auditor Técnico Virtual HELONEX. \n\nPara garantir o **Conceito Erro Zero**, minhas respostas seguirão o protocolo de **Procedimento Operacional Padrão (POP)**. \n\nPor favor, selecione o **Tópico de Interesse** abaixo ou digite sua dúvida.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  
  // States para Acessibilidade
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState<number | null>(null);
  const [copiedMsgIndex, setCopiedMsgIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const client = initializeGemini();
    setIsOnline(!!client);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = (text: string, index: number) => {
    if (speakingMsgIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingMsgIndex(null);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\*/g, '').replace(/#/g, ''); 
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.1;
      utterance.onend = () => setSpeakingMsgIndex(null);
      utterance.onerror = () => setSpeakingMsgIndex(null);
      setSpeakingMsgIndex(index);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMsgIndex(index);
      setTimeout(() => setCopiedMsgIndex(null), 2000);
    } catch (err) {
      console.error('Falha ao copiar', err);
    }
  };

  const handlePrint = (text: string) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const formattedText = text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      printWindow.document.write(`
        <html>
          <head>
            <title>Orientação Helonex - Impressão</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
              .header { border-bottom: 2px solid #f59e0b; padding-bottom: 20px; margin-bottom: 30px; }
              .logo { font-size: 24px; font-weight: bold; color: #0f172a; }
              .content { font-size: 14px; min-height: 300px; }
            </style>
          </head>
          <body>
            <div class="header"><div class="logo">HELONEX <span style="color:#f59e0b">MENTOR</span></div><p>Relatório de Orientação Técnica</p></div>
            <div class="content">${formattedText}</div>
            <script>window.onload = function() { window.print(); }</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const topicData = TOPICS.find(t => t.id === selectedTopic);
    let finalMessageText = input;

    if (topicData) {
      finalMessageText = `[SISTEMA DE MENTORIA HELONEX] MODO ESPECIALISTA: ${topicData.label}\nTAGS: ${topicData.contextTag}\nDÚVIDA: ${input}`;
    }
    
    const userMessageDisplay: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessageDisplay]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] }));
      const client = initializeGemini();
      let responseText = !client ? getMockResponse(finalMessageText) : await sendMessageToMentor(finalMessageText, history);
      setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "⚠️ Erro ao validar base jurídica.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const isHeader = line.startsWith('###') || /^(🔎|⚖️|📝|🎯|⚠️|🔧|💎)/.test(line.trim());
      if (isHeader) {
        return <span key={idx} className="block font-bold text-hlx-gold mt-4 mb-2 text-base border-b border-white/10 pb-1">{line.replace(/###/g, '').trim()}</span>;
      }
      return <span key={idx} className="block mb-1">{line}</span>;
    });
  };

  return (
    <div className="bg-slate-900 py-4 md:py-16" id="mentor-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-hlx-gold/10 rounded-full mb-4 ring-1 ring-hlx-gold/30"><Cpu className="text-hlx-gold" size={32} /></div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Auditor Técnico <span className="text-hlx-gold">Virtual</span></h2>
          <p className="text-gray-400 mt-2 text-sm">Legislação 2026 e ANTT em tempo real.</p>
        </div>

        <div className="bg-slate-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh] md:h-[700px] relative">
          <div className="bg-slate-950 p-4 border-b border-white/5 flex justify-between items-center flex-shrink-0 z-10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
              <div><span className="text-sm font-bold text-white block">Base Helonex</span></div>
            </div>
            {selectedTopic && (
              <button onClick={() => setSelectedTopic(null)} className="flex items-center gap-2 bg-hlx-gold/10 text-hlx-gold px-3 py-1.5 rounded-lg border border-hlx-gold/30 hover:text-red-400 transition-all">
                <span className="text-xs font-bold">{TOPICS.find(t => t.id === selectedTopic)?.label}</span>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-900 custom-scrollbar relative">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div className={`flex max-w-[95%] md:max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-br from-hlx-gold to-hlx-orange'}`}>
                    {msg.role === 'user' ? <User size={16} className="text-white" /> : <Sparkles size={16} className="text-white" />}
                  </div>
                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-slate-700 text-white rounded-tr-none' : 'bg-slate-800 border border-white/5 text-gray-200 rounded-tl-none shadow-lg'}`}>
                        <div className="text-sm leading-loose whitespace-pre-wrap">{msg.role === 'model' ? renderFormattedText(msg.text) : msg.text}</div>
                    </div>
                    {msg.role === 'model' && (
                        <div className="flex items-center gap-2 mt-2 bg-slate-950/50 p-1.5 rounded-lg border border-white/5 shadow-sm">
                            <button onClick={() => handleSpeak(msg.text, idx)} className={`p-1.5 rounded ${speakingMsgIndex === idx ? 'text-green-400 animate-pulse' : 'text-gray-400 hover:text-hlx-gold'}`}>
                                {speakingMsgIndex === idx ? <StopCircle size={14} /> : <Volume2 size={14} />}
                            </button>
                            <button onClick={() => handleCopy(msg.text, idx)} className="p-1.5 rounded text-gray-400">
                                {copiedMsgIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                            <button onClick={() => handlePrint(msg.text)} className="p-1.5 rounded text-gray-400"><Printer size={14} /></button>
                        </div>
                    )}
                    <span className="text-[10px] opacity-50 mt-1">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && <div className="flex justify-start ml-12"><Loader2 size={18} className="animate-spin text-hlx-gold" /></div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-slate-950 border-t border-white/5 flex-shrink-0">
            <div className="px-4 py-3 flex gap-2 overflow-x-auto custom-scrollbar border-b border-white/5">
              {TOPICS.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedTopic === topic.id ? 'bg-hlx-gold text-slate-900 border-hlx-gold' : 'bg-slate-800 text-gray-400 border-white/10'}`}
                >
                  <topic.icon size={14} />
                  {topic.label}
                </button>
              ))}
            </div>
            <div className="p-4 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Digite sua dúvida..."
                className="w-full bg-slate-900 text-white rounded-xl pl-4 pr-12 py-4 border border-white/10 focus:border-hlx-gold outline-none resize-none h-16 shadow-inner text-sm"
              />
              <button onClick={handleSend} disabled={isLoading || !input.trim()} className="absolute right-6 top-6 p-2 bg-hlx-gold text-slate-900 rounded-lg disabled:opacity-50"><Send size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorChat;
