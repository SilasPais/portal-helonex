
import React, { useState } from 'react';
import { 
  Database, UploadCloud, FileJson, FileSpreadsheet, CheckCircle, 
  AlertTriangle, RefreshCw, Server, ShieldCheck, ArrowRight, Link, Lock 
} from 'lucide-react';
import { guardianEngine } from '../services/guardianSystem';

const IntegrationsHub: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeIntegration, setActiveIntegration] = useState<string | null>(null);

  const handleFileUpload = (type: 'xml' | 'csv') => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulação de processamento de arquivo pesado
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          alert(`Importação de ${type.toUpperCase()} concluída com sucesso. 1.450 registros auditados.`);
          // Aqui chamaríamos a função real de parsing do guardianEngine
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleConnectERP = (erpName: string) => {
    setActiveIntegration(erpName);
    alert(`Conector API para ${erpName} ativado. Sincronizando dados históricos...`);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Header Estratégico */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
            <Database className="text-hlx-gold" size={32} />
            Hub de Ingestão de Dados
          </h2>
          <p className="text-gray-300 max-w-3xl text-lg">
            Não perca tempo digitando. Conecte seu TMS/ERP ou importe seus arquivos XML/Excel. 
            Nossa IA auditará sua operação em busca do <strong>Erro Zero</strong>.
          </p>
        </div>
        <div className="absolute right-0 top-0 p-6 opacity-5">
          <Server size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LADO A: IMPORTAÇÃO DE ARQUIVOS (Layout de Migração) */}
        <div className="bg-slate-800 rounded-xl border border-white/5 p-6">
          <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <UploadCloud className="text-blue-400" /> Upload de Arquivos (Legado)
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            Para empresas que ainda não possuem API aberta. Baixe nosso <strong className="text-white cursor-pointer hover:underline">Layout Padrão de Migração (.xlsx)</strong>.
          </p>

          <div className="space-y-4">
            {/* XML CTE/MDFE */}
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center hover:border-hlx-gold hover:bg-slate-900/50 transition-all cursor-pointer group" onClick={() => handleFileUpload('xml')}>
               <FileJson size={48} className="text-gray-500 group-hover:text-hlx-gold mb-3 transition-colors" />
               <h4 className="text-white font-bold">Importar XMLs (CT-e / MDF-e)</h4>
               <p className="text-xs text-gray-500 text-center mt-1">Arraste a pasta compactada ou clique para buscar.</p>
            </div>

            {/* CSV FROTA */}
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center hover:border-green-500 hover:bg-slate-900/50 transition-all cursor-pointer group" onClick={() => handleFileUpload('csv')}>
               <FileSpreadsheet size={48} className="text-gray-500 group-hover:text-green-500 mb-3 transition-colors" />
               <h4 className="text-white font-bold">Importar Planilha de Frota/RH</h4>
               <p className="text-xs text-gray-500 text-center mt-1">Cadastro de Motoristas, Veículos e Vencimentos.</p>
            </div>
          </div>

          {isUploading && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-white mb-1">
                <span>Processando Auditoria...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          )}
        </div>

        {/* LADO B: CONECTORES API (ERPs de Mercado) */}
        <div className="bg-slate-800 rounded-xl border border-white/5 p-6">
          <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <Link className="text-purple-400" /> Conectores Nativos (API)
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            Integração direta. Nós lemos os dados do seu sistema atual e devolvemos inteligência.
          </p>

          <div className="space-y-3">
            {['TOTVS Logística', 'Senior Mega', 'Bhive / Hivecloud', 'Omie (Financeiro)'].map((erp) => (
              <div key={erp} className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-white/5 hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${activeIntegration === erp ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></div>
                  <span className="font-bold text-white text-sm">{erp}</span>
                </div>
                <button 
                  onClick={() => handleConnectERP(erp)}
                  className={`text-xs px-3 py-1.5 rounded font-bold transition-colors ${
                    activeIntegration === erp 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-slate-800 text-gray-300 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {activeIntegration === erp ? 'CONECTADO' : 'CONECTAR'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
            <div className="flex items-start gap-3">
               <ShieldCheck size={20} className="text-blue-400 mt-1" />
               <div>
                 <h4 className="text-blue-400 font-bold text-sm">Segurança de Dados (Lockbox)</h4>
                 <p className="text-xs text-gray-300 mt-1">
                   A Helonex atua apenas como <strong>Camada de Leitura e Auditoria</strong>. 
                   Nós não alteramos os dados no seu ERP de origem. Sua operação permanece segura e inalterada.
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
