"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
const Button_1 = __importDefault(require("../../../../atoms/Button")); // Corrected path again
const HeroSection = () => {
    return (<section className="relative bg-gradient-to-r from-primary-dark to-primary-color overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img src="/images/hero-bg.jpg" // Placeholder image path
     alt="" className="w-full h-full object-cover" aria-hidden="true"/>
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <framer_motion_1.motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-montserrat" // Added font
     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Professional Junk Removal & Cleaning Services {/* Updated Headline */}
          </framer_motion_1.motion.h1>
          <framer_motion_1.motion.p className="text-xl md:text-2xl text-white/90 mb-8 font-open-sans" // Added font
     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Serving Northern Indiana, Southern Michigan, and Northern Ohio with Pride and Professionalism. {/* Updated Subheading */}
          </framer_motion_1.motion.p>
          <framer_motion_1.motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            {/* Updated Button Text & Link */}
            <react_router_dom_1.Link to="#scheduling-contact"> {/* Link to the scheduling section ID */}
              <Button_1.default variant="accent" // Use accent color as per spec
     size="large" className="w-[220px] h-[54px] rounded-lg" // Specific size and radius
    >
                SCHEDULE SERVICE NOW
              </Button_1.default>
            </react_router_dom_1.Link>
             {/* Removed "Our Services" button as it's in the main nav */}
          </framer_motion_1.motion.div>
           {/* Trust Indicators - Placeholder for now */}
           <framer_motion_1.motion.div className="mt-8 flex justify-start space-x-6" // Adjusted layout
     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
             {/* Placeholder Icons/Badges */}
             <span className="text-white/80 text-sm font-open-sans">✓ Insured</span>
             <span className="text-white/80 text-sm font-open-sans">✓ Top-rated</span>
             <span className="text-white/80 text-sm font-open-sans">✓ Eco-friendly</span>
           </framer_motion_1.motion.div>
        </div>
      </div>
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-neutral-900 to-transparent"></div>
    </section>);
};
exports.default = HeroSection;
//# sourceMappingURL=HeroSection.jsx.map