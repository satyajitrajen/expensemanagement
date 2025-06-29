import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart3, 
  Download, 
  Filter, 
  Calendar, 
  FileText,
  DollarSign,
  TrendingUp,
  Users,
  Building2,
  PieChart
} from 'lucide-react';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState('expense-summary');
  const [dateRange, setDateRange] = useState('current-month');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const reportTypes = [
    { id: 'expense-summary', name: 'Expense Summary', description: 'Overview of all expenses by category and department' },
    { id: 'department-analysis', name: 'Department Analysis', description: 'Detailed breakdown by department' },
    { id: 'user-activity', name: 'User Activity', description: 'Individual user expense patterns' },
    { id: 'approval-metrics', name: 'Approval Metrics', description: 'Approval times and patterns' },
    { id: 'budget-utilization', name: 'Budget Utilization', description: 'Budget vs actual spending analysis' },
    { id: 'trend-analysis', name: 'Trend Analysis', description: 'Spending trends over time' }
  ];

  const departments = ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations'];
  const categories = ['Food', 'Travel', 'Supplies', 'Equipment', 'Training', 'Other'];

  // Mock report data
  const mockReportData = {
    'expense-summary': {
      totalExpenses: 125000,
      totalRequests: 342,
      averageAmount: 365,
      topCategory: 'Travel',
      categoryBreakdown: [
        { category: 'Travel', amount: 45000, percentage: 36, requests: 89 },
        { category: 'Food', amount: 28000, percentage: 22, requests: 156 },
        { category: 'Equipment', amount: 25000, percentage: 20, requests: 34 },
        { category: 'Supplies', amount: 18000, percentage: 14, requests: 45 },
        { category: 'Training', amount: 9000, percentage: 7, requests: 18 }
      ],
      departmentBreakdown: [
        { department: 'Engineering', amount: 52000, percentage: 42, requests: 145 },
        { department: 'Sales', amount: 31000, percentage: 25, requests: 89 },
        { department: 'Marketing', amount: 24000, percentage: 19, requests: 67 },
        { department: 'Finance', amount: 18000, percentage: 14, requests: 41 }
      ]
    }
  };

  const currentData = mockReportData[selectedReport as keyof typeof mockReportData] || mockReportData['expense-summary'];

  const exportReport = (format: 'excel' | 'pdf') => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  const ExpenseSummaryReport = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{currentData.totalExpenses.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{currentData.totalRequests}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Average Amount</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹{currentData.averageAmount}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Top Category</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{currentData.topCategory}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <PieChart className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Expenses by Category</h3>
        <div className="space-y-4">
          {currentData.categoryBreakdown.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900">{item.category}</span>
                  <span className="text-sm text-gray-600">({item.requests} requests)</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-900">₹{item.amount.toLocaleString()}</span>
                  <span className="text-sm text-gray-600 ml-2">({item.percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Expenses by Department</h3>
        <div className="space-y-4">
          {currentData.departmentBreakdown.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900">{item.department}</span>
                  <span className="text-sm text-gray-600">({item.requests} requests)</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-gray-900">₹{item.amount.toLocaleString()}</span>
                  <span className="text-sm text-gray-600 ml-2">({item.percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PlaceholderReport = ({ title }: { title: string }) => (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 p-12 text-center">
      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">This report will show detailed {title.toLowerCase()} with interactive charts and data visualization.</p>
    </div>
  );

  const renderReport = () => {
    switch (selectedReport) {
      case 'expense-summary':
        return <ExpenseSummaryReport />;
      case 'department-analysis':
        return <PlaceholderReport title="Department Analysis" />;
      case 'user-activity':
        return <PlaceholderReport title="User Activity Report" />;
      case 'approval-metrics':
        return <PlaceholderReport title="Approval Metrics" />;
      case 'budget-utilization':
        return <PlaceholderReport title="Budget Utilization Report" />;
      case 'trend-analysis':
        return <PlaceholderReport title="Trend Analysis" />;
      default:
        return <ExpenseSummaryReport />;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports Dashboard</h1>
        <p className="text-gray-600">Generate comprehensive reports and analytics</p>
      </div>

      {/* Report Selection and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 mb-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Report Type</label>
            <div className="space-y-2">
              {reportTypes.map((report) => (
                <label key={report.id} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="reportType"
                    value={report.id}
                    checked={selectedReport === report.id}
                    onChange={(e) => setSelectedReport(e.target.value)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 appearance-none"
                >
                  <option value="current-month">Current Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="current-quarter">Current Quarter</option>
                  <option value="last-quarter">Last Quarter</option>
                  <option value="current-year">Current Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 appearance-none"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 appearance-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Export Options</label>
              <div className="flex space-x-3">
                <button
                  onClick={() => exportReport('excel')}
                  className="flex-1 px-4 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Excel</span>
                </button>
                <button
                  onClick={() => exportReport('pdf')}
                  className="flex-1 px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {reportTypes.find(r => r.id === selectedReport)?.name}
          </h2>
          <div className="text-sm text-gray-600">
            Generated on {new Date().toLocaleDateString()}
          </div>
        </div>

        {renderReport()}
      </div>
    </div>
  );
};

export default Reports;