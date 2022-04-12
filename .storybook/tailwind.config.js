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
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
};
