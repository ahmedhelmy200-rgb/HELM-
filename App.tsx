
import React, { useState, useEffect } from 'react';
import { Page, User } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ClientManager from './components/ClientManager';
import CaseManager from './components/CaseManager';
import InvoiceManager from './components/InvoiceManager';
import BackupManager from './components/BackupManager';
import SettingsManager from './components/SettingsManager';
import Login from './components/Login';
import AIAssistant from './components/AIAssistant';
import { Toaster } from './components/UI/Toast';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<string>("https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed");

  const currentUser: User = {
    name: "أحمد حلمي",
    role: "المستشار القانوني",
    email: "AHMEDHELMY200@GMAIL.COM",
    avatar: userAvatar
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-slate-900', 'text-slate-100');
      document.body.classList.remove('bg-[#f8fafc]', 'text-slate-800');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-slate-900', 'text-slate-100');
      document.body.classList.add('bg-[#f8fafc]', 'text-slate-800');
    }
  }, [isDarkMode]);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case Page.DASHBOARD: return <Dashboard onNavigate={setCurrentPage} />;
      case Page.CLIENTS: return <ClientManager onOpenInvoices={() => setCurrentPage(Page.INVOICES)} onOpenCases={() => setCurrentPage(Page.CASES)} />;
      case Page.CASES: return <CaseManager />;
      case Page.INVOICES: return <InvoiceManager />;
      case Page.BACKUP: return <BackupManager />;
      case Page.SETTINGS: return <SettingsManager onAvatarChange={setUserAvatar} avatar={userAvatar} />;
      case Page.AI_ASSISTANT: return <AIAssistant />;
      default: return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'dark' : ''} transition-colors duration-300`}>
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isCollapsed={isSidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        isDarkMode={isDarkMode}
        onLogout={() => setIsLoggedIn(false)}
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'mr-20' : 'mr-64'}`}>
        <Header 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          user={currentUser}
          title={getPageTitle(currentPage)}
          onAvatarClick={() => setCurrentPage(Page.SETTINGS)}
        />
        
        <div className="p-6 md:p-8">
          {renderPage()}
        </div>
      </main>
      
      <Toaster />
    </div>
  );
};

function getPageTitle(page: Page): string {
  switch (page) {
    case Page.DASHBOARD: return 'لوحة التحكم';
    case Page.CLIENTS: return 'إدارة الموكلين';
    case Page.CASES: return 'إدارة القضايا والتقارير';
    case Page.INVOICES: return 'إدارة الفواتير والتحصيل المالي (AED)';
    case Page.BACKUP: return 'النسخ الاحتياطي والربط الذكي';
    case Page.SETTINGS: return 'إعدادات النظام والكادر';
    case Page.AI_ASSISTANT: return 'المساعد القانوني الذكي';
    default: return '';
  }
}

export default App;
