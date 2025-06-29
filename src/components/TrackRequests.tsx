import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  Calendar,
  FileText,
  User,
  MessageSquare,
  Grid3X3,
  List,
  Building2
} from 'lucide-react';

const TrackRequests: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Mock data - in real app this would come from API
  const mockRequests = [
    {
      id: 'REQ-001',
      type: 'expense',
      category: 'travel',
      amount: 420.00,
      description: 'Business trip to client site',
      submissionDate: '2024-01-15',
      status: 'pending',
      approver1Status: 'pending',
      approver2Status: 'pending',
      accountsStatus: 'pending',
      approver1Name: 'Jane Smith',
      approver2Name: 'Robert Johnson',
      attachments: ['receipt-001.pdf', 'travel-itinerary.pdf']
    },
    {
      id: 'REQ-002',
      type: 'expense',
      category: 'food',
      amount: 85.50,
      description: 'Team lunch meeting',
      submissionDate: '2024-01-14',
      status: 'approved',
      approver1Status: 'approved',
      approver2Status: 'approved',
      accountsStatus: 'approved',
      approver1Name: 'Jane Smith',
      approver2Name: 'Robert Johnson',
      approver1Date: '2024-01-15',
      approver2Date: '2024-01-16',
      accountsDate: '2024-01-17',
      attachments: ['receipt-002.pdf']
    },
    {
      id: 'REQ-003',
      type: 'pre-book',
      category: 'equipment',
      amount: 1200.00,
      description: 'New laptop for development work',
      submissionDate: '2024-01-12',
      status: 'rejected',
      approver1Status: 'rejected',
      approver2Status: 'pending',
      accountsStatus: 'pending',
      approver1Name: 'Jane Smith',
      approver1Date: '2024-01-13',
      approver1Comments: 'Budget not available for Q1',
      attachments: ['laptop-specs.pdf']
    },
    {
      id: 'REQ-004',
      type: 'expense',
      category: 'supplies',
      amount: 240.75,
      description: 'Office supplies for team',
      submissionDate: '2024-01-10',
      status: 'processing',
      approver1Status: 'approved',
      approver2Status: 'approved',
      accountsStatus: 'processing',
      approver1Name: 'Jane Smith',
      approver2Name: 'Robert Johnson',
      attachments: ['supplies-receipt.pdf']
    },
    {
      id: 'REQ-005',
      type: 'expense',
      category: 'training',
      amount: 850.00,
      description: 'Professional development course',
      submissionDate: '2024-01-08',
      status: 'approved',
      approver1Status: 'approved',
      approver2Status: 'approved',
      accountsStatus: 'approved',
      approver1Name: 'Jane Smith',
      approver2Name: 'Robert Johnson',
      attachments: ['course-receipt.pdf']
    },
    {
      id: 'REQ-006',
      type: 'pre-book',
      category: 'travel',
      amount: 2500.00,
      description: 'Conference attendance budget',
      submissionDate: '2024-01-05',
      status: 'pending',
      approver1Status: 'approved',
      approver2Status: 'pending',
      accountsStatus: 'pending',
      approver1Name: 'Jane Smith',
      approver2Name: 'Robert Johnson',
      attachments: ['conference-details.pdf']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'travel': return '✈️';
      case 'food': return '🍽️';
      case 'equipment': return '💻';
      case 'supplies': return '📦';
      case 'training': return '📚';
      default: return '📋';
    }
  };

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const RequestDetailModal = ({ requestId }: { requestId: string }) => {
    const request = mockRequests.find(r => r.id === requestId);
    if (!request) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Request Details</h2>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Request Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Request ID</label>
                  <p className="text-lg font-mono text-gray-900">{request.id}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Type</label>
                  <p className="text-gray-900 capitalize">{request.type}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Category</label>
                  <p className="text-gray-900 capitalize">{request.category}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Amount</label>
                  <p className="text-xl font-bold text-gray-900">₹{request.amount.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">Submission Date</label>
                  <p className="text-gray-900">{new Date(request.submissionDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Current Status</label>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="capitalize">{request.status}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">Description</label>
                  <p className="text-gray-900">{request.description}</p>
                </div>
              </div>
            </div>

            {/* Approval Trail */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Trail</h3>
              <div className="space-y-4">
                {/* Approver 1 */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(request.approver1Status)}`}>
                    {getStatusIcon(request.approver1Status)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">First Approver: {request.approver1Name}</p>
                    <p className="text-sm text-gray-600 capitalize">Status: {request.approver1Status}</p>
                    {request.approver1Date && (
                      <p className="text-sm text-gray-600">Date: {new Date(request.approver1Date).toLocaleDateString()}</p>
                    )}
                    {request.approver1Comments && (
                      <p className="text-sm text-gray-700 mt-1">Comments: {request.approver1Comments}</p>
                    )}
                  </div>
                </div>

                {/* Approver 2 */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(request.approver2Status)}`}>
                    {getStatusIcon(request.approver2Status)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Second Approver: {request.approver2Name}</p>
                    <p className="text-sm text-gray-600 capitalize">Status: {request.approver2Status}</p>
                    {request.approver2Date && (
                      <p className="text-sm text-gray-600">Date: {new Date(request.approver2Date).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>

                {/* Accounts */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(request.accountsStatus)}`}>
                    {getStatusIcon(request.accountsStatus)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Accounts Team</p>
                    <p className="text-sm text-gray-600 capitalize">Status: {request.accountsStatus}</p>
                    {request.accountsDate && (
                      <p className="text-sm text-gray-600">Date: {new Date(request.accountsDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            {request.attachments.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
                <div className="space-y-2">
                  {request.attachments.map((file, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-900">{file}</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium ml-auto">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRequests.map((request) => (
        <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{getCategoryIcon(request.category)}</div>
              <div>
                <p className="font-mono text-sm text-gray-600">{request.id}</p>
                <p className="font-semibold text-gray-900 capitalize">{request.type}</p>
              </div>
            </div>
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
              {getStatusIcon(request.status)}
              <span className="capitalize">{request.status}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Amount</p>
              <p className="text-xl font-bold text-gray-900">₹{request.amount.toFixed(2)}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-gray-900 text-sm line-clamp-2">{request.description}</p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-gray-600">Category</p>
                <p className="text-gray-900 capitalize">{request.category}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Submitted</p>
                <p className="text-gray-900">{new Date(request.submissionDate).toLocaleDateString()}</p>
              </div>
            </div>

            {request.attachments.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>{request.attachments.length} attachment{request.attachments.length > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => setSelectedRequest(request.id)}
              className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Details</span>
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
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Request ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-gray-900">{request.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(request.category)}</span>
                    <span className="capitalize text-gray-900">{request.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="capitalize text-gray-900">{request.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">₹{request.amount.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{new Date(request.submissionDate).toLocaleDateString()}</span>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="capitalize">{request.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedRequest(request.id)}
                    className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {user?.role === 'admin' ? 'All Requests' : 'Track My Requests'}
        </h1>
        <p className="text-gray-600">
          {user?.role === 'admin' 
            ? 'Monitor all expense requests across the organization' 
            : 'Monitor the status of your submitted requests'
          }
        </p>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="processing">Processing</option>
            </select>
          </div>

          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="all">All Types</option>
              <option value="expense">Expense Claims</option>
              <option value="pre-book">Pre-Book Requests</option>
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
          Showing <span className="font-semibold">{filteredRequests.length}</span> of <span className="font-semibold">{mockRequests.length}</span> requests
        </p>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'grid' ? <GridView /> : <ListView />}

      {filteredRequests.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Request Detail Modal */}
      {selectedRequest && <RequestDetailModal requestId={selectedRequest} />}
    </div>
  );
};

export default TrackRequests;