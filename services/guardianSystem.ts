
// ... (Imports existentes)
import { 
  CompanyProfile, Vehicle, Driver, GuardianAlert, Document, DocStatus, NewsItem, Enrollment, 
  GovData, Infraction, Debt, InstallmentPlan, Transaction, Invoice, ServiceItem, PaymentMethod, 
  Employee, TripValidationResult, CargoType, Device, StandardProcedure, PrivacySettings, 
  ProcedureScope, Partner, MarketplaceOffer, PassengerProfile, TravelPackage, MonitriipLog, 
  ClientComplianceStatus, EFrotasEvent, WeighingEvent, VehicleChecklist, ChecklistItem, 
  BSCIndicator, NonConformity, ActionPlan5W2H, QualityMultiplier, TransportRoute, GeoPoint, 
  MaturityLevel, QualitySealData, PassengerLevel, SmartNotification, ValuationDiagnostic, PartnerCategory 
} from '../types';

interface Database {
  version?: string; // Novo campo para controle de versão
  company: CompanyProfile;
  alerts: GuardianAlert[];
  marketplace: MarketplaceOffer[];
  news: NewsItem[];
  procedures: StandardProcedure[];
  partners: Partner[];
  monitriipLogs: MonitriipLog[];
  clientCompliance: ClientComplianceStatus[];
  enrollments: Enrollment[];
}

const DB_VERSION = '1.6.0'; // Incremento de versão para forçar reset se necessário

// --- MOCK DATABASE ---
const MOCK_DB: Database = {
  version: DB_VERSION,
  company: {
    id: 'comp_123',
    name: 'TransSilva Logística',
    cnpj: '12.345.678/0001-90',
    email: 'contato@transsilva.com',
    phone: '(11) 99999-9999',
    address: 'Rodovia BR-116, Km 200, Guarulhos - SP',
    type: 'ETC',
    profileSegment: 'CARGO_PROVIDER',
    operationMode: 'TRRC',
    state: 'SP',
    documents: [
      { id: 'doc1', type: 'RNTRC', number: '12345678', expiryDate: '2026-10-15', status: 'VALID' },
      { id: 'doc2', type: 'Alvará', number: '987654', expiryDate: '2025-12-31', status: 'VALID' }
    ],
    vehicles: [
      { id: 'v1', plate: 'ABC-1234', model: 'Scania R450', year: 2020, type: 'TRUCK', rntrcStatus: 'VALID', insuranceStatus: 'VALID' },
      { id: 'v2', plate: 'XYZ-9876', model: 'Volvo FH540', year: 2022, type: 'TRUCK', rntrcStatus: 'EXPIRING', insuranceStatus: 'VALID' }
    ],
    drivers: [
      { 
        id: 'd1', 
        name: 'João da Silva', 
        cnh: '12345678900', 
        cnhCategory: 'E', 
        cnhExpiry: '2026-05-20', 
        mopp: true, 
        toxicologyStatus: 'VALID',
        photoUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        neuroStatus: {
            status: 'FATIGUE',
            attentionLevel: 45,
            stressLevel: 80,
            heartRate: 110,
            lastBlinkRate: 42
        }
      },
      { 
        id: 'd2', 
        name: 'Carlos Mendes', 
        cnh: '98765432100', 
        cnhCategory: 'E', 
        cnhExpiry: '2027-01-15', 
        mopp: true, 
        toxicologyStatus: 'VALID',
        photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        neuroStatus: {
            status: 'FOCUS',
            attentionLevel: 92,
            stressLevel: 15,
            heartRate: 72,
            lastBlinkRate: 15
        }
      }
    ],
    iqtScore: 85,
    iqtHistory: [{ date: '2025-01', score: 80 }, { date: '2025-02', score: 85 }],
    maturityLevel: MaturityLevel.QUALIFICADO,
    qualitySeal: {
      level: MaturityLevel.QUALIFICADO,
      levelName: 'Selo Prata (Consolidado)',
      score: 85,
      hash: 'hlx-verify-12345',
      validUntil: '2026-12-31'
    },
    activeModules: ['RNTRC', 'SASSMAQ', 'FINANCEIRO'],
    privacySettings: {
      dataProcessing: true,
      aiAnalysis: true,
      cameraRecording: false,
      marketing: true,
      lastUpdated: new Date().toISOString()
    }
  },
  alerts: [
    { id: 'a1', severity: 'high', title: 'RNTRC Vencendo', message: 'O veículo XYZ-9876 tem RNTRC vencendo em 15 dias.', date: '2025-10-01', actionUrl: '/services/rntrc' }
  ],
  marketplace: [
    {
      id: 'off1',
      title: 'Diesel S10 com 5% de Desconto',
      description: 'Rede de Postos Graal em todo o Brasil.',
      category: 'Combustivel',
      partnerId: 'p1',
      publicPrice: 6.20,
      memberPrice: 5.89,
      targetRules: { isPublicAvailable: true }
    },
    {
      id: 'off2',
      title: 'Seguro de Carga RCTR-C',
      description: 'Tabela reduzida para transportadores com Selo Prata.',
      category: 'Seguros',
      partnerId: 'p2',
      publicPrice: 5000,
      memberPrice: 3500,
      targetRules: { isPublicAvailable: true }
    }
  ],
  news: [],
  procedures: [
    {
      id: 'proc1',
      code: 'POP-MAN-001',
      type: 'POP',
      scope: 'INTERNAL',
      title: 'Manutenção Preventiva de Frota',
      objective: 'Padronizar a revisão de veículos a cada 10.000km.',
      version: '1.2',
      lastUpdate: '2025-09-10',
      content: '# Procedimento de Manutenção\n1. Verificar óleo.\n2. Calibrar pneus.',
      tags: ['manutencao', 'frota']
    }
  ],
  partners: [
    { id: 'p1', name: 'Rede Graal', category: 'Combustivel', active: true, commissionRate: 2.0 },
    { id: 'p2', name: 'Porto Seguro', category: 'Seguros', active: true, commissionRate: 5.0 }
  ],
  monitriipLogs: [
    { id: 'log1', vehicleId: 'ABC-1234', routeId: 'rt1', timestamp: '2025-10-15T10:00:00Z', status: 'SENT', details: 'Pacote enviado com sucesso.' },
    { id: 'log2', vehicleId: 'XYZ-9876', routeId: 'rt1', timestamp: '2025-10-15T10:05:00Z', status: 'ERROR', details: 'Falha de conexão 4G.' }
  ],
  clientCompliance: [
    {
      clientId: 'comp_123',
      companyName: 'TransSilva Logística',
      cnpj: '12.345.678/0001-90',
      poaStatus: { govBr: 'active', wsDenatran: 'active', expiryDate: '2026-12-31' }
    }
  ],
  enrollments: [
    {
      id: 'enr1',
      studentName: 'Carlos Motorista',
      courseName: 'MOPP Atualização',
      partnerName: 'EAD Parceiro',
      requestDate: '2025-10-10',
      status: 'pending',
      financials: { value: 150, paymentStatus: 'pending', paymentMethod: 'pix' }
    }
  ]
};

// Simulate local storage persistence com Schema Merging e Version Check
const loadDatabase = (): Database => {
  try {
    const stored = localStorage.getItem('guardian_db');
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // SAFETY CHECK: Se a versão for diferente, reseta o banco para evitar crash
      if (parsed.version !== DB_VERSION) {
          console.warn(`Versão do Banco Antiga (${parsed.version}). Atualizando para ${DB_VERSION}...`);
          // Poderíamos migrar dados aqui, mas para segurança agora, vamos resetar ou mesclar com cuidado
          // Optando por Fusão com Prioridade no MOCK para garantir estrutura nova
          const merged = {
            ...MOCK_DB,
            ...parsed,
            version: DB_VERSION, // Atualiza versão
            company: { ...MOCK_DB.company, ...(parsed.company || {}) },
            // Garante arrays
            monitriipLogs: parsed.monitriipLogs || MOCK_DB.monitriipLogs,
            clientCompliance: parsed.clientCompliance || MOCK_DB.clientCompliance,
            enrollments: parsed.enrollments || MOCK_DB.enrollments,
            partners: parsed.partners || MOCK_DB.partners,
            procedures: parsed.procedures || MOCK_DB.procedures
          };
          saveDatabase(merged);
          return merged;
      }

      return {
        ...MOCK_DB,
        ...parsed,
        company: { ...MOCK_DB.company, ...(parsed.company || {}) }
      };
    }
  } catch (e) {
    console.error("Database corrupted, resetting...", e);
    localStorage.removeItem('guardian_db');
  }
  return MOCK_DB;
};

const saveDatabase = (db: Database) => {
  try {
    localStorage.setItem('guardian_db', JSON.stringify(db));
  } catch (e) {
    console.error("Error saving database", e);
  }
};

export const guardianEngine = {
  getCompanyData: (): CompanyProfile => {
    return loadDatabase().company;
  },

  getAllEnrollments: (): Enrollment[] => {
    return loadDatabase().enrollments;
  },

  updateEnrollment: (id: string, updates: Partial<Enrollment>) => {
    const db = loadDatabase();
    const index = db.enrollments.findIndex(e => e.id === id);
    if (index !== -1) {
      db.enrollments[index] = { ...db.enrollments[index], ...updates };
      saveDatabase(db);
    }
  },

  getAllProcedures: (): StandardProcedure[] => {
    return loadDatabase().procedures;
  },

  saveProcedure: (proc: StandardProcedure) => {
    const db = loadDatabase();
    const index = db.procedures.findIndex(p => p.id === proc.id);
    if (index !== -1) {
      db.procedures[index] = proc;
    } else {
      db.procedures.push(proc);
    }
    saveDatabase(db);
  },

  getAllPartners: (): Partner[] => {
    return loadDatabase().partners;
  },

  addPartner: (partner: Partner) => {
    const db = loadDatabase();
    db.partners.push(partner);
    saveDatabase(db);
  },

  getMonitriipAudit: (): MonitriipLog[] => {
    return loadDatabase().monitriipLogs;
  },

  getClientComplianceStatus: (): ClientComplianceStatus[] => {
    return loadDatabase().clientCompliance;
  },

  updatePrivacySettings: (settings: PrivacySettings) => {
    const db = loadDatabase();
    db.company.privacySettings = settings;
    saveDatabase(db);
  },

  exportUserData: (): string => {
    const db = loadDatabase();
    const exportData = {
      company: db.company,
      alerts: db.alerts,
      timestamp: new Date().toISOString()
    };
    return JSON.stringify(exportData, null, 2);
  },

  getAllOffers: (): MarketplaceOffer[] => {
    return loadDatabase().marketplace;
  },

  getBSCIndicators: (): BSCIndicator[] => {
    const db = loadDatabase();
    return db.company.bsc || [];
  },

  getNonConformities: (): NonConformity[] => {
    const db = loadDatabase();
    return db.company.nonConformities || [];
  },

  addNonConformity: (nc: NonConformity) => {
    const db = loadDatabase();
    if (!db.company.nonConformities) {
      db.company.nonConformities = [];
    }
    db.company.nonConformities.push(nc);
    saveDatabase(db);
  },

  getQualityMultipliers: (): QualityMultiplier[] => {
    const db = loadDatabase();
    return db.company.qualityMultipliers || [
        { id: 'u1', name: 'João Silva', role: 'Gerente', points: 1200, badges: ['Auditor Líder'] },
        { id: 'u2', name: 'Maria Souza', role: 'Analista', points: 850, badges: ['Especialista 5S'] }
    ];
  },

  saveValuation: (data: any) => {
    const db = loadDatabase();
    const valData: ValuationDiagnostic = {
        id: `val_${Date.now()}`,
        date: new Date().toISOString(),
        answers: data.details,
        score: {
            tangibleValue: data.tangibleValue,
            intangibleValue: data.intangibleValue,
            potentialGrowth: data.potentialGrowth,
            rating: data.rating
        },
        status: 'completed'
    };
    db.company.valuationDiagnostic = valData;
    saveDatabase(db);
    return true;
  },

  getValuationData: (): ValuationDiagnostic | undefined => {
    return loadDatabase().company.valuationDiagnostic;
  },
  
  // Função de Emergência para Resetar via Console
  hardReset: () => {
      localStorage.removeItem('guardian_db');
      window.location.reload();
  }
};
