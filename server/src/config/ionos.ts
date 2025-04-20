/**
 * IONOS Services Configuration
 * 
 * This file contains configuration for IONOS services including:
 * - Email services
 * - Hosting configuration
 * - Domain settings
 * - DNS configuration
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * IONOS Email Service Configuration
 */
export const ionosEmailConfig = {
  host: process.env.IONOS_EMAIL_HOST || 'smtp.ionos.com',
  port: parseInt(process.env.IONOS_EMAIL_PORT || '587', 10),
  secure: process.env.IONOS_EMAIL_SECURE === 'true',
  auth: {
    user: process.env.IONOS_EMAIL_USER || '',
    pass: process.env.IONOS_EMAIL_PASSWORD || '',
  },
  from: process.env.IONOS_EMAIL_FROM || 'noreply@cleanedgeremoval.com',
  replyTo: process.env.IONOS_EMAIL_REPLY_TO || 'info@cleanedgeremoval.com',
};

/**
 * IONOS Hosting Configuration
 */
export const ionosHostingConfig = {
  // FTP configuration for deployment
  ftp: {
    host: process.env.IONOS_FTP_HOST || 'ftp.ionos.com',
    port: parseInt(process.env.IONOS_FTP_PORT || '21', 10),
    user: process.env.IONOS_FTP_USER || '',
    password: process.env.IONOS_FTP_PASSWORD || '',
    rootDirectory: process.env.IONOS_FTP_ROOT_DIR || '/cleanedgeremoval',
  },
  // Database configuration
  database: {
    host: process.env.IONOS_DB_HOST || 'db.ionos.com',
    port: parseInt(process.env.IONOS_DB_PORT || '27017', 10),
    user: process.env.IONOS_DB_USER || '',
    password: process.env.IONOS_DB_PASSWORD || '',
    name: process.env.IONOS_DB_NAME || 'cleanedgeremoval',
  },
};

/**
 * IONOS Domain Configuration
 */
export const ionosDomainConfig = {
  primaryDomain: process.env.IONOS_PRIMARY_DOMAIN || 'cleanedgeremoval.com',
  subdomains: {
    www: process.env.IONOS_SUBDOMAIN_WWW === 'true',
    admin: process.env.IONOS_SUBDOMAIN_ADMIN === 'true',
    api: process.env.IONOS_SUBDOMAIN_API === 'true',
  },
};

/**
 * IONOS DNS Configuration
 */
export const ionosDnsConfig = {
  apiKey: process.env.IONOS_DNS_API_KEY || '',
  apiSecret: process.env.IONOS_DNS_API_SECRET || '',
  zoneId: process.env.IONOS_DNS_ZONE_ID || '',
};

/**
 * Combined IONOS Configuration
 */
export const ionosConfig = {
  email: ionosEmailConfig,
  hosting: ionosHostingConfig,
  domain: ionosDomainConfig,
  dns: ionosDnsConfig,
};

export default ionosConfig;