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
export declare const setThemeMode: import("@reduxjs/toolkit").ActionCreatorWithPayload<"light" | "dark", "ui/setThemeMode">, setThemeColors: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
}, "ui/setThemeColors">, toggleSidebar: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"ui/toggleSidebar">, setSidebarOpen: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "ui/setSidebarOpen">, setActiveSidebarItem: import("@reduxjs/toolkit").ActionCreatorWithPayload<string | null, "ui/setActiveSidebarItem">, setLoading: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "ui/setLoading">, openModal: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    type: string;
    data?: any;
}, "ui/openModal">, closeModal: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"ui/closeModal">, openDrawer: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    type: string;
    data?: any;
}, "ui/openDrawer">, closeDrawer: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"ui/closeDrawer">, setIsMobile: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "ui/setIsMobile">, setBreadcrumbs: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    path: string;
    label: string;
}[], "ui/setBreadcrumbs">, addBreadcrumb: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    path: string;
    label: string;
}, "ui/addBreadcrumb">, removeBreadcrumb: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "ui/removeBreadcrumb">, clearBreadcrumbs: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"ui/clearBreadcrumbs">, setPageLoaded: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "ui/setPageLoaded">, clearLoadedPages: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"ui/clearLoadedPages">;
declare const _default: import("redux").Reducer<UiState>;
export default _default;
//# sourceMappingURL=uiSlice.d.ts.map