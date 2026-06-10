
-- 🏗️ HELONEX DATABASE SCHEMA V2.0 (ARCHITECTURE_UPDATE)
-- Baseado no Dossiê Técnico: Reputation Engine, PaxTech & LogiTech

-- 1. TABELA DE EMPRESAS (PERFIS) - Com Triagem de Universo
create table public.companies (
  id uuid references auth.users not null primary key,
  name text not null,
  cnpj text unique not null,
  email text,
  type text check (type in ('TAC', 'ETC', 'CTC', 'SHIPPER')),
  transport_universe text check (transport_universe in ('CARGA', 'PASSAGEIRO')), -- A Bifurcação
  maturity_level int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. TABELA DE NÍVEIS DE CERTIFICAÇÃO (TIERS)
create table public.certification_tiers (
  id serial primary key,
  tier_name text unique, -- 'Bronze', 'Prata', 'Ouro', 'Diamante'
  min_score decimal not null,
  benefits jsonb -- Benefícios atrelados (descontos, prioridade)
);

-- Inserção dos Níveis conforme Manual
insert into public.certification_tiers (tier_name, min_score, benefits) values
('Bronze', 50.0, '{"desc": "Conformidade Legal Básica"}'),
('Prata', 70.0, '{"desc": "Legal + Capacitação EduTech"}'),
('Ouro', 85.0, '{"desc": "Legal + EduTech + Resolução de Conflitos"}'),
('Diamante', 95.0, '{"desc": "Excelência Operacional Total"}');

-- 3. MOTOR DE REPUTAÇÃO (IQT SCORE)
create table public.company_reputation (
  company_id uuid references public.companies(id) primary key,
  current_score decimal default 0.0,
  tier_id integer references public.certification_tiers(id),
  last_audit_date timestamp with time zone default now(),
  is_active boolean default true, -- Se false, o selo está suspenso
  vectors jsonb -- Detalhe dos vetores: { legal: 40, edu: 20, ops: 20, ethic: 20 }
);

-- 4. LOG DE EVENTOS DE QUALIDADE (AUDITORIA IMUTÁVEL)
create table public.quality_events_log (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id),
  source_module text not null, -- 'ANTT', 'EduTech', 'LogiTech', 'JusTech'
  event_type text not null, -- 'Multa_Detectada', 'Curso_Concluido', 'Sinistro'
  impact_score decimal, -- Ex: -5.0 ou +2.0
  processed_at timestamp with time zone default now()
);

-- 5. TABELA ESPECÍFICA PASSAGEIROS (PAXTECH)
create table public.pax_compliance (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id) on delete cascade,
  cadastur_number text,
  cadastur_validity date,
  app_insurance_policy text, -- Seguro Acidentes Pessoais
  app_insurance_expiry date,
  last_safety_inspection date, -- Vistoria Semestral
  monitriip_active boolean default false,
  updated_at timestamp with time zone default now()
);

-- 6. TABELA DE CONTINGÊNCIA E ASSINATURA DIGITAL (PORTA DE SEGURANÇA)
create table public.manual_input_logs (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id),
  data_type text, -- 'SEGURO_APP', 'LICENCA_VIAGEM'
  declared_value text,
  digital_signature_hash text not null, -- Hash do e-CPF/GOV.BR
  gov_system_status text default 'OFFLINE',
  validation_result text default 'PENDING', -- 'VALIDATED', 'DIVERGENT'
  created_at timestamp with time zone default now()
);

-- 7. TABELA DE AUDITORIA DE FRAUDE
create table public.fraud_audit_trail (
  id uuid default uuid_generate_v4() primary key,
  company_id uuid references public.companies(id),
  manual_input_id uuid references public.manual_input_logs(id),
  official_gov_value text, -- O dado real retornado pela ANTT após volta do sistema
  divergence_severity text check (divergence_severity in ('LOW', 'MEDIUM', 'HIGH')),
  audit_verdict text,
  resolved_at timestamp with time zone
);

-- Tabelas Auxiliares (Veículos, Motoristas, Cursos) mantidas da V1.0 com RLS...
alter table public.companies enable row level security;
alter table public.company_reputation enable row level security;
alter table public.pax_compliance enable row level security;
