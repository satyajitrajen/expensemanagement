import React, { useState } from 'react';
import { 
  GitBranch, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Settings
} from 'lucide-react';

const ApprovalWorkflow: React.FC = () => {
  const [showAddWorkflow, setShowAddWorkflow] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  // Mock workflow data
  const mockWorkflows = [
    {
      id: '1',
      name: 'Standard Expense Approval',
      description: 'Default workflow for regular expense claims',
      isActive: true,
      conditions: [
        { type: 'amount', operator: 'less_than', value: 500 },
        { type: 'category', operator: 'equals', value: 'food' }
      ],
      steps: [
        { 
          id: 'step1', 
          name: 'Department Manager', 
          type: 'user_role', 
          value: 'approver',
          timeout: 3,
          required: true 
        },
        { 
          id: 'step2', 
          name: 'Finance Team', 
          type: 'user_role', 
          value: 'accounts',
          timeout: 5,
          required: true 
        }
      ],
      usageCount: 234,
      avgProcessingTime: 2.5,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'High Value Approval',
      description: 'Workflow for expenses over $1000',
      isActive: true,
      conditions: [
        { type: 'amount', operator: 'greater_than', value: 1000 }
      ],
      steps: [
        { 
          id: 'step1', 
          name: 'Department Manager', 
          type: 'user_role', 
          value: 'approver',
          timeout: 2,
          required: true 
        },
        { 
          id: 'step2', 
          name: 'Department Head', 
          type: 'specific_user', 
          value: 'jane.smith',
          timeout: 3,
          required: true 
        },
        { 
          id: 'step3', 
          name: 'Finance Director', 
          type: 'specific_user', 
          value: 'mike.wilson',
          timeout: 5,
          required: true 
        }
      ],
      usageCount: 45,
      avgProcessingTime: 4.2,
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Travel Expense Approval',
      description: 'Specialized workflow for travel-related expenses',
      isActive: true,
      conditions: [
        { type: 'category', operator: 'equals', value: 'travel' }
      ],
      steps: [
        { 
          id: 'step1', 
          name: 'Direct Manager', 
          type: 'user_role', 
          value: 'approver',
          timeout: 2,
          required: true 
        },
        { 
          id: 'step2', 
          name: 'Travel Coordinator', 
          type: 'specific_user', 
          value: 'travel.coordinator',
          timeout: 3,
          required: false 
        },
        { 
          id: 'step3', 
          name: 'Finance Team', 
          type: 'user_role', 
          value: 'accounts',
          timeout: 5,
          required: true 
        }
      ],
      usageCount: 89,
      avgProcessingTime: 3.1,
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Equipment Purchase',
      description: 'Workflow for equipment and technology purchases',
      isActive: false,
      conditions: [
        { type: 'category', operator: 'equals', value: 'equipment' },
        { type: 'amount', operator: 'greater_than', value: 500 }
      ],
      steps: [
        { 
          id: 'step1', 
          name: 'Department Manager', 
          type: 'user_role', 
          value: 'approver',
          timeout: 3,
          required: true 
        },
        { 
          id: 'step2', 
          name: 'IT Manager', 
          type: 'specific_user', 
          value: 'it.manager',
          timeout: 3,
          required: true 
        },
        { 
          id: 'step3', 
          name: 'Finance Director', 
          type: 'specific_user', 
          value: 'mike.wilson',
          timeout: 5,
          required: true 
        }
      ],
      usageCount: 23,
      avgProcessingTime: 5.8,
      createdAt: '2023-12-01'
    }
  ];

  const AddWorkflowModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      isActive: true,
      conditions: [{ type: 'amount', operator: 'less_than', value: '' }],
      steps: [{ name: '', type: 'user_role', value: '', timeout: 3, required: true }]
    });

    const addCondition = () => {
      setFormData(prev => ({
        ...prev,
        conditions: [...prev.conditions, { type: 'amount', operator: 'less_than', value: '' }]
      }));
    };

    const removeCondition = (index: number) => {
      setFormData(prev => ({
        ...prev,
        conditions: prev.conditions.filter((_, i) => i !== index)
      }));
    };

    const updateCondition = (index: number, field: string, value: string) => {
      setFormData(prev => ({
        ...prev,
        conditions: prev.conditions.map((cond, i) => 
          i === index ? { ...cond, [field]: value } : cond
        )
      }));
    };

    const addStep = () => {
      setFormData(prev => ({
        ...prev,
        steps: [...prev.steps, { name: '', type: 'user_role', value: '', timeout: 3, required: true }]
      }));
    };

    const removeStep = (index: number) => {
      setFormData(prev => ({
        ...prev,
        steps: prev.steps.filter((_, i) => i !== index)
      }));
    };

    const updateStep = (index: number, field: string, value: any) => {
      setFormData(prev => ({
        ...prev,
        steps: prev.steps.map((step, i) => 
          i === index ? { ...step, [field]: value } : step
        )
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Workflow created successfully!');
      setShowAddWorkflow(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create Approval Workflow</h2>
              <button
                onClick={() => setShowAddWorkflow(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Workflow Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Active Workflow
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Describe when this workflow should be used..."
                />
              </div>
            </div>

            {/* Conditions */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Trigger Conditions</h3>
                <button
                  type="button"
                  onClick={addCondition}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Condition
                </button>
              </div>

              <div className="space-y-4">
                {formData.conditions.map((condition, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <select
                      value={condition.type}
                      onChange={(e) => updateCondition(index, 'type', e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="amount">Amount</option>
                      <option value="category">Category</option>
                      <option value="department">Department</option>
                    </select>

                    <select
                      value={condition.operator}
                      onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="equals">Equals</option>
                      <option value="greater_than">Greater than</option>
                      <option value="less_than">Less than</option>
                      <option value="contains">Contains</option>
                    </select>

                    <input
                      type="text"
                      value={condition.value}
                      onChange={(e) => updateCondition(index, 'value', e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Value"
                    />

                    {formData.conditions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCondition(index)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Approval Steps */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Approval Steps</h3>
                <button
                  type="button"
                  onClick={addStep}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Step
                </button>
              </div>

              <div className="space-y-4">
                {formData.steps.map((step, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">Step {index + 1}</h4>
                      {formData.steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStep(index)}
                          className="p-1 text-red-500 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Step Name
                        </label>
                        <input
                          type="text"
                          value={step.name}
                          onChange={(e) => updateStep(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Department Manager"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Approver Type
                        </label>
                        <select
                          value={step.type}
                          onChange={(e) => updateStep(index, 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="user_role">User Role</option>
                          <option value="specific_user">Specific User</option>
                          <option value="department_head">Department Head</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Value
                        </label>
                        <input
                          type="text"
                          value={step.value}
                          onChange={(e) => updateStep(index, 'value', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Role or username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Timeout (days)
                        </label>
                        <input
                          type="number"
                          value={step.timeout}
                          onChange={(e) => updateStep(index, 'timeout', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="1"
                          max="30"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={step.required}
                        onChange={(e) => updateStep(index, 'required', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Required Step
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddWorkflow(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Create Workflow
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Approval Workflows</h1>
            <p className="text-gray-600">Configure automated approval processes for different expense types</p>
          </div>
          <button
            onClick={() => setShowAddWorkflow(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Workflow</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Workflows</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockWorkflows.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Workflows</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockWorkflows.filter(w => w.isActive).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Usage</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockWorkflows.reduce((sum, w) => sum + w.usageCount, 0)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Avg Processing Time</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {(mockWorkflows.reduce((sum, w) => sum + w.avgProcessingTime, 0) / mockWorkflows.length).toFixed(1)}d
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Workflows List */}
      <div className="space-y-6">
        {mockWorkflows.map((workflow) => (
          <div key={workflow.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{workflow.name}</h3>
                  <p className="text-gray-600">{workflow.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  workflow.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                }`}>
                  {workflow.isActive ? 'Active' : 'Inactive'}
                </div>
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
              </div>
            </div>

            {/* Workflow Steps Visualization */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Approval Flow</h4>
              <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                {workflow.steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex-shrink-0 bg-gray-50 rounded-lg p-3 min-w-[200px]">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900">{step.name}</span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>Type: {step.type.replace('_', ' ')}</p>
                        <p>Timeout: {step.timeout} days</p>
                        <p>Required: {step.required ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                    {index < workflow.steps.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Trigger Conditions</h4>
              <div className="flex flex-wrap gap-2">
                {workflow.conditions.map((condition, index) => (
                  <div key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {condition.type} {condition.operator.replace('_', ' ')} {condition.value}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{workflow.usageCount}</p>
                <p className="text-sm text-gray-600">Times Used</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{workflow.avgProcessingTime}d</p>
                <p className="text-sm text-gray-600">Avg Processing</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{workflow.steps.length}</p>
                <p className="text-sm text-gray-600">Approval Steps</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Workflow Modal */}
      {showAddWorkflow && <AddWorkflowModal />}
    </div>
  );
};

export default ApprovalWorkflow;