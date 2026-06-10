
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, ShieldCheck, Truck, Siren, 
  ArrowRight, FileText, Clock, Ban, Landmark, DollarSign, 
  UploadCloud, ChevronRight, X, PenTool, Download, 
  MessageSquare, User, Building2, HelpCircle, Zap, Check,
  Construction, Utensils, Home, HardHat, Flame, Loader2, Mail, Phone, 
  Fingerprint, Map as MapIcon, Info, AlertTriangle, ShieldAlert, Scale, ListChecks,
  Ambulance, Mountain, Camera, Building, Store, Box, Newspaper, TrafficCone,
  Radio, Trash2
} from 'lucide-react';
import { AetcStatus, AetcDocument } from '../types';
import { guardianEngine } from '../services/guardianSystem';

const MODALITIES: Record<string, any> = {
  'VUC': {
    title: 'VUC (Carga Urbana)',
    hook: 'Seu VUC está bloqueado no Centro?',
    subhook: 'Regularize seu Veículo Urbano de Carga para circular livremente na ZMRC.',
    icon: Truck,
    color: 'text-green-400',
    bg: 'bg-green-600',
    hours: 'Livre 24h com AETC ativa',
    zones: 'ZMRC (Exceto VER-1 se exceder medidas)',
    prerequisites: [
      'Idade máxima: 15 anos de fabricação.',
      'Largura máxima: 2,20 metros.',
      'Comprimento máximo: 7,20 metros.'
    ],
    legalWarning: 'Informar medidas erradas ou omitir o comprimento real do veículo cancela a validade da AETC e expõe o transportador a multas por evasão de fiscalização.',
    pain: ['Limitação severa de horários.', 'Multas de rodízio que zeram o frete.', 'Atrasos logísticos.'],
    gain: ['Circulação 24h ZMRC.', 'Isenção total do Rodízio.', 'Maior faturamento mensal.'],
    docsPJ: ['Contrato Social', 'Cartão CNPJ', 'RG Administrador', 'CRLV', 'CVC (Vistoria)', 'Procuração Assinada', 'Comprovante de Pagamento'],
    docsPF: ['RG/CNH Proprietário', 'CRLV', 'Comprovante Endereço', 'CVC (Vistoria)', 'Procuração Assinada', 'Comprovante de Pagamento']
  },
  'URGENCIA': {
    title: 'Serviço de Urgência',
    hook: 'Atendimento de Emergência Sem Barreiras',
    subhook: 'Veículos destinados a socorro de incêndio, salvamento e ambulâncias.',
    icon: Ambulance,
    color: 'text-red-500',
    bg: 'bg-red-600',
    hours: 'Período Integral (Livre 24h)',
    zones: 'Todas as Zonas e Vias',
    prerequisites: [
      'Veículo de socorro ou emergência.',
      'Identificação visual conforme legislação.',
      'Ofício do Órgão Competente.'
    ],
    legalWarning: 'O uso indevido de sirene e giroflex sem estar em serviço de urgência é infração gravíssima.',
    pain: ['Atraso no atendimento vital.', 'Multas indevidas por radar.', 'Bloqueio em vias restritas.'],
    gain: ['Prioridade total de trânsito.', 'Isenção de rodízio.', 'Segurança operacional.'],
    docsPJ: ['CRLV', 'Ofício do Órgão', 'Contrato de Serviço', 'Comprovante'],
    docsPF: ['CRLV', 'Ofício do Órgão', 'RG/CNH', 'Comprovante']
  },
  'GUINCHO': {
    title: 'Guinchos e Socorro',
    hook: 'Rodízio em SP Parando seus Socorros?',
    subhook: 'Obtenha sua Licença Especial para Guincho e atenda chamados na ZMRC a qualquer hora.',
    icon: Siren,
    color: 'text-blue-400',
    bg: 'bg-blue-600',
    hours: 'Livre 24h (Sem restrição)',
    zones: 'ZMRC, ZERC e Vias Estruturais',
    prerequisites: [
      'Veículo registrado como Mecanismo Operacional.',
      'Giroflex instalado e averbado no CRLV-e.',
      'CNAE de Socorro e Manutenção de Veículos.'
    ],
    legalWarning: 'A circulação sem o giroflex ligado ou sem a anotação "SINAL LUMINOSO" no CRLV gera multa imediata.',
    pain: ['Perde chamados em áreas restritas.', 'Risco constante de multas.', 'Imagem de amadorismo.'],
    gain: ['Atenda QUALQUER chamado 24h.', 'Isenção total do Rodízio.', 'Segurança jurídica.'],
    docsPJ: ['Contrato Social', 'Cartão CNPJ', 'RG Administrador', 'CRLV (Giroflex na Obs)', 'Foto do caminhão', 'Comprovante'],
    docsPF: ['RG/CNH Proprietário', 'CRLV (Giroflex na Obs)', 'Comprovante Endereço', 'Foto do caminhão', 'Comprovante']
  },
  'REMOCAO_TERRA': {
    title: 'Remoção de Terra',
    hook: 'Obras Civis e Movimentação de Solo',
    subhook: 'Licença para transporte de terra e entulho de obras em áreas restritas.',
    icon: Mountain,
    color: 'text-amber-600',
    bg: 'bg-amber-700',
    hours: '05h00 às 16h00 (ZMRC)',
    zones: 'ZMRC e Vias de Acesso',
    prerequisites: [
      'Alvará de Execução da Obra.',
      'TPOV (Termo de Permissão de Ocupação de Via).',
      'Cadastro na AMLURB.'
    ],
    legalWarning: 'O transporte sem o Alvará da Obra vinculado invalida a AETC de Remoção de Terra.',
    pain: ['Interrupção de cronograma de obra.', 'Apreensão do veículo.', 'Multas ambientais.'],
    gain: ['Fluxo contínuo de obra.', 'Conformidade com AMLURB.', 'Evita multas de rodízio.'],
    docsPJ: ['Contrato Social', 'CRLV', 'Alvará da Obra', 'TPOV', 'Comprovante'],
    docsPF: ['RG/CNH', 'CRLV', 'Alvará da Obra', 'TPOV', 'Comprovante']
  },
  'JORNALISMO': {
    title: 'Cobertura Jornalística',
    hook: 'A Notícia Não Pode Esperar',
    subhook: 'Veículos de rádio e TV equipados para transmissão externa e link.',
    icon: Camera,
    color: 'text-sky-400',
    bg: 'bg-sky-600',
    hours: 'Período Integral (Livre 24h)',
    zones: 'ZMRC e ZERC',
    prerequisites: [
      'Veículo equipado com Link ou Gerador.',
      'Identificação da emissora ou veículo de imprensa.',
      'Comprovação de atividade jornalística.'
    ],
    legalWarning: 'Uso de veículo de imprensa para fins particulares cancela a isenção.',
    pain: ['Perda de furos de reportagem.', 'Dificuldade de estacionamento.', 'Multas em eventos.'],
    gain: ['Acesso livre para coberturas.', 'Isenção de rodízio.', 'Agilidade na notícia.'],
    docsPJ: ['Contrato Social (CNAE Imprensa)', 'CRLV', 'Fotos do Equipamento', 'Comprovante'],
    docsPF: ['RG/CNH', 'CRLV', 'Registro Profissional', 'Fotos do Equipamento', 'Comprovante']
  },
  'OBRAS_EMERGENCIA': {
    title: 'Obras de Emergência',
    hook: 'Reparos Críticos de Infraestrutura',
    subhook: 'Serviços de emergência em redes de água, luz, gás e telefonia.',
    icon: AlertTriangle,
    color: 'text-orange-500',
    bg: 'bg-orange-600',
    hours: 'Período Integral (Livre 24h)',
    zones: 'ZMRC e ZERC',
    prerequisites: [
      'Contrato com a Administração Pública.',
      'Ordem de Serviço de Emergência.',
      'Identificação da concessionária ou prestadora.'
    ],
    legalWarning: 'Obras programadas não se enquadram como emergência e devem seguir horários padrão.',
    pain: ['Multas em reparos noturnos.', 'Atraso na restauração de serviços.', 'Risco à segurança pública.'],
    gain: ['Atendimento imediato 24h.', 'Livre circulação.', 'Segurança contratual.'],
    docsPJ: ['Contrato com Órgão Público', 'CRLV', 'Ordem de Serviço', 'Comprovante'],
    docsPF: ['RG/CNH', 'CRLV', 'Contrato/OS', 'Comprovante']
  },
  'ESTACIONAMENTO_PROPRIO': {
    title: 'Estacionamento Próprio',
    hook: 'Acesso Direto à Sua Sede',
    subhook: 'Licença para veículos que possuem garagem ou estacionamento próprio na ZMRC.',
    icon: Building,
    color: 'text-slate-400',
    bg: 'bg-slate-600',
    hours: 'Período Integral (Apenas Trajeto)',
    zones: 'Trajeto definido para a Sede',
    prerequisites: [
      'Comprovante de propriedade ou locação do imóvel.',
      'Mapa de itinerário ponto a ponto.',
      'Veículo em nome da empresa ou sócio.'
    ],
    legalWarning: 'Desviar do itinerário cadastrado anula a proteção da AETC.',
    pain: ['Multas no trajeto para a empresa.', 'Dificuldade de logística interna.', 'Custo extra de multas.'],
    gain: ['Acesso garantido à sede.', 'Economia com multas.', 'Logística otimizada.'],
    docsPJ: ['Contrato Social', 'CRLV', 'Escritura/Contrato Aluguel', 'Mapa Itinerário', 'Comprovante'],
    docsPF: ['RG/CNH', 'CRLV', 'Comprovante de Vínculo Imóvel', 'Mapa Itinerário', 'Comprovante']
  },
  'OBRAS_INFRAESTRUTURA': {
    title: 'Obras Infraestrutura',
    hook: 'Construindo a Cidade',
    subhook: 'Serviços de pavimentação, iluminação e manutenção urbana.',
    icon: HardHat,
    color: 'text-yellow-600',
    bg: 'bg-yellow-700',
    hours: '05h00 às 16h00 (ZMRC)',
    zones: 'ZMRC e Vias de Obras',
    prerequisites: [
      'Contrato com a Administração Pública.',
      'Alvará de Instalação/Manutenção.',
      'Cronograma de execução.'
    ],
    legalWarning: 'Operar fora do horário permitido sem autorização especial gera multa gravíssima.',
    pain: ['Paralisação de frentes de obra.', 'Multas de rodízio.', 'Atraso em licitações.'],
    gain: ['Conformidade contratual.', 'Agilidade na execução.', 'Isenção de restrições.'],
    docsPJ: ['Contrato Público', 'CRLV', 'Alvará/OS', 'Comprovante'],
    docsPF: ['RG/CNH', 'CRLV', 'Contrato/OS', 'Comprovante']
  },
  'CONCRETAGEM': {
    title: 'Caminhão Betoneira',
    hook: 'Carga vencendo por causa do Rodízio?',
    subhook: 'Garanta a entrega do concreto fresco. Libere sua betoneira para a obra no horário comercial.',
    icon: Construction,
    color: 'text-orange-400',
    bg: 'bg-orange-600',
    hours: '05h00 às 16h00 (Seg à Sab)',
    zones: 'ZMRC e ZERC',
    prerequisites: [
      'Idade máxima do veículo: 10 anos.',
      'Alvará da Obra ou TPOV.',
      'Veículo tipo Betoneira no CRLV.'
    ],
    legalWarning: 'Betoneiras com mais de 10 anos não possuem direito à isenção conforme Portaria 137/18.',
    pain: ['Perda de material (concreto).', 'Multas pesadas.', 'Obra parada.'],
    gain: ['Acesso prioritário.', 'Circulação em zonas residenciais.', 'Planejamento seguro.'],
    docsPJ: ['Contrato Social', 'CRLV Betoneira', 'Alvará da Obra', 'Foto Veículo', 'Comprovante'],
    docsPF: ['RG/CNH', 'CRLV Betoneira', 'Declaração da Obra', 'Foto Veículo', 'Comprovante']
  },
  'CONCRETAGEM_BOMBA': {
    title: 'Concretagem-Bomba',
    hook: 'Bombeamento de Concreto em SP',
    subhook: 'Veículos equipados com bomba para lançamento de concreto em altura.',
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-600',
    hours: '05h00 às 16h00 (Parar 12h-14h)',
    zones: 'ZMRC e ZERC',
    prerequisites: [
      'Idade máxima do veículo: 15 anos.',
      'Alvará da Obra vinculado.',
      'Equipamento de bomba averbado.'
    ],
    legalWarning: 'Obrigatório permanecer estacionado das 12h às 14h na ZMRC.',
    pain: ['Multas por circulação no almoço.', 'Impedimento de bombeamento.', 'Atraso na laje.'],
    gain: ['Operação legalizada.', 'Maior janela de trabalho.', 'Conformidade técnica.'],
    docsPJ: ['Contrato Social', 'CRLV (Bomba)', 'Alvará da Obra', 'Comprovante'],
    docsPF: ['RG/CNH', 'CRLV (Bomba)', 'Alvará da Obra', 'Comprovante']
  },
  'FEIRAS_LIVRES': {
    title: 'Feiras Livres',
    hook: 'Do Campo para a Mesa',
    subhook: 'Transporte de mercadorias para feiras livres municipais.',
    icon: Store,
    color: 'text-emerald-500',
    bg: 'bg-emerald-600',
    hours: '05h00 às 16h00',
    zones: 'ZMRC e ZERC',
    prerequisites: [
      'Cartão de Feirante (Matrícula) vigente.',
      'Cadastro na Secretaria de Abastecimento.',
      'Veículo adequado ao transporte de alimentos.'
    ],
    legalWarning: 'Uso do veículo fora do dia e local da feira cadastrada gera multa.',
    pain: ['Multas no trajeto da feira.', 'Atraso na montagem da banca.', 'Perda de mercadoria.'],
    gain: ['Acesso livre às feiras.', 'Segurança para o feirante.', 'Isenção de rodízio.'],
    docsPJ: ['Cartão de Feirante', 'CRLV', 'Contrato Social', 'Comprovante'],
    docsPF: ['Cartão de Feirante', 'CRLV', 'RG/CNH', 'Comprovante']
  },
  'MUDANCA': {
    title: 'Caminhão de Mudança',
    hook: 'Mudança Sem Stress em SP',
    subhook: 'Transporte de móveis e pertences residenciais ou comerciais.',
    icon: Building2,
    color: 'text-indigo-400',
    bg: 'bg-indigo-600',
    hours: '05h00 às 16h00 (ZMRC)',
    zones: 'ZMRC e ZERC',
    prerequisites: [
      'Notas Fiscais ou Contrato de Serviço.',
      'Veículo tipo Baú ou Grade Alta.',
      'Comprovante de endereço de origem/destino.'
    ],
    legalWarning: 'Mudanças sem documentação comprobatória são tratadas como carga comum.',
    pain: ['Caminhão retido com móveis.', 'Multas de rodízio.', 'Insegurança do cliente.'],
    gain: ['Janela de mudança garantida.', 'Acesso a áreas restritas.', 'Profissionalismo.'],
    docsPJ: ['Contrato Social', 'CRLV', 'Contrato de Mudança / NF', 'Comprovante'],
    docsPF: ['RG/CNH', 'CRLV', 'Contrato de Mudança / NF', 'Comprovante']
  },
  'PERECIVEIS': {
    title: 'Carga Perecível / Alimentos',
    hook: 'Seu produto perdendo o frescor?',
    subhook: 'Abasteça mercados e hospitais no horário nobre. AETC para alimentos e medicamentos.',
    icon: Utensils,
    color: 'text-red-400',
    bg: 'bg-red-600',
    hours: '05h00 às 12h00 (ZMRC)',
    zones: 'ZMRC (Proibido em ZERC)',
    prerequisites: [
      'Baú Frigorífico ou Isotérmico averbado.',
      'Licença Sanitária (CVS/LIV) válida.',
      'Notas Fiscais de carga perecível.'
    ],
    legalWarning: 'Transportar carga seca em veículo com AETC de Perecível é desvio de finalidade.',
    pain: ['Multas no pico da manhã.', 'Perda de qualidade da carga.', 'Restrição de acesso.'],
    gain: ['Janela matutina garantida.', 'Segurança sanitária.', 'Fidelização de clientes.'],
    docsPJ: ['Contrato Social', 'CRLV (Baú Térmico)', 'Vistoria Sanitária', 'Nota Fiscal Amostra', 'Comprovante'],
    docsPF: ['RG/CNH', 'CRLV (Baú Térmico)', 'Vistoria Sanitária', 'Comprovante']
  },
  'PRODUTOS_PERIGOSOS': {
    title: 'Produtos Perigosos',
    hook: 'Segurança no Transporte Crítico',
    subhook: 'Combustíveis, gases e produtos químicos de consumo local.',
    icon: Radio,
    color: 'text-orange-600',
    bg: 'bg-orange-700',
    hours: '10h00 às 16h00 (ZMRC)',
    zones: 'ZMRC (Proibido em VERs)',
    prerequisites: [
      'LETPP (Licença Especial de Transporte de Produtos Perigosos).',
      'Caminhão de até 2 eixos traseiros.',
      'Sinalização conforme norma ABNT.'
    ],
    legalWarning: 'Circulação em Vias Estruturais Restritas (VERs) é proibida para produtos perigosos.',
    pain: ['Multas ambientais altíssimas.', 'Risco de cassação do RNTRC.', 'Bloqueio em túneis.'],
    gain: ['Operação dentro da norma.', 'Segurança jurídica.', 'Evita multas de rodízio.'],
    docsPJ: ['Contrato Social', 'CRLV', 'LETPP Vigente', 'Fotos dos Eixos', 'Comprovante'],
    docsPF: ['RG/CNH', 'CRLV', 'LETPP Vigente', 'Fotos dos Eixos', 'Comprovante']
  },
  'VALORES': {
    title: 'Transporte de Valores',
    hook: 'Segurança Bancária e Logística',
    subhook: 'Carros-fortes destinados ao abastecimento de caixas e bancos.',
    icon: ShieldCheck,
    color: 'text-slate-300',
    bg: 'bg-slate-500',
    hours: '10h00 às 20h00 (ZMRC)',
    zones: 'ZMRC e Vias de Acesso',
    prerequisites: [
      'Certificado de Vistoria da Polícia Federal.',
      'Blindagem averbada no CRLV.',
      'Autorização de funcionamento de segurança privada.'
    ],
    legalWarning: 'Isenção de rodízio não se aplica se o veículo estiver fora de serviço.',
    pain: ['Multas em rotas bancárias.', 'Risco operacional.', 'Atraso no abastecimento.'],
    gain: ['Acesso prioritário.', 'Isenção de rodízio.', 'Conformidade com a PF.'],
    docsPJ: ['Certificado Vistoria PF', 'CRLV (Blindado)', 'Contrato Social', 'Comprovante'],
    docsPF: ['Certificado Vistoria PF', 'CRLV (Blindado)', 'RG/CNH', 'Comprovante']
  },
  'CACAMBAS': {
    title: 'Caçambas (Poliguincho)',
    hook: 'Gestão de Resíduos de Construção',
    subhook: 'Transporte de caçambas estacionárias e entulho.',
    icon: Box,
    color: 'text-zinc-500',
    bg: 'bg-zinc-600',
    hours: '10h00 às 16h00 (ZMRC)',
    zones: 'ZMRC e ZERC',
    prerequisites: [
      'Autorização de Órgão Municipal (AMLURB).',
      'Veículo tipo Poliguincho no CRLV.',
      'Cadastro de transportador de resíduos.'
    ],
    legalWarning: 'Caçambas sem número de cadastro ou em local proibido geram multa ao transportador.',
    pain: ['Apreensão de caçambas.', 'Multas de rodízio.', 'Bloqueio no aterro.'],
    gain: ['Operação legalizada.', 'Acesso a obras centrais.', 'Conformidade ambiental.'],
    docsPJ: ['Autorização AMLURB', 'CRLV', 'Contrato Social', 'Comprovante'],
    docsPF: ['Autorização AMLURB', 'CRLV', 'RG/CNH', 'Comprovante']
  },
  'SERVICOS_PUBLICOS': {
    title: 'Serviços Públicos',
    hook: 'Manutenção da Cidade',
    subhook: 'Veículos de concessionárias de serviços essenciais (Luz, Água, Gás).',
    icon: Landmark,
    color: 'text-blue-600',
    bg: 'bg-blue-700',
    hours: '05h00 às 16h00',
    zones: 'ZMRC e ZERC',
    prerequisites: [
      'Contrato de prestação de serviço público.',
      'Identificação visual da concessionária.',
      'Veículo cadastrado para a finalidade.'
    ],
    legalWarning: 'Uso para fins privados invalida a isenção de serviço público.',
    pain: ['Multas em manutenção de rede.', 'Atraso em serviços essenciais.', 'Custo operacional alto.'],
    gain: ['Livre circulação.', 'Isenção de rodízio.', 'Segurança contratual.'],
    docsPJ: ['Contrato Prestação Serviço', 'CRLV', 'Cartão CNPJ', 'Comprovante'],
    docsPF: ['Contrato Prestação Serviço', 'CRLV', 'RG/CNH', 'Comprovante']
  },
  'LIXO': {
    title: 'Coleta de Lixo',
    hook: 'Saneamento e Limpeza Urbana',
    subhook: 'Caminhões compactadores de lixo domiciliar ou comercial.',
    icon: Trash2,
    color: 'text-green-600',
    bg: 'bg-green-700',
    hours: '05h00 às 16h00 (ZMRC) / 21h às 16h (ZERC)',
    zones: 'ZMRC e ZERC',
    prerequisites: [
      'Autorização do Órgão Competente (AMLURB).',
      'Veículo tipo Compactador no CRLV.',
      'Contrato de coleta vigente.'
    ],
    legalWarning: 'Compactadores devem respeitar as janelas de silêncio em ZERC.',
    pain: ['Multas em rotas de coleta.', 'Acúmulo de resíduos.', 'Sanções contratuais.'],
    gain: ['Isenção total de rodízio.', 'Acesso livre a aterros.', 'Operação 24h conforme contrato.'],
    docsPJ: ['Autorização AMLURB', 'CRLV', 'Contrato Coleta', 'Comprovante'],
    docsPF: ['Autorização AMLURB', 'CRLV', 'RG/CNH', 'Comprovante']
  },
  'CORREIOS': {
    title: 'Correios / Postais',
    hook: 'Logística Postal e Encomendas',
    subhook: 'Veículos a serviço dos Correios ou empresas de entrega postal.',
    icon: Mail,
    color: 'text-yellow-500',
    bg: 'bg-yellow-600',
    hours: 'Período Integral (Livre 24h)',
    zones: 'ZMRC e ZERC',
    prerequisites: [
      'Contrato de prestação de serviço postal.',
      'Identificação visual "A Serviço dos Correios".',
      'CNAE de atividades postais.'
    ],
    legalWarning: 'Isenção válida apenas para transporte de carga postal identificada.',
    pain: ['Atraso em entregas Sedex.', 'Multas de rodízio.', 'Restrição de acesso a centros.'],
    gain: ['Entrega garantida 24h.', 'Isenção de rodízio.', 'Agilidade logística.'],
    docsPJ: ['Contrato com Correios', 'CRLV', 'Cartão CNPJ', 'Comprovante'],
    docsPF: ['Contrato com Correios', 'CRLV', 'RG/CNH', 'Comprovante']
  },
  'SINALIZACAO_TRANSITO': {
    title: 'Sinalização Trânsito',
    hook: 'Segurança Viária e Engenharia',
    subhook: 'Veículos de manutenção de semáforos, placas e pintura de via.',
    icon: TrafficCone,
    color: 'text-orange-400',
    bg: 'bg-orange-500',
    hours: 'Período Integral (Livre 24h)',
    zones: 'ZMRC e ZERC',
    prerequisites: [
      'Contrato com DSV/CET ou órgão de trânsito.',
      'Identificação de "Engenharia de Tráfego".',
      'Giroflex amarelo âmbar.'
    ],
    legalWarning: 'Uso de giroflex sem estar em serviço é infração de trânsito.',
    pain: ['Multas em reparos de via.', 'Risco de acidentes por falta de sinalização.', 'Atraso em obras viárias.'],
    gain: ['Prioridade de estacionamento.', 'Livre circulação.', 'Isenção de rodízio.'],
    docsPJ: ['Contrato com Órgão Trânsito', 'CRLV', 'Ordem de Serviço', 'Comprovante'],
    docsPF: ['RG/CNH', 'CRLV', 'Contrato/OS', 'Comprovante']
  }
};

const ZmrcManager: React.FC<{initialModalityId?: string}> = ({ initialModalityId = 'VUC' }) => {
  const [activeId, setActiveId] = useState(initialModalityId);
  const [stage, setStage] = useState<'LANDING' | 'CHECKOUT' | 'TRACKING'>('LANDING');
  const [accountType, setAccountType] = useState<'PJ' | 'PF'>('PJ');
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [completedDocs, setCompletedDocs] = useState<string[]>([]);
  
  const m = MODALITIES[activeId] || MODALITIES['GUINCHO'];
  const Icon = m.icon;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage, activeId]);

  const handleUpload = (docName: string) => {
    setUploading(prev => ({ ...prev, [docName]: true }));
    setTimeout(() => {
      setUploading(prev => ({ ...prev, [docName]: false }));
      setCompletedDocs(prev => [...prev, docName]);
    }, 1500);
  };

  const handleFinishUploads = () => {
      guardianEngine.createAetcRequest({
          clientName: 'Requerente Demonstrativo',
          plate: 'ABC-1234',
          modalityId: activeId,
          documents: completedDocs.map(d => ({ name: d, status: 'UPLOADED' }))
      });
      setStage('TRACKING');
  };

  const renderLanding = () => (
    <div className="animate-fade-in space-y-16 pb-20">
      {/* Hero Section */}
      <section className="text-center pt-10 px-4">
        <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-hlx-gold/10 border border-hlx-gold/30 text-hlx-gold text-xs font-bold uppercase tracking-widest mb-8">
           <Icon size={16} /> Especialista em {m.title}
        </div>
        <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
          {m.hook}
        </h1>
        <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12">
          {m.subhook}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="bg-slate-900 border border-white/10 p-6 rounded-2xl text-left">
                <p className="text-gray-500 font-bold uppercase text-[10px] mb-2 tracking-widest">Investimento Único</p>
                <div className="flex items-end gap-2 text-white">
                    <span className="text-xl font-bold mb-1">R$</span>
                    <span className="text-5xl font-display font-black">480,00</span>
                </div>
            </div>
            <button 
                onClick={() => setStage('CHECKOUT')}
                className={`px-10 py-6 ${m.bg} text-white font-black rounded-2xl text-xl shadow-2xl hover:scale-105 transition-all uppercase tracking-tight flex items-center gap-3`}
            >
                LIBERAR MEU {m.title.toUpperCase()} AGORA <ArrowRight />
            </button>
        </div>
      </section>

      {/* DETALHES TÉCNICOS - OS NOVOS CARDS SOLICITADOS */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Janela de Horário */}
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl group hover:border-hlx-gold/50 transition-all shadow-xl">
              <div className="w-12 h-12 bg-hlx-gold/10 rounded-2xl flex items-center justify-center text-hlx-gold mb-6 group-hover:scale-110 transition-transform">
                  <Clock size={28} />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Janela de Operação</h4>
              <p className="text-hlx-gold font-display text-xl mb-4">{m.hours}</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                  Operar fora desta janela, mesmo com a licença ativa, resulta em multa por desrespeito ao rodízio municipal ou restrição horária específica da Portaria 137/18.
              </p>
          </div>

          {/* Card 2: Zonas de Liberação */}
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl group hover:border-blue-500/50 transition-all shadow-xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <MapIcon size={28} />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Locais Autorizados</h4>
              <p className="text-blue-400 font-display text-xl mb-4">{m.zones}</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                  Sua licença permite acesso total a estas zonas. Atenção: Vias de trânsito rápido (Marginais) possuem regras variáveis de faixa que devem ser respeitadas.
              </p>
          </div>

          {/* Card 3: Pré-requisitos Fatais */}
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl group hover:border-green-500/50 transition-all shadow-xl">
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                  <ListChecks size={28} />
              </div>
              <h4 className="text-white font-bold text-lg mb-2">Checklist de Elegibilidade</h4>
              <ul className="space-y-2">
                  {m.prerequisites.map((p: string, i: number) => (
                      <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <Check size={14} className="text-green-500 shrink-0 mt-0.5" /> {p}
                      </li>
                  ))}
              </ul>
          </div>
      </section>

      {/* AVISO DE RESPONSABILIDADE - O CORPO E ALMA */}
      <section className="max-w-5xl mx-auto px-4">
          <div className="bg-red-900/10 border border-red-500/30 p-8 rounded-[3rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><ShieldAlert size={150} className="text-red-500" /></div>
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-900/50">
                      <AlertTriangle size={40} />
                  </div>
                  <div>
                      <h3 className="text-red-500 font-black text-xl uppercase tracking-widest mb-3">Protocolo de Veracidade Helonex</h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                          <strong>Atenção Vital:</strong> Omitir, errar ou descontextualizar informações (como medidas do veículo, idade da frota ou tipo de carroceria) pode resultar em multas automáticas por radar e <strong>descredenciamento imediato junto ao órgão concedente</strong>. 
                      </p>
                      <p className="text-red-300 font-bold text-xs italic bg-red-950/50 p-4 rounded-xl border border-red-500/20">
                          "O Erro Zero da Helonex depende da sua honestidade documental. Dados errados geram multas que não possuem recurso viável por erro de fato do requerente."
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* Realidade vs Vantagem */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto px-4">
        <div className="bg-red-900/10 border border-red-500/20 p-8 rounded-[2.5rem] relative overflow-hidden">
           <h3 className="text-2xl font-bold text-red-500 mb-8 flex items-center gap-2">
             <X size={24} /> A Realidade Sem a Licença
           </h3>
           <ul className="space-y-6">
             {m.pain.map((item: string, i: number) => (
               <li key={i} className="flex gap-4 text-gray-400 font-medium">
                 <span className="text-red-500 shrink-0 font-bold">❌</span> {item}
               </li>
             ))}
           </ul>
        </div>
        <div className="bg-green-900/10 border border-green-500/20 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-green-500/5">
           <h3 className="text-2xl font-bold text-green-500 mb-8 flex items-center gap-2">
             <Check size={24} /> A Vantagem com a Licença
           </h3>
           <ul className="space-y-6">
             {m.gain.map((item: string, i: number) => (
               <li key={i} className="flex gap-4 text-white font-bold">
                 <span className="text-green-500 shrink-0 font-bold">✅</span> {item}
               </li>
             ))}
           </ul>
        </div>
      </section>

      <div className="text-center">
         <button onClick={() => setStage('CHECKOUT')} className="px-12 py-5 bg-white text-slate-950 font-black rounded-2xl text-xl shadow-2xl hover:bg-hlx-gold transition-all">
           PRONTO PARA COMEÇAR?
         </button>
      </div>
    </div>
  );

  const renderCheckout = () => (
    <div className="animate-fade-in max-w-6xl mx-auto px-4 pb-20">
      <button onClick={() => setStage('LANDING')} className="flex items-center gap-2 text-gray-500 hover:text-white mb-10 font-bold">
        <ChevronRight className="rotate-180" size={20}/> Voltar para a Apresentação
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-10">
           <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">Documentação Necessária</h2>
              <p className="text-gray-400">Organizamos a lista para você. Separe os documentos e nos envie de forma digital.</p>
           </div>

           <div className="flex bg-slate-900 p-1 rounded-2xl border border-white/10 w-fit">
              <button onClick={() => setAccountType('PJ')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${accountType === 'PJ' ? 'bg-hlx-gold text-slate-900' : 'text-gray-500'}`}>EMPRESA (PJ)</button>
              <button onClick={() => setAccountType('PF')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${accountType === 'PF' ? 'bg-hlx-gold text-slate-900' : 'text-gray-500'}`}>AUTÔNOMO (PF)</button>
           </div>

           <div className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] shadow-xl">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                 {accountType === 'PJ' ? <Building2 className="text-blue-400" /> : <User className="text-green-400" />}
                 Lista de Documentos ({accountType})
              </h3>
              <div className="space-y-4">
                 {(accountType === 'PJ' ? m.docsPJ : m.docsPF).map((doc: string, i: number) => (
                    <div key={i} className="flex items-center justify-between bg-slate-950 p-5 rounded-2xl border border-white/5 group hover:border-hlx-gold/30 transition-all">
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${completedDocs.includes(doc) ? 'bg-green-500 text-slate-950' : 'bg-slate-800 text-gray-500 border border-white/10'}`}>
                             {completedDocs.includes(doc) ? <Check size={18}/> : i+1}
                          </div>
                          <p className="text-gray-300 font-bold">{doc}</p>
                       </div>
                       {uploading[doc] ? (
                          <Loader2 className="animate-spin text-hlx-gold" size={20} />
                       ) : completedDocs.includes(doc) ? (
                          <button onClick={() => setCompletedDocs(prev => prev.filter(d => d !== doc))} className="text-[10px] font-black text-gray-500 uppercase hover:text-red-400">Remover</button>
                       ) : (
                          <button onClick={() => handleUpload(doc)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-hlx-gold hover:text-slate-950 transition-all flex items-center gap-2">
                             <UploadCloud size={14} /> UPLOAD
                          </button>
                       )}
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-5 sticky top-24 space-y-6">
           <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="mb-10">
                 <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-2">Investimento Único por Placa</p>
                 <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-white mb-2">R$</span>
                    <h2 className="text-6xl font-display font-black text-white">480,00</h2>
                 </div>
                 <p className="text-gray-400 text-sm mt-4 font-medium">Taxa única para assessoria completa.</p>
              </div>

              <div className="space-y-8">
                 <div className="p-6 bg-slate-950 rounded-3xl border border-hlx-gold/30">
                    <h4 className="text-hlx-gold font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><DollarSign size={16}/> Pagamento</h4>
                    <div className="space-y-4">
                       <div>
                          <p className="text-xs text-gray-500 font-bold uppercase mb-1">PIX (Chave CNPJ)</p>
                          <div className="bg-slate-900 p-3 rounded-xl border border-white/5 text-white font-mono font-bold text-sm">21.840.788/0001-14</div>
                       </div>
                       <div>
                          <p className="text-xs text-gray-500 font-bold uppercase mb-1">Itaú (341)</p>
                          <div className="text-xs text-gray-300 leading-tight">Ag: 7307 | C/C: 07766-4</div>
                       </div>
                    </div>
                 </div>

                 <button 
                   disabled={completedDocs.length < (accountType === 'PJ' ? m.docsPJ.length : m.docsPF.length)}
                   className="w-full py-6 bg-hlx-gold text-slate-950 font-black rounded-2xl text-xl shadow-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-3 disabled:opacity-30"
                   onClick={handleFinishUploads}
                 >
                    <ArrowRight size={24} /> ENVIAR PARA ANÁLISE
                 </button>
                 <p className="text-center text-[10px] text-gray-600 font-bold uppercase px-6">Somente após carregar todos os documentos e comprovante.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderTracking = () => (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Landmark size={200} /></div>
              <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                      <Loader2 className="text-blue-400 animate-spin" size={40} />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white uppercase tracking-widest">Processo em Trâmite</h2>
                  <p className="text-gray-400 mt-2">Protocolo HELONEX: #HLX-{Math.floor(Math.random()*10000)}</p>
              </div>

              <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {[
                      { s: 'CONCLUÍDO', t: 'Ingestão Documental', d: 'Seus documentos e comprovante foram recebidos e auditados.', icon: CheckCircle, color: 'text-green-500', active: true },
                      { s: 'ATUAL', t: 'Análise Técnica Helonex', d: 'Nossa equipe está preparando o requerimento e o dossiê SUE.', icon: Clock, color: 'text-blue-400', active: true },
                      { s: 'PENDENTE', t: 'Assinatura Digital (Gov.br)', d: 'Você receberá um alerta quando o documento estiver pronto para assinar.', icon: PenTool, color: 'text-gray-600', active: false },
                      { s: 'PENDENTE', t: 'Protocolo e Deferimento', d: 'Etapa final junto à CET-SP e isenção total no sistema.', icon: Landmark, color: 'text-gray-600', active: false }
                  ].map((step, i) => (
                      <div key={i} className={`flex gap-6 relative z-10 ${step.active ? 'opacity-100' : 'opacity-30'}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 border-2 ${step.s === 'ATUAL' ? 'border-hlx-gold shadow-[0_0_15px_#f59e0b]' : 'border-slate-800'}`}>
                              <step.icon size={20} className={step.s === 'ATUAL' ? 'text-hlx-gold' : step.color} />
                          </div>
                          <div>
                              <h4 className="text-white font-bold">{step.t}</h4>
                              <p className="text-gray-400 text-xs leading-relaxed">{step.d}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
        <div className="bg-slate-900/50 border-b border-white/5 py-4 px-4 sticky top-0 z-40 backdrop-blur-md">
           <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto custom-scrollbar">
              {Object.keys(MODALITIES).map(id => (
                <button 
                  key={id}
                  onClick={() => { setActiveId(id); setStage('LANDING'); }}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${activeId === id ? 'bg-hlx-gold text-slate-950 border-hlx-gold' : 'bg-slate-800 text-gray-500 border-white/5 hover:text-white'}`}
                >
                  {id}
                </button>
              ))}
           </div>
        </div>

        {stage === 'LANDING' ? renderLanding() : stage === 'CHECKOUT' ? renderCheckout() : renderTracking()}

        {/* IA Section (Falar com Bot) */}
        <div className="max-w-7xl mx-auto px-4 py-20">
           <div className="bg-slate-900 border border-white/10 p-8 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl">
              <div className="w-20 h-20 bg-hlx-gold/20 rounded-2xl flex items-center justify-center text-hlx-gold shrink-0 border border-hlx-gold/30">
                <MessageSquare size={40} />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-white mb-2 uppercase">Dúvidas sobre as Regras?</h3>
                 <p className="text-gray-400 text-sm mb-4">A Helô (nossa IA) conhece todas as regras específicas da <strong>Portaria 137/18</strong> para {m.title}.</p>
                 <button className="text-hlx-gold font-bold flex items-center gap-2 hover:underline">Falar com a IA Agora <ArrowRight size={16}/></button>
              </div>
           </div>
        </div>
    </div>
  );
};

export default ZmrcManager;
