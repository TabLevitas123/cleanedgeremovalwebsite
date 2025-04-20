import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// Components
import Logo from '../atoms/Logo';
import Icon from '../atoms/Icon';
import NewsletterSignup from '../molecules/NewsletterSignup';
import SocialLinks from '../molecules/SocialLinks';

/**
 * Footer Component
 * 
 * Main footer for the application, includes navigation links, contact information,
 * newsletter signup, social media links, and copyright information.
 */
const Footer: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.ui);
  const currentYear = new Date().getFullYear();
  
  // Footer navigation links grouped by category
  const footerLinks = [
    {
      title: 'Services',
      links: [
        { path: '/services/junk-removal', label: 'Junk Removal' },
        { path: '/services/property-cleanout', label: 'Property Cleanout' },
        { path: '/services/appliance-removal', label: 'Appliance Removal' },
        { path: '/services/furniture-removal', label: 'Furniture Removal' },
        { path: '/services/construction-debris', label: 'Construction Debris' },
      ],
    },
    {
      title: 'Company',
      links: [
        { path: '/about', label: 'About Us' },
        { path: '/contact', label: 'Contact Us' },
        { path: '/careers', label: 'Careers' },
        { path: '/blog', label: 'Blog' },
        { path: '/faq', label: 'FAQ' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { path: '/privacy-policy', label: 'Privacy Policy' },
        { path: '/terms-of-service', label: 'Terms of Service' },
        { path: '/cookie-policy', label: 'Cookie Policy' },
        { path: '/accessibility', label: 'Accessibility' },
        { path: '/sitemap', label: 'Sitemap' },
      ],
    },
  ];
  
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <Logo size="medium" />
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-md">
              Clean Edge Removal LLC provides professional junk removal and property cleanout services
              in Northern Indiana, Southern Michigan, and Northern Ohio.
            </p>
            <div className="mb-6">
              <SocialLinks />
            </div>
          </div>
          
          {/* Footer Navigation */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-primary-color dark:hover:text-primary-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter Section */}
        <div className="border-t border-b border-neutral-200 dark:border-neutral-700 py-8 my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Stay updated with our latest services, promotions, and tips.
              </p>
            </div>
            <div>
              <NewsletterSignup />
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              <Icon name="map-pin" size="small" className="text-primary-color" />
            </div>
            <div>
              <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">Address</h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                123 Main Street<br />
                South Bend, IN 46601
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              <Icon name="phone" size="small" className="text-primary-color" />
            </div>
            <div>
              <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">Phone</h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                <a href="tel:+15741234567" className="hover:text-primary-color transition-colors">
                  (574) 123-4567
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              <Icon name="mail" size="small" className="text-primary-color" />
            </div>
            <div>
              <h4 className="font-medium text-neutral-800 dark:text-neutral-200 mb-1">Email</h4>
              <p className="text-neutral-600 dark:text-neutral-400">
                <a href="mailto:info@cleanedgeremoval.com" className="hover:text-primary-color transition-colors">
                  info@cleanedgeremoval.com
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 md:mb-0">
            &copy; {currentYear} Clean Edge Removal LLC. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/privacy-policy" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-color transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-color transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-color transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;