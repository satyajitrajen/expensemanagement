import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Grid3X3,
  List,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Star
} from 'lucide-react';

const VendorManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  // Mock vendors data
  const mockVendors = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      category: 'Technology',
      contactPerson: 'John Smith',
      email: 'john@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, Silicon Valley, CA 94000',
      status: 'active',
      rating: 4.8,
      totalSpent: 45000,
      lastTransaction: '2024-01-15',
      paymentTerms: 'Net 30',
      taxId: 'TC123456789',
      website: 'www.techcorp.com',
      notes: 'Preferred vendor for IT equipment and software licenses',
      createdAt: '2023-06-15',
      contracts: [
        { id: 'C001', name: 'Software License Agreement', value: 25000, startDate: '2024-01-01', endDate: '2024-12-31' }
      ]
    },
    {
      id: '2',
      name: 'Office Supplies Plus',
      category: 'Office Supplies',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@officesupplies.com',
      phone: '+1 (555) 234-5678',
      address: '456 Supply Ave, Business District, NY 10001',
      status: 'active',
      rating: 4.5,
      totalSpent: 12500,
      lastTransaction: '2024-01-12',
      paymentTerms: 'Net 15',
      taxId: 'OS987654321',
      website: 'www.officesupplies.com',
      notes: 'Reliable supplier for office materials and stationery',
      createdAt: '2023-08-20',
      contracts: []
    },
    {
      id: '3',
      name: 'Global Travel Services',
      category: 'Travel',
      contactPerson: 'Mike Wilson',
      email: 'mike@globaltravel.com',
      phone: '+1 (555) 345-6789',
      address: '789 Travel Blvd, Downtown, FL 33101',
      status: 'active',
      rating: 4.2,
      totalSpent: 78000,
      lastTransaction: '2024-01-10',
      paymentTerms: 'Net 7',
      taxId: 'GT456789123',
      website: 'www.globaltravel.com',
      notes: 'Corporate travel booking and management services',
      createdAt: '2023-05-10',
      contracts: [
        { id: 'C002', name: 'Corporate Travel Agreement', value: 50000, startDate: '2024-01-01', endDate: '2024-12-31' }
      ]
    },
    {
      id: '4',
      name: 'Catering Excellence',
      category: 'Food & Beverage',
      contactPerson: 'Lisa Brown',
      email: 'lisa@catering.com',
      phone: '+1 (555) 456-7890',
      address: '321 Food Court, Culinary District, TX 75001',
      status: 'pending',
      rating: 4.0,
      totalSpent: 8500,
      lastTransaction: '2024-01-08',
      paymentTerms: 'Net 15',
      taxId: 'CE789123456',
      website: 'www.catering.com',
      notes: 'Event catering and corporate lunch services',
      createdAt: '2023-11-05',
      contracts: []
    },
    {
      id: '5',
      name: 'Training Institute Pro',
      category: 'Training',
      contactPerson: 'David Lee',
      email: 'david@training.com',
      phone: '+1 (555) 567-8901',
      address: '654 Education Lane, Learning Center, WA 98001',
      status: 'active',
      rating: 4.7,
      totalSpent: 22000,
      lastTransaction: '2024-01-05',
      paymentTerms: 'Net 30',
      taxId: 'TI321654987',
      website: 'www.training.com',
      notes: 'Professional development and certification training',
      createdAt: '2023-07-12',
      contracts: []
    },
    {
      id: '6',
      name: 'Maintenance Masters',
      category: 'Maintenance',
      contactPerson: 'Robert Garcia',
      email: 'robert@maintenance.com',
      phone: '+1 (555) 678-9012',
      address: '987 Service Road, Industrial Park, IL 60601',
      status: 'inactive',
      rating: 3.8,
      totalSpent: 15000,
      lastTransaction: '2023-12-20',
      paymentTerms: 'Net 30',
      taxId: 'MM654987321',
      website: 'www.maintenance.com',
      notes: 'Office maintenance and repair services',
      createdAt: '2023-04-18',
      contracts: []
    }
  ];

  const filteredVendors = mockVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
                <p className="text-gray-600">Manage your vendor relationships and contracts</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddVendor(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Vendor</span>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Vendors Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{vendor.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{vendor.category}</p>
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        vendor.status === 'active' ? 'bg-green-100 text-green-800' :
                        vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {vendor.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {vendor.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {vendor.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Total Spent: ₹{vendor.totalSpent.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                          <div className="text-sm text-gray-500">{vendor.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{vendor.contactPerson}</div>
                          <div className="text-sm text-gray-500">{vendor.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          vendor.status === 'active' ? 'bg-green-100 text-green-800' :
                          vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {vendor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{vendor.totalSpent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vendor.lastTransaction}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-blue-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No vendors found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new vendor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorManagement;