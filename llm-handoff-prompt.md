# LLM Handoff Prompt: Clean Edge Removal Website Development - Task Continuation (2025-04-20 ~18:14 UTC)

**Project Goal:** Develop a comprehensive, enterprise-grade, production-ready website solution for Clean Edge Removal LLC, a professional junk removal and cleaning service provider operating in Northern Indiana, Southern Michigan, and Northern Ohio. This solution must be hosted entirely on the IONOS platform and will encompass:
    1.  A public-facing Single Page Application (SPA) built with React and TypeScript, serving as the primary customer interaction point for information gathering, lead generation (via a detailed quote request form), and eventually, direct service scheduling.
    2.  A secure Administrative Portal for comprehensive business operations management, including user management, customer relationship management (CRM), appointment scheduling and dispatch, employee monitoring (time tracking, location - TBD), vehicle management, and reporting.
    3.  A functional Employee Portal enabling staff to manage their time tracking (clock-in/out, specific work activities like driving, working, breaks), view assigned jobs, access routing information, and potentially document job completion details.

**Mandatory Standards & Constraints (Non-Negotiable - Strict Adherence Required):**

*   **Quality:** Zero critical or high-severity defects upon completion. Code must be robust, resilient to errors, and easily maintainable.
*   **Enterprise-Grade Architecture:** Strict adherence to software engineering best practices, including SOLID principles, comprehensive error handling, detailed logging (using Winston), modular design (Atomic Design methodology where applicable, distinct backend service modules). Components/modules must have single, well-defined responsibilities. Files exceeding approximately 250 lines should be considered for refactoring into smaller, more manageable units.
*   **Testability:** All code must be written with testability as a primary concern. Comprehensive unit tests (Jest/React Testing Library for frontend, Jest for backend utilities/services) and integration tests (Jest/Supertest for backend API endpoints) are mandatory and must be written *concurrently* with feature development, achieving high code coverage (target >= 90%). End-to-end tests (Cypress) must cover critical user flows. Mocking should be used judiciously for external dependencies or complex internal interactions during testing.
*   **Error Handling:** Implement robust, consistent error handling mechanisms on both frontend and backend. Use custom error classes where appropriate. Provide informative error messages during development and sanitized, user-friendly messages in production. Log errors comprehensively.
*   **Logging:** Implement structured JSON logging using Winston on the backend for all significant events, requests, errors, and system activities. Ensure logs include correlation IDs (e.g., request IDs) for traceability. Configure appropriate log levels per environment and implement log rotation/retention policies. Frontend logging should capture critical events and errors using the provided logger utility.
*   **Scalability:** Design components and backend services with horizontal scalability in mind, considering statelessness where possible and efficient database interactions.
*   **Security:** Implement multi-layered security practices: strong password policies (minimum length, complexity requirements enforced), secure password hashing (bcrypt with appropriate salt rounds), secure session management (HttpOnly, SameSite cookies, short idle timeouts), JWT-based authentication (RSA-256 signing, token rotation, refresh tokens) for Authentication, Role-Based Access Control (RBAC) with granular permissions for Admin/Employee/Receptionist roles, input validation and sanitization on all user inputs (client-side and server-side using Joi/Yup), Content Security Policy (CSP), XSS prevention (output encoding), CSRF protection (e.g., double-submit cookies), prevention against SQL/NoSQL injection, rate limiting (IP and user-based), Multi-Factor Authentication (MFA) for administrative accounts (required) and employees (optional), secure handling of sensitive data (encryption at rest using AES-256 for PII, TLS 1.3 for data in transit).
*   **Documentation:** Maintain clear, concise, and accurate documentation, including inline code comments explaining complex logic, JSDoc/TSDoc blocks for functions/classes/interfaces, and updates to external markdown documents (`README.md`, `database-models.md`, `api-endpoints.md`, etc.).
*   **Performance:** Optimize for fast load times (<3s target), quick time-to-interactive (<4s target), and low server response times (<200ms target). Implement asset optimization (code splitting, image/font optimization) and efficient database query strategies (indexing).
*   **User Experience (UX) & Accessibility (A11y):**
    *   **Intuitive Design:** Interfaces must be easy to understand and navigate for the target users (customers, admins, employees).
    *   **Visual Appeal:** Adhere to the specified modern minimalist aesthetic with a premium feel. Utilize the defined color palette (Primary: `#1A5F7A`, Secondary: `#57C84D`, Accent: `#F0A500`, Neutrals, Status Colors) and typography (Montserrat for headings, Open Sans for body text) consistently.
    *   **Responsiveness:** Ensure seamless functionality and optimal layout across all defined breakpoints (Mobile: 0-576px, Tablet: 577px-991px, Desktop: 992px-1199px, Widescreen: 1200px+). Employ a mobile-first approach.
    *   **Accessibility:** Strict compliance with WCAG 2.1 Level AA is mandatory. This includes semantic HTML, ARIA roles for dynamic content, full keyboard navigability, screen reader compatibility, sufficient color contrast (minimum 4.5:1), text resizing support, focus management, and respecting user preferences for reduced motion (use subtle animations via Framer Motion judiciously).
    *   **Customizability & Diagnostics:** Admin portal should offer specified configuration options. All portals should eventually include rich diagnostic and monitoring capabilities (specifics TBD).
*   **Platform & Stack (Strict Adherence Required):**
    *   **Frontend:** React `18.2.0+` (Functional Components, Hooks), TypeScript (Strict Mode Enabled), Redux Toolkit (Global State), React Context API (Component-level State), Tailwind CSS `v3.3.0+` (with custom theme configuration), React Router DOM (Routing), Framer Motion (Subtle Animations), Jest & React Testing Library (Unit/Integration Testing), Cypress (End-to-End Testing).
    *   **Backend:** Node.js `v18 LTS+`, Express.js `4.18.0+` (Structured Routing Modules), TypeScript (Strict Mode Enabled), MySQL `8.0` (Database via IONOS), ORM/Query Builder (Selection/Installation Pending - likely Sequelize or TypeORM), `mysql2` driver, JWT (RSA-256 signing, token rotation, refresh tokens) for Authentication, Role-Based Access Control (RBAC), Joi/Yup (Request Validation), Winston (Structured JSON Logging), OpenAPI 3.0 (API Specification), Swagger UI (API Documentation).
    *   **Database (IONOS MySQL):** Name: `cleanedgeremoval`, Host: `db5017699173.hosting-data.io`, Port: `3306`, User: `dbu3934010`. (Password must be sourced securely, e.g., via environment variables defined in `.env.*` files, see `docs/environment-configuration.md`).
    *   **Hosting & Services:** Exclusively IONOS (Web Hosting, MySQL Database Hosting, Email SMTP). All references to AWS or other providers in original planning documents are superseded by IONOS.
    *   **CI/CD:** GitHub Actions pipeline connected to the repository `https://www.github.com/tablevitas123/cleanedgeremovalwebsite`. Workflow must automate build, test (unit, integration), and deployment via Git integration to IONOS staging and production environments.
*   **Development Process & Methodology:**
    *   Follow the 4-phase approach detailed in user instructions and tracked via `Phasechecklist.txt` and `development-plan.md`.
    *   Adhere strictly to the task breakdown and status documented in `Phasechecklist.txt` and `development-plan.md`. These are the primary sources of truth for progress.
    *   Update both tracking files meticulously and exhaustively after completing *any* sub-task, no matter how small.
    *   No truncation, abbreviation, or omission of detail in code, comments, documentation, or progress tracking is permitted. Extreme pedantry and obsessive attention to detail are required.
    *   Create comprehensive tests immediately after developing any new functionality.
    *   Avoid simulations/mockups unless absolutely necessary for external services not yet built or configured. Document required external dependencies or user-provided credentials clearly.

**Current Project Status (As of 2025-04-20 ~18:12 UTC):**

*   **Phase:** Currently executing **Phase 2: Homepage Module Development**.
*   **Completed Milestones:**
    *   Phase 1 (Planning & Setup) fully completed.
    *   IONOS MySQL 8.0 database instance created and connection details obtained/documented.
    *   `client/src/components/pages/public/HomePage.tsx` successfully refactored into individual section components (e.g., `HeroSection`, `SchedulingContactSection`) located in `client/src/components/pages/public/HomePage/sections/`.
    *   Basic structural JSX (including placeholders for dynamic content/features) implemented within the new section components.
    *   `useState` hooks (`formData`, `showOtherDescription`) and state handler functions (`handleChange`, `handleServiceChange`, `handleCheckboxChange`) added to `client/src/components/pages/public/HomePage/sections/SchedulingContactSection.tsx`.
    *   `outline-light` variant added to `client/src/components/atoms/Button.tsx`.
    *   Backend API route structure for `POST /api/quote-requests` defined.
    *   Progress tracking files (`Phasechecklist.txt`, `development-plan.md`) updated with granular detail reflecting the current state (as of 2025-04-20 ~18:03 UTC).
*   **In Progress:**
    *   Task: `Implement Homepage UI` (Checklist Item: Phase 2, Task 2). Specifically focusing on the `SchedulingContactSection.tsx` component.
    *   Task: `Implement Contact Form & Submission` (Checklist Item: Phase 2, Task 3). Currently working on the frontend aspect within the UI task.
*   **Critical Reference Files for Current Status & Next Steps:**
    *   **`Phasechecklist.txt`:** The definitive source for granular task status. **Review this first.** (Last updated 2025-04-20 ~17:55 UTC).
    *   **`development-plan.md`:** Provides detailed descriptions of tasks and current status, mirroring the checklist. **Review this second.** (Last updated 2025-04-20 ~18:03 UTC).
    *   **`client/src/components/pages/public/HomePage/sections/SchedulingContactSection.tsx`:** The component file requiring immediate attention for the next coding step. Contains the form structure, state hooks, and handlers.
    *   `component-hierarchy.md`, `api-endpoints.md`, `database-models.md`, `authentication-flow.md`, `integration-services.md`: Contain architectural and design decisions.
    *   `requiredimages.md`: Contains prompts for necessary image assets.

**Immediate Next Task (Mandatory - Resume Interrupted Work):**

1.  **Target File:** `client/src/components/pages/public/HomePage/sections/SchedulingContactSection.tsx`
2.  **Action:** Connect the existing state variables (`formData`) and handler functions (`handleChange`, `handleServiceChange`, `handleCheckboxChange`) to their corresponding form elements (`input`, `textarea`, `checkbox`).
    *   Specifically, for each relevant form element within the `<form>` tag:
        *   Add the `value` prop and bind it to the corresponding field in the `formData` state object (e.g., `value={formData.fullName}`).
        *   Add the `checked` prop and bind it to the corresponding boolean field in the `formData` state object for checkboxes (e.g., `checked={formData.privacyPolicy}`, `checked={formData.services.includes(service)}`).
        *   Add the `onChange` prop and assign the correct handler function (`handleChange` for text inputs/textarea, `handleServiceChange` for service checkboxes, `handleCheckboxChange` for consent checkboxes).
3.  **Action:** Implement the conditional rendering logic for the "Other" service description `textarea`.
    *   Locate the `div` containing the `textarea` for the "Other" description (around line 237, but verify exact line number).
    *   Wrap this `div` in a conditional rendering block: `{showOtherDescription && ( ... )}`. Ensure the `hidden` CSS class is removed from the `div` as conditional rendering now controls its visibility.

**Subsequent Pending Tasks (Strict Order from Checklist/Plan):**

*   Implement client-side validation in `SchedulingContactSection.tsx`.
*   Implement styling refinements (checkboxes, placeholders, etc.) in `SchedulingContactSection.tsx` and related CSS/Tailwind files.
*   Implement form submission logic (`handleSubmit`) in `SchedulingContactSection.tsx`, including API call to `POST /api/quote-requests`.
*   Implement backend controller logic (`quote.controller.ts`) for saving data to MySQL and triggering email notifications via `ionosEmailService`.
*   Implement server-side validation (`quote.validator.ts`).
*   Implement frontend API response handling in `SchedulingContactSection.tsx`.
*   Implement remaining UI features (dynamic content, map, address checker, counters, CAPTCHA).
*   Write comprehensive unit and integration tests for all new/modified frontend and backend code.
*   Proceed through the remaining tasks in `Phasechecklist.txt` and `development-plan.md` in the specified order.

**Final Instruction:** Review the referenced files (`Phasechecklist.txt`, `development-plan.md`, `SchedulingContactSection.tsx`) thoroughly before proceeding with the **Immediate Next Task** described above. Maintain exhaustive detail and adherence to all project requirements. Update progress tracking files after completing the immediate next task. Do not proceed to subsequent tasks until the immediate next task is successfully completed and confirmed.