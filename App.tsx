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
    if (id === 'passengers') { setActiveSection(Section.STATE_LICENSING); return; }
    if (id) { setSelectedServiceId(id); setActiveSection(Section.SERVICE_DETAIL); return; }
    setConstructionArea('Detalhes deste Serviço');
    setActiveSection(Section.UNDER_CONSTRUCTION);
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'admin') setActiveSection(Section.ADMIN_PANEL);
    else if (role === 'subscriber' || role === 'partner') setActiveSection(Section.CLIENT_PANEL);
    else if (role === 'shipper') setActiveSection(Section.SHIPPER_PANEL);
    else setActiveSection(Section.HOME);
  };

  const handleLogout = () => { setUserRole('visitor'); setActiveSection(Section.HOME); };

  const renderSection = () => {
    switch (activeSection) {
      case Section.LOGIN: return <LoginScreen onLogin={handleLogin} onBack={() => setActiveSection(Section.HOME)} onNavigateToRegister={() => setActiveSection(Section.REGISTER)} />;
      case Section.REGISTER: return <RegisterScreen onRegister={() => handleLogin('subscriber')} onNavigateToLogin={() => setActiveSection(Section.LOGIN)} onBack={() => setActiveSection(Section.HOME)} />;
      case Section.ADMIN_PANEL: return <AdminPanel onLogout={handleLogout} />;
      case Section.CLIENT_PANEL: return <ClientDashboard onNavigateToSuccess={() => setActiveSection(Section.SUCCESS_ROUTE)} />;
      case Section.SHIPPER_PANEL: return <ShipperPanel />;
      case Section.COURSE_PLAYER: return <CoursePlayer customCourse={dynamicCourse} onBack={() => setActiveSection(Section.INTERNATIONAL_MAP)} />;
      case Section.NEWS_BOARD: return <NewsBoard onBack={() => setActiveSection(Section.HOME)} />;
      case Section.ABOUT: return <AboutSection />;
      case Section.STRATEGIC_ROADMAP: return <StrategicRoadmap onCtaClick={() => setActiveSection(Section.LOGIN)} onBack={() => setActiveSection(Section.HOME)} />;
      case Section.SUCCESS_ROUTE: return <SuccessRoute onBack={() => setActiveSection(Section.CLIENT_PANEL)} />;
      case Section.SOLUTION_SHOWCASE: return <SolutionShowcase onNavigateToLogin={() => setActiveSection(Section.LOGIN)} onNavigateToPlans={() => setActiveSection(Section.OPPORTUNITY)} />;
      case Section.SERVICE_DETAIL: return <ServiceDetail serviceId={selectedServiceId || ''} onBack={() => setActiveSection(Section.SERVICES)} onConsultMentor={() => setActiveSection(Section.MENTOR)} onNavigateToMap={() => setActiveSection(Section.INTERNATIONAL_MAP)} />;
      case Section.STATE_LICENSING: return <StateLicensingMap onBack={() => setActiveSection(Section.SERVICES)} onConsultMentor={() => setActiveSection(Section.MENTOR)} />;
      case Section.INTERNATIONAL_MAP: return <InternationalMap onBack={() => setActiveSection(Section.SERVICE_DETAIL)} onConsultMentor={() => setActiveSection(Section.MENTOR)} onStartCourse={(c) => { setDynamicCourse(c); setActiveSection(Section.COURSE_PLAYER); }} language={language} />;
      case Section.OPPORTUNITY: return <SalesFunnel onBuyAccess={() => setActiveSection(Section.LOGIN)} onBack={() => setActiveSection(Section.HOME)} />;
      case Section.UNDER_CONSTRUCTION: return <UnderConstruction areaName={constructionArea} onBack={() => setActiveSection(Section.HOME)} />;
      default: return (
        <>
          <Hero onCtaClick={() => setActiveSection(Section.SOLUTION_SHOWCASE)} onNavigateToNews={() => setActiveSection(Section.NEWS_BOARD)} onNavigateToRoadmap={() => setActiveSection(Section.STRATEGIC_ROADMAP)} language={language} />
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
    }
  };

  return (
    <div className="min-h-screen bg-hlx-navy flex flex-col font-sans text-slate-50 w-full overflow-x-hidden">
      <Header activeSection={activeSection} onNavigate={setActiveSection} isLoggedIn={userRole !== 'visitor'} onLogout={handleLogout} language={language} setLanguage={setLanguage} />
      {![Section.HOME, Section.LOGIN, Section.REGISTER].includes(activeSection) && <Breadcrumbs activeSection={activeSection} onNavigate={setActiveSection} />}
      <main className="flex-grow">{renderSection()}</main>
      <Footer onOpenPrivacy={() => setShowPrivacyModal(true)} onNavigate={setActiveSection} />
      {showPrivacyModal && <PrivacyCenter onClose={() => setShowPrivacyModal(false)} />}
    </div>
  );
};

export default App;