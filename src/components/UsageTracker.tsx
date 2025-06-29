import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter,
  BarChart3,
  PieChart,
  Download
} from 'lucide-react';

const UsageTracker: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock budget data
  const budgetData = {
    'current-month': {
      totalBudget: 15000,
      totalSpent: 8450,
      totalPreBooked: 3200,
      categories: {
        food: { budget: 3000, spent: 1850, preBooked: 500 },
        travel: { budget: 6000, spent: 4200, preBooked: 1800 },
        supplies: { budget: 2000, spent: 1200, preBooked: 300 },
        equipment: { budget: 3000, spent: 800, preBooked: 600 },
        training: { budget: 1000, spent: 400, preBooked: 0 }
      }
    },
    'last-month': {
      totalBudget: 15000,
      totalSpent: 12300,
      totalPreBooked: 2100,
      categories: {
        food: { budget: 3000, spent: 2400, preBooked: 200 },
        travel: { budget: 6000, spent: 5800, preBooked: 1200 },
        supplies: { budget: 2000, spent: 1800, preBooked: 100 },
        equipment: { budget: 3000, spent: 2000, preBooked: 600 },
        training: { budget: 1000, spent: 300, preBooked: 0 }
      }
    },
    'ytd': {
      totalBudget: 180000,
      totalSpent: 125000,
      totalPreBooked: 15000,
      categories: {
        food: { budget: 36000, spent: 28000, preBooked: 2000 },
        travel: { budget: 72000, spent: 58000, preBooked: 8000 },
        supplies: { budget: 24000, spent: 18000, preBooked: 1500 },
        equipment: { budget: 36000, spent: 18000, preBooked: 3000 },
        training: { budget: 12000, spent: 3000, preBooked: 500 }
      }
    }
  };

  const currentData = budgetData[selectedPeriod as keyof typeof budgetData];
  const availableBudget = currentData.totalBudget - currentData.totalSpent - currentData.totalPreBooked;
  const usagePercentage = ((currentData.totalSpent + currentData.totalPreBooked) / currentData.totalBudget) * 100;

  const categoryLabels = {
    food: { name: 'Food & Beverages', icon: '🍽️', color: 'bg-green-500' },
    travel: { name: 'Travel & Transport', icon: '✈️', color: 'bg-blue-500' },
    supplies: { name: 'Office Supplies', icon: '📦', color: 'bg-purple-500' },
    equipment: { name: 'Equipment', icon: '💻', color: 'bg-orange-500' },
    training: { name: 'Training & Development', icon: '📚', color: 'bg-indigo-500' }
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Usage Tracker</h1>
        <p className="text-gray-600">Monitor budget consumption and pre-booked allocations</p>
      </div>

      {/* Period and Category Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Time Period</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 appearance-none"
              >
                <option value="current-month">Current Month</option>
                <option value="last-month">Last Month</option>
                <option value="ytd">Year to Date</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category Filter</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 appearance-none"
              >
                <option value="all">All Categories</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{currentData.totalBudget.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Amount Spent</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{currentData.totalSpent.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentData.totalSpent / currentData.totalBudget) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pre-Booked</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{currentData.totalPreBooked.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentData.totalPreBooked / currentData.totalBudget) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Available</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{availableBudget.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className={`text-sm font-medium ${getUsageColor(usagePercentage)}`}>
              {usagePercentage.toFixed(1)}% utilized
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Category Breakdown</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Spent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Pre-booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Available</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(currentData.categories)
            .filter(([key]) => selectedCategory === 'all' || selectedCategory === key)
            .map(([key, data]) => {
              const label = categoryLabels[key as keyof typeof categoryLabels];
              const totalUsed = data.spent + data.preBooked;
              const available = data.budget - totalUsed;
              const usagePercent = (totalUsed / data.budget) * 100;
              
              return (
                <div key={key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{label.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{label.name}</h3>
                        <p className="text-sm text-gray-600">
                          ₹{totalUsed.toLocaleString()} of ₹{data.budget.toLocaleString()} used
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getUsageColor(usagePercent)}`}>
                        {usagePercent.toFixed(1)}%
                      </p>
                      <p className="text-sm text-gray-600">
                        ₹{available.toLocaleString()} available
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="flex h-4 rounded-full overflow-hidden">
                        <div 
                          className="bg-red-500 transition-all duration-300"
                          style={{ width: `${(data.spent / data.budget) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-orange-500 transition-all duration-300"
                          style={{ width: `${(data.preBooked / data.budget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-red-600">₹{data.spent.toLocaleString()}</p>
                      <p className="text-gray-600">Spent</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-orange-600">₹{data.preBooked.toLocaleString()}</p>
                      <p className="text-gray-600">Pre-booked</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-green-600">₹{available.toLocaleString()}</p>
                      <p className="text-gray-600">Available</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UsageTracker;