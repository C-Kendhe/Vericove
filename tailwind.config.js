/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF8FF',
          100: '#F3EFFF',
          200: '#E9E0FF',
          300: '#D5C4FF',
          400: '#B899FC',
          500: '#9B6DF7',
          600: '#8147E5',
          700: '#6931C7',
          800: '#5526A4',
          900: '#3D167E',
          950: '#260B54',
        },
        lavender: {
          50: '#F8F7FF',
          100: '#F0EEFF',
          200: '#E4E0FD',
          300: '#D1C8FA',
          400: '#B6A6F5',
          500: '#9A82EE',
          600: '#8260E4',
          700: '#6E45D4',
          800: '#5B37B3',
          900: '#4B2F91',
        },
        rosebud: {
          50: '#FDF7F9',
          100: '#FBEFF3',
          200: '#F8DFE9',
          300: '#F2C1D6',
          400: '#E896BB',
          500: '#DA6D9C',
          600: '#C44C7E',
          700: '#A73864',
          800: '#8A3053',
          900: '#732C47',
        },
        charcoal: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#0B0F19',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
        'card': '0 4px 20px -2px rgba(130, 96, 228, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 20px 30px -10px rgba(105, 49, 199, 0.12), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
