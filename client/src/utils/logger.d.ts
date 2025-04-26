/**
 * Logger Utility
 *
 * Provides a centralized logging mechanism for the application.
 * Supports different log levels and formats logs for better readability.
 * In production, can be configured to send logs to a remote logging service.
 */
export declare enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5,
    SILENT = 6
}
interface LoggerConfig {
    minLevel: LogLevel;
    enableConsole: boolean;
    enableRemote: boolean;
    remoteUrl?: string;
    applicationName: string;
    maxRetries: number;
    retryDelay: number;
    batchSize: number;
    flushInterval: number;
}
/**
 * Logger class for handling application logging
 */
declare class Logger {
    private config;
    private logQueue;
    private flushTimer;
    private isFlushing;
    constructor(config?: Partial<LoggerConfig>);
    /**
     * Update logger configuration
     */
    configure(config: Partial<LoggerConfig>): void;
    /**
     * Log a message at TRACE level
     */
    trace(message: string, data?: any, source?: string): void;
    /**
     * Log a message at DEBUG level
     */
    debug(message: string, data?: any, source?: string): void;
    /**
     * Log a message at INFO level
     */
    info(message: string, data?: any, source?: string): void;
    /**
     * Log a message at WARN level
     */
    warn(message: string, data?: any, source?: string): void;
    /**
     * Log a message at ERROR level
     */
    error(message: string, data?: any, source?: string): void;
    /**
     * Log a message at FATAL level
     */
    fatal(message: string, data?: any, source?: string): void;
    /**
     * Internal method to handle logging at any level
     */
    private log;
    /**
     * Format and log entry to the console
     */
    private logToConsole;
    /**
     * Start the flush timer for remote logging
     */
    private startFlushTimer;
    /**
     * Flush the log queue to the remote logging service
     */
    private flush;
    /**
     * Send logs to remote logging service with retry logic
     */
    private sendLogsToRemote;
}
export declare const logger: Logger;
export default Logger;
//# sourceMappingURL=logger.d.ts.map