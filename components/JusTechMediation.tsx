import React, { useState } from 'react';
import { Scale, AlertTriangle, CheckCircle, Gavel, DollarSign, ArrowRight, ShieldAlert, PenTool } from 'lucide-react';
import { MetacognitiveEngine } from '../src/domain/ai/MetacognitiveEngine';
import { supabase } from '../src/lib/supabase';

type TipoConflito = 'ESTADIA' | 'AVARIA' | 'QUEBRA_CONTRATO';

const JusTechMediation: React.FC = () => {
  const [valorCausa, setValorCausa] = useState<number | ''>('');
  const [tipoConflito, setTipoConflito] = useState<TipoConflito>('ESTADIA');
  const [resultado, setResultado] = useState<{ riskForDefendant: number; settlementSuggestion: number; legalWarning: string } | null>(null);
  const [acordoAssinado, setAcordoAssinado] = useState<{ hash: string; dataHora: string } | null>(null);

  const handleSolicitarParecer = () => {
    if (!valorCausa || Number(valorCausa) <= 0) {
      alert("Por favor, insira um valor válido para o conflito.");
      return;
    }
    const res = MetacognitiveEngine.generateNeutralArbitration(Number(valorCausa), tipoConflito);
    setResultado(res);
    setAcordoAssinado(null);
  };

  const handleAssinarAcordo = async () => {
    if (!resultado) return;

    const hashAcordo = 'HLX-JUS-' + Date.now().toString(36).toUpperCase();
    const dataHora = new Date().toLocaleString('pt-BR');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('logs_auditoria_helonex').insert([{
          usuario_id: user.id,
          acao: 'ASSINATURA_ACORDO_JUSTECH',
          modulo: 'JusTech_Mediacao',
          payload_json: { valorAcordo: resultado.settlementSuggestion, hash: hashAcordo, tipoConflito: tipoConflito }
        }]);
      }
    } catch (error) {
      console.error("Erro ao registrar auditoria:", error);
    }

    setAcordoAssinado({ hash: hashAcordo, dataHora });
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl">
      <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
        <div className="w-12 h-12 bg-hlx-gold/20 rounded-xl flex items-center justify-center border border-hlx-gold/50">
          <Scale className="text-hlx-gold" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Câmara de Conciliação</h2>
          <p className="text-gray-400 text-sm">Árbitro Neutro Metacognitivo (JusTech)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Valor do Conflito (R$)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <input 
              type="number" 
              value={valorCausa}
              onChange={(e) => setValorCausa(Number(e.target.value))}
              className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-hlx-gold transition-colors"
              placeholder="Ex: 5000"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Tipo de Conflito</label>
          <div className="relative">
            <Gavel className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <select 
              value={tipoConflito}
              onChange={(e) => setTipoConflito(e.target.value as TipoConflito)}
              className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-hlx-gold transition-colors appearance-none"
            >
              <option value="ESTADIA">Estadia / Diária Atrasada</option>
              <option value="AVARIA">Avaria de Carga</option>
              <option value="QUEBRA_CONTRATO">Quebra de Contrato</option>
            </select>
          </div>
        </div>
      </div>

      <button 
        onClick={handleSolicitarParecer}
        className="w-full bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 active:scale-95"
      >
        SOLICITAR PARECER ARBITRAL <ArrowRight size={20} />
      </button>

      {resultado && (
        <div className="mt-8 space-y-6 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Risco Judicial (Vermelho) */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <AlertTriangle size={100} className="text-red-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <ShieldAlert size={18} /> Risco Judicial (Réu)
                </div>
                <div className="text-4xl font-black text-red-500 mb-2">
                  {resultado.riskForDefendant.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
                <p className="text-xs text-red-400/80">
                  Custo estimado incluindo honorários, custas processuais e tempo perdido.
                </p>
              </div>
            </div>

            {/* Sugestão de Acordo (Verde) */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <CheckCircle size={100} className="text-green-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-green-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <CheckCircle size={18} /> Sugestão de Acordo
                </div>
                <div className="text-4xl font-black text-green-400 mb-2">
                  {resultado.settlementSuggestion.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
                <p className="text-xs text-green-400/80">
                  Valor ideal para encerramento imediato do litígio via assinatura digital.
                </p>
              </div>
            </div>
          </div>

          {/* Parecer Neutro */}
          <div className="bg-slate-950 border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <Gavel className="text-hlx-gold" size={18} /> Parecer Metacognitivo HELONEX
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {resultado.legalWarning}
            </p>
          </div>

          {/* Botão de Assinatura e Modal de Sucesso */}
          {!acordoAssinado ? (
            <button 
              onClick={handleAssinarAcordo}
              className="w-full bg-green-500 hover:bg-green-400 text-slate-900 font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 active:scale-95 mt-4"
            >
              <PenTool size={20} /> ACEITAR ACORDO E ASSINAR DIGITALMENTE
            </button>
          ) : (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mt-4 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-green-400" size={24} />
                <h3 className="text-green-400 font-bold text-lg">Termo de Acordo Extrajudicial Gerado</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong className="text-white">Valor Acordado:</strong> {resultado.settlementSuggestion.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p><strong className="text-white">Hash de Autenticidade:</strong> <span className="font-mono text-hlx-gold">{acordoAssinado.hash}</span></p>
                <p><strong className="text-white">Carimbo de Tempo:</strong> {acordoAssinado.dataHora}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-green-500/20">
                <p className="text-xs text-green-400/80 italic">
                  "Acordo firmado com base na Lei de Arbitragem (Lei nº 9.307/96). A documentação oficial foi enviada ao e-mail das partes."
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JusTechMediation;
