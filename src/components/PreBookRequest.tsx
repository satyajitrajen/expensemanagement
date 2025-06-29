import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  DollarSign, 
  FileText, 
  User,
  Building2,
  Tag,
  AlertCircle
} from 'lucide-react';
import FileUpload from './FileUpload';

const PreBookRequest: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    category: '',
    estimatedAmount: '',
    description: '',
    department: user?.department || '',
    approver1: '',
    approver2: '',
    requestedDate: '',
    justification: ''
  });
  const [attachments, setAttachments] = useState<File[]>([]);

  const categories = [
    { id: 'food', label: 'Food & Beverages', icon: '🍽️' },
    { id: 'travel', label: 'Travel & Transport', icon: '✈️' },
    { id: 'supplies', label: 'Office Supplies', icon: '📦' },
    { id: 'equipment', label: 'Equipment', icon: '💻' },
    { id: 'training', label: 'Training & Development', icon: '📚' },
    { id: 'other', label: 'Other', icon: '📋' }
  ];

  const mockApprovers = [
    { id: '2', name: 'Jane Smith', department: 'Engineering', role: 'Senior Manager' },
    { id: '5', name: 'Robert Johnson', department: 'Engineering', role: 'Director' },
    { id: '6', name: 'Sarah Davis', department: 'Finance', role: 'Manager' },
    { id: '7', name: 'Michael Brown', department: 'Operations', role: 'VP Operations' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData for file upload simulation
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    
    // Add files to FormData
    attachments.forEach((file, index) => {
      submitData.append(`attachment_${index}`, file);
    });

    // Mock submission with file details
    const fileNames = attachments.map(file => file.name).join(', ');
    const message = `Pre-book request submitted successfully!${fileNames ? `\nAttached files: ${fileNames}` : ''}`;
    alert(message);
    
    setFormData({
      category: '',
      estimatedAmount: '',
      description: '',
      department: user?.department || '',
      approver1: '',
      approver2: '',
      requestedDate: '',
      justification: ''
    });
    setAttachments([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pre-Book Budget Request</h1>
        <p className="text-gray-600">Request budget allocation for future expenses</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
        <div className="mb-6 p-4 bg-blue-50/50 border border-blue-200 rounded-xl flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900">Pre-Book Request Guidelines</h3>
            <p className="text-blue-700 text-sm mt-1">
              Pre-book requests allow you to reserve budget for anticipated expenses. Once approved, 
              you can file actual expenses against this allocation without requiring additional approvals.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              <Tag className="inline w-4 h-4 mr-2" />
              Budget Category
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className={`relative cursor-pointer group ${
                    formData.category === category.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={formData.category === category.id}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="sr-only"
                  />
                  <div className="p-4 bg-white/60 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 group-hover:shadow-md">
                    <div className="text-2xl mb-2 text-center">{category.icon}</div>
                    <div className="text-sm font-medium text-gray-900 text-center">{category.label}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Amount and Date */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="estimatedAmount" className="block text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-2" />
                Estimated Amount
              </label>
              <input
                id="estimatedAmount"
                type="number"
                step="0.01"
                value={formData.estimatedAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedAmount: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label htmlFor="requestedDate" className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Expected Usage Date
              </label>
              <input
                id="requestedDate"
                type="date"
                value={formData.requestedDate}
                onChange={(e) => setFormData(prev => ({ ...prev, requestedDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                required
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">
              <Building2 className="inline w-4 h-4 mr-2" />
              Department
            </label>
            <input
              id="department"
              type="text"
              value={formData.department}
              onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="inline w-4 h-4 mr-2" />
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              placeholder="Brief description of the expected expense..."
              required
            />
          </div>

          {/* Justification */}
          <div>
            <label htmlFor="justification" className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="inline w-4 h-4 mr-2" />
              Business Justification
            </label>
            <textarea
              id="justification"
              rows={4}
              value={formData.justification}
              onChange={(e) => setFormData(prev => ({ ...prev, justification: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              placeholder="Explain why this budget allocation is necessary for business operations..."
              required
            />
          </div>

          {/* Approvers */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="approver1" className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                First Approver
              </label>
              <select
                id="approver1"
                value={formData.approver1}
                onChange={(e) => setFormData(prev => ({ ...prev, approver1: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                required
              >
                <option value="">Select first approver</option>
                {mockApprovers.map((approver) => (
                  <option key={approver.id} value={approver.id}>
                    {approver.name} - {approver.role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="approver2" className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Second Approver
              </label>
              <select
                id="approver2"
                value={formData.approver2}
                onChange={(e) => setFormData(prev => ({ ...prev, approver2: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                required
              >
                <option value="">Select second approver</option>
                {mockApprovers.filter(a => a.id !== formData.approver1).map((approver) => (
                  <option key={approver.id} value={approver.id}>
                    {approver.name} - {approver.role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Supporting Documents
            </label>
            <FileUpload
              files={attachments}
              onFilesChange={setAttachments}
              maxFiles={5}
              maxSizePerFile={10}
              acceptedTypes={['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx', '.xls', '.xlsx']}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
            >
              Submit Pre-Book Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreBookRequest;