import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { removeNotification } from '../../features/notifications/notificationSlice';
import Icon from '../atoms/Icon';

// Define props
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
const NotificationToast: React.FC<NotificationToastProps> = ({
  className = '',
  position = 'top-right',
  limit = 5,
}) => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state: RootState) => state.notifications);
  
  // Filter out dismissed notifications and limit the number shown
  const visibleNotifications = notifications
    .filter(notification => !notification.dismissed)
    .slice(0, limit);
  
  // Set up auto-dismiss based on duration
  useEffect(() => {
    visibleNotifications.forEach(notification => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.duration);
        
        return () => clearTimeout(timer);
      }
    });
  }, [visibleNotifications, dispatch]);
  
  // If no visible notifications, don't render
  if (visibleNotifications.length === 0) {
    return null;
  }
  
  // Position classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };
  
  // Get icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'alert-triangle';
      case 'info':
      default:
        return 'info';
    }
  };
  
  // Get background color based on notification type
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-success-color';
      case 'error':
        return 'bg-error-color';
      case 'warning':
        return 'bg-warning-color';
      case 'info':
      default:
        return 'bg-info-color';
    }
  };
  
  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-2 max-w-md w-full ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBackgroundColor(notification.type)} text-white rounded-md shadow-lg overflow-hidden flex items-start transition-all duration-300 animate-slideInUp`}
          role="alert"
        >
          <div className="flex-1 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <Icon name={getIcon(notification.type)} size="medium" />
              </div>
              <div>
                {notification.title && (
                  <h4 className="font-semibold mb-1">{notification.title}</h4>
                )}
                <p className="text-sm">{notification.message}</p>
                {notification.link && (
                  <a 
                    href={notification.link} 
                    className="text-sm underline mt-1 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more
                  </a>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => dispatch(removeNotification(notification.id))}
            className="p-2 text-white opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close notification"
          >
            <Icon name="x" size="small" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;