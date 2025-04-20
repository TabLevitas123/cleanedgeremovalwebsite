import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { logout } from '../../../features/auth/authSlice';
import Button from '../../../components/atoms/Button';
import Icon from '../../../components/atoms/Icon';

/**
 * UnauthorizedPage Component
 * 
 * Displayed when a user attempts to access a page they don't have permission for.
 * Provides options to go back, go home, or log out and log in with a different account.
 */
const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  // Handle go back
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-error-color bg-opacity-10 text-error-color mb-6">
          <Icon name="lock" size="large" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Access Denied
        </h1>
        
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
          {isAuthenticated ? (
            <>
              Sorry, you don't have permission to access this page. 
              {user?.role && (
                <> Your current role is <strong>{user.role}</strong>.</>
              )}
            </>
          ) : (
            <>
              You need to be logged in to access this page.
            </>
          )}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={handleGoBack}
            icon="arrow-left"
          >
            Go Back
          </Button>
          
          <Link to="/">
            <Button variant="outline" icon="home">
              Go to Home
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <Button
              variant="primary"
              onClick={handleLogout}
              icon="log-out"
            >
              Log Out
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="primary" icon="log-in">
                Log In
              </Button>
            </Link>
          )}
        </div>
        
        <div className="mt-12 p-4 bg-info-color bg-opacity-10 rounded-md">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <Icon name="info" size="small" className="text-info-color" />
            </div>
            <div className="ml-3 text-sm text-neutral-600 dark:text-neutral-400 text-left">
              <p className="font-medium text-info-color">Need help?</p>
              <p className="mt-1">
                If you believe you should have access to this page, please contact your administrator or our support team at{' '}
                <a 
                  href="mailto:support@cleanedgeremoval.com" 
                  className="text-primary-color hover:text-primary-light"
                >
                  support@cleanedgeremoval.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;