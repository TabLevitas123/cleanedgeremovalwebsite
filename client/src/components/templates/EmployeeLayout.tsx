import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleSidebar } from '../../features/ui/uiSlice';
import { useGetMeQuery } from '../../features/auth/authSlice';

// Components
import Logo from '../atoms/Logo';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import UserMenu from '../molecules/UserMenu';
import NotificationToast from '../molecules/NotificationToast';
import ScrollToTop from '../atoms/ScrollToTop';

/**
 * EmployeeLayout Component
 * 
 * Layout template for employee dashboard pages.
 * Includes simplified sidebar navigation, header with user menu, and main content area.
 * Restricts access to employee users only.
 */
const EmployeeLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme, isSidebarOpen, isMobile } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user data
  const { isLoading: isUserLoading, isError } = useGetMeQuery(undefined);
  
  // Set loading state based on user data fetch
  useEffect(() => {
    setIsLoading(isUserLoading);
  }, [isUserLoading]);
  
  // Redirect non-employee users
  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'employee')) {
      navigate('/unauthorized', { replace: true });
    }
  }, [user, isLoading, navigate]);
  
  // Handle API error
  useEffect(() => {
    if (isError) {
      navigate('/login', { replace: true });
    }
  }, [isError, navigate]);
  
  // Toggle sidebar
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  
  // Navigation links
  const navLinks = [
    { path: '/employee', label: 'Dashboard', icon: 'home' },
    { path: '/employee/appointments', label: 'Appointments', icon: 'calendar' },
    { path: '/employee/customers', label: 'Customers', icon: 'user' },
    { path: '/employee/time-tracking', label: 'Time Tracking', icon: 'clock' },
    { path: '/employee/profile', label: 'Profile', icon: 'user' },
  ];
  
  // Check if a link is active
  const isActive = (path: string) => {
    if (path === '/employee') {
      return location.pathname === '/employee';
    }
    return location.pathname.startsWith(path);
  };
  
  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <Icon name="loader" size="large" className="animate-spin text-primary-color mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400">Loading employee dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen flex flex-col ${theme.mode === 'dark' ? 'dark-mode' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-neutral-800 shadow-sm z-10 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and sidebar toggle */}
            <div className="flex items-center">
              <button
                onClick={handleToggleSidebar}
                className="mr-4 p-2 rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none"
                aria-label="Toggle sidebar"
              >
                <Icon name={isSidebarOpen ? 'menu-open' : 'menu'} size="medium" />
              </button>
              <Logo size="small" />
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Clock In/Out Button */}
              <Button
                variant={user?.clockedIn ? 'secondary' : 'primary'}
                size="small"
                icon={user?.clockedIn ? 'clock' : 'play'}
                onClick={() => navigate('/employee/time-tracking')}
              >
                {user?.clockedIn ? 'Clocked In' : 'Clock In'}
              </Button>
              
              {/* Notifications */}
              <Button
                variant="text"
                icon="bell"
                aria-label="Notifications"
                onClick={() => navigate('/employee/notifications')}
              />
              
              {/* User menu */}
              {user && <UserMenu user={user} onLogout={() => navigate('/login')} />}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content with sidebar */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <aside 
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            ${isMobile ? 'fixed inset-y-0 left-0 z-20' : 'relative'}
            w-64 bg-neutral-800 text-white transition-transform duration-300 ease-in-out
          `}
        >
          {/* Sidebar content */}
          <div className="h-full flex flex-col">
            {/* User info */}
            <div className="p-4 border-b border-neutral-700">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-color flex items-center justify-center text-white mr-3">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'E'}
                </div>
                <div>
                  <div className="font-medium text-white">{user?.name || 'Employee'}</div>
                  <div className="text-xs text-neutral-400">{user?.email || 'employee@example.com'}</div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-grow py-4">
              <ul className="space-y-1 px-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      className={`
                        flex items-center px-4 py-3 rounded-md transition-colors
                        ${isActive(link.path)
                          ? 'bg-primary-color text-white'
                          : 'text-neutral-300 hover:bg-neutral-700'}
                      `}
                      aria-current={isActive(link.path) ? 'page' : undefined}
                    >
                      <Icon name={link.icon} size="small" className="mr-3" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Sidebar footer */}
            <div className="p-4 border-t border-neutral-700">
              <div className="text-xs text-neutral-400">
                <p>Employee Dashboard</p>
                <p>v1.0.0</p>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Backdrop for mobile sidebar */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={handleToggleSidebar}
            aria-hidden="true"
          />
        )}
        
        {/* Main content */}
        <main className={`flex-grow bg-neutral-50 dark:bg-neutral-900 ${isMobile ? 'w-full' : ''}`}>
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Utility components */}
      <ScrollToTop />
      <NotificationToast position="top-right" />
    </div>
  );
};

export default EmployeeLayout;