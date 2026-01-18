
export enum Page {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  CLIENTS = 'CLIENTS',
  CASES = 'CASES',
  INVOICES = 'INVOICES',
  BACKUP = 'BACKUP',
  SETTINGS = 'SETTINGS',
  AI_ASSISTANT = 'AI_ASSISTANT'
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE'
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  idNumber: string;
  phone: string;
  mediator?: string;
  agreedAmount: number;
  documents: Document[];
}

export interface Case {
  id: string;
  title: string;
  clientId: string;
  clientName?: string;
  type: string;
  status: 'نشطة' | 'مغلقة' | 'قيد المراجعة';
  startDate: string;
  deadline?: string;
  caseFee: number;
  description?: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  date: string;
  status: InvoiceStatus;
  type: 'فاتورة' | 'سند_قبض' | 'مصروف' | 'عمولة_سمسار';
}

export interface Reminder {
  id: string;
  title: string;
  date: string;
  type: 'قضية' | 'تحصيل' | 'موعد' | 'مهمة';
  priority: 'high' | 'medium' | 'low';
}

export interface User {
  name: string;
  role: string;
  avatar: string;
  email: string;
}
