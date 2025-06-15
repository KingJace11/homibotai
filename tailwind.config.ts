import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}', // optional, in case you're using a /src folder too
  ],
  theme: {
    extend: {
      colors: {
        'homi-light': '#F7F8FC',
        'homi-dark': '#1A1A1A',
        'homi-primary': '#4F46E5', // purple-600
        'homi-accent': '#6366F1',  // purple-500
      },
    },
  },
  plugins: [],
};

export default config;