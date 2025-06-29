import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users,
  DollarSign,
  TrendingUp,
  User,
  Grid3X3,
  List
} from 'lucide-react';

const DepartmentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  // Mock departments data
  const mockDepartments = [
    {
      id: '1',
      name: 'Engineering',
      head: 'Jane Smith',
      headId: '2',
      budget: 120000,
      spent: 45000,
      employees: 24,
      isActive: true,
      createdAt: '2024-01-01',
      description: 'Software development and technical operations'
    },
    {
      id: '2',
      name: 'Marketing',
      head: 'Sarah Davis',
      headId: '5',
      budget: 80000,
      spent: 32000,
      employees: 12,
      isActive: true,
      createdAt: '2024-01-01',
      description: 'Brand management and customer acquisition'
    },
    {
      id: '3',
      name: 'Sales',
      head: 'Robert Johnson',
      headId: '6',
      budget: 100000,
      spent: 68000,
      employees: 18,
      isActive: true,
      createdAt: '2024-01-01',
      description: 'Revenue generation and client relationships'
    },
    {
      id: '4',
      name: 'Finance',
      head: 'Mike Wilson',
      headId: '3',
      budget: 60000,
      spent: 25000,
      employees: 8,
      isActive: true,
      createdAt: '2024-01-01',
      description: 'Financial planning and accounting operations'
    },
    {
      id: '5',
      name: 'HR',
      head: 'Lisa Brown',
      headId: '7',
      budget: 40000,
      spent: 15000,
      employees: 6,
      isActive: true,
      createdAt: '2024-01-01',
      description: 'Human resources and employee relations'
    },
    {
      id: '6',
      name: 'Operations',
      head: 'David Lee',
      headId: '8',
      budget: 90000,
      spent: 42000,
      employees: 15,
      isActive: false,
      createdAt: '2023-12-01',
      description: 'Business operations and process management'
    }
  ];

  // Mock potential department heads (users with approver/admin roles)
  const potentialHeads = [
    { id: '2', name: 'Jane Smith', role: 'approver' },
    { id: '3', name: 'Mike Wilson', role: 'accounts' },
    { id: '5', name: 'Sarah Davis', role: 'approver' },
    { id: '6', name: 'Robert Johnson', role: 'approver' },
    { id: '7', name: 'Lisa Brown', role: 'approver' },
    { id: '8', name: 'David Lee', role: 'approver' }
  ];

  const filteredDepartments = mockDepartments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBudget = mockDepartments.reduce((sum, dept) => sum + dept.budget, 0);
  const totalSpent = mockDepartments.reduce((sum, dept) => sum + dept.spent, 0);
  const totalEmployees = mockDepartments.reduce((sum, dept) => sum + dept.employees, 0);
  const activeDepartments = mockDepartments.filter(dept => dept.isActive).length;

  const AddDepartmentModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      head: '',
      budget: '',
      description: '',
      isActive: true
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Department created successfully!');
      setShowAddDepartment(false);
      setFormData({
        name: '',
        head: '',
        budget: '',
        description: '',
        isActive: true
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add New Department</h2>
              <button
                onClick={() => setShowAddDepartment(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Department Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="head" className="block text-sm font-semibold text-gray-700 mb-2">
                  Department Head
                </label>
                <select
                  id="head"
                  value={formData.head}
                  onChange={(e) => setFormData(prev => ({ ...prev, head: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Department Head</option>
                  {potentialHeads.map((head) => (
                    <option key={head.id} value={head.id}>
                      {head.name} ({head.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                  Annual Budget
                </label>
                <input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Brief description of the department's role and responsibilities..."
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                id="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Active Department
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddDepartment(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Create Department
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const GridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {filteredDepartments.map((department) => {
        const budgetUsed = (department.spent / department.budget) * 100;
        const remaining = department.budget - department.spent;

        return (
          <div key={department.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{department.name}</h3>
                  <p className="text-sm text-gray-600">{department.description}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                department.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
              }`}>
                {department.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Department Head</span>
                </div>
                <p className="font-semibold text-gray-900">{department.head}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Employees</span>
                </div>
                <p className="font-semibold text-gray-900">{department.employees}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Budget Usage</span>
                  <span className="text-sm text-gray-600">{budgetUsed.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      budgetUsed >= 90 ? 'bg-red-500' :
                      budgetUsed >= 75 ? 'bg-orange-500' :
                      budgetUsed >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-semibold text-gray-900">${department.budget.toLocaleString()}</p>
                  <p className="text-gray-600">Total Budget</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-red-600">${department.spent.toLocaleString()}</p>
                  <p className="text-gray-600">Spent</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-600">${remaining.toLocaleString()}</p>
                  <p className="text-gray-600">Remaining</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-gray-200">
              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  const ListView = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Head</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Employees</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Budget</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Spent</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Usage</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDepartments.map((department) => {
              const budgetUsed = (department.spent / department.budget) * 100;
              
              return (
                <tr key={department.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{department.name}</p>
                        <p className="text-sm text-gray-600 truncate max-w-xs">{department.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{department.head}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{department.employees}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">${department.budget.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-red-600">${department.spent.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-gray-900">{budgetUsed.toFixed(1)}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            budgetUsed >= 90 ? 'bg-red-500' :
                            budgetUsed >= 75 ? 'bg-orange-500' :
                            budgetUsed >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      department.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    }`}>
                      {department.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Department Management</h1>
            <p className="text-gray-600">Manage organizational departments and their budgets</p>
          </div>
          <button
            onClick={() => setShowAddDepartment(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Department</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Departments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockDepartments.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Departments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{activeDepartments}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${totalBudget.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalEmployees}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and View Toggle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* View Toggle */}
          <div className="ml-4">
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
          Showing <span className="font-semibold">{filteredDepartments.length}</span> of <span className="font-semibold">{mockDepartments.length}</span> departments
        </p>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'grid' ? <GridView /> : <ListView />}

      {filteredDepartments.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No departments found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add a new department.</p>
        </div>
      )}

      {/* Add Department Modal */}
      {showAddDepartment && <AddDepartmentModal />}
    </div>
  );
};

export default DepartmentManagement;