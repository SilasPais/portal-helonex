
import React, { useState, useEffect, useRef } from 'react';
import { Search, ShieldCheck, Newspaper, User, X, Loader2, FileText } from 'lucide-react';
import { Section } from '../types';
import { guardianEngine } from '../services/guardianSystem';

// --- Dados para busca (versão simplificada para auto-contenção) ---
const MOCK_SERVICES = [
  { id: 'rntrc-tac', title: 'RNTRC Digital (TAC)', category: 'Carga' },
  { id: 'rntrc-etc', title: 'Gestão de Frota (ETC)', category: 'Carga' },
  { id: 'sassmaq', title: 'SASSMAQ Vision', category: 'Qualidade' },
  { id: 'passengers-charter', title: 'Fretamento (TAF)', category: 'Passageiros' },
  { id: 'fines', title: 'Gestão de Multas SNE', category: 'Jurídico' },
  { id: 'insurance', title: 'Seguros Lei 14.599', category: 'Jurídico' },
];

const MOCK_NEWS = [
  { id: 'n1', title: 'Autodenúncia na ANTT: Nova Regra 2026', category: 'Legislacao' },
  { id: 'n2', title: 'Diesel S10 sobe 4% nas refinarias', category: 'Mercado' },
  { id: 'n3', title: 'Bloqueio na BR-101 (Sul)', category: 'Alerta' },
];

interface GlobalSearchProps {
  onNavigate: (section: Section) => void;
  onNavigateToService: (id: string) => void;
  onResultClick?: () => void; // Para fechar o menu mobile
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onNavigate, onNavigateToService, onResultClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);
    const debounce = setTimeout(() => {
      // Filtrar Serviços
      const serviceResults = MOCK_SERVICES.filter(s => 
        s.title.toLowerCase().includes(query.toLowerCase()) || 
        s.category.toLowerCase().includes(query.toLowerCase())
      ).map(s => ({ ...s, type: 'serviço' }));
      
      // Filtrar Notícias
      const newsResults = MOCK_NEWS.filter(n => 
        n.title.toLowerCase().includes(query.toLowerCase())
      ).map(n => ({ ...n, type: 'notícia' }));

      // Filtrar Motoristas
      const drivers = guardianEngine.getCompanyData().drivers || [];
      const driverResults = drivers.filter(d => 
        d.name.toLowerCase().includes(query.toLowerCase())
      ).map(d => ({ ...d, title: d.name, type: 'motorista' }));

      setResults([...serviceResults, ...newsResults, ...driverResults]);
      setLoading(false);
    }, 300);

    return () => clearTimeout(debounce);

  }, [query]);
  
  const handleResultClick = (result: any) => {
    setQuery('');
    setIsOpen(false);
    onResultClick?.();

    if (result.type === 'serviço') {
      onNavigateToService(result.id);
    } else if (result.type === 'notícia') {
      onNavigate(Section.NEWS_BOARD);
    } else if (result.type === 'motorista') {
      onNavigate(Section.CLIENT_PANEL);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'serviço': return <ShieldCheck size={18} className="text-hlx-blue" />;
      case 'notícia': return <Newspaper size={18} className="text-hlx-gold" />;
      case 'motorista': return <User size={18} className="text-green-400" />;
      default: return <FileText size={18} />;
    }
  };

  return (
    <div className="relative w-full md:w-64" ref={searchRef}>
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          placeholder="Buscar no ecossistema..."
          className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white focus:border-hlx-gold focus:ring-1 focus:ring-hlx-gold outline-none transition-all"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full md:w-96 bg-slate-800 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
          <div className="max-h-[70vh] md:max-h-96 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="p-8 text-center text-gray-400 flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Buscando...
              </div>
            ) : results.length > 0 ? (
              <ul className="divide-y divide-white/5">
                {results.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleResultClick(item)}
                      className="w-full text-left p-4 flex items-center gap-4 hover:bg-hlx-gold/10 transition-colors"
                    >
                      <div className="bg-slate-900 p-2 rounded-lg border border-white/5">
                        {getIcon(item.type)}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{item.title}</p>
                        <p className="text-xs text-gray-400 capitalize">{item.type}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-8 text-center text-gray-400">Nenhum resultado encontrado.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
