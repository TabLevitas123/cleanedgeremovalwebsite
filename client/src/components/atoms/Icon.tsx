import React from 'react';
import {
  FiAlertCircle, FiAlertTriangle, FiArrowDown, FiArrowLeft, FiArrowRight,
  FiArrowUp, FiCalendar, FiCheck, FiCheckCircle, FiChevronDown, FiChevronLeft,
  FiChevronRight, FiChevronUp, FiClock, FiEdit, FiEye, FiEyeOff, FiFile,
  FiFilter, FiHelpCircle, FiHome, FiInfo, FiLoader, FiLock, FiLogOut,
  FiMail, FiMapPin, FiMenu, FiMessageSquare, FiMoon, FiMoreHorizontal,
  FiMoreVertical, FiPhone, FiPlus, FiSearch, FiSettings, FiSun, FiTrash,
  FiUser, FiX, FiXCircle, FiExternalLink, FiDownload, FiUpload, FiStar,
  FiHeart, FiShield, FiTruck, FiDollarSign, FiCreditCard, FiClipboard,
  FiCamera, FiImage, FiPrinter, FiWifi, FiSlash, FiGlobe, FiGrid, FiList,
  FiRefreshCw, FiSave, FiShare, FiTag, FiThumbsUp, FiThumbsDown, FiTool,
  FiUsers, FiZoomIn, FiZoomOut, FiPackage, FiBox, FiTrendingUp, FiTrendingDown,
  FiBarChart, FiPieChart, FiActivity, FiGift, FiBookmark,
  FiCloudRain, FiCompass, FiCopy, FiDatabase, FiFlag, FiFolder, FiHardDrive,
  FiLayers, FiLink, FiMap, FiMaximize, FiMinimize, FiMic, FiPaperclip,
  FiPercent, FiPower, FiRotateCcw, FiRotateCw, FiShuffle, FiSkipBack,
  FiSkipForward, FiSliders, FiSmartphone, FiSquare, FiTarget, FiTerminal,
  FiToggleLeft, FiToggleRight, FiTrash2, FiVideo, FiVoicemail, FiWatch,
  FiWind, FiYoutube, FiInstagram, FiFacebook, FiTwitter, FiLinkedin, FiGithub
} from 'react-icons/fi';

// Define icon size options
export type IconSize = 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';

// Define icon props
export interface IconProps {
  name: string;
  size?: IconSize;
  color?: string;
  className?: string;
  title?: string;
  onClick?: () => void;
}

// Icon name to component mapping
const iconMap: Record<string, React.ElementType> = {
  'alert-circle': FiAlertCircle,
  'alert-triangle': FiAlertTriangle,
  'arrow-down': FiArrowDown,
  'arrow-left': FiArrowLeft,
  'arrow-right': FiArrowRight,
  'arrow-up': FiArrowUp,
  'calendar': FiCalendar,
  'check': FiCheck,
  'check-circle': FiCheckCircle,
  'chevron-down': FiChevronDown,
  'chevron-left': FiChevronLeft,
  'chevron-right': FiChevronRight,
  'chevron-up': FiChevronUp,
  'clock': FiClock,
  'edit': FiEdit,
  'eye': FiEye,
  'eye-off': FiEyeOff,
  'file': FiFile,
  'filter': FiFilter,
  'help-circle': FiHelpCircle,
  'home': FiHome,
  'info': FiInfo,
  'loader': FiLoader,
  'lock': FiLock,
  'log-out': FiLogOut,
  'mail': FiMail,
  'map-pin': FiMapPin,
  'menu': FiMenu,
  'message-square': FiMessageSquare,
  'moon': FiMoon,
  'more-horizontal': FiMoreHorizontal,
  'more-vertical': FiMoreVertical,
  'phone': FiPhone,
  'plus': FiPlus,
  'search': FiSearch,
  'settings': FiSettings,
  'sun': FiSun,
  'trash': FiTrash,
  'user': FiUser,
  'x': FiX,
  'x-circle': FiXCircle,
  'external-link': FiExternalLink,
  'download': FiDownload,
  'upload': FiUpload,
  'star': FiStar,
  'heart': FiHeart,
  'shield': FiShield,
  'truck': FiTruck,
  'dollar-sign': FiDollarSign,
  'credit-card': FiCreditCard,
  'clipboard': FiClipboard,
  'camera': FiCamera,
  'image': FiImage,
  'printer': FiPrinter,
  'wifi': FiWifi,
  'slash': FiSlash,
  'globe': FiGlobe,
  'grid': FiGrid,
  'list': FiList,
  'refresh-cw': FiRefreshCw,
  'save': FiSave,
  'share': FiShare,
  'tag': FiTag,
  'thumbs-up': FiThumbsUp,
  'thumbs-down': FiThumbsDown,
  'tool': FiTool,
  'users': FiUsers,
  'zoom-in': FiZoomIn,
  'zoom-out': FiZoomOut,
  'package': FiPackage,
  'box': FiBox,
  'trending-up': FiTrendingUp,
  'trending-down': FiTrendingDown,
  'bar-chart': FiBarChart,
  'pie-chart': FiPieChart,
  'activity': FiActivity,
  'gift': FiGift,
  'bookmark': FiBookmark,
  'cloud-rain': FiCloudRain,
  'compass': FiCompass,
  'copy': FiCopy,
  'database': FiDatabase,
  'flag': FiFlag,
  'folder': FiFolder,
  'hard-drive': FiHardDrive,
  'layers': FiLayers,
  'link': FiLink,
  'map': FiMap,
  'maximize': FiMaximize,
  'minimize': FiMinimize,
  'mic': FiMic,
  'paperclip': FiPaperclip,
  'percent': FiPercent,
  'power': FiPower,
  'rotate-ccw': FiRotateCcw,
  'rotate-cw': FiRotateCw,
  'shuffle': FiShuffle,
  'skip-back': FiSkipBack,
  'skip-forward': FiSkipForward,
  'sliders': FiSliders,
  'smartphone': FiSmartphone,
  'square': FiSquare,
  'target': FiTarget,
  'terminal': FiTerminal,
  'toggle-left': FiToggleLeft,
  'toggle-right': FiToggleRight,
  'trash-2': FiTrash2,
  'video': FiVideo,
  'voicemail': FiVoicemail,
  'watch': FiWatch,
  'wind': FiWind,
  'youtube': FiYoutube,
  'instagram': FiInstagram,
  'facebook': FiFacebook,
  'twitter': FiTwitter,
  'linkedin': FiLinkedin,
  'github': FiGithub,
};

// Size mapping (in pixels)
const sizeMap: Record<IconSize, number> = {
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
const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  color,
  className = '',
  title,
  onClick,
}) => {
  // Get the icon component
  const IconComponent = iconMap[name];
  
  // If icon doesn't exist, return null or a fallback
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  // Get the size in pixels
  const pixelSize = sizeMap[size];
  
  return (
    <span
      className={`inline-flex ${className}`}
      title={title}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={{ cursor: onClick ? 'pointer' : 'inherit' }}
    >
      <IconComponent size={pixelSize} color={color} />
    </span>
  );
};

export default Icon;