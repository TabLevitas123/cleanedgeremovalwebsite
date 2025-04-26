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
const Icon_1 = __importDefault(require("../atoms/Icon"));
/**
 * UserMenu Component
 *
 * A dropdown menu for authenticated users that displays user information
 * and provides links to user-related pages and logout functionality.
 */
const UserMenu = ({ user, onLogout, className = '', }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const menuRef = (0, react_1.useRef)(null);
    // Toggle menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    // Close menu when clicking outside
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    // Close menu when pressing escape key
    (0, react_1.useEffect)(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);
    // Get user initials for avatar
    const getUserInitials = () => {
        if (!user.name)
            return '?';
        const nameParts = user.name.split(' ');
        if (nameParts.length === 1) {
            return nameParts[0].charAt(0).toUpperCase();
        }
        return (nameParts[0].charAt(0).toUpperCase() +
            nameParts[nameParts.length - 1].charAt(0).toUpperCase());
    };
    return (<div className={`relative ${className}`} ref={menuRef}>
      {/* User Avatar Button */}
      <button onClick={toggleMenu} className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 rounded-full" aria-expanded={isOpen} aria-haspopup="true" aria-label="User menu">
        {user.avatar ? (<img src={user.avatar} alt={user.name || 'User'} className="w-10 h-10 rounded-full object-cover"/>) : (<div className="w-10 h-10 rounded-full bg-primary-color flex items-center justify-center text-white font-medium">
            {getUserInitials()}
          </div>)}
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (<div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 z-50 border border-neutral-200 dark:border-neutral-700">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
            <div className="font-medium text-neutral-800 dark:text-neutral-200 truncate">
              {user.name || 'User'}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
              {user.email || 'user@example.com'}
            </div>
            {user.role && (<div className="mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-light text-white">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>)}
          </div>
          
          {/* Menu Links */}
          <div className="py-1">
            <react_router_dom_1.Link to="/profile" className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700" onClick={() => setIsOpen(false)}>
              <Icon_1.default name="user" size="small" className="mr-3 text-neutral-500 dark:text-neutral-400"/>
              Profile
            </react_router_dom_1.Link>
            
            <react_router_dom_1.Link to="/settings" className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700" onClick={() => setIsOpen(false)}>
              <Icon_1.default name="settings" size="small" className="mr-3 text-neutral-500 dark:text-neutral-400"/>
              Settings
            </react_router_dom_1.Link>
            
            {user.role === 'admin' && (<react_router_dom_1.Link to="/admin" className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700" onClick={() => setIsOpen(false)}>
                <Icon_1.default name="shield" size="small" className="mr-3 text-neutral-500 dark:text-neutral-400"/>
                Admin Dashboard
              </react_router_dom_1.Link>)}
          </div>
          
          {/* Logout */}
          <div className="py-1 border-t border-neutral-200 dark:border-neutral-700">
            <button onClick={() => {
                setIsOpen(false);
                onLogout();
            }} className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
              <Icon_1.default name="log-out" size="small" className="mr-3 text-neutral-500 dark:text-neutral-400"/>
              Log Out
            </button>
          </div>
        </div>)}
    </div>);
};
exports.default = UserMenu;
//# sourceMappingURL=UserMenu.js.map