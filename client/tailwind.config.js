/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A5F7A',
          50: '#E6EFF2',
          100: '#CCDFE6',
          200: '#99BFCC',
          300: '#669FB3',
          400: '#337F99',
          500: '#1A5F7A',
          600: '#154C62',
          700: '#10394A',
          800: '#0A2631',
          900: '#051319'
        },
        secondary: {
          DEFAULT: '#57C84D',
          50: '#EEF9ED',
          100: '#DCF3DB',
          200: '#B9E7B7',
          300: '#97DB93',
          400: '#74D06F',
          500: '#57C84D',
          600: '#45A03D',
          700: '#34782E',
          800: '#22501F',
          900: '#11280F'
        },
        accent: {
          DEFAULT: '#F0A500',
          50: '#FEF6E6',
          100: '#FDEDCC',
          200: '#FADB99',
          300: '#F8C966',
          400: '#F5B733',
          500: '#F0A500',
          600: '#C08400',
          700: '#906300',
          800: '#604200',
          900: '#302100'
        },
        error: '#DC3545',
        success: '#28A745',
        warning: '#FFC107',
        info: '#17A2B8'
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif']
      },
      fontSize: {
        'heading-1': '2rem',     // 32px
        'heading-2': '1.75rem',  // 28px
        'heading-3': '1.5rem',   // 24px
        'heading-4': '1.25rem',  // 20px
        'heading-5': '1.125rem', // 18px
        'heading-6': '1rem',     // 16px
        'body': '1rem',          // 16px
        'button': '1rem',        // 16px
        'label': '0.875rem'      // 14px
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        body: 1.5,
        heading: 1.2
      },
      boxShadow: {
        header: '0px 4px 6px rgba(0, 0, 0, 0.05)',
        card: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0px 8px 16px rgba(0, 0, 0, 0.12)'
      },
      borderRadius: {
        'button': '4px',
        'card': '8px'
      },
      spacing: {
        'header-height': '70px',
        'header-height-mobile': '60px'
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-in-out',
        'slide-up': 'slideUp 500ms ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      },
      screens: {
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1400px'
      },
      zIndex: {
        'header': 1000,
        'modal': 1100,
        'tooltip': 1200
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
};