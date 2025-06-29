import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Key,
  Globe,
  Database,
  Mail,
  Calendar,
  CreditCard,
  FileText
} from 'lucide-react';

const IntegrationSettings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddIntegration, setShowAddIntegration] = useState(false);

  // Mock integrations data
  const mockIntegrations = [
    {
      id: '1',
      name: 'Slack',
      category: 'Communication',
      description: 'Send expense notifications and approvals to Slack channels',
      status: 'connected',
      icon: '💬',
      provider: 'Slack Technologies',
      lastSync: '2024-01-20T10:30:00Z',
      apiVersion: 'v2.0',
      webhookUrl: 'https://hooks.slack.com/services/...',
      settings: {
        channel: '#expenses',
        notifications: true,
        approvalAlerts: true
      },
      features: ['Real-time notifications', 'Approval workflows', 'Status updates'],
      setupDate: '2023-12-01'
    },
    {
      id: '2',
      name: 'QuickBooks',
      category: 'Accounting',
      description: 'Sync expense data with QuickBooks for accounting',
      status: 'connected',
      icon: '📊',
      provider: 'Intuit Inc.',
      lastSync: '2024-01-20T09:15:00Z',
      apiVersion: 'v3.0',
      webhookUrl: 'https://api.quickbooks.com/webhook',
      settings: {
        autoSync: true,
        syncFrequency: 'daily',
        chartOfAccounts: 'enabled'
      },
      features: ['Automatic sync', 'Chart of accounts mapping', 'Tax reporting'],
      setupDate: '2023-11-15'
    },
    {
      id: '3',
      name: 'Microsoft Outlook',
      category: 'Email',
      description: 'Email notifications for expense approvals and updates',
      status: 'connected',
      icon: '📧',
      provider: 'Microsoft Corporation',
      lastSync: '2024-01-20T08:45:00Z',
      apiVersion: 'v1.0',
      webhookUrl: 'https://graph.microsoft.com/webhook',
      settings: {
        emailNotifications: true,
        digestFrequency: 'daily',
        approvalEmails: true
      },
      features: ['Email notifications', 'Calendar integration', 'Approval reminders'],
      setupDate: '2023-10-20'
    },
    {
      id: '4',
      name: 'Stripe',
      category: 'Payment',
      description: 'Process expense reimbursements through Stripe',
      status: 'pending',
      icon: '💳',
      provider: 'Stripe Inc.',
      lastSync: null,
      apiVersion: 'v2023-10-16',
      webhookUrl: 'https://api.stripe.com/webhook',
      settings: {
        autoReimbursement: false,
        currency: 'USD',
        paymentMethod: 'bank_transfer'
      },
      features: ['Automatic reimbursements', 'Multi-currency support', 'Payment tracking'],
      setupDate: '2024-01-15'
    },
    {
      id: '5',
      name: 'Google Calendar',
      category: 'Calendar',
      description: 'Sync travel dates and expense deadlines with Google Calendar',
      status: 'error',
      icon: '📅',
      provider: 'Google LLC',
      lastSync: '2024-01-19T16:20:00Z',
      apiVersion: 'v3',
      webhookUrl: 'https://www.googleapis.com/calendar/webhook',
      settings: {
        syncTravelDates: true,
        reminderNotifications: true,
        calendarId: 'primary'
      },
      features: ['Travel date sync', 'Deadline reminders', 'Event creation'],
      setupDate: '2023-09-10'
    },
    {
      id: '6',
      name: 'Salesforce',
      category: 'CRM',
      description: 'Link expense data with customer and project records',
      status: 'disconnected',
      icon: '☁️',
      provider: 'Salesforce Inc.',
      lastSync: '2024-01-10T12:00:00Z',
      apiVersion: 'v58.0',
      webhookUrl: 'https://api.salesforce.com/webhook',
      settings: {
        projectMapping: false,
        customerSync: false,
        opportunityTracking: false
      },
      features: ['Project mapping', 'Customer sync', 'Opportunity tracking'],
      setupDate: '2023-08-05'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'disconnected': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <XCircle className="w-4 h-4" />;
      case 'disconnected': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Communication': return <Mail className="w-5 h-5" />;
      case 'Accounting': return <FileText className="w-5 h-5" />;
      case 'Email': return <Mail className="w-5 h-5" />;
      case 'Payment': return <CreditCard className="w-5 h-5" />;
      case 'Calendar': return <Calendar className="w-5 h-5" />;
      case 'CRM': return <Database className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const filteredIntegrations = mockIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || integration.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const AddIntegrationModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      category: 'Communication',
      description: '',
      apiKey: '',
      webhookUrl: '',
      settings: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Integration added successfully!');
      setShowAddIntegration(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add New Integration</h2>
              <button
                onClick={() => setShowAddIntegration(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Integration Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Communication">Communication</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Email">Email</option>
                  <option value="Payment">Payment</option>
                  <option value="Calendar">Calendar</option>
                  <option value="CRM">CRM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Describe what this integration does..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter API key or token"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                value={formData.webhookUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, webhookUrl: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://api.example.com/webhook"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddIntegration(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Add Integration
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Integration Settings</h1>
            <p className="text-gray-600">Manage third-party integrations and API connections</p>
          </div>
          <button
            onClick={() => setShowAddIntegration(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Integration</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Integrations</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockIntegrations.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Connected</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockIntegrations.filter(i => i.status === 'connected').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockIntegrations.filter(i => i.status === 'pending').length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Issues</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockIntegrations.filter(i => i.status === 'error').length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="relative">
            <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="connected">Connected</option>
              <option value="pending">Pending</option>
              <option value="error">Error</option>
              <option value="disconnected">Disconnected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{integration.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-600">{integration.provider}</p>
                </div>
              </div>
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                {getStatusIcon(integration.status)}
                <span className="capitalize">{integration.status}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{integration.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(integration.category)}
                  <span className="text-gray-600">{integration.category}</span>
                </div>
                <span className="text-gray-900 font-mono">v{integration.apiVersion}</span>
              </div>

              {integration.lastSync && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Sync:</span>
                  <span className="text-gray-900">{new Date(integration.lastSync).toLocaleDateString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Setup Date:</span>
                <span className="text-gray-900">{new Date(integration.setupDate).toLocaleDateString()}</span>
              </div>

              {integration.features.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {integration.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                    {integration.features.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{integration.features.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-gray-100">
              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200">
                <Settings className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No integrations found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add a new integration.</p>
        </div>
      )}

      {/* Add Integration Modal */}
      {showAddIntegration && <AddIntegrationModal />}
    </div>
  );
};

export default IntegrationSettings;