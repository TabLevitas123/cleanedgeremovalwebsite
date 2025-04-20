# Clean Edge Removal LLC Website Project - Authentication Flow

## Authentication Architecture

The authentication system for the Clean Edge Removal LLC website uses a JWT-based authentication mechanism with role-based access control (RBAC) and multi-factor authentication (MFA) support. The system is designed to be secure, scalable, and compliant with modern security standards.

## Authentication Flows

### 1. User Registration Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │     │             │
│   Client    │────▶│   Server    │────▶│  Database   │────▶│   Email     │
│             │     │             │     │             │     │   Service   │
│             │◀────│             │◀────│             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

1. Client submits registration form with username, email, password, first name, last name, and role
2. Server validates input data
3. Server checks if username or email already exists
4. Server hashes password using bcrypt with appropriate salt rounds
5. Server creates new user record in database with status "pending"
6. Server generates email verification token
7. Server sends verification email to user's email address
8. Client receives success response with message to check email
9. User clicks verification link in email
10. Server verifies token and updates user status to "active"
11. User is redirected to login page

### 2. User Login Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│   Client    │────▶│   Server    │────▶│  Database   │
│             │     │             │     │             │
│             │◀────│             │◀────│             │
└─────────────┘     └─────────────┘     └─────────────┘
```

1. Client submits login form with username/email and password
2. Server validates input data
3. Server retrieves user record from database
4. Server checks if user exists and is active
5. Server verifies password hash
6. Server checks if MFA is enabled for user
   a. If MFA is enabled, server generates MFA challenge and returns it to client
   b. If MFA is not enabled, proceed to step 9
7. Client displays MFA input form
8. Client submits MFA token
9. Server verifies MFA token (if applicable)
10. Server generates JWT access token with user information and permissions
11. Server generates refresh token and stores it in database
12. Server returns access token, refresh token, and user information to client
13. Client stores tokens securely (access token in memory, refresh token in HTTP-only cookie)
14. Client redirects to appropriate dashboard based on user role

### 3. Multi-Factor Authentication (MFA) Setup Flow

```
┌─────────────┐     ┌─────────────┐
│             │     │             │
│   Client    │────▶│   Server    │
│             │     │             │
│             │◀────│             │
└─────────────┘     └─────────────┘
```

1. Authenticated user requests to enable MFA
2. Server generates MFA secret
3. Server returns MFA secret and QR code to client
4. Client displays QR code for user to scan with authenticator app
5. User scans QR code with authenticator app
6. User enters verification code from authenticator app
7. Client submits verification code to server
8. Server verifies code against MFA secret
9. Server enables MFA for user and stores MFA secret
10. Server returns success response to client

### 4. Password Reset Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │     │             │
│   Client    │────▶│   Server    │────▶│  Database   │────▶│   Email     │
│             │     │             │     │             │     │   Service   │
│             │◀────│             │◀────│             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

1. User requests password reset by providing email address
2. Server validates email address
3. Server generates password reset token with expiration (1 hour)
4. Server stores token and expiration in database
5. Server sends password reset email with token link
6. User clicks reset link in email
7. Client displays password reset form
8. User enters new password
9. Client submits new password and token to server
10. Server verifies token validity and expiration
11. Server hashes new password
12. Server updates user's password in database
13. Server invalidates all existing refresh tokens for user
14. Server returns success response to client
15. Client redirects to login page

### 5. Token Refresh Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│   Client    │────▶│   Server    │────▶│  Database   │
│             │     │             │     │             │
│             │◀────│             │◀────│             │
└─────────────┘     └─────────────┘     └─────────────┘
```

1. Client detects access token is expired or about to expire
2. Client sends refresh token to server
3. Server validates refresh token
4. Server checks if refresh token exists in database and is not expired
5. Server generates new access token
6. Server generates new refresh token (token rotation)
7. Server invalidates old refresh token in database
8. Server stores new refresh token in database
9. Server returns new access token and refresh token to client
10. Client updates stored tokens

### 6. Logout Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│   Client    │────▶│   Server    │────▶│  Database   │
│             │     │             │     │             │
│             │◀────│             │◀────│             │
└─────────────┘     └─────────────┘     └─────────────┘
```

1. User initiates logout
2. Client sends refresh token to server
3. Server invalidates refresh token in database
4. Server returns success response to client
5. Client clears access token from memory
6. Client clears refresh token cookie
7. Client redirects to login page

## Role-Based Access Control (RBAC)

The system implements role-based access control with the following roles:

1. **Administrator**
   - Full access to all features and data
   - Can manage users, roles, and permissions
   - Can configure system settings
   - Can access all reports and analytics

2. **Employee**
   - Limited access to time tracking and appointment information
   - Can view and update assigned appointments
   - Can track work time and activities
   - Can view customer information for assigned appointments
   - Cannot access administrative functions

3. **Receptionist**
   - Access to scheduling and customer information
   - Can create and manage appointments
   - Can create and update customer records
   - Can view service information
   - Cannot access employee time tracking or administrative functions

### Permission Structure

Permissions are structured as resource-action pairs:

```
{resource}.{action}
```

Examples:
- `users.create`
- `users.read`
- `users.update`
- `users.delete`
- `appointments.create`
- `appointments.read`
- `appointments.update`
- `appointments.delete`

Each role is assigned a set of permissions that determine what actions they can perform on which resources.

## Security Measures

### Token Security

1. **Access Tokens**
   - JWT format with RSA-256 signing
   - Short expiration time (15 minutes)
   - Contains user ID, role, and permissions
   - Stored in memory (not in localStorage or cookies)

2. **Refresh Tokens**
   - Long random string (64 characters)
   - Longer expiration time (30 days)
   - Stored in HTTP-only, secure, SameSite=strict cookie
   - Rotated on each use (token rotation)
   - One refresh token per device/session

### Password Security

1. **Password Requirements**
   - Minimum 12 characters for administrative accounts
   - Minimum 8 characters for employee accounts
   - Must contain uppercase, lowercase, number, and special character
   - Password entropy validation

2. **Password Storage**
   - Bcrypt hashing with appropriate salt rounds
   - No plain-text passwords stored anywhere

### Account Protection

1. **Brute Force Protection**
   - Account lockout after 5 failed attempts (10-minute duration)
   - Progressive delays between login attempts
   - IP-based rate limiting

2. **Session Management**
   - Automatic session timeout after 30 minutes of inactivity
   - Concurrent session limitations
   - Ability to view and terminate active sessions

### Multi-Factor Authentication

1. **MFA Methods**
   - Time-based One-Time Password (TOTP) via authenticator apps
   - SMS fallback option (less secure, but more accessible)

2. **MFA Enforcement**
   - Required for administrative accounts
   - Optional for employee accounts
   - Recovery codes provided for emergency access

## Authentication Sequence Diagrams

### Login Sequence (Without MFA)

```
┌─────────┐                            ┌─────────┐                            ┌─────────┐
│         │                            │         │                            │         │
│ Client  │                            │ Server  │                            │ Database│
│         │                            │         │                            │         │
└────┬────┘                            └────┬────┘                            └────┬────┘
     │                                      │                                      │
     │ POST /api/auth/login                 │                                      │
     │ {username, password}                 │                                      │
     │─────────────────────────────────────▶│                                      │
     │                                      │                                      │
     │                                      │ Query user by username               │
     │                                      │─────────────────────────────────────▶│
     │                                      │                                      │
     │                                      │ Return user record                   │
     │                                      │◀─────────────────────────────────────│
     │                                      │                                      │
     │                                      │ Verify password                      │
     │                                      │                                      │
     │                                      │ Generate access token                │
     │                                      │                                      │
     │                                      │ Generate refresh token               │
     │                                      │                                      │
     │                                      │ Store refresh token                  │
     │                                      │─────────────────────────────────────▶│
     │                                      │                                      │
     │                                      │ Confirmation                         │
     │                                      │◀─────────────────────────────────────│
     │                                      │                                      │
     │ 200 OK                               │                                      │
     │ {accessToken, refreshToken, user}    │                                      │
     │◀─────────────────────────────────────│                                      │
     │                                      │                                      │
     │ Store tokens                         │                                      │
     │                                      │                                      │
     │ Redirect to dashboard                │                                      │
     │                                      │                                      │
┌────┴────┐                            ┌────┴────┐                            ┌────┴────┐
│         │                            │         │                            │         │
│ Client  │                            │ Server  │                            │ Database│
│         │                            │         │                            │         │
└─────────┘                            └─────────┘                            └─────────┘
```

### Login Sequence (With MFA)

```
┌─────────┐                            ┌─────────┐                            ┌─────────┐
│         │                            │         │                            │         │
│ Client  │                            │ Server  │                            │ Database│
│         │                            │         │                            │         │
└────┬────┘                            └────┬────┘                            └────┬────┘
     │                                      │                                      │
     │ POST /api/auth/login                 │                                      │
     │ {username, password}                 │                                      │
     │─────────────────────────────────────▶│                                      │
     │                                      │                                      │
     │                                      │ Query user by username               │
     │                                      │─────────────────────────────────────▶│
     │                                      │                                      │
     │                                      │ Return user record                   │
     │                                      │◀─────────────────────────────────────│
     │                                      │                                      │
     │                                      │ Verify password                      │
     │                                      │                                      │
     │                                      │ Check if MFA enabled                 │
     │                                      │                                      │
     │ 200 OK                               │                                      │
     │ {mfaRequired: true, mfaChallenge}    │                                      │
     │◀─────────────────────────────────────│                                      │
     │                                      │                                      │
     │ Display MFA input                    │                                      │
     │                                      │                                      │
     │ POST /api/auth/mfa/verify            │                                      │
     │ {username, mfaToken}                 │                                      │
     │─────────────────────────────────────▶│                                      │
     │                                      │                                      │
     │                                      │ Verify MFA token                     │
     │                                      │                                      │
     │                                      │ Generate access token                │
     │                                      │                                      │
     │                                      │ Generate refresh token               │
     │                                      │                                      │
     │                                      │ Store refresh token                  │
     │                                      │─────────────────────────────────────▶│
     │                                      │                                      │
     │                                      │ Confirmation                         │
     │                                      │◀─────────────────────────────────────│
     │                                      │                                      │
     │ 200 OK                               │                                      │
     │ {accessToken, refreshToken, user}    │                                      │
     │◀─────────────────────────────────────│                                      │
     │                                      │                                      │
     │ Store tokens                         │                                      │
     │                                      │                                      │
     │ Redirect to dashboard                │                                      │
     │                                      │                                      │
┌────┴────┐                            ┌────┴────┐                            ┌────┴────┐
│         │                            │         │                            │         │
│ Client  │                            │ Server  │                            │ Database│
│         │                            │         │                            │         │
└─────────┘                            └─────────┘                            └─────────┘
```

## Implementation Details

### JWT Structure

**Access Token Payload:**
```json
{
  "sub": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "role": "admin",
  "permissions": ["users.read", "users.create", "..."],
  "iat": 1617293982,
  "exp": 1617294882,
  "iss": "cleanedgeremoval.com",
  "jti": "unique_token_id"
}
```

### Refresh Token Storage

**Database Schema:**
```
{
  _id: ObjectId,
  token: String,
  userId: ObjectId,
  userAgent: String,
  ipAddress: String,
  expiresAt: Date,
  createdAt: Date
}
```

### Security Headers

All API responses include the following security headers:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'
Cache-Control: no-store, max-age=0
Pragma: no-cache
X-XSS-Protection: 1; mode=block