import { Router } from 'express';
import { submitQuoteRequest } from '../controllers/quote.controller';
import { validateQuoteRequest } from '../validators/quote.validator';
// Import any necessary middleware, e.g., rate limiting

const router = Router();

// POST /api/quotes/request (or similar endpoint)
router.post(
    '/request',
    // Add rate limiting middleware here if needed
    validateQuoteRequest, // Middleware to validate request body
    submitQuoteRequest    // Controller function to handle the request
);

// Add other quote-related routes here if necessary

export default router;