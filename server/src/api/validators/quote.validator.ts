import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Define validation rules for the quote request
export const validateQuoteRequest = [
    // Validate Name
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required.')
        .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters.'),

    // Validate Service Address
    body('serviceAddress')
        .trim()
        .notEmpty().withMessage('Service address is required.')
        .isLength({ min: 5, max: 200 }).withMessage('Service address must be between 5 and 200 characters.'),

    // Validate Email
    body('email')
        .trim()
        .notEmpty().withMessage('Email address is required.')
        .isEmail().withMessage('Must be a valid email address.'),

    // Validate Cell Phone (adjust regex as needed for specific formats)
    body('cellPhone')
        .trim()
        .notEmpty().withMessage('Cell phone number is required.')
        .matches(/^\+?[1-9]\d{1,14}$/).withMessage('Must be a valid phone number format (e.g., E.164).'), // Basic E.164 check

    // Validate Optional Phones (if present)
    body('homePhone')
        .optional({ checkFalsy: true }) // Allows empty strings or null/undefined
        .trim()
        .matches(/^\+?[1-9]\d{1,14}$/).withMessage('Must be a valid phone number format (e.g., E.164).'),
    body('workPhone')
        .optional({ checkFalsy: true })
        .trim()
        .matches(/^\+?[1-9]\d{1,14}$/).withMessage('Must be a valid phone number format (e.g., E.164).'),

    // Validate Services array
    body('services')
        .isArray({ min: 1 }).withMessage('At least one service must be selected.'),
    // Optionally validate individual service names if needed
    body('services.*')
        .isString().withMessage('Each service must be a string.'),

    // Validate Other Description (conditionally required if 'Other' service selected)
    body('otherDescription')
        .if(body('services').custom((services: string[]) => services.includes('Other')))
        .trim()
        .notEmpty().withMessage('Please describe the "Other" service required.'),

    // Validate Privacy Policy agreement
    body('privacyPolicy')
        .isBoolean().withMessage('Privacy policy agreement must be a boolean.')
        .custom((value) => value === true).withMessage('You must agree to the privacy policy.'),

    // Validate Marketing Consent (optional, just needs to be boolean if present)
    body('marketingConsent')
        .isBoolean().withMessage('Marketing consent must be a boolean.'),

    // Middleware to handle validation results
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return 400 Bad Request with validation errors
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Proceed to the controller if validation passes
    },
];