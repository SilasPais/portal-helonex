
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToMentor, initializeGemini, getMockResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Cpu, User, Loader2, Sparkles, Scale, ShieldCheck, Truck, BarChart, Leaf, X, AlertTriangle, Wifi, WifiOff, Volume2, StopCircle, Copy, Printer, Check } from 'lucide-react';

const TOPICS = [
  { id: 'ANTT_REGULATORIO', label: 'ANTT & Multas', icon: <Truck size={14} />, contextTag: 'fiscalização antt multa 6074' },
  { id: 'SEGUROS_14599', label: 'Seguros (Lei 14.599)', icon: <ShieldCheck size={14} />, contextTag: 'seguro 14599 rctr-c' },
  { id: 'SASSMAQ_ESG', label: 'SASSMAQ & Qualidade', icon: <Leaf size={14} />, contextTag: 'esg sassmaq qualidade' },
  { id: 'FISCAL_2026', label: 'Fiscal & Tributário', icon: <BarChart size={14} />, contextTag: 'tributario reforma ibs cbs' },
  { id: 'MONITRIIP', label: 'Tecnologia & Monitriip', icon: <Cpu size={14} />, contextTag: 'monitriip tecnologia 4g' },
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

  // Verifica o status da conexão (API Key) ao montar e para voz ao desmontar
  useEffect(() => {
    const client = initializeGemini();
    setIsOnline(!!client);

    return () => {
      window.speechSynthesis.cancel(); // Para a voz se sair da tela
    };
  }, []);

  // --- FUNÇÕES DE ACESSIBILIDADE ---

  const handleSpeak = (text: string, index: number) => {
    if (speakingMsgIndex === index) {
      // Se já está falando essa mensagem, para.
      window.speechSynthesis.cancel();
      setSpeakingMsgIndex(null);
    } else {
      // Se estava falando outra, cancela a anterior e começa a nova
      window.speechSynthesis.cancel();
      
      // Limpa caracteres markdown para leitura mais fluida (básico)
      const cleanText = text.replace(/\*/g, '').replace(/#/g, ''); 
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.1; // Um pouco mais rápido para não ficar monótono
      
      utterance.onend = () => {
        setSpeakingMsgIndex(null);
      };

      utterance.onerror = () => {
        setSpeakingMsgIndex(null);
      };

      setSpeakingMsgIndex(index);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMsgIndex(index);
      setTimeout(() => setCopiedMsgIndex(null), 2000); // Reseta ícone após 2s
    } catch (err) {
      console.error('Falha ao copiar', err);
    }
  };

  const handlePrint = (text: string) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      // Converte quebras de linha para HTML e markdown básico para negrito
      const formattedText = text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      const dateStr = new Date().toLocaleString();

      printWindow.document.write(`
        <html>
          <head>
            <title>Orientação Helonex - Impressão</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
              .header { border-bottom: 2px solid #f59e0b; padding-bottom: 20px; margin-bottom: 30px; }
              .logo { font-size: 24px; font-weight: bold; color: #0f172a; }
              .content { font-size: 14px; min-height: 300px; }
              .legal-footer { 
                margin-top: 50px; 
                border-top: 2px solid #ccc; 
                padding-top: 20px; 
                font-size: 10px; 
                color: #555; 
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
              }
              .legal-footer strong { color: #d97706; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">HELONEX <span style="color:#f59e0b">MENTOR</span></div>
              <p>Relatório de Orientação Técnica - Protocolo Digital</p>
            </div>
            
            <div class="content">
              ${formattedText}
            </div>
            
            <div class="legal-footer">
              <p><strong>⚠️ AVISO LEGAL - INTELIGÊNCIA ARTIFICIAL</strong></p>
              <p>Este documento foi gerado automaticamente pelo Assistente Virtual do Ecossistema Rota 66 Brasil (Helonex) em ${dateStr}.</p>
              <p>
                As orientações aqui contidas são baseadas em dados parametrizados e processamento de linguagem natural. 
                <strong>Estas informações NÃO substituem, em hipótese alguma, a consulta oficial aos órgãos reguladores (ANTT, SENATRAN, SEFAZ) ou o parecer técnico de profissionais habilitados (Advogados, Contadores, Engenheiros).</strong>
              </p>
              <p>A Helonex exime-se de responsabilidade por decisões tomadas exclusivamente com base neste relatório preliminar. Em caso de dúvida, consulte um especialista humano.</p>
            </div>
            
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // 1. Construção do Prompt Enriquecido (Context Injection Avançado)
    const topicData = TOPICS.find(t => t.id === selectedTopic);
    
    let finalMessageText = input;

    if (topicData) {
      finalMessageText = `
[SISTEMA DE MENTORIA HELONEX]
MODO ESPECIALISTA ATIVO: ${topicData.label}
TAGS DE CONTEXTO JURÍDICO: ${topicData.contextTag}

DIRETRIZ TÉCNICA DO MENTOR:
1. Atue como a maior autoridade do Brasil em "${topicData.label}".
2. Utilize as palavras-chave (${topicData.contextTag}) para filtrar a base jurídica e regulatória.
3. Se a pergunta do usuário fugir drasticamente deste tema, faça uma ponte inteligente para o contexto logístico ou alerte sobre a mudança de escopo.
4. Mantenha o tom profissional, seguro e focado na prosperidade do transportador.

DÚVIDA DO USUÁRIO:
${input}
`.trim();
    }
    
    const userMessageDisplay: ChatMessage = {
      role: 'user',
      text: input, 
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessageDisplay]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const client = initializeGemini();
      let responseText: string;

      if (!client) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        responseText = getMockResponse(finalMessageText);
      } else {
        responseText = await sendMessageToMentor(finalMessageText, history);
      }

      const botMessage: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "⚠️ **Alerta de Segurança:** Não consegui validar essa informação na base jurídica atual. Por favor, reformule a pergunta ou consulte um especialista humano no Painel.",
        timestamp: new Date()
      }]);
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
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const isHeader = line.startsWith('###') || /^(🔎|⚖️|📝|🎯|⚠️|🔧|💎)/.test(line.trim());
      if (isHeader) {
        return (
          <span key={idx} className="block font-bold text-hlx-gold mt-4 mb-2 text-base border-b border-white/10 pb-1">
            {line.replace(/###/g, '').trim()}
          </span>
        );
      }
      return (
        <span key={idx} className="block mb-1">
          {line}
        </span>
      );
    });
  };

  return (
    <div className="bg-slate-900 py-4 md:py-16" id="mentor-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-hlx-gold/10 rounded-full mb-4 ring-1 ring-hlx-gold/30">
             <Cpu className="text-hlx-gold" size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Auditor Técnico <span className="text-hlx-gold">Virtual</span></h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base">Tire dúvidas sobre ANTT, Gestão de Riscos e Legislação 24/7 com base na Jurisprudência 2026.</p>
        </div>

        {/* 
           FIX MOBILE KEYBOARD: 
           - h-[80vh] para mobile (ajusta ao viewport visível).
           - md:h-[700px] para desktop.
           - flex-col para garantir que o input fique embaixo.
        */}
        <div className="bg-slate-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh] md:h-[700px] relative">
          
          {/* Header do Chat & Status do Sistema */}
          <div className="bg-slate-950 p-4 border-b border-white/5 flex items-center justify-between z-10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
              <div>
                <span className="text-sm font-bold text-white block flex items-center gap-2">
                  Base de Conhecimento Helonex
                  {selectedTopic && <span className="text-[10px] bg-hlx-gold text-slate-900 px-2 rounded font-bold">FOCADO</span>}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  {isOnline ? <Wifi size={10}/> : <WifiOff size={10}/>}
                  {isOnline ? 'Protocolo POP/PAP Ativo' : 'Modo Simulação (Offline)'}
                </span>
              </div>
            </div>
            
            {/* Indicador de Tópico Ativo no Header */}
            {selectedTopic && (
              <button 
                onClick={() => setSelectedTopic(null)}
                className="flex items-center gap-2 bg-hlx-gold/10 text-hlx-gold px-3 py-1.5 rounded-lg border border-hlx-gold/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all group"
                title="Remover filtro de contexto"
              >
                <span className="text-xs font-bold">{TOPICS.find(t => t.id === selectedTopic)?.label}</span>
                <X size={14} className="group-hover:scale-110" />
              </button>
            )}
          </div>

          {/* Área de Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-900 custom-scrollbar relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10 animate-fade-in-up`}>
                <div className={`flex max-w-[95%] md:max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-br from-hlx-gold to-hlx-orange'}`}>
                    {msg.role === 'user' ? <User size={16} className="text-white" /> : <Sparkles size={16} className="text-white" />}
                  </div>

                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 md:p-5 rounded-2xl ${
                        msg.role === 'user' 
                        ? 'bg-slate-700 text-white rounded-tr-none' 
                        : 'bg-slate-800 border border-white/5 text-gray-200 rounded-tl-none shadow-lg'
                    }`}>
                        {/* Renderização do Texto com formatação aprimorada para leitura */}
                        <div className="text-sm leading-loose whitespace-pre-wrap tracking-wide">
                           {msg.role === 'model' ? renderFormattedText(msg.text) : msg.text}
                        </div>
                    </div>
                    
                    {/* BARRA DE FERRAMENTAS DO MENTOR (ACESSIBILIDADE) */}
                    {msg.role === 'model' && (
                        <div className="flex items-center gap-2 mt-2 bg-slate-950/50 p-1.5 rounded-lg border border-white/5 shadow-sm">
                            <button 
                                onClick={() => handleSpeak(msg.text, idx)}
                                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${speakingMsgIndex === idx ? 'text-green-400 animate-pulse' : 'text-gray-400 hover:text-hlx-gold'}`}
                                title={speakingMsgIndex === idx ? "Parar leitura" : "Ouvir resposta"}
                            >
                                {speakingMsgIndex === idx ? <StopCircle size={14} /> : <Volume2 size={14} />}
                            </button>
                            
                            <div className="w-px h-3 bg-white/10"></div>

                            <button 
                                onClick={() => handleCopy(msg.text, idx)}
                                className={`p-1.5 rounded hover:bg-white/10 transition-colors ${copiedMsgIndex === idx ? 'text-green-400' : 'text-gray-400 hover:text-white'}`}
                                title="Copiar texto"
                            >
                                {copiedMsgIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                            </button>

                            <button 
                                onClick={() => handlePrint(msg.text)}
                                className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                title="Imprimir orientação"
                            >
                                <Printer size={14} />
                            </button>
                        </div>
                    )}

                    <span className="text-[10px] opacity-50 mt-1 block">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start relative z-10 animate-pulse">
                 <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-3 ml-12">
                   <Loader2 size={18} className="animate-spin text-hlx-gold" />
                   <div>
                     <span className="text-xs font-bold text-gray-300 block">Analisando base legal (POP/PAP)...</span>
                     <span className="text-[10px] text-gray-500">Cruzando dados com {selectedTopic ? TOPICS.find(t => t.id === selectedTopic)?.label : 'Legislação Geral'}</span>
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de Input e Seleção de Contexto */}
          <div className="bg-slate-950 border-t border-white/5 relative z-20 flex-shrink-0">
            
            {/* Barra de Tópicos (Chips) */}
            <div className="px-4 py-3 flex gap-2 overflow-x-auto custom-scrollbar border-b border-white/5 bg-slate-900/50">
              <div className="flex items-center text-[10px] font-bold text-gray-500 uppercase mr-2 flex-shrink-0 bg-slate-800 px-2 py-1 rounded border border-white/10">
                <AlertTriangle size={10} className="mr-1 text-hlx-gold" />
                Focar IA em:
              </div>
              {TOPICS.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                    selectedTopic === topic.id
                      ? 'bg-hlx-gold text-slate-900 border-hlx-gold shadow-lg shadow-yellow-500/20 translate-y-[-1px]'
                      : 'bg-slate-800 text-gray-400 border-white/10 hover:border-white/30 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {topic.icon}
                  {topic.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={selectedTopic ? `Pergunte ao Auditor sobre ${TOPICS.find(t => t.id === selectedTopic)?.label}...` : "Digite sua dúvida jurídica ou operacional..."}
                className="w-full bg-slate-900 text-white rounded-xl pl-4 pr-12 py-4 border border-white/10 focus:border-hlx-gold focus:ring-1 focus:ring-hlx-gold focus:outline-none resize-none h-16 overflow-hidden shadow-inner text-sm placeholder-gray-600 focus:scroll-m-20"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-6 top-6 p-2 bg-hlx-gold text-slate-900 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg group"
              >
                <Send size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            
            {/* DISCLAIMER DE RODAPÉ (ATUALIZADO) */}
            <div className="text-center pb-3 px-4 hidden md:block">
               <p className="text-[10px] text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-1 leading-tight">
                 <span className="flex items-center gap-1">
                    <Scale size={10} className="text-gray-500" />
                    <strong>Aviso Legal:</strong> A Inteligência Artificial pode gerar informações imprecisas.
                 </span>
                 <span className="hidden sm:inline">-</span>
                 <span>As orientações deste chat NÃO substituem a consulta oficial à ANTT ou a profissionais técnicos (Advogados/Contadores).</span>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorChat;
