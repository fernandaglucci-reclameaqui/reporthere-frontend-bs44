import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/api/entities';
import { Notification } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCheck, Inbox, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async (currentUser) => {
    setLoading(true);
    try {
      if (currentUser && currentUser.email) {
        const userNotifications = await Notification.filter({ user_email: currentUser.email }, '-created_date');
        setNotifications(userNotifications);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        fetchNotifications(currentUser);
      } catch (error) {
        navigate(createPageUrl('Home')); // Redirect if not logged in
      }
    };
    checkUser();
  }, [navigate]);

  const handleNotificationClick = async (notification) => {
    if (!notification.read_at) {
      await Notification.update(notification.id, { read_at: new Date().toISOString() });
      fetchNotifications(user); // Re-fetch to update list
    }
    if (notification.link_url) {
        navigate(notification.link_url);
    }
  };

  const handleMarkAllRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.read_at);
    if (unreadNotifications.length === 0) return;

    try {
      const updates = unreadNotifications.map(n => Notification.update(n.id, { read_at: new Date().toISOString() }));
      await Promise.all(updates);
      fetchNotifications(user); // Re-fetch all
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  if (loading && !notifications.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          </div>
          
          {notifications.some(n => !n.read_at) && (
            <Button variant="outline" onClick={handleMarkAllRead}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        <Card>
          <CardContent className="p-0">
            {notifications.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {notifications.map(n => (
                  <li 
                    key={n.id} 
                    onClick={() => handleNotificationClick(n)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${!n.read_at ? 'bg-green-50' : 'bg-white'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 pt-1">
                        {!n.read_at && <div className="h-2.5 w-2.5 rounded-full bg-green-500" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-base font-semibold ${!n.read_at ? 'text-gray-800' : 'text-gray-600'}`}>{n.title}</p>
                        {n.body && <p className="text-sm text-gray-600 mt-1">{n.body}</p>}
                        <p className="text-xs text-gray-500 mt-2">
                          {formatDistanceToNow(new Date(n.created_date), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-20 px-6">
                <Inbox className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">All caught up!</h3>
                <p className="text-gray-500">You don't have any notifications right now.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}