import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  Check, 
  AlertCircle, 
  Clock, 
  ArrowLeft, 
  Filter, 
  Search,
  Trash2,
  User,
  Calendar,
  Settings,
  ShieldAlert
} from 'lucide-react';

const NotificationFullPage = () => {
  // Demo notifications
  const demoNotifications = [
    {
      id: 1,
      title: "System Update Complete",
      message: "Your system has been successfully updated to the latest version.",
      type: "success",
      priority: "low",
      time: "2 minutes ago",
      read: false,
      avatar: <Check className="text-white" size={14} />
    },
    {
      id: 2,
      title: "Security Alert",
      message: "Unusual login attempt detected from New York, USA. Please verify this was you.",
      type: "alert",
      priority: "high",
      time: "10 minutes ago",
      read: false,
      avatar: <ShieldAlert className="text-white" size={14} />
    },
    {
      id: 3,
      title: "Meeting Reminder",
      message: "Weekly team meeting starts in 15 minutes. Join via the calendar link.",
      type: "pending",
      priority: "medium",
      time: "15 minutes ago",
      read: true,
      avatar: <Calendar className="text-white" size={14} />
    },
    {
      id: 4,
      title: "Storage Limit Warning",
      message: "You've used 90% of your storage space. Consider upgrading your plan.",
      type: "alert",
      priority: "medium",
      time: "3 hours ago",
      read: true,
      avatar: <AlertCircle className="text-white" size={14} />
    },
    {
      id: 5,
      title: "Friend Request",
      message: "Sarah Johnson sent you a connection request.",
      type: "info",
      priority: "low",
      time: "5 hours ago",
      read: true,
      avatar: <User className="text-white" size={14} />
    },
    {
      id: 6,
      title: "Password Changed",
      message: "Your account password was changed successfully.",
      type: "success",
      priority: "low",
      time: "Yesterday",
      read: true,
      avatar: <Settings className="text-white" size={14} />
    }
  ];

  const [notifications, setNotifications] = useState(demoNotifications);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const onDismiss = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const onMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const onGoBack = () => {
    console.log("Go back clicked");
  };
  
  const filteredNotifications = notifications.filter(notification => {
    // Filter by type
    if (filterType !== 'all' && notification.type !== filterType) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const getAvatarClass = (type) => {
    switch (type) {
      case 'alert':
        return 'bg-red-500';
      case 'success':
        return 'bg-green-500';
      case 'pending':
        return 'bg-amber-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">High</span>;
      case 'medium':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">Medium</span>;
      case 'low':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">Low</span>;
      default:
        return null;
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg w-full ">
      <div className="flex items-center justify-between p-5 border-b bg-gray-50 rounded-t-xl">
        <div className="flex items-center">
          <button 
            onClick={onGoBack}
            className="mr-3 p-1.5 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold flex items-center text-gray-800">
            <div className="relative">
              <Bell className="mr-2 text-gray-700" size={22} />
              {getUnreadCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getUnreadCount()}
                </span>
              )}
            </div>
            Notifications
          </h2>
        </div>
        <button
          onClick={onMarkAllRead}
          className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          Mark all as read
        </button>
      </div>
      
      <div className="p-4 border-b bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2.5 w-full border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none transition-all"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <Filter size={16} className="mr-2 text-gray-500" />
            <select
              className="border rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All notifications</option>
              <option value="alert">Alerts</option>
              <option value="success">Completed</option>
              <option value="pending">Pending</option>
              <option value="info">Information</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-y-scroll max-h-fit">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Bell size={32} className="text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-700">No notifications found</p>
            <p className="text-sm mt-1">Try changing your search or filter settings</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center ${getAvatarClass(notification.type)}`}>
                      {notification.avatar}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <p className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </p>
                      <div className="flex items-center ml-4">
                        {getPriorityBadge(notification.priority)}
                      </div>
                    </div>
                    <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-gray-400">
                        {notification.time}
                      </span>
                      <button
                        onClick={() => onDismiss(notification.id)}
                        className="text-xs flex items-center text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} className="mr-1" /> Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationFullPage;