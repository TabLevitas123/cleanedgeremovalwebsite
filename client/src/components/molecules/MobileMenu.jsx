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
const Button_1 = __importDefault(require("../atoms/Button"));
const Icon_1 = __importDefault(require("../atoms/Icon"));
/**
 * MobileMenu Component
 *
 * A responsive mobile navigation menu that slides in from the right.
 * Includes navigation links, authentication buttons, and theme toggle.
 */
const MobileMenu = ({ navLinks, isAuthenticated, activeLink, onClose, onLogout, }) => {
    const { theme } = (0, react_redux_1.useSelector)((state) => state.ui);
    const { user } = (0, react_redux_1.useSelector)((state) => state.auth);
    // Close menu when pressing escape key
    (0, react_1.useEffect)(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        // Prevent scrolling when menu is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [onClose]);
    // Handle link click
    const handleLinkClick = () => {
        onClose();
    };
    // Handle logout
    const handleLogout = () => {
        onLogout();
        onClose();
    };
    // Determine if a link is active
    const isActive = (path) => {
        if (path === '/') {
            return activeLink === '/';
        }
        return activeLink.startsWith(path);
    };
    return (<>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-40" onClick={onClose} aria-hidden="true"/>
      
      {/* Menu */}
      <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-neutral-800 shadow-xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            Menu
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors" aria-label="Close menu">
            <Icon_1.default name="x" size="medium" className="text-neutral-700 dark:text-neutral-300"/>
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (<li key={link.path}>
                <react_router_dom_1.Link to={link.path} onClick={handleLinkClick} className={`block py-2 px-4 rounded-md transition-colors ${isActive(link.path)
                ? 'bg-primary-color text-white'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'}`} aria-current={isActive(link.path) ? 'page' : undefined}>
                  {link.label}
                </react_router_dom_1.Link>
              </li>))}
          </ul>
        </nav>
        
        {/* Divider */}
        <div className="border-t border-neutral-200 dark:border-neutral-700 my-2"/>
        
        {/* Auth Section */}
        <div className="p-4">
          {isAuthenticated ? (<div className="space-y-4">
              {/* User Info */}
              <div className="flex items-center p-4 bg-neutral-100 dark:bg-neutral-700 rounded-md">
                <div className="w-10 h-10 rounded-full bg-primary-color flex items-center justify-center text-white mr-3">
                  <Icon_1.default name="user" size="medium"/>
                </div>
                <div>
                  <div className="font-medium text-neutral-800 dark:text-neutral-200">
                    {user?.name || 'User'}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {user?.email || 'user@example.com'}
                  </div>
                </div>
              </div>
              
              {/* User Links */}
              <div className="space-y-2">
                <react_router_dom_1.Link to="/profile" onClick={handleLinkClick} className="flex items-center py-2 px-4 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                  <Icon_1.default name="user" size="small" className="mr-2"/>
                  Profile
                </react_router_dom_1.Link>
                
                <react_router_dom_1.Link to="/settings" onClick={handleLinkClick} className="flex items-center py-2 px-4 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                  <Icon_1.default name="settings" size="small" className="mr-2"/>
                  Settings
                </react_router_dom_1.Link>
                
                <button onClick={handleLogout} className="flex items-center w-full py-2 px-4 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                  <Icon_1.default name="log-out" size="small" className="mr-2"/>
                  Log Out
                </button>
              </div>
            </div>) : (<div className="space-y-3">
              <react_router_dom_1.Link to="/login" onClick={handleLinkClick} className="block w-full">
                <Button_1.default variant="outline" fullWidth>
                  Log In
                </Button_1.default>
              </react_router_dom_1.Link>
              <react_router_dom_1.Link to="/register" onClick={handleLinkClick} className="block w-full">
                <Button_1.default variant="primary" fullWidth>
                  Sign Up
                </Button_1.default>
              </react_router_dom_1.Link>
            </div>)}
        </div>
        
        {/* Footer */}
        <div className="p-4 mt-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} Clean Edge Removal LLC
          </div>
        </div>
      </div>
    </>);
};
exports.default = MobileMenu;
//# sourceMappingURL=MobileMenu.jsx.map