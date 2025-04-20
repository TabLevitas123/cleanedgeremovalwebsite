import React, { useState } from 'react';
import Icon from '../atoms/Icon';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  initialOpenId?: string;
}

/**
 * FaqAccordion Component
 * 
 * Displays a list of frequently asked questions in an accordion format.
 * Users can click on questions to expand/collapse the answers.
 */
const FaqAccordion: React.FC<FaqAccordionProps> = ({ 
  faqs, 
  initialOpenId 
}) => {
  const [openId, setOpenId] = useState<string | null>(initialOpenId || null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div 
          key={faq.id}
          className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
        >
          <button
            className="w-full flex justify-between items-center p-4 text-left bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors"
            onClick={() => toggleFaq(faq.id)}
            aria-expanded={openId === faq.id}
            aria-controls={`faq-answer-${faq.id}`}
          >
            <span className="font-medium text-neutral-800 dark:text-neutral-100">
              {faq.question}
            </span>
            <Icon 
              name={openId === faq.id ? 'chevron-up' : 'chevron-down'} 
              className="text-neutral-500 dark:text-neutral-400 flex-shrink-0 ml-2"
            />
          </button>
          
          <div 
            id={`faq-answer-${faq.id}`}
            className={`px-4 overflow-hidden transition-all duration-300 ${
              openId === faq.id 
                ? 'max-h-96 pb-4' 
                : 'max-h-0'
            }`}
          >
            <p className="text-neutral-600 dark:text-neutral-400">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;