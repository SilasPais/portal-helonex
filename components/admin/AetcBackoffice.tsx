
import React, { useState, useEffect } from 'react';
import { 
  Landmark, Truck, Siren, User, Calendar, 
  Search, Filter, CheckCircle, AlertTriangle, 
  Printer, Mail, Send, ExternalLink, FileText, 
  PenTool, Download, Box, TrendingUp, PieChart, 
  BarChart, RefreshCw, ChevronRight, X, Clock, Phone,
  Check, ListChecks, ShieldCheck, MessageCircle, Info
} from 'lucide-react';
import { guardianEngine } from '../../services/guardianSystem';
import { AetcRequest, AetcStatus, AETC_PRICE_PER_PLATE } from '../../types';

const AetcBackoffice: React.FC = () => {
  const [requests, setRequests] = useState<AetcRequest[]>([]);
  const [filter, setFilter] = useState<AetcStatus | 'ALL'>('ALL');
  const [selectedReq, setSelectedReq] = useState<AetcRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [showLabelGenerator, setShowLabelGenerator] = useState(false);
  const [senderType, setSenderType] = useState<'FIXED' | 'DYNAMIC'>('FIXED');
  
  // Estados para edição do remetente
  const [senderName, setSenderName] = useState('');
  const [senderLine1, setSenderLine1] = useState('');
  const [senderLine2, setSenderLine2] = useState('');

  useEffect(() => {
    setRequests(guardianEngine.getAetcRequests());
  }, []);

  // Atualiza os campos quando o tipo ou o modal mudam
  useEffect(() => {
    if (showLabelGenerator && selectedReq) {
        if (senderType === 'FIXED') {
            setSenderName('Assessoria Nacional ao Transporte Terrestre');
            setSenderLine1('Caixa Postal 190');
            setSenderLine2('CEP: 13240-970 - Jarinu/SP');
        } else {
            setSenderName(selectedReq.clientName.toUpperCase());
            setSenderLine1('CNPJ: 00.000.000/0001-00'); // Mockado, mas editável
            setSenderLine2('Rua Exemplo do Cliente, 123 - São Paulo/SP'); // Mockado
        }
    }
  }, [showLabelGenerator, senderType, selectedReq]);

  const handleStatusUpdate = (id: string, newStatus: AetcStatus, extra?: any) => {
    guardianEngine.updateAetcStatus(id, newStatus, extra);
    setRequests(guardianEngine.getAetcRequests());
    if (selectedReq?.id === id) {
        setSelectedReq({ ...selectedReq, status: newStatus, ...extra });
    }
  };

  const filtered = requests.filter(r => {
      const matchStatus = filter === 'ALL' || r.status === filter;
      const matchSearch = r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || r.plate.includes(searchTerm.toUpperCase());
      return matchStatus && matchSearch;
  });

  const renewalsNext30 = requests.filter(r => {
      if (!r.expiryDate) return false;
      const days = (new Date(r.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
      return days > 0 && days <= 30;
  });

  const getStatusColor = (status: AetcStatus) => {
    switch (status) {
      case 'DEFERIDO': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'AGUARDANDO_ASSINATURA': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'ANALISE_TECNICA': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'POSTADO_CORREIOS': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      default: return 'text-gray-400 border-white/10 bg-slate-800';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
             <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><TrendingUp size={70}/></div>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Previsão Renovação (30 Dias)</p>
             <h3 className="text-3xl font-display font-black text-white">R$ {(renewalsNext30.length * AETC_PRICE_PER_PLATE).toLocaleString()}</h3>
             <p className="text-xs text-green-400 mt-2 font-bold">{renewalsNext30.length} Placas em Alerta</p>
          </div>
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl">
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Controlado</p>
             <h3 className="text-3xl font-display font-black text-white">{requests.length} Veículos</h3>
             <p className="text-xs text-blue-400 mt-2 font-bold">Monitoramento Ativo 24/7</p>
          </div>
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl">
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Gargalo Assinatura</p>
             <h3 className="text-3xl font-display font-black text-yellow-400">{requests.filter(r => r.status === 'AGUARDANDO_ASSINATURA').length} Casos</h3>
             <p className="text-xs text-gray-500 mt-2">Aguardando ação do cliente.</p>
          </div>
          <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl">
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Em Trâmite SUE</p>
             <h3 className="text-3xl font-display font-black text-white">{requests.filter(r => r.status !== 'DEFERIDO' && r.status !== 'AGUARDANDO_DOCS').length} Ativos</h3>
             <p className="text-xs text-gray-500 mt-2">Em processamento interno.</p>
          </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3"><Landmark className="text-hlx-gold"/> Backoffice Operacional SUE/AETC</h2>
              <div className="flex flex-wrap gap-2">
                  <div className="relative">
                      <Search className="absolute left-3 top-2.5 text-gray-500" size={14} />
                      <input type="text" placeholder="Buscar cliente ou placa..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-slate-900 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white outline-none w-64" />
                  </div>
                  <select value={filter} onChange={e => setFilter(e.target.value as any)} className="bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-white outline-none">
                      <option value="ALL">Todos os Status</option>
                      <option value="AGUARDANDO_DOCS">Aguardando Docs</option>
                      <option value="ANALISE_TECNICA">Análise Técnica</option>
                      <option value="AGUARDANDO_ASSINATURA">Assinatura Digital</option>
                      <option value="POSTADO_CORREIOS">Postado (Correios)</option>
                      <option value="DEFERIDO">Deferido/Ativo</option>
                  </select>
              </div>
          </div>
          <button className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-lg text-sm flex items-center gap-2 transition-all">
              <RefreshCw size={14} /> Sincronizar Sistema CET-SP
          </button>
      </div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-gray-500 uppercase text-[10px] font-black tracking-widest border-b border-white/5">
                  <tr>
                      <th className="p-4">Cliente / Veículo</th>
                      <th className="p-4">Modalidade</th>
                      <th className="p-4">Status SUE</th>
                      <th className="p-4">Pagamento</th>
                      <th className="p-4 text-right">Ação</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                  {filtered.map(req => (
                      <tr key={req.id} className="hover:bg-white/5 transition-all cursor-pointer group" onClick={() => setSelectedReq(req)}>
                          <td className="p-4">
                              <div className="font-bold text-white group-hover:text-hlx-gold">{req.clientName}</div>
                              <div className="text-[10px] text-gray-500 font-mono uppercase">{req.plate}</div>
                          </td>
                          <td className="p-4 text-xs font-bold text-gray-400">{req.modalityId}</td>
                          <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusColor(req.status)}`}>
                                  {req.status.replace(/_/g, ' ')}
                              </span>
                          </td>
                          <td className="p-4">
                              <span className={`text-[10px] font-bold ${req.financeStatus === 'PAID' ? 'text-green-400' : 'text-yellow-400'}`}>
                                  {req.financeStatus === 'PAID' ? 'CONCLUÍDO' : 'PENDENTE'}
                              </span>
                          </td>
                          <td className="p-4 text-right">
                              <ChevronRight className="inline-block text-gray-600 group-hover:text-white" size={18}/>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

      {selectedReq && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
              <div className="bg-slate-900 border border-white/10 rounded-[3rem] w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-scale-in">
                  <div className="p-8 border-b border-white/5 flex justify-between items-start bg-slate-950">
                      <div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border mb-3 inline-block ${getStatusColor(selectedReq.status)}`}>
                              {selectedReq.status.replace(/_/g, ' ')}
                          </span>
                          <h2 className="text-3xl font-display font-bold text-white uppercase">{selectedReq.clientName}</h2>
                          <p className="text-gray-400 font-mono">PLACA: {selectedReq.plate} • ID: {selectedReq.id}</p>
                      </div>
                      <button onClick={() => setSelectedReq(null)} className="p-3 text-gray-400 hover:text-white bg-slate-800 rounded-2xl"><X size={24}/></button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                          <div className="space-y-6">
                              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><ListChecks size={14}/> Auditoria Documental</h4>
                              <div className="space-y-2">
                                  {selectedReq.documents.map((doc, i) => (
                                      <div key={i} className="bg-slate-800 p-4 rounded-xl border border-white/5 flex items-center justify-between group">
                                          <div className="flex items-center gap-3">
                                              <FileText size={16} className="text-blue-400" />
                                              <span className="text-xs text-white font-bold">{doc.name}</span>
                                          </div>
                                          <div className="flex gap-2">
                                              <button className="text-hlx-gold hover:text-white transition-colors"><Download size={14}/></button>
                                              <Check className="text-green-500" size={16} />
                                          </div>
                                      </div>
                                  ))}
                              </div>

                              <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-xl">
                                  <h5 className="text-blue-400 font-bold text-xs flex items-center gap-2 mb-2"><Info size={14}/> Regras da Modalidade</h5>
                                  <p className="text-[10px] text-blue-200/70">
                                      {selectedReq.modalityId === 'GUINCHO' && "Validar se há 'Mecanismo Operacional' e 'Sinal Luminoso' na Obs do CRLV."}
                                      {selectedReq.modalityId === 'CONCRETAGEM' && "Validar se a betoneira tem menos de 10 anos de fabricação."}
                                      {selectedReq.modalityId === 'VUC' && "Validar se largura <= 2.20m, comprimento <= 7.20m e idade <= 15 anos."}
                                  </p>
                              </div>

                              <button 
                                onClick={() => handleStatusUpdate(selectedReq.id, 'AGUARDANDO_ASSINATURA')}
                                className="w-full py-3 bg-hlx-gold text-slate-950 font-black rounded-xl text-xs hover:bg-yellow-400 transition-all"
                              >
                                  GERAR REQUERIMENTO & NOTIFICAR
                              </button>
                          </div>

                          <div className="space-y-6">
                              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><Mail size={14}/> Processamento Físico</h4>
                              <div className="bg-slate-800 p-6 rounded-2xl border border-white/5 space-y-4">
                                  <div>
                                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Checklist de Postagem</p>
                                      <label className="flex items-center gap-3 text-xs text-gray-300 mb-2">
                                          <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-slate-950" /> Requerimento Assinado
                                      </label>
                                      <label className="flex items-center gap-3 text-xs text-gray-300 mb-2">
                                          <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-slate-950" /> Cópia Autenticada CRLV
                                      </label>
                                  </div>
                                  <button 
                                      onClick={() => setShowLabelGenerator(true)}
                                      className="w-full py-3 bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-slate-600 transition-all"
                                  >
                                      <Printer size={16}/> GERAR ETIQUETA CET
                                  </button>

                                  {showLabelGenerator && (
                                      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
                                          <div className="bg-white text-slate-900 rounded-xl w-full max-w-lg p-8 shadow-2xl relative animate-scale-in">
                                              <button onClick={() => setShowLabelGenerator(false)} className="absolute top-4 right-4 text-gray-400 hover:text-slate-900"><X size={24}/></button>
                                              
                                              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Printer className="text-slate-900"/> Etiqueta de Postagem (CET-SP)</h3>
                                              
                                              <div className="flex gap-4 mb-6 bg-slate-100 p-1 rounded-lg">
                                                  <button onClick={() => setSenderType('FIXED')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${senderType === 'FIXED' ? 'bg-slate-900 text-white shadow-md' : 'text-gray-500 hover:bg-slate-200'}`}>REMETENTE FIXO (JARINU)</button>
                                                  <button onClick={() => setSenderType('DYNAMIC')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${senderType === 'DYNAMIC' ? 'bg-slate-900 text-white shadow-md' : 'text-gray-500 hover:bg-slate-200'}`}>REMETENTE DINÂMICO (CLIENTE)</button>
                                              </div>

                                              <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg bg-gray-50 font-mono text-sm leading-relaxed relative">
                                                  <div className="absolute top-2 right-2 text-[10px] text-gray-400 font-bold uppercase">Pré-visualização A4</div>
                                                  
                                                  <div className="mb-6">
                                                      <strong>DESTINATÁRIO:</strong><br/>
                                                      Companhia de Engenharia de Tráfego - CET<br/>
                                                      Caixa Postal nº 25.998<br/>
                                                      CEP: 05513-970 - São Paulo/SP
                                                  </div>
                                                  
                                                  <div className="mb-6">
                                                      <strong>ASSUNTO OBRIGATÓRIO:</strong><br/>
                                                      "Solicitação de Autorização Especial de Trânsito para Caminhões - AETC"
                                                  </div>
                                                  
                                                  <div>
                                                      <strong>REMETENTE:</strong><br/>
                                                      <input 
                                                          type="text" 
                                                          value={senderName} 
                                                          onChange={e => setSenderName(e.target.value)} 
                                                          className="w-full bg-transparent border-b border-gray-300 focus:border-slate-900 outline-none text-slate-900 font-bold mb-1"
                                                          placeholder="Nome do Remetente"
                                                      />
                                                      <input 
                                                          type="text" 
                                                          value={senderLine1} 
                                                          onChange={e => setSenderLine1(e.target.value)} 
                                                          className="w-full bg-transparent border-b border-gray-300 focus:border-slate-900 outline-none text-slate-800 mb-1"
                                                          placeholder="Endereço / Caixa Postal / CNPJ"
                                                      />
                                                      <input 
                                                          type="text" 
                                                          value={senderLine2} 
                                                          onChange={e => setSenderLine2(e.target.value)} 
                                                          className="w-full bg-transparent border-b border-gray-300 focus:border-slate-900 outline-none text-slate-800"
                                                          placeholder="CEP - Cidade/UF"
                                                      />
                                                  </div>
                                                  
                                                  <div className="mt-6 pt-4 border-t border-gray-300 text-[10px] text-gray-500">
                                                      REF: {selectedReq.modalityId} - {selectedReq.clientName.toUpperCase()} - CNPJ: 00.000.000/0001-00
                                                  </div>
                                              </div>

                                              <button 
                                                  onClick={() => {
                                                      alert('Etiqueta enviada para a impressora padrão.');
                                                      setShowLabelGenerator(false);
                                                  }}
                                                  className="w-full mt-6 py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl"
                                              >
                                                  <Printer size={20}/> IMPRIMIR AGORA
                                              </button>
                                          </div>
                                      </div>
                                  )}
                                  <div className="pt-4 border-t border-white/5">
                                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Código de Rastreio</p>
                                      <input 
                                        type="text" 
                                        placeholder="Ex: BR123456789" 
                                        className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white font-mono" 
                                        onChange={e => handleStatusUpdate(selectedReq.id, 'POSTADO_CORREIOS', { trackingCode: e.target.value })}
                                      />
                                  </div>
                              </div>
                          </div>

                          <div className="space-y-6">
                              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><ShieldCheck size={14}/> Decisão Final</h4>
                              <div className="bg-slate-800 p-6 rounded-2xl border border-green-500/20 space-y-4">
                                  <div>
                                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Protocolo CET-SP</p>
                                      <input type="text" placeholder="SUE-2026-..." className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white" />
                                  </div>
                                  <div>
                                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Validade (Final)</p>
                                      <input type="date" className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white" />
                                  </div>
                                  <button 
                                    onClick={() => handleStatusUpdate(selectedReq.id, 'DEFERIDO', { expiryDate: '2028-03-25' })}
                                    className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl text-sm shadow-lg"
                                  >
                                      ATIVAR ISENÇÃO NO SISTEMA
                                  </button>
                              </div>
                              <div className="bg-slate-950 rounded-2xl p-6 border border-white/5">
                                  <button className="w-full py-2 bg-slate-800 hover:bg-green-600 text-white text-[9px] font-bold rounded-lg border border-white/5 flex items-center justify-center gap-2 transition-all"><MessageCircle size={12}/> WHATSAPP: DEFERIDO</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AetcBackoffice;
