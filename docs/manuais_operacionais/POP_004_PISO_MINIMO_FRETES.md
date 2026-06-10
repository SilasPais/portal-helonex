# Procedimento Operacional Padrão (POP 004) - Validação de Piso Mínimo de Frete
**Sistema:** Helonex Global (Módulo JusTech)
**Base Legal:** Lei nº 13.703/2018 (Política Nacional de Pisos Mínimos do Transporte Rodoviário de Cargas)
**Data de Emissão:** 01/03/2026

## 1. OBJETIVO
Garantir que todas as negociações de frete, contratos e emissões de CIOT orquestradas pelo ecossistema Helonex obedeçam estritamente à Tabela de Pisos Mínimos da ANTT, prevenindo passivos jurídicos e multas para o transportador.

## 2. REGRAS DE NEGÓCIO (MOTOR MATEMÁTICO)
O cálculo não é manual. O sistema utiliza a função obrigatória `calcularPisoMinimoANTT` (`freightRules.ts`), que aplica a fórmula da lei federal:
* **Fórmula Aplicada:** `((Distância × Custo de Deslocamento [CCD]) + Custo de Carga/Descarga [CC]) × Número de Eixos`.
* **Adicional Legal:** Se houver exigência de Retorno Vazio, o sistema adiciona automaticamente a taxa de deslocamento da volta.

## 3. AUDITORIA E TRAVA DE COMPLIANCE (SISTEMA)
1. O usuário preenche os dados da rota e o "Valor Ofertado" pelo embarcador.
2. O motor calcula o "Piso Mínimo Legal".
3. **Bloqueio (Erro Zero):** Se o Valor Ofertado for INFERIOR ao Piso Legal, a interface bloqueia a continuidade da emissão e exibe um Alerta Crítico.
4. Nenhuma operação fora da conformidade avança para a assinatura digital.

**Assinatura de Responsabilidade:** Diretoria de Compliance Helonex.
