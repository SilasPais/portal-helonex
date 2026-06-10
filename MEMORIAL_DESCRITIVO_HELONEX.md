# MEMORIAL DESCRITIVO TÉCNICO - SISTEMA HELONEX (v1.0)
**Data de Consolidação:** 24 de Fevereiro de 2026
**Status:** Versão Estável (Pré-Lançamento)
**Classificação:** Confidencial - Propriedade Intelectual Helonex

---

## 1. VISÃO GERAL DO PROJETO

O **HELONEX** é uma plataforma de **Soberania Logística** projetada para unificar as demandas regulatórias, jurídicas e operacionais do setor de transporte (Cargas e Passageiros) no Brasil e Mercosul. 

Diferente de um ERP tradicional, o Helonex atua como um **"Anjo da Guarda Tecnológico"**, focando na prevenção de passivos (multas, processos, apreensões) e na maximização do valor de mercado das transportadoras através de conformidade inteligente.

### 1.1. Pilares Fundamentais (A "Nova Forma")
O sistema se estrutura sobre quatro pilares de tecnologia aplicada:
1.  **GovTech:** Conexão e regularização automática com órgãos governamentais (ANTT, Senatran, Receita Federal).
2.  **JusTech:** Segurança jurídica preventiva e resolutiva (Corte Arbitral Digital, Defesa de Multas).
3.  **EduTech:** Capacitação contínua e obrigatória (MOPP, Direção Defensiva) integrada à operação.
4.  **GesTech:** Gestão operacional de alta performance (Frota, Manutenção, Custos).

---

## 2. ARQUITETURA TÉCNICA

O sistema foi desenvolvido utilizando uma arquitetura moderna, escalável e focada em performance (SPA - Single Page Application).

### 2.1. Stack Tecnológico
*   **Frontend:** React 18+ (TypeScript)
*   **Build Tool:** Vite (Alta performance de desenvolvimento e build)
*   **Estilização:** Tailwind CSS (Utility-first, Design System "Helonex Navy & Gold")
*   **Ícones:** Lucide React (Consistência visual e leveza)
*   **Gráficos/Dashboards:** Recharts (Visualização de dados complexos)
*   **Animações:** CSS Nativo + Utilitários de transição (Foco em performance)
*   **Inteligência Artificial:** Integração com Google Gemini (Mentor IA)

### 2.2. Estrutura de Componentes
A aplicação é modularizada em `/components`, permitindo manutenção isolada de funcionalidades críticas:
*   `/admin`: Painéis administrativos e de controle.
*   `/shared`: Componentes reutilizáveis (Alertas, Modais).
*   Componentes de Negócio: `BizBuilder`, `QualitySeal`, `Base44Dashboard`.

### 2.3. Camada de Regras de Negócio (Domain Rules)
Implementação de validações legais e matemáticas centralizadas em `src/domain/rules/`:
*   **`transportRules.ts`**: Centraliza as regras de conformidade para RNTRC (ANTT) e a **Matriz Jurídica AETC (São Paulo)**.
*   **Matriz AETC**: Mapeamento integral de 20 categorias (VUC, Urgência, Guincho, Mudança, etc.) conforme Portaria Nº 137/18-SMT.GAB, com validação automática de idade do veículo (máx 15 anos para VUC), dimensões (2,20m x 7,20m) e documentos obrigatórios (simplificados no pós-pandemia). Detalhado no **POP 002**.

---

## 3. DETALHAMENTO DOS MÓDULOS E FUNCIONALIDADES

### 3.1. Módulo de Inteligência & Compliance (BizBuilder)
O coração da gamificação corporativa do Helonex. Transforma a burocracia em uma jornada de níveis:
*   **Nível 1 (Básico):** Sobrevivência (RNTRC, Seguros).
*   **Nível 2 (Prata):** Eficiência (Telemetria, Gestão de Pneus).
*   **Nível 3 (Ouro/ESG):** Sustentabilidade (Crédito Verde, SASSMAQ).
*   **Nível 4 (Guardian):** Excelência (Governança, Valuation).
*   **Funcionalidade:** O usuário "arrasta" as conquistas e desbloqueia selos de qualidade.

### 3.2. Selo de Qualidade Dinâmico (QualitySeal)
Um componente visual persistente no cabeçalho (`Header.tsx`) que reflete o status atual da empresa em tempo real.
*   **Adaptação Contextual:** Exibe mensagens diferentes para **Carga** ("Segurança da Carga") e **Passageiros** ("Segurança do Passageiro").
*   **Feedback Visual:** Cores e ícones mudam conforme a evolução no BizBuilder (Azul -> Prata -> Ouro -> Laranja).

### 3.3. Painel de Risco Base44 (Dashboard)
O centro de comando (`Base44Dashboard.tsx`) para monitoramento preditivo.
*   **Gráfico de Área:** Cruza "Índice de Conformidade" vs "Risco Regulatório" ao longo do tempo.
*   **Alertas Críticos:** Notificações de vencimentos (CNH, RNTRC, MOPP) e oportunidades de mercado.
*   **Integração IA:** Sugestões automáticas baseadas na legislação vigente (ex: Resolução ANTT 5982).

### 3.4. Habilitação Internacional & Multimodal (TRIC/OTM)
Módulo estratégico (`InternationalMap.tsx`, `ServiceDetail.tsx`) para expansão de fronteiras.
*   **TRIC:** Transporte Rodoviário Internacional de Cargas (Mercosul).
*   **OTM:** Operador de Transporte Multimodal.
*   **Funcionalidades:** Mapa interativo de rotas internacionais, requisitos legais para licenças originárias e gestão de frota transfronteiriça.

### 3.5. Onboarding Inteligente (Compass)
Sistema de entrada (`OnboardingCompass.tsx`) que segmenta o usuário em:
*   **Macro:** Carga vs Passageiros vs Corporativo.
*   **Persona:** TAC (Autônomo), ETC (Empresa), Fretamento, Escolar.
*   **Objetivo:** Regularizar, Gerir, Crescer ou Aprender.
*   **Resultado:** Personaliza toda a interface do Helonex com base nessa escolha inicial.

### 3.6. JusTech & Helonex Resolve
A "Corte Arbitral" digital (`HelonexResolve.tsx`, `ODRConsole.tsx`).
*   **Resolução de Conflitos:** Plataforma ODR (Online Dispute Resolution) para evitar judicialização.
*   **Defesa de Multas:** Automação de recursos contra infrações de trânsito e ANTT.
*   **Seguros:** Gestão integrada de apólices (RCTR-C, RCF-DC).

### 3.7. Módulo de Checklist Operacional (ChecklistModule)
Ferramenta de auditoria de pátio (`ChecklistModule.tsx`) com suporte a voz e evidência fotográfica, seguindo padrões ISO 9001 e ISO 39001 (Segurança Viária).
*   **Templates Dinâmicos:** Carga Nacional, Internacional (TRIC/OTM), Turismo, Escolar, Fretamento e Frota Geral.
*   **Funcionalidades de Auditoria:**
    *   Transcrição de áudio via IA (Gemini) para observações técnicas.
    *   Registro de evidência fotográfica com geolocalização simulada.
    *   **Assinatura Digital:** Protocolo de finalização com geração de Hash de integridade (Soberania de Dados).
    *   **Matriz de Severidade:** Classificação de itens como "Críticos", "Alta" ou "Média" severidade.

---

## 4. SOBERANIA DE DADOS E SEGURANÇA
O sistema Helonex foi projetado sob a premissa de **Soberania de Dados**, garantindo que o transportador tenha controle total e prova de integridade sobre suas operações.
*   **Protocolo Erro Zero:** Validações em tempo real para impedir o despacho de veículos com pendências críticas.
*   **Assinatura Digital:** Todas as auditorias e documentos emitidos possuem um Hash único de validação.
*   **Log Imutável:** Registro de eventos de qualidade no Supabase para auditorias retroativas.

---

## 5. PERSONAS E ADAPTABILIDADE

O sistema foi desenhado para ser fluido, atendendo dois grandes universos com a mesma base de código:

### 4.1. Universo de Cargas (Cargo)
*   **Foco:** RNTRC, CIOT, Vale-Pedágio, Manifesto (MDF-e), Seguros de Carga.
*   **Público:** Caminhoneiros Autônomos (TAC), Transportadoras (ETC), Embarcadores.

### 4.2. Universo de Passageiros (Passenger)
*   **Foco:** TAF (Termo de Autorização de Fretamento), Monitriip, Lista de Passageiros, Laudos de Inspeção (ITL).
*   **Público:** Empresas de Fretamento, Transporte Escolar, Turismo, Linhas Regulares.

---

## 5. INTEGRAÇÕES E SEGURANÇA

*   **Autenticação:** Sistema de Login/Registro com suporte a múltiplos perfis (Admin, Assinante, Parceiro).
*   **Privacidade:** `PrivacyCenter.tsx` para gestão de consentimento e LGPD.
*   **Auditoria:** `ImplementationDossier.tsx` para registro técnico de todas as funcionalidades implementadas.

---

## 6. CONCLUSÃO

O Sistema Helonex encontra-se em estágio avançado de maturidade técnica. A estrutura de código é limpa, tipada (TypeScript) e modular. As funcionalidades de **TRIC/OTM** e **Selo de Qualidade** foram reintegradas com sucesso, garantindo que a visão original de "Soberania Global" seja preservada sem comprometer a segurança jurídica da marca.

Este memorial serve como base para auditorias técnicas, manuais de usuário e futuras expansões do sistema.

---
**Responsável Técnico:** Kernel Operativo Helonex 2026
**Hash de Validação:** HLX-MEM-2026-V1
