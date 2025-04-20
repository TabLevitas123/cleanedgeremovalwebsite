import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../atoms/Button';
// Assuming Icon component is available, adjust path if needed
// import Icon from '../../../../atoms/Icon'; 

// Define the structure for form data
interface FormData {
  fullName: string;
  serviceAddress: string;
  email: string;
  cellPhone: string;
  homePhone: string;
  workPhone: string;
  services: string[];
  otherDescription: string;
  privacyPolicy: boolean;
  marketingConsent: boolean;
}

// Define the list of services offered
const availableServices = [
  'Junk Removal', 'Cleanouts', 'Relocation Services', 'Recycling', 
  'Handyman Services', 'Donations', 'Industrial Cleaning', 
  'Industrial Painting', 'Monument Cleaning', 'Dumpster Area Cleaning', 'Other'
];

const SchedulingContactSection: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    serviceAddress: '',
    email: '',
    cellPhone: '',
    homePhone: '',
    workPhone: '',
    services: [],
    otherDescription: '',
    privacyPolicy: false,
    marketingConsent: false,
  });
  const [showOtherDescription, setShowOtherDescription] = useState(false);
  // Add state for loading and submission status later
  // const [isLoading, setIsLoading] = useState(false);
  // const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  // const [submitMessage, setSubmitMessage] = useState('');

  // Form input change handler for text inputs and textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Service checkbox change handler
  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedServices = [...formData.services];

    if (checked) {
      updatedServices.push(value);
    } else {
      updatedServices = updatedServices.filter(service => service !== value);
    }

    setFormData(prev => ({ ...prev, services: updatedServices }));

    // Show/hide "Other" description textarea
    const otherSelected = updatedServices.includes('Other');
    setShowOtherDescription(otherSelected);
    if (!otherSelected) {
      // Clear description if "Other" is unchecked
      setFormData(prev => ({ ...prev, otherDescription: '' })); 
    }
  };

  // General checkbox change handler (privacy, marketing)
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Placeholder form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement client-side validation
    // TODO: Set loading state true
    // TODO: Call API endpoint (/api/quote-requests)
    // TODO: Handle success/error response
    // TODO: Reset form on success?
    // TODO: Set loading state false
    console.log('Form submitted (placeholder):', formData); 
  };

  // Placeholder form reset handler
  const handleReset = () => {
    setFormData({
      fullName: '',
      serviceAddress: '',
      email: '',
      cellPhone: '',
      homePhone: '',
      workPhone: '',
      services: [],
      otherDescription: '',
      privacyPolicy: false,
      marketingConsent: false,
    });
    setShowOtherDescription(false);
  };

  // TODO: Add logic to determine mode (Request Quote vs. Auto Schedule) based on admin setting
  const isAutoScheduleMode = false; // Placeholder

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary-light/10 to-white dark:from-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Content Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              {isAutoScheduleMode ? 'Schedule Your Service' : 'Request a Quote'}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              {isAutoScheduleMode 
                ? 'Please enter your contact information below to begin scheduling your appointment.' 
                : 'Interested in our services? Please fill out the form below, and a member of our team will contact you shortly to discuss your needs and schedule an appointment.'}
            </p>
            {/* TODO: Add additional contact info if needed */}
          </div>

          {/* Form Column */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg">
            {/* Request Quote Form */}
            {!isAutoScheduleMode && (
              <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="space-y-6">
                  {/* Input Fields */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Full Name*</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="Name*"
                      className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-500/60"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="serviceAddress" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Service Address*</label>
                    <input
                      type="text"
                      id="serviceAddress"
                      name="serviceAddress"
                      required
                      placeholder="Address*"
                      className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-500/60"
                      value={formData.serviceAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Email Address*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Email*"
                      className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-500/60"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="cellPhone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Cell Phone Number*</label>
                    <input
                      type="tel"
                      id="cellPhone"
                      name="cellPhone"
                      required
                      placeholder="Cell Phone Number*"
                      className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-500/60"
                      value={formData.cellPhone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="homePhone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Home Phone Number</label>
                    <input
                      type="tel"
                      id="homePhone"
                      name="homePhone"
                      placeholder="Home Phone Number"
                      className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-500/60"
                      value={formData.homePhone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="workPhone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Work Phone Number</label>
                    <input
                      type="tel"
                      id="workPhone"
                      name="workPhone"
                      placeholder="Work Phone Number"
                      className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-500/60"
                      value={formData.workPhone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-3">Which of our services are you requesting?</label>
                    <div className="space-y-2">
                      {availableServices.map((service) => (
                        <div key={service} className="flex items-center">
                          <input
                            id={`service-${service.toLowerCase().replace(/\s+/g, '-')}`}
                            name="services"
                            type="checkbox"
                            value={service}
                            checked={formData.services.includes(service)}
                            onChange={handleServiceChange}
                            className="h-4 w-4 text-primary-color border-neutral-300 rounded focus:ring-primary-color dark:bg-neutral-700 dark:border-neutral-600 appearance-none checked:bg-primary-color checked:border-transparent focus:outline-none relative peer shrink-0" // Basic checkbox, needs circle styling
                          />
                           {/* TODO: Add custom circle style here or via CSS */}
                          <label htmlFor={`service-${service.toLowerCase().replace(/\s+/g, '-')}`} className="ml-3 block text-sm text-neutral-700 dark:text-neutral-300">
                            {service}
                          </label>
                        </div>
                      ))}
                      {/* Conditional "Other" Description */}
                      {showOtherDescription && (
                        <div className="mt-2">
                          <label htmlFor="otherDescription" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Please describe</label>
                          <textarea
                            id="otherDescription"
                            name="otherDescription"
                            rows={3}
                            placeholder="Please describe"
                            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-500/60"
                            value={formData.otherDescription}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="privacyPolicy"
                        name="privacyPolicy"
                        type="checkbox"
                        required
                        checked={formData.privacyPolicy}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-primary-color border-neutral-300 rounded focus:ring-primary-color dark:bg-neutral-700 dark:border-neutral-600" />
                      <label htmlFor="privacyPolicy" className="ml-3 block text-sm text-neutral-700 dark:text-neutral-300">
                        I agree to the <Link to="/privacy-policy" className="text-primary-color hover:underline">Privacy Policy</Link>*
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="marketingConsent"
                        name="marketingConsent"
                        type="checkbox"
                        checked={formData.marketingConsent}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-primary-color border-neutral-300 rounded focus:ring-primary-color dark:bg-neutral-700 dark:border-neutral-600" />
                      <label htmlFor="marketingConsent" className="ml-3 block text-sm text-neutral-700 dark:text-neutral-300">
                        I would like to receive marketing information and updates.
                      </label>
                    </div>
                  </div>

                  {/* TODO: CAPTCHA Placeholder */}
                  <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center text-sm text-neutral-500">
                    CAPTCHA Placeholder
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-3">
                    <Button type="reset" variant="outline">
                      Clear
                    </Button>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {/* TODO: Add Auto Schedule Mode Form/Calendar */}
            {isAutoScheduleMode && (
              <div>
                <p className="text-center text-neutral-500">Auto-Scheduling Calendar Placeholder</p>
                {/* Form fields (similar to above) + Calendar + Book Appointment Button */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchedulingContactSection;