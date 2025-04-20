import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setBreadcrumbs } from '../../features/ui/uiSlice';

// Components
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Breadcrumbs from '../molecules/Breadcrumbs';
import ScrollToTop from '../atoms/ScrollToTop';
import CookieConsent from '../molecules/CookieConsent';
import NotificationToast from '../molecules/NotificationToast';

// Define route to breadcrumb mapping
const routeToBreadcrumb: Record<string, string> = {
  '': 'Home',
  'about': 'About Us',
  'services': 'Services',
  'contact': 'Contact',
  'request-quote': 'Request a Quote',
  'faq': 'FAQ',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
};

/**
 * Main Layout Component
 * 
 * This component provides the main layout structure for public-facing pages,
 * including header, footer, breadcrumbs, and notification system.
 */
const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme } = useSelector((state: RootState) => state.ui);
  
  // Update breadcrumbs based on current route
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ path: '/', label: 'Home' }];
    
    let currentPath = '';
    
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeToBreadcrumb[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ path: currentPath, label });
    });
    
    dispatch(setBreadcrumbs(breadcrumbs));
  }, [location, dispatch]);
  
  return (
    <div className={`min-h-screen flex flex-col ${theme.mode === 'dark' ? 'dark-mode' : ''}`}>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main id="main-content" className="flex-grow">
        <div className="container mx-auto py-4">
          {/* Breadcrumbs */}
          <Breadcrumbs />
          
          {/* Page content */}
          <div className="mt-4 fade-in">
            <Outlet />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Utility components */}
      <ScrollToTop />
      <CookieConsent />
      <NotificationToast />
    </div>
  );
};

export default MainLayout;