import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';
import { RootState } from './store';
import { setIsMobile } from './features/ui/uiSlice';
import { useGetMeQuery } from './features/auth/authSlice';

// Layout components
import MainLayout from './components/templates/MainLayout';
import AuthLayout from './components/templates/AuthLayout';
import AdminLayout from './components/templates/AdminLayout';
import EmployeeLayout from './components/templates/EmployeeLayout';

// Public pages
import HomePage from './components/pages/public/HomePage';
// TODO: Uncomment when components are implemented
// import AboutPage from './components/pages/public/AboutPage';
// import ServicesPage from './components/pages/public/ServicesPage';
// import ContactPage from './components/pages/public/ContactPage';
// import RequestQuotePage from './components/pages/public/RequestQuotePage';
// import FAQPage from './components/pages/public/FAQPage';
// import PrivacyPolicyPage from './components/pages/public/PrivacyPolicyPage';
// import TermsOfServicePage from './components/pages/public/TermsOfServicePage';

// Auth pages
import LoginPage from './components/pages/auth/LoginPage';
import RegisterPage from './components/pages/auth/RegisterPage';
import ForgotPasswordPage from './components/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/auth/ResetPasswordPage';
import MfaVerificationPage from './components/pages/auth/MfaVerificationPage';

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
import NotFoundPage from './components/pages/error/NotFoundPage';
import UnauthorizedPage from './components/pages/error/UnauthorizedPage';
import ServerErrorPage from './components/pages/error/ServerErrorPage';

// Protected route component
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode; 
  requiredRole?: 'admin' | 'employee' | 'receptionist'; 
}) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  // Auto-fetch user data if authenticated
  const { refetch } = useGetMeQuery(undefined, {
    skip: !isAuthenticated,
  });
  
  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth < 768));
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
  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);
  
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* TODO: Uncomment when components are implemented */}
          {/* <Route path="about" element={<AboutPage />} /> */}
          {/* <Route path="services" element={<ServicesPage />} /> */}
          {/* <Route path="contact" element={<ContactPage />} /> */}
          {/* <Route path="request-quote" element={<RequestQuotePage />} /> */}
          {/* <Route path="faq" element={<FAQPage />} /> */}
          {/* <Route path="privacy-policy" element={<PrivacyPolicyPage />} /> */}
          {/* <Route path="terms-of-service" element={<TermsOfServicePage />} /> */}
        </Route>
        
        {/* Auth routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="mfa-verification" element={<MfaVerificationPage />} />
        </Route>
        
        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* TODO: Uncomment when components are implemented */}
          {/* <Route index element={<AdminDashboardPage />} /> */}
          {/* <Route path="users" element={<AdminUsersPage />} /> */}
          {/* <Route path="customers" element={<AdminCustomersPage />} /> */}
          {/* <Route path="appointments" element={<AdminAppointmentsPage />} /> */}
          {/* <Route path="services" element={<AdminServicesPage />} /> */}
          {/* <Route path="vehicles" element={<AdminVehiclesPage />} /> */}
          {/* <Route path="reports" element={<AdminReportsPage />} /> */}
          {/* <Route path="settings" element={<AdminSettingsPage />} /> */}
        </Route>
        
        {/* Employee routes */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute requiredRole="employee">
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          {/* TODO: Uncomment when components are implemented */}
          {/* <Route index element={<EmployeeDashboardPage />} /> */}
          {/* <Route path="appointments" element={<EmployeeAppointmentsPage />} /> */}
          {/* <Route path="customers" element={<EmployeeCustomersPage />} /> */}
          {/* <Route path="time-tracking" element={<EmployeeTimeTrackingPage />} /> */}
          {/* <Route path="profile" element={<EmployeeProfilePage />} /> */}
        </Route>
        
        {/* Error routes */}
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/server-error" element={<ServerErrorPage />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </PersistGate>
  );
};

export default App;