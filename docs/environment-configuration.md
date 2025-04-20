# Environment Configuration Guide

This document provides an overview of the environment configuration system used in the Clean Edge Removal website and API.

## Overview

The application uses a robust environment configuration system that provides:

- Type-safe access to environment variables
- Default values for missing variables
- Validation of environment variable values
- Environment-specific configuration files
- Feature flags for toggling functionality

## Configuration Files

The application uses different `.env` files for different environments:

- `.env.example` - Template with all available configuration options and documentation
- `.env.development` - Development environment configuration
- `.env.test` - Test environment configuration
- `.env.production` - Production environment configuration

These files are located in both the client and server directories:

- Client: `client/.env.[environment]`
- Server: `server/.env.[environment]`

## Environment Utilities

### Client-side Environment Utility

The client-side environment utility (`client/src/utils/env.ts`) provides:

- Type-safe access to environment variables
- Default values for missing variables
- Environment mode helpers (`isDevelopment`, `isProduction`, `isTest`)
- Feature flag access (`getFeatureFlag`)
- Generic environment variable access (`getEnvVar`)

Example usage:

```typescript
import env, { isDevelopment, getFeatureFlag } from '../utils/env';

// Access typed environment variables
const apiUrl = env.API_URL;
const timeout = env.API_TIMEOUT;

// Check environment mode
if (isDevelopment) {
  console.log('Running in development mode');
}

// Check feature flags
if (getFeatureFlag('DARK_MODE', true)) {
  enableDarkMode();
}
```

### Server-side Environment Utility

The server-side environment utility (`server/src/utils/env.ts`) provides:

- Automatic loading of environment-specific `.env` files
- Type-safe access to environment variables
- Default values for missing variables
- Validation of environment variable values
- Environment mode helpers (`isDevelopment`, `isProduction`, `isTest`)
- Feature flag access (`getFeatureFlag`)
- Generic environment variable access (`getEnvVar`)
- Parsed allowed file types (`allowedFileTypes`)

Example usage:

```typescript
import env, { isDevelopment, getFeatureFlag, allowedFileTypes } from '../utils/env';

// Access typed environment variables
const port = env.PORT;
const dbConfig = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  ssl: env.DB_SSL,
};

// Check environment mode
if (isDevelopment) {
  console.log('Running in development mode');
}

// Check feature flags
if (getFeatureFlag('ENABLE_GRAPHQL', false)) {
  setupGraphQL();
}

// Use parsed allowed file types
app.use(fileUpload({
  limits: { fileSize: env.MAX_FILE_SIZE },
  abortOnLimit: true,
  limitHandler: (req, res) => {
    res.status(413).send('File too large');
  },
  fileFilter: (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  },
}));
```

## Configuration Categories

The environment configuration is organized into the following categories:

### Client-side Configuration

1. **Application**
   - `REACT_APP_NAME` - Application name
   - `REACT_APP_VERSION` - Application version
   - `REACT_APP_DESCRIPTION` - Application description

2. **API Configuration**
   - `REACT_APP_API_URL` - API base URL
   - `REACT_APP_API_TIMEOUT` - API request timeout in milliseconds

3. **Authentication**
   - `REACT_APP_AUTH_COOKIE_NAME` - Authentication cookie name
   - `REACT_APP_AUTH_COOKIE_SECURE` - Whether to use secure cookies
   - `REACT_APP_AUTH_COOKIE_DOMAIN` - Cookie domain
   - `REACT_APP_AUTH_TOKEN_EXPIRY` - Token expiry time in seconds

4. **Feature Flags**
   - `REACT_APP_ENABLE_ANALYTICS` - Enable analytics
   - `REACT_APP_ENABLE_NOTIFICATIONS` - Enable notifications
   - `REACT_APP_FEATURE_DARK_MODE` - Enable dark mode
   - `REACT_APP_FEATURE_ONLINE_BOOKING` - Enable online booking
   - `REACT_APP_FEATURE_LIVE_CHAT` - Enable live chat
   - `REACT_APP_FEATURE_CUSTOMER_PORTAL` - Enable customer portal

5. **Logging**
   - `REACT_APP_LOG_LEVEL` - Log level
   - `REACT_APP_REMOTE_LOGGING_URL` - Remote logging URL

6. **IONOS Integration**
   - `REACT_APP_IONOS_API_URL` - IONOS API URL
   - `REACT_APP_IONOS_API_KEY` - IONOS API key
   - `REACT_APP_IONOS_API_SECRET` - IONOS API secret

7. **Email Service**
   - `REACT_APP_EMAIL_SERVICE_URL` - Email service URL
   - `REACT_APP_EMAIL_FROM_ADDRESS` - Email from address
   - `REACT_APP_EMAIL_CONTACT_ADDRESS` - Contact email address

8. **Google Maps API**
   - `REACT_APP_GOOGLE_MAPS_API_KEY` - Google Maps API key

9. **Stripe Integration**
   - `REACT_APP_STRIPE_PUBLIC_KEY` - Stripe public key
   - `REACT_APP_STRIPE_PRICE_ID_BASIC` - Stripe price ID for basic plan
   - `REACT_APP_STRIPE_PRICE_ID_STANDARD` - Stripe price ID for standard plan
   - `REACT_APP_STRIPE_PRICE_ID_PREMIUM` - Stripe price ID for premium plan

10. **Social Media**
    - `REACT_APP_SOCIAL_FACEBOOK` - Facebook URL
    - `REACT_APP_SOCIAL_TWITTER` - Twitter URL
    - `REACT_APP_SOCIAL_INSTAGRAM` - Instagram URL
    - `REACT_APP_SOCIAL_LINKEDIN` - LinkedIn URL

11. **Contact Information**
    - `REACT_APP_CONTACT_PHONE` - Contact phone number
    - `REACT_APP_CONTACT_EMAIL` - Contact email address
    - `REACT_APP_CONTACT_ADDRESS` - Contact physical address

12. **Business Hours**
    - `REACT_APP_BUSINESS_HOURS_MON_FRI` - Monday to Friday business hours
    - `REACT_APP_BUSINESS_HOURS_SAT` - Saturday business hours
    - `REACT_APP_BUSINESS_HOURS_SUN` - Sunday business hours

13. **Service Areas**
    - `REACT_APP_SERVICE_AREAS` - Comma-separated list of service areas

14. **Performance Monitoring**
    - `REACT_APP_ENABLE_PERFORMANCE_MONITORING` - Enable performance monitoring
    - `REACT_APP_PERFORMANCE_SAMPLE_RATE` - Performance monitoring sample rate

15. **Error Tracking**
    - `REACT_APP_ENABLE_ERROR_TRACKING` - Enable error tracking
    - `REACT_APP_ERROR_SAMPLE_RATE` - Error tracking sample rate

16. **Content Delivery Network**
    - `REACT_APP_CDN_URL` - CDN URL

17. **Maintenance Mode**
    - `REACT_APP_MAINTENANCE_MODE` - Enable maintenance mode
    - `REACT_APP_MAINTENANCE_END_TIME` - Maintenance end time
    - `REACT_APP_MAINTENANCE_MESSAGE` - Maintenance message

18. **Security**
    - `REACT_APP_ENABLE_CSP` - Enable Content Security Policy
    - `REACT_APP_ENABLE_HSTS` - Enable HTTP Strict Transport Security
    - `REACT_APP_ENABLE_XSS_PROTECTION` - Enable XSS protection
    - `REACT_APP_ENABLE_CONTENT_TYPE_OPTIONS` - Enable content type options
    - `REACT_APP_ENABLE_FRAME_OPTIONS` - Enable frame options

### Server-side Configuration

1. **Server Configuration**
   - `PORT` - Server port
   - `HOST` - Server host
   - `NODE_ENV` - Node environment
   - `API_PREFIX` - API prefix
   - `CORS_ORIGIN` - CORS origin
   - `TRUST_PROXY` - Trust proxy

2. **Database Configuration**
   - `DB_HOST` - Database host
   - `DB_PORT` - Database port
   - `DB_NAME` - Database name
   - `DB_USER` - Database user
   - `DB_PASSWORD` - Database password
   - `DB_SSL` - Use SSL for database connection
   - `DB_POOL_MIN` - Minimum database pool size
   - `DB_POOL_MAX` - Maximum database pool size
   - `DB_DEBUG` - Enable database query debugging

3. **Authentication**
   - `JWT_SECRET` - JWT secret key
   - `JWT_EXPIRES_IN` - JWT expiry time in seconds
   - `JWT_REFRESH_SECRET` - JWT refresh token secret key
   - `JWT_REFRESH_EXPIRES_IN` - JWT refresh token expiry time in seconds
   - `BCRYPT_SALT_ROUNDS` - BCrypt salt rounds
   - `SESSION_SECRET` - Session secret key
   - `SESSION_NAME` - Session name
   - `SESSION_MAX_AGE` - Session max age in milliseconds

4. **Email Service**
   - `EMAIL_PROVIDER` - Email provider (smtp, sendgrid, mailgun, mock)
   - `SMTP_HOST` - SMTP host
   - `SMTP_PORT` - SMTP port
   - `SMTP_SECURE` - Use secure SMTP
   - `SMTP_USER` - SMTP user
   - `SMTP_PASS` - SMTP password
   - `EMAIL_FROM_ADDRESS` - Email from address
   - `EMAIL_FROM_NAME` - Email from name
   - `EMAIL_CONTACT_ADDRESS` - Contact email address

5. **IONOS Integration**
   - `IONOS_API_URL` - IONOS API URL
   - `IONOS_API_KEY` - IONOS API key
   - `IONOS_API_SECRET` - IONOS API secret

6. **Stripe Integration**
   - `STRIPE_SECRET_KEY` - Stripe secret key
   - `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
   - `STRIPE_PRICE_ID_BASIC` - Stripe price ID for basic plan
   - `STRIPE_PRICE_ID_STANDARD` - Stripe price ID for standard plan
   - `STRIPE_PRICE_ID_PREMIUM` - Stripe price ID for premium plan

7. **Google Maps API**
   - `GOOGLE_MAPS_API_KEY` - Google Maps API key

8. **Logging**
   - `LOG_LEVEL` - Log level
   - `LOG_FORMAT` - Log format
   - `LOG_DIR` - Log directory
   - `LOG_MAX_SIZE` - Maximum log file size
   - `LOG_MAX_FILES` - Maximum number of log files
   - `ENABLE_REQUEST_LOGGING` - Enable request logging
   - `ENABLE_RESPONSE_LOGGING` - Enable response logging
   - `ENABLE_DB_QUERY_LOGGING` - Enable database query logging

9. **File Storage**
   - `UPLOAD_DIR` - Upload directory
   - `MAX_FILE_SIZE` - Maximum file size
   - `ALLOWED_FILE_TYPES` - Allowed file types

10. **Rate Limiting**
    - `RATE_LIMIT_WINDOW_MS` - Rate limit window in milliseconds
    - `RATE_LIMIT_MAX_REQUESTS` - Maximum requests per window
    - `RATE_LIMIT_SKIP_TRUSTED` - Skip rate limiting for trusted IPs

11. **Cache**
    - `CACHE_ENABLED` - Enable caching
    - `CACHE_TTL` - Cache TTL in seconds
    - `CACHE_CHECK_PERIOD` - Cache check period in seconds

12. **Security**
    - `ENABLE_HELMET` - Enable Helmet security middleware
    - `ENABLE_XSS_PROTECTION` - Enable XSS protection
    - `ENABLE_CONTENT_TYPE_OPTIONS` - Enable content type options
    - `ENABLE_FRAME_OPTIONS` - Enable frame options
    - `ENABLE_CSRF` - Enable CSRF protection
    - `CSRF_SECRET` - CSRF secret key
    - `CSRF_COOKIE_NAME` - CSRF cookie name

13. **Maintenance Mode**
    - `MAINTENANCE_MODE` - Enable maintenance mode
    - `MAINTENANCE_END_TIME` - Maintenance end time
    - `MAINTENANCE_MESSAGE` - Maintenance message

14. **Monitoring**
    - `ENABLE_PERFORMANCE_MONITORING` - Enable performance monitoring
    - `ENABLE_ERROR_TRACKING` - Enable error tracking

15. **Development/Test Specific**
    - `ENABLE_SWAGGER` - Enable Swagger documentation
    - `ENABLE_GRAPHQL_PLAYGROUND` - Enable GraphQL playground
    - `MOCK_EXTERNAL_SERVICES` - Mock external services
    - `TEST_USER_EMAIL` - Test user email
    - `TEST_USER_PASSWORD` - Test user password
    - `TEST_ADMIN_EMAIL` - Test admin email
    - `TEST_ADMIN_PASSWORD` - Test admin password

16. **Production Specific**
    - `NODE_CLUSTER_INSTANCES` - Number of Node.js cluster instances (0 = use CPU count)
    - `COMPRESSION_LEVEL` - Compression level
    - `SERVE_STATIC_MAX_AGE` - Static file max age

## Best Practices

1. **Never commit sensitive information to version control**
   - Keep `.env` files out of version control (they are already in `.gitignore`)
   - Use `.env.example` as a template for required variables
   - Use environment variables for secrets in production

2. **Use environment-specific configurations**
   - Development: `client/.env.development` and `server/.env.development`
   - Test: `client/.env.test` and `server/.env.test`
   - Production: `client/.env.production` and `server/.env.production`

3. **Use the environment utilities**
   - Import from `client/src/utils/env.ts` or `server/src/utils/env.ts`
   - Use the typed `env` object for type safety
   - Use the helper functions for environment checks and feature flags

4. **Validate environment variables**
   - The environment utilities validate and provide defaults for missing variables
   - Check the logs for warnings about invalid or missing variables

5. **Use feature flags for toggling functionality**
   - Define feature flags in the `.env` files
   - Use `getFeatureFlag` to check if a feature is enabled