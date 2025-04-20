import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/atoms/Button';
import Icon from '../../../components/atoms/Icon';

/**
 * MaintenancePage Component
 * 
 * Displayed when the site is under maintenance.
 * Shows a countdown timer if an end time is provided.
 */
const MaintenancePage: React.FC<{
  endTime?: string; // ISO date string for when maintenance is expected to end
  message?: string; // Custom maintenance message
}> = ({ 
  endTime = '', 
  message = 'Our site is currently undergoing scheduled maintenance to improve your experience.' 
}) => {
  // Countdown state
  const [timeRemaining, setTimeRemaining] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  
  // Calculate time remaining
  useEffect(() => {
    if (!endTime) return;
    
    const endTimeDate = new Date(endTime);
    
    // If end time is invalid or in the past, don't show countdown
    if (isNaN(endTimeDate.getTime()) || endTimeDate <= new Date()) {
      return;
    }
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      const diff = Math.max(0, endTimeDate.getTime() - now.getTime());
      
      if (diff === 0) {
        setTimeRemaining(null);
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining({ hours, minutes, seconds });
    };
    
    // Calculate immediately
    calculateTimeRemaining();
    
    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(interval);
  }, [endTime]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-warning-color bg-opacity-10 text-warning-color mb-6">
          <Icon name="tool" size="large" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Site Under Maintenance
        </h1>
        
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
          {message}
        </p>
        
        {timeRemaining && (
          <div className="mb-8">
            <p className="text-neutral-600 dark:text-neutral-400 mb-3">
              Expected to be back in:
            </p>
            
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-primary-color bg-opacity-10 rounded-lg mb-1">
                  <span className="text-2xl font-bold text-primary-color">
                    {String(timeRemaining.hours).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Hours</span>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-primary-color bg-opacity-10 rounded-lg mb-1">
                  <span className="text-2xl font-bold text-primary-color">
                    {String(timeRemaining.minutes).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Minutes</span>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-primary-color bg-opacity-10 rounded-lg mb-1">
                  <span className="text-2xl font-bold text-primary-color">
                    {String(timeRemaining.seconds).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Seconds</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:support@cleanedgeremoval.com">
            <Button variant="outline" icon="mail">
              Contact Support
            </Button>
          </a>
          
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
            icon="refresh-cw"
          >
            Try Again
          </Button>
        </div>
        
        {/* Additional information */}
        <div className="mt-12 p-4 bg-info-color bg-opacity-10 rounded-md">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <Icon name="info" size="small" className="text-info-color" />
            </div>
            <div className="ml-3 text-sm text-neutral-600 dark:text-neutral-400 text-left">
              <p className="font-medium text-info-color">What's happening?</p>
              <p className="mt-1">
                We're performing scheduled maintenance to improve our services. 
                During this time, our website and some services may be temporarily unavailable.
              </p>
              <p className="mt-2">
                For urgent matters, please contact us at{' '}
                <a 
                  href="tel:+18005551234" 
                  className="text-primary-color hover:text-primary-light"
                >
                  (800) 555-1234
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Social media links */}
        <div className="mt-8">
          <p className="text-neutral-600 dark:text-neutral-400 mb-3">
            Follow us for updates:
          </p>
          
          <div className="flex justify-center gap-4">
            <a 
              href="https://facebook.com/cleanedgeremoval" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-primary-color dark:text-neutral-400 dark:hover:text-primary-light"
              aria-label="Facebook"
            >
              <Icon name="facebook" size="medium" />
            </a>
            
            <a 
              href="https://twitter.com/cleanedgeremoval" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-primary-color dark:text-neutral-400 dark:hover:text-primary-light"
              aria-label="Twitter"
            >
              <Icon name="twitter" size="medium" />
            </a>
            
            <a 
              href="https://instagram.com/cleanedgeremoval" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-primary-color dark:text-neutral-400 dark:hover:text-primary-light"
              aria-label="Instagram"
            >
              <Icon name="instagram" size="medium" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;