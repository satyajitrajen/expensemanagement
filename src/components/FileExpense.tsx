import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  DollarSign, 
  FileText, 
  Calendar, 
  User,
  Building2,
  Tag
} from 'lucide-react';
import FileUpload from './FileUpload';

const FileExpense: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    department: user?.department || '',
    approver1: '',
    approver2: ''
  });
  const [attachments, setAttachments] = useState<File[]>([]);

  const categories = [
    { id: 'food', label: 'Food & Beverages', icon: '🍽️' },
    { id: 'travel', label: 'Travel & Transport', icon: '✈️' },
    { id: 'supplies', label: 'Office Supplies', icon: '📦' },
    { id: 'equipment', label: 'Equipment', icon: '💻' },
    { id: 'other', label: 'Other', icon: '📋' }
  ];

  const mockApprovers = [
    { id: '2', name: 'Jane Smith', department: 'Engineering', role: 'Senior Manager' },
    { id: '5', name: 'Robert Johnson', department: 'Engineering', role: 'Director' },
    { id: '6', name: 'Sarah Davis', department: 'Finance', role: 'Manager' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData for file upload simulation
    const submitData = new FormData();
    submitData.append('category', formData.category);
    submitData.append('amount', formData.amount);
    submitData.append('description', formData.description);
    submitData.append('department', formData.department);
    submitData.append('approver1', formData.approver1);
    submitData.append('approver2', formData.approver2);
    
    // Add files to FormData
    attachments.forEach((file, index) => {
      submitData.append(`attachment_${index}`, file);
    });

    // Mock submission with file details
    const fileNames = attachments.map(file => file.name).join(', ');
    const message = `Expense submitted successfully!${fileNames ? `\nAttached files: ${fileNames}` : ''}`;
    alert(message);
    
    // Reset form
    setFormData({
      category: '',
      amount: '',
      description: '',
      department: user?.department || '',
      approver1: '',
      approver2: ''
    });
    setAttachments([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">File New Expense</h1>
        <p className="text-gray-600">Submit a new expense claim for reimbursement</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              <Tag className="inline w-4 h-4 mr-2" />
              Expense Category
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

          {/* Amount and Description */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-2" />
                Amount
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                placeholder="0.00"
                required
              />
            </div>

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
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              <FileText className="inline w-4 h-4 mr-2" />
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
              placeholder="Provide details about this expense..."
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
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
            >
              Submit Expense Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileExpense;