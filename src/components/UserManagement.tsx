import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  UserCheck,
  UserX,
  Building2,
  Mail,
  Calendar,
  Grid3X3,
  List
} from 'lucide-react';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Mock users data
  const mockUsers = [
    {
      id: '1',
      username: 'john.doe',
      email: 'john.doe@company.com',
      fullName: 'John Doe',
      role: 'requestor',
      department: 'Engineering',
      isActive: true,
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20'
    },
    {
      id: '2',
      username: 'jane.smith',
      email: 'jane.smith@company.com',
      fullName: 'Jane Smith',
      role: 'approver',
      department: 'Engineering',
      isActive: true,
      createdAt: '2024-01-10',
      lastLogin: '2024-01-19'
    },
    {
      id: '3',
      username: 'mike.wilson',
      email: 'mike.wilson@company.com',
      fullName: 'Mike Wilson',
      role: 'accounts',
      department: 'Finance',
      isActive: true,
      createdAt: '2024-01-05',
      lastLogin: '2024-01-18'
    },
    {
      id: '4',
      username: 'admin',
      email: 'admin@company.com',
      fullName: 'System Administrator',
      role: 'admin',
      department: 'IT',
      isActive: true,
      createdAt: '2024-01-01',
      lastLogin: '2024-01-20'
    },
    {
      id: '5',
      username: 'sarah.davis',
      email: 'sarah.davis@company.com',
      fullName: 'Sarah Davis',
      role: 'requestor',
      department: 'Marketing',
      isActive: false,
      createdAt: '2023-12-20',
      lastLogin: '2024-01-10'
    },
    {
      id: '6',
      username: 'robert.johnson',
      email: 'robert.johnson@company.com',
      fullName: 'Robert Johnson',
      role: 'approver',
      department: 'Sales',
      isActive: true,
      createdAt: '2023-12-15',
      lastLogin: '2024-01-19'
    },
    {
      id: '7',
      username: 'lisa.brown',
      email: 'lisa.brown@company.com',
      fullName: 'Lisa Brown',
      role: 'requestor',
      department: 'HR',
      isActive: true,
      createdAt: '2023-12-10',
      lastLogin: '2024-01-18'
    },
    {
      id: '8',
      username: 'david.lee',
      email: 'david.lee@company.com',
      fullName: 'David Lee',
      role: 'approver',
      department: 'Operations',
      isActive: true,
      createdAt: '2023-12-05',
      lastLogin: '2024-01-17'
    }
  ];

  const departments = ['Engineering', 'Finance', 'Marketing', 'Sales', 'HR', 'IT', 'Operations'];
  const roles = [
    { value: 'requestor', label: 'Requestor', description: 'Can submit expense requests' },
    { value: 'approver', label: 'Approver', description: 'Can approve expense requests' },
    { value: 'accounts', label: 'Accounts', description: 'Final approval and processing' },
    { value: 'admin', label: 'Admin', description: 'Full system access' }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-100';
      case 'accounts': return 'text-blue-600 bg-blue-100';
      case 'approver': return 'text-green-600 bg-green-100';
      case 'requestor': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const AddUserModal = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      fullName: '',
      role: 'requestor',
      department: '',
      isActive: true
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('User created successfully!');
      setShowAddUser(false);
      setFormData({
        username: '',
        email: '',
        fullName: '',
        role: 'requestor',
        department: '',
        isActive: true
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add New User</h2>
              <button
                onClick={() => setShowAddUser(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
              </div>

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
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
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
                Active User
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddUser(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredUsers.map((user) => (
        <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-lg">
              {user.fullName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{user.fullName}</h3>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Role</span>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Department</span>
              <span className="text-sm font-medium text-gray-900">{user.department}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                user.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
              }`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Login</span>
              <span className="text-sm text-gray-900">{new Date(user.lastLogin).toLocaleDateString()}</span>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Username: {user.username}</p>
              <div className="flex items-center justify-between">
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
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Login</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                      {user.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.fullName}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500 font-mono">{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{user.department}</span>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    user.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{new Date(user.lastLogin).toLocaleDateString()}</span>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage system users, roles, and permissions</p>
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockUsers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockUsers.filter(u => u.isActive).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Inactive Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockUsers.filter(u => !u.isActive).length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Departments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{departments.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="all">All Roles</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
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
          Showing <span className="font-semibold">{filteredUsers.length}</span> of <span className="font-semibold">{mockUsers.length}</span> users
        </p>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'grid' ? <GridView /> : <ListView />}

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUser && <AddUserModal />}
    </div>
  );
};

export default UserManagement;