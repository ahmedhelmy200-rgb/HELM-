
import React, { useState, useRef } from 'react';
import { Plus, Search, User, Mail, CreditCard, Phone, FileText, Upload, Trash2, ArrowRight, Download, Printer, X, Briefcase, DollarSign, Users } from 'lucide-react';
import { Client, Document as DocType, Case } from '../types';

const mockClients: Client[] = [
  {
    id: 'CL-001',
    name: 'عبدالله بن فهد',
    email: 'abdullah@example.com',
    idNumber: '1023948576',
    phone: '0501234567',
    mediator: 'حمدان السويدي',
    agreedAmount: 25000,
    documents: [
      { id: 'DOC-1', name: 'عقد التأسيس.pdf', type: 'PDF', uploadDate: '2023-10-01', size: '1.2 MB' },
    ]
  },
  {
    id: 'CL-002',
    name: 'سارة المنصور',
    email: 'sara@example.com',
    idNumber: '2034958671',
    phone: '0559876543',
    agreedAmount: 12000,
    documents: []
  }
];

interface ClientManagerProps {
  onOpenInvoices: () => void;
  onOpenCases: () => void;
}

const ClientManager: React.FC<ClientManagerProps> = ({ onOpenInvoices, onOpenCases }) => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newClient, setNewClient] = useState({ name: '', email: '', idNumber: '', phone: '', mediator: '', agreedAmount: '' });

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const client: Client = {
      id: `CL-00${clients.length + 1}`,
      name: newClient.name,
      email: newClient.email,
      idNumber: newClient.idNumber,
      phone: newClient.phone,
      mediator: newClient.mediator,
      agreedAmount: parseFloat(newClient.agreedAmount) || 0,
      documents: []
    };
    setClients([...clients, client]);
    setIsAddModalOpen(false);
    setNewClient({ name: '', email: '', idNumber: '', phone: '', mediator: '', agreedAmount: '' });
    (window as any).showToast?.('success', 'تم إضافة الموكل بنجاح في نظام حلم');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !selectedClient) return;
    const file = e.target.files[0];
    const newDoc: DocType = {
      id: `DOC-${Date.now()}`,
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${(file.size / 1024).toFixed(1)} KB`
    };
    
    const updatedClient = { ...selectedClient, documents: [...selectedClient.documents, newDoc] };
    setSelectedClient(updatedClient);
    setClients(clients.map(c => c.id === selectedClient.id ? updatedClient : c));
    (window as any).showToast?.('success', 'تم رفع المستند بنجاح');
  };

  const handlePrintStatement = () => {
    if (!selectedClient) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html dir="rtl">
          <head>
            <title>كشف حساب موكل - نظام حلم</title>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
            <style>
              body { font-family: 'Cairo', sans-serif; padding: 40px; }
              .header { display: flex; justify-content: space-between; border-bottom: 2px solid #1e40af; padding-bottom: 15px; margin-bottom: 30px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 12px; text-align: right; }
              th { background-color: #f8fafc; color: #1e40af; }
              .summary { margin-top: 30px; text-align: left; }
              .total { font-size: 20px; font-weight: bold; color: #1e40af; }
            </style>
          </head>
          <body>
            <div class="header">
              <div><h1>كشف حساب موكل</h1></div>
              <div><strong>نظام حلم HELM</strong><br>فرع العين، أبوظبي</div>
            </div>
            <p><strong>اسم الموكل:</strong> ${selectedClient.name}</p>
            <p><strong>رقم الهوية:</strong> ${selectedClient.idNumber}</p>
            <p><strong>المبلغ المتفق عليه:</strong> ${selectedClient.agreedAmount.toLocaleString()} د.إ</p>
            <hr/>
            <table>
              <thead><tr><th>التاريخ</th><th>البيان / القضية</th><th>المبلغ (AED)</th><th>الحالة</th></tr></thead>
              <tbody>
                <tr><td>2023-10-25</td><td>دفعة مقدمة - أتعاب</td><td>5,000</td><td>تم التحصيل</td></tr>
                <tr><td>2023-11-10</td><td>مصاريف إدارية</td><td>200</td><td>تم التحصيل</td></tr>
              </tbody>
            </table>
            <div class="summary">
              <p class="total">إجمالي المدفوعات: 5,200 د.إ</p>
              <p>المبلغ المتبقي: ${(selectedClient.agreedAmount - 5200).toLocaleString()} د.إ</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (selectedClient) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedClient(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <ArrowRight size={24} />
            </button>
            <h2 className="text-2xl font-bold">ملف الموكل: {selectedClient.name}</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrintStatement} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">
              <Printer size={18} /> طباعة كشف الحساب
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                <User size={40} />
              </div>
              <h3 className="text-center font-bold text-lg mb-6">{selectedClient.name}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl"><CreditCard className="text-slate-400" size={18} /><div><p className="text-[10px] text-slate-400">رقم الهوية</p><p className="text-sm font-bold">{selectedClient.idNumber}</p></div></div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl"><Mail className="text-slate-400" size={18} /><div><p className="text-[10px] text-slate-400">البريد الإلكتروني</p><p className="text-sm font-bold">{selectedClient.email}</p></div></div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl"><Users className="text-slate-400" size={18} /><div><p className="text-[10px] text-slate-400">السمسار / الوسيط</p><p className="text-sm font-bold">{selectedClient.mediator || 'لا يوجد'}</p></div></div>
                <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl"><DollarSign className="text-emerald-500" size={18} /><div><p className="text-[10px] text-emerald-500">المبلغ المتفق عليه</p><p className="text-sm font-bold text-emerald-600">{selectedClient.agreedAmount.toLocaleString()} د.إ</p></div></div>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                <button onClick={onOpenInvoices} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"><DollarSign size={18} /> الفواتير والتحصيل</button>
                <button onClick={onOpenCases} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"><Briefcase size={18} /> عرض القضايا</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2"><Upload className="text-blue-600" size={20} /> المستندات والمرفقات</h3>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} className="text-sm text-blue-600 font-bold hover:underline">إضافة مستند +</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedClient.documents.length > 0 ? (
                  selectedClient.documents.map(doc => (
                    <div key={doc.id} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-blue-200 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"><FileText size={20} /></div>
                        <div className="flex-1 overflow-hidden"><p className="font-bold text-sm truncate">{doc.name}</p><p className="text-[10px] text-slate-400">{doc.uploadDate} • {doc.size}</p></div>
                        <div className="flex gap-1">
                           <button onClick={() => (window as any).showToast?.('info', `جارِ تحميل ${doc.name}...`)} className="p-1.5 text-slate-400 hover:text-blue-600"><Download size={16} /></button>
                           <button className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-12 text-center text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-700 rounded-2xl"><p>لا توجد مستندات مرفقة لهذا الموكل</p></div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
               <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Briefcase className="text-blue-600" size={20} /> القضايا والتقارير الحالية</h3>
               <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start">
                       <div>
                          <p className="font-bold">نزاع عقاري - أرض العليا</p>
                          <p className="text-[10px] text-slate-400 mt-1">قضية رقم: CASE-001 • النوع: عقاري</p>
                       </div>
                       <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold">نشطة</span>
                    </div>
                    <div className="mt-4 pt-4 border-t dark:border-slate-800 flex justify-between text-xs">
                       <span className="text-slate-500">أتعاب القضية: 5,000 د.إ</span>
                       <button className="text-blue-600 font-bold">عرض التقرير المفصل</button>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">قائمة الموكلين</h2>
          <p className="text-slate-500 text-sm mt-1">إدارة بيانات الموكلين، السماسرة، والمبالغ المتفق عليها</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>موكل جديد</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="relative max-w-md"><Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="text" placeholder="البحث بالاسم أو رقم الهوية..." className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none focus:border-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead><tr className="bg-slate-50 dark:bg-slate-900/50"><th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">الاسم</th><th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">رقم الهوية</th><th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">المبلغ (AED)</th><th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">المستندات</th><th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">الإجراءات</th></tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {clients.filter(c => c.name.includes(searchTerm)).map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors group">
                  <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold">{c.name[0]}</div><div><p className="font-bold">{c.name}</p><p className="text-[10px] text-slate-400">{c.email}</p></div></div></td>
                  <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">{c.idNumber}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">{c.agreedAmount.toLocaleString()}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-[10px] font-bold">{c.documents.length} ملفات</span></td>
                  <td className="px-6 py-4"><button onClick={() => setSelectedClient(c)} className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg font-bold text-sm transition-all">فتح ملف الموكل</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-3xl shadow-2xl border dark:border-slate-700">
            <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center bg-blue-600 text-white">
              <h3 className="text-lg font-bold">إضافة موكل جديد للمكتب</h3>
              <button onClick={() => setIsAddModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddClient} className="p-6 grid grid-cols-2 gap-4">
              <div className="space-y-1 col-span-2"><label className="text-sm font-bold text-slate-500">الاسم الكامل</label><input type="text" required className="w-full p-3 rounded-xl border dark:bg-slate-900 dark:border-slate-700 outline-none" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} /></div>
              <div className="space-y-1"><label className="text-sm font-bold text-slate-500">رقم الهوية</label><input type="text" required className="w-full p-3 rounded-xl border dark:bg-slate-900 dark:border-slate-700 outline-none" value={newClient.idNumber} onChange={e => setNewClient({...newClient, idNumber: e.target.value})} /></div>
              <div className="space-y-1"><label className="text-sm font-bold text-slate-500">رقم الجوال</label><input type="text" required className="w-full p-3 rounded-xl border dark:bg-slate-900 dark:border-slate-700 outline-none" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} /></div>
              <div className="space-y-1 col-span-2"><label className="text-sm font-bold text-slate-500">البريد الإلكتروني</label><input type="email" required className="w-full p-3 rounded-xl border dark:bg-slate-900 dark:border-slate-700 outline-none" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} /></div>
              <div className="space-y-1"><label className="text-sm font-bold text-slate-500">السمسار / الوسيط (اختياري)</label><input type="text" className="w-full p-3 rounded-xl border dark:bg-slate-900 dark:border-slate-700 outline-none" value={newClient.mediator} onChange={e => setNewClient({...newClient, mediator: e.target.value})} /></div>
              <div className="space-y-1"><label className="text-sm font-bold text-slate-500">المبلغ الإجمالي المتفق عليه (AED)</label><input type="number" required className="w-full p-3 rounded-xl border border-blue-200 dark:bg-slate-900 dark:border-slate-700 outline-none font-bold" value={newClient.agreedAmount} onChange={e => setNewClient({...newClient, agreedAmount: e.target.value})} /></div>
              <button type="submit" className="col-span-2 w-full py-4 mt-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors">حفظ ملف الموكل</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManager;
