/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#292b59',
        secondary: '#0a0828',
        warning: '#f7b500',
        danger: '#f33450'
      }
    }
  },
  plugins: []
}
