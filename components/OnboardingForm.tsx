import React, { useState } from 'react';
import { User, FileText, Phone, Briefcase, ArrowRight, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../src/lib/supabase';

interface OnboardingFormProps {
  onComplete: () => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [profileType, setProfileType] = useState('TAC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Máscara para CPF ou CNPJ
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      // CPF
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // CNPJ
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    setDocument(value.slice(0, 18));
  };

  // Máscara para Telefone (WhatsApp)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    setPhone(value.slice(0, 15));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !document || !phone || !profileType) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Usuário não autenticado.');

      // Atualiza os metadados do usuário no Supabase Auth
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          full_name: name,
          document: document,
          phone: phone,
          profile_type: profileType,
          status_cadastro: 'COMPLETO'
        }
      });

      if (updateError) throw updateError;

      // Atualiza a tabela perfis_usuarios no banco de dados
      const { error: dbError } = await supabase
        .from('perfis_usuarios')
        .update({ 
          nome_completo: name, 
          cpf_cnpj: document, 
          telefone: phone,
          tipo_usuario: profileType,
          status_cadastro: 'COMPLETO' 
        })
        .eq('id', user.id);

      if (dbError) throw dbError;

      onComplete();
    } catch (err: any) {
      console.error('Erro no onboarding:', err);
      setError(err.message || 'Erro ao salvar os dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hlx-navy flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      
      <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full relative z-10 overflow-hidden p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-hlx-gold to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20 border border-white/10">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Completar Perfil</h1>
          <p className="text-gray-400">Precisamos de mais alguns dados para personalizar sua experiência no Ecossistema HELONEX.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs p-3 rounded-lg flex items-center gap-3 animate-slide-up">
              <AlertCircle size={20} className="flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Nome Completo ou Razão Social</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-hlx-gold transition-colors"
                placeholder="Ex: Transportes Silva LTDA"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">CPF / CNPJ</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3.5 text-gray-500" size={18} />
                <input 
                  type="text" 
                  value={document}
                  onChange={handleDocumentChange}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-hlx-gold transition-colors"
                  placeholder="000.000.000-00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Telefone (WhatsApp)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 text-gray-500" size={18} />
                <input 
                  type="text" 
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-hlx-gold transition-colors"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-400">Tipo de Perfil</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <select 
                value={profileType}
                onChange={(e) => setProfileType(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white outline-none focus:border-hlx-gold transition-colors appearance-none"
                required
              >
                <option value="TAC">TAC - Transportador Autônomo</option>
                <option value="ETC">ETC - Empresa de Transporte</option>
                <option value="EMBARCADOR">Embarcador</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <>FINALIZAR CADASTRO <ArrowRight size={20} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
