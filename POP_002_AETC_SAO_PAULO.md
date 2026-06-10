# Procedimento Operacional Padrão (POP 002) - AETC e ZMRC (São Paulo/SP)
**Sistema:** Helonex Global
**Base Legal:** Portaria Nº 137/18-SMT.GAB
**Data de Emissão:** 27/02/2026

## 1. OBJETIVO
Definir regras estritas de liberação, horários e documentos para a emissão da AETC no município de São Paulo para as 19 categorias legais.

## 2. REGRAS POR CATEGORIA (SISTEMA DE BLOQUEIO)
O sistema exige documentação específica e alerta os horários exatos de rodagem na ZMRC (Centro Expandido) baseados no Anexo VI da Portaria.

1. **Veículo Urbano de Carga (VUC):** Período Integral. Idade Máx: 15 anos. Largura Máx: 2,20m. Comprimento Máx: 7,20m. Exige CVC e Procuração.
2. **Veículos em Serviço de Urgência:** Período Integral. Exige Ofício de Órgão Competente.
3. **Socorro Mecânico de Emergência (Guincho):** Período Integral. Exige CVC.
4. **Remoção de Terra em Obras Civis:** Permitido das 05h às 16h na ZMRC. Exige Alvará da Obra e TPOV.
5. **Cobertura Jornalística:** Período Integral. Exige comprovação fotográfica de equipamento de Link/Gerador.
6. **Obras e Serviços de Emergência:** Período Integral. Exige contrato com a Administração Pública.
7. **Acesso a Estacionamento Próprio:** Período Integral (apenas no trajeto). Exige comprovante de vínculo e mapa de itinerário.
8. **Obras e Serviços de Infraestrutura Urbana:** Permitido das 05h às 16h na ZMRC. Exige contrato com a Administração Pública.
9. **Concretagem:** Permitido das 05h às 16h. Idade Máx: 10 anos. Exige Alvará e foto da betoneira.
10. **Concretagem-Bomba:** Permitido das 05h às 16h (Obrigatório parar das 12h às 14h). Idade Máx: 15 anos. Exige Alvará.
11. **Feiras Livres:** Permitido das 05h às 16h. Exige Cartão de Feirante.
12. **Mudança:** Permitido das 05h às 16h na ZMRC. Exige Notas Fiscais ou Contrato de Serviço.
13. **Transporte de Produtos Alimentícios Perecíveis:** Permitido das 05h às 12h (ZMRC). Exige Notas Fiscais da carga.
14. **Transporte de Produtos Perigosos de Consumo Local:** Permitido das 10h às 16h na ZMRC. Caminhões de até 2 eixos traseiros. Exige LETPP vigente.
15. **Transporte de Valores:** Permitido das 10h às 20h na ZMRC. Exige Certificado de Vistoria da PF.
16. **Remoção de Entulho e Transporte de Caçambas (Poliguincho):** Permitido das 10h às 16h na ZMRC. Exige Autorização de Órgão Municipal.
17. **Prestação de Serviços Públicos Essenciais:** Permitido das 05h às 16h. Exige contrato com órgão público.
18. **Coleta de Lixo:** Permitido das 05h às 16h (ZMRC) e 21h às 16h (ZERC). Exige Autorização do Órgão Competente.
19. **Correios (Serviços Postais):** Período Integral. Exige Contrato de prestação de serviço.
20. **Sinalização de Trânsito Emergencial:** Período Integral. Exige contrato com DSV/CET.

## 3. DETALHAMENTO DE REGRAS CRÍTICAS

### 3.1. VUC (Veículo Urbano de Carga)
* **Regra Física:** Máximo 2,20m de largura; 7,20m de comprimento; Idade máxima 15 anos.
* **Horário:** Período Integral na ZMRC.
* **Bloqueio de Sistema:** Exigir upload do **CVC (Comprovante de Vistoria CET)** e Procuração.
* 🚨 **ZONA DE RISCO ABSOLUTO (VER §1º):** É terminantemente proibido circular com VUC, MESMO COM AETC APROVADA, de 2ª a 6ª feira das 05h às 21h e Sábados das 10h às 14h nas seguintes vias:
    1. Av. Paulista, Av. Rebouças, Av. Eusébio Matoso.
    2. Av. Nove de Julho, Av. Cidade Jardim, Av. São Gabriel, Av. Santo Amaro.
    3. Av. 23 de Maio, Av. Rubem Berta, Av. Moreira Guimarães.
    4. Av. Prestes Maia, Av. Tiradentes, Av. Rio Branco.
    5. Av. Alcântara Machado, R. Melo Freire, Av. Conde de Frontin.
    6. (Demais constantes no Art. 2º, §1º da Portaria 137/18).
* **Procedimento:** O cliente deve assinar/marcar o "Termo de Ciência das Vias Proibidas" no portal antes de finalizar o pagamento.

## 4. AUDITORIA INTERNA
O módulo `GovTech` bloqueia a requisição se os documentos da Categoria selecionada não forem enviados. Em caso de divergência, o status retorna para "Ação Requerida do Cliente".

* **Passo 5 (Assinatura e Expedição Física - Erro Zero):** 1. O Backoffice Helonex faz o upload do arquivo PDF do RAETC (gerado pelo SUAE) no Dossiê Digital.
    2. O cliente realiza a assinatura digital pelo Portal do Transportador. O sistema grava o Hash de integridade.
    3. O sistema compila o Dossiê Final (RAETC Assinado + CRLV + CVC/Documentos da Matriz).
    4. O Backoffice imprime o Dossiê Físico.
    5. O Backoffice clica em "Gerar Etiqueta CET" no sistema, imprime e cola no envelope.
    6. **Regra de Postagem Obrigatória:** O envelope deve ser enviado EXCLUSIVAMENTE para a Caixa Postal nº 25.998, CEP 05513-970, contendo obrigatoriamente a chancela: "Solicitação de Autorização Especial de Trânsito para Caminhões - AETC".
    7. O código de rastreio dos Correios é inserido no Helonex, que altera o status para "Enviado ao Órgão (Físico)".

Quando o Backoffice clica em "Gerar Etiqueta CET", o Helonex preenche as variáveis automaticamente via Supabase:
* **Destinatário Fixo:** SMT/AETC na Caixa Postal 25.998, CEP 05513-970, São Paulo - SP.
* **Referência Dinâmica:** Categoria (ex: VUC) + Razão Social + CNPJ do cliente.
* **Remetente:** Pode ser **Fixo** (Assessoria Nacional ao Transporte Terrestre, Jarinu/SP) ou **Dinâmico** (Dados do Cliente), conforme escolha do emitente.
