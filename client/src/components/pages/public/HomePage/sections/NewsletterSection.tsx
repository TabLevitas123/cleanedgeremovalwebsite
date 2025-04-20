import React from 'react';
import NewsletterSignup from '../../../../molecules/NewsletterSignup'; // Corrected path again

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-neutral-100 dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Render the NewsletterSignup molecule */}
          <NewsletterSignup />
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;