/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['"DM Sans"', 'sans-serif'],
        display: ['"DM Serif Display"', 'serif'],
      },
      colors: {
        verde: {
          DEFAULT: '#0F6E56',
          mid:     '#1D9E75',
          claro:   '#E1F5EE',
        },
        verm: {
          DEFAULT: '#A32D2D',
          claro:   '#FCEBEB',
        },
        amber: {
          DEFAULT: '#854F0B',
          claro:   '#FAEEDA',
        },
        cinza: {
          DEFAULT: '#5F5E5A',
          claro:   '#F1EFE8',
          borda:   '#D3D1C7',
        },
        fundo: '#FAFAF8',
      },
    },
  },
  plugins: [],
}
