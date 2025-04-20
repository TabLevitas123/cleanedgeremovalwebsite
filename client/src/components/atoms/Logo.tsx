import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// Define logo size options
export type LogoSize = 'small' | 'medium' | 'large';

// Define logo props
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
const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const { theme } = useSelector((state: RootState) => state.ui);
  const isDarkMode = theme.mode === 'dark';
  
  // Define size dimensions
  const dimensions = {
    small: { width: 120, height: 40 },
    medium: { width: 160, height: 50 },
    large: { width: 200, height: 60 },
  };
  
  // Get current dimensions
  const { width, height } = dimensions[size];
  
  // Define colors based on theme
  const colors = {
    primary: isDarkMode ? '#2A8FB8' : '#1A5F7A',
    secondary: isDarkMode ? '#80DFBB' : '#57CC99',
    accent: isDarkMode ? '#F7D87C' : '#F2C94C',
    text: isDarkMode ? '#F3F4F6' : '#1F2937',
  };
  
  return (
    <div className={`logo-container ${className}`} style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Clean Edge Removal LLC Logo"
      >
        {/* Broom Icon */}
        <g className="logo-icon">
          <path
            d="M40 15C40 15 35 20 30 25C25 30 20 35 20 40C20 45 25 50 30 50C35 50 40 45 40 40C40 35 35 30 30 25C25 20 20 15 20 15"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 15L40 15"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M30 50L30 55"
            stroke={colors.primary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M25 25L15 15"
            stroke={colors.secondary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M35 25L45 15"
            stroke={colors.secondary}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="30"
            cy="40"
            r="5"
            fill={colors.accent}
          />
        </g>
        
        {/* Text */}
        <g className="logo-text">
          <text
            x="60"
            y="30"
            fontFamily="'Montserrat', sans-serif"
            fontSize="18"
            fontWeight="700"
            fill={colors.text}
          >
            CLEAN EDGE
          </text>
          <text
            x="60"
            y="48"
            fontFamily="'Montserrat', sans-serif"
            fontSize="14"
            fontWeight="500"
            fill={colors.text}
          >
            REMOVAL LLC
          </text>
        </g>
      </svg>
    </div>
  );
};

export default Logo;