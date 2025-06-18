const { supportedLocales } = require('./src/utils/supportedLocales.ts');

module.exports = {
  input: [
    'src/components/**/*.{ts,tsx}',
  ],

  output: '',

  options: {
    debug: true,
    defaultValue: (lng, ns, key, options) => {
      if (lng.toLowerCase().startsWith('en')) {
        return options.defaultValue || key;
      }
      return '';
    },
    func: {
      list: ['t', 'i18next.t', 'i18n'],
      extensions: ['.ts', '.tsx'],
    },
    lngs: supportedLocales,
    defaultLng: 'en',
    ns: ['search-ui-react'],
    defaultNs: 'search-ui-react',
    resource: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      savePath: 'locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
    },
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
};
