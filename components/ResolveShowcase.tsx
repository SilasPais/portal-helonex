
import React from 'react';
import { Handshake, Gavel, ShieldCheck, Zap, Scale, FileText, CheckCircle2, Search, Shield } from 'lucide-react';

const ResolveShowcase: React.FC = () => {
  return (
    <div className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">
              <Scale size={16} /> Online Dispute Resolution (ODR)
           </div>
           <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
             Helonex <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Resolve</span>
           </h2>
           <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
             A primeira Corte Arbitral Digital de Logística. Transformamos conflitos em acordos extrajudiciais em tempo recorde, utilizando a <strong>Verdade dos Dados</strong> auditada pela nossa tecnologia quádrupla: 
             <span className="text-hlx-gold font-bold"> GesTech, EduTech, JusTech e GovTech</span>.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           {/* Left: Value Props */}
           <div className="space-y-8">
              <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all group">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                       <ShieldCheck size={28} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-white mb-2">Blindagem de Reputação</h3>
                       <p className="text-gray-400 text-sm">
                          Conflitos judiciais expõem sua empresa e travam seu CNPJ. O Resolve atua no sigilo, protegendo a imagem corporativa e pessoal antes que o problema se torne público.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all group">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-500/10 rounded-xl text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                       <Zap size={28} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-white mb-2">Agilidade Extrema</h3>
                       <p className="text-gray-400 text-sm">
                          Enquanto a justiça comum leva anos, nossa Mediação Assistida por IA resolve disputas de frete, avarias e estadia em horas, com validade de Título Executivo Extrajudicial <Shield size={14} className="inline text-hlx-gold" />.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 hover:border-hlx-gold/30 transition-all group">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-hlx-gold/10 rounded-xl text-hlx-gold group-hover:bg-hlx-gold group-hover:text-slate-900 transition-colors">
                       <Search size={28} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-white mb-2">Auditoria Multidimensional</h3>
                       <p className="text-gray-400 text-sm">
                          Nossa IA cruza dados de 4 frentes: <strong>GesTech</strong> (Processos), <strong>EduTech</strong> (Treinamento), <strong>JusTech</strong> (Lei) e <strong>GovTech</strong> (Regulação) para gerar provas irrefutáveis.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right: Visual Representation */}
           <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
              <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl">
                 <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                    <div>
                       <h4 className="text-white font-bold text-lg">Sala de Mediação Virtual</h4>
                       <p className="text-xs text-gray-500">Protocolo: ODR-2026-8892</p>
                    </div>
                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                       ACORDO SUGERIDO
                    </div>
                 </div>

                 <div className="space-y-4 mb-8">
                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                       <FileText className="text-blue-400" />
                       <div>
                          <p className="text-white font-bold text-sm">Evidência AudTech #1</p>
                          <p className="text-xs text-gray-400">GPS confirmou chegada no CD às 08:00 (GovTech)</p>
                       </div>
                       <CheckCircle2 className="text-green-500 ml-auto" size={18} />
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-white/5 flex items-center gap-4 opacity-50">
                       <FileText className="text-purple-400" />
                       <div>
                          <p className="text-white font-bold text-sm">Evidência AudTech #2</p>
                          <p className="text-xs text-gray-400">Canhoto assinado digitalmente (JusTech)</p>
                       </div>
                       <CheckCircle2 className="text-green-500 ml-auto" size={18} />
                    </div>
                 </div>

                 <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 text-center">
                    <Handshake size={48} className="text-blue-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">Proposta de Acordo Gerada</h3>
                    <p className="text-gray-300 text-sm mb-6">
                       Baseado nas evidências auditadas, a IA sugere o pagamento de <strong>R$ 850,00</strong> referente à estadia, encerrando o conflito imediatamente.
                    </p>
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors">
                       ACEITAR E ENCERRAR DISPUTA
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResolveShowcase;
