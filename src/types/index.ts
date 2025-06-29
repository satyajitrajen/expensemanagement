export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'requestor' | 'approver' | 'accounts' | 'admin';
  department: string;
  isActive: boolean;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  budget: number;
  head: string;
  isActive: boolean;
}

export interface ExpenseRequest {
  id: string;
  requestorId: string;
  requestorName: string;
  department: string;
  category: 'food' | 'travel' | 'supplies' | 'equipment' | 'other';
  type: 'expense' | 'pre-book';
  amount: number;
  description: string;
  attachments: string[];
  submissionDate: string;
  approver1Id?: string;
  approver1Name?: string;
  approver1Status: 'pending' | 'approved' | 'rejected';
  approver1Date?: string;
  approver1Comments?: string;
  approver2Id?: string;
  approver2Name?: string;
  approver2Status: 'pending' | 'approved' | 'rejected';
  approver2Date?: string;
  approver2Comments?: string;
  accountsStatus: 'pending' | 'approved' | 'rejected';
  accountsDate?: string;
  accountsComments?: string;
  finalStatus: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  budgetUsed?: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'approval_request' | 'status_update' | 'budget_alert' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedRequestId?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}