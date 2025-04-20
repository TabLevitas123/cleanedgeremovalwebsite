import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  image: string;
  link: string;
}

/**
 * ServiceCard Component
 * 
 * Displays a service with an icon, image, title, description, and a link to the service details page.
 * Used on the homepage and services page to showcase the different services offered.
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon, 
  image, 
  link 
}) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 bg-primary-color text-white p-2 rounded-full">
          <Icon name={icon} size="medium" />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {description}
        </p>
        <Link 
          to={link}
          className="inline-flex items-center text-primary-color hover:text-primary-dark dark:hover:text-primary-light font-medium"
        >
          Learn More
          <Icon name="arrow-right" className="ml-1" size="small" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;