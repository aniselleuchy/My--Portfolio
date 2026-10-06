/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0e1a17',
        card: '#17302a',
        line: '#24413a',
        ink: '#eee8dc',
        inkdim: '#a9bdb5',
        brass: '#e0a955',
        brassdim: '#b98a44',
        sage: '#7fa08f',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
