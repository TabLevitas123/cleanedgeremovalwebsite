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
 * ResetPasswordPage Component
 *
 * Allows users to reset their password using a token from the reset link.
 * Validates the token before showing the password reset form.
 */
const ResetPasswordPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const { token } = (0, react_router_dom_1.useParams)();
    const location = (0, react_router_dom_1.useLocation)();
    // Get email from query params
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email') || '';
    // Form state
    const [password, setPassword] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [isTokenValid, setIsTokenValid] = (0, react_1.useState)(false);
    const [isTokenChecked, setIsTokenChecked] = (0, react_1.useState)(false);
    const [isSubmitted, setIsSubmitted] = (0, react_1.useState)(false);
    // Password strength state
    const [passwordStrength, setPasswordStrength] = (0, react_1.useState)({
        score: 0,
        feedback: '',
    });
    // Form validation state
    const [errors, setErrors] = (0, react_1.useState)({});
    // API mutation hooks
    const [verifyResetToken, { isLoading: isVerifying }] = (0, authSlice_1.useVerifyResetTokenMutation)();
    const [resetPassword, { isLoading: isResetting }] = (0, authSlice_1.useResetPasswordMutation)();
    // Verify token on component mount
    (0, react_1.useEffect)(() => {
        const checkToken = async () => {
            if (!token) {
                setIsTokenChecked(true);
                return;
            }
            try {
                await verifyResetToken({ token }).unwrap();
                setIsTokenValid(true);
            }
            catch (error) {
                setIsTokenValid(false);
                // Show error notification
                dispatch((0, notificationSlice_1.addNotification)({
                    type: 'error',
                    title: 'Invalid or Expired Token',
                    message: 'Your password reset link is invalid or has expired. Please request a new one.',
                    duration: 5000,
                }));
            }
            finally {
                setIsTokenChecked(true);
            }
        };
        checkToken();
    }, [token, dispatch, verifyResetToken]);
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
    // Handle password change
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
        // Clear error when field is edited
        if (errors.password) {
            setErrors({
                ...errors,
                password: undefined,
            });
        }
    };
    // Handle confirm password change
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        // Clear error when field is edited
        if (errors.confirmPassword) {
            setErrors({
                ...errors,
                confirmPassword: undefined,
            });
        }
    };
    // Validate form
    const validateForm = () => {
        const newErrors = {};
        // Validate password
        if (!password) {
            newErrors.password = 'Password is required';
        }
        else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        else if (passwordStrength.score < 3) {
            newErrors.password = 'Password is too weak';
        }
        // Validate confirm password
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        }
        else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form
        if (!validateForm() || !token) {
            return;
        }
        try {
            // Reset password
            await resetPassword({
                token,
                password,
            }).unwrap();
            // Show success notification
            dispatch((0, notificationSlice_1.addNotification)({
                type: 'success',
                title: 'Password Reset Successful',
                message: 'Your password has been reset successfully. You can now log in with your new password.',
                duration: 5000,
            }));
            // Set submitted state
            setIsSubmitted(true);
        }
        catch (error) {
            // Show error notification
            dispatch((0, notificationSlice_1.addNotification)({
                type: 'error',
                title: 'Password Reset Failed',
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
    // If token is being verified, show loading
    if (!isTokenChecked) {
        return (<div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-color bg-opacity-10 text-primary-color mb-6">
          <Icon_1.default name="loader" size="large" className="animate-spin"/>
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Verifying Reset Link
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Please wait while we verify your password reset link...
        </p>
      </div>);
    }
    // If token is invalid, show error
    if (!isTokenValid) {
        return (<div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-color bg-opacity-10 text-error-color mb-6">
          <Icon_1.default name="alert-circle" size="large"/>
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Invalid or Expired Link
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Your password reset link is invalid or has expired. 
          Please request a new password reset link.
        </p>
        <react_router_dom_1.Link to="/forgot-password">
          <Button_1.default variant="primary">
            Request New Reset Link
          </Button_1.default>
        </react_router_dom_1.Link>
      </div>);
    }
    // If password reset is successful, show success message
    if (isSubmitted) {
        return (<div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-color bg-opacity-10 text-success-color mb-6">
          <Icon_1.default name="check-circle" size="large"/>
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Password Reset Successful
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Your password has been reset successfully. 
          You can now log in with your new password.
        </p>
        <react_router_dom_1.Link to="/login">
          <Button_1.default variant="primary">
            Go to Login
          </Button_1.default>
        </react_router_dom_1.Link>
      </div>);
    }
    // Show password reset form
    return (<div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Reset Your Password
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          {email ? `Enter a new password for ${email}` : 'Enter a new password for your account'}
        </p>
      </div>
      
      {errors.general && (<div className="bg-error-color bg-opacity-10 text-error-color p-4 rounded-md mb-6">
          <div className="flex items-center">
            <Icon_1.default name="alert-circle" size="small" className="mr-2"/>
            <span>{errors.general}</span>
          </div>
        </div>)}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            New Password
          </label>
          <div className="relative">
            <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${errors.password ? 'border-error-color' : 'border-neutral-300'}`} placeholder="••••••••" disabled={isResetting} aria-invalid={errors.password ? 'true' : 'false'} aria-describedby={errors.password ? 'password-error' : undefined}/>
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
              <Icon_1.default name={showPassword ? 'eye-off' : 'eye'} size="small"/>
            </button>
          </div>
          {password && (<div className="mt-2">
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
            Confirm New Password
          </label>
          <div className="relative">
            <input id="confirmPassword" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleConfirmPasswordChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${errors.confirmPassword ? 'border-error-color' : 'border-neutral-300'}`} placeholder="••••••••" disabled={isResetting} aria-invalid={errors.confirmPassword ? 'true' : 'false'} aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}/>
          </div>
          {errors.confirmPassword && (<p id="confirmPassword-error" className="mt-1 text-sm text-error-color">
              {errors.confirmPassword}
            </p>)}
        </div>
        
        {/* Submit Button */}
        <Button_1.default type="submit" variant="primary" size="large" fullWidth disabled={isResetting} icon={isResetting ? 'loader' : undefined} className="mt-6">
          {isResetting ? 'Resetting Password...' : 'Reset Password'}
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
exports.default = ResetPasswordPage;
//# sourceMappingURL=ResetPasswordPage.js.map