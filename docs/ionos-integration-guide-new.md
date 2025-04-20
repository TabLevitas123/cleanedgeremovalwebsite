# IONOS Integration Guide for Clean Edge Removal LLC Website (Updated 2025-04-20)

This document provides exhaustively detailed instructions for setting up, configuring, and integrating IONOS services specifically for the Clean Edge Removal LLC website project. It covers domain configuration, web hosting setup (including Node.js and MySQL), email service configuration (SMTP), DNS record management, SSL certificate installation, and deployment procedures using IONOS Git integration (planned) and FTP (manual/scripted). Strict adherence to these steps is necessary for a correctly functioning development, staging, and production environment hosted entirely on IONOS.

## Table of Contents

1.  [Prerequisites](#1-prerequisites)
2.  [Domain Configuration](#2-domain-configuration)
    *   [Registering a New Domain](#registering-a-new-domain-with-ionos)
    *   [Transferring an Existing Domain](#transferring-an-existing-domain-to-ionos)
    *   [Setting Up Required Subdomains](#setting-up-required-subdomains)
3.  [Hosting Package Setup](#3-hosting-package-setup)
    *   [Selecting and Configuring Web Hosting](#selecting-and-configuring-web-hosting)
    *   [Configuring Hosting for Node.js Runtime](#configuring-hosting-for-nodejs-runtime)
4.  [IONOS Managed MySQL Database Setup](#4-ionos-managed-mysql-database-setup)
    *   [Creating the MySQL Database](#creating-the-mysql-database)
    *   [Obtaining Connection Credentials](#obtaining-connection-credentials)
    *   [Configuring Application Environment](#configuring-application-environment)
5.  [IONOS Email Configuration](#5-ionos-email-configuration)
    *   [Creating Required Email Accounts](#creating-required-email-accounts)
    *   [Configuring Application for IONOS SMTP](#configuring-application-for-ionos-smtp)
    *   [Setting Up Email Forwarding (Optional)](#setting-up-email-forwarding-optional)
6.  [DNS Configuration](#6-dns-configuration)
    *   [Configuring Essential DNS Records](#configuring-essential-dns-records)
7.  [SSL Certificate Installation](#7-ssl-certificate-installation)
    *   [Obtaining and Installing SSL Certificates](#obtaining-and-installing-ssl-certificates)
8.  [Deployment Process](#8-deployment-process)
    *   [Deployment Strategy Overview (Git Integration vs. FTP)](#deployment-strategy-overview-git-integration-vs-ftp)
    *   [Preparing Application Build Artifacts](#preparing-application-build-artifacts)
    *   [Deployment via FTP (Manual/Scripted)](#deployment-via-ftp-manualscripted)
    *   [Deployment via IONOS Git Integration (Planned)](#deployment-via-ionos-git-integration-planned)
9.  [Post-Deployment Steps](#9-post-deployment-steps)
    *   [Running Database Migrations/Seeding (If Applicable)](#running-database-migrationsseeding-if-applicable)
    *   [Starting the Node.js Application (Server)](#starting-the-nodejs-application-server)
    *   [Verification and Testing](#verification-and-testing)
10. [Troubleshooting Common IONOS Issues](#10-troubleshooting-common-ionos-issues)
    *   [FTP Connection Problems](#ftp-connection-problems)
    *   [Email Sending Failures](#email-sending-failures)
    *   [MySQL Database Connection Errors](#mysql-database-connection-errors)
    *   [SSL Certificate Errors](#ssl-certificate-errors)
    *   [Node.js Application Startup Failures](#nodejs-application-startup-failures)
11. [IONOS Support Information](#11-ionos-support-information)
12. [Relevant Project Files](#12-relevant-project-files)

---

## 1. Prerequisites

Before proceeding with IONOS integration, ensure the following prerequisites are met without exception:

*   **IONOS Account:** An active IONOS account ([https://www.ionos.com](https://www.ionos.com)) with administrative privileges is required.
*   **Domain Name:** The primary domain name (`cleanedgeremoval.com`) must be registered with or transferred to your IONOS account.
*   **Hosting Package:** An appropriate IONOS web hosting package capable of supporting Node.js applications (check package specifications for Node.js version support, ideally v18+) and MySQL databases must be active. Shared hosting may have limitations; a VPS or Cloud Server package might be necessary depending on resource requirements and control needed.
*   **Managed MySQL Database:** A Managed MySQL database (Version 8.0 or later) must be provisioned within your IONOS account. The specific credentials obtained during setup are critical.
*   **Email Package:** An IONOS email package associated with the domain (`cleanedgeremoval.com`) is required to create necessary mailboxes (e.g., `admin@`, `noreply@`, `info@`) and utilize IONOS SMTP for sending application emails.
*   **FTP/SFTP Credentials:** Obtain the FTP or preferably SFTP (Secure FTP) credentials associated with your IONOS web hosting space. These are required for manual or scripted deployment. Find these within the IONOS Control Panel under your hosting package details.
*   **Local Development Environment:** A correctly configured local development environment as specified in `README-new.md` (Node.js v18+, npm v9+, Git).

---

## 2. Domain Configuration

Proper domain and subdomain configuration within the IONOS Control Panel is fundamental.

### Registering a New Domain with IONOS

If `cleanedgeremoval.com` is not yet registered:

1.  Log in to the IONOS Control Panel.
2.  Navigate meticulously to the "Domains & SSL" section, then select "Domains".
3.  Click the action button labeled "Register a new domain" or similar.
4.  Use the search tool to check the availability of `cleanedgeremoval.com`.
5.  If available, proceed through the guided checkout process, ensuring all contact information is accurate. Complete the registration payment.

### Transferring an Existing Domain to IONOS

If `cleanedgeremoval.com` is currently registered with another provider:

1.  **Prepare at Current Registrar:**
    *   Unlock the domain name for transfer.
    *   Obtain the **Authorization Code** (also known as EPP code or transfer key).
    *   Ensure the administrative contact email address listed for the domain is correct and accessible, as verification emails will be sent there.
    *   Disable any domain privacy protection temporarily if it interferes with viewing the correct admin contact email during the transfer process.
2.  **Initiate Transfer in IONOS:**
    *   Log in to the IONOS Control Panel.
    *   Navigate to "Domains & SSL" > "Domains".
    *   Click the action button labeled "Transfer domain" or similar.
    *   Enter `cleanedgeremoval.com` as the domain to transfer.
    *   Follow the on-screen instructions precisely, providing the Authorization Code when prompted.
    *   Approve the transfer via the verification email sent to the administrative contact.
    *   Note: Domain transfers can take several days (typically 5-7) to complete fully. Monitor the status in both registrar control panels.

### Setting Up Required Subdomains

The application requires specific subdomains pointing to the appropriate hosting resources. Create the following within IONOS:

*   `www` (for `www.cleanedgeremoval.com` - typically handled by default or via A/CNAME record)
*   `api` (for `api.cleanedgeremoval.com` - points to the server hosting the backend API)
*   `admin` (for `admin.cleanedgeremoval.com` - points to the server/directory hosting the admin portal frontend, potentially the same as `www` if served by the main client app)

**Creation Steps:**

1.  Navigate to "Domains & SSL" > "Domains" in the IONOS Control Panel.
2.  Select the `cleanedgeremoval.com` domain.
3.  Locate and click the "Subdomains" management option.
4.  Click "Add Subdomain".
5.  Enter the subdomain prefix precisely (e.g., `api`, `admin`).
6.  Associate the subdomain with the correct destination (this might be linking it to the main hosting package's webspace or potentially a different target if using separate hosting resources, although typically they point to the same IP via DNS A records later). Follow IONOS's specific workflow for subdomain creation.
7.  Repeat steps 4-6 for each required subdomain (`api`, `admin`). The `www` subdomain might already exist or be configurable via DNS CNAME/A records instead of explicit subdomain creation, depending on IONOS setup.

---

## 3. Hosting Package Setup

Configure the IONOS web hosting package to support the application.

### Selecting and Configuring Web Hosting

1.  Log in to the IONOS Control Panel.
2.  Navigate to "Hosting".
3.  Ensure you have an active Web Hosting package suitable for Node.js applications and sufficient resources (disk space, memory, CPU, bandwidth). Consult IONOS package details if unsure. Upgrade if necessary.
4.  Associate the primary domain (`cleanedgeremoval.com`) and potentially the subdomains with this hosting package during setup or via the package settings if not already done.

### Configuring Hosting for Node.js Runtime

1.  Navigate to the settings or management section of your specific IONOS Web Hosting package.
2.  Look for options related to "Website Settings", "Scripting Languages", "Programming Languages", or similar.
3.  Locate the Node.js configuration section.
4.  **Enable Node.js support.**
5.  **Select the correct Node.js version:** Choose version **18.x** (or the latest available v18 LTS) to match the project's requirement. Using an incorrect version will likely cause runtime errors.
6.  **Specify the Application Startup File:** Configure the hosting environment to run your backend application's entry point. This is typically `index.js` (the compiled output in `server/dist/index.js`). You might need to configure this via an `.htaccess` file, a specific IONOS panel setting, or by ensuring your `package.json`'s `start` script points correctly and IONOS uses it. Consult IONOS documentation for Node.js deployment specifics on your package type.
7.  Save all configuration changes.

---

## 4. IONOS Managed MySQL Database Setup

Set up the required MySQL database instance within IONOS.

### Creating the MySQL Database

1.  Log in to the IONOS Control Panel.
2.  Navigate to the "Hosting" section, then find "Databases" or "MySQL Databases".
3.  Click the action button to "Create Database" or "Add Database".
4.  Select **MySQL** as the database type.
5.  Choose a suitable MySQL version (Version **8.0** or later is required).
6.  Provide a **Description** or **Database Name:** Use `cleanedgeremoval` for consistency.
7.  Create a **Database User:** Define a username (e.g., `cer_user`, or use the auto-generated one if provided).
8.  Create a **Strong Password:** Generate or define a highly secure password for this database user. **Record this password immediately and securely.**
9.  Confirm the creation process.

### Obtaining Connection Credentials

1.  Once the database is created, navigate back to the database management section in the IONOS Control Panel.
2.  Select the newly created `cleanedgeremoval` database.
3.  Locate the **Connection Details** section. This section is critical and must contain:
    *   **Hostname:** (e.g., `db5017699173.hosting-data.io` - **Use the specific hostname provided by IONOS**, do not guess).
    *   **Port:** `3306` (Standard MySQL port).
    *   **Database Name:** `cleanedgeremoval` (The name you assigned).
    *   **Username:** The database username you created or were assigned.
    *   **Password:** The secure password you created or were assigned.
4.  **Meticulously record these exact credentials.** They are essential for the application configuration.

### Configuring Application Environment

1.  Open the server-side development environment file: `server/.env.development`.
2.  Locate the database configuration variables.
3.  Update the values precisely using the credentials obtained from the IONOS Control Panel:
    ```dotenv
    DB_HOST=db5017699173.hosting-data.io # Replace with your actual IONOS DB Hostname
    DB_PORT=3306
    DB_NAME=cleanedgeremoval
    DB_USER=dbu3934010                 # Replace with your actual IONOS DB Username
    DB_PASSWORD=YourSecurePasswordHere # Replace with your actual IONOS DB Password
    DB_SSL=false                       # Verify if IONOS requires/offers SSL connections for MySQL
    # DB_POOL_MIN=... (Optional, configure based on ORM defaults/needs)
    # DB_POOL_MAX=... (Optional, configure based on ORM defaults/needs)
    # DB_DEBUG=... (Set to true only for deep debugging)
    ```
4.  Repeat this process for `server/.env.production` and `server/.env.test` using the appropriate credentials for each environment (you might need separate IONOS databases for staging/production).
5.  Ensure the `.env.*` files are correctly listed in `.gitignore`.

---

## 5. IONOS Email Configuration

Configure IONOS email accounts and application settings for sending emails via SMTP.

### Creating Required Email Accounts

1.  Log in to the IONOS Control Panel.
2.  Navigate to the "Email" section.
3.  Click "Create Email Account" or similar action.
4.  Create the necessary mailboxes under the `cleanedgeremoval.com` domain:
    *   `admin@cleanedgeremoval.com` (For receiving quote requests, system alerts)
    *   `noreply@cleanedgeremoval.com` (For sending automated emails like confirmations, password resets)
    *   `info@cleanedgeremoval.com` (General contact, potentially used as Reply-To)
    *   (Optional: `support@cleanedgeremoval.com`)
5.  For each account, assign a strong, unique password. **Record these passwords securely.**

### Configuring Application for IONOS SMTP

1.  Open the server-side environment file (e.g., `server/.env.development`).
2.  Locate or add the IONOS Email configuration variables.
3.  Update the values precisely:
    ```dotenv
    # IONOS Email Configuration (SMTP)
    IONOS_EMAIL_HOST=smtp.ionos.com
    IONOS_EMAIL_PORT=587 # Standard port for TLS/STARTTLS
    IONOS_EMAIL_SECURE=false # Set to false for STARTTLS on port 587. Set to true if using port 465 (SSL).
    IONOS_EMAIL_USER=noreply@cleanedgeremoval.com # The sending mailbox username
    IONOS_EMAIL_PASSWORD=YourNoReplyPasswordHere # The password for the sending mailbox
    IONOS_EMAIL_FROM="Clean Edge Removal <noreply@cleanedgeremoval.com>" # Sender name and address
    IONOS_EMAIL_REPLY_TO=info@cleanedgeremoval.com # Optional: Address for replies
    ```
4.  Ensure the `server/src/config/ionos.ts` (or equivalent mailer config) correctly loads these variables.
5.  Ensure the `server/src/services/ionosEmail.service.ts` uses these credentials when initializing the Nodemailer transport.

### Setting Up Email Forwarding (Optional)

If you want emails sent to `admin@` or `info@` to be forwarded to another address:

1.  Navigate to "Email" in the IONOS Control Panel.
2.  Select the specific email account (e.g., `admin@cleanedgeremoval.com`).
3.  Find the "Forwarding" or "Auto Forward" settings.
4.  Enter the destination email address(es).
5.  Save the configuration.

---

## 6. DNS Configuration

Ensure DNS records within IONOS correctly point the domain and subdomains to the hosting server IP address and configure email routing.

### Configuring Essential DNS Records

1.  Log in to the IONOS Control Panel.
2.  Navigate to "Domains & SSL" > "Domains".
3.  Select the `cleanedgeremoval.com` domain.
4.  Click the "DNS" management option.
5.  Verify or create/update the following records (replace `Your_IONOS_Hosting_IP` with the actual IP address assigned to your web hosting package):

    *   **A Records (Address Mapping):**
        *   Host Name: `@` (Represents the root domain), Type: `A`, Value: `Your_IONOS_Hosting_IP`, TTL: `1 hour` (or 3600 seconds)
        *   Host Name: `www`, Type: `A`, Value: `Your_IONOS_Hosting_IP`, TTL: `1 hour`
        *   Host Name: `api`, Type: `A`, Value: `Your_IONOS_Hosting_IP`, TTL: `1 hour`
        *   Host Name: `admin`, Type: `A`, Value: `Your_IONOS_Hosting_IP`, TTL: `1 hour`
        *(Note: Alternatively, `www` and `admin` could be CNAME records pointing to `@` if preferred, but A records are generally straightforward)*

    *   **MX Records (Mail Exchanger):** These direct email for the domain to IONOS mail servers. They should typically be pre-configured by IONOS when using their email service. Verify they exist and point to IONOS mail servers (e.g., `mx00.ionos.com`, `mx01.ionos.com`) with appropriate priorities (e.g., 10, 20).
        *   Host Name: `@`, Type: `MX`, Priority: `10`, Value: `mx00.ionos.com.` (Note trailing dot)
        *   Host Name: `@`, Type: `MX`, Priority: `20`, Value: `mx01.ionos.com.` (Note trailing dot)

    *   **TXT Records (Text Records):**
        *   **SPF (Sender Policy Framework):** Essential for email deliverability and preventing spoofing. Add or verify a TXT record for the root domain (`@`) with a value like: `"v=spf1 include:_spf.ionos.com ~all"` (Consult IONOS documentation for their exact recommended SPF record).
        *   **DKIM (DomainKeys Identified Mail):** IONOS typically handles DKIM automatically for emails sent through their servers when using their email package. Check email settings within IONOS for DKIM status or required DNS records if any.
        *   **DMARC (Domain-based Message Authentication, Reporting & Conformance):** Recommended for enhanced email security. Create a TXT record for `_dmarc` with a basic policy like `"v=DMARC1; p=none; rua=mailto:dmarc-reports@cleanedgeremoval.com"` (replace email with a mailbox to receive reports). Start with `p=none` and gradually increase enforcement (`quarantine`, `reject`) after monitoring reports.

6.  Allow sufficient time for DNS propagation (can range from minutes to 48 hours, though typically faster).

---

## 7. SSL Certificate Installation

Secure the domain and subdomains with SSL/TLS certificates.

### Obtaining and Installing SSL Certificates

1.  Navigate to "Domains & SSL" > "SSL Certificates" in the IONOS Control Panel.
2.  IONOS often provides a free DV (Domain Validated) SSL certificate (e.g., DigiCert) with hosting packages. Check if one is already assigned or available for activation for `cleanedgeremoval.com`.
3.  If no certificate is available or a different type is needed (e.g., OV - Organization Validated, EV - Extended Validation), click "Order SSL Certificate" or similar.
4.  Select the domain (`cleanedgeremoval.com`) and choose the desired certificate type. DV is usually sufficient.
5.  Complete the validation process (often automatic via DNS or file upload if IONOS manages the domain and hosting).
6.  Once the certificate is issued and validated, navigate back to the SSL Certificates section.
7.  Find the certificate for `cleanedgeremoval.com`.
8.  Click "Assign" or "Manage Assignment" or "Install".
9.  Select the domain (`cleanedgeremoval.com`) and **all** required subdomains (`www`, `api`, `admin`) to be secured by this certificate. Most standard DV certificates cover the root and `www`. Ensure the chosen certificate covers multiple subdomains if needed, or obtain separate certificates/a wildcard certificate.
10. Confirm the installation/assignment. IONOS will typically handle the installation on their servers.
11. **Enable HTTPS Redirection:** After installation, find the setting within your domain or hosting configuration to automatically redirect all HTTP traffic to HTTPS. This is crucial for security.

---

## 8. Deployment Process

Deploying the built application artifacts (`client/build` and `server/dist`) to the IONOS hosting environment.

### Deployment Strategy Overview (Git Integration vs. FTP)

*   **IONOS Git Integration (Planned - Preferred):** IONOS offers Git integration for deployment on some hosting packages. This allows pushing code to a designated Git repository (potentially the main GitHub repo or a dedicated IONOS Git repo) to trigger automatic deployment. This is the preferred method if available and will be configured via GitHub Actions. **(Requires further investigation and setup within IONOS and GitHub Actions).**
*   **FTP/SFTP (Manual/Scripted - Fallback):** Deploying via FTP or SFTP involves manually uploading the built files or using a script (like `scripts/deploy-ionos.js`) to automate the upload.

### Preparing Application Build Artifacts

1.  Ensure all code changes are committed to Git.
2.  Pull the latest changes from the main development branch.
3.  Install all dependencies from the root directory: `npm install`
4.  Run linters and formatters: `npm run lint`, `npm run format`
5.  Run all tests to ensure stability: `npm test`
6.  Create production builds for both client and server: From the **root** directory:
    ```bash
    npm run build
    ```
    This command must successfully generate the following output directories:
    *   `client/build/` (Contains optimized static assets for the frontend)
    *   `server/dist/` (Contains compiled JavaScript code for the backend)

### Deployment via FTP (Manual/Scripted)

1.  **Configure FTP Credentials:** Ensure the correct IONOS FTP/SFTP host, user, password, and target root directory are set in the environment variables used by the deployment script (`scripts/deploy-ionos.js`) or available for manual upload. These variables are typically `IONOS_FTP_HOST`, `IONOS_FTP_PORT` (usually 21 for FTP, 22 for SFTP), `IONOS_FTP_USER`, `IONOS_FTP_PASSWORD`, `IONOS_FTP_ROOT_DIR`.
2.  **Run Deployment Script (Recommended for Automation):**
    ```bash
    # Ensure production environment variables are set if the script uses them
    # Deploy to the appropriate environment (staging or production)
    npm run deploy:ionos:production # Or deploy:ionos:staging
    ```
    The script (`scripts/deploy-ionos.js`) should handle connecting via FTP/SFTP, creating necessary directories on the server (if they don't exist), uploading the contents of `client/build` to the public web root (e.g., `/htdocs/` or `/`), uploading the contents of `server/dist` to a designated server directory (e.g., `/api/` or `/server/`), and uploading the correct production environment file (`server/.env.production` renamed to `.env` on the server).
3.  **Manual FTP Upload (If Script Fails or Not Used):**
    *   Connect to the IONOS server using an FTP/SFTP client (e.g., FileZilla, WinSCP).
    *   Navigate to the web root directory for `cleanedgeremoval.com` (consult IONOS docs, often `/` or `/htdocs/`). Delete existing files if necessary (backup first!). Upload the **contents** of your local `client/build/` directory here.
    *   Navigate to the directory designated for the backend server application (e.g., create a `/server` or `/api` directory outside the web root if possible, or within it if required by IONOS). Delete existing files if necessary. Upload the **contents** of your local `server/dist/` directory here.
    *   Upload your local `server/.env.production` file into the server application directory and rename it to `.env`. Ensure file permissions are secure.

### Deployment via IONOS Git Integration (Planned)

*(This section requires specific setup within the IONOS Control Panel and GitHub Actions)*

1.  **Configure IONOS Git Deployment:** Within the IONOS Control Panel hosting settings, locate the Git deployment option. Configure it to link to the project's GitHub repository (`https://www.github.com/tablevitas123/cleanedgeremovalwebsite`). Specify the branch to deploy from (e.g., `main` for production). Configure the target directories on the IONOS server for the deployment. Set up build commands if IONOS supports running them (e.g., `npm install && npm run build`).
2.  **Configure GitHub Actions Workflow:** Create a workflow file (e.g., `.github/workflows/deploy-ionos.yml`) that triggers on pushes to the deployment branch (`main`). This workflow might simply push to the configured IONOS Git remote, or it might perform build steps and then push the artifacts if IONOS doesn't run the build itself.

---

## 9. Post-Deployment Steps

After files are uploaded or deployed via Git:

### Running Database Migrations/Seeding (If Applicable)

If the deployment involved database schema changes or requires initial data:

1.  Access the server environment (e.g., via SSH if using a VPS/Cloud Server, or potentially through IONOS control panel tools if available on shared hosting).
2.  Navigate to the server application directory (e.g., `/server`).
3.  Run the necessary database migration and/or seeding commands defined in `server/package.json`:
    ```bash
    npm run db:migrate:prod # Example command
    npm run db:seed:prod    # Example command
    ```

### Starting the Node.js Application (Server)

The backend Node.js server needs to be running to handle API requests.

*   **IONOS Managed Node.js:** If using IONOS's integrated Node.js support, the platform should automatically start the application based on the configured startup file (e.g., `server/dist/index.js`) or the `start` script in `server/package.json`. Restarting might be done through the IONOS control panel.
*   **VPS/Cloud Server:** If deploying to a VPS, use a process manager like PM2 to start and manage the Node.js application reliably.
    ```bash
    # Navigate to server directory
    cd /path/to/your/server/app
    # Install PM2 globally if not already done
    # npm install -g pm2
    # Start or restart the application
    pm2 startOrRestart ecosystem.config.js --env production # Assuming an ecosystem file
    # Or directly:
    # pm2 start dist/index.js --name cleanedgeremoval-api --env production
    # pm2 save # Save process list for reboot persistence
    ```

### Verification and Testing

1.  Access the public website (`https://www.cleanedgeremoval.com`) and verify all sections load correctly.
2.  Test core functionalities, especially the quote request form submission.
3.  Access the admin portal (`https://admin.cleanedgeremoval.com` or `/settings`) and attempt login.
4.  Check server logs within IONOS or via SSH for any startup errors.
5.  Perform basic API endpoint checks using tools like Postman or `curl` against `https://api.cleanedgeremoval.com`.

---

## 10. Troubleshooting Common IONOS Issues

Refer to this section for common problems encountered during IONOS integration.

### FTP Connection Problems

*   **Incorrect Credentials:** Double-check FTP/SFTP hostname, username, and password provided by IONOS.
*   **Port Blocking:** Ensure port 21 (FTP) or 22 (SFTP) is not blocked by local or server firewalls.
*   **Passive Mode:** Try toggling passive mode in your FTP client settings.
*   **IP Restrictions:** Some IONOS packages might restrict FTP access to specific IPs. Check settings or contact support.
*   **Protocol:** Prefer SFTP over FTP for security if supported by your package.

### Email Sending Failures

*   **Incorrect SMTP Credentials:** Verify `IONOS_EMAIL_HOST`, `PORT`, `USER`, `PASSWORD` in the server's `.env` file match the IONOS mailbox credentials exactly.
*   **Incorrect Security Settings:** Ensure `IONOS_EMAIL_SECURE` matches the `IONOS_EMAIL_PORT` (`false` for 587/STARTTLS, `true` for 465/SSL).
*   **Firewall Blocking:** Ensure the server hosting the backend can make outbound connections on port 587 or 465.
*   **Sender Verification:** Ensure the `IONOS_EMAIL_FROM` address exists and is active in your IONOS email package.
*   **IONOS Limits:** Check if you have exceeded any sending limits imposed by your IONOS email plan.
*   **SPF/DKIM Issues:** Incorrect SPF or DKIM records can cause emails to be marked as spam. Verify DNS settings.

### MySQL Database Connection Errors

*   **Incorrect Credentials:** Meticulously verify `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` in the server's `.env` file against the details provided in the IONOS database management panel.
*   **Host Resolution:** Ensure the server can resolve the IONOS database hostname.
*   **Firewall/Network Access:** Confirm that the IP address of your hosting server is allowed to connect to the IONOS MySQL database instance. Check IONOS database firewall or access control settings.
*   **Database Server Status:** Verify the MySQL database server is running via the IONOS control panel.
*   **SSL Requirement:** Check if IONOS requires SSL connections for your database plan and configure the `DB_SSL` variable and ORM settings accordingly.

### SSL Certificate Errors

*   **Incomplete Installation/Assignment:** Ensure the SSL certificate is correctly issued, validated, and assigned to the domain *and all required subdomains* (`www`, `api`, `admin`) in the IONOS SSL management section.
*   **Mixed Content:** Browser errors can occur if an HTTPS page attempts to load resources (images, scripts, CSS) over HTTP. Ensure all asset URLs use HTTPS.
*   **Propagation Time:** Allow time for SSL certificate installation and DNS changes to propagate fully.
*   **Certificate Expiry:** Check the certificate's expiration date. Renew if necessary.
*   **Intermediate Certificates:** Ensure the full certificate chain (including intermediates) is correctly installed by IONOS.

### Node.js Application Startup Failures

*   **Check Logs:** Examine the Node.js application logs provided by IONOS hosting or via SSH on a VPS for specific error messages.
*   **Incorrect Startup File/Command:** Verify that IONOS is configured to run the correct entry point (e.g., `server/dist/index.js`) or the `npm start` script.
*   **Missing Dependencies:** Ensure `npm install --production` was run successfully in the server application directory after deployment.
*   **Environment Variables:** Verify all required environment variables in the server's `.env` file are present and correct for the production environment.
*   **Port Conflicts:** Ensure the port specified in `PORT` is available and not used by another process on the server.
*   **Node.js Version:** Double-check that the Node.js version configured in the IONOS hosting environment matches the project requirement (v18+).

---

## 11. IONOS Support Information

If issues persist after thorough troubleshooting based on this guide and standard debugging practices, contact IONOS technical support:

*   **Phone:** 1-866-991-2631 (Verify current number)
*   **Email:** support@ionos.com (Verify current address)
*   **Live Chat:** Typically available via the IONOS website ([https://www.ionos.com](https://www.ionos.com)).
*   **Support Center / Help Documentation:** [https://www.ionos.com/help](https://www.ionos.com/help)

Provide them with specific details about your hosting package, domain, the exact error messages encountered, and the troubleshooting steps already attempted.

---

## 12. Relevant Project Files

*   `server/src/config/ionos.ts`: Loads IONOS-specific configurations from environment variables.
*   `server/src/config/database.ts`: Configures the MySQL database connection using IONOS credentials.
*   `server/src/services/ionosEmail.service.ts`: Implements email sending via IONOS SMTP.
*   `scripts/deploy-ionos.js`: Node.js script for automating FTP deployment to IONOS.
*   `.env.example`, `client/.env.development`, `server/.env.development`, etc.: Environment variable files.
*   `docs/environment-configuration-new.md`: Detailed explanation of all environment variables.