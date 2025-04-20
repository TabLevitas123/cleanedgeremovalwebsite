import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useVerifyMfaMutation, useResendMfaCodeMutation } from '../../../features/auth/authSlice';
import { addNotification } from '../../../features/notifications/notificationSlice';
import Button from '../../../components/atoms/Button';
import Icon from '../../../components/atoms/Icon';

/**
 * MfaVerificationPage Component
 * 
 * Handles multi-factor authentication verification with a 6-digit code.
 * Supports code resend and auto-focus on input fields.
 */
const MfaVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get email from location state
  const email = location.state?.email || '';
  
  // Code input state
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Timer state for resend cooldown
  const [resendTimer, setResendTimer] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Error state
  const [error, setError] = useState('');
  
  // API mutation hooks
  const [verifyMfa, { isLoading: isVerifying }] = useVerifyMfaMutation();
  const [resendMfaCode, { isLoading: isResending }] = useResendMfaCodeMutation();
  
  // Initialize input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);
  
  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  // Handle resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);
  
  // Handle input change
  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    
    // Update code state
    const newCode = [...code];
    
    // Handle paste event (multiple digits)
    if (value.length > 1) {
      const digits = value.split('').slice(0, 6 - index);
      
      // Fill current and subsequent inputs
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newCode[index + i] = digit;
        }
      });
      
      setCode(newCode);
      
      // Focus on appropriate input after paste
      const nextIndex = Math.min(index + digits.length, 5);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
      
      return;
    }
    
    // Handle single digit input
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  
  // Handle key down
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        // If current input is empty, focus previous input
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      }
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
    
    if (e.key === 'ArrowRight' && index < 5) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate code
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }
    
    if (!email) {
      setError('Email address is missing. Please try logging in again.');
      return;
    }
    
    try {
      // Verify MFA code
      await verifyMfa({
        email,
        code: fullCode,
      }).unwrap();
      
      // Show success notification
      dispatch(addNotification({
        type: 'success',
        title: 'Verification Successful',
        message: 'You have been successfully authenticated.',
        duration: 3000,
      }));
      
      // Set submitted state
      setIsSubmitted(true);
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);
    } catch (error: any) {
      // Show error notification
      dispatch(addNotification({
        type: 'error',
        title: 'Verification Failed',
        message: error?.data?.message || 'Invalid verification code. Please try again.',
        duration: 5000,
      }));
      
      // Set error state
      setError(error?.data?.message || 'Invalid verification code. Please try again.');
      
      // Clear code
      setCode(['', '', '', '', '', '']);
      
      // Focus first input
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  };
  
  // Handle resend code
  const handleResendCode = async () => {
    if (resendTimer > 0 || !email) {
      return;
    }
    
    try {
      // Resend MFA code
      await resendMfaCode({ email }).unwrap();
      
      // Show success notification
      dispatch(addNotification({
        type: 'success',
        title: 'Code Sent',
        message: 'A new verification code has been sent to your email.',
        duration: 5000,
      }));
      
      // Start resend timer
      setResendTimer(60);
      
      // Clear error
      setError('');
      
      // Clear code
      setCode(['', '', '', '', '', '']);
      
      // Focus first input
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    } catch (error: any) {
      // Show error notification
      dispatch(addNotification({
        type: 'error',
        title: 'Failed to Resend',
        message: error?.data?.message || 'Failed to send verification code. Please try again later.',
        duration: 5000,
      }));
    }
  };
  
  // If verification is successful, show success message
  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-color bg-opacity-10 text-success-color mb-6">
          <Icon name="check-circle" size="large" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Verification Successful
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          You have been successfully authenticated. Redirecting to dashboard...
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Two-Factor Authentication
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          {email ? (
            <>Enter the 6-digit code sent to <strong>{email}</strong></>
          ) : (
            <>Enter the 6-digit code sent to your email</>
          )}
        </p>
      </div>
      
      {error && (
        <div className="bg-error-color bg-opacity-10 text-error-color p-4 rounded-md mb-6">
          <div className="flex items-center">
            <Icon name="alert-circle" size="small" className="mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Code Input */}
        <div>
          <label 
            htmlFor="code-0" 
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3"
          >
            Verification Code
          </label>
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-14 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${
                  error ? 'border-error-color' : 'border-neutral-300'
                }`}
                disabled={isVerifying}
                aria-label={`Digit ${index + 1} of verification code`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 text-center">
            Didn't receive a code?{' '}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendTimer > 0 || isResending || !email}
              className={`text-primary-color hover:text-primary-light focus:outline-none ${
                (resendTimer > 0 || isResending || !email) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isResending ? 'Sending...' : resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend code'}
            </button>
          </p>
        </div>
        
        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          disabled={isVerifying || code.some(digit => !digit)}
          icon={isVerifying ? 'loader' : undefined}
          className="mt-6"
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </Button>
        
        {/* Back to Login Link */}
        <div className="text-center mt-4">
          <Link 
            to="/login" 
            className="text-primary-color hover:text-primary-light"
          >
            Back to Login
          </Link>
        </div>
      </form>
      
      <div className="mt-8 p-4 bg-info-color bg-opacity-10 rounded-md">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <Icon name="info" size="small" className="text-info-color" />
          </div>
          <div className="ml-3 text-sm text-neutral-600 dark:text-neutral-400 text-left">
            <p className="font-medium text-info-color">Having trouble?</p>
            <p className="mt-1">
              If you're having trouble receiving the verification code, please check your spam folder 
              or contact our support team at{' '}
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

export default MfaVerificationPage;