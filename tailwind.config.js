const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: 1, color: '#696969' },
          '50%': { opacity: 0.5 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'pulse-slow': 'pulseSlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease',
      },
      colors: {
        custom: {
          50: 'var(--color-custom-50, "")', // Stone 50
          100: 'var(--color-custom-100, "")', // Stone 100
          200: 'var(--color-custom-200, "")', // Stone 200
          300: 'var(--color-custom-300, "")', // Stone 300
          400: 'var(--color-custom-400, "")', // Stone 400
          500: 'var(--color-custom-500, "")', // Stone 500
          600: 'var(--color-custom-600, "")', // Stone 600
          700: 'var(--color-custom-700, "")', // Stone 700
          800: 'var(--color-custom-800, "")', // Stone 800
          900: 'var(--color-custom-900, "")', // Stone 900
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.thin-scrollbar-x': {
          /* For Chrome, Safari, and Opera */
          '&::-webkit-scrollbar': {
            height: '0px',
          },
          '&:hover::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
          },
          '&:hover::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.3)',
            outline: '1px solid slategrey',
          },
          /* For Firefox */
          'scrollbar-color': 'transparent transparent',
          '&:hover': {
            'scrollbar-color': 'rgba(0,0,0,.3) transparent',
          },
          'scrollbar-width': 'thin',
        },
      };
      addUtilities(newUtilities, ['responsive']);
    }),
  ],
};
