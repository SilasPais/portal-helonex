
import { MaturityLevel, Enrollment, StandardProcedure, Partner, MonitriipLog, ClientComplianceStatus, MarketplaceOffer, BSCIndicator, NonConformity, QualityMultiplier, PrivacySettings } from '../types';

// VERSÃO DE BACKUP ESTÁVEL DE 12/01/2026
const DB_VERSION = '1.6.0_STABLE';
const DB_KEY = 'rota66_stable_backup';

const MOCK_DB = {
  version: DB_VERSION,
  company: {
    id: 'comp_123',
    name: 'ROTA 66 BRASIL - UNIDADE PILOTO',
    cnpj: '12.345.678/0001-90',
    type: 'ETC',
    profileSegment: 'CARGO_PROVIDER',
    operationMode: 'TRRC',
    iqtScore: 100,
    maturityLevel: MaturityLevel.EXPONENCIAL,
    activeModules: ['RNTRC', 'SASSMAQ', 'MONITRIIP', 'JUSTECH'],
    documents: [],
    vehicles: [],
    drivers: [],
    privacySettings: {
        dataProcessing: true,
        aiAnalysis: true,
        cameraRecording: true,
        marketing: true,
        lastUpdated: '2026-01-12T10:00:00Z'
    }
  },
  enrollments: [],
  procedures: [],
  partners: [],
  monitriipLogs: [],
  clientCompliance: [],
  marketplace: []
};

const loadDatabase = (): any => {
  try {
    const stored = localStorage.getItem(DB_KEY);
    if (!stored) {
      localStorage.setItem(DB_KEY, JSON.stringify(MOCK_DB));
      return MOCK_DB;
    }
    return JSON.parse(stored);
  } catch (e) {
    return MOCK_DB;
  }
};

const saveDatabase = (db: any) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const guardianEngine = {
  getCompanyData: () => loadDatabase().company,
  
  // Fix: Added missing methods for Admin and Dashboard components
  getAllEnrollments: (): Enrollment[] => loadDatabase().enrollments || [],
  
  updateEnrollment: (id: string, updates: Partial<Enrollment>) => {
    const db = loadDatabase();
    db.enrollments = db.enrollments.map((e: Enrollment) => e.id === id ? { ...e, ...updates } : e);
    saveDatabase(db);
  },

  getAllProcedures: (): StandardProcedure[] => loadDatabase().procedures || [],
  
  saveProcedure: (proc: StandardProcedure) => {
    const db = loadDatabase();
    const index = db.procedures.findIndex((p: any) => p.id === proc.id);
    if (index >= 0) db.procedures[index] = proc;
    else db.procedures.push(proc);
    saveDatabase(db);
  },

  getAllPartners: (): Partner[] => loadDatabase().partners || [],
  
  addPartner: (partner: Partner) => {
    const db = loadDatabase();
    db.partners.push(partner);
    saveDatabase(db);
  },

  getMonitriipAudit: (): MonitriipLog[] => loadDatabase().monitriipLogs || [],
  
  getClientComplianceStatus: (): ClientComplianceStatus[] => loadDatabase().clientCompliance || [],

  getAllOffers: (): MarketplaceOffer[] => loadDatabase().marketplace || [],

  getBSCIndicators: (): BSCIndicator[] => loadDatabase().company.bsc || [],

  getNonConformities: (): NonConformity[] => loadDatabase().company.nonConformities || [],

  addNonConformity: (nc: NonConformity) => {
    const db = loadDatabase();
    if (!db.company.nonConformities) db.company.nonConformities = [];
    db.company.nonConformities.push(nc);
    saveDatabase(db);
  },

  getQualityMultipliers: (): QualityMultiplier[] => loadDatabase().company.qualityMultipliers || [],

  updatePrivacySettings: (settings: PrivacySettings) => {
    const db = loadDatabase();
    db.company.privacySettings = settings;
    saveDatabase(db);
  },

  exportUserData: () => JSON.stringify(loadDatabase()),

  saveValuation: (data: any) => {
    const db = loadDatabase();
    db.company.valuationDiagnostic = data;
    saveDatabase(db);
    return true;
  },

  hardReset: () => {
    localStorage.clear();
    location.reload();
  }
};
