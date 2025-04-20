# Clean Edge Removal LLC Website Project (`cleanedgeremovalwebsite`)

## Project Overview

This repository contains the source code for the comprehensive, enterprise-grade website solution for Clean Edge Removal LLC. The project encompasses a public-facing Single Page Application (SPA) built with React/TypeScript for customer interaction and lead generation, a secure administrative portal for business operations, and an employee portal for time tracking and job management.

The entire application is designed to be hosted and operated on the **IONOS** platform, utilizing IONOS for web hosting, MySQL database hosting, and email services (SMTP).

**Core Objectives:**

*   Generate qualified leads via the public website's quote request form.
*   Enable efficient scheduling of services (manual via admin portal initially, with future self-scheduling capability).
*   Optimize operational efficiency through streamlined scheduling, routing (future), and employee management.
*   Provide secure, role-based access to administrative and employee functionalities.
*   Present a professional, modern, minimalist, and trustworthy brand image.
*   Adhere strictly to enterprise-grade standards for code quality, security, performance, scalability, maintainability, accessibility (WCAG 2.1 AA), and documentation.

**Technology Stack:**

*   **Monorepo:** Managed with npm workspaces.
*   **Frontend (`client/`):** React 18.2+, TypeScript, Redux Toolkit, React Router, Tailwind CSS 3.3+, Framer Motion, Axios, Jest, React Testing Library, Cypress.
*   **Backend (`server/`):** Node.js 18+, Express.js 4.18+, TypeScript, MySQL 8.0 (via IONOS), ORM/Query Builder (TBD - likely Sequelize/TypeORM), `mysql2`, JWT (RSA-256), Winston, Joi/Yup, Jest, Supertest.
*   **Shared (`shared/`):** TypeScript types, constants, validation schemas, utility functions.
*   **Database:** IONOS Managed MySQL 8.0.
*   **Hosting/Deployment:** IONOS Web Hosting, IONOS Git Integration (planned via GitHub Actions).
*   **Email:** IONOS SMTP.

## Project Status (As of 2025-04-20 ~18:50 UTC)

*   **Current Phase:** Phase 2: Homepage Module Development
*   **Key Completed Items:**
    *   Phase 1 Planning & Architecture complete.
    *   IONOS MySQL database provisioned.
    *   Project structure (monorepo, client/server/shared) established.
    *   Core documentation artifacts created (though requiring updates).
    *   Homepage component (`HomePage.tsx`) refactored into section-based components (`client/src/components/pages/public/HomePage/sections/`).
    *   Basic structure and state/handlers added to `SchedulingContactSection.tsx`.
    *   Backend API route for quote requests (`POST /api/quote-requests`) defined.
*   **Immediate Next Step:** Connect state variables and handlers to form elements within `client/src/components/pages/public/HomePage/sections/SchedulingContactSection.tsx`.
*   **Detailed Status:** Refer to `Phasechecklist-new.txt` and `development-plan-new.md` for the most granular, up-to-date task status.

## Development Environment Setup

This section provides meticulously detailed instructions for setting up the local development environment. Strict adherence to these steps is required.

### Prerequisites

Ensure the following software is installed and correctly configured on your development machine. Verify versions using the specified commands.

1.  **Node.js:** Version `18.x` (Long Term Support - LTS) or later is mandatory.
    *   **Verification:** Open your terminal or command prompt and execute `node -v`. The output must indicate version 18.0.0 or higher.
    *   **Installation:** Download the LTS installer from the official Node.js website: [https://nodejs.org/](https://nodejs.org/) and follow the installation instructions for your operating system (Windows, macOS, Linux). Consider using a version manager like `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm)) for managing multiple Node.js versions. If using `nvm`, install version 18 via `nvm install 18` and activate it using `nvm use 18`.

2.  **npm (Node Package Manager):** Version `9.x` or later is required. npm is typically included with Node.js installations.
    *   **Verification:** Execute `npm -v`. The output must indicate version 9.0.0 or higher.
    *   **Update (if necessary):** Run `npm install -g npm@latest` to install the latest version globally.

3.  **Git:** The latest stable version is required for version control.
    *   **Verification:** Execute `git --version`.
    *   **Installation:** Download and install from the official Git website: [https://git-scm.com/downloads](https://git-scm.com/downloads).

4.  **MySQL Client (Recommended):** While not strictly required for running the application (as it connects to the remote IONOS database), having a MySQL client tool installed locally is highly recommended for database inspection, debugging, and potentially running migrations locally against a test database. Examples include:
    *   MySQL Workbench (Official GUI tool: [https://dev.mysql.com/downloads/workbench/](https://dev.mysql.com/downloads/workbench/))
    *   DBeaver (Universal database tool: [https://dbeaver.io/](https://dbeaver.io/))
    *   MySQL Command Line Client (Usually included with MySQL Server installations or available separately).
    *   **Note:** You do *not* need to install a local MySQL *server* unless you intend to run integration tests against a local database instance instead of a dedicated test database on IONOS. The primary development database is the remote one hosted by IONOS.

5.  **Docker & Docker Compose (Optional):** Docker is not strictly required for standard development but may be useful for containerizing the application for consistent environments or alternative deployment strategies later. Dockerfiles and docker-compose files may exist in the repository but are secondary to the primary IONOS Git deployment method.
    *   **Installation (if desired):** Download Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).

### Project Installation

Follow these steps precisely to clone the repository and install all necessary dependencies.

1.  **Clone the Repository:**
    *   Open your terminal or Git bash.
    *   Navigate to the directory where you want to store the project.
    *   Execute the following command, replacing `https://www.github.com/tablevitas123/cleanedgeremovalwebsite` with the correct repository URL if it differs:
        ```bash
        git clone https://www.github.com/tablevitas123/cleanedgeremovalwebsite.git
        ```
    *   Change into the newly created project directory:
        ```bash
        cd cleanedgeremovalwebsite
        ```

2.  **Install Dependencies:** This project uses npm workspaces to manage the monorepo structure (`client`, `server`, `shared` packages). Install all dependencies for all workspaces from the root directory.
    *   Execute the following command in the **root** directory (`/cleanedgeremovalwebsite/`):
        ```bash
        npm install
        ```
    *   This command will read the `package.json` files in the root, `client/`, `server/`, and `shared/` directories and install all required dependencies, hoisting common ones to the root `node_modules` where possible. Do **not** run `npm install` individually within the subdirectories unless specifically instructed for troubleshooting.

### Environment Configuration

The application requires environment variables for configuration, including database credentials, API keys, and other settings. These are managed using `.env` files.

1.  **Locate Example Files:** Find the example environment file: `.env.example` in the root directory. Additional examples specific to client and server might exist at `client/.env.example` and `server/.env.example` (verify existence).
2.  **Create Local Environment Files:** Create copies of the example files for your local development environment. **Crucially, these local `.env` files are listed in `.gitignore` and must never be committed to version control.**
    *   In the **root** directory, copy `.env.example` to `.env`:
        ```bash
        # Example for Linux/macOS/Git Bash
        cp .env.example .env
        # Example for Windows Command Prompt
        # copy .env.example .env
        ```
    *   In the **client** directory (`client/`), copy `client/.env.example` (if it exists) to `client/.env.development`.
    *   In the **server** directory (`server/`), copy `server/.env.example` (if it exists) to `server/.env.development`.
3.  **Populate Environment Variables:** Open the newly created `.env`, `client/.env.development`, and `server/.env.development` files and meticulously fill in the required values. Refer to `docs/environment-configuration-new.md` for a detailed explanation of each variable. **Pay special attention to:**
    *   **`server/.env.development`:**
        *   `DB_HOST`: `db5017699173.hosting-data.io` (IONOS MySQL Host)
        *   `DB_PORT`: `3306` (IONOS MySQL Port)
        *   `DB_NAME`: `cleanedgeremoval` (IONOS MySQL Database Name)
        *   `DB_USER`: `dbu3934010` (IONOS MySQL User)
        *   `DB_PASSWORD`: `DonnaEUS@123` (**Warning:** Obtain this securely. Do not hardcode sensitive credentials directly if possible; use secure parameter stores or secrets management in production/staging).
        *   `IONOS_EMAIL_HOST`: `smtp.ionos.com`
        *   `IONOS_EMAIL_PORT`: `587` (or `465` if using SSL)
        *   `IONOS_EMAIL_SECURE`: `false` (for port 587 STARTTLS) or `true` (for port 465 SSL)
        *   `IONOS_EMAIL_USER`: Your IONOS SMTP username (e.g., `noreply@cleanedgeremoval.com`)
        *   `IONOS_EMAIL_PASSWORD`: Your IONOS SMTP password.
        *   `JWT_SECRET`, `JWT_REFRESH_SECRET`: Generate strong, unique secret strings for these.
    *   **`client/.env.development`:**
        *   `REACT_APP_API_URL`: `http://localhost:5000/api` (Assuming the backend runs on port 5000 locally). Adjust if your local backend port differs.
        *   `REACT_APP_GOOGLE_MAPS_API_KEY`: Obtain a valid Google Maps API key from the Google Cloud Console, enabling necessary APIs (Maps JavaScript API, Geocoding API, Directions API).
        *   `REACT_APP_STRIPE_PUBLIC_KEY`: Obtain your Stripe publishable key from the Stripe dashboard.
    *   Fill in any other required API keys or configuration values as documented in `docs/environment-configuration-new.md`.

### Database Setup (IONOS MySQL)

The primary database is hosted on IONOS. No local database setup is strictly required for standard development *if* you are connecting directly to the IONOS development/staging database.

*   **Connection:** Ensure the `server/.env.development` file contains the correct IONOS MySQL credentials (Host, Port, User, Password, Database Name).
*   **Schema Initialization/Migrations:** The project should include scripts or utilize the chosen ORM's migration features to initialize the schema and apply updates. Check the `server/package.json` scripts section for commands like `db:migrate`, `db:seed`, or `db:init`. Execute the appropriate command as needed:
    ```bash
    cd server
    npm run db:migrate # Example command - replace with actual script name
    npm run db:seed   # Example command - replace with actual script name
    cd ..
    ```
*   **Local Test Database (Optional):** If you need a local MySQL database for isolated testing, install MySQL Server locally, create a database and user, update a separate `.env.test` file with local credentials, and use the ORM migration scripts to set up the schema.

## Running the Application

### Development Mode

This mode provides hot-reloading for both frontend and backend, facilitating rapid development.

1.  **Ensure all dependencies are installed** (`npm install` in the root directory).
2.  **Ensure environment files are created and populated** (`.env`, `client/.env.development`, `server/.env.development`).
3.  **Start both client and server concurrently:** From the **root** project directory, run:
    ```bash
    npm run dev
    ```
    This command typically uses a tool like `concurrently` (check root `package.json`) to start both the client (`npm run dev` in `client/`) and server (`npm run dev` in `server/`) development servers simultaneously.
4.  **Access:**
    *   **Frontend Application:** Open your web browser to [http://localhost:3000](http://localhost:3000) (or the port specified by the client dev server output).
    *   **Backend API:** The API will be accessible, usually via the frontend's proxy or directly at [http://localhost:5000/api](http://localhost:5000/api) (or the port specified in `server/.env.development` and server startup logs).
    *   **API Documentation (Swagger):** If configured, access Swagger UI at [http://localhost:5000/api-docs](http://localhost:5000/api-docs) (or the configured path).

### Production Mode (Local Simulation)

To test the production build locally:

1.  **Build the application:** From the **root** directory:
    ```bash
    npm run build
    ```
    This should trigger build scripts in both `client/` and `server/` directories, creating optimized production assets (e.g., in `client/build` and `server/dist`).
2.  **Run the production server:** From the **server** directory:
    ```bash
    cd server
    npm start
    ```
    This command typically runs the compiled JavaScript output from the `server/dist` directory using Node.js.
3.  **Access:** Open your browser to [http://localhost:5000](http://localhost:5000) (or the port specified in `server/.env.production` if different). The production server should be configured to serve the client's static build files and handle API requests.

## Testing

Execute tests to ensure code quality and functionality.

1.  **Run All Tests:** From the **root** directory:
    ```bash
    npm test
    ```
    This should execute test scripts defined in the `client/`, `server/`, and `shared/` packages.

2.  **Run Package-Specific Tests:**
    *   **Client:**
        ```bash
        cd client
        npm test
        ```
    *   **Server:**
        ```bash
        cd server
        npm test
        ```
    *   **Shared:**
        ```bash
        cd shared
        npm test
        ```

3.  **Run End-to-End (E2E) Tests (Cypress):**
    *   Ensure the application is running (either `npm run dev` or `npm start` after building).
    *   Open the Cypress test runner: From the **root** directory:
        ```bash
        npm run cypress:open
        # Or run headlessly:
        # npm run cypress:run
        ```

## Linting and Formatting

Maintain code consistency and quality using ESLint and Prettier.

1.  **Lint Code:** From the **root** directory:
    ```bash
    npm run lint
    ```
    This should run ESLint across all packages. Run `npm run lint:fix` to automatically fix fixable issues.

2.  **Format Code:** From the **root** directory:
    ```bash
    npm run format
    ```
    This should run Prettier to format code across all packages.

3.  **Git Hooks:** Husky and lint-staged should be configured (check root `package.json` and `.husky/`) to automatically lint and format staged files before committing.

## Deployment

Deployment targets the IONOS platform using Git integration via GitHub Actions (planned). Manual deployment via FTP is also possible as a fallback or alternative.

*   **Primary Method (Planned):** GitHub Actions workflow triggered on pushes/merges to specific branches (e.g., `main` for production, `develop` for staging). The workflow will build, test, and deploy the application artifacts to the configured IONOS hosting spaces. Refer to the specific workflow file (e.g., `.github/workflows/deploy.yml`) once created.
*   **Manual FTP Deployment:** Refer to the detailed steps in `docs/ionos-integration-guide-new.md`. Requires FTP credentials configured in environment variables or passed securely.
*   **Deployment Script:** The `scripts/deploy-ionos.js` script (invoked via `npm run deploy:ionos:staging` or `npm run deploy:ionos:production`) automates the FTP deployment process. Ensure IONOS FTP environment variables are set correctly before running.

## Project Documentation

Key documentation files providing further detail:

*   `development-plan-new.md`: Overall project plan, phases, detailed task breakdown, and current status.
*   `Phasechecklist-new.txt`: Granular checklist tracking task completion.
*   `file-tree-new.md`: Detailed project file and directory structure.
*   `component-hierarchy-new.md`: Frontend React component structure.
*   `api-endpoints-new.md`: Definition of backend REST API endpoints.
*   `database-models-new.md`: Detailed MySQL database schema definition.
*   `authentication-flow-new.md`: Explanation of authentication mechanisms and flows.
*   `integration-services-new.md`: Overview of planned external service integrations (Google, Stripe, Twilio).
*   `docs/environment-configuration-new.md`: Detailed guide to environment variables.
*   `docs/ionos-integration-guide-new.md`: Specific guide for configuring and deploying to IONOS.
*   `requiredimages.md`: Prompts for generating required vector images.

## Contributing

(Add contribution guidelines here if applicable - e.g., branching strategy, code review process, commit message format).

## License

(Specify project license - e.g., MIT, ISC, Proprietary).