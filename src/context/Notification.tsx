import { addDoc, collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Notification {
  id?: string;
  message: string;
  seen: boolean;
  createdAt: Timestamp;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: () => void;
  fetchNotifications: () => void;
  addNotification: (newNotification: Omit<Notification, 'id'>) => Promise<void>; // ✅ Added
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const fetchNotifications = async () => {
    try {
      const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: Notification[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Notification),
      }));
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.seen).length);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, seen: true }));
    setNotifications(updated);
    setUnreadCount(0);
    // Optionally update seen status in Firestore
  };

  const addNotification = async (newNotification: Omit<Notification, 'id'>) => {
    try {
      await addDoc(collection(db, 'notifications'), newNotification);
      await fetchNotifications(); // Refresh notifications after adding
    } catch (error) {
      console.error('Failed to add notification:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, fetchNotifications, addNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
