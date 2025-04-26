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
const Logo_1 = __importDefault(require("../atoms/Logo"));
const NotificationToast_1 = __importDefault(require("../molecules/NotificationToast"));
/**
 * AuthLayout Component
 *
 * Layout template for authentication-related pages (login, register, etc.).
 * Provides a clean, focused interface for authentication actions.
 * Redirects authenticated users away from auth pages.
 */
const AuthLayout = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const { isAuthenticated, user } = (0, react_redux_1.useSelector)((state) => state.auth);
    const { theme } = (0, react_redux_1.useSelector)((state) => state.ui);
    // Redirect authenticated users to appropriate page
    (0, react_1.useEffect)(() => {
        if (isAuthenticated) {
            // Get the redirect path from query params or use default based on user role
            const params = new URLSearchParams(location.search);
            const redirectPath = params.get('redirect') || getDefaultRedirect(user?.role);
            navigate(redirectPath, { replace: true });
        }
    }, [isAuthenticated, user, navigate, location]);
    // Determine default redirect based on user role
    const getDefaultRedirect = (role) => {
        switch (role) {
            case 'admin':
                return '/admin';
            case 'employee':
                return '/employee';
            default:
                return '/';
        }
    };
    return (<div className={`min-h-screen flex flex-col ${theme.mode === 'dark' ? 'dark-mode' : ''}`}>
      {/* Header with logo */}
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <a href="/" className="inline-block">
            <Logo_1.default size="medium"/>
          </a>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 md:p-8">
            {/* Auth form content */}
            <react_router_dom_1.Outlet />
          </div>
          
          {/* Additional info or links */}
          <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              &copy; {new Date().getFullYear()} Clean Edge Removal LLC. All rights reserved.
            </p>
            <div className="mt-2 space-x-4">
              <a href="/privacy-policy" className="text-primary-color hover:text-primary-light hover:underline transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-primary-color hover:text-primary-light hover:underline transition-colors">
                Terms of Service
              </a>
              <a href="/contact" className="text-primary-color hover:text-primary-light hover:underline transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </main>
      
      {/* Notifications */}
      <NotificationToast_1.default position="top-right"/>
    </div>);
};
exports.default = AuthLayout;
//# sourceMappingURL=AuthLayout.js.map