
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import AcademySection from './components/AcademySection';
import Base44Dashboard from './components/Base44Dashboard';
import CommunitySection from './components/CommunitySection';
import MentorChat from './components/MentorChat';
import ServiceDetail from './components/ServiceDetail';
import StateLicensingMap from './components/StateLicensingMap';
import InternationalMap from './components/InternationalMap';
import CoursePlayer from './components/CoursePlayer';
import SalesFunnel from './components/SalesFunnel';
import UnderConstruction from './components/UnderConstruction';
import PhilosophySection from './components/PhilosophySection';
import Footer from './components/Footer';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import OnboardingForm from './components/OnboardingForm';
import AdminPanel from './components/admin/AdminPanel';
import ClientDashboard from './components/ClientDashboard';
import ShipperPanel from './components/ShipperPanel'; 
import PrivacyCenter from './components/PrivacyCenter'; 
import MarketplaceTeaser from './components/MarketplaceTeaser';
import Breadcrumbs from './components/Breadcrumbs'; 
import SolutionShowcase from './components/SolutionShowcase';
import ResolveShowcase from './components/ResolveShowcase';
import NewsBoard from './components/NewsBoard';
import SassmaqSection from './components/SassmaqSection';
import AboutSection from './components/AboutSection';
import StrategicRoadmap from './components/StrategicRoadmap';
import SuccessRoute from './components/SuccessRoute';
import FreightCalculator from './components/FreightCalculator';
import ManifestoView from './components/ManifestoView'; 
import HelonexResolve from './components/HelonexResolve';
import ImplementationDossier from './components/ImplementationDossier';
import ZmrcCatalog from './components/ZmrcCatalog';
import ZmrcManager from './components/ZmrcManager';
import GovTech from './components/GovTech';
import JusTech from './components/JusTech';
import EduTech from './components/EduTech';
import GesTech from './components/GesTech';
import HelonexVision from './components/HelonexVision';
import { FinanceManager } from './components/FinanceManager';
import { Section, UserRole, Language, GeneratedCourse, UserContext } from './types';
import { Crown, Terminal } from 'lucide-react';
import { supabase } from './src/lib/supabase';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedModalityId, setSelectedModalityId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('pt');
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const [userContext, setUserContext] = useState<UserContext | null>(null);
  const [currentCourse, setCurrentCourse] = useState<GeneratedCourse | null>(null);
  const [navStats, setNavStats] = useState({ academy: 0, services: 0 });

  useEffect(() => {
    // Verificar sessão ativa do Supabase
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUserRole('subscriber'); // Ou lógica para definir role baseada no usuário
          
          // Verifica o status na tabela perfis_usuarios
          const { data: profile } = await supabase
            .from('perfis_usuarios')
            .select('status_cadastro')
            .eq('id', session.user.id)
            .single();

          if (!profile || profile.status_cadastro !== 'COMPLETO') {
            setNeedsOnboarding(true);
          } else {
            setNeedsOnboarding(false);
          }
        } else {
          setUserRole('visitor');
          setNeedsOnboarding(false);
        }
      } catch (error) {
        console.error("Erro ao verificar sessão Supabase:", error);
        setUserRole('visitor');
        setNeedsOnboarding(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (session) {
          setUserRole('subscriber');
          
          // Verifica o status na tabela perfis_usuarios
          const { data: profile } = await supabase
            .from('perfis_usuarios')
            .select('status_cadastro')
            .eq('id', session.user.id)
            .single();

          if (!profile || profile.status_cadastro !== 'COMPLETO') {
            setNeedsOnboarding(true);
          } else {
            setNeedsOnboarding(false);
          }
        } else {
          setUserRole('visitor');
          setNeedsOnboarding(false);
        }
      } catch (error) {
        console.error("Erro no onAuthStateChange Supabase:", error);
      }
    });

    const savedContext = localStorage.getItem('helonex_user_context');
    if (savedContext) {
        try {
            setUserContext(JSON.parse(savedContext));
        } catch(e) { console.error("Contexto inválido"); }
    }
    
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => {
      clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, []);

  // PROTEÇÃO DE ROTAS (Route Guard)
  useEffect(() => {
    const protectedSections = [
      Section.GOV_TECH,
      Section.JUS_TECH,
      Section.GES_TECH,
      Section.EDU_TECH,
      Section.ACADEMY,
      Section.MENTOR,
      Section.CLIENT_PANEL,
      Section.SHIPPER_PANEL,
      Section.ADMIN_PANEL,
      Section.DASHBOARD
    ];

    if (protectedSections.includes(activeSection) && userRole === 'visitor') {
      // Se tentar acessar rota protegida sem estar logado, redireciona para login
      setActiveSection(Section.LOGIN);
    } else if (userRole !== 'visitor' && needsOnboarding && activeSection !== Section.ONBOARDING) {
      // Se estiver logado mas precisar de onboarding, força o redirecionamento
      setActiveSection(Section.ONBOARDING);
    }
  }, [activeSection, userRole, needsOnboarding]);

  const handleUpdateContext = (context: UserContext) => {
      setUserContext(context);
      localStorage.setItem('helonex_user_context', JSON.stringify(context));
  };

  const trackNavigationBehavior = (section: Section) => {
    let newStats = { ...navStats };
    if (section === Section.ACADEMY) newStats.academy += 1;
    else if (section === Section.SERVICES) newStats.services += 1;
    setNavStats(newStats);

    if ((newStats.academy + newStats.services) >= 3) {
      if (userContext && userContext.goal !== 'LEARN') {
        const refinedContext: UserContext = { ...userContext, goal: 'LEARN' };
        handleUpdateContext(refinedContext);
      }
    }
  };

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    trackNavigationBehavior(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (id: string) => {
    if (id === 'state-auth') { handleNavigate(Section.GOV_TECH); return; }
    if (id === 'rntrc-tac') { handleNavigate(Section.GOV_TECH); return; }
    if (id === 'passengers-charter') { handleNavigate(Section.GOV_TECH); return; }
    
    if (id === 'helonex-resolve') { handleNavigate(Section.JUS_TECH); return; } 
    if (id === 'fines') { handleNavigate(Section.JUS_TECH); return; }
    if (id === 'insurance') { handleNavigate(Section.JUS_TECH); return; }

    if (id === 'idt-tech') { handleNavigate(Section.EDU_TECH); return; }
    if (id === 'mentor-ia') { handleNavigate(Section.EDU_TECH); return; }
    if (id === 'helonex-vision') { handleNavigate(Section.HELONEX_VISION); return; }

    if (id === 'rntrc-etc') { handleNavigate(Section.GES_TECH); return; }

    if (id === 'zmrc-sp') { handleNavigate(Section.ZMRC_CATALOG); return; }
    if (id) { setSelectedServiceId(id); handleNavigate(Section.SERVICE_DETAIL); return; }
    handleNavigate(Section.UNDER_CONSTRUCTION);
  };
  
  const handleNavigateToService = (id: string) => {
    setSelectedServiceId(id);
    handleNavigate(Section.SERVICE_DETAIL);
  };

  const handleModalitySelect = (modalityId: string) => {
      setSelectedModalityId(modalityId);
      // Redireciona para o auditor com a modalidade selecionada
      handleNavigate(Section.DASHBOARD); // Usando DASHBOARD temporariamente como contêiner do Auditor
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (needsOnboarding) {
      handleNavigate(Section.ONBOARDING);
      return;
    }
    if (role === 'admin') handleNavigate(Section.ADMIN_PANEL);
    else if (role === 'subscriber' || role === 'partner') handleNavigate(Section.CLIENT_PANEL);
    else if (role === 'shipper') handleNavigate(Section.SHIPPER_PANEL);
    else handleNavigate(Section.HOME);
  };

  const handleLogout = () => { setUserRole('visitor'); handleNavigate(Section.HOME); };

  const handleStartCourse = (courseData?: GeneratedCourse) => {
      if (courseData) setCurrentCourse(courseData);
      else setCurrentCourse(null);
      handleNavigate(Section.COURSE_PLAYER);
  };

  if (!isReady) return null;

  const renderSection = () => {
    switch (activeSection) {
      case Section.MANIFESTO: return <ManifestoView onStart={() => handleNavigate(Section.HOME)} />;
      case Section.HELONEX_RESOLVE: return <HelonexResolve />;
      case Section.DOSSIER: return <ImplementationDossier />;
      case Section.ZMRC_CATALOG: return <ZmrcCatalog onSelectModality={(id) => { setSelectedModalityId(id); handleNavigate(Section.DASHBOARD); }} />;
      case Section.LOGIN: return <LoginScreen onLogin={handleLogin} onBack={() => handleNavigate(Section.HOME)} onNavigateToRegister={() => handleNavigate(Section.REGISTER)} />;
      case Section.REGISTER: return <RegisterScreen onRegister={() => handleLogin('subscriber')} onNavigateToLogin={() => handleNavigate(Section.LOGIN)} onBack={() => handleNavigate(Section.HOME)} />;
      case Section.ONBOARDING: return <OnboardingForm onComplete={() => { setNeedsOnboarding(false); handleNavigate(Section.CLIENT_PANEL); }} />;
      case Section.ADMIN_PANEL: return <AdminPanel onLogout={handleLogout} />;
      case Section.CLIENT_PANEL: return <ClientDashboard onNavigateToSuccess={() => handleNavigate(Section.SUCCESS_ROUTE)} />;
      case Section.SHIPPER_PANEL: return <ShipperPanel />;
      case Section.FREIGHT_CALCULATOR: return <FreightCalculator onBack={() => handleNavigate(Section.CLIENT_PANEL)} />;
      case Section.COURSE_PLAYER: return <CoursePlayer onBack={() => handleNavigate(Section.INTERNATIONAL_MAP)} customCourse={currentCourse} />;
      case Section.NEWS_BOARD: return <NewsBoard onBack={() => handleNavigate(Section.HOME)} />;
      case Section.ABOUT: return <AboutSection />;
      case Section.STRATEGIC_ROADMAP: return <StrategicRoadmap onCtaClick={() => handleNavigate(Section.LOGIN)} onBack={() => handleNavigate(Section.HOME)} />;
      case Section.SUCCESS_ROUTE: return <SuccessRoute onBack={() => handleNavigate(Section.CLIENT_PANEL)} />;
      case Section.SOLUTION_SHOWCASE: return <SolutionShowcase onNavigateToLogin={() => handleNavigate(Section.LOGIN)} onNavigateToPlans={() => handleNavigate(Section.OPPORTUNITY)} />;
      case Section.SERVICE_DETAIL: return <ServiceDetail serviceId={selectedServiceId || ''} onBack={() => handleNavigate(Section.SERVICES)} onConsultMentor={() => handleNavigate(Section.MENTOR)} onNavigateToMap={() => handleNavigate(Section.INTERNATIONAL_MAP)} onUpdateContext={handleUpdateContext} userContext={userContext} />;
      case Section.STATE_LICENSING: return <StateLicensingMap onBack={() => handleNavigate(Section.SERVICES)} onConsultMentor={() => handleNavigate(Section.MENTOR)} />;
      case Section.INTERNATIONAL_MAP: return <InternationalMap onBack={() => handleNavigate(Section.SERVICE_DETAIL)} onConsultMentor={() => handleNavigate(Section.MENTOR)} onStartCourse={handleStartCourse} language={language} />;
      case Section.OPPORTUNITY: return <SalesFunnel onBuyAccess={() => handleNavigate(Section.LOGIN)} onBack={() => handleNavigate(Section.HOME)} />;
      case Section.UNDER_CONSTRUCTION: return <UnderConstruction onBack={() => handleNavigate(Section.HOME)} />;
      case Section.DASHBOARD: return <div className="p-8 bg-slate-950"><ZmrcManager initialModalityId={selectedModalityId || 'VUC'} /></div>;
      case Section.GOV_TECH: return <GovTech onBack={() => handleNavigate(Section.HOME)} />;
      case Section.JUS_TECH: return <JusTech onBack={() => handleNavigate(Section.HOME)} />;
      case Section.EDU_TECH: return <EduTech onBack={() => handleNavigate(Section.HOME)} />;
      case Section.ACADEMY: return <EduTech onBack={() => handleNavigate(Section.HOME)} initialModule="ACADEMY" />;
      case Section.MENTOR: return <EduTech onBack={() => handleNavigate(Section.HOME)} initialModule="MENTOR" />;
      case Section.GES_TECH: return <GesTech onBack={() => handleNavigate(Section.HOME)} />;
      case Section.HELONEX_VISION: return <HelonexVision onBack={() => handleNavigate(Section.HOME)} />;
      case Section.FINANCE_MANAGER: return <FinanceManager />;
      default: return (
        <>
          <Hero 
            onCtaClick={() => handleNavigate(Section.MANIFESTO)} 
            onNavigateToNews={() => handleNavigate(Section.NEWS_BOARD)} 
            onNavigateToRoadmap={() => handleNavigate(Section.STRATEGIC_ROADMAP)} 
            language={language}
            userContext={userContext} 
            onUpdateContext={handleUpdateContext}
          />
          <ServicesGrid onServiceSelect={handleServiceSelect} userContext={userContext} />
          <SolutionShowcase onNavigateToLogin={() => handleNavigate(Section.LOGIN)} onNavigateToPlans={() => handleNavigate(Section.OPPORTUNITY)} />
          <ResolveShowcase /> 
          {(!userContext || userContext.macro === 'CARGO') && <SassmaqSection />} 
          <AcademySection onNavigateToMap={() => handleNavigate(Section.INTERNATIONAL_MAP)} />
          <MarketplaceTeaser onNavigateToStore={() => handleNavigate(Section.OPPORTUNITY)} />
          <Base44Dashboard userContext={userContext} />
          <CommunitySection onNavigate={handleNavigate} />
          <MentorChat />
          <PhilosophySection />
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-hlx-navy flex flex-col font-sans text-slate-50 w-full overflow-x-hidden relative">
      <Header 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
        isLoggedIn={userRole !== 'visitor'} 
        onLogout={handleLogout} 
        language={language} 
        setLanguage={setLanguage}
        onNavigateToService={handleNavigateToService}
        userContext={userContext}
      />
      {![Section.HOME, Section.MANIFESTO, Section.LOGIN, Section.REGISTER, Section.ONBOARDING, Section.HELONEX_RESOLVE, Section.DOSSIER].includes(activeSection) && <Breadcrumbs activeSection={activeSection} onNavigate={handleNavigate} />}
      <main className="flex-grow">{renderSection()}</main>
      
      {/* BOTÃO FLUTUANTE PARA O DOSSIÊ (DEBUG/AUDIT) */}
      <div className="fixed bottom-24 right-6 z-40 hidden md:block">
          <button 
            onClick={() => handleNavigate(Section.DOSSIER)}
            className="p-4 bg-slate-900 border border-hlx-gold rounded-full text-hlx-gold shadow-2xl hover:bg-hlx-gold hover:text-slate-950 transition-all group"
            title="Dossiê Técnico"
          >
            <Terminal size={24} />
            <span className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Auditoria do Projeto
            </span>
          </button>
      </div>

      <Footer onOpenPrivacy={() => setShowPrivacyModal(true)} onNavigate={handleNavigate} />
      {showPrivacyModal && <PrivacyCenter onClose={() => setShowPrivacyModal(false)} />}

      {userRole === 'visitor' && activeSection !== Section.OPPORTUNITY && activeSection !== Section.LOGIN && activeSection !== Section.ONBOARDING && activeSection !== Section.MANIFESTO && (
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 animate-slide-up">
          <button 
            onClick={() => handleNavigate(Section.OPPORTUNITY)}
            className="w-full bg-gradient-to-r from-hlx-gold to-orange-500 text-slate-900 font-black py-4 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] border-2 border-white/20 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
          >
            <Crown size={20} className="fill-slate-900" />
            SEJA ASSINANTE
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
