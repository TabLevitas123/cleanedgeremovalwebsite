"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const react_helmet_async_1 = require("react-helmet-async");
// Import Section Components
const HeroSection_1 = __importDefault(require("./HomePage/sections/HeroSection"));
const HowItWorksSection_1 = __importDefault(require("./HomePage/sections/HowItWorksSection"));
const WhyChooseUsSection_1 = __importDefault(require("./HomePage/sections/WhyChooseUsSection"));
const ServicesSection_1 = __importDefault(require("./HomePage/sections/ServicesSection"));
const CtaSection_1 = __importDefault(require("./HomePage/sections/CtaSection"));
const TestimonialsSection_1 = __importDefault(require("./HomePage/sections/TestimonialsSection"));
const FaqSection_1 = __importDefault(require("./HomePage/sections/FaqSection"));
const ServiceAreaSection_1 = __importDefault(require("./HomePage/sections/ServiceAreaSection"));
const SchedulingContactSection_1 = __importDefault(require("./HomePage/sections/SchedulingContactSection"));
const NewsletterSection_1 = __importDefault(require("./HomePage/sections/NewsletterSection"));
const logger_1 = require("../../../utils/logger");
const uiSlice_1 = require("../../../features/ui/uiSlice");
/**
 * HomePage Component
 *
 * The main landing page for the Clean Edge Removal website.
 * Composed of various section components.
 */
const HomePage = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [isLoaded, setIsLoaded] = (0, react_1.useState)(false);
    // Mark page as loaded for analytics and performance tracking
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
            dispatch((0, uiSlice_1.setPageLoaded)('home'));
            logger_1.logger.info('HomePage loaded', { page: 'home' });
        }, 100); // Short delay to ensure rendering
        return () => clearTimeout(timer);
    }, [dispatch]);
    // Note: Form state and handlers are now within SchedulingContactSection.tsx
    // Note: Testimonial carousel state is now within TestimonialsSection.tsx
    // Note: Service, Testimonial, FAQ data arrays are now within their respective section components (or should be fetched)
    return (<>
      <react_helmet_async_1.Helmet>
        <title>Clean Edge Removal | Professional Junk Removal & Property Cleanout Services</title>
        <meta name="description" content="Clean Edge Removal provides professional junk removal, property cleanout, and related services in Northern Indiana, Southern Michigan, and Northern Ohio. Get a free quote today!"/>
        <meta name="keywords" content="junk removal, property cleanout, furniture removal, appliance removal, handyman, industrial cleaning, South Bend, Mishawaka, Elkhart, Northern Indiana, Southern Michigan, Northern Ohio"/>
        <link rel="canonical" href="https://www.cleanedgeremoval.com"/> {/* Ensure correct domain */}
      </react_helmet_async_1.Helmet>

      {/* Render Section Components */}
      <HeroSection_1.default />
      <HowItWorksSection_1.default />
      <WhyChooseUsSection_1.default />
      <ServicesSection_1.default />
      <CtaSection_1.default />
      <TestimonialsSection_1.default />
      <ServiceAreaSection_1.default /> {/* Includes map placeholder and areas list */}
      <FaqSection_1.default />
      <SchedulingContactSection_1.default /> {/* Contains the quote request form */}
      <NewsletterSection_1.default />

    </>);
};
exports.default = HomePage;
//# sourceMappingURL=HomePage.jsx.map