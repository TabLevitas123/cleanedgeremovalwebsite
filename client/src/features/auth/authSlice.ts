import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../services/api';

// Define types
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

// Define initial state
const initialState: AuthState = {
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
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { user: User; token: string; refreshToken: string; mfaRequired?: boolean; mfaChallenge?: string },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    
    verifyMfa: builder.mutation<
      { user: User; token: string; refreshToken: string },
      { username: string; mfaToken: string }
    >({
      query: (data) => ({
        url: '/auth/mfa/verify',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    
    register: builder.mutation<
      { user: User; token: string },
      { username: string; email: string; password: string; firstName: string; lastName: string; role: string }
    >({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    
    refreshToken: builder.mutation<
      { token: string; refreshToken: string },
      { refreshToken: string }
    >({
      query: (data) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: data,
      }),
    }),
    
    logout: builder.mutation<{ success: boolean }, { refreshToken: string }>({
      query: (data) => ({
        url: '/auth/logout',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    
    forgotPassword: builder.mutation<{ success: boolean }, { email: string }>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    
    resetPassword: builder.mutation<
      { success: boolean },
      { token: string; password: string }
    >({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    
    getMe: builder.query<{ user: User }, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    
    updateMe: builder.mutation<
      { user: User },
      Partial<Omit<User, 'id' | 'role'>>
    >({
      query: (userData) => ({
        url: '/auth/me',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    
    changePassword: builder.mutation<
      { success: boolean },
      { currentPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: '/auth/me/password',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

// Export generated hooks
export const {
  useLoginMutation,
  useVerifyMfaMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useChangePasswordMutation,
} = authApi;

// Create async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(authApi.endpoints.login.initiate(credentials)).unwrap();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      if (state.auth.refreshToken) {
        await dispatch(authApi.endpoints.logout.initiate({ refreshToken: state.auth.refreshToken })).unwrap();
      }
      return { success: true };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        refreshToken: string;
      }>
    ) => {
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
    setMfaRequired: (
      state,
      action: PayloadAction<{ mfaRequired: boolean; mfaChallenge: string }>
    ) => {
      state.mfaRequired = action.payload.mfaRequired;
      state.mfaChallenge = action.payload.mfaChallenge;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.mfaRequired) {
          state.mfaRequired = true;
          state.mfaChallenge = action.payload.mfaChallenge || null;
        } else {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.isAuthenticated = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Login failed';
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
        state.mfaRequired = false;
        state.mfaChallenge = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Logout failed';
      });
  },
});

// Export actions and reducer
export const { setCredentials, clearCredentials, setMfaRequired } = authSlice.actions;
export default authSlice.reducer;