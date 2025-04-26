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
const Button_1 = __importDefault(require("../atoms/Button"));
const Icon_1 = __importDefault(require("../atoms/Icon"));
const MobileMenu_1 = __importDefault(require("../molecules/MobileMenu"));
const UserMenu_1 = __importDefault(require("../molecules/UserMenu"));
const SearchBar_1 = __importDefault(require("../molecules/SearchBar"));
/**
 * Header Component
 *
 * Main navigation header for the application, includes logo, navigation links,
 * search functionality, theme toggle, and user menu.
 */
const Header = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const location = (0, react_router_dom_1.useLocation)();
    const { theme, isMobile } = (0, react_redux_1.useSelector)((state) => state.ui);
    const { isAuthenticated, user } = (0, react_redux_1.useSelector)((state) => state.auth);
    const [isScrolled, setIsScrolled] = (0, react_1.useState)(false);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, react_1.useState)(false);
    const [logout] = (0, authSlice_1.useLogoutMutation)();
    // Navigation links
    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/services', label: 'Services' },
        { path: '/about', label: 'About Us' },
        { path: '/contact', label: 'Contact' },
        { path: '/request-quote', label: 'Request a Quote' },
    ];
    // Handle scroll effect for header
    (0, react_1.useEffect)(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // Handle theme toggle
    const handleThemeToggle = () => {
        dispatch((0, uiSlice_1.setThemeMode)(theme.mode === 'light' ? 'dark' : 'light'));
    };
    // Handle mobile menu toggle
    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    // Handle logout
    const handleLogout = async () => {
        try {
            await logout({}).unwrap();
        }
        catch (error) {
            console.error('Logout failed:', error);
        }
    };
    // Determine if a nav link is active
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };
    return (<header className={`sticky top-0 z-50 bg-white dark:bg-neutral-900 transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <react_router_dom_1.Link to="/" className="flex items-center">
              <Logo_1.default size={isScrolled ? 'small' : 'medium'}/>
            </react_router_dom_1.Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (<react_router_dom_1.Link key={link.path} to={link.path} className={`text-base font-medium transition-colors duration-200 ${isActive(link.path)
                ? 'text-primary-color border-b-2 border-primary-color'
                : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-color dark:hover:text-primary-light'}`}>
                {link.label}
              </react_router_dom_1.Link>))}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button (Desktop) */}
            <div className="hidden md:block">
              <SearchBar_1.default />
            </div>
            
            {/* Theme Toggle */}
            <button onClick={handleThemeToggle} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" aria-label={`Switch to ${theme.mode === 'light' ? 'dark' : 'light'} mode`}>
              <Icon_1.default name={theme.mode === 'light' ? 'moon' : 'sun'} size="medium" className="text-neutral-700 dark:text-neutral-300"/>
            </button>
            
            {/* User Menu or Auth Buttons */}
            {isAuthenticated ? (<UserMenu_1.default user={user} onLogout={handleLogout}/>) : (<div className="hidden md:flex items-center space-x-2">
                <react_router_dom_1.Link to="/login">
                  <Button_1.default variant="text" size="small">
                    Log In
                  </Button_1.default>
                </react_router_dom_1.Link>
                <react_router_dom_1.Link to="/request-quote">
                  <Button_1.default variant="primary" size="small">
                    Get a Quote
                  </Button_1.default>
                </react_router_dom_1.Link>
              </div>)}
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" onClick={handleMobileMenuToggle} aria-label="Toggle mobile menu" aria-expanded={mobileMenuOpen}>
              <Icon_1.default name={mobileMenuOpen ? 'x' : 'menu'} size="medium" className="text-neutral-700 dark:text-neutral-300"/>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (<MobileMenu_1.default navLinks={navLinks} isAuthenticated={isAuthenticated} onClose={handleMobileMenuToggle} onLogout={handleLogout} activeLink={location.pathname}/>)}
    </header>);
};
exports.default = Header;
//# sourceMappingURL=Header.jsx.map