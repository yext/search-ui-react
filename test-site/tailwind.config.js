module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    '../lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
}
