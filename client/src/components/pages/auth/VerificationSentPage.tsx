import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useResendVerificationMutation } from '../../../features/auth/authSlice';
import { addNotification } from '../../../features/notifications/notificationSlice';
import Button from '../../../components/atoms/Button';
import Icon from '../../../components/atoms/Icon';

/**
 * VerificationSentPage Component
 * 
 * Displayed after user registration to inform them that a verification
 * email has been sent. Provides option to resend the verification email.
 */
const VerificationSentPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get email from location state
  const email = location.state?.email || '';
  
  // Resend verification mutation hook
  const [resendVerification, { isLoading }] = useResendVerificationMutation();
  
  // Handle resend verification
  const handleResendVerification = async () => {
    if (!email) {
      dispatch(addNotification({
        type: 'error',
        title: 'Error',
        message: 'Email address is missing. Please try registering again.',
        duration: 5000,
      }));
      return;
    }
    
    try {
      // Resend verification email
      await resendVerification({ email }).unwrap();
      
      // Show success notification
      dispatch(addNotification({
        type: 'success',
        title: 'Verification Email Sent',
        message: 'A new verification email has been sent to your email address.',
        duration: 5000,
      }));
    } catch (error: any) {
      // Show error notification
      dispatch(addNotification({
        type: 'error',
        title: 'Failed to Resend',
        message: error?.data?.message || 'Failed to resend verification email. Please try again later.',
        duration: 5000,
      }));
    }
  };
  
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-color bg-opacity-10 text-success-color mb-6">
        <Icon name="mail" size="large" />
      </div>
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
        Verify Your Email
      </h1>
      
      {email ? (
        <>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            We've sent a verification email to <strong>{email}</strong>. 
            Please check your email and click on the verification link to activate your account.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            If you don't receive an email within a few minutes, please check your spam folder 
            or click the button below to resend the verification email.
          </p>
        </>
      ) : (
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          We've sent a verification email to your email address.
          Please check your email and click on the verification link to activate your account.
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="primary"
          onClick={handleResendVerification}
          disabled={isLoading || !email}
          icon={isLoading ? 'loader' : 'mail'}
        >
          {isLoading ? 'Sending...' : 'Resend Verification Email'}
        </Button>
        
        <Link to="/login">
          <Button variant="outline">
            Return to Login
          </Button>
        </Link>
      </div>
      
      <div className="mt-8 p-4 bg-info-color bg-opacity-10 rounded-md">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <Icon name="info" size="small" className="text-info-color" />
          </div>
          <div className="ml-3 text-sm text-neutral-600 dark:text-neutral-400 text-left">
            <p className="font-medium text-info-color">Need help?</p>
            <p className="mt-1">
              If you're having trouble verifying your email, please contact our support team at{' '}
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
  );
};

export default VerificationSentPage;