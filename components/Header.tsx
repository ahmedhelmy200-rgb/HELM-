
import React from 'react';
import { Bell, Search, Moon, Sun, Globe, UserCircle } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  user: User;
  title: string;
  onAvatarClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode, user, title, onAvatarClick }) => {
  return (
    <header className={`h-20 flex items-center justify-between px-8 border-b transition-colors duration-300 sticky top-0 z-40
      ${isDarkMode ? 'bg-slate-900/80 border-slate-700 backdrop-blur-md' : 'bg-white/80 border-slate-200 backdrop-blur-md'}`}>
      
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold text-slate-800 dark:text-white hidden md:block">{title}</h1>
        
        <div className="relative group hidden sm:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="البحث عن قضايا، موكلين، مستندات..."
            className={`pr-10 pl-4 py-2 rounded-full border outline-none transition-all w-64 md:w-80
              ${isDarkMode ? 'bg-slate-800 border-slate-700 focus:border-blue-500 text-white' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-500" />}
        </button>
        
        <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors">
          <Bell size={20} className="text-slate-500" />
          <span className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        <div 
          onClick={onAvatarClick}
          className="flex items-center gap-3 pr-4 border-r border-slate-200 dark:border-slate-700 mr-2 cursor-pointer group"
        >
          <div className="text-left hidden lg:block">
            <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">{user.name}</p>
            <p className="text-xs text-slate-500">{user.role}</p>
          </div>
          <div className="relative">
            <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-blue-500 p-0.5 object-cover" />
            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-0.5 border border-slate-200 dark:border-slate-700">
               <UserCircle size={14} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
