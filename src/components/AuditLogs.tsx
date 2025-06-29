import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Calendar, 
  User,
  FileText,
  Eye,
  Download,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [dateRange, setDateRange] = useState('last-7-days');

  // Mock audit logs data
  const mockLogs = [
    {
      id: '1',
      timestamp: '2024-01-20T14:30:00Z',
      user: 'john.doe',
      userFullName: 'John Doe',
      action: 'expense_submitted',
      resource: 'Expense Request',
      resourceId: 'REQ-001',
      details: 'Submitted expense request for $420.00 (Travel)',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'info',
      department: 'Engineering'
    },
    {
      id: '2',
      timestamp: '2024-01-20T14:25:00Z',
      user: 'jane.smith',
      userFullName: 'Jane Smith',
      action: 'expense_approved',
      resource: 'Expense Request',
      resourceId: 'REQ-002',
      details: 'Approved expense request for $85.50 (Food)',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      severity: 'info',
      department: 'Engineering'
    },
    {
      id: '3',
      timestamp: '2024-01-20T14:20:00Z',
      user: 'admin',
      userFullName: 'System Administrator',
      action: 'user_created',
      resource: 'User Account',
      resourceId: 'user-123',
      details: 'Created new user account for Sarah Johnson',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'warning',
      department: 'IT'
    },
    {
      id: '4',
      timestamp: '2024-01-20T14:15:00Z',
      user: 'mike.wilson',
      userFullName: 'Mike Wilson',
      action: 'budget_allocated',
      resource: 'Budget',
      resourceId: 'budget-eng-2024',
      details: 'Allocated $120,000 budget to Engineering department',
      ipAddress: '192.168.1.103',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'warning',
      department: 'Finance'
    },
    {
      id: '5',
      timestamp: '2024-01-20T14:10:00Z',
      user: 'john.doe',
      userFullName: 'John Doe',
      action: 'login_failed',
      resource: 'Authentication',
      resourceId: 'auth-attempt-456',
      details: 'Failed login attempt - incorrect password',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'error',
      department: 'Engineering'
    },
    {
      id: '6',
      timestamp: '2024-01-20T14:05:00Z',
      user: 'sarah.davis',
      userFullName: 'Sarah Davis',
      action: 'expense_rejected',
      resource: 'Expense Request',
      resourceId: 'REQ-003',
      details: 'Rejected expense request for $1,200.00 (Equipment) - Budget not available',
      ipAddress: '192.168.1.104',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      severity: 'warning',
      department: 'Marketing'
    },
    {
      id: '7',
      timestamp: '2024-01-20T14:00:00Z',
      user: 'admin',
      userFullName: 'System Administrator',
      action: 'settings_updated',
      resource: 'System Settings',
      resourceId: 'settings-approval',
      details: 'Updated approval workflow settings',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'info',
      department: 'IT'
    },
    {
      id: '8',
      timestamp: '2024-01-20T13:55:00Z',
      user: 'robert.johnson',
      userFullName: 'Robert Johnson',
      action: 'department_created',
      resource: 'Department',
      resourceId: 'dept-ops',
      details: 'Created new department: Operations',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'info',
      department: 'Sales'
    }
  ];

  const getActionIcon = (action: string) => {
    if (action.includes('login') || action.includes('auth')) return <Shield className="w-4 h-4" />;
    if (action.includes('expense')) return <FileText className="w-4 h-4" />;
    if (action.includes('user') || action.includes('department')) return <User className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <XCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  };

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resourceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action.includes(actionFilter);
    const matchesUser = userFilter === 'all' || log.user === userFilter;
    
    return matchesSearch && matchesAction && matchesUser;
  });

  const exportLogs = () => {
    alert('Exporting audit logs...');
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Audit Logs</h1>
            <p className="text-gray-600">Monitor system activities and security events</p>
          </div>
          <button
            onClick={exportLogs}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Events</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockLogs.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Security Events</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mockLogs.filter(log => log.action.includes('login') || log.action.includes('auth')).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">User Actions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mockLogs.filter(log => log.action.includes('expense') || log.action.includes('user')).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">System Changes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mockLogs.filter(log => log.action.includes('settings') || log.action.includes('department')).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="all">All Actions</option>
              <option value="expense">Expense Actions</option>
              <option value="login">Authentication</option>
              <option value="user">User Management</option>
              <option value="settings">System Settings</option>
            </select>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="all">All Users</option>
              <option value="john.doe">John Doe</option>
              <option value="jane.smith">Jane Smith</option>
              <option value="admin">Administrator</option>
              <option value="mike.wilson">Mike Wilson</option>
            </select>
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-90-days">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredLogs.length}</span> of <span className="font-semibold">{mockLogs.length}</span> log entries
        </p>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Timestamp</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Resource</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Details</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Severity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => {
                const { date, time } = formatTimestamp(log.timestamp);
                
                return (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{date}</p>
                        <p className="text-sm text-gray-600">{time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{log.userFullName}</p>
                        <p className="text-sm text-gray-600">{log.department}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getActionIcon(log.action)}
                        <span className="font-medium text-gray-900 capitalize">
                          {log.action.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{log.resource}</p>
                        <p className="text-sm text-gray-600 font-mono">{log.resourceId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 max-w-xs truncate" title={log.details}>
                        {log.details}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(log.severity)}`}>
                        {getSeverityIcon(log.severity)}
                        <span className="capitalize">{log.severity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No audit logs found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;