
import React, { useState } from 'react';
import { UserPlus, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle, ArrowLeft, Sun, Truck, Briefcase, Anchor, Building2, User } from 'lucide-react';
import { ProfileSegment } from '../types';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedProfile) {
      setError('Por favor, selecione o seu perfil de atuação.');
      return;
    }

    if (!email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordStrengthRegex.test(password)) {
      setError('A senha deve ter no mínimo 8 caracteres, contendo pelo menos uma letra maiúscula, uma minúscula e um número.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    onRegister();
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
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"></div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row max-w-5xl w-full relative z-10 overflow-hidden">
        
        <div className="md:w-5/12 p-10 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-950 border-r border-white/5 order-last md:order-first">
          <div>
            <div className="w-12 h-12 bg-gradient-to-br from-hlx-gold to-orange-500 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 border border-white/10">
              <span className="font-display font-bold text-white text-xl flex items-center"><Sun size={24} /></span>
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Crie sua Conta</h1>
            <p className="text-gray-400">Junte-se ao Ecossistema HELONEX e transforme sua gestão logística.</p>
          </div>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <ShieldCheck size={16} className="text-hlx-gold" />
              Dados Protegidos por LGPD
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <CheckCircle size={16} className="text-hlx-gold" />
              Acesso Imediato ao Painel
            </div>
          </div>
        </div>

        <div className="md:w-7/12 p-10 bg-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs p-3 rounded-lg flex items-start gap-2">
                <ShieldCheck size={14} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* SELEÇÃO DE PERFIL */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Qual o seu perfil?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profiles.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => setSelectedProfile(p.id as ProfileSegment)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedProfile === p.id 
                        ? 'bg-hlx-blue/20 border-hlx-blue text-white' 
                        : 'bg-slate-900 border-white/10 text-gray-400 hover:bg-slate-700'
                    }`}
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
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-hlx-gold focus:ring-1 focus:ring-hlx-gold outline-none transition-all"
                  placeholder="voce@empresa.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-hlx-gold focus:ring-1 focus:ring-hlx-gold outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Confirmar</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-hlx-gold focus:ring-1 focus:ring-hlx-gold outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold py-3 rounded-lg transition-colors shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
            >
              <UserPlus size={20} /> CRIAR CONTA
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Já tem uma conta?{' '}
              <button 
                onClick={onNavigateToLogin}
                className="text-hlx-gold hover:underline font-bold"
              >
                Fazer Login
              </button>
            </p>
          </div>

          <button onClick={onBack} className="mt-6 text-xs text-gray-500 hover:text-white w-full text-center flex items-center justify-center gap-1">
            <ArrowLeft size={12} /> Voltar para o site público
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegisterScreen;
