"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Button_1 = __importDefault(require("../../../../atoms/Button")); // Corrected path
const env_1 = require("../../../../../utils/env"); // Corrected path
const CtaSection = () => {
    // Determine the correct phone number to display/link
    const contactPhone = env_1.env.CONTACT_PHONE || '(800) 555-1234'; // Fallback phone number
    const telLink = `tel:${contactPhone.replace(/\D/g, '')}`; // Create tel: link
    return (<section className="py-16 md:py-24 bg-primary-color text-white">
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
            <react_router_dom_1.Link to="#scheduling-contact">
              <Button_1.default variant="secondary" // Use secondary color for contrast on primary background
     size="large" icon="clipboard-check">
                Get a Free Quote
              </Button_1.default>
            </react_router_dom_1.Link>
            {/* Link to call the phone number */}
            <a href={telLink}>
              <Button_1.default variant="outline-light" // Light outline for contrast
     size="large" icon="phone">
                Call Us Now ({contactPhone}) {/* Display the number */}
              </Button_1.default>
            </a>
          </div>
        </div>
      </div>
    </section>);
};
exports.default = CtaSection;
//# sourceMappingURL=CtaSection.js.map