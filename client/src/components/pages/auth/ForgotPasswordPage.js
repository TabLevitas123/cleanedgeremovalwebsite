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
const authSlice_1 = require("../../../features/auth/authSlice");
const notificationSlice_1 = require("../../../features/notifications/notificationSlice");
const Button_1 = __importDefault(require("../../../components/atoms/Button"));
const Icon_1 = __importDefault(require("../../../components/atoms/Icon"));
/**
 * ForgotPasswordPage Component
 *
 * Provides functionality for users to request a password reset link
 * via their email address.
 */
const ForgotPasswordPage = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    // Form state
    const [email, setEmail] = (0, react_1.useState)('');
    const [isSubmitted, setIsSubmitted] = (0, react_1.useState)(false);
    // Form validation state
    const [errors, setErrors] = (0, react_1.useState)({});
    // Forgot password mutation hook
    const [forgotPassword, { isLoading }] = (0, authSlice_1.useForgotPasswordMutation)();
    // Validate form
    const validateForm = () => {
        const newErrors = {};
        // Validate email
        if (!email) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form
        if (!validateForm()) {
            return;
        }
        try {
            // Send password reset request
            await forgotPassword({ email }).unwrap();
            // Show success notification
            dispatch((0, notificationSlice_1.addNotification)({
                type: 'success',
                title: 'Reset Link Sent',
                message: 'If an account exists with this email, you will receive a password reset link shortly.',
                duration: 5000,
            }));
            // Set submitted state
            setIsSubmitted(true);
        }
        catch (error) {
            // Show error notification
            dispatch((0, notificationSlice_1.addNotification)({
                type: 'error',
                title: 'Request Failed',
                message: error?.data?.message || 'An error occurred. Please try again later.',
                duration: 5000,
            }));
            // Set form error
            setErrors({
                ...errors,
                general: error?.data?.message || 'An error occurred. Please try again later.',
            });
        }
    };
    // If submitted, show success message
    if (isSubmitted) {
        return (<div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-color bg-opacity-10 text-success-color mb-6">
          <Icon_1.default name="mail" size="large"/>
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Check Your Email
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          We've sent a password reset link to <strong>{email}</strong>. 
          Please check your email and follow the instructions to reset your password.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          If you don't receive an email within a few minutes, please check your spam folder 
          or try again with a different email address.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <react_router_dom_1.Link to="/login">
            <Button_1.default variant="primary">
              Return to Login
            </Button_1.default>
          </react_router_dom_1.Link>
          <Button_1.default variant="outline" onClick={() => {
                setEmail('');
                setIsSubmitted(false);
                setErrors({});
            }}>
            Try Again
          </Button_1.default>
        </div>
      </div>);
    }
    return (<div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Forgot Your Password?
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      
      {errors.general && (<div className="bg-error-color bg-opacity-10 text-error-color p-4 rounded-md mb-6">
          <div className="flex items-center">
            <Icon_1.default name="alert-circle" size="small" className="mr-2"/>
            <span>{errors.general}</span>
          </div>
        </div>)}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Email Address
          </label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${errors.email ? 'border-error-color' : 'border-neutral-300'}`} placeholder="your.email@example.com" disabled={isLoading} aria-invalid={errors.email ? 'true' : 'false'} aria-describedby={errors.email ? 'email-error' : undefined}/>
          {errors.email && (<p id="email-error" className="mt-1 text-sm text-error-color">
              {errors.email}
            </p>)}
        </div>
        
        {/* Submit Button */}
        <Button_1.default type="submit" variant="primary" size="large" fullWidth disabled={isLoading} icon={isLoading ? 'loader' : undefined} className="mt-6">
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button_1.default>
        
        {/* Back to Login Link */}
        <div className="text-center mt-4">
          <react_router_dom_1.Link to="/login" className="text-primary-color hover:text-primary-light">
            Back to Login
          </react_router_dom_1.Link>
        </div>
      </form>
    </div>);
};
exports.default = ForgotPasswordPage;
//# sourceMappingURL=ForgotPasswordPage.js.map