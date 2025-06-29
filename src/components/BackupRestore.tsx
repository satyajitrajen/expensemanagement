import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  Calendar, 
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  HardDrive,
  Cloud,
  Shield,
  RefreshCw,
  Archive,
  Trash2
} from 'lucide-react';

const BackupRestore: React.FC = () => {
  const [activeTab, setActiveTab] = useState('backups');
  const [showCreateBackup, setShowCreateBackup] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);

  // Mock backup data
  const mockBackups = [
    {
      id: '1',
      name: 'Daily Backup - January 20, 2024',
      type: 'automatic',
      size: '2.4 GB',
      createdAt: '2024-01-20T02:00:00Z',
      status: 'completed',
      location: 'cloud',
      retention: '30 days',
      includes: ['Users', 'Expenses', 'Departments', 'Policies', 'Settings'],
      checksum: 'sha256:a1b2c3d4e5f6...'
    },
    {
      id: '2',
      name: 'Weekly Backup - January 14, 2024',
      type: 'automatic',
      size: '2.3 GB',
      createdAt: '2024-01-14T02:00:00Z',
      status: 'completed',
      location: 'cloud',
      retention: '90 days',
      includes: ['Users', 'Expenses', 'Departments', 'Policies', 'Settings'],
      checksum: 'sha256:b2c3d4e5f6a1...'
    },
    {
      id: '3',
      name: 'Manual Backup - Pre-Update',
      type: 'manual',
      size: '2.2 GB',
      createdAt: '2024-01-10T14:30:00Z',
      status: 'completed',
      location: 'local',
      retention: 'permanent',
      includes: ['Users', 'Expenses', 'Departments', 'Policies', 'Settings'],
      checksum: 'sha256:c3d4e5f6a1b2...'
    },
    {
      id: '4',
      name: 'Daily Backup - January 19, 2024',
      type: 'automatic',
      size: '2.4 GB',
      createdAt: '2024-01-19T02:00:00Z',
      status: 'failed',
      location: 'cloud',
      retention: '30 days',
      includes: ['Users', 'Expenses', 'Departments', 'Policies', 'Settings'],
      error: 'Network timeout during upload'
    },
    {
      id: '5',
      name: 'Monthly Backup - January 1, 2024',
      type: 'automatic',
      size: '2.1 GB',
      createdAt: '2024-01-01T02:00:00Z',
      status: 'completed',
      location: 'cloud',
      retention: '1 year',
      includes: ['Users', 'Expenses', 'Departments', 'Policies', 'Settings'],
      checksum: 'sha256:d4e5f6a1b2c3...'
    }
  ];

  // Mock restore history
  const mockRestoreHistory = [
    {
      id: '1',
      backupName: 'Manual Backup - Pre-Update',
      restoredAt: '2024-01-15T10:30:00Z',
      restoredBy: 'System Administrator',
      status: 'completed',
      duration: '15 minutes',
      itemsRestored: 15420
    },
    {
      id: '2',
      backupName: 'Weekly Backup - December 31, 2023',
      restoredAt: '2024-01-02T09:15:00Z',
      restoredBy: 'System Administrator',
      status: 'completed',
      duration: '22 minutes',
      itemsRestored: 14890
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'in_progress': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getLocationIcon = (location: string) => {
    return location === 'cloud' ? <Cloud className="w-4 h-4" /> : <HardDrive className="w-4 h-4" />;
  };

  const CreateBackupModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      type: 'manual',
      location: 'cloud',
      includes: ['users', 'expenses', 'departments', 'policies', 'settings'],
      compression: true,
      encryption: true
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert('Backup created successfully!');
      setShowCreateBackup(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create Backup</h2>
              <button
                onClick={() => setShowCreateBackup(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Backup Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter backup name..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Backup Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="manual">Manual</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Storage Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="cloud">Cloud Storage</option>
                  <option value="local">Local Storage</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Include in Backup
              </label>
              <div className="space-y-2">
                {[
                  { id: 'users', label: 'User Data' },
                  { id: 'expenses', label: 'Expense Records' },
                  { id: 'departments', label: 'Department Information' },
                  { id: 'policies', label: 'Policies & Procedures' },
                  { id: 'settings', label: 'System Settings' }
                ].map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={formData.includes.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({ ...prev, includes: [...prev.includes, item.id] }));
                        } else {
                          setFormData(prev => ({ ...prev, includes: prev.includes.filter(i => i !== item.id) }));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={item.id} className="text-sm font-medium text-gray-700">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="compression"
                  checked={formData.compression}
                  onChange={(e) => setFormData(prev => ({ ...prev, compression: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="compression" className="text-sm font-medium text-gray-700">
                  Enable compression (reduces file size)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="encryption"
                  checked={formData.encryption}
                  onChange={(e) => setFormData(prev => ({ ...prev, encryption: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="encryption" className="text-sm font-medium text-gray-700">
                  Enable encryption (recommended for security)
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowCreateBackup(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Create Backup
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const RestoreModal = () => {
    const backup = mockBackups.find(b => b.id === selectedBackup);
    if (!backup) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Restore from Backup</h2>
              <button
                onClick={() => setShowRestoreModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Warning</h3>
                  <p className="text-yellow-700 text-sm mt-1">
                    Restoring from a backup will overwrite current data. This action cannot be undone.
                    Please ensure you have a recent backup before proceeding.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Backup Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium text-gray-900">{backup.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Created:</span>
                  <p className="font-medium text-gray-900">{new Date(backup.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <p className="font-medium text-gray-900">{backup.size}</p>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <p className="font-medium text-gray-900 capitalize">{backup.location}</p>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-gray-600 text-sm">Includes:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {backup.includes.map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowRestoreModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Restore initiated successfully!');
                  setShowRestoreModal(false);
                  setSelectedBackup(null);
                }}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-rose-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
              >
                Restore Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BackupsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Available Backups</h2>
        <button
          onClick={() => setShowCreateBackup(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
        >
          <Database className="w-5 h-5" />
          <span>Create Backup</span>
        </button>
      </div>

      <div className="space-y-4">
        {mockBackups.map((backup) => (
          <div key={backup.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="font-semibold text-gray-900">{backup.name}</h3>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(backup.status)}`}>
                    {getStatusIcon(backup.status)}
                    <span className="capitalize">{backup.status}</span>
                  </div>
                  <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {getLocationIcon(backup.location)}
                    <span className="capitalize">{backup.location}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <p className="font-medium text-gray-900 capitalize">{backup.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Size:</span>
                    <p className="font-medium text-gray-900">{backup.size}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Created:</span>
                    <p className="font-medium text-gray-900">{new Date(backup.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Retention:</span>
                    <p className="font-medium text-gray-900">{backup.retention}</p>
                  </div>
                </div>

                {backup.error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{backup.error}</p>
                  </div>
                )}

                <div className="mt-3">
                  <span className="text-gray-600 text-sm">Includes:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {backup.includes.map((item, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-6">
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                  <Download className="w-4 h-4" />
                </button>
                {backup.status === 'completed' && (
                  <button
                    onClick={() => {
                      setSelectedBackup(backup.id);
                      setShowRestoreModal(true);
                    }}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RestoreHistoryTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Restore History</h2>

      <div className="space-y-4">
        {mockRestoreHistory.map((restore) => (
          <div key={restore.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="font-semibold text-gray-900">{restore.backupName}</h3>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(restore.status)}`}>
                    {getStatusIcon(restore.status)}
                    <span className="capitalize">{restore.status}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Restored By:</span>
                    <p className="font-medium text-gray-900">{restore.restoredBy}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <p className="font-medium text-gray-900">{restore.duration}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Items Restored:</span>
                    <p className="font-medium text-gray-900">{restore.itemsRestored.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <p className="font-medium text-gray-900">{new Date(restore.restoredAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Backup & Restore</h1>
        <p className="text-gray-600">Manage system backups and data recovery</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Backups</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockBackups.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Successful Backups</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockBackups.filter(b => b.status === 'completed').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Storage</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">11.8 GB</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Last Backup</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">Today</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('backups')}
              className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'backups'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Archive className="w-4 h-4" />
                <span>Backups</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('restore')}
              className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'restore'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Restore History</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'backups' ? <BackupsTab /> : <RestoreHistoryTab />}
        </div>
      </div>

      {/* Modals */}
      {showCreateBackup && <CreateBackupModal />}
      {showRestoreModal && <RestoreModal />}
    </div>
  );
};

export default BackupRestore;