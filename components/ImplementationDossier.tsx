
import React from 'react';
import { 
  CheckCircle, AlertCircle, Zap, ArrowRight, ShieldCheck, 
  Database, Link, Lock, Smartphone, Scale, Cpu, Globe, Terminal,
  BookOpen
} from 'lucide-react';

interface ModuleDossier {
  name: string;
  status: 'DONE' | 'WIP' | 'PENDING';
  frontend: string;
  backendMissing: string[];
  opportunities: string[];
  icon: any;
}

const DOSSIER_DATA: ModuleDossier[] = [
  {
    name: 'GovTech (Burocracia)',
    status: 'WIP',
    frontend: '100% Concluído',
    backendMissing: [
      'Conexão com API real da SEFAZ (Focus NFe ou Nuvem Fiscal).',
      'Assinatura real de arquivos PFX usando node-forge.',
      'Consulta em tempo real ao RNTRC via ANTT Dados Abertos.'
    ],
    opportunities: [
      'Implementar OCR de CNH/CRLV usando Google Vision AI.',
      'Auto-preenchimento de dados cadastrais via consulta de placa.'
    ],
    icon: Globe
  },
  {
    name: 'JusTech (Jurídico)',
    status: 'WIP',
    frontend: '100% Concluído',
    backendMissing: [
      'Integração com Provedor de Identidade Gov.br (OAuth).',
      'Log Imutável de chat (Blockchain ou Bancos com Timestamp servidor).',
      'API do SENATRAN para radar de multas real.'
    ],
    opportunities: [
      'Jurimetria Preditiva: Analisar chances de ganho baseada no tribunal local.',
      'Assinatura Digital integrada ao DocuSign ou similar.'
    ],
    icon: Scale
  },
  {
    name: 'EduTech (Capacitação)',
    status: 'DONE',
    frontend: '100% Concluído',
    backendMissing: [
      'Configurar Vimeo Pro ou Bunny.net para streaming seguro.',
      'Gerador de PDF de certificados com Hash QR Code verificável.',
      'Persistência de progresso por aula no Supabase.'
    ],
    opportunities: [
      'Modo Offline via PWA para motoristas assistirem sem internet.',
      'Trilhas personalizadas por KM rodado detectado no GPS.'
    ],
    icon: Smartphone
  },
  {
    name: 'GesTech (Gestão & Frota)',
    status: 'PENDING',
    frontend: '90% Concluído',
    backendMissing: [
      'Supabase Storage (Buckets) para fotos de vistorias e checklists.',
      'Integração Open Finance (Pluggy.ai) para conciliação automática.',
      'Crons para aviso automático de manutenção via WhatsApp API.'
    ],
    opportunities: [
      'Manutenção Preditiva via IA cruzando histórico de quebras.',
      'Módulo de Gestão de Pneus com leitura NFC/RFID.'
    ],
    icon: Cpu
  }
];

const ImplementationDossier: React.FC = () => {
  return (
    <div className="py-12 px-4 md:px-8 bg-slate-950 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-hlx-gold/10 border border-hlx-gold/30 text-hlx-gold text-xs font-bold tracking-widest uppercase mb-6">
            <Terminal size={16} /> Auditoria do Projeto
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Dossiê de <span className="text-hlx-gold">Transição Real</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Abaixo estão as especificações de cada módulo, o que já é funcional e o que falta para operar no mercado brasileiro 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DOSSIER_DATA.map((mod, idx) => (
            <div key={idx} className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col group">
              <div className="p-6 bg-slate-800 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-950 rounded-xl text-hlx-gold group-hover:scale-110 transition-transform">
                    <mod.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{mod.name}</h3>
                    <p className="text-xs text-gray-500 uppercase font-black">Frontend: {mod.frontend}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  mod.status === 'DONE' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  mod.status === 'WIP' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {mod.status}
                </div>
              </div>

              <div className="p-6 flex-1 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
                    <AlertCircle size={14} /> Gaps Críticos (Backend)
                  </h4>
                  <ul className="space-y-2">
                    {mod.backendMissing.map((item, i) => (
                      <li key={i} className="text-xs text-gray-400 flex gap-2">
                        <span className="text-red-500">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                    <Zap size={14} /> Oportunidades de Melhoria
                  </h4>
                  <ul className="space-y-2">
                    {mod.opportunities.map((item, i) => (
                      <li key={i} className="text-xs text-gray-400 flex gap-2">
                        <span className="text-green-500">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-slate-950/50 border-t border-white/5">
                <button className="w-full py-2 bg-slate-800 hover:bg-hlx-gold hover:text-slate-900 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
                  EXPLORAR MÓDULO <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-hlx-gold/20 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-hlx-gold mb-4 flex items-center gap-2 font-display">
                   <BookOpen size={20} /> POP 007 - Módulo Legislativo MP 1.343
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                   Procedimento Operacional Padrão focado no Cerco Eletrônico de Nível II e na obrigatoriedade do CIOT Mandatário vinculada ao MDF-e.
                </p>
                <div className="flex gap-2">
                    <span className="p-2 bg-slate-950 rounded text-[10px] text-gray-500 uppercase font-black uppercase">Pronto para Operar</span>
                    <span className="p-2 bg-green-950 rounded text-[10px] text-green-500 uppercase font-black uppercase">Checklist OK</span>
                </div>
            </div>

            <div className="bg-slate-900 border border-blue-500/20 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 font-display">
                   <ShieldCheck size={20} /> Roadmap Mundo Real v1.0
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                   Plano de transição para sair da simulação (sandbox) para ambiente de produção, incluindo gestão de certificados digitais e tokens governamentais.
                </p>
                <div className="flex gap-2">
                    <span className="p-2 bg-slate-950 rounded text-[10px] text-gray-500 uppercase font-black">Estratégico</span>
                    <span className="p-2 bg-blue-950 rounded text-[10px] text-blue-500 uppercase font-black">Lançamento</span>
                </div>
            </div>

            <div className="bg-slate-900 border border-green-500/20 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2 font-display">
                   <Smartphone size={20} /> MONITRIIP 4.0 (DIS)
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                   Adequação à nova estrutura de logs da ANTT. Prazos: 22/06 (Regular) e 05/10 (Fretado) de 2026.
                </p>
                <div className="flex gap-2">
                    <span className="p-2 bg-slate-950 rounded text-[10px] text-gray-500 uppercase font-black uppercase">Prorrogado</span>
                    <span className="p-2 bg-green-950 rounded text-[10px] text-green-500 uppercase font-black uppercase">Ofício 2101</span>
                </div>
            </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-hlx-gold/20 to-orange-600/20 border border-hlx-gold/30 p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10"><Database size={150} /></div>
          <h3 className="text-2xl font-bold text-white mb-4">Meta: Mundo Real (Go-Live em 30 Dias)</h3>
          <p className="text-gray-300 max-w-xl mx-auto mb-8 text-sm">
            Este dossiê serve como o backlog técnico final. A infraestrutura básica está pronta no Supabase, agora é necessário plugar os "cabos" das APIs externas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-hlx-gold text-slate-900 font-bold rounded-xl shadow-lg hover:bg-yellow-400 transition-all flex items-center gap-2">
              <Link size={18} /> Contratar APIs Fiscais
            </button>
            <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-all flex items-center gap-2">
              <Database size={18} /> Ativar Supabase Real
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationDossier;
