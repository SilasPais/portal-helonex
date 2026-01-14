
# 🚛 HELONEX BRASIL - Dossiê Técnico & Arquitetura de Sistema

**Versão do Sistema:** 1.5.0 (Quality 4.0 & Compliance 2026 Update)
**Status:** Produção / MVP Avançado
**Filosofia:** "Não vendemos licenças, cuidamos de vidas."

---

## 1. Visão Geral do Ecossistema (2026 Ready)

O **Portal HELONEX** não é um site simples; é uma **Plataforma de Sistemas Integrados (ERP Logístico Modular)**. Ele foi desenhado para resolver a complexidade regulatória do transporte brasileiro (Cenário 2026) através de quatro pilares tecnológicos:

1.  **GovTech:** Automação de processos governamentais (ANTT, Denatran, Receita Federal).
    *   *Update 2026:* Integração com Barramento de Seguros (SUROC 27/2025).
2.  **EduTech:** Academia corporativa com geração de conteúdo dinâmica via IA.
3.  **JusTech:** Análise jurídica de infrações e defesa automática (Autodenúncia).
4.  **GesTech:** Gestão da Qualidade (ISO 9000), Frota e Manutenção Preditiva.

---

## 2. Arquitetura Lógica (O Cérebro do Sistema)

O sistema opera sob uma arquitetura **Client-Side Heavy** com um **Core de Serviços Centralizado**, simulando um ambiente de alta disponibilidade.

### 2.1. A Estrutura de Componentes (React + Vite)
O Frontend é construído em React 19, utilizando uma abordagem baseada em componentes funcionais e Hooks. A árvore de decisão principal reside no `App.tsx`, que atua como o **Roteador de Estado**:

*   **Public Zone:** `Hero`, `ServicesGrid`, `SalesFunnel` (Topo de Funil).
*   **Client Zone:** `ClientDashboard`, `QualityManagement`, `ServiceDetail` (Área Logada).
*   **Admin Zone:** `AdminPanel` (Gestão Backoffice).
*   **AI Layer:** `MentorChat` (Assistente Flutuante Global).

### 2.2. O Motor de Dados (`guardianSystem.ts`)
Diferente de apps comuns que espalham lógica, o Helonex utiliza o `guardianSystem.ts` como um **Singleton Service (Motor Guardião)**.
*   **Função:** Ele centraliza TODAS as regras de negócio, persistência de dados (LocalStorage/Mock DB) e validações complexas.
*   **Integração:** Quando um componente precisa de dados (ex: `QualityManagement`), ele solicita ao `guardianSystem`, garantindo que a regra de negócio (ex: cálculo de IQT) seja única e consistente.

### 2.3. Inteligência Artificial RAG (`geminiService.ts`)
A IA não é apenas um chatbot. Ela utiliza **RAG (Retrieval-Augmented Generation)** atualizado com as leis de 2026.
1.  **Interceptação:** O usuário faz uma pergunta sobre leis.
2.  **Retrieval:** O sistema busca na base de conhecimento interna (`LEGAL_KNOWLEDGE_BASE`) as leis vigentes (ex: Resolução 6.074).
3.  **Augmentation:** Injeta a lei no prompt do sistema.
4.  **Generation:** O Google Gemini 3 gera a resposta baseada na lei, não em alucinação.

---

## 3. Módulos do Sistema e Comportamento Integrado

O Helonex se comporta como um organismo vivo onde os dados fluem entre departamentos.

### 3.1. Módulo GovTech & Compliance
*   **Entrada:** Dados da empresa (`GovData`) e Frota.
*   **Processamento:** O `guardianSystem` cruza vencimentos de CNH, RNTRC e Multas.
*   **Saída:** Alertas visuais no Dashboard e bloqueio preventivo de viagens (Checklist).

### 3.2. Módulo Quality 4.0 (ISO 9000)
Este módulo recém-implementado conecta a operação à estratégia.
*   **Ferramentas:** Diagrama de Ishikawa, 5W2H, Análise SWOT.
*   **Integração:** Uma "Não Conformidade" (RNC) aberta no módulo de Qualidade pode bloquear um veículo no módulo de Frota ou gerar um treinamento obrigatório no módulo EduTech.
*   **BSC:** Indicadores Balanceados (Financeiro, Cliente, Processos) atualizados em tempo real.

### 3.3. Módulo EduTech (Academia Dinâmica)
*   **Diferencial:** "Living Course". O conteúdo não é estático.
*   **IA Generativa:** O sistema permite criar cursos personalizados on-demand baseados no perfil do aluno (TAC vs ETC).

### 3.4. Módulo Turismo & CRM
*   **Foco:** Gestão de passageiros e viagens.
*   **Behavior:** Calcula o LTV (Lifetime Value) do passageiro e sugere pacotes baseados no histórico de viagens e perfil socioeconômico (aposentado, servidor público).

---

## 4. Fluxo de Dados (Data Model)

O sistema é fortemente tipado (`types.ts`) para garantir robustez. Os principais modelos são:

### CompanyProfile (A Raiz)
Tudo deriva do perfil da empresa. Se a empresa é "PASSAGEIROS", o dashboard se adapta. Se é "CARGA", as ferramentas mudam.

```typescript
interface CompanyProfile {
  // Dados Cadastrais
  name: string;
  cnpj: string;
  type: 'ETC' | 'TAC';
  
  // Motores de Decisão
  operationMode: 'TCP' | 'TRRC'; // Define regra tributária
  iqtScore: number; // Índice de Qualidade (0-100)
  
  // Sub-sistemas
  govData: GovData; // Dados da ANTT/Detran
  bsc: BSCIndicator[]; // Dados Estratégicos
  qualityMultipliers: QualityMultiplier[]; // Gamificação RH
}
```

---

## 5. Guia de Uso para Desenvolvedores

### Estrutura de Pastas
*   `/components`: Interface do Usuário (UI).
    *   `/admin`: Componentes restritos.
*   `/services`: Lógica de Negócio (Backend simulado + Integração IA).
*   `/types`: Contratos de dados (Interfaces TypeScript).

### Como Adicionar uma Nova Funcionalidade
1.  **Defina o Tipo:** Adicione a interface em `types.ts`.
2.  **Crie a Lógica:** Implemente a função de manipulação em `guardianSystem.ts`.
3.  **Crie a UI:** Desenvolva o componente em `/components`.
4.  **Conecte:** Importe o `guardianSystem` no componente e consuma os dados.

---

© **HELONEX BRASIL** - Tecnologia a serviço da prosperidade.
