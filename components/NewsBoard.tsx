
import React, { useState } from 'react';
import { Newspaper, ShoppingBag, ArrowLeft, MessageSquare } from 'lucide-react';
import { NewsItem, ClassifiedAd } from '../types';

interface NewsBoardProps {
  onBack: () => void;
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Autodenúncia na ANTT: Nova Regra 2026',
    summary: 'Resolução 6.074 permite converter multas em advertência se o transportador avisar o erro antes da fiscalização. Veja como fazer.',
    category: 'Legislacao',
    date: '10/03/2026',
    tags: ['Multas', 'ANTT', 'Jurídico'],
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'n2',
    title: 'Diesel S10 sobe 4% nas refinarias',
    summary: 'Reajuste impacta frete. Tabela da ANTT deve ser atualizada até sexta-feira. Calcule seu novo custo de KM.',
    category: 'Mercado',
    date: '09/03/2026',
    tags: ['Combustível', 'Frete', 'Economia'],
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'n3',
    title: 'Bloqueio na BR-101 (Sul)',
    summary: 'Queda de barreira no KM 200. Desvio operando pelo sistema "Siga e Pare". Previsão de liberação em 48h.',
    category: 'Alerta',
    date: '10/03/2026',
    tags: ['Estradas', 'Trânsito', 'Segurança'],
    imageUrl: 'https://images.unsplash.com/photo-1565514020176-db793d4cb3a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const MOCK_CLASSIFIEDS: ClassifiedAd[] = [
  {
    id: 'c1',
    type: 'VENDA',
    title: 'Geladeira Elber 65L (Nova)',
    price: 3200.00,
    description: 'Geladeira na caixa, nunca usada. Ganhei num sorteio e já tenho uma. Nota fiscal no meu nome.',
    location: 'Curitiba, PR',
    contact: '(41) 99999-8888',
    sellerName: 'João "Tubarão"',
    sellerLevel: 'Lenda da Estrada',
    date: 'Hoje',
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c2',
    type: 'TROCA',
    title: 'Troco Jogo de Rodas Alumínio',
    description: 'Tenho 2 rodas Alcoa Speedline brilho. Troco por 2 pneus 295 novos ou recapados de primeira.',
    location: 'Guarulhos, SP',
    contact: '(11) 98888-7777',
    sellerName: 'Marcos Silva',
    sellerLevel: 'Capitão',
    date: 'Ontem',
    verified: true
  }
];

const NewsBoard: React.FC<NewsBoardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'news' | 'classifieds'>('news');
  const [filterCategory, setFilterCategory] = useState<string>('todos');

  const filteredNews = filterCategory === 'todos' 
    ? MOCK_NEWS 
    : MOCK_NEWS.filter(n => n.category.toLowerCase() === filterCategory.toLowerCase());

  const filteredAds = filterCategory === 'todos'
    ? MOCK_CLASSIFIEDS
    : MOCK_CLASSIFIEDS.filter(c => c.type.toLowerCase() === filterCategory.toLowerCase());

  return (
    <div className="bg-slate-950 min-h-screen pb-20">
      <div className="bg-slate-900 border-b border-white/5 pt-8 pb-6 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-2 mb-6 transition-colors">
            <ArrowLeft size={18} /> Voltar ao Início
          </button>

          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-hlx-gold/10 text-hlx-gold rounded-full text-xs font-bold uppercase tracking-widest border border-hlx-gold/20 mb-3">
                <MessageSquare size={14} /> Comunidade Ativa
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                Diário do <span className="text-hlx-gold">Trecho</span>
              </h1>
            </div>

            <div className="flex bg-slate-800 p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => { setActiveTab('news'); setFilterCategory('todos'); }}
                className={`px-6 py-2 rounded-md font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'news' ? 'bg-slate-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <Newspaper size={16} /> Notícias
              </button>
              <button 
                onClick={() => { setActiveTab('classifieds'); setFilterCategory('todos'); }}
                className={`px-6 py-2 rounded-md font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'classifieds' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
              >
                <ShoppingBag size={16} /> Classificados
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {activeTab === 'news' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredNews.map(news => (
               <div key={news.id} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden flex flex-col h-full">
                  {news.imageUrl && <img src={news.imageUrl} alt="" className="h-48 w-full object-cover" />}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">{news.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{news.summary}</p>
                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
                      <span>{news.date}</span>
                      <span className="bg-slate-800 px-2 py-1 rounded">{news.category}</span>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {filteredAds.map(ad => (
               <div key={ad.id} className="bg-slate-900 border border-white/10 rounded-xl p-4 flex gap-4">
                  <div className="w-24 h-24 bg-slate-800 rounded flex-shrink-0 flex items-center justify-center text-gray-600 overflow-hidden">
                    {ad.imageUrl ? <img src={ad.imageUrl} className="object-cover w-full h-full" alt={ad.title} /> : <ShoppingBag size={24} />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{ad.title}</h3>
                    {ad.price && <p className="text-green-400 font-bold">R$ {ad.price.toLocaleString()}</p>}
                    <p className="text-gray-400 text-sm line-clamp-2 mt-1">{ad.description}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span>{ad.location}</span>
                      <span className="font-bold text-hlx-gold">{ad.type}</span>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsBoard;
