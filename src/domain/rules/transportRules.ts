// src/domain/rules/transportRules.ts
// Diretriz: Conformidade AETC - São Paulo (ZMRC) - Portaria Nº 137/18-SMT.GAB
// E Conformidade ANTT (RNTRC)

// 1. REGRA ESTRITA DE RNTRC (ANTT)
export function validarRNTRC(rntrc: string): { isValid: boolean; error?: string } {
  // Remove formatações (pontos, traços)
  const cleanRNTRC = rntrc.replace(/\D/g, '');
  
  // RNTRC obrigatoriamente tem 8 dígitos numéricos
  if (cleanRNTRC.length !== 8) {
    return { isValid: false, error: "[CRÍTICO] RNTRC inválido. Deve conter exatamente 8 dígitos numéricos." };
  }
  return { isValid: true };
}

// 2. MATRIZ DE REGRAS AETC (SÃO PAULO)
export type CategoriaAETC = 
  | 'VUC' 
  | 'URGENCIA'
  | 'GUINCHO' 
  | 'REMOCAO_TERRA'
  | 'JORNALISMO'
  | 'OBRAS_EMERGENCIA'
  | 'ESTACIONAMENTO_PROPRIO'
  | 'OBRAS_INFRAESTRUTURA'
  | 'CONCRETAGEM'
  | 'CONCRETAGEM_BOMBA'
  | 'FEIRAS_LIVRES'
  | 'MUDANCA' 
  | 'PERECIVEIS' 
  | 'PRODUTOS_PERIGOSOS'
  | 'VALORES'
  | 'CACAMBAS'
  | 'SERVICOS_PUBLICOS'
  | 'LIXO'
  | 'CORREIOS'
  | 'SINALIZACAO_TRANSITO';

export const MATRIZ_REGRAS_AETC = {
  VUC: { 
    idadeMaxima: 15, 
    comprimentoMaximo: 7.20, 
    isentaRodizio: false, 
    docsExigidos: ['CRLV', 'CVC', 'PROCURACAO_ASSINADA'],
    areasLiberadas: [
      'ZMRC - Zona de Máxima Restrição de Circulação',
      'ZERC - Zona Especial com Restrição a Circulação',
      'VER - Marginal Tietê (§4º)',
      'VER - Marginal Pinheiros (§2º)',
      'VER - Morumbi (§3º)',
      'Rua Nossa Senhora da Saúde'
    ],
    // [ALERTA CRÍTICO] BLINDAGEM HELONEX: Vias onde a AETC NÃO TEM VALIDADE (VER §1º)
    viasTotalmenteProibidas: [
      'Av. Paulista (Consolação até Oswaldo Cruz)',
      'Av. Rebouças (Paulista até Faria Lima)',
      'Av. Eusébio Matoso',
      'Av. Prof. Francisco Morato (Manfredo Leite até Jorge Lima)',
      'Av. Nove de Julho',
      'Av. Cidade Jardim (Haroldo Veloso até 9 de Julho)',
      'Av. São Gabriel',
      'Av. Santo Amaro (São Gabriel até São Sebastião)',
      'Av. Santos Dumont (Bandeirantes até Pte. das Bandeiras)',
      'Av. Tiradentes (Bandeirantes até Prestes Maia)',
      'Av. Prestes Maia',
      'Passagem Tom Jobim',
      'Av. Rio Branco',
      'Av. Sen. Queirós (Cantareira até Alfredo Issa)',
      'Av. Ipiranga (Alfredo Issa até São Luiz)',
      'Av. São Luiz',
      'Vd. 9 de Julho',
      'Vd. Jacareí',
      'R. Maria Paula',
      'Vd. Dona Paulina',
      'Av. Vinte e Três de Maio',
      'Av. Rubem Berta',
      'Av. Moreira Guimarães (Vd. República Árabe Síria até Moaci)',
      'Av. Alcântara Machado',
      'R. Melo Freire',
      'Av. Conde de Frontin (Melo Freire até Vd. Eng. Alberto Badra)'
    ],
    textoLegalFrontEnd: "Atenção Crítica: A AETC para VUC NÃO PERMITE a circulação de 2ª a 6ª das 05h às 21h e Sábados das 10h às 14h nas Vias Estruturais Restritas (VER §1º), como Av. 23 de Maio, Av. Paulista e Av. Nove de Julho."
  },
  URGENCIA: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: true, docsExigidos: ['CRLV', 'OFICIO_ORGAO_COMPETENTE'] },
  GUINCHO: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV'] },
  REMOCAO_TERRA: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'ALVARA_OBRA', 'TPOV'] },
  JORNALISMO: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'FOTOS_EQUIPAMENTO_LINK'] },
  OBRAS_EMERGENCIA: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'CONTRATO_PRESTACAO_SERVICO_PUBLICO'] },
  ESTACIONAMENTO_PROPRIO: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'COMPROVANTE_VINCULO_IMOVEL', 'MAPA_ITINERARIO'] },
  OBRAS_INFRAESTRUTURA: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'CONTRATO_PRESTACAO_SERVICO_PUBLICO'] },
  CONCRETAGEM: { idadeMaxima: 10, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'FOTOS_VEICULO', 'ALVARA_OBRA'] },
  CONCRETAGEM_BOMBA: { idadeMaxima: 15, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'FOTOS_VEICULO', 'ALVARA_OBRA'] },
  FEIRAS_LIVRES: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'CARTAO_FEIRANTE'] },
  MUDANCA: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'NOTAS_FISCAIS_OU_CONTRATO'] },
  PERECIVEIS: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'NOTAS_FISCAIS_CARGA'] },
  PRODUTOS_PERIGOSOS: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'LETPP', 'FOTOS_EIXOS'] },
  VALORES: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: true, docsExigidos: ['CRLV', 'CERTIFICADO_VISTORIA_PF'] },
  CACAMBAS: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'AUTORIZACAO_ORGAO_MUNICIPAL'] },
  SERVICOS_PUBLICOS: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'CONTRATO_PRESTACAO_SERVICO_PUBLICO'] },
  LIXO: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'AUTORIZACAO_ORGAO_MUNICIPAL'] },
  CORREIOS: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'CONTRATO_PRESTACAO_SERVICO'] },
  SINALIZACAO_TRANSITO: { idadeMaxima: null, comprimentoMaximo: null, isentaRodizio: false, docsExigidos: ['CRLV', 'CONTRATO_PRESTACAO_SERVICO_PUBLICO'] }
};

export function validarAETC(categoria: CategoriaAETC, dadosVeiculo: any): { isCompliant: boolean, violacoes: string[] } {
  const regra = MATRIZ_REGRAS_AETC[categoria];
  const violacoes: string[] = [];

  if (regra.idadeMaxima && dadosVeiculo.idade > regra.idadeMaxima) {
    violacoes.push(`[CRÍTICO] AETC para ${categoria} exige idade máxima de ${regra.idadeMaxima} anos.`);
  }
  
  if (regra.comprimentoMaximo && dadosVeiculo.comprimento > regra.comprimentoMaximo) {
    violacoes.push(`[CRÍTICO] AETC para ${categoria} exige comprimento máximo de ${regra.comprimentoMaximo}m.`);
  }

  regra.docsExigidos.forEach(doc => {
    if (!dadosVeiculo.documentosEnviados.includes(doc)) {
      violacoes.push(`[CRÍTICO] Falta documento obrigatório para ${categoria}: ${doc}`);
    }
  });

  return {
    isCompliant: violacoes.length === 0,
    violacoes
  };
}
