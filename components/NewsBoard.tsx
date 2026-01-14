import React, { useState } from 'react';
import { Newspaper, ShoppingBag, ArrowLeft, Tag, MapPin, Phone, User, Calendar, ExternalLink, MessageSquare, PlusCircle, Search, AlertTriangle, TrendingUp, Filter, CheckCircle2 } from 'lucide-react';
import { NewsItem, ClassifiedAd } from '../types';

interface NewsBoardProps {
  onBack: () => void;
}

// --- MOCK DATA PARA NOTÍCIAS ---
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
  },
  {
    id: 'n4',
    title: 'Exame Toxicológico: Novo Prazo',
    summary: 'Contran define data limite para regularização das carteiras C, D e E vencidas em 2025. Evite a multa de balcão.',
    category: 'Legislacao',
    date: '08/03/2026',
    tags: ['CNH', 'Detran', 'Saúde']
  }
];

// --- MOCK DATA PARA CLASSIFICADOS ---
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
  },
  {
    id: 'c3',
    type: 'VAGA',
    title: 'Agregamento Sider (Fixo)',
    price: 18000.00, // Faturamento estimado
    description: 'Rota SP x MG x SP. Carga leve (Higiene). Pagamento quinzenal. Exige ANTT em dia e Rastreador.',
    location: 'São Paulo, SP',
    contact: '(11) 3333-2222 (TransLog)',
    sellerName: 'TransLogística RH',
    sellerLevel: 'Parceiro Oficial',
    date: '08/03',
    verified: true
  },
  {
    id: 'c4',
    type: 'VENDA',
    title: 'Scania R440 6x2 2013',
    price: 380000.00,
    description: 'Único dono. Manutenção em dia na concessionária. 800.000km. Só pegar e trabalhar.',
    location: 'Goiânia, GO',
    contact: '(62) 97777-6666',
    sellerName: 'Pedro Autônomo',
    sellerLevel: 'Motorista',
    date: '05/03',
    verified: false,
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
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
      
      {/* HEADER: ESTILO JORNAL */}
      <div className="bg-slate-900 border-b border-white/5 pt-8 pb-6 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
           <Newspaper size={150} />
        </div>
        
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
              <p className="text-gray-400 text-sm md:text-base max-w-xl">
                Informação sem filtro e negócios entre amigos. O ponto de encontro digital do transportador.
              </p>
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
        
        {/* --- ABA NOTÍCIAS --- */}
        {activeTab === 'news' && (
          <div className="animate-fade-in-up">
            
            {/* Filtros */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 custom-scrollbar">
               {['todos', 'legislacao', 'mercado', 'alerta'].map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setFilterCategory(cat)}
                   className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-colors ${filterCategory === cat ? 'bg-white text-slate-900 border-white' : 'bg-slate-900 text-gray-400 border-white/10 hover:border-white/30'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredNews.map(news => (
                 <div key={news.id} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden group hover:border-hlx-gold/30 transition-all flex flex-col h-full">
                    {news.imageUrl && (
                      <div className="h-48 overflow-hidden relative">
                        <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                        <span className={`absolute bottom-3 left-3 px-2 py-1 text-[10px] font-bold uppercase rounded border ${
                          news.category === 'Alerta' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          news.category === 'Mercado' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }`}>
                          {news.category}
                        </span>
                      </div>
                    )}
                    <div className="p-5 flex-1 flex flex-col">
                      {!news.imageUrl && (
                         <div className="mb-4">
                            <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded border ${
                              news.category === 'Alerta' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                              'bg-slate-800 text-gray-400 border-white/10'
                            }`}>
                              {news.category}
                            </span>
                         </div>
                      )}
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-hlx-gold transition-colors">{news.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{news.summary}</p>
                      
                      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                        <span className="text-xs text-gray-500">{news.date}</span>
                        <div className="flex gap-2">
                           <button className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors" title="Compartilhar"><ExternalLink size={16}/></button>
                        </div>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* --- ABA CLASSIFICADOS --- */}
        {activeTab === 'classifieds' && (
          <div className="animate-fade-in-up">
            
            <div className="bg-green-900/10 border border-green-500/20 p-4 rounded-xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-green-500/20 rounded-full text-green-400">
                   <Tag size={24} />
                 </div>
                 <div>
                   <h3 className="text-white font-bold">Mercado da Comunidade</h3>
                   <p className="text-xs text-green-300">Negócios diretos, sem taxa e sem atravessador. A responsabilidade é das partes.</p>
                 </div>
               </div>
               <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5 w-full md:w-auto justify-center">
                 <PlusCircle size={18} /> Anunciar Grátis
               </button>
            </div>

            {/* Filtros */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 custom-scrollbar">
               {['todos', 'venda', 'troca', 'vaga', 'procuro'].map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setFilterCategory(cat)}
                   className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-colors ${filterCategory === cat ? 'bg-green-500 text-slate-900 border-green-500' : 'bg-slate-900 text-gray-400 border-white/10 hover:border-white/30'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
               {filteredAds.map(ad => (
                 <div key={ad.id} className="bg-slate-900 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all flex flex-col sm:flex-row gap-4 group">
                    {/* Imagem (Se houver) */}
                    <div className="w-full sm:w-32 h-32 bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden relative">
                       {ad.imageUrl ? (
                         <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-600">
                           <ShoppingBag size={24} />
                         </div>
                       )}
                       <div className={`absolute top-0 left-0 px-2 py-1 text-[9px] font-bold text-white uppercase rounded-br-lg ${
                         ad.type === 'VENDA' ? 'bg-blue-600' :
                         ad.type === 'TROCA' ? 'bg-orange-500' :
                         ad.type === 'VAGA' ? 'bg-purple-600' : 'bg-gray-600'
                       }`}>
                         {ad.type}
                       </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                       <div className="flex justify-between items-start mb-1">
                         <h3 className="font-bold text-white text-lg leading-tight">{ad.title}</h3>
                         {ad.verified && (
                           <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded flex items-center gap-1" title="Verificado pela Comunidade">
                             <CheckCircle2 size={10} /> Verificado
                           </span>
                         )}
                       </div>
                       
                       {ad.price && (
                         <p className="text-xl font-display font-bold text-green-400 mb-2">
                           R$ {ad.price.toLocaleString()}
                         </p>
                       )}

                       <p className="text-sm text-gray-400 mb-3 line-clamp-2">{ad.description}</p>

                       <div className="mt-auto grid grid-cols-2 gap-2 text-xs text-gray-500 border-t border-white/5 pt-3">
                          <div className="flex items-center gap-1">
                            <User size={12} /> {ad.sellerName} <span className="text-[9px] text-hlx-gold border border-hlx-gold/20 px-1 rounded ml-1">{ad.sellerLevel}</span>
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            <MapPin size={12} /> {ad.location}
                          </div>
                          <div className="flex items-center gap-1 col-span-2">
                             <div className="flex-1 bg-slate-800 py-1.5 rounded text-center text-white font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-green-600 transition-colors">
                               <Phone size={12} /> {ad.contact}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default NewsBoard;