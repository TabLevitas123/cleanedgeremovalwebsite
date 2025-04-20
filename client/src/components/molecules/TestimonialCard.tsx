import React from 'react';
import Icon from '../atoms/Icon';

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
}

/**
 * TestimonialCard Component
 * 
 * Displays a customer testimonial with their name, location, rating, and feedback.
 * Optionally includes a customer image.
 */
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  location,
  rating,
  text,
  image
}) => {
  // Generate star rating elements
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon 
          key={i}
          name={i <= rating ? 'star-filled' : 'star'}
          className={i <= rating ? 'text-yellow-400' : 'text-neutral-300 dark:text-neutral-600'}
          size="small"
        />
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-4">
        {image && (
          <div className="mr-4">
            <img 
              src={image} 
              alt={name} 
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            {name}
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {location}
          </p>
          <div className="flex mt-1">
            {renderStars()}
          </div>
        </div>
      </div>
      <blockquote className="italic text-neutral-700 dark:text-neutral-300">
        "{text}"
      </blockquote>
    </div>
  );
};

export default TestimonialCard;