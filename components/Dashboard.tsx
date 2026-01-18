
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, FileCheck, DollarSign, Calendar, Clock, AlertTriangle, CheckSquare } from 'lucide-react';
import { Reminder, Page } from '../types';

const data = [
  { name: 'يناير', sales: 4000, profit: 2400 },
  { name: 'فبراير', sales: 3000, profit: 1398 },
  { name: 'مارس', sales: 2000, profit: 9800 },
  { name: 'أبريل', sales: 2780, profit: 3908 },
  { name: 'مايو', sales: 1890, profit: 4800 },
  { name: 'يونيو', sales: 2390, profit: 3800 },
];

const reminders: Reminder[] = [
  { id: '1', title: 'جلسة مرافعة - قضية العقار', date: '2023-11-20', type: 'قضية', priority: 'high' },
  { id: '2', title: 'تحصيل دفعة - شركة النور', date: '2023-11-22', type: 'تحصيل', priority: 'medium' },
  { id: '3', title: 'تقديم طعن - قضية جنائية', date: '2023-11-18', type: 'مهمة', priority: 'high' },
  { id: '4', title: 'موعد استشارة - مكتب العين', date: '2023-11-25', type: 'موعد', priority: 'low' },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string; trend: string }> = ({ title, value, icon, color, trend }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
        {icon}
      </div>
      <span className="text-green-500 text-xs font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
        {trend}
      </span>
    </div>
    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">{value}</p>
  </div>
);

const Dashboard: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي الأرباح" value="185,000 د.إ" trend="+12%" icon={<TrendingUp size={24} />} color="bg-blue-500" />
        <StatCard title="الموكلين الجدد" value="1,240" trend="+8%" icon={<Users size={24} />} color="bg-purple-500" />
        <StatCard title="القضايا النشطة" value="45" trend="+5%" icon={<FileCheck size={24} />} color="bg-emerald-500" />
        <StatCard title="المستحقات المتأخرة" value="12,350 د.إ" trend="-5%" icon={<DollarSign size={24} />} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={20} />
              تحليل التدفقات المالية (AED)
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Reminder System - 1/3 width */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Calendar className="text-orange-500" size={20} />
                نظام التذكير والمهام
              </h2>
              <button className="text-blue-600 text-xs font-bold hover:underline">عرض الكل</button>
            </div>
            
            <div className="space-y-4 overflow-y-auto max-h-[450px] pr-2 custom-scrollbar">
              {reminders.map(rem => (
                <div key={rem.id} className={`p-4 rounded-2xl border-l-4 transition-all hover:translate-x-[-4px] 
                  ${rem.priority === 'high' ? 'bg-red-50 border-red-500 dark:bg-red-900/10' : 
                    rem.priority === 'medium' ? 'bg-orange-50 border-orange-500 dark:bg-orange-900/10' : 
                    'bg-blue-50 border-blue-500 dark:bg-blue-900/10'}`}>
                  <div className="flex items-start justify-between mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full 
                      ${rem.type === 'قضية' ? 'bg-red-100 text-red-600' : 
                        rem.type === 'تحصيل' ? 'bg-orange-100 text-orange-600' : 
                        'bg-blue-100 text-blue-600'}`}>
                      {rem.type}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <Clock size={10} />
                      {rem.date}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{rem.title}</h4>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-sm font-bold flex items-center justify-center gap-2 border border-slate-100 dark:border-slate-700 hover:bg-slate-100 transition-colors">
              <CheckSquare size={16} />
              إضافة مهمة جديدة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
