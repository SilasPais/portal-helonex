
import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Truck, Briefcase, Key, Sun, UserPlus, Anchor, AlertTriangle, Loader2 } from 'lucide-react';
import { UserRole } from '../types';
import { supabase } from '../src/lib/supabase';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  onBack: () => void;
  onNavigateToRegister?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBack, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Por enquanto, assumimos que todo usuário logado é um 'subscriber'
        // Futuramente, podemos buscar a role no banco de dados
        onLogin('subscriber');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      let message = err.message || 'Credenciais inválidas ou usuário não registrado.';
      
      if (message.includes('Failed to fetch')) {
        message = 'Erro de conexão com o servidor. Verifique se o Supabase está configurado corretamente no painel de configurações.';
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatedLogin = (role: UserRole) => {
    // Mantendo para fins de demonstração/teste rápido se necessário, 
    // mas o foco agora é a auth real.
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-hlx-navy flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"></div>

      <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row max-w-4xl w-full relative z-10 overflow-hidden">
        
        <div className="md:w-1/2 p-10 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-950 border-r border-white/5">
          <div>
            <div className="w-12 h-12 bg-gradient-to-br from-hlx-gold to-orange-500 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 border border-white/10">
              <span className="font-display font-bold text-white text-xl flex items-center"><Sun size={24} /></span>
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">HELONEX ID</h1>
            <p className="text-gray-400">Entre com suas credenciais para acessar o Sistema Boreal.</p>
          </div>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <ShieldCheck size={16} className="text-hlx-gold" />
              Ambiente Criptografado (SSL)
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Lock size={16} className="text-hlx-gold" />
              Autenticação de Dois Fatores (2FA)
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-10 bg-slate-800">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs flex items-center gap-2">
                <AlertTriangle size={16} />
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">E-mail Corporativo / CPF</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-hlx-gold focus:ring-1 focus:ring-hlx-gold outline-none transition-all"
                placeholder="usuario@helonex.global"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Senha de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-hlx-gold focus:ring-1 focus:ring-hlx-gold outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold py-3 rounded-lg transition-colors shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <>CONECTAR AO SISTEMA <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="mt-6 text-center">
             <p className="text-xs text-gray-500">
               Ainda não é membro?{' '}
               <button 
                 onClick={onNavigateToRegister}
                 className="text-hlx-gold hover:underline font-bold inline-flex items-center gap-1"
               >
                 Criar Conta <UserPlus size={12} />
               </button>
             </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-xs text-center text-gray-500 mb-4 uppercase font-bold">Acesso Rápido (Simulação de Perfis)</p>
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => handleSimulatedLogin('subscriber')} className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white flex flex-col items-center gap-1 transition-colors">
                <Truck size={14} className="text-green-400" /> Assinante
              </button>
              <button onClick={() => handleSimulatedLogin('shipper')} className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white flex flex-col items-center gap-1 transition-colors">
                <Anchor size={14} className="text-cyan-400" /> Embarcador
              </button>
              <button onClick={() => handleSimulatedLogin('partner')} className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white flex flex-col items-center gap-1 transition-colors">
                <Briefcase size={14} className="text-blue-400" /> Parceiro
              </button>
              <button onClick={() => handleSimulatedLogin('admin')} className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-xs text-white flex flex-col items-center gap-1 transition-colors border border-red-500/30">
                <Key size={14} className="text-red-500" /> ADMIN
              </button>
            </div>
          </div>

          <button onClick={onBack} className="mt-6 text-xs text-gray-500 hover:text-white w-full text-center underline">
            Voltar para o site público
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginScreen;
