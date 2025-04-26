# Clean Edge Removal LLC Website Project - Component Hierarchy (Updated 2025-04-20)

This document meticulously details the planned and partially implemented React component hierarchy for the Clean Edge Removal LLC website's frontend application (`client/`). It follows Atomic Design principles where appropriate (Atoms -> Molecules -> Organisms -> Templates -> Pages/Sections) to promote reusability, maintainability, and a clear separation of concerns.

**Legend:**

*   `(✓)` - Component/Directory exists.
*   `(~)` - Component/Directory exists but may need updates/verification.
*   `(P)` - Planned Component/Directory, not yet created.
*   `(...)` - Indicates further sub-components or variations not exhaustively listed.
*   `{...}` - Placeholder for dynamic content or child components.
*   `(*)` - Indicates multiple instances of this component are expected (e.g., in lists or grids).

```
client/src/
├── App.tsx (✓)                     # Root component, sets up Router, global Context Providers, main Layout
│
├── components/ (✓)
│   ├── atoms/ (✓)                  # Smallest, indivisible UI elements
│   │   ├── Button.tsx (✓)          # Button element with variants (primary, secondary, outline, etc.)
│   │   ├── Icon.tsx (✓)            # Renders SVG icons
│   │   ├── Logo.tsx (✓)            # Renders the company logo
│   │   ├── ScrollToTop.tsx (✓)     # Utility to scroll window to top on route change
│   │   ├── InputField.tsx (P)      # Basic input element (text, email, tel, password, number)
│   │   ├── TextAreaField.tsx (P)   # Basic textarea element
│   │   ├── CheckboxField.tsx (P)   # Basic checkbox element (needs custom circle styling)
│   │   ├── RadioButtonField.tsx (P)# Basic radio button element
│   │   ├── SelectField.tsx (P)     # Basic select dropdown element
│   │   ├── Label.tsx (P)           # Form label element
│   │   ├── Spinner.tsx (P)         # Loading spinner animation
│   │   ├── Badge.tsx (P)           # Small status indicator/tag
│   │   ├── Avatar.tsx (P)          # User avatar display
│   │   ├── Tooltip.tsx (P)         # Information tooltip on hover/focus
│   │   └── (...)                   # Other potential atoms: Link, Image, Heading, Paragraph
│   │
│   ├── molecules/ (✓)              # Functional UI units composed of atoms
│   │   ├── Breadcrumbs.tsx (✓)     # Navigational breadcrumbs trail
│   │   ├── CookieConsent.tsx (✓)   # Banner/modal for cookie consent
│   │   ├── FaqAccordion.tsx (✓)    # Expandable item for FAQ lists
│   │   ├── MobileMenu.tsx (✓)      # Off-canvas or dropdown menu for mobile navigation
│   │   ├── NewsletterSignup.tsx (✓)# Simple form for newsletter subscription
│   │   ├── NotificationToast.tsx (✓)# Temporary notification message display
│   │   ├── SearchBar.tsx (✓)       # Input field with search icon/button
│   │   ├── ServiceCard.tsx (✓)     # Displays summary of a service (icon, name, description)
│   │   ├── SocialLinks.tsx (✓)     # Group of social media icon links
│   │   ├── TestimonialCard.tsx (✓) # Displays a single customer testimonial
│   │   ├── UserMenu.tsx (✓)        # Dropdown menu for authenticated user actions (profile, logout)
│   │   ├── FormField.tsx (P)       # Combines Label, Input/Select/Textarea, and Error message
│   │   ├── StatItem.tsx (P)        # Displays a single statistic with label/icon (for WhyChooseUs)
│   │   ├── DifferentiatorItem.tsx (P)# Displays a single differentiator (icon, heading, text)
│   │   ├── ReviewCard.tsx (P)      # Detailed review display card (used in carousel/list)
│   │   ├── DateCell.tsx (P)        # Represents a single day in a calendar grid
│   │   ├── TimeSlotButton.tsx (P)  # Button for selecting a time slot
│   │   ├── NavItem.tsx (P)         # Individual navigation link item (used in Header/Footer)
│   │   └── (...)                   # Other potential molecules: PaginationControls, FilterDropdown
│   │
│   ├── organisms/ (✓)              # Complex UI sections composed of molecules and/or atoms
│   │   ├── Footer.tsx (✓)          # Site-wide footer organism
│   │   ├── Header.tsx (✓)          # Site-wide header organism (Logo, Navigation, CTA)
│   │   ├── SchedulingForm.tsx (P)  # The complete quote request/scheduling form organism
│   │   ├── ServiceGrid.tsx (P)     # Grid layout displaying multiple ServiceCards
│   │   ├── ReviewCarousel.tsx (P)  # Carousel displaying multiple TestimonialCards
│   │   ├── DifferentiatorGrid.tsx (P)# Grid layout for WhyChooseUs differentiators
│   │   ├── StatisticalHighlights.tsx (P)# Section displaying key statistics (uses StatItem)
│   │   ├── ServiceAreaMapDisplay.tsx (P)# Organism containing Google Map and address checker
│   │   ├── AppointmentCalendar.tsx (P)# Calendar display for admin/scheduling
│   │   ├── UserListTable.tsx (P)   # Table for displaying list of users (admin)
│   │   ├── CustomerListTable.tsx (P)# Table for displaying list of customers (admin)
│   │   ├── TimeClockInterface.tsx (P)# Main interface for employee time tracking
│   │   └── (...)                   # Other potential organisms: AdminDashboardWidgets, EmployeeScheduleList
│   │
│   ├── pages/ (✓)                  # Top-level components representing distinct application pages/views
│   │   ├── auth/ (✓)               # Authentication pages
│   │   │   ├── ForgotPasswordPage.tsx (✓)
│   │   │   ├── LoginPage.tsx          (✓)
│   │   │   ├── MfaVerificationPage.tsx(✓)
│   │   │   ├── RegisterPage.tsx       (✓)
│   │   │   ├── ResetPasswordPage.tsx  (✓)
│   │   │   ├── VerificationSentPage.tsx(✓)
│   │   │   └── VerifyEmailPage.tsx    (✓)
│   │   ├── error/ (✓)              # Error display pages
│   │   │   ├── MaintenancePage.tsx    (✓)
│   │   │   ├── NotFoundPage.tsx       (✓) # 404
│   │   │   ├── ServerErrorPage.tsx    (✓) # 500
│   │   │   └── UnauthorizedPage.tsx   (✓) # 401/403
│   │   └── public/ (✓)             # Publicly accessible website pages
│   │       ├── HomePage.tsx (✓)      # Container page that renders all homepage sections
│   │       │   └── HomePage/ (✓)     # Directory grouping homepage-specific components/sections
│   │       │       └── sections/ (✓) # Individual, self-contained sections of the HomePage
│   │       │           ├── CtaSection.tsx             (P) # Call to Action section component
│   │       │           ├── FaqSection.tsx             (P) # FAQ section component (uses FaqAccordion)
│   │       │           ├── HeroSection.tsx            (P) # Hero banner section component
│   │       │           ├── HowItWorksSection.tsx      (P) # "How It Works" steps/explanation component
│   │       │           ├── NewsletterSection.tsx      (P) # Newsletter signup section component (uses NewsletterSignup molecule)
│   │       │           ├── SchedulingContactSection.tsx (✓) # Scheduling/Contact form section component (contains SchedulingForm organism)
│   │       │           ├── ServiceAreaSection.tsx     (P) # Service Area section component (uses ServiceAreaMapDisplay organism)
│   │       │           ├── ServicesSection.tsx        (P) # Services overview section component (uses ServiceGrid organism)
│   │       │           ├── TestimonialsSection.tsx    (P) # Testimonials section component (uses ReviewCarousel organism)
│   │       │           └── WhyChooseUsSection.tsx     (P) # "Why Choose Us" section component (uses DifferentiatorGrid, StatisticalHighlights organisms)
│   │       ├── AboutPage.tsx (P)
│   │       ├── ContactPage.tsx (P)
│   │       ├── PrivacyPolicyPage.tsx (P)
│   │       ├── ReviewsPage.tsx (P)
│   │       ├── ServicesListPage.tsx (P)
│   │       └── TermsOfServicePage.tsx (P)
│   │   ├── admin/ (P)                # Admin portal pages
│   │   │   ├── AdminDashboardPage.tsx (P)
│   │   │   ├── UserManagementPage.tsx (P)
│   │   │   ├── CustomerManagementPage.tsx (P)
│   │   │   ├── AppointmentManagementPage.tsx (P)
│   │   │   ├── VehicleManagementPage.tsx (P)
│   │   │   ├── ServiceManagementPage.tsx (P)
│   │   │   ├── SettingsPage.tsx (P)
│   │   │   └── ReportsPage.tsx (P)
│   │   └── employee/ (P)             # Employee portal pages
│   │       ├── EmployeeDashboardPage.tsx (P)
│   │       ├── TimeClockPage.tsx (P)
│   │       └── SchedulePage.tsx (P)
│   │
│   └── templates/ (✓)              # Define the overall structure/layout for different types of pages
│       ├── AdminLayout.tsx    (✓)    # Wraps admin pages (Sidebar, AdminHeader, etc.)
│       ├── AuthLayout.tsx     (✓)    # Wraps auth pages (centered form layout)
│       ├── EmployeeLayout.tsx (✓)    # Wraps employee pages (EmployeeHeader, EmployeeNav)
│       └── MainLayout.tsx     (✓)    # Wraps public pages (Header, Footer)
│
├── contexts/ (✓)                 # React Context providers for global state management (alternative/supplement to Redux)
│   └── (...)                   (P) # E.g., ThemeContext.tsx, AppSettingsContext.tsx
│
├── error/ (✓)                    # Error handling utilities and components
│   └── ErrorBoundary.tsx (✓)     # Catches runtime errors in child components
│
├── features/ (✓)                 # Feature-based modules (Redux state, hooks, selectors, thunks)
│   ├── admin/ (✓)                # Admin portal specific features state/logic
│   ├── auth/ (✓)                 # Authentication state and logic
│   │   └── authSlice.ts (✓)      # Redux slice for auth state
│   ├── employee/ (✓)             # Employee portal specific features state/logic
│   ├── notifications/ (✓)        # UI Notification state and logic
│   │   └── notificationSlice.ts (✓)# Redux slice for UI notifications
│   ├── public/ (✓)               # Public site specific features state/logic
│   ├── scheduling/ (✓)           # Scheduling related state and logic
│   └── ui/ (✓)                   # General UI state (loading, modals, etc.)
│       └── uiSlice.ts (✓)        # Redux slice for UI state
│
├── hooks/ (✓)                    # Custom React hooks for reusable logic
│   └── (...)                   (P) # E.g., useAuth.ts, useApi.ts, useForm.ts, useClickOutside.ts
│
├── services/ (✓)                 # API interaction layer
│   └── api.ts (✓)                # Configured Axios instance and potentially base API functions
│   └── (...)                   (P) # E.g., quoteService.ts, authService.ts, appointmentService.ts
│
├── store/ (✓)                    # Redux store setup
│   └── index.ts (✓)              # `configureStore` from Redux Toolkit, middleware setup
│   └── (...)                   (P) # Potentially rootReducer.ts, selectors/, middleware/
│
├── styles/ (✓)                   # Global CSS styles and configurations
│   └── index.css (✓)             # Main CSS entry point, imports Tailwind directives, global styles
│   └── (...)                   (P) # E.g., base.css, typography.css, animations.css
│
├── types/ (✓)                    # Client-specific TypeScript types and interfaces
│   └── (...)                   (P) # E.g., react-app-env.d.ts, global.d.ts, specific component prop types
│
└── utils/ (✓)                    # Client-side utility functions
    ├── env.ts (✓)                # Type-safe environment variable access
    └── logger.ts (✓)             # Client-side logging utility
    └── (...)                   (P) # E.g., helpers.ts, formatters.ts, validation.ts