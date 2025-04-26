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
const Icon_1 = __importDefault(require("./Icon"));
/**
 * ScrollToTop Component
 *
 * This component provides two functionalities:
 * 1. Scrolls to top when route changes
 * 2. Displays a "scroll to top" button when user scrolls down beyond threshold
 */
const ScrollToTop = ({ threshold = 300, smooth = true, className = '', }) => {
    const { pathname } = (0, react_router_dom_1.useLocation)();
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    // Scroll to top when route changes
    (0, react_1.useEffect)(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: smooth ? 'smooth' : 'auto',
        });
    }, [pathname, smooth]);
    // Toggle button visibility based on scroll position
    (0, react_1.useEffect)(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > threshold) {
                setIsVisible(true);
            }
            else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [threshold]);
    // Handle scroll to top button click
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: smooth ? 'smooth' : 'auto',
        });
    };
    // If button is not visible, only render the effect
    if (!isVisible) {
        return null;
    }
    return (<button className={`fixed bottom-6 right-6 p-3 rounded-full bg-primary-color text-white shadow-lg hover:bg-primary-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 z-50 ${className}`} onClick={scrollToTop} aria-label="Scroll to top" title="Scroll to top">
      <Icon_1.default name="arrow-up" size="medium"/>
    </button>);
};
exports.default = ScrollToTop;
//# sourceMappingURL=ScrollToTop.js.map