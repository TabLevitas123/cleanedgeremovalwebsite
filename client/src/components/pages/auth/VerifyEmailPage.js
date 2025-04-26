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
 * VerifyEmailPage Component
 *
 * Handles email verification process using the token from the URL.
 * Automatically verifies the token on component mount.
 */
const VerifyEmailPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const { token } = (0, react_router_dom_1.useParams)();
    // Verification states
    const [verificationStatus, setVerificationStatus] = (0, react_1.useState)('verifying');
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    // Verify email mutation hook
    const [verifyEmail, { isLoading }] = (0, authSlice_1.useVerifyEmailMutation)();
    // Verify token on component mount
    (0, react_1.useEffect)(() => {
        const verifyToken = async () => {
            if (!token) {
                setVerificationStatus('error');
                setErrorMessage('Verification token is missing.');
                return;
            }
            try {
                // Verify email
                await verifyEmail({ token }).unwrap();
                // Set success state
                setVerificationStatus('success');
                // Show success notification
                dispatch((0, notificationSlice_1.addNotification)({
                    type: 'success',
                    title: 'Email Verified',
                    message: 'Your email has been successfully verified. You can now log in to your account.',
                    duration: 5000,
                }));
            }
            catch (error) {
                // Set error state
                setVerificationStatus('error');
                setErrorMessage(error?.data?.message || 'Failed to verify email. The token may be invalid or expired.');
                // Show error notification
                dispatch((0, notificationSlice_1.addNotification)({
                    type: 'error',
                    title: 'Verification Failed',
                    message: error?.data?.message || 'Failed to verify email. The token may be invalid or expired.',
                    duration: 5000,
                }));
            }
        };
        verifyToken();
    }, [token, verifyEmail, dispatch]);
    // Render based on verification status
    if (verificationStatus === 'verifying') {
        return (<div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-color bg-opacity-10 text-primary-color mb-6">
          <Icon_1.default name="loader" size="large" className="animate-spin"/>
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Verifying Your Email
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Please wait while we verify your email address...
        </p>
      </div>);
    }
    if (verificationStatus === 'success') {
        return (<div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-color bg-opacity-10 text-success-color mb-6">
          <Icon_1.default name="check-circle" size="large"/>
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Email Verified Successfully
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Your email has been successfully verified. You can now log in to your account.
        </p>
        <react_router_dom_1.Link to="/login">
          <Button_1.default variant="primary" size="large">
            Log In to Your Account
          </Button_1.default>
        </react_router_dom_1.Link>
      </div>);
    }
    // Error state
    return (<div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-color bg-opacity-10 text-error-color mb-6">
        <Icon_1.default name="alert-circle" size="large"/>
      </div>
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
        Verification Failed
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        {errorMessage || 'Failed to verify your email. The verification link may be invalid or expired.'}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <react_router_dom_1.Link to="/register">
          <Button_1.default variant="primary">
            Register Again
          </Button_1.default>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to="/login">
          <Button_1.default variant="outline">
            Back to Login
          </Button_1.default>
        </react_router_dom_1.Link>
      </div>
      
      <div className="mt-8 p-4 bg-info-color bg-opacity-10 rounded-md">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <Icon_1.default name="info" size="small" className="text-info-color"/>
          </div>
          <div className="ml-3 text-sm text-neutral-600 dark:text-neutral-400 text-left">
            <p className="font-medium text-info-color">Need help?</p>
            <p className="mt-1">
              If you're having trouble verifying your email, please contact our support team at{' '}
              <a href="mailto:support@cleanedgeremoval.com" className="text-primary-color hover:text-primary-light">
                support@cleanedgeremoval.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = VerifyEmailPage;
//# sourceMappingURL=VerifyEmailPage.js.map