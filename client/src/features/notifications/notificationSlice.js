"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNotificationDrawer = exports.toggleNotificationDrawer = exports.clearNotifications = exports.removeNotification = exports.dismissNotification = exports.markAllAsRead = exports.markAsRead = exports.addNotification = exports.useClearAllNotificationsMutation = exports.useDismissNotificationMutation = exports.useMarkAsReadMutation = exports.useGetNotificationsQuery = exports.notificationsApi = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const uuid_1 = require("uuid");
const api_1 = require("../../services/api");
// Define initial state
const initialState = {
    notifications: [],
    unreadCount: 0,
    isDrawerOpen: false,
};
// Define API endpoints
exports.notificationsApi = api_1.api.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: () => '/notifications',
            providesTags: ['Notification'],
        }),
        markAsRead: builder.mutation({
            query: (id) => ({
                url: `/notifications/${id}/read`,
                method: 'PUT',
            }),
            invalidatesTags: ['Notification'],
        }),
        dismissNotification: builder.mutation({
            query: (id) => ({
                url: `/notifications/${id}/dismiss`,
                method: 'PUT',
            }),
            invalidatesTags: ['Notification'],
        }),
        clearAllNotifications: builder.mutation({
            query: () => ({
                url: '/notifications/clear',
                method: 'PUT',
            }),
            invalidatesTags: ['Notification'],
        }),
    }),
});
// Export generated hooks
exports.useGetNotificationsQuery = exports.notificationsApi.useGetNotificationsQuery, exports.useMarkAsReadMutation = exports.notificationsApi.useMarkAsReadMutation, exports.useDismissNotificationMutation = exports.notificationsApi.useDismissNotificationMutation, exports.useClearAllNotificationsMutation = exports.notificationsApi.useClearAllNotificationsMutation;
// Create slice
const notificationSlice = (0, toolkit_1.createSlice)({
    name: 'notifications',
    initialState,
    reducers: {
        // Add a new notification
        addNotification: (state, action) => {
            const notification = {
                id: (0, uuid_1.v4)(),
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
        markAsRead: (state, action) => {
            const notification = state.notifications.find((n) => n.id === action.payload);
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
        dismissNotification: (state, action) => {
            const notification = state.notifications.find((n) => n.id === action.payload);
            if (notification) {
                notification.dismissed = true;
                if (!notification.read) {
                    notification.read = true;
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            }
        },
        // Remove a notification
        removeNotification: (state, action) => {
            const index = state.notifications.findIndex((n) => n.id === action.payload);
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
        setNotificationDrawer: (state, action) => {
            state.isDrawerOpen = action.payload;
        },
    },
});
// Export actions and reducer
_a = notificationSlice.actions, exports.addNotification = _a.addNotification, exports.markAsRead = _a.markAsRead, exports.markAllAsRead = _a.markAllAsRead, exports.dismissNotification = _a.dismissNotification, exports.removeNotification = _a.removeNotification, exports.clearNotifications = _a.clearNotifications, exports.toggleNotificationDrawer = _a.toggleNotificationDrawer, exports.setNotificationDrawer = _a.setNotificationDrawer;
exports.default = notificationSlice.reducer;
//# sourceMappingURL=notificationSlice.js.map