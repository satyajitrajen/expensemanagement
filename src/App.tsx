import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import FileExpense from './components/FileExpense';
import PreBookRequest from './components/PreBookRequest';
import TrackRequests from './components/TrackRequests';
import UsageTracker from './components/UsageTracker';
import ApprovalQueue from './components/ApprovalQueue';
import UserManagement from './components/UserManagement';
import DepartmentManagement from './components/DepartmentManagement';
import BudgetAllocation from './components/BudgetAllocation';
import Reports from './components/Reports';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import ExpenseCategories from './components/ExpenseCategories';
import ApprovalWorkflow from './components/ApprovalWorkflow';
import AuditLogs from './components/AuditLogs';
import TaxManagement from './components/TaxManagement';
import VendorManagement from './components/VendorManagement';
import PolicyManagement from './components/PolicyManagement';
import IntegrationSettings from './components/IntegrationSettings';
import BackupRestore from './components/BackupRestore';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'department-dashboard':
        return <Dashboard />;
      case 'file-expense':
        return <FileExpense />;
      case 'pre-book':
        return <PreBookRequest />;
      case 'track-requests':
        return <TrackRequests />;
      case 'usage-tracker':
        return <UsageTracker />;
      case 'approval-queue':
        return <ApprovalQueue />;
      case 'user-management':
        return <UserManagement />;
      case 'department-management':
        return <DepartmentManagement />;
      case 'budget-allocation':
        return <BudgetAllocation />;
      case 'expense-categories':
        return <ExpenseCategories />;
      case 'approval-workflow':
        return <ApprovalWorkflow />;
      case 'audit-logs':
        return <AuditLogs />;
      case 'tax-management':
        return <TaxManagement />;
      case 'vendor-management':
        return <VendorManagement />;
      case 'policy-management':
        return <PolicyManagement />;
      case 'integration-settings':
        return <IntegrationSettings />;
      case 'backup-restore':
        return <BackupRestore />;
      case 'reports':
        return <Reports />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;