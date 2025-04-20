/**
 * Logger Configuration
 * 
 * This file configures the logging system for the application.
 * It uses Winston for structured logging with different transports
 * based on the environment.
 */

import winston from 'winston';
import { format } from 'winston';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log level based on environment
const getLogLevel = (): string => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'info';
};

// Define log colors
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Add colors to Winston
winston.addColors(colors);

// Define Winston format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
);

// Define console format for development
const consoleFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
  )
);

// Create transports
const transports = [
  // Console transport for all environments
  new winston.transports.Console({
    format: consoleFormat,
  }),
];

// Add file transports in production
if (process.env.NODE_ENV === 'production') {
  transports.push(
    // Write all logs with level 'error' and below to 'error.log'
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Write all logs with level 'info' and below to 'combined.log'
    new winston.transports.File({ filename: 'logs/combined.log' })
  );
}

// Create Winston logger instance
const logger = winston.createLogger({
  level: getLogLevel(),
  levels,
  format: logFormat,
  transports,
  defaultMeta: { service: 'clean-edge-removal' },
  exitOnError: false,
});

/**
 * Create a logger for a specific module
 * 
 * @param module - The module name
 * @returns Winston logger instance
 */
export const createLogger = (module: string): winston.Logger => {
  return logger.child({ module });
};

export default logger;