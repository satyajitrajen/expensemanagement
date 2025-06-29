import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bell, CheckCircle, XCircle, Clock, AlertTriangle, Info, Trash2, AreaChart as MarkAsUnread, Filter, Search } from 'lucide-react';

const Notifications: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock notifications data
  const mockNotifications = [
    {
      id: '1',
      type: 'approval_request',
      title: 'New Expense Approval Required',
      message: 'John Doe has submitted an expense request for $420.00 (Travel) that requires your approval.',
      isRead: false,
      createdAt: '2024-01-20T10:30:00Z',
      relatedRequestId: 'REQ-001',
      priority: 'high'
    },
    {
      id: '2',
      type: 'status_update',
      title: 'Expense Request Approved',
      message: 'Your expense request REQ-002 for $85.50 has been approved by Jane Smith.',
      isRead: false,
      createdAt: '2024-01-20T09:15:00Z',
      relatedRequestId: 'REQ-002',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'budget_alert',
      title: 'Budget Usage Alert',
      message: 'Engineering department has used 85% of their monthly budget. Consider reviewing upcoming expenses.',
      isRead: true,
      createdAt: '2024-01-19T16:45:00Z',
      priority: 'high'
    },
    {
      id: '4',
      type: 'status_update',
      title: 'Expense Request Rejected',
      message: 'Your pre-book request REQ-003 for $1,200.00 has been rejected. Reason: Budget not available for Q1.',
      isRead: true,
      createdAt: '2024-01-19T14:20:00Z',
      relatedRequestId: 'REQ-003',
      priority: 'medium'
    },
    {
      id: '5',
      type: 'system',
      title: 'System Maintenance Scheduled',
      message: 'The expense management system will undergo maintenance on January 25th from 2:00 AM to 4:00 AM.',
      isRead: true,
      createdAt: '2024-01-18T11:00:00Z',
      priority: 'low'
    },
    {
      id: '6',
      type: 'approval_request',
      title: 'Pre-book Request Needs Approval',
      message: 'Alice Johnson has submitted a pre-book request for $2,400.00 (Equipment) awaiting your approval.',
      isRead: false,
      createdAt: '2024-01-18T08:30:00Z',
      relatedRequestId: 'REQ-006',
      priority: 'medium'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'approval_request':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'status_update':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'budget_alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'system':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-orange-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = mockNotifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !notification.isRead) ||
                         (filter === 'read' && notification.isRead) ||
                         notification.type === filter;
    
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    alert(`Notification ${id} marked as read`);
  };

  const markAsUnread = (id: string) => {
    alert(`Notification ${id} marked as unread`);
  };

  const deleteNotification = (id: string) => {
    alert(`Notification ${id} deleted`);
  };

  const markAllAsRead = () => {
    alert('All notifications marked as read');
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Center</h1>
            <p className="text-gray-600">Stay updated with important alerts and updates</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {unreadCount} unread
            </div>
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
            >
              Mark All Read
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 appearance-none"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="approval_request">Approval Requests</option>
              <option value="status_update">Status Updates</option>
              <option value="budget_alert">Budget Alerts</option>
              <option value="system">System Notifications</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 border-l-4 ${getPriorityColor(notification.priority)} ${
              !notification.isRead ? 'bg-blue-50/30' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{getTimeAgo(notification.createdAt)}</span>
                    {notification.relatedRequestId && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-blue-600">
                          {notification.relatedRequestId}
                        </span>
                      </>
                    )}
                    <span>•</span>
                    <span className="capitalize">{notification.priority} priority</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {notification.isRead ? (
                  <button
                    onClick={() => markAsUnread(notification.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                    title="Mark as unread"
                  >
                    <MarkAsUnread className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                    title="Mark as read"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
                
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-12 text-center">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'You\'re all caught up! No new notifications at this time.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;