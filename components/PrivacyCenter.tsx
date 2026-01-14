import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Eye, EyeOff, Download, Trash2, FileText, CheckCircle, Save, AlertTriangle, X } from 'lucide-react';
import { guardianEngine } from '../services/guardianSystem';
import { PrivacySettings } from '../types';

interface PrivacyCenterProps {
  onClose: () => void;
}

const PrivacyCenter: React.FC<PrivacyCenterProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'policy' | 'data'>('settings');
  const [settings, setSettings] = useState<PrivacySettings | null>(null);
  
  useEffect(() => {
    const companyData = guardianEngine.getCompanyData();
    if (companyData && companyData.privacySettings) {
        setSettings(companyData.privacySettings);
    }
  }, []);

  const handleToggle = (key: keyof PrivacySettings) => {
      if (!settings) return;
      if (key === 'dataProcessing') return; // Cannot toggle essential
      const newSettings = { ...settings, [key]: !settings[key as any], lastUpdated: new Date().toISOString() };
      setSettings(newSettings);
      guardianEngine.updatePrivacySettings(newSettings);
  };

  const handleExportData = () => {
      const data = guardianEngine.exportUserData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `HELONEX_DADOS_${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      alert("Download iniciado. Este arquivo contém todos os seus dados pessoais e de frota em formato JSON (Portabilidade LGPD).");
  };

  const handleDeleteRequest = () => {
      alert("Solicitação de 'Direito ao Esquecimento' enviada ao DPO (Encarregado de Dados).\n\nProtocolo: LGPD-DEL-" + Math.floor(Math.random() * 10000) + "\nPrazo legal de resposta: 15 dias.");
  };

  if (!settings) return <div className="text-white p-8">Carregando preferências...</div>;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in-up">
      <div className="bg-slate-900 w-full max-w-4xl h-[85vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-950 p-6 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg text-green-400">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Central de Privacidade & LGPD</h2>
                    <p className="text-xs text-gray-400">Soberania de Dados • Lei 13.709/2018</p>
                </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-2 bg-slate-800 rounded-lg transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-slate-900">
            <button 
                onClick={() => setActiveTab('settings')}
                className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'settings' ? 'border-green-500 text-green-400 bg-green-500/5' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
                <Lock size={16} /> Preferências
            </button>
            <button 
                onClick={() => setActiveTab('policy')}
                className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'policy' ? 'border-green-500 text-green-400 bg-green-500/5' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
                <FileText size={16} /> Política de Privacidade
            </button>
            <button 
                onClick={() => setActiveTab('data')}
                className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'data' ? 'border-green-500 text-green-400 bg-green-500/5' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
                <Download size={16} /> Seus Dados
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0f172a]">
            
            {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl mb-6">
                        <p className="text-sm text-blue-200">
                            Aqui você decide como a HELONEX usa seus dados. A transparência (Yosher) é nosso valor inegociável.
                        </p>
                    </div>

                    {/* Toggle Item 1 */}
                    <div className="flex items-start justify-between p-4 bg-slate-800 rounded-xl border border-white/5 opacity-50 cursor-not-allowed">
                        <div>
                            <h4 className="text-white font-bold mb-1">Processamento Essencial (RNTRC)</h4>
                            <p className="text-xs text-gray-400 max-w-md">Necessário para comunicação com a ANTT e emissão de documentos oficiais. Não pode ser desativado enquanto houver contrato ativo.</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={true} readOnly className="sr-only peer" />
                            <div className="w-11 h-6 bg-green-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-800 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-green-600"></div>
                        </div>
                    </div>

                    {/* Toggle Item 2 */}
                    <div className="flex items-start justify-between p-4 bg-slate-800 rounded-xl border border-white/5">
                        <div>
                            <h4 className="text-white font-bold mb-1">Inteligência Artificial (Mentor)</h4>
                            <p className="text-xs text-gray-400 max-w-md">Permite que a IA analise seus documentos para sugerir correções e estratégias de defesa de multas.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={settings.aiAnalysis} onChange={() => handleToggle('aiAnalysis')} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </div>

                    {/* Toggle Item 3 */}
                    <div className="flex items-start justify-between p-4 bg-slate-800 rounded-xl border border-white/5">
                        <div>
                            <h4 className="text-white font-bold mb-1">Gravação de Imagens (Nexus)</h4>
                            <p className="text-xs text-gray-400 max-w-md">Armazenamento em nuvem das imagens capturadas pelas câmeras de segurança conectadas.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={settings.cameraRecording} onChange={() => handleToggle('cameraRecording')} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </div>

                    {/* Toggle Item 4 */}
                    <div className="flex items-start justify-between p-4 bg-slate-800 rounded-xl border border-white/5">
                        <div>
                            <h4 className="text-white font-bold mb-1">Comunicações de Marketing</h4>
                            <p className="text-xs text-gray-400 max-w-md">Receber ofertas de parceiros (Seguradoras, Postos) e novidades do sistema.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={settings.marketing} onChange={() => handleToggle('marketing')} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </div>

                    <div className="text-right text-xs text-gray-500 mt-4">
                        Última atualização: {new Date(settings.lastUpdated).toLocaleString()}
                    </div>
                </div>
            )}

            {activeTab === 'policy' && (
                <div className="prose prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 max-w-3xl mx-auto">
                    <h3 className="text-rota-gold font-display text-2xl mb-4">Política de Privacidade HELONEX</h3>
                    <p className="text-xs text-gray-500 mb-6">Versão 2.1 • Vigência: 2025</p>

                    <h4>1. Introdução e Compromisso</h4>
                    <p>
                        A HELONEX (Assessoria Nacional ao Transporte Terrestre) está comprometida com a proteção de dados, conforme a Lei 13.709/2018 (LGPD). 
                        Nossa base de tratamento é o <strong>Legítimo Interesse</strong> e a <strong>Execução de Contrato</strong> para serviços regulatórios.
                    </p>

                    <h4>2. Dados Coletados</h4>
                    <ul>
                        <li><strong>Dados Pessoais:</strong> Nome, CPF, CNH, Endereço (para cadastro na ANTT/Gov.br).</li>
                        <li><strong>Dados de Frota:</strong> Placas, Renavam, CRLV (para licenciamento).</li>
                        <li><strong>Biometria:</strong> Facial (para prova de vida Gov.br, quando autorizado).</li>
                        <li><strong>Imagens:</strong> Capturas de CFTV do módulo Nexus (apenas se ativado).</li>
                    </ul>

                    <h4>3. Finalidade do Tratamento</h4>
                    <p>
                        Utilizamos seus dados exclusivamente para:
                        1. Processar registros junto à ANTT e órgãos de trânsito.
                        2. Monitorar vencimentos de documentos (Guardião).
                        3. Fornecer análise jurídica via IA (Mentor).
                    </p>

                    <h4>4. Compartilhamento</h4>
                    <p>
                        Compartilhamos dados estritamente necessários com:
                        - ANTT (Agência Nacional de Transportes Terrestres).
                        - SERPRO (Datavalid/Gov.br).
                        - Seguradoras Parceiras (apenas mediante solicitação de cotação).
                    </p>

                    <h4>5. Seus Direitos (Art. 18 LGPD)</h4>
                    <p>
                        Você tem direito a confirmar a existência de tratamento, acessar os dados, corrigir dados incompletos, e solicitar a portabilidade ou eliminação (respeitados os prazos legais de guarda fiscal).
                    </p>

                    <h4>6. Encarregado de Dados (DPO)</h4>
                    <p>
                        Para questões de privacidade, contate nosso DPO em: dpo@helonex.global.
                    </p>
                </div>
            )}

            {activeTab === 'data' && (
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="bg-slate-800 p-6 rounded-xl border border-white/5 text-center">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400">
                            <Download size={32} />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Portabilidade de Dados</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Baixe um arquivo JSON contendo todo o histórico da sua empresa, frota e motoristas armazenados em nossos servidores.
                        </p>
                        <button onClick={handleExportData} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2 mx-auto">
                            <FileText size={18} /> Baixar Meus Dados
                        </button>
                    </div>

                    <div className="bg-red-900/10 p-6 rounded-xl border border-red-500/30 text-center">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
                            <Trash2 size={32} />
                        </div>
                        <h3 className="text-red-400 font-bold text-lg mb-2">Zona de Perigo: Exclusão de Conta</h3>
                        <p className="text-red-200/70 text-sm mb-6">
                            Solicitar a exclusão permanente dos seus dados. Atenção: Isso impedirá o monitoramento de multas e vencimentos, podendo gerar prejuízos legais.
                        </p>
                        <button onClick={handleDeleteRequest} className="px-6 py-3 bg-transparent border border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-bold rounded-lg transition-colors flex items-center gap-2 mx-auto">
                            <AlertTriangle size={18} /> Solicitar Exclusão
                        </button>
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default PrivacyCenter;