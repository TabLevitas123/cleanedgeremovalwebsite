import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../../atoms/Icon'; // Corrected path

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
      staggerChildren: 0.15 // Slightly faster stagger for this grid
    }
  }
};

// Placeholder data for differentiators
const differentiators = [
  { id: 1, icon: 'check-circle', title: 'Reliability', description: 'We are committed to providing reliable and consistent junk removal services you can count on, every time.', color: 'primary' },
  { id: 2, icon: 'leaf', title: 'Eco-Friendly', description: 'We prioritize environmentally responsible disposal, recycling, and donating items whenever possible to minimize waste.', color: 'secondary' },
  { id: 3, icon: 'clock', title: 'Punctuality', description: 'Your time is valuable. We arrive on schedule and complete the job efficiently, respecting your time and commitments.', color: 'accent' },
  { id: 4, icon: 'shield', title: 'Licensed & Insured', description: 'We are fully licensed and insured, providing you with peace of mind and protection throughout the service process.', color: 'primary' },
  { id: 5, icon: 'heart', title: 'Customer Satisfaction', description: 'Our goal is your complete satisfaction. We strive to exceed your expectations with our professional and friendly service.', color: 'secondary' },
  { id: 6, icon: 'users', title: 'Experienced Staff', description: 'Our team is experienced, trained, and equipped to handle all types of junk removal and cleanout projects safely and effectively.', color: 'accent' },
];

// Placeholder data for stats
const stats = [
    { id: 1, value: '10+', label: 'Years Experience' },
    { id: 2, value: '5K+', label: 'Happy Customers' },
    { id: 3, value: '98%', label: 'Items Recycled/Donated' },
    { id: 4, value: '24/7', label: 'Support Available' }, // Or maybe 'Fast Response'?
];


const WhyChooseUsSection: React.FC = () => {
  // TODO: Implement animated counter for stats later

  return (
    // TODO: Add specific background pattern class from spec
    <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 font-montserrat">
            Why Choose Clean Edge Removal
          </h2>
          {/* TODO: Add decorative underline */}
          <div className="w-20 h-1 bg-primary-color mx-auto mb-6"></div>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto font-open-sans">
            Choosing Clean Edge Removal means choosing a partner committed to professionalism, environmental responsibility, and exceptional customer service. We go above and beyond to ensure your satisfaction.
          </p>
        </div>

        {/* Differentiator Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {differentiators.map((item) => (
            <motion.div
              key={item.id}
              className="flex flex-col items-center text-center"
              variants={fadeIn}
            >
              <div className={`w-16 h-16 rounded-full bg-${item.color}/10 dark:bg-${item.color}/20 flex items-center justify-center mb-4`}>
                <Icon name={item.icon as any} size="large" className={`text-${item.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2 font-montserrat">
                {item.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 font-open-sans text-sm"> {/* Slightly smaller text */}
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistical Highlights */}
        {/* TODO: Add primary color bar background */}
        <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-700 bg-primary-color text-white rounded-lg py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
                 <motion.div key={stat.id} variants={fadeIn}>
                    {/* TODO: Add animated counter component */}
                    <span className="text-4xl font-bold">
                        {stat.value}
                    </span>
                    <p className="text-white/80 mt-2 font-open-sans">{stat.label}</p>
                 </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;