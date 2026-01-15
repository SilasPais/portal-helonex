
import React from 'react';
import { CheckCircle, PlusCircle, DollarSign, Zap, Lock, Truck, GraduationCap, Gavel, Radio, ShoppingBag } from 'lucide-react';

interface RevenueStream {
  category: string;
  categoryType: 'GOV' | 'EDU' | 'JUS' | 'GES' | 'MKT';
  items: {
    name: string;
    type: 'SUBSCRIPTION' | 'EXTRA';
    description: string;
    estimatedValue?: string;
  }[];
}

const REVENUE_MATRIX: RevenueStream[] = [
  {
    category: "GovTech (Regulatório)",
    categoryType: 'GOV',
    items: [
      { 
        name: "Monitoramento de Vencimentos", 
        type: "SUBSCRIPTION", 
        description: "Alertas automáticos de CNH, RNTRC, Cronotacógrafo e Exames." 
      },
      { 
        name: "Emissão RNTRC (TAC)", 
        type: "SUBSCRIPTION", 
        description: "Incluso para assinantes (Self-Service/Faça Você Mesmo)." 
      },
      { 
        name: "Licença Internacional (TRIC/Mercosul)", 
        type: "EXTRA", 
        description: "Processo complexo documental. Cobrança por veículo habilitado.",
        estimatedValue: "R$ 850,00 / licença"
      },
      { 
        name: "AET (Autorização Especial de Trânsito)", 
        type: "EXTRA", 
        description: "Emissão de licença para carga excedente (DNIT/DER).",
        estimatedValue: "R$ 150,00 + Taxas"
      },
      { 
        name: "Alteração de Frota (Inclusão/Exclusão)", 
        type: "EXTRA", 
        description: "Gestão administrativa de placas na ANTT (ETC).",
        estimatedValue: "R$ 120,00 / placa"
      }
    ]
  },
  {
    category: "EduTech (Academia)",
    categoryType: 'EDU',
    items: [
      { 
        name: "Trilhas de Gestão & Mindset", 
        type: "SUBSCRIPTION", 
        description: "Acesso à biblioteca 'Netflix' de cursos livres (Finanças, Mecânica Básica)." 
      },
      { 
        name: "Curso MOPP (Oficial)", 
        type: "EXTRA", 
        description: "Curso regulamentado com integração DETRAN para averbação na CNH.",
        estimatedValue: "R$ 297,00"
      },
      { 
        name: "Atualização de Condutor de Passageiros", 
        type: "EXTRA", 
        description: "Reciclagem obrigatória (Res. 168) para motoristas de ônibus.",
        estimatedValue: "R$ 189,00"
      },
      { 
        name: "Mentoria VIP (Humana)", 
        type: "EXTRA", 
        description: "Sessão de 1h com especialista em logística/jurídico.",
        estimatedValue: "R$ 450,00 / hora"
      }
    ]
  },
  {
    category: "JusTech (Jurídico)",
    categoryType: 'JUS',
    items: [
      { 
        name: "Radar de Multas (Monitoramento)", 
        type: "SUBSCRIPTION", 
        description: "Varredura diária de infrações em órgãos federais e estaduais." 
      },
      { 
        name: "Análise de Risco (IA)", 
        type: "SUBSCRIPTION", 
        description: "Diagnóstico preliminar de probabilidade de recurso." 
      },
      { 
        name: "Confecção de Defesa/Recurso", 
        type: "EXTRA", 
        description: "Elaboração técnica de peça jurídica personalizada.",
        estimatedValue: "R$ 150,00 ou 20% do êxito"
      },
      { 
        name: "Gestão de SNE (40% Desconto)", 
        type: "EXTRA", 
        description: "Taxa administrativa sobre a economia gerada no pagamento antecipado.",
        estimatedValue: "10% da economia"
      }
    ]
  },
  {
    category: "GesTech (Frota & Hardware)",
    categoryType: 'GES',
    items: [
      { 
        name: "Painel de Gestão Básica", 
        type: "SUBSCRIPTION", 
        description: "Controle de pneus, combustível e manutenção preventiva." 
      },
      { 
        name: "Módulo Premiação (Gamificação)", 
        type: "EXTRA", 
        description: "Sistema de ranking, economia de diesel e certificação de motoristas.",
        estimatedValue: "R$ 14,90 / CPF"
      },
      { 
        name: "Kit Sentinela (Hardware IoT)", 
        type: "EXTRA", 
        description: "Venda do equipamento (Raspberry Pi + Câmera) para instalação na cabine.",
        estimatedValue: "R$ 899,00 (Venda Única)"
      },
      { 
        name: "Armazenamento de Imagens (Nuvem)", 
        type: "EXTRA", 
        description: "Upsell de espaço para gravação contínua das viagens (DVR Cloud).",
        estimatedValue: "+ R$ 49,90 / mês / veículo"
      },
      { 
        name: "Auditoria SASSMAQ Remota", 
        type: "EXTRA", 
        description: "Pré-auditoria completa para certificação química.",
        estimatedValue: "R$ 1.500,00 / evento"
      }
    ]
  },
  {
    category: "Marketplace (Comissões)",
    categoryType: 'MKT',
    items: [
      { 
        name: "Clube de Descontos", 
        type: "SUBSCRIPTION", 
        description: "Acesso às tabelas negociadas." 
      },
      { 
        name: "Seguro de Carga (RCTR-C)", 
        type: "EXTRA", 
        description: "Comissão recorrente sobre a apólice emitida via parceiro.",
        estimatedValue: "% sobre prêmio"
      },
      { 
        name: "Emissão de Certificado Digital", 
        type: "EXTRA", 
        description: "Venda de e-CPF e e-CNPJ.",
        estimatedValue: "R$ 150,00"
      }
    ]
  }
];

const CategoryIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'GOV': return <Truck className="text-green-400" />;
    case 'EDU': return <GraduationCap className="text-blue-400" />;
    case 'JUS': return <Gavel className="text-red-400" />;
    case 'GES': return <Radio className="text-purple-400" />;
    case 'MKT': return <ShoppingBag className="text-hlx-gold" />;
    default: return <DollarSign />;
  }
};

const RevenueModelTable: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
            <DollarSign className="text-green-400" size={32} />
            Matriz de Receita Helonex
          </h2>
          <p className="text-gray-300 max-w-3xl text-lg">
            Mapeamento estratégico de todas as fontes de monetização do ecossistema. 
            O segredo do <span className="text-hlx-gold font-bold">LTV (Lifetime Value)</span> está no equilíbrio entre a recorrência da assinatura e a margem dos serviços extras.
          </p>
        </div>
        <div className="absolute right-0 top-0 p-6 opacity-5">
          <Zap size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {REVENUE_MATRIX.map((stream, idx) => (
          <div key={idx} className="bg-slate-800 rounded-xl border border-white/5 overflow-hidden shadow-lg">
            <div className="bg-slate-950 p-4 border-b border-white/10 flex items-center gap-3">
              <div className="p-2 bg-slate-900 rounded-lg border border-white/5">
                <CategoryIcon type={stream.categoryType} />
              </div>
              <h3 className="text-white font-bold text-lg">{stream.category}</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/50 text-gray-400 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="p-4 w-1/4">Produto / Serviço</th>
                    <th className="p-4 w-1/6">Modelo</th>
                    <th className="p-4 w-1/3">Descrição de Valor</th>
                    <th className="p-4 w-1/4 text-right">Potencial de Receita (Extra)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stream.items.map((item, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        {item.type === 'SUBSCRIPTION' ? <CheckCircle size={14} className="text-green-500" /> : <PlusCircle size={14} className="text-hlx-gold" />}
                        {item.name}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                          item.type === 'SUBSCRIPTION' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                            : 'bg-hlx-gold/10 text-hlx-gold border-hlx-gold/30'
                        }`}>
                          {item.type === 'SUBSCRIPTION' ? 'Incluso (Assinatura)' : 'Venda Avulsa (Upsell)'}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 text-xs leading-relaxed">
                        {item.description}
                      </td>
                      <td className="p-4 text-right font-mono text-xs">
                        {item.type === 'EXTRA' ? (
                          <span className="text-white font-bold bg-slate-700 px-2 py-1 rounded border border-white/10">
                            {item.estimatedValue}
                          </span>
                        ) : (
                          <span className="text-gray-600 flex items-center justify-end gap-1">
                            <Lock size={10} /> Recorrente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RevenueModelTable;
