import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  DollarSign, 
  FileText, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  Users,
  Building2,
  ArrowUpRight,
  Target,
  CreditCard,
  PieChart,
  BarChart3,
  Activity,
  Award,
  TrendingDown,
  Plus
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderRequestorDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.fullName}!</h1>
            <p className="text-blue-100">Here's your expense overview for January 2024</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Current Period</p>
            <p className="text-lg font-semibold">January 2024</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹2,847</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">12% increase</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">2 awaiting first approval</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Approved This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">Worth ₹1,890 total</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Budget Used</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">68%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h3>
          <div className="space-y-4">
            {[
              { id: 1, type: 'Travel', amount: '₹420', status: 'pending', date: 'Jan 15' },
              { id: 2, type: 'Food', amount: '₹85', status: 'approved', date: 'Jan 14' },
              { id: 3, type: 'Supplies', amount: '₹240', status: 'rejected', date: 'Jan 12' }
            ].map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    request.status === 'approved' ? 'bg-green-500' :
                    request.status === 'rejected' ? 'bg-red-500' : 'bg-orange-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{request.type}</p>
                    <p className="text-sm text-gray-600">{request.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{request.amount}</p>
                  <p className={`text-sm capitalize ${
                    request.status === 'approved' ? 'text-green-600' :
                    request.status === 'rejected' ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {request.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
          <div className="space-y-4">
            {[
              { category: 'Travel', amount: '₹1,240', percentage: 45, color: 'bg-blue-500' },
              { category: 'Food', amount: '₹680', percentage: 25, color: 'bg-green-500' },
              { category: 'Supplies', amount: '₹540', percentage: 20, color: 'bg-purple-500' },
              { category: 'Equipment', amount: '₹387', percentage: 10, color: 'bg-orange-500' }
            ].map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{item.category}</span>
                  <span className="text-sm text-gray-600">{item.amount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDepartmentDashboard = () => (
    <div className="space-y-6">
      {/* Department Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">{user?.department} Department</h1>
            <p className="text-indigo-100">Department expense overview and analytics</p>
          </div>
        </div>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹50,000</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Spent This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹12,450</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">7</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Team Members</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountsDashboard = () => (
    <div className="space-y-6">
      {/* Accounts Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Accounts Dashboard</h1>
            <p className="text-green-100">Financial oversight and budget management</p>
          </div>
          <div className="text-right">
            <p className="text-green-100 text-sm">Processing Queue</p>
            <p className="text-lg font-semibold">7 Pending</p>
          </div>
        </div>
      </div>

      {/* Accounts Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Budget Allocated</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹480K</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">Across all departments</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Processed This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹45,200</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">8% increase</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending Final Approval</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">7</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-gray-600">Worth ₹8,450 total</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Budget Utilization</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">73%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '73%' }}></div>
          </div>
        </div>
      </div>

      {/* Budget Allocation Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Budget Allocation</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Allocate Budget</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { department: 'Engineering', allocated: 120000, used: 87000, percentage: 73 },
              { department: 'Marketing', allocated: 80000, used: 52000, percentage: 65 },
              { department: 'Sales', allocated: 100000, used: 78000, percentage: 78 },
              { department: 'Finance', allocated: 60000, used: 35000, percentage: 58 },
              { department: 'HR', allocated: 40000, used: 22000, percentage: 55 },
              { department: 'Operations', allocated: 80000, used: 61000, percentage: 76 }
            ].map((dept) => (
              <div key={dept.department} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{dept.department}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      ₹{dept.used.toLocaleString()} / ₹{dept.allocated.toLocaleString()}
                    </span>
                    <p className="text-xs text-gray-500">{dept.percentage}% used</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      dept.percentage >= 90 ? 'bg-red-500' :
                      dept.percentage >= 75 ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Financial Activity</h3>
          <div className="space-y-4">
            {[
              { 
                action: 'Budget Allocated', 
                department: 'Engineering', 
                amount: '₹5,000', 
                time: '2 hours ago',
                type: 'allocation'
              },
              { 
                action: 'Expense Processed', 
                department: 'Marketing', 
                amount: '₹1,250', 
                time: '4 hours ago',
                type: 'expense'
              },
              { 
                action: 'Budget Adjusted', 
                department: 'Sales', 
                amount: '₹3,000', 
                time: '1 day ago',
                type: 'adjustment'
              },
              { 
                action: 'Expense Approved', 
                department: 'Finance', 
                amount: '₹850', 
                time: '1 day ago',
                type: 'expense'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'allocation' ? 'bg-blue-500' :
                    activity.type === 'adjustment' ? 'bg-orange-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{activity.amount}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Budget Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Budget Overview</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Allocated</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Used</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-2 h-32 items-end">
          {[
            { allocated: 40000, used: 32000 },
            { allocated: 40000, used: 35000 },
            { allocated: 40000, used: 28000 },
            { allocated: 40000, used: 42000 },
            { allocated: 40000, used: 38000 },
            { allocated: 40000, used: 41000 },
            { allocated: 40000, used: 33000 },
            { allocated: 40000, used: 37000 },
            { allocated: 40000, used: 44000 },
            { allocated: 40000, used: 39000 },
            { allocated: 40000, used: 45200 },
            { allocated: 40000, used: 0 }
          ].map((data, index) => {
            const allocatedHeight = (data.allocated / 50000) * 100;
            const usedHeight = (data.used / 50000) * 100;
            return (
              <div key={index} className="flex flex-col items-center space-y-1">
                <div className="w-full relative" style={{ height: '100px' }}>
                  <div 
                    className="w-full bg-blue-200 rounded-t-sm absolute bottom-0"
                    style={{ height: `${allocatedHeight}%` }}
                  ></div>
                  <div 
                    className="w-full bg-green-500 rounded-t-sm absolute bottom-0"
                    style={{ height: `${usedHeight}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">System Overview</h1>
            <p className="text-purple-100">Complete administrative dashboard</p>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Departments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Expenses YTD</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹245K</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">System Alerts</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const getDashboardContent = () => {
    switch (user?.role) {
      case 'requestor':
        return renderRequestorDashboard();
      case 'approver':
        return renderDepartmentDashboard();
      case 'accounts':
        return renderAccountsDashboard();
      case 'admin':
        return renderAdminDashboard();
      default:
        return renderRequestorDashboard();
    }
  };

  return getDashboardContent();
};

export default Dashboard;