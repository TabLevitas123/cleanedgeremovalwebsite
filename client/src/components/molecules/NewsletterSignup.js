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
const react_redux_1 = require("react-redux");
const Button_1 = __importDefault(require("../atoms/Button"));
const Icon_1 = __importDefault(require("../atoms/Icon"));
const logger_1 = require("../../utils/logger");
const notificationSlice_1 = require("../../features/notifications/notificationSlice");
/**
 * NewsletterSignup Component
 *
 * A form for users to sign up for the company newsletter.
 * Includes validation and success/error handling.
 */
const NewsletterSignup = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [email, setEmail] = (0, react_1.useState)('');
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    // Basic email validation
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset error state
        setError(null);
        // Validate email
        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        try {
            setIsSubmitting(true);
            // In a real application, this would be an API call to subscribe the user
            // For now, we'll simulate a successful subscription after a short delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Log the subscription
            logger_1.logger.info('Newsletter subscription', { email });
            // Show success notification
            dispatch((0, notificationSlice_1.addNotification)({
                id: `newsletter-${Date.now()}`,
                type: 'success',
                title: 'Subscription Successful',
                message: 'Thank you for subscribing to our newsletter!',
                duration: 5000
            }));
            // Reset form
            setEmail('');
        }
        catch (err) {
            // Log error
            logger_1.logger.error('Newsletter subscription failed', { email, error: err });
            // Show error notification
            dispatch((0, notificationSlice_1.addNotification)({
                id: `newsletter-error-${Date.now()}`,
                type: 'error',
                title: 'Subscription Failed',
                message: 'There was a problem subscribing to the newsletter. Please try again later.',
                duration: 5000
            }));
            // Set error message
            setError('Subscription failed. Please try again later.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (<div className="bg-primary-light/10 dark:bg-primary-dark/20 rounded-lg p-6 md:p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
          Stay Updated
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Subscribe to our newsletter for tips, special offers, and updates.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon_1.default name="mail" className="text-neutral-500 dark:text-neutral-400"/>
            </div>
            <input id="newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border ${error ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-primary-light`} disabled={isSubmitting} aria-invalid={!!error} aria-describedby={error ? "newsletter-error" : undefined}/>
          </div>
          {error && (<p id="newsletter-error" className="mt-1 text-sm text-red-500">
              {error}
            </p>)}
        </div>
        
        <Button_1.default type="submit" variant="primary" fullWidth disabled={isSubmitting} loading={isSubmitting}>
          Subscribe
        </Button_1.default>
        
        <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
          By subscribing, you agree to our <a href="/privacy-policy" className="underline hover:text-primary-color dark:hover:text-primary-light">Privacy Policy</a>.
          We respect your privacy and will never share your information.
        </p>
      </form>
    </div>);
};
exports.default = NewsletterSignup;
//# sourceMappingURL=NewsletterSignup.js.map