"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const fi_1 = require("react-icons/fi");
// Icon name to component mapping
const iconMap = {
    'alert-circle': fi_1.FiAlertCircle,
    'alert-triangle': fi_1.FiAlertTriangle,
    'arrow-down': fi_1.FiArrowDown,
    'arrow-left': fi_1.FiArrowLeft,
    'arrow-right': fi_1.FiArrowRight,
    'arrow-up': fi_1.FiArrowUp,
    'calendar': fi_1.FiCalendar,
    'check': fi_1.FiCheck,
    'check-circle': fi_1.FiCheckCircle,
    'chevron-down': fi_1.FiChevronDown,
    'chevron-left': fi_1.FiChevronLeft,
    'chevron-right': fi_1.FiChevronRight,
    'chevron-up': fi_1.FiChevronUp,
    'clock': fi_1.FiClock,
    'edit': fi_1.FiEdit,
    'eye': fi_1.FiEye,
    'eye-off': fi_1.FiEyeOff,
    'file': fi_1.FiFile,
    'filter': fi_1.FiFilter,
    'help-circle': fi_1.FiHelpCircle,
    'home': fi_1.FiHome,
    'info': fi_1.FiInfo,
    'loader': fi_1.FiLoader,
    'lock': fi_1.FiLock,
    'log-out': fi_1.FiLogOut,
    'mail': fi_1.FiMail,
    'map-pin': fi_1.FiMapPin,
    'menu': fi_1.FiMenu,
    'message-square': fi_1.FiMessageSquare,
    'moon': fi_1.FiMoon,
    'more-horizontal': fi_1.FiMoreHorizontal,
    'more-vertical': fi_1.FiMoreVertical,
    'phone': fi_1.FiPhone,
    'plus': fi_1.FiPlus,
    'search': fi_1.FiSearch,
    'settings': fi_1.FiSettings,
    'sun': fi_1.FiSun,
    'trash': fi_1.FiTrash,
    'user': fi_1.FiUser,
    'x': fi_1.FiX,
    'x-circle': fi_1.FiXCircle,
    'external-link': fi_1.FiExternalLink,
    'download': fi_1.FiDownload,
    'upload': fi_1.FiUpload,
    'star': fi_1.FiStar,
    'heart': fi_1.FiHeart,
    'shield': fi_1.FiShield,
    'truck': fi_1.FiTruck,
    'dollar-sign': fi_1.FiDollarSign,
    'credit-card': fi_1.FiCreditCard,
    'clipboard': fi_1.FiClipboard,
    'camera': fi_1.FiCamera,
    'image': fi_1.FiImage,
    'printer': fi_1.FiPrinter,
    'wifi': fi_1.FiWifi,
    'slash': fi_1.FiSlash,
    'globe': fi_1.FiGlobe,
    'grid': fi_1.FiGrid,
    'list': fi_1.FiList,
    'refresh-cw': fi_1.FiRefreshCw,
    'save': fi_1.FiSave,
    'share': fi_1.FiShare,
    'tag': fi_1.FiTag,
    'thumbs-up': fi_1.FiThumbsUp,
    'thumbs-down': fi_1.FiThumbsDown,
    'tool': fi_1.FiTool,
    'users': fi_1.FiUsers,
    'zoom-in': fi_1.FiZoomIn,
    'zoom-out': fi_1.FiZoomOut,
    'package': fi_1.FiPackage,
    'box': fi_1.FiBox,
    'trending-up': fi_1.FiTrendingUp,
    'trending-down': fi_1.FiTrendingDown,
    'bar-chart': fi_1.FiBarChart,
    'pie-chart': fi_1.FiPieChart,
    'activity': fi_1.FiActivity,
    'gift': fi_1.FiGift,
    'bookmark': fi_1.FiBookmark,
    'cloud-rain': fi_1.FiCloudRain,
    'compass': fi_1.FiCompass,
    'copy': fi_1.FiCopy,
    'database': fi_1.FiDatabase,
    'flag': fi_1.FiFlag,
    'folder': fi_1.FiFolder,
    'hard-drive': fi_1.FiHardDrive,
    'layers': fi_1.FiLayers,
    'link': fi_1.FiLink,
    'map': fi_1.FiMap,
    'maximize': fi_1.FiMaximize,
    'minimize': fi_1.FiMinimize,
    'mic': fi_1.FiMic,
    'paperclip': fi_1.FiPaperclip,
    'percent': fi_1.FiPercent,
    'power': fi_1.FiPower,
    'rotate-ccw': fi_1.FiRotateCcw,
    'rotate-cw': fi_1.FiRotateCw,
    'shuffle': fi_1.FiShuffle,
    'skip-back': fi_1.FiSkipBack,
    'skip-forward': fi_1.FiSkipForward,
    'sliders': fi_1.FiSliders,
    'smartphone': fi_1.FiSmartphone,
    'square': fi_1.FiSquare,
    'target': fi_1.FiTarget,
    'terminal': fi_1.FiTerminal,
    'toggle-left': fi_1.FiToggleLeft,
    'toggle-right': fi_1.FiToggleRight,
    'trash-2': fi_1.FiTrash2,
    'video': fi_1.FiVideo,
    'voicemail': fi_1.FiVoicemail,
    'watch': fi_1.FiWatch,
    'wind': fi_1.FiWind,
    'youtube': fi_1.FiYoutube,
    'instagram': fi_1.FiInstagram,
    'facebook': fi_1.FiFacebook,
    'twitter': fi_1.FiTwitter,
    'linkedin': fi_1.FiLinkedin,
    'github': fi_1.FiGithub,
};
// Size mapping (in pixels)
const sizeMap = {
    'tiny': 12,
    'small': 16,
    'medium': 20,
    'large': 24,
    'xlarge': 32,
};
/**
 * Icon Component
 *
 * A versatile icon component that renders Feather icons with various sizes and colors.
 * Supports all Feather icons from react-icons/fi.
 */
const Icon = ({ name, size = 'medium', color, className = '', title, onClick, }) => {
    // Get the icon component
    const IconComponent = iconMap[name];
    // If icon doesn't exist, return null or a fallback
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }
    // Get the size in pixels
    const pixelSize = sizeMap[size];
    return (<span className={`inline-flex ${className}`} title={title} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} style={{ cursor: onClick ? 'pointer' : 'inherit' }}>
      <IconComponent size={pixelSize} color={color}/>
    </span>);
};
exports.default = Icon;
//# sourceMappingURL=Icon.jsx.map