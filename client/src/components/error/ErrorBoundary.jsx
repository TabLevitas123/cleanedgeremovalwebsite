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
const logger_1 = require("../../utils/logger");
/**
 * ErrorBoundary Component
 *
 * Catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * @example
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends react_1.Component {
    constructor(props) {
        super(props);
        this.handleReload = () => {
            window.location.reload();
        };
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error,
            errorInfo: null,
        };
    }
    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service
        logger_1.logger.error('Error caught by ErrorBoundary:', {
            error: error.toString(),
            componentStack: errorInfo.componentStack,
        });
        this.setState({
            errorInfo,
        });
        // Call the onError callback if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }
    render() {
        if (this.state.hasError) {
            // If a custom fallback is provided, use it
            if (this.props.fallback) {
                return this.props.fallback;
            }
            // Default fallback UI
            return (<div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-color bg-opacity-10 text-error-color mb-6">
              <Icon_1.default name="alert-triangle" size="large"/>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              Something Went Wrong
            </h1>
            
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              We're sorry, but an error occurred while rendering this component.
              The error has been logged and we'll work to fix it as soon as possible.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button_1.default variant="primary" onClick={this.handleReload} icon="refresh-cw">
                Reload Page
              </Button_1.default>
              
              <react_router_dom_1.Link to="/">
                <Button_1.default variant="outline" icon="home">
                  Go to Home
                </Button_1.default>
              </react_router_dom_1.Link>
            </div>
            
            {/* Error details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (<div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md text-left overflow-auto">
                <h3 className="text-lg font-semibold mb-2">Error Details:</h3>
                <p className="text-error-color mb-2 font-mono text-sm">
                  {this.state.error.toString()}
                </p>
                
                {this.state.errorInfo && (<>
                    <h4 className="text-md font-semibold mb-2 mt-4">Component Stack:</h4>
                    <pre className="text-xs overflow-auto p-2 bg-neutral-200 dark:bg-neutral-700 rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </>)}
              </div>)}
          </div>
        </div>);
        }
        // When there's no error, render children normally
        return this.props.children;
    }
}
exports.default = ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.jsx.map