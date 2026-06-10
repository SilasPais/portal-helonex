
import React from 'react';
import { Terminal, Code, Copy, Globe, Link, Cpu, ArrowRight } from 'lucide-react';

const ApiDocs: React.FC = () => {
  const jsonExample = {
    "empresa": {
      "cnpj": "12.345.678/0001-90",
      "rntrc": "12345678"
    },
    "documento": {
      "tipo": "CTE",
      "numero": "001234",
      "valor_total": 4500.00,
      "placa_veiculo": "ABC1234"
    },
    "seguro": {
      "apolice": "RCTR-C-9999",
      "averbacao": "AV-123456"
    }
  };

  return (
    <div className="bg-slate-950 p-4 md:p-8 animate-fade-in-up max-w-5xl mx-auto">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase mb-4">
           <Globe size={14} /> Hub de Interoperabilidade
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Layout Único <span className="text-hlx-gold">JSON/REST</span></h2>
        <p className="text-gray-400 text-lg">Integre seu ERP atual (TOTVS, Senior, Bsoft) à inteligência de auditoria HELONEX. Blinde seu jurídico sem mudar de software.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Terminal className="text-green-400" /> Endpoint de Auditoria</h3>
              <div className="bg-slate-950 p-3 rounded border border-white/5 font-mono text-xs text-blue-300 flex justify-between items-center mb-6">
                 <span>POST https://api.helonex.global/v3/audit</span>
                 <Copy size={14} className="cursor-pointer hover:text-white" />
              </div>
              
              <div className="relative">
                 <h4 className="text-xs text-gray-500 uppercase font-bold mb-2">Request Body (Exemplo)</h4>
                 <div className="bg-slate-950 p-6 rounded-xl border border-white/5 overflow-x-auto">
                    <pre className="text-sm text-green-400">
                       {JSON.stringify(jsonExample, null, 2)}
                    </pre>
                 </div>
                 <button className="absolute top-10 right-4 p-2 bg-slate-800 text-gray-400 rounded-lg hover:text-white transition-colors">
                    <Code size={16} />
                 </button>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm"><Cpu size={16} className="text-hlx-gold" /> HELONEX Embedded</h4>
              <p className="text-xs text-gray-500 mb-4">Widgets de conformidade que podem ser injetados diretamente dentro da interface do seu ERP atual.</p>
              <button className="w-full py-2 bg-slate-800 text-white text-xs font-bold rounded-lg border border-white/10 hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                 Manual de Widgets <ArrowRight size={14} />
              </button>
           </div>

           <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-2 text-sm">Auth Protocol</h4>
              <p className="text-[10px] text-gray-500 mb-4">Autenticação baseada em JWT (OAuth 2.0) com suporte a HSM Cloud para garantir não-repúdio das assinaturas fiscais.</p>
              <div className="flex items-center gap-2 text-hlx-gold font-bold text-xs">
                 <Link size={14} /> Obter API Key (Membro Pro)
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
