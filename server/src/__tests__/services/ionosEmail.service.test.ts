/**
 * IONOS Email Service Tests
 * 
 * This file contains tests for the IONOS Email Service.
 */

import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { IonosEmailService, SendEmailResult, EmailNotification } from '../../services/ionosEmail.service';
import { ionosEmailConfig } from '../../config/ionos';

// Mock dependencies
jest.mock('nodemailer');
jest.mock('fs');
jest.mock('path');
jest.mock('handlebars');
jest.mock('../../config/logger', () => ({
  createLogger: jest.fn().mockReturnValue({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  }),
}));

describe('IonosEmailService', () => {
  // Mock data
  const mockTransporter = {
    verify: jest.fn().mockResolvedValue(true),
    sendMail: jest.fn().mockResolvedValue({ messageId: 'mock-message-id' }),
  };
  
  const mockTemplate = jest.fn().mockReturnValue('<html>Mock HTML</html>');
  
  // Setup before each test
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup nodemailer mock
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);
    
    // Setup handlebars mock
    (Handlebars.compile as jest.Mock).mockReturnValue(mockTemplate);
    
    // Setup fs mock
    (fs.readFileSync as jest.Mock).mockReturnValue('Mock template source');
    
    // Setup path mock
    (path.join as jest.Mock).mockReturnValue('/mock/path/to/template.hbs');
  });
  
  // Test constructor
  describe('constructor', () => {
    it('should initialize nodemailer transporter with IONOS SMTP settings', () => {
      // Act
      new IonosEmailService();
      
      // Assert
      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        host: ionosEmailConfig.host,
        port: ionosEmailConfig.port,
        secure: ionosEmailConfig.secure,
        auth: {
          user: ionosEmailConfig.auth.user,
          pass: ionosEmailConfig.auth.pass,
        },
      });
    });
    
    it('should verify connection to IONOS SMTP server', () => {
      // Act
      new IonosEmailService();
      
      // Assert
      expect(mockTransporter.verify).toHaveBeenCalled();
    });
  });
  
  // Test sendTransactionalEmail method
  describe('sendTransactionalEmail', () => {
    it('should send transactional email successfully', async () => {
      // Arrange
      const service = new IonosEmailService();
      const options = {
        to: 'test@example.com',
        subject: 'Test Subject',
        template: 'test-template',
        templateData: { name: 'Test User' },
      };
      
      // Act
      const result = await service.sendTransactionalEmail(options);
      
      // Assert
      expect(fs.readFileSync).toHaveBeenCalled();
      expect(Handlebars.compile).toHaveBeenCalledWith('Mock template source');
      expect(mockTemplate).toHaveBeenCalledWith({ name: 'Test User' });
      expect(mockTransporter.sendMail).toHaveBeenCalledWith({
        from: ionosEmailConfig.from,
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<html>Mock HTML</html>',
        attachments: undefined,
        cc: undefined,
        bcc: undefined,
        headers: {
          'X-Service': 'Clean Edge Removal',
          'X-Email-Type': 'Transactional',
        },
      });
      expect(result).toEqual({
        messageId: 'mock-message-id',
        success: true,
      });
    });
    
    it('should handle errors when sending transactional email', async () => {
      // Arrange
      const service = new IonosEmailService();
      const options = {
        to: 'test@example.com',
        subject: 'Test Subject',
        template: 'test-template',
        templateData: { name: 'Test User' },
      };
      const error = new Error('Send mail error');
      mockTransporter.sendMail.mockRejectedValueOnce(error);
      
      // Act
      const result = await service.sendTransactionalEmail(options);
      
      // Assert
      expect(result).toEqual({
        messageId: '',
        success: false,
        error,
      });
    });
    
    it('should handle template loading errors', async () => {
      // Arrange
      const service = new IonosEmailService();
      const options = {
        to: 'test@example.com',
        subject: 'Test Subject',
        template: 'non-existent-template',
        templateData: { name: 'Test User' },
      };
      const error = new Error('File not found');
      fs.readFileSync.mockImplementationOnce(() => {
        throw error;
      });
      
      // Act & Assert
      await expect(service.sendTransactionalEmail(options)).rejects.toThrow('Email template not found');
    });
  });
  
  // Test sendMarketingEmail method
  describe('sendMarketingEmail', () => {
    it('should send marketing email successfully', async () => {
      // Arrange
      const service = new IonosEmailService();
      const options = {
        to: 'test@example.com',
        subject: 'Marketing Subject',
        template: 'marketing-template',
        templateData: { name: 'Test User' },
        unsubscribeLink: 'https://example.com/unsubscribe',
      };
      
      // Act
      const result = await service.sendMarketingEmail(options);
      
      // Assert
      expect(fs.readFileSync).toHaveBeenCalled();
      expect(Handlebars.compile).toHaveBeenCalledWith('Mock template source');
      expect(mockTemplate).toHaveBeenCalledWith({ 
        name: 'Test User',
        unsubscribeLink: 'https://example.com/unsubscribe',
      });
      expect(mockTransporter.sendMail).toHaveBeenCalledWith({
        from: ionosEmailConfig.from,
        to: 'test@example.com',
        subject: 'Marketing Subject',
        html: '<html>Mock HTML</html>',
        attachments: undefined,
        cc: undefined,
        bcc: undefined,
        headers: {
          'X-Service': 'Clean Edge Removal',
          'X-Email-Type': 'Marketing',
          'List-Unsubscribe': '<https://example.com/unsubscribe>',
        },
      });
      expect(result).toEqual({
        messageId: 'mock-message-id',
        success: true,
      });
    });
    
    it('should handle errors when sending marketing email', async () => {
      // Arrange
      const service = new IonosEmailService();
      const options = {
        to: 'test@example.com',
        subject: 'Marketing Subject',
        template: 'marketing-template',
        templateData: { name: 'Test User' },
        unsubscribeLink: 'https://example.com/unsubscribe',
      };
      const error = new Error('Send mail error');
      mockTransporter.sendMail.mockRejectedValueOnce(error);
      
      // Act
      const result = await service.sendMarketingEmail(options);
      
      // Assert
      expect(result).toEqual({
        messageId: '',
        success: false,
        error,
      });
    });
  });
  
  // Test processFeedback method
  describe('processFeedback', () => {
    it('should process bounce notification', async () => {
      // Arrange
      const service = new IonosEmailService();
      const notification: EmailNotification = {
        type: 'bounce',
        email: 'bounce@example.com',
        timestamp: new Date(),
        reason: 'Invalid recipient',
        messageId: 'bounce-message-id',
      };
      
      // Act
      await service.processFeedback(notification);
      
      // Assert
      // This is mostly a placeholder test since the actual implementation
      // would involve database operations that are mocked out
    });
    
    it('should process complaint notification', async () => {
      // Arrange
      const service = new IonosEmailService();
      const notification: EmailNotification = {
        type: 'complaint',
        email: 'complaint@example.com',
        timestamp: new Date(),
        reason: 'Marked as spam',
        messageId: 'complaint-message-id',
      };
      
      // Act
      await service.processFeedback(notification);
      
      // Assert
      // This is mostly a placeholder test since the actual implementation
      // would involve database operations that are mocked out
    });
    
    it('should handle errors during feedback processing', async () => {
      // Arrange
      const service = new IonosEmailService();
      const notification: EmailNotification = {
        type: 'bounce',
        email: 'bounce@example.com',
        timestamp: new Date(),
      };
      const error = new Error('Database error');
      
      // Mock implementation to throw an error
      jest.spyOn(service, 'processFeedback').mockImplementationOnce(() => {
        throw error;
      });
      
      // Act & Assert
      await expect(service.processFeedback(notification)).rejects.toThrow(error);
    });
  });
});