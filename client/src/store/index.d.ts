export declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("redux").EmptyObject & {
    auth: import("../features/auth/authSlice").AuthState;
    ui: import("../features/ui/uiSlice").UiState;
    notifications: import("../features/notifications/notificationSlice").NotificationState;
    api: import("@reduxjs/toolkit/query").CombinedState<{
        submitQuoteRequest: import("@reduxjs/toolkit/query").MutationDefinition<import("shared/src/types/quote.types").QuoteRequestBody, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", import("shared/src/types/quote.types").QuoteRequestResponse, "api">;
    }, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", "api">;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<[import("redux-thunk").ThunkMiddleware<import("redux").EmptyObject & {
    auth: import("../features/auth/authSlice").AuthState;
    ui: import("../features/ui/uiSlice").UiState;
    notifications: import("../features/notifications/notificationSlice").NotificationState;
    api: import("@reduxjs/toolkit/query").CombinedState<{
        submitQuoteRequest: import("@reduxjs/toolkit/query").MutationDefinition<import("shared/src/types/quote.types").QuoteRequestBody, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", import("shared/src/types/quote.types").QuoteRequestResponse, "api">;
    }, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", "api">;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").AnyAction>, import("redux").Middleware<{}, import("@reduxjs/toolkit/query").RootState<{
    submitQuoteRequest: import("@reduxjs/toolkit/query").MutationDefinition<import("shared/src/types/quote.types").QuoteRequestBody, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", import("shared/src/types/quote.types").QuoteRequestResponse, "api">;
}, string, "api">, import("redux-thunk").ThunkDispatch<any, any, import("redux").AnyAction>>, import("redux-thunk").ThunkMiddleware<any, import("redux").AnyAction, undefined> & {
    withExtraArgument<ExtraThunkArg, State = any, BasicAction extends import("redux").Action<any> = import("redux").AnyAction>(extraArgument: ExtraThunkArg): import("redux-thunk").ThunkMiddleware<State, BasicAction, ExtraThunkArg>;
}]>>;
export declare const persistor: import("redux-persist").Persistor;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//# sourceMappingURL=index.d.ts.map