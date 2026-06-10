
import { AetcRequest, AetcStatus, CompanyProfile, BSCIndicator, NonConformity, QualityMultiplier, Enrollment, MarketplaceOffer, SafeStop, DocumentationDoc, Vehicle, TaxDocument } from '../types';

const DB_KEY = 'helonex_v2_soberana_stable';

const INITIAL_AETC_REQUESTS: AetcRequest[] = [
  {
    id: 'AETC-SP-1001',
    clientName: 'Transportes Silva ETC',
    plate: 'GOL-2026',
    modalityId: 'VUC',
    status: 'DEFERIDO',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-15T15:00:00Z',
    expiryDate: '2027-01-15',
    financeStatus: 'PAID',
    documents: [
      { name: 'CRLV', status: 'VALIDATED' },
      { name: 'Contrato Social', status: 'VALIDATED' }
    ],
    prefeituraProtocol: 'SUE-CET-889922'
  },
  {
    id: 'AETC-SP-2005',
    clientName: 'João Tow Service',
    plate: 'HLX-0001',
    modalityId: 'GUINCHO',
    status: 'ANALISE_TECNICA',
    createdAt: '2026-03-05T09:00:00Z',
    updatedAt: '2026-03-12T11:20:00Z',
    financeStatus: 'PAID',
    documents: [
      { name: 'CRLV (Giroflex)', status: 'UPLOADED' },
      { name: 'RG Proprietário', status: 'UPLOADED' }
    ]
  }
];

const loadDatabase = (): any => {
  try {
    const stored = localStorage.getItem(DB_KEY);
    if (!stored) {
        const initial = { 
          company: { 
            name: 'Helonex Demo', 
            cnpj: '21.840.788/0001-14', 
            type: 'ETC',
            iqtScore: 85,
            vehicles: [], 
            drivers: [], 
            activeRequests: []
          }, 
          aetcRequests: INITIAL_AETC_REQUESTS,
          taxDocuments: [],
          nonConformities: []
        };
        localStorage.setItem(DB_KEY, JSON.stringify(initial));
        return initial;
    }
    return JSON.parse(stored);
  } catch (e) { return { aetcRequests: INITIAL_AETC_REQUESTS }; }
};

const saveDatabase = (db: any) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const guardianEngine = {
  getCompanyData: (): CompanyProfile => loadDatabase().company,
  
  getAetcRequests: (): AetcRequest[] => {
    return loadDatabase().aetcRequests || [];
  },

  createAetcRequest: (data: Partial<AetcRequest>) => {
    const db = loadDatabase();
    const newReq: AetcRequest = {
        id: `AETC-${Date.now()}`,
        clientName: data.clientName || 'Cliente Novo',
        plate: data.plate || 'ABC-0000',
        modalityId: data.modalityId || 'VUC',
        status: 'AGUARDANDO_DOCS',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        financeStatus: 'PENDING',
        documents: (data.documents || []).map(d => ({ ...d, status: 'PENDING' })),
        ...data
    } as any;
    db.aetcRequests.unshift(newReq);
    saveDatabase(db);
    return newReq;
  },

  updateAetcStatus: (id: string, status: AetcStatus, extra?: Partial<AetcRequest>) => {
    const db = loadDatabase();
    const idx = db.aetcRequests.findIndex((r: any) => r.id === id);
    if (idx !== -1) {
        db.aetcRequests[idx] = { ...db.aetcRequests[idx], status, updatedAt: new Date().toISOString(), ...extra };
        saveDatabase(db);
    }
  },

  saveCertificate: (cert: any) => {
    const db = loadDatabase();
    db.certificate = cert;
    saveDatabase(db);
  },

  getCertificate: () => loadDatabase().certificate || null,
  getTaxDocuments: (): TaxDocument[] => loadDatabase().taxDocuments || [],
  saveTaxDocument: (doc: TaxDocument) => {
    const db = loadDatabase();
    if (!db.taxDocuments) db.taxDocuments = [];
    db.taxDocuments.unshift(doc);
    saveDatabase(db);
  },
  addVehicle: (v: Vehicle) => {
    const db = loadDatabase();
    db.company.vehicles.push(v);
    saveDatabase(db);
  },
  getSafeStops: (): SafeStop[] => [
    { id: 's1', x: 45, y: 55, name: 'Posto Graal Petropen', type: 'GAS_STATION', insuranceApproved: true },
    { id: 's2', x: 60, y: 40, name: 'Ponto de Apoio Rodonaves', type: 'HUB', insuranceApproved: true }
  ],
  getAllEnrollments: (): Enrollment[] => [
    { id: 'en1', studentName: 'João Silva', courseName: 'Master em Passageiros', status: 'ATIVO' },
    { id: 'en2', studentName: 'Carlos Mendes', courseName: 'MOPP Atualização', status: 'CONCLUIDO' }
  ],
  getAllOffers: (): MarketplaceOffer[] => [
    { id: 'o1', title: 'Pneu Michelin 295/80', description: 'Desconto exclusivo para membros Helonex.', publicPrice: 3200, memberPrice: 2850, category: 'Manutencao', targetRules: { isPublicAvailable: true, companyType: ['TAC', 'ETC'] } },
    { id: 'o2', title: 'Diesel S10 Rede Graal', description: 'Cashback de 2% em toda a rede.', publicPrice: 6.20, memberPrice: 6.08, category: 'Combustivel', targetRules: { isPublicAvailable: true } }
  ],
  updatePrivacySettings: (s: any) => {
    const db = loadDatabase();
    db.company.privacySettings = s;
    saveDatabase(db);
  },
  exportUserData: () => JSON.stringify(loadDatabase(), null, 2),
  saveValuation: (v: any) => {
    const db = loadDatabase();
    db.company.valuation = v;
    saveDatabase(db);
    return true;
  },
  checkBackupHealth: (): 'OK' | 'WARNING' | 'CRITICAL' => 'OK',
  createBackupPayload: () => JSON.stringify(loadDatabase()),
  restoreBackupPayload: (p: string) => {
    try {
      const db = JSON.parse(p);
      saveDatabase(db);
      return { success: true, message: 'Sistema Restaurado com Sucesso' };
    } catch (e) {
      return { success: false, message: 'Arquivo de Backup Inválido' };
    }
  },
  getDocumentation: (c?: string): DocumentationDoc[] => {
    const allDocs: DocumentationDoc[] = [
      { id: 'doc1', title: 'Manual de Qualidade', subtitle: 'Padrão ISO 9001:2015', category: 'QMS', tags: ['ISO', 'Qualidade'], sections: [{ id: 's1', title: 'Introdução', content: 'Manual do sistema de gestão da qualidade integral.' }] }
    ];
    return c ? allDocs.filter(d => d.category === c) : allDocs;
  },
  getNonConformities: (): NonConformity[] => loadDatabase().nonConformities || [],
  getQualityMultipliers: (): QualityMultiplier[] => [
    { id: 'm1', name: 'João Silva', role: 'Motorista Elite', points: 1250, badges: ['Pé de Pluma', 'Zero Avarias'] }
  ],
  addNonConformity: (nc: any) => {
    const db = loadDatabase();
    if (!db.nonConformities) db.nonConformities = [];
    db.nonConformities.unshift(nc);
    saveDatabase(db);
  },
  getBSCIndicators: (): BSCIndicator[] => {
      return [
          { id: 'bsc_f1', name: 'Margem Líquida', perspective: 'Financeira', target: 15, actual: 12.5, unit: '%', trend: 'up', owner: 'Financeiro', linkedTo: [] },
          { id: 'bsc_f2', name: 'Custo por KM', perspective: 'Financeira', target: 4.00, actual: 4.12, unit: 'R$', trend: 'down', owner: 'Operações', linkedTo: [] },
          { id: 'bsc_p1', name: 'IQT (Qualidade ANTT)', perspective: 'Clientes', target: 90, actual: 82, unit: 'pts', trend: 'stable', owner: 'Tráfego', linkedTo: [] },
          { id: 'bsc_p2', name: 'SASSMAQ Compliance', perspective: 'Processos Internos', target: 95, actual: 88, unit: '%', trend: 'up', owner: 'QSMS', linkedTo: [] },
      ];
  },
};
