
import React, { useState, useEffect } from 'react';
import { 
  Book, FileText, Settings, ShieldCheck, Share2, 
  ChevronRight, Terminal, Code, Cpu, Database, 
  Layers, GitBranch, AlertTriangle, CheckCircle 
} from 'lucide-react';
import { guardianEngine } from '../../services/guardianSystem';
import { DocumentationDoc } from '../../types';

type DocCategory = 'QMS' | 'PROCESS' | 'POP' | 'TECHNICAL';

const DocumentationModule: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DocCategory>('QMS');
  const [selectedDoc, setSelectedDoc] = useState<DocumentationDoc | null>(null);
  const [docs, setDocs] = useState<DocumentationDoc[]>([]);

  useEffect(() => {
    const allDocs = guardianEngine.getDocumentation(activeCategory);
    setDocs(allDocs);
    if (allDocs.length > 0) {
      setSelectedDoc(allDocs[0]);
    } else {
      setSelectedDoc(null);
    }
  }, [activeCategory]);

  const renderContent = (content: string) => {
    // Basic Markdown Rendering for Technical Manual
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) return <h3 key={idx} className="text-lg font-bold text-white mt-4 mb-2">{line.replace('### ', '')}</h3>;
      if (line.startsWith('**') && line.endsWith('**')) return <strong key={idx} className="block text-white mt-2 mb-1">{line.replace(/\*\*/g, '')}</strong>;
      if (line.startsWith('- ')) return <li key={idx} className="text-gray-300 ml-4 list-disc mb-1">{line.replace('- ', '')}</li>;
      if (line.startsWith('```')) return null; // Skip code block markers for simple rendering
      if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) return <p key={idx} className="text-gray-300 mb-2 pl-4 border-l-2 border-white/10">{line}</p>;
      
      // Code Block Simulation
      if (line.includes('npm') || line.includes('vite') || line.includes('API_KEY')) {
          return <div key={idx} className="bg-slate-950 p-2 rounded border border-white/10 font-mono text-xs text-green-400 my-1">{line}</div>;
      }

      return <p key={idx} className="text-gray-400 mb-2 leading-relaxed whitespace-pre-wrap">{line}</p>;
    });
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 animate-fade-in-up">
      
      {/* Sidebar Navigation */}
      <div className="w-1/4 bg-slate-900 border border-white/10 rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 bg-slate-950 border-b border-white/10">
          <h3 className="text-white font-bold flex items-center gap-2">
            <Book size={18} className="text-hlx-gold" /> Biblioteca Helonex
          </h3>
        </div>
        
        {/* Categories Tabs */}
        <div className="flex border-b border-white/10 bg-slate-900 overflow-x-auto custom-scrollbar">
           {[
             { id: 'QMS', icon: ShieldCheck, label: 'Qualidade' },
             { id: 'PROCESS', icon: GitBranch, label: 'Processos' },
             { id: 'POP', icon: FileText, label: 'POPs' },
             { id: 'TECHNICAL', icon: Terminal, label: 'Técnico' },
           ].map(cat => (
             <button 
               key={cat.id}
               onClick={() => setActiveCategory(cat.id as DocCategory)}
               className={`flex-1 py-3 px-2 flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase transition-colors ${
                 activeCategory === cat.id 
                 ? 'bg-hlx-gold text-slate-900' 
                 : 'text-gray-400 hover:text-white hover:bg-white/5'
               }`}
             >
               <cat.icon size={16} />
               {cat.label}
             </button>
           ))}
        </div>

        {/* Doc List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
           {docs.map(doc => (
             <button
               key={doc.id}
               onClick={() => setSelectedDoc(doc)}
               className={`w-full text-left p-3 rounded-lg text-sm transition-all flex items-center justify-between group ${
                 selectedDoc?.id === doc.id 
                 ? 'bg-slate-800 border border-white/20 text-white shadow-lg' 
                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
               }`}
             >
               <div className="truncate pr-2">
                 <span className="block font-bold truncate">{doc.title}</span>
                 <span className="text-[10px] text-gray-500 uppercase">{doc.id}</span>
               </div>
               {selectedDoc?.id === doc.id && <ChevronRight size={14} className="text-hlx-gold" />}
             </button>
           ))}
        </div>
      </div>

      {/* Content Viewer */}
      <div className="flex-1 bg-slate-900 border border-white/10 rounded-xl overflow-hidden flex flex-col relative">
        {selectedDoc ? (
          <>
            <div className="p-6 border-b border-white/10 bg-slate-950 flex justify-between items-start">
               <div>
                 <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded uppercase font-bold tracking-widest">
                      {selectedDoc.category}
                    </span>
                    {selectedDoc.tags.map(tag => (
                      <span key={tag} className="text-[10px] border border-white/10 text-gray-400 px-2 py-0.5 rounded uppercase">
                        {tag}
                      </span>
                    ))}
                 </div>
                 <h2 className="text-2xl font-display font-bold text-white">{selectedDoc.title}</h2>
                 <p className="text-sm text-gray-400">{selectedDoc.subtitle}</p>
               </div>
               <button className="text-gray-400 hover:text-hlx-gold transition-colors" title="Compartilhar Procedimento">
                 <Share2 size={20} />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0f172a]">
               <div className="max-w-3xl mx-auto space-y-8">
                  {selectedDoc.sections.map(section => (
                    <div key={section.id} className="animate-fade-in-up">
                       <h3 className="text-lg font-bold text-hlx-gold mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
                         {section.id.includes('tech') ? <Code size={18} /> : 
                          section.id.includes('step') ? <CheckCircle size={18} /> : 
                          <Layers size={18} />}
                         {section.title}
                       </h3>
                       <div className="text-sm leading-relaxed">
                         {renderContent(section.content)}
                       </div>
                    </div>
                  ))}

                  {selectedDoc.category === 'TECHNICAL' && (
                    <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-white/10 flex items-center gap-4">
                       <Cpu size={32} className="text-purple-400" />
                       <div>
                         <h4 className="text-white font-bold">Status do Sistema</h4>
                         <p className="text-xs text-gray-400">
                           Versão: 1.5.0 (Stable) • Build: Vite/React • Database: Connected
                         </p>
                       </div>
                    </div>
                  )}
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
             <Book size={48} className="mb-4 opacity-20" />
             <p>Selecione um documento para leitura.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default DocumentationModule;
