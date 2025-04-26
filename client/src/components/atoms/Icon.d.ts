import React from 'react';
export type IconSize = 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
export interface IconProps {
    name: string;
    size?: IconSize;
    color?: string;
    className?: string;
    title?: string;
    onClick?: () => void;
}
/**
 * Icon Component
 *
 * A versatile icon component that renders Feather icons with various sizes and colors.
 * Supports all Feather icons from react-icons/fi.
 */
declare const Icon: React.FC<IconProps>;
export default Icon;
//# sourceMappingURL=Icon.d.ts.map