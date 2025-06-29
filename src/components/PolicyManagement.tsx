import React, { useState } from 'react';
import { 
  FileCheck, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Grid3X3,
  List,
  Calendar,
  User,
  Building2,
  AlertTriangle,
  CheckCircle,
  Download,
  Upload
} from 'lucide-react';

const PolicyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddPolicy, setShowAddPolicy] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Mock policies data
  const mockPolicies = [
    {
      id: '1',
      title: 'Expense Reimbursement Policy',
      category: 'Financial',
      description: 'Guidelines for submitting and processing expense reimbursements',
      version: '2.1',
      status: 'active',
      effectiveDate: '2024-01-01',
      lastUpdated: '2024-01-15',
      updatedBy: 'Admin',
      approvedBy: 'CFO',
      department: 'All',
      content: 'This policy outlines the procedures for expense reimbursement...',
      attachments: ['expense-policy-v2.1.pdf'],
      tags: ['expenses', 'reimbursement', 'financial']
    },
    {
      id: '2',
      title: 'Travel Policy',
      category: 'Travel',
      description: 'Corporate travel guidelines and approval procedures',
      version: '1.5',
      status: 'active',
      effectiveDate: '2024-01-01',
      lastUpdated: '2023-12-20',
      updatedBy: 'HR Manager',
      approvedBy: 'CEO',
      department: 'All',
      content: 'This policy covers all aspects of business travel...',
      attachments: ['travel-policy-v1.5.pdf', 'travel-booking-guide.pdf'],
      tags: ['travel', 'booking', 'approval']
    },
    {
      id: '3',
      title: 'Equipment Purchase Policy',
      category: 'Procurement',
      description: 'Guidelines for purchasing office equipment and technology',
      version: '1.2',
      status: 'active',
      effectiveDate: '2023-07-01',
      lastUpdated: '2023-11-10',
      updatedBy: 'IT Manager',
      approvedBy: 'COO',
      department: 'All',
      content: 'This policy defines the process for equipment procurement...',
      attachments: ['equipment-policy-v1.2.pdf'],
      tags: ['equipment', 'procurement', 'technology']
    },
    {
      id: '4',
      title: 'Entertainment and Meals Policy',
      category: 'Financial',
      description: 'Guidelines for business entertainment and meal expenses',
      version: '1.0',
      status: 'draft',
      effectiveDate: '2024-02-01',
      lastUpdated: '2024-01-10',
      updatedBy: 'Finance Team',
      approvedBy: 'Pending',
      department: 'Sales',
      content: 'This policy covers business entertainment expenses...',
      attachments: [],
      tags: ['entertainment', 'meals', 'business']
    },
    {
      id: '5',
      title: 'Training and Development Policy',
      category: 'HR',
      description: 'Policy for employee training and professional development',
      version: '2.0',
      status: 'active',
      effectiveDate: '2023-01-01',
      lastUpdated: '2023-12-01',
      updatedBy: 'HR Director',
      approvedBy: 'CEO',
      department: 'All',
      content: 'This policy outlines training and development procedures...',
      attachments: ['training-policy-v2.0.pdf', 'development-guidelines.pdf'],
      tags: ['training', 'development', 'hr']
    },
    {
      id: '6',
      title: 'Petty Cash Policy',
      category: 'Financial',
      description: 'Guidelines for petty cash management and usage',
      version: '1.1',
      status: 'archived',
      effectiveDate: '2022-01-01',
      lastUpdated: '2023-06-15',
      updatedBy: 'Accounts Team',
      approvedBy: 'CFO',
      department: 'Finance',
      content: 'This policy covers petty cash procedures...',
      attachments: ['petty-cash-policy-v1.1.pdf'],
      tags: ['petty cash', 'finance', 'procedures']
    }
  ];

  const categories = ['Financial', 'Travel', 'Procurement', 'HR', 'IT', 'Legal'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-orange-600 bg-orange-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || policy.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const AddPolicyModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      category: 'Financial',
      description: '',
      department: 'All',
      effectiveDate: '',
      content: '',
      tags: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Policy created successfully!');
      setShowAddPolicy(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create New Policy</h2>
              <button
                onClick={() => setShowAddPolicy(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Policy Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
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
                placeholder="Brief description of the policy..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Effective Date
                </label>
                <input
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, effectiveDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Policy Content
              </label>
              <textarea
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter the detailed policy content..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., expenses, travel, approval"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddPolicy(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Create Policy
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPolicies.map((policy) => (
        <div key={policy.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">{policy.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{policy.description}</p>
            </div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
              {policy.status}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium text-gray-900">{policy.category}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Version:</span>
              <span className="font-medium text-gray-900">v{policy.version}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Department:</span>
              <span className="font-medium text-gray-900">{policy.department}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Effective:</span>
              <span className="text-gray-900">{new Date(policy.effectiveDate).toLocaleDateString()}</span>
            </div>

            {policy.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {policy.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {policy.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{policy.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
            <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Policy</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Version</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Effective Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPolicies.map((policy) => (
              <tr key={policy.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">{policy.title}</p>
                    <p className="text-sm text-gray-600 truncate max-w-xs">{policy.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{policy.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-gray-900">v{policy.version}</span>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(policy.status)}`}>
                    {policy.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{policy.department}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{new Date(policy.effectiveDate).toLocaleDateString()}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Policy Management</h1>
            <p className="text-gray-600">Manage company policies and procedures</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Import Policy</span>
            </button>
            <button
              onClick={() => setShowAddPolicy(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Policy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Policies</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockPolicies.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Policies</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockPolicies.filter(p => p.status === 'active').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Draft Policies</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockPolicies.filter(p => p.status === 'draft').length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Categories</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{categories.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-end">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="text-sm font-medium">List</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="text-sm font-medium">Grid</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredPolicies.length}</span> of <span className="font-semibold">{mockPolicies.length}</span> policies
        </p>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'grid' ? <GridView /> : <ListView />}

      {filteredPolicies.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FileCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No policies found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add a new policy.</p>
        </div>
      )}

      {/* Add Policy Modal */}
      {showAddPolicy && <AddPolicyModal />}
    </div>
  );
};

export default PolicyManagement;