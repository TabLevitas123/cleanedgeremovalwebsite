/**
 * Environment Configuration Utility
 *
 * Provides a centralized way to access environment variables with type safety,
 * default values, and validation. This helps prevent runtime errors caused by
 * missing or invalid environment variables.
 */

// Add type declarations for process.env since we don't have @types/node
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: string;
      REACT_APP_NAME?: string;
      REACT_APP_VERSION?: string;
      REACT_APP_API_URL?: string;
      REACT_APP_API_TIMEOUT?: string;
      REACT_APP_AUTH_COOKIE_NAME?: string;
      REACT_APP_AUTH_COOKIE_SECURE?: string;
      REACT_APP_AUTH_COOKIE_DOMAIN?: string;
      REACT_APP_AUTH_TOKEN_EXPIRY?: string;
      REACT_APP_ENABLE_ANALYTICS?: string;
      REACT_APP_ENABLE_NOTIFICATIONS?: string;
      REACT_APP_LOG_LEVEL?: string;
      REACT_APP_REMOTE_LOGGING_URL?: string;
      REACT_APP_IONOS_API_URL?: string;
      REACT_APP_CONTACT_PHONE?: string;
      REACT_APP_CONTACT_EMAIL?: string;
      REACT_APP_CONTACT_ADDRESS?: string;
      REACT_APP_SERVICE_AREAS?: string;
      REACT_APP_BUSINESS_HOURS_MON_FRI?: string;
      REACT_APP_BUSINESS_HOURS_SAT?: string;
      REACT_APP_BUSINESS_HOURS_SUN?: string;
      [key: string]: string | undefined;
    }
    
    // Add Timeout type for setTimeout/clearTimeout
    type Timeout = ReturnType<typeof setTimeout>;
  }

  interface Process {
    env: NodeJS.ProcessEnv;
  }

  var process: Process;
}

// Define environment variable types and defaults
interface EnvConfig {
  // Application
  NODE_ENV: 'development' | 'test' | 'production';
  APP_NAME: string;
  APP_VERSION: string;
  
  // API
  API_URL: string;
  API_TIMEOUT: number;
  
  // Authentication
  AUTH_COOKIE_NAME: string;
  AUTH_COOKIE_SECURE: boolean;
  AUTH_COOKIE_DOMAIN: string;
  AUTH_TOKEN_EXPIRY: number;
  
  // Features
  ENABLE_ANALYTICS: boolean;
  ENABLE_NOTIFICATIONS: boolean;
  
  // Logging
  LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';
  REMOTE_LOGGING_URL: string;
  
  // IONOS Integration
  IONOS_API_URL: string;
  
  // Contact Information
  CONTACT_PHONE: string;
  CONTACT_EMAIL?: string;
  CONTACT_ADDRESS?: string;
  
  // Business Information
  SERVICE_AREAS: string;
  BUSINESS_HOURS_MON_FRI?: string;
  BUSINESS_HOURS_SAT?: string;
  BUSINESS_HOURS_SUN?: string;
}

// Default values for environment variables
const defaultEnvValues: EnvConfig = {
  NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
  APP_NAME: process.env.REACT_APP_NAME || 'Clean Edge Removal',
  APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  API_TIMEOUT: Number(process.env.REACT_APP_API_TIMEOUT) || 30000,
  
  AUTH_COOKIE_NAME: process.env.REACT_APP_AUTH_COOKIE_NAME || 'clean_edge_auth',
  AUTH_COOKIE_SECURE: process.env.REACT_APP_AUTH_COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production',
  AUTH_COOKIE_DOMAIN: process.env.REACT_APP_AUTH_COOKIE_DOMAIN || '',
  AUTH_TOKEN_EXPIRY: Number(process.env.REACT_APP_AUTH_TOKEN_EXPIRY) || 86400, // 24 hours in seconds
  
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true' || process.env.NODE_ENV === 'production',
  ENABLE_NOTIFICATIONS: process.env.REACT_APP_ENABLE_NOTIFICATIONS !== 'false',
  
  LOG_LEVEL: (process.env.REACT_APP_LOG_LEVEL as EnvConfig['LOG_LEVEL']) ||
    (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  REMOTE_LOGGING_URL: process.env.REACT_APP_REMOTE_LOGGING_URL || '',
  
  IONOS_API_URL: process.env.REACT_APP_IONOS_API_URL || 'https://api.ionos.com',
  
  // Contact Information
  CONTACT_PHONE: process.env.REACT_APP_CONTACT_PHONE || '(800) 555-1234',
  CONTACT_EMAIL: process.env.REACT_APP_CONTACT_EMAIL || 'info@cleanedgeremoval.com',
  CONTACT_ADDRESS: process.env.REACT_APP_CONTACT_ADDRESS || '123 Main St, South Bend, IN 46601',
  
  // Business Information
  SERVICE_AREAS: process.env.REACT_APP_SERVICE_AREAS || 'South Bend,Mishawaka,Elkhart',
  BUSINESS_HOURS_MON_FRI: process.env.REACT_APP_BUSINESS_HOURS_MON_FRI || '8:00 AM - 6:00 PM',
  BUSINESS_HOURS_SAT: process.env.REACT_APP_BUSINESS_HOURS_SAT || '9:00 AM - 4:00 PM',
  BUSINESS_HOURS_SUN: process.env.REACT_APP_BUSINESS_HOURS_SUN || 'Closed',
};

/**
 * Validates environment variables and provides warnings for missing or invalid values
 * @param config The environment configuration to validate
 * @returns The validated configuration
 */
function validateEnvConfig(config: EnvConfig): EnvConfig {
  // Validate NODE_ENV
  if (!['development', 'test', 'production'].includes(config.NODE_ENV)) {
    console.warn(`Invalid NODE_ENV: ${config.NODE_ENV}. Using 'development' instead.`);
    config.NODE_ENV = 'development';
  }
  
  // Validate API_URL
  try {
    new URL(config.API_URL);
  } catch (error) {
    console.warn(`Invalid API_URL: ${config.API_URL}. Using default instead.`);
    config.API_URL = defaultEnvValues.API_URL;
  }
  
  // Validate API_TIMEOUT
  if (isNaN(config.API_TIMEOUT) || config.API_TIMEOUT <= 0) {
    console.warn(`Invalid API_TIMEOUT: ${config.API_TIMEOUT}. Using default instead.`);
    config.API_TIMEOUT = defaultEnvValues.API_TIMEOUT;
  }
  
  // Validate AUTH_TOKEN_EXPIRY
  if (isNaN(config.AUTH_TOKEN_EXPIRY) || config.AUTH_TOKEN_EXPIRY <= 0) {
    console.warn(`Invalid AUTH_TOKEN_EXPIRY: ${config.AUTH_TOKEN_EXPIRY}. Using default instead.`);
    config.AUTH_TOKEN_EXPIRY = defaultEnvValues.AUTH_TOKEN_EXPIRY;
  }
  
  // Validate LOG_LEVEL
  if (!['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'].includes(config.LOG_LEVEL)) {
    console.warn(`Invalid LOG_LEVEL: ${config.LOG_LEVEL}. Using default instead.`);
    config.LOG_LEVEL = defaultEnvValues.LOG_LEVEL;
  }
  
  // Validate REMOTE_LOGGING_URL if provided
  if (config.REMOTE_LOGGING_URL) {
    try {
      new URL(config.REMOTE_LOGGING_URL);
    } catch (error) {
      console.warn(`Invalid REMOTE_LOGGING_URL: ${config.REMOTE_LOGGING_URL}. Disabling remote logging.`);
      config.REMOTE_LOGGING_URL = '';
    }
  }
  
  // Validate IONOS_API_URL
  try {
    new URL(config.IONOS_API_URL);
  } catch (error) {
    console.warn(`Invalid IONOS_API_URL: ${config.IONOS_API_URL}. Using default instead.`);
    config.IONOS_API_URL = defaultEnvValues.IONOS_API_URL;
  }
  
  // Validate CONTACT_PHONE
  if (config.CONTACT_PHONE && !/^[\d\s()+\-]+$/.test(config.CONTACT_PHONE)) {
    console.warn(`Invalid CONTACT_PHONE: ${config.CONTACT_PHONE}. Using default instead.`);
    config.CONTACT_PHONE = defaultEnvValues.CONTACT_PHONE;
  }
  
  return config;
}

/**
 * Environment configuration with default values and validation
 */
export const env: Readonly<EnvConfig> = Object.freeze(validateEnvConfig(defaultEnvValues));

/**
 * Determines if the application is running in development mode
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * Determines if the application is running in test mode
 */
export const isTest = env.NODE_ENV === 'test';

/**
 * Determines if the application is running in production mode
 */
export const isProduction = env.NODE_ENV === 'production';

/**
 * Gets a feature flag value
 * @param name The name of the feature flag
 * @param defaultValue The default value if the feature flag is not defined
 * @returns The feature flag value
 */
export function getFeatureFlag(name: string, defaultValue = false): boolean {
  const envVarName = `REACT_APP_FEATURE_${name.toUpperCase()}`;
  return process.env[envVarName] === 'true' || defaultValue;
}

/**
 * Gets an environment variable value with a default
 * @param name The name of the environment variable
 * @param defaultValue The default value if the environment variable is not defined
 * @returns The environment variable value
 */
export function getEnvVar<T>(name: string, defaultValue: T): T {
  const envVarName = `REACT_APP_${name.toUpperCase()}`;
  const value = process.env[envVarName];
  
  if (value === undefined) {
    return defaultValue;
  }
  
  // Try to parse the value based on the default value type
  try {
    if (typeof defaultValue === 'number') {
      const numValue = Number(value);
      return isNaN(numValue) ? defaultValue : numValue as unknown as T;
    }
    
    if (typeof defaultValue === 'boolean') {
      return (value === 'true') as unknown as T;
    }
    
    // For objects or arrays, try to parse JSON
    if (typeof defaultValue === 'object') {
      return JSON.parse(value) as T;
    }
  } catch (error) {
    console.warn(`Error parsing environment variable ${envVarName}:`, error);
    return defaultValue;
  }
  
  // For strings and other types, return as is
  return value as unknown as T;
}

export default env;