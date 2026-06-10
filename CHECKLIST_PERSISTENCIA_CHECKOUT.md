# Checklist de Implementação: Persistência de Checkout (Helonex v8.5)

Este documento serve como guia técnico para migrar o sistema de checkout simulado para uma arquitetura robusta e persistente.

## 1. Modelagem de Dados (Banco de Dados)

Definição das tabelas necessárias para armazenar transações e perfis. Recomendação: PostgreSQL (via Supabase).

- [ ] **Tabela `profiles`** (Extensão do usuário)
    - `id` (UUID, PK, FK para auth.users)
    - `full_name` (Texto)
    - `document` (CPF/CNPJ)
    - `macro_segment` (Enum: CARGO, PASSENGER)
    - `persona` (Enum: TAC, ETC, SHIPPER, etc.)
    - `created_at` (Timestamp)

- [ ] **Tabela `orders`** (Pedidos de Compra)
    - `id` (UUID, PK)
    - `user_id` (UUID, FK para profiles)
    - `service_id` (Texto, ex: 'rntrc-tac')
    - `amount` (Decimal)
    - `status` (Enum: PENDING, PAID, FAILED, CANCELED)
    - `payment_method` (Enum: PIX, CREDIT_CARD)
    - `transaction_id` (ID externo do Gateway)
    - `created_at` (Timestamp)

- [ ] **Tabela `subscriptions`** (Controle de Acesso)
    - `id` (UUID, PK)
    - `user_id` (UUID, FK para profiles)
    - `plan_type` (Enum: PRO, BASIC)
    - `start_date` (Date)
    - `end_date` (Date)
    - `is_active` (Boolean)

## 2. API & Backend (Integração)

Criação dos endpoints para processar as requisições do frontend.

- [ ] **Endpoint: Criação de Pedido** (`POST /api/checkout/create`)
    - Recebe: `serviceId`, `price`, dados do usuário.
    - Ação: Cria registro em `orders` com status `PENDING`.
    - Retorno: `orderId` e Payload de Pagamento (ex: QR Code Pix).

- [ ] **Endpoint: Webhook de Pagamento** (`POST /api/webhooks/payment`)
    - Recebe: Notificação do Gateway (Stripe/Asaas/MercadoPago).
    - Ação: Atualiza `orders` para `PAID`.
    - Ação: Cria/Atualiza registro em `subscriptions`.
    - Ação: Dispara e-mail de boas-vindas.

- [ ] **Endpoint: Consulta de Status** (`GET /api/checkout/:orderId`)
    - Ação: Frontend consulta (polling) para saber se o pagamento foi confirmado.

## 3. Frontend (React Components)

Atualização do componente `ServiceCheckout.tsx` para usar dados reais.

- [ ] **Refatorar `handlePayment`**
    - Remover `setTimeout` (simulação).
    - Implementar chamada `fetch('/api/checkout/create')`.
    - Exibir QR Code real retornado pela API.

- [ ] **Implementar Polling de Status**
    - Criar hook `usePaymentStatus(orderId)`.
    - Verificar periodicamente se o status mudou para `PAID`.
    - Avançar para o Step 5 (Sucesso) apenas após confirmação real.

- [ ] **Atualizar Contexto Global**
    - Ao finalizar, recarregar o `UserContext` buscando dados atualizados da API (`/api/me`).

## 4. Segurança & Compliance

- [ ] **Validação de Dados (Zod)**
    - Validar CPF/CNPJ no backend antes de criar o pedido.
    - Sanitizar inputs para evitar SQL Injection.

- [ ] **Autenticação**
    - Proteger rotas de checkout (apenas usuários autenticados ou criar conta durante o fluxo).

- [ ] **Logs de Auditoria**
    - Registrar tentativas de pagamento falhas.

## 5. Próximos Passos (Plano de Ação)

1.  Configurar projeto no Supabase (ou banco escolhido).
2.  Criar as tabelas conforme esquema acima.
3.  Escolher Gateway de Pagamento (sugestão: Asaas ou Stripe para recorrência).
4.  Desenvolver as Serverless Functions ou API Routes.
5.  Conectar o Frontend.
