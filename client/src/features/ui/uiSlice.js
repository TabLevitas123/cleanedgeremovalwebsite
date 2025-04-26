"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearLoadedPages = exports.setPageLoaded = exports.clearBreadcrumbs = exports.removeBreadcrumb = exports.addBreadcrumb = exports.setBreadcrumbs = exports.setIsMobile = exports.closeDrawer = exports.openDrawer = exports.closeModal = exports.openModal = exports.setLoading = exports.setActiveSidebarItem = exports.setSidebarOpen = exports.toggleSidebar = exports.setThemeColors = exports.setThemeMode = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
// Define initial state
const initialState = {
    theme: {
        mode: 'light',
        primaryColor: '#1A5F7A', // Clean Edge blue
        secondaryColor: '#57CC99', // Clean Edge green
        accentColor: '#F2C94C', // Clean Edge yellow
    },
    sidebar: {
        isOpen: true,
        activeItem: null,
    },
    isLoading: false,
    modal: {
        isOpen: false,
        type: null,
        data: null,
    },
    drawer: {
        isOpen: false,
        type: null,
        data: null,
    },
    isMobile: false,
    breadcrumbs: [],
    loadedPages: [],
};
// Create slice
const uiSlice = (0, toolkit_1.createSlice)({
    name: 'ui',
    initialState,
    reducers: {
        // Theme actions
        setThemeMode: (state, action) => {
            state.theme.mode = action.payload;
        },
        setThemeColors: (state, action) => {
            if (action.payload.primaryColor) {
                state.theme.primaryColor = action.payload.primaryColor;
            }
            if (action.payload.secondaryColor) {
                state.theme.secondaryColor = action.payload.secondaryColor;
            }
            if (action.payload.accentColor) {
                state.theme.accentColor = action.payload.accentColor;
            }
        },
        // Sidebar actions
        toggleSidebar: (state) => {
            state.sidebar.isOpen = !state.sidebar.isOpen;
        },
        setSidebarOpen: (state, action) => {
            state.sidebar.isOpen = action.payload;
        },
        setActiveSidebarItem: (state, action) => {
            state.sidebar.activeItem = action.payload;
        },
        // Loading state actions
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        // Modal actions
        openModal: (state, action) => {
            state.modal.isOpen = true;
            state.modal.type = action.payload.type;
            state.modal.data = action.payload.data || null;
        },
        closeModal: (state) => {
            state.modal.isOpen = false;
            state.modal.type = null;
            state.modal.data = null;
        },
        // Drawer actions
        openDrawer: (state, action) => {
            state.drawer.isOpen = true;
            state.drawer.type = action.payload.type;
            state.drawer.data = action.payload.data || null;
        },
        closeDrawer: (state) => {
            state.drawer.isOpen = false;
            state.drawer.type = null;
            state.drawer.data = null;
        },
        // Responsive state actions
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
            // Auto-close sidebar on mobile
            if (action.payload && state.sidebar.isOpen) {
                state.sidebar.isOpen = false;
            }
        },
        // Breadcrumb actions
        setBreadcrumbs: (state, action) => {
            state.breadcrumbs = action.payload;
        },
        addBreadcrumb: (state, action) => {
            state.breadcrumbs.push(action.payload);
        },
        removeBreadcrumb: (state, action) => {
            state.breadcrumbs = state.breadcrumbs.filter((breadcrumb) => breadcrumb.path !== action.payload);
        },
        clearBreadcrumbs: (state) => {
            state.breadcrumbs = [];
        },
        // Page loading tracking
        setPageLoaded: (state, action) => {
            if (!state.loadedPages.includes(action.payload)) {
                state.loadedPages.push(action.payload);
            }
        },
        clearLoadedPages: (state) => {
            state.loadedPages = [];
        },
    },
});
// Export actions and reducer
_a = uiSlice.actions, exports.setThemeMode = _a.setThemeMode, exports.setThemeColors = _a.setThemeColors, exports.toggleSidebar = _a.toggleSidebar, exports.setSidebarOpen = _a.setSidebarOpen, exports.setActiveSidebarItem = _a.setActiveSidebarItem, exports.setLoading = _a.setLoading, exports.openModal = _a.openModal, exports.closeModal = _a.closeModal, exports.openDrawer = _a.openDrawer, exports.closeDrawer = _a.closeDrawer, exports.setIsMobile = _a.setIsMobile, exports.setBreadcrumbs = _a.setBreadcrumbs, exports.addBreadcrumb = _a.addBreadcrumb, exports.removeBreadcrumb = _a.removeBreadcrumb, exports.clearBreadcrumbs = _a.clearBreadcrumbs, exports.setPageLoaded = _a.setPageLoaded, exports.clearLoadedPages = _a.clearLoadedPages;
exports.default = uiSlice.reducer;
//# sourceMappingURL=uiSlice.js.map