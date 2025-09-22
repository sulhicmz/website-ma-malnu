import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#d1f0df',
          200: '#a3e1bf',
          300: '#75d29f',
          400: '#47c37f',
          500: '#19b45f',
          600: '#0a904c',
          700: '#0a704d',
          800: '#08503a',
          900: '#063027',
        },
        secondary: {
          50: '#fdf8f0',
          100: '#f9edd1',
          200: '#f4dba3',
          300: '#efc975',
          400: '#eab747',
          500: '#d4af37',
          600: '#aa8c2c',
          700: '#806921',
          800: '#554616',
          900: '#2b230b',
        },
        accent: {
          50: '#ef1f9',
          100: '#d6ddf0',
          200: '#bdc9e7',
          300: '#a4b5de',
          400: '#8ba1d5',
          500: '#728dcd',
          600: '#5979c4',
          700: '#1e3a8a',
          800: '#172d6b',
          900: '#10204c',
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
        arabic: ['Amiri', 'serif']
      },
    },
  },
  plugins: [],
}

export default config