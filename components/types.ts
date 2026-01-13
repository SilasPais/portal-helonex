
import React from 'react';

// --- ENUMS ---

export enum Section {
  HOME = 'HOME',
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
  SUCCESS_ROUTE = 'SUCCESS_ROUTE'
}

export enum MaturityLevel {
  GENESE = 0,
  LEGALIZADO = 1,
  EFICIENTE = 2,
  QUALIFICADO = 3,
  CONSOLIDADO = 4,
  EXPONENCIAL = 5
}

// --- TYPES & ALIASES ---

export type Language = 'pt' | 'es';
export type UserRole = 'visitor' | 'subscriber' | 'admin' | 'partner' | 'shipper';
export type ProfileSegment = 'CARGO_PROVIDER' | 'PASSENGER_PROVIDER' | 'SHIPPER' | 'OWN_CARGO';
export type DocStatus = 'VALID' | 'EXPIRING' | 'EXPIRED' | 'PENDING';
export type ProcedureType = 'POP' | 'PAP';
export type ProcedureScope = 'INTERNAL' | 'CLIENT' | 'PUBLIC';
export type PartnerCategory = 'Combustivel' | 'Seguros' | 'Manutencao' | 'Financeiro' | 'Outros';
export type CargoType = string;
export type PaymentMethod = 'credit_card' | 'pix' | 'boleto';

// --- INTERFACES ---

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

export interface StatData {
  name: string;
  compliance: number;
  risk: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SentinelAnalysis {
  nivel_estresse: number;
  nivel_fadiga: number;
  alerta_preventivo: string;
  acao_gestor: string;
  fundamentacao_legal: string;
}

export interface DriverRecognitionModuleProps {
  segment?: ProfileSegment;
}

export interface QualitySealData {
  level: MaturityLevel;
  levelName: string;
  score: number;
  hash: string;
  validUntil: string;
}

export interface PrivacySettings {
  dataProcessing: boolean;
  aiAnalysis: boolean;
  cameraRecording: boolean;
  marketing: boolean;
  lastUpdated: string;
}

export interface Document {
  id: string;
  type: string;
  number: string;
  expiryDate: string;
  status: DocStatus;
}

export interface NeuroStatus {
  status: 'FOCUS' | 'FATIGUE' | 'DISTRACTED';
  attentionLevel: number;
  stressLevel: number;
  heartRate: number;
  lastBlinkRate: number;
}

export interface Driver {
  id: string;
  name: string;
  cnh: string;
  cnhCategory: string;
  cnhExpiry: string;
  mopp: boolean;
  toxicologyStatus: DocStatus;
  photoUrl?: string;
  neuroStatus?: NeuroStatus;
  // Extras for Gamification
  tier?: string;
  score?: number;
  economy?: number;
  bonus?: number;
  img?: string;
  isCompany?: boolean;
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  year: number;
  type: 'TRUCK' | 'BUS' | 'VAN' | 'UTILITY';
  rntrcStatus: DocStatus;
  insuranceStatus: DocStatus;
}

export interface BSCIndicator {
  id: string;
  name: string;
  perspective: 'Financeira' | 'Clientes' | 'Processos Internos' | 'Aprendizado e Crescimento';
  target: number;
  actual: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  owner: string;
  linkedTo: string[];
}

export interface NonConformity {
  id: string;
  code: string;
  title: string;
  origin: 'Indicador' | 'Auditoria' | 'Reclamacao' | 'Monitriip';
  severity: 'Baixa' | 'Media' | 'Alta' | 'Critica';
  status: 'Aberta' | 'Em Analise' | 'Fechada';
  description: string;
  identifiedBy: string;
  dateOpen: string;
  rootCauseAnalysis?: {
    details: string;
  };
}

export interface QualityMultiplier {
  id: string;
  name: string;
  role: string;
  points: number;
  badges: string[];
}

export interface ValuationDiagnostic {
  id: string;
  date: string;
  answers: any;
  score: {
    tangibleValue: number;
    intangibleValue: number;
    potentialGrowth: number;
    rating: string;
  };
  status: 'completed' | 'pending';
}

export interface CompanyProfile {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  type: string;
  profileSegment: ProfileSegment;
  operationMode: string;
  state: string;
  documents: Document[];
  vehicles: Vehicle[];
  drivers: Driver[];
  iqtScore: number;
  iqtHistory: { date: string; score: number }[];
  maturityLevel: MaturityLevel;
  qualitySeal?: QualitySealData;
  activeModules: string[];
  privacySettings?: PrivacySettings;
  bsc?: BSCIndicator[];
  nonConformities?: NonConformity[];
  qualityMultipliers?: QualityMultiplier[];
  valuationDiagnostic?: ValuationDiagnostic;
}

export interface GuardianAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  date: string;
  actionUrl?: string;
}

export interface MarketplaceOffer {
  id: string;
  title: string;
  description: string;
  category: PartnerCategory;
  partnerId: string;
  publicPrice: number;
  memberPrice: number;
  targetRules: {
    isPublicAvailable: boolean;
    companyType?: string[];
  };
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  tags: string[];
  imageUrl?: string;
}

export interface StandardProcedure {
  id: string;
  code: string;
  type: ProcedureType;
  scope: ProcedureScope;
  title: string;
  objective: string;
  version: string;
  lastUpdate: string;
  content: string;
  tags: string[];
}

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  active: boolean;
  commissionRate: number;
}

export interface MonitriipLog {
  id: string;
  vehicleId: string;
  routeId: string;
  timestamp: string;
  status: 'SENT' | 'PENDING' | 'ERROR';
  details: string;
}

export interface ClientComplianceStatus {
  clientId: string;
  companyName: string;
  cnpj: string;
  poaStatus: {
    govBr: 'active' | 'pending' | 'expired';
    wsDenatran: 'active' | 'pending' | 'expired';
    expiryDate: string;
  };
}

export interface Enrollment {
  id: string;
  studentName: string;
  courseName: string;
  partnerName: string;
  requestDate: string;
  status: 'pending' | 'active' | 'cancelled' | 'completed';
  financials: {
    value: number;
    paymentStatus: 'pending' | 'paid' | 'overdue';
    paymentMethod: 'pix' | 'credit_card' | 'boleto';
    paymentDate?: string;
  };
  credentials?: {
    login?: string;
    password?: string;
    accessLink?: string;
  };
}

export interface TransportRoute {
  id: string;
  name: string;
  originId: string;
  destinationId: string;
  riskScore: number;
  status: 'OK' | 'WARNING' | 'CRITICAL';
  pointsOfInterest: string[];
}

export interface GeoPoint {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'CITY' | 'HUB' | 'WEIGH_STATION' | 'RISK_ZONE';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  details?: string;
}

export interface ClassifiedAd {
  id: string;
  type: string;
  title: string;
  price?: number;
  description: string;
  location: string;
  contact: string;
  sellerName: string;
  sellerLevel: string;
  date: string;
  verified: boolean;
  imageUrl?: string;
}

export interface VerifiedProvider {
  id: string;
  name: string;
  segment: 'CARGO' | 'PASSENGER';
  sealLevel: 'DIAMOND' | 'GOLD' | 'SILVER' | 'BRONZE' | 'STANDARD';
  location: string;
  fleetSize: number;
  rating: number;
  verified: boolean;
}

export interface FreightDemand {
  type: 'CARGO' | 'PASSENGER';
  origin: string;
  destination: string;
  date: string;
  description: string;
}

// Placeholder interfaces
export interface GovData {}
export interface Infraction {}
export interface Debt {}
export interface InstallmentPlan {}
export interface Transaction {}
export interface Invoice {}
export interface ServiceItem {}
export interface Employee {}
export interface TripValidationResult {}
export interface Device {}
export interface PassengerProfile {}
export interface TravelPackage {}
export interface EFrotasEvent {}
export interface WeighingEvent {}
export interface VehicleChecklist {}
export interface ChecklistItem {}
export interface ActionPlan5W2H {}
export interface PassengerLevel {}
export interface SmartNotification {}
