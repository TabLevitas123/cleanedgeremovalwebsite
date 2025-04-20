import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

// Define props
interface CookieConsentProps {
  className?: string;
  position?: 'bottom' | 'top';
  cookieName?: string;
  cookieExpiration?: number; // days
}

/**
 * CookieConsent Component
 * 
 * Displays a cookie consent banner that allows users to accept or decline cookies.
 * The banner is shown until the user makes a choice, and the choice is stored in a cookie.
 */
const CookieConsent: React.FC<CookieConsentProps> = ({
  className = '',
  position = 'bottom',
  cookieName = 'clean-edge-cookie-consent',
  cookieExpiration = 365, // 1 year
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Check if user has already made a choice
  useEffect(() => {
    const hasConsent = getCookie(cookieName);
    if (hasConsent === null) {
      setIsVisible(true);
    }
  }, [cookieName]);
  
  // Get cookie value
  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return match ? match[3] : null;
  };
  
  // Set cookie with expiration
  const setCookie = (name: string, value: string, days: number): void => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };
  
  // Handle accept cookies
  const handleAccept = (): void => {
    setCookie(cookieName, 'accepted', cookieExpiration);
    setIsVisible(false);
    
    // You can add analytics or tracking initialization here
    // For example: initializeGoogleAnalytics();
  };
  
  // Handle decline cookies
  const handleDecline = (): void => {
    setCookie(cookieName, 'declined', cookieExpiration);
    setIsVisible(false);
    
    // You can add code to disable non-essential cookies here
    // For example: disableNonEssentialCookies();
  };
  
  // If not visible, don't render
  if (!isVisible) {
    return null;
  }
  
  // Position classes
  const positionClasses = {
    bottom: 'bottom-0 left-0 right-0',
    top: 'top-0 left-0 right-0',
  };
  
  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 bg-white dark:bg-neutral-800 shadow-lg border-t border-neutral-200 dark:border-neutral-700 p-4 md:p-6 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center">
            <div className="mr-3 text-primary-color">
              <Icon name="info" size="large" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                Cookie Consent
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our{' '}
                <Link to="/privacy-policy" className="text-primary-color hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="/cookie-policy" className="text-primary-color hover:underline">
                  Cookie Policy
                </Link>{' '}
                to learn more.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
            <Button
              variant="outline"
              size="small"
              onClick={handleDecline}
              aria-label="Decline cookies"
            >
              Decline
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={handleAccept}
              aria-label="Accept cookies"
            >
              Accept All
            </Button>
          </div>
          
          {/* Close button (optional) */}
          <button
            className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            onClick={handleDecline}
            aria-label="Close cookie consent"
          >
            <Icon name="x" size="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;