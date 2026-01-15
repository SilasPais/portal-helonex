
import { MaturityLevel } from '../types';

const DB_VERSION = '1.7.0';
const DB_KEY = 'guardian_db_v1';

const MOCK_DB = {
  version: DB_VERSION,
  company: {
    id: 'comp_123',
    name: 'TransSilva Logística',
    cnpj: '12.345.678/0001-90',
    type: 'ETC',
    profileSegment: 'CARGO_PROVIDER',
    operationMode: 'TRRC',
    iqtScore: 85,
    maturityLevel: MaturityLevel.QUALIFICADO,
    activeModules: ['RNTRC', 'SASSMAQ'],
    documents: [],
    vehicles: [],
    drivers: []
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
    if (!stored || stored === 'undefined' || stored === 'null') {
      return MOCK_DB;
    }
    const parsed = JSON.parse(stored);
    if (parsed.version !== DB_VERSION) {
      localStorage.removeItem(DB_KEY);
      return MOCK_DB;
    }
    return parsed;
  } catch (e) {
    return MOCK_DB;
  }
};

export const guardianEngine = {
  getCompanyData: () => loadDatabase().company,
  getAllEnrollments: () => loadDatabase().enrollments || [],
  getAllProcedures: () => loadDatabase().procedures || [],
  getAllPartners: () => loadDatabase().partners || [],
  getMonitriipAudit: () => loadDatabase().monitriipLogs || [],
  getClientComplianceStatus: () => loadDatabase().clientCompliance || [],
  getAllOffers: () => loadDatabase().marketplace || [],
  getNonConformities: () => loadDatabase().company?.nonConformities || [],
  getBSCIndicators: () => loadDatabase().company?.bsc || [],
  getQualityMultipliers: () => loadDatabase().company?.qualityMultipliers || [],
  updateEnrollment: (id: string, updates: any) => {},
  saveProcedure: (proc: any) => {},
  addPartner: (p: any) => {},
  updatePrivacySettings: (s: any) => {},
  exportUserData: () => JSON.stringify(loadDatabase()),
  addNonConformity: (nc: any) => {},
  saveValuation: (data: any) => true,
  hardReset: () => {
    localStorage.clear();
    location.reload();
  }
};
