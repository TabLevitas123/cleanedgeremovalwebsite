import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/atoms/Button';
import Icon from '../../../components/atoms/Icon';

/**
 * NotFoundPage Component
 * 
 * Displayed when a user attempts to access a page that doesn't exist.
 * Provides options to go back, go home, or search.
 */
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Handle go back
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-warning-color bg-opacity-10 text-warning-color mb-6">
          <Icon name="alert-triangle" size="large" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={handleGoBack}
            icon="arrow-left"
          >
            Go Back
          </Button>
          
          <Link to="/">
            <Button variant="primary" icon="home">
              Go to Home
            </Button>
          </Link>
        </div>
        
        {/* Search section */}
        <div className="mt-12 border-t border-neutral-200 dark:border-neutral-700 pt-8">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Looking for something specific?
          </h2>
          
          <form 
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const query = formData.get('search') as string;
              if (query) {
                navigate(`/search?q=${encodeURIComponent(query)}`);
              }
            }}
          >
            <input
              type="text"
              name="search"
              placeholder="Search our website..."
              className="flex-grow px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color dark:bg-neutral-800 dark:text-neutral-200"
              aria-label="Search"
            />
            <Button type="submit" variant="primary" icon="search">
              Search
            </Button>
          </form>
        </div>
        
        {/* Suggestions */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
            You might be looking for:
          </h3>
          
          <ul className="space-y-2">
            <li>
              <Link 
                to="/services" 
                className="text-primary-color hover:text-primary-light hover:underline flex items-center"
              >
                <Icon name="chevron-right" size="small" className="mr-1" />
                Our Services
              </Link>
            </li>
            <li>
              <Link 
                to="/request-quote" 
                className="text-primary-color hover:text-primary-light hover:underline flex items-center"
              >
                <Icon name="chevron-right" size="small" className="mr-1" />
                Request a Quote
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-primary-color hover:text-primary-light hover:underline flex items-center"
              >
                <Icon name="chevron-right" size="small" className="mr-1" />
                Contact Us
              </Link>
            </li>
            <li>
              <Link 
                to="/faq" 
                className="text-primary-color hover:text-primary-light hover:underline flex items-center"
              >
                <Icon name="chevron-right" size="small" className="mr-1" />
                Frequently Asked Questions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;