import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from './Icon';

// Define props
interface ScrollToTopProps {
  threshold?: number;
  smooth?: boolean;
  className?: string;
}

/**
 * ScrollToTop Component
 * 
 * This component provides two functionalities:
 * 1. Scrolls to top when route changes
 * 2. Displays a "scroll to top" button when user scrolls down beyond threshold
 */
const ScrollToTop: React.FC<ScrollToTopProps> = ({
  threshold = 300,
  smooth = true,
  className = '',
}) => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [pathname, smooth]);
  
  // Toggle button visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);
  
  // Handle scroll to top button click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };
  
  // If button is not visible, only render the effect
  if (!isVisible) {
    return null;
  }
  
  return (
    <button
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-primary-color text-white shadow-lg hover:bg-primary-light transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 z-50 ${className}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <Icon name="arrow-up" size="medium" />
    </button>
  );
};

export default ScrollToTop;