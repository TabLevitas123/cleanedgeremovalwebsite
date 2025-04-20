import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'; // For request logging
import { env } from './utils/env';
import logger from './config/logger'; // Assuming default export
import apiRoutes from './api/routes'; // Import main API router

const app: Express = express();

// Basic Middleware
// Consider more specific CORS options for production
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(helmet()); // Basic security headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging (using morgan)
const morganFormat = env.NODE_ENV === 'development' ? 'dev' : 'combined';
app.use(morgan(morganFormat, {
    stream: {
        write: (message) => logger.http(message.trim()),
    },
}));

// Mount API routes under the defined prefix
app.use(env.API_PREFIX, apiRoutes);

// TODO: Add Error Handling Middleware (e.g., 404 handler, generic error handler)

export default app;