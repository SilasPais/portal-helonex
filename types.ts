
import React from 'react';

export const AETC_PRICE_PER_PLATE = 480.00;

export enum Section {
  HOME = 'HOME',
  MANIFESTO = 'MANIFESTO', 
  SERVICES = 'SERVICES',
  ACADEMY = 'ACADEMY',
  NEWS_BOARD = 'NEWS_BOARD',
  MENTOR = 'MENTOR',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  ADMIN_PANEL = 'ADMIN_PANEL',
  CLIENT_PANEL = 'CLIENT_PANEL',
  SHIPPER_PANEL = 'SHIPPER_PANEL',
  COURSE_PLAYER = 'COURSE_PLAYER',
  ABOUT = 'ABOUT',
  SOLUTION_SHOWCASE = 'SOLUTION_SHOWCASE',
  SERVICE_DETAIL = 'SERVICE_DETAIL',
  STATE_LICENSING = 'STATE_LICENSING',
  INTERNATIONAL_MAP = 'INTERNATIONAL_MAP',
  DASHBOARD = 'DASHBOARD',
  OPPORTUNITY = 'OPPORTUNITY',
  UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION',
  STRATEGIC_ROADMAP = 'STRATEGIC_ROADMAP',
  SUCCESS_ROUTE = 'SUCCESS_ROUTE',
  FREIGHT_CALCULATOR = 'FREIGHT_CALCULATOR',
  BIZ_BUILDER = 'BIZ_BUILDER',
  API_DOCS = 'API_DOCS',
  CRITICAL_MISSIONS = 'CRITICAL_MISSIONS',
  HSM_VAULT = 'HSM_VAULT',
  STRATEGIC_DECISION = 'STRATEGIC_DECISION',
  HELONEX_RESOLVE = 'HELONEX_RESOLVE',
  DOSSIER = 'DOSSIER',
  ZMRC_CATALOG = 'ZMRC_CATALOG',
  GOV_TECH = 'GOV_TECH',
  JUS_TECH = 'JUS_TECH',
  EDU_TECH = 'EDU_TECH',
  GES_TECH = 'GES_TECH',
  HELONEX_VISION = 'HELONEX_VISION',
  ONBOARDING = 'ONBOARDING',
  FINANCE_MANAGER = 'FINANCE_MANAGER'
}

export interface VisionAnalysis {
  id: string;
  timestamp: string;
  scenario: string;
  detectedIssue: string;
  normativeReference: string; // ex: SASSMAQ 4.2.1
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  suggestedAction: string;
  trainingModuleId?: string;
  status: 'OPEN' | 'RESOLVED' | 'IGNORED';
  imageUrl?: string;
}

export type AetcStatus = 
  | 'AGUARDANDO_DOCS'
  | 'ANALISE_TECNICA'
  | 'AGUARDANDO_ASSINATURA'
  | 'PROCESSAMENTO_FISICO'
  | 'POSTADO_CORREIOS'
  | 'ANALISE_CET'
  | 'DEFERIDO'
  | 'INDEFERIDO'
  | 'EXPIRADO';

export interface AetcDocument {
  name: string;
  url?: string;
  status: 'PENDING' | 'UPLOADED' | 'VALIDATED' | 'REJECTED';
}

export interface AetcRequest {
  id: string;
  clientName: string;
  plate: string;
  modalityId: string;
  status: AetcStatus;
  createdAt: string;
  updatedAt: string;
  expiryDate?: string;
  documents: AetcDocument[];
  requirementUrl?: string;
  trackingCode?: string;
  prefeituraProtocol?: string;
  financeStatus: 'PENDING' | 'PAID';
}

export type RestrictionZone = 'ZMRC' | 'ZERC' | 'VER_1' | 'VER_2' | 'VER_3' | 'VER_4';
export type UserRole = 'visitor' | 'admin' | 'subscriber' | 'partner' | 'shipper';
export type Language = 'pt' | 'es';

export interface CompanyProfile {
  id: string;
  name: string;
  cnpj: string;
  type: string;
  iqtScore: number;
  activeRequests: any[];
  reputation?: any;
  vehicles: Vehicle[];
  drivers?: Driver[];
  inventory?: InventoryItem[];
  privacySettings?: PrivacySettings;
}

export interface TaxDocument { 
  id: string; 
  type: string; 
  number: string; 
  series: string; 
  issueDate: string; 
  value: number; 
  recipientName: string; 
  status: string; 
  accessKey?: string;
  xmlUrl?: string;
  pdfUrl?: string;
  ciotProtocol?: string;
  rejectionReason?: string;
}

export interface Vehicle { 
  id: string; 
  plate: string; 
  model: string; 
  year: number; 
  type: string;
  rntrcStatus?: string;
  insuranceStatus?: string;
  currentValue?: number;
  odometer?: number;
  licenses?: License[];
  tires?: TireRecord[];
  maintenanceHistory?: MaintenanceRecord[];
}

export interface Driver { id: string; name: string; cnh: string; cnhCategory: string; cnhExpiry: string; photoUrl: string; }
export interface NewsItem { id: string; title: string; summary: string; category: string; date: string; tags: string[]; imageUrl?: string; }
export interface ClassifiedAd { id: string; type: string; title: string; price?: number; description: string; location: string; contact: string; sellerName: string; sellerLevel: string; date: string; verified: boolean; imageUrl?: string; }
export interface MarketplaceOffer { id: string; title: string; description: string; publicPrice: number; memberPrice: number; category: string; targetRules: any; }
export interface StrategicAnalysis { decisionTitle: string; legalBasis: string; risks: string[]; opportunities: string[]; errorSimulation: string; correctiveActions: string[]; popContent: any; }
export interface GeneratedCourse { id: string; title: string; description: string; modules: any[]; }
export interface TaxSimulation { currentPisCofins: number; currentIcms: number; newCbs: number; newIbs: number; creditDiesel: number; creditTires: number; netImpact: number; }
export interface FreightCost { diesel: number; toll: number; maintenance: number; tires: number; driverStipend: number; adminOverhead: number; taxes: number; profitMargin: number; totalCost: number; suggestedPrice: number; minAnttPrice: number; isSustainable: boolean; }
export interface ChatMessage { role: 'user' | 'model'; text: string; timestamp: Date; }
export interface FatigueAnalysis { nivel_estresse: number; alerta_preventivo: string; acao_gestor: string; }
export interface DOUNews { id: string; agency: string; title: string; impact: string; summary: string; link: string; }
export interface FreightOffer { id: string; origin: string; destination: string; cargoType: string; vehicleTypeRequired: string; price: number; distance: number; shipperName: string; minScoreRequired: number; matchReason?: string; }
export interface SentinelAnalysis { score: number; isHostile: boolean; reason?: string; suggestion?: string; }
export interface Proposal { id: string; value: number; }
export interface Dispute { id: string; protocol: string; }
export interface StatData { name: string; compliance: number; risk: number; }
export interface Enrollment { id: string; studentName: string; courseName: string; status: string; }
export type Monitriip4Status = 'GREEN' | 'YELLOW' | 'RED';
export const SAC_OMISSION_FINE = 5813.00;
export interface ServiceRequest { id: string; title: string; target: string; status: string; lastUpdate: string; step: string; }
export interface BSCIndicator { id: string; name: string; perspective: string; target: number; actual: number; unit: string; trend: 'up' | 'down' | 'stable'; owner: string; linkedTo: string[]; }
export interface NonConformity { id: string; code: string; title: string; origin: string; severity: string; status: string; description: string; identifiedBy: string; dateOpen: string; rootCauseAnalysis?: any; }
export interface QualityMultiplier { id: string; name: string; role: string; points: number; badges: string[]; }
export interface ActionPlan5W2H { id: string; title: string; }
export interface TransportRoute { id: string; name: string; originId: string; destinationId: string; status: string; riskScore: number; pointsOfInterest: string[]; currentVehiclePosition?: any; deviationAlert?: boolean; }
export interface GeoPoint { id: string; x: number; y: number; label: string; type: string; riskLevel: string; details?: string; }
export interface SafeStop { id: string; x: number; y: number; name: string; type: string; insuranceApproved: boolean; }
export type ProfileSegment = 'CARGO_PROVIDER' | 'PASSENGER_PROVIDER' | 'SHIPPER' | 'OWN_CARGO';
export enum MaturityLevel { LEVEL_01_BASIC = 1, LEVEL_02_SILVER = 2, LEVEL_03_GOLD_ESG = 3, LEVEL_04_GUARDIAN = 4, EXPONENCIAL = 'EXPONENCIAL', CONSOLIDADO = 'CONSOLIDADO', QUALIFICADO = 'QUALIFICADO' }
export interface QualitySealData { level: MaturityLevel; levelName: string; score: number; hash: string; }
export interface VerifiedProvider { id: string; name: string; segment: string; sealLevel: string; location: string; fleetSize: number; rating: number; verified: boolean; trustScore?: number; pricePerKm?: number; matchesDemand?: boolean; }
export interface FreightDemand { type: 'CARGO' | 'PASSENGER'; origin?: string; destiny?: string; }
export type FinanceCategory = string;
export type FinanceStatus = string;
export interface FinancialRecord { id: string; date: string; dueDate: string; description: string; type: 'RECEITA' | 'DESPESA'; category: FinanceCategory; value: number; status: FinanceStatus; costCenter: string; documentNumber?: string; }
export interface TaxOpportunity { id: string; routeId: string; recommendedState: string; currentStopState: string; icmsDifference: number; estimatedSavings: number; fuelStationPartner: string; }
export interface RiskEvent { id: string; type: string; severity: string; vehicleId: string; plate: string; driverName: string; location: string; timestamp: Date; status: string; }
export interface ChecklistItem { id: string; category: string; label: string; status: 'OK' | 'NOK' | 'NA'; severityIfFailed: string; observation?: string; photoEvidence?: string; }
export interface DocumentationDoc { id: string; title: string; subtitle: string; category: string; tags: string[]; sections: any[]; }
export type TaxDocType = 'CT-e' | 'MDF-e' | 'CIOT' | 'NF-e';
export interface CteForm { senderName: string; senderCnpj: string; recipientName: string; recipientCnpj: string; originCity: string; originUF: string; destCity: string; destUF: string; productName: string; productValue: number; cargoWeight: number; freightValue: number; tributation: string; nfeKeys: string; }
export interface MdfeForm { vehiclePlate: string; driverCpf: string; driverName: string; ufOrigin: string; ufDestiny: string[]; cteKeys: string; insurancePolicy: string; }
export interface CiotForm { rntrc: string; contractorCnpj: string; driverCpf: string; freightValue: number; paymentMethod: string; destCity: string; destUF: string; contractType: 'TAC' | 'ETC' | 'MEI_CAMINHONEIRO' | 'PROPRIO' | 'OUTROS'; }
export const PRF_OVERSIZED_RATE = 16.07;
export type AetcModality = any;

export type MacroSegment = 'CARGO' | 'PASSENGER' | 'CORPORATE';
export type UserPersona = 'TAC' | 'ETC' | 'TRIC' | 'SHIPPER' | 'OWN_CARGO_AGRO' | 'OWN_CARGO_IND' | 'PASS_CHARTER_EVENTUAL' | 'PASS_CHARTER_CONT' | 'PASS_SCHOOL' | 'PASS_LINE' | 'STUDENT' | 'FLEET_MANAGER' | 'TECH_RESP' | 'HR_TRANSPORT';
export type UserGoal = 'LEGALIZE' | 'MANAGE' | 'GROW' | 'LEARN';
export type SystemMode = 'FULL_MANAGEMENT' | 'INTELLIGENCE_LAYER';

export interface UserContext {
  macro: MacroSegment;
  persona: UserPersona;
  goal: UserGoal;
  mode: SystemMode;
  needsOnboarding: boolean;
  maturityLevel?: MaturityLevel;
}

export interface PrivacySettings {
  dataProcessing: boolean;
  aiAnalysis: boolean;
  cameraRecording: boolean;
  marketing: boolean;
  lastUpdated: string;
}

export interface DigitalCertificate {
  id: string;
  fileName: string;
  expiryDate: string;
  status: 'VALID' | 'EXPIRED' | 'REVOKED';
}

export interface MaintenanceRecord { id: string; date: string; type: string; description: string; cost: number; }
export interface TireRecord { id: string; position: string; brand: string; model: string; treadDepth: number; pressure: number; }
export interface InventoryItem { id: string; name: string; quantity: number; }
export interface License { id: string; type: string; name: string; status: string; expiryDate: string; }

// Helonex Core Engine Types
export type Zone = 'GREEN' | 'YELLOW' | 'RED';

export interface Metric {
  id: string;
  name: string;
  module: 'GOV' | 'JUS' | 'EDU' | 'GES';
  value: number;
  unit: string;
  timestamp: number;
}

export interface ProcessStats {
  id: string;
  name: string;
  mean: number; // mu
  stdDev: number; // sigma
  history: Metric[];
}

export interface AnalysisResult {
  metricId: string;
  zScore: number;
  zone: Zone;
  actionRequired: boolean;
  suggestedAction?: string;
}
