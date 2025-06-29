import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Percent,
  Calendar,
  DollarSign,
  FileText,
  Download,
  Upload
} from 'lucide-react';

const TaxManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddTaxRate, setShowAddTaxRate] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('2024');

  // Mock tax rates data
  const mockTaxRates = [
    {
      id: '1',
      name: 'Standard GST',
      rate: 18.0,
      type: 'GST',
      category: 'General',
      isActive: true,
      effectiveFrom: '2024-01-01',
      effectiveTo: null,
      description: 'Standard GST rate for most goods and services',
      applicableCategories: ['Equipment', 'Supplies', 'Services'],
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Reduced GST',
      rate: 5.0,
      type: 'GST',
      category: 'Reduced',
      isActive: true,
      effectiveFrom: '2024-01-01',
      effectiveTo: null,
      description: 'Reduced GST rate for specific items',
      applicableCategories: ['Food'],
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Zero GST',
      rate: 0.0,
      type: 'GST',
      category: 'Zero',
      isActive: true,
      effectiveFrom: '2024-01-01',
      effectiveTo: null,
      description: 'Zero GST rate for exempt items',
      applicableCategories: ['Training', 'Books'],
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Service Tax',
      rate: 12.0,
      type: 'Service Tax',
      category: 'Service',
      isActive: true,
      effectiveFrom: '2024-01-01',
      effectiveTo: null,
      description: 'Service tax rate for professional services',
      applicableCategories: ['Professional Services'],
      createdAt: '2024-01-01'
    },
    {
      id: '5',
      name: 'Old GST Rate',
      rate: 15.0,
      type: 'GST',
      category: 'Historical',
      isActive: false,
      effectiveFrom: '2023-01-01',
      effectiveTo: '2023-12-31',
      description: 'Previous GST rate (historical)',
      applicableCategories: ['General'],
      createdAt: '2023-01-01'
    }
  ];

  // Mock tax reports data
  const mockTaxReports = [
    {
      period: 'Q4 2024',
      totalTaxable: 125000,
      totalTax: 22500,
      gstReturns: 18000,
      serviceTax: 4500,
      status: 'Filed',
      dueDate: '2024-01-31',
      filedDate: '2024-01-28'
    },
    {
      period: 'Q3 2024',
      totalTaxable: 98000,
      totalTax: 17640,
      gstReturns: 14280,
      serviceTax: 3360,
      status: 'Filed',
      dueDate: '2023-10-31',
      filedDate: '2023-10-29'
    },
    {
      period: 'Q2 2024',
      totalTaxable: 110000,
      totalTax: 19800,
      gstReturns: 15840,
      serviceTax: 3960,
      status: 'Filed',
      dueDate: '2023-07-31',
      filedDate: '2023-07-30'
    }
  ];

  const filteredTaxRates = mockTaxRates.filter(rate =>
    rate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AddTaxRateModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      rate: '',
      type: 'GST',
      category: 'General',
      description: '',
      effectiveFrom: '',
      effectiveTo: '',
      isActive: true,
      applicableCategories: []
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Tax rate created successfully!');
      setShowAddTaxRate(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add Tax Rate</h2>
              <button
                onClick={() => setShowAddTaxRate(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tax Rate Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.rate}
                  onChange={(e) => setFormData(prev => ({ ...prev, rate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tax Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="GST">GST</option>
                  <option value="Service Tax">Service Tax</option>
                  <option value="CGST">CGST</option>
                  <option value="SGST">SGST</option>
                  <option value="IGST">IGST</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="General">General</option>
                  <option value="Reduced">Reduced</option>
                  <option value="Zero">Zero</option>
                  <option value="Exempt">Exempt</option>
                </select>
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
                placeholder="Description of when this tax rate applies..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Effective From
                </label>
                <input
                  type="date"
                  value={formData.effectiveFrom}
                  onChange={(e) => setFormData(prev => ({ ...prev, effectiveFrom: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Effective To (Optional)
                </label>
                <input
                  type="date"
                  value={formData.effectiveTo}
                  onChange={(e) => setFormData(prev => ({ ...prev, effectiveTo: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Active Tax Rate
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddTaxRate(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Create Tax Rate
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Management</h1>
            <p className="text-gray-600">Manage tax rates, calculations, and reporting</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Import Rates</span>
            </button>
            <button
              onClick={() => setShowAddTaxRate(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Tax Rate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Tax Rates</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockTaxRates.filter(r => r.isActive).length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Percent className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">YTD Tax Collected</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹59,940</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending Returns</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Next Due Date</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">Apr 30</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tax Rates Section */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Tax Rates</h2>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tax rates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tax Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Effective Period</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTaxRates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{rate.name}</p>
                        <p className="text-sm text-gray-600">{rate.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold text-gray-900">{rate.rate}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {rate.type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900">From: {new Date(rate.effectiveFrom).toLocaleDateString()}</p>
                        {rate.effectiveTo && (
                          <p className="text-gray-600">To: {new Date(rate.effectiveTo).toLocaleDateString()}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        rate.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                      }`}>
                        {rate.isActive ? 'Active' : 'Inactive'}
                      </div>
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
      </div>

      {/* Tax Reports Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Tax Reports</h2>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Period</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Taxable Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Tax</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">GST Returns</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service Tax</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockTaxReports.map((report, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{report.period}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">₹{report.totalTaxable.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">₹{report.totalTax.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">₹{report.gstReturns.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">₹{report.serviceTax.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-green-600 bg-green-100">
                      {report.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-900">{new Date(report.dueDate).toLocaleDateString()}</p>
                      {report.filedDate && (
                        <p className="text-sm text-green-600">Filed: {new Date(report.filedDate).toLocaleDateString()}</p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Tax Rate Modal */}
      {showAddTaxRate && <AddTaxRateModal />}
    </div>
  );
};

export default TaxManagement;