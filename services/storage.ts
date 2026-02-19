import { Company, Budget, GlobalNotification, SupportMessage, Transaction, Coupon } from '../types';

const STORAGE_KEY_COMPANIES = 'atrios_companies';
const STORAGE_KEY_BUDGETS = 'atrios_budgets';
const STORAGE_KEY_PDF_COUNT = 'atrios_pdf_downloads';
const STORAGE_KEY_NOTIFICATIONS = 'atrios_notifications';
const STORAGE_KEY_MESSAGES = 'atrios_messages';
const STORAGE_KEY_TRANSACTIONS = 'atrios_transactions';
const STORAGE_KEY_COUPONS = 'atrios_coupons';

export const getStoredCompanies = (): Company[] => {
  const data = localStorage.getItem(STORAGE_KEY_COMPANIES);
  return data ? JSON.parse(data) : [];
};

export const saveCompany = (company: Company) => {
  const companies = getStoredCompanies();
  const index = companies.findIndex(c => c.id === company.id);
  if (index > -1) {
    companies[index] = company;
  } else {
    companies.push(company);
  }
  localStorage.setItem(STORAGE_KEY_COMPANIES, JSON.stringify(companies));
};

export const removeCompany = (id: string) => {
  const companies = getStoredCompanies().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY_COMPANIES, JSON.stringify(companies));
  
  // Opcional: Limpar dados relacionados
  const allBudgets = JSON.parse(localStorage.getItem(STORAGE_KEY_BUDGETS) || '[]');
  const filteredBudgets = allBudgets.filter((b: Budget) => b.companyId !== id);
  localStorage.setItem(STORAGE_KEY_BUDGETS, JSON.stringify(filteredBudgets));
};

export const getStoredBudgets = (companyId: string): Budget[] => {
  const data = localStorage.getItem(STORAGE_KEY_BUDGETS);
  const budgets: Budget[] = data ? JSON.parse(data) : [];
  return budgets.filter(b => b.companyId === companyId);
};

export const saveBudget = (budget: Budget) => {
  const data = localStorage.getItem(STORAGE_KEY_BUDGETS);
  const budgets: Budget[] = data ? JSON.parse(data) : [];
  const index = budgets.findIndex(b => b.id === budget.id);
  if (index > -1) {
    budgets[index] = budget;
  } else {
    budgets.push(budget);
  }
  localStorage.setItem(STORAGE_KEY_BUDGETS, JSON.stringify(budgets));
};

export const getPdfDownloadCount = (companyId: string): number => {
  const data = localStorage.getItem(STORAGE_KEY_PDF_COUNT);
  const counts = data ? JSON.parse(data) : {};
  return counts[companyId] || 0;
};

export const incrementPdfDownloadCount = (companyId: string) => {
  const data = localStorage.getItem(STORAGE_KEY_PDF_COUNT);
  const counts = data ? JSON.parse(data) : {};
  counts[companyId] = (counts[companyId] || 0) + 1;
  localStorage.setItem(STORAGE_KEY_PDF_COUNT, JSON.stringify(counts));
};

export const getGlobalNotifications = (): GlobalNotification[] => {
  const data = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
  return data ? JSON.parse(data) : [];
};

export const saveGlobalNotifications = (notifications: GlobalNotification[]) => {
  localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(notifications));
};

// Messaging Services
export const getMessages = (companyId?: string): SupportMessage[] => {
  const data = localStorage.getItem(STORAGE_KEY_MESSAGES);
  const messages: SupportMessage[] = data ? JSON.parse(data) : [];
  if (companyId) {
    return messages.filter(m => m.companyId === companyId);
  }
  return messages;
};

export const saveMessage = (message: SupportMessage) => {
  const messages = getMessages();
  messages.push(message);
  localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
};

export const markMessagesAsRead = (companyId: string, role: 'user' | 'master') => {
  const data = localStorage.getItem(STORAGE_KEY_MESSAGES);
  if (!data) return;
  const messages: SupportMessage[] = JSON.parse(data);
  const updated = messages.map(m => {
    if (m.companyId === companyId && m.senderRole !== role) {
      return { ...m, read: true };
    }
    return m;
  });
  localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(updated));
};

// Financial Services
export const getTransactions = (): Transaction[] => {
  const data = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
  return data ? JSON.parse(data) : [];
};

export const saveTransaction = (tx: Transaction) => {
  const txs = getTransactions();
  txs.push(tx);
  localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(txs));
};

export const getCoupons = (): Coupon[] => {
  const data = localStorage.getItem(STORAGE_KEY_COUPONS);
  return data ? JSON.parse(data) : [];
};

export const saveCoupon = (coupon: Coupon) => {
  const coupons = getCoupons();
  coupons.push(coupon);
  localStorage.setItem(STORAGE_KEY_COUPONS, JSON.stringify(coupons));
};

export const removeCoupon = (id: string) => {
  const coupons = getCoupons().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY_COUPONS, JSON.stringify(coupons));
};