import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Icon from '../atoms/Icon';

// Define props
interface BreadcrumbsProps {
  className?: string;
  separator?: string | React.ReactNode;
  maxItems?: number;
}

/**
 * Breadcrumbs Component
 * 
 * Displays a breadcrumb navigation trail based on the current route.
 * Uses the breadcrumbs state from the UI slice.
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className = '',
  separator = <Icon name="chevron-right" size="small" className="mx-2 text-neutral-400" />,
  maxItems = 0,
}) => {
  const { breadcrumbs } = useSelector((state: RootState) => state.ui);
  
  // If no breadcrumbs or only home, don't render
  if (!breadcrumbs || breadcrumbs.length <= 1) {
    return null;
  }
  
  // Handle max items (if specified)
  let displayedBreadcrumbs = breadcrumbs;
  if (maxItems > 0 && breadcrumbs.length > maxItems) {
    const firstItem = breadcrumbs[0];
    const lastItems = breadcrumbs.slice(breadcrumbs.length - (maxItems - 1));
    
    displayedBreadcrumbs = [
      firstItem,
      { path: '', label: '...' },
      ...lastItems,
    ];
  }
  
  return (
    <nav aria-label="Breadcrumb" className={`py-2 ${className}`}>
      <ol className="flex flex-wrap items-center text-sm">
        {displayedBreadcrumbs.map((breadcrumb, index) => {
          const isLast = index === displayedBreadcrumbs.length - 1;
          
          return (
            <li key={breadcrumb.path || index} className="flex items-center">
              {index > 0 && (
                <span className="flex-shrink-0">{separator}</span>
              )}
              
              {isLast ? (
                <span className="font-medium text-neutral-800 dark:text-neutral-200" aria-current="page">
                  {breadcrumb.label}
                </span>
              ) : (
                breadcrumb.path ? (
                  <Link
                    to={breadcrumb.path}
                    className="text-primary-color hover:text-primary-light hover:underline transition-colors"
                  >
                    {breadcrumb.label}
                  </Link>
                ) : (
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {breadcrumb.label}
                  </span>
                )
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;