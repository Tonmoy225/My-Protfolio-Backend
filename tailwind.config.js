/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: { DEFAULT: '#29ABE2', dark: '#1A7FAF' },
        navy: { DEFAULT: '#0F2137', mid: '#162840' },
      },
    },
  },
  plugins: [],
};
