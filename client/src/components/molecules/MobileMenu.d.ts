import React from 'react';
interface MobileMenuProps {
    navLinks: Array<{
        path: string;
        label: string;
    }>;
    isAuthenticated: boolean;
    activeLink: string;
    onClose: () => void;
    onLogout: () => void;
}
/**
 * MobileMenu Component
 *
 * A responsive mobile navigation menu that slides in from the right.
 * Includes navigation links, authentication buttons, and theme toggle.
 */
declare const MobileMenu: React.FC<MobileMenuProps>;
export default MobileMenu;
//# sourceMappingURL=MobileMenu.d.ts.map