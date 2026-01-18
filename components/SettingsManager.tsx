
import React, { useRef } from 'react';
import { Building, Globe, Mail, Phone, Lock, Users, Shield, CreditCard, Camera, UserCircle } from 'lucide-react';

interface SettingsManagerProps {
  avatar: string;
  onAvatarChange: (url: string) => void;
}

const SettingsManager: React.FC<SettingsManagerProps> = ({ avatar, onAvatarChange }) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onAvatarChange(reader.result);
          (window as any).showToast?.('success', 'تم تحديث الصورة الشخصية بنجاح');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm text-center">
             <div className="relative inline-block group">
               <img src={avatar} alt="Profile" className="w-32 h-32 rounded-3xl object-cover border-4 border-blue-500/20" />
               <button 
                 onClick={() => avatarInputRef.current?.click()}
                 className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2.5 rounded-2xl shadow-xl hover:scale-110 transition-all"
               >
                 <Camera size={20} />
               </button>
               <input type="file" ref={avatarInputRef} onChange={handleAvatarUpload} className="hidden" accept="image/*" />
             </div>
             <h3 className="mt-4 font-bold text-lg">أحمد حلمي</h3>
             <p className="text-slate-500 text-xs">المستشار القانوني العام</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-2 shadow-sm">
            <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-bold shadow-sm shadow-blue-100 transition-all">
              <Building size={20} /> معلومات المكتب
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-2xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              <Users size={20} /> الكادر الإداري
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-2xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              <CreditCard size={20} /> الإعدادات المالية (AED)
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b pb-6 border-slate-100 dark:border-slate-700">
               <div>
                 <h3 className="text-xl font-bold">الملف التعريفي والفرع</h3>
                 <p className="text-slate-500 text-xs mt-1">إدارة بيانات المستشار ومدير الحسابات</p>
               </div>
               <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold">فرع مدينة العين</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-500">اسم المستشار القانوني</label>
                <div className="relative">
                  <UserCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" defaultValue="أحمد حلمي" className="w-full pr-10 pl-4 py-3 rounded-2xl border dark:bg-slate-900 dark:border-slate-700 outline-none focus:border-blue-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">البريد الإلكتروني (المستشار)</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="email" defaultValue="AHMEDHELMY200@GMAIL.COM" className="w-full pr-10 pl-4 py-3 rounded-2xl border dark:bg-slate-900 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">مديرة الحسابات</label>
                <div className="relative">
                  <Users className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" defaultValue="سمر أسامة العبد" className="w-full pr-10 pl-4 py-3 rounded-2xl border dark:bg-slate-900 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">البريد الإلكتروني (الحسابات)</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="email" defaultValue="SAMARELABED90@GMAIL.COM" className="w-full pr-10 pl-4 py-3 rounded-2xl border dark:bg-slate-900 outline-none" />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-500">العنوان الرسمي (إمارة أبوظبي)</label>
                <div className="relative">
                  <Globe className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" defaultValue="مدينة العين، إمارة أبوظبي، الإمارات العربية المتحدة" className="w-full pr-10 pl-4 py-3 rounded-2xl border dark:bg-slate-900 outline-none" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-700">
              <button className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">إلغاء</button>
              <button onClick={() => (window as any).showToast?.('success', 'تم تحديث بيانات الكادر بنجاح')} className="px-10 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">حفظ البيانات</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
