# GUIA DE TRANSIÇÃO: HELONEX MUNDO REAL v1.0
## Sair da Simulação para a Soberania Operacional

Este manual detalha os passos críticos para migrar o ecossistema Helonex do ambiente de teste para uma operação comercial real sob as novas regras de 2026 (MP 1.343 e SPED Nível II).

---

### 1. INFRAESTRUTURA DE DADOS (O Cérebro)
- **Supabase (PRODUÇÃO)**: 
    - Migrar de chaves `anon` para chaves baseadas em `RLS` (Row Level Security).
    - Criar as tabelas `disputes`, `resolve_ledger` e `gov_sync_logs` em um projeto Supabase dedicado.
- **Hospedagem**:
    - **App (Frontend + API)**: Deploy no **Google Cloud Run** ou **Vercel** para escalabilidade automática.
    - **Backend (Audit Ledger)**: O Node.js/Express (`server.ts`) deve rodar em ambiente isolado.

### 2. CONEXÃO COM O GOVERNO (O Cerco Eletrônico)
Para que as travas de MDF-e e CIOT funcionem na prática, você deve:
1.  **Certificado Digital**: Adquirir um Certificado **e-CNPJ A1**. 
2.  **Secret Management**: Armazenar o certificado e a senha no **Google Secrets Manager**.
3.  **API Gateway**: Usar o Helonex como ponte entre o ERP e os WebServices:
    - `https://mdfe-portal.sefaz.rs.gov.br` (Exemplo MDF-e RS)
    - `https://api.antt.gov.br/rntrc` (Exemplo ANTT)

### 3. CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE (.env)
Abandone os valores vazios. Insira as credenciais reais:
```env
# Supabase
VITE_SUPABASE_URL=https://[seu-projeto].supabase.co
VITE_SUPABASE_ANON_KEY=[chave-publica]
SUPABASE_SERVICE_ROLE_KEY=[chave-privada-segura]

# IA & Business
GEMINI_API_KEY=[sua-chave-paga-google]
PROFITABILITY_LOCK_PERCENT=15

# Gov Connectivity (Simulação Realista)
GOV_AUTH_TOKEN=[token-antt-homologado]
```

### 4. RITO DE EXECUÇÃO (Checklist de Lançamento)
1. **Passo 1: Compliance Audit** -> Rodar o `MetacognitiveEngine.validateProfitability` em todos os contratos ativos.
2. **Passo 2: Digital Signature** -> Ativar o módulo de assinatura SHA-256 no Resolve para todos os acordos.
3. **Passo 3: MDF-e Hard Lock** -> Configurar o ERP para que NENHUM MDF-e seja emitido se `MetacognitiveEngine.calculateMinimumFreight` retornar valor superior ao negociado.

---
**VEREDITO FINAL**: Para sair da simulação, o Helonex precisa de **fatos (dados reais)** e **vontade (pagamento de APIs e Certificados)**. O código já está pronto para a guerra fiscal de 2026.
