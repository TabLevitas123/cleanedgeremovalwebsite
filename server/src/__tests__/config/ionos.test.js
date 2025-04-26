"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const ionos_1 = require("../../config/ionos");
// Mock environment variables
const originalEnv = { ...process.env };
(0, globals_1.describe)('IONOS Configuration', () => {
    (0, globals_1.beforeEach)(() => {
        // Clear environment variables before each test
        globals_1.jest.resetModules();
        process.env = { ...originalEnv };
    });
    (0, globals_1.afterEach)(() => {
        // Restore original environment variables after each test
        process.env = originalEnv;
    });
    (0, globals_1.describe)('Email Configuration', () => {
        (0, globals_1.it)('should use default values when environment variables are not set', () => {
            (0, globals_1.expect)(ionos_1.ionosEmailConfig).toEqual({
                host: 'smtp.ionos.com',
                port: 587,
                secure: false,
                auth: {
                    user: '',
                    pass: '',
                },
                from: 'noreply@cleanedgeremoval.com',
                replyTo: 'info@cleanedgeremoval.com',
            });
        });
        (0, globals_1.it)('should use environment variables when set', () => {
            process.env.IONOS_EMAIL_HOST = 'custom.smtp.ionos.com';
            process.env.IONOS_EMAIL_PORT = '465';
            process.env.IONOS_EMAIL_SECURE = 'true';
            process.env.IONOS_EMAIL_USER = 'testuser';
            process.env.IONOS_EMAIL_PASSWORD = 'testpassword';
            process.env.IONOS_EMAIL_FROM = 'custom@cleanedgeremoval.com';
            process.env.IONOS_EMAIL_REPLY_TO = 'custom-reply@cleanedgeremoval.com';
            // Re-import the module to get updated values
            globals_1.jest.isolateModules(() => {
                const { ionosEmailConfig } = require('../../config/ionos');
                (0, globals_1.expect)(ionosEmailConfig).toEqual({
                    host: 'custom.smtp.ionos.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'testuser',
                        pass: 'testpassword',
                    },
                    from: 'custom@cleanedgeremoval.com',
                    replyTo: 'custom-reply@cleanedgeremoval.com',
                });
            });
        });
    });
    (0, globals_1.describe)('Hosting Configuration', () => {
        (0, globals_1.it)('should use default values when environment variables are not set', () => {
            (0, globals_1.expect)(ionos_1.ionosHostingConfig).toEqual({
                ftp: {
                    host: 'ftp.ionos.com',
                    port: 21,
                    user: '',
                    password: '',
                    rootDirectory: '/cleanedgeremoval',
                },
                database: {
                    host: 'db.ionos.com',
                    port: 27017,
                    user: '',
                    password: '',
                    name: 'cleanedgeremoval',
                },
            });
        });
        (0, globals_1.it)('should use environment variables when set', () => {
            process.env.IONOS_FTP_HOST = 'custom.ftp.ionos.com';
            process.env.IONOS_FTP_PORT = '22';
            process.env.IONOS_FTP_USER = 'ftpuser';
            process.env.IONOS_FTP_PASSWORD = 'ftppassword';
            process.env.IONOS_FTP_ROOT_DIR = '/custom-dir';
            process.env.IONOS_DB_HOST = 'custom.db.ionos.com';
            process.env.IONOS_DB_PORT = '27018';
            process.env.IONOS_DB_USER = 'dbuser';
            process.env.IONOS_DB_PASSWORD = 'dbpassword';
            process.env.IONOS_DB_NAME = 'custom-db';
            // Re-import the module to get updated values
            globals_1.jest.isolateModules(() => {
                const { ionosHostingConfig } = require('../../config/ionos');
                (0, globals_1.expect)(ionosHostingConfig).toEqual({
                    ftp: {
                        host: 'custom.ftp.ionos.com',
                        port: 22,
                        user: 'ftpuser',
                        password: 'ftppassword',
                        rootDirectory: '/custom-dir',
                    },
                    database: {
                        host: 'custom.db.ionos.com',
                        port: 27018,
                        user: 'dbuser',
                        password: 'dbpassword',
                        name: 'custom-db',
                    },
                });
            });
        });
    });
    (0, globals_1.describe)('Domain Configuration', () => {
        (0, globals_1.it)('should use default values when environment variables are not set', () => {
            (0, globals_1.expect)(ionos_1.ionosDomainConfig).toEqual({
                primaryDomain: 'cleanedgeremoval.com',
                subdomains: {
                    www: false,
                    admin: false,
                    api: false,
                },
            });
        });
        (0, globals_1.it)('should use environment variables when set', () => {
            process.env.IONOS_PRIMARY_DOMAIN = 'custom-domain.com';
            process.env.IONOS_SUBDOMAIN_WWW = 'true';
            process.env.IONOS_SUBDOMAIN_ADMIN = 'true';
            process.env.IONOS_SUBDOMAIN_API = 'true';
            // Re-import the module to get updated values
            globals_1.jest.isolateModules(() => {
                const { ionosDomainConfig } = require('../../config/ionos');
                (0, globals_1.expect)(ionosDomainConfig).toEqual({
                    primaryDomain: 'custom-domain.com',
                    subdomains: {
                        www: true,
                        admin: true,
                        api: true,
                    },
                });
            });
        });
    });
    (0, globals_1.describe)('DNS Configuration', () => {
        (0, globals_1.it)('should use default values when environment variables are not set', () => {
            (0, globals_1.expect)(ionos_1.ionosDnsConfig).toEqual({
                apiKey: '',
                apiSecret: '',
                zoneId: '',
            });
        });
        (0, globals_1.it)('should use environment variables when set', () => {
            process.env.IONOS_DNS_API_KEY = 'test-api-key';
            process.env.IONOS_DNS_API_SECRET = 'test-api-secret';
            process.env.IONOS_DNS_ZONE_ID = 'test-zone-id';
            // Re-import the module to get updated values
            globals_1.jest.isolateModules(() => {
                const { ionosDnsConfig } = require('../../config/ionos');
                (0, globals_1.expect)(ionosDnsConfig).toEqual({
                    apiKey: 'test-api-key',
                    apiSecret: 'test-api-secret',
                    zoneId: 'test-zone-id',
                });
            });
        });
    });
    (0, globals_1.describe)('Combined Configuration', () => {
        (0, globals_1.it)('should combine all configurations', () => {
            (0, globals_1.expect)(ionos_1.ionosConfig).toEqual({
                email: ionos_1.ionosEmailConfig,
                hosting: ionos_1.ionosHostingConfig,
                domain: ionos_1.ionosDomainConfig,
                dns: ionos_1.ionosDnsConfig,
            });
        });
    });
});
//# sourceMappingURL=ionos.test.js.map