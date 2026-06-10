
import React, { useState, useEffect } from 'react';
import { 
  Eye, Shield, AlertTriangle, CheckCircle, 
  Play, BookOpen, Camera, Activity, 
  ArrowLeft, Bell, Settings, History, X
} from 'lucide-react';
import { VisionAnalysis } from '../types';

interface HelonexVisionProps {
  onBack: () => void;
}

const MOCK_ANALYSES: VisionAnalysis[] = [
  {
    id: 'V-001',
    timestamp: new Date().toISOString(),
    scenario: 'Cabine do Veículo ABC-1234',
    detectedIssue: 'Motorista sem cinto de segurança em movimento',
    normativeReference: 'SASSMAQ 4.2.1 (Segurança do Condutor)',
    severity: 'HIGH',
    suggestedAction: 'Alerta sonoro imediato na cabine e registro de infração administrativa.',
    trainingModuleId: 'T-042',
    status: 'OPEN',
    imageUrl: 'https://picsum.photos/seed/vision1/400/300'
  },
  {
    id: 'V-002',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    scenario: 'Pátio de Carga - Docas 04',
    detectedIssue: 'Operador sem capacete em área de risco',
    normativeReference: 'ISO 45001 / NR-06',
    severity: 'MEDIUM',
    suggestedAction: 'Notificar supervisor de pátio e bloquear acesso à doca.',
    trainingModuleId: 'T-015',
    status: 'OPEN',
    imageUrl: 'https://picsum.photos/seed/vision2/400/300'
  }
];

const HelonexVision: React.FC<HelonexVisionProps> = ({ onBack }) => {
  const [analyses, setAnalyses] = useState<VisionAnalysis[]>(MOCK_ANALYSES);
  const [isLive, setIsLive] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState<VisionAnalysis | null>(null);

  // Simulação de detecção em tempo real
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      // Aqui entraria a lógica real de processamento de imagem
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isLive]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-500 border-red-500 bg-red-500/10';
      case 'HIGH': return 'text-orange-500 border-orange-500 bg-orange-500/10';
      case 'MEDIUM': return 'text-yellow-500 border-yellow-500 bg-yellow-500/10';
      default: return 'text-blue-500 border-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Voltar
            </button>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center gap-3">
              <Eye className="text-hlx-gold" size={36} /> Helonex Vision <span className="text-xs bg-hlx-gold/20 text-hlx-gold px-2 py-1 rounded-full font-mono">v1.0</span>
            </h1>
            <p className="text-gray-400 mt-2">Auditoria Visual por IA integrada a Normas ISO/SASSMAQ</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-900 border border-white/10 p-2 rounded-xl">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></div>
              <span className="text-xs font-bold text-white uppercase tracking-widest">{isLive ? 'Live Monitoring' : 'Paused'}</span>
            </div>
            <button className="p-3 bg-slate-900 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feed / Analysis */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Live Feed Simulator */}
            <div className="relative aspect-video bg-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl group">
              <img 
                src="https://picsum.photos/seed/security/1280/720" 
                alt="Live Feed" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              
              {/* Overlay UI */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Camera size={14} className="text-red-500" />
                <span className="text-[10px] font-mono text-white">CAM-04: PÁTIO PRINCIPAL</span>
              </div>
              
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <Activity size={14} className="text-hlx-gold" />
                <span className="text-[10px] font-mono text-white">AI CONFIDENCE: 98.4%</span>
              </div>

              {/* Bounding Box Simulation */}
              <div className="absolute top-1/4 left-1/3 w-32 h-48 border-2 border-hlx-gold rounded-lg animate-pulse">
                <div className="absolute -top-6 left-0 bg-hlx-gold text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  HUMAN: UNPROTECTED
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsLive(!isLive)} className="p-3 bg-white text-slate-950 rounded-full hover:bg-hlx-gold transition-colors">
                    {isLive ? <X size={20} /> : <Play size={20} />}
                  </button>
                  <div className="text-white">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-60">Status do Sistema</p>
                    <p className="text-sm font-mono">Processando Fluxo Normativo...</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-slate-800/80 backdrop-blur-md text-white border border-white/10 rounded-lg text-xs font-bold hover:bg-slate-700 transition-all">
                  Alternar Câmera
                </button>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <Bell size={20} className="text-hlx-gold" /> Alertas de Não-Conformidade (Real-Time)
              </h3>
              
              <div className="space-y-4">
                {analyses.map((analysis) => (
                  <div 
                    key={analysis.id}
                    onClick={() => setSelectedAnalysis(analysis)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedAnalysis?.id === analysis.id ? 'bg-slate-800 border-hlx-gold' : 'bg-slate-950/50 border-white/5 hover:border-white/20'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                          <img src={analysis.imageUrl} alt="Evidence" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getSeverityColor(analysis.severity)}`}>
                              {analysis.severity}
                            </span>
                            <span className="text-[10px] text-gray-500 font-mono">{new Date(analysis.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <h4 className="text-white font-bold text-sm">{analysis.detectedIssue}</h4>
                          <p className="text-xs text-hlx-gold font-mono mt-1">{analysis.normativeReference}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                         <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20 font-bold uppercase">Ação Proposta</span>
                         <button className="p-2 text-gray-400 hover:text-white"><History size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Action & Training */}
          <div className="space-y-6">
            
            {/* Selected Analysis Detail */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                <Shield size={20} className="text-hlx-blue" /> Protocolo de Ação
              </h3>
              
              {selectedAnalysis ? (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Cenário</label>
                    <p className="text-sm text-white font-medium">{selectedAnalysis.scenario}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Ação Corretiva Sugerida</label>
                    <div className="p-3 bg-slate-950 border border-white/5 rounded-lg">
                      <p className="text-sm text-gray-300 italic">"{selectedAnalysis.suggestedAction}"</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-hlx-gold/20 rounded-lg flex items-center justify-center text-hlx-gold">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm">Micro-Treinamento</h4>
                        <p className="text-[10px] text-gray-500">Conteúdo Contextual Disponível</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">
                      O sistema identificou que este desvio pode ser corrigido com o módulo de 15 minutos sobre <strong>Segurança em Operações de Pátio</strong>.
                    </p>
                    <button className="w-full py-3 bg-hlx-gold text-slate-900 font-bold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 text-sm uppercase">
                      <Play size={16} /> Aplicar Treinamento
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-2 bg-slate-800 text-white text-xs font-bold rounded-lg border border-white/10 hover:bg-slate-700 transition-all">
                      Ignorar Falso Positivo
                    </button>
                    <button className="py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-500 transition-all flex items-center justify-center gap-1">
                      <CheckCircle size={14} /> Validar Ação
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle size={48} className="text-gray-700 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">Selecione um alerta para ver o protocolo de ação.</p>
                </div>
              )}
            </div>

            {/* Stats / Compliance */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Compliance Visual</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">SASSMAQ (Geral)</span>
                    <span className="text-hlx-gold font-bold">92%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-hlx-gold h-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">ISO 45001 (Segurança)</span>
                    <span className="text-green-400 font-bold">88%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-400 h-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-2 text-hlx-blue text-xs font-bold hover:underline">
                Ver Relatório de Auditoria Completo
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default HelonexVision;
