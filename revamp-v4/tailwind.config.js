/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#FAFBF9',
        border: '#F1F3F1',
        'green-dark': '#1C2E1E',
        'green-mid': '#4D6D47',
        'green-muted': '#5A635A',
        'green-light': '#738273',
        highlight: '#EAECE9',
      },
    },
  },
  plugins: [],
}
