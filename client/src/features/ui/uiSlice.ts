import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export interface SidebarState {
  isOpen: boolean;
  activeItem: string | null;
}

export interface UiState {
  theme: Theme;
  sidebar: SidebarState;
  isLoading: boolean;
  modal: {
    isOpen: boolean;
    type: string | null;
    data: any;
  };
  drawer: {
    isOpen: boolean;
    type: string | null;
    data: any;
  };
  isMobile: boolean;
  breadcrumbs: {
    path: string;
    label: string;
  }[];
  loadedPages: string[];
}

// Define initial state
const initialState: UiState = {
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
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Theme actions
    setThemeMode: (state: UiState, action: PayloadAction<'light' | 'dark'>) => {
      state.theme.mode = action.payload;
    },
    setThemeColors: (
      state: UiState,
      action: PayloadAction<{
        primaryColor?: string;
        secondaryColor?: string;
        accentColor?: string;
      }>
    ) => {
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
    toggleSidebar: (state: UiState) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    setSidebarOpen: (state: UiState, action: PayloadAction<boolean>) => {
      state.sidebar.isOpen = action.payload;
    },
    setActiveSidebarItem: (state: UiState, action: PayloadAction<string | null>) => {
      state.sidebar.activeItem = action.payload;
    },
    
    // Loading state actions
    setLoading: (state: UiState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    // Modal actions
    openModal: (
      state: UiState,
      action: PayloadAction<{ type: string; data?: any }>
    ) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data || null;
    },
    closeModal: (state: UiState) => {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.data = null;
    },
    
    // Drawer actions
    openDrawer: (
      state: UiState,
      action: PayloadAction<{ type: string; data?: any }>
    ) => {
      state.drawer.isOpen = true;
      state.drawer.type = action.payload.type;
      state.drawer.data = action.payload.data || null;
    },
    closeDrawer: (state: UiState) => {
      state.drawer.isOpen = false;
      state.drawer.type = null;
      state.drawer.data = null;
    },
    
    // Responsive state actions
    setIsMobile: (state: UiState, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
      // Auto-close sidebar on mobile
      if (action.payload && state.sidebar.isOpen) {
        state.sidebar.isOpen = false;
      }
    },
    
    // Breadcrumb actions
    setBreadcrumbs: (
      state: UiState,
      action: PayloadAction<{ path: string; label: string }[]>
    ) => {
      state.breadcrumbs = action.payload;
    },
    addBreadcrumb: (
      state: UiState,
      action: PayloadAction<{ path: string; label: string }>
    ) => {
      state.breadcrumbs.push(action.payload);
    },
    removeBreadcrumb: (state: UiState, action: PayloadAction<string>) => {
      state.breadcrumbs = state.breadcrumbs.filter(
        (breadcrumb: { path: string; label: string }) => breadcrumb.path !== action.payload
      );
    },
    clearBreadcrumbs: (state: UiState) => {
      state.breadcrumbs = [];
    },
    
    // Page loading tracking
    setPageLoaded: (state: UiState, action: PayloadAction<string>) => {
      if (!state.loadedPages.includes(action.payload)) {
        state.loadedPages.push(action.payload);
      }
    },
    clearLoadedPages: (state: UiState) => {
      state.loadedPages = [];
    },
  },
});

// Export actions and reducer
export const {
  setThemeMode,
  setThemeColors,
  toggleSidebar,
  setSidebarOpen,
  setActiveSidebarItem,
  setLoading,
  openModal,
  closeModal,
  openDrawer,
  closeDrawer,
  setIsMobile,
  setBreadcrumbs,
  addBreadcrumb,
  removeBreadcrumb,
  clearBreadcrumbs,
  setPageLoaded,
  clearLoadedPages,
} = uiSlice.actions;

export default uiSlice.reducer;