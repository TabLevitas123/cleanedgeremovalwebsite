import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// Import slices
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import notificationReducer from '../features/notifications/notificationSlice';

// Import API services
import { api } from '../services/api';

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notifications: notificationReducer,
  [api.reducerPath]: api.reducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist auth state
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(api.middleware, thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

// Setup listeners for RTK Query
setupListeners(store.dispatch);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;