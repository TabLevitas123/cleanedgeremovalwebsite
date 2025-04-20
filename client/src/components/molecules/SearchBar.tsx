import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../features/notifications/notificationSlice';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

// Define props
interface SearchBarProps {
  className?: string;
  placeholder?: string;
  compact?: boolean;
  onSearch?: (query: string) => void;
  searchEndpoint?: string;
}

/**
 * SearchBar Component
 * 
 * A search input with expandable functionality for desktop and mobile.
 * Can be used for global search or specific section searches.
 */
const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  placeholder = 'Search...',
  compact = false,
  onSearch,
  searchEndpoint = '/search',
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(!compact);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);
  
  // Handle expand toggle
  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  
  // Handle search submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate query
    if (!query.trim()) {
      return;
    }
    
    // If custom search handler is provided, use it
    if (onSearch) {
      onSearch(query.trim());
      return;
    }
    
    // Otherwise, perform default search behavior
    try {
      setIsLoading(true);
      
      // In a real application, this would be an API call
      // For now, we'll simulate a search by navigating to the search page
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to search results page
      navigate(`${searchEndpoint}?q=${encodeURIComponent(query.trim())}`);
    } catch (error) {
      // Show error notification
      dispatch(addNotification({
        type: 'error',
        title: 'Search Failed',
        message: 'There was an error processing your search. Please try again later.',
        duration: 5000,
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Render compact search button only
  if (compact && !isExpanded) {
    return (
      <Button
        variant="text"
        icon="search"
        aria-label="Open search"
        onClick={handleExpandToggle}
        className={className}
      />
    );
  }
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative ${className}`}
      role="search"
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200"
          aria-label="Search"
          disabled={isLoading}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon 
            name="search" 
            size="small" 
            className="text-neutral-500 dark:text-neutral-400"
          />
        </div>
        
        {query && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {isLoading ? (
              <Icon 
                name="loader" 
                size="small" 
                className="text-neutral-500 dark:text-neutral-400 animate-spin"
              />
            ) : (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                aria-label="Clear search"
              >
                <Icon name="x" size="small" />
              </button>
            )}
          </div>
        )}
      </div>
      
      {compact && (
        <button
          type="button"
          onClick={handleExpandToggle}
          className="absolute right-0 -mr-10 inset-y-0 flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          aria-label="Close search"
        >
          <Icon name="x" size="small" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;