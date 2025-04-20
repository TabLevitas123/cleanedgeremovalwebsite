/**
 * Environment Configuration Utility
 * 
 * Provides a centralized way to access environment variables with type safety,
 * default values, and validation. This helps prevent runtime errors caused by
 * missing or invalid environment variables.
 */

import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import logger from '../config/logger'; // Changed to default import

// Load environment-specific .env file
const nodeEnv = process.env.NODE_ENV || 'development';
const envPath = path.resolve(process.cwd(), `.env.${nodeEnv}`);

// Check if the environment file exists
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  logger.info(`Loaded environment variables from ${envPath}`);
} else {
  // Fallback to .env file
  dotenv.config();
  logger.warn(`Environment file ${envPath} not found, using default .env file`);
}

// Define environment variable types and defaults
interface EnvConfig {
  // Server Configuration
  PORT: number;
  HOST: string;
  NODE_ENV: 'development' | 'test' | 'production';
  API_PREFIX: string;
  CORS_ORIGIN: string | string[];
  TRUST_PROXY: boolean;
  
  // Database Configuration
  DB_TYPE: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql'; // Added DB_TYPE
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string; // Renamed DB_USER to DB_USERNAME
  DB_PASSWORD: string;
  DB_DATABASE: string; // Renamed DB_NAME to DB_DATABASE
  DB_SYNCHRONIZE: boolean; // Added DB_SYNCHRONIZE
  DB_LOGGING: boolean; // Added DB_LOGGING
  DB_SSL: boolean; // Kept DB_SSL for potential future use
  DB_POOL_MIN: number;
  DB_POOL_MAX: number;
  DB_DEBUG: boolean; // Kept DB_DEBUG

  // Authentication
  JWT_SECRET: string;
  JWT_EXPIRES_IN: number;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: number;
  BCRYPT_SALT_ROUNDS: number;
  SESSION_SECRET: string;
  SESSION_NAME: string;
  SESSION_MAX_AGE: number;
  
  // Email Service
  EMAIL_PROVIDER: 'smtp' | 'sendgrid' | 'mailgun' | 'mock';
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  SMTP_USER: string;
  SMTP_PASS: string;
  EMAIL_FROM_ADDRESS: string;
  EMAIL_FROM_NAME: string;
  EMAIL_CONTACT_ADDRESS: string;
  
  // IONOS Integration
  IONOS_API_URL: string;
  IONOS_API_KEY: string;
  IONOS_API_SECRET: string;
  
  // Stripe Integration
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_PRICE_ID_BASIC: string;
  STRIPE_PRICE_ID_STANDARD: string;
  STRIPE_PRICE_ID_PREMIUM: string;
  
  // Google Maps API
  GOOGLE_MAPS_API_KEY: string;
  
  // Logging
  LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';
  LOG_FORMAT: 'dev' | 'combined' | 'common' | 'short' | 'tiny' | 'json' | 'test';
  LOG_DIR: string;
  LOG_MAX_SIZE: string;
  LOG_MAX_FILES: number;
  ENABLE_REQUEST_LOGGING: boolean;
  ENABLE_RESPONSE_LOGGING: boolean;
  ENABLE_DB_QUERY_LOGGING: boolean;
  
  // File Storage
  UPLOAD_DIR: string;
  MAX_FILE_SIZE: number;
  ALLOWED_FILE_TYPES: string;
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;
  RATE_LIMIT_SKIP_TRUSTED: boolean;
  
  // Cache
  CACHE_ENABLED: boolean;
  CACHE_TTL: number;
  CACHE_CHECK_PERIOD: number;
  
  // Security
  ENABLE_HELMET: boolean;
  ENABLE_XSS_PROTECTION: boolean;
  ENABLE_CONTENT_TYPE_OPTIONS: boolean;
  ENABLE_FRAME_OPTIONS: boolean;
  ENABLE_CSRF: boolean;
  CSRF_SECRET: string;
  CSRF_COOKIE_NAME: string;
  
  // Maintenance Mode
  MAINTENANCE_MODE: boolean;
  MAINTENANCE_END_TIME: string;
  MAINTENANCE_MESSAGE: string;
  
  // Monitoring
  ENABLE_PERFORMANCE_MONITORING: boolean;
  ENABLE_ERROR_TRACKING: boolean;
  
  // Development/Test specific
  ENABLE_SWAGGER: boolean;
  ENABLE_GRAPHQL_PLAYGROUND: boolean;
  MOCK_EXTERNAL_SERVICES?: boolean;
  TEST_USER_EMAIL?: string;
  TEST_USER_PASSWORD?: string;
  TEST_ADMIN_EMAIL?: string;
  TEST_ADMIN_PASSWORD?: string;
  
  // Production specific
  NODE_CLUSTER_INSTANCES?: number;
  COMPRESSION_LEVEL?: number;
  SERVE_STATIC_MAX_AGE?: number;
}

/**
 * Parse CORS_ORIGIN string to handle multiple origins
 */
function parseCorsOrigin(origin: string): string | string[] {
  if (!origin) return '*';
  
  // Check if it's a comma-separated list
  if (origin.includes(',')) {
    return origin.split(',').map(o => o.trim());
  }
  
  return origin;
}

/**
 * Parse allowed file types string to array
 */
function parseAllowedFileTypes(types: string): string[] {
  if (!types) return [];
  return types.split(',').map(t => t.trim());
}

// Default values for environment variables
const defaultEnvValues: EnvConfig = {
  // Server Configuration
  PORT: parseInt(process.env.PORT || '3001', 10),
  HOST: process.env.HOST || 'localhost',
  NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
  API_PREFIX: process.env.API_PREFIX || '/api',
  CORS_ORIGIN: parseCorsOrigin(process.env.CORS_ORIGIN || 'http://localhost:3000'),
  TRUST_PROXY: process.env.TRUST_PROXY === 'true',
  
  // Database Configuration
  DB_TYPE: (process.env.DB_TYPE as EnvConfig['DB_TYPE']) || 'mysql', // Added DB_TYPE default
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '3306', 10), // Changed default port to 3306
  DB_USERNAME: process.env.DB_USERNAME || 'root', // Changed DB_USER to DB_USERNAME, default 'root'
  DB_PASSWORD: process.env.DB_PASSWORD || '', // Default empty password
  DB_DATABASE: process.env.DB_DATABASE || 'clean_edge_dev', // Changed DB_NAME to DB_DATABASE
  DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE === 'true', // Added DB_SYNCHRONIZE default
  DB_LOGGING: process.env.DB_LOGGING === 'true', // Added DB_LOGGING default
  DB_SSL: process.env.DB_SSL === 'true', // Kept DB_SSL
  DB_POOL_MIN: parseInt(process.env.DB_POOL_MIN || '2', 10),
  DB_POOL_MAX: parseInt(process.env.DB_POOL_MAX || '10', 10),
  DB_DEBUG: process.env.DB_DEBUG === 'true', // Kept DB_DEBUG

  // Authentication
  JWT_SECRET: process.env.JWT_SECRET || 'dev_jwt_secret_key_change_in_production',
  JWT_EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN || '86400', 10),
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'dev_jwt_refresh_secret_key_change_in_production',
  JWT_REFRESH_EXPIRES_IN: parseInt(process.env.JWT_REFRESH_EXPIRES_IN || '604800', 10),
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
  SESSION_SECRET: process.env.SESSION_SECRET || 'dev_session_secret_key_change_in_production',
  SESSION_NAME: process.env.SESSION_NAME || 'clean_edge_session',
  SESSION_MAX_AGE: parseInt(process.env.SESSION_MAX_AGE || '86400000', 10),
  
  // Email Service
  EMAIL_PROVIDER: (process.env.EMAIL_PROVIDER as EnvConfig['EMAIL_PROVIDER']) || 'smtp',
  SMTP_HOST: process.env.SMTP_HOST || 'localhost',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '1025', 10),
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS || 'noreply@cleanedgeremoval.com',
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || 'Clean Edge Removal',
  EMAIL_CONTACT_ADDRESS: process.env.EMAIL_CONTACT_ADDRESS || 'contact@cleanedgeremoval.com',
  
  // IONOS Integration
  IONOS_API_URL: process.env.IONOS_API_URL || 'https://api.ionos.com',
  IONOS_API_KEY: process.env.IONOS_API_KEY || '',
  IONOS_API_SECRET: process.env.IONOS_API_SECRET || '',
  
  // Stripe Integration
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
  STRIPE_PRICE_ID_BASIC: process.env.STRIPE_PRICE_ID_BASIC || '',
  STRIPE_PRICE_ID_STANDARD: process.env.STRIPE_PRICE_ID_STANDARD || '',
  STRIPE_PRICE_ID_PREMIUM: process.env.STRIPE_PRICE_ID_PREMIUM || '',
  
  // Google Maps API
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || '',
  
  // Logging
  LOG_LEVEL: (process.env.LOG_LEVEL as EnvConfig['LOG_LEVEL']) || 'info',
  LOG_FORMAT: (process.env.LOG_FORMAT as EnvConfig['LOG_FORMAT']) || 'dev',
  LOG_DIR: process.env.LOG_DIR || 'logs',
  LOG_MAX_SIZE: process.env.LOG_MAX_SIZE || '10m',
  LOG_MAX_FILES: parseInt(process.env.LOG_MAX_FILES || '7', 10),
  ENABLE_REQUEST_LOGGING: process.env.ENABLE_REQUEST_LOGGING !== 'false',
  ENABLE_RESPONSE_LOGGING: process.env.ENABLE_RESPONSE_LOGGING === 'true',
  ENABLE_DB_QUERY_LOGGING: process.env.ENABLE_DB_QUERY_LOGGING === 'true',
  
  // File Storage
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
  ALLOWED_FILE_TYPES: process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,application/pdf',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  RATE_LIMIT_SKIP_TRUSTED: process.env.RATE_LIMIT_SKIP_TRUSTED !== 'false',
  
  // Cache
  CACHE_ENABLED: process.env.CACHE_ENABLED !== 'false',
  CACHE_TTL: parseInt(process.env.CACHE_TTL || '300', 10),
  CACHE_CHECK_PERIOD: parseInt(process.env.CACHE_CHECK_PERIOD || '60', 10),
  
  // Security
  ENABLE_HELMET: process.env.ENABLE_HELMET !== 'false',
  ENABLE_XSS_PROTECTION: process.env.ENABLE_XSS_PROTECTION !== 'false',
  ENABLE_CONTENT_TYPE_OPTIONS: process.env.ENABLE_CONTENT_TYPE_OPTIONS !== 'false',
  ENABLE_FRAME_OPTIONS: process.env.ENABLE_FRAME_OPTIONS !== 'false',
  ENABLE_CSRF: process.env.ENABLE_CSRF === 'true',
  CSRF_SECRET: process.env.CSRF_SECRET || 'dev_csrf_secret_key_change_in_production',
  CSRF_COOKIE_NAME: process.env.CSRF_COOKIE_NAME || '_csrf',
  
  // Maintenance Mode
  MAINTENANCE_MODE: process.env.MAINTENANCE_MODE === 'true',
  MAINTENANCE_END_TIME: process.env.MAINTENANCE_END_TIME || '',
  MAINTENANCE_MESSAGE: process.env.MAINTENANCE_MESSAGE || 'The system is currently undergoing scheduled maintenance. Please try again later.',
  
  // Monitoring
  ENABLE_PERFORMANCE_MONITORING: process.env.ENABLE_PERFORMANCE_MONITORING === 'true',
  ENABLE_ERROR_TRACKING: process.env.ENABLE_ERROR_TRACKING !== 'false',
  
  // Development/Test specific
  ENABLE_SWAGGER: process.env.ENABLE_SWAGGER !== 'false',
  ENABLE_GRAPHQL_PLAYGROUND: process.env.ENABLE_GRAPHQL_PLAYGROUND === 'true',
  MOCK_EXTERNAL_SERVICES: process.env.MOCK_EXTERNAL_SERVICES === 'true',
  TEST_USER_EMAIL: process.env.TEST_USER_EMAIL || 'test@example.com',
  TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD || 'Test123!',
  TEST_ADMIN_EMAIL: process.env.TEST_ADMIN_EMAIL || 'admin@example.com',
  TEST_ADMIN_PASSWORD: process.env.TEST_ADMIN_PASSWORD || 'Admin123!',
  
  // Production specific
  NODE_CLUSTER_INSTANCES: process.env.NODE_CLUSTER_INSTANCES ? parseInt(process.env.NODE_CLUSTER_INSTANCES, 10) : undefined,
  COMPRESSION_LEVEL: process.env.COMPRESSION_LEVEL ? parseInt(process.env.COMPRESSION_LEVEL, 10) : undefined,
  SERVE_STATIC_MAX_AGE: process.env.SERVE_STATIC_MAX_AGE ? parseInt(process.env.SERVE_STATIC_MAX_AGE, 10) : undefined,
};

/**
 * Validates environment variables and provides warnings for missing or invalid values
 * @param config The environment configuration to validate
 * @returns The validated configuration
 */
function validateEnvConfig(config: EnvConfig): EnvConfig {
  // Validate NODE_ENV
  if (!['development', 'test', 'production'].includes(config.NODE_ENV)) {
    logger.warn(`Invalid NODE_ENV: ${config.NODE_ENV}. Using 'development' instead.`);
    config.NODE_ENV = 'development';
  }
  
  // Validate PORT
  if (isNaN(config.PORT) || config.PORT <= 0) {
    logger.warn(`Invalid PORT: ${config.PORT}. Using default 3001 instead.`);
    config.PORT = 3001;
  }
  
  // Validate DB_TYPE
  if (!['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql'].includes(config.DB_TYPE)) {
      logger.warn(`Invalid DB_TYPE: ${config.DB_TYPE}. Using 'mysql' instead.`);
      config.DB_TYPE = 'mysql';
  }

  // Validate DB_PORT
  if (isNaN(config.DB_PORT) || config.DB_PORT <= 0) {
    const defaultPort = config.DB_TYPE === 'mysql' ? 3306 : 5432; // Adjust default based on type
    logger.warn(`Invalid DB_PORT: ${config.DB_PORT}. Using default ${defaultPort} instead.`);
    config.DB_PORT = defaultPort;
  }

  // Validate DB_POOL_MIN and DB_POOL_MAX
  if (isNaN(config.DB_POOL_MIN) || config.DB_POOL_MIN < 0) {
    logger.warn(`Invalid DB_POOL_MIN: ${config.DB_POOL_MIN}. Using default 2 instead.`);
    config.DB_POOL_MIN = 2;
  }
  
  if (isNaN(config.DB_POOL_MAX) || config.DB_POOL_MAX <= 0) {
    logger.warn(`Invalid DB_POOL_MAX: ${config.DB_POOL_MAX}. Using default 10 instead.`);
    config.DB_POOL_MAX = 10;
  }
  
  if (config.DB_POOL_MIN > config.DB_POOL_MAX) {
    logger.warn(`DB_POOL_MIN (${config.DB_POOL_MIN}) is greater than DB_POOL_MAX (${config.DB_POOL_MAX}). Setting DB_POOL_MIN to ${config.DB_POOL_MAX}.`);
    config.DB_POOL_MIN = config.DB_POOL_MAX;
  }
  
  // Validate JWT_EXPIRES_IN and JWT_REFRESH_EXPIRES_IN
  if (isNaN(config.JWT_EXPIRES_IN) || config.JWT_EXPIRES_IN <= 0) {
    logger.warn(`Invalid JWT_EXPIRES_IN: ${config.JWT_EXPIRES_IN}. Using default 86400 instead.`);
    config.JWT_EXPIRES_IN = 86400;
  }
  
  if (isNaN(config.JWT_REFRESH_EXPIRES_IN) || config.JWT_REFRESH_EXPIRES_IN <= 0) {
    logger.warn(`Invalid JWT_REFRESH_EXPIRES_IN: ${config.JWT_REFRESH_EXPIRES_IN}. Using default 604800 instead.`);
    config.JWT_REFRESH_EXPIRES_IN = 604800;
  }
  
  // Validate BCRYPT_SALT_ROUNDS
  if (isNaN(config.BCRYPT_SALT_ROUNDS) || config.BCRYPT_SALT_ROUNDS < 4 || config.BCRYPT_SALT_ROUNDS > 31) {
    logger.warn(`Invalid BCRYPT_SALT_ROUNDS: ${config.BCRYPT_SALT_ROUNDS}. Using default 10 instead.`);
    config.BCRYPT_SALT_ROUNDS = 10;
  }
  
  // Validate SESSION_MAX_AGE
  if (isNaN(config.SESSION_MAX_AGE) || config.SESSION_MAX_AGE <= 0) {
    logger.warn(`Invalid SESSION_MAX_AGE: ${config.SESSION_MAX_AGE}. Using default 86400000 instead.`);
    config.SESSION_MAX_AGE = 86400000;
  }
  
  // Validate EMAIL_PROVIDER
  if (!['smtp', 'sendgrid', 'mailgun', 'mock'].includes(config.EMAIL_PROVIDER)) {
    logger.warn(`Invalid EMAIL_PROVIDER: ${config.EMAIL_PROVIDER}. Using 'smtp' instead.`);
    config.EMAIL_PROVIDER = 'smtp';
  }
  
  // Validate SMTP_PORT
  if (isNaN(config.SMTP_PORT) || config.SMTP_PORT <= 0) {
    logger.warn(`Invalid SMTP_PORT: ${config.SMTP_PORT}. Using default 1025 instead.`);
    config.SMTP_PORT = 1025;
  }
  
  // Validate LOG_LEVEL
  if (!['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'].includes(config.LOG_LEVEL)) {
    logger.warn(`Invalid LOG_LEVEL: ${config.LOG_LEVEL}. Using default 'info' instead.`);
    config.LOG_LEVEL = 'info';
  }
  
  // Validate LOG_FORMAT
  if (!['dev', 'combined', 'common', 'short', 'tiny', 'json', 'test'].includes(config.LOG_FORMAT)) {
    logger.warn(`Invalid LOG_FORMAT: ${config.LOG_FORMAT}. Using default 'dev' instead.`);
    config.LOG_FORMAT = 'dev';
  }
  
  // Validate MAX_FILE_SIZE
  if (isNaN(config.MAX_FILE_SIZE) || config.MAX_FILE_SIZE <= 0) {
    logger.warn(`Invalid MAX_FILE_SIZE: ${config.MAX_FILE_SIZE}. Using default 10485760 instead.`);
    config.MAX_FILE_SIZE = 10485760;
  }
  
  // Validate RATE_LIMIT_WINDOW_MS and RATE_LIMIT_MAX_REQUESTS
  if (isNaN(config.RATE_LIMIT_WINDOW_MS) || config.RATE_LIMIT_WINDOW_MS <= 0) {
    logger.warn(`Invalid RATE_LIMIT_WINDOW_MS: ${config.RATE_LIMIT_WINDOW_MS}. Using default 60000 instead.`);
    config.RATE_LIMIT_WINDOW_MS = 60000;
  }
  
  if (isNaN(config.RATE_LIMIT_MAX_REQUESTS) || config.RATE_LIMIT_MAX_REQUESTS <= 0) {
    logger.warn(`Invalid RATE_LIMIT_MAX_REQUESTS: ${config.RATE_LIMIT_MAX_REQUESTS}. Using default 100 instead.`);
    config.RATE_LIMIT_MAX_REQUESTS = 100;
  }
  
  // Validate CACHE_TTL and CACHE_CHECK_PERIOD
  if (isNaN(config.CACHE_TTL) || config.CACHE_TTL < 0) {
    logger.warn(`Invalid CACHE_TTL: ${config.CACHE_TTL}. Using default 300 instead.`);
    config.CACHE_TTL = 300;
  }
  
  if (isNaN(config.CACHE_CHECK_PERIOD) || config.CACHE_CHECK_PERIOD < 0) {
    logger.warn(`Invalid CACHE_CHECK_PERIOD: ${config.CACHE_CHECK_PERIOD}. Using default 60 instead.`);
    config.CACHE_CHECK_PERIOD = 60;
  }
  
  // Validate production-specific settings if in production
  if (config.NODE_ENV === 'production') {
    // Check for secure JWT secrets
    if (config.JWT_SECRET === defaultEnvValues.JWT_SECRET) {
      logger.error('Production environment detected but using default JWT_SECRET. This is a security risk!');
    }
    
    if (config.JWT_REFRESH_SECRET === defaultEnvValues.JWT_REFRESH_SECRET) {
      logger.error('Production environment detected but using default JWT_REFRESH_SECRET. This is a security risk!');
    }
    
    if (config.SESSION_SECRET === defaultEnvValues.SESSION_SECRET) {
      logger.error('Production environment detected but using default SESSION_SECRET. This is a security risk!');
    }
    
    if (config.CSRF_SECRET === defaultEnvValues.CSRF_SECRET) {
      logger.error('Production environment detected but using default CSRF_SECRET. This is a security risk!');
    }
    
    // Validate NODE_CLUSTER_INSTANCES if provided
    if (config.NODE_CLUSTER_INSTANCES !== undefined && 
        (isNaN(config.NODE_CLUSTER_INSTANCES) || 
         (config.NODE_CLUSTER_INSTANCES < 0 && config.NODE_CLUSTER_INSTANCES !== 0))) {
      logger.warn(`Invalid NODE_CLUSTER_INSTANCES: ${config.NODE_CLUSTER_INSTANCES}. Using CPU count instead.`);
      config.NODE_CLUSTER_INSTANCES = 0; // 0 means use CPU count
    }
    
    // Validate COMPRESSION_LEVEL if provided
    if (config.COMPRESSION_LEVEL !== undefined && 
        (isNaN(config.COMPRESSION_LEVEL) || 
         config.COMPRESSION_LEVEL < 0 || 
         config.COMPRESSION_LEVEL > 9)) {
      logger.warn(`Invalid COMPRESSION_LEVEL: ${config.COMPRESSION_LEVEL}. Using default 6 instead.`);
      config.COMPRESSION_LEVEL = 6;
    }
    
    // Validate SERVE_STATIC_MAX_AGE if provided
    if (config.SERVE_STATIC_MAX_AGE !== undefined && 
        (isNaN(config.SERVE_STATIC_MAX_AGE) || 
         config.SERVE_STATIC_MAX_AGE < 0)) {
      logger.warn(`Invalid SERVE_STATIC_MAX_AGE: ${config.SERVE_STATIC_MAX_AGE}. Using default 2592000000 instead.`);
      config.SERVE_STATIC_MAX_AGE = 2592000000; // 30 days
    }
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
  const envVarName = `FEATURE_${name.toUpperCase()}`;
  return process.env[envVarName] === 'true' || defaultValue;
}

/**
 * Gets an environment variable value with a default
 * @param name The name of the environment variable
 * @param defaultValue The default value if the environment variable is not defined
 * @returns The environment variable value
 */
export function getEnvVar<T>(name: string, defaultValue: T): T {
  const value = process.env[name];
  
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
    logger.warn(`Error parsing environment variable ${name}:`, error);
    return defaultValue;
  }
  
  // For strings and other types, return as is
  return value as unknown as T;
}

/**
 * Gets the allowed file types as an array
 */
export const allowedFileTypes = parseAllowedFileTypes(env.ALLOWED_FILE_TYPES);

export default env;