-- TABELA DE INSPEÇÕES DE FROTA (CHECKLISTS)
CREATE TABLE public.inspecoes_frota (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    veiculo_placa TEXT NOT NULL,
    inspetor_id UUID REFERENCES auth.users(id),
    hash_integridade TEXT NOT NULL UNIQUE,
    status_severidade TEXT NOT NULL, -- Ex: 'APROVADO', 'REPROVADO_CRITICO'
    dados_inspecao JSONB NOT NULL, -- Guarda todas as respostas do checklist
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BLINDAGEM DE SEGURANÇA (RLS - ISO 27001)
ALTER TABLE public.inspecoes_frota ENABLE ROW LEVEL SECURITY;

-- Regra 1: O sistema (usuário logado) pode inserir a vistoria
CREATE POLICY "Inserir vistoria autenticada" ON public.inspecoes_frota
    FOR INSERT TO authenticated 
    WITH CHECK (auth.uid() = inspetor_id);

-- Regra 2: O usuário só pode ler as vistorias da sua própria frota
CREATE POLICY "Ler próprias vistorias" ON public.inspecoes_frota
    FOR SELECT TO authenticated 
    USING (auth.uid() = inspetor_id);
    
-- Nota de Auditoria: Não há regra de UPDATE ou DELETE. Vistoria salva é vistoria imutável.

-- TABELA DE LOGS DE AUDITORIA (CAIXA PRETA)
CREATE TABLE public.logs_auditoria_helonex (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES auth.users(id),
    acao TEXT NOT NULL,
    modulo TEXT NOT NULL,
    payload_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.logs_auditoria_helonex ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Inserir log autenticado" ON public.logs_auditoria_helonex
    FOR INSERT TO authenticated 
    WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Ler próprios logs" ON public.logs_auditoria_helonex
    FOR SELECT TO authenticated 
    USING (auth.uid() = usuario_id);
