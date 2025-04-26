# Clean Edge Removal LLC Website Project - API Endpoint Definitions (Updated 2025-04-20)

This document provides an exhaustive and meticulously detailed specification of all planned RESTful API endpoints for the Clean Edge Removal LLC backend server. Adherence to these definitions is crucial for maintaining consistency between the frontend client and the backend server. All endpoints are prefixed with `/api`.

**General Principles:**

*   **RESTful Design:** Endpoints adhere to REST principles, using appropriate HTTP methods (GET, POST, PUT, DELETE, PATCH) and standard status codes.
*   **JSON:** Request bodies and response bodies primarily use the `application/json` content type, unless otherwise specified (e.g., file uploads using `multipart/form-data`).
*   **Authentication:** Endpoints requiring authentication expect a valid JWT access token in the `Authorization: Bearer <token>` header. Specific role-based permissions required for each endpoint are noted where applicable (Admin, Employee, Receptionist). Public endpoints do not require authentication.
*   **Validation:** All incoming request bodies and parameters are rigorously validated on the server-side (using libraries like Joi or Yup). Validation errors result in a `400 Bad Request` response with detailed error messages.
*   **Error Handling:** Consistent error handling provides appropriate HTTP status codes (400, 401, 403, 404, 409, 500) and informative JSON error responses (e.g., `{ "error": "message", "details": [...] }`). Sensitive error details are logged server-side but not exposed to the client in production.
*   **Pagination:** List endpoints (e.g., GET `/users`, GET `/appointments`) utilize query parameters for pagination (`?page=1&limit=20`). Responses include pagination metadata (`total`, `page`, `limit`, `totalPages`). Default limit is typically 20.
*   **Sorting & Filtering:** List endpoints should support sorting (`?sortBy=field&sortOrder=asc|desc`) and filtering (`?status=active&role=employee`) via query parameters where applicable.
*   **Status Codes (Common):**
    *   `200 OK`: Standard success response for GET, PUT, PATCH, DELETE (if no content returned).
    *   `201 Created`: Successful creation of a resource (POST). Response typically includes the created resource.
    *   `204 No Content`: Successful request but no response body needed (e.g., DELETE).
    *   `400 Bad Request`: Client error (e.g., invalid input, validation failure).
    *   `401 Unauthorized`: Authentication required or failed (invalid/missing token).
    *   `403 Forbidden`: Authenticated user lacks necessary permissions for the resource/action.
    *   `404 Not Found`: Requested resource does not exist.
    *   `409 Conflict`: Request conflicts with the current state of the resource (e.g., duplicate email/username).
    *   `500 Internal Server Error`: Unexpected server-side error.

---

## 1. Authentication Endpoints (`/auth`)

Handles user registration, login, logout, token management, password recovery, and profile management.

| Method | Endpoint         | Description                                      | Permissions | Request Body                                  | Response Body                                  | Status Codes        |
| :----- | :--------------- | :----------------------------------------------- | :---------- | :-------------------------------------------- | :--------------------------------------------- | :------------------ |
| POST   | `/register`      | Register a new user account (Admin/Employee/Receptionist). Triggers email verification. | Public      | `{ username, email, password, firstName, lastName, role }` | `{ message: "Registration successful. Please check your email for verification." }` | 201, 400, 409       |
| POST   | `/login`         | Authenticate a user and issue tokens. Handles MFA if enabled. | Public      | `{ identifier (username or email), password }` | `{ user, accessToken, refreshToken }` or `{ mfaRequired: true }` | 200, 400, 401, 403 |
| POST   | `/refresh-token` | Obtain a new access token using a valid refresh token. | Public      | `{ refreshToken (from cookie/secure storage) }` | `{ accessToken, refreshToken (new, rotated) }` | 200, 401            |
| POST   | `/logout`        | Invalidate the provided refresh token.           | Authenticated | `{ refreshToken (from cookie/secure storage) }` | `{ success: true, message: "Logged out successfully." }` | 200, 401            |
| POST   | `/verify-email`  | Verify user's email address using a token sent via email. | Public      | `{ token }`                                   | `{ success: true, message: "Email verified successfully." }` | 200, 400, 401       |
| POST   | `/resend-verification` | Resend the email verification link.           | Public      | `{ email }`                                   | `{ success: true, message: "Verification email resent." }` | 200, 400, 404       |
| POST   | `/forgot-password` | Initiate the password reset process. Sends reset link via email. | Public      | `{ email }`                                   | `{ success: true, message: "Password reset email sent." }` | 200, 400, 404       |
| POST   | `/reset-password`| Reset the user's password using a valid token.   | Public      | `{ token, newPassword }`                      | `{ success: true, message: "Password reset successfully." }` | 200, 400, 401       |
| GET    | `/me`            | Get the profile of the currently authenticated user. | Authenticated | -                                             | `{ user }` (User object without sensitive fields like password hash) | 200, 401            |
| PUT    | `/me`            | Update the profile of the currently authenticated user. | Authenticated | `{ firstName?, lastName?, phoneCell?, phoneHome?, phoneWork?, address? }` | `{ user }` (Updated user object)                 | 200, 400, 401       |
| PUT    | `/me/password`   | Change the password for the currently authenticated user. | Authenticated | `{ currentPassword, newPassword }`            | `{ success: true, message: "Password changed successfully." }` | 200, 400, 401       |
| POST   | `/mfa/enable`    | Initiate MFA setup for the current user.         | Authenticated | `{ }`                                         | `{ secret, qrCodeDataURL }` (Secret for manual entry, QR code image data) | 200, 401, 409       |
| POST   | `/mfa/verify`    | Verify and activate MFA using a TOTP token.      | Authenticated | `{ token }` (TOTP token from authenticator app) | `{ success: true, message: "MFA enabled successfully." }` | 200, 400, 401       |
| POST   | `/mfa/disable`   | Disable MFA for the current user (requires current password or MFA token). | Authenticated | `{ password or token }`                       | `{ success: true, message: "MFA disabled successfully." }` | 200, 400, 401       |
| POST   | `/mfa/login`     | Verify MFA token during login process.           | Public      | `{ identifier, mfaToken }`                    | `{ user, accessToken, refreshToken }`          | 200, 400, 401       |

---

## 2. User Management Endpoints (`/users`)

Endpoints for managing user accounts (Administrators, Employees, Receptionists). Requires 'Admin' role.

| Method | Endpoint         | Description                                      | Permissions | Request Body                                  | Response Body                                  | Status Codes        |
| :----- | :--------------- | :----------------------------------------------- | :---------- | :-------------------------------------------- | :--------------------------------------------- | :------------------ |
| GET    | `/`              | Get a paginated list of all users. Supports filtering and sorting. | Admin       | - (Query Params: `page`, `limit`, `sortBy`, `sortOrder`, `role`, `status`, `search`) | `{ users: User[], total: number, page: number, limit: number, totalPages: number }` | 200, 401, 403       |
| POST   | `/`              | Create a new user account.                       | Admin       | `{ username, email, password, firstName, lastName, role, employeeId?, address?, phones?, active? }` | `{ user }` (Created user object)                 | 201, 400, 401, 403, 409 |
| GET    | `/:userId`       | Get detailed information for a specific user by ID. | Admin       | -                                             | `{ user }`                                     | 200, 401, 403, 404 |
| PUT    | `/:userId`       | Update details for a specific user.              | Admin       | `{ firstName?, lastName?, email?, role?, employeeId?, address?, phones?, active? }` | `{ user }` (Updated user object)                 | 200, 400, 401, 403, 404, 409 |
| DELETE | `/:userId`       | Delete a specific user account (soft delete preferred). | Admin       | -                                             | `{ success: true, message: "User deleted successfully." }` | 200, 401, 403, 404 |
| PUT    | `/:userId/status`| Activate or deactivate a user account.           | Admin       | `{ active: boolean }`                         | `{ user }` (Updated user object)                 | 200, 400, 401, 403, 404 |
| GET    | `/:userId/audit-logs` | Get audit logs related to a specific user (paginated). | Admin       | - (Query Params: `page`, `limit`, `sortBy`, `sortOrder`) | `{ logs: AuditLog[], total: number, ... }`     | 200, 401, 403, 404 |

---

## 3. Customer Management Endpoints (`/customers`)

Endpoints for managing customer information. Requires 'Admin' or 'Receptionist' role generally, with specific permissions.

| Method | Endpoint            | Description                                      | Permissions          | Request Body                                  | Response Body                                  | Status Codes        |
| :----- | :------------------ | :----------------------------------------------- | :------------------- | :-------------------------------------------- | :--------------------------------------------- | :------------------ |
| GET    | `/`                 | Get a paginated list of all customers. Supports filtering/sorting. | Admin, Receptionist | - (Query Params: `page`, `limit`, `sortBy`, `sortOrder`, `search`, `tag`) | `{ customers: Customer[], total: number, ... }` | 200, 401, 403       |
| POST   | `/`                 | Create a new customer record.                    | Admin, Receptionist | `{ firstName, lastName, email, primaryAddress, phones?, notes?, marketingConsent? }` | `{ customer }` (Created customer object)         | 201, 400, 401, 403, 409 |
| GET    | `/:customerId`      | Get details for a specific customer by ID.       | Admin, Receptionist | -                                             | `{ customer }` (Includes addresses, tags, etc.) | 200, 401, 403, 404 |
| PUT    | `/:customerId`      | Update details for a specific customer.          | Admin, Receptionist | `{ firstName?, lastName?, email?, phones?, notes?, marketingConsent?, active? }` | `{ customer }` (Updated customer object)         | 200, 400, 401, 403, 404, 409 |
| DELETE | `/:customerId`      | Delete a specific customer (soft delete preferred). | Admin                | -                                             | `{ success: true, message: "Customer deleted." }` | 200, 401, 403, 404 |
| GET    | `/:customerId/addresses` | Get all service addresses for a customer.     | Admin, Receptionist | -                                             | `{ addresses: CustomerServiceAddress[] }`      | 200, 401, 403, 404 |
| POST   | `/:customerId/addresses` | Add a new service address for a customer.    | Admin, Receptionist | `{ nickname?, street, city, state, zipCode, country, isDefault? }` | `{ address }` (Created address object)         | 201, 400, 401, 403, 404 |
| PUT    | `/:customerId/addresses/:addressId` | Update a service address.       | Admin, Receptionist | `{ nickname?, street?, city?, state?, zipCode?, country?, isDefault? }` | `{ address }` (Updated address object)         | 200, 400, 401, 403, 404 |
| DELETE | `/:customerId/addresses/:addressId` | Delete a service address.       | Admin, Receptionist | -                                             | `{ success: true, message: "Address deleted." }` | 200, 401, 403, 404 |
| GET    | `/:customerId/tags` | Get tags associated with a customer.           | Admin, Receptionist | -                                             | `{ tags: Tag[] }`                              | 200, 401, 403, 404 |
| POST   | `/:customerId/tags` | Add a tag to a customer.                       | Admin, Receptionist | `{ tagId or tagName }`                        | `{ tags: Tag[] }` (Updated list)               | 200, 400, 401, 403, 404 |
| DELETE | `/:customerId/tags/:tagId` | Remove a tag from a customer.             | Admin, Receptionist | -                                             | `{ tags: Tag[] }` (Updated list)               | 200, 401, 403, 404 |
| GET    | `/:customerId/appointments` | Get appointments for a specific customer (paginated). | Admin, Receptionist | - (Query Params: `page`, `limit`, `sortBy`, `sortOrder`, `status`) | `{ appointments: Appointment[], total: number, ... }` | 200, 401, 403, 404 |
| GET    | `/:customerId/reviews` | Get reviews submitted by a specific customer. | Admin, Receptionist | - (Query Params: `page`, `limit`)             | `{ reviews: Review[], total: number, ... }`    | 200, 401, 403, 404 |
| POST   | `/search`           | Search for customers based on criteria.        | Admin, Receptionist | `{ query, filters (e.g., tag, location) }`    | `{ customers: Customer[], total: number, ... }` | 200, 400, 401, 403 |

---

## 4. Quote Request Endpoint (`/quote-requests`)

Handles submissions from the public quote request form.

| Method | Endpoint | Description                                      | Permissions | Request Body                                  | Response Body                                  | Status Codes        |
| :----- | :------- | :----------------------------------------------- | :---------- | :-------------------------------------------- | :--------------------------------------------- | :------------------ |
| POST   | `/`      | Submit a quote request from the public website. Creates a customer record (or links to existing) and notifies admin. | Public      | `{ fullName, serviceAddress, email, cellPhone, homePhone?, workPhone?, services: string[], otherDescription?, privacyPolicy: boolean, marketingConsent: boolean }` | `{ success: true, message: "Quote request received. We will contact you shortly." }` | 201, 400            |

---

## 5. Appointment Management Endpoints (`/appointments`)

Endpoints for creating, viewing, updating, and managing service appointments.

| Method | Endpoint            | Description                                      | Permissions          | Request Body                                  | Response Body                                  | Status Codes        |
| :----- | :------------------ | :----------------------------------------------- | :------------------- | :-------------------------------------------- | :--------------------------------------------- | :------------------ |
| GET    | `/`                 | Get a paginated list of all appointments. Supports filtering/sorting. | Admin, Receptionist, Employee (Limited View) | - (Query Params: `page`, `limit`, `sortBy`, `sortOrder`, `status`, `customerId`, `employeeId`, `vehicleId`, `dateStart`, `dateEnd`) | `{ appointments: Appointment[], total: number, ... }` | 200, 401, 403       |
| POST   | `/`                 | Create a new appointment (typically by Admin/Receptionist). | Admin, Receptionist | `{ customerId, serviceAddressId or serviceAddress, scheduledStart, scheduledEnd, serviceIds: number[], notes?, assignedEmployeeIds?, assignedVehicleId? }` | `{ appointment }` (Created appointment object) | 201, 400, 401, 403 |
| GET    | `/:appointmentId`   | Get details for a specific appointment.          | Admin, Receptionist, Employee (Assigned) | -                                             | `{ appointment }` (Includes customer, services, employees, vehicle, photos) | 200, 401, 403, 404 |
| PUT    | `/:appointmentId`   | Update details for a specific appointment.       | Admin, Receptionist | `{ serviceAddressId?, serviceAddress?, scheduledStart?, scheduledEnd?, serviceIds?, notes?, assignedEmployeeIds?, assignedVehicleId?, status?, totalPrice?, discount?, finalPrice? }` | `{ appointment }` (Updated appointment object) | 200, 400, 401, 403, 404 |
| DELETE | `/:appointmentId`   | Cancel/delete an appointment.                    | Admin, Receptionist | -                                             | `{ success: true, message: "Appointment cancelled." }` | 200, 401, 403, 404 |
| PATCH  | `/:appointmentId/status` | Update the status of an appointment.         | Admin, Receptionist, Employee (Limited transitions) | `{ status: 'scheduled'|'in-progress'|'completed'|'cancelled'|'no-show' }` | `{ appointment }` (Updated appointment object) | 200, 400, 401, 403, 404 |
| POST   | `/:appointmentId/assign` | Assign employees and/or vehicle to an appointment. | Admin, Receptionist | `{ employeeIds?: number[], vehicleId?: number }` | `{ appointment }` (Updated appointment object) | 200, 400, 401, 403, 404 |
| POST   | `/:appointmentId/photos` | Upload before/after photos for an appointment. | Employee (Assigned), Admin | `FormData` with `photo` file(s) and `type: 'before'|'after'` | `{ appointment }` (Updated photo list)         | 200, 400, 401, 403, 404 |
| POST   | `/:appointmentId/signature` | Upload customer signature image.           | Employee (Assigned), Admin | `FormData` with `signature` file              | `{ appointment }` (Updated signature URL)      | 200, 400, 401, 403, 404 |
| POST   | `/:appointmentId/payment` | Record a payment for an appointment.         | Admin, Receptionist | `{ method: 'cash'|'credit'|'check'|'online', amount: number, transactionId?: string }` | `{ appointment }` (Updated payment details)    | 200, 400, 401, 403, 404 |
| GET    | `/calendar`         | Get appointments formatted for calendar view within a date range. | Admin, Receptionist, Employee | - (Query Params: `start: YYYY-MM-DD`, `end: YYYY-MM-DD`, `view: 'month'|'week'|'day'`, `employeeId?`, `vehicleId?`) | `{ events: CalendarEvent[] }`                  | 200, 400, 401, 403 |
| GET    | `/availability`     | Get available time slots for scheduling (considers existing appointments, employee/vehicle availability, business hours). | Public, Admin, Receptionist | - (Query Params: `date: YYYY-MM-DD`, `durationMinutes: number`, `requiredSkills?: string[]`) | `{ timeSlots: string[] }` (e.g., ["09:00", "09:15", ...]) | 200, 400            |

---

*(Sections for Service Management, Vehicle Management, Time Tracking, Location Management, Review Management, Notification Endpoints, System Configuration, Integration Endpoints, Reporting, Audit Logs would follow a similar detailed format, specifying permissions, request/response bodies, and status codes for each endpoint. These are omitted here for brevity but are part of the complete API plan.)*

---