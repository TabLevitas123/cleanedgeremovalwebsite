# Clean Edge Removal LLC Website Project - Database Models (MySQL)

This document outlines the proposed MySQL table structures, translated from the original MongoDB design.

**Notes:**

*   `id` columns are assumed to be `INT UNSIGNED AUTO_INCREMENT PRIMARY KEY`.
*   Foreign keys (`*_id`) reference the `id` column of the related table. Constraints (`ON DELETE SET NULL`, `ON UPDATE CASCADE`, etc.) should be defined based on specific requirements.
*   `DATETIME` columns use `DEFAULT CURRENT_TIMESTAMP` and `ON UPDATE CURRENT_TIMESTAMP` where appropriate for `created_at` and `updated_at`.
*   `TEXT` is used for potentially long strings. `VARCHAR` lengths are examples and should be adjusted.
*   JSON columns are used for flexible nested data where appropriate, requiring MySQL 5.7+.
*   Relationships previously represented by arrays of ObjectIds (e.g., `assignedEmployees`) are handled via separate join tables (many-to-many).
*   Relationships previously represented by arrays of embedded objects (e.g., `serviceAddresses`, `activities`) are handled via separate tables (one-to-many).

---

## MySQL Table Definitions

### 1. `users` Table
Stores information about administrators, employees, and receptionists.

```sql
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Hashed password
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'employee', 'receptionist') NOT NULL,
    address_street VARCHAR(255) NULL,
    address_city VARCHAR(100) NULL,
    address_state VARCHAR(50) NULL,
    address_zip_code VARCHAR(20) NULL,
    address_country VARCHAR(50) NULL,
    phone_home VARCHAR(30) NULL,
    phone_cell VARCHAR(30) NULL,
    phone_work VARCHAR(30) NULL,
    employee_id VARCHAR(50) NULL UNIQUE, -- For employees only
    profile_image_url VARCHAR(512) NULL,
    last_login DATETIME NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    mfa_secret VARCHAR(255) NULL,
    refresh_token TEXT NULL,
    password_reset_token VARCHAR(255) NULL,
    password_reset_expires DATETIME NULL,
    login_attempts INT UNSIGNED NOT NULL DEFAULT 0,
    lock_until DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT UNSIGNED NULL,
    updated_by INT UNSIGNED NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(active);
CREATE INDEX idx_users_last_login ON users(last_login);
```

---

### 2. `customers` Table
Stores information about clients requesting services.

```sql
CREATE TABLE customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    primary_address_street VARCHAR(255) NOT NULL,
    primary_address_city VARCHAR(100) NOT NULL,
    primary_address_state VARCHAR(50) NOT NULL,
    primary_address_zip_code VARCHAR(20) NOT NULL,
    primary_address_country VARCHAR(50) NOT NULL,
    phone_home VARCHAR(30) NULL,
    phone_cell VARCHAR(30) NULL,
    phone_work VARCHAR(30) NULL,
    notes TEXT NULL,
    marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
    marketing_consent_date DATETIME NULL,
    privacy_policy_agreed BOOLEAN NOT NULL DEFAULT FALSE,
    privacy_policy_agreed_date DATETIME NULL,
    customer_since DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_service_date DATETIME NULL,
    total_spent DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    appointment_count INT UNSIGNED NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT UNSIGNED NULL,
    updated_by INT UNSIGNED NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_customers_last_name_first_name ON customers(last_name, first_name);
CREATE INDEX idx_customers_customer_since ON customers(customer_since);
CREATE INDEX idx_customers_last_service_date ON customers(last_service_date);
```

---

### 3. `customer_service_addresses` Table
Stores additional service addresses for customers (One-to-Many with `customers`).

```sql
CREATE TABLE customer_service_addresses (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED NOT NULL,
    nickname VARCHAR(100) NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(50) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_customer_service_addresses_zip_code ON customer_service_addresses(zip_code);
```

---

### 4. `customer_tags` Table
Stores tags associated with customers (Many-to-Many relationship requires a join table, or store as JSON/TEXT in `customers`). This example uses a join table.

```sql
CREATE TABLE tags (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE customer_tags (
    customer_id INT UNSIGNED NOT NULL,
    tag_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (customer_id, tag_id),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

---

### 5. `services` Table
Defines the different services offered.

```sql
CREATE TABLE services (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('junk-removal', 'cleanout', 'relocation', 'recycling', 'handyman', 'donation', 'industrial-cleaning', 'industrial-painting', 'monument-cleaning', 'dumpster-cleaning', 'specialty') NOT NULL,
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    pricing_model ENUM('fixed', 'hourly', 'volume', 'weight', 'custom') NOT NULL,
    pricing_details JSON NULL, -- Store details like minimumCharge, hourlyRate etc.
    estimated_duration INT UNSIGNED NOT NULL, -- In minutes
    icon_url VARCHAR(512) NULL,
    image_url VARCHAR(512) NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT UNSIGNED NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT UNSIGNED NULL,
    updated_by INT UNSIGNED NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_active ON services(active);
CREATE INDEX idx_services_featured ON services(featured);
CREATE INDEX idx_services_sort_order ON services(sort_order);
```

---

### 6. `vehicles` Table
Stores information about company vehicles.

```sql
CREATE TABLE vehicles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('truck', 'van', 'car', 'other') NOT NULL,
    license_plate VARCHAR(20) NOT NULL UNIQUE,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT UNSIGNED NOT NULL,
    color VARCHAR(30) NULL,
    capacity DECIMAL(8, 2) NULL, -- In cubic yards
    max_weight DECIMAL(10, 2) NULL, -- In pounds
    status ENUM('available', 'in-use', 'maintenance', 'out-of-service') NOT NULL DEFAULT 'available',
    current_latitude DECIMAL(10, 8) NULL,
    current_longitude DECIMAL(11, 8) NULL,
    current_location_last_updated DATETIME NULL,
    insurance_provider VARCHAR(100) NULL,
    insurance_policy_number VARCHAR(100) NULL,
    insurance_expiration_date DATE NULL,
    registration_expiration_date DATE NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT UNSIGNED NULL,
    updated_by INT UNSIGNED NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_active ON vehicles(active);
-- Consider spatial index if needed: CREATE SPATIAL INDEX idx_vehicles_location ON vehicles(current_location);
```
---

### 7. `vehicle_assignments` Table
Join table for assigning employees to vehicles (Many-to-Many).

```sql
CREATE TABLE vehicle_assignments (
    vehicle_id INT UNSIGNED NOT NULL,
    employee_id INT UNSIGNED NOT NULL,
    assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (vehicle_id, employee_id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 8. `vehicle_maintenance_history` Table
Tracks maintenance records for vehicles (One-to-Many with `vehicles`).

```sql
CREATE TABLE vehicle_maintenance_history (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT UNSIGNED NOT NULL,
    maintenance_date DATE NOT NULL,
    type ENUM('routine', 'repair', 'inspection') NOT NULL,
    description TEXT NOT NULL,
    cost DECIMAL(10, 2) NULL,
    provider VARCHAR(100) NULL,
    notes TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT UNSIGNED NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
```

---

### 9. `vehicle_fuel_log` Table
Tracks fuel usage for vehicles (One-to-Many with `vehicles`).

```sql
CREATE TABLE vehicle_fuel_log (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT UNSIGNED NOT NULL,
    log_date DATE NOT NULL,
    gallons DECIMAL(8, 3) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    odometer INT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT UNSIGNED NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
```

---

### 10. `vehicle_documents` Table
Stores URLs to vehicle-related documents (insurance, registration) (One-to-Many with `vehicles`).

```sql
CREATE TABLE vehicle_documents (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT UNSIGNED NOT NULL,
    document_type ENUM('insurance', 'registration', 'other') NOT NULL,
    document_url VARCHAR(512) NOT NULL,
    description VARCHAR(255) NULL,
    uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INT UNSIGNED NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);
```

---

### 11. `appointments` Table
Stores details about scheduled service appointments.

```sql
CREATE TABLE appointments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED NOT NULL,
    service_address_id INT UNSIGNED NULL, -- FK to customer_service_addresses OR store address directly
    service_address_street VARCHAR(255) NOT NULL, -- Denormalized/direct storage example
    service_address_city VARCHAR(100) NOT NULL,
    service_address_state VARCHAR(50) NOT NULL,
    service_address_zip_code VARCHAR(20) NOT NULL,
    service_address_country VARCHAR(50) NOT NULL,
    scheduled_start DATETIME NOT NULL,
    scheduled_end DATETIME NOT NULL,
    estimated_duration INT UNSIGNED NOT NULL, -- In minutes
    status ENUM('scheduled', 'in-progress', 'completed', 'cancelled', 'no-show') NOT NULL DEFAULT 'scheduled',
    assigned_vehicle_id INT UNSIGNED NULL,
    notes TEXT NULL,
    customer_signature_url VARCHAR(512) NULL,
    payment_status ENUM('pending', 'partial', 'paid', 'refunded') NOT NULL DEFAULT 'pending',
    payment_method ENUM('cash', 'credit', 'check', 'online') NULL,
    payment_amount DECIMAL(10, 2) NULL,
    payment_transaction_id VARCHAR(255) NULL,
    payment_receipt_url VARCHAR(512) NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    discount_type ENUM('percentage', 'fixed') NULL,
    discount_value DECIMAL(10, 2) NULL,
    discount_reason VARCHAR(255) NULL,
    final_price DECIMAL(10, 2) NOT NULL,
    rating TINYINT UNSIGNED NULL, -- 1-5 stars
    feedback TEXT NULL,
    calendar_event_id VARCHAR(255) NULL, -- Google Calendar event ID
    reminder_sent BOOLEAN NOT NULL DEFAULT FALSE,
    reminder_sent_at DATETIME NULL,
    confirmation_sent BOOLEAN NOT NULL DEFAULT FALSE,
    confirmation_sent_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT UNSIGNED NULL,
    updated_by INT UNSIGNED NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (service_address_id) REFERENCES customer_service_addresses(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_appointments_customer_id ON appointments(customer_id);
CREATE INDEX idx_appointments_scheduled_start ON appointments(scheduled_start);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_assigned_vehicle_id ON appointments(assigned_vehicle_id);
CREATE INDEX idx_appointments_service_address_zip_code ON appointments(service_address_zip_code);
```

---

### 12. `appointment_services` Table
Join table linking appointments to services (Many-to-Many).

```sql
CREATE TABLE appointment_services (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT UNSIGNED NOT NULL,
    service_id INT UNSIGNED NOT NULL,
    quantity DECIMAL(8, 2) NOT NULL DEFAULT 1.00,
    price DECIMAL(10, 2) NOT NULL,
    notes TEXT NULL,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    UNIQUE KEY uk_appointment_service (appointment_id, service_id)
);
```

---

### 13. `appointment_employees` Table
Join table linking appointments to assigned employees (Many-to-Many).

```sql
CREATE TABLE appointment_employees (
    appointment_id INT UNSIGNED NOT NULL,
    employee_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (appointment_id, employee_id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 14. `appointment_photos` Table
Stores URLs for before/after photos related to appointments (One-to-Many).

```sql
CREATE TABLE appointment_photos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT UNSIGNED NOT NULL,
    photo_type ENUM('before', 'after') NOT NULL,
    photo_url VARCHAR(512) NOT NULL,
    uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INT UNSIGNED NULL,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);
```

---

### 15. `time_entries` Table
Stores employee clock-in/out times.

```sql
CREATE TABLE time_entries (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_id INT UNSIGNED NOT NULL,
    entry_date DATE NOT NULL,
    clock_in DATETIME NOT NULL,
    clock_out DATETIME NULL,
    total_hours DECIMAL(5, 2) NULL,
    regular_hours DECIMAL(5, 2) NULL,
    overtime_hours DECIMAL(5, 2) NULL,
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    approved_by INT UNSIGNED NULL,
    approved_at DATETIME NULL,
    notes TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_time_entries_employee_date ON time_entries(employee_id, entry_date);
CREATE INDEX idx_time_entries_status ON time_entries(status);
```

---

### 16. `time_activities` Table
Stores specific activities within a time entry (One-to-Many with `time_entries`).

```sql
CREATE TABLE time_activities (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    time_entry_id INT UNSIGNED NOT NULL,
    type ENUM('drive-to-job', 'work', 'lunch-break', 'drive-home') NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NULL,
    duration_minutes INT UNSIGNED NULL, -- Calculated on end_time update
    appointment_id INT UNSIGNED NULL,
    notes TEXT NULL,
    is_driver BOOLEAN NULL, -- For drive activities
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (time_entry_id) REFERENCES time_entries(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL
);
```

---

### 17. `locations` Table
Stores information about service areas, headquarters, etc.

```sql
CREATE TABLE locations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('service-area', 'headquarters', 'warehouse', 'partner-location') NOT NULL,
    address_street VARCHAR(255) NOT NULL,
    address_city VARCHAR(100) NOT NULL,
    address_state VARCHAR(50) NOT NULL,
    address_zip_code VARCHAR(20) NOT NULL,
    address_country VARCHAR(50) NOT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    service_area_type ENUM('polygon', 'radius') NULL,
    service_area_details JSON NULL, -- Store polygon coordinates or radius/center
    contact_phone VARCHAR(30) NULL,
    contact_email VARCHAR(255) NULL,
    contact_website VARCHAR(255) NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT UNSIGNED NULL,
    updated_by INT UNSIGNED NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_locations_type ON locations(type);
CREATE INDEX idx_locations_zip_code ON locations(address_zip_code);
CREATE INDEX idx_locations_active ON locations(active);
-- Consider spatial index: CREATE SPATIAL INDEX idx_locations_coords ON locations(coordinates);
```

---

### 18. `location_business_hours` Table
Stores business hours for locations (One-to-Many with `locations`).

```sql
CREATE TABLE location_business_hours (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    location_id INT UNSIGNED NOT NULL,
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
    open_time TIME NULL,
    close_time TIME NULL,
    is_closed BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE,
    UNIQUE KEY uk_location_day (location_id, day_of_week)
);
```

---

### 19. `reviews` Table
Stores customer reviews.

```sql
CREATE TABLE reviews (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED NOT NULL,
    appointment_id INT UNSIGNED NULL,
    rating TINYINT UNSIGNED NOT NULL, -- 1-5 stars
    title VARCHAR(255) NULL,
    content TEXT NOT NULL,
    service_type VARCHAR(100) NULL, -- Denormalized from appointment/service for easier filtering
    service_date DATE NULL, -- Denormalized from appointment
    response_content TEXT NULL,
    response_date DATETIME NULL,
    responded_by INT UNSIGNED NULL,
    status ENUM('pending', 'approved', 'rejected', 'featured') NOT NULL DEFAULT 'pending',
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    verified BOOLEAN NOT NULL DEFAULT FALSE, -- Indicates if linked to a completed appointment
    anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
    FOREIGN KEY (responded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_appointment_id ON reviews(appointment_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_featured ON reviews(featured);
CREATE INDEX idx_reviews_service_date ON reviews(service_date);
```

---

### 20. `notifications` Table
Stores system and user notifications.

```sql
CREATE TABLE notifications (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    recipient_id INT UNSIGNED NOT NULL,
    type ENUM('appointment', 'system', 'message', 'alert') NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    related_model ENUM('appointment', 'customer', 'user', 'vehicle', 'service') NULL,
    related_id INT UNSIGNED NULL,
    priority ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at DATETIME NULL,
    expires_at DATETIME NULL,
    actions JSON NULL, -- Store actions like [{label: 'View', url: '/app/123'}]
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT UNSIGNED NULL,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
    -- Note: related_id cannot have a direct FK constraint due to multiple possible tables
);

-- Indexes
CREATE INDEX idx_notifications_recipient_read ON notifications(recipient_id, is_read);
CREATE INDEX idx_notifications_priority ON notifications(priority);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
CREATE INDEX idx_notifications_expires_at ON notifications(expires_at); -- For potential cleanup jobs
```

---

### 21. `audit_logs` Table
Tracks significant actions within the system.

```sql
CREATE TABLE audit_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NULL, -- Nullable for system actions
    action ENUM('create', 'read', 'update', 'delete', 'login', 'logout', 'export', 'import', 'other') NOT NULL,
    resource_model VARCHAR(50) NOT NULL,
    resource_id INT UNSIGNED NULL,
    description TEXT NOT NULL,
    details JSON NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_model, resource_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);