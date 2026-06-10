
# 🎨 HELONEX DESIGN SYSTEM & UX GUIDELINES

Este documento descreve como a filosofia do "Sistemas Operacional da Luz (S-O-L)" é traduzida visualmente na interface.

---

## 1. PALETA DE CORES SEMÂNTICA (Tailwind Config)

| Cor | Hex | Classe Tailwind | Significado Espiritual/Prático |
| :--- | :--- | :--- | :--- |
| **Deep Void** | `#020617` | `bg-slate-950` | **O Terreno:** A seriedade do mercado, o asfalto à noite. Fundo padrão. |
| **Helonex Gold** | `#f59e0b` | `text-hlx-gold` | **A Luz (L):** Prosperidade, Valor, Alerta de Oportunidade, Premium. |
| **Trust Blue** | `#1e40af` | `bg-hlx-blue` | **O Objeto (O):** Tecnologia, Confiança, Conexão Governamental (GovTech). |
| **Signal Red** | `#ef4444` | `text-red-500` | **A Sentinela:** Risco, Alerta de Parada, Proteção Ativa. |
| **Growth Green** | `#22c55e` | `text-green-500` | **O Substrato Transformado:** Lucro, Caminho Livre, Conformidade. |

---

## 2. TIPOGRAFIA & HIERARQUIA

*   **Fonte de Títulos (Display):** `Oswald` (Google Fonts).
    *   *Uso:* Títulos de seções, Valores Financeiros, Badges.
    *   *Feeling:* Forte, Industrial, Robusta (Lembra placas de rodovia e máquinas).
*   **Fonte de Corpo (Body):** `Inter` (Google Fonts).
    *   *Uso:* Textos longos, Chat, Documentos.
    *   *Feeling:* Limpa, Tecnológica, Legível em telas de celular no sol.

---

## 3. COMPONENTES VISUAIS (A "CARA" DOS MÓDULOS)

### A. O Tribunal Digital (Helonex Resolve)
*   **Estética:** "Clean Room" / Sala Segura.
*   **Elementos:**
    *   Bordas sutis (`border-white/10`).
    *   Fundos sólidos para leitura de texto (`bg-slate-900`).
    *   Ícones de cadeado e escudo sempre visíveis.
    *   Timeline de chat similar a apps de mensagem seguros (ex: Signal), mas com tom corporativo.

### B. Torre de Controle (Dashboard)
*   **Estética:** Cockpit de Avião / HUD.
*   **Elementos:**
    *   Widgets flutuantes com `shadow-xl`.
    *   Gráficos com gradientes (AreaCharts).
    *   Indicadores de status (bolinhas pulsantes) em tempo real.
    *   Densidade de informação alta, mas com respiro (padding).

### C. A Jornada (EduTech & Carreira)
*   **Estética:** RPG / Gamificação.
*   **Elementos:**
    *   Árvore de Conexões (Linhas conectando nós).
    *   Ícones desbloqueáveis (Cadeado fechado vs aberto).
    *   Barras de progresso com brilho.
    *   Cores mais vibrantes (Roxo, Rosa) para diferenciar do operacional.

---

## 4. INTERAÇÕES E ANIMAÇÕES

*   **Hover Effects:** Tudo que é clicável deve reagir.
    *   Botões: `hover:bg-yellow-400` (Brilho).
    *   Cards: `hover:border-hlx-gold/50` (Foco).
*   **Transições:** Suaves (`transition-all duration-300`). Nada "pisca" bruscamente, tudo flui como um caminhão na estrada.
*   **Feedback:**
    *   Sucesso: Confetes sutis ou check verde pulsante.
    *   Erro: Tremor suave ou borda vermelha.
    *   Carregamento: Skeleton screens (esqueleto) em vez de spinners simples, para dar sensação de velocidade.

---

## 5. REGRAS DE OURO (UX DO CAMINHONEIRO)

1.  **Botões Grandes:** O usuário pode estar usando luvas ou com o caminhão em movimento (parado no semáforo). Áreas de toque devem ser generosas (min 44px).
2.  **Contraste Alto:** O app será usado sob o sol forte na cabine. Fundo escuro com texto branco/amarelo garante legibilidade.
3.  **Jargão Correto:** Não use "Upload Realizado". Use "Documento na Mão". A linguagem deve ser a do trecho, mas profissional.
4.  **Feedback Imediato:** O sistema nunca deixa o usuário no vácuo. Se a API demora, a Helô (IA) avisa: "Estou negociando com o servidor da ANTT...".

