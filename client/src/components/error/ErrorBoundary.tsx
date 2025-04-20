import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import { logger } from '../../utils/logger';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

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
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    logger.error('Error caught by ErrorBoundary:', {
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

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-color bg-opacity-10 text-error-color mb-6">
              <Icon name="alert-triangle" size="large" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              Something Went Wrong
            </h1>
            
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              We're sorry, but an error occurred while rendering this component.
              The error has been logged and we'll work to fix it as soon as possible.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="primary"
                onClick={this.handleReload}
                icon="refresh-cw"
              >
                Reload Page
              </Button>
              
              <Link to="/">
                <Button variant="outline" icon="home">
                  Go to Home
                </Button>
              </Link>
            </div>
            
            {/* Error details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md text-left overflow-auto">
                <h3 className="text-lg font-semibold mb-2">Error Details:</h3>
                <p className="text-error-color mb-2 font-mono text-sm">
                  {this.state.error.toString()}
                </p>
                
                {this.state.errorInfo && (
                  <>
                    <h4 className="text-md font-semibold mb-2 mt-4">Component Stack:</h4>
                    <pre className="text-xs overflow-auto p-2 bg-neutral-200 dark:bg-neutral-700 rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    // When there's no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;