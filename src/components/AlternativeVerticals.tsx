import { processTranslation } from './utils/processTranslation';
import Star from '../icons/StarIcon';
import { useAnswersState, VerticalResults } from '@yext/answers-headless-react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import classNames from 'classnames';

/**
 * The CSS class interface used for {@link AlternativeVerticals}.
 */
export interface AlternativeVerticalsCssClasses {
  /** Applies to the outermost container of the alternative verticals. */
  container?: string,
  /** Applies when the results are loading. */
  alternativeVerticals___loading?: string,
  /** Applies to the text for no results being found. */
  noResultsText?: string,
  /** Applies to the text for there being other categories with results. */
  categoriesText?: string,
  /** Applies to the categories text and suggestions. */
  suggestions?: string,
  /** Applies to the overall list of vertical suggestions. */
  suggestionList?: string,
  /** Applies to a single vertical suggestion. */
  suggestion?: string,
  /** Applies to the button for a vertical suggestion, including the icon and link. */
  suggestionButton?: string,
  /** Applies to the icon for a vertical suggestion. */
  verticalIcon?: string,
  /** Applies to the link for a vertical suggestion. */
  verticalLink?: string,
  /** Applies to the text for viewing results across all verticals. */
  allCategoriesLink?: string
}

const builtInCssClasses: AlternativeVerticalsCssClasses = {
  container: 'flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm',
  alternativeVerticals___loading: 'opacity-50',
  noResultsText: 'text-lg text-gray-900 pb-2',
  categoriesText: 'text-gray-500',
  suggestions: 'pt-4 text-blue-600',
  suggestionList: 'pt-4',
  suggestion: 'pb-4',
  suggestionButton: 'inline-flex items-center cursor-pointer hover:underline focus:underline',
  verticalIcon: 'w-4 mr-2',
  verticalLink: 'font-bold',
  allCategoriesLink: 'text-blue-600 cursor-pointer hover:underline focus:underline'
};

interface VerticalConfig {
  label: string,
  verticalKey: string
}

interface VerticalSuggestion extends VerticalConfig {
  resultsCount: number
}

function isVerticalSuggestion(suggestion: VerticalSuggestion | null): suggestion is VerticalSuggestion {
  return suggestion?.resultsCount !== undefined;
}

/**
 * Props for {@link AlternativeVerticals}.
 */
export interface AlternativeVerticalsProps {
  /** The label for the current vertical. */
  currentVerticalLabel: string,
  /** An array containing the label and verticalKey of each vertical. */
  verticalsConfig: VerticalConfig[],
  /**
   * Whether or not all results should be displayed when there are none returned from the search.
   * Defaults to true.
   */
  displayAllOnNoResults?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: AlternativeVerticalsCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 * A component that displays the alternative verticals that have results if a search returns none
 * on the current vertical.
 *
 * @param props - {@inheritDoc AlternativeVerticalsProps}
 * @returns A React element for the alternative verticals, or null if there are none with results
 */
export default function AlternativeVerticals({
  currentVerticalLabel,
  verticalsConfig,
  displayAllOnNoResults = true,
  customCssClasses,
  cssCompositionMethod
}: AlternativeVerticalsProps): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  const alternativeVerticals = useAnswersState(state => state.vertical.noResults?.alternativeVerticals) || [];
  const allResultsForVertical =
    useAnswersState(state => state.vertical.noResults?.allResultsForVertical.results) || [];
  const query = useAnswersState(state => state.query.mostRecentSearch);

  const verticalSuggestions = buildVerticalSuggestions(verticalsConfig, alternativeVerticals);
  const isShowingAllResults = displayAllOnNoResults && allResultsForVertical.length > 0;

  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const containerClassNames = classNames(cssClasses.container, {
    [cssClasses.alternativeVerticals___loading ?? '']: isLoading
  });

  function buildVerticalSuggestions(
    verticalsConfig: VerticalConfig[],
    alternativeVerticals: VerticalResults[]): VerticalSuggestion[] {

    return alternativeVerticals
      .map((alternativeResults: VerticalResults) => {
        const matchingVerticalConfig = verticalsConfig.find(config => {
          return config.verticalKey === alternativeResults.verticalKey;
        });

        return matchingVerticalConfig
          ? {
            ...matchingVerticalConfig,
            resultsCount: alternativeResults.resultsCount
          }
          : null;
      })
      .filter(isVerticalSuggestion)
      .filter(verticalSuggestion => verticalSuggestion.resultsCount > 0);
  }

  if (verticalSuggestions.length <= 0) {
    return null;
  }

  return (
    <div className={containerClassNames}>
      {renderNoResultsInfo()}
      {verticalSuggestions &&
        <div className={cssClasses.suggestions}>
          <div className={cssClasses.categoriesText}>
            <span>
              {processTranslation({
                phrase: 'This category yielded results for - ',
                pluralForm: 'These categories yielded results for - ',
                count: verticalSuggestions.length
              })}
            </span>
            <strong>{query}</strong>
          </div>
          <ul className={cssClasses.suggestionList}>
            {verticalSuggestions.map(renderSuggestion)}
          </ul>
          {renderUniversalDetails()}
        </div>
      }
    </div>
  );

  function renderNoResultsInfo() {
    return (
      <div className={cssClasses.noResultsText}>
        <span>No results found in {currentVerticalLabel}.</span>
        {isShowingAllResults &&
          <span> Showing all {currentVerticalLabel} instead.</span>
        }
      </div>
    );
  }

  function renderSuggestion(suggestion: VerticalSuggestion) {
    return (
      <li key={suggestion.verticalKey} className={cssClasses.suggestion}>
        <a className={cssClasses.suggestionButton} href={`/${suggestion.verticalKey}?query=${query}`}>
          <div className={cssClasses.verticalIcon}><Star/></div>
          <span className={cssClasses.verticalLink}>{suggestion.label}</span>
        </a>
      </li>
    );
  }

  function renderUniversalDetails() {
    return (
      <div className={cssClasses.categoriesText}>
        <span>View results across </span>
        <a className={cssClasses.allCategoriesLink} href={`/?query=${query}`}>
          all search categories.
        </a>
      </div>
    );
  }
}