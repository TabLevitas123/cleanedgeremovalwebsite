# Clean Edge Removal LLC Website Project - Component Hierarchy

## Public Website Components

### Layout Components

```
App
└── PublicLayout
    ├── Header
    │   ├── Logo
    │   ├── Navigation
    │   │   ├── NavItem
    │   │   └── MobileMenu
    │   └── CTAButton
    ├── Main
    │   └── {Page Content}
    └── Footer
        ├── FooterNav
        ├── SocialLinks
        ├── ContactInfo
        └── Copyright
```

### Page Components

```
HomePage
├── HeroSection
│   ├── HeroContent
│   │   ├── Headline
│   │   ├── Subheading
│   │   └── CTAButton
│   └── TrustIndicators
├── ServicesSection
│   ├── SectionHeader
│   ├── ServiceGrid
│   │   └── ServiceCard (multiple)
│   │       ├── ServiceIcon
│   │       ├── ServiceName
│   │       ├── ServiceDescription
│   │       └── LearnMoreButton
│   └── ViewAllServicesButton
├── WhyChooseUsSection
│   ├── SectionHeader
│   ├── DifferentiatorGrid
│   │   └── DifferentiatorItem (multiple)
│   │       ├── DifferentiatorIcon
│   │       ├── DifferentiatorHeading
│   │       └── DifferentiatorDescription
│   └── StatisticalHighlights
│       └── StatItem (multiple)
├── ReviewsSection
│   ├── SectionHeader
│   ├── ReviewCarousel
│   │   ├── ReviewCard (multiple)
│   │   │   ├── QuoteIcon
│   │   │   ├── ReviewContent
│   │   │   ├── StarRating
│   │   │   ├── CustomerName
│   │   │   └── ServiceType
│   │   ├── CarouselNavigation
│   │   │   ├── PrevButton
│   │   │   └── NextButton
│   │   └── CarouselIndicators
│   └── SeeAllReviewsButton
├── ServiceAreaSection
│   ├── SectionHeader
│   ├── ServiceAreaMap
│   │   ├── GoogleMap
│   │   └── ServiceAreaOverlay
│   ├── ServiceAreaContent
│   │   ├── ServiceAreaDescription
│   │   └── ServiceAreaCities
│   └── AddressCheckerTool
│       ├── AddressInput
│       └── CheckButton
└── SchedulingSection
    ├── SectionHeader
    ├── SchedulingForm
    │   ├── ContactInfoFields
    │   │   ├── NameInput
    │   │   ├── AddressInput
    │   │   ├── EmailInput
    │   │   └── PhoneInputs
    │   ├── ServiceSelectionFields
    │   │   └── ServiceCheckbox (multiple)
    │   ├── PrivacyPolicyCheckbox
    │   ├── MarketingConsentCheckbox
    │   ├── ReCAPTCHA
    │   └── FormButtons
    │       ├── SubmitButton
    │       └── ClearButton
    └── CalendarDisplay (conditional)
        ├── MonthNavigation
        ├── DateGrid
        │   └── DateCell (multiple)
        ├── TimeSlotSelection
        └── ConfirmationButton
```

### Other Page Components

```
ServicesPage
├── ServicesBanner
├── ServicesIntro
├── ServiceCategoryTabs
│   └── ServiceCategoryTab (multiple)
├── ServiceList
│   └── ServiceDetailCard (multiple)
│       ├── ServiceImage
│       ├── ServiceInfo
│       │   ├── ServiceName
│       │   ├── ServiceDescription
│       │   └── ServiceFeatures
│       └── ServiceCTA
└── SchedulingCTA

AboutPage
├── AboutBanner
├── CompanyStory
├── MissionVision
├── TeamSection
│   └── TeamMemberCard (multiple)
├── ValuesSection
│   └── ValueCard (multiple)
└── HistoryTimeline
    └── TimelineItem (multiple)

ContactPage
├── ContactBanner
├── ContactInfo
│   ├── AddressInfo
│   ├── PhoneInfo
│   └── EmailInfo
├── ContactForm
│   ├── FormFields
│   ├── ReCAPTCHA
│   └── SubmitButton
└── LocationMap

ReviewsPage
├── ReviewsBanner
├── ReviewsIntro
├── ReviewFilters
├── ReviewsList
│   └── ReviewCard (multiple)
└── ReviewPagination
```

## Administrative Portal Components

### Layout Components

```
AdminApp
└── AdminLayout
    ├── AdminHeader
    │   ├── Logo
    │   ├── SearchBar
    │   ├── NotificationsDropdown
    │   │   └── NotificationItem (multiple)
    │   └── UserMenu
    │       ├── UserInfo
    │       ├── ProfileLink
    │       ├── SettingsLink
    │       └── LogoutButton
    ├── AdminSidebar
    │   ├── SidebarHeader
    │   ├── NavigationMenu
    │   │   └── NavigationItem (multiple)
    │   │       └── SubNavigationItem (multiple, conditional)
    │   └── SidebarFooter
    │       └── SystemInfo
    ├── AdminMain
    │   ├── PageHeader
    │   │   ├── PageTitle
    │   │   └── PageActions
    │   └── {Page Content}
    └── AdminFooter
```

### Dashboard Components

```
AdminDashboard
├── DashboardHeader
│   ├── WelcomeMessage
│   ├── DateDisplay
│   └── QuickActions
├── DashboardWidgets
│   ├── AppointmentCalendarWidget
│   │   ├── CalendarNavigation
│   │   └── CalendarView
│   │       └── AppointmentItem (multiple)
│   ├── ServiceRequestsWidget
│   │   ├── WidgetHeader
│   │   └── RequestList
│   │       └── RequestItem (multiple)
│   ├── EmployeeStatusWidget
│   │   ├── WidgetHeader
│   │   └── EmployeeStatusList
│   │       └── EmployeeStatusItem (multiple)
│   ├── KPIWidget
│   │   ├── WidgetHeader
│   │   └── KPIGrid
│   │       └── KPICard (multiple)
│   └── TruckLocationWidget
│       ├── WidgetHeader
│       └── LocationMap
│           └── TruckMarker (multiple)
└── SystemConfigPanel
    ├── ConfigHeader
    ├── AutoScheduleToggle
    ├── TruckCountSelector
    ├── BlackoutDateManager
    │   ├── BlackoutDateList
    │   │   └── BlackoutDateItem (multiple)
    │   └── AddBlackoutDateButton
    └── BusinessHoursConfig
        └── DayConfig (multiple)
```

### User Management Components

```
UserManagement
├── UserManagementHeader
│   ├── PageTitle
│   └── AddUserButton
├── UserFilters
│   ├── SearchInput
│   ├── RoleFilter
│   └── StatusFilter
├── UserList
│   ├── UserListHeader
│   └── UserListItem (multiple)
│       ├── UserBasicInfo
│       ├── UserRole
│       ├── UserStatus
│       └── UserActions
└── UserPagination

UserForm
├── FormHeader
├── PersonalInfoSection
│   ├── NameInputs
│   ├── AddressInputs
│   └── ContactInputs
├── AccountInfoSection
│   ├── UsernameInput
│   ├── PasswordInput
│   ├── EmailInput
│   └── RoleSelect
├── PermissionsSection
│   └── PermissionCheckbox (multiple)
└── FormActions
    ├── SaveButton
    ├── CancelButton
    └── DeleteButton (conditional)

UserProfile
├── ProfileHeader
│   ├── ProfileImage
│   ├── UserName
│   └── UserRole
├── ProfileTabs
│   ├── PersonalInfoTab
│   ├── ActivityTab
│   ├── PermissionsTab
│   └── SecurityTab
└── TabContent
    └── {Tab-specific content}
```

### Customer Management Components

```
CustomerManagement
├── CustomerManagementHeader
│   ├── PageTitle
│   └── AddCustomerButton
├── CustomerFilters
│   ├── SearchInput
│   ├── TagFilter
│   └── StatusFilter
├── CustomerList
│   ├── CustomerListHeader
│   └── CustomerListItem (multiple)
│       ├── CustomerBasicInfo
│       ├── CustomerContact
│       ├── CustomerStats
│       └── CustomerActions
└── CustomerPagination

CustomerForm
├── FormHeader
├── PersonalInfoSection
│   ├── NameInputs
│   └── ContactInputs
├── AddressSection
│   ├── PrimaryAddressInputs
│   └── ServiceAddressList
│       ├── ServiceAddressItem (multiple)
│       └── AddServiceAddressButton
├── NotesSection
│   └── NotesTextarea
├── TagsSection
│   ├── TagList
│   │   └── TagItem (multiple)
│   └── AddTagInput
└── FormActions
    ├── SaveButton
    ├── CancelButton
    └── DeleteButton (conditional)

CustomerProfile
├── ProfileHeader
│   ├── CustomerName
│   ├── CustomerContact
│   └── CustomerSince
├── ProfileTabs
│   ├── OverviewTab
│   ├── AppointmentsTab
│   ├── CommunicationTab
│   └── NotesTab
└── TabContent
    └── {Tab-specific content}
```

### Appointment Management Components

```
AppointmentManagement
├── AppointmentCalendar
│   ├── CalendarNavigation
│   │   ├── ViewToggle
│   │   │   ├── DayViewButton
│   │   │   ├── WeekViewButton
│   │   │   └── MonthViewButton
│   │   ├── DateNavigation
│   │   │   ├── PreviousButton
│   │   │   ├── NextButton
│   │   │   └── TodayButton
│   │   └── DateDisplay
│   └── CalendarView
│       ├── TimeGrid
│       └── AppointmentItem (multiple)
├── AppointmentList
│   ├── ListHeader
│   ├── ListFilters
│   │   ├── StatusFilter
│   │   ├── ServiceFilter
│   │   └── DateRangeFilter
│   └── AppointmentListItem (multiple)
│       ├── AppointmentBasicInfo
│       ├── AppointmentStatus
│       ├── AppointmentAssignments
│       └── AppointmentActions
└── AppointmentDetails
    ├── DetailsHeader
    │   ├── AppointmentId
    │   ├── AppointmentStatus
    │   └── AppointmentActions
    ├── CustomerSection
    │   ├── CustomerInfo
    │   └── ServiceAddress
    ├── ServicesSection
    │   └── ServiceItem (multiple)
    ├── ScheduleSection
    │   ├── DateInfo
    │   ├── TimeInfo
    │   └── DurationInfo
    ├── AssignmentSection
    │   ├── AssignedEmployees
    │   │   └── EmployeeItem (multiple)
    │   └── AssignedVehicle
    ├── NotesSection
    │   └── NotesEditor
    ├── PhotosSection
    │   ├── BeforePhotos
    │   │   └── PhotoItem (multiple)
    │   └── AfterPhotos
    │       └── PhotoItem (multiple)
    ├── SignatureSection
    │   └── SignatureDisplay
    └── PaymentSection
        ├── PaymentStatus
        ├── PaymentDetails
        └── PaymentActions
```

### Vehicle Management Components

```
VehicleManagement
├── VehicleManagementHeader
│   ├── PageTitle
│   └── AddVehicleButton
├── VehicleFilters
│   ├── SearchInput
│   ├── TypeFilter
│   └── StatusFilter
├── VehicleList
│   ├── VehicleListHeader
│   └── VehicleListItem (multiple)
│       ├── VehicleBasicInfo
│       ├── VehicleStatus
│       ├── VehicleAssignments
│       └── VehicleActions
└── VehiclePagination

VehicleForm
├── FormHeader
├── BasicInfoSection
│   ├── NameInput
│   ├── TypeSelect
│   ├── LicensePlateInput
│   └── VehicleDetailsInputs
├── CapacitySection
│   ├── VolumeInput
│   └── WeightInput
├── StatusSection
│   └── StatusSelect
├── AssignmentSection
│   └── EmployeeSelect (multiple)
├── InsuranceSection
│   ├── ProviderInput
│   ├── PolicyNumberInput
│   ├── ExpirationDateInput
│   └── DocumentUpload
├── RegistrationSection
│   ├── ExpirationDateInput
│   └── DocumentUpload
└── FormActions
    ├── SaveButton
    ├── CancelButton
    └── DeleteButton (conditional)

VehicleDetails
├── DetailsHeader
│   ├── VehicleName
│   ├── VehicleStatus
│   └── VehicleActions
├── DetailsTabs
│   ├── OverviewTab
│   ├── MaintenanceTab
│   ├── FuelTab
│   └── AppointmentsTab
└── TabContent
    └── {Tab-specific content}
```

## Employee Portal Components

### Layout Components

```
EmployeeApp
└── EmployeeLayout
    ├── EmployeeHeader
    │   ├── Logo
    │   ├── CurrentTime
    │   ├── NotificationsIcon
    │   └── UserMenu
    │       ├── UserInfo
    │       └── LogoutButton
    ├── EmployeeNavigation
    │   └── NavItem (multiple)
    ├── EmployeeMain
    │   └── {Page Content}
    └── EmployeeFooter
```

### Time Tracking Components

```
TimeTrackingModule
├── TimeTrackingHeader
│   ├── CurrentDate
│   ├── CurrentTime
│   └── EmployeeName
├── TimeStatusDisplay
│   ├── ClockStatus
│   ├── TotalHoursToday
│   └── CurrentActivity
├── TimeActionToggles
│   ├── ClockToggle
│   ├── DriveToJobToggle
│   ├── WorkToggle
│   ├── LunchBreakToggle
│   └── DriveHomeToggle
├── DriverPassengerPrompt (conditional)
│   ├── DriverButton
│   └── PassengerButton
├── TimeSummary
│   ├── DailySummary
│   │   └── ActivitySummaryItem (multiple)
│   ├── WeeklySummary
│   │   ├── RegularHours
│   │   └── OvertimeHours
│   └── MonthlyYearlySummary
│       └── SummaryItem (multiple)
└── TimeVisualization
    └── ActivityChart
```

### Job Assignment Components

```
JobAssignmentModule
├── DailyScheduleHeader
│   ├── DateDisplay
│   ├── ScheduleNavigation
│   │   ├── PreviousDayButton
│   │   ├── NextDayButton
│   │   └── TodayButton
│   └── TotalAppointments
├── AppointmentList
│   └── AppointmentItem (multiple)
│       ├── TimeInfo
│       ├── CustomerInfo
│       ├── AddressInfo
│       ├── ServiceInfo
│       └── AppointmentActions
│           ├── ViewDetailsButton
│           ├── StartNavigationButton
│           └── CompleteButton
├── AppointmentDetails (conditional)
│   ├── DetailsHeader
│   ├── CustomerSection
│   ├── ServiceSection
│   ├── NotesSection
│   ├── PhotoSection
│   │   ├── BeforePhotosUpload
│   │   └── AfterPhotosUpload
│   ├── SignatureSection
│   │   └── SignaturePad
│   └── CompletionSection
│       ├── AdditionalServicesRecommendation
│       └── CompleteAppointmentButton
├── NavigationModule (conditional)
│   ├── MapView
│   ├── DirectionsList
│   ├── ETA
│   └── NavigationControls
└── CommunicationTools
    ├── TeamMessaging
    ├── DispatcherContact
    ├── CustomerNotification
    └── EmergencyAlert
```

## Shared Components

### UI Components

```
Button
├── PrimaryButton
├── SecondaryButton
├── TertiaryButton
├── IconButton
└── LinkButton

Input
├── TextInput
├── TextArea
├── Select
├── Checkbox
├── RadioButton
├── DatePicker
├── TimePicker
├── FileUpload
├── SearchInput
└── PhoneInput

Feedback
├── Alert
│   ├── SuccessAlert
│   ├── ErrorAlert
│   ├── WarningAlert
│   └── InfoAlert
├── Toast
├── Modal
├── Spinner
└── ProgressBar

Navigation
├── Tabs
├── Breadcrumbs
├── Pagination
├── Stepper
└── Dropdown

Display
├── Card
├── Table
├── List
├── Badge
├── Avatar
├── Tooltip
├── Accordion
└── Carousel

Charts
├── LineChart
├── BarChart
├── PieChart
├── AreaChart
└── GaugeChart

Maps
├── GoogleMap
├── MapMarker
├── MapPolygon
└── MapInfoWindow
```

### Form Components

```
Form
├── FormSection
├── FormGroup
├── FormLabel
├── FormInput
├── FormError
├── FormHelperText
└── FormActions

ValidationSchema
├── StringValidator
├── NumberValidator
├── DateValidator
├── EmailValidator
├── PhoneValidator
├── AddressValidator
└── PasswordValidator
```

### Authentication Components

```
AuthComponents
├── LoginForm
├── RegisterForm
├── ForgotPasswordForm
├── ResetPasswordForm
├── MFASetupForm
├── MFAVerificationForm
└── PasswordChangeForm
```

### Notification Components

```
NotificationComponents
├── NotificationCenter
├── NotificationList
├── NotificationItem
├── NotificationBadge
└── PushNotificationManager