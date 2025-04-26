"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const Icon_1 = __importDefault(require("../../../../atoms/Icon")); // Corrected path
// Animation variants (can be moved to a shared file later)
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};
const HowItWorksSection = () => {
    return (<section className="py-16 md:py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 font-montserrat">
            How It Works
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto font-open-sans">
            Our simple process makes junk removal stress-free
          </p>
        </div>

        <framer_motion_1.motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is visible
    >
          {/* Step 1 */}
          <framer_motion_1.motion.div className="flex flex-col items-center text-center" variants={fadeIn}>
            <div className="w-20 h-20 rounded-full bg-primary-light/20 flex items-center justify-center mb-6">
              <Icon_1.default name="calendar" size="large" className="text-primary-color"/>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 font-montserrat">
              1. Schedule
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 font-open-sans">
              Book online or call us to schedule a convenient appointment. We offer flexible timing to fit your schedule.
            </p>
          </framer_motion_1.motion.div>

          {/* Step 2 */}
          <framer_motion_1.motion.div className="flex flex-col items-center text-center" variants={fadeIn}>
            <div className="w-20 h-20 rounded-full bg-primary-light/20 flex items-center justify-center mb-6">
              <Icon_1.default name="dollar-sign" size="large" className="text-primary-color"/>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 font-montserrat">
              2. Get a Quote
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 font-open-sans">
              Our team provides a clear, upfront price based on the volume of items to be removed. No hidden fees or surprises.
            </p>
          </framer_motion_1.motion.div>

          {/* Step 3 */}
          <framer_motion_1.motion.div className="flex flex-col items-center text-center" variants={fadeIn}>
            <div className="w-20 h-20 rounded-full bg-primary-light/20 flex items-center justify-center mb-6">
              <Icon_1.default name="check-circle" size="large" className="text-primary-color"/>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-3 font-montserrat">
              3. Relax
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 font-open-sans">
              We handle all the heavy lifting, loading, and responsible disposal. You don't have to lift a finger.
            </p>
          </framer_motion_1.motion.div>
        </framer_motion_1.motion.div>

        {/* Optional Learn More Button */}
        {/* <div className="text-center mt-12">
          <Link to="/how-it-works"> // Assuming a dedicated page exists
            <Button
              variant="outline"
              icon="arrow-right"
              iconPosition="right"
            >
              Learn More About Our Process
            </Button>
          </Link>
        </div> */}
      </div>
    </section>);
};
exports.default = HowItWorksSection;
//# sourceMappingURL=HowItWorksSection.jsx.map