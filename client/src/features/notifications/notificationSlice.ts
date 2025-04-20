import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../../services/api';

// Define types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  dismissed: boolean;
  link?: string;
  duration?: number; // Duration in milliseconds for toast notifications
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isDrawerOpen: boolean;
}

// Define initial state
const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isDrawerOpen: false,
};

// Define API endpoints
export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => '/notifications',
      providesTags: ['Notification'],
    }),
    
    markAsRead: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notification'],
    }),
    
    dismissNotification: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/notifications/${id}/dismiss`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notification'],
    }),
    
    clearAllNotifications: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: '/notifications/clear',
        method: 'PUT',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

// Export generated hooks
export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useDismissNotificationMutation,
  useClearAllNotificationsMutation,
} = notificationsApi;

// Create slice
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Add a new notification
    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read' | 'dismissed'>>
    ) => {
      const notification: Notification = {
        id: uuidv4(),
        timestamp: Date.now(),
        read: false,
        dismissed: false,
        ...action.payload,
      };
      
      state.notifications.unshift(notification);
      state.unreadCount += 1;
      
      // Sort notifications by timestamp (newest first)
      state.notifications.sort((a, b) => b.timestamp - a.timestamp);
      
      // Limit to 100 notifications
      if (state.notifications.length > 100) {
        state.notifications = state.notifications.slice(0, 100);
      }
    },
    
    // Mark a notification as read
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    
    // Mark all notifications as read
    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    
    // Dismiss a notification
    dismissNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      
      if (notification) {
        notification.dismissed = true;
        
        if (!notification.read) {
          notification.read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }
    },
    
    // Remove a notification
    removeNotification: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex(
        (n) => n.id === action.payload
      );
      
      if (index !== -1) {
        const notification = state.notifications[index];
        
        if (!notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        
        state.notifications.splice(index, 1);
      }
    },
    
    // Clear all notifications
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    
    // Toggle notification drawer
    toggleNotificationDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    
    // Set notification drawer state
    setNotificationDrawer: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  dismissNotification,
  removeNotification,
  clearNotifications,
  toggleNotificationDrawer,
  setNotificationDrawer,
} = notificationSlice.actions;

export default notificationSlice.reducer;