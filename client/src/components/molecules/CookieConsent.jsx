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
const Button_1 = __importDefault(require("../atoms/Button"));
const Icon_1 = __importDefault(require("../atoms/Icon"));
/**
 * CookieConsent Component
 *
 * Displays a cookie consent banner that allows users to accept or decline cookies.
 * The banner is shown until the user makes a choice, and the choice is stored in a cookie.
 */
const CookieConsent = ({ className = '', position = 'bottom', cookieName = 'clean-edge-cookie-consent', cookieExpiration = 365, // 1 year
 }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    // Check if user has already made a choice
    (0, react_1.useEffect)(() => {
        const hasConsent = getCookie(cookieName);
        if (hasConsent === null) {
            setIsVisible(true);
        }
    }, [cookieName]);
    // Get cookie value
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return match ? match[3] : null;
    };
    // Set cookie with expiration
    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    };
    // Handle accept cookies
    const handleAccept = () => {
        setCookie(cookieName, 'accepted', cookieExpiration);
        setIsVisible(false);
        // You can add analytics or tracking initialization here
        // For example: initializeGoogleAnalytics();
    };
    // Handle decline cookies
    const handleDecline = () => {
        setCookie(cookieName, 'declined', cookieExpiration);
        setIsVisible(false);
        // You can add code to disable non-essential cookies here
        // For example: disableNonEssentialCookies();
    };
    // If not visible, don't render
    if (!isVisible) {
        return null;
    }
    // Position classes
    const positionClasses = {
        bottom: 'bottom-0 left-0 right-0',
        top: 'top-0 left-0 right-0',
    };
    return (<div className={`fixed ${positionClasses[position]} z-50 bg-white dark:bg-neutral-800 shadow-lg border-t border-neutral-200 dark:border-neutral-700 p-4 md:p-6 ${className}`} role="alert" aria-live="polite">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center">
            <div className="mr-3 text-primary-color">
              <Icon_1.default name="info" size="large"/>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                Cookie Consent
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our{' '}
                <react_router_dom_1.Link to="/privacy-policy" className="text-primary-color hover:underline">
                  Privacy Policy
                </react_router_dom_1.Link>{' '}
                and{' '}
                <react_router_dom_1.Link to="/cookie-policy" className="text-primary-color hover:underline">
                  Cookie Policy
                </react_router_dom_1.Link>{' '}
                to learn more.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
            <Button_1.default variant="outline" size="small" onClick={handleDecline} aria-label="Decline cookies">
              Decline
            </Button_1.default>
            <Button_1.default variant="primary" size="small" onClick={handleAccept} aria-label="Accept cookies">
              Accept All
            </Button_1.default>
          </div>
          
          {/* Close button (optional) */}
          <button className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200" onClick={handleDecline} aria-label="Close cookie consent">
            <Icon_1.default name="x" size="small"/>
          </button>
        </div>
      </div>
    </div>);
};
exports.default = CookieConsent;
//# sourceMappingURL=CookieConsent.jsx.map