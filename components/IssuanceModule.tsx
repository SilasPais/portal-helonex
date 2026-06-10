
import React, { useState, useEffect } from 'react';
import { 
  FileText, Truck, ShieldCheck, Upload, Key, CheckCircle, 
  AlertTriangle, Loader2, Download, RefreshCw, Send, DollarSign,
  FileDigit, Box, XCircle, MapPin, Milestone, Receipt, Scale, Globe, User, Search
} from 'lucide-react';
import { taxService, AuditResult } from '../services/taxService';
import { guardianEngine } from '../services/guardianSystem';
import { TaxDocument, TaxDocType, DigitalCertificate, CteForm, MdfeForm, CiotForm } from '../types';

const IssuanceModule: React.FC = () => {
  const [activeType, setActiveType] = useState<TaxDocType>('CT-e');
  const [certificate, setCertificate] = useState<DigitalCertificate | null>(null);
  const [history, setHistory] = useState<TaxDocument[]>([]);
  
  // STATES DE FORMULÁRIO ESPECÍFICOS
  const [cteData, setCteData] = useState<CteForm>({
    senderName: '', senderCnpj: '', recipientName: '', recipientCnpj: '',
    originCity: '', originUF: '', destCity: '', destUF: '',
    productName: '', productValue: 0, cargoWeight: 0, freightValue: 0,
    tributation: 'ICMS', nfeKeys: ''
  });

  const [mdfeData, setMdfeData] = useState<MdfeForm>({
    vehiclePlate: '', driverCpf: '', driverName: '',
    ufOrigin: '', ufDestiny: [], cteKeys: '', insurancePolicy: ''
  });

  const [ciotData, setCiotData] = useState<CiotForm>({
    rntrc: '', contractorCnpj: '', driverCpf: '',
    freightValue: 0, paymentMethod: 'PIX', destCity: '', destUF: '',
    contractType: 'TAC'
  });
  
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);

  useEffect(() => {
    refreshData();
    setAuditResult(null); 
  }, []);

  const refreshData = () => {
    setCertificate(guardianEngine.getCertificate());
    setHistory(guardianEngine.getTaxDocuments());
    // Pré-carrega dados da empresa se disponível
    const company = guardianEngine.getCompanyData();
    if (company && company.vehicles.length > 0) {
        setMdfeData(prev => ({ ...prev, vehiclePlate: company.vehicles[0].plate }));
        setCiotData(prev => ({ ...prev, rntrc: '12345678' })); // Mock
    }
  };

  const handleCertUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const password = prompt("Digite a senha do certificado A1:");
    if (!password) return;

    setUploadingCert(true);
    await taxService.uploadCertificate(file, password);
    setUploadingCert(false);
    refreshData();
    alert("Certificado instalado no Cofre Seguro Helonex.");
  };

  // Funções de Update Genéricas para os Forms
  const updateCte = (key: keyof CteForm, val: any) => setCteData(prev => ({ ...prev, [key]: val }));
  const updateMdfe = (key: keyof MdfeForm, val: any) => setMdfeData(prev => ({ ...prev, [key]: val }));
  const updateCiot = (key: keyof CiotForm, val: any) => setCiotData(prev => ({ ...prev, [key]: val }));

  // --- RENDERIZADORES DE FORMULÁRIO ---

  const renderCteForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
       {/* Remetente & Destinatário */}
       <div className="space-y-4">
          <div className="bg-slate-800 p-4 rounded-lg border border-white/5">
             <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2"><User size={12}/> Atores do Transporte</h4>
             <div className="space-y-3">
                <div>
                   <label className="text-[10px] text-gray-500 block">Remetente (Quem envia)</label>
                   <input type="text" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white" 
                          placeholder="Nome da Empresa" value={cteData.senderName} onChange={e => updateCte('senderName', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] text-gray-500 block">Destinatário (Quem recebe)</label>
                   <input type="text" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white" 
                          placeholder="Nome do Cliente" value={cteData.recipientName} onChange={e => updateCte('recipientName', e.target.value)} />
                   <input type="text" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white mt-1" 
                          placeholder="CNPJ Destinatário (Obg. p/ ICMS)" value={cteData.recipientCnpj} onChange={e => updateCte('recipientCnpj', e.target.value)} />
                </div>
             </div>
          </div>
       </div>

       {/* Dados da Carga & Rota */}
       <div className="space-y-4">
          <div className="bg-slate-800 p-4 rounded-lg border border-white/5">
             <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2"><Box size={12}/> Carga & Valores</h4>
             <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                   <label className="text-[10px] text-gray-500 block">Produto Predominante</label>
                   <input type="text" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white" 
                          placeholder="Ex: Soja, Eletrônicos" value={cteData.productName} onChange={e => updateCte('productName', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] text-gray-500 block">Peso (Kg)</label>
                   <input type="number" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white" 
                          value={cteData.cargoWeight} onChange={e => updateCte('cargoWeight', Number(e.target.value))} />
                </div>
             </div>
             <div className="mb-3">
                <label className="text-[10px] text-gray-500 block">Valor do Frete (Serviço)</label>
                <div className="relative">
                   <span className="absolute left-2 top-2 text-green-500 text-xs">R$</span>
                   <input type="number" className="w-full bg-slate-900 border border-white/10 rounded p-2 pl-8 text-sm text-white font-bold" 
                          value={cteData.freightValue} onChange={e => updateCte('freightValue', Number(e.target.value))} />
                </div>
             </div>
             <div>
                <label className="text-[10px] text-gray-500 block">Chaves de Acesso NF-e (Notas Fiscais)</label>
                <textarea className="w-full bg-slate-900 border border-white/10 rounded p-2 text-xs text-white font-mono h-20" 
                          placeholder="Cole as 44 dígitos das notas aqui..." value={cteData.nfeKeys} onChange={e => updateCte('nfeKeys', e.target.value)} />
             </div>
          </div>
       </div>
    </div>
  );

  const renderMdfeForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
       <div className="bg-slate-800 p-4 rounded-lg border border-white/5">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2"><Truck size={12}/> Veículo & Motorista</h4>
          <div className="space-y-3">
             <div>
                <label className="text-[10px] text-gray-500 block">Placa do Veículo (Tração)</label>
                <input type="text" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white uppercase" 
                       value={mdfeData.vehiclePlate} onChange={e => updateMdfe('vehiclePlate', e.target.value)} />
             </div>
             <div>
                <label className="text-[10px] text-gray-500 block">CPF do Motorista</label>
                <input type="text" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white" 
                       value={mdfeData.driverCpf} onChange={e => updateMdfe('driverCpf', e.target.value)} placeholder="000.000.000-00" />
             </div>
             <div>
                <label className="text-[10px] text-gray-500 block">Apólice Seguro Carga (RCTR-C)</label>
                <input type="text" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white" 
                       value={mdfeData.insurancePolicy} onChange={e => updateMdfe('insurancePolicy', e.target.value)} placeholder="Obrigatório Lei 14.599" />
             </div>
          </div>
       </div>

       <div className="bg-slate-800 p-4 rounded-lg border border-white/5">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2"><MapPin size={12}/> Percurso & Documentos</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
             <div>
                <label className="text-[10px] text-gray-500 block">UF Carregamento</label>
                <input type="text" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white uppercase" maxLength={2}
                       value={mdfeData.ufOrigin} onChange={e => updateMdfe('ufOrigin', e.target.value)} placeholder="SP" />
             </div>
             <div>
                <label className="text-[10px] text-gray-500 block">UF Descarregamento</label>
                <input type="text" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white uppercase" maxLength={2}
                       value={mdfeData.ufDestiny[0] || ''} onChange={e => updateMdfe('ufDestiny', [e.target.value])} placeholder="BA" />
             </div>
          </div>
          <div>
             <label className="text-[10px] text-gray-500 block">Chaves dos CT-e (Vinculados)</label>
             <textarea className="w-full bg-slate-900 border border-white/10 rounded p-2 text-xs text-white font-mono h-24" 
                       placeholder="Cole as chaves dos Conhecimentos que este caminhão está levando..." value={mdfeData.cteKeys} onChange={e => updateMdfe('cteKeys', e.target.value)} />
          </div>
       </div>
    </div>
  );

  const renderCiotForm = () => (
    <div className="bg-slate-800 p-4 rounded-lg border border-white/5 animate-fade-in max-w-2xl mx-auto">
       <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2"><Receipt size={12}/> Pagamento Eletrônico de Frete (MP 1.343/26)</h4>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
             <label className="text-[10px] text-gray-500 block">Tipo de Contratação (OBRIGATÓRIO)</label>
             <select className="w-full bg-slate-900 border border-hlx-gold/30 rounded p-2 text-sm text-hlx-gold font-bold"
                     value={ciotData.contractType} onChange={e => updateCiot('contractType', e.target.value)}>
                 <option value="TAC">TAC (Autônomo)</option>
                 <option value="MEI_CAMINHONEIRO">MEI Caminhoneiro</option>
                 <option value="ETC">ETC (Empresa / Subcontratação)</option>
                 <option value="PROPRIO">Recurso Próprio (Frota)</option>
                 <option value="OUTROS">Outros / Cooperativas</option>
             </select>
             {ciotData.contractType === 'MEI_CAMINHONEIRO' && (
                <p className="text-[9px] text-yellow-500 mt-1 font-bold animate-pulse">
                    ⚠️ Atenção: MEI aposenta apenas por idade. Verifique o impacto na sua contribuição.
                </p>
             )}
             {ciotData.contractType === 'TAC' && (
                <p className="text-[9px] text-green-500 mt-1 font-bold">
                    ✅ Categoria Protegida: Isenção de 40% no IRPF garantida por lei.
                </p>
             )}
             <p className="text-[9px] text-gray-500 mt-1">* Conforme MP 1.343, o código é obrigatório para todos os perfis.</p>
          </div>
          <div>
             <label className="text-[10px] text-gray-500 block">RNTRC do Contratado</label>
             <input type="text" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white" 
                    value={ciotData.rntrc} onChange={e => updateCiot('rntrc', e.target.value)} />
          </div>
          <div>
             <label className="text-[10px] text-gray-500 block">CPF/CNPJ Quem Paga</label>
             <input type="text" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white" 
                    value={ciotData.contractorCnpj} onChange={e => updateCiot('contractorCnpj', e.target.value)} />
          </div>
          <div>
             <label className="text-[10px] text-gray-500 block">Valor a Pagar (R$)</label>
             <input type="number" className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white font-bold text-green-400" 
                    value={ciotData.freightValue} onChange={e => updateCiot('freightValue', Number(e.target.value))} />
          </div>
          <div>
             <label className="text-[10px] text-gray-500 block">Meio de Pagamento</label>
             <select className="w-full bg-slate-900 border border-white/10 rounded p-2 text-sm text-white"
                     value={ciotData.paymentMethod} onChange={e => updateCiot('paymentMethod', e.target.value)}>
                 <option value="PIX">PIX</option>
                 <option value="TRANSFERENCIA">Transferência Bancária</option>
                 <option value="MEIO_ELETRONICO">Cartão / Tag (PEF)</option>
             </select>
          </div>
       </div>
    </div>
  );

  const handleEmit = async () => {
    // Validação Básica antes de chamar o serviço (Simulação)
    if (activeType === 'CT-e' && (!cteData.recipientCnpj || cteData.freightValue <= 0)) {
        alert("Erro: Preencha o CNPJ do destinatário e o Valor do Frete.");
        return;
    }
    
    // HARD LOCK: MP 1.343/2026 - MDF-e EXIGE CIOT VINCULADO
    if (activeType === 'MDF-e') {
        if (!mdfeData.vehiclePlate || !mdfeData.driverCpf) {
            alert("Erro: Placa e Motorista são obrigatórios para o Manifesto.");
            return;
        }
        
        // Simulação de verificação de trava
        const hasCiot = history.some(doc => doc.type === 'CIOT' && doc.status === 'AUTHORIZED');
        if (!hasCiot) {
            alert("🛑 BLOQUEIO DE COMPLIANCE (MP 1.343):\nO MDF-e não pode ser emitido sem um CIOT autorizado e vinculado para esta operação. Gere o CIOT primeiro.");
            return;
        }
    }

    setIsTransmitting(true);
    
    // Simula envio para SEFAZ
    setTimeout(() => {
        setIsTransmitting(false);
        const protocol = Math.floor(Math.random() * 10000000);
        alert(`✅ ${activeType} Autorizado!\nProtocolo SEFAZ: ${protocol}\n\nO documento foi enviado para o e-mail do destinatário.`);
        
        // Adiciona ao histórico local (Mock)
        const newDoc: TaxDocument = {
            id: `new-${Date.now()}`,
            type: activeType,
            number: protocol.toString(),
            series: '1',
            issueDate: new Date().toISOString(),
            value: activeType === 'CT-e' ? cteData.freightValue : activeType === 'CIOT' ? ciotData.freightValue : 0,
            recipientName: activeType === 'CT-e' ? cteData.recipientName : 'Diversos',
            status: 'AUTHORIZED'
        };
        setHistory(prev => [newDoc, ...prev]);
        
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* HEADER & SELEÇÃO DE DOCUMENTO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-xl p-6 relative overflow-hidden">
           <div className="absolute right-0 top-0 p-4 opacity-5"><FileDigit size={100} /></div>
           <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
             <Truck className="text-hlx-gold" /> Emissor Fiscal Inteligente
           </h2>
           <p className="text-gray-400 text-sm max-w-lg mb-6">
             Selecione o tipo de documento. Nossos formulários são adaptados para cada exigência da ANTT e SEFAZ.
           </p>
           
           <div className="flex gap-2 overflow-x-auto custom-scrollbar">
             {[
               { id: 'CT-e', label: 'CT-e (Conhecimento)', icon: <FileText size={14} /> },
               { id: 'MDF-e', label: 'MDF-e (Manifesto)', icon: <Truck size={14} /> },
               { id: 'CIOT', label: 'CIOT (Pagamento)', icon: <DollarSign size={14} /> },
               { id: 'NF-e', label: 'NF-e (Nota Fiscal)', icon: <FileDigit size={14} /> }
             ].map((doc) => (
               <button
                 key={doc.id}
                 onClick={() => { setActiveType(doc.id as TaxDocType); setAuditResult(null); }}
                 className={`px-4 py-3 rounded-lg font-bold text-xs transition-all border flex items-center gap-2 ${
                   activeType === doc.id 
                   ? 'bg-hlx-gold text-slate-900 border-hlx-gold shadow-lg' 
                   : 'bg-slate-800 text-gray-400 border-white/10 hover:text-white'
                 }`}
               >
                 {doc.icon} {doc.label}
               </button>
             ))}
           </div>
        </div>

        <div className="bg-slate-800 border border-white/10 rounded-xl p-6 flex flex-col justify-between">
           <div>
             <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
               <Key size={16} className="text-blue-400" /> Certificado A1
             </h3>
             {certificate ? (
               <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                 <p className="text-xs text-green-400 font-bold flex items-center gap-1">
                   <CheckCircle size={12} /> {certificate.fileName}
                 </p>
                 <p className="text-[10px] text-gray-400 mt-1">Vence em: {certificate.expiryDate}</p>
               </div>
             ) : (
               <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-center">
                 <p className="text-xs text-red-400 font-bold flex items-center justify-center gap-1">
                   <AlertTriangle size={12} /> Não Instalado
                 </p>
               </div>
             )}
           </div>
           
           <label className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition-colors">
             {uploadingCert ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
             {uploadingCert ? 'Instalando...' : 'Carregar PFX'}
             <input type="file" accept=".pfx" className="hidden" onChange={handleCertUpload} />
           </label>
        </div>
      </div>

      {/* ÁREA DE EMISSÃO (FORMULÁRIO ESPECÍFICO) */}
      <div className="bg-slate-900 border border-white/10 rounded-xl p-6 shadow-xl">
         <div className="mb-6 border-b border-white/10 pb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
                {activeType === 'CT-e' ? <FileText size={20} className="text-green-400" /> : 
                 activeType === 'MDF-e' ? <Truck size={20} className="text-blue-400" /> : 
                 <DollarSign size={20} className="text-yellow-400" />}
                Nova Emissão: {activeType}
            </h3>
            <p className="text-xs text-gray-400 mt-1">Preencha os dados obrigatórios para validação.</p>
         </div>

         {/* Renderiza o formulário correto baseado no tipo */}
         {activeType === 'CT-e' && renderCteForm()}
         {activeType === 'MDF-e' && renderMdfeForm()}
         {activeType === 'CIOT' && renderCiotForm()}
         {activeType === 'NF-e' && <div className="text-center p-8 text-gray-500">Módulo NF-e em manutenção. Use o emissor gratuito da SEFAZ por enquanto.</div>}

         <div className="flex justify-end gap-4 border-t border-white/10 pt-6 mt-6">
            <button 
                onClick={handleEmit}
                disabled={isTransmitting || activeType === 'NF-e'}
                className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isTransmitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                {isTransmitting ? 'Validando e Transmitindo...' : `Transmitir ${activeType}`}
            </button>
         </div>
      </div>

      {/* HISTÓRICO DE EMISSÕES */}
      <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
         <div className="p-4 bg-slate-950 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Últimos Documentos</h3>
            <button onClick={refreshData} className="text-gray-400 hover:text-white"><RefreshCw size={16} /></button>
         </div>
         <div className="divide-y divide-white/5">
            {history.length === 0 ? (
               <div className="p-8 text-center text-gray-500">
                  Nenhum documento emitido ainda.
               </div>
            ) : (
               history.map(doc => (
                  <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                           doc.status === 'AUTHORIZED' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 
                           doc.status === 'REJECTED' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-slate-800 border-white/10 text-gray-400'
                        }`}>
                           {doc.type === 'CT-e' ? <FileText size={18} /> : doc.type === 'CIOT' ? <DollarSign size={18} /> : <Truck size={18} />}
                        </div>
                        <div>
                           <p className="text-white font-bold text-sm">{doc.type} #{doc.number}</p>
                           <p className="text-xs text-gray-500">{new Date(doc.issueDate).toLocaleDateString()} • {doc.recipientName}</p>
                        </div>
                     </div>
                     <div className="text-right flex items-center gap-4">
                        <div>
                           <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase border ${
                              doc.status === 'AUTHORIZED' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 
                              'bg-red-500/10 text-red-400 border-red-500/30'
                           }`}>
                              {doc.status === 'AUTHORIZED' ? 'Autorizado' : 'Rejeitado'}
                           </span>
                        </div>
                        {doc.status === 'AUTHORIZED' && (
                           <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-hlx-gold transition-colors" title="Baixar PDF">
                              <Download size={16} />
                           </button>
                        )}
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>

    </div>
  );
};

export default IssuanceModule;
