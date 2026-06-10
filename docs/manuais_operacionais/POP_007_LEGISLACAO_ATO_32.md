# POP 007 - ATUALIZAÇÃO LEGISLATIVA: ATO 32/2026 (PRORROGAÇÃO MP 1.343)

## 1. OBJETIVO
Documentar a prorrogação da Medida Provisória nº 1.343/2026 e seus impactos no Cerco Eletrônico de Nível II do Helonex.

## 2. CONTEXTO LEGAL
- **Ato do Presidente da Mesa do Congresso Nacional nº 32/2026**: Publicado em 08 de maio de 2026.
- **Efeito**: Prorroga por 60 dias a vigência da MP 1.343/2026 a partir de 11 de maio de 2026.
- **Escopo**: Mantém a obrigatoriedade do CIOT Mandatário e a fiscalização automatizada de Pisos Mínimos.

## 3. IMPLICAÇÕES NO SISTEMA (CÓDIGO ZERO)
O algoritmo do Helonex deve manter as seguintes travas ativas:
1. **Trava MDF-e**: Proibir a transmissão do manifesto sem o Hash de validação do CIOT.
2. **Trava de Piso**: Bloquear emissão de CIOT se Valor_Frete < Piso_ANTT (Cálculo via Diesel S10).
3. **Auditoria Retroativa**: O prazo de 05 anos para auditoria eletrônica via SPED permanece vigente.

## 4. PROCEDIMENTO DE EMERGÊNCIA
Caso a MP seja convertida em Lei ou sofra novas prorrogações, o Core Engine deve injetar automaticamente o novo Timestamp de validade nas rotinas de cálculo do JusTech Resolve.

---
**VEREDITO TÉCNICO**: A conformidade não é mais opcional. O Helonex deve ser a única interface entre o ERP do cliente e o Fisco.
