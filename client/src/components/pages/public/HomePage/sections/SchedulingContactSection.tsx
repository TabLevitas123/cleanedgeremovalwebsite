// Force re-evaluation
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Button from '../../../../atoms/Button';
import { useSubmitQuoteRequestMutation } from '@services/api';
import { addNotification } from '@features/notifications/notificationSlice';
import { QuoteRequestBody } from '@cleanedgeremovalwebsite/shared/types/quote.types';

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

// Define the structure for validation errors
type FormErrors = Partial<Record<keyof FormData, string>>;

// Define the list of services offered
const availableServices = [
  'Junk Removal', 'Cleanouts', 'Relocation Services', 'Recycling',
  'Handyman Services', 'Donations', 'Industrial Cleaning',
  'Industrial Painting', 'Monument Cleaning', 'Dumpster Area Cleaning', 'Other'
];

// Define the Yup validation schema with refined optional phone validation using .test()
const phoneRegexRequired = /^[0-9\s\-()]{10,}$/; // Require 10+ digits/chars
const phoneErrorMsg = 'Invalid phone number format (at least 10 digits)';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .required('Full name is required'),
  serviceAddress: Yup.string()
    .trim()
    .min(5, 'Service address must be at least 5 characters')
    .required('Service address is required'),
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email address is required'),
  cellPhone: Yup.string()
    .matches(phoneRegexRequired, phoneErrorMsg)
    .required('Cell phone number is required'),
  homePhone: Yup.string()
    .optional() // Mark as optional
    .test( // Use .test for conditional validation
      'is-valid-phone-or-empty',
      phoneErrorMsg,
      (value) => !value || phoneRegexRequired.test(value) // Pass if falsy (empty/null/undefined) OR if regex matches
    ),
  workPhone: Yup.string()
    .optional() // Mark as optional
    .test( // Use .test for conditional validation
      'is-valid-phone-or-empty',
      phoneErrorMsg,
      (value) => !value || phoneRegexRequired.test(value) // Pass if falsy (empty/null/undefined) OR if regex matches
    ),
  services: Yup.array()
    .of(Yup.string().required())
    .min(1, 'At least one service must be selected')
    .required('Service selection is required'),
  otherDescription: Yup.string()
    .when('services', {
      is: (services: string[] | undefined) => Array.isArray(services) && services.includes('Other'),
      then: (schema) => schema.trim().min(5, 'Description must be at least 5 characters when "Other" is selected').required('Description is required when "Other" service is selected'),
      otherwise: (schema) => schema.optional(),
    }),
  privacyPolicy: Yup.boolean()
    .oneOf([true], 'You must agree to the Privacy Policy')
    .required('Privacy Policy agreement is required'),
  marketingConsent: Yup.boolean().optional(),
});


const SchedulingContactSection: React.FC = () => {
  const dispatch = useDispatch();
  const [submitQuoteRequest, { isLoading, isSuccess, isError, error }] = useSubmitQuoteRequestMutation();

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Form input change handler for text inputs and textarea
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  // Service checkbox change handler
  const handleServiceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedServices = [...formData.services];

    if (checked) {
      updatedServices.push(value);
    } else {
      updatedServices = updatedServices.filter(service => service !== value);
    }

    setFormData(prev => ({ ...prev, services: updatedServices }));

    const otherSelected = updatedServices.includes('Other');
    setShowOtherDescription(otherSelected);

    if (!otherSelected) {
      setFormData(prev => ({ ...prev, otherDescription: '' }));
      if (errors.otherDescription) {
         setErrors(prev => ({ ...prev, otherDescription: undefined }));
      }
    }

    if (errors.services) {
      setErrors(prev => ({ ...prev, services: undefined }));
    }
    if (otherSelected && errors.otherDescription) {
       setErrors(prev => ({ ...prev, otherDescription: undefined }));
    }

  }, [formData.services, errors]);

  // General checkbox change handler (privacy, marketing)
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  // Form reset handler
  const handleReset = useCallback(() => {
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
    setErrors({});
    setSubmitAttempted(false);
  }, []);


  // Validation handler on blur
  const handleBlur = useCallback(async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldName = e.target.name as keyof FormData;
    try {
      await validationSchema.validateAt(fieldName, formData);
      // If validation passes, clear the error for this field
      setErrors(prev => ({ ...prev, [fieldName]: undefined }));
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        // If validation fails, set the error message for this field
        setErrors(prev => ({ ...prev, [fieldName]: validationError.message }));
      }
    }
  }, [formData]);

  // Form submission handler with validation and API call
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSubmitAttempted(true);

    try {
      // Validate form data against the schema
      await validationSchema.validate(formData, { abortEarly: false });

      // Validation successful: Proceed with submission logic
      // console.log('DEBUG: Validation passed in handleSubmit. Preparing to call API.');

      const payload: QuoteRequestBody = {
        fullName: formData.fullName,
        serviceAddress: formData.serviceAddress,
        email: formData.email,
        cellPhone: formData.cellPhone,
        homePhone: formData.homePhone || undefined,
        workPhone: formData.workPhone || undefined,
        services: formData.services,
        otherDescription: formData.services.includes('Other') ? formData.otherDescription : undefined,
        privacyPolicy: formData.privacyPolicy,
        marketingConsent: formData.marketingConsent,
      };

      // Trigger the mutation
      await submitQuoteRequest(payload).unwrap();

      // Success is handled by the useEffect below

    } catch (validationError) {
      // console.log('DEBUG: Validation FAILED in handleSubmit. Error:', JSON.stringify(validationError, null, 2));
      if (validationError instanceof Yup.ValidationError) {
        const newErrors: FormErrors = {};
        validationError.inner.forEach(error => {
          if (error.path && typeof error.path === 'string' && error.message) {
            if (!newErrors[error.path as keyof FormData]) {
              newErrors[error.path as keyof FormData] = error.message;
            }
          }
        });
        setErrors(newErrors);
        // console.error('Validation failed:', newErrors);
        dispatch(addNotification({
          type: 'error',
          title: 'Validation Error',
          message: 'Please check the form for errors and try again.',
          duration: 5000,
        }));
      } else {
        console.error('An unexpected error occurred during validation:', validationError);
        dispatch(addNotification({
          type: 'error',
          title: 'Validation Error',
          message: 'An unexpected error occurred during form validation. Please try again.',
          duration: 5000,
        }));
      }
    }
  }, [formData, submitQuoteRequest, dispatch]);

  // Effect to handle submission success/error feedback
  useEffect(() => {
    if (submitAttempted) {
        if (isSuccess) {
            dispatch(addNotification({
                type: 'success',
                title: 'Quote Request Submitted',
                message: 'Thank you! We have received your request and will contact you shortly.',
                duration: 7000,
            }));
            handleReset();
            setSubmitAttempted(false);
        } else if (isError && error) {
            let errorMessage = 'An unknown error occurred while submitting your request. Please try again later.';
            if (typeof error === 'object' && error !== null) {
                if ('status' in error) {
                    errorMessage = `Submission failed with status ${error.status}. `;
                }
                if ('data' in error && typeof error.data === 'object' && error.data !== null && 'error' in error.data && typeof error.data.error === 'string') {
                    errorMessage += error.data.error;
                } else if ('error' in error && typeof error.error === 'string') {
                     errorMessage = error.error;
                }
            }

            dispatch(addNotification({
                type: 'error',
                title: 'Submission Failed',
                message: errorMessage,
                duration: 7000,
            }));
             setSubmitAttempted(false);
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, error, dispatch, handleReset, submitAttempted]);

  // TODO: Add logic to determine mode (Request Quote vs. Auto Schedule) based on admin setting
  const isAutoScheduleMode = false; // Placeholder

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary-light/10 to-white dark:from-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Content Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 border-b border-neutral-200 dark:border-neutral-700 pb-2">
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
              <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
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
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-500/60 ${errors.fullName ? 'border-red-500 dark:border-red-400' : 'border-neutral-300 dark:border-neutral-600'}`}
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.fullName ? "true" : "false"}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    />
                    {errors.fullName && <p id="fullName-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label htmlFor="serviceAddress" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Service Address*</label>
                    <input
                      type="text"
                      id="serviceAddress"
                      name="serviceAddress"
                      required
                      placeholder="Address*"
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-500/60 ${errors.serviceAddress ? 'border-red-500 dark:border-red-400' : 'border-neutral-300 dark:border-neutral-600'}`}
                      value={formData.serviceAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.serviceAddress ? "true" : "false"}
                      aria-describedby={errors.serviceAddress ? "serviceAddress-error" : undefined}
                    />
                     {errors.serviceAddress && <p id="serviceAddress-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.serviceAddress}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Email Address*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Email*"
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-500/60 ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-neutral-300 dark:border-neutral-600'}`}
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                     {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="cellPhone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Cell Phone Number*</label>
                    <input
                      type="tel"
                      id="cellPhone"
                      name="cellPhone"
                      required
                      placeholder="Cell Phone Number*"
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-500/60 ${errors.cellPhone ? 'border-red-500 dark:border-red-400' : 'border-neutral-300 dark:border-neutral-600'}`}
                      value={formData.cellPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                       aria-invalid={errors.cellPhone ? "true" : "false"}
                      aria-describedby={errors.cellPhone ? "cellPhone-error" : undefined}
                    />
                     {errors.cellPhone && <p id="cellPhone-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.cellPhone}</p>}
                  </div>
                  <div>
                    <label htmlFor="homePhone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Home Phone Number</label>
                    <input
                      type="tel"
                      id="homePhone"
                      name="homePhone"
                      placeholder="Home Phone Number"
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-500/60 ${errors.homePhone ? 'border-red-500 dark:border-red-400' : 'border-neutral-300 dark:border-neutral-600'}`}
                      value={formData.homePhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.homePhone ? "true" : "false"}
                      aria-describedby={errors.homePhone ? "homePhone-error" : undefined}
                    />
                     {errors.homePhone && <p id="homePhone-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.homePhone}</p>}
                  </div>
                  <div>
                    <label htmlFor="workPhone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Work Phone Number</label>
                    <input
                      type="tel"
                      id="workPhone"
                      name="workPhone"
                      placeholder="Work Phone Number"
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-500/60 ${errors.workPhone ? 'border-red-500 dark:border-red-400' : 'border-neutral-300 dark:border-neutral-600'}`}
                      value={formData.workPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={errors.workPhone ? "true" : "false"}
                      aria-describedby={errors.workPhone ? "workPhone-error" : undefined}
                    />
                     {errors.workPhone && <p id="workPhone-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.workPhone}</p>}
                  </div>

                  {/* Service Selection */}
                  <fieldset>
                     <legend className="block text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-3">Which of our services are you requesting?*</legend>
                     {errors.services && <p id="services-error" className="mb-2 text-xs text-red-600 dark:text-red-400">{errors.services}</p>}
                    <div className="space-y-2">
                      {availableServices.map((service) => (
                        <div key={service} className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={`service-${service.toLowerCase().replace(/\s+/g, '-')}`}
                              name="services"
                              type="checkbox"
                              value={service}
                              checked={formData.services.includes(service)}
                              onChange={handleServiceChange}
                              className="absolute h-4 w-4 opacity-0 peer"
                              aria-describedby={errors.services ? "services-error" : undefined}
                            />
                            <div
                              className="h-4 w-4 rounded-full border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 peer-checked:bg-primary-color peer-checked:border-primary-color peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary-color transition-colors duration-150 ease-in-out"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={`service-${service.toLowerCase().replace(/\s+/g, '-')}`} className="font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer">
                              {service}
                            </label>
                          </div>
                        </div>
                      ))}
                      {/* Conditional "Other" Description - Corrected Syntax */}
                      {showOtherDescription ? (
                        <div className="mt-2 pl-7">
                          <label htmlFor="otherDescription" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">Please describe*</label>
                          <textarea
                            id="otherDescription"
                            name="otherDescription"
                            rows={3}
                            required={showOtherDescription}
                            placeholder="Please describe*"
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-neutral-400/60 focus:outline-none focus:ring-primary-color focus:border-primary-color sm:text-sm dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-500/60 ${errors.otherDescription ? 'border-red-500 dark:border-red-400' : 'border-neutral-300 dark:border-neutral-600'}`}
                            value={formData.otherDescription}
                            onChange={handleChange}
                      onBlur={handleBlur}
                            aria-invalid={errors.otherDescription ? "true" : "false"}
                            aria-describedby={errors.otherDescription ? "otherDescription-error" : undefined}
                          ></textarea>
                           {errors.otherDescription && <p id="otherDescription-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.otherDescription}</p>}
                        </div>
                      ) : null}
                    </div>
                  </fieldset>

                  {/* Consent Checkboxes */}
                  <fieldset className="space-y-2">
                     <legend className="sr-only">Consent Agreements</legend>
                    <div className="flex items-center">
                      <input
                        id="privacyPolicy"
                        name="privacyPolicy"
                        type="checkbox"
                        required
                        checked={formData.privacyPolicy}
                        onChange={handleCheckboxChange}
                        className={`h-4 w-4 text-primary-color border-neutral-300 rounded focus:ring-primary-color dark:bg-neutral-700 dark:border-neutral-600 ${errors.privacyPolicy ? 'border-red-500 dark:border-red-400' : 'border-neutral-300 dark:border-neutral-600'}`}
                        aria-invalid={errors.privacyPolicy ? "true" : "false"}
                        aria-describedby={errors.privacyPolicy ? "privacyPolicy-error" : undefined}
                        />
                      <label htmlFor="privacyPolicy" className="ml-3 block text-sm text-neutral-700 dark:text-neutral-300">
                        I agree to the <Link to="/privacy-policy" className="text-primary-color hover:underline">Privacy Policy</Link>*
                      </label>
                    </div>
                     {errors.privacyPolicy && <p id="privacyPolicy-error" className="ml-7 text-xs text-red-600 dark:text-red-400">{errors.privacyPolicy}</p>}
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
                  </fieldset>

                  {/* TODO: CAPTCHA Placeholder */}
                  <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center text-sm text-neutral-500">
                    CAPTCHA Placeholder
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-3">
                    <Button type="reset" variant="outline" disabled={isLoading}>
                      Clear
                    </Button>
                    <Button type="submit" variant="primary" disabled={isLoading} loading={isLoading}>
                      {isLoading ? 'Submitting...' : 'Submit'}
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