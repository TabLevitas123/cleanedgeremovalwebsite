import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { env } from '../utils/env'; // Assuming env utility loads/parses .env

// Load environment variables specifically for database config if not already loaded globally
// dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV || 'development'}`) });
// Using the shared env utility is likely better if it handles NODE_ENV loading

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    synchronize: env.DB_SYNCHRONIZE, // Be cautious with this in production!
    logging: env.DB_LOGGING,
    entities: [
        // Define path to entities - adjust if models are elsewhere
        path.join(__dirname, '../models/**/*.model{.ts,.js}'),
        // Or explicitly import them if preferred:
        // User, Customer, Appointment, ...
    ],
    migrations: [
        // Define path to migrations if using them
        path.join(__dirname, '../migrations/*{.ts,.js}'),
    ],
    subscribers: [
        // Define path to subscribers if using them
        path.join(__dirname, '../subscribers/*{.ts,.js}'),
    ],
    // Extra options for MySQL pool, etc.
    extra: {
        connectionLimit: 10, // Example pool size
    },
    // Use snake case for table/column names if desired
    // namingStrategy: new SnakeNamingStrategy(),
};

// Create DataSource instance
export const AppDataSource = new DataSource(dataSourceOptions);

// Function to initialize database connection
export const initializeDatabase = async (): Promise<void> => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log('Database connection initialized successfully.');
            // You might run migrations here in production if needed
            // await AppDataSource.runMigrations();
        }
    } catch (error) {
        console.error('Error during database initialization:', error);
        process.exit(1); // Exit process if DB connection fails
    }
};

// Optional: Function to close database connection
export const closeDatabase = async (): Promise<void> => {
    try {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log('Database connection closed successfully.');
        }
    } catch (error) {
        console.error('Error closing database connection:', error);
    }
};