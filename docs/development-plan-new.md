# Clean Edge Removal LLC Website Development Plan (Updated 2025-04-20)

**Document Purpose:** This document serves as the central, authoritative, and exhaustively detailed plan for the development of the Clean Edge Removal LLC website project. It outlines the project's objectives, technical architecture, development phases, specific tasks, current status, and key decisions, ensuring alignment with enterprise-grade standards and the client's requirements. It incorporates and supersedes information from previous planning documents like `phase1-summary.md`.

**Project Goal:** To develop and deploy a comprehensive, secure, scalable, performant, accessible, and user-friendly website solution hosted entirely on the IONOS platform. This includes:
    1.  A public-facing Single Page Application (SPA) for marketing, service information, lead generation (quote requests), and future online scheduling.
    2.  A secure Administrative Portal for managing business operations (customers, appointments, users, vehicles, services, settings, reports).
    3.  A functional Employee Portal for time tracking and job management.

**Core Principles:** Adherence to enterprise-ready standards, modular design, comprehensive testing (unit, integration, E2E), meticulous documentation, WCAG 2.1 AA accessibility, robust security, and optimal performance is mandatory throughout the development lifecycle.

## 1. Overall Development Flow & Phasing

The project follows a structured 4-phase approach:

```mermaid
graph LR
    subgraph Phase 1: Planning & Setup [Completed]
        direction LR
        A[Analyze Requirements] --> B[Design Architecture];
        B --> C[Define File Structure];
        C --> D[Define Component Hierarchy];
        D --> E[Plan Database Schema (MySQL)];
        E --> F[Define API Endpoints];
        F --> G[Design Auth Flow];
        G --> H[Plan Integrations];
        H --> I[Generate Image Prompts];
        I --> J[Initial Documentation & Review];
    end

    subgraph Phase 2: Homepage Module [In Progress]
        direction LR
        K[Setup IONOS MySQL] --> L[Implement Homepage UI & Form];
        L --> M[Implement Quote Request Backend];
        M --> N[Integrate Frontend/Backend];
        N --> O[Implement Email Notifications];
        O --> P[Implement Auto-Schedule Toggle (Basic)];
        P --> Q[Basic Homepage Testing];
        Q --> R{Homepage Module Complete?};
    end

    subgraph Phase 3: Modular Development [Pending]
        direction LR
        S[Develop API Module (Remaining)] --> T[Develop DB Module (Models/Migrations)];
        T --> U[Develop Admin Portal (Core)];
        U --> V[Develop Auth Module (Full)];
        V --> W[Develop Employee Portal (Core)];
        W --> X[Develop Remaining Modules/Pages];
        X --> Y[Comprehensive Testing];
        Y --> Z{All Modules Complete?};
    end

    subgraph Phase 4: CI/CD & Deployment [Pending]
        direction LR
        AA[Setup GitHub Actions CI/CD] --> BB[Deploy to Staging (IONOS)];
        BB --> CC[Test on Staging];
        CC --> DD{Staging OK?};
        DD -- Yes --> EE[Deploy to Production (IONOS)];
        DD -- No --> BB;
        EE --> FF[Final Production Testing];
        FF --> GG{Production OK?};
        GG -- Yes --> HH[Website Live];
        GG -- No --> EE;
    end

    J --> K;
    R -- Yes --> S;
    R -- No --> L;
    Z -- Yes --> AA;
    Z -- No --> S;
```

## 2. Phase 1: Planning & Setup (Completed)

This phase established the foundational architecture and planning artifacts.

1.  **[COMPLETED]** Analyze Requirements: Exhaustively reviewed initial specifications, user stories, and technical constraints.
2.  **[COMPLETED]** Design System Architecture: Defined the monorepo structure (client, server, shared), selected the core technology stack (React, Node.js, TypeScript, Express, MySQL, IONOS), and outlined key architectural patterns (REST API, JWT Auth, RBAC).
3.  **[COMPLETED]** Define File Structure: Created the initial detailed project directory layout (`file-tree.md`).
4.  **[COMPLETED]** Define Component Hierarchy: Planned the initial frontend component structure using Atomic Design principles (`component-hierarchy.md`).
5.  **[COMPLETED]** Plan Database Schema (MySQL): Translated original requirements into a detailed MySQL schema definition (`database-models.md`).
6.  **[COMPLETED]** Define API Endpoints: Specified the structure, methods, request/response formats, and status codes for the RESTful API (`api-endpoints.md`).
7.  **[COMPLETED]** Design Authentication Flow: Detailed the JWT-based authentication, MFA, password reset, and RBAC mechanisms (`authentication-flow.md`).
8.  **[COMPLETED]** Plan Integration Services: Identified necessary third-party integrations (Google Calendar, Google Maps, Twilio, Stripe) and the primary email service (IONOS SMTP) (`integration-services.md`).
9.  **[COMPLETED]** Generate Image Prompts: Created detailed text prompts for generating required vector icons for services (`requiredimages.md`).
10. **[COMPLETED]** Initial Documentation & Review: Created initial versions of all planning documents and confirmed the overall plan.

## 3. Phase 2: Homepage Module Development (In Progress)

This phase focuses on delivering the core public-facing homepage with quote request functionality.

1.  **[COMPLETED]** Set up IONOS Managed MySQL 8.0 Database: Successfully provisioned the `cleanedgeremoval` database instance on IONOS hosting and securely obtained the necessary connection credentials (Host: `db5017699173.hosting-data.io`, Port: `3306`, User: `dbu3934010`, DB: `cleanedgeremoval`). Password stored securely.
2.  **[IN PROGRESS]** Implement Homepage UI & Core Functionality: Develop the user interface and foundational client-side logic for the homepage.
    *   **[COMPLETED]** Refactor `HomePage.tsx`: Decomposed the original monolithic `HomePage.tsx` into individual, manageable section components located within `client/src/components/pages/public/HomePage/sections/` (e.g., `HeroSection.tsx`, `SchedulingContactSection.tsx`). Verified via `HomePage.tsx` content.
    *   **[COMPLETED]** Implement Section Structures: Created the basic JSX structural layout and placeholder content within each of the newly created section components, establishing the visual flow of the homepage.
    *   **[COMPLETED]** Implement `SchedulingContactSection` Form Structure: Added the necessary HTML form elements (inputs for name, address, email, phones; checkboxes for services including "Other"; textarea for "Other" description; checkboxes for privacy/marketing consent; Submit/Clear buttons) within the `SchedulingContactSection.tsx` component's JSX.
    *   **[COMPLETED]** Implement `SchedulingContactSection` State & Handlers: Added `useState` hooks (`formData`, `showOtherDescription`) and corresponding event handler functions (`handleChange`, `handleServiceChange`, `handleCheckboxChange`) within `SchedulingContactSection.tsx` to manage the form's data state.
    *   **[PENDING]** Connect Form State & Handlers: Meticulously bind the `value` and `checked` props of each form input, textarea, and checkbox within `SchedulingContactSection.tsx` to the corresponding fields in the `formData` state object. Assign the correct `onChange` event handler (`handleChange`, `handleServiceChange`, `handleCheckboxChange`) to each respective form element. **(Immediate Next Task)**
    *   **[PENDING]** Implement Conditional Rendering ("Other" Textarea): Implement the logic within `SchedulingContactSection.tsx`'s JSX to conditionally render the `otherDescription` textarea block *only* when the `showOtherDescription` state variable is true (i.e., when the "Other" service checkbox is checked). Ensure the textarea is completely removed from the DOM when hidden, and its value is cleared in the state when the "Other" checkbox is unchecked (handled in `handleServiceChange`).
    *   **[PENDING]** Implement Client-Side Form Validation: Implement input validation logic directly within `SchedulingContactSection.tsx` (or potentially using a helper hook/library like Formik/Yup later). Validate required fields (marked with `*`), email format (using regex or type="email"), and phone number formats (e.g., 10 digits, potentially allowing basic formatting). Display clear, user-friendly error messages near the respective fields upon validation failure (e.g., on blur or before submission).
    *   **[PENDING]** Implement Styling Refinements: Apply detailed Tailwind CSS classes and potentially custom CSS (`client/src/styles/index.css` or component-specific CSS modules) to precisely match the visual design specifications: input placeholder text must have 60% opacity and disappear on focus/input; service checkboxes must appear as circles that fill with a solid color (e.g., primary color `#1A5F7A` or a grey) when checked; Submit/Clear buttons must have visually distinct states (disabled, active, hover, focus) potentially based on form validity or pristine state; apply specified background gradients/patterns and header underlines to relevant sections.
    *   **[PENDING]** Implement Dynamic Content (Scheduling Section): Implement logic within `SchedulingContactSection.tsx` to fetch the (future) "Auto Schedule" toggle setting from the backend/admin configuration and dynamically update the section header (e.g., "Request a Quote" vs. "Schedule Your Service") and introductory text accordingly.
    *   **[PENDING]** Implement Functional Components/Integrations (Homepage): Develop and integrate the following interactive elements:
        *   Google Map Integration (`ServiceAreaSection.tsx`): Utilize `@react-google-maps/api` or similar library to display an interactive map, apply custom styling, draw the service area polygon, and place a marker for the HQ. Requires `REACT_APP_GOOGLE_MAPS_API_KEY`.
        *   Address Checker (`ServiceAreaSection.tsx`): Implement the input field and button logic to potentially call a backend endpoint (`/api/public/check-address`) to verify if an entered address falls within the service area.
        *   Animated Counters (`WhyChooseUsSection.tsx`): Use a library like `react-countup` or Framer Motion to animate the display of key statistics.
        *   CAPTCHA Integration (`SchedulingContactSection.tsx`): Integrate Google reCAPTCHA v3 (invisible) with a v2 checkbox fallback mechanism into the quote request form using a library like `react-google-recaptcha`. Requires `REACT_APP_RECAPTCHA_SITE_KEY`.
        *   Service Icon Display (`ServicesSection.tsx`): Dynamically load and render the appropriate vector icons (based on `requiredimages.md` prompts, assuming icons are generated and placed in `client/src/assets/icons/` or similar) within each `ServiceCard.tsx`.
        *   Testimonial Carousel (`TestimonialsSection.tsx`): Implement a responsive carousel (e.g., using `swiper`) to display `TestimonialCard.tsx` components with navigation and autoplay.
3.  **[PENDING]** Implement Quote Request Form Submission Backend: Develop the server-side logic to handle the quote request form.
    *   **[COMPLETED]** Define API Endpoint Structure: Successfully created the route definition for `POST /api/quote-requests` in `server/src/api/routes/quote.routes.ts` and registered it in the main router (`server/src/api/routes/index.ts`).
    *   **[PENDING]** Implement Server-Side Validation: Create and implement a robust validation schema (using Joi or Yup) in `server/src/api/validators/quote.validator.ts` for the `POST /api/quote-requests` payload. Ensure all required fields (`fullName`, `serviceAddress`, `email`, `cellPhone`, `services`, `privacyPolicy`) are present and conform to expected types and formats (e.g., valid email, non-empty strings, boolean for privacyPolicy).
    *   **[PENDING]** Implement Controller Logic (`server/src/api/controllers/quote.controller.ts`): Write the `createQuoteRequest` function (or similar) to:
        *   Receive the validated request data.
        *   Interact with the database using the configured MySQL ORM/Query Builder.
        *   Create a new record in the `customers` table (or find existing customer by email). Handle potential data mapping and relationships (e.g., storing service address, requested services - potentially linking to `services` table or storing as text/JSON initially).
        *   Handle potential database errors gracefully (e.g., unique constraint violations, connection errors).
        *   Upon successful database insertion, trigger the `ionosEmailService`.
    *   **[PENDING]** Implement Standardized API Responses: Ensure the `createQuoteRequest` controller returns:
        *   `201 Created` on success, potentially with the ID of the created customer/request.
        *   `400 Bad Request` if server-side validation fails (triggered by validation middleware).
        *   `409 Conflict` if a conflicting record exists (e.g., duplicate email if designed that way).
        *   `500 Internal Server Error` for unexpected database or email service errors, logging the full error server-side.
4.  **[PENDING]** Implement Frontend-Backend Integration for Quote Request: Connect the client-side form to the backend API endpoint.
    *   **[PENDING]** Implement `onSubmit` Handler (`SchedulingContactSection.tsx`): Finalize the `handleSubmit` function to prevent default form submission and orchestrate the API call. Implement loading state management (e.g., set `isLoading` state to true, disable submit button).
    *   **[PENDING]** Construct API Payload: Format the data from the `formData` state into the exact JSON structure expected by the `POST /api/quote-requests` endpoint.
    *   **[PENDING]** Call API Endpoint: Use the configured Axios instance (from `client/src/services/api.ts`) to make the asynchronous `POST` request to the backend.
    *   **[PENDING]** Handle API Response: Implement comprehensive response handling within the `handleSubmit` function's `try...catch` block or promise handlers (`.then().catch()`):
        *   On success (e.g., 201 status): Display a success message using `NotificationToast`, potentially clear the form fields by calling `handleReset()`, set loading state to false.
        *   On validation error (e.g., 400 status): Parse error details from the response body and display specific error messages near the relevant form fields. Set loading state to false.
        *   On other errors (e.g., 500 status, network error): Display a generic error message using `NotificationToast`. Set loading state to false. Log the error client-side.
5.  **[PENDING]** Implement Server Configuration for MySQL: Set up the backend to connect to the IONOS MySQL database.
    *   **[PENDING]** Update `server/src/config/database.ts`: Implement logic to read MySQL connection details (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_SSL`) from environment variables (`server/.env.*`).
    *   **[PENDING]** Install ORM/Driver: Add `mysql2` and the chosen ORM package (e.g., `sequelize` and `@types/sequelize`, or `typeorm`) as dependencies in `server/package.json` and run `npm install` in the `server/` directory.
    *   **[PENDING]** Initialize ORM: Configure and initialize the chosen ORM within `server/src/config/database.ts` (or a dedicated ORM config file) to establish a connection pool to the IONOS database using the loaded credentials. Ensure connection testing occurs on server startup.
6.  **[PENDING]** Define MySQL Models (`server/src/models/`): Implement ORM model definitions corresponding precisely to the tables specified in `database-models-new.md`. Define data types, nullability, defaults, relationships (associations like `hasMany`, `belongsTo`, `belongsToMany` with join tables), and potentially model-level validations. Start with `Customer.model.ts`, `CustomerServiceAddress.model.ts`, `Service.model.ts`, `Tag.model.ts`, `CustomerTags.model.ts`.
7.  **[PENDING]** Adapt Server Logic for MySQL: Refactor any existing server-side services and controllers (currently minimal, primarily `quote.controller.ts`) to use the newly defined MySQL ORM models and methods for all database operations (create, read, update, delete) instead of any placeholder or previous database logic.
8.  **[PENDING]** Implement Email Notifications (IONOS SMTP): Finalize the email sending functionality.
    *   **[PENDING]** Refine Email Service (`ionosEmail.service.ts`): Implement the `sendTransactionalEmail` method using Nodemailer, configured with IONOS SMTP credentials loaded via `server/src/config/ionos.ts`. Implement basic HTML email template rendering (e.g., using Handlebars or simple string interpolation) for the quote request notification. Include error handling for SMTP connection/send failures.
    *   **[PENDING]** Integrate in Controller: Ensure the `createQuoteRequest` function in `quote.controller.ts` correctly calls the `ionosEmailService.sendTransactionalEmail` method after successfully saving the quote request data to the database, passing necessary details (admin email, customer info, requested services).
9.  **[PENDING]** Implement Auto Schedule Toggle (Basic Functionality): Prepare for the future self-scheduling feature.
    *   **[PENDING]** Add Admin Setting (Backend - Placeholder): Define where this toggle state (`autoScheduleEnabled: boolean`) will eventually be stored (e.g., a `system_settings` table or configuration file). For now, the backend might assume a default value (e.g., `false`).
    *   **[PENDING]** Fetch Setting (Frontend - Placeholder): Modify `SchedulingContactSection.tsx` to potentially fetch this setting from a (future) `/api/config` endpoint. Use the placeholder `const isAutoScheduleMode = false;` for now.
    *   **[PENDING]** Conditional Rendering (Frontend): Ensure the existing conditional rendering logic (`{!isAutoScheduleMode && (...)}`) correctly shows/hides the quote form based on the (currently hardcoded) `isAutoScheduleMode` variable. Plan for where the calendar/scheduling components will render when `isAutoScheduleMode` is true.
10. **[PENDING]** Basic Homepage Testing: Implement initial tests for the homepage module.
    *   **[PENDING]** Unit Tests (Client): Create test files (e.g., `SchedulingContactSection.test.tsx`) using Jest and React Testing Library. Write tests covering: initial rendering of form elements, state updates on input changes (`fireEvent.change`), conditional rendering of the "Other" textarea, basic validation feedback (mocking validation functions initially), form submission attempt (mocking API call). Aim for high coverage of `SchedulingContactSection.tsx`.
    *   **[PENDING]** Integration Tests (Server): Create test file (e.g., `quote.routes.test.ts`) using Jest and Supertest. Write tests for the `POST /api/quote-requests` endpoint covering: successful submission (201), validation errors for each required field (400), duplicate email/customer handling (if applicable, 409), database save success/failure (mocking ORM calls), email sending success/failure (mocking `ionosEmailService`), and internal server errors (500). Verify response status codes and body content.
    *   **[PENDING]** E2E Tests (Client - Planning): Define key user scenarios for Cypress testing, such as: successfully submitting a quote request, submitting with missing required fields and verifying errors, submitting with invalid email/phone and verifying errors.

## 4. Phase 3: Modular Website Development & Testing (Pending)

This phase involves building out the remaining core functionalities of the application in a modular fashion.

*   **[PENDING]** Develop API Module (Remaining Endpoints): Implement all other backend API endpoints defined in `api-endpoints-new.md` (Authentication, User Management, Full Appointment CRUD, Services, Vehicles, Time Tracking, Locations, Reviews, Notifications, Config, Integrations, Reports, Audit Logs).
*   **[PENDING]** Develop Database Module (ORM Models, Migrations, Seeding): Finalize all ORM models (`server/src/models/`), implement database migration scripts (using ORM tools or standalone libraries like `db-migrate`) to manage schema changes, and create seeding scripts to populate initial data (e.g., default admin user, service types).
*   **[PENDING]** Develop Admin Portal Module (UI & Functionality): Build the React components and pages for the administrative portal (`/settings` or `admin.cleanedgeremoval.com`), including the dashboard, user management interface, customer management, full appointment calendar/scheduling interface, vehicle management, service configuration, system settings (Auto Schedule toggle, truck count, etc.), and reporting views.
*   **[PENDING]** Develop Authentication Module (Full Implementation & Security Hardening): Implement the complete authentication flows (MFA setup/verification/disable, password change, session management, RBAC permission checks in middleware) and apply all planned security hardening measures (rate limiting, security headers, input sanitization).
*   **[PENDING]** Develop Employee Portal Module (UI & Functionality): Build the React components and pages for the employee portal, focusing initially on the detailed time tracking interface (toggles, summaries) and viewing assigned daily schedules.
*   **[PENDING]** Develop Remaining Public Pages: Build the remaining static/informational pages for the public website (e.g., About Us, Detailed Services Page, Contact Us, Privacy Policy, Terms of Service).
*   **[PENDING]** Comprehensive Testing: Write exhaustive unit, integration, and end-to-end tests covering all modules and functionalities, aiming for high code coverage and validation of all requirements. Perform security testing (e.g., OWASP Top 10 checks, dependency vulnerability scanning). Conduct performance testing under simulated load. Perform thorough accessibility testing (automated and manual).

## 5. Phase 4: CI/CD Pipeline Implementation & Deployment (Pending)

This phase focuses on automating the build, test, and deployment process and launching the application.

*   **[PENDING]** Set up GitHub Actions CI/CD Workflow for IONOS: Create `.github/workflows/deploy.yml` (or similar) to define jobs for: checking out code, setting up Node.js, installing dependencies (`npm ci`), linting (`npm run lint`), running tests (`npm test`), building production artifacts (`npm run build`), and deploying to IONOS (using IONOS Git integration or the custom FTP script via `npm run deploy:ionos:*`). Configure separate workflows or jobs for staging and production environments triggered by pushes/merges to specific branches (`develop`, `main`). Securely store IONOS credentials (FTP password, potentially API keys) as GitHub Secrets.
*   **[PENDING]** Configure Staging Environment on IONOS: Set up a dedicated hosting space, database (potentially a separate instance or schema), and subdomain (e.g., `staging.cleanedgeremoval.com`) on IONOS for the staging environment. Configure production-like environment variables for staging.
*   **[PENDING]** Deploy to IONOS Staging via CI/CD: Trigger the CI/CD pipeline to deploy the application to the configured staging environment.
*   **[PENDING]** Test Thoroughly on Staging Environment: Perform comprehensive manual testing, User Acceptance Testing (UAT), and review automated test results in the staging environment to catch any integration or environment-specific issues.
*   **[PENDING]** Configure Production Environment on IONOS: Ensure the production hosting space, database, and domain/subdomains (`www`, `api`, `admin`) are correctly configured with production environment variables and appropriate resource scaling.
*   **[PENDING]** Deploy to IONOS Production via CI/CD: After successful staging validation, trigger the CI/CD pipeline to deploy the application to the live production environment.
*   **[PENDING]** Final Production Verification and Monitoring Setup: Perform smoke tests on the live production site. Set up monitoring tools (uptime checks, performance monitoring, error tracking - potentially using IONOS tools or third-party services) for the production environment.

---

*(This plan will be updated continuously as development progresses and new decisions are made. Refer to `Phasechecklist-new.txt` for the absolute latest granular task status.)*