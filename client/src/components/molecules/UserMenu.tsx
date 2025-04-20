import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';

// Define props
interface UserMenuProps {
  user: {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
  };
  onLogout: () => void;
  className?: string;
}

/**
 * UserMenu Component
 * 
 * A dropdown menu for authenticated users that displays user information
 * and provides links to user-related pages and logout functionality.
 */
const UserMenu: React.FC<UserMenuProps> = ({
  user,
  onLogout,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);
  
  // Get user initials for avatar
  const getUserInitials = (): string => {
    if (!user.name) return '?';
    
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (
      nameParts[0].charAt(0).toUpperCase() + 
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };
  
  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 rounded-full"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || 'User'}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary-color flex items-center justify-center text-white font-medium">
            {getUserInitials()}
          </div>
        )}
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-md shadow-lg py-1 z-50 border border-neutral-200 dark:border-neutral-700">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
            <div className="font-medium text-neutral-800 dark:text-neutral-200 truncate">
              {user.name || 'User'}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
              {user.email || 'user@example.com'}
            </div>
            {user.role && (
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-light text-white">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            )}
          </div>
          
          {/* Menu Links */}
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="user" size="small" className="mr-3 text-neutral-500 dark:text-neutral-400" />
              Profile
            </Link>
            
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="settings" size="small" className="mr-3 text-neutral-500 dark:text-neutral-400" />
              Settings
            </Link>
            
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="shield" size="small" className="mr-3 text-neutral-500 dark:text-neutral-400" />
                Admin Dashboard
              </Link>
            )}
          </div>
          
          {/* Logout */}
          <div className="py-1 border-t border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              <Icon name="log-out" size="small" className="mr-3 text-neutral-500 dark:text-neutral-400" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;