import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleSidebar, setThemeMode } from '../../features/ui/uiSlice';
import { useLogoutMutation } from '../../features/auth/authSlice';

// Components
import Logo from '../atoms/Logo';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import MobileMenu from '../molecules/MobileMenu';
import UserMenu from '../molecules/UserMenu';
import SearchBar from '../molecules/SearchBar';

/**
 * Header Component
 * 
 * Main navigation header for the application, includes logo, navigation links,
 * search functionality, theme toggle, and user menu.
 */
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme, isMobile } = useSelector((state: RootState) => state.ui);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logout] = useLogoutMutation();
  
  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/request-quote', label: 'Request a Quote' },
  ];
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle theme toggle
  const handleThemeToggle = () => {
    dispatch(setThemeMode(theme.mode === 'light' ? 'dark' : 'light'));
  };
  
  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // Determine if a nav link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 bg-white dark:bg-neutral-900 transition-all duration-300 ${
        isScrolled ? 'shadow-md py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo size={isScrolled ? 'small' : 'medium'} />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-color border-b-2 border-primary-color'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-color dark:hover:text-primary-light'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button (Desktop) */}
            <div className="hidden md:block">
              <SearchBar />
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={`Switch to ${theme.mode === 'light' ? 'dark' : 'light'} mode`}
            >
              <Icon 
                name={theme.mode === 'light' ? 'moon' : 'sun'} 
                size="medium" 
                className="text-neutral-700 dark:text-neutral-300"
              />
            </button>
            
            {/* User Menu or Auth Buttons */}
            {isAuthenticated ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="text" size="small">
                    Log In
                  </Button>
                </Link>
                <Link to="/request-quote">
                  <Button variant="primary" size="small">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <Icon 
                name={mobileMenuOpen ? 'x' : 'menu'} 
                size="medium" 
                className="text-neutral-700 dark:text-neutral-300"
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu 
          navLinks={navLinks} 
          isAuthenticated={isAuthenticated} 
          onClose={handleMobileMenuToggle}
          onLogout={handleLogout}
          activeLink={location.pathname}
        />
      )}
    </header>
  );
};

export default Header;