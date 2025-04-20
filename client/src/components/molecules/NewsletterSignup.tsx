import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import { logger } from '../../utils/logger';
import { addNotification } from '../../features/notifications/notificationSlice';

/**
 * NewsletterSignup Component
 * 
 * A form for users to sign up for the company newsletter.
 * Includes validation and success/error handling.
 */
const NewsletterSignup: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Basic email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError(null);
    
    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // In a real application, this would be an API call to subscribe the user
      // For now, we'll simulate a successful subscription after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the subscription
      logger.info('Newsletter subscription', { email });
      
      // Show success notification
      dispatch(addNotification({
        id: `newsletter-${Date.now()}`,
        type: 'success',
        title: 'Subscription Successful',
        message: 'Thank you for subscribing to our newsletter!',
        duration: 5000
      }));
      
      // Reset form
      setEmail('');
    } catch (err) {
      // Log error
      logger.error('Newsletter subscription failed', { email, error: err });
      
      // Show error notification
      dispatch(addNotification({
        id: `newsletter-error-${Date.now()}`,
        type: 'error',
        title: 'Subscription Failed',
        message: 'There was a problem subscribing to the newsletter. Please try again later.',
        duration: 5000
      }));
      
      // Set error message
      setError('Subscription failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-primary-light/10 dark:bg-primary-dark/20 rounded-lg p-6 md:p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
          Stay Updated
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Subscribe to our newsletter for tips, special offers, and updates.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="mail" className="text-neutral-500 dark:text-neutral-400" />
            </div>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border ${
                error ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-primary-light`}
              disabled={isSubmitting}
              aria-invalid={!!error}
              aria-describedby={error ? "newsletter-error" : undefined}
            />
          </div>
          {error && (
            <p id="newsletter-error" className="mt-1 text-sm text-red-500">
              {error}
            </p>
          )}
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Subscribe
        </Button>
        
        <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
          By subscribing, you agree to our <a href="/privacy-policy" className="underline hover:text-primary-color dark:hover:text-primary-light">Privacy Policy</a>.
          We respect your privacy and will never share your information.
        </p>
      </form>
    </div>
  );
};

export default NewsletterSignup;