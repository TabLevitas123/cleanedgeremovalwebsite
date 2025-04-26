"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhancedApi = exports.useSubmitQuoteRequestMutation = exports.api = void 0;
const react_1 = require("@reduxjs/toolkit/query/react");
// Define base API configuration
exports.api = (0, react_1.createApi)({
    reducerPath: 'api',
    baseQuery: (0, react_1.fetchBaseQuery)({
        baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
        prepareHeaders: (headers, { getState }) => {
            // Get the token from the auth state
            const token = getState().auth.token;
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
        submitQuoteRequest: builder.mutation({
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
exports.useSubmitQuoteRequestMutation = exports.api.useSubmitQuoteRequestMutation;
exports.enhancedApi = exports.api; // Keep existing export if needed elsewhere
//# sourceMappingURL=api.js.map