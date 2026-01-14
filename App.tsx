
import React, { useState } from 'react';
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
import AdminPanel from './components/AdminPanel';
import ClientDashboard from './components/ClientDashboard';
import ShipperPanel from './components/ShipperPanel'; 
import PrivacyCenter from './components/PrivacyCenter'; 
import MarketplaceTeaser from './components/MarketplaceTeaser';
import Breadcrumbs from './components/Breadcrumbs'; 
import SolutionShowcase from './components/SolutionShowcase';
import NewsBoard from './components/NewsBoard';
import SassmaqSection from './components/SassmaqSection';
import AboutSection from './components/AboutSection';
import StrategicRoadmap from './components/StrategicRoadmap';
import SuccessRoute from './components/SuccessRoute';
import { Section, UserRole, Language } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [constructionArea, setConstructionArea] = useState<string>('');
  
  const [dynamicCourse, setDynamicCourse] = useState<any | null>(null);
  const [language, setLanguage] = useState<Language>('pt');
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleServiceSelect = (id: string) => {
    if (id === 'passengers') {
      setActiveSection(Section.STATE_LICENSING);
      return;
    }
    if (id === 'tric') {
       setSelectedServiceId(id);
       setActiveSection(Section.SERVICE_DETAIL);
       return;
    }
    if (id) {
      setSelectedServiceId(id);
      setActiveSection(Section.SERVICE_DETAIL);
      return;
    }
    setConstructionArea('Detalhes deste Serviço');
    setActiveSection(Section.UNDER_CONSTRUCTION);
  };

  const handleNavigateToConstruction = (area: string) => {
    setConstructionArea(area);
    setActiveSection(Section.UNDER_CONSTRUCTION);
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'admin') {
      setActiveSection(Section.ADMIN_PANEL);
    } else if (role === 'subscriber' || role === 'partner') {
      setActiveSection(Section.CLIENT_PANEL);
    } else if (role === 'shipper') { // Rota para o Painel do Embarcador
      setActiveSection(Section.SHIPPER_PANEL);
    } else {
      setActiveSection(Section.HOME);
    }
  };

  const handleRegister = () => {
    // Simula o cadastro e loga como assinante por padrão (mock)
    // Em um app real, verificaríamos o perfil escolhido
    alert("Conta criada com sucesso! Bem-vindo ao HELONEX.");
    handleLogin('subscriber');
  };

  const handleLogout = () => {
    setUserRole('visitor');
    setActiveSection(Section.HOME);
  };

  const renderSection = () => {
    if (activeSection === Section.LOGIN) {
      return (
        <LoginScreen 
          onLogin={handleLogin} 
          onBack={() => setActiveSection(Section.HOME)} 
          onNavigateToRegister={() => setActiveSection(Section.REGISTER)}
        />
      );
    }

    if (activeSection === Section.REGISTER) {
      return (
        <RegisterScreen
          onRegister={handleRegister}
          onNavigateToLogin={() => setActiveSection(Section.LOGIN)}
          onBack={() => setActiveSection(Section.HOME)}
        />
      );
    }

    if (activeSection === Section.ADMIN_PANEL) {
      if (userRole !== 'admin') return <LoginScreen onLogin={handleLogin} onBack={() => setActiveSection(Section.HOME)} />;
      return <AdminPanel onLogout={handleLogout} />;
    }

    if (activeSection === Section.CLIENT_PANEL) {
      if (userRole === 'visitor') return <LoginScreen onLogin={handleLogin} onBack={() => setActiveSection(Section.HOME)} />;
      return <ClientDashboard onNavigateToSuccess={() => setActiveSection(Section.SUCCESS_ROUTE)} />;
    }

    if (activeSection === Section.SHIPPER_PANEL) {
      return <ShipperPanel />;
    }

    if (activeSection === Section.COURSE_PLAYER) {
      return <CoursePlayer customCourse={dynamicCourse} onBack={() => setActiveSection(Section.INTERNATIONAL_MAP)} />;
    }

    if (activeSection === Section.NEWS_BOARD) {
        return <NewsBoard onBack={() => setActiveSection(Section.HOME)} />;
    }

    if (activeSection === Section.ABOUT) {
      return <AboutSection />;
    }

    if (activeSection === Section.STRATEGIC_ROADMAP) {
      return <StrategicRoadmap onCtaClick={() => setActiveSection(Section.LOGIN)} onBack={() => setActiveSection(Section.HOME)} />;
    }

    if (activeSection === Section.SUCCESS_ROUTE) {
      return <SuccessRoute onBack={() => setActiveSection(userRole !== 'visitor' ? Section.CLIENT_PANEL : Section.HOME)} />;
    }

    switch (activeSection) {
      case Section.HOME:
        return (
          <>
            <Hero 
              onCtaClick={() => setActiveSection(Section.SOLUTION_SHOWCASE)} 
              onNavigateToNews={() => setActiveSection(Section.NEWS_BOARD)}
              onNavigateToRoadmap={() => setActiveSection(Section.STRATEGIC_ROADMAP)}
              language={language} 
            />
            <ServicesGrid onServiceSelect={handleServiceSelect} />
            <SassmaqSection />
            <AcademySection onNavigateToMap={() => setActiveSection(Section.INTERNATIONAL_MAP)} />
            <MarketplaceTeaser onNavigateToStore={() => setActiveSection(Section.OPPORTUNITY)} />
            <Base44Dashboard />
            <CommunitySection onNavigate={setActiveSection} />
            <MentorChat />
            <PhilosophySection />
          </>
        );
      
      case Section.SOLUTION_SHOWCASE: 
        return (
          <SolutionShowcase 
            onNavigateToLogin={() => setActiveSection(Section.LOGIN)}
            onNavigateToPlans={() => setActiveSection(Section.OPPORTUNITY)}
          />
        );

      case Section.SERVICES:
        return <ServicesGrid onServiceSelect={handleServiceSelect} />;
      case Section.SERVICE_DETAIL:
        return (
          <ServiceDetail 
            serviceId={selectedServiceId || ''} 
            onBack={() => setActiveSection(Section.SERVICES)}
            onConsultMentor={() => setActiveSection(Section.MENTOR)}
            onNavigateToMap={() => setActiveSection(Section.INTERNATIONAL_MAP)}
          />
        );
      case Section.STATE_LICENSING:
        return (
          <StateLicensingMap 
            onBack={() => setActiveSection(Section.SERVICES)}
            onConsultMentor={() => setActiveSection(Section.MENTOR)}
          />
        );
      case Section.INTERNATIONAL_MAP:
        return (
          <InternationalMap
             onBack={() => {
               setSelectedServiceId('tric'); 
               setActiveSection(Section.SERVICE_DETAIL);
             }}
             onConsultMentor={() => setActiveSection(Section.MENTOR)}
             onStartCourse={(generatedCourse) => {
               if (generatedCourse) {
                 setDynamicCourse(generatedCourse);
               } else {
                 setDynamicCourse(null);
               }
               setActiveSection(Section.COURSE_PLAYER);
             }}
             language={language}
          />
        );
      case Section.ACADEMY:
        return <AcademySection onNavigateToMap={() => setActiveSection(Section.INTERNATIONAL_MAP)} />; 
      case Section.DASHBOARD:
        if (userRole !== 'visitor') {
           return <ClientDashboard onNavigateToSuccess={() => setActiveSection(Section.SUCCESS_ROUTE)} />;
        }
        return <Base44Dashboard />;
      case Section.MENTOR:
        return <MentorChat />;
      case Section.OPPORTUNITY:
        return (
          <SalesFunnel 
            onBuyAccess={() => {
              alert("Integração com Gateway de Pagamento. Redirecionando para Login.");
              setActiveSection(Section.LOGIN);
            }} 
            onBack={() => setActiveSection(Section.HOME)} 
          />
        );
      case Section.UNDER_CONSTRUCTION:
        return (
          <UnderConstruction 
            areaName={constructionArea} 
            onBack={() => setActiveSection(Section.HOME)} 
          />
        );
      default:
        return <Hero 
          onCtaClick={() => setActiveSection(Section.MENTOR)} 
          onNavigateToNews={() => setActiveSection(Section.NEWS_BOARD)} 
          onNavigateToRoadmap={() => setActiveSection(Section.STRATEGIC_ROADMAP)}
          language={language} 
        />;
    }
  };

  return (
    <div className="min-h-screen bg-hlx-navy flex flex-col font-sans text-slate-50 selection:bg-hlx-gold selection:text-slate-900 w-full overflow-x-hidden">
      <Header 
        activeSection={activeSection}
        onNavigate={setActiveSection}
        isLoggedIn={userRole !== 'visitor'}
        onLogout={handleLogout}
        language={language}
        setLanguage={setLanguage}
      />
      
      {activeSection !== Section.HOME && activeSection !== Section.LOGIN && activeSection !== Section.REGISTER && activeSection !== Section.STRATEGIC_ROADMAP && activeSection !== Section.SUCCESS_ROUTE && (
        <Breadcrumbs activeSection={activeSection} onNavigate={setActiveSection} />
      )}

      <main className="flex-grow">
        {renderSection()}
      </main>

      <Footer 
        onNavigateToConstruction={handleNavigateToConstruction}
        onOpenPrivacy={() => setShowPrivacyModal(true)}
        onNavigate={setActiveSection}
      />

      {showPrivacyModal && <PrivacyCenter onClose={() => setShowPrivacyModal(false)} />}
    </div>
  );
};

export default App;
