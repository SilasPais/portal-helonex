
import { SentinelAnalysis } from "../types";

// Função para recuperar o SDK injetado globalmente no index.html
const getAIClient = () => {
  const SDK = (window as any).GoogleGenAI;
  const apiKey = process.env.API_KEY;
  if (!SDK || !apiKey || apiKey === 'undefined') return null;
  try {
    return new SDK({ apiKey });
  } catch (e) {
    console.error("Gemini Init Error:", e);
    return null;
  }
};

// --- RAG KNOWLEDGE BASE 2026 ---
const LEGAL_KNOWLEDGE_BASE = [
  {
    tags: ['multa', 'antt', 'advertencia', '6074', 'autodenuncia'],
    content: "Resolução ANTT 6.074/2025: Permite converter multas leves e médias em advertência via Protocolo de Autodenúncia Voluntária antes da fiscalização."
  },
  {
    tags: ['seguro', '14599', 'rctr-c', 'ddr'],
    content: "Lei 14.599/2023: Obriga a contratação do seguro RCTR-C e RC-DC exclusivamente pelo transportador, com transmissão de XML para a ANTT."
  },
  {
    tags: ['monitriip', 'dis 4.0', '4g', 'api'],
    content: "Portaria SUFIS 9/2025: Define o novo Monitriip DIS 4.0 via API REST. Prazos: 24h para bilhetagem e 10h para jornada."
  }
];

const SYSTEM_INSTRUCTION = `
Você é o Mentor Estratégico HELONEX (Versão 3.0).
Lema: "Não vendemos licenças, cuidamos de vidas através da Tecnologia Soberana."
Diretriz: Ao responder dúvidas, cite sempre a base legal (Resolução ANTT, Lei Federal) e aplique o conceito de Erro Zero.
`;

export const initializeGemini = () => getAIClient();

export const getMockResponse = (message: string): string => {
  const msg = message.toLowerCase();
  if (msg.includes('multa')) return "MENTOR (Simulação): Conforme a Resolução 6.074/2025, você pode protocolar uma Autodenúncia no módulo JusTech para converter esse risco em advertência.";
  if (msg.includes('seguro')) return "MENTOR (Simulação): Pela Lei 14.599, a responsabilidade da apólice é sua. Verifique se o XML da seguradora foi transmitido para a ANTT para evitar suspensão do RNTRC.";
  return "MENTOR (Offline): Analisando sua solicitação sob a ótica da Prosperidade Helonex. Para uma resposta técnica completa, verifique sua conexão com o servidor central.";
};

export const sendMessageToMentor = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return getMockResponse(message);

  const ragContext = LEGAL_KNOWLEDGE_BASE
    .filter(doc => doc.tags.some(tag => message.toLowerCase().includes(tag)))
    .map(d => d.content).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + (ragContext ? `\n\nCONTEXTO JURÍDICO VIGENTE:\n${ragContext}` : ''),
        temperature: 0.3,
      },
    });

    return response.text || "Sem resposta do servidor.";
  } catch (error) {
    console.warn("AI Redundancy Active:", error);
    return getMockResponse(message);
  }
};

export const analyzeSentinelFrame = async (imageBase64: string, telemetryContext: string): Promise<SentinelAnalysis | null> => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [{ inlineData: { mimeType: "image/jpeg", data: imageBase64.split(',')[1] } }, { text: telemetryContext }] },
    });
    return null; // Requer parser para produção
  } catch (e) { return null; }
};

export const generateMarketingAsset = async (prompt: string): Promise<string | null> => null;
