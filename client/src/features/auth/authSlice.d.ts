export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'employee' | 'receptionist';
    profileImage?: string;
}
export interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    mfaRequired: boolean;
    mfaChallenge: string | null;
}
export declare const authApi: import("@reduxjs/toolkit/query").Api<import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, {
    submitQuoteRequest: import("@reduxjs/toolkit/query").MutationDefinition<import("shared/src/types/quote.types").QuoteRequestBody, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", import("shared/src/types/quote.types").QuoteRequestResponse, "api">;
} & {
    login: import("@reduxjs/toolkit/query").MutationDefinition<{
        username: string;
        password: string;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        user: User;
        token: string;
        refreshToken: string;
        mfaRequired?: boolean;
        mfaChallenge?: string;
    }, "api">;
    verifyMfa: import("@reduxjs/toolkit/query").MutationDefinition<{
        username: string;
        mfaToken: string;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        user: User;
        token: string;
        refreshToken: string;
    }, "api">;
    register: import("@reduxjs/toolkit/query").MutationDefinition<{
        username: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: string;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        user: User;
        token: string;
    }, "api">;
    refreshToken: import("@reduxjs/toolkit/query").MutationDefinition<{
        refreshToken: string;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        token: string;
        refreshToken: string;
    }, "api">;
    logout: import("@reduxjs/toolkit/query").MutationDefinition<{
        refreshToken: string;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        success: boolean;
    }, "api">;
    forgotPassword: import("@reduxjs/toolkit/query").MutationDefinition<{
        email: string;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        success: boolean;
    }, "api">;
    resetPassword: import("@reduxjs/toolkit/query").MutationDefinition<{
        token: string;
        password: string;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        success: boolean;
    }, "api">;
    getMe: import("@reduxjs/toolkit/query").QueryDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        user: User;
    }, "api">;
    updateMe: import("@reduxjs/toolkit/query").MutationDefinition<Partial<Omit<User, "id" | "role">>, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        user: User;
    }, "api">;
    changePassword: import("@reduxjs/toolkit/query").MutationDefinition<{
        currentPassword: string;
        newPassword: string;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
        success: boolean;
    }, "api">;
}, "api", "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", typeof import("@reduxjs/toolkit/query").coreModuleName | typeof import("@reduxjs/toolkit/dist/query/react").reactHooksModuleName>;
export declare const useLoginMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    username: string;
    password: string;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    user: User;
    token: string;
    refreshToken: string;
    mfaRequired?: boolean;
    mfaChallenge?: string;
}, "api">>, useVerifyMfaMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    username: string;
    mfaToken: string;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    user: User;
    token: string;
    refreshToken: string;
}, "api">>, useRegisterMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    user: User;
    token: string;
}, "api">>, useRefreshTokenMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    refreshToken: string;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    token: string;
    refreshToken: string;
}, "api">>, useLogoutMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    refreshToken: string;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    success: boolean;
}, "api">>, useForgotPasswordMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    email: string;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    success: boolean;
}, "api">>, useResetPasswordMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    token: string;
    password: string;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    success: boolean;
}, "api">>, useGetMeQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    user: User;
}, "api">>, useUpdateMeMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<Partial<Omit<User, "id" | "role">>, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    user: User;
}, "api">>, useChangePasswordMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    currentPassword: string;
    newPassword: string;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, "User" | "Customer" | "Appointment" | "Service" | "Vehicle" | "TimeEntry" | "Location" | "Review" | "Notification" | "QuoteRequest", {
    success: boolean;
}, "api">>;
export declare const loginUser: import("@reduxjs/toolkit").AsyncThunk<{
    user: User;
    token: string;
    refreshToken: string;
    mfaRequired?: boolean;
    mfaChallenge?: string;
}, {
    username: string;
    password: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const logoutUser: import("@reduxjs/toolkit").AsyncThunk<{
    success: boolean;
}, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const setCredentials: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    user: User;
    token: string;
    refreshToken: string;
}, "auth/setCredentials">, clearCredentials: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearCredentials">, setMfaRequired: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    mfaRequired: boolean;
    mfaChallenge: string;
}, "auth/setMfaRequired">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
//# sourceMappingURL=authSlice.d.ts.map