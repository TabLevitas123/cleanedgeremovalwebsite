import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';

// Import Section Components
import HeroSection from './HomePage/sections/HeroSection';
import HowItWorksSection from './HomePage/sections/HowItWorksSection';
import WhyChooseUsSection from './HomePage/sections/WhyChooseUsSection';
import ServicesSection from './HomePage/sections/ServicesSection';
import CtaSection from './HomePage/sections/CtaSection';
import TestimonialsSection from './HomePage/sections/TestimonialsSection';
import FaqSection from './HomePage/sections/FaqSection';
import ServiceAreaSection from './HomePage/sections/ServiceAreaSection';
import SchedulingContactSection from './HomePage/sections/SchedulingContactSection';
import NewsletterSection from './HomePage/sections/NewsletterSection';

import { logger } from '../../../utils/logger';
import { setPageLoaded } from '../../../features/ui/uiSlice';

/**
 * HomePage Component
 *
 * The main landing page for the Clean Edge Removal website.
 * Composed of various section components.
 */
const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // Mark page as loaded for analytics and performance tracking
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      dispatch(setPageLoaded('home'));
      logger.info('HomePage loaded', { page: 'home' });
    }, 100); // Short delay to ensure rendering

    return () => clearTimeout(timer);
  }, [dispatch]);

  // Note: Form state and handlers are now within SchedulingContactSection.tsx
  // Note: Testimonial carousel state is now within TestimonialsSection.tsx
  // Note: Service, Testimonial, FAQ data arrays are now within their respective section components (or should be fetched)

  return (
    <>
      <Helmet>
        <title>Clean Edge Removal | Professional Junk Removal & Property Cleanout Services</title>
        <meta name="description" content="Clean Edge Removal provides professional junk removal, property cleanout, and related services in Northern Indiana, Southern Michigan, and Northern Ohio. Get a free quote today!" />
        <meta name="keywords" content="junk removal, property cleanout, furniture removal, appliance removal, handyman, industrial cleaning, South Bend, Mishawaka, Elkhart, Northern Indiana, Southern Michigan, Northern Ohio" />
        <link rel="canonical" href="https://www.cleanedgeremoval.com" /> {/* Ensure correct domain */}
      </Helmet>

      {/* Render Section Components */}
      <HeroSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <CtaSection />
      <TestimonialsSection />
      <ServiceAreaSection /> {/* Includes map placeholder and areas list */}
      <FaqSection />
      <SchedulingContactSection /> {/* Contains the quote request form */}
      <NewsletterSection />

    </>
  );
};

export default HomePage;