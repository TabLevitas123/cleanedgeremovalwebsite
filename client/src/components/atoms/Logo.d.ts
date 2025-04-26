import React from 'react';
export type LogoSize = 'small' | 'medium' | 'large';
interface LogoProps {
    size?: LogoSize;
    className?: string;
}
/**
 * Logo Component
 *
 * Displays the Clean Edge Removal LLC logo with responsive sizing options.
 * Automatically adapts to light/dark mode based on the current theme.
 */
declare const Logo: React.FC<LogoProps>;
export default Logo;
//# sourceMappingURL=Logo.d.ts.map