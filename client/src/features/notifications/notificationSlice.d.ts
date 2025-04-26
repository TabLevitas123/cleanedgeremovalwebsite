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
    duration?: number;
}
export interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
    isDrawerOpen: boolean;
}
export declare const notificationsApi: import("@reduxjs/toolkit/query").Api<import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, {
    submitQuoteRequest: import("@reduxjs/toolkit/query").MutationDefinition<import("shared/src/types/quote.types").QuoteRequestBody, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", import("shared/src/types/quote.types").QuoteRequestResponse, "api">;
} & {
    getNotifications: import("@reduxjs/toolkit/query").QueryDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", Notification[], "api">;
    markAsRead: import("@reduxjs/toolkit/query").MutationDefinition<string, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        success: boolean;
    }, "api">;
    dismissNotification: import("@reduxjs/toolkit/query").MutationDefinition<string, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        success: boolean;
    }, "api">;
    clearAllNotifications: import("@reduxjs/toolkit/query").MutationDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        success: boolean;
    }, "api">;
}, "api", "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", typeof import("@reduxjs/toolkit/query").coreModuleName | typeof import("@reduxjs/toolkit/dist/query/react").reactHooksModuleName>;
export declare const useGetNotificationsQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", Notification[], "api">>, useMarkAsReadMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<string, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    success: boolean;
}, "api">>, useDismissNotificationMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<string, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    success: boolean;
}, "api">>, useClearAllNotificationsMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    success: boolean;
}, "api">>;
export declare const addNotification: import("@reduxjs/toolkit").ActionCreatorWithPayload<Omit<Notification, "id" | "timestamp" | "read" | "dismissed">, "notifications/addNotification">, markAsRead: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "notifications/markAsRead">, markAllAsRead: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"notifications/markAllAsRead">, dismissNotification: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "notifications/dismissNotification">, removeNotification: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "notifications/removeNotification">, clearNotifications: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"notifications/clearNotifications">, toggleNotificationDrawer: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"notifications/toggleNotificationDrawer">, setNotificationDrawer: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "notifications/setNotificationDrawer">;
declare const _default: import("redux").Reducer<NotificationState>;
export default _default;
//# sourceMappingURL=notificationSlice.d.ts.map