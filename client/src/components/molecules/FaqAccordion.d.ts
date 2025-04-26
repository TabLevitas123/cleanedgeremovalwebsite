import React from 'react';
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
declare const FaqAccordion: React.FC<FaqAccordionProps>;
export default FaqAccordion;
//# sourceMappingURL=FaqAccordion.d.ts.map