import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../features/auth/authSlice';
import { addNotification } from '../../../features/notifications/notificationSlice';
import Button from '../../../components/atoms/Button';
import Icon from '../../../components/atoms/Icon';

/**
 * LoginPage Component
 * 
 * Provides user authentication functionality with email/password login,
 * remember me option, and forgot password link.
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get redirect path from query params or use default
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get('redirect') || '/';
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form validation state
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  
  // Login mutation hook
  const [login, { isLoading }] = useLoginMutation();
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    
    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
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
      // Attempt login
      await login({
        email,
        password,
        rememberMe,
      }).unwrap();
      
      // Show success notification
      dispatch(addNotification({
        type: 'success',
        title: 'Login Successful',
        message: 'You have been successfully logged in.',
        duration: 3000,
      }));
      
      // Redirect to intended destination
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      // Handle specific error cases
      if (error?.data?.message === 'REQUIRES_MFA') {
        // Redirect to MFA verification
        navigate('/mfa-verification', { 
          state: { email },
          replace: true,
        });
        return;
      }
      
      // Show error notification
      dispatch(addNotification({
        type: 'error',
        title: 'Login Failed',
        message: error?.data?.message || 'An error occurred during login. Please try again.',
        duration: 5000,
      }));
      
      // Set form error
      setErrors({
        ...errors,
        general: error?.data?.message || 'Invalid email or password',
      });
    }
  };
  
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome Back
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          Sign in to your account to continue
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
        
        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Password
            </label>
            <Link 
              to="/forgot-password" 
              className="text-sm text-primary-color hover:text-primary-light"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 ${
                errors.password ? 'border-error-color' : 'border-neutral-300'
              }`}
              placeholder="••••••••"
              disabled={isLoading}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPassword ? 'eye-off' : 'eye'} size="small" />
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="mt-1 text-sm text-error-color">
              {errors.password}
            </p>
          )}
        </div>
        
        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-primary-color focus:ring-primary-color border-neutral-300 rounded"
            disabled={isLoading}
          />
          <label 
            htmlFor="remember-me" 
            className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300"
          >
            Remember me
          </label>
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
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
      
      {/* Register Link */}
      <div className="text-center mt-8">
        <p className="text-neutral-600 dark:text-neutral-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-color hover:text-primary-light">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;