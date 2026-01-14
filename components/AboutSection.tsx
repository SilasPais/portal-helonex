
import React from 'react';
import { ShieldCheck, Truck, Cpu, Anchor, ArrowRight, Hammer, Scale, Heart, Lightbulb, TrendingUp } from 'lucide-react';

const AboutSection: React.FC = () => {
  const pillars = [
    {
      term: "AVODÁ",
      translation: "Serviço",
      description: "Excelência na entrega. O trabalho é um serviço sagrado à comunidade.",
      icon: <Hammer className="text-hlx-gold" />
    },
    {
      term: "YOSHER",
      translation: "Integridade",
      description: "Transparência total. Sem letras miúdas, sem atalhos perigosos.",
      icon: <Scale className="text-blue-400" />
    },
    {
      term: "TZEDAKÁ",
      translation: "Justiça",
      description: "Relações equilibradas. Cuidamos de quem investe suas últimas reservas.",
      icon: <Heart className="text-red-400" />
    },
    {
      term: "CHOCHMÁ",
      translation: "Sabedoria",
      description: "Estratégia inteligente contra a burocracia. Uso de IA para superar barreiras.",
      icon: <Lightbulb className="text-yellow-400" />
    },
    {
      term: "PRUDÊNCIA",
      translation: "Gestão",
      description: "Segurança preditiva como o maior lucro. Conceito Erro Zero.",
      icon: <ShieldCheck className="text-green-400" />
    }
  ];

  const maturityLevels = [
    { level: 0, title: "Gênese", desc: "Informalidade. Risco Total." },
    { level: 1, title: "Legalizado", desc: "RNTRC Ativo. Sem gestão." },
    { level: 2, title: "Eficiente", desc: "Controle de Custos." },
    { level: 3, title: "Qualificado", desc: "Processos (SASSMAQ/ISO)." },
    { level: 4, title: "Consolidado", desc: "Internacional/Contratos Fixos." },
    { level: 5, title: "Diamante", desc: "Automação Total, ESG & Lucro." }
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      
      {/* HERO MANIFESTO */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-hlx-gold/10 border border-hlx-gold/30 text-hlx-gold text-xs font-bold tracking-widest uppercase mb-6">
             <ShieldCheck size={16} /> Manifesto Helonex
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
            A Identidade da <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hlx-gold to-orange-500">Nova Geração do Transporte.</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed font-light">
            Ser Helonex não é apenas contratar um software; é adotar uma identidade de excelência operacional. 
            No cenário de 2026, operamos sob o <strong>Conceito Erro Zero</strong>.
          </p>
        </div>
      </div>

      {/* DNA & IDENTIDADE */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold mb-6 text-white">
              Quem Somos: <br/>
              <span className="text-hlx-blue">Inteligência Logística All-in-One</span>
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Somos a primeira plataforma do mundo que não se limita a gerenciar processos, mas valida e transforma carreiras empresariais.
              Sob a liderança estratégica de <strong>Silas Pais</strong> (Economista e Especialista em Gestão), construímos um ambiente onde a tecnologia de ponta serve à vida e ao lucro sustentável.
            </p>
            <div className="p-6 bg-slate-900 rounded-xl border-l-4 border-hlx-gold">
              <p className="text-white italic text-lg">
                "Nós não vendemos licenças, cuidamos de vidas."
              </p>
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="bg-slate-800 p-6 rounded-xl border border-white/5 hover:border-hlx-gold/30 transition-all group">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-red-500/20 rounded-lg text-red-400"><Scale size={24}/></div>
                <h3 className="font-bold text-white text-lg">1. JusTech (Conformidade Antecipada)</h3>
              </div>
              <p className="text-sm text-gray-400 pl-[4.5rem]">
                Dominamos a Lei 14.599 e a IN 41/2025. Enquanto o mercado reage a multas, o membro Helonex usa inteligência preditiva para mitigar riscos.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-white/5 hover:border-hlx-gold/30 transition-all group">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400"><Cpu size={24}/></div>
                <h3 className="font-bold text-white text-lg">2. Visão Sistêmica (GovTech)</h3>
              </div>
              <p className="text-sm text-gray-400 pl-[4.5rem]">
                Integramos diretamente com órgãos reguladores (ANTT, SEFAZ). Transformamos centros de custo em centros de lucro com precisão cirúrgica.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-white/5 hover:border-hlx-gold/30 transition-all group">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400"><Anchor size={24}/></div>
                <h3 className="font-bold text-white text-lg">3. Selo de Qualidade (Confiança)</h3>
              </div>
              <p className="text-sm text-gray-400 pl-[4.5rem]">
                Portar o Selo Helonex é exibir uma certificação de maturidade. Mitigamos a responsabilidade solidária do embarcador e garantimos segurança no transporte de passageiros.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CÓDIGO DA PROSPERIDADE (PILARES) */}
      <div className="bg-slate-900 py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">O Código da Prosperidade</h2>
            <p className="text-gray-400">Nossa Base Ética Ancestral</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="bg-slate-950 p-6 rounded-xl border border-white/5 hover:border-hlx-gold/20 transition-all text-center group hover:-translate-y-1">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">{pillar.icon}</div>
                <h3 className="text-xl font-display font-bold text-white mb-1">{pillar.term}</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{pillar.translation}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RÉGUA DE MATURIDADE */}
      <div className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <TrendingUp className="text-green-400" /> A Régua de Maturidade Helonex
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Não aceitamos o amadorismo. Nosso ecossistema impulsiona o transportador do zero à excelência exponencial.
          </p>
        </div>

        <div className="relative">
          {/* Linha Conectora Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-slate-800 via-hlx-gold to-slate-800 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
            {maturityLevels.map((lvl, idx) => (
              <div key={idx} className="bg-slate-900 border border-white/10 p-4 rounded-xl flex flex-col items-center text-center hover:border-hlx-gold transition-colors group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-3 border-4 ${
                  lvl.level === 5 ? 'bg-hlx-gold text-slate-900 border-hlx-gold shadow-[0_0_20px_#f59e0b]' : 
                  'bg-slate-800 text-white border-slate-950 group-hover:border-hlx-gold'
                }`}>
                  {lvl.level}
                </div>
                <h4 className={`font-bold text-sm mb-1 ${lvl.level === 5 ? 'text-hlx-gold' : 'text-white'}`}>{lvl.title}</h4>
                <p className="text-xs text-gray-500">{lvl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="py-20 bg-gradient-to-t from-hlx-blue/20 to-slate-950 text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-6">Pronto para evoluir de nível?</h2>
        <button className="bg-hlx-gold text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 flex items-center gap-2 mx-auto transition-transform hover:-translate-y-1">
          QUERO SER HELONEX <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
};

export default AboutSection;
