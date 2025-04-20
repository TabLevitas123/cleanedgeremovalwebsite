/**
 * IONOS Email Service
 * 
 * This service handles email sending through IONOS SMTP servers.
 * It provides methods for sending transactional emails, marketing emails,
 * and handling email delivery feedback.
 */

import nodemailer from 'nodemailer';
import { createLogger } from '../config/logger';
import { ionosEmailConfig } from '../config/ionos';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

// Create logger instance
const logger = createLogger('ionosEmail.service');

/**
 * Email attachment interface
 */
export interface Attachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
}

/**
 * Email sending result interface
 */
export interface SendEmailResult {
  messageId: string;
  success: boolean;
  error?: Error;
}

/**
 * Email notification interface for bounces and complaints
 */
export interface EmailNotification {
  type: 'bounce' | 'complaint';
  email: string;
  timestamp: Date;
  reason?: string;
  messageId?: string;
}

/**
 * IONOS Email Service class
 */
export class IonosEmailService {
  private transporter: nodemailer.Transporter;
  private templateCache: Map<string, Handlebars.TemplateDelegate>;
  private templateDir: string;

  /**
   * Constructor
   */
  constructor() {
    // Initialize nodemailer transporter with IONOS SMTP settings
    this.transporter = nodemailer.createTransport({
      host: ionosEmailConfig.host,
      port: ionosEmailConfig.port,
      secure: ionosEmailConfig.secure,
      auth: {
        user: ionosEmailConfig.auth.user,
        pass: ionosEmailConfig.auth.pass,
      },
    });

    // Initialize template cache
    this.templateCache = new Map();
    this.templateDir = path.join(__dirname, '../../templates/email');

    // Verify connection configuration
    this.verifyConnection();
  }

  /**
   * Verify connection to IONOS SMTP server
   */
  private async verifyConnection(): Promise<void> {
    try {
      await this.transporter.verify();
      logger.info('IONOS SMTP server connection established successfully');
    } catch (error) {
      logger.error('Failed to connect to IONOS SMTP server', { error });
      // Don't throw error here to allow service to initialize even if SMTP is temporarily down
    }
  }

  /**
   * Load email template
   * 
   * @param templateName - Name of the template to load
   * @returns Handlebars template delegate
   */
  private loadTemplate(templateName: string): Handlebars.TemplateDelegate {
    // Check if template is already cached
    if (this.templateCache.has(templateName)) {
      return this.templateCache.get(templateName)!;
    }

    // Load template from file
    const templatePath = path.join(this.templateDir, `${templateName}.hbs`);
    try {
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const template = Handlebars.compile(templateSource);
      this.templateCache.set(templateName, template);
      return template;
    } catch (error) {
      logger.error(`Failed to load email template: ${templateName}`, { error });
      throw new Error(`Email template not found: ${templateName}`);
    }
  }

  /**
   * Send transactional email
   * 
   * @param options - Email options
   * @returns Email sending result
   */
  public async sendTransactionalEmail(options: {
    to: string | string[];
    subject: string;
    template: string;
    templateData: Record<string, any>;
    attachments?: Attachment[];
    cc?: string | string[];
    bcc?: string | string[];
  }): Promise<SendEmailResult> {
    try {
      // Load and compile template
      const template = this.loadTemplate(options.template);
      const html = template(options.templateData);

      // Send email
      const result = await this.transporter.sendMail({
        from: ionosEmailConfig.from,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        html,
        attachments: options.attachments,
        headers: {
          'X-Service': 'Clean Edge Removal',
          'X-Email-Type': 'Transactional',
        },
      });

      logger.info('Transactional email sent successfully', {
        messageId: result.messageId,
        to: options.to,
        subject: options.subject,
      });

      return {
        messageId: result.messageId,
        success: true,
      };
    } catch (error) {
      logger.error('Failed to send transactional email', {
        error,
        to: options.to,
        subject: options.subject,
      });

      return {
        messageId: '',
        success: false,
        error: error as Error,
      };
    }
  }

  /**
   * Send marketing email (with consent check)
   * 
   * @param options - Email options
   * @returns Email sending result
   */
  public async sendMarketingEmail(options: {
    to: string | string[];
    subject: string;
    template: string;
    templateData: Record<string, any>;
    unsubscribeLink: string;
    attachments?: Attachment[];
    cc?: string | string[];
    bcc?: string | string[];
  }): Promise<SendEmailResult> {
    try {
      // Load and compile template
      const template = this.loadTemplate(options.template);
      
      // Add unsubscribe link to template data
      const templateData = {
        ...options.templateData,
        unsubscribeLink: options.unsubscribeLink,
      };
      
      const html = template(templateData);

      // Send email
      const result = await this.transporter.sendMail({
        from: ionosEmailConfig.from,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        html,
        attachments: options.attachments,
        headers: {
          'X-Service': 'Clean Edge Removal',
          'X-Email-Type': 'Marketing',
          'List-Unsubscribe': `<${options.unsubscribeLink}>`,
        },
      });

      logger.info('Marketing email sent successfully', {
        messageId: result.messageId,
        to: options.to,
        subject: options.subject,
      });

      return {
        messageId: result.messageId,
        success: true,
      };
    } catch (error) {
      logger.error('Failed to send marketing email', {
        error,
        to: options.to,
        subject: options.subject,
      });

      return {
        messageId: '',
        success: false,
        error: error as Error,
      };
    }
  }

  /**
   * Process email feedback (bounces and complaints)
   * 
   * @param notification - Email notification
   */
  public async processFeedback(notification: EmailNotification): Promise<void> {
    try {
      logger.info(`Processing email ${notification.type}`, {
        email: notification.email,
        timestamp: notification.timestamp,
        reason: notification.reason,
      });

      // Here you would typically:
      // 1. Update the user's email status in the database
      // 2. Log the bounce/complaint for compliance
      // 3. Take appropriate action (e.g., stop sending to this address)
      
      // This is a placeholder for the actual implementation
      if (notification.type === 'bounce') {
        // Handle bounce
        logger.warn(`Email bounce recorded for ${notification.email}`, {
          reason: notification.reason,
          messageId: notification.messageId,
        });
      } else if (notification.type === 'complaint') {
        // Handle complaint
        logger.warn(`Email complaint recorded for ${notification.email}`, {
          reason: notification.reason,
          messageId: notification.messageId,
        });
      }
    } catch (error) {
      logger.error('Failed to process email feedback', {
        error,
        notification,
      });
      throw error;
    }
  }
}

// Export singleton instance
export const ionosEmailService = new IonosEmailService();
export default ionosEmailService;