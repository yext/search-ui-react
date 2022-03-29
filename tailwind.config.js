module.exports = {
  content: [
    './src/**/*.{ts,tsx}'
  ],
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
}
