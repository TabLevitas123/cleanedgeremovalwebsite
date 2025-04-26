import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../config/database';
import { Customer } from '../../models/Customer.model';
import logger from '../../config/logger';
import ionosEmailService from '../../services/ionosEmail.service'; // Assuming default export
import { env } from '../../utils/env';

/**
 * Handles submission of a quote request form.
 * Creates a new customer record and sends an email notification.
 */
export const submitQuoteRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Validation has already been performed by the middleware
    const {
        fullName,
        serviceAddress, // This is the primary service address for the quote
        email,
        cellPhone,
        homePhone,
        workPhone,
        services, // Array of service names
        otherDescription,
        privacyPolicy, // Already validated to be true
        marketingConsent,
    } = req.body;

    const customerRepository = AppDataSource.getRepository(Customer);
    // const serviceAddressRepository = AppDataSource.getRepository(CustomerServiceAddress); // If storing separately

    try {
        logger.info('Received quote request submission', { email });

        // Basic name splitting (improve if needed)
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || firstName; // Handle single names

        // TODO: Parse serviceAddress string into components (street, city, state, zip, country)
        // This requires a robust address parsing library or assumptions about the format.
        // For now, storing the raw string or making basic assumptions.
        const parsedAddress = {
            street: serviceAddress, // Placeholder - needs proper parsing
            city: 'Unknown',        // Placeholder
            state: 'Unknown',       // Placeholder
            zipCode: 'Unknown',     // Placeholder
            country: 'USA',         // Placeholder
        };

        // Create new Customer entity
        const newCustomer = customerRepository.create({
            first_name: firstName,
            last_name: lastName,
            email: email,
            primary_address_street: parsedAddress.street,
            primary_address_city: parsedAddress.city,
            primary_address_state: parsedAddress.state,
            primary_address_zip_code: parsedAddress.zipCode,
            primary_address_country: parsedAddress.country,
            phone_cell: cellPhone,
            phone_home: homePhone || undefined,
            phone_work: workPhone || undefined,
            notes: services.includes('Other') ? `Other service requested: ${otherDescription}` : undefined,
            marketing_consent: marketingConsent,
            marketing_consent_date: marketingConsent ? new Date() : undefined,
            privacy_policy_agreed: privacyPolicy,
            privacy_policy_agreed_date: new Date(), // Record agreement time
            // customer_since will be set by @CreateDateColumn
            active: true,
            // created_by/updated_by could be set if linked to an admin action later
        });

        // Save the customer
        const savedCustomer = await customerRepository.save(newCustomer);
        logger.info(`New customer created with ID: ${savedCustomer.id}`, { customerId: savedCustomer.id });

        // --- Send Email Notification ---
        const emailSubject = `New Quote Request Received - ${fullName}`;
        const emailTemplate = 'quote-request-admin-notification'; // Assuming this template exists
        const emailData = {
            customerName: fullName,
            customerEmail: email,
            customerPhone: cellPhone,
            customerAddress: serviceAddress,
            requestedServices: services.join(', '),
            otherDetails: otherDescription || 'N/A',
            submissionTime: new Date().toLocaleString(),
            customerLink: `https://www.cleanedgeremoval.com/settings/customers/${savedCustomer.id}` // Example link
        };

        const emailResult = await ionosEmailService.sendTransactionalEmail({
            to: env.EMAIL_CONTACT_ADDRESS, // Send to admin contact address from env
            subject: emailSubject,
            template: emailTemplate,
            templateData: emailData,
        });

        if (!emailResult.success) {
            logger.error('Failed to send quote request notification email', { customerId: savedCustomer.id, error: emailResult.error });
            // Decide if this should be a user-facing error or just logged
        } else {
            logger.info('Quote request notification email sent successfully', { customerId: savedCustomer.id, messageId: emailResult.messageId });
        }

        // Respond to the client
        res.status(201).json({
            message: 'Quote request submitted successfully. We will contact you shortly.',
            customerId: savedCustomer.id,
        });

    } catch (error) {
        logger.error('Error submitting quote request:', { error });
        // Pass error to a generic error handling middleware
        next(error);
    }
};