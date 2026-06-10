
import React from 'react';
/* Fix: Added missing Siren icon to the lucide-react imports */
import { 
  Truck, Construction, Utensils, Zap, Clock, ShieldAlert, 
  Trash2, Package, Gavel, Radio, Ship, ArrowRight, ShieldCheck,
  Building2, MapPin, Milestone, Sun, Siren, Mail, Camera,
  AlertTriangle, Landmark, TrafficCone, Store, Mountain, Building,
  HardHat, Box, Newspaper, Ambulance
} from 'lucide-react';
import { AetcModality } from '../types';

interface ZmrcCatalogProps {
  onSelectModality: (id: string) => void;
}

const MODALITIES_UI = [
  { 
    id: 'VUC', label: 'VUC (Carga Urbana)', icon: Truck, color: 'text-green-400',
    rule: 'Máximo 2,20m x 7,20m. Livre 24h com AETC, exceto VER 1.',
    action: 'Emitir AETC VUC'
  },
  { 
    id: 'URGENCIA', label: 'Serviço de Urgência', icon: Ambulance, color: 'text-red-500',
    rule: 'Período Integral. Exige Ofício de Órgão Competente.',
    action: 'Cadastrar Urgência'
  },
  { 
    id: 'GUINCHO', label: 'Guinchos de Socorro', icon: Siren, color: 'text-blue-400',
    rule: 'Livre 24h para emergências mecânicas. Isenção de Rodízio.',
    action: 'Cadastrar Guincho'
  },
  { 
    id: 'REMOCAO_TERRA', label: 'Remoção de Terra', icon: Mountain, color: 'text-amber-600',
    rule: 'Janela 05h-16h. Exige Alvará da Obra e TPOV.',
    action: 'AETC Remoção'
  },
  { 
    id: 'JORNALISMO', label: 'Cobertura Jornalística', icon: Camera, color: 'text-sky-400',
    rule: 'Período Integral. Exige fotos de equipamento Link/Gerador.',
    action: 'AETC Jornalismo'
  },
  { 
    id: 'OBRAS_EMERGENCIA', label: 'Obras de Emergência', icon: AlertTriangle, color: 'text-orange-500',
    rule: 'Período Integral. Requer contrato com Administração Pública.',
    action: 'AETC Emergência'
  },
  { 
    id: 'ESTACIONAMENTO_PROPRIO', label: 'Estacionamento Próprio', icon: Building, color: 'text-slate-400',
    rule: 'Período Integral (no trajeto). Exige vínculo e mapa.',
    action: 'AETC Acesso'
  },
  { 
    id: 'OBRAS_INFRAESTRUTURA', label: 'Obras Infraestrutura', icon: HardHat, color: 'text-yellow-600',
    rule: 'Janela 05h-16h. Requer contrato com Adm. Pública.',
    action: 'AETC Infra'
  },
  { 
    id: 'CONCRETAGEM', label: 'Concretagem (Betoneira)', icon: Construction, color: 'text-orange-400',
    rule: 'Limite 10 anos de idade. Janela 05h-16h.',
    action: 'Regularizar Betoneira'
  },
  { 
    id: 'CONCRETAGEM_BOMBA', label: 'Concretagem-Bomba', icon: Zap, color: 'text-yellow-400',
    rule: 'Limite 15 anos. Parada obrigatória das 12h às 14h.',
    action: 'Autorizar Bomba'
  },
  { 
    id: 'FEIRAS_LIVRES', label: 'Feiras Livres', icon: Store, color: 'text-emerald-500',
    rule: 'Janela 05h-16h. Exige Cartão de Feirante.',
    action: 'AETC Feirante'
  },
  { 
    id: 'MUDANCA', label: 'Caminhão de Mudança', icon: Building2, color: 'text-indigo-400',
    rule: 'Janela 05h-16h. Requer comprovante de endereço.',
    action: 'AETC Mudança'
  },
  { 
    id: 'PERECIVEIS', label: 'Produtos Perecíveis', icon: Utensils, color: 'text-red-400',
    rule: 'Abastecimento matutino (05h-12h). Proibido em ZERC.',
    action: 'AETC Perecíveis'
  },
  { 
    id: 'PRODUTOS_PERIGOSOS', label: 'Produtos Perigosos', icon: Radio, color: 'text-orange-600',
    rule: 'Proibido em todas as VERs. Janela 10h-16h. Requer LETPP.',
    action: 'Licença LETPP'
  },
  { 
    id: 'VALORES', label: 'Carro Forte (Valores)', icon: ShieldCheck, color: 'text-slate-300',
    rule: 'Janela 10h às 20h. Autorizado em VERs.',
    action: 'Registrar Frota'
  },
  { 
    id: 'CACAMBAS', label: 'Caçambas (Entulho)', icon: Box, color: 'text-zinc-500',
    rule: 'Janela 10h-16h. Exige Autorização Municipal.',
    action: 'AETC Caçamba'
  },
  { 
    id: 'SERVICOS_PUBLICOS', label: 'Serviços Públicos', icon: Landmark, color: 'text-blue-600',
    rule: 'Janela 05h-16h. Exige contrato com órgão público.',
    action: 'Vincular Órgão'
  },
  { 
    id: 'LIXO', label: 'Coleta de Lixo', icon: Trash2, color: 'text-green-600',
    rule: 'Isenção de Rodízio e restrição (Serviço Público).',
    action: 'Vincular Contrato'
  },
  { 
    id: 'CORREIOS', label: 'Correios / Postais', icon: Mail, color: 'text-yellow-500',
    rule: 'Período Integral. Exige contrato de prestação de serviço.',
    action: 'AETC Correios'
  },
  { 
    id: 'SINALIZACAO_TRANSITO', label: 'Sinalização Trânsito', icon: TrafficCone, color: 'text-orange-400',
    rule: 'Período Integral. Exige contrato com DSV/CET.',
    action: 'AETC Sinalização'
  }
];

const ZmrcCatalog: React.FC<ZmrcCatalogProps> = ({ onSelectModality }) => {
  return (
    <div className="bg-slate-950 min-h-screen py-12 px-4 md:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero do Catálogo */}
        <div className="mb-16 text-center md:text-left">
           <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-hlx-gold/10 border border-hlx-gold/30 text-hlx-gold text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sun size={12} /> Ecossistema Mobilidade São Paulo
           </div>
           <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Catálogo de <span className="text-hlx-gold">Modalidades AETC</span>
           </h1>
           <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
              Cada operação em São Paulo segue uma regra de ouro da <strong>Portaria 137/18</strong>. 
              Clique na sua categoria para auditar sua frota e iniciar a regularização técnica via Kernel Helonex.
           </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MODALITIES_UI.map((mod) => (
            <div 
                key={mod.id} 
                onClick={() => onSelectModality(mod.id)}
                className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-hlx-gold/40 transition-all group cursor-pointer flex flex-col relative overflow-hidden shadow-xl"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <mod.icon size={80} />
                </div>

                <div className={`p-4 rounded-xl bg-slate-950 border border-white/5 w-fit mb-6 ${mod.color}`}>
                    <mod.icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-hlx-gold transition-colors">{mod.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-8 flex-grow">
                    {mod.rule}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500 group-hover:text-white transition-colors">{mod.action}</span>
                    <ArrowRight size={18} className="text-gray-600 group-hover:text-hlx-gold group-hover:translate-x-1 transition-all" />
                </div>
            </div>
          ))}

          {/* Card Especial de Rodízio Noturno */}
          <div className="bg-gradient-to-br from-slate-900 to-hlx-gold/10 border border-hlx-gold/30 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-hlx-gold/20 w-fit mb-6 text-hlx-gold">
                      <Clock size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">LIVRE (Janela Noturna)</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                      Lembre-se: Entre 21h01 e 04h59, a restrição é suspensa. Todos os caminhões são bem-vindos na ZMRC sem AETC.
                  </p>
              </div>
              <div className="pt-4 mt-6 text-[10px] font-bold text-hlx-gold uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={14} /> Protocolo "Homem Livre"
              </div>
          </div>
        </div>

        <div className="mt-20 p-8 bg-slate-900 border border-white/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                    <Gavel size={32} />
                </div>
                <div>
                    <h4 className="text-white font-bold text-xl">Dúvida sobre outra categoria?</h4>
                    <p className="text-gray-400 text-sm">Nossa IA conhece todas as exceções da Portaria 137/18 CET/SP.</p>
                </div>
            </div>
            <button className="px-8 py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-hlx-gold transition-all shadow-lg flex items-center gap-2">
                CONSULTAR MENTOR IA <ArrowRight size={20} />
            </button>
        </div>

      </div>
    </div>
  );
};

export default ZmrcCatalog;
