
import React, { useState } from 'react';
import { Scale, Lock, Mail, ArrowLeft } from 'lucide-react';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-['Cairo']">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-800/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-white max-w-md text-center">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl mb-8 inline-block">
            <Scale size={64} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-extrabold mb-6 leading-tight">نظام الإدارة القانونية المتكامل</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            مكتب أحمد حلمي للاستشارات القانونية - حلول ذكية لإدارة القضايا والفواتير والتواصل الفعال.
          </p>
        </div>
      </div>

      {/* Login Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-right space-y-2">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">مرحباً بك مجدداً</h2>
            <p className="text-slate-500">الرجاء إدخال بيانات الدخول للوصول إلى لوحة التحكم</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 dark:text-slate-400">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="email" 
                  required 
                  className="w-full pr-12 pl-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" 
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-400">كلمة المرور</label>
                <button type="button" className="text-xs text-blue-600 hover:underline">نسيت كلمة المرور؟</button>
              </div>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="password" 
                  required 
                  className="w-full pr-12 pl-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  دخول النظام
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm">
            نظام محمي بشهادة SSL وتشفير بيانات متطور
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
