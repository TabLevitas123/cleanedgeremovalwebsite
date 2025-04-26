"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMfaRequired = exports.clearCredentials = exports.setCredentials = exports.logoutUser = exports.loginUser = exports.useChangePasswordMutation = exports.useUpdateMeMutation = exports.useGetMeQuery = exports.useResetPasswordMutation = exports.useForgotPasswordMutation = exports.useLogoutMutation = exports.useRefreshTokenMutation = exports.useRegisterMutation = exports.useVerifyMfaMutation = exports.useLoginMutation = exports.authApi = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = require("../../services/api");
// Define initial state
const initialState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    mfaRequired: false,
    mfaChallenge: null,
};
// Define API endpoints
exports.authApi = api_1.api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),
        verifyMfa: builder.mutation({
            query: (data) => ({
                url: '/auth/mfa/verify',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
        refreshToken: builder.mutation({
            query: (data) => ({
                url: '/auth/refresh-token',
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: '/auth/logout',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: data,
            }),
        }),
        getMe: builder.query({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),
        updateMe: builder.mutation({
            query: (userData) => ({
                url: '/auth/me',
                method: 'PUT',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: '/auth/me/password',
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});
// Export generated hooks
exports.useLoginMutation = exports.authApi.useLoginMutation, exports.useVerifyMfaMutation = exports.authApi.useVerifyMfaMutation, exports.useRegisterMutation = exports.authApi.useRegisterMutation, exports.useRefreshTokenMutation = exports.authApi.useRefreshTokenMutation, exports.useLogoutMutation = exports.authApi.useLogoutMutation, exports.useForgotPasswordMutation = exports.authApi.useForgotPasswordMutation, exports.useResetPasswordMutation = exports.authApi.useResetPasswordMutation, exports.useGetMeQuery = exports.authApi.useGetMeQuery, exports.useUpdateMeMutation = exports.authApi.useUpdateMeMutation, exports.useChangePasswordMutation = exports.authApi.useChangePasswordMutation;
// Create async thunks
exports.loginUser = (0, toolkit_1.createAsyncThunk)('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
    try {
        const result = await dispatch(exports.authApi.endpoints.login.initiate(credentials)).unwrap();
        return result;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});
exports.logoutUser = (0, toolkit_1.createAsyncThunk)('auth/logout', async (_, { dispatch, getState, rejectWithValue }) => {
    try {
        const state = getState();
        if (state.auth.refreshToken) {
            await dispatch(exports.authApi.endpoints.logout.initiate({ refreshToken: state.auth.refreshToken })).unwrap();
        }
        return { success: true };
    }
    catch (error) {
        return rejectWithValue(error);
    }
});
// Create slice
const authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.error = null;
            state.mfaRequired = false;
            state.mfaChallenge = null;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.error = null;
            state.mfaRequired = false;
            state.mfaChallenge = null;
        },
        setMfaRequired: (state, action) => {
            state.mfaRequired = action.payload.mfaRequired;
            state.mfaChallenge = action.payload.mfaChallenge;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(exports.loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(exports.loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.mfaRequired) {
                state.mfaRequired = true;
                state.mfaChallenge = action.payload.mfaChallenge || null;
            }
            else {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;
            }
        })
            .addCase(exports.loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Login failed';
        })
            // Logout
            .addCase(exports.logoutUser.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.logoutUser.fulfilled, (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            state.mfaRequired = false;
            state.mfaChallenge = null;
        })
            .addCase(exports.logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Logout failed';
        });
    },
});
// Export actions and reducer
_a = authSlice.actions, exports.setCredentials = _a.setCredentials, exports.clearCredentials = _a.clearCredentials, exports.setMfaRequired = _a.setMfaRequired;
exports.default = authSlice.reducer;
//# sourceMappingURL=authSlice.js.map