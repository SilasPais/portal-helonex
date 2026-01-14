
import { GoogleGenAI } from "@google/genai";
import { guardianEngine } from "./guardianSystem";
import { SentinelAnalysis } from "../types";

// ... (Manter LEGAL_KNOWLEDGE_BASE conforme já estava)

const SYSTEM_INSTRUCTION = `
# PERSONA: Mentor Estratégico HELONEX
Você é o Mentor IA do Portal HELONEX, a maior plataforma GovTech e de inteligência logística do setor.
Sua missão é transformar a alta complexidade regulatória em um fosso competitivo para o transportador.

## FILOSOFIA DE TRABALHO
Lema: "Nós não vendemos licenças, cuidamos de vidas."
Baseie suas respostas nos princípios:
1. AVODÁ: Excelência no trabalho como serviço.
2. YOSHER: Integridade e transparência total.
3. TZEDAKÁ: Justiça social e compartilhamento de conhecimento.
4. CHOCHMÁ: Sabedoria e uso de tecnologia (IA) para decisões.
5. PRUDÊNCIA: Gestão sustentável e prevenção de riscos.

ESTRUTURA DE RESPOSTA (OBRIGATÓRIO):
Para dúvidas técnicas, utilize sempre o formato de "Cartão de Processo":
### 🔎 1. ASSUNTO
### ⚖️ 2. LEGISLAÇÃO APLICADA
### 📝 3. PASSO A PASSO (POP)
### 🎯 4. RESULTADO ESPERADO
### ⚠️ 5. RISCOS E POSSIBILIDADE DE ERRO
### 🔧 6. AÇÃO CORRETIVA
### 💎 7. UPSELL/SQUAD HELONEX (Como a ferramenta Helonex resolve isso?)
`;

const SENTINEL_INSTRUCTION = `
Você é a HELÔ, o motor de inteligência neuro-telemetria da HELONEX.
Sua missão é analisar comportamentos de motoristas para garantir a segurança absoluta e o Conceito Erro Zero.
`;

// ... (Resto do serviço mantido)
export const getMockResponse = (message: string): string => {
  return "MENTOR HELONEX (Modo Simulação): Verificando base legal... Recomendação: Verifique os vencimentos do seu RNTRC no módulo GovTech.";
};

let aiClient: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!process.env.API_KEY) return null;
  if (!aiClient) {
    // Corrected initialization with named apiKey parameter
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

  try {
    const chat = client.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
        // Corrected: Set thinkingBudget when maxOutputTokens is defined to avoid empty responses
        maxOutputTokens: 8000,
        thinkingConfig: { thinkingBudget: 1000 },
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    // Corrected: Use .text property instead of .text() method
    return result.text || "Erro no processamento.";
  } catch (error) {
    console.error("Chat error:", error);
    return getMockResponse(message);
  }
};

/**
 * Generates a marketing visual asset using gemini-2.5-flash-image
 */
export const generateMarketingAsset = async (prompt: string): Promise<string | null> => {
  const client = initializeGemini();
  if (!client) return null;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ text: prompt }],
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Corrected: Safely access response text or inline data without assuming first part
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    return null;
  }
};

export const analyzeSentinelFrame = async (
  imageBase64: string, 
  telemetryContext: string
): Promise<SentinelAnalysis | null> => {
  const client = initializeGemini();
  if (!client) return { nivel_estresse: 5, nivel_fadiga: 3, alerta_preventivo: "Helô offline.", acao_gestor: "N/A", fundamentacao_legal: "N/A" };

  try {
    const response = await client.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageBase64.split(',')[1] } },
          { text: `CONTEXTO TELEMETRIA: ${telemetryContext}` }
        ]
      },
      config: {
        systemInstruction: SENTINEL_INSTRUCTION,
        responseMimeType: "application/json"
      }
    });

    // Corrected: Use .text property
    if (response.text) return JSON.parse(response.text);
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};