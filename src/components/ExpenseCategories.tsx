import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Grid3X3,
  List,
  DollarSign,
  Percent,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const ExpenseCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock categories data
  const mockCategories = [
    {
      id: '1',
      name: 'Travel & Transport',
      icon: '✈️',
      description: 'Business travel, flights, hotels, car rentals',
      isActive: true,
      maxAmount: 5000,
      requiresApproval: true,
      taxDeductible: true,
      subcategories: ['Flights', 'Hotels', 'Car Rental', 'Taxi/Uber', 'Public Transport'],
      usageCount: 156,
      totalSpent: 45000,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Food & Beverages',
      icon: '🍽️',
      description: 'Business meals, client entertainment, team lunches',
      isActive: true,
      maxAmount: 200,
      requiresApproval: false,
      taxDeductible: true,
      subcategories: ['Client Meals', 'Team Lunch', 'Conference Catering', 'Office Snacks'],
      usageCount: 234,
      totalSpent: 12500,
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Office Supplies',
      icon: '📦',
      description: 'Stationery, equipment, software licenses',
      isActive: true,
      maxAmount: 1000,
      requiresApproval: true,
      taxDeductible: true,
      subcategories: ['Stationery', 'Software', 'Hardware', 'Furniture'],
      usageCount: 89,
      totalSpent: 8900,
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Equipment',
      icon: '💻',
      description: 'Laptops, monitors, phones, technical equipment',
      isActive: true,
      maxAmount: 3000,
      requiresApproval: true,
      taxDeductible: true,
      subcategories: ['Laptops', 'Monitors', 'Phones', 'Accessories'],
      usageCount: 45,
      totalSpent: 25000,
      createdAt: '2024-01-01'
    },
    {
      id: '5',
      name: 'Training & Development',
      icon: '📚',
      description: 'Courses, certifications, conferences, workshops',
      isActive: true,
      maxAmount: 2000,
      requiresApproval: true,
      taxDeductible: true,
      subcategories: ['Online Courses', 'Certifications', 'Conferences', 'Books'],
      usageCount: 67,
      totalSpent: 15600,
      createdAt: '2024-01-01'
    },
    {
      id: '6',
      name: 'Marketing',
      icon: '📢',
      description: 'Advertising, promotional materials, events',
      isActive: false,
      maxAmount: 5000,
      requiresApproval: true,
      taxDeductible: true,
      subcategories: ['Digital Ads', 'Print Materials', 'Events', 'Swag'],
      usageCount: 23,
      totalSpent: 8500,
      createdAt: '2023-12-01'
    }
  ];

  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const AddCategoryModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      icon: '',
      description: '',
      maxAmount: '',
      requiresApproval: true,
      taxDeductible: true,
      isActive: true,
      subcategories: ['']
    });

    const addSubcategory = () => {
      setFormData(prev => ({
        ...prev,
        subcategories: [...prev.subcategories, '']
      }));
    };

    const removeSubcategory = (index: number) => {
      setFormData(prev => ({
        ...prev,
        subcategories: prev.subcategories.filter((_, i) => i !== index)
      }));
    };

    const updateSubcategory = (index: number, value: string) => {
      setFormData(prev => ({
        ...prev,
        subcategories: prev.subcategories.map((sub, i) => i === index ? value : sub)
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Category created successfully!');
      setShowAddCategory(false);
      setFormData({
        name: '',
        icon: '',
        description: '',
        maxAmount: '',
        requiresApproval: true,
        taxDeductible: true,
        isActive: true,
        subcategories: ['']
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add New Category</h2>
              <button
                onClick={() => setShowAddCategory(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="icon" className="block text-sm font-semibold text-gray-700 mb-2">
                  Icon (Emoji)
                </label>
                <input
                  id="icon"
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="📦"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Brief description of what this category covers..."
                required
              />
            </div>

            <div>
              <label htmlFor="maxAmount" className="block text-sm font-semibold text-gray-700 mb-2">
                Maximum Amount (Optional)
              </label>
              <input
                id="maxAmount"
                type="number"
                value={formData.maxAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, maxAmount: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Subcategories
              </label>
              <div className="space-y-2">
                {formData.subcategories.map((sub, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={sub}
                      onChange={(e) => updateSubcategory(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Subcategory name"
                    />
                    {formData.subcategories.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSubcategory(index)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSubcategory}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Subcategory
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  id="requiresApproval"
                  type="checkbox"
                  checked={formData.requiresApproval}
                  onChange={(e) => setFormData(prev => ({ ...prev, requiresApproval: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="requiresApproval" className="text-sm font-medium text-gray-700">
                  Requires Approval
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  id="taxDeductible"
                  type="checkbox"
                  checked={formData.taxDeductible}
                  onChange={(e) => setFormData(prev => ({ ...prev, taxDeductible: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="taxDeductible" className="text-sm font-medium text-gray-700">
                  Tax Deductible
                </label>
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
                  Active Category
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddCategory(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCategories.map((category) => (
        <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{category.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.subcategories.length} subcategories</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              category.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
            }`}>
              {category.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Max Amount:</span>
              <span className="font-semibold text-gray-900">
                {category.maxAmount ? `$${category.maxAmount.toLocaleString()}` : 'No limit'}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Usage Count:</span>
              <span className="font-semibold text-gray-900">{category.usageCount}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Spent:</span>
              <span className="font-semibold text-gray-900">${category.totalSpent.toLocaleString()}</span>
            </div>

            <div className="flex items-center space-x-4 text-xs">
              {category.requiresApproval && (
                <div className="flex items-center space-x-1 text-orange-600">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Approval Required</span>
                </div>
              )}
              {category.taxDeductible && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  <span>Tax Deductible</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
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
      ))}
    </div>
  );

  const ListView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Max Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Usage</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Spent</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Properties</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{category.icon}</div>
                    <div>
                      <p className="font-semibold text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-600 truncate max-w-xs">{category.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">
                    {category.maxAmount ? `$${category.maxAmount.toLocaleString()}` : 'No limit'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-900">{category.usageCount}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-900">${category.totalSpent.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {category.requiresApproval && (
                      <div className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs">
                        Approval
                      </div>
                    )}
                    {category.taxDeductible && (
                      <div className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">
                        Tax Deductible
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    category.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                  }`}>
                    {category.isActive ? 'Active' : 'Inactive'}
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
  );

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Categories</h1>
            <p className="text-gray-600">Manage expense categories and their properties</p>
          </div>
          <button
            onClick={() => setShowAddCategory(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockCategories.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Categories</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockCategories.filter(c => c.isActive).length}</p>
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
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockCategories.reduce((sum, c) => sum + c.usageCount, 0)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${mockCategories.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Percent className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and View Toggle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* View Toggle */}
          <div className="ml-4">
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
          Showing <span className="font-semibold">{filteredCategories.length}</span> of <span className="font-semibold">{mockCategories.length}</span> categories
        </p>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'grid' ? <GridView /> : <ListView />}

      {filteredCategories.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add a new category.</p>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategory && <AddCategoryModal />}
    </div>
  );
};

export default ExpenseCategories;