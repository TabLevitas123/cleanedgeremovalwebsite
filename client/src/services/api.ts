import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { QuoteRequestBody, QuoteRequestResponse } from '@cleanedgeremovalwebsite/shared/types/quote.types'; // Use path alias

// Define base API configuration
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the auth state
      const token = (getState() as RootState).auth.token;
      
      // If we have a token, add it to the headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
    credentials: 'include', // Include cookies in requests
  }),
  tagTypes: [
    'User', 
    'Customer', 
    'Appointment', 
    'Service', 
    'Vehicle', 
    'TimeEntry',
    'Location',
    'Review',
    'Notification',
    'QuoteRequest' // Add tag type for quote requests if needed for caching/invalidation
  ],
  endpoints: (builder) => ({
    // Define the mutation endpoint for submitting a quote request
    submitQuoteRequest: builder.mutation<QuoteRequestResponse, QuoteRequestBody>({
      query: (quoteData) => ({
        url: '/quotes/request', // Matches the backend route path
        method: 'POST',
        body: quoteData,
      }),
      // Example of invalidating tags if needed upon successful submission
      // invalidatesTags: [{ type: 'Customer', id: 'LIST' }], // Example: Invalidate customer list
    }),
    // Add other endpoints here
  }),
});

// Export hooks for usage in components
// Export the auto-generated hook for the mutation
export const { useSubmitQuoteRequestMutation } = api;

export const enhancedApi = api; // Keep existing export if needed elsewhere