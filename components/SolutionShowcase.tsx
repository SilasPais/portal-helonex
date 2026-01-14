
import React, { useState } from 'react';
import { 
  ShieldCheck, TrendingUp, Users, Zap, Truck, Globe, 
  BrainCircuit, Anchor, CheckCircle, ArrowRight, DollarSign, 
  Layers, ChevronRight, Award, Star, Briefcase, Eye, Activity, Gavel, Smartphone,
  ScanFace, Megaphone, Target, CheckCircle2, Bus, Lock, Heart, Radio, Mic, Coffee, Flower2, Newspaper, HeartHandshake, EyeOff
} from 'lucide-react';

interface SolutionShowcaseProps {
  onNavigateToLogin: () => void;
  onNavigateToPlans: () => void;
}

type ProfileTab = 'TAC' | 'ETC' | 'EMBARCADOR';

const SolutionShowcase: React.FC<SolutionShowcaseProps> = ({ onNavigateToLogin, onNavigateToPlans }) => {
  const [activeProfile, setActiveProfile] = useState<ProfileTab>('ETC');

  // Perfis com foco em "Conformidade Total" e "Tecnologia de Ponta"
  const profiles = {
    TAC: {
      label: 'Autônomo (TAC)',
      icon: <Truck size={20} />,
      headline: 'Sua Cabine, Seu Império Tecnológico.',
      pain: 'Burocracia analógica, perda de tempo em filas e risco de multas automáticas.',
      gain: 'Soberania Digital. Regularize sua ANTT com autonomia total via GovTech, faça cursos no celular (EduTech) e use o sistema para evitar a malha fina.',
      steps: [
        { title: 'GovTech (IDT)', desc: 'Autonomia Total. Emita seu RNTRC e CIOT diretamente pela plataforma.' },
        { title: 'Anti-Multa (Pessoal)', desc: 'O sistema avisa se você está encerrando MDF-e errado antes do governo ver.' },
        { title: 'EduTech', desc: 'Cursos rápidos no WhatsApp para não perder dia de trabalho.' }
      ]
    },
    ETC: {
      label: 'Transportadora (ETC)',
      icon: <Layers size={20} />,
      headline: 'Gestão de Frota 360° & Blindagem',
      pain: 'Multas invisíveis por encerramento de MDF-e, passivo trabalhista e perda de contratos.',
      gain: 'GesTech & JusTech. Auditoria em tempo real, rastreamento de infrações em todos os órgãos e defesa automática com IA.',
      steps: [
        { title: 'JusTech (Contra-Inteligência)', desc: 'Varredura automática de falhas no MDF-e e Pedágio antes da fiscalização.' },
        { title: 'RhTec (Retenção)', desc: 'Acabe com o turnover. Gamificação para motoristas com premiação automática.' },
        { title: 'Conformidade Total', desc: 'Validação automática de documentos antes da viagem (Conceito Erro Zero).' }
      ]
    },
    EMBARCADOR: {
      label: 'Embarcador & Passageiros',
      icon: <Anchor size={20} />,
      headline: 'Risco Zero e Homologação Inteligente',
      pain: 'Responsabilidade solidária em acidentes, roubo de carga e contratação de frota irregular.',
      gain: 'Auditoria Preditiva. Só contrate quem tem o "Selo HLX". Monitoramento de Carga e Passageiros (Monitriip 4.0).',
      steps: [
        { title: 'Passageiros (RhTec)', desc: 'Avalie motoristas por conforto e segurança (Safety Score).' },
        { title: 'Validação em Lote', desc: 'Checagem instantânea de RNTRC, Seguros e ANTT de terceiros.' },
        { title: 'Frota Própria', desc: 'Proteja o valor da sua marca com motoristas treinados e auditados.' }
      ]
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen w-full overflow-x-hidden">
      
      {/* HERO: O ECOSSISTEMA TOTAL */}
      <div className="relative py-24 overflow-hidden z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-hlx-gold/10 border border-hlx-gold/30 text-hlx-gold text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in-up">
             <Star size={14} /> Bem-vindo ao Futuro do Transporte
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Não é só um Sistema.<br/>
            É o seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-hlx-gold to-orange-500">Quartel General Tecnológico.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            A única plataforma global que integra <strong>Carga, Passageiros e Compliance</strong> sob os 5 pilares da tecnologia moderna.
          </p>
          
          {/* OS 5 PILARES (BADGES) */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up delay-200">
             <span className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-sm flex items-center gap-2"><Smartphone size={16}/> GovTech</span>
             <span className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-sm flex items-center gap-2"><Globe size={16}/> EduTech</span>
             <span className="px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-sm flex items-center gap-2"><BrainCircuit size={16}/> GesTech</span>
             <span className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-sm flex items-center gap-2"><Gavel size={16}/> JusTech</span>
             <span className="px-4 py-2 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 font-bold text-sm flex items-center gap-2"><HeartHandshake size={16}/> RhTec</span>
          </div>
        </div>
      </div>

      {/* DETALHAMENTO DOS PILARES + DIFERENCIAIS ÚNICOS */}
      <div className="py-20 bg-slate-900 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Tecnologia que Blinda seu Patrimônio</h2>
            <p className="text-gray-400 mt-2">Funcionalidades exclusivas desenvolvidas pelo Maior Player de Soluções do Mercado.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. GESTECH: SASSMAQ REAL TIME */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all group relative overflow-hidden z-0">
               <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10">EXCLUSIVO</div>
               <div className="mb-6 bg-purple-500/10 w-14 h-14 rounded-xl flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform relative z-10">
                 <ScanFace size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-3 relative z-10">GesTech: SASSMAQ Nexus 360°</h3>
               <p className="text-gray-400 text-sm mb-4 leading-relaxed relative z-10">
                 Auditoria em Tempo Real. Esqueça a "foto" da auditoria anual. Nossa IA embarcada monitora seu <strong>Pátio 360°</strong> 24h/dia usando Visão Computacional.
               </p>
               <ul className="space-y-2 text-sm text-gray-300 relative z-10">
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-purple-500"/> Detecção de EPIs e Vazamentos</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-purple-500"/> Apontamento de Não Conformidades</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-purple-500"/> Plano de Melhoria Automático (ISO 9000)</li>
               </ul>
            </div>

            {/* 2. JUSTECH: CONTRA-INTELIGÊNCIA */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-red-500/20 hover:border-red-500/50 transition-all group relative z-0">
               <div className="mb-6 bg-red-500/10 w-14 h-14 rounded-xl flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                 <EyeOff size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">JusTech: Contra-Inteligência</h3>
               <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                 O Governo usa IA para cruzar o encerramento do seu MDF-e com pedágios e jornada. Nós usamos IA para auditar isso <strong>ANTES</strong> deles.
               </p>
               <ul className="space-y-2 text-sm text-gray-300">
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-red-500"/> Auditoria Espelho (MDF-e vs Pedágio)</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-red-500"/> Bloqueio de Encerramento com Erro</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-red-500"/> Defesa Automática para Multas de Balcão</li>
               </ul>
            </div>

            {/* 3. EDUTECH: CAPACIDADE PERSONALIZADA */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all group relative z-0">
               <div className="mb-6 bg-blue-500/10 w-14 h-14 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                 <BrainCircuit size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">EduTech: Academia Inteligente</h3>
               <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                 Capacidade Profissional moldada ao seu interesse em tempo real. A IA cria o curso que você ou sua empresa precisam na hora.
               </p>
               <ul className="space-y-2 text-sm text-gray-300">
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500"/> Foco Pessoal (Plano de Carreira)</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500"/> Foco Empresarial (Plano de Negócio)</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500"/> Certificação Válida e Integrada</li>
               </ul>
            </div>

            {/* 4. GOVTECH: IDT (FAÇA VOCÊ MESMO) */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-green-500/20 hover:border-green-500/50 transition-all group relative z-0">
               <div className="mb-6 bg-green-500/10 w-14 h-14 rounded-xl flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                 <Smartphone size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">GovTech: Tecnologia IDT</h3>
               <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                 "Do It Yourself" (Faça Você Mesmo). Conecte-se direto aos sistemas governamentais e elimine a ineficiência.
               </p>
               <ul className="space-y-2 text-sm text-gray-300">
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Emissão de RNTRC em segundos</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Integração com Gov.br</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-green-500"/> Soberania dos seus dados</li>
               </ul>
            </div>

            {/* 5. MARKETING PLACE (CLUBE) */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/50 transition-all group relative z-0">
               <div className="flex justify-between items-start">
                 <div className="mb-6 bg-orange-500/10 w-14 h-14 rounded-xl flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                   <Megaphone size={32} />
                 </div>
                 <div className="bg-hlx-gold text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Clube de Vantagens</div>
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Marketing Place & Parcerias</h3>
               <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                 Nossa rede conecta você aos melhores fornecedores. Despachantes, Contadores, Advogados e Sistemas parceiros, tudo em um só lugar.
               </p>
               <div className="grid grid-cols-2 gap-4">
                 <ul className="space-y-2 text-sm text-gray-300">
                   <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-orange-500"/> Pneus e Peças</li>
                   <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-orange-500"/> Seguro de Carga</li>
                 </ul>
                 <ul className="space-y-2 text-sm text-gray-300">
                   <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-orange-500"/> Rede Credenciada</li>
                   <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-orange-500"/> Cashback em Diesel</li>
                 </ul>
               </div>
            </div>

            {/* 6. RHTEC (GENTE & GESTÃO) - NOVO CARD */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-pink-500/20 hover:border-pink-500/50 transition-all group relative z-0">
               <div className="mb-6 bg-pink-500/10 w-14 h-14 rounded-xl flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                 <HeartHandshake size={32} />
               </div>
               <h3 className="text-xl font-bold text-white mb-3">RhTec: Gente & Gestão</h3>
               <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                 A tecnologia a serviço do capital humano. Transformamos a gestão de motoristas em ciência exata, com foco em retenção e saúde.
               </p>
               <ul className="space-y-2 text-sm text-gray-300">
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-pink-500"/> Gamificação e Premiação</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-pink-500"/> Neuro-Safety (Fadiga)</li>
                 <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-pink-500"/> <strong>Carga, Pax e Frota Própria</strong></li>
               </ul>
            </div>

          </div>
        </div>
      </div>

      {/* SEÇÃO HUMANIZADA: CALOR HUMANO + COMUNIDADE */}
      <div className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-white/5 relative overflow-hidden z-0">
        {/* ... (Conteúdo humanizado mantido igual) ... */}
        {/* Warm glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6">
                    <Heart size={16} className="fill-orange-400" /> O Lado Humano do Transporte
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                    Temos muita IA, mas sobra <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Calor Humano.</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                    A tecnologia resolve a burocracia para que sobre tempo para o que realmente importa: a família e a estrada.
                    Conheça nossos espaços de acolhimento e voz ativa.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* ... Cards Humanizados (Mantidos) ... */}
                {/* 1. Cantinho da Mulher */}
                <div className="bg-slate-800/80 border border-pink-500/20 rounded-2xl p-8 hover:border-pink-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Flower2 size={120} className="text-pink-500" />
                    </div>
                    <div className="w-14 h-14 bg-pink-500/20 rounded-full flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
                        <Heart size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Cantinho da Mulher</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        Um espaço seguro e dedicado às mulheres do transporte. 
                        Capacitação especializada, rede de apoio e mentoria de carreira.
                    </p>
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-2">
                        <ArrowRight size={14} /> Junte-se ao Grupo
                    </span>
                </div>

                {/* 2. Lei da Prosperidade */}
                <div className="bg-slate-800/80 border border-amber-500/20 rounded-2xl p-8 hover:border-amber-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Radio size={120} className="text-amber-500" />
                    </div>
                    <div className="w-14 h-14 bg-amber-500/20 rounded-full flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform">
                        <Newspaper size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Lei da Prosperidade</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        Conteúdo focado em mindset, gestão financeira familiar e crescimento pessoal. 
                        Porque o transporte também precisa de inteligência emocional.
                    </p>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                        <ArrowRight size={14} /> Ler Artigos
                    </span>
                </div>

                {/* 3. A Fala das Estradas */}
                <div className="bg-slate-800/80 border border-green-500/20 rounded-2xl p-8 hover:border-green-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Mic size={120} className="text-green-500" />
                    </div>
                    <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
                        <Coffee size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">A Fala das Estradas</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        Histórias de vida, "causos" da rodagem e o fórum oficial da Comunidade Helonex. 
                        Aqui sua opinião molda o futuro da plataforma.
                    </p>
                    <span className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-2">
                        <ArrowRight size={14} /> Entrar na Roda
                    </span>
                </div>
            </div>
        </div>
      </div>

      {/* ABRANGÊNCIA TOTAL & CONFORMIDADE TOTAL */}
      <div className="py-20 bg-slate-950 z-10 relative">
        {/* ... (Resto do conteúdo mantido, apenas JusTech acima foi alterado) ... */}
        <div className="max-w-7xl mx-auto px-4">
           <div className="bg-gradient-to-r from-hlx-blue/20 to-slate-900 rounded-3xl border border-hlx-blue/30 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <Target size={250} />
              </div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    Gama Completa: <span className="text-hlx-blue">Conformidade Total</span>
                  </h2>
                  <p className="text-gray-300 mb-6 text-lg">
                    Nossa tecnologia não escolhe nicho. Atendemos com a mesma excelência a logística de carga pesada e o transporte sensível de passageiros.
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                      <div className="bg-hlx-gold/20 p-3 rounded-full text-hlx-gold"><Truck size={24}/></div>
                      <div>
                        <h4 className="text-white font-bold">Carga & Logística</h4>
                        <p className="text-xs text-gray-400">RNTRC, CIOT, MOPP, AET e Mercosul.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                      <div className="bg-blue-500/20 p-3 rounded-full text-blue-400"><Bus size={24}/></div>
                      <div>
                        <h4 className="text-white font-bold">Passageiros & Turismo</h4>
                        <p className="text-xs text-gray-400">ANTT (TRIIP), ARTESP, CADASTUR e Fretamento.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center md:text-right">
                   <div className="inline-block bg-slate-900 p-6 rounded-2xl border border-hlx-gold/50 shadow-2xl">
                      <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-2">Mentor IA 24/7</p>
                      <h4 className="text-4xl font-display font-bold text-white mb-2">Sempre Alerta</h4>
                      <p className="text-sm text-gray-400 max-w-xs mx-auto">
                        Verificado e Reverificado. Sistema Erro Zero que garante a máxima exatidão nas suas decisões.
                      </p>
                      <div className="mt-4 flex justify-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold text-green-500">Sistema Operante</span>
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* ... (Resto do arquivo mantido) ... */}
      {/* TRILHAS DE SUCESSO (POR PERFIL) */}
      <div className="py-20 max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Qual a sua Missão?</h2>
          <p className="text-gray-400 mt-2">Personalizamos a tecnologia para o seu tamanho.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {(Object.keys(profiles) as ProfileTab[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveProfile(key)}
              className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
                activeProfile === key 
                  ? 'bg-hlx-blue text-white shadow-lg shadow-blue-500/30 scale-105' 
                  : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
              }`}
            >
              {profiles[key].icon} {profiles[key].label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in-up">
           <div className="grid md:grid-cols-2 gap-12">
             <div>
               <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                 {profiles[activeProfile].headline}
               </h3>
               <div className="mb-6 p-4 bg-red-900/10 border-l-4 border-red-500 rounded-r-lg">
                 <p className="text-red-300 text-sm italic">"{profiles[activeProfile].pain}"</p>
               </div>
               <div className="mb-8 p-4 bg-green-900/10 border-l-4 border-green-500 rounded-r-lg">
                 <p className="text-green-300 text-sm font-bold">{profiles[activeProfile].gain}</p>
               </div>
               <button onClick={onNavigateToPlans} className="text-hlx-gold font-bold flex items-center gap-2 hover:gap-3 transition-all group">
                 Ver Planos para {profiles[activeProfile].label} <ArrowRight size={20} />
               </button>
             </div>

             <div className="space-y-6">
               {profiles[activeProfile].steps.map((step, idx) => (
                 <div key={idx} className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-white flex-shrink-0">
                     {idx + 1}
                   </div>
                   <div>
                     <h4 className="text-white font-bold text-lg">{step.title}</h4>
                     <p className="text-gray-400 text-sm">{step.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>

      {/* ROI & CTA FINAL */}
      <div className="py-16 bg-gradient-to-t from-hlx-blue/20 to-slate-950 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">A Matemática do Retorno 💰</h3>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 bg-slate-800 p-6 rounded-xl border border-green-500/20">
              <div className="bg-green-500/20 p-4 rounded-full text-green-400"><DollarSign size={32} /></div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">1 Pneu no Clube de Compras</p>
                <p className="text-sm text-gray-400">Economia média de R$ 300,00.</p>
                <p className="text-green-400 font-bold mt-1">= Paga 1 Ano de Assinatura</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-800 p-6 rounded-xl border border-red-500/20">
              <div className="bg-red-500/20 p-4 rounded-full text-red-400"><ShieldCheck size={32} /></div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">1 Multa Evitada (JusTech)</p>
                <p className="text-sm text-gray-400">Multa média ambiental: R$ 5.000,00.</p>
                <p className="text-green-400 font-bold mt-1">= Paga 15 Anos de Sistema</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={onNavigateToLogin}
              className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors border border-white/10 flex items-center justify-center gap-2"
            >
              <Lock size={18} /> Área de Membros
            </button>
            <button 
              onClick={onNavigateToPlans}
              className="px-10 py-4 bg-hlx-gold text-slate-900 font-bold rounded-xl hover:bg-yellow-400 shadow-xl shadow-yellow-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Briefcase size={20} />
              Quero Fazer Parte da Família HLX
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SolutionShowcase;
