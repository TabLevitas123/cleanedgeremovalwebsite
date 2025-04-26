"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../../utils/env");
// Mock modules
jest.mock('dotenv');
jest.mock('fs');
jest.mock('../../config/logger', () => ({
    logger: {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    },
}));
// Save original process.env
const originalEnv = process.env;
describe('Environment Utility', () => {
    beforeEach(() => {
        // Reset process.env before each test
        jest.resetModules();
        process.env = { ...originalEnv };
    });
    afterAll(() => {
        // Restore original process.env after all tests
        process.env = originalEnv;
    });
    describe('Environment Mode Helpers', () => {
        it('should correctly identify development environment', () => {
            // This is testing the frozen env object which was created when the module was imported
            // So we need to re-import the module to test different environments
            jest.isolateModules(() => {
                process.env.NODE_ENV = 'development';
                const { isDevelopment, isProduction, isTest } = require('../../utils/env');
                expect(isDevelopment).toBe(true);
                expect(isProduction).toBe(false);
                expect(isTest).toBe(false);
            });
        });
        it('should correctly identify production environment', () => {
            jest.isolateModules(() => {
                process.env.NODE_ENV = 'production';
                const { isDevelopment, isProduction, isTest } = require('../../utils/env');
                expect(isDevelopment).toBe(false);
                expect(isProduction).toBe(true);
                expect(isTest).toBe(false);
            });
        });
        it('should correctly identify test environment', () => {
            jest.isolateModules(() => {
                process.env.NODE_ENV = 'test';
                const { isDevelopment, isProduction, isTest } = require('../../utils/env');
                expect(isDevelopment).toBe(false);
                expect(isProduction).toBe(false);
                expect(isTest).toBe(true);
            });
        });
    });
    describe('getEnvVar', () => {
        it('should return the environment variable value when it exists', () => {
            process.env.TEST_VAR = 'test-value';
            const result = (0, env_1.getEnvVar)('TEST_VAR', 'default-value');
            expect(result).toBe('test-value');
        });
        it('should return the default value when the environment variable does not exist', () => {
            // Ensure the environment variable does not exist
            delete process.env.TEST_VAR;
            const result = (0, env_1.getEnvVar)('TEST_VAR', 'default-value');
            expect(result).toBe('default-value');
        });
        it('should convert string to number when default value is a number', () => {
            process.env.TEST_NUMBER = '42';
            const result = (0, env_1.getEnvVar)('TEST_NUMBER', 0);
            expect(result).toBe(42);
            expect(typeof result).toBe('number');
        });
        it('should return default value when string cannot be converted to number', () => {
            process.env.TEST_NUMBER = 'not-a-number';
            const result = (0, env_1.getEnvVar)('TEST_NUMBER', 0);
            expect(result).toBe(0);
        });
        it('should convert string to boolean when default value is a boolean', () => {
            process.env.TEST_BOOL_TRUE = 'true';
            process.env.TEST_BOOL_FALSE = 'false';
            const resultTrue = (0, env_1.getEnvVar)('TEST_BOOL_TRUE', false);
            const resultFalse = (0, env_1.getEnvVar)('TEST_BOOL_FALSE', true);
            expect(resultTrue).toBe(true);
            expect(resultFalse).toBe(false);
            expect(typeof resultTrue).toBe('boolean');
            expect(typeof resultFalse).toBe('boolean');
        });
        it('should parse JSON when default value is an object', () => {
            process.env.TEST_OBJECT = '{"key":"value"}';
            const result = (0, env_1.getEnvVar)('TEST_OBJECT', {});
            expect(result).toEqual({ key: 'value' });
            expect(typeof result).toBe('object');
        });
        it('should return default value when JSON parsing fails', () => {
            process.env.TEST_OBJECT = 'not-valid-json';
            const defaultValue = { default: true };
            const result = (0, env_1.getEnvVar)('TEST_OBJECT', defaultValue);
            expect(result).toBe(defaultValue);
        });
        it('should parse JSON when default value is an array', () => {
            process.env.TEST_ARRAY = '[1,2,3]';
            const result = (0, env_1.getEnvVar)('TEST_ARRAY', []);
            expect(result).toEqual([1, 2, 3]);
            expect(Array.isArray(result)).toBe(true);
        });
    });
    describe('getFeatureFlag', () => {
        it('should return true when feature flag is set to true', () => {
            process.env.FEATURE_TEST_FLAG = 'true';
            const result = (0, env_1.getFeatureFlag)('TEST_FLAG');
            expect(result).toBe(true);
        });
        it('should return false when feature flag is set to false', () => {
            process.env.FEATURE_TEST_FLAG = 'false';
            const result = (0, env_1.getFeatureFlag)('TEST_FLAG');
            expect(result).toBe(false);
        });
        it('should return default value when feature flag is not set', () => {
            // Ensure the feature flag does not exist
            delete process.env.FEATURE_TEST_FLAG;
            const resultWithDefaultTrue = (0, env_1.getFeatureFlag)('TEST_FLAG', true);
            const resultWithDefaultFalse = (0, env_1.getFeatureFlag)('TEST_FLAG', false);
            expect(resultWithDefaultTrue).toBe(true);
            expect(resultWithDefaultFalse).toBe(false);
        });
        it('should return false when feature flag is not set and no default is provided', () => {
            // Ensure the feature flag does not exist
            delete process.env.FEATURE_TEST_FLAG;
            const result = (0, env_1.getFeatureFlag)('TEST_FLAG');
            expect(result).toBe(false);
        });
    });
    describe('allowedFileTypes', () => {
        it('should parse comma-separated file types into an array', () => {
            jest.isolateModules(() => {
                process.env.ALLOWED_FILE_TYPES = 'image/jpeg,image/png,application/pdf';
                const { allowedFileTypes } = require('../../utils/env');
                expect(Array.isArray(allowedFileTypes)).toBe(true);
                expect(allowedFileTypes).toContain('image/jpeg');
                expect(allowedFileTypes).toContain('image/png');
                expect(allowedFileTypes).toContain('application/pdf');
                expect(allowedFileTypes.length).toBe(3);
            });
        });
        it('should handle empty file types string', () => {
            jest.isolateModules(() => {
                process.env.ALLOWED_FILE_TYPES = '';
                const { allowedFileTypes } = require('../../utils/env');
                expect(Array.isArray(allowedFileTypes)).toBe(true);
                expect(allowedFileTypes.length).toBe(0);
            });
        });
        it('should trim whitespace from file types', () => {
            jest.isolateModules(() => {
                process.env.ALLOWED_FILE_TYPES = 'image/jpeg, image/png, application/pdf';
                const { allowedFileTypes } = require('../../utils/env');
                expect(allowedFileTypes).toContain('image/jpeg');
                expect(allowedFileTypes).toContain('image/png');
                expect(allowedFileTypes).toContain('application/pdf');
                expect(allowedFileTypes.length).toBe(3);
            });
        });
    });
    describe('CORS_ORIGIN parsing', () => {
        it('should handle single origin', () => {
            jest.isolateModules(() => {
                process.env.CORS_ORIGIN = 'https://example.com';
                const { env } = require('../../utils/env');
                expect(env.CORS_ORIGIN).toBe('https://example.com');
            });
        });
        it('should handle multiple origins as array', () => {
            jest.isolateModules(() => {
                process.env.CORS_ORIGIN = 'https://example.com,https://api.example.com';
                const { env } = require('../../utils/env');
                expect(Array.isArray(env.CORS_ORIGIN)).toBe(true);
                expect(env.CORS_ORIGIN).toContain('https://example.com');
                expect(env.CORS_ORIGIN).toContain('https://api.example.com');
                expect(env.CORS_ORIGIN.length).toBe(2);
            });
        });
        it('should default to * when empty', () => {
            jest.isolateModules(() => {
                process.env.CORS_ORIGIN = '';
                const { env } = require('../../utils/env');
                expect(env.CORS_ORIGIN).toBe('*');
            });
        });
    });
    describe('Environment validation', () => {
        it('should validate NODE_ENV', () => {
            jest.isolateModules(() => {
                process.env.NODE_ENV = 'invalid';
                const { env } = require('../../utils/env');
                // Should default to development for invalid NODE_ENV
                expect(env.NODE_ENV).toBe('development');
            });
        });
        it('should validate PORT', () => {
            jest.isolateModules(() => {
                process.env.PORT = 'invalid';
                const { env } = require('../../utils/env');
                // Should default to 3001 for invalid PORT
                expect(env.PORT).toBe(3001);
            });
        });
        it('should validate DB_POOL_MIN and DB_POOL_MAX', () => {
            jest.isolateModules(() => {
                process.env.DB_POOL_MIN = '20';
                process.env.DB_POOL_MAX = '10';
                const { env } = require('../../utils/env');
                // Should adjust DB_POOL_MIN to not exceed DB_POOL_MAX
                expect(env.DB_POOL_MIN).toBe(env.DB_POOL_MAX);
            });
        });
        it('should validate BCRYPT_SALT_ROUNDS', () => {
            jest.isolateModules(() => {
                process.env.BCRYPT_SALT_ROUNDS = '100';
                const { env } = require('../../utils/env');
                // Should default to 10 for invalid BCRYPT_SALT_ROUNDS
                expect(env.BCRYPT_SALT_ROUNDS).toBe(10);
            });
        });
    });
});
//# sourceMappingURL=env.test.js.map