
import React, { useState } from 'react';
import { Plus, Search, Briefcase, Calendar, User, Clock, CheckCircle2, AlertCircle, X, DollarSign, FileText } from 'lucide-react';
import { Case } from '../types';

const initialCases: Case[] = [
  { id: 'CASE-001', title: 'نزاع عقاري - أرض العليا', clientId: 'CL-001', clientName: 'عبدالله بن فهد', type: 'عقاري', status: 'نشطة', startDate: '2023-09-15', caseFee: 5000 },
  { id: 'CASE-002', title: 'تصفية تركة - عائلة السعيد', clientId: 'CL-002', clientName: 'سارة المنصور', type: 'أحوال شخصية', status: 'قيد المراجعة', startDate: '2023-11-01', caseFee: 3500 },
];

const CaseManager: React.FC = () => {
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCase, setNewCase] = useState({ title: '', type: '', clientName: '', caseFee: '', description: '' });

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    const caseObj: Case = {
      id: `CASE-00${cases.length + 1}`,
      title: newCase.title,
      clientId: 'CL-NEW',
      clientName: newCase.clientName,
      type: newCase.type,
      status: 'نشطة',
      startDate: new Date().toISOString().split('T')[0],
      caseFee: parseFloat(newCase.caseFee) || 0,
      description: newCase.description
    };
    setCases([caseObj, ...cases]);
    setIsAddModalOpen(false);
    setNewCase({ title: '', type: '', clientName: '', caseFee: '', description: '' });
    (window as any).showToast?.('success', 'تم فتح القضية وتحديد الأتعاب بنجاح');
  };

  const getStatusIcon = (status: Case['status']) => {
    switch(status) {
      case 'نشطة': return <Clock className="text-blue-500" size={16} />;
      case 'مغلقة': return <CheckCircle2 className="text-emerald-500" size={16} />;
      case 'قيد المراجعة': return <AlertCircle className="text-orange-500" size={16} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">إدارة القضايا والتقارير</h2>
          <p className="text-slate-500 text-sm mt-1">تتبع سير القضايا، الجلسات، وأتعاب التقاضي</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>فتح قضية جديدة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c) => (
          <div key={c.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-400 group-hover:text-blue-600 transition-colors"><Briefcase size={24} /></div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${c.status === 'نشطة' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-slate-50 text-slate-700'}`}>
                {getStatusIcon(c.status)} {c.status}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-1">{c.title}</h3>
            <p className="text-xs text-slate-400 mb-6 flex items-center gap-1"><span className="font-bold text-blue-600">{c.id}</span> • {c.type}</p>
            
            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs"><span className="text-slate-400 flex items-center gap-1.5"><User size={14} /> الموكل</span><span className="font-bold">{c.clientName}</span></div>
              <div className="flex items-center justify-between text-xs"><span className="text-slate-400 flex items-center gap-1.5"><DollarSign size={14} /> الأتعاب</span><span className="font-black text-emerald-600">{c.caseFee.toLocaleString()} د.إ</span></div>
              <div className="flex items-center justify-between text-xs"><span className="text-slate-400 flex items-center gap-1.5"><Calendar size={14} /> تاريخ البدء</span><span className="font-bold">{c.startDate}</span></div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-6">
               <button className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-1"><FileText size={14} /> التقرير</button>
               <button className="py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-1"><Calendar size={14} /> المواعيد</button>
            </div>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-3xl shadow-2xl border dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center bg-blue-600 text-white">
              <h3 className="text-lg font-bold">فتح قضية وتحديد أتعاب</h3>
              <button onClick={() => setIsAddModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddCase} className="p-6 space-y-4">
              <div className="space-y-1"><label className="text-sm font-bold text-slate-500">عنوان القضية</label><input type="text" required className="w-full p-3 rounded-xl border dark:bg-slate-900 dark:border-slate-700 outline-none" value={newCase.title} onChange={e => setNewCase({...newCase, title: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1"><label className="text-sm font-bold text-slate-500">نوع القضية</label><select required className="w-full p-3 rounded-xl border dark:bg-slate-900 dark:border-slate-700 outline-none" value={newCase.type} onChange={e => setNewCase({...newCase, type: e.target.value})}><option value="">اختر النوع</option><option value="جنائي">جنائي</option><option value="تجاري">تجاري</option><option value="أحوال شخصية">أحوال شخصية</option><option value="عقاري">عقاري</option></select></div>
                 <div className="space-y-1"><label className="text-sm font-bold text-slate-500">أتعاب القضية (AED)</label><input type="number" required className="w-full p-3 rounded-xl border border-blue-200 font-bold dark:bg-slate-900 dark:border-slate-700 outline-none" value={newCase.caseFee} onChange={e => setNewCase({...newCase, caseFee: e.target.value})} /></div>
              </div>
              <div className="space-y-1"><label className="text-sm font-bold text-slate-500">اسم الموكل</label><input type="text" required className="w-full p-3 rounded-xl border dark:bg-slate-900 dark:border-slate-700 outline-none" value={newCase.clientName} onChange={e => setNewCase({...newCase, clientName: e.target.value})} /></div>
              <div className="space-y-1"><label className="text-sm font-bold text-slate-500">وصف / تقرير أولى</label><textarea className="w-full p-3 rounded-xl border dark:bg-slate-900 dark:border-slate-700 outline-none h-24" value={newCase.description} onChange={e => setNewCase({...newCase, description: e.target.value})} /></div>
              <button type="submit" className="w-full py-4 mt-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors">تسجيل ملف القضية والتقرير</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseManager;
