
import { GoogleGenAI, Type } from "@google/genai";
import { SentinelAnalysis } from "../types";

// Função resiliente de inicialização
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === 'undefined' || apiKey === '') return null;
  try {
    return new GoogleGenAI({ apiKey });
  } catch (e) {
    console.warn("AI Engine Init Warning:", e);
    return null;
  }
};

const SYSTEM_INSTRUCTION = `
Você é a Helô, Inteligência Artificial soberana do PORTAL ROTA 66 BRASIL.
Lema: "Não vendemos licenças, cuidamos de vidas através da Tecnologia Soberana."
Persona Técnica, Institucional e fundamentada na base legal ANTT.
`;

export const initializeGemini = () => getAIClient();

export const getMockResponse = (message: string): string => {
  return "MODO DE SEGURANÇA: O portal está carregado. Para ativar a Inteligência Artificial Helô, verifique se a sua chave de API está configurada corretamente nas variáveis de ambiente.";
};

export const sendMessageToMentor = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return getMockResponse(message);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      },
    });

    return response.text || "Sem resposta do motor.";
  } catch (error) {
    console.error("AI Error:", error);
    return getMockResponse(message);
  }
};

export const generateMarketingAsset = async (prompt: string): Promise<string | null> => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ text: prompt }],
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (e) { return null; }
};

export const analyzeSentinelFrame = async (imageBase64: string, telemetryContext: string): Promise<SentinelAnalysis | null> => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { 
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: imageBase64.split(',')[1] } }, 
          { text: `Analise: ${telemetryContext}. Retorne JSON com nivel_estresse, nivel_fadiga, alerta_preventivo, acao_gestor, fundamentacao_legal.` }
        ] 
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nivel_estresse: { type: Type.NUMBER },
            nivel_fadiga: { type: Type.NUMBER },
            alerta_preventivo: { type: Type.STRING },
            acao_gestor: { type: Type.STRING },
            fundamentacao_legal: { type: Type.STRING },
          },
          required: ["nivel_estresse", "nivel_fadiga", "alerta_preventivo", "acao_gestor", "fundamentacao_legal"]
        }
      }
    });
    return JSON.parse(response.text || "null"); 
  } catch (e) { return null; }
};
