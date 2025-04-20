/**
 * Deployment Configuration
 * 
 * This file contains configuration for deployment to IONOS hosting.
 * It includes FTP deployment settings, database connection details,
 * and other hosting-specific configurations.
 */

import dotenv from 'dotenv';
import { ionosHostingConfig } from './ionos';

// Load environment variables
dotenv.config();

/**
 * Environment-specific configuration
 */
const environments = {
  development: {
    apiUrl: process.env.API_URL || 'http://localhost:3001',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
    database: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/cleanedgeremoval',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
      },
    },
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    },
  },
  
  staging: {
    apiUrl: process.env.API_URL || 'https://staging-api.cleanedgeremoval.com',
    clientUrl: process.env.CLIENT_URL || 'https://staging.cleanedgeremoval.com',
    database: {
      uri: `mongodb://${ionosHostingConfig.database.user}:${ionosHostingConfig.database.password}@${ionosHostingConfig.database.host}:${ionosHostingConfig.database.port}/${ionosHostingConfig.database.name}`,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 20,
      },
    },
    cors: {
      origin: process.env.CORS_ORIGIN || 'https://staging.cleanedgeremoval.com',
      credentials: true,
    },
  },
  
  production: {
    apiUrl: process.env.API_URL || 'https://api.cleanedgeremoval.com',
    clientUrl: process.env.CLIENT_URL || 'https://cleanedgeremoval.com',
    database: {
      uri: `mongodb://${ionosHostingConfig.database.user}:${ionosHostingConfig.database.password}@${ionosHostingConfig.database.host}:${ionosHostingConfig.database.port}/${ionosHostingConfig.database.name}`,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 30,
        socketTimeoutMS: 45000,
      },
    },
    cors: {
      origin: process.env.CORS_ORIGIN || 'https://cleanedgeremoval.com',
      credentials: true,
    },
  },
};

/**
 * Deployment configuration
 */
export const deploymentConfig = {
  // Current environment
  env: process.env.NODE_ENV || 'development',
  
  // Port for the server to listen on
  port: parseInt(process.env.PORT || '3001', 10),
  
  // Environment-specific configuration
  ...environments[process.env.NODE_ENV as keyof typeof environments || 'development'],
  
  // FTP deployment configuration
  ftp: {
    host: ionosHostingConfig.ftp.host,
    port: ionosHostingConfig.ftp.port,
    user: ionosHostingConfig.ftp.user,
    password: ionosHostingConfig.ftp.password,
    rootDirectory: ionosHostingConfig.ftp.rootDirectory,
    secure: true, // Use FTPS
    retries: 3, // Number of retry attempts
    timeout: 30000, // Timeout in milliseconds
  },
  
  // SSL configuration
  ssl: {
    enabled: process.env.SSL_ENABLED === 'true',
    key: process.env.SSL_KEY_PATH || '',
    cert: process.env.SSL_CERT_PATH || '',
  },
  
  // Static file serving
  static: {
    path: process.env.STATIC_PATH || 'public',
    maxAge: parseInt(process.env.STATIC_MAX_AGE || '86400000', 10), // 1 day in milliseconds
  },
  
  // Compression configuration
  compression: {
    enabled: true,
    level: 6, // Compression level (0-9)
  },
  
  // Rate limiting configuration
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1 minute
    max: parseInt(process.env.RATE_LIMIT_MAX || '60', 10), // 60 requests per minute
  },
  
  // Logging configuration
  logging: {
    format: process.env.LOG_FORMAT || 'combined',
    level: process.env.LOG_LEVEL || 'info',
  },
};

export default deploymentConfig;