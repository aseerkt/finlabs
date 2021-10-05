module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/shared/**/*.{js,ts,jsx,tsx}',
    './src/context/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      keyframes: {
        expansion: {
          '0%, 100%': {
            display: 'inline-block',
            width: '0%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          },
          '50%': { display: 'inline-block', width: 'max-content' },
        },
      },
      animation: {
        expansion: 'expansion infinite 3s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
