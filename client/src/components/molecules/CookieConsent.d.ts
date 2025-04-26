import React from 'react';
interface CookieConsentProps {
    className?: string;
    position?: 'bottom' | 'top';
    cookieName?: string;
    cookieExpiration?: number;
}
/**
 * CookieConsent Component
 *
 * Displays a cookie consent banner that allows users to accept or decline cookies.
 * The banner is shown until the user makes a choice, and the choice is stored in a cookie.
 */
declare const CookieConsent: React.FC<CookieConsentProps>;
export default CookieConsent;
//# sourceMappingURL=CookieConsent.d.ts.map