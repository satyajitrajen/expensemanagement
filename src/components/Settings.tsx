import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  DollarSign, 
  Clock, 
  Users, 
  Bell,
  Shield,
  Database,
  Mail,
  Save,
  AlertTriangle
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      companyName: 'Acme Corporation',
      currency: 'USD',
      fiscalYearStart: 'january',
      timezone: 'America/New_York'
    },
    approval: {
      maxApprovers: 3,
      autoApprovalLimit: 100,
      approvalTimeout: 7,
      requireSecondApproval: true,
      allowSelfApproval: false
    },
    budget: {
      defaultBudgetPeriod: 'monthly',
      budgetWarningThreshold: 80,
      budgetAlertThreshold: 95,
      allowBudgetOverrun: false,
      requireJustificationOver: 500
    },
    notifications: {
      emailNotifications: true,
      approvalReminders: true,
      budgetAlerts: true,
      systemUpdates: false,
      reminderFrequency: 24
    },
    security: {
      sessionTimeout: 60,
      requirePasswordChange: true,
      passwordChangeInterval: 90,
      enableTwoFactor: false,
      allowMultipleSessions: true
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'approval', name: 'Approval Rules', icon: Users },
    { id: 'budget', name: 'Budget Settings', icon: DollarSign },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const saveSettings = () => {
    alert('Settings saved successfully!');
  };

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={settings.general.companyName}
              onChange={(e) => updateSetting('general', 'companyName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
            <select
              value={settings.general.currency}
              onChange={(e) => updateSetting('general', 'currency', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fiscal Year Start</label>
            <select
              value={settings.general.fiscalYearStart}
              onChange={(e) => updateSetting('general', 'fiscalYearStart', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="january">January</option>
              <option value="april">April</option>
              <option value="july">July</option>
              <option value="october">October</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={settings.general.timezone}
              onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const ApprovalSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Workflow</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Approvers</label>
            <input
              type="number"
              min="1"
              max="5"
              value={settings.approval.maxApprovers}
              onChange={(e) => updateSetting('approval', 'maxApprovers', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Approval Limit ($)</label>
            <input
              type="number"
              min="0"
              value={settings.approval.autoApprovalLimit}
              onChange={(e) => updateSetting('approval', 'autoApprovalLimit', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Approval Timeout (days)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={settings.approval.approvalTimeout}
              onChange={(e) => updateSetting('approval', 'approvalTimeout', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="requireSecondApproval"
              checked={settings.approval.requireSecondApproval}
              onChange={(e) => updateSetting('approval', 'requireSecondApproval', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="requireSecondApproval" className="text-sm font-medium text-gray-700">
              Require second approval for expenses over $500
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="allowSelfApproval"
              checked={settings.approval.allowSelfApproval}
              onChange={(e) => updateSetting('approval', 'allowSelfApproval', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="allowSelfApproval" className="text-sm font-medium text-gray-700">
              Allow users to approve their own requests (not recommended)
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const BudgetSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Management</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Budget Period</label>
            <select
              value={settings.budget.defaultBudgetPeriod}
              onChange={(e) => updateSetting('budget', 'defaultBudgetPeriod', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Warning Threshold (%)</label>
            <input
              type="number"
              min="50"
              max="100"
              value={settings.budget.budgetWarningThreshold}
              onChange={(e) => updateSetting('budget', 'budgetWarningThreshold', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alert Threshold (%)</label>
            <input
              type="number"
              min="80"
              max="100"
              value={settings.budget.budgetAlertThreshold}
              onChange={(e) => updateSetting('budget', 'budgetAlertThreshold', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Require Justification Over ($)</label>
            <input
              type="number"
              min="0"
              value={settings.budget.requireJustificationOver}
              onChange={(e) => updateSetting('budget', 'requireJustificationOver', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="allowBudgetOverrun"
              checked={settings.budget.allowBudgetOverrun}
              onChange={(e) => updateSetting('budget', 'allowBudgetOverrun', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="allowBudgetOverrun" className="text-sm font-medium text-gray-700">
              Allow budget overrun with approval
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Approval Reminders</h4>
              <p className="text-sm text-gray-600">Remind approvers of pending requests</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.approvalReminders}
              onChange={(e) => updateSetting('notifications', 'approvalReminders', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Budget Alerts</h4>
              <p className="text-sm text-gray-600">Alert when budget thresholds are reached</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.budgetAlerts}
              onChange={(e) => updateSetting('notifications', 'budgetAlerts', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">System Updates</h4>
              <p className="text-sm text-gray-600">Notifications about system maintenance and updates</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.systemUpdates}
              onChange={(e) => updateSetting('notifications', 'systemUpdates', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Frequency (hours)</label>
          <input
            type="number"
            min="1"
            max="168"
            value={settings.notifications.reminderFrequency}
            onChange={(e) => updateSetting('notifications', 'reminderFrequency', parseInt(e.target.value))}
            className="w-full max-w-xs px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Configuration</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              min="15"
              max="480"
              value={settings.security.sessionTimeout}
              onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Change Interval (days)</label>
            <input
              type="number"
              min="30"
              max="365"
              value={settings.security.passwordChangeInterval}
              onChange={(e) => updateSetting('security', 'passwordChangeInterval', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="requirePasswordChange"
              checked={settings.security.requirePasswordChange}
              onChange={(e) => updateSetting('security', 'requirePasswordChange', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="requirePasswordChange" className="text-sm font-medium text-gray-700">
              Require periodic password changes
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="enableTwoFactor"
              checked={settings.security.enableTwoFactor}
              onChange={(e) => updateSetting('security', 'enableTwoFactor', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="enableTwoFactor" className="text-sm font-medium text-gray-700">
              Enable two-factor authentication
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="allowMultipleSessions"
              checked={settings.security.allowMultipleSessions}
              onChange={(e) => updateSetting('security', 'allowMultipleSessions', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="allowMultipleSessions" className="text-sm font-medium text-gray-700">
              Allow multiple concurrent sessions
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'approval':
        return <ApprovalSettings />;
      case 'budget':
        return <BudgetSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">Configure system-wide policies and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/60 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
            {renderTabContent()}

            {/* Save Button */}
            <div className="flex justify-end pt-8 border-t border-gray-200 mt-8">
              <button
                onClick={saveSettings}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;