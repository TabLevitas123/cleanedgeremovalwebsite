"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("../atoms/Icon"));
/**
 * SocialLinks Component
 *
 * Displays social media links with icons and optional labels.
 * Can be customized with different sizes and colors.
 */
const SocialLinks = ({ className = '', size = 'medium', color = '', showLabels = false, }) => {
    // Social media links
    const socialLinks = [
        {
            name: 'facebook',
            url: 'https://facebook.com/cleanedgeremoval',
            icon: 'facebook',
            label: 'Facebook',
        },
        {
            name: 'instagram',
            url: 'https://instagram.com/cleanedgeremoval',
            icon: 'instagram',
            label: 'Instagram',
        },
        {
            name: 'twitter',
            url: 'https://twitter.com/cleanedgeremoval',
            icon: 'twitter',
            label: 'Twitter',
        },
        {
            name: 'linkedin',
            url: 'https://linkedin.com/company/cleanedgeremoval',
            icon: 'linkedin',
            label: 'LinkedIn',
        },
        {
            name: 'youtube',
            url: 'https://youtube.com/channel/cleanedgeremoval',
            icon: 'youtube',
            label: 'YouTube',
        },
    ];
    // Icon size mapping
    const iconSizeMap = {
        small: 'small',
        medium: 'medium',
        large: 'large',
    };
    // Container size classes
    const containerSizeClasses = {
        small: 'gap-2',
        medium: 'gap-3',
        large: 'gap-4',
    };
    // Icon container size classes
    const iconContainerSizeClasses = {
        small: 'w-8 h-8',
        medium: 'w-10 h-10',
        large: 'w-12 h-12',
    };
    return (<div className={`flex items-center ${containerSizeClasses[size]} ${className}`}>
      {socialLinks.map((link) => (<a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} className={`flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-primary-color dark:hover:bg-primary-color text-neutral-700 dark:text-neutral-300 hover:text-white transition-colors ${iconContainerSizeClasses[size]}`}>
          <Icon_1.default name={link.icon} size={iconSizeMap[size]} color={color}/>
          {showLabels && (<span className="ml-2 sr-only">{link.label}</span>)}
        </a>))}
    </div>);
};
exports.default = SocialLinks;
//# sourceMappingURL=SocialLinks.js.map