"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const react_2 = require("redux-persist/integration/react");
const store_1 = require("./store");
const uiSlice_1 = require("./features/ui/uiSlice");
const authSlice_1 = require("./features/auth/authSlice");
// Layout components
const MainLayout_1 = __importDefault(require("./components/templates/MainLayout"));
const AuthLayout_1 = __importDefault(require("./components/templates/AuthLayout"));
const AdminLayout_1 = __importDefault(require("./components/templates/AdminLayout"));
const EmployeeLayout_1 = __importDefault(require("./components/templates/EmployeeLayout"));
// Public pages
const HomePage_1 = __importDefault(require("./components/pages/public/HomePage"));
// TODO: Uncomment when components are implemented
// import AboutPage from './components/pages/public/AboutPage';
// import ServicesPage from './components/pages/public/ServicesPage';
// import ContactPage from './components/pages/public/ContactPage';
// import RequestQuotePage from './components/pages/public/RequestQuotePage';
// import FAQPage from './components/pages/public/FAQPage';
// import PrivacyPolicyPage from './components/pages/public/PrivacyPolicyPage';
// import TermsOfServicePage from './components/pages/public/TermsOfServicePage';
// Auth pages
const LoginPage_1 = __importDefault(require("./components/pages/auth/LoginPage"));
const RegisterPage_1 = __importDefault(require("./components/pages/auth/RegisterPage"));
const ForgotPasswordPage_1 = __importDefault(require("./components/pages/auth/ForgotPasswordPage"));
const ResetPasswordPage_1 = __importDefault(require("./components/pages/auth/ResetPasswordPage"));
const MfaVerificationPage_1 = __importDefault(require("./components/pages/auth/MfaVerificationPage"));
// Admin pages
// TODO: Uncomment when components are implemented
// import AdminDashboardPage from './components/pages/admin/DashboardPage';
// import AdminUsersPage from './components/pages/admin/UsersPage';
// import AdminCustomersPage from './components/pages/admin/CustomersPage';
// import AdminAppointmentsPage from './components/pages/admin/AppointmentsPage';
// import AdminServicesPage from './components/pages/admin/ServicesPage';
// import AdminVehiclesPage from './components/pages/admin/VehiclesPage';
// import AdminReportsPage from './components/pages/admin/ReportsPage';
// import AdminSettingsPage from './components/pages/admin/SettingsPage';
// Employee pages
// TODO: Uncomment when components are implemented
// import EmployeeDashboardPage from './components/pages/employee/DashboardPage';
// import EmployeeAppointmentsPage from './components/pages/employee/AppointmentsPage';
// import EmployeeCustomersPage from './components/pages/employee/CustomersPage';
// import EmployeeTimeTrackingPage from './components/pages/employee/TimeTrackingPage';
// import EmployeeProfilePage from './components/pages/employee/ProfilePage';
// Error pages
const NotFoundPage_1 = __importDefault(require("./components/pages/error/NotFoundPage"));
const UnauthorizedPage_1 = __importDefault(require("./components/pages/error/UnauthorizedPage"));
const ServerErrorPage_1 = __importDefault(require("./components/pages/error/ServerErrorPage"));
// Protected route component
const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user } = (0, react_redux_1.useSelector)((state) => state.auth);
    if (!isAuthenticated) {
        return <react_router_dom_1.Navigate to="/login" replace/>;
    }
    if (requiredRole && user?.role !== requiredRole) {
        return <react_router_dom_1.Navigate to="/unauthorized" replace/>;
    }
    return <>{children}</>;
};
const App = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isAuthenticated } = (0, react_redux_1.useSelector)((state) => state.auth);
    // Auto-fetch user data if authenticated
    const { refetch } = (0, authSlice_1.useGetMeQuery)(undefined, {
        skip: !isAuthenticated,
    });
    // Handle responsive design
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            dispatch((0, uiSlice_1.setIsMobile)(window.innerWidth < 768));
        };
        // Initial check
        handleResize();
        // Add event listener
        window.addEventListener('resize', handleResize);
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);
    // Refetch user data when authenticated
    (0, react_1.useEffect)(() => {
        if (isAuthenticated) {
            refetch();
        }
    }, [isAuthenticated, refetch]);
    return (<react_2.PersistGate loading={null} persistor={store_1.persistor}>
      <react_router_dom_1.Routes>
        {/* Public routes */}
        <react_router_dom_1.Route path="/" element={<MainLayout_1.default />}>
          <react_router_dom_1.Route index element={<HomePage_1.default />}/>
          {/* TODO: Uncomment when components are implemented */}
          {/* <Route path="about" element={<AboutPage />} /> */}
          {/* <Route path="services" element={<ServicesPage />} /> */}
          {/* <Route path="contact" element={<ContactPage />} /> */}
          {/* <Route path="request-quote" element={<RequestQuotePage />} /> */}
          {/* <Route path="faq" element={<FAQPage />} /> */}
          {/* <Route path="privacy-policy" element={<PrivacyPolicyPage />} /> */}
          {/* <Route path="terms-of-service" element={<TermsOfServicePage />} /> */}
        </react_router_dom_1.Route>
        
        {/* Auth routes */}
        <react_router_dom_1.Route path="/" element={<AuthLayout_1.default />}>
          <react_router_dom_1.Route path="login" element={<LoginPage_1.default />}/>
          <react_router_dom_1.Route path="register" element={<RegisterPage_1.default />}/>
          <react_router_dom_1.Route path="forgot-password" element={<ForgotPasswordPage_1.default />}/>
          <react_router_dom_1.Route path="reset-password" element={<ResetPasswordPage_1.default />}/>
          <react_router_dom_1.Route path="mfa-verification" element={<MfaVerificationPage_1.default />}/>
        </react_router_dom_1.Route>
        
        {/* Admin routes */}
        <react_router_dom_1.Route path="/admin" element={<ProtectedRoute requiredRole="admin">
              <AdminLayout_1.default />
            </ProtectedRoute>}>
          {/* TODO: Uncomment when components are implemented */}
          {/* <Route index element={<AdminDashboardPage />} /> */}
          {/* <Route path="users" element={<AdminUsersPage />} /> */}
          {/* <Route path="customers" element={<AdminCustomersPage />} /> */}
          {/* <Route path="appointments" element={<AdminAppointmentsPage />} /> */}
          {/* <Route path="services" element={<AdminServicesPage />} /> */}
          {/* <Route path="vehicles" element={<AdminVehiclesPage />} /> */}
          {/* <Route path="reports" element={<AdminReportsPage />} /> */}
          {/* <Route path="settings" element={<AdminSettingsPage />} /> */}
        </react_router_dom_1.Route>
        
        {/* Employee routes */}
        <react_router_dom_1.Route path="/employee" element={<ProtectedRoute requiredRole="employee">
              <EmployeeLayout_1.default />
            </ProtectedRoute>}>
          {/* TODO: Uncomment when components are implemented */}
          {/* <Route index element={<EmployeeDashboardPage />} /> */}
          {/* <Route path="appointments" element={<EmployeeAppointmentsPage />} /> */}
          {/* <Route path="customers" element={<EmployeeCustomersPage />} /> */}
          {/* <Route path="time-tracking" element={<EmployeeTimeTrackingPage />} /> */}
          {/* <Route path="profile" element={<EmployeeProfilePage />} /> */}
        </react_router_dom_1.Route>
        
        {/* Error routes */}
        <react_router_dom_1.Route path="/not-found" element={<NotFoundPage_1.default />}/>
        <react_router_dom_1.Route path="/unauthorized" element={<UnauthorizedPage_1.default />}/>
        <react_router_dom_1.Route path="/server-error" element={<ServerErrorPage_1.default />}/>
        
        {/* Catch-all route */}
        <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/not-found" replace/>}/>
      </react_router_dom_1.Routes>
    </react_2.PersistGate>);
};
exports.default = App;
//# sourceMappingURL=App.jsx.map