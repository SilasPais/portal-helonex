
import React, { useState } from 'react';
import { 
  Database, UploadCloud, FileJson, FileSpreadsheet, CheckCircle, 
  AlertTriangle, RefreshCw, Server, ShieldCheck, ArrowRight, Link, Lock, FileText 
} from 'lucide-react';

const IntegrationsHub: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeIntegration, setActiveIntegration] = useState<string | null>(null);

  const handleFileUpload = (type: 'xml' | 'csv') => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulação de processamento
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          alert(`✅ Arquivo recebido com segurança! Nossa IA está auditando 1.450 registros. Em breve você verá o relatório.`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Header Focado em Segurança e Simplicidade */}
      <div className="bg-slate-900 p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest mb-4">
             <Lock size={14} /> Cofre de Dados Seguro
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">
            Auditoria Sem Complicação
          </h2>
          <p className="text-gray-300 max-w-3xl text-lg">
            Não precisa pedir permissão para o seu sistema antigo. 
            Basta arrastar seus arquivos (Excel ou XML) para cá. 
            Nós lemos, auditamos e te entregamos a inteligência. <strong>Seus dados continuam sendo seus.</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LADO A: IMPORTAÇÃO MANUAL (CAMINHO FELIZ) */}
        <div className="bg-slate-800 rounded-xl border border-hlx-gold/30 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-hlx-gold text-slate-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl">RECOMENDADO</div>
          
          <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <UploadCloud className="text-hlx-gold" /> Importação Direta
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            A forma mais rápida e segura de começar. Sem TI, sem burocracia.
          </p>

          <div className="space-y-4">
            {/* XML CTE/MDFE */}
            <div 
                onClick={() => handleFileUpload('xml')}
                className="bg-slate-900 border-2 border-dashed border-slate-600 rounded-xl p-6 flex items-center gap-4 hover:border-hlx-gold hover:bg-slate-900/80 transition-all cursor-pointer group"
            >
               <div className="bg-slate-800 p-3 rounded-lg group-hover:bg-hlx-gold group-hover:text-slate-900 transition-colors">
                 <FileJson size={24} />
               </div>
               <div>
                 <h4 className="text-white font-bold group-hover:text-hlx-gold transition-colors">XML de Transportes</h4>
                 <p className="text-xs text-gray-500">CT-e, MDF-e ou CIOT.</p>
               </div>
               <ArrowRight className="ml-auto text-gray-600 group-hover:text-hlx-gold" />
            </div>

            {/* CSV FROTA */}
            <div 
                onClick={() => handleFileUpload('csv')}
                className="bg-slate-900 border-2 border-dashed border-slate-600 rounded-xl p-6 flex items-center gap-4 hover:border-green-500 hover:bg-slate-900/80 transition-all cursor-pointer group"
            >
               <div className="bg-slate-800 p-3 rounded-lg group-hover:bg-green-500 group-hover:text-slate-900 transition-colors">
                 <FileSpreadsheet size={24} />
               </div>
               <div>
                 <h4 className="text-white font-bold group-hover:text-green-400 transition-colors">Planilha de Frota (Excel)</h4>
                 <p className="text-xs text-gray-500">Motoristas, Placas e Vencimentos.</p>
               </div>
               <ArrowRight className="ml-auto text-gray-600 group-hover:text-green-400" />
            </div>
          </div>

          {isUploading && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-white mb-1">
                <span>Processando Auditoria Blindada...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-hlx-gold h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          )}
        </div>

        {/* LADO B: INTEGRAÇÃO AVANÇADA (FUTURO) */}
        <div className="bg-slate-800/50 rounded-xl border border-white/5 p-6 opacity-75">
          <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <Link className="text-blue-400" /> Conexão Automática (API)
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            Opcional. Conecte apenas quando sentir confiança. Nossa leitura é "Somente Leitura" (Read-Only), garantindo que nada seja alterado no seu sistema original.
          </p>

          <div className="space-y-3">
            {['TOTVS', 'Senior', 'Bsoft', 'SINCRE (Seguradora)'].map((erp) => (
              <div key={erp} className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                  <span className="font-bold text-gray-300 text-sm">{erp}</span>
                </div>
                <button className="text-[10px] uppercase font-bold text-gray-500 border border-gray-600 px-3 py-1 rounded hover:text-white hover:border-white transition-colors">
                  Configurar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
            <div className="flex items-start gap-3">
               <ShieldCheck size={20} className="text-blue-400 mt-1" />
               <div>
                 <h4 className="text-blue-400 font-bold text-sm">Garantia de Não-Interferência</h4>
                 <p className="text-xs text-gray-300 mt-1">
                   A Helonex atua como um <strong>Auditor Externo</strong>. Nós não mexemos no seu TMS. Apenas lemos os dados para te proteger de multas.
                 </p>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IntegrationsHub;
