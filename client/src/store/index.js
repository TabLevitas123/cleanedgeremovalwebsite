"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistor = exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const query_1 = require("@reduxjs/toolkit/query");
const redux_1 = require("redux");
const redux_persist_1 = require("redux-persist");
const storage_1 = __importDefault(require("redux-persist/lib/storage"));
const redux_thunk_1 = __importDefault(require("redux-thunk"));
// Import slices
const authSlice_1 = __importDefault(require("../features/auth/authSlice"));
const uiSlice_1 = __importDefault(require("../features/ui/uiSlice"));
const notificationSlice_1 = __importDefault(require("../features/notifications/notificationSlice"));
// Import API services
const api_1 = require("../services/api");
// Root reducer
const rootReducer = (0, redux_1.combineReducers)({
    auth: authSlice_1.default,
    ui: uiSlice_1.default,
    notifications: notificationSlice_1.default,
    [api_1.api.reducerPath]: api_1.api.reducer,
});
// Persist config
const persistConfig = {
    key: 'root',
    storage: storage_1.default,
    whitelist: ['auth'], // Only persist auth state
};
// Create persisted reducer
const persistedReducer = (0, redux_persist_1.persistReducer)(persistConfig, rootReducer);
// Configure store
exports.store = (0, toolkit_1.configureStore)({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
    }).concat(api_1.api.middleware, redux_thunk_1.default),
    devTools: process.env.NODE_ENV !== 'production',
});
// Create persistor
exports.persistor = (0, redux_persist_1.persistStore)(exports.store);
// Setup listeners for RTK Query
(0, query_1.setupListeners)(exports.store.dispatch);
//# sourceMappingURL=index.js.map