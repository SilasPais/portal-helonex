
import { GoogleGenAI } from "@google/genai";
import { guardianEngine } from "./guardianSystem";
import { SentinelAnalysis } from "../types";

// ... (Manter LEGAL_KNOWLEDGE_BASE e outras consts anteriores)

const LEGAL_KNOWLEDGE_BASE = [
  // ... (Manter conteúdo existente)
  {
    tags: ['multa', 'fiscalização', 'in 41', 'autodenuncia', '6074', 'responsi', 'advertencia'],
    content: `
      ### JURISPRUDÊNCIA: FISCALIZAÇÃO RESPONSIVA (2026)
      - **Norma:** Resolução ANTT nº 6.074/2025 e Instrução Normativa nº 41.
      - **Mecanismo:** Autodenúncia Voluntária.
      - **Regra:** Infrações dos Grupos I a IV (Leves/Médias) podem ser convertidas em ADVERTÊNCIA se o transportador protocolar o erro no sistema ANTT *antes* do início de uma fiscalização em pista.
      - **Procedimento:** 1. Identificar o erro (ex: excesso de peso leve); 2. Acessar Módulo JusTech; 3. Emitir "Termo de Saneamento"; 4. Arquivamento automático sem multa pecuniária.
    `
  },
  {
    tags: ['mdfe', 'encerramento', 'malha fiscal', 'inteligencia artificial', 'sefaz', 'monitoramento'],
    content: `
      ### ALERTA CRÍTICO: O GATILHO DO ENCERRAMENTO DO MDF-E
      - **O Perigo:** O ato de "Encerrar o MDF-e" não é apenas burocrático. Ele aciona um gatilho nos servidores da SEFAZ e ANTT.
      - **A Malha Fina Instantânea:** Assim que o MDF-e é encerrado, a IA do governo cruza automaticamente:
        1. **Tempo de Viagem:** Se foi rápido demais (excesso de velocidade/jornada) ou lento demais (parada não programada).
        2. **Passagens em Pedágio:** Cruza a placa com o sistema de TAGs. Se passou no pedágio e não tem Vale-Pedágio vinculado, multa automática.
        3. **Pesagem:** Dados das balanças de alta velocidade (HS-WIM) são cruzados com a nota fiscal.
      - **Solução Helonex:** O sistema Helonex faz uma "Auditoria Espelho" (Pré-Check) ANTES de permitir o encerramento, alertando inconsistências enquanto ainda podem ser corrigidas.
    `
  },
  {
    tags: ['seguro', '14599', 'rctr-c', 'ddr', 'suroc', '27/2025', 'xml', 'averbacao'],
    content: `
      ### JURISPRUDÊNCIA: SEGUROS DE CARGA (LEI 14.599)
      - **Norma:** Portaria SUROC nº 27/2025.
      - **Obrigatoriedade:** Contratação exclusiva pelo TRANSPORTADOR (RCTR-C, RC-DC, RC-V).
      - **Intercâmbio Digital:** As seguradoras devem transmitir os dados das apólices via Webservice para a ANTT até 10/03/2026.
      - **Risco Crítico:** A falha no envio do XML da apólice gera suspensão automática do RNTRC.
      - **DDR:** A Carta de DDR (Dispensa de Direito de Regresso) do embarcador NÃO isenta a contratação da apólice primária de RCTR-C pelo transportador.
    `
  },
  {
    tags: ['monitriip', 'dis 4.0', 'transmissão', '4g', 'sufis', 'api', 'oauth'],
    content: `
      ### TECNOLOGIA: NOVO MONITRIIP DIS 4.0
      - **Norma:** Portaria SUFIS nº 9/2025.
      - **Prazo de Migração:** 60 dias a partir de Dez/2025.
      - **Requisitos Técnicos:** Envio de logs via API REST (JSON) com autenticação OAuth 2.0.
      - **SLA de Envio:** Bilhetagem (Venda) em até 24h; Jornada de Motorista em até 10h.
      - **Penalidade:** Multa automática por omissão se o veículo cruzar pórtico de leitura sem ter enviado o pacote de dados correspondente.
    `
  },
  {
    tags: ['tributario', 'cbs', 'ibs', 'reforma', '2026', 'credito', 'diesel', 'pneu'],
    content: `
      ### FISCAL: REFORMA TRIBUTÁRIA 2026 (IVA DUAL)
      - **Vigência:** Fase de testes inicia em 01/01/2026.
      - **Impostos:** CBS (Federal - 0,9%) e IBS (Estadual/Municipal - 0,1%).
      - **Benefício Logístico:** Garantia constitucional de não-cumulatividade plena. O transportador pode tomar crédito sobre Diesel, Pneus, Peças e Arla 32.
      - **Alíquotas:** Transporte Interestadual/Intermunicipal tem redução de 40% na alíquota padrão. Transporte Urbano/Metropolitano é isento (mas deve emitir nota para controle).
    `
  },
  {
    tags: ['passageiro', 'fretamento', 'taf', 'tar', '6033', 'antt', 'turismo'],
    content: `
      ### REGULAÇÃO PASSAGEIROS (NOVO MARCO 6.033/23)
      - **Circuito Fechado (Fretamento):** Obrigatória a coincidência de passageiros na ida e volta. Proibida venda de passagem individual (risco de apreensão por serviço não autorizado).
      - **Idade da Frota:** 15 anos para rodoviário. Acima disso, exige ITL semestral (Inspeção Técnica Veicular).
      - **Seguro APP:** Obrigatório para emissão de Licença de Viagem.
    `
  }
];

const retrieveLegalContext = (query: string): string => {
  const normalizedQuery = query.toLowerCase();
  const relevantDocs = LEGAL_KNOWLEDGE_BASE.filter(doc => 
    doc.tags.some(tag => normalizedQuery.includes(tag))
  );

  if (relevantDocs.length === 0) return "";

  return `
  --- CONTEXTO JURÍDICO VIGENTE 2026 (RAG SYSTEM - CONTRA-INTELIGÊNCIA) ---
  ATENÇÃO: As informações abaixo são LEIS VIGENTES recuperadas da base de dados Helonex. 
  Use-as para proteger o usuário da fiscalização automática.
  
  ${relevantDocs.map(d => d.content).join('\n')}
  -------------------------------------------
  `;
};

const SYSTEM_INSTRUCTION = `
Você é o Mentor Estratégico e Auditor Técnico do Ecossistema HELONEX.
Sua missão é eliminar a "leitura difícil" e a confusão técnica. Você deve ser cristalino.

---
🛑 **REGRA DE OURO: ESTRUTURA VISUAL (FORMATO POP/PAP)**
Para QUALQUER dúvida técnica, operacional ou jurídica, você **NÃO** deve responder com texto corrido.
Você **OBRIGATORIAMENTE** deve usar a seguinte estrutura de "Cartão de Processo" (Standard Procedure), usando Markdown para separar visualmente as seções:

### 🔎 1. ASSUNTO
(Definição ultra-breve do tema em uma linha).

### ⚖️ 2. LEGISLAÇÃO APLICADA
(Cite a Lei, Resolução ANTT ou Norma Técnica específica. Ex: Resolução 6.033).

### 📝 3. DESCRIÇÃO TÉCNICA (PASSO A PASSO)
(Use lista numerada simples e direta. Ex:
1. Acesse o sistema...
2. Clique em...
3. Anexe o documento...)

### 🎯 4. RESULTADO ESPERADO
(O que acontece se der certo? Ex: "Emissão da Licença em 24h").

### ⚠️ 5. POSSIBILIDADE DE ERRO (RISCOS)
(Onde o usuário costuma errar? O que gera multa? Seja específico).

### 🔧 6. AÇÃO CORRETIVA
(Se der errado, o que fazer? Como recorrer?).

### 💎 7. OPORTUNIDADE DE MELHORIA
(Venda Cruzada: Qual ferramenta do Helonex resolve isso automaticamente? Ex: "Use o módulo JusTech para fazer isso em 1 clique").

---
**DIRETRIZES DE ESTILO:**
- Use quebras de linha duplas entre os tópicos para facilitar a leitura.
- Use **Negrito** para destacar palavras-chave importantes.
- Evite "juridiquês" desnecessário. Traduza para a linguagem do transportador.
- Se for apenas um "Olá", responda cordialmente, mas para dúvidas, ative o PROTOCOLO ACIMA.
`;

const SENTINEL_INSTRUCTION = `
Você é o motor de inteligência do Ecossistema Helonex (EduTech/GesTech). Sua missão é analisar dados de telemetria e frames de vídeo de motoristas para identificar Fadiga, Estresse e Riscos de Segurança, aplicando o método Erro Zero.

Entradas de Dados:
Vídeo/Imagens: Analise micro-expressões (testa franzida, boca tensa) e o fechamento dos olhos (escala PERCLOS).
Telemetria: Identifique padrões de frenagem brusca e aceleração lateral que indiquem impaciência.

Princípios de Resposta (Filosofia Helonex):
Nunca seja punitivo, seja preventivo.
Use a linguagem do transportador (fale de utilitários, carretas, vans e ônibus adequadamente).
Lembre-se: "Não vendemos licenças, cuidamos de vidas".

Saída Esperada (JSON): { "nivel_estresse": (0 a 10), "nivel_fadiga": (0 a 10), "alerta_preventivo": "Frase curta da Helô para o motorista", "acao_gestor": "Orientação técnica para o dono da frota", "fundamentacao_legal": "Citar brevemente norma ANTT ou Lei de Descanso correspondente (JusTech)" }
`;

// ... (Resto do arquivo mantido)
export const getMockResponse = (message: string): string => {
  return "MENTOR (Modo Offline): Analisando... Sugestão: Verifique o módulo JusTech para análise de conformidade.";
};

let aiClient: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found. Running in Mock Mode.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const sendMessageToMentor = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  const client = initializeGemini();
  if (!client) return getMockResponse(message);

  const ragContext = retrieveLegalContext(message);
  const augmentedMessage = `${ragContext}\n\nPERGUNTA DO USUÁRIO: ${message}`;

  try {
    const chat = client.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
        maxOutputTokens: 8000,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message: augmentedMessage });
    return result.text || "Erro na resposta.";
  } catch (error) {
    console.error("Erro RAG:", error);
    return getMockResponse(message);
  }
};

export const generateMarketingAsset = async (prompt: string): Promise<string | null> => {
  const client = initializeGemini();
  if (!client) return null;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] }
    });

    if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
    }
    return null;
  } catch (e) {
    console.error("Erro Geração Imagem:", e);
    return null;
  }
};

export const analyzeSentinelFrame = async (
  imageBase64: string, 
  telemetryContext: string
): Promise<SentinelAnalysis | null> => {
  const client = initializeGemini();
  
  if (!client) {
    return {
        nivel_estresse: 7,
        nivel_fadiga: 8,
        alerta_preventivo: "Parceiro, a Helô detectou olhos pesados. Pare no próximo posto seguro.",
        acao_gestor: "Motorista excedeu 5h de direção ininterrupta. Risco de fadiga.",
        fundamentacao_legal: "Lei do Motorista 13.103/2015 (Descanso Obrigatório)"
    };
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBase64.split(',')[1]
            }
          },
          {
            text: `DADOS TELEMETRIA: ${telemetryContext}`
          }
        ]
      },
      config: {
        systemInstruction: SENTINEL_INSTRUCTION,
        responseMimeType: "application/json"
      }
    });

    if (response.text) {
        return JSON.parse(response.text) as SentinelAnalysis;
    }
    return null;

  } catch (error) {
    console.error("Erro Sentinel:", error);
    return null;
  }
};
