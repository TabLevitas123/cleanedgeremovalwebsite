# IONOS Integration Guide for Clean Edge Removal LLC Website

This guide provides detailed instructions for integrating IONOS services with the Clean Edge Removal LLC website. It covers domain configuration, hosting setup, email integration, and deployment procedures.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Domain Configuration](#domain-configuration)
3. [Hosting Setup](#hosting-setup)
4. [Email Configuration](#email-configuration)
5. [DNS Configuration](#dns-configuration)
6. [Deployment Process](#deployment-process)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following:

- An IONOS account with administrative access
- Domain registered with IONOS (or transferred to IONOS)
- Appropriate hosting package for your needs
- IONOS email package (if using IONOS for email)
- FTP credentials for your IONOS hosting account
- Node.js (v18+) and npm (v9+) installed on your development machine

## Domain Configuration

### Registering a Domain with IONOS

1. Log in to your IONOS Control Panel at [ionos.com](https://www.ionos.com)
2. Navigate to "Domains & SSL" > "Domains"
3. Click "Register a new domain"
4. Search for your desired domain name (e.g., cleanedgeremoval.com)
5. Follow the checkout process to register the domain

### Transferring an Existing Domain to IONOS

1. Log in to your IONOS Control Panel
2. Navigate to "Domains & SSL" > "Domains"
3. Click "Transfer domain"
4. Enter the domain you want to transfer
5. Follow the instructions to complete the transfer
   - You'll need the authorization/EPP code from your current registrar
   - Ensure domain is unlocked at your current registrar
   - Verify admin contact email is correct

### Setting Up Subdomains

For the Clean Edge Removal website, you'll need to set up the following subdomains:

- **www.cleanedgeremoval.com** - Main website
- **api.cleanedgeremoval.com** - API server
- **admin.cleanedgeremoval.com** - Admin portal

To create these subdomains:

1. Navigate to "Domains & SSL" > "Domains"
2. Select your domain
3. Click "Subdomains"
4. Click "Add Subdomain"
5. Enter the subdomain name (e.g., "api" for api.cleanedgeremoval.com)
6. Select the appropriate hosting package
7. Click "Create"

## Hosting Setup

### Setting Up Web Hosting

1. Log in to your IONOS Control Panel
2. Navigate to "Hosting" > "Hosting Packages"
3. Select an appropriate hosting package or click "Create Hosting Package"
4. Follow the setup wizard to configure your hosting
   - Select the domain to associate with this hosting
   - Choose the appropriate performance level
   - Select additional features as needed

### Configuring Hosting for Node.js

IONOS supports Node.js applications through their hosting packages. To configure:

1. Navigate to "Hosting" > "Hosting Packages"
2. Select your hosting package
3. Click "Settings" > "Programming Language"
4. Select "Node.js" and choose the appropriate version (v18+ recommended)
5. Click "Save"

### Setting Up Databases

1. Navigate to "Databases" > "MySQL Databases" (or "MongoDB" if available)
2. Click "Create Database"
3. Configure your database:
   - Enter a database name (e.g., "cleanedgeremoval")
   - Create a database user with a strong password
   - Select the appropriate database version
4. Note the database connection details:
   - Host: Usually provided in the database details
   - Port: Usually 3306 for MySQL or 27017 for MongoDB
   - Username: The database user you created
   - Password: The password you set
   - Database name: The name you specified

Update your `.env` file with these database connection details.

## Email Configuration

### Setting Up Email Accounts

1. Navigate to "Email" > "Email Accounts"
2. Click "Create Email Account"
3. Configure your email account:
   - Enter the email address (e.g., info@cleanedgeremoval.com)
   - Set a strong password
   - Select the appropriate storage size
4. Repeat for additional email accounts:
   - admin@cleanedgeremoval.com
   - noreply@cleanedgeremoval.com
   - support@cleanedgeremoval.com

### Configuring SMTP Settings

Update your `.env` file with the IONOS SMTP settings:

```
IONOS_EMAIL_HOST=smtp.ionos.com
IONOS_EMAIL_PORT=587
IONOS_EMAIL_SECURE=false
IONOS_EMAIL_USER=noreply@cleanedgeremoval.com
IONOS_EMAIL_PASSWORD=your-email-password
IONOS_EMAIL_FROM=noreply@cleanedgeremoval.com
IONOS_EMAIL_REPLY_TO=info@cleanedgeremoval.com
```

### Setting Up Email Forwarding (Optional)

1. Navigate to "Email" > "Email Accounts"
2. Select the email account you want to set up forwarding for
3. Click "Forwarding"
4. Enter the email address to forward to
5. Click "Save"

## DNS Configuration

### Configuring DNS Records

1. Navigate to "Domains & SSL" > "Domains"
2. Select your domain
3. Click "DNS"
4. Configure the following records:

#### A Records

| Name | Type | Value | TTL |
|------|------|-------|-----|
| @ | A | Your IONOS hosting IP | 3600 |
| www | A | Your IONOS hosting IP | 3600 |
| api | A | Your IONOS hosting IP | 3600 |
| admin | A | Your IONOS hosting IP | 3600 |

#### MX Records

| Name | Type | Priority | Value | TTL |
|------|------|----------|-------|-----|
| @ | MX | 10 | mx00.ionos.com | 3600 |
| @ | MX | 20 | mx01.ionos.com | 3600 |

#### TXT Records

| Name | Type | Value | TTL |
|------|------|-------|-----|
| @ | TXT | v=spf1 include:spf.ionos.com ~all | 3600 |

#### CNAME Records

| Name | Type | Value | TTL |
|------|------|-------|-----|
| mail | CNAME | mail.ionos.com | 3600 |
| webmail | CNAME | webmail.ionos.com | 3600 |

### Setting Up SSL Certificates

1. Navigate to "Domains & SSL" > "SSL Certificates"
2. Click "Order SSL Certificate"
3. Select your domain
4. Choose the appropriate SSL certificate type
   - DV (Domain Validation) is sufficient for most websites
   - Consider EV (Extended Validation) for enhanced trust
5. Follow the verification process
6. Once verified, install the certificate:
   - Navigate to "Domains & SSL" > "SSL Certificates"
   - Find your certificate and click "Install"
   - Select the domains and subdomains to secure
   - Click "Install Certificate"

## Deployment Process

### Preparing for Deployment

1. Build your application:
   ```bash
   npm run build
   ```

2. Ensure your environment variables are set correctly in `.env.production`

### Deploying with the Deployment Script

The project includes a deployment script for IONOS hosting. To use it:

1. Ensure you have the required dependencies:
   ```bash
   npm install
   ```

2. Set up your IONOS FTP credentials in your `.env` file:
   ```
   IONOS_FTP_HOST=ftp.ionos.com
   IONOS_FTP_PORT=21
   IONOS_FTP_USER=your-ftp-username
   IONOS_FTP_PASSWORD=your-ftp-password
   IONOS_FTP_ROOT_DIR=/
   ```

3. Run the deployment script:
   ```bash
   # Deploy to staging
   npm run deploy:ionos:staging
   
   # Deploy to production
   npm run deploy:ionos:production
   ```

### Manual Deployment via FTP

If you prefer to deploy manually:

1. Connect to your IONOS hosting using an FTP client:
   - Host: ftp.ionos.com (or as provided by IONOS)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

2. Upload the contents of the `client/build` directory to the web root directory for your domain

3. Upload the contents of the `server/dist` directory to the appropriate directory for your API server

4. Upload your `.env.production` file as `.env` to the server directory

5. Install dependencies on the server (if supported by your hosting plan):
   ```bash
   cd /path/to/server
   npm install --production
   ```

6. Restart your Node.js application (if applicable)

## Troubleshooting

### Common Issues and Solutions

#### FTP Connection Issues

- Verify your FTP credentials are correct
- Check if your IP is allowed (IONOS may have IP restrictions)
- Try using FTPS (FTP over SSL) if regular FTP fails
- Contact IONOS support if issues persist

#### Email Sending Issues

- Verify SMTP credentials are correct
- Check if port 587 is not blocked by your network
- Try port 465 with SSL enabled if 587 doesn't work
- Verify sender email address is valid and exists in your IONOS account

#### Database Connection Issues

- Verify database credentials are correct
- Check if your IP is allowed to connect to the database
- Verify the database server is running
- Contact IONOS support if issues persist

#### SSL Certificate Issues

- Ensure domain ownership verification is complete
- Check if certificate is installed correctly
- Verify certificate is not expired
- Regenerate and reinstall the certificate if needed

### IONOS Support

If you encounter issues that you cannot resolve, contact IONOS support:

- Phone: 1-866-991-2631
- Email: support@ionos.com
- Live Chat: Available on the IONOS website
- Support Center: [ionos.com/help](https://www.ionos.com/help)

## Additional Resources

- [IONOS Help Center](https://www.ionos.com/help)
- [IONOS API Documentation](https://developer.ionos.com/)
- [Node.js Deployment Guide](https://www.ionos.com/community/hosting/nodejs/how-to-deploy-a-nodejs-app-with-ionos-webhosting/)