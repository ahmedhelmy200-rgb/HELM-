
import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Database, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ChevronLeft,
  Scale,
  Bot,
  Users,
  Briefcase
} from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isCollapsed: boolean;
  setCollapsed: (v: boolean) => void;
  isDarkMode: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  setCurrentPage, 
  isCollapsed, 
  setCollapsed,
  isDarkMode,
  onLogout
}) => {
  const menuItems = [
    { id: Page.DASHBOARD, label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: Page.CLIENTS, label: 'الموكلين', icon: Users },
    { id: Page.CASES, label: 'القضايا', icon: Briefcase },
    { id: Page.INVOICES, label: 'إدارة الفواتير', icon: FileText },
    { id: Page.AI_ASSISTANT, label: 'المساعد الذكي', icon: Bot },
    { id: Page.BACKUP, label: 'النسخ الاحتياطي', icon: Database },
    { id: Page.SETTINGS, label: 'إعدادات النظام', icon: Settings },
  ];

  return (
    <aside 
      className={`fixed top-0 right-0 h-full transition-all duration-300 z-50 flex flex-col
        ${isCollapsed ? 'w-20' : 'w-64'} 
        ${isDarkMode ? 'bg-slate-800 border-l border-slate-700' : 'bg-white border-l border-slate-200'} shadow-xl`}
    >
      {/* Brand */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-transparent">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Scale className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-lg whitespace-nowrap bg-gradient-to-l from-blue-600 to-teal-500 bg-clip-text text-transparent">
              نظام حلم HELM
            </span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
        >
          {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none' 
                  : 'text-slate-500 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600'}`}
            >
              <Icon size={24} className={isActive ? 'text-white' : 'group-hover:text-blue-600'} />
              {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              {isActive && !isCollapsed && <div className="mr-auto w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
        >
          <LogOut size={24} />
          {!isCollapsed && <span className="font-medium">تسجيل الخروج</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
