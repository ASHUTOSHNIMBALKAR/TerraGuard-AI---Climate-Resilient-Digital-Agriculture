/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        green: {
          500: '#22c55e',
          600: '#16a34a',
          950: '#052e16',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        }
      }
    },
  },
  plugins: [],
};
