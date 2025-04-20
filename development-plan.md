# Clean Edge Removal Website Development Plan (IONOS Integration)

This document outlines the detailed plan for developing the Clean Edge Removal website, focusing on integrating with IONOS services and building the application in a modular fashion.

## Overall Development Flow

```mermaid
graph LR
    subgraph Phase 1: Planning & Setup
        A[Inspect Codebase & Docs] --> B{Verify IONOS Subdomains};
        B --> C{Database Setup Plan (MySQL 8.0)};
        C --> D{CI/CD Pipeline Plan (GitHub Actions - Git Integration)};
        D --> E[Homepage Module Plan];
        E --> F[Modular Development Strategy];
        F --> G[Image Prompt Generation];
        G --> H{Review & Approve Plan};
    end

    subgraph Phase 2: Homepage Module Development
        H --> I[Set up MySQL 8.0 on IONOS];
        I --> J[Implement Homepage UI];
        J --> K[Implement Contact Form & Submission];
        K --> L[Implement Email Notifications];
        L --> M[Implement Auto Schedule Toggle];
        M --> N[Basic Homepage Testing];
        N --> O{Homepage Module Complete?};
    end

    subgraph Phase 3: Modular Website Development & Testing
        O -- Yes --> P[Develop API Module];
        O -- No --> J;
        P --> Q[Develop Database Module];
        Q --> R[Develop Admin Portal Module (Basic)];
        R --> S[Develop Authentication Module (Admin)];
        S --> T[Develop Employee Portal Module (Basic)];
        T --> U[Develop Remaining Modules];
        U --> V[Comprehensive Testing];
        V --> W{All Modules Complete & Tested?};
    end

    subgraph Phase 4: CI/CD Pipeline Implementation & Deployment
        W -- Yes --> X[Set up GitHub Actions CI/CD];
        W -- No --> P;
        X --> Y[Deploy to IONOS Staging];
        Y --> Z[Test on Staging];
        Z --> AA{Staging Deployment OK?};
        AA -- Yes --> BB[Deploy to IONOS Production];
        AA -- No --> Y;
        BB --> CC[Final Production Testing];
        CC --> DD{Production Deployment Complete?};
        DD -- Yes --> EE[Website Live & Functional];
        DD -- No --> BB;
    end

    H --> Phase 2: Homepage Module Development
    O --> Phase 3: Modular Website Development & Testing
    W --> Phase 4: CI/CD Pipeline Implementation & Deployment
```

## Phase 1: Planning & Setup

1.  **[COMPLETED]** Inspect Codebase & Docs: Review existing code and documentation for IONOS integration.
2.  **[COMPLETED]** Verify IONOS Subdomains: Ensure \`www\`, \`api\`, \`admin\` subdomains are configured in IONOS.
3.  **[COMPLETED]** Database Setup Plan (MySQL 8.0): Plan for setting up MySQL 8.0 on IONOS.
4.  **[COMPLETED]** CI/CD Pipeline Plan (GitHub Actions - Git Integration): Plan for GitHub Actions CI/CD to IONOS using Git integration.
5.  **[COMPLETED]** Homepage Module Plan: Detailed plan for homepage UI, functionality, and testing (as outlined previously).
6.  **[COMPLETED]** Modular Development Strategy: Define modules and development order (Homepage, API, Database, Admin, Auth, Employee, etc.).
7.  **[COMPLETED]** Image Prompt Generation: Generate prompts for logo and service icons (completed and saved to \`requiredimages.md\`).
8.  **[COMPLETED]** Review & Approve Plan: User reviews and approves the detailed plan.

## Phase 2: Homepage Module Development

1.  **[COMPLETED]** Set up MySQL 8.0 on IONOS: Configure MySQL 8.0 database on IONOS.
2.  **[IN PROGRESS]** Implement Homepage UI: Develop the user interface for all homepage sections.
3.  **[PENDING]** Implement Contact Form & Submission: Implement the contact form, data validation, and submission logic.
4.  **[PENDING]** Implement Email Notifications: Configure IONOS SMTP for sending email notifications on form submissions.
5.  **[PENDING]** Implement Auto Schedule Toggle: Implement admin setting to toggle between "Request Quote" and "Self-Scheduling" modes.
6.  **[PENDING]** Basic Homepage Testing: Perform unit, integration, and end-to-end tests for homepage functionality.
7.  **[PENDING]** Homepage Module Complete?: Check if the homepage module is functional and tested.

## Phase 3: Modular Website Development & Testing

1.  **[PENDING]** Develop API Module: Build backend API endpoints for frontend communication.
2.  **[PENDING]** Develop Database Module: Implement database models and interactions for all website data.
3.  **[PENDING]** Develop Admin Portal Module (Basic): Implement basic admin portal features (settings page, user management).
4.  **[PENDING]** Develop Authentication Module (Admin): Implement admin portal authentication.
5.  **[PENDING]** Develop Employee Portal Module (Basic): Implement basic employee portal features (time tracking).
6.  **[PENDING]** Develop Remaining Modules: Develop the rest of the modules in the defined order.
7.  **[PENDING]** Comprehensive Testing: Perform thorough testing for all modules (unit, integration, end-to-end, security, performance).
8.  **[PENDING]** All Modules Complete & Tested?: Check if all modules are developed, functional, and tested.

## Phase 4: CI/CD Pipeline Implementation & Deployment

1.  **[PENDING]** Set up GitHub Actions CI/CD: Configure GitHub Actions workflow to automate build, test, and deployment to IONOS using Git integration.
2.  **[PENDING]** Deploy to IONOS Staging: Deploy the website to IONOS staging environment.
3.  **[PENDING]** Test on Staging: Test the website in the staging environment.
4.  **[PENDING]** Staging Deployment OK?: Check if staging deployment is successful and website is functional.
5.  **[PENDING]** Deploy to IONOS Production: Deploy the website to IONOS production environment.
6.  **[PENDING]** Final Production Testing: Perform final tests in the production environment.
7.  **[PENDING]** Production Deployment Complete?: Check if production deployment is successful and website is live and functional.
8.  **[PENDING]** Website Live & Functional: Website is live and functional on IONOS production environment.

## Revised Development Plan (MySQL Focus - 2025-04-20)

**Objective:** Adapt the project to use the confirmed IONOS MySQL database and implement the public homepage quote request functionality.

**Database Details (IONOS MySQL):**
*   Database Name: `cleanedgeremoval`
*   Host: `db5017699173.hosting-data.io`
*   Port: `3306`
*   User: `dbu3934010`
*   Password: `DonnaEUS@123` (Note: Store securely, e.g., in environment variables)

**Plan:**

**Phase 1 Adjustment: Update Planning for MySQL**

1.  **[COMPLETED]** Update `database-models.md`: Translate the detailed MongoDB schemas into equivalent MySQL table structures (tables, columns, types, keys, indexes).
2.  **[COMPLETED]** Review/Update Other Docs: Briefly review `file-tree.md`, `api-endpoints.md`, and `component-hierarchy.md` for consistency with MySQL.
3.  **[COMPLETED]** Update `Phasechecklist.txt`: Add sub-tasks for MySQL model definition and server code adaptation.

**Phase 2/3: Server Adaptation & Homepage Implementation**

1.  **Server Configuration:**
    *   **[PENDING]** Update `server/src/config/database.ts` (or similar) to use the provided IONOS MySQL credentials (preferably loaded from environment variables).
    *   **[PENDING]** Choose and install a suitable MySQL ORM (e.g., Sequelize, TypeORM) or query builder (e.g., Knex.js) along with the `mysql2` driver. Update `server/package.json`.
    *   **[PENDING]** Configure the chosen ORM/builder to connect to the IONOS database.
2.  **Define MySQL Models:**
    *   **[PENDING]** Create/update model files in `server/src/models/` using the chosen ORM, reflecting the revised MySQL structure in `database-models.md`.
3.  **Adapt Server Logic:**
    *   **[PENDING]** Refactor server services (e.g., `appointment.service.ts`, `user.service.ts`) and controllers (`*.controller.ts`) to use the MySQL ORM/query builder for all database interactions.
4.  **Implement Homepage UI & Quote Request Form (Client):**
    *   **[COMPLETED]** Refactor `client/src/components/pages/public/HomePage.tsx` into smaller section components (e.g., `HeroSection`, `SchedulingContactSection`) located in `client/src/components/pages/public/HomePage/sections/`. Component hierarchy defined in `component-hierarchy.md`. (Verified by reading `HomePage.tsx`)
    *   **[COMPLETED]** Implement basic structure/placeholders within each section component (Assumed based on refactoring and previous steps).
    *   **[COMPLETED]** Implement "Why Choose Us" section structure (header, intro, differentiator grid with placeholders, stats placeholders) likely within `WhyChooseUsSection.tsx` (Verified structure added in previous steps, location assumed).
    *   **[COMPLETED]** Implement "Service Area Map" section structure (two-column layout, map placeholder, content placeholders) likely within `ServiceAreaSection.tsx` (Verified structure added in previous steps, location assumed).
    *   **[COMPLETED]** Implement "Scheduling/Contact" section structure (two-column layout, header/intro placeholders, basic form HTML) likely within `SchedulingContactSection.tsx` (Verified structure added in previous steps, location assumed).
    *   **[COMPLETED]** Add `useState` hooks for form data (`formData`, `showOtherDescription`) within `SchedulingContactSection.tsx` (Verified state added, location corrected based on refactoring).
    *   **[COMPLETED]** Add form state handler functions (`handleChange`, `handleServiceChange`, `handleCheckboxChange`) within `SchedulingContactSection.tsx` (Verified handlers added, location corrected based on refactoring).
    *   **[PENDING]** Connect form state variables (`formData`) and handler functions (`handleChange`, `handleServiceChange`, `handleCheckboxChange`) to the corresponding form elements (`input`, `textarea`, `checkbox`) using `value`/`checked` and `onChange` props within `SchedulingContactSection.tsx`. This is the immediate next coding step.
    *   **[PENDING]** Implement conditional rendering logic for the "Other" service description `textarea` within `SchedulingContactSection.tsx` based on the `showOtherDescription` state variable (show when "Other" checkbox is checked, hide otherwise, clear value when hidden).
    *   **[PENDING]** Implement client-side validation logic within `SchedulingContactSection.tsx` for required fields (`*`) and specific formats (email, phone numbers - 10 digits). Provide user feedback for validation errors.
    *   **[PENDING]** Implement styling refinements within relevant section components and potentially global styles/Tailwind config: ensure input placeholders have 60% opacity and disappear on focus/input; style checkboxes as filled grey circles when selected; implement disabled/active states for Submit/Clear buttons based on form state/validity; apply specified background patterns/gradients and header underlines to relevant sections (`WhyChooseUsSection`, etc.).
    *   **[PENDING]** Implement dynamic content logic within `SchedulingContactSection.tsx` to display different header/intro text based on the future administrative "Auto Schedule" toggle state.
    *   **[PENDING]** Implement functional components or third-party integrations within their respective section components: Interactive Google Map with custom styling, service area polygon overlay, and HQ marker (`ServiceAreaSection.tsx`); Address Checker tool functionality (`ServiceAreaSection.tsx`); Animated counters for statistical highlights (`WhyChooseUsSection.tsx`); Google reCAPTCHA v3 (with v2 fallback) integration (`SchedulingContactSection.tsx`).
5.  **Implement Quote Request Backend API:**
    *   **[COMPLETED]** Define backend API endpoint structure (`POST /api/quote-requests`) in `server/src/api/routes/quote.routes.ts` and register it in `server/src/api/routes/index.ts`.
    *   **[PENDING]** Implement detailed server-side validation logic for the incoming quote request payload within `server/src/api/validators/quote.validator.ts` (or similar), ensuring all required fields are present and data types/formats are correct (e.g., email format, phone number format, service list validation).
    *   **[PENDING]** Implement the core logic within the `createQuoteRequest` controller function (or similar) in `server/src/api/controllers/quote.controller.ts`. This involves:
        *   Using the chosen MySQL ORM (Sequelize/TypeORM) or query builder (Knex.js) configured in `server/src/config/database.ts`.
        *   Mapping the validated request data to the corresponding MySQL models (e.g., `Customer`, `CustomerServiceAddress`, potentially linking services).
        *   Persisting the data to the `Customers` table and any related tables in the IONOS MySQL database. Handle potential database errors gracefully.
    *   **[PENDING]** Integrate the existing `ionosEmailService` (`server/src/services/ionosEmail.service.ts`) within the `createQuoteRequest` controller function. Upon successful database insertion, format the quote details and trigger the service to send an email notification to `admin@cleanedgeremoval.com`. Handle potential email sending errors.
    *   **[PENDING]** Ensure the API endpoint returns standardized and informative JSON responses: `201 Created` with potentially the created resource ID on success; `400 Bad Request` with specific validation error details on validation failure; `500 Internal Server Error` for database or email service issues, logging the detailed error server-side while returning a generic error message to the client.
6.  **Integrate Frontend & Backend for Quote Request:**
    *   **[PENDING]** Implement the `onSubmit` event handler for the "Request Quote" form within `SchedulingContactSection.tsx`. Prevent default form submission.
    *   **[PENDING]** Inside the `onSubmit` handler, construct the data payload object from the `formData` state, ensuring it matches the expected structure for the `POST /api/quote-requests` endpoint.
    *   **[PENDING]** Utilize the configured API client utility (e.g., Axios instance in `client/src/services/api.ts`) to make an asynchronous `POST` request to the `/api/quote-requests` endpoint, sending the constructed payload in the request body.
    *   **[PENDING]** Implement robust handling of the API response within the `onSubmit` handler:
        *   On success (e.g., status 201), display a user-friendly success message (e.g., using a `NotificationToast` component) and potentially clear the form.
        *   On client-side error (e.g., status 400), parse the error response body for specific validation messages and display them appropriately near the relevant form fields.
        *   On server-side or network error, display a generic error message to the user (e.g., "Submission failed, please try again later.").
        *   Implement loading state indication (e.g., disabling the submit button and showing a spinner) while the API request is in progress.
7.  **Testing:**
    *   **[PENDING]** Write comprehensive unit tests using Jest/React Testing Library for all newly created or significantly modified React components (`SchedulingContactSection.tsx`, `WhyChooseUsSection.tsx`, etc., and any abstracted form elements) and utility functions (e.g., validation helpers) located in the corresponding `__tests__` directories within `client/src/`. Ensure tests cover various props, states, user interactions, and edge cases to achieve high code coverage.
    *   **[PENDING]** Write detailed integration tests using Jest and Supertest for the `POST /api/quote-requests` backend endpoint located in `server/src/__tests__/`. These tests must cover: successful request processing; validation failures for each required field and format; database interaction success and failure scenarios (mocking the database connection/ORM calls, e.g., using `jest.mock`); email service interaction success and failure scenarios (mocking the `ionosEmailService`). Verify response status codes and JSON payloads for all scenarios.
    *   **[PENDING]** Plan and later implement end-to-end tests using Cypress covering the entire user flow: navigating to the homepage, filling out the quote request form with valid data, submitting the form, verifying the success message; also test invalid data submission and verify appropriate error feedback.
8.  **Update Checklist:** **[COMPLETED]** Mark relevant tasks in `Phasechecklist.txt` with granular status reflecting the refactoring and current progress.

**Mermaid Diagram: Quote Request Flow (MySQL)**

```mermaid
sequenceDiagram
    participant User
    participant SchedulingContactUI
    participant APIClient
    participant ServerAPI
    participant MySQL_DB
    participant EmailService

    User->>SchedulingContactUI: Fills Quote Request Form
    User->>SchedulingContactUI: Clicks Submit
    SchedulingContactUI->>SchedulingContactUI: Performs Client-Side Validation
    alt Validation Fails
        SchedulingContactUI->>User: Shows Validation Errors
    else Validation Succeeds
        SchedulingContactUI->>APIClient: Sends Form Data
        APIClient->>ServerAPI: POST /api/quote-requests (FormData)
        ServerAPI->>ServerAPI: Validates Data
        alt Validation Fails
            ServerAPI-->>APIClient: Error Response (e.g., 400)
            APIClient->>SchedulingContactUI: Error Response
            SchedulingContactUI->>User: Shows Submission Error (Specific if possible)
        else Validation Succeeds
            ServerAPI->>MySQL_DB: Inserts Customer Record (using ORM/SQL)
            MySQL_DB-->>ServerAPI: Confirms Record Insertion
            ServerAPI->>EmailService: Sends Notification Email (to Admin)
            EmailService-->>ServerAPI: Confirms Email Sent (or handles error)
            ServerAPI-->>APIClient: Success Response (e.g., 201)
            APIClient->>SchedulingContactUI: Success Response
            SchedulingContactUI->>User: Shows Success Message
        end
    end