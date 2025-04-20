import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

// Define props
interface MobileMenuProps {
  navLinks: Array<{ path: string; label: string }>;
  isAuthenticated: boolean;
  activeLink: string;
  onClose: () => void;
  onLogout: () => void;
}

/**
 * MobileMenu Component
 * 
 * A responsive mobile navigation menu that slides in from the right.
 * Includes navigation links, authentication buttons, and theme toggle.
 */
const MobileMenu: React.FC<MobileMenuProps> = ({
  navLinks,
  isAuthenticated,
  activeLink,
  onClose,
  onLogout,
}) => {
  const { theme } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  
  // Handle link click
  const handleLinkClick = () => {
    onClose();
  };
  
  // Handle logout
  const handleLogout = () => {
    onLogout();
    onClose();
  };
  
  // Determine if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return activeLink === '/';
    }
    return activeLink.startsWith(path);
  };
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu */}
      <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-neutral-800 shadow-xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Close menu"
          >
            <Icon name="x" size="medium" className="text-neutral-700 dark:text-neutral-300" />
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`block py-2 px-4 rounded-md transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary-color text-white'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Divider */}
        <div className="border-t border-neutral-200 dark:border-neutral-700 my-2" />
        
        {/* Auth Section */}
        <div className="p-4">
          {isAuthenticated ? (
            <div className="space-y-4">
              {/* User Info */}
              <div className="flex items-center p-4 bg-neutral-100 dark:bg-neutral-700 rounded-md">
                <div className="w-10 h-10 rounded-full bg-primary-color flex items-center justify-center text-white mr-3">
                  <Icon name="user" size="medium" />
                </div>
                <div>
                  <div className="font-medium text-neutral-800 dark:text-neutral-200">
                    {user?.name || 'User'}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {user?.email || 'user@example.com'}
                  </div>
                </div>
              </div>
              
              {/* User Links */}
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={handleLinkClick}
                  className="flex items-center py-2 px-4 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <Icon name="user" size="small" className="mr-2" />
                  Profile
                </Link>
                
                <Link
                  to="/settings"
                  onClick={handleLinkClick}
                  className="flex items-center py-2 px-4 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <Icon name="settings" size="small" className="mr-2" />
                  Settings
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full py-2 px-4 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <Icon name="log-out" size="small" className="mr-2" />
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Link to="/login" onClick={handleLinkClick} className="block w-full">
                <Button variant="outline" fullWidth>
                  Log In
                </Button>
              </Link>
              <Link to="/register" onClick={handleLinkClick} className="block w-full">
                <Button variant="primary" fullWidth>
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 mt-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} Clean Edge Removal LLC
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;