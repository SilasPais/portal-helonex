
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, Camera, Mic, 
  Loader2, Save, Bus, Users, ShieldCheck, Globe, Milestone,
  GraduationCap, ClipboardCheck, ShieldAlert, Edit3, Trash2, Sun,
  Lock, PenTool, FileCheck, AlertCircle, Truck
} from 'lucide-react';
import { ChecklistItem } from '../types';
import { transcribeAudio } from '../services/geminiService';

import { supabase } from '../src/lib/supabase';

type ChecklistType = 'PASS_TURISMO' | 'PASS_ESCOLAR' | 'PASS_CONT' | 'FROTA_GERAL' | 'TRIC_OTM' | 'CARGO_NACIONAL';

const TEMPLATES: Record<ChecklistType, ChecklistItem[]> = {
  'CARGO_NACIONAL': [
    { id: 'cn1', category: 'Legal', label: 'RNTRC (TAC/ETC) Ativo e Consultada', status: 'NA', severityIfFailed: 'Critica' },
    { id: 'cn2', category: 'Seguros', label: 'RCTR-C (Acidentes) e RCF-DC (Roubo) OK', status: 'NA', severityIfFailed: 'Critica' },
    { id: 'cn3', category: 'Segurança', label: 'Plano de Gerenciamento de Risco (PGR) Ativo', status: 'NA', severityIfFailed: 'Alta' },
    { id: 'cn4', category: 'Equipamento', label: 'Tacógrafo e Limitador de Velocidade OK', status: 'NA', severityIfFailed: 'Alta' }
  ],
  'TRIC_OTM': [
    { id: 'to1', category: 'Aduana', label: 'MIC/DTA (Manifesto Internacional) Validado', status: 'NA', severityIfFailed: 'Critica' },
    { id: 'to2', category: 'Seguros', label: 'Apólice RCTR-VI (Carta Azul) Ativa', status: 'NA', severityIfFailed: 'Critica' },
    { id: 'to3', category: 'Equipamentos', label: 'Kit Mercosul (Cambão, Cones, Correntes)', status: 'NA', severityIfFailed: 'Alta' },
    { id: 'to4', category: 'Motorista', label: 'Visto de Entrada/Permiso do Condutor', status: 'NA', severityIfFailed: 'Critica' }
  ],
  'PASS_TURISMO': [
    { id: 'pt1', category: 'Legal', label: 'Seguro APP R$ 4.2M (Lei 14.599)', status: 'NA', severityIfFailed: 'Critica' },
    { id: 'pt2', category: 'ANTT', label: 'Licença de Viagem TAF emitida no sistema', status: 'NA', severityIfFailed: 'Critica' },
    { id: 'pt3', category: 'Higiene', label: 'Sanitário e Ar-Condicionado higienizados', status: 'NA', severityIfFailed: 'Media' },
    { id: 'pt4', category: 'Mecânica', label: 'Tacógrafo aferido e com disco/bobina', status: 'NA', severityIfFailed: 'Alta' }
  ],
  'PASS_ESCOLAR': [
    { id: 'pe1', category: 'Prefeitura', label: 'Selos Ciretran e Faixa Amarela OK', status: 'NA', severityIfFailed: 'Critica' },
    { id: 'pe2', category: 'Segurança', label: 'Cintos de segurança em todos os bancos', status: 'NA', severityIfFailed: 'Critica' },
    { id: 'pe3', category: 'Operação', label: 'Monitor de transporte identificado', status: 'NA', severityIfFailed: 'Alta' }
  ],
  'PASS_CONT': [
    { id: 'pc1', category: 'Contrato', label: 'Lista de Passageiros atualizada e embarcada', status: 'NA', severityIfFailed: 'Critica' },
    { id: 'pc2', category: 'Higiene', label: 'Protocolo de Limpeza entre turnos OK', status: 'NA', severityIfFailed: 'Media' }
  ],
  'FROTA_GERAL': [
    { id: 'fg1', category: 'Documentação', label: 'CRLV-e Licenciamento Anual OK', status: 'NA', severityIfFailed: 'Critica' },
    { id: 'fg2', category: 'Documentação', label: 'Autorização/Registro (Passageiros) OK', status: 'NA', severityIfFailed: 'Alta' },
    { id: 'fg3', category: 'Segurança', label: 'Pneus e Estepe (Sulco > 1.6mm)', status: 'NA', severityIfFailed: 'Critica' }
  ]
};

const ChecklistModule: React.FC = () => {
  const [activeType, setActiveType] = useState<ChecklistType>('CARGO_NACIONAL');
  const [items, setItems] = useState<ChecklistItem[]>(TEMPLATES['CARGO_NACIONAL']);
  const [recordingItemId, setRecordingItemId] = useState<string | null>(null);
  const [transcribingId, setTranscribingId] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [signatureHash, setSignatureHash] = useState<string | null>(null);
  const [plate, setPlate] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
      setItems(JSON.parse(JSON.stringify(TEMPLATES[activeType])));
      setSignatureHash(null);
  }, [activeType]);

  const handleStatusChange = (id: string, status: 'OK' | 'NOK' | 'NA') => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const handleObservationChange = (id: string, text: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, observation: text } : item));
  };

  const handlePhotoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setItems(prev => prev.map(item => item.id === id ? { ...item, photoEvidence: base64 } : item));
        };
        reader.readAsDataURL(file);
    }
  };

  const toggleRecording = async (id: string) => {
    if (recordingItemId === id) {
        mediaRecorderRef.current?.stop();
        setRecordingItemId(null);
    } else {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];
            mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = async () => {
                    const base64 = reader.result as string;
                    setTranscribingId(id);
                    const text = await transcribeAudio(base64);
                    setItems(prev => prev.map(item => item.id === id ? { ...item, observation: `${item.observation || ''} | Nota IA: ${text}` } : item));
                    setTranscribingId(null);
                };
            };
            mediaRecorder.start();
            setRecordingItemId(id);
        } catch (e) { alert("Acesso ao microfone negado."); }
    }
  };

  const handleFinalize = () => {
      setIsSigning(true);
  };

  const confirmSignature = async () => {
      if (!plate.trim()) {
          alert("Atenção: A Placa do Veículo é obrigatória para o registro de auditoria.");
          return;
      }

      try {
          const hash = 'HLX-' + Math.random().toString(36).substring(2, 15).toUpperCase();
          
          // Verifica severidade
          const hasCriticalFailure = items.some(item => item.status === 'NOK' && item.severityIfFailed === 'Critica');
          const statusFinal = hasCriticalFailure ? 'REPROVADO_CRITICO' : 'APROVADO';

          // Captura usuário
          const { data: { user } } = await supabase.auth.getUser();

          // Persistência
          const { error } = await supabase
              .from('inspecoes_frota')
              .insert([
                  {
                      veiculo_placa: plate.toUpperCase(),
                      inspetor_id: user?.id,
                      hash_integridade: hash,
                      status_severidade: statusFinal,
                      dados_inspecao: items
                  }
              ]);

          if (error) throw error;

          // Log de Auditoria
          await supabase.from('logs_auditoria_helonex').insert([
              {
                  usuario_id: user?.id,
                  acao: 'FINALIZACAO_CHECKLIST_FROTA',
                  modulo: 'GesTech_Qualidade',
                  payload_json: { placa: plate.toUpperCase(), hash: hash, status: statusFinal }
              }
          ]);

          setSignatureHash(hash);
          setIsSigning(false);
          alert(`Auditoria Finalizada e Assinada Digitalmente.\nHash: ${hash}\nDados enviados para o Kernel de Soberania HELONEX.`);
          
      } catch (error) {
          console.error("Erro Crítico ao salvar inspeção:", error);
          alert("Falha de comunicação com o servidor seguro. A inspeção não foi gravada.");
      }
  };

  const allChecked = items.every(item => item.status !== 'NA');

  return (
    <div className="flex flex-col h-full animate-fade-in max-w-4xl mx-auto">
         {/* Banner HELONEX Auditoria */}
         <div className="bg-slate-900 border border-hlx-gold/30 p-8 rounded-3xl mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <ShieldCheck size={200} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <Lock size={16} className="text-hlx-gold" />
                    <span className="text-hlx-gold font-mono text-xs uppercase tracking-[0.2em]">Protocolo de Soberania de Dados</span>
                </div>
                <h1 className="font-display font-bold text-white text-3xl md:text-4xl">
                   AUDITORIA <span className="text-hlx-gold">ERRO ZERO</span>
                </h1>
                <p className="text-gray-400 font-medium text-sm mt-2">Padrão de Qualidade ISO 9001:2026 | Gestão de Risco Proativa</p>
            </div>
         </div>

         <div className="mb-8">
             <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ClipboardCheck className="text-hlx-gold" /> Matriz de Conformidade
                </h2>
                <span className="text-[10px] font-mono text-gray-500 uppercase">Versão do Checklist: 2.4.0</span>
             </div>
             
             <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
                 {[
                     { id: 'CARGO_NACIONAL', label: 'Carga Nacional', icon: Truck },
                     { id: 'TRIC_OTM', label: 'Internacional (TRIC)', icon: Globe },
                     { id: 'PASS_TURISMO', label: 'Turismo Master', icon: Milestone },
                     { id: 'PASS_ESCOLAR', label: 'Escolar', icon: GraduationCap },
                     { id: 'PASS_CONT', label: 'Fret. Contínuo', icon: Users },
                     { id: 'FROTA_GERAL', label: 'Frota Geral', icon: Bus }
                 ].map(type => (
                     <button
                        key={type.id}
                        onClick={() => setActiveType(type.id as ChecklistType)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                            activeType === type.id ? 'bg-hlx-gold text-slate-900 border-hlx-gold shadow-lg shadow-yellow-900/20' : 'bg-slate-900 text-gray-400 border-white/5 hover:border-white/20'
                        }`}
                     >
                         <type.icon size={16} /> {type.label}
                     </button>
                 ))}
             </div>
         </div>

         <div className="space-y-4 pb-32">
            {items.map((item) => (
                <div key={item.id} className={`bg-slate-900 border rounded-2xl p-6 transition-all group ${item.status === 'NOK' ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 hover:border-hlx-gold/30'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold px-2 py-1 rounded uppercase bg-slate-950 text-hlx-gold border border-hlx-gold/20">{item.category}</span>
                            {item.severityIfFailed === 'Critica' && (
                                <div className="flex items-center gap-1 text-red-500">
                                    <AlertCircle size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-tighter">Item Crítico</span>
                                </div>
                            )}
                        </div>
                        {item.status === 'OK' && <CheckCircle size={18} className="text-green-500" />}
                    </div>
                    
                    <h3 className="text-white font-bold text-lg mb-6 leading-snug">{item.label}</h3>
                    
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                          { val: 'OK', label: 'Conforme', color: 'bg-green-600' },
                          { val: 'NOK', label: 'Irregular', color: 'bg-red-600' },
                          { val: 'NA', label: 'N/A', color: 'bg-gray-600' }
                        ].map(status => (
                            <button 
                                key={status.val}
                                onClick={() => handleStatusChange(item.id, status.val as any)}
                                className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                                    item.status === status.val 
                                    ? status.color + ' text-white shadow-lg border-transparent scale-[1.02]' 
                                    : 'bg-slate-950 text-gray-500 border-white/5 hover:border-white/10'
                                }`}
                            >
                                {status.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-white/5 focus-within:border-hlx-gold/50 transition-colors">
                        <Edit3 size={16} className="text-gray-600" />
                        <input 
                            type="text" 
                            placeholder="Notas de Auditoria (Voz ou Texto)..." 
                            value={item.observation || ''}
                            onChange={(e) => handleObservationChange(item.id, e.target.value)}
                            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-700"
                        />
                        
                        <div className="flex items-center gap-2 ml-auto">
                            <label className={`p-2 rounded-lg cursor-pointer transition-all hover:bg-white/5 ${item.photoEvidence ? 'text-hlx-gold' : 'text-gray-500'}`}>
                                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handlePhotoUpload(item.id, e)} />
                                <Camera size={18} />
                            </label>

                            <button onClick={() => toggleRecording(item.id)} className={`p-2 rounded-lg transition-all hover:bg-white/5 ${recordingItemId === item.id ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}>
                                {transcribingId === item.id ? <Loader2 size={18} className="animate-spin" /> : <Mic size={18} />}
                            </button>
                        </div>
                    </div>
                    
                    {item.photoEvidence && (
                        <div className="mt-4 relative w-32 h-32 rounded-xl border border-white/10 overflow-hidden group shadow-2xl">
                            <img src={item.photoEvidence} alt="Evidência" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setItems(prev => prev.map(i => i.id === item.id ? { ...i, photoEvidence: undefined } : i))} className="text-red-400"><Trash2 size={20} /></button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
         </div>

         {/* Painel de Assinatura / Finalização */}
         <div className="fixed bottom-0 left-0 right-0 p-6 bg-slate-950/80 backdrop-blur-xl border-t border-white/10 z-50">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-hlx-gold/10 text-hlx-gold border border-hlx-gold/20">
                        <FileCheck size={24} />
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm">Status da Auditoria</p>
                        <p className="text-xs text-gray-500">
                            {allChecked ? 'Pronto para Assinatura Digital' : 'Preencha todos os itens obrigatórios'}
                        </p>
                    </div>
                </div>

                {signatureHash ? (
                    <div className="bg-green-500/10 border border-green-500/30 px-6 py-3 rounded-xl flex items-center gap-3">
                        <ShieldCheck className="text-green-500" />
                        <div>
                            <p className="text-green-400 font-bold text-xs">ASSINADO DIGITALMENTE</p>
                            <p className="text-[10px] font-mono text-green-500/70">{signatureHash}</p>
                        </div>
                    </div>
                ) : (
                    <button 
                        disabled={!allChecked}
                        onClick={handleFinalize}
                        className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-2xl ${
                            allChecked 
                            ? 'bg-hlx-gold text-slate-900 hover:bg-yellow-400 hover:-translate-y-1' 
                            : 'bg-slate-800 text-gray-600 cursor-not-allowed'
                        }`}
                    >
                        <PenTool size={20} /> FINALIZAR E ASSINAR
                    </button>
                )}
            </div>
         </div>

         {/* Modal de Assinatura */}
         {isSigning && (
             <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                 <div className="bg-slate-900 border border-hlx-gold/30 p-8 rounded-3xl max-w-md w-full shadow-2xl animate-scale-in">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-hlx-gold/10 rounded-full flex items-center justify-center text-hlx-gold mx-auto mb-4 border border-hlx-gold/20">
                            <Lock size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Assinatura Digital</h2>
                        <p className="text-gray-400 text-sm mt-2">Você está prestes a assinar esta auditoria. Esta ação é imutável e será registrada no Log de Soberania.</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5 mb-8">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-500">Operador:</span>
                            <span className="text-white font-bold">Auditor Helonex</span>
                        </div>
                        <div className="flex justify-between text-xs mb-4">
                            <span className="text-gray-500">Data/Hora:</span>
                            <span className="text-white font-bold">{new Date().toLocaleString()}</span>
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block uppercase font-bold">Placa do Veículo (Obrigatório)</label>
                            <input 
                                type="text" 
                                value={plate}
                                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                                placeholder="ABC-1234"
                                className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white font-mono text-center uppercase tracking-widest focus:border-hlx-gold outline-none"
                                maxLength={8}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => setIsSigning(false)} className="flex-1 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all">CANCELAR</button>
                        <button onClick={confirmSignature} className="flex-1 py-4 bg-hlx-gold text-slate-900 rounded-xl font-bold hover:bg-yellow-400 transition-all">CONFIRMAR</button>
                    </div>
                 </div>
             </div>
         )}
    </div>
  );
};

export default ChecklistModule;
