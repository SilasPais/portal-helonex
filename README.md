
# 🚛 Sistemas Operacional da Luz (S-O-L) - Portal HELONEX Brasil

**Domínio Oficial:** helonex.com.br
**Status:** Pronto para Produção (Conectado ao Supabase)

---

## 📚 DOCUMENTAÇÃO TÉCNICA E ARQUITETURA

A documentação completa do sistema foi gerada e está disponível nos arquivos abaixo. Estes documentos são vitais para o entendimento do **Código da Prosperidade** e da lógica **GovTech/JusTech**.

*   **[📄 DOCUMENTATION.md](./DOCUMENTATION.md)**: Dossiê Técnico Geral. Explica a estrutura de dados, os módulos (GovTech, EduTech, etc.) e o funcionamento do "Motor Guardião".
*   **[🏛️ ARCHITECTURE_AND_PROMPTS.md](./ARCHITECTURE_AND_PROMPTS.md)**: O "Codex Helonex". Contém os Prompts de Sistema (System Instructions) para a IA, Diagramas Mermaid e Análise de Lacunas (Gap Analysis).

---

## 🆘 COMO FAZER O REDEPLOY (PASSO A PASSO VISUAL)

Se você não está achando o botão de Redeploy, siga este mapa:

1. **Saia das Configurações:** Olhe para o menu no topo da página da Vercel.
2. **Clique na aba "Implantações"** (ou *Deployments*). Ela fica entre "Visão Geral" e "Análises".
3. **Encontre o Último Deploy:** Na lista que aparecer, olhe para a primeira linha (o topo da lista).
4. **Menu de Contexto:** No lado **direito** dessa linha, clique nos **três pontinhos (⋮)**.
5. **Ação:** Clique em **Redeploy**.

---

## 🆘 AJUDA RÁPIDA VERCEL (ERRO 404)

Se o site abrir com tela branca ou erro 404:

1. Acesse: **[https://vercel.com/portal-helonexs-projects/portal-helonex/settings](https://vercel.com/portal-helonexs-projects/portal-helonex/settings)**
2. Vá em **Build & Development**.
3. Em **Output Directory**, ative **Override** e digite: `dist`.
4. Salve e faça o **Redeploy** conforme explicado acima.

---

## 🚀 ROTEIRO DE LANÇAMENTO (EMERGÊNCIA)

Siga esta ordem exata para colocar o sistema no ar.

### 1. BANCO DE DADOS (SUPABASE)
1. Acesse seu projeto em [supabase.com](https://supabase.com).
2. Vá em **SQL Editor** (barra lateral esquerda).
3. Clique em "New Query".
4. Copie e cole o conteúdo do arquivo `supabase_setup.sql` que está na raiz deste projeto.
5. Clique em **RUN**.

### 2. GITHUB (O Código)
**⚠️ MUITA ATENÇÃO AQUI:**
Não crie um "Projeto" (Project Board). Você precisa criar um **Repositório**.

1. **Clique neste link direto:** **[https://github.com/new](https://github.com/new)**
2. **Repository name:** `portal-helonex`
3. **Public/Private:** Selecione **Public**.
4. **NÃO MARQUE** as caixas "Add a README file", "Add .gitignore", etc. Deixe vazias.
5. Clique no botão verde **Create repository**.

**APÓS CRIAR O REPOSITÓRIO (No seu VS Code):**
Abra o terminal (Ctrl + J) e digite:

```bash
git init
git add .
git commit -m "Deploy Inicial Helonex"
git branch -M main
# IMPORTANTE: Substitua 'SEU_USUARIO' pelo seu usuário real do GitHub
git remote add origin https://github.com/SEU_USUARIO/portal-helonex.git
git push -u origin main
```

### 3. HOSPEDAGEM (VERCEL)
1. Acesse vercel.com e clique em **"Add New..."** -> **"Project"**.
2. Selecione o repositório `portal-helonex` (que agora vai aparecer).
3. **IMPORTANTE - CONFIGURAÇÃO DE BUILD:**
   - **Framework Preset:** Se não estiver como "Vite", selecione "Vite". Se deixar em "Other", configure manualmente:
   - **Build Command:** `vite build`
   - **Output Directory:** `dist` (Isso é CRUCIAL para evitar o Erro 404).

4. **Variáveis de Ambiente:**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `API_KEY` (Google Gemini)

5. Clique em **Deploy**.

---

## ⚠️ MONITORAMENTO
- **Mentor IA:** Verifica se a `API_KEY` do Gemini está ativa.
- **Banco de Dados:** Painel do Supabase -> Table `profiles`.

© **HELONEX BRASIL** - Tecnologia e Prosperidade.
