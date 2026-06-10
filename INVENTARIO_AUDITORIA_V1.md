# INVENTARIO_AUDITORIA_V1.md
**Data de Auditoria:** 27 de Fevereiro de 2026
**Responsável:** Arquiteto de Software Sênior & Auditor ISO 9000
**Status:** Análise Estática de Código (White-box Testing)

---

## 1. MAPA DE ARQUITETURA E DIRETÓRIOS

A estrutura atual reflete uma aplicação **Single Page Application (SPA)** construída com React e Vite. A organização é modular, mas com alta concentração de lógica dentro da pasta `/components`.

### Estrutura Principal
*   **Raiz:**
    *   `App.tsx`: Roteador principal e gerenciador de estado global (`userContext`, `activeSection`).
    *   `main.tsx`: Ponto de entrada React.
    *   `types.ts`: Definições de tipos TypeScript (Interfaces de Domínio).
    *   `POP_002_AETC_SAO_PAULO.md`: Procedimento Operacional Padrão para AETC/ZMRC.
    *   `supabase_schema.sql`: Definição do banco de dados.

*   **Módulos de Negócio (`/components`):**
    *   **GovTech (Regulatório):**
        *   `GovTech.tsx`: Hub central de licenças.
        *   `StateLicensingMap.tsx`: Mapa interativo de licenças estaduais (AET).
        *   `InternationalMap.tsx`: Mapa de rotas Mercosul (TRIC).
        *   `IssuanceModule.tsx`: Emissor de documentos fiscais (CT-e, MDF-e).
        *   `ZmrcManager.tsx`: Gestão de logística urbana (VUC).
    *   **JusTech (Jurídico):**
        *   `JusTech.tsx`: Hub jurídico.
        *   `HelonexResolve.tsx`: Interface da Corte Arbitral.
        *   `ODRConsole.tsx`: Console de resolução de disputas online.
    *   **EduTech (Educacional):**
        *   `EduTech.tsx`: Hub de cursos.
        *   `AcademySection.tsx`: Vitrine de cursos.
        *   `CoursePlayer.tsx`: Player de vídeo e conteúdo.
    *   **GesTech (Gestão):**
        *   `GesTech.tsx`: Hub de gestão de frota.
        *   `FleetManager.tsx`: CRUD de veículos e motoristas.
        *   `FreightCalculator.tsx`: Calculadora de frete e piso mínimo.
    *   **Compliance & Qualidade:**
        *   `ChecklistModule.tsx`: Auditoria de pátio com IA.
        *   `BizBuilder.tsx`: Gamificação de maturidade empresarial.
        *   `Base44Dashboard.tsx`: Painel de risco e conformidade.
        *   `QualitySeal.tsx`: Componente visual de status.

*   **Serviços (`/services`):**
    *   `geminiService.ts`: Integração com Google Gemini (IA).

---

## 2. INVENTÁRIO DE BANCO DE DADOS (SUPABASE)

Baseado na análise do arquivo `supabase_schema.sql` (v2.0).

### Tabelas Materializadas
1.  **`public.companies`**: Perfil da empresa.
    *   Colunas: `id`, `name`, `cnpj`, `email`, `type` (TAC/ETC...), `transport_universe` (CARGA/PASSAGEIRO), `maturity_level`.
    *   **Regra de Negócio:** Check constraint para `type` e `transport_universe`.
2.  **`public.certification_tiers`**: Níveis de certificação (Bronze, Prata, Ouro).
    *   Dados Pré-carregados: Bronze (50.0), Prata (70.0), Ouro (85.0), Diamante (95.0).
3.  **`public.company_reputation`**: Motor de reputação (IQT Score).
    *   Relacionamento 1:1 com `companies`.
4.  **`public.quality_events_log`**: Log imutável de auditoria.
    *   Rastreia origem (`source_module`) e impacto (`impact_score`).
5.  **`public.pax_compliance`**: Compliance específico de passageiros.
    *   Colunas: `cadastur_number`, `app_insurance_policy`, `last_safety_inspection`.
6.  **`public.manual_input_logs`**: Logs de entrada manual (contingência).
    *   Coluna crítica: `digital_signature_hash` (Assinatura Digital).
7.  **`public.fraud_audit_trail`**: Auditoria de fraude em dados manuais.

### Segurança
*   **RLS (Row Level Security):** Habilitado para `companies`, `company_reputation`, `pax_compliance`.

---

## 3. MAPEAMENTO DE REGRAS DE NEGÓCIO E LACUNAS

### 3.1. GovTech & Regulatório
*   **RNTRC/TAF:**
    *   *Existente:* Interface visual em `GovTech.tsx` mostrando status "ATIVO" ou "VENCE EM 15 DIAS".
    *   *Implementado:* **Validação Matemática Estrita** em `src/domain/rules/transportRules.ts` (validarRNTRC).
    *   *Lacuna:* Ainda falta a consulta à API da ANTT para verificar validade real (Soberania de Dados Externa).
*   **Logística Urbana (VUC/AETC):**
    *   *Existente:* Gestão de VUCs em `ZmrcManager.tsx`.
    *   *Implementado:* **Motor Jurídico AETC Completo** em `src/domain/rules/transportRules.ts` (validarAETC) com 20 categorias baseadas na Portaria Nº 137/18-SMT.GAB.
    *   *Regras:* Validação de idade (máx 15 anos), largura (2,20m), comprimento (7,20m). (Obs: CVC e Placa Vermelha não são mais exigidos no fluxo atual pós-pandemia).
*   **Licenças Estaduais:**
    *   *Existente:* Mapa interativo (`StateLicensingMap.tsx`) com regras visuais por estado.
    *   *Lacuna:* **[ALERTA: DADOS ESTÁTICOS]** As regras de cada estado estão hardcoded no frontend, não vêm de uma base de dados atualizável.

### 3.2. GesTech & Calculadora
*   **Cálculo de Frete (`FreightCalculator.tsx`):**
    *   *Existente:* Lógica matemática completa para Custo Direto, Margem e Impostos.
    *   *Existente:* Simulação de Piso Mínimo ANTT (`minAnttPrice`).
    *   *Existente:* Lógica de "Tarifa Sustentável" vs "Abaixo do Piso".
    *   *Lacuna:* **[ALERTA: CÁLCULO SIMPLIFICADO]** O valor do Piso Mínimo usa uma fórmula fixa (`costFixedPerDay = 450`), sem considerar a tabela oficial da ANTT por tipo de carga e eixos.

### 3.3. Compliance & Checklist
*   **Auditoria de Pátio (`ChecklistModule.tsx`):**
    *   *Existente:* Templates dinâmicos para Turismo, Escolar, Carga e **Internacional (TRIC)**.
    *   *Existente:* Upload de fotos (`photoEvidence`).
    *   *Existente:* **Gravação e Transcrição de Áudio** via Gemini AI.
    *   *Lacuna:* **[ALERTA: ARMAZENAMENTO LOCAL]** As fotos e áudios são convertidos para Base64 e mantidos no estado do React. Não há lógica de upload para Storage (S3/Supabase) implementada no componente.

### 3.4. Onboarding & Personas
*   **Fluxo de Entrada (`OnboardingCompass.tsx`):**
    *   *Existente:* Segmentação clara (Carga vs Passageiro).
    *   *Existente:* Definição de Persona (TAC, ETC, TRIC).
    *   *Existente:* Adaptação do `UserContext` que afeta o `BizBuilder` e `QualitySeal`.

---

## 4. INTEGRAÇÕES E APIS EXTERNAS

### 4.1. Inteligência Artificial (Real)
*   **Google Gemini:**
    *   *Arquivo:* `services/geminiService.ts`.
    *   *Status:* **IMPLEMENTADO**. A função `transcribeAudio` faz uma chamada real à API `generative-ai`.
    *   *Uso:* Transcrição de observações no Checklist.

### 4.2. Governamentais (Mock/Simulado)
*   **ANTT / Senatran / Serpro:**
    *   *Status:* **NÃO IMPLEMENTADO**. Não há arquivos de serviço ou chamadas `fetch` para endpoints governamentais.
    *   *Evidência:* Os dados de RNTRC e multas são estáticos nos componentes.

### 4.3. Pagamentos
*   **Gateway:**
    *   *Status:* **INTERFACE APENAS**. O `SalesFunnel.tsx` e botões de "Assinar" levam a telas de login ou mocks, sem integração real com Stripe/MercadoPago.

---

## 5. SEPARAÇÃO DE ESCOPO (CLIENTE VS. ADMIN)

### 5.1. Visão Cliente (Transportador)
*   **Acesso:** Controlado por `userRole` no `App.tsx`.
*   **Componentes:** `ClientDashboard`, `FreightCalculator`, `ChecklistModule`, `CoursePlayer`.
*   **Estado:** Totalmente funcional na camada de apresentação.

### 5.2. Visão Admin (Helonex)
*   **Acesso:** Rota `Section.ADMIN_PANEL`.
*   **Componentes:** `AdminPanel.tsx`.
*   **Funcionalidade:**
    *   Interface para aprovação de documentos e visão geral de usuários.
    *   **[ALERTA: MOCK]** Os dados exibidos no painel admin são estáticos (arrays hardcoded), não refletem os dados reais do Supabase.

---

## 6. PARECER FINAL DO AUDITOR

O sistema **Helonex** apresenta uma arquitetura de frontend robusta e bem organizada, com excelente UX e segmentação de negócio (Carga/Passageiro).

**Pontos Fortes:**
1.  **Arquitetura Modular:** Separação clara entre GovTech, JusTech, etc.
2.  **IA Aplicada:** Uso real de IA para transcrição de áudio no checklist.
3.  **Regras de Negócio de Interface:** A adaptação da interface baseada no contexto do usuário (Persona) funciona perfeitamente.

**Pontos Críticos (Bloqueantes para Produção):**
1.  **Ausência de Backend Real:** A maioria das validações (RNTRC, Multas) é visual. É necessário conectar aos serviços de governo.
2.  **Persistência de Dados:** O `ChecklistModule` e outros formulários não salvam dados no banco de dados, apenas alertam "Sucesso" visualmente.
3.  **Validações Legais:** Faltam validações estritas de formato de documentos e cálculos oficiais de piso mínimo.

**Recomendação:** Priorizar a implementação da camada de serviços (`services/`) para conectar o frontend existente às tabelas do Supabase e APIs externas.
