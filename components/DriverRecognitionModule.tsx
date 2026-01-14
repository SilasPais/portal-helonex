
import React, { useState, useEffect } from 'react';
import { 
  Trophy, Award, TrendingUp, Users, Lock, Unlock, 
  Crown, Star, Percent, DollarSign, Calculator, Zap, 
  CheckCircle, Medal, HeartHandshake, FileText, Gem, Heart, 
  Bus, Truck, Building2, Leaf
} from 'lucide-react';
import { ProfileSegment } from '../types';

interface DriverRecognitionModuleProps {
  segment?: ProfileSegment; // CARGO_PROVIDER, PASSENGER_PROVIDER, OWN_CARGO
}

const DriverRecognitionModule: React.FC<DriverRecognitionModuleProps> = ({ segment = 'CARGO_PROVIDER' }) => {
  const [isModuleActive, setIsModuleActive] = useState(false);
  const [savings, setSavings] = useState(15000);
  const [bonusPercentage, setBonusPercentage] = useState(12);

  // Configuração Dinâmica baseada no "Mundo"
  const getContextConfig = () => {
    switch (segment) {
      case 'PASSENGER_PROVIDER':
        return {
          title: 'Liga de Ouro (Conforto & Segurança)',
          kpiLabel: 'Índice de Conforto (IQT)',
          kpiUnit: 'Pontos',
          savingLabel: 'Redução de Sinistros/Quebras',
          icon: <Bus className="text-hlx-gold" />,
          driverLabel: 'Condutor',
          pitch: 'Passageiro feliz volta. Motorista que dirige suave economiza freio, pneu e evita acidentes. Premie quem cuida da vida.'
        };
      case 'OWN_CARGO':
        return {
          title: 'Guardiões da Marca (Frota Própria)',
          kpiLabel: 'Preservação do Ativo',
          kpiUnit: '%',
          savingLabel: 'Economia em Manutenção',
          icon: <Building2 className="text-hlx-gold" />,
          driverLabel: 'Operador',
          pitch: 'Seu caminhão carrega sua marca. Motorista que veste a camisa reduz custo de manutenção e evita riscos de imagem.'
        };
      default: // CARGO_PROVIDER
        return {
          title: 'Liga de Campeões (Diesel & Eficiência)',
          kpiLabel: 'Média de Consumo',
          kpiUnit: 'km/l',
          savingLabel: 'Economia de Diesel (Mês)',
          icon: <Truck className="text-hlx-gold" />,
          driverLabel: 'Motorista',
          pitch: 'Transforme motoristas em sócios da eficiência. Reduza o consumo de diesel em até 12% premiando quem tem o pé leve.'
        };
    }
  };

  const context = getContextConfig();

  // Mock Data Adaptado
  const drivers = [
    { id: 1, name: 'João Silva', tier: 'DIAMANTE', score: 980, economy: 1200, bonus: 144, img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100' },
    { id: 2, name: 'Carlos Mendes', tier: 'OURO', score: 850, economy: 900, bonus: 108, img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
    { id: 3, name: 'Roberto Dias', tier: 'PRATA', score: 720, economy: 500, bonus: 60, img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100' },
    { id: 'me', name: 'Sua Empresa', tier: 'DIAMANTE', score: 950, economy: 0, bonus: 0, img: '', isCompany: true }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'DIAMANTE': return 'text-cyan-400 border-cyan-500 bg-cyan-500/10';
      case 'OURO': return 'text-yellow-400 border-yellow-500 bg-yellow-500/10';
      case 'PRATA': return 'text-gray-300 border-gray-400 bg-gray-500/10';
      default: return 'text-amber-700 border-amber-800 bg-amber-800/10';
    }
  };

  if (!isModuleActive) {
    return (
      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden relative min-h-[600px] flex flex-col items-center justify-center text-center p-8 animate-fade-in-up">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-400 font-bold uppercase tracking-widest text-xs mb-6 animate-pulse">
            <HeartHandshake size={16} /> RhTec para {segment === 'PASSENGER_PROVIDER' ? 'Passageiros' : segment === 'OWN_CARGO' ? 'Frota Própria' : 'Cargas'}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Transforme {context.driverLabel}s em <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Sócios da Excelência</span>
          </h2>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            "{context.pitch}"
            <br/><br/>
            Ative o sistema de <strong>Gamificação & Premiação Automática</strong>. Reduza o turnover e aumente o valor de venda (Valuation) da sua empresa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
             <div className="bg-slate-800/80 p-4 rounded-xl border border-white/10">
               <TrendingUp className="text-green-400 mb-2" />
               <h4 className="font-bold text-white text-sm">ROI Automático</h4>
               <p className="text-xs text-gray-400">{context.savingLabel} paga o sistema.</p>
             </div>
             <div className="bg-slate-800/80 p-4 rounded-xl border border-white/10">
               <Medal className="text-yellow-400 mb-2" />
               <h4 className="font-bold text-white text-sm">Retenção Total</h4>
               <p className="text-xs text-gray-400">{context.driverLabel} premiado não sai da empresa.</p>
             </div>
             <div className="bg-slate-800/80 p-4 rounded-xl border border-green-500/30 relative overflow-hidden">
               <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
               <Gem className="text-green-400 mb-2 relative z-10" />
               <h4 className="font-bold text-white text-sm relative z-10">Valuation Booster</h4>
               <p className="text-xs text-gray-300 relative z-10">
                 Aumenta o valor de mercado (Ativo Intangível).
               </p>
             </div>
          </div>

          <button 
            onClick={() => setIsModuleActive(true)}
            className="group px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-3 w-full md:w-auto mx-auto"
          >
            <Unlock size={20} />
            ATIVAR RHTEC (R$ 14,90/CPF)
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            * Valor por {context.driverLabel.toLowerCase()} ativo. Cobrança mensal na fatura Helonex.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Header do Módulo */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 bg-slate-900 p-6 rounded-2xl border border-pink-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <HeartHandshake size={150} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <span className="text-[10px] font-bold bg-pink-500/10 text-pink-400 px-2 py-1 rounded border border-pink-500/20 uppercase tracking-widest">
                RhTec Engine • {segment === 'PASSENGER_PROVIDER' ? 'Passageiros' : segment === 'OWN_CARGO' ? 'Frota Própria' : 'Cargas'}
             </span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-hlx-gold" /> {context.title}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Gestão de Performance, Reconhecimento e Premiação Variável.
          </p>
        </div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="text-right">
             <p className="text-xs text-gray-500 font-bold uppercase">{context.savingLabel}</p>
             <p className="text-2xl font-bold text-green-400">R$ {savings.toLocaleString()}</p>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="text-right">
             <p className="text-xs text-gray-500 font-bold uppercase">Bônus Distribuído</p>
             <p className="text-2xl font-bold text-hlx-gold">R$ {(savings * (bonusPercentage/100)).toLocaleString()}</p>
           </div>
        </div>
      </div>

      {/* Alerta de Valuation */}
      <div className="bg-green-900/10 border border-green-500/30 p-4 rounded-xl flex items-center justify-between">
         <div className="flex items-center gap-3">
            <Gem className="text-green-400" size={24} />
            <div>
               <h4 className="text-white font-bold text-sm">Ativo de Valuation Detectado</h4>
               <p className="text-xs text-gray-400">
                  A presença deste programa de retenção adiciona pontos valiosos ao seu Diagnóstico Patrimonial (Intangíveis).
               </p>
            </div>
         </div>
         <span className="text-xs font-bold bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
            + Pontos Empresa
         </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leaderboard */}
        <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
           <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950">
             <h3 className="text-white font-bold">Ranking Geral</h3>
             <button className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded border border-white/10 hover:bg-slate-700">
               Ver Critérios
             </button>
           </div>
           
           <div className="p-2">
             {drivers.filter(d => !d.isCompany).map((driver, index) => (
               <div key={driver.id} className="flex items-center gap-4 p-4 hover:bg-slate-800 rounded-xl transition-colors group">
                 <div className="flex-shrink-0 w-8 text-center font-bold text-gray-500 text-lg">
                   {index + 1}º
                 </div>
                 <div className="relative">
                   <img src={driver.img} alt={driver.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-700" />
                   <div className="absolute -bottom-1 -right-1 bg-slate-900 rounded-full p-0.5">
                     {driver.tier === 'DIAMANTE' && <Crown size={14} className="text-cyan-400 fill-cyan-400" />}
                     {driver.tier === 'OURO' && <Medal size={14} className="text-yellow-400 fill-yellow-400" />}
                   </div>
                 </div>
                 <div className="flex-1">
                   <h4 className="text-white font-bold">{driver.name}</h4>
                   <div className="flex items-center gap-2 mt-1">
                     <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${getTierColor(driver.tier)}`}>
                       {driver.tier}
                     </span>
                     <span className="text-xs text-gray-500">{context.kpiLabel}: {driver.score}{context.kpiUnit}</span>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-xs text-gray-400 uppercase font-bold">Bônus</p>
                   <p className="text-hlx-gold font-bold">R$ {driver.bonus.toFixed(2)}</p>
                 </div>
                 <button className="p-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                   <FileText size={18} />
                 </button>
               </div>
             ))}
           </div>
        </div>

        {/* Configuração de Recompensa */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col">
           <h3 className="text-white font-bold mb-6 flex items-center gap-2">
             <Calculator size={18} className="text-green-400" /> Calculadora de Partilha
           </h3>
           
           <div className="space-y-6 flex-1">
             <div>
               <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">{context.savingLabel}</label>
               <div className="relative">
                 <DollarSign className="absolute left-3 top-3 text-gray-500" size={16} />
                 <input 
                   type="number" 
                   value={savings}
                   onChange={(e) => setSavings(Number(e.target.value))}
                   className="w-full bg-slate-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white font-mono"
                 />
               </div>
             </div>

             <div>
               <div className="flex justify-between mb-2">
                 <label className="text-xs font-bold text-gray-400 uppercase">Percentual de Repasse</label>
                 <span className="text-hlx-gold font-bold">{bonusPercentage}%</span>
               </div>
               <input 
                 type="range" 
                 min="0" max="30" 
                 value={bonusPercentage}
                 onChange={(e) => setBonusPercentage(Number(e.target.value))}
                 className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-hlx-gold"
               />
               <p className="text-[10px] text-gray-500 mt-2">
                 Recomendado: 10% a 15% para manter a sustentabilidade.
               </p>
             </div>

             <div className="bg-green-900/20 border border-green-500/20 p-4 rounded-xl text-center mt-auto">
               <p className="text-xs text-green-300 font-bold uppercase mb-1">Total a Pagar (Folha)</p>
               <p className="text-3xl font-display font-bold text-green-400">R$ {(savings * (bonusPercentage/100)).toLocaleString()}</p>
             </div>
             
             <button className="w-full py-3 bg-hlx-blue hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2">
               <HeartHandshake size={18} /> Aprovar Pagamento
             </button>
           </div>
        </div>

      </div>

      {/* Certificado Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-hlx-gold/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hlx-gold via-orange-500 to-hlx-gold"></div>
         
         <div>
           <h3 className="text-2xl font-bold text-white mb-2">Visto de Confiança Helonex</h3>
           <p className="text-gray-300 max-w-xl text-sm leading-relaxed">
             {segment === 'OWN_CARGO' 
               ? 'Operadores certificados cuidam melhor do equipamento e valorizam a marca da empresa nas estradas.' 
               : 'Motoristas Nível Ouro e Diamante recebem um certificado digital assinado, validando sua competência. Isso reduz o custo de seguro.'}
           </p>
         </div>

         <div className="flex gap-4">
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg border border-white/10 transition-colors">
              Ver Modelo
            </button>
            <button className="px-6 py-3 bg-hlx-gold hover:bg-yellow-400 text-slate-900 font-bold rounded-lg shadow-lg transition-colors flex items-center gap-2">
              <Award size={18} /> Emitir Certificados
            </button>
         </div>
      </div>

    </div>
  );
};

export default DriverRecognitionModule;
