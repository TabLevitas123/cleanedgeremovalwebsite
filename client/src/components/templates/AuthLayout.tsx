import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Logo from '../atoms/Logo';
import NotificationToast from '../molecules/NotificationToast';

/**
 * AuthLayout Component
 * 
 * Layout template for authentication-related pages (login, register, etc.).
 * Provides a clean, focused interface for authentication actions.
 * Redirects authenticated users away from auth pages.
 */
const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { theme } = useSelector((state: RootState) => state.ui);
  
  // Redirect authenticated users to appropriate page
  useEffect(() => {
    if (isAuthenticated) {
      // Get the redirect path from query params or use default based on user role
      const params = new URLSearchParams(location.search);
      const redirectPath = params.get('redirect') || getDefaultRedirect(user?.role);
      
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);
  
  // Determine default redirect based on user role
  const getDefaultRedirect = (role?: string): string => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'employee':
        return '/employee';
      default:
        return '/';
    }
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${theme.mode === 'dark' ? 'dark-mode' : ''}`}>
      {/* Header with logo */}
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <a href="/" className="inline-block">
            <Logo size="medium" />
          </a>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 md:p-8">
            {/* Auth form content */}
            <Outlet />
          </div>
          
          {/* Additional info or links */}
          <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            <p>
              &copy; {new Date().getFullYear()} Clean Edge Removal LLC. All rights reserved.
            </p>
            <div className="mt-2 space-x-4">
              <a 
                href="/privacy-policy" 
                className="text-primary-color hover:text-primary-light hover:underline transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms-of-service" 
                className="text-primary-color hover:text-primary-light hover:underline transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="/contact" 
                className="text-primary-color hover:text-primary-light hover:underline transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </main>
      
      {/* Notifications */}
      <NotificationToast position="top-right" />
    </div>
  );
};

export default AuthLayout;