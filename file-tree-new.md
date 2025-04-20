# Clean Edge Removal LLC Website Project - File Tree Structure (Updated 2025-04-20)

This document meticulously outlines the planned and partially implemented file structure for the Clean Edge Removal LLC website project. It adheres to a monorepo architecture managed via npm workspaces, separating concerns into `client`, `server`, and `shared` packages. This structure promotes code reuse, maintainability, and independent development/deployment where appropriate.

**Legend:**

*   `(✓)` - File or Directory currently exists in the workspace.
*   `(~)` - File or Directory exists but its content requires verification or updates to align with the current project state (e.g., MySQL migration, refactoring).
*   `(P)` - Planned File or Directory; essential for future development but not yet created.
*   `(...)` - Indicates the potential for further subdirectories or numerous files not exhaustively listed for clarity, but their existence is implied by the established pattern or project requirements.

```
/cleanedgeremovalwebsite/  (✓)
├── .env.example                 (✓) # Comprehensive template for all possible root-level environment variables (if any become necessary). Primarily, environment configuration resides within client/ and server/ .env files.
├── .gitignore                   (✓) # Specifies intentionally untracked files and directories for Git (e.g., node_modules, .env*, build artifacts, log files, OS-specific files). Must be kept meticulously updated.
├── README.md                    (✓) # Original, minimal README file (to be potentially archived or replaced by README-new.md).
├── README-new.md                (✓) # The primary, updated, exhaustively detailed project README, including overview, status, setup, run, test, deployment instructions, and documentation links.
├── api-endpoints.md             (✓) # Original API endpoint definitions (potentially outdated, especially regarding public quote endpoint).
├── api-endpoints-new.md         (P) # Updated, exhaustively detailed API endpoint definitions reflecting current implementation and plans (to be created).
├── authentication-flow.md       (✓) # Original authentication flow documentation (contains outdated MongoDB schema examples).
├── authentication-flow-new.md   (P) # Updated authentication flow documentation with MySQL examples and refined details (to be created).
├── component-hierarchy.md       (✓) # Original frontend component hierarchy (outdated due to HomePage refactoring).
├── component-hierarchy-new.md   (P) # Updated frontend component hierarchy reflecting current structure including HomePage section components (to be created).
├── database-models.md           (✓) # Original database model definitions (mixed MongoDB/MySQL, needs update).
├── database-models-new.md       (P) # Updated, definitive MySQL database schema definitions (tables, columns, types, constraints, indexes) (to be created).
├── development-plan.md          (✓) # Original development plan.
├── development-plan-new.md      (✓) # The primary, updated, exhaustively detailed development plan, including phases, objectives, granular task status, and technical context.
├── file-tree.md                 (✓) # Original file tree definition.
├── file-tree-new.md             (✓) # This updated, exhaustively detailed file tree definition.
├── installation-guide.txt       (✓) # Original installation guide (redundant, content merged into README-new.md).
├── integration-services.md      (✓) # Original integration services documentation (contains outdated/incorrect details).
├── integration-services-new.md  (P) # Updated integration services documentation focusing on planned integrations (Google Maps, Calendar, Stripe, Twilio) without incorrect implementation details (to be created).
├── llm-handoff-prompt.md        (✓) # Previous LLM handoff prompt.
├── llm-handoff-prompt-new.md    (P) # Updated LLM handoff prompt, generated last to reflect all other document updates (to be created).
├── package-lock.json            (✓) # Records exact versions of dependencies installed for the root workspace, ensuring reproducible builds. Managed by npm.
├── package.json                 (✓) # Root package configuration: defines project metadata, scripts (e.g., for running workspaces concurrently, linting all), devDependencies (e.g., concurrently, husky, lint-staged), and crucially, the `workspaces` array pointing to `client`, `server`, `shared`.
├── phase1-summary.md            (✓) # Original Phase 1 summary (redundant).
├── phase2-summary.md            (✓) # Original Phase 2 summary (likely redundant, content should be in development-plan).
├── Phasechecklist.txt           (✓) # Original phase checklist.
├── Phasechecklist-new.txt       (P) # Updated, definitive, granular phase and task checklist reflecting current progress (to be created).
├── requiredimages.md            (✓) # Contains detailed text prompts for generating required vector images/icons for services.
├── requirements.txt             (✓) # Original requirements file (Python format, redundant).
├── tsconfig.json                (✓) # Root TypeScript configuration, potentially defining base settings or project references for the monorepo structure.
│
├── client/                      (✓) # Frontend React/TypeScript application package (User Interface)
│   ├── .env.development         (✓) # Development-specific environment variables for the client (e.g., API URL, Google Maps Key). GITIGNORED.
│   ├── .env.production          (✓) # Production-specific environment variables for the client. GITIGNORED.
│   ├── .env.test                (✓) # Test-specific environment variables for the client. GITIGNORED.
│   ├── .eslintrc.js             (✓) # ESLint configuration specific to the client package (React rules, JSX A11y, etc.).
│   ├── .prettierrc              (✓) # Prettier code formatting configuration specific to the client.
│   ├── jest.config.js           (✓) # Jest test runner configuration for client-side tests (React Testing Library setup, environment).
│   ├── package.json             (✓) # Client package dependencies (React, Redux, Tailwind, Axios, etc.) and scripts (start dev server, build, test).
│   ├── postcss.config.js        (✓) # PostCSS configuration, primarily for integrating Tailwind CSS.
│   ├── tailwind.config.js       (✓) # Tailwind CSS theme customization (colors, fonts, breakpoints) and plugin configuration.
│   ├── tsconfig.json            (✓) # TypeScript configuration specific to the client package (JSX settings, target libs).
│   ├── webpack.config.js        (✓) # Webpack build configuration (entry points, output, loaders, plugins, code splitting, optimization).
│   │
│   ├── public/                  (✓) # Static assets served directly by the web server, not processed by Webpack.
│   │   ├── favicon.ico          (✓) # Application icon displayed in browser tabs and bookmarks.
│   │   ├── index.html           (✓) # The single HTML page template into which the React application is mounted. Contains root div (e.g., `<div id="root"></div>`).
│   │   ├── manifest.json        (✓) # Web App Manifest for Progressive Web App (PWA) features (icons, theme color, display mode).
│   │   ├── robots.txt           (✓) # Instructions for web crawlers regarding which paths to allow or disallow.
│   │   └── assets/              (✓) # Static assets not imported via JS/TS (use `client/src/assets` for dynamic imports).
│   │       ├── images/          (✓) # E.g., static background images, logos not suitable for JS import.
│   │       └── fonts/           (✓) # E.g., font files referenced directly in CSS if not using CSS imports.
│   │
│   └── src/                     (✓) # Client application source code directory.
│       ├── App.tsx              (✓) # Main application component: sets up routing (React Router), global layout templates, potentially global context providers.
│       ├── index.tsx            (✓) # Application entry point: renders the root component (`App`) into the DOM (`index.html`'s root div), sets up Redux store provider, StrictMode, etc.
│       ├── setupTests.ts        (✓) # Jest setup file: configures testing environment (e.g., imports `@testing-library/jest-dom`, sets up mocks).
│       │
│       ├── __mocks__/           (✓) # Directory for manual Jest mocks (e.g., mocking libraries or modules).
│       │   └── fileMock.js      (✓) # Mock for handling static file imports (CSS, images) in Jest tests.
│       │
│       ├── __tests__/           (✓) # Contains all client-side automated tests. Structure mirrors `src/`.
│       │   ├── components/      (✓) # Tests grouped by component type.
│       │   │   └── error/       (✓)
│       │   │       └── ErrorBoundary.test.tsx (✓) # Unit/integration tests for the ErrorBoundary component.
│       │   │   └── (...)        (P) # Tests for atoms, molecules, organisms, pages, templates.
│       │   ├── features/        (P) # Tests for Redux slices, selectors, thunks.
│       │   ├── hooks/           (P) # Tests for custom hooks.
│       │   ├── services/        (P) # Tests for API service functions (using MSW or Jest mocks).
│       │   └── utils/           (✓) # Tests for utility functions.
│       │       ├── env.test.ts  (✓) # Tests for the client environment variable utility.
│       │       └── logger.test.ts (✓) # Tests for the client logger utility.
│       │
│       ├── assets/              (P) # Dynamically imported assets (preferred location).
│       │   ├── images/          (P) # Images imported and used within components (SVG, PNG, JPG).
│       │   ├── icons/           (P) # SVG icon components or files.
│       │   └── fonts/           (P) # Font files loaded via CSS `@font-face` or specific loaders.
│       │
│       ├── components/          (✓) # Reusable UI components, structured by Atomic Design principles.
│       │   ├── atoms/           (✓) # Fundamental building blocks (cannot be broken down further).
│       │   │   ├── Button.tsx   (✓) # Button component with variants (primary, secondary, etc.).
│       │   │   ├── Icon.tsx     (✓) # Component for rendering SVG icons.
│       │   │   ├── Logo.tsx     (✓) # Component for displaying the company logo.
│       │   │   └── ScrollToTop.tsx (✓) # Utility component for scrolling to top on navigation.
│       │   │   └── (...)        (P) # E.g., InputField.tsx, Label.tsx, Spinner.tsx, Badge.tsx.
│       │   ├── molecules/       (✓) # Simple functional groups of atoms.
│       │   │   ├── Breadcrumbs.tsx (✓) # Navigation breadcrumbs.
│       │   │   ├── CookieConsent.tsx (✓) # Cookie consent banner/modal.
│       │   │   ├── FaqAccordion.tsx (✓) # Accordion item for FAQ sections.
│       │   │   ├── MobileMenu.tsx (✓) # Navigation menu for mobile view.
│       │   │   ├── NewsletterSignup.tsx (✓) # Newsletter signup form molecule.
│       │   │   ├── NotificationToast.tsx (✓) # Toast notification component.
│       │   │   ├── SearchBar.tsx (✓) # Search input molecule.
│       │   │   ├── ServiceCard.tsx (✓) # Card displaying a single service.
│       │   │   ├── SocialLinks.tsx (✓) # Links to social media profiles.
│       │   │   ├── TestimonialCard.tsx (✓) # Card displaying a customer testimonial.
│       │   │   └── UserMenu.tsx (✓) # Dropdown menu for logged-in users.
│       │   │   └── (...)        (P) # E.g., FormField.tsx (label + input + error), StatItem.tsx, DifferentiatorItem.tsx.
│       │   ├── organisms/       (✓) # More complex UI sections composed of molecules and/or atoms.
│       │   │   ├── Footer.tsx   (✓) # Site-wide footer section.
│       │   │   ├── Header.tsx   (✓) # Site-wide header/navigation bar.
│       │   │   └── (...)        (P) # E.g., AppointmentCalendar.tsx, UserListTable.tsx, ServiceGrid.tsx, ReviewCarousel.tsx, SchedulingForm.tsx.
│       │   ├── pages/           (✓) # Components representing entire pages or distinct views within the application.
│       │   │   ├── auth/        (✓) # Authentication-related pages.
│       │   │   │   ├── ForgotPasswordPage.tsx (✓)
│       │   │   │   ├── LoginPage.tsx          (✓)
│       │   │   │   ├── MfaVerificationPage.tsx(✓)
│       │   │   │   ├── RegisterPage.tsx       (✓)
│       │   │   │   ├── ResetPasswordPage.tsx  (✓)
│       │   │   │   ├── VerificationSentPage.tsx(✓)
│       │   │   │   └── VerifyEmailPage.tsx    (✓)
│       │   │   ├── error/       (✓) # Error pages.
│       │   │   │   ├── MaintenancePage.tsx    (✓)
│       │   │   │   ├── NotFoundPage.tsx       (✓) # 404 Error Page.
│       │   │   │   ├── ServerErrorPage.tsx    (✓) # 500 Error Page.
│       │   │   │   └── UnauthorizedPage.tsx   (✓) # 401/403 Error Page.
│       │   │   └── public/      (✓) # Publicly accessible pages.
│       │   │       ├── HomePage.tsx (✓) # Main container rendering homepage sections.
│       │   │       └── HomePage/    (✓) # Directory specifically for HomePage's section components.
│       │   │           └── sections/  (✓) # Individual section components for the homepage.
│       │   │               ├── CtaSection.tsx             (P)
│       │   │               ├── FaqSection.tsx             (P)
│       │   │               ├── HeroSection.tsx            (P)
│       │   │               ├── HowItWorksSection.tsx      (P)
│       │   │               ├── NewsletterSection.tsx      (P)
│       │   │               ├── SchedulingContactSection.tsx (✓) # Contains quote request form logic.
│       │   │               ├── ServiceAreaSection.tsx     (P)
│       │   │               ├── ServicesSection.tsx        (P)
│       │   │               ├── TestimonialsSection.tsx    (P)
│       │   │               └── WhyChooseUsSection.tsx     (P)
│       │   │       └── (...)        (P) # E.g., AboutPage.tsx, ServicesListPage.tsx, ContactPage.tsx.
│       │   │   └── (...)        (P) # E.g., AdminDashboardPage.tsx, EmployeeTimeClockPage.tsx.
│       │   └── templates/       (✓) # High-level page layout structures.
│       │       ├── AdminLayout.tsx    (✓) # Layout structure for the admin portal.
│       │       ├── AuthLayout.tsx     (✓) # Layout structure for authentication pages.
│       │       ├── EmployeeLayout.tsx (✓) # Layout structure for the employee portal.
│       │       └── MainLayout.tsx     (✓) # Main layout for public-facing pages (Header, Footer, Main content area).
│       │
│       ├── contexts/            (✓) # React Context API providers for managing global/shared state without Redux.
│       │   └── (...)            (P) # E.g., ThemeProvider.tsx, AuthProvider.tsx (if not using Redux for auth state).
│       │
│       ├── error/               (✓) # Error handling specific components.
│       │   └── ErrorBoundary.tsx(✓) # React Error Boundary to catch rendering errors in component tree.
│       │
│       ├── features/            (✓) # Modules containing logic, state (Redux), hooks, and potentially components related to a specific application feature.
│       │   ├── admin/           (✓) # Features specific to the Admin Portal.
│       │   ├── auth/            (✓) # Authentication features (login, register, logout, state management).
│       │   │   └── authSlice.ts (✓) # Redux slice managing authentication state (user, token, status).
│       │   ├── employee/        (✓) # Features specific to the Employee Portal.
│       │   ├── notifications/   (✓) # Notification system features.
│       │   │   └── notificationSlice.ts (✓) # Redux slice for managing UI notifications/toasts.
│       │   ├── public/          (✓) # Features specific to the public website.
│       │   ├── scheduling/      (✓) # Appointment scheduling features.
│       │   └── ui/              (✓) # General UI state management.
│       │       └── uiSlice.ts   (✓) # Redux slice for UI state (e.g., loading indicators, modal visibility, theme).
│       │
│       ├── hooks/               (✓) # Custom React Hooks for abstracting reusable stateful logic.
│       │   └── (...)            (P) # E.g., useAuthStatus.ts, useApiRequest.ts, useFormValidation.ts, useDebounce.ts.
│       │
│       ├── services/            (✓) # Functions dedicated to interacting with the backend API endpoints.
│       │   └── api.ts           (✓) # Configured Axios instance, potentially base request functions.
│       │   └── (...)            (P) # E.g., auth.service.ts, quote.service.ts, appointment.service.ts.
│       │
│       ├── store/               (✓) # Redux store configuration.
│       │   └── index.ts         (✓) # Root store configuration using Redux Toolkit's `configureStore`, middleware setup (e.g., thunk, logger).
│       │   └── (...)            (P) # E.g., rootReducer.ts (if combining reducers manually), selectors/, middleware/.
│       │
│       ├── styles/              (✓) # Global styles and base Tailwind configuration imports.
│       │   └── index.css        (✓) # Main CSS file importing Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) and potentially global custom styles.
│       │   └── (...)            (P) # E.g., base.css, typography.css (if needed beyond Tailwind).
│       │
│       ├── types/               (✓) # Client-specific TypeScript type definitions and interfaces.
│       │   └── (...)            (P) # E.g., componentProps.types.ts, apiResponse.types.ts, form.types.ts.
│       │
│       └── utils/               (✓) # General utility functions used across the client application.
│           ├── env.ts           (✓) # Utility for accessing client-side environment variables safely.
│           └── logger.ts        (✓) # Client-side logging utility (e.g., wrapper around console or a remote logging service).
│           └── (...)            (P) # E.g., helpers.ts, formatters.ts, validationUtils.ts.
│
├── server/                      (✓) # Backend Node.js/Express/TypeScript application package (API)
│   ├── .env.development         (✓) # Development environment variables for the server (DB creds, JWT secrets, etc.). GITIGNORED.
│   ├── .env.production          (✓) # Production environment variables for the server. GITIGNORED.
│   ├── .env.test                (✓) # Test environment variables for the server. GITIGNORED.
│   ├── .eslintrc.js             (✓) # ESLint configuration specific to the server package.
│   ├── .prettierrc              (✓) # Prettier configuration specific to the server.
│   ├── package.json             (✓) # Server package dependencies (Express, ORM, JWT, bcrypt, etc.) and scripts (start server, build, test, migrate db).
│   ├── tsconfig.json            (✓) # TypeScript configuration specific to the server package (target, module system).
│   └── jest.config.js           (P) # Jest test runner configuration for server-side tests (Node environment, setup files).
│   │
│   └── src/                     (✓) # Server application source code directory.
│       ├── app.ts               (✓) # Core Express application setup: instantiates Express, applies global middleware (CORS, helmet, compression, body-parser, request logging), mounts API routers, sets up global error handling.
│       ├── index.ts             (✓) # Server entry point: loads environment variables, establishes database connection, starts the HTTP server (listens on configured port).
│       ├── setupTests.ts        (✓) # Jest setup file for server tests (e.g., global mocks, environment setup).
│       │
│       ├── __mocks__/           (✓) # Directory for manual Jest mocks for server-side tests.
│       │
│       ├── __tests__/           (✓) # Contains all server-side automated tests. Structure mirrors `src/`.
│       │   ├── config/          (✓)
│       │   │   └── ionos.test.ts(✓) # Tests for IONOS configuration loading logic.
│       │   ├── services/        (✓)
│       │   │   └── ionosEmail.service.test.ts (✓) # Unit/integration tests for the IONOS email service (mocking SMTP).
│       │   └── utils/           (✓)
│       │       └── env.test.ts  (✓) # Tests for the server environment variable utility.
│       │   └── (...)            (P) # Tests for api/controllers, api/middlewares, other services/, models/ (if applicable).
│       │
│       ├── api/                 (✓) # Defines the REST API layer.
│       │   ├── controllers/     (✓) # Handles incoming requests, orchestrates calls to services, formats responses.
│       │   │   └── quote.controller.ts (✓) # Controller specifically for handling quote request submissions.
│       │   │   └── (...)        (P) # E.g., auth.controller.ts, user.controller.ts, appointment.controller.ts.
│       │   ├── middlewares/     (✓) # Express middleware functions for cross-cutting concerns.
│       │   │   └── (...)        (P) # E.g., requireAuth.ts, checkRole.ts, validateRequest.ts (using validators), globalErrorHandler.ts.
│       │   ├── routes/          (✓) # Defines API endpoints and maps them to controllers/middlewares.
│       │   │   ├── index.ts     (✓) # Root API router that mounts all feature-specific routers (e.g., `/api/auth`, `/api/quotes`).
│       │   │   └── quote.routes.ts (✓) # Defines routes under `/api/quote-requests` (e.g., `POST /`).
│       │   │   └── (...)        (P) # E.g., auth.routes.ts, user.routes.ts, appointment.routes.ts.
│       │   └── validators/      (✓) # Request validation schemas (e.g., using Joi or Yup).
│       │       └── quote.validator.ts (✓) # Validation schema for the `POST /api/quote-requests` payload.
│       │       └── (...)        (P) # E.g., login.validator.ts, createUser.validator.ts, createAppointment.validator.ts.
│       │
│       ├── config/              (✓) # Application configuration loading and setup.
│       │   ├── database.ts      (✓) # Configures database connection (IONOS MySQL) and initializes the ORM (Sequelize/TypeORM).
│       │   ├── deployment.ts    (✓) # Contains deployment-specific settings or configurations.
│       │   ├── ionos.ts         (✓) # Configuration specific to IONOS services (Email SMTP details).
│       │   ├── logger.ts        (✓) # Configures the Winston logger instance (transports, format, levels).
│       │   └── server.ts        (✓) # Configures Express server settings (port, host, CORS options, trust proxy).
│       │   └── (...)            (P) # E.g., jwt.config.ts, session.config.ts.
│       │
│       ├── models/              (✓) # Database models defined using the chosen ORM (e.g., Sequelize or TypeORM), mapping to MySQL tables.
│       │   ├── Appointment.model.ts (✓)
│       │   ├── AppointmentEmployee.model.ts (✓)
│       │   ├── AppointmentPhoto.model.ts (✓)
│       │   ├── AppointmentService.model.ts (✓)
│       │   ├── AuditLog.model.ts (✓)
│       │   ├── Customer.model.ts (✓)
│       │   ├── CustomerServiceAddress.model.ts (✓)
│       │   ├── Location.model.ts (✓)
│       │   ├── LocationBusinessHours.model.ts (✓)
│       │   ├── Notification.model.ts (✓)
│       │   ├── Review.model.ts (✓)
│       │   ├── Service.model.ts (✓)
│       │   ├── Tag.model.ts (✓)
│       │   ├── TimeActivity.model.ts (✓)
│       │   ├── TimeEntry.model.ts (✓)
│       │   ├── User.model.ts (✓)
│       │   ├── Vehicle.model.ts (✓)
│       │   ├── VehicleAssignment.model.ts (✓)
│       │   ├── VehicleDocument.model.ts (✓)
│       │   ├── VehicleFuelLog.model.ts (✓)
│       │   └── VehicleMaintenanceHistory.model.ts (✓)
│       │   └── index.ts         (P) # Optional: Exports all models and potentially defines associations.
│       │
│       ├── services/            (✓) # Contains the core business logic, interacting with models and external services.
│       │   └── ionosEmail.service.ts (✓) # Service class for sending emails via IONOS SMTP (using Nodemailer).
│       │   └── (...)            (P) # E.g., auth.service.ts, user.service.ts, appointment.service.ts, payment.service.ts.
│       │
│       ├── types/               (✓) # Server-specific TypeScript type definitions and interfaces.
│       │   └── (...)            (P) # E.g., express.d.ts (for extending Request/Response), service.types.ts.
│       │
│       └── utils/               (✓) # General utility functions used across the server application.
│           └── env.ts           (✓) # Utility for accessing server-side environment variables safely.
│           └── (...)            (P) # E.g., passwordUtils.ts (hashing/verification), jwtUtils.ts, asyncWrapper.ts, ApiError.ts.
│
├── shared/                      (✓) # Package for code shared between client and server.
│   ├── .eslintrc.js             (✓) # ESLint configuration for the shared package.
│   ├── .prettierrc              (✓) # Prettier configuration for the shared package.
│   ├── package.json             (✓) # Shared package definition (might only contain devDependencies for building/testing).
│   ├── tsconfig.json            (✓) # TypeScript configuration for the shared package (build settings).
│   │
│   └── src/                     (✓) # Shared source code.
│       ├── index.ts             (✓) # Main export file, making shared items available for import by client/server.
│       ├── __tests__/           (✓) # Tests specifically for shared code.
│       ├── constants/           (✓) # Values shared across client and server (e.g., user roles, permissions strings, status enums).
│       ├── types/               (✓) # Shared TypeScript interfaces and types (e.g., data structures for API payloads, database entities if not using ORM types directly).
│       │   └── quote.types.ts   (✓) # Types related to quote request data transfer.
│       │   └── (...)            (P) # E.g., User.ts, Appointment.ts, Service.ts.
│       └── utils/               (✓) # Utility functions usable by both client and server (e.g., simple formatting, non-DOM/Node specific logic).
│       └── validation/          (P) # Shared validation schemas (e.g., using Zod) if validation logic is shared.
│
├── scripts/                     (✓) # Utility scripts for development, build, deployment, database management.
│   └── deploy-ionos.js          (✓) # Node.js script for automating deployment to IONOS via FTP.
│   └── (...)                    (P) # E.g., db-migrate.js, seed-db.js, generate-types-from-schema.js.
│
└── docs/                        (✓) # Project documentation directory.
    ├── environment-configuration.md (✓) # Original guide to environment variables.
    ├── environment-configuration-new.md (P) # Updated guide to environment variables (to be created).
    ├── ionos-integration-guide.md (✓) # Original guide for IONOS setup.
    ├── ionos-integration-guide-new.md (P) # Updated guide for IONOS setup (to be created).
    ├── ionos-integration-summary.md (✓) # Original IONOS summary (redundant).
    └── (...)                    (P) # E.g., architecture-overview.md, testing-strategy.md, deployment-process.md, api-style-guide.md.