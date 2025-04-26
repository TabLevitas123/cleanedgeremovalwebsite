"use strict";
/**
 * Logger Utility
 *
 * Provides a centralized logging mechanism for the application.
 * Supports different log levels and formats logs for better readability.
 * In production, can be configured to send logs to a remote logging service.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LogLevel = void 0;
// Log levels in order of severity
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["TRACE"] = 0] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 5] = "FATAL";
    LogLevel[LogLevel["SILENT"] = 6] = "SILENT";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
// Log level names for display
const LOG_LEVEL_NAMES = {
    [LogLevel.TRACE]: 'TRACE',
    [LogLevel.DEBUG]: 'DEBUG',
    [LogLevel.INFO]: 'INFO',
    [LogLevel.WARN]: 'WARN',
    [LogLevel.ERROR]: 'ERROR',
    [LogLevel.FATAL]: 'FATAL',
    [LogLevel.SILENT]: 'SILENT',
};
// Log level colors for console output
const LOG_LEVEL_COLORS = {
    [LogLevel.TRACE]: '#6c757d', // gray
    [LogLevel.DEBUG]: '#17a2b8', // cyan
    [LogLevel.INFO]: '#28a745', // green
    [LogLevel.WARN]: '#ffc107', // yellow
    [LogLevel.ERROR]: '#dc3545', // red
    [LogLevel.FATAL]: '#7b1fa2', // purple
    [LogLevel.SILENT]: '',
};
// Default configuration
const DEFAULT_CONFIG = {
    minLevel: typeof process !== 'undefined' && process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
    enableConsole: true,
    enableRemote: typeof process !== 'undefined' && process.env.NODE_ENV === 'production',
    applicationName: 'CleanEdgeRemoval',
    maxRetries: 3,
    retryDelay: 1000,
    batchSize: 10,
    flushInterval: 10000, // 10 seconds
};
/**
 * Logger class for handling application logging
 */
class Logger {
    constructor(config = {}) {
        this.logQueue = [];
        this.flushTimer = null;
        this.isFlushing = false;
        this.config = { ...DEFAULT_CONFIG, ...config };
        // Start flush timer if remote logging is enabled
        if (this.config.enableRemote) {
            this.startFlushTimer();
        }
        // Log initialization
        this.info('Logger initialized', { config: this.config });
    }
    /**
     * Update logger configuration
     */
    configure(config) {
        const oldConfig = { ...this.config };
        this.config = { ...this.config, ...config };
        // If remote logging was disabled and is now enabled, start flush timer
        if (!oldConfig.enableRemote && this.config.enableRemote) {
            this.startFlushTimer();
        }
        // If remote logging was enabled and is now disabled, stop flush timer
        if (oldConfig.enableRemote && !this.config.enableRemote && this.flushTimer) {
            clearInterval(this.flushTimer);
            this.flushTimer = null;
        }
        this.debug('Logger configuration updated', {
            oldConfig,
            newConfig: this.config
        });
    }
    /**
     * Log a message at TRACE level
     */
    trace(message, data, source) {
        this.log(LogLevel.TRACE, message, data, source);
    }
    /**
     * Log a message at DEBUG level
     */
    debug(message, data, source) {
        this.log(LogLevel.DEBUG, message, data, source);
    }
    /**
     * Log a message at INFO level
     */
    info(message, data, source) {
        this.log(LogLevel.INFO, message, data, source);
    }
    /**
     * Log a message at WARN level
     */
    warn(message, data, source) {
        this.log(LogLevel.WARN, message, data, source);
    }
    /**
     * Log a message at ERROR level
     */
    error(message, data, source) {
        this.log(LogLevel.ERROR, message, data, source);
    }
    /**
     * Log a message at FATAL level
     */
    fatal(message, data, source) {
        this.log(LogLevel.FATAL, message, data, source);
    }
    /**
     * Internal method to handle logging at any level
     */
    log(level, message, data, source) {
        // Skip if log level is below minimum level
        if (level < this.config.minLevel) {
            return;
        }
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            data,
            source,
        };
        // Log to console if enabled
        if (this.config.enableConsole) {
            this.logToConsole(logEntry);
        }
        // Add to queue for remote logging if enabled
        if (this.config.enableRemote) {
            this.logQueue.push(logEntry);
            // Flush immediately if queue exceeds batch size
            if (this.logQueue.length >= this.config.batchSize) {
                this.flush();
            }
        }
    }
    /**
     * Format and log entry to the console
     */
    logToConsole(entry) {
        const { timestamp, level, message, data, source } = entry;
        const levelName = LOG_LEVEL_NAMES[level];
        const color = LOG_LEVEL_COLORS[level];
        // Format timestamp to be more readable
        const formattedTime = new Date(timestamp).toLocaleTimeString();
        // Create log prefix with timestamp, level, and optional source
        const prefix = source
            ? `[${formattedTime}] [${levelName}] [${source}]:`
            : `[${formattedTime}] [${levelName}]:`;
        // Apply color styling if supported
        const styledPrefix = color ? `%c${prefix}` : prefix;
        // Log to appropriate console method based on level
        switch (level) {
            case LogLevel.TRACE:
            case LogLevel.DEBUG:
                if (color && data) {
                    console.debug(styledPrefix, `color: ${color}`, message, data);
                }
                else if (color) {
                    console.debug(styledPrefix, `color: ${color}`, message);
                }
                else if (data) {
                    console.debug(prefix, message, data);
                }
                else {
                    console.debug(prefix, message);
                }
                break;
            case LogLevel.INFO:
                if (color && data) {
                    console.info(styledPrefix, `color: ${color}`, message, data);
                }
                else if (color) {
                    console.info(styledPrefix, `color: ${color}`, message);
                }
                else if (data) {
                    console.info(prefix, message, data);
                }
                else {
                    console.info(prefix, message);
                }
                break;
            case LogLevel.WARN:
                if (color && data) {
                    console.warn(styledPrefix, `color: ${color}`, message, data);
                }
                else if (color) {
                    console.warn(styledPrefix, `color: ${color}`, message);
                }
                else if (data) {
                    console.warn(prefix, message, data);
                }
                else {
                    console.warn(prefix, message);
                }
                break;
            case LogLevel.ERROR:
            case LogLevel.FATAL:
                if (color && data) {
                    console.error(styledPrefix, `color: ${color}`, message, data);
                }
                else if (color) {
                    console.error(styledPrefix, `color: ${color}`, message);
                }
                else if (data) {
                    console.error(prefix, message, data);
                }
                else {
                    console.error(prefix, message);
                }
                break;
        }
    }
    /**
     * Start the flush timer for remote logging
     */
    startFlushTimer() {
        if (this.flushTimer) {
            clearInterval(this.flushTimer);
        }
        this.flushTimer = setInterval(() => {
            if (this.logQueue.length > 0) {
                this.flush();
            }
        }, this.config.flushInterval);
    }
    /**
     * Flush the log queue to the remote logging service
     */
    async flush() {
        // Skip if already flushing or queue is empty
        if (this.isFlushing || this.logQueue.length === 0 || !this.config.enableRemote) {
            return;
        }
        this.isFlushing = true;
        try {
            // Take logs up to batch size
            const logsToSend = this.logQueue.slice(0, this.config.batchSize);
            // In a real implementation, this would send logs to a remote service
            // For now, we'll just simulate it
            if (this.config.remoteUrl) {
                await this.sendLogsToRemote(logsToSend);
            }
            // Remove sent logs from queue
            this.logQueue = this.logQueue.slice(logsToSend.length);
        }
        catch (error) {
            // Log error but don't remove logs from queue so they can be retried
            console.error('Failed to send logs to remote service:', error);
        }
        finally {
            this.isFlushing = false;
        }
    }
    /**
     * Send logs to remote logging service with retry logic
     */
    async sendLogsToRemote(logs) {
        if (!this.config.remoteUrl) {
            return;
        }
        let retries = 0;
        while (retries < this.config.maxRetries) {
            try {
                // In a real implementation, this would be an actual API call
                // For now, we'll just simulate it
                if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
                    console.debug(`[Logger] Would send ${logs.length} logs to ${this.config.remoteUrl}`);
                }
                // Simulate successful send
                return;
            }
            catch (error) {
                retries++;
                if (retries >= this.config.maxRetries) {
                    throw error;
                }
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
            }
        }
    }
}
// Create and export a singleton instance
exports.logger = new Logger();
// Export the Logger class for testing or custom instances
exports.default = Logger;
//# sourceMappingURL=logger.js.map