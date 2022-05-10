module.exports = {
  content: [
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563eb',
        'primary-light': '#dbeafe',
        'primary-dark':  '#dbeafe',
        'neutral': '#4b5563',
        'neutral-light': '#9ca3af',
        'neutral-dark': '#1f2937'
      },
      keyframes: {
        rotate: {
          '100%': { transform: 'rotate(360deg)' },
        },
        dash: {
          '0%': { transform: 'rotate(0deg)', 'stroke-dashoffset': 204 },
          '50%': { transform: 'rotate(45deg)', 'stroke-dashoffset': 52 },
          '100%': { transform: 'rotate(360deg)', 'stroke-dashoffset': 204 },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
};
