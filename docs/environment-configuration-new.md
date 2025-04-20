# Environment Configuration Guide (Updated 2025-04-20)

This document provides an exhaustive and meticulously detailed guide to the environment configuration system employed within the Clean Edge Removal LLC website project (client and server applications). Understanding and correctly utilizing this system is paramount for successful development, testing, and deployment across different environments (development, test, production).

## 1. Overview and Philosophy

The project utilizes environment variables (`.env` files) as the primary mechanism for managing configuration settings that differ across environments or contain sensitive information (e.g., API keys, database credentials). This approach adheres to the principle of separating configuration from code, enhancing security and deployment flexibility.

**Core Features of the Configuration System:**

*   **Environment-Specific Files:** Dedicated `.env` files (`.env.development`, `.env.test`, `.env.production`) allow for distinct settings for each stage.
*   **Type Safety:** Custom utility functions (`client/src/utils/env.ts`, `server/src/utils/env.ts`) provide type-safe access to environment variables within the TypeScript codebase, reducing runtime errors.
*   **Default Values:** The utilities provide sensible default values for non-critical configuration options if corresponding environment variables are missing.
*   **Validation:** The server-side utility includes validation logic to ensure critical environment variables are present and conform to expected formats upon application startup, preventing runtime failures due to misconfiguration.
*   **Centralized Access:** Importing the `env` object from the respective utility provides a single point of access to all configuration variables.
*   **Security:** Sensitive files (`.env.*`, except `.env.example`) are explicitly listed in `.gitignore` and **must never** be committed to version control.

## 2. Configuration Files and Loading

*   **`.env.example` (Root, Client, Server):** These files serve as **templates only**. They list *all* possible environment variables the application might use, along with explanatory comments and placeholder values (e.g., `your_api_key_here`). They **must** be kept up-to-date with any new variables added. Developers copy these templates to create their actual environment files.
*   **`.env.development` (Client, Server):** Used when running the application locally in development mode (e.g., via `npm run dev`). Contains settings specific to local development, such as local API URLs or development database credentials (though this project uses the remote IONOS DB primarily). **GITIGNORED.**
*   **`.env.test` (Client, Server):** Used when running automated tests (e.g., via `npm test`). Contains settings specific to the testing environment, such as test database credentials or mocked service endpoints. **GITIGNORED.**
*   **`.env.production` (Client, Server):** Contains settings for the live production deployment. This file is typically not present in the repository but is created and populated securely on the production server during the deployment process. **GITIGNORED.**
*   **`.env` (Server - Optional):** Some Node.js environment loading libraries (like `dotenv`) might implicitly load a root `.env` file. The primary mechanism relies on environment-specific files (`.env.development`, etc.), but a root `.env` could potentially hold variables common to all server environments if needed (use with caution to avoid overriding specific settings).

**Loading Mechanism (Server):**

The `server/src/utils/env.ts` utility (or the library it uses, like `dotenv`) is responsible for automatically loading the correct `.env.*` file based on the `NODE_ENV` environment variable (`development`, `test`, or `production`). `NODE_ENV` should be set appropriately when running the server in different modes (e.g., `NODE_ENV=production node dist/index.js`).

**Loading Mechanism (Client - React):**

Create React App (or similar build tools like Webpack configured with `dotenv-webpack`) typically handles loading client-side environment variables. Variables intended for client-side use **must** be prefixed with `REACT_APP_` (e.g., `REACT_APP_API_URL`). Only these prefixed variables are embedded into the client build to prevent accidental exposure of server-side secrets. The `client/src/utils/env.ts` utility accesses these `process.env.REACT_APP_*` variables.

## 3. Environment Utility Usage (`env.ts`)

Both the client (`client/src/utils/env.ts`) and server (`server/src/utils/env.ts`) provide a similar interface for accessing configuration.

**Key Exports & Usage:**

*   **`env` (Default Export):** An object containing all parsed, typed, and potentially defaulted environment variables. Access variables directly:
    ```typescript
    import env from './utils/env'; // Adjust path as needed

    const apiUrl: string = env.API_URL; // Client example (REACT_APP_API_URL)
    const dbPort: number = env.DB_PORT; // Server example
    ```
*   **`isDevelopment`, `isProduction`, `isTest` (Booleans):** Helper flags derived from `NODE_ENV`.
    ```typescript
    import { isDevelopment } from './utils/env';

    if (isDevelopment) {
      console.log('Debug info...');
      // Setup development-only tools
    }
    ```
*   **`getFeatureFlag(flagName: string, defaultValue: boolean): boolean`:** Safely checks if a feature flag (prefixed environment variable, e.g., `REACT_APP_FEATURE_DARK_MODE` or `FEATURE_NEW_SCHEDULER`) is enabled. Returns the `defaultValue` if the variable is not set.
    ```typescript
    import { getFeatureFlag } from './utils/env';

    // Assumes FEATURE_NEW_CHECKOUT=true in .env file
    const useNewCheckout = getFeatureFlag('NEW_CHECKOUT', false); // Returns true

    // Assumes FEATURE_BETA_ACCESS is not set
    const enableBeta = getFeatureFlag('BETA_ACCESS', false); // Returns false
    ```
*   **`getEnvVar(varName: string, defaultValue?: string): string | undefined`:** Accesses any environment variable by name, returning an optional default value if not found. Use sparingly; prefer the typed `env` object.

## 4. Configuration Variable Reference

This section provides an exhaustive reference for **all** planned and implemented environment variables, categorized for clarity. Variables marked `(Server)` are used by the backend, `(Client)` by the frontend, and `(Shared)` potentially by both (though less common). Variables marked `(Planned)` are not yet fully implemented or utilized.

**Crucially, `.env.example` files in `client/` and `server/` serve as the definitive template for *creating* local `.env.*` files.** This guide explains the *purpose* of each variable.

### 4.1. Server Configuration (`server/.env.*`)

#### 4.1.1. Server Operation

*   `NODE_ENV` (Server): Sets the runtime environment (`development`, `test`, `production`). Affects logging levels, error details, middleware, and which `.env.*` file is loaded. **Required.**
*   `PORT` (Server): The port number the Express server will listen on. Default: `5000`. **Required.**
*   `HOST` (Server): The hostname the server binds to (e.g., `0.0.0.0` to listen on all interfaces, `127.0.0.1` for local only). Default: `0.0.0.0`.
*   `API_PREFIX` (Server): The base path for all API routes. Default: `/api`.
*   `CORS_ORIGIN` (Server): Specifies the allowed origins for Cross-Origin Resource Sharing. Use `*` for development (with caution), but restrict to the specific frontend domain(s) (e.g., `https://www.cleanedgeremoval.com,https://admin.cleanedgeremoval.com`) in production. **Required for Production.**
*   `TRUST_PROXY` (Server): Configures Express `trust proxy` setting (e.g., `1`, `loopback`, specific IP ranges) if the server runs behind a reverse proxy (like Nginx or a load balancer) to correctly identify client IP addresses for logging or rate limiting. Default: `false`.

#### 4.1.2. Database (IONOS MySQL)

*   `DB_HOST` (Server): Hostname of the IONOS Managed MySQL database server (e.g., `db5017699173.hosting-data.io`). **Required.**
*   `DB_PORT` (Server): Port number for the MySQL database server. Default: `3306`. **Required.**
*   `DB_NAME` (Server): Name of the database to connect to (e.g., `cleanedgeremoval`). **Required.**
*   `DB_USER` (Server): Username for authenticating with the database. **Required.**
*   `DB_PASSWORD` (Server): Password for the database user. **Required.** Store securely.
*   `DB_SSL` (Server): Whether to use SSL for the database connection (`true` or `false`). Verify IONOS requirements. Default: `false`.
*   `DB_POOL_MIN` (Server, Optional): Minimum number of connections in the database connection pool. Defaults typically handled by the ORM.
*   `DB_POOL_MAX` (Server, Optional): Maximum number of connections in the database connection pool. Defaults typically handled by the ORM.
*   `DB_DEBUG` (Server, Optional): Enable detailed logging of database queries (`true` or `false`). Use only for debugging. Default: `false`.

#### 4.1.3. Authentication & Security

*   `JWT_SECRET` (Server): Secret key used for signing **symmetric** JWTs (if used) or potentially other cryptographic operations. Generate a strong, random string. **Required.**
*   `JWT_ACCESS_TOKEN_PRIVATE_KEY` (Server): **Required for RSA-256.** The private RSA key (PEM format, potentially base64 encoded) used for signing access tokens. Keep highly secure.
*   `JWT_ACCESS_TOKEN_PUBLIC_KEY` (Server): **Required for RSA-256.** The public RSA key (PEM format, potentially base64 encoded) used for verifying access tokens.
*   `JWT_ACCESS_TOKEN_EXPIRES_IN` (Server): Expiration time for access tokens (e.g., `15m`, `1h`). Default: `15m`. **Required.**
*   `JWT_REFRESH_TOKEN_SECRET` (Server): A separate, strong secret used internally for hashing/verifying refresh tokens before database lookup (adds layer of security). **Required.**
*   `JWT_REFRESH_TOKEN_EXPIRES_IN_SECONDS` (Server): Expiration time for refresh tokens in seconds (e.g., `2592000` for 30 days). **Required.**
*   `BCRYPT_SALT_ROUNDS` (Server): Number of salt rounds for bcrypt password hashing. Higher is more secure but slower. Default: `12`. **Required.**
*   `SESSION_SECRET` (Server, If using express-session): Secret key for signing session cookies. Generate a strong, random string.
*   `SESSION_NAME` (Server, If using express-session): Name for the session cookie. Default: `connect.sid`.
*   `SESSION_MAX_AGE` (Server, If using express-session): Session cookie maximum age in milliseconds.
*   `MFA_ISSUER_NAME` (Server): Name displayed in authenticator apps (e.g., `Clean Edge Removal`). Default: `CleanEdgeApp`.

#### 4.1.4. Email Service (IONOS SMTP)

*   `IONOS_EMAIL_HOST` (Server): IONOS SMTP server hostname. Default: `smtp.ionos.com`. **Required.**
*   `IONOS_EMAIL_PORT` (Server): IONOS SMTP port (e.g., `587` for STARTTLS, `465` for SSL). Default: `587`. **Required.**
*   `IONOS_EMAIL_SECURE` (Server): Use SSL (`true` for port 465) or STARTTLS (`false` for port 587). Default: `false`. **Required.**
*   `IONOS_EMAIL_USER` (Server): Username for the IONOS mailbox used for sending emails (e.g., `noreply@cleanedgeremoval.com`). **Required.**
*   `IONOS_EMAIL_PASSWORD` (Server): Password for the IONOS sending mailbox. **Required.** Store securely.
*   `IONOS_EMAIL_FROM` (Server): Default "From" address for outgoing emails (e.g., `"Clean Edge Removal <noreply@cleanedgeremoval.com>"`). **Required.**
*   `IONOS_EMAIL_REPLY_TO` (Server, Optional): Default "Reply-To" address (e.g., `info@cleanedgeremoval.com`).

#### 4.1.5. External Services (API Keys & Secrets)

*   `GOOGLE_MAPS_API_KEY` (Server): Google Maps API Key (for server-side geocoding, directions, distance matrix). **Required.**
*   `GOOGLE_CLIENT_ID` (Server, Planned): Google OAuth Client ID (for Calendar API).
*   `GOOGLE_CLIENT_SECRET` (Server, Planned): Google OAuth Client Secret (for Calendar API).
*   `GOOGLE_REDIRECT_URI` (Server, Planned): Google OAuth Redirect URI (for Calendar API).
*   `GOOGLE_CALENDAR_ID` (Server, Planned): ID of the primary Google Calendar to interact with.
*   `TWILIO_ACCOUNT_SID` (Server, Planned): Twilio Account SID (for SMS).
*   `TWILIO_AUTH_TOKEN` (Server, Planned): Twilio Auth Token (for SMS).
*   `TWILIO_PHONE_NUMBER` (Server, Planned): Twilio phone number used for sending SMS.
*   `STRIPE_SECRET_KEY` (Server, Planned): Stripe Secret Key (for payment processing, refunds, etc.).
*   `STRIPE_WEBHOOK_SECRET` (Server, Planned): Stripe Webhook Signing Secret (for verifying incoming webhooks).

#### 4.1.6. Logging (Winston)

*   `LOG_LEVEL` (Server): Logging level (`error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`). Default: `info` (production), `debug` (development).
*   `LOG_FORMAT` (Server): Log format (`json`, `simple`). Default: `json` (production), `simple` (development).
*   `LOG_DIR` (Server, Optional): Directory to store log files (if file transport is used). Default: `logs`.
*   `LOG_MAX_SIZE` (Server, Optional): Maximum size of log files before rotation (e.g., `20m`).
*   `LOG_MAX_FILES` (Server, Optional): Maximum number of rotated log files to keep (e.g., `14d`).

#### 4.1.7. File Uploads

*   `UPLOAD_DIR` (Server): Directory for storing temporary file uploads. Default: `uploads`.
*   `MAX_FILE_SIZE` (Server): Maximum allowed file upload size in bytes. Default: `5242880` (5MB).
*   `ALLOWED_FILE_TYPES` (Server): Comma-separated list of allowed MIME types (e.g., `image/jpeg,image/png,application/pdf`).

#### 4.1.8. Rate Limiting

*   `RATE_LIMIT_WINDOW_MS` (Server): Time window for rate limiting in milliseconds. Default: `900000` (15 minutes).
*   `RATE_LIMIT_MAX_REQUESTS` (Server): Maximum number of requests allowed per window per IP. Default: `100`.

#### 4.1.9. Deployment (IONOS FTP Script)

*   `IONOS_FTP_HOST` (Server): IONOS FTP hostname. **Required for deploy script.**
*   `IONOS_FTP_PORT` (Server): IONOS FTP port. Default: `21`. **Required for deploy script.**
*   `IONOS_FTP_USER` (Server): IONOS FTP username. **Required for deploy script.**
*   `IONOS_FTP_PASSWORD` (Server): IONOS FTP password. **Required for deploy script.** Store securely.
*   `IONOS_FTP_ROOT_DIR` (Server): Target root directory on the FTP server for deployment. **Required for deploy script.**

#### 4.1.10. Feature Flags (Server-side)

*   `FEATURE_ENABLE_AUTO_SCHEDULE` (Server): Toggle automatic scheduling feature (`true`/`false`). Default: `false`.
*   `(Planned)` Other server-side feature flags as needed.

### 4.2. Client Configuration (`client/.env.*`)

**Note:** All client-side variables **must** be prefixed with `REACT_APP_`.

*   `REACT_APP_API_URL` (Client): The full base URL of the backend API server (e.g., `http://localhost:5000/api` or `https://api.cleanedgeremoval.com/api`). **Required.**
*   `REACT_APP_GOOGLE_MAPS_API_KEY` (Client): Google Maps API Key (for displaying maps, Places Autocomplete). **Required.**
*   `REACT_APP_STRIPE_PUBLIC_KEY` (Client, Planned): Stripe Publishable Key (for Stripe Elements/Checkout).
*   `REACT_APP_RECAPTCHA_SITE_KEY` (Client, Planned): Google reCAPTCHA Site Key (for v2/v3).
*   `REACT_APP_LOG_LEVEL` (Client, Optional): Client-side log level (`debug`, `info`, `warn`, `error`). Default: `info`.
*   `REACT_APP_FEATURE_DARK_MODE` (Client, Planned): Enable dark mode toggle (`true`/`false`).
*   `(Planned)` Other client-side feature flags or configuration as needed.

## 5. Best Practices for Management

*   **Security:** Treat `.env.*` files (except `.env.example`) as highly sensitive. Ensure they are never committed to Git. Use secure methods for managing production secrets (e.g., platform-provided secrets management, HashiCorp Vault).
*   **Consistency:** Keep `.env.example` files perfectly synchronized with all possible variables used by the application across all environments.
*   **Validation:** Rely on the server-side startup validation to catch critical missing variables early.
*   **Documentation:** Clearly document the purpose, expected format, and default value (if any) of each environment variable in this guide and in `.env.example`.
*   **Specificity:** Use distinct variables for different environments (e.g., separate database credentials for test and production). Avoid reusing variables across environments unless they are truly static and non-sensitive.