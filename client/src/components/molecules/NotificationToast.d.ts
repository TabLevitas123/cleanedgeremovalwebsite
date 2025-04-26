import React from 'react';
interface NotificationToastProps {
    className?: string;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    limit?: number;
}
/**
 * NotificationToast Component
 *
 * Displays toast notifications in a specified corner of the screen.
 * Notifications are automatically removed after their duration expires.
 */
declare const NotificationToast: React.FC<NotificationToastProps>;
export default NotificationToast;
//# sourceMappingURL=NotificationToast.d.ts.map