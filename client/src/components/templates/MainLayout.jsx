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
// Components
const Header_1 = __importDefault(require("../organisms/Header"));
const Footer_1 = __importDefault(require("../organisms/Footer"));
const Breadcrumbs_1 = __importDefault(require("../molecules/Breadcrumbs"));
const ScrollToTop_1 = __importDefault(require("../atoms/ScrollToTop"));
const CookieConsent_1 = __importDefault(require("../molecules/CookieConsent"));
const NotificationToast_1 = __importDefault(require("../molecules/NotificationToast"));
// Define route to breadcrumb mapping
const routeToBreadcrumb = {
    '': 'Home',
    'about': 'About Us',
    'services': 'Services',
    'contact': 'Contact',
    'request-quote': 'Request a Quote',
    'faq': 'FAQ',
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service',
};
/**
 * Main Layout Component
 *
 * This component provides the main layout structure for public-facing pages,
 * including header, footer, breadcrumbs, and notification system.
 */
const MainLayout = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const location = (0, react_router_dom_1.useLocation)();
    const { theme } = (0, react_redux_1.useSelector)((state) => state.ui);
    // Update breadcrumbs based on current route
    (0, react_1.useEffect)(() => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [{ path: '/', label: 'Home' }];
        let currentPath = '';
        pathSegments.forEach((segment) => {
            currentPath += `/${segment}`;
            const label = routeToBreadcrumb[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
            breadcrumbs.push({ path: currentPath, label });
        });
        dispatch((0, uiSlice_1.setBreadcrumbs)(breadcrumbs));
    }, [location, dispatch]);
    return (<div className={`min-h-screen flex flex-col ${theme.mode === 'dark' ? 'dark-mode' : ''}`}>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      
      {/* Header */}
      <Header_1.default />
      
      {/* Main content */}
      <main id="main-content" className="flex-grow">
        <div className="container mx-auto py-4">
          {/* Breadcrumbs */}
          <Breadcrumbs_1.default />
          
          {/* Page content */}
          <div className="mt-4 fade-in">
            <react_router_dom_1.Outlet />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer_1.default />
      
      {/* Utility components */}
      <ScrollToTop_1.default />
      <CookieConsent_1.default />
      <NotificationToast_1.default />
    </div>);
};
exports.default = MainLayout;
//# sourceMappingURL=MainLayout.jsx.map