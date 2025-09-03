"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, CheckSquare2, Square } from "lucide-react";
import { EmptyNotification } from "@/components/Svgs";

interface Notification {
  id: string | number;  // Changed to allow both string and number for quote notifications
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

const NOTIFICATIONS_PER_PAGE = 5;

export default function ProfilePage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedNotifications, setSelectedNotifications] = useState<(string | number)[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async (pageNum = 1, isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      }
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: pageNum,
          limit: NOTIFICATIONS_PER_PAGE,
        }),
      });
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();

      if (isInitialLoad) {
        setNotifications(data.notifications);
      } else {
        // Create a Set of existing notification IDs for faster lookup
        const existingIds = new Set(notifications.map(n => n.id));
        
        // Filter out any notifications that already exist
        const newNotifications = data.notifications.filter(
          (newNotif: Notification) => !existingIds.has(newNotif.id)
        );
        
        setNotifications(prev => [...prev, ...newNotifications]);
      }
      setHasMore(data.hasMore);
      setPage(pageNum);
    } catch (error) {
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationIds: (string | number)[]) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationIds }),
      });

      if (!response.ok) throw new Error('Failed to mark notifications as read');

      setNotifications(prev =>
        prev.map(notification =>
          notificationIds.includes(notification.id)
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      toast.error('Failed to mark notifications as read');
    }
  };

  const deleteNotification = async (notificationIds: (string | number)[]) => {
    try {
      // Delete notifications one by one
      await Promise.all(
        notificationIds.map(id =>
          fetch(`/api/notifications/${id}`, {
            method: 'DELETE',
          })
        )
      );

      setNotifications(prev => prev.filter(n => !notificationIds.includes(n.id)));
      setSelectedNotifications([]);
      toast.success('Notifications deleted successfully');
    } catch (error) {
      toast.error('Failed to delete notifications');
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchNotifications(page + 1);
    }
  };

  const toggleSelectAll = () => {
    if (selectedNotifications.length === notifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(notifications.map(n => n.id));
    }
  };

  const toggleSelectNotification = (id: string | number) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(n => n !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="grid gap-6 px-2 sm:px-4 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <div className="flex gap-2">
          {selectedNotifications.length > 0 && (
            <Button
              variant="destructive"
              onClick={() => deleteNotification(selectedNotifications)}
            >
              Delete Selected ({selectedNotifications.length})
            </Button>
          )}
          {notifications.some(n => !n.read) && (
            <Button
              variant="outline"
              onClick={() => markAsRead(notifications.filter(n => !n.read).map(n => n.id))}
            >
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {loading && page === 1 ? (
          // Skeleton loading state
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 rounded-lg border bg-white dark:bg-zinc-800">
                <div className="flex justify-between items-start">
                  <div className="space-y-3 w-full">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/6" />
                  </div>
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="mx-auto h-20 w-20 text-gray-400 mb-4">
              <EmptyNotification />
            </div>
            <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              You're all caught up! New notifications will appear here when there's something to review.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSelectAll}
                className="flex items-center gap-2"
              >
                {selectedNotifications.length === notifications.length ? (
                  <CheckSquare2 className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                {selectedNotifications.length === notifications.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 sm:p-4 rounded-lg border dark:bg-zinc-800 ${
                  notification.read ? 'bg-gray-50' : 'bg-white'
                } ${selectedNotifications.includes(notification.id) ? 'ring-2 ring-red-500' : ''} overflow-x-auto`}
                style={{ maxWidth: "100vw" }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 w-full">
                  <div className="flex gap-3 items-start flex-1 w-full min-w-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSelectNotification(notification.id)}
                      className="p-0 h-6"
                    >
                      {selectedNotifications.includes(notification.id) ? (
                        <CheckSquare2 className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </Button>
                    <div className="min-w-0 w-full">
                      <h3 className="font-semibold break-words">{notification.title}</h3>
                      <p className="mt-1 text-gray-600 break-all">{notification.message}</p>
                      <p className="mt-2 text-sm text-gray-400">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0 flex-shrink-0">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead([notification.id])}
                      >
                        Mark as read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification([notification.id])}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {hasMore && (
              <div className="text-center mt-4">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
