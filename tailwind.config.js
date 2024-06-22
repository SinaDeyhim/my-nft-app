module.exports = {
  darkMode: 'class', // Enable dark mode with a class
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5',
          dark: '#6366f1',
        },
        secondary: {
          light: '#f59e0b',
          dark: '#fbbf24',
        },
        background: {
          light: '#ffffff',
          dark: '#1a202c',
        },
        text: {
          light: '#1a202c',
          dark: '#a0aec0',
        },
        accent: {
          light: '#38b2ac',
          dark: '#4fd1c5',
        },
      },
    },
  },
  plugins: [],
};
