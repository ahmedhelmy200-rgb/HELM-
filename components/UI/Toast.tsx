
import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Globally accessible toast helper (simplified for this SPA)
  useEffect(() => {
    (window as any).showToast = (type: 'success' | 'error' | 'info', message: string) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prev => [...prev, { id, type, message }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 5000);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex flex-col gap-4 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto animate-in slide-in-from-left-full duration-300">
          <div className={`p-4 rounded-2xl shadow-xl flex items-center gap-4 border w-80
            ${toast.type === 'success' ? 'bg-white border-green-100 text-slate-800' : 
              toast.type === 'error' ? 'bg-white border-red-100 text-slate-800' : 
              'bg-white border-blue-100 text-slate-800'}`}>
            
            <div className={`p-2 rounded-xl 
              ${toast.type === 'success' ? 'bg-green-50 text-green-600' : 
                toast.type === 'error' ? 'bg-red-50 text-red-600' : 
                'bg-blue-50 text-blue-600'}`}>
              {toast.type === 'success' ? <CheckCircle size={24} /> : 
               toast.type === 'error' ? <AlertCircle size={24} /> : 
               <Info size={24} />}
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold">{toast.type === 'success' ? 'نجاح العملية' : toast.type === 'error' ? 'خطأ بالنظام' : 'تنبيه'}</p>
              <p className="text-xs text-slate-500">{toast.message}</p>
            </div>

            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
