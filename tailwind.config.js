/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Check if breakpoints or other relevant settings have been altered
      screens: {
        md: '768px', // This is the default, ensure it hasn't been changed if we rely on it
      },
      width: {
        'custom-32': '32%', // Custom width defined
      },
    },
  },
  plugins: [],
  safelist: [
    'text-2xl',
    'text-3xl',
    {
      pattern: /bg-(red|green|blue)-(100|200|300)/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    },
  ],
};
