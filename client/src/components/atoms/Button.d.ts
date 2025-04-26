import React, { ButtonHTMLAttributes } from 'react';
import { LinkProps } from 'react-router-dom';
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'outline-light' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}
export interface LinkButtonProps extends Omit<LinkProps, 'className'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: string;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}
/**
 * Button Component
 *
 * A versatile button component that supports various styles, sizes, and states.
 * Can include icons and loading states. Can be rendered as a button or a link.
 */
declare const Button: React.FC<ButtonProps>;
/**
 * Link Button Component
 *
 * A button that renders as a React Router Link.
 * Shares the same styling as the Button component.
 */
export declare const LinkButton: React.FC<LinkButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map