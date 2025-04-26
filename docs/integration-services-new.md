# Clean Edge Removal LLC Website Project - External Service Integrations (Updated 2025-04-20)

This document meticulously outlines the planned integrations with essential third-party services required for the full functionality of the Clean Edge Removal LLC website and internal portals. It details the purpose, features, and integration points for each service. Implementation details (specific code examples, library choices beyond the core stack) are deferred to the actual service implementation phase and related documentation.

**Note:** The primary email service is handled via **IONOS SMTP** and is detailed in `docs/ionos-integration-guide-new.md` and configured via `server/src/config/ionos.ts` and `server/src/services/ionosEmail.service.ts`. This document focuses on other external API integrations.

## 1. Calendar Integration

*   **Service Provider:** Google Calendar API
*   **Purpose:** To enable seamless scheduling of appointments within the application and synchronize them with the company's operational Google Calendar(s). This facilitates viewing schedules, managing availability, and potentially providing calendar invites to customers.
*   **Required Features:**
    *   **Event Creation:** Programmatically create new calendar events representing scheduled appointments, including details like customer name, service address, service type(s), date, start/end times, assigned employees/vehicle (if applicable), and internal notes.
    *   **Event Updates:** Modify existing calendar events when appointment details (time, assigned staff, status) change within the application.
    *   **Event Deletion:** Remove calendar events when appointments are cancelled or deleted in the application.
    *   **Availability Checking (Free/Busy):** Query Google Calendar(s) to determine free/busy times for resources (employees, vehicles, general company calendar) to prevent double-booking and inform the frontend availability display (`/api/appointments/availability` endpoint).
    *   **Two-Way Synchronization (Potential Future Enhancement):** Optionally, listen for changes made directly in Google Calendar and reflect them back into the application database (requires more complex webhook/polling setup).
    *   **iCalendar (.ics) Generation:** Generate standard `.ics` files that customers can download to easily add confirmed appointments to their personal calendars (Outlook, Apple Calendar, Google Calendar, etc.).
*   **Integration Points:**
    *   **Backend Appointment Service (`server/src/services/appointment.service.ts` or similar):** Will interact with the Google Calendar API client library (`googleapis`) to create, update, delete events, and check free/busy status.
    *   **Backend Scheduling Logic:** The logic determining available time slots will query this service.
    *   **Backend API Endpoints:**
        *   `POST /api/appointments`: Creates a corresponding Google Calendar event upon successful appointment creation in the database.
        *   `PUT /api/appointments/:appointmentId`: Updates the corresponding Google Calendar event.
        *   `DELETE /api/appointments/:appointmentId`: Deletes the corresponding Google Calendar event.
        *   `GET /api/appointments/availability`: Uses free/busy information from Google Calendar (and internal data) to calculate available slots.
        *   (Potentially) `POST /api/integrations/calendar/sync`: Endpoint for manual or webhook-triggered synchronization.
*   **Authentication:** Requires setting up OAuth 2.0 credentials (Client ID, Client Secret) in the Google Cloud Console, enabling the Google Calendar API, and handling the OAuth flow (likely a server-to-server flow using a service account or an initial admin authorization flow to get refresh tokens) to authorize the backend application to access the designated company Google Calendar(s). Credentials must be stored securely as environment variables.

---

## 2. Geolocation Services

*   **Service Provider:** Google Maps Platform APIs (specifically Geocoding API, Maps JavaScript API, Directions API, Distance Matrix API)
*   **Purpose:** To validate addresses, visualize service areas, calculate driving routes and times for scheduling optimization, display interactive maps, and potentially track vehicle locations.
*   **Required Features:**
    *   **Geocoding:** Convert street addresses entered by customers or admins into precise geographic coordinates (latitude/longitude). Used for validation and map plotting.
    *   **Reverse Geocoding:** Convert coordinates back into human-readable addresses (less common but potentially useful).
    *   **Address Validation/Autocomplete:** Provide address suggestions and validation as users type addresses in forms (using Places API Autocomplete - typically implemented client-side).
    *   **Map Display:** Embed interactive Google Maps on the public website (Service Area page) and potentially within the Admin/Employee portals (e.g., visualizing appointment locations, truck tracking). Requires Maps JavaScript API.
    *   **Service Area Visualization:** Draw polygons or circles on the map representing the company's defined service areas.
    *   **Service Area Check:** Determine if a given address (geocoded coordinates) falls within the defined service area polygons.
    *   **Routing & Directions:** Calculate optimized driving routes between multiple appointment locations for employee schedules. Requires Directions API.
    *   **Distance & Travel Time Calculation:** Estimate travel time and distance between points (e.g., between appointments, from base to appointment). Requires Distance Matrix API or Directions API.
    *   **Location Tracking (Potential Future Enhancement):** Display real-time (or near real-time) locations of company vehicles on a map in the admin portal (requires GPS tracking hardware/app on vehicles sending data to the backend).
*   **Integration Points:**
    *   **Frontend (`client/`):**
        *   `SchedulingContactSection.tsx` / `CustomerForm.tsx`: Address input fields may use Places API Autocomplete.
        *   `ServiceAreaSection.tsx`: Uses Maps JavaScript API to display the interactive map and service area overlay.
        *   Admin/Employee Portals: Map components for visualizing appointments, routes, vehicle locations.
    *   **Backend (`server/`):**
        *   **Geolocation Service (`server/src/services/geolocation.service.ts` or similar):** Encapsulates interactions with Google Maps Platform APIs (Geocoding, Directions, Distance Matrix) using a Node.js client library (e.g., `@googlemaps/google-maps-services-js`).
        *   **API Endpoints:**
            *   `POST /api/quote-requests` / `POST /api/customers`: May use Geocoding API server-side to validate/standardize addresses upon submission.
            *   `POST /api/public/check-address` / `GET /api/locations/check-address`: Uses Geocoding API and service area logic.
            *   `POST /api/appointments/optimize`: Uses Directions/Distance Matrix API for route optimization.
            *   (Potentially) `PUT /api/vehicles/:id/location`: Endpoint for receiving vehicle location updates.
*   **Authentication:** Requires obtaining an API Key from the Google Cloud Console with the necessary Maps Platform APIs enabled (Maps JavaScript API, Geocoding API, Directions API, Distance Matrix API, Places API). The API key must be secured and configured in both client-side (for map display, autocomplete) and server-side (for geocoding, routing) environment variables. Usage quotas and billing must be monitored.

---

## 3. SMS Notifications

*   **Service Provider:** Twilio API (or a similar SMS gateway provider)
*   **Purpose:** To send timely text message notifications to customers and potentially employees.
*   **Required Features:**
    *   **Outbound SMS:** Send SMS messages programmatically.
    *   **Appointment Reminders:** Automatically send reminders to customers before their scheduled service.
    *   **Two-Factor Authentication (2FA):** Send verification codes via SMS for user login or sensitive actions.
    *   **Delivery Status Tracking:** Monitor the delivery status of sent messages.
    *   **Opt-Out Handling:** Manage customer opt-outs according to regulations (e.g., responding to STOP keywords).
    *   **(Optional) Two-Way Messaging:** Allow customers or employees to reply to messages, requiring webhook configuration to process incoming SMS.
*   **Integration Points:**
    *   **Backend SMS Service (`server/src/services/sms.service.ts` or similar):** Encapsulates interactions with the Twilio client library (`twilio`).
    *   **Backend Logic:**
        *   Appointment scheduling service triggers reminder messages based on schedule.
        *   Authentication service triggers 2FA code messages.
        *   Potentially other services trigger status updates or alerts.
    *   **API Endpoints:**
        *   (Internal triggers, not necessarily direct endpoints) Actions like creating appointments or user login attempts might trigger SMS sending via the service.
        *   (Potentially) `POST /api/integrations/sms/receive`: Webhook endpoint to receive incoming messages from Twilio.
*   **Authentication:** Requires a Twilio account, obtaining an Account SID, Auth Token, and a Twilio phone number capable of sending SMS messages to the target regions (US/Canada). These credentials must be stored securely as server-side environment variables. Usage costs apply per message segment.

---

## 4. Payment Processing

*   **Service Provider:** Stripe API
*   **Purpose:** To securely process online payments for services, potentially handle invoicing, and manage customer payment methods.
*   **Required Features:**
    *   **Online Payments:** Securely accept credit/debit card payments (and potentially other methods like ACH) via the website or admin portal. Requires PCI DSS compliance (typically handled by using Stripe's client-side libraries like Stripe Elements or Checkout to avoid handling raw card data directly on the server).
    *   **Payment Intents API:** Use Stripe's modern Payment Intents API for handling payment lifecycles and authentication requirements (like 3D Secure).
    *   **Customer Management:** Create and manage Stripe Customer objects to store payment methods securely for future use (optional, but recommended for repeat business).
    *   **Invoice Generation (Potential Future Enhancement):** Programmatically create and send Stripe Invoices for services rendered.
    *   **Receipt Delivery:** Configure Stripe to automatically send email receipts upon successful payment.
    *   **Refund Processing:** Programmatically issue full or partial refunds via the API.
    *   **Webhook Handling:** Implement backend webhook endpoints to listen for asynchronous payment events from Stripe (e.g., `payment_intent.succeeded`, `payment_intent.payment_failed`, `invoice.paid`). This is crucial for reliably updating application state based on payment outcomes.
*   **Integration Points:**
    *   **Frontend (`client/`):**
        *   Payment forms (e.g., during online booking, invoice payment page) will use Stripe Elements (or Stripe Checkout redirection) to securely collect payment information client-side, creating payment method IDs or tokens.
    *   **Backend (`server/`):**
        *   **Payment Service (`server/src/services/payment.service.ts` or similar):** Encapsulates interactions with the Stripe Node.js library (`stripe`).
        *   **API Endpoints:**
            *   `POST /api/payment/create-intent`: Creates a Stripe Payment Intent on the server, returning the `client_secret` to the frontend.
            *   `POST /api/payment/webhook`: Publicly accessible endpoint to receive and process webhook events from Stripe. Requires signature verification using the Stripe webhook secret.
            *   (Potentially) `POST /api/appointments/:appointmentId/payment`: Records a payment made (possibly offline or via Stripe) against an appointment.
            *   (Potentially) `POST /api/invoices/:invoiceId/pay`: Endpoint to initiate payment for an existing invoice.
            *   (Potentially) `POST /api/refunds`: Endpoint to initiate a refund.
*   **Authentication:** Requires a Stripe account. Obtain Publishable Key (for frontend) and Secret Key (for backend) from the Stripe dashboard. Obtain a Webhook Signing Secret for verifying incoming webhook events. All keys must be stored securely as environment variables.

---

## 5. Integration Security and Best Practices

*   **API Key Management:** All API keys and secrets (Google, Twilio, Stripe, IONOS) must *never* be hardcoded. They must be loaded exclusively from environment variables (`.env.*` files) and these files must be included in `.gitignore`. Use separate keys for development, staging, and production environments. Implement key rotation policies where feasible.
*   **Error Handling:** Implement robust error handling for all API calls to external services. Use try-catch blocks, check response statuses, and handle potential network errors gracefully. Implement retry logic (with exponential backoff) for transient failures where appropriate. Log detailed errors server-side. Provide user-friendly feedback on the client-side.
*   **Data Minimization:** Only send the minimum required data to external services. Avoid sending unnecessary Personally Identifiable Information (PII).
*   **Rate Limiting:** Be mindful of API rate limits imposed by external providers. Implement client-side and server-side strategies (caching, queuing, throttling) to avoid exceeding limits.
*   **Webhooks:** Secure webhook endpoints (e.g., Stripe, potentially Google Calendar) by verifying incoming request signatures using the provider's secret key. Process webhooks asynchronously using a job queue if processing is potentially time-consuming, to avoid blocking the response to the provider.
*   **Testing:** Thoroughly mock external service interactions during unit and integration testing to ensure predictable test outcomes and avoid actual API calls/costs. Use libraries like `msw` (Mock Service Worker) for frontend API mocking or `jest.mock` for backend service mocking. End-to-end tests may require dedicated test accounts or sandboxes provided by the external services.