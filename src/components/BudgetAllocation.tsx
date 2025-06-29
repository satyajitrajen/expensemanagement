import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  Search, 
  Building2, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Target,
  Edit,
  Save,
  X,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const BudgetAllocation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<string | null>(null);

  // Mock budget data
  const budgetData = [
    {
      id: '1',
      department: 'Engineering',
      currentBudget: 120000,
      usedAmount: 87000,
      remainingAmount: 33000,
      lastUpdated: '2024-01-15',
      quarterlyBudgets: [30000, 30000, 30000, 30000],
      categories: {
        travel: 40000,
        food: 25000,
        equipment: 35000,
        supplies: 15000,
        training: 5000
      }
    },
    {
      id: '2',
      department: 'Marketing',
      currentBudget: 80000,
      usedAmount: 52000,
      remainingAmount: 28000,
      lastUpdated: '2024-01-12',
      quarterlyBudgets: [20000, 20000, 20000, 20000],
      categories: {
        travel: 20000,
        food: 15000,
        equipment: 25000,
        supplies: 15000,
        training: 5000
      }
    },
    {
      id: '3',
      department: 'Sales',
      currentBudget: 100000,
      usedAmount: 78000,
      remainingAmount: 22000,
      lastUpdated: '2024-01-10',
      quarterlyBudgets: [25000, 25000, 25000, 25000],
      categories: {
        travel: 50000,
        food: 20000,
        equipment: 15000,
        supplies: 10000,
        training: 5000
      }
    },
    {
      id: '4',
      department: 'Finance',
      currentBudget: 60000,
      usedAmount: 35000,
      remainingAmount: 25000,
      lastUpdated: '2024-01-08',
      quarterlyBudgets: [15000, 15000, 15000, 15000],
      categories: {
        travel: 15000,
        food: 10000,
        equipment: 20000,
        supplies: 10000,
        training: 5000
      }
    },
    {
      id: '5',
      department: 'HR',
      currentBudget: 40000,
      usedAmount: 22000,
      remainingAmount: 18000,
      lastUpdated: '2024-01-05',
      quarterlyBudgets: [10000, 10000, 10000, 10000],
      categories: {
        travel: 8000,
        food: 12000,
        equipment: 10000,
        supplies: 5000,
        training: 5000
      }
    },
    {
      id: '6',
      department: 'Operations',
      currentBudget: 80000,
      usedAmount: 61000,
      remainingAmount: 19000,
      lastUpdated: '2024-01-03',
      quarterlyBudgets: [20000, 20000, 20000, 20000],
      categories: {
        travel: 25000,
        food: 15000,
        equipment: 25000,
        supplies: 10000,
        training: 5000
      }
    }
  ];

  const filteredBudgets = budgetData.filter(budget =>
    budget.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAllocated = budgetData.reduce((sum, dept) => sum + dept.currentBudget, 0);
  const totalUsed = budgetData.reduce((sum, dept) => sum + dept.usedAmount, 0);
  const totalRemaining = budgetData.reduce((sum, dept) => sum + dept.remainingAmount, 0);

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 75) return 'text-orange-600 bg-orange-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const AllocationModal = () => {
    const [formData, setFormData] = useState({
      department: '',
      totalBudget: '',
      q1Budget: '',
      q2Budget: '',
      q3Budget: '',
      q4Budget: '',
      categories: {
        travel: '',
        food: '',
        equipment: '',
        supplies: '',
        training: ''
      }
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Budget allocation updated successfully!');
      setShowAllocationModal(false);
      setFormData({
        department: '',
        totalBudget: '',
        q1Budget: '',
        q2Budget: '',
        q3Budget: '',
        q4Budget: '',
        categories: {
          travel: '',
          food: '',
          equipment: '',
          supplies: '',
          training: ''
        }
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Allocate Department Budget</h2>
              <button
                onClick={() => setShowAllocationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Department Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">
                  Department
                </label>
                <select
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div>
                <label htmlFor="totalBudget" className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Annual Budget
                </label>
                <input
                  id="totalBudget"
                  type="number"
                  value={formData.totalBudget}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalBudget: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {/* Quarterly Budget Distribution */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quarterly Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Q1 Budget</label>
                  <input
                    type="number"
                    value={formData.q1Budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, q1Budget: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Q2 Budget</label>
                  <input
                    type="number"
                    value={formData.q2Budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, q2Budget: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Q3 Budget</label>
                  <input
                    type="number"
                    value={formData.q3Budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, q3Budget: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Q4 Budget</label>
                  <input
                    type="number"
                    value={formData.q4Budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, q4Budget: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Category Allocation */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Allocation</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(formData.categories).map(([category, value]) => (
                  <div key={category}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {category} Budget
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        categories: { ...prev.categories, [category]: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAllocationModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Allocate Budget
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Allocation</h1>
            <p className="text-gray-600">Manage and allocate budgets across departments</p>
          </div>
          <button
            onClick={() => setShowAllocationModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Allocate Budget</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Allocated</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalAllocated.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">8% increase</span>
            <span className="text-gray-500 ml-1">from last year</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Used</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalUsed.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">{((totalUsed / totalAllocated) * 100).toFixed(1)}% of total budget</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Remaining</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalRemaining.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">{((totalRemaining / totalAllocated) * 100).toFixed(1)}% available</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
        </div>
      </div>

      {/* Budget Allocation Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Allocated Budget</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Used Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Remaining</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Utilization</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Updated</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBudgets.map((budget) => {
                const utilizationPercentage = (budget.usedAmount / budget.currentBudget) * 100;
                
                return (
                  <tr key={budget.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{budget.department}</p>
                          <p className="text-sm text-gray-600">Department</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">₹{budget.currentBudget.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-red-600">₹{budget.usedAmount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-green-600">₹{budget.remainingAmount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUtilizationColor(utilizationPercentage)}`}>
                          {utilizationPercentage.toFixed(1)}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressBarColor(utilizationPercentage)}`}
                            style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{new Date(budget.lastUpdated).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setEditingDepartment(budget.id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredBudgets.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No departments found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Allocation Modal */}
      {showAllocationModal && <AllocationModal />}
    </div>
  );
};

export default BudgetAllocation;