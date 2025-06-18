import React, { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SearchHeadless } from '@yext/search-headless-react';
import { i18nInstance } from '../utils';

type translationKeys = 
  'aiGeneratedAnswer' | 
  'allCategories' | 
  'appliedFiltersToCurrentSearch' | 
  'apply' | 
  'autocompleteOptionsFound_zero' | 'autocompleteOptionsFound_one' | 'autocompleteOptionsFound_few' | 'autocompleteOptionsFound_many' | 'autocompleteOptionsFound_other' |
  'autocompleteSuggestion' | 
  'autocompleteSuggestionsFound_zero' | 'autocompleteSuggestionsFound_one' | 'autocompleteSuggestionsFound_few' | 'autocompleteSuggestionsFound_many' | 'autocompleteSuggestionsFound_other' |
  'categoriesText_zero' | 'categoriesText_one' | 'categoriesText_few' | 'categoriesText_many' | 'categoriesText_other' |
  'clearAll' |
  'clearMinAndMax' |
  'clearTheRangeToSelectOptions' |
  'clearTheSearchBar' |
  'conductASearch' |
  'didYouMean' |
  'feedback' |
  'invalidRange' |
  'max' |
  'min' |
  'navigateToTheNextResultsPage' |
  'navigateToThePreviousResultsPage' |
  'noAutocompleteOptionsFound' |
  'noAutocompleteSuggestionsFound' |
  'noResultsFoundIn' |
  'pagination' |
  'recentSearch' |
  'recentSearchesFound_one' |
  'recentSearchesFound_other' |
  'removeFilter' |
  'resultPreview' |
  'resultPreviewsFound_one' |
  'resultPreviewsFound_other' |
  'resultsCountText_one' |
  'resultsCountText_other' |
  'resultsCountWithPaginationText' |
  'searchHere' |
  'showLess' |
  'showingAllInstead' |
  'sources_zero' | 'sources_one' | 'sources_few' | 'sources_many' | 'sources_other' |
  'submitSearch' |
  'suggestionResultsCount_one' |
  'suggestionResultsCount_other' |
  'thisAnsweredMyQuestion' |
  'thisDidNotAnswerMyQuestion' |
  'unselectAnOptionToEnterInARange' |
  'updateYourLocation' |
  'viewAll' |
  'viewDetails';

type translations = {
  [key in translationKeys]?: string;
}

/**
 * SearchI18next translation overrides
 * 
 * The key is the locale to override.
 * The value is the translation object that define specific translations override.
 *
 * @public
 */
export type SearchTranslationOverrides = {
  [key: string]: translations;
}

/**
 * The configuration options for Search I18next.
 *
 * @public
 */
declare interface SearchI18nextConfig {
  searcher: SearchHeadless;
  translationOverrides?: SearchTranslationOverrides;
}

/**
 * A higher-order component which provides translations for search headless.
 *
 * @public
 *
 * @param props - The configuration for the search headless service
 * @returns A React element that provides translation context
 */
export function SearchI18nextProvider(props: PropsWithChildren<SearchI18nextConfig>): JSX.Element {
  const { searcher, translationOverrides, children } = props;

  React.useEffect(() => {
    translationOverrides && Object.entries(translationOverrides).forEach(([locale, translation]) => {
      i18nInstance.addResourceBundle(locale, 'search-ui-react', translation, true, true);
    })
    i18nInstance.changeLanguage(searcher.state.meta.locale)
    searcher.addListener<string | undefined>({
      valueAccessor: state => state.meta.locale,
      callback: locale => {
        i18nInstance.changeLanguage(locale);
      }
    });
  }, [])


  return (
    <I18nextProvider i18n={i18nInstance}>
      {children}
    </I18nextProvider>
  );
}