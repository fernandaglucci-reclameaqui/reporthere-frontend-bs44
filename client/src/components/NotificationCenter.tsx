import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock notification data
const initialNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Complaint Resolved',
    message: 'Amazon has responded to your complaint regarding "Package Delivery".',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'info',
    title: 'New Feature',
    message: 'Check out our new "Customer Karma" insights on company profiles.',
    time: '1 day ago',
    read: false,
  },
  {
    id: 3,
    type: 'alert',
    title: 'Action Required',
    message: 'Please verify your email address to continue posting reviews.',
    time: '2 days ago',
    read: true,
  },
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'alert': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-[#2C4A3B] hover:bg-gray-100">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-xs font-medium text-[#2C4A3B] hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id}
                  className={`p-4 cursor-pointer focus:bg-gray-50 ${!notification.read ? 'bg-blue-50/30' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3 w-full">
                    <div className={`mt-1 shrink-0 ${!notification.read ? 'opacity-100' : 'opacity-60'}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </p>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{notification.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                        {notification.message}
                      </p>
                    </div>
                    <button 
                      onClick={(e) => deleteNotification(e, notification.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-2 -mt-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-2 border-t border-gray-100 bg-gray-50 text-center">
          <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-[#2C4A3B] w-full h-8">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter;
