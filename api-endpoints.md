# Clean Edge Removal LLC Website Project - API Endpoints

## Authentication Endpoints

### `/api/auth`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| POST | `/register` | Register a new user | `{ username, email, password, firstName, lastName, role }` | `{ user, token }` | 201, 400, 409 |
| POST | `/login` | User login | `{ username/email, password }` | `{ user, token, refreshToken }` | 200, 400, 401, 403 |
| POST | `/refresh-token` | Refresh authentication token | `{ refreshToken }` | `{ token, refreshToken }` | 200, 401 |
| POST | `/logout` | User logout | `{ refreshToken }` | `{ success: true }` | 200, 401 |
| POST | `/forgot-password` | Request password reset | `{ email }` | `{ success: true }` | 200 |
| POST | `/reset-password` | Reset password with token | `{ token, password }` | `{ success: true }` | 200, 400, 401 |
| POST | `/verify-email` | Verify email address | `{ token }` | `{ success: true }` | 200, 400, 401 |
| POST | `/mfa/enable` | Enable MFA | `{ }` | `{ secret, qrCode }` | 200, 401 |
| POST | `/mfa/verify` | Verify MFA setup | `{ token }` | `{ success: true }` | 200, 400, 401 |
| POST | `/mfa/disable` | Disable MFA | `{ token }` | `{ success: true }` | 200, 400, 401 |
| GET | `/me` | Get current user profile | - | `{ user }` | 200, 401 |
| PUT | `/me` | Update current user profile | `{ firstName, lastName, ... }` | `{ user }` | 200, 400, 401 |
| PUT | `/me/password` | Change password | `{ currentPassword, newPassword }` | `{ success: true }` | 200, 400, 401 |

## User Management Endpoints

### `/api/users`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/` | Get all users (paginated) | - | `{ users, total, page, limit }` | 200, 401, 403 |
| POST | `/` | Create a new user | `{ username, email, ... }` | `{ user }` | 201, 400, 401, 403, 409 |
| GET | `/:id` | Get user by ID | - | `{ user }` | 200, 401, 403, 404 |
| PUT | `/:id` | Update user | `{ firstName, lastName, ... }` | `{ user }` | 200, 400, 401, 403, 404 |
| DELETE | `/:id` | Delete user | - | `{ success: true }` | 200, 401, 403, 404 |
| PUT | `/:id/role` | Update user role | `{ role }` | `{ user }` | 200, 400, 401, 403, 404 |
| PUT | `/:id/status` | Update user status | `{ active }` | `{ user }` | 200, 400, 401, 403, 404 |
| GET | `/:id/audit-logs` | Get user audit logs | - | `{ logs, total, page, limit }` | 200, 401, 403, 404 |

## Customer Management Endpoints

### `/api/customers`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/` | Get all customers (paginated) | - | `{ customers, total, page, limit }` | 200, 401, 403 |
| POST | `/` | Create a new customer | `{ firstName, lastName, ... }` | `{ customer }` | 201, 400, 401, 403 |
| GET | `/:id` | Get customer by ID | - | `{ customer }` | 200, 401, 403, 404 |
| PUT | `/:id` | Update customer | `{ firstName, lastName, ... }` | `{ customer }` | 200, 400, 401, 403, 404 |
| DELETE | `/:id` | Delete customer | - | `{ success: true }` | 200, 401, 403, 404 |
| GET | `/:id/appointments` | Get customer appointments | - | `{ appointments, total, page, limit }` | 200, 401, 403, 404 |
| GET | `/:id/reviews` | Get customer reviews | - | `{ reviews, total, page, limit }` | 200, 401, 403, 404 |
| POST | `/search` | Search customers | `{ query, filters }` | `{ customers, total, page, limit }` | 200, 400, 401, 403 |
| POST | `/import` | Import customers from CSV | `FormData with CSV file` | `{ success, imported, failed }` | 200, 400, 401, 403 |
| GET | `/export` | Export customers to CSV | - | CSV file | 200, 401, 403 |

## Appointment Management Endpoints

### `/api/appointments`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/` | Get all appointments (paginated) | - | `{ appointments, total, page, limit }` | 200, 401, 403 |
| POST | `/` | Create a new appointment | `{ customer, services, ... }` | `{ appointment }` | 201, 400, 401, 403 |
| GET | `/:id` | Get appointment by ID | - | `{ appointment }` | 200, 401, 403, 404 |
| PUT | `/:id` | Update appointment | `{ services, scheduledDate, ... }` | `{ appointment }` | 200, 400, 401, 403, 404 |
| DELETE | `/:id` | Delete appointment | - | `{ success: true }` | 200, 401, 403, 404 |
| PUT | `/:id/status` | Update appointment status | `{ status }` | `{ appointment }` | 200, 400, 401, 403, 404 |
| PUT | `/:id/assign` | Assign employees and vehicle | `{ employees, vehicle }` | `{ appointment }` | 200, 400, 401, 403, 404 |
| POST | `/:id/photos` | Upload appointment photos | `FormData with photos` | `{ appointment }` | 200, 400, 401, 403, 404 |
| POST | `/:id/signature` | Upload customer signature | `FormData with signature` | `{ appointment }` | 200, 400, 401, 403, 404 |
| POST | `/:id/payment` | Record payment | `{ method, amount, ... }` | `{ appointment }` | 200, 400, 401, 403, 404 |
| POST | `/:id/feedback` | Submit customer feedback | `{ rating, feedback }` | `{ appointment }` | 200, 400, 401, 403, 404 |
| POST | `/search` | Search appointments | `{ query, filters }` | `{ appointments, total, page, limit }` | 200, 400, 401, 403 |
| GET | `/calendar` | Get appointments for calendar | `{ start, end }` | `{ appointments }` | 200, 401, 403 |
| GET | `/availability` | Get available time slots | `{ date, service }` | `{ timeSlots }` | 200, 400, 401, 403 |
| POST | `/conflicts` | Check for scheduling conflicts | `{ date, timeSlot, employees, vehicle }` | `{ conflicts }` | 200, 400, 401, 403 |
| POST | `/optimize` | Optimize appointment routing | `{ date, appointments }` | `{ optimizedRoute }` | 200, 400, 401, 403 |

## Service Management Endpoints

### `/api/services`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/` | Get all services | - | `{ services }` | 200 |
| POST | `/` | Create a new service | `{ name, description, ... }` | `{ service }` | 201, 400, 401, 403 |
| GET | `/:id` | Get service by ID | - | `{ service }` | 200, 404 |
| PUT | `/:id` | Update service | `{ name, description, ... }` | `{ service }` | 200, 400, 401, 403, 404 |
| DELETE | `/:id` | Delete service | - | `{ success: true }` | 200, 401, 403, 404 |
| PUT | `/:id/status` | Update service status | `{ active }` | `{ service }` | 200, 400, 401, 403, 404 |
| PUT | `/:id/featured` | Update featured status | `{ featured }` | `{ service }` | 200, 400, 401, 403, 404 |
| PUT | `/reorder` | Reorder services | `{ serviceIds }` | `{ success: true }` | 200, 400, 401, 403 |
| GET | `/categories` | Get service categories | - | `{ categories }` | 200 |

## Vehicle Management Endpoints

### `/api/vehicles`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/` | Get all vehicles | - | `{ vehicles }` | 200, 401, 403 |
| POST | `/` | Create a new vehicle | `{ name, type, ... }` | `{ vehicle }` | 201, 400, 401, 403 |
| GET | `/:id` | Get vehicle by ID | - | `{ vehicle }` | 200, 401, 403, 404 |
| PUT | `/:id` | Update vehicle | `{ name, type, ... }` | `{ vehicle }` | 200, 400, 401, 403, 404 |
| DELETE | `/:id` | Delete vehicle | - | `{ success: true }` | 200, 401, 403, 404 |
| PUT | `/:id/status` | Update vehicle status | `{ status }` | `{ vehicle }` | 200, 400, 401, 403, 404 |
| POST | `/:id/maintenance` | Add maintenance record | `{ type, description, ... }` | `{ vehicle }` | 200, 400, 401, 403, 404 |
| POST | `/:id/fuel` | Add fuel log entry | `{ gallons, cost, ... }` | `{ vehicle }` | 200, 400, 401, 403, 404 |
| PUT | `/:id/location` | Update vehicle location | `{ latitude, longitude }` | `{ vehicle }` | 200, 400, 401, 403, 404 |
| GET | `/:id/appointments` | Get vehicle appointments | - | `{ appointments, total, page, limit }` | 200, 401, 403, 404 |

## Time Tracking Endpoints

### `/api/time-entries`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/` | Get all time entries (paginated) | - | `{ timeEntries, total, page, limit }` | 200, 401, 403 |
| POST | `/` | Create a new time entry | `{ employee, date, ... }` | `{ timeEntry }` | 201, 400, 401, 403 |
| GET | `/:id` | Get time entry by ID | - | `{ timeEntry }` | 200, 401, 403, 404 |
| PUT | `/:id` | Update time entry | `{ clockIn, clockOut, ... }` | `{ timeEntry }` | 200, 400, 401, 403, 404 |
| DELETE | `/:id` | Delete time entry | - | `{ success: true }` | 200, 401, 403, 404 |
| POST | `/:id/clock-in` | Clock in | `{ }` | `{ timeEntry }` | 200, 400, 401, 403, 404 |
| POST | `/:id/clock-out` | Clock out | `{ }` | `{ timeEntry }` | 200, 400, 401, 403, 404 |
| POST | `/:id/activity` | Start activity | `{ type, appointment }` | `{ timeEntry }` | 200, 400, 401, 403, 404 |
| PUT | `/:id/activity/:activityId` | End activity | `{ }` | `{ timeEntry }` | 200, 400, 401, 403, 404 |
| PUT | `/:id/approve` | Approve time entry | `{ }` | `{ timeEntry }` | 200, 400, 401, 403, 404 |
| PUT | `/:id/reject` | Reject time entry | `{ notes }` | `{ timeEntry }` | 200, 400, 401, 403, 404 |
| GET | `/employee/:employeeId` | Get employee time entries | - | `{ timeEntries, total, page, limit }` | 200, 401, 403, 404 |
| GET | `/report` | Generate time report | `{ startDate, endDate, employees }` | `{ report }` | 200, 400, 401, 403 |

## Location Management Endpoints

### `/api/locations`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/` | Get all locations | - | `{ locations }` | 200, 401, 403 |
| POST | `/` | Create a new location | `{ name, type, ... }` | `{ location }` | 201, 400, 401, 403 |
| GET | `/:id` | Get location by ID | - | `{ location }` | 200, 401, 403, 404 |
| PUT | `/:id` | Update location | `{ name, type, ... }` | `{ location }` | 200, 400, 401, 403, 404 |
| DELETE | `/:id` | Delete location | - | `{ success: true }` | 200, 401, 403, 404 |
| PUT | `/:id/status` | Update location status | `{ active }` | `{ location }` | 200, 400, 401, 403, 404 |
| GET | `/service-areas` | Get service areas | - | `{ serviceAreas }` | 200 |
| POST | `/check-address` | Check if address is in service area | `{ address }` | `{ inServiceArea, nearestServiceArea }` | 200, 400 |
| GET | `/geocode` | Geocode address | `{ address }` | `{ coordinates }` | 200, 400, 401, 403 |

## Review Management Endpoints

### `/api/reviews`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/` | Get all reviews (paginated) | - | `{ reviews, total, page, limit }` | 200 |
| POST | `/` | Create a new review | `{ customer, rating, ... }` | `{ review }` | 201, 400, 401 |
| GET | `/:id` | Get review by ID | - | `{ review }` | 200, 404 |
| PUT | `/:id` | Update review | `{ rating, content, ... }` | `{ review }` | 200, 400, 401, 403, 404 |
| DELETE | `/:id` | Delete review | - | `{ success: true }` | 200, 401, 403, 404 |
| PUT | `/:id/status` | Update review status | `{ status }` | `{ review }` | 200, 400, 401, 403, 404 |
| PUT | `/:id/featured` | Update featured status | `{ featured }` | `{ review }` | 200, 400, 401, 403, 404 |
| POST | `/:id/response` | Add response to review | `{ content }` | `{ review }` | 200, 400, 401, 403, 404 |
| GET | `/featured` | Get featured reviews | - | `{ reviews }` | 200 |
| GET | `/stats` | Get review statistics | - | `{ stats }` | 200 |

## Notification Endpoints

### `/api/notifications`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/` | Get user notifications | - | `{ notifications, total, page, limit }` | 200, 401 |
| GET | `/:id` | Get notification by ID | - | `{ notification }` | 200, 401, 404 |
| PUT | `/:id/read` | Mark notification as read | - | `{ notification }` | 200, 401, 404 |
| PUT | `/read-all` | Mark all notifications as read | - | `{ success: true }` | 200, 401 |
| DELETE | `/:id` | Delete notification | - | `{ success: true }` | 200, 401, 404 |
| POST | `/subscribe` | Subscribe to push notifications | `{ subscription }` | `{ success: true }` | 200, 400, 401 |
| POST | `/unsubscribe` | Unsubscribe from push notifications | - | `{ success: true }` | 200, 401 |

## System Configuration Endpoints

### `/api/config`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/` | Get system configuration | - | `{ config }` | 200, 401, 403 |
| PUT | `/` | Update system configuration | `{ autoSchedule, numTrucks, ... }` | `{ config }` | 200, 400, 401, 403 |
| GET | `/business-hours` | Get business hours | - | `{ businessHours }` | 200 |
| PUT | `/business-hours` | Update business hours | `{ businessHours }` | `{ businessHours }` | 200, 400, 401, 403 |
| GET | `/blackout-dates` | Get blackout dates | - | `{ blackoutDates }` | 200 |
| POST | `/blackout-dates` | Add blackout date | `{ date, reason }` | `{ blackoutDates }` | 200, 400, 401, 403 |
| DELETE | `/blackout-dates/:id` | Remove blackout date | - | `{ success: true }` | 200, 401, 403, 404 |

## Integration Endpoints

### `/api/integrations`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| POST | `/email/send` | Send email | `{ to, subject, body }` | `{ success: true }` | 200, 400, 401, 403 |
| POST | `/sms/send` | Send SMS | `{ to, message }` | `{ success: true }` | 200, 400, 401, 403 |
| POST | `/calendar/sync` | Sync with Google Calendar | `{ appointment }` | `{ success: true, eventId }` | 200, 400, 401, 403 |
| GET | `/calendar/events` | Get calendar events | `{ start, end }` | `{ events }` | 200, 401, 403 |
| POST | `/payment/process` | Process payment | `{ amount, method, ... }` | `{ success: true, transactionId }` | 200, 400, 401, 403 |
| GET | `/payment/methods` | Get payment methods | - | `{ methods }` | 200, 401 |

## Reporting Endpoints

### `/api/reports`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/revenue` | Get revenue report | `{ startDate, endDate, groupBy }` | `{ report }` | 200, 401, 403 |
| GET | `/appointments` | Get appointments report | `{ startDate, endDate, groupBy }` | `{ report }` | 200, 401, 403 |
| GET | `/employees` | Get employee performance report | `{ startDate, endDate, employees }` | `{ report }` | 200, 401, 403 |
| GET | `/services` | Get services report | `{ startDate, endDate }` | `{ report }` | 200, 401, 403 |
| GET | `/customers` | Get customer acquisition report | `{ startDate, endDate, groupBy }` | `{ report }` | 200, 401, 403 |
| GET | `/vehicles` | Get vehicle usage report | `{ startDate, endDate, vehicles }` | `{ report }` | 200, 401, 403 |
| GET | `/export/:reportType` | Export report to CSV/PDF | `{ startDate, endDate, ... }` | File | 200, 400, 401, 403 |

## Audit Log Endpoints

### `/api/audit-logs`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/` | Get audit logs (paginated) | - | `{ logs, total, page, limit }` | 200, 401, 403 |
| GET | `/:id` | Get audit log by ID | - | `{ log }` | 200, 401, 403, 404 |
| GET | `/search` | Search audit logs | `{ user, action, resource, startDate, endDate }` | `{ logs, total, page, limit }` | 200, 400, 401, 403 |
| GET | `/export` | Export audit logs | `{ startDate, endDate, ... }` | CSV file | 200, 400, 401, 403 |

## Public API Endpoints

### `/api/public`

| Method | Endpoint | Description | Request Body | Response | Status Codes |
|--------|----------|-------------|--------------|----------|--------------|
| GET | `/services` | Get public services list | - | `{ services }` | 200 |
| GET | `/reviews` | Get public reviews | - | `{ reviews, total, page, limit }` | 200 |
| POST | `/contact` | Submit contact form | `{ name, email, message }` | `{ success: true }` | 200, 400 |
| POST | `/quote` | Request quote | `{ name, address, services, ... }` | `{ success: true }` | 200, 400 |
| GET | `/availability` | Check availability | `{ date, service }` | `{ available, timeSlots }` | 200, 400 |
| POST | `/schedule` | Schedule appointment | `{ customer, service, date, ... }` | `{ success: true, appointment }` | 200, 400 |
| GET | `/service-areas` | Get service areas | - | `{ serviceAreas }` | 200 |
| POST | `/check-address` | Check if address is in service area | `{ address }` | `{ inServiceArea }` | 200, 400 |