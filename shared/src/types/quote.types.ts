/**
 * Shared types related to Quote Requests
 */

// Data sent from the client when submitting a quote request
export interface QuoteRequestBody {
  fullName: string;
  serviceAddress: string; // Raw address string for now
  email: string;
  cellPhone: string;
  homePhone?: string;
  workPhone?: string;
  services: string[]; // Array of service names
  otherDescription?: string;
  privacyPolicy: boolean; // Should always be true
  marketingConsent: boolean;
}

// Response from the server after successful submission
export interface QuoteRequestResponse {
  message: string;
  customerId: number; // Assuming MySQL uses number IDs
}

// Potential error response structure (adjust as needed)
export interface QuoteRequestErrorResponse {
  errors?: { msg: string; param?: string }[]; // Match express-validator format
  message?: string; // General error message
}