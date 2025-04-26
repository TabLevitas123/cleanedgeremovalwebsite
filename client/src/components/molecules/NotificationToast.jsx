"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const notificationSlice_1 = require("../../features/notifications/notificationSlice");
const Icon_1 = __importDefault(require("../atoms/Icon"));
/**
 * NotificationToast Component
 *
 * Displays toast notifications in a specified corner of the screen.
 * Notifications are automatically removed after their duration expires.
 */
const NotificationToast = ({ className = '', position = 'top-right', limit = 5, }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { notifications } = (0, react_redux_1.useSelector)((state) => state.notifications);
    // Filter out dismissed notifications and limit the number shown
    const visibleNotifications = notifications
        .filter(notification => !notification.dismissed)
        .slice(0, limit);
    // Set up auto-dismiss based on duration
    (0, react_1.useEffect)(() => {
        visibleNotifications.forEach(notification => {
            if (notification.duration) {
                const timer = setTimeout(() => {
                    dispatch((0, notificationSlice_1.removeNotification)(notification.id));
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
    const getIcon = (type) => {
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
    const getBackgroundColor = (type) => {
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
    return (<div className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-2 max-w-md w-full ${className}`} aria-live="polite" aria-atomic="true">
      {visibleNotifications.map((notification) => (<div key={notification.id} className={`${getBackgroundColor(notification.type)} text-white rounded-md shadow-lg overflow-hidden flex items-start transition-all duration-300 animate-slideInUp`} role="alert">
          <div className="flex-1 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <Icon_1.default name={getIcon(notification.type)} size="medium"/>
              </div>
              <div>
                {notification.title && (<h4 className="font-semibold mb-1">{notification.title}</h4>)}
                <p className="text-sm">{notification.message}</p>
                {notification.link && (<a href={notification.link} className="text-sm underline mt-1 inline-block" target="_blank" rel="noopener noreferrer">
                    Learn more
                  </a>)}
              </div>
            </div>
          </div>
          <button onClick={() => dispatch((0, notificationSlice_1.removeNotification)(notification.id))} className="p-2 text-white opacity-70 hover:opacity-100 transition-opacity" aria-label="Close notification">
            <Icon_1.default name="x" size="small"/>
          </button>
        </div>))}
    </div>);
};
exports.default = NotificationToast;
//# sourceMappingURL=NotificationToast.jsx.map