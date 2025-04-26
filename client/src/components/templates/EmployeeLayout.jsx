"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const uiSlice_1 = require("../../features/ui/uiSlice");
const authSlice_1 = require("../../features/auth/authSlice");
// Components
const Logo_1 = __importDefault(require("../atoms/Logo"));
const Icon_1 = __importDefault(require("../atoms/Icon"));
const Button_1 = __importDefault(require("../atoms/Button"));
const UserMenu_1 = __importDefault(require("../molecules/UserMenu"));
const NotificationToast_1 = __importDefault(require("../molecules/NotificationToast"));
const ScrollToTop_1 = __importDefault(require("../atoms/ScrollToTop"));
/**
 * EmployeeLayout Component
 *
 * Layout template for employee dashboard pages.
 * Includes simplified sidebar navigation, header with user menu, and main content area.
 * Restricts access to employee users only.
 */
const EmployeeLayout = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const { theme, isSidebarOpen, isMobile } = (0, react_redux_1.useSelector)((state) => state.ui);
    const { user } = (0, react_redux_1.useSelector)((state) => state.auth);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    // Fetch user data
    const { isLoading: isUserLoading, isError } = (0, authSlice_1.useGetMeQuery)(undefined);
    // Set loading state based on user data fetch
    (0, react_1.useEffect)(() => {
        setIsLoading(isUserLoading);
    }, [isUserLoading]);
    // Redirect non-employee users
    (0, react_1.useEffect)(() => {
        if (!isLoading && (!user || user.role !== 'employee')) {
            navigate('/unauthorized', { replace: true });
        }
    }, [user, isLoading, navigate]);
    // Handle API error
    (0, react_1.useEffect)(() => {
        if (isError) {
            navigate('/login', { replace: true });
        }
    }, [isError, navigate]);
    // Toggle sidebar
    const handleToggleSidebar = () => {
        dispatch((0, uiSlice_1.toggleSidebar)());
    };
    // Navigation links
    const navLinks = [
        { path: '/employee', label: 'Dashboard', icon: 'home' },
        { path: '/employee/appointments', label: 'Appointments', icon: 'calendar' },
        { path: '/employee/customers', label: 'Customers', icon: 'user' },
        { path: '/employee/time-tracking', label: 'Time Tracking', icon: 'clock' },
        { path: '/employee/profile', label: 'Profile', icon: 'user' },
    ];
    // Check if a link is active
    const isActive = (path) => {
        if (path === '/employee') {
            return location.pathname === '/employee';
        }
        return location.pathname.startsWith(path);
    };
    // If loading, show loading state
    if (isLoading) {
        return (<div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <Icon_1.default name="loader" size="large" className="animate-spin text-primary-color mb-4"/>
          <p className="text-neutral-600 dark:text-neutral-400">Loading employee dashboard...</p>
        </div>
      </div>);
    }
    return (<div className={`min-h-screen flex flex-col ${theme.mode === 'dark' ? 'dark-mode' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-neutral-800 shadow-sm z-10 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and sidebar toggle */}
            <div className="flex items-center">
              <button onClick={handleToggleSidebar} className="mr-4 p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none" aria-label="Toggle sidebar">
                <Icon_1.default name={isSidebarOpen ? 'menu-open' : 'menu'} size="medium"/>
              </button>
              <Logo_1.default size="small"/>
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Clock In/Out Button */}
              <Button_1.default variant={user?.clockedIn ? 'secondary' : 'primary'} size="small" icon={user?.clockedIn ? 'clock' : 'play'} onClick={() => navigate('/employee/time-tracking')}>
                {user?.clockedIn ? 'Clocked In' : 'Clock In'}
              </Button_1.default>
              
              {/* Notifications */}
              <Button_1.default variant="text" icon="bell" aria-label="Notifications" onClick={() => navigate('/employee/notifications')}/>
              
              {/* User menu */}
              {user && <UserMenu_1.default user={user} onLogout={() => navigate('/login')}/>}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content with sidebar */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            ${isMobile ? 'fixed inset-y-0 left-0 z-20' : 'relative'}
            w-64 bg-neutral-800 text-white transition-transform duration-300 ease-in-out
          `}>
          {/* Sidebar content */}
          <div className="h-full flex flex-col">
            {/* User info */}
            <div className="p-4 border-b border-neutral-700">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-color flex items-center justify-center text-white mr-3">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'E'}
                </div>
                <div>
                  <div className="font-medium text-white">{user?.name || 'Employee'}</div>
                  <div className="text-xs text-neutral-400">{user?.email || 'employee@example.com'}</div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-grow py-4">
              <ul className="space-y-1 px-2">
                {navLinks.map((link) => (<li key={link.path}>
                    <a href={link.path} className={`
                        flex items-center px-4 py-3 rounded-md transition-colors
                        ${isActive(link.path)
                ? 'bg-primary-color text-white'
                : 'text-neutral-300 hover:bg-neutral-700'}
                      `} aria-current={isActive(link.path) ? 'page' : undefined}>
                      <Icon_1.default name={link.icon} size="small" className="mr-3"/>
                      <span>{link.label}</span>
                    </a>
                  </li>))}
              </ul>
            </nav>
            
            {/* Sidebar footer */}
            <div className="p-4 border-t border-neutral-700">
              <div className="text-xs text-neutral-400">
                <p>Employee Dashboard</p>
                <p>v1.0.0</p>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Backdrop for mobile sidebar */}
        {isMobile && isSidebarOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={handleToggleSidebar} aria-hidden="true"/>)}
        
        {/* Main content */}
        <main className={`flex-grow bg-neutral-50 dark:bg-neutral-900 ${isMobile ? 'w-full' : ''}`}>
          <div className="container mx-auto px-4 py-6">
            <react_router_dom_1.Outlet />
          </div>
        </main>
      </div>
      
      {/* Utility components */}
      <ScrollToTop_1.default />
      <NotificationToast_1.default position="top-right"/>
    </div>);
};
exports.default = EmployeeLayout;
//# sourceMappingURL=EmployeeLayout.jsx.map