"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Button_1 = __importDefault(require("../../../components/atoms/Button"));
const Icon_1 = __importDefault(require("../../../components/atoms/Icon"));
/**
 * ServerErrorPage Component
 *
 * Displayed when a server error (500) occurs.
 * Provides options to go back, go home, or contact support.
 */
const ServerErrorPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    // Handle go back
    const handleGoBack = () => {
        navigate(-1);
    };
    // Handle refresh
    const handleRefresh = () => {
        window.location.reload();
    };
    return (<div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-error-color bg-opacity-10 text-error-color mb-6">
          <Icon_1.default name="server-off" size="large"/>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Server Error
        </h1>
        
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
          Sorry, something went wrong on our server. Our team has been notified and is working to fix the issue.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button_1.default variant="outline" onClick={handleGoBack} icon="arrow-left">
            Go Back
          </Button_1.default>
          
          <Button_1.default variant="outline" onClick={handleRefresh} icon="refresh-cw">
            Try Again
          </Button_1.default>
          
          <react_router_dom_1.Link to="/">
            <Button_1.default variant="primary" icon="home">
              Go to Home
            </Button_1.default>
          </react_router_dom_1.Link>
        </div>
        
        {/* Error details section - can be expanded with actual error details in production */}
        <div className="mt-12 border-t border-neutral-200 dark:border-neutral-700 pt-8">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            What happened?
          </h2>
          
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Our server encountered an unexpected condition that prevented it from fulfilling your request. 
            This is usually a temporary problem that will be resolved shortly.
          </p>
          
          <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
            What can you do?
          </h3>
          
          <ul className="text-neutral-600 dark:text-neutral-400 text-left list-disc pl-5 space-y-2 mb-6">
            <li>Refresh the page and try again</li>
            <li>Try again later as the issue might be temporary</li>
            <li>Clear your browser cache and cookies</li>
            <li>Try using a different browser</li>
            <li>Contact our support team if the problem persists</li>
          </ul>
        </div>
        
        {/* Contact support */}
        <div className="mt-8 p-4 bg-info-color bg-opacity-10 rounded-md">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <Icon_1.default name="info" size="small" className="text-info-color"/>
            </div>
            <div className="ml-3 text-sm text-neutral-600 dark:text-neutral-400 text-left">
              <p className="font-medium text-info-color">Need help?</p>
              <p className="mt-1">
                If this problem persists, please contact our support team at{' '}
                <a href="mailto:support@cleanedgeremoval.com" className="text-primary-color hover:text-primary-light">
                  support@cleanedgeremoval.com
                </a>
                {' '}or call us at{' '}
                <a href="tel:+18005551234" className="text-primary-color hover:text-primary-light">
                  (800) 555-1234
                </a>
              </p>
              <p className="mt-2">
                Please include the time of the error and what you were trying to do when it occurred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = ServerErrorPage;
//# sourceMappingURL=ServerErrorPage.js.map