/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          primary: '#4F46E5',
          deep: '#4338CA',
          light: '#EEF2FF',
          glow: 'rgba(79, 70, 229, 0.15)',
        },
        canvas: '#F7F7F5',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#111111',
          muted: '#6B7280',
          subtle: '#9CA3AF',
        },
        border: {
          subtle: '#E5E7EB',
          light: '#F3F4F6',
        },
        softGray: '#F1F2F4',
        premium: '#F59E0B',
      },
      fontFamily: {
        display: ['Playfair Display', 'DM Serif Display', 'serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'media': '24px',
        'control': '12px',
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(17, 17, 17, 0.04), 0 4px 16px -4px rgba(17, 17, 17, 0.06)',
        'elevated': '0 8px 30px -6px rgba(17, 17, 17, 0.08), 0 4px 12px -2px rgba(17, 17, 17, 0.04)',
        'indigo-glow': '0 10px 25px -5px rgba(79, 70, 229, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms ease-out forwards',
        'slide-up': 'slideUp 300ms ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
