"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const FaqAccordion_1 = __importDefault(require("../../../../molecules/FaqAccordion")); // Corrected path again
const Button_1 = __importDefault(require("../../../../atoms/Button")); // Path should be correct
// Placeholder FAQ data (can be fetched from API later)
const faqs = [
    {
        id: 'faq-1',
        question: 'What items do you accept for removal?',
        answer: 'We accept most household and commercial items including furniture, appliances, electronics, yard waste, construction debris, and general junk. There are some items we cannot accept due to environmental regulations, such as hazardous waste, certain chemicals, and some electronics. Please contact us if you have questions about specific items.'
    },
    {
        id: 'faq-2',
        question: 'How does your pricing work?',
        answer: 'Our pricing is based on the volume of items to be removed. We provide free, no-obligation estimates before beginning any work. Our team will assess the items to be removed and provide a clear, upfront price that includes labor, transportation, and disposal fees.'
    },
    {
        id: 'faq-3',
        question: 'Do I need to be present during the junk removal?',
        answer: "While it's helpful for you to be present at the beginning to confirm what items need to be removed, you don't need to stay for the entire process. Once our team understands the scope of work, you can leave the rest to us."
    },
    {
        id: 'faq-4',
        question: 'What happens to the items you remove?',
        answer: "We're committed to environmentally responsible disposal. Items in good condition are donated to local charities when possible. Recyclable materials are taken to appropriate recycling facilities. Only items that cannot be donated or recycled are taken to licensed disposal facilities."
    }
    // Add more FAQs as needed
];
const FaqSection = () => {
    return (<section className="py-16 md:py-24 bg-neutral-100 dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 font-montserrat">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto font-open-sans">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FaqAccordion_1.default faqs={faqs}/>
        </div>

        <div className="text-center mt-12">
           {/* Link to potential dedicated FAQ page */}
          <react_router_dom_1.Link to="/faq">
            <Button_1.default variant="outline" icon="help-circle" iconPosition="left">
              View All FAQs
            </Button_1.default>
          </react_router_dom_1.Link>
        </div>
      </div>
    </section>);
};
exports.default = FaqSection;
//# sourceMappingURL=FaqSection.jsx.map