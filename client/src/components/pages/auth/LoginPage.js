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
 * LoginPage Component
 *
 * Provides user authentication functionality with email/password login,
 * remember me option, and forgot password link.
 */
const LoginPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const dispatch = (0, react_redux_1.useDispatch)();
    // Get redirect path from query params or use default
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get('redirect') || '/';
    // Form state
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [rememberMe, setRememberMe] = (0, react_1.useState)(false);
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    // Form validation state
    const [errors, setErrors] = (0, react_1.useState)({});
    // Login mutation hook
    const [login, { isLoading }] = (0, authSlice_1.useLoginMutation)();
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
        // Validate password
        if (!password) {
            newErrors.password = 'Password is required';
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
            // Attempt login
            await login({
                email,
                password,
                rememberMe,
            }).unwrap();
            // Show success notification
            dispatch((0, notificationSlice_1.addNotification)({
                type: 'success',
                title: 'Login Successful',
                message: 'You have been successfully logged in.',
                duration: 3000,
            }));
            // Redirect to intended destination
            navigate(redirectPath, { replace: true });
        }
        catch (error) {
            // Handle specific error cases
            if (error?.data?.message === 'REQUIRES_MFA') {
                // Redirect to MFA verification
                navigate('/mfa-verification', {
                    state: { email },
                    replace: true,
                });
                return;
            }
            // Show error notification
            dispatch((0, notificationSlice_1.addNotification)({
                type: 'error',
                title: 'Login Failed',
                message: error?.data?.message || 'An error occurred during login. Please try again.',
                duration: 5000,
            }));
            // Set form error
            setErrors({
                ...errors,
                general: error?.data?.message || 'Invalid email or password',
            });
        }
    };
    return (<div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome Back
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Sign in to your account to continue
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
        
        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <react_router_dom_1.Link to="/forgot-password" className="text-sm text-primary-color hover:text-primary-light">
              Forgot password?
            </react_router_dom_1.Link>
          </div>
          <div className="relative">
            <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${errors.password ? 'border-error-color' : 'border-neutral-300'}`} placeholder="••••••••" disabled={isLoading} aria-invalid={errors.password ? 'true' : 'false'} aria-describedby={errors.password ? 'password-error' : undefined}/>
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              <Icon_1.default name={showPassword ? 'eye-off' : 'eye'} size="small"/>
            </button>
          </div>
          {errors.password && (<p id="password-error" className="mt-1 text-sm text-error-color">
              {errors.password}
            </p>)}
        </div>
        
        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input id="remember-me" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-primary-color focus:ring-primary-color border-neutral-300 rounded" disabled={isLoading}/>
          <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
            Remember me
          </label>
        </div>
        
        {/* Submit Button */}
        <Button_1.default type="submit" variant="primary" size="large" fullWidth disabled={isLoading} icon={isLoading ? 'loader' : undefined} className="mt-6">
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button_1.default>
      </form>
      
      {/* Register Link */}
      <div className="text-center mt-8">
        <p className="text-neutral-600 dark:text-neutral-400">
          Don't have an account?{' '}
          <react_router_dom_1.Link to="/register" className="text-primary-color hover:text-primary-light">
            Sign up
          </react_router_dom_1.Link>
        </p>
      </div>
    </div>);
};
exports.default = LoginPage;
//# sourceMappingURL=LoginPage.js.map