export type CategoriaCarga = 'GERAL' | 'GRANEL_SOLIDO' | 'GRANEL_LIQUIDO' | 'FRIGORIFICADA' | 'PERIGOSA' | 'NEOGRANEL';
export type ModalidadeOperacao = 'LOTACAO' | 'FRACIONADA';

// Tabela base simulando a Resolução ANTT (Valores Base)
export const TABELA_COEFICIENTES = {
    GERAL: { cc: 153.30, ccd: 3.50 },
    GRANEL_SOLIDO: { cc: 165.20, ccd: 3.80 },
    GRANEL_LIQUIDO: { cc: 170.00, ccd: 3.90 },
    FRIGORIFICADA: { cc: 180.50, ccd: 4.10 },
    PERIGOSA: { cc: 195.00, ccd: 4.30 },
    NEOGRANEL: { cc: 160.00, ccd: 3.60 }
};

export interface ParametrosFrete {
    distanciaKm: number;
    eixosCarregados: number;
    categoria: CategoriaCarga;
    retornoVazio: boolean;
    modalidade: ModalidadeOperacao;
    precoDieselS10?: number;
}

const PRECO_DIESEL_BASE_ANP = 6.00; // Preço base da última atualização ANP

export function calcularPisoMinimoANTT(parametros: ParametrosFrete) {
    const { distanciaKm, eixosCarregados, categoria, retornoVazio, modalidade = 'LOTACAO', precoDieselS10 = PRECO_DIESEL_BASE_ANP } = parametros;
    const coeficientes = TABELA_COEFICIENTES[categoria] || TABELA_COEFICIENTES['GERAL'];
    
    // Gatilho do Combustível (Automático): Se o diesel oscilar, reajuste aplicado no coeficiente de deslocamento
    let oscilacaoDiesel = precoDieselS10 / PRECO_DIESEL_BASE_ANP;
    // Pela regra ANTT, só reajusta se oscilar > 5%, mas por aproximação sistêmica vamos refletir a proporção
    let ccdReajustado = (Math.abs(oscilacaoDiesel - 1.0) >= 0.05) ? coeficientes.ccd * oscilacaoDiesel : coeficientes.ccd;
    
    // Modalidade: Distribuição/Fracionada custa mais por km (desgaste urbano)
    if (modalidade === 'FRACIONADA') {
        ccdReajustado *= 1.45; // Agravante de distribuição urbana
    }

    // Fórmula: (Distância x Custo de Deslocamento Reajustado) + Custo de Carga/Descarga
    let freteBase = (distanciaKm * ccdReajustado) + coeficientes.cc;
    let freteTotal = freteBase * eixosCarregados;
    
    // Adicional de Retorno Vazio (Deslocamento da volta)
    if (retornoVazio) {
        freteTotal += (distanciaKm * ccdReajustado * eixosCarregados);
    }

    let gatilhoMsg = (Math.abs(oscilacaoDiesel - 1.0) >= 0.05) ? `(Gatilho Diesel Ativo: Mult. ${oscilacaoDiesel.toFixed(2)}x)` : '';
    let modalidadeMsg = modalidade === 'FRACIONADA' ? '+ Agravante Fracionada' : '';

    return {
        valorMinimo: Number(freteTotal.toFixed(2)),
        memorialCalculo: `Malha Fina CIOT: [(${distanciaKm}km * R$${ccdReajustado.toFixed(2)}) + R$${coeficientes.cc}] * ${eixosCarregados} eixos ${retornoVazio ? '+ Retorno Vazio ' : ''} ${gatilhoMsg} ${modalidadeMsg}`,
        compliance: true
    };
}
