
import React from 'react';
import { BrainCircuit, Camera, ShieldCheck, Wifi, Cpu, Eye, CheckCircle, AlertTriangle, Activity, Zap, Server } from 'lucide-react';

const SassmaqSection: React.FC = () => {
  return (
    <div className="py-24 bg-[#0B1120] relative overflow-hidden border-t border-white/5">
      
      {/* Background Cyberpunk Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER DA SEÇÃO */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">
             <BrainCircuit size={16} /> Tecnologia Proprietária HELONEX
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            HELONEX <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">VISION 4.0</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            A primeira plataforma de <strong>Auditoria Contínua & Invisível</strong> do Brasil. 
            Transformamos suas câmeras de segurança comuns (CFTV) em auditores de qualidade ativos 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LADO ESQUERDO: A PROPOSTA DE VALOR (DIY) */}
          <div className="space-y-8">
            
            {/* Card DIY - O GRANDE DIFERENCIAL */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl border border-purple-500/30 shadow-2xl relative group hover:border-purple-500/60 transition-all">
              <div className="absolute -top-4 -right-4 bg-green-500 text-slate-900 font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                REDUÇÃO DE CUSTO (CAPEX)
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Zap className="text-yellow-400" /> Conceito DIY (Faça Você Mesmo)
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Não gaste milhares de reais com hardware proprietário ou consultores presenciais. 
                O Helonex Vision conecta-se ao que você já tem.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Use seus <strong>DVRs e Câmeras antigas</strong> (RTSP).</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Auditoria de Pátio e Frota via <strong>App Celular</strong>.</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Implantação Remota em <strong>menos de 24h</strong>.</span>
                </li>
              </ul>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                 <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-400 mb-2 border border-white/10">
                   <Eye size={20} />
                 </div>
                 <h4 className="text-white font-bold">Visão Computacional</h4>
                 <p className="text-xs text-gray-500">A IA detecta EPIs, placas de risco, vazamentos e intrusões no pátio automaticamente.</p>
               </div>
               <div className="flex flex-col gap-2">
                 <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-purple-400 mb-2 border border-white/10">
                   <Activity size={20} />
                 </div>
                 <h4 className="text-white font-bold">Gestão em Tempo Real</h4>
                 <p className="text-xs text-gray-500">Saia da "foto" da auditoria anual para o "filme" da gestão diária. Corrija desvios na hora.</p>
               </div>
            </div>

            <button 
                onClick={() => window.location.href = '#services-section'} 
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-900/30 transition-all flex items-center justify-center gap-3 group"
            >
              <Server size={20} />
              INICIAR AUDITORIA DE PÁTIO
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">Teste Grátis</span>
            </button>

          </div>

          {/* LADO DIREITO: A DEMONSTRAÇÃO VISUAL (O "WOW" FACTOR) */}
          <div className="relative">
            {/* Moldura do Monitor */}
            <div className="bg-slate-950 border-4 border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
              
              {/* Header do Monitor */}
              <div className="bg-slate-900 p-3 flex justify-between items-center border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-[10px] text-gray-500 font-mono flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  SYSTEM ONLINE • CAM_04 • RTSP
                </div>
              </div>

              {/* A IMAGEM DA CÂMERA COM OVERLAY DE IA */}
              <div className="relative aspect-video group cursor-crosshair">
                <img 
                  src="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Caminhão SASSMAQ" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay"></div>

                {/* UI: Bounding Boxes (IA Analysis) */}
                
                {/* Box 1: Placa */}
                <div className="absolute top-[60%] left-[30%] w-[15%] h-[10%] border-2 border-green-400 shadow-[0_0_10px_#4ade80] bg-green-400/10 flex items-start justify-start">
                   <div className="bg-green-400 text-slate-900 text-[8px] font-bold px-1 absolute -top-4 left-0">
                     PLACA: ABC-1234 (99%)
                   </div>
                </div>

                {/* Box 2: Kit de Emergência (Faltando) */}
                <div className="absolute top-[50%] right-[20%] w-[10%] h-[15%] border-2 border-red-500 shadow-[0_0_10px_#ef4444] bg-red-500/10 animate-pulse">
                   <div className="bg-red-500 text-white text-[8px] font-bold px-1 absolute -top-4 right-0 flex items-center gap-1">
                     <AlertTriangle size={8} /> CONE FALTANDO
                   </div>
                </div>

                {/* Box 3: Motorista (EPI) */}
                <div className="absolute bottom-[10%] left-[10%] w-[12%] h-[25%] border-2 border-cyan-400 shadow-[0_0_10px_#22d3ee] bg-cyan-400/10">
                   <div className="bg-cyan-400 text-slate-900 text-[8px] font-bold px-1 absolute -top-4 left-0">
                     EPI DETECTADO: OK
                   </div>
                </div>

                {/* Terminal Overlay */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-green-400 bg-black/60 p-2 rounded backdrop-blur-sm border border-green-500/30">
                  <p>&gt; Scanning vehicle...</p>
                  <p>&gt; Checking SASSMAQ compliance...</p>
                  <p>&gt; <span className="text-red-400">Alert: Safety Cone Missing</span></p>
                  <p>&gt; Generating Non-Conformity Report...</p>
                </div>

              </div>
            </div>

            {/* Elementos Flutuantes (Decorativos) */}
            <div className="absolute -bottom-6 -right-6 bg-slate-800 p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 animate-float-slow">
               <div className="bg-purple-600 p-2 rounded-lg text-white">
                 <Cpu size={24} />
               </div>
               <div>
                 <p className="text-xs text-gray-400 font-bold uppercase">Processamento</p>
                 <p className="text-white font-bold">Edge AI (Local)</p>
               </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-slate-800 p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 animate-float-delayed">
               <div className="bg-green-500 p-2 rounded-lg text-white">
                 <Wifi size={24} />
               </div>
               <div>
                 <p className="text-xs text-gray-400 font-bold uppercase">Conexão</p>
                 <p className="text-white font-bold">Cloud Sync</p>
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SassmaqSection;
