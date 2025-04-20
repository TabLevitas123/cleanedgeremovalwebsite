import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useVerifyEmailMutation } from '../../../features/auth/authSlice';
import { addNotification } from '../../../features/notifications/notificationSlice';
import Button from '../../../components/atoms/Button';
import Icon from '../../../components/atoms/Icon';

/**
 * VerifyEmailPage Component
 * 
 * Handles email verification process using the token from the URL.
 * Automatically verifies the token on component mount.
 */
const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams<{ token: string }>();
  
  // Verification states
  const [verificationStatus, setVerificationStatus] = useState<
    'verifying' | 'success' | 'error'
  >('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Verify email mutation hook
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  
  // Verify token on component mount
  useEffect(() => {
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
        dispatch(addNotification({
          type: 'success',
          title: 'Email Verified',
          message: 'Your email has been successfully verified. You can now log in to your account.',
          duration: 5000,
        }));
      } catch (error: any) {
        // Set error state
        setVerificationStatus('error');
        setErrorMessage(error?.data?.message || 'Failed to verify email. The token may be invalid or expired.');
        
        // Show error notification
        dispatch(addNotification({
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
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-color bg-opacity-10 text-primary-color mb-6">
          <Icon name="loader" size="large" className="animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Verifying Your Email
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Please wait while we verify your email address...
        </p>
      </div>
    );
  }
  
  if (verificationStatus === 'success') {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-color bg-opacity-10 text-success-color mb-6">
          <Icon name="check-circle" size="large" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Email Verified Successfully
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Your email has been successfully verified. You can now log in to your account.
        </p>
        <Link to="/login">
          <Button variant="primary" size="large">
            Log In to Your Account
          </Button>
        </Link>
      </div>
    );
  }
  
  // Error state
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-color bg-opacity-10 text-error-color mb-6">
        <Icon name="alert-circle" size="large" />
      </div>
      <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
        Verification Failed
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        {errorMessage || 'Failed to verify your email. The verification link may be invalid or expired.'}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/register">
          <Button variant="primary">
            Register Again
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="outline">
            Back to Login
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

export default VerifyEmailPage;