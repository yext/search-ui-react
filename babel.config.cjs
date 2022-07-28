// Needed for es6 imports, React import and TS support in jest
module.exports = {
  env: {
    test: {
      plugins: ["transform-require-context"]
    }
  },
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
};