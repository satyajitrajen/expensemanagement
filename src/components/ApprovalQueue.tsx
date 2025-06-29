import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  MessageSquare,
  Filter,
  Search,
  FileText,
  DollarSign,
  Calendar,
  User
} from 'lucide-react';

const ApprovalQueue: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [comments, setComments] = useState('');

  // Mock pending approvals data
  const mockApprovals = [
    {
      id: 'REQ-005',
      requestorName: 'John Doe',
      department: 'Engineering',
      type: 'expense',
      category: 'travel',
      amount: 850.00,
      description: 'Conference attendance in San Francisco',
      submissionDate: '2024-01-16',
      approvalLevel: user?.role === 'accounts' ? 'final' : 'first',
      priority: 'high',
      attachments: ['conference-receipt.pdf', 'travel-itinerary.pdf'],
      businessJustification: 'Attending React Conference to learn latest technologies for our upcoming project.'
    },
    {
      id: 'REQ-006',
      requestorName: 'Alice Johnson',
      department: 'Marketing',
      type: 'pre-book',
      category: 'equipment',
      amount: 2400.00,
      description: 'New camera equipment for product photography',
      submissionDate: '2024-01-15',
      approvalLevel: user?.role === 'accounts' ? 'final' : 'second',
      priority: 'medium',
      attachments: ['camera-specs.pdf'],
      businessJustification: 'Current camera equipment is outdated and affecting product photo quality for marketing campaigns.'
    },
    {
      id: 'REQ-007',
      requestorName: 'Bob Wilson',
      department: 'Sales',
      type: 'expense',
      category: 'food',
      amount: 320.00,
      description: 'Client dinner meeting',
      submissionDate: '2024-01-14',
      approvalLevel: user?.role === 'accounts' ? 'final' : 'first',
      priority: 'low',
      attachments: ['restaurant-receipt.pdf'],
      businessJustification: 'Important client meeting to discuss Q2 contract renewal worth ₹50K.'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredApprovals = mockApprovals.filter(approval => {
    const matchesSearch = approval.requestorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleApprovalAction = (requestId: string, action: 'approve' | 'reject') => {
    setSelectedRequest(requestId);
    setActionType(action);
  };

  const submitApprovalAction = () => {
    if (!selectedRequest || !actionType) return;
    
    const actionText = actionType === 'approve' ? 'approved' : 'rejected';
    alert(`Request ${selectedRequest} has been ${actionText}!`);
    
    // Reset state
    setSelectedRequest(null);
    setActionType(null);
    setComments('');
  };

  const ApprovalModal = () => {
    if (!selectedRequest || !actionType) return null;
    
    const request = mockApprovals.find(r => r.id === selectedRequest);
    if (!request) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {actionType === 'approve' ? 'Approve Request' : 'Reject Request'}
              </h2>
              <button
                onClick={() => {
                  setSelectedRequest(null);
                  setActionType(null);
                  setComments('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Request Summary */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Request Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Request ID:</span>
                  <span className="ml-2 font-mono">{request.id}</span>
                </div>
                <div>
                  <span className="text-gray-600">Requestor:</span>
                  <span className="ml-2">{request.requestorName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <span className="ml-2 font-semibold">₹{request.amount.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="ml-2 capitalize">{request.category}</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-gray-600">Description:</span>
                <p className="mt-1 text-gray-900">{request.description}</p>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-2">
                <MessageSquare className="inline w-4 h-4 mr-2" />
                Comments {actionType === 'reject' && <span className="text-red-500">(Required)</span>}
              </label>
              <textarea
                id="comments"
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder={`Add your ${actionType === 'approve' ? 'approval' : 'rejection'} comments...`}
                required={actionType === 'reject'}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setSelectedRequest(null);
                  setActionType(null);
                  setComments('');
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={submitApprovalAction}
                disabled={actionType === 'reject' && !comments.trim()}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  actionType === 'approve'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                    : 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600'
                }`}
              >
                {actionType === 'approve' ? 'Approve Request' : 'Reject Request'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {user?.role === 'accounts' ? 'Final Approvals' : 'Approval Queue'}
        </h1>
        <p className="text-gray-600">
          {user?.role === 'accounts' 
            ? 'Review and process final approvals for expense requests'
            : 'Review and approve pending expense requests assigned to you'
          }
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{filteredApprovals.length}</span> requests pending your approval
            </div>
          </div>
        </div>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {filteredApprovals.map((approval) => (
          <div key={approval.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg">{approval.id}</span>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(approval.priority)}`}>
                    {approval.priority} priority
                  </div>
                  <div className="text-sm text-gray-600">
                    {approval.approvalLevel === 'final' ? 'Final Approval' : 
                     approval.approvalLevel === 'second' ? 'Second Approval' : 'First Approval'}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Requestor:</span>
                      <span className="font-medium text-gray-900">{approval.requestorName}</span>
                      <span className="text-sm text-gray-500">({approval.department})</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="font-bold text-gray-900">₹{approval.amount.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="capitalize text-gray-900">{approval.type}</span>
                      <span className="text-gray-500">•</span>
                      <span className="capitalize text-gray-900">{approval.category}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Submitted:</span>
                      <span className="text-gray-900">{new Date(approval.submissionDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-700">Description:</span>
                      <p className="text-gray-900 mt-1">{approval.description}</p>
                    </div>

                    <div>
                      <span className="text-sm font-semibold text-gray-700">Business Justification:</span>
                      <p className="text-gray-900 mt-1 text-sm">{approval.businessJustification}</p>
                    </div>

                    {approval.attachments.length > 0 && (
                      <div>
                        <span className="text-sm font-semibold text-gray-700">Attachments:</span>
                        <div className="mt-1 space-y-1">
                          {approval.attachments.map((file, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-blue-600 hover:text-blue-700 cursor-pointer">{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3 ml-6">
                <button
                  onClick={() => handleApprovalAction(approval.id, 'approve')}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Approve</span>
                </button>

                <button
                  onClick={() => handleApprovalAction(approval.id, 'reject')}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-rose-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredApprovals.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-12 text-center">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No pending approvals</h3>
            <p className="text-gray-600">All requests have been processed or there are no requests assigned to you.</p>
          </div>
        )}
      </div>

      {/* Approval Action Modal */}
      <ApprovalModal />
    </div>
  );
};

export default ApprovalQueue;