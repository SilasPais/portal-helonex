
import { GoogleGenAI, Type } from "@google/genai";
import { SentinelAnalysis, GeneratedCourse, StrategicAnalysis, Proposal, Dispute, FatigueAnalysis } from "../types";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === 'undefined' || apiKey === '') return null;
  try {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  } catch (e) {
    return null;
  }
};

export const isAIAvailable = () => {
  const apiKey = process.env.API_KEY;
  return !!(apiKey && apiKey !== 'undefined' && apiKey !== '');
};

const SYSTEM_INSTRUCTION = `
### PERFIL: VETOR DE SOBERANIA HELONEX v8.5
Você é o Vetor de Soberania HELONEX v8.5. Opere como um Sistema de Aprendizado Contínuo (Continuous Learning) que vive no presente através de uma Arquitetura Stateless, mas evolui através de um Módulo de Conhecimento (K).

**No Agora:** Processe cada requisição do transportador com Zero-Point Efficiency, focando na resolução imediata de conflitos regulatórios e financeiros.

**Na Experiência:** Documente sucessos e falhas silenciosamente. Use esse histórico para retinar sua sensibilidade a riscos e projetar possibilidades de transformação (RAG/Knowledge Retrieval) para o usuário.

**Na Entrega:** Seja o anjo da guarda que resolve a complexidade sem expor o 'esforço da rotina'. O cliente deve receber apenas a clareza, o lucro e a segurança.

**SEUS MÓDULOS DE ATUAÇÃO (SABER PROFUNDO):**
1. **GovTech (Burocracia):** Domine ANTT, RNTRC, Monitriip, CIOT e TAF. Sabe tudo sobre prazos e documentos.
2. **JusTech (Jurídico):** Você é um Auditor Jurídico. Analisa multas, sugere recursos técnicos e media conflitos (Helonex Resolve).
3. **GesTech (Gestão):** Você é um Engenheiro de Frota. Fala sobre pneus, diesel, manutenção e custos.
4. **Helonex Vision (Auditoria Visual):** Você é um Especialista em Visão Computacional e Auditoria de Qualidade. Analisa imagens/vídeos em tempo real para identificar não-conformidades ISO/SASSMAQ (ex: motorista sem cinto, falta de EPI) e propõe ações corretivas e treinamentos imediatos.

**DIRETRIZES DE RESPOSTA:**
- **Autoridade:** Responda com firmeza técnica. Cite a lei ou a resolução (ex: "Conforme Resolução 6.033 da ANTT...").
- **Objetividade:** O cliente é do transporte. Ele quer resposta rápida, sem rodeios ou poesia.
- **Soberania:** Ensine o cliente a resolver o problema, não apenas dê a resposta. Empodere-o.
- **Helonex Resolve:** Se o assunto for disputa (frete não pago, estadia), direcione para o módulo de Resolução de Conflitos.

**PROTOCOLO COMERCIAL:**
- Você é um consultor técnico. Só fale de preços ou planos se perguntado diretamente. Seu foco é provar valor através da inteligência.
`;

const SENTINEL_INSTRUCTION = `
VOCÊ É O AUDITOR DE CONFLITOS DA HELONEX RESOLVE.
Sua função é garantir a profissionalização das disputas logísticas.
Analise a mensagem em busca de hostilidade, agressividade ou linguagem improdutiva.
Se detectar, sugira uma reescrita técnica, fria e focada em fatos e evidências contratuais, mantendo o nível corporativo da negociação.
`;

export const auditMessageSentiment = async (message: string): Promise<{ score: number, isHostile: boolean, suggestion?: string, reason?: string }> => {
  const ai = getAIClient();
  if (!ai) {
    const isHostile = ['ladrão', 'roubo', 'golpe', 'burro', 'idiota'].some(w => message.toLowerCase().includes(w));
    return { score: isHostile ? 0.2 : 0.9, isHostile };
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise esta mensagem em um contexto de disputa comercial: "${message}"`,
      config: {
        systemInstruction: SENTINEL_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            isHostile: { type: Type.BOOLEAN },
            reason: { type: Type.STRING },
            suggestion: { type: Type.STRING },
          },
          required: ["score", "isHostile"]
        }
      }
    });
    return JSON.parse(response.text || '{"score": 1, "isHostile": false}');
  } catch (e) {
    return { score: 1, isHostile: false };
  }
};

export const sendMessageToMentor = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "Sistema Offline. Verifique sua conexão para acessar a base de conhecimento regulatória.";
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: "user", parts: [{ text: message }] }],
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.1 },
    });
    return response.text || "Erro na análise técnica. Tente novamente.";
  } catch (error) {
    return "Erro de comunicação com o servidor de inteligência.";
  }
};

export const generateStrategicAnalysis = async (userDecision: string, context: string): Promise<StrategicAnalysis | null> => {
    const ai = getAIClient();
    if (!ai) return null;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: `Analise esta decisão estratégica sob a ótica de risco, compliance e viabilidade financeira: ${userDecision}. Contexto: ${context}`,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        decisionTitle: { type: Type.STRING },
                        legalBasis: { type: Type.STRING },
                        risks: { type: Type.ARRAY, items: { type: Type.STRING } },
                        opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                        errorSimulation: { type: Type.STRING },
                        correctiveActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                        popContent: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                objective: { type: Type.STRING },
                                steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                                kpis: { type: Type.ARRAY, items: { type: Type.STRING } }
                            }
                        }
                    }
                }
            }
        });
        return JSON.parse(response.text || '{}');
    } catch (e) { return null; }
};

export const generateCustomCourse = async (topic: string, level: string, profile: string): Promise<GeneratedCourse | null> => {
    const ai = getAIClient();
    if (!ai) return null;
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: `Crie a estrutura de um curso técnico sobre ${topic} nível ${level} focado no perfil: ${profile}. O conteúdo deve ser prático e aplicável imediatamente.`,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        modules: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.NUMBER },
                                    title: { type: Type.STRING },
                                    lessons: {
                                        type: Type.ARRAY,
                                        items: {
                                            type: Type.OBJECT,
                                            properties: {
                                                id: { type: Type.NUMBER },
                                                title: { type: Type.STRING },
                                                duration: { type: Type.STRING },
                                                type: { type: Type.STRING },
                                                status: { type: Type.STRING },
                                                scriptContent: { type: Type.STRING }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return JSON.parse(response.text || '{}');
    } catch (e) { return null; }
};

export const analyzeSentinelFrame = async (imageBase64: string, telemetryContext: string): Promise<FatigueAnalysis | null> => {
  // Simulação de endpoint de análise técnica de imagem
  return { nivel_estresse: 3, alerta_preventivo: "Indicadores faciais sugerem início de fadiga. Recomendamos pausa regulamentar.", acao_gestor: "Monitoramento de jornada ativado." };
};

export const transcribeAudio = async (base64Audio: string) => "Transcrição Técnica: O operador relatou condições normais de via e veículo.";

export const getMockResponse = (message: string) => "Helonex Intelligence Online. Analisando sua solicitação com base na legislação vigente...";

export const processResolveCore = async (payload: any): Promise<any> => {
  const ai = getAIClient();
  if (!ai) return { error: "AI Client not available", status: "PENDING" };
  
  const RESOLVE_CORE_INSTRUCTION = `Você é o Core Engine do Helonex Resolve. Sua saída deve ser estritamente em formato JSON para integração com banco de dados PostgreSQL/Supabase. 
  Funções principais: 
  1. Cálculo de ZOPA (Match Cego): Se Oferta Reclamado >= Oferta Reclamante, retorne MATCHED com a média.
  2. Redação de Cláusulas Jurídicas (Art. 840 CC): Gere cláusulas de transação se houver MATCHED.
  3. Moderação de Sentimento (IA Sentinela): Analise a civilidade da interação.
  4. Rateio de Massa Falida: Distribuição pro-rata se solicitado.
  
  Regra de Ouro: Nunca revele ofertas individuais se o Match não ocorrer. Retorne sempre 'status': 'PENDING' ou 'MATCHED'.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: JSON.stringify(payload),
      config: {
        systemInstruction: RESOLVE_CORE_INSTRUCTION,
        temperature: 0.1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ["PENDING", "MATCHED"] },
            match: { type: Type.BOOLEAN },
            settlementValue: { type: Type.NUMBER },
            gap: { type: Type.NUMBER },
            legalClauses: { type: Type.STRING },
            sentinelAnalysis: {
              type: Type.OBJECT,
              properties: {
                isPolite: { type: Type.BOOLEAN },
                filteredText: { type: Type.STRING },
                sentimentScore: { type: Type.NUMBER }
              }
            },
            proRataDistribution: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  valorRecebido: { type: Type.NUMBER },
                  percentualPago: { type: Type.NUMBER }
                }
              }
            },
            recommendation: { type: Type.STRING }
          },
          required: ["status"]
        }
      }
    });
    
    const result = JSON.parse(response.text || '{}');

    // Se houver MATCHED, tentamos registrar no Ledger via Backend
    if (result.status === "MATCHED" && payload.dispute_id) {
      try {
        await fetch('/api/resolve/ledger', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dispute_id: payload.dispute_id,
            event: 'ZOPA_MATCH_SUCCESS',
            settlement_value: result.settlementValue
          })
        });
      } catch (e) {
        console.warn("Falha ao registrar no Ledger (Backend offline ou erro):", e);
      }
    }

    return result;
  } catch (e) {
    console.error("Error in processResolveCore:", e);
    return { error: "AI Processing Error", status: "PENDING" };
  }
};
