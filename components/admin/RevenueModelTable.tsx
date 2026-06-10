
import React from 'react';
import { DollarSign, Truck, GraduationCap, Gavel, Radio, ShoppingBag } from 'lucide-react';

interface RevenueItem {
  name: string;
  type: string;
  description: string;
  estimatedValue?: string;
}

interface RevenueStream {
  category: string;
  categoryType: string;
  items: RevenueItem[];
}

const REVENUE_MATRIX: RevenueStream[] = [
  {
    category: "GovTech (Regulatório)",
    categoryType: 'GOV',
    items: [
      { name: "Monitoramento de Vencimentos", type: "SUBSCRIPTION", description: "Alertas automáticos de CNH, RNTRC, Cronotacógrafo e Exames." },
      { name: "Licença Internacional (TRIC)", type: "EXTRA", description: "Processo documental Mercosul.", estimatedValue: "R$ 850,00" }
    ]
  },
  {
    category: "JusTech (Jurídico)",
    categoryType: 'JUS',
    items: [
      { name: "Radar de Multas", type: "SUBSCRIPTION", description: "Varredura diária de infrações." },
      { name: "Confecção de Defesa", type: "EXTRA", description: "Elaboração técnica de recurso.", estimatedValue: "R$ 150,00" }
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
    default: return <DollarSign className="text-gray-400" />;
  }
};

const RevenueModelTable: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="bg-slate-900 p-8 rounded-xl border border-white/10 relative overflow-hidden">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
          <DollarSign className="text-green-400" /> Matriz Financeira Helonex
        </h2>
        <p className="text-gray-400 max-w-2xl">Mapeamento estratificado das fontes de receita do ecossistema.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {REVENUE_MATRIX.map((stream, idx) => (
          <div key={idx} className="bg-slate-800 rounded-xl border border-white/5 overflow-hidden">
            <div className="bg-slate-950 p-4 border-b border-white/10 flex items-center gap-3">
              <CategoryIcon type={stream.categoryType} />
              <h3 className="text-white font-bold">{stream.category}</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/50 text-gray-400 uppercase text-[10px] font-bold">
                <tr><th className="p-4">Serviço</th><th className="p-4">Modelo</th><th className="p-4">Valor</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stream.items.map((item, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-white font-medium">{item.name}</td>
                    <td className="p-4"><span className="text-[10px] bg-slate-700 px-2 py-1 rounded text-gray-300 font-bold">{item.type}</span></td>
                    <td className="p-4 text-hlx-gold font-mono">{item.estimatedValue || 'Recorrente'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueModelTable;
