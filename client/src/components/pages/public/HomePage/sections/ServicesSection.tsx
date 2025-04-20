import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ServiceCard from '../../../../molecules/ServiceCard'; // Corrected path again
import Button from '../../../../atoms/Button'; // This path should be correct

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
      staggerChildren: 0.1 // Faster stagger for more items
    }
  }
};

// Updated Service data based on specification
const services = [
  {
    id: 'junk-removal',
    title: 'Junk Removal',
    description: 'Residential, commercial, and construction waste removal. We handle everything from single items to full property cleanouts.',
    icon: 'trash-2', // Placeholder icon name - map to actual icon component/SVG later
    image: '/images/services/junk-removal.jpg', // Placeholder image path
    link: '/services/junk-removal' // Example link
  },
  {
    id: 'cleanout-services',
    title: 'Cleanout Services',
    description: 'Garage, basement, attic, storage unit cleanouts, and hoarding situation remediation. We leave your space clutter-free.',
    icon: 'home', // Placeholder icon name
    image: '/images/services/cleanout.jpg', // Placeholder image path
    link: '/services/cleanout'
  },
  {
    id: 'relocation-services',
    title: 'Relocation Services',
    description: 'Moving preparation assistance, post-move cleanups, furniture/appliance disposal, and donation transportation.',
    icon: 'truck', // Placeholder icon name
    image: '/images/services/relocation.jpg', // Placeholder image path
    link: '/services/relocation'
  },
  {
    id: 'recycling-services',
    title: 'Recycling Services',
    description: 'Material sorting, electronics recycling (e-waste), metal recycling, and responsible disposal of various materials.',
    icon: 'recycle', // Placeholder icon name
    image: '/images/services/recycling.jpg', // Placeholder image path
    link: '/services/recycling'
  },
  {
    id: 'handyman-services',
    title: 'Handyman Services',
    description: 'Minor repairs, furniture assembly, light fixture installation, small carpentry projects, door/window repairs.',
    icon: 'tool', // Placeholder icon name
    image: '/images/services/handyman.jpg', // Placeholder image path
    link: '/services/handyman'
  },
  {
    id: 'donation-services',
    title: 'Donation Services',
    description: 'Coordination with charities, pickup and delivery of furniture, clothing, and household goods, with tax receipt documentation.',
    icon: 'gift', // Placeholder icon name
    image: '/images/services/donation.jpg', // Placeholder image path
    link: '/services/donation'
  },
  {
    id: 'industrial-cleaning',
    title: 'Industrial Cleaning',
    description: 'Warehouse, factory floor, equipment cleaning, loading dock sanitation, and industrial space preparation.',
    icon: 'building', // Placeholder icon name
    image: '/images/services/industrial-cleaning.jpg', // Placeholder image path
    link: '/services/industrial-cleaning'
  },
  {
    id: 'industrial-painting',
    title: 'Industrial Painting',
    description: 'Equipment painting, safety line marking, warehouse interior/exterior painting, and rust prevention treatments.',
    icon: 'paint-roller', // Placeholder icon name
    image: '/images/services/industrial-painting.jpg', // Placeholder image path
    link: '/services/industrial-painting'
  },
  {
    id: 'monument-cleaning',
    title: 'Monument Cleaning',
    description: 'Headstone cleaning, memorial maintenance, monument restoration, bronze plaque polishing, and stone feature cleaning.',
    icon: 'landmark', // Placeholder icon name
    image: '/images/services/monument-cleaning.jpg', // Placeholder image path
    link: '/services/monument-cleaning'
  },
  {
    id: 'dumpster-area-cleaning',
    title: 'Dumpster Area Cleaning',
    description: 'Dumpster pad sanitizing, waste area deodorizing, enclosure cleaning, pressure washing, and stain removal.',
    icon: 'spray-can', // Placeholder icon name
    image: '/images/services/dumpster-cleaning.jpg', // Placeholder image path
    link: '/services/dumpster-cleaning'
  },
  {
    id: 'specialty-services',
    title: 'Specialty Services',
    description: 'Disaster cleanup (water/fire damage), seasonal cleanups, and other custom cleaning or removal projects.',
    icon: 'star', // Placeholder icon name
    image: '/images/services/specialty.jpg', // Placeholder image path
    link: '/services/specialty'
  }
];


const ServicesSection: React.FC = () => {
  return (
    // TODO: Add subtle pattern overlay background class from spec
    <section className="py-16 md:py-24 bg-neutral-100 dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 font-montserrat">
            Our Comprehensive Services
          </h2>
           {/* TODO: Add decorative accent lines */}
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto font-open-sans">
            From single items to complete property cleanouts, we offer a wide range of professional removal and cleaning solutions.
          </p>
        </div>

        <motion.div
          // Responsive grid: 4 cols on lg, 3 on md, 2 on sm, 1 on xs
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto" // Centered with max-width
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Trigger early for grid
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={fadeIn}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon} // Pass icon name/reference
                image={service.image} // Pass image path
                link={service.link}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/services"> {/* Link to a potential dedicated services page */}
            <Button
              variant="primary"
              icon="grid"
              iconPosition="left"
            >
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;