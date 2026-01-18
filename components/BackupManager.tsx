
import React from 'react';
import { CloudUpload, RefreshCcw, Archive, ShieldCheck, Clock, Download } from 'lucide-react';

const BackupManager: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <div className="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck size={40} className="text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold">مركز النسخ الاحتياطي</h2>
        <p className="text-slate-500">بياناتك محمية ومؤرشفة بشكل دوري لضمان استمرارية العمل</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-dashed border-blue-200 dark:border-blue-900 flex flex-col items-center justify-center text-center space-y-4 hover:bg-blue-50/50 transition-colors">
          <CloudUpload size={48} className="text-blue-600" />
          <div>
            <h3 className="font-bold text-lg">إنشاء نسخة فورية</h3>
            <p className="text-sm text-slate-500">سيتم تجميع كافة الملفات وقواعد البيانات في ملف ZIP مشفر</p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200">ابدأ النسخ</button>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center space-y-4 hover:bg-slate-50/50 transition-colors">
          <RefreshCcw size={48} className="text-emerald-500" />
          <div>
            <h3 className="font-bold text-lg">استعادة النظام</h3>
            <p className="text-sm text-slate-500">رفع ملف نسخة سابقة لاستعادة حالة النظام كاملة</p>
          </div>
          <button className="bg-emerald-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-200">رفع ملف النسخة</button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-2">
            <Archive size={20} className="text-slate-500" />
            تاريخ النسخ الاحتياطية
          </h3>
          <span className="text-xs text-slate-500">آخر 5 عمليات ناجحة</span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 dark:bg-slate-700 p-2.5 rounded-lg">
                  <Clock size={20} className="text-slate-500" />
                </div>
                <div>
                  <p className="font-bold text-sm">backup_full_2023_11_{10+i}.zip</p>
                  <p className="text-xs text-slate-500">حجم الملف: 45.2 MB • منذ {i} أيام</p>
                </div>
              </div>
              <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg">
                <Download size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackupManager;
