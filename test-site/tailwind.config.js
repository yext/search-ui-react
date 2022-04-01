module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    '../lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary-color, #2563eb)',
        'primary-light': 'var(--primary-color-light, #dbeafe)',
        'primary-dark':  'var(--primary-color-dark, #dbeafe)',
        'neutral': 'var(--neutral-color, #4b5563)',
        'neutral-light': 'var(--neutral-color-light, #9ca3af)',
        'neutral-dark': 'var(--neutral-color-dark, #1f2937)'
      },
      borderRadius: {
        cta: 'var(--cta-border-radius, 1rem)'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
}
