import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForgotPasswordMutation } from '../../../features/auth/authSlice';
import { addNotification } from '../../../features/notifications/notificationSlice';
import Button from '../../../components/atoms/Button';
import Icon from '../../../components/atoms/Icon';

/**
 * ForgotPasswordPage Component
 * 
 * Provides functionality for users to request a password reset link
 * via their email address.
 */
const ForgotPasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  
  // Form state
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form validation state
  const [errors, setErrors] = useState<{
    email?: string;
    general?: string;
  }>({});
  
  // Forgot password mutation hook
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: {
      email?: string;
    } = {};
    
    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      // Send password reset request
      await forgotPassword({ email }).unwrap();
      
      // Show success notification
      dispatch(addNotification({
        type: 'success',
        title: 'Reset Link Sent',
        message: 'If an account exists with this email, you will receive a password reset link shortly.',
        duration: 5000,
      }));
      
      // Set submitted state
      setIsSubmitted(true);
    } catch (error: any) {
      // Show error notification
      dispatch(addNotification({
        type: 'error',
        title: 'Request Failed',
        message: error?.data?.message || 'An error occurred. Please try again later.',
        duration: 5000,
      }));
      
      // Set form error
      setErrors({
        ...errors,
        general: error?.data?.message || 'An error occurred. Please try again later.',
      });
    }
  };
  
  // If submitted, show success message
  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-color bg-opacity-10 text-success-color mb-6">
          <Icon name="mail" size="large" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Check Your Email
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          We've sent a password reset link to <strong>{email}</strong>. 
          Please check your email and follow the instructions to reset your password.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          If you don't receive an email within a few minutes, please check your spam folder 
          or try again with a different email address.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <Button variant="primary">
              Return to Login
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => {
              setEmail('');
              setIsSubmitted(false);
              setErrors({});
            }}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Forgot Your Password?
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      
      {errors.general && (
        <div className="bg-error-color bg-opacity-10 text-error-color p-4 rounded-md mb-6">
          <div className="flex items-center">
            <Icon name="alert-circle" size="small" className="mr-2" />
            <span>{errors.general}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${
              errors.email ? 'border-error-color' : 'border-neutral-300'
            }`}
            placeholder="your.email@example.com"
            disabled={isLoading}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-error-color">
              {errors.email}
            </p>
          )}
        </div>
        
        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          disabled={isLoading}
          icon={isLoading ? 'loader' : undefined}
          className="mt-6"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
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
    </div>
  );
};

export default ForgotPasswordPage;