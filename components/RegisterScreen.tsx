
import React, { useState } from 'react';
import { UserPlus, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle, ArrowLeft, Sun, Truck, Briefcase, Anchor, Building2, User, AlertCircle, Loader2 } from 'lucide-react';
import { ProfileSegment } from '../types';
import { supabase } from '../src/lib/supabase';

interface RegisterScreenProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
  onBack: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onNavigateToLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<ProfileSegment | null>(null);
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldError(null);
    setSuccessMessage('');

    if (!selectedProfile) {
      setError('Obrigatório: Selecione o seu perfil de atuação para personalizar seu painel regulatório.');
      setFieldError('profile');
      return;
    }

    if (!email) {
      setError('O campo de E-mail é indispensável para sua identidade digital.');
      setFieldError('email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Formato de e-mail inválido. Utilize um e-mail corporativo válido.');
      setFieldError('email');
      return;
    }

    if (!password) {
      setError('A senha é obrigatória para proteger seu patrimônio de dados.');
      setFieldError('password');
      return;
    }

    if (password.length < 8) {
      setError('Segurança Baixa: Sua senha deve ter pelo menos 8 caracteres conforme padrão HSM.');
      setFieldError('password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Divergência Detectada: As senhas não coincidem. Verifique a digitação.');
      setFieldError('confirmPassword');
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            profile_segment: selectedProfile,
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.user) {
        setSuccessMessage('Cadastro realizado com sucesso! Verifique o painel do Supabase.');
        setTimeout(() => {
          onRegister();
        }, 2000);
      }
    } catch (err: any) {
      console.error("Falha na comunicação com o Supabase:", err);
      setError(err.message || 'Erro ao registrar usuário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const profiles = [
    { id: 'CARGO_PROVIDER', label: 'Transportador Carga', icon: <Truck size={20} />, desc: 'ETC, TAC ou Cooperativa' },
    { id: 'PASSENGER_PROVIDER', label: 'Transporte Passageiros', icon: <User size={20} />, desc: 'Fretamento, Escolar ou Turismo' },
    { id: 'SHIPPER', label: 'Embarcador / Contratante', icon: <Anchor size={20} />, desc: 'Indústria ou Agente de Carga' },
    { id: 'OWN_CARGO', label: 'Carga Própria', icon: <Building2 size={20} />, desc: 'Transporte de Mercadoria Própria' },
  ];

  return (
    <div className="min-h-screen bg-hlx-navy flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      
      <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row max-w-5xl w-full relative z-10 overflow-hidden">
        
        <div className="md:w-5/12 p-10 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-950 border-r border-white/5 order-last md:order-first">
          <div>
            <div className="w-12 h-12 bg-gradient-to-br from-hlx-gold to-orange-500 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 border border-white/10">
              <span className="font-display font-bold text-white text-xl flex items-center"><Sun size={24} /></span>
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Crie sua Conta</h1>
            <p className="text-gray-400">Entre para o Ecossistema HELONEX e elimine o erro humano da sua gestão.</p>
          </div>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <ShieldCheck size={16} className="text-hlx-gold" />
              Conformidade LGPD & Criptografia HSM
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <CheckCircle size={16} className="text-hlx-gold" />
              Acesso Imediato ao Visto de Entrada
            </div>
          </div>
        </div>

        <div className="md:w-7/12 p-10 bg-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs p-3 rounded-lg flex items-center gap-3 animate-slide-up">
                <AlertCircle size={20} className="flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}
            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-400 text-xs p-3 rounded-lg flex items-center gap-3 animate-slide-up">
                <CheckCircle size={20} className="flex-shrink-0" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-3 ${fieldError === 'profile' ? 'text-red-400' : 'text-gray-400'}`}>Selecione seu Perfil Principal</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profiles.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => { setSelectedProfile(p.id as ProfileSegment); if(fieldError === 'profile') setFieldError(null); }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedProfile === p.id 
                        ? 'bg-hlx-blue/20 border-hlx-blue text-white shadow-lg' 
                        : 'bg-slate-900 border-white/10 text-gray-400 hover:bg-slate-700'
                    } ${fieldError === 'profile' && !selectedProfile ? 'border-red-500/50' : ''}`}
                  >
                    <div className={`p-2 rounded-lg ${selectedProfile === p.id ? 'bg-hlx-blue text-white' : 'bg-slate-800 text-gray-500'}`}>
                      {p.icon}
                    </div>
                    <div>
                      <p className="font-bold text-xs">{p.label}</p>
                      <p className="text-[9px] opacity-70">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${fieldError === 'email' ? 'text-red-400' : 'text-gray-400'}`}>E-mail Corporativo</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-3.5 ${fieldError === 'email' ? 'text-red-400' : 'text-gray-500'}`} size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if(fieldError === 'email') setFieldError(null); }}
                  className={`w-full bg-slate-900 border rounded-lg pl-10 pr-4 py-3 text-white outline-none transition-all ${fieldError === 'email' ? 'border-red-500' : 'border-white/10 focus:border-hlx-gold'}`}
                  placeholder="voce@empresa.com.br"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${fieldError === 'password' ? 'text-red-400' : 'text-gray-400'}`}>Senha</label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-3.5 ${fieldError === 'password' ? 'text-red-400' : 'text-gray-500'}`} size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if(fieldError === 'password') setFieldError(null); }}
                    className={`w-full bg-slate-900 border rounded-lg pl-10 pr-4 py-3 text-white outline-none transition-all ${fieldError === 'password' ? 'border-red-500' : 'border-white/10 focus:border-hlx-gold'}`}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${fieldError === 'confirmPassword' ? 'text-red-400' : 'text-gray-400'}`}>Confirmar Senha</label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-3.5 ${fieldError === 'confirmPassword' ? 'text-red-400' : 'text-gray-500'}`} size={18} />
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); if(fieldError === 'confirmPassword') setFieldError(null); }}
                    className={`w-full bg-slate-900 border rounded-lg pl-10 pr-4 py-3 text-white outline-none transition-all ${fieldError === 'confirmPassword' ? 'border-red-500' : 'border-white/10 focus:border-hlx-gold'}`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold py-3 rounded-lg transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <><UserPlus size={20} /> INICIAR PROTOCOLO ERRO ZERO</>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Já possui acesso soberano?{' '}
              <button 
                onClick={onNavigateToLogin}
                className="text-hlx-gold hover:underline font-bold"
              >
                Conectar ao Sistema
              </button>
            </p>
          </div>

          <button onClick={onBack} className="mt-6 text-xs text-gray-500 hover:text-white w-full text-center flex items-center justify-center gap-1">
            <ArrowLeft size={12} /> Voltar para o portal público
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegisterScreen;
