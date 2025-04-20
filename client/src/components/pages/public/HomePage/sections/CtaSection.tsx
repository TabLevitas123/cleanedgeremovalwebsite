import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../atoms/Button'; // Corrected path
import { env } from '../../../../../utils/env'; // Corrected path

const CtaSection: React.FC = () => {
  // Determine the correct phone number to display/link
  const contactPhone = env.CONTACT_PHONE || '(800) 555-1234'; // Fallback phone number
  const telLink = `tel:${contactPhone.replace(/\D/g, '')}`; // Create tel: link

  return (
    <section className="py-16 md:py-24 bg-primary-color text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
            Ready to Clear the Clutter?
          </h2>
          <p className="text-xl mb-8 text-white/90 font-open-sans">
            Get a free, no-obligation quote for your junk removal needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Link to the scheduling section on the homepage */}
            <Link to="#scheduling-contact">
              <Button
                variant="secondary" // Use secondary color for contrast on primary background
                size="large"
                icon="clipboard-check"
              >
                Get a Free Quote
              </Button>
            </Link>
            {/* Link to call the phone number */}
            <a href={telLink}>
              <Button
                variant="outline-light" // Light outline for contrast
                size="large"
                icon="phone"
              >
                Call Us Now ({contactPhone}) {/* Display the number */}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;