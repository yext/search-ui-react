import React, { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SearchHeadless } from '@yext/search-headless-react';
import { i18nInstance } from '../utils';

type translationKeys =
  'aiGeneratedAnswer' |
  'allCategories' |
  'appliedFiltersToCurrentSearch' |
  'apply' |
  'applyFilters' |
  'autocompleteOptionsFound_zero' | 'autocompleteOptionsFound_one' | 'autocompleteOptionsFound_two' | 'autocompleteOptionsFound_few' | 'autocompleteOptionsFound_many' | 'autocompleteOptionsFound_other' |
  'autocompleteSuggestion' |
  'autocompleteSuggestionsFound_zero' | 'autocompleteSuggestionsFound_one' | 'autocompleteSuggestionsFound_two' | 'autocompleteSuggestionsFound_few' | 'autocompleteSuggestionsFound_many' | 'autocompleteSuggestionsFound_other' |
  'basedOnYourDevice' |
  'basedOnYourInternetAddress' |
  'categoriesText_zero' | 'categoriesText_one' | 'categoriesText_two' | 'categoriesText_few' | 'categoriesText_many' | 'categoriesText_other' |
  'clearAll' |
  'clearMinAndMax' |
  'clearTheRangeToSelectOptions' |
  'clearTheSearchBar' |
  'conductASearch' |
  'currentLocation' |
  'didYouMean' |
  'dropDownScreenReaderInstructions' |
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
  'readMoreAbout' |
  'recentSearch' |
  'recentSearchesFound_zero' | 'recentSearchesFound_one' | 'recentSearchesFound_two' | 'recentSearchesFound_few' | 'recentSearchesFound_many' | 'recentSearchesFound_other' |
  'removeFilter' |
  'resultPreview' |
  'resultPreviewsFound_zero' | 'resultPreviewsFound_one' | 'resultPreviewsFound_two' | 'resultPreviewsFound_few' | 'resultPreviewsFound_many' | 'resultPreviewsFound_other' |
  'resultsCountText_zero' | 'resultsCountText_one' | 'resultsCountText_two' | 'resultsCountText_few' | 'resultsCountText_many' | 'resultsCountText_other' |
  'resultsCountWithPaginationText' |
  'searchHere' |
  'showLess' |
  'showMore' |
  'showingAllInstead' |
  'sources_zero' | 'sources_one' | 'sources_two' | 'sources_few' | 'sources_many' | 'sources_other' |
  'submitSearch' |
  'suggestionResultsCount_zero' | 'suggestionResultsCount_one' | 'suggestionResultsCount_two' | 'suggestionResultsCount_few' | 'suggestionResultsCount_many' | 'suggestionResultsCount_other' |
  'thisAnsweredMyQuestion' |
  'thisDidNotAnswerMyQuestion' |
  'unselectAnOptionToEnterInARange' |
  'updateYourLocation' |
  'viewAll' |
  'viewDetails' |
  'useMyLocation' |
  'viewAll' |
  'viewDetails';

type translations = {
  [key in translationKeys]?: string;
};

/**
 * SearchI18next translation overrides
 *
 * The key is the locale to override.
 * The value is the translation object that define specific translations override.
 *
 * @public
 */
export type SearchTranslationOverrides = {
  [key: string]: translations
};

/**
 * The configuration options for Search I18next.
 *
 * @public
 */
declare interface SearchI18nextConfig {
  searcher: SearchHeadless,
  translationOverrides?: SearchTranslationOverrides
}

/**
 * A higher-order component which provides translations for search react components.
 *
 * @public
 *
 * @param props - The configuration for the search headless service
 * @returns A React element that provides translation context
 */
export function SearchI18nextProvider(props: PropsWithChildren<SearchI18nextConfig>): React.JSX.Element {
  const { searcher, translationOverrides, children } = props;

  React.useEffect(() => {
    translationOverrides && Object.entries(translationOverrides).forEach(([locale, translation]) => {
      i18nInstance.addResourceBundle(locale, 'search-ui-react', translation, true, true);
    });
    i18nInstance.changeLanguage(searcher.state.meta.locale);
    searcher.addListener<string | undefined>({
      valueAccessor: state => state.meta.locale,
      callback: locale => {
        i18nInstance.changeLanguage(locale);
      }
    });
  }, [searcher, translationOverrides]);

  return (
    <I18nextProvider i18n={i18nInstance}>
      {children}
    </I18nextProvider>
  );
}
