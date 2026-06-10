// src/domain/ai/MetacognitiveEngine.ts
// Diretriz: Sistema Autoconsciente Helonex (Monitoramento Heurístico e Autorregulação)

export interface ActionLog {
  userId: string;
  actionType: 'EMISSAO_CIOT' | 'FECHAMENTO_CONTRATO' | 'TENTATIVA_LOGIN_FALHA';
  timestamp: number;
  metadata?: any;
}

export class MetacognitiveEngine {
  private static actionHistory: ActionLog[] = [];

  // 1. Módulo de Segurança (Heurística Antifraude)
  public static analyzeBehavior(newAction: ActionLog): { isAnomalous: boolean; reason?: string } {
    this.actionHistory.push(newAction);
    
    // Limpa logs antigos (mantém apenas a última hora para análise de ritmo)
    const oneHourAgo = Date.now() - 3600000;
    this.actionHistory = this.actionHistory.filter(log => log.timestamp > oneHourAgo);

    // Regra: Detectar excesso de emissões em um curto espaço de tempo (Comportamento de Bot/Fraude)
    const recentActions = this.actionHistory.filter(
      log => log.userId === newAction.userId && log.actionType === newAction.actionType
    );

    if (newAction.actionType === 'EMISSAO_CIOT' && recentActions.length > 5) {
      return { 
        isAnomalous: true, 
        reason: '[ALERTA HEURÍSTICO] Ritmo de emissão anômalo detectado. Possível fraude ou comprometimento de credenciais. Acesso temporariamente congelado.' 
      };
    }

    return { isAnomalous: false };
  }

  // 2. Módulo GesTech (Trava de Sustentabilidade Financeira)
  /**
   * Motor de Cálculo de Piso Mínimo (Res. 6.076/2026 - MP 1.343)
   * Fórmula: Vmin = Dp * CCD + CC
   */
  public static calculateMinimumFreight(distance: number, displacementCoef: number, loadingUnloading: number): number {
    const vMin = (distance * displacementCoef) + loadingUnloading;
    const tollsEstimate = distance * 0.18; 
    return vMin + tollsEstimate;
  }

  /**
   * Protocolo de Desvio de Rota (Real-Time Rerouting)
   * Calcula o valor complementar e retorna o status de conformidade para o CIOT
   */
  public static processRerouting(currentFreight: number, originalDistance: number, newDistance: number, coef: number): { additionalFreight: number, status: string } {
    const extraKm = newDistance - originalDistance;
    if (extraKm <= 0) return { additionalFreight: 0, status: 'CONFORME' };

    const additionalValue = extraKm * coef;
    const totalRequired = currentFreight + additionalValue;
    
    return {
      additionalFreight: additionalValue,
      status: 'PAGAMENTO_COMPLEMENTAR_REQUERIDO'
    };
  }

  public static validateProfitability(custoOperacao: number, valorCobrado: number): { isSustainable: boolean; warning?: string } {
    const margemLucro = ((valorCobrado - custoOperacao) / valorCobrado) * 100;
    const MARGEM_MINIMA_ACEITAVEL = 15; // 15% de margem mínima exigida para a Assessoria

    if (margemLucro < MARGEM_MINIMA_ACEITAVEL) {
      return {
        isSustainable: false,
        warning: `[TRAVA COMERCIAL] Margem projetada (${margemLucro.toFixed(2)}%) está abaixo do limite de segurança corporativa (${MARGEM_MINIMA_ACEITAVEL}%). Exige senha do Administrador Master.`
      };
    }
    return { isSustainable: true };
  }

  // 3. Módulo JusTech (Árbitro Neutro e Mediação)
  public static generateNeutralArbitration(valorCausa: number, tipoConflito: 'ESTADIA' | 'AVARIA' | 'QUEBRA_CONTRATO'): { riskForDefendant: number; settlementSuggestion: number; legalWarning: string } {
    const CUSTO_MEDIO_ADVOGADO = 2500;
    const TEMPO_MEDIO_MESES = 24;
    
    // Calcula o risco financeiro de ir a tribunal (Causa + Custas)
    const riskForDefendant = valorCausa + CUSTO_MEDIO_ADVOGADO + (valorCausa * 0.20); // 20% de honorários sucumbenciais
    
    // Sugestão de acordo metacognitivo (Geralmente 80% do valor da causa, poupando tempo e advogados)
    const settlementSuggestion = valorCausa * 0.80;

    return {
      riskForDefendant,
      settlementSuggestion,
      legalWarning: `[PARECER NEUTRO HELONEX] Um processo judicial para este conflito de ${tipoConflito} pode demorar até ${TEMPO_MEDIO_MESES} meses. O risco financeiro total estimado para o Réu em tribunal é de R$ ${riskForDefendant.toFixed(2)}. A Helonex sugere um acordo imediato de R$ ${settlementSuggestion.toFixed(2)} para encerramento do litígio mediante assinatura digital.`
    };
  }

  // 4. Módulo MOTOR ZOPA (Zone of Possible Agreement)
  public static calculateZOPA(valorCausa: number, ofertaA: number, ofertaB: number): { match: boolean; settlementValue?: number; gap?: number; recommendation: string } {
    // Oferta A (Geralmente o que o Credor aceita receber - Mínimo)
    // Oferta B (Geralmente o que o Devedor aceita pagar - Máximo)
    
    if (ofertaB >= ofertaA) {
      // Houve sobreposição (Match)
      const settlementValue = (ofertaA + ofertaB) / 2;
      return {
        match: true,
        settlementValue,
        recommendation: `[MATCH DETECTADO] As ofertas se cruzaram na Zona de Acordo. Valor sugerido pela média: R$ ${settlementValue.toFixed(2)}. Acordo declarado imediatamente conforme Art. 840 do Código Civil.`
      };
    } else {
      // Não houve sobreposição (Gap)
      const gap = ofertaA - ofertaB;
      const gapPercentage = (gap / valorCausa) * 100;
      
      let recommendation = `[GAP DE NEGOCIAÇÃO] Existe uma diferença de R$ ${gap.toFixed(2)} (${gapPercentage.toFixed(1)}% da causa). `;
      
      if (gapPercentage <= 15) {
        recommendation += "Sugestão: Proposta de 'Split the Difference' para liquidação imediata.";
      } else {
        recommendation += "Sugestão: Iniciar rodada de Leilão Reverso ou Mediação Facilitada.";
      }

      return {
        match: false,
        gap,
        recommendation
      };
    }
  }

  // 5. Módulo IA SENTINELA (Filtro de Civilidade)
  public static sentinelFilter(text: string): { isPolite: boolean; filteredText: string } {
    const forbiddenTerms = ['fraude', 'ladrão', 'mentira', 'safado', 'absurdo', 'golpe'];
    let isPolite = true;
    let filteredText = text;

    forbiddenTerms.forEach(term => {
      const regex = new RegExp(term, 'gi');
      if (regex.test(text)) {
        isPolite = false;
        filteredText = filteredText.replace(regex, '[TERMO REMOVIDO POR INCIVILIDADE]');
      }
    });

    return { isPolite, filteredText };
  }

  // 6. Módulo RATEIO PRO-RATA (Insolvência e Massas Falidas)
  public static proRataDistribution(capitalDisponivel: number, credores: { id: string; valorDevido: number; classe: 'TRABALHISTA' | 'GARANTIA_REAL' | 'QUIROGRAFARIO' }[]): { id: string; valorRecebido: number; percentualPago: number }[] {
    const totalDevido = credores.reduce((acc, c) => acc + c.valorDevido, 0);
    
    if (capitalDisponivel >= totalDevido) {
      return credores.map(c => ({ id: c.id, valorRecebido: c.valorDevido, percentualPago: 100 }));
    }

    // Distribuição proporcional simples (Pode ser expandida para respeitar ordens de preferência legal)
    return credores.map(c => {
      const percentualParticipacao = c.valorDevido / totalDevido;
      const valorRecebido = capitalDisponivel * percentualParticipacao;
      return {
        id: c.id,
        valorRecebido,
        percentualPago: (valorRecebido / c.valorDevido) * 100
      };
    });
  }

  // 7. Módulo de Orientação de Categoria (TAC x MEI x ETC)
  public static evaluateCategoryRisk(currentCategory: 'TAC' | 'MEI_CAMINHONEIRO' | 'ETC', faturamentoMensal: number): { recommendation: string; warning: string; taxSavings: number } {
    const isentoTAC = faturamentoMensal * 0.40; // 40% de isenção no TAC
    const taxSavings = isentoTAC * 0.20; // Estimativa conservadora de economia no IR (considerando 20% de alíquota efetiva)

    let recommendation = '';
    let warning = '';

    if (currentCategory === 'MEI_CAMINHONEIRO') {
      warning = "[ALERTA PREVIDENCIÁRIO] O MEI permite aposentadoria APENAS por idade. Você está perdendo tempo de contribuição acumulado.";
      recommendation = "Considere voltar para TAC (Pessoa Física) ou complementar o INSS para 20% para garantir aposentadoria por tempo.";
    } else if (currentCategory === 'TAC') {
      recommendation = "Você está na categoria com maior proteção legal (Lei 11.442).";
      warning = `[CONFORMIDADE] Lembre-se: O contratante é OBRIGADO a emitir seu CIOT conforme MP 1.343/2026. Não aceite repasse desse custo.`;
    }

    return {
      recommendation,
      warning,
      taxSavings
    };
  }
}
