/**
 * Environment Configuration Utility
 *
 * Provides a centralized way to access environment variables with type safety,
 * default values, and validation. This helps prevent runtime errors caused by
 * missing or invalid environment variables.
 */
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
        type Timeout = ReturnType<typeof setTimeout>;
    }
    interface Process {
        env: NodeJS.ProcessEnv;
    }
    var process: Process;
}
interface EnvConfig {
    NODE_ENV: 'development' | 'test' | 'production';
    APP_NAME: string;
    APP_VERSION: string;
    API_URL: string;
    API_TIMEOUT: number;
    AUTH_COOKIE_NAME: string;
    AUTH_COOKIE_SECURE: boolean;
    AUTH_COOKIE_DOMAIN: string;
    AUTH_TOKEN_EXPIRY: number;
    ENABLE_ANALYTICS: boolean;
    ENABLE_NOTIFICATIONS: boolean;
    LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'silent';
    REMOTE_LOGGING_URL: string;
    IONOS_API_URL: string;
    CONTACT_PHONE: string;
    CONTACT_EMAIL?: string;
    CONTACT_ADDRESS?: string;
    SERVICE_AREAS: string;
    BUSINESS_HOURS_MON_FRI?: string;
    BUSINESS_HOURS_SAT?: string;
    BUSINESS_HOURS_SUN?: string;
}
/**
 * Environment configuration with default values and validation
 */
export declare const env: Readonly<EnvConfig>;
/**
 * Determines if the application is running in development mode
 */
export declare const isDevelopment: boolean;
/**
 * Determines if the application is running in test mode
 */
export declare const isTest: boolean;
/**
 * Determines if the application is running in production mode
 */
export declare const isProduction: boolean;
/**
 * Gets a feature flag value
 * @param name The name of the feature flag
 * @param defaultValue The default value if the feature flag is not defined
 * @returns The feature flag value
 */
export declare function getFeatureFlag(name: string, defaultValue?: boolean): boolean;
/**
 * Gets an environment variable value with a default
 * @param name The name of the environment variable
 * @param defaultValue The default value if the environment variable is not defined
 * @returns The environment variable value
 */
export declare function getEnvVar<T>(name: string, defaultValue: T): T;
export default env;
//# sourceMappingURL=env.d.ts.map