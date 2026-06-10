# Procedimento Operacional Padrão (POP 003) - Auditoria e Inspeção de Frota (Checklist)
**Sistema:** Helonex Global (Módulo GesTech)
**Norma Relacionada:** ISO 9001 e ISO 39001 (Segurança Viária)
**Data de Emissão:** 01/03/2026

## 1. OBJETIVO
Garantir a integridade, rastreabilidade e imutabilidade das inspeções físicas (Checklists) realizadas nos veículos da frota, eliminando formulários de papel e prevenindo fraudes operacionais.

## 2. PROCEDIMENTO DO INSPETOR / MOTORISTA
1. O operador acessa o Módulo de Checklist no portal ou aplicativo Helonex.
2. Preenche os itens de verificação (Ex: Pneus, Freios, RNTRC, Lonas).
3. O sistema aplica a **Matriz de Severidade**:
    * Se houver falha *Crítica* (ex: Pneu careca), o veículo é bloqueado para viagem.
    * Se houver falha *Leve*, gera-se um alerta de manutenção preventiva.
4. Ao clicar em finalizar, o sistema gera o **Hash de Integridade (Selo HLX)**.

## 3. AUDITORIA E PERSISTÊNCIA (SISTEMA)
* **Gravação em Nuvem:** Os dados não residem no dispositivo físico. São criptografados e enviados para a tabela `inspecoes_frota` no banco de dados central (Supabase).
* **Imutabilidade:** Nenhuma vistoria finalizada pode ser apagada ou editada pelo inspetor, gestor ou administrador da Assessoria Nacional ao Transporte. Qualquer correção exige uma *nova* inspeção.
* **Registro Jurídico:** A ação gera um log irreversível na tabela `logs_auditoria_helonex`, servindo como evidência material em caso de sinistros, fiscalizações da ANTT ou processos de certificação ISO.

**Assinatura de Responsabilidade:** Diretoria de Qualidade Helonex.
