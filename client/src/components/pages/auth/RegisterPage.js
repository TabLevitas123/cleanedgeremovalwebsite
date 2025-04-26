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
 * RegisterPage Component
 *
 * Provides user registration functionality with form validation
 * and terms of service agreement.
 */
const RegisterPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    // Form state
    const [formData, setFormData] = (0, react_1.useState)({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
    // Form validation state
    const [errors, setErrors] = (0, react_1.useState)({});
    // Password strength state
    const [passwordStrength, setPasswordStrength] = (0, react_1.useState)({
        score: 0,
        feedback: '',
    });
    // Show password state
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    // Register mutation hook
    const [register, { isLoading }] = (0, authSlice_1.useRegisterMutation)();
    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: newValue,
        });
        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: undefined,
            });
        }
        // Check password strength
        if (name === 'password') {
            checkPasswordStrength(value);
        }
    };
    // Check password strength
    const checkPasswordStrength = (password) => {
        // Simple password strength check
        let score = 0;
        let feedback = '';
        if (password.length >= 8)
            score += 1;
        if (password.match(/[A-Z]/))
            score += 1;
        if (password.match(/[a-z]/))
            score += 1;
        if (password.match(/[0-9]/))
            score += 1;
        if (password.match(/[^A-Za-z0-9]/))
            score += 1;
        if (score === 0) {
            feedback = 'Very weak';
        }
        else if (score === 1) {
            feedback = 'Weak';
        }
        else if (score === 2) {
            feedback = 'Fair';
        }
        else if (score === 3) {
            feedback = 'Good';
        }
        else if (score === 4) {
            feedback = 'Strong';
        }
        else {
            feedback = 'Very strong';
        }
        setPasswordStrength({ score, feedback });
    };
    // Get password strength color
    const getPasswordStrengthColor = () => {
        const { score } = passwordStrength;
        if (score === 0)
            return 'bg-error-color';
        if (score === 1)
            return 'bg-error-color';
        if (score === 2)
            return 'bg-warning-color';
        if (score === 3)
            return 'bg-warning-color';
        if (score === 4)
            return 'bg-success-color';
        return 'bg-success-color';
    };
    // Validate form
    const validateForm = () => {
        const newErrors = {};
        // Validate first name
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        // Validate last name
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        // Validate email
        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        // Validate password
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        else if (passwordStrength.score < 3) {
            newErrors.password = 'Password is too weak';
        }
        // Validate confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        }
        else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        // Validate terms agreement
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
            // Attempt registration
            await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            }).unwrap();
            // Show success notification
            dispatch((0, notificationSlice_1.addNotification)({
                type: 'success',
                title: 'Registration Successful',
                message: 'Your account has been created successfully. Please check your email for verification instructions.',
                duration: 5000,
            }));
            // Redirect to verification page
            navigate('/verification-sent', {
                state: { email: formData.email },
                replace: true,
            });
        }
        catch (error) {
            // Show error notification
            dispatch((0, notificationSlice_1.addNotification)({
                type: 'error',
                title: 'Registration Failed',
                message: error?.data?.message || 'An error occurred during registration. Please try again.',
                duration: 5000,
            }));
            // Set form error
            if (error?.data?.field) {
                setErrors({
                    ...errors,
                    [error.data.field]: error.data.message,
                });
            }
            else {
                setErrors({
                    ...errors,
                    general: error?.data?.message || 'Registration failed. Please try again.',
                });
            }
        }
    };
    return (<div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Create an Account
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Sign up to get started with Clean Edge Removal
        </p>
      </div>
      
      {errors.general && (<div className="bg-error-color bg-opacity-10 text-error-color p-4 rounded-md mb-6">
          <div className="flex items-center">
            <Icon_1.default name="alert-circle" size="small" className="mr-2"/>
            <span>{errors.general}</span>
          </div>
        </div>)}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              First Name
            </label>
            <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${errors.firstName ? 'border-error-color' : 'border-neutral-300'}`} placeholder="John" disabled={isLoading} aria-invalid={errors.firstName ? 'true' : 'false'} aria-describedby={errors.firstName ? 'firstName-error' : undefined}/>
            {errors.firstName && (<p id="firstName-error" className="mt-1 text-sm text-error-color">
                {errors.firstName}
              </p>)}
          </div>
          
          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Last Name
            </label>
            <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${errors.lastName ? 'border-error-color' : 'border-neutral-300'}`} placeholder="Doe" disabled={isLoading} aria-invalid={errors.lastName ? 'true' : 'false'} aria-describedby={errors.lastName ? 'lastName-error' : undefined}/>
            {errors.lastName && (<p id="lastName-error" className="mt-1 text-sm text-error-color">
                {errors.lastName}
              </p>)}
          </div>
        </div>
        
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Email Address
          </label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${errors.email ? 'border-error-color' : 'border-neutral-300'}`} placeholder="your.email@example.com" disabled={isLoading} aria-invalid={errors.email ? 'true' : 'false'} aria-describedby={errors.email ? 'email-error' : undefined}/>
          {errors.email && (<p id="email-error" className="mt-1 text-sm text-error-color">
              {errors.email}
            </p>)}
        </div>
        
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Password
          </label>
          <div className="relative">
            <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${errors.password ? 'border-error-color' : 'border-neutral-300'}`} placeholder="••••••••" disabled={isLoading} aria-invalid={errors.password ? 'true' : 'false'} aria-describedby={errors.password ? 'password-error' : undefined}/>
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              <Icon_1.default name={showPassword ? 'eye-off' : 'eye'} size="small"/>
            </button>
          </div>
          {formData.password && (<div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex-grow h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div className={`h-full ${getPasswordStrengthColor()}`} style={{ width: `${(passwordStrength.score / 5) * 100}%` }}></div>
                </div>
                <span className="ml-2 text-xs text-neutral-600 dark:text-neutral-400">
                  {passwordStrength.feedback}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.
              </p>
            </div>)}
          {errors.password && (<p id="password-error" className="mt-1 text-sm text-error-color">
              {errors.password}
            </p>)}
        </div>
        
        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${errors.confirmPassword ? 'border-error-color' : 'border-neutral-300'}`} placeholder="••••••••" disabled={isLoading} aria-invalid={errors.confirmPassword ? 'true' : 'false'} aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}/>
          </div>
          {errors.confirmPassword && (<p id="confirmPassword-error" className="mt-1 text-sm text-error-color">
              {errors.confirmPassword}
            </p>)}
        </div>
        
        {/* Terms Agreement */}
        <div className="flex items-start mt-4">
          <div className="flex items-center h-5">
            <input id="agreeToTerms" name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleChange} className="h-4 w-4 text-primary-color focus:ring-primary-color border-neutral-300 rounded" disabled={isLoading} aria-invalid={errors.agreeToTerms ? 'true' : 'false'} aria-describedby={errors.agreeToTerms ? 'agreeToTerms-error' : undefined}/>
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToTerms" className="text-neutral-700 dark:text-neutral-300">
              I agree to the{' '}
              <react_router_dom_1.Link to="/terms-of-service" className="text-primary-color hover:text-primary-light">
                Terms of Service
              </react_router_dom_1.Link>{' '}
              and{' '}
              <react_router_dom_1.Link to="/privacy-policy" className="text-primary-color hover:text-primary-light">
                Privacy Policy
              </react_router_dom_1.Link>
            </label>
            {errors.agreeToTerms && (<p id="agreeToTerms-error" className="mt-1 text-sm text-error-color">
                {errors.agreeToTerms}
              </p>)}
          </div>
        </div>
        
        {/* Submit Button */}
        <Button_1.default type="submit" variant="primary" size="large" fullWidth disabled={isLoading} icon={isLoading ? 'loader' : undefined} className="mt-6">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button_1.default>
      </form>
      
      {/* Login Link */}
      <div className="text-center mt-8">
        <p className="text-neutral-600 dark:text-neutral-400">
          Already have an account?{' '}
          <react_router_dom_1.Link to="/login" className="text-primary-color hover:text-primary-light">
            Sign in
          </react_router_dom_1.Link>
        </p>
      </div>
    </div>);
};
exports.default = RegisterPage;
//# sourceMappingURL=RegisterPage.js.map