/**
 * When custom tailwind classes are added, like `form-checkbox"` via `@tailwindcss/forms`,
 * handling must also be added to {@link useComposedCssClasses}.
 */
module.exports = {
  content: [
    './lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary-color, #2563eb)',
        'primary-light': 'var(--primary-color-light, #dbeafe)',
        'primary-dark':  'var(--primary-color-dark, #1e40af)',
        'neutral': 'var(--neutral-color, #4b5563)',
        'neutral-light': 'var(--neutral-color-light, #9ca3af)',
        'neutral-dark': 'var(--neutral-color-dark, #1f2937)'
      },
      borderRadius: {
        cta: 'var(--cta-border-radius, 1rem)'
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
    }),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')
  ],
};
