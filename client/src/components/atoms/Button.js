"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkButton = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Icon_1 = __importDefault(require("./Icon"));
/**
 * Button Component
 *
 * A versatile button component that supports various styles, sizes, and states.
 * Can include icons and loading states. Can be rendered as a button or a link.
 */
const Button = ({ variant = 'primary', size = 'medium', icon, iconPosition = 'left', fullWidth = false, loading = false, disabled = false, className = '', children, ...props }) => {
    // Base classes
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
    // Variant classes
    const variantClasses = {
        primary: 'bg-primary-color hover:bg-primary-light text-white focus:ring-primary-color',
        secondary: 'bg-secondary-color hover:bg-secondary-light text-white focus:ring-secondary-color',
        accent: 'bg-accent-color hover:bg-accent-light text-neutral-900 focus:ring-accent-color',
        outline: 'bg-transparent border-2 border-primary-color text-primary-color hover:bg-primary-color hover:text-white focus:ring-primary-color',
        'outline-light': 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-color focus:ring-white',
        text: 'bg-transparent text-primary-color hover:text-primary-light focus:ring-primary-color',
    };
    // Size classes
    const sizeClasses = {
        small: 'text-sm py-1 px-3',
        medium: 'text-base py-2 px-4',
        large: 'text-lg py-3 px-6',
    };
    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';
    // Disabled classes
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
    // Combine all classes
    const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClasses}
    ${disabledClasses}
    ${className}
  `.trim();
    return (<button className={buttonClasses} disabled={disabled || loading} {...props}>
      {loading && (<span className="mr-2">
          <Icon_1.default name="loader" size="small" className="animate-spin"/>
        </span>)}
      
      {icon && iconPosition === 'left' && !loading && (<span className="mr-2">
          <Icon_1.default name={icon} size="small"/>
        </span>)}
      
      {children}
      
      {icon && iconPosition === 'right' && (<span className="ml-2">
          <Icon_1.default name={icon} size="small"/>
        </span>)}
    </button>);
};
/**
 * Link Button Component
 *
 * A button that renders as a React Router Link.
 * Shares the same styling as the Button component.
 */
const LinkButton = ({ variant = 'primary', size = 'medium', icon, iconPosition = 'left', fullWidth = false, disabled = false, className = '', children, to, ...props }) => {
    // Base classes
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
    // Variant classes
    const variantClasses = {
        primary: 'bg-primary-color hover:bg-primary-light text-white focus:ring-primary-color',
        secondary: 'bg-secondary-color hover:bg-secondary-light text-white focus:ring-secondary-color',
        accent: 'bg-accent-color hover:bg-accent-light text-neutral-900 focus:ring-accent-color',
        outline: 'bg-transparent border-2 border-primary-color text-primary-color hover:bg-primary-color hover:text-white focus:ring-primary-color',
        'outline-light': 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-color focus:ring-white',
        text: 'bg-transparent text-primary-color hover:text-primary-light focus:ring-primary-color',
    };
    // Size classes
    const sizeClasses = {
        small: 'text-sm py-1 px-3',
        medium: 'text-base py-2 px-4',
        large: 'text-lg py-3 px-6',
    };
    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';
    // Disabled classes
    const disabledClasses = disabled ? 'opacity-50 pointer-events-none' : '';
    // Combine all classes
    const linkClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClasses}
    ${disabledClasses}
    ${className}
  `.trim();
    return (<react_router_dom_1.Link className={linkClasses} to={to} {...props}>
      {icon && iconPosition === 'left' && (<span className="mr-2">
          <Icon_1.default name={icon} size="small"/>
        </span>)}
      
      {children}
      
      {icon && iconPosition === 'right' && (<span className="ml-2">
          <Icon_1.default name={icon} size="small"/>
        </span>)}
    </react_router_dom_1.Link>);
};
exports.LinkButton = LinkButton;
exports.default = Button;
//# sourceMappingURL=Button.js.map