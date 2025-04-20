import 'reflect-metadata'; // Required for TypeORM
import http from 'http';
import app from './app'; // Import the Express app
import { env } from './utils/env';
import logger from './config/logger';
import { initializeDatabase, closeDatabase } from './config/database';

const startServer = async () => {
    try {
        // Initialize Database Connection
        await initializeDatabase();
        logger.info('Database connection established.');

        // Create HTTP server
        const server = http.createServer(app);

        // Start listening
        server.listen(env.PORT, env.HOST, () => {
            logger.info(`Server listening on http://${env.HOST}:${env.PORT}${env.API_PREFIX}`);
            logger.info(`Environment: ${env.NODE_ENV}`);
        });

        // Graceful Shutdown Handling
        const shutdown = async (signal: string) => {
            logger.info(`Received ${signal}. Shutting down gracefully...`);
            server.close(async (err) => {
                if (err) {
                    logger.error('Error during server shutdown:', err);
                    process.exit(1);
                }
                logger.info('HTTP server closed.');
                await closeDatabase();
                logger.info('Database connection closed.');
                process.exit(0);
            });

            // Force shutdown after timeout
            setTimeout(() => {
                logger.warn('Graceful shutdown timed out. Forcing exit.');
                process.exit(1);
            }, 10000); // 10 seconds timeout
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT')); // Catches Ctrl+C

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();