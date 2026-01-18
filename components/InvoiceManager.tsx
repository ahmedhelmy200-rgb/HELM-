
import React, { useState } from 'react';
import { Plus, Search, Send, Trash2, Printer, ReceiptText, X, Wallet, Users } from 'lucide-react';
import { Invoice, InvoiceStatus } from '../types';

const initialInvoices: Invoice[] = [
  { id: 'INV-001', clientId: 'CL-001', clientName: 'عبدالله بن فهد', amount: 5000, date: '2023-10-25', status: InvoiceStatus.PAID, type: 'فاتورة' },
  { id: 'COM-001', clientId: 'MD-001', clientName: 'حمدان السويدي', amount: 500, date: '2023-10-26', status: InvoiceStatus.PAID, type: 'عمولة_سمسار' },
  { id: 'REC-001', clientId: 'CL-001', clientName: 'عبدالله بن فهد', amount: 5000, date: '2023-11-10', status: InvoiceStatus.PAID, type: 'سند_قبض' },
  { id: 'EXP-001', clientId: 'SYSTEM', clientName: 'إيجار مكتب العين', amount: 8000, date: '2023-11-12', status: InvoiceStatus.PAID, type: 'مصروف' },
];

const StatusBadge: React.FC<{ status: InvoiceStatus }> = ({ status }) => {
  const styles = {
    [InvoiceStatus.PAID]: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    [InvoiceStatus.SENT]: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    [InvoiceStatus.OVERDUE]: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    [InvoiceStatus.DRAFT]: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400',
  };
  return <span className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${styles[status]}`}>{status === InvoiceStatus.PAID ? 'تم السداد' : 'بانتظار التحصيل'}</span>;
};

const InvoiceManager: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [filter, setFilter] = useState('');
  const [modalType, setModalType] = useState<'invoice' | 'receipt' | 'expense' | 'commission' | null>(null);
  const [formData, setFormData] = useState({ clientName: '', amount: '', title: '' });

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || (!formData.clientName && modalType !== 'expense')) return;
    
    const prefixMap = { invoice: 'INV', receipt: 'REC', expense: 'EXP', commission: 'COM' };
    const typeMap = { invoice: 'فاتورة', receipt: 'سند_قبض', expense: 'مصروف', commission: 'عمولة_سمسار' };
    
    const newEntry: Invoice = {
      id: `${prefixMap[modalType!]}-00${invoices.length + 1}`,
      clientId: 'DYNAMIC',
      clientName: modalType === 'expense' ? formData.title : formData.clientName,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString().split('T')[0],
      status: InvoiceStatus.PAID,
      type: typeMap[modalType!] as any
    };
    setInvoices([newEntry, ...invoices]);
    setModalType(null);
    setFormData({ clientName: '', amount: '', title: '' });
    (window as any).showToast?.('success', 'تم تسجيل العملية المالية بنجاح في نظام حلم');
  };

  const handlePrint = (inv: Invoice) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html dir="rtl">
          <head>
            <title>${inv.type} - ${inv.id}</title>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
            <style>
              body { font-family: 'Cairo', sans-serif; padding: 40px; color: #333; }
              .header { display: flex; justify-content: space-between; border-bottom: 3px solid #1e40af; padding-bottom: 20px; margin-bottom: 40px; }
              .title { color: #1e40af; font-size: 32px; font-weight: bold; }
              .office-info { text-align: left; font-size: 14px; }
              .doc-box { background: #f8fafc; padding: 25px; border-radius: 15px; border: 1px solid #e2e8f0; margin: 30px 0; text-align: center; }
              .amount { font-size: 36px; color: #1e40af; font-weight: bold; margin-top: 15px; }
              .footer { margin-top: 100px; display: flex; justify-content: space-between; }
              .sig { border-top: 2px solid #ccc; width: 220px; text-align: center; padding-top: 10px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="title">نظام حلم HELM</div>
              <div class="office-info">مكتب المستشار أحمد حلمي<br>العين، أبوظبي<br>AHMEDHELMY200@GMAIL.COM</div>
            </div>
            <div class="doc-box">
              <div style="font-size: 20px;">${inv.type.replace('_', ' ')} رقم: <strong>${inv.id}</strong></div>
              <div class="amount">${inv.amount.toLocaleString()} د.إ</div>
            </div>
            <div style="line-height: 2.5; font-size: 18px;">
              <strong>التاريخ:</strong> ${inv.date}<br>
              <strong>نص المستند:</strong> تم استلام / صرف المبلغ المذكور أعلاه من / إلى السيد: <strong>${inv.clientName}</strong><br>
              وذلك بخصوص الأتعاب / المصاريف القانونية المتفق عليها.
            </div>
            <div class="footer">
              <div class="sig">المدير المالي: سمر أسامة العبد</div>
              <div class="sig">الختم والتوقيع الرسمي</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">الشؤون المالية والتحصيل (AED)</h2>
          <p className="text-slate-500 text-sm mt-1">إدارة الفواتير، عمولات السماسرة، والمصاريف</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setModalType('commission')} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2.5 rounded-2xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all active:scale-95">
            <Users size={18} /><span>سند عمولة</span>
          </button>
          <button onClick={() => setModalType('expense')} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2.5 rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95">
            <Wallet size={18} /><span>إضافة مصروف</span>
          </button>
          <button onClick={() => setModalType('receipt')} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95">
            <ReceiptText size={18} /><span>سند قبض</span>
          </button>
          <button onClick={() => setModalType('invoice')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
            <Plus size={18} /><span>فاتورة جديدة</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700">
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="البحث برقم المستند أو الاسم..." className="w-full pr-10 pl-4 py-2.5 rounded-2xl border dark:bg-slate-900 outline-none focus:border-blue-500 transition-all" value={filter} onChange={(e) => setFilter(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">رقم السند</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">الموكل / المستفيد</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">المبلغ (AED)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">النوع</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">الحالة</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {invoices.filter(i => i.clientName.includes(filter)).map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-600">{inv.id}</td>
                  <td className="px-6 py-4 font-bold">{inv.clientName}</td>
                  <td className="px-6 py-4 font-black text-slate-800 dark:text-white">{inv.amount.toLocaleString()} د.إ</td>
                  <td className="px-6 py-4 text-[10px] font-bold text-slate-500">{inv.type.replace('_', ' ')}</td>
                  <td className="px-6 py-4"><StatusBadge status={inv.status} /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handlePrint(inv)} className="p-2 rounded-xl text-slate-400 hover:text-green-600 hover:bg-green-50 transition-all" title="طباعة"><Printer size={18} /></button>
                      <button onClick={() => setInvoices(invoices.filter(i => i.id !== inv.id))} className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all" title="حذف"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl border dark:border-slate-700 overflow-hidden">
            <div className={`p-6 border-b text-white ${modalType === 'expense' ? 'bg-orange-600' : modalType === 'receipt' ? 'bg-emerald-600' : modalType === 'commission' ? 'bg-purple-600' : 'bg-blue-600'}`}>
              <h3 className="text-lg font-bold">{modalType === 'invoice' ? 'إنشاء فاتورة جديدة' : modalType === 'receipt' ? 'إصدار سند قبض' : modalType === 'commission' ? 'صرف عمولة سمسار' : 'تسجيل مصروف'}</h3>
              <button onClick={() => setModalType(null)}><X size={24} /></button>
            </div>
            <form onSubmit={handleCreateEntry} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-500">{modalType === 'expense' ? 'وصف المصروف' : 'الاسم (الموكل / السمسار)'}</label>
                <input type="text" required className="w-full p-3 rounded-2xl border dark:bg-slate-900 dark:border-slate-700 outline-none" value={modalType === 'expense' ? formData.title : formData.clientName} onChange={e => setFormData({...formData, [modalType === 'expense' ? 'title' : 'clientName']: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-500">المبلغ الإجمالي (AED)</label>
                <input type="number" required className="w-full p-3 rounded-2xl border dark:bg-slate-900 dark:border-slate-700 outline-none font-bold" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
              </div>
              <button type="submit" className={`w-full py-4 mt-4 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 ${modalType === 'expense' ? 'bg-orange-600 hover:bg-orange-700' : modalType === 'receipt' ? 'bg-emerald-600 hover:bg-emerald-700' : modalType === 'commission' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                حفظ وتسجيل السند المالي
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceManager;
