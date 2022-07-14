export interface parsedLocale {
  language: string,
  modifier?: string,
  region?: string
}
/**
 * Parses a locale code into its constituent parts.
 * Performs case formatting on the result.
 */
export function parseLocale(localeCode: string) {
  const localeCodeSections = localeCode.replace(/-/g, '_').split('_');
  const language = localeCodeSections[0].toLowerCase();
  const parseModifierAndRegion = () => {
    const numSections = localeCodeSections.length;
    if (numSections === 1) {
      return {};
    } else if (numSections === 2 && language === 'zh') {
      const ambiguous = localeCodeSections[1].toLowerCase();
      if (['hans', 'hant'].includes(ambiguous)) {
        return { modifier: ambiguous };
      } else {
        return { region: ambiguous };
      }
    } else if (numSections === 2) {
      return { region: localeCodeSections[1] };
    } else if (numSections === 3) {
      return {
        modifier: localeCodeSections[1],
        region: localeCodeSections[2]
      };
    } else if (numSections > 3) {
      console.error(
        `Encountered unsupported locale "${localeCode}", ` +
        `with ${numSections} sections.`);
      return {};
    }
  };
  const capitalizeFirstLetterOnly = raw => {
    return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
  };
  const parsedLocale: parsedLocale = {
    language,
    ...parseModifierAndRegion()
  };

  if (parsedLocale.modifier) {
    parsedLocale.modifier = capitalizeFirstLetterOnly(parsedLocale.modifier);
  }
  if (parsedLocale.region) {
    parsedLocale.region = parsedLocale.region.toUpperCase();
  }

  return parsedLocale;
}

/**
 * Google Maps supports some language codes that are longer than two characters. If the
 * locale matches one of these edge cases, use it. If a chinese script code is used, map
 * it to the corresponding locale supported by Google. Otherwise, fallback on the first two
 * characters of the locale.
 */
export function getGoogleMapsLanguage(localeStr) {
  const googleMapsCustomLanguages =
    ['zh-CN', 'zh-HK', 'zh-TW', 'en-AU', 'en-GB', 'fr-CA', 'pt-BR', 'pt-PT', 'es-419'];
  const locale = localeStr.replace('_', '-');

  if (googleMapsCustomLanguages.includes(locale)) {
    return locale;
  }

  const { language, modifier, region } = parseLocale(localeStr);

  if (language === 'zh' && region === 'HK') {
    return 'zh-HK';
  }

  // Google maps uses the 'CN' region code to indicate Simplified Chinese
  if (language === 'zh' && modifier === 'Hans') {
    return 'zh-CN';
  }

  // Google maps uses the 'TW' region code to indicate Traditional Chinese
  if (language === 'zh' && modifier === 'Hant') {
    return 'zh-TW';
  }

  return language;
}