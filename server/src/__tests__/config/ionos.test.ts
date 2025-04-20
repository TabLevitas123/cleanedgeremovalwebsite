import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import {
  ionosEmailConfig,
  ionosHostingConfig,
  ionosDomainConfig,
  ionosDnsConfig,
  ionosConfig
} from '../../config/ionos';

// Mock environment variables
const originalEnv = { ...process.env };

describe('IONOS Configuration', () => {
  beforeEach(() => {
    // Clear environment variables before each test
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original environment variables after each test
    process.env = originalEnv;
  });

  describe('Email Configuration', () => {
    it('should use default values when environment variables are not set', () => {
      expect(ionosEmailConfig).toEqual({
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

    it('should use environment variables when set', () => {
      process.env.IONOS_EMAIL_HOST = 'custom.smtp.ionos.com';
      process.env.IONOS_EMAIL_PORT = '465';
      process.env.IONOS_EMAIL_SECURE = 'true';
      process.env.IONOS_EMAIL_USER = 'testuser';
      process.env.IONOS_EMAIL_PASSWORD = 'testpassword';
      process.env.IONOS_EMAIL_FROM = 'custom@cleanedgeremoval.com';
      process.env.IONOS_EMAIL_REPLY_TO = 'custom-reply@cleanedgeremoval.com';

      // Re-import the module to get updated values
      jest.isolateModules(() => {
        const { ionosEmailConfig } = require('../../config/ionos');
        expect(ionosEmailConfig).toEqual({
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

  describe('Hosting Configuration', () => {
    it('should use default values when environment variables are not set', () => {
      expect(ionosHostingConfig).toEqual({
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

    it('should use environment variables when set', () => {
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
      jest.isolateModules(() => {
        const { ionosHostingConfig } = require('../../config/ionos');
        expect(ionosHostingConfig).toEqual({
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

  describe('Domain Configuration', () => {
    it('should use default values when environment variables are not set', () => {
      expect(ionosDomainConfig).toEqual({
        primaryDomain: 'cleanedgeremoval.com',
        subdomains: {
          www: false,
          admin: false,
          api: false,
        },
      });
    });

    it('should use environment variables when set', () => {
      process.env.IONOS_PRIMARY_DOMAIN = 'custom-domain.com';
      process.env.IONOS_SUBDOMAIN_WWW = 'true';
      process.env.IONOS_SUBDOMAIN_ADMIN = 'true';
      process.env.IONOS_SUBDOMAIN_API = 'true';

      // Re-import the module to get updated values
      jest.isolateModules(() => {
        const { ionosDomainConfig } = require('../../config/ionos');
        expect(ionosDomainConfig).toEqual({
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

  describe('DNS Configuration', () => {
    it('should use default values when environment variables are not set', () => {
      expect(ionosDnsConfig).toEqual({
        apiKey: '',
        apiSecret: '',
        zoneId: '',
      });
    });

    it('should use environment variables when set', () => {
      process.env.IONOS_DNS_API_KEY = 'test-api-key';
      process.env.IONOS_DNS_API_SECRET = 'test-api-secret';
      process.env.IONOS_DNS_ZONE_ID = 'test-zone-id';

      // Re-import the module to get updated values
      jest.isolateModules(() => {
        const { ionosDnsConfig } = require('../../config/ionos');
        expect(ionosDnsConfig).toEqual({
          apiKey: 'test-api-key',
          apiSecret: 'test-api-secret',
          zoneId: 'test-zone-id',
        });
      });
    });
  });

  describe('Combined Configuration', () => {
    it('should combine all configurations', () => {
      expect(ionosConfig).toEqual({
        email: ionosEmailConfig,
        hosting: ionosHostingConfig,
        domain: ionosDomainConfig,
        dns: ionosDnsConfig,
      });
    });
  });
});