
import React, { useState, useRef, useEffect } from 'react';
import { Download, Upload, ShieldCheck, AlertTriangle, CheckCircle, Save, Database, Clock, RefreshCw } from 'lucide-react';
import { guardianEngine } from '../services/guardianSystem';

interface BackupManagerProps {
  onClose: () => void;
}

const BackupManager: React.FC<BackupManagerProps> = ({ onClose }) => {
  const [status, setStatus] = useState<'OK' | 'WARNING' | 'CRITICAL'>('OK');
  const [lastBackup, setLastBackup] = useState<string>('Nunca realizado');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const health = guardianEngine.checkBackupHealth();
    setStatus(health);
    
    const lastDate = localStorage.getItem('helonex_last_backup_date');
    if (lastDate) {
        setLastBackup(new Date(lastDate).toLocaleString());
    }
  }, []);

  const handleDownload = () => {
    const data = guardianEngine.createBackupPayload();
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `HELONEX_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      // Atualiza estado visual
      setStatus('OK');
      setLastBackup(new Date().toLocaleString());
      alert("✅ Backup salvo com sucesso! Guarde este arquivo em local seguro (Google Drive/OneDrive).");
    }, 100);
  };

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
            if (confirm("⚠️ ATENÇÃO: Restaurar um backup substituirá TODOS os dados atuais.\n\nDeseja continuar?")) {
                const result = guardianEngine.restoreBackupPayload(content);
                if (result.success) {
                    alert(result.message);
                    window.location.reload(); // Recarrega para aplicar mudanças
                } else {
                    alert("Erro: " + result.message);
                }
            }
        }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in-up">
      <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        <div className="p-6 border-b border-white/10 bg-slate-950 flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${status === 'OK' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                 <Database size={24} />
              </div>
              <div>
                 <h2 className="text-xl font-bold text-white">Central de Backup</h2>
                 <p className="text-xs text-gray-400">Protocolo ARCA: Segurança de Dados</p>
              </div>
           </div>
           <button onClick={onClose} className="text-gray-400 hover:text-white font-bold text-xl">&times;</button>
        </div>

        <div className="p-8 space-y-8">
           
           {/* Status Card */}
           <div className={`p-4 rounded-xl border flex items-start gap-4 ${status === 'OK' ? 'bg-green-900/10 border-green-500/30' : 'bg-red-900/10 border-red-500/30'}`}>
              {status === 'OK' ? <CheckCircle size={24} className="text-green-400 mt-1" /> : <AlertTriangle size={24} className="text-red-400 mt-1" />}
              <div>
                 <h4 className={`font-bold ${status === 'OK' ? 'text-green-400' : 'text-red-400'}`}>
                    {status === 'OK' ? 'Sistema Protegido' : 'Risco de Perda de Dados'}
                 </h4>
                 <p className="text-sm text-gray-300 mt-1">
                    Último Backup: <strong>{lastBackup}</strong>
                 </p>
                 {status !== 'OK' && <p className="text-xs text-red-300 mt-2 font-bold animate-pulse">Recomendamos fazer um backup IMEDIATAMENTE.</p>}
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              {/* Botão Exportar */}
              <button 
                onClick={handleDownload}
                className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-800 hover:bg-slate-700 border border-white/5 rounded-xl transition-all group"
              >
                 <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Download size={24} />
                 </div>
                 <div className="text-center">
                    <span className="block font-bold text-white">Fazer Backup</span>
                    <span className="text-xs text-gray-500">Baixar arquivo .JSON</span>
                 </div>
              </button>

              {/* Botão Restaurar */}
              <button 
                onClick={handleRestoreClick}
                className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-800 hover:bg-slate-700 border border-white/5 rounded-xl transition-all group"
              >
                 <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                 </div>
                 <div className="text-center">
                    <span className="block font-bold text-white">Restaurar</span>
                    <span className="text-xs text-gray-500">Carregar arquivo</span>
                 </div>
                 <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".json" 
                    onChange={handleFileChange}
                 />
              </button>
           </div>

           <div className="bg-slate-950 p-4 rounded-lg border border-white/5 text-xs text-gray-500 flex gap-2">
              <Clock size={16} className="shrink-0" />
              <p>
                 A estabilidade do sistema depende do armazenamento local do seu navegador. 
                 Em caso de "Erro de Memória", faça o backup, limpe o cache do navegador e depois restaure o arquivo.
              </p>
           </div>

        </div>
      </div>
    </div>
  );
};

export default BackupManager;
