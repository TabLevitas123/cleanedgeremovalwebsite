import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../atoms/Button'; // Corrected path

// Placeholder data (can be fetched from API or env later)
const serviceAreas = ['South Bend', 'Mishawaka', 'Elkhart', 'Granger', 'Niles', 'St. Joseph', 'Toledo', 'Bryan']; // Example list

const ServiceAreaSection: React.FC = () => {
  // TODO: Implement actual Google Map integration
  // TODO: Implement address checker functionality

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        {/* Service Area Map Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Map Column */}
          <div className="h-96 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center text-neutral-500">
            {/* Placeholder for Interactive Google Map */}
            <span>Interactive Service Area Map Placeholder</span>
            {/* TODO: Replace with Google Maps component */}
          </div>

          {/* Content Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 font-montserrat">
              Our Service Area
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 font-open-sans">
              We proudly serve communities across Northern Indiana, Southern Michigan, and Northern Ohio. Check if your location is within our service range.
            </p>
            <ul className="list-disc list-inside mb-6 text-neutral-600 dark:text-neutral-400 space-y-1 font-open-sans">
              {/* List of Major Cities - Placeholder */}
              <li>Northern Indiana (e.g., South Bend, Elkhart)</li>
              <li>Southern Michigan (e.g., Niles, St. Joseph)</li>
              <li>Northern Ohio (e.g., Toledo, Bryan)</li>
              {/* TODO: Populate dynamically or add more examples */}
            </ul>
            {/* Address Checker Tool - Placeholder */}
            <div className="mt-4">
              <label htmlFor="address-checker" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 font-open-sans">Check Your Address:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="address-checker"
                  placeholder="Enter your address"
                  className="flex-grow px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-primary-color focus:border-primary-color dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
                />
                <Button variant="primary">Check</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Areas We Serve List Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-8 font-montserrat">
            Serving Your Neighborhood
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-12">
            {serviceAreas.map((area) => (
              <div
                key={area}
                className="bg-neutral-100 dark:bg-neutral-800 rounded-full py-2 px-4" // Use rounded-full for pill shape
              >
                <span className="text-neutral-700 dark:text-neutral-300 font-medium font-open-sans text-sm">
                  {area.trim()}
                </span>
              </div>
            ))}
          </div>
          <Link to="/service-areas"> {/* Link to potential dedicated service areas page */}
            <Button
              variant="outline"
              icon="map-pin"
              iconPosition="left"
            >
              View Detailed Service Map
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaSection;