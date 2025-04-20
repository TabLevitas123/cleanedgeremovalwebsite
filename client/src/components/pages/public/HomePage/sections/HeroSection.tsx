import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../../atoms/Button'; // Corrected path again
import { env } from '../../../../../utils/env'; // Corrected path again

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-dark to-primary-color overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="/images/hero-bg.jpg" // Placeholder image path
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-montserrat" // Added font
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Professional Junk Removal & Cleaning Services {/* Updated Headline */}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 font-open-sans" // Added font
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Serving Northern Indiana, Southern Michigan, and Northern Ohio with Pride and Professionalism. {/* Updated Subheading */}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Updated Button Text & Link */}
            <Link to="#scheduling-contact"> {/* Link to the scheduling section ID */}
              <Button
                variant="accent" // Use accent color as per spec
                size="large"
                className="w-[220px] h-[54px] rounded-lg" // Specific size and radius
              >
                SCHEDULE SERVICE NOW
              </Button>
            </Link>
             {/* Removed "Our Services" button as it's in the main nav */}
          </motion.div>
           {/* Trust Indicators - Placeholder for now */}
           <motion.div
             className="mt-8 flex justify-start space-x-6" // Adjusted layout
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.6 }}
           >
             {/* Placeholder Icons/Badges */}
             <span className="text-white/80 text-sm font-open-sans">✓ Insured</span>
             <span className="text-white/80 text-sm font-open-sans">✓ Top-rated</span>
             <span className="text-white/80 text-sm font-open-sans">✓ Eco-friendly</span>
           </motion.div>
        </div>
      </div>
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-neutral-900 to-transparent"></div>
    </section>
  );
};

export default HeroSection;