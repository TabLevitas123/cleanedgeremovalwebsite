"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
// Components
const Logo_1 = __importDefault(require("../atoms/Logo"));
const Icon_1 = __importDefault(require("../atoms/Icon"));
const NewsletterSignup_1 = __importDefault(require("../molecules/NewsletterSignup"));
const SocialLinks_1 = __importDefault(require("../molecules/SocialLinks"));
/**
 * Footer Component
 *
 * Main footer for the application, includes navigation links, contact information,
 * newsletter signup, social media links, and copyright information.
 */
const Footer = () => {
    const { theme } = (0, react_redux_1.useSelector)((state) => state.ui);
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
    return (<footer className="bg-neutral-100 dark:bg-neutral-900 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <react_router_dom_1.Link to="/" className="inline-block mb-4">
              <Logo_1.default size="medium"/>
            </react_router_dom_1.Link>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 max-w-md">
              Clean Edge Removal LLC provides professional junk removal and property cleanout services
              in Northern Indiana, Southern Michigan, and Northern Ohio.
            </p>
            <div className="mb-6">
              <SocialLinks_1.default />
            </div>
          </div>
          
          {/* Footer Navigation */}
          {footerLinks.map((group) => (<div key={group.title}>
              <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (<li key={link.path}>
                    <react_router_dom_1.Link to={link.path} className="text-neutral-600 dark:text-neutral-400 hover:text-primary-color dark:hover:text-primary-light transition-colors">
                      {link.label}
                    </react_router_dom_1.Link>
                  </li>))}
              </ul>
            </div>))}
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
              <NewsletterSignup_1.default />
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              <Icon_1.default name="map-pin" size="small" className="text-primary-color"/>
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
              <Icon_1.default name="phone" size="small" className="text-primary-color"/>
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
              <Icon_1.default name="mail" size="small" className="text-primary-color"/>
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
            <react_router_dom_1.Link to="/privacy-policy" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-color transition-colors">
              Privacy Policy
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/terms-of-service" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-color transition-colors">
              Terms of Service
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/sitemap" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-color transition-colors">
              Sitemap
            </react_router_dom_1.Link>
          </div>
        </div>
      </div>
    </footer>);
};
exports.default = Footer;
//# sourceMappingURL=Footer.jsx.map