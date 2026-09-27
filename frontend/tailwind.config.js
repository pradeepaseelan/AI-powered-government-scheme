/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f8',
          100: '#d5e0ee',
          400: '#3a5a8c',
          600: '#173868',
          700: '#122c52',
          900: '#0b1d3a'
        },
        saffron: {
          400: '#ffb35c',
          500: '#ff9933',
          600: '#e6811f'
        },
        indiagreen: {
          500: '#128807',
          600: '#0e6e05'
        }
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      backgroundImage: {
        'chakra': "radial-gradient(circle at center, transparent 60%, rgba(255,153,51,0.08) 61%)"
      }
    },
  },
  plugins: [],
}
