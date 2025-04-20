import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TestimonialCard from '../../../../molecules/TestimonialCard'; // Corrected path again
import Button from '../../../../atoms/Button'; // Path should be correct
import Icon from '../../../../atoms/Icon'; // Path should be correct

// Placeholder data (can be fetched from API later)
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'South Bend, IN',
    rating: 5,
    text: "Clean Edge Removal made clearing out my parents' home so much easier during a difficult time. The team was respectful, efficient, and thorough. I couldn't have asked for better service.",
    image: '/images/testimonials/testimonial-1.jpg' // Placeholder
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    location: 'Mishawaka, IN',
    rating: 5,
    text: 'I was amazed at how quickly they cleared out my garage. Years of accumulated junk gone in just a few hours! The price was fair and the crew was friendly and professional.',
    image: '/images/testimonials/testimonial-2.jpg' // Placeholder
  },
  {
    id: 3,
    name: 'Jennifer Williams',
    location: 'Elkhart, IN',
    rating: 5,
    text: 'After renovating our office, we needed the construction debris removed quickly. Clean Edge Removal came the next day and took care of everything. Highly recommend their services!',
    image: '/images/testimonials/testimonial-3.jpg' // Placeholder
  },
   {
    id: 4, // Added more diverse reviews as per spec
    name: 'David Chen - Property Manager',
    location: 'Granger, IN',
    rating: 5,
    text: 'As a property manager, reliable vendors are crucial. Clean Edge Removal consistently provides prompt and professional service for our apartment complex cleanouts. They make tenant turnovers much smoother.',
    image: '/images/testimonials/testimonial-4.jpg' // Placeholder
  },
  {
    id: 5,
    name: 'Linda Brown - Industrial Client',
    location: 'Goshen, IN',
    rating: 5,
    text: 'Their industrial cleaning team did an outstanding job preparing our warehouse for inspection. They were thorough, efficient, and followed all safety protocols. We\'ll definitely use them again.',
    image: '/images/testimonials/testimonial-5.jpg' // Placeholder
  }
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount or pause
  }, [activeIndex, isPaused]); // Rerun effect if activeIndex or isPaused changes

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 font-montserrat">
            What Our Customers Say
          </h2>
           {/* TODO: Add five-star rating display */}
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto font-open-sans">
            Don't just take our word for it - hear from satisfied clients across Northern Indiana, Southern Michigan, and Northern Ohio.
          </p>
        </div>

        <div
          className="max-w-4xl mx-auto relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden">
            {/* Use framer-motion for smoother transitions */}
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }} // Adjust animation physics
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4" // Added padding for spacing
                >
                  <TestimonialCard
                    name={testimonial.name}
                    location={testimonial.location}
                    rating={testimonial.rating}
                    text={testimonial.text}
                    image={testimonial.image}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 shadow-md flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-primary-color dark:hover:text-primary-light transition-colors z-10"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <Icon name="chevron-left" />
          </button>

          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 shadow-md flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-primary-color dark:hover:text-primary-light transition-colors z-10"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <Icon name="chevron-right" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex
                    ? 'bg-primary-color'
                    : 'bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* TODO: Implement "See All Reviews" Button/Modal */}
        <div className="text-center mt-12">
          <Link to="/testimonials"> {/* Link to potential dedicated reviews page */}
            <Button
              variant="outline"
              icon="message-circle"
              iconPosition="left"
              className="rounded-full px-6 py-2" // Pill shape as per spec
            >
              See All Reviews
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;