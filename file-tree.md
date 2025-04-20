# Clean Edge Removal LLC Website Project - File Tree Structure

```
/cleanedgeremovalwebsite/
├── README.md                    # Project documentation
├── package.json                 # Root package.json for workspace configuration
├── .gitignore                   # Git ignore file
├── .env.example                 # Example environment variables
├── docker-compose.yml           # Docker compose configuration
├── Dockerfile                   # Docker configuration
│
├── client/                      # Frontend React application
│   ├── public/                  # Static assets
│   │   ├── index.html           # HTML entry point
│   │   ├── favicon.ico          # Favicon
│   │   ├── robots.txt           # Robots.txt file
│   │   ├── manifest.json        # PWA manifest
│   │   └── assets/              # Static assets (images, fonts)
│   │       ├── images/          # Image assets
│   │       └── fonts/           # Font assets
│   │
│   ├── src/                     # Source code
│   │   ├── index.tsx            # Entry point
│   │   ├── App.tsx              # Main App component
│   │   ├── routes.tsx           # Route definitions
│   │   │
│   │   ├── assets/              # Dynamic assets
│   │   │   ├── images/          # Image assets
│   │   │   ├── styles/          # Global styles
│   │   │   └── fonts/           # Font assets
│   │   │
│   │   ├── components/          # Reusable UI components
│   │   │   ├── common/          # Shared components
│   │   │   │   ├── Button/      # Button component
│   │   │   │   ├── Card/        # Card component
│   │   │   │   ├── Modal/       # Modal component
│   │   │   │   ├── Dropdown/    # Dropdown component
│   │   │   │   └── ...          # Other common components
│   │   │   │
│   │   │   ├── layout/          # Layout components
│   │   │   │   ├── Header/      # Header component
│   │   │   │   ├── Footer/      # Footer component
│   │   │   │   ├── Sidebar/     # Sidebar component
│   │   │   │   └── ...          # Other layout components
│   │   │   │
│   │   │   ├── forms/           # Form components
│   │   │   │   ├── Input/       # Input component
│   │   │   │   ├── Select/      # Select component
│   │   │   │   ├── Checkbox/    # Checkbox component
│   │   │   │   └── ...          # Other form components
│   │   │   │
│   │   │   └── ui/              # UI elements
│   │   │       ├── Icons/       # Icon components
│   │   │       ├── Loaders/     # Loading indicators
│   │   │       ├── Alerts/      # Alert components
│   │   │       └── ...          # Other UI components
│   │   │
│   │   ├── features/            # Feature-based modules
│   │   │   ├── home/            # Home page feature
│   │   │   ├── services/        # Services section feature
│   │   │   ├── scheduling/      # Scheduling feature
│   │   │   ├── reviews/         # Customer reviews feature
│   │   │   ├── about/           # About us feature
│   │   │   ├── contact/         # Contact feature
│   │   │   ├── auth/            # Authentication feature
│   │   │   └── ...              # Other features
│   │   │
│   │   ├── pages/               # Page components
│   │   │   ├── HomePage/        # Home page
│   │   │   ├── ServicesPage/    # Services page
│   │   │   ├── AboutPage/       # About page
│   │   │   ├── ContactPage/     # Contact page
│   │   │   ├── SchedulingPage/  # Scheduling page
│   │   │   ├── AdminPage/       # Admin portal entry
│   │   │   ├── EmployeePage/    # Employee portal entry
│   │   │   └── ...              # Other pages
│   │   │
│   │   ├── store/               # Redux store
│   │   │   ├── index.ts         # Store configuration
│   │   │   ├── rootReducer.ts   # Root reducer
│   │   │   ├── slices/          # Redux slices
│   │   │   │   ├── authSlice.ts # Authentication slice
│   │   │   │   ├── userSlice.ts # User slice
│   │   │   │   └── ...          # Other slices
│   │   │   │
│   │   │   ├── actions/         # Redux actions
│   │   │   └── selectors/       # Redux selectors
│   │   │
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useAuth.ts       # Authentication hook
│   │   │   ├── useForm.ts       # Form handling hook
│   │   │   ├── useApi.ts        # API hook
│   │   │   └── ...              # Other hooks
│   │   │
│   │   ├── utils/               # Utility functions
│   │   │   ├── api.ts           # API utilities
│   │   │   ├── validation.ts    # Validation utilities
│   │   │   ├── formatting.ts    # Formatting utilities
│   │   │   ├── dates.ts         # Date utilities
│   │   │   └── ...              # Other utilities
│   │   │
│   │   ├── services/            # API service functions
│   │   │   ├── authService.ts   # Authentication service
│   │   │   ├── userService.ts   # User service
│   │   │   ├── appointmentService.ts # Appointment service
│   │   │   └── ...              # Other services
│   │   │
│   │   ├── contexts/            # React contexts
│   │   │   ├── AuthContext.tsx  # Authentication context
│   │   │   ├── ThemeContext.tsx # Theme context
│   │   │   └── ...              # Other contexts
│   │   │
│   │   ├── types/               # TypeScript type definitions
│   │   │   ├── auth.types.ts    # Authentication types
│   │   │   ├── user.types.ts    # User types
│   │   │   ├── appointment.types.ts # Appointment types
│   │   │   └── ...              # Other type definitions
│   │   │
│   │   ├── constants/           # Constants and configuration
│   │   │   ├── routes.ts        # Route constants
│   │   │   ├── api.ts           # API constants
│   │   │   ├── theme.ts         # Theme constants
│   │   │   └── ...              # Other constants
│   │   │
│   │   └── config/              # Configuration files
│   │       ├── axios.ts         # Axios configuration
│   │       └── ...              # Other configurations
│   │
│   ├── .env                     # Environment variables
│   ├── .env.development         # Development environment variables
│   ├── .env.production          # Production environment variables
│   ├── package.json             # Frontend package.json
│   ├── tsconfig.json            # TypeScript configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   └── jest.config.js           # Jest configuration
│
├── server/                      # Backend Node.js/Express application
│   ├── src/                     # Source code
│   │   ├── index.ts             # Entry point
│   │   ├── app.ts               # Express application setup
│   │   ├── server.ts            # Server configuration
│   │   │
│   │   ├── config/              # Configuration files
│   │   │   ├── database.ts      # Database configuration
│   │   │   ├── environment.ts   # Environment configuration
│   │   │   ├── logger.ts        # Logger configuration
│   │   │   └── ...              # Other configurations
│   │   │
│   │   ├── api/                 # API routes and controllers
│   │   │   ├── routes/          # Route definitions
│   │   │   │   ├── auth.routes.ts # Authentication routes
│   │   │   │   ├── user.routes.ts # User routes
│   │   │   │   ├── appointment.routes.ts # Appointment routes
│   │   │   │   └── ...          # Other route definitions
│   │   │   │
│   │   │   ├── controllers/     # Route controllers
│   │   │   │   ├── auth.controller.ts # Authentication controller
│   │   │   │   ├── user.controller.ts # User controller
│   │   │   │   ├── appointment.controller.ts # Appointment controller
│   │   │   │   └── ...          # Other controllers
│   │   │   │
│   │   │   ├── middlewares/     # Express middlewares
│   │   │   │   ├── auth.middleware.ts # Authentication middleware
│   │   │   │   ├── validation.middleware.ts # Validation middleware
│   │   │   │   ├── error.middleware.ts # Error handling middleware
│   │   │   │   └── ...          # Other middlewares
│   │   │   │
│   │   │   └── validators/      # Request validators
│   │   │       ├── auth.validator.ts # Authentication validators
│   │   │       ├── user.validator.ts # User validators
│   │   │       ├── appointment.validator.ts # Appointment validators
│   │   │       └── ...          # Other validators
│   │   │
│   │   ├── models/              # Database models
│   │   │   ├── user.model.ts    # User model
│   │   │   ├── customer.model.ts # Customer model
│   │   │   ├── appointment.model.ts # Appointment model
│   │   │   ├── service.model.ts # Service model
│   │   │   ├── vehicle.model.ts # Vehicle model
│   │   │   ├── timeEntry.model.ts # Time entry model
│   │   │   ├── location.model.ts # Location model
│   │   │   ├── review.model.ts  # Review model
│   │   │   ├── notification.model.ts # Notification model
│   │   │   ├── auditLog.model.ts # Audit log model
│   │   │   └── ...              # Other models
│   │   │
│   │   ├── services/            # Business logic services
│   │   │   ├── auth.service.ts  # Authentication service
│   │   │   ├── user.service.ts  # User service
│   │   │   ├── appointment.service.ts # Appointment service
│   │   │   ├── email.service.ts # Email service
│   │   │   ├── sms.service.ts   # SMS service
│   │   │   ├── payment.service.ts # Payment service
│   │   │   ├── calendar.service.ts # Calendar service
│   │   │   ├── geolocation.service.ts # Geolocation service
│   │   │   └── ...              # Other services
│   │   │
│   │   ├── utils/               # Utility functions
│   │   │   ├── jwt.ts           # JWT utilities
│   │   │   ├── encryption.ts    # Encryption utilities
│   │   │   ├── validation.ts    # Validation utilities
│   │   │   ├── formatting.ts    # Formatting utilities
│   │   │   └── ...              # Other utilities
│   │   │
│   │   ├── types/               # TypeScript type definitions
│   │   │   ├── auth.types.ts    # Authentication types
│   │   │   ├── user.types.ts    # User types
│   │   │   ├── appointment.types.ts # Appointment types
│   │   │   └── ...              # Other type definitions
│   │   │
│   │   ├── constants/           # Constants and configuration
│   │   │   ├── routes.ts        # Route constants
│   │   │   ├── errors.ts        # Error constants
│   │   │   └── ...              # Other constants
│   │   │
│   │   └── docs/                # API documentation
│   │       ├── swagger.json     # Swagger/OpenAPI specification
│   │       └── ...              # Other documentation
│   │
│   ├── .env                     # Environment variables
│   ├── .env.development         # Development environment variables
│   ├── .env.production          # Production environment variables
│   ├── package.json             # Backend package.json
│   ├── tsconfig.json            # TypeScript configuration
│   └── jest.config.js           # Jest configuration
│
├── shared/                      # Shared code between frontend and backend
│   ├── src/                     # Source code
│   │   ├── types/               # Shared TypeScript type definitions
│   │   ├── constants/           # Shared constants
│   │   ├── utils/               # Shared utility functions
│   │   └── validation/          # Shared validation schemas
│   │
│   ├── package.json             # Shared package.json
│   └── tsconfig.json            # TypeScript configuration
│
├── scripts/                     # Build and deployment scripts
│   ├── setup.sh                 # Setup script
│   ├── build.sh                 # Build script
│   ├── deploy.sh                # Deployment script
│   └── ...                      # Other scripts
│
└── docs/                        # Project documentation
    ├── architecture/            # Architecture documentation
    ├── api/                     # API documentation
    ├── deployment/              # Deployment documentation
    └── ...                      # Other documentation