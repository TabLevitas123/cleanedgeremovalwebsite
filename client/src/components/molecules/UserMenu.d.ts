import React from 'react';
interface UserMenuProps {
    user: {
        id?: string;
        name?: string;
        email?: string;
        role?: string;
        avatar?: string;
    };
    onLogout: () => void;
    className?: string;
}
/**
 * UserMenu Component
 *
 * A dropdown menu for authenticated users that displays user information
 * and provides links to user-related pages and logout functionality.
 */
declare const UserMenu: React.FC<UserMenuProps>;
export default UserMenu;
//# sourceMappingURL=UserMenu.d.ts.map