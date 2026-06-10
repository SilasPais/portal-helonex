
# 🗺️ HELONEX: ROTEIRO DE LANÇAMENTO E CONTINGÊNCIA (GO-LIVE)

**Objetivo:** Transformar o protótipo funcional em um produto comercializável (SaaS).

---

## 1. FASE DE INFRAESTRUTURA (O ALICERCE)
*Status: Pendente de Configuração*

Para o sistema funcionar na "vida real", precisamos sair do `localStorage` e ir para a Nuvem.

### Ações Imediatas:
1.  **Criar Projeto no Supabase:**
    *   Acesse [supabase.com](https://supabase.com) e crie um projeto gratuito.
    *   Vá em **SQL Editor** e rode o script contido em `supabase_schema.sql`.
    *   Pegue a `URL` e a `ANON_KEY` nas configurações do projeto.
2.  **Configurar Variáveis de Ambiente (Vercel):**
    *   No painel da Vercel, adicione:
        *   `VITE_SUPABASE_URL`: (Sua URL do Supabase)
        *   `VITE_SUPABASE_ANON_KEY`: (Sua Key do Supabase)
        *   `API_KEY`: (Sua Key do Google Gemini - Já deve estar lá)

---

## 2. PLANO DE CONTINGÊNCIA OPERACIONAL (PROTOCOLO SOBREVIVÊNCIA)

Como operar se as integrações governamentais falharem ou não existirem ainda?

### Cenário A: Falha na API da ANTT (GovTech)
*   **Problema:** Não conseguimos validar o RNTRC automaticamente.
*   **Solução Helonex:** Ativar "Modo Declaratório". O usuário faz upload do PDF do RNTRC. A IA (Gemini) lê o PDF e extrai a data de validade, preenchendo o sistema.
*   **Implementação:** Já temos a leitura de imagem no `ChecklistModule`. Expandir para leitura de documentos.

### Cenário B: Falha na Conexão de Banco de Dados
*   **Problema:** Servidor Supabase fora do ar.
*   **Solução Helonex:** O sistema entra automaticamente em `OFFLINE_MODE` (já suportado pelo `guardianSystem` atual). O usuário trabalha localmente e o `BackupManager` alerta para salvar o JSON na máquina dele.

### Cenário C: Erro na IA (Gemini fora do ar)
*   **Problema:** O Mentor não responde.
*   **Solução Helonex:** O sistema exibe os "Cards Estáticos" de conhecimento (já implementados no `DocumentationModule`) em vez do chat, garantindo que o usuário não fique sem resposta técnica.

---

## 3. CHECKLIST DE PRÉ-LANÇAMENTO (O QUE FALTA CODIFICAR)

1.  **Autenticação Real:**
    *   Substituir a tela de login simulada (`LoginScreen.tsx`) pelos hooks de `supabase.auth.signInWithPassword`.
    *   *Impacto:* Segurança real dos dados.

2.  **Storage de Arquivos:**
    *   Configurar "Buckets" no Supabase para salvar as fotos das vistorias e PDFs.
    *   *Impacto:* As fotos do checklist hoje são temporárias. Precisam ser persistentes.

3.  **Gateway de Pagamento:**
    *   Integrar link de pagamento (Stripe ou Asaas) no `SalesFunnel.tsx`.
    *   *Impacto:* Receber dinheiro de verdade.

---

## 4. O DIFERENCIAL "MUNDO REAL" (A ARMA SECRETA)

Enquanto a concorrência vende "consulta de dados", o Helonex venderá **ORGANIZAÇÃO**.
Mesmo sem APIs do governo, o Helonex vale dinheiro porque:
1.  Organiza a frota (GesTech).
2.  Treina o motorista (EduTech).
3.  Gera provas jurídicas (Checklist/JusTech).

**Próximo Passo Sugerido:** Configurar o Supabase e conectar a autenticação real.
