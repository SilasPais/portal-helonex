
import { Metric, ProcessStats, AnalysisResult, Zone } from '../types';

// Mock Database (In-Memory)
let metricsHistory: Record<string, Metric[]> = {};
let processDefinitions: ProcessStats[] = [
  { id: 'PROC-001', name: 'Tempo de Resposta SUE', mean: 24, stdDev: 4, history: [] }, // Horas
  { id: 'PROC-002', name: 'Custo por KM (Frota)', mean: 3.80, stdDev: 0.50, history: [] }, // R$
  { id: 'PROC-003', name: 'Taxa de Deferimento JusTech', mean: 85, stdDev: 5, history: [] }, // %
  { id: 'PROC-004', name: 'Engajamento EduTech', mean: 70, stdDev: 10, history: [] }, // %
];

// Helper: Calculate Z-Score
const calculateZScore = (value: number, mean: number, stdDev: number): number => {
  if (stdDev === 0) return 0;
  return (value - mean) / stdDev;
};

// Helper: Determine Zone
const determineZone = (zScore: number): Zone => {
  const absZ = Math.abs(zScore);
  if (absZ <= 1) return 'GREEN';
  if (absZ <= 2) return 'YELLOW';
  return 'RED';
};

// Core Engine
export const helonexCore = {
  
  // 1. Monitoramento Ativo (Ingestão de Dados)
  ingestMetric: (metric: Metric): AnalysisResult => {
    const process = processDefinitions.find(p => p.id === metric.id);
    if (!process) {
      throw new Error(`Processo não monitorado: ${metric.id}`);
    }

    // Armazena histórico
    if (!metricsHistory[metric.id]) metricsHistory[metric.id] = [];
    metricsHistory[metric.id].push(metric);

    // Calcula Z-Score
    const zScore = calculateZScore(metric.value, process.mean, process.stdDev);
    const zone = determineZone(zScore);

    // Lógica de Ação (Protocolo PDCA)
    let actionRequired = false;
    let suggestedAction = undefined;

    if (zone === 'YELLOW') {
      actionRequired = true;
      suggestedAction = "Alerta Preventivo: Iniciar análise de tendência e reforçar controles.";
    } else if (zone === 'RED') {
      actionRequired = true;
      suggestedAction = "Ação Corretiva Imediata: Bloqueio de processo e auditoria de causa raiz.";
    }

    return {
      metricId: metric.id,
      zScore,
      zone,
      actionRequired,
      suggestedAction
    };
  },

  // 2. Recuperação de Estado (Dashboard)
  getSystemHealth: () => {
    return processDefinitions.map(proc => {
      const history = metricsHistory[proc.id] || [];
      const lastMetric = history[history.length - 1];
      
      if (!lastMetric) return { ...proc, status: 'NO_DATA' };

      const zScore = calculateZScore(lastMetric.value, proc.mean, proc.stdDev);
      const zone = determineZone(zScore);

      return {
        ...proc,
        currentValue: lastMetric.value,
        zScore,
        zone,
        lastUpdate: lastMetric.timestamp
      };
    });
  },

  // 3. Simulação de Aprendizado (Refinar Média)
  recalibrateProcess: (processId: string) => {
    const history = metricsHistory[processId];
    if (!history || history.length < 10) return; // Precisa de amostra mínima

    const sum = history.reduce((acc, curr) => acc + curr.value, 0);
    const newMean = sum / history.length;
    
    // Atualiza definição
    const procIndex = processDefinitions.findIndex(p => p.id === processId);
    if (procIndex >= 0) {
      processDefinitions[procIndex].mean = newMean;
      // Recalcular desvio padrão seria o ideal aqui também
    }
  }
};
