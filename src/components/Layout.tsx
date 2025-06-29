import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  FileText, 
  Clock, 
  CheckSquare, 
  Users, 
  Building2, 
  BarChart3, 
  Bell, 
  Settings,
  LogOut,
  Menu,
  X,
  DollarSign,
  Calendar,
  CreditCard,
  Tag,
  GitBranch,
  Shield,
  Receipt,
  Briefcase,
  FileCheck,
  Zap,
  Database,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['management', 'system']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const getMenuItems = () => {
    const baseItems = [
      { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['requestor', 'approver', 'accounts', 'admin'] },
      { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['requestor', 'approver', 'accounts', 'admin'] }
    ];

    const roleSpecificItems = {
      requestor: [
        { id: 'dashboard', label: 'My Dashboard', icon: Home },
        { id: 'file-expense', label: 'File Expense', icon: FileText },
        { id: 'pre-book', label: 'Pre-Book Request', icon: Calendar },
        { id: 'track-requests', label: 'Track My Requests', icon: Clock },
        { id: 'usage-tracker', label: 'Budget Usage', icon: DollarSign }
      ],
      approver: [
        { id: 'department-dashboard', label: 'Department Dashboard', icon: Home },
        { id: 'approval-queue', label: 'Approval Queue', icon: CheckSquare },
        { id: 'usage-tracker', label: 'Budget Usage', icon: DollarSign }
      ],
      accounts: [
        { id: 'department-dashboard', label: 'Accounts Dashboard', icon: Home },
        { id: 'approval-queue', label: 'Final Approvals', icon: CheckSquare },
        { id: 'budget-allocation', label: 'Budget Allocation', icon: CreditCard },
        { id: 'usage-tracker', label: 'Budget Usage', icon: DollarSign },
        { id: 'tax-management', label: 'Tax Management', icon: Receipt },
        { id: 'vendor-management', label: 'Vendor Management', icon: Briefcase }
      ],
      admin: [
        { id: 'dashboard', label: 'Admin Dashboard', icon: Home },
        {
          id: 'management',
          label: 'Management',
          icon: Building2,
          isGroup: true,
          children: [
            { id: 'user-management', label: 'User Management', icon: Users },
            { id: 'department-management', label: 'Departments', icon: Building2 },
            { id: 'budget-allocation', label: 'Budget Allocation', icon: CreditCard },
            { id: 'expense-categories', label: 'Expense Categories', icon: Tag },
            { id: 'vendor-management', label: 'Vendor Management', icon: Briefcase }
          ]
        },
        {
          id: 'system',
          label: 'System',
          icon: Settings,
          isGroup: true,
          children: [
            { id: 'approval-workflow', label: 'Approval Workflow', icon: GitBranch },
            { id: 'policy-management', label: 'Policy Management', icon: FileCheck },
            { id: 'tax-management', label: 'Tax Management', icon: Receipt },
            { id: 'audit-logs', label: 'Audit Logs', icon: Shield },
            { id: 'integration-settings', label: 'Integrations', icon: Zap },
            { id: 'backup-restore', label: 'Backup & Restore', icon: Database },
            { id: 'settings', label: 'System Settings', icon: Settings }
          ]
        },
        { id: 'track-requests', label: 'All Requests', icon: Clock }
      ]
    };

    return [...(roleSpecificItems[user?.role || 'requestor'] || []), ...baseItems];
  };

  const handleLogout = () => {
    logout();
  };

  const renderMenuItem = (item: any, level = 0) => {
    const Icon = item.icon;
    const isExpanded = expandedMenus.includes(item.id);
    const paddingLeft = level === 0 ? 'pl-4' : 'pl-8';

    if (item.isGroup) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleMenu(item.id)}
            className={`w-full flex items-center justify-between ${paddingLeft} pr-4 py-3 rounded-xl text-left transition-all duration-200 text-gray-700 hover:bg-white/60 hover:shadow-md`}
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {isExpanded && (
            <div className="mt-1 space-y-1">
              {item.children?.map((child: any) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <li key={item.id}>
        <button
          onClick={() => {
            onPageChange(item.id);
            setSidebarOpen(false);
          }}
          className={`w-full flex items-center space-x-3 ${paddingLeft} pr-4 py-3 rounded-xl text-left transition-all duration-200 ${
            currentPage === item.id
              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
              : 'text-gray-700 hover:bg-white/60 hover:shadow-md'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
        </button>
      </li>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ExpenseFlow
              </h1>
              <p className="text-sm text-gray-600 capitalize">{user?.role} Portal</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {getMenuItems().map((item) => renderMenuItem(item))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
              {user?.fullName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.fullName}</p>
              <p className="text-xs text-gray-600 truncate">{user?.department}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;