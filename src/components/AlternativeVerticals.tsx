import { processTranslation } from './utils/processTranslation';
import { StarIcon } from '../icons/StarIcon';
import { useSearchState, VerticalResults as VerticalResultsData } from '@yext/search-headless-react';
import { useComposedCssClasses } from '../hooks/useComposedCssClasses';
import classNames from 'classnames';
import { isVerticalLink, VerticalLink } from '../models/verticalLink';
import { UniversalLink } from '../models/universalLink';
import { VerticalConfig } from '../models/verticalConfig';

/**
 * The CSS class interface used for {@link AlternativeVerticals}.
 *
 * @public
 */
export interface AlternativeVerticalsCssClasses {
  alternativeVerticalsContainer?: string,
  alternativeVerticalsLoading?: string,
  noResultsText?: string,
  categoriesText?: string,
  suggestion?: string,
  verticalIcon?: string
}

const builtInCssClasses: Readonly<AlternativeVerticalsCssClasses> = {
  alternativeVerticalsContainer: 'flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm',
  alternativeVerticalsLoading: 'opacity-50',
  noResultsText: 'text-lg text-neutral-dark pb-2',
  categoriesText: 'text-neutral',
  suggestion: 'pb-4',
  verticalIcon: 'w-4 mr-2'
};

interface VerticalSuggestion {
  resultsCount: number,
  label?: string,
  verticalKey: string
}

function isVerticalSuggestion(suggestion: unknown): suggestion is VerticalSuggestion {
  return (suggestion as VerticalSuggestion)?.resultsCount !== undefined &&
    (suggestion as VerticalSuggestion)?.verticalKey !== undefined;
}

/**
 * A map of vertical keys to labels.
 *
 * @public
 */
export interface VerticalLabelMap {
  /** Config mapped to a vertical. */
  [verticalKey: string]: Pick<VerticalConfig, 'label'>
}

/**
 * Props for {@link AlternativeVerticals}.
 *
 * @public
 */
export interface AlternativeVerticalsProps {
  /** The label for the current vertical. */
  currentVerticalLabel: string,
  /** A map of verticalKeys to the display label for that vertical. */
  verticalConfigMap: VerticalLabelMap,
  /**
   * Whether or not all results should be displayed when there are none returned from the search.
   * Defaults to true.
   */
  displayAllOnNoResults?: boolean,
  /**
   * A function to provide user defined url path for vertical and universal sugestion links.
   *
   * Defaults to "/[verticalKey]?query=[query]" for vertical links and "/?query=[query]"
   * for universal links.
   */
  getSuggestionUrl?: (data: VerticalLink | UniversalLink) => string,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: AlternativeVerticalsCssClasses
}

/**
 * A component that displays the alternative verticals that have results if a search returns none
 * on the current vertical.
 *
 * @public
 *
 * @param props - {@link AlternativeVerticalsProps}
 * @returns A React element for the alternative verticals, or null if there are none with results
 */
export function AlternativeVerticals({
  currentVerticalLabel,
  verticalConfigMap,
  displayAllOnNoResults = true,
  customCssClasses,
  getSuggestionUrl: customGetSuggestionUrl
}: AlternativeVerticalsProps): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);

  const alternativeVerticals = useSearchState(state => state.vertical.noResults?.alternativeVerticals) || [];
  const allResultsForVertical =
    useSearchState(state => state.vertical.noResults?.allResultsForVertical.results) || [];
  const query = useSearchState(state => state.query.mostRecentSearch);

  const verticalSuggestions = buildVerticalSuggestions(verticalConfigMap, alternativeVerticals);
  const isShowingAllResults = displayAllOnNoResults && allResultsForVertical.length > 0;

  const isLoading = useSearchState(state => state.searchStatus.isLoading);
  const containerClassNames = classNames(cssClasses.alternativeVerticalsContainer, {
    [cssClasses.alternativeVerticalsLoading ?? '']: isLoading
  });

  const getSuggestionUrl = customGetSuggestionUrl
    ? customGetSuggestionUrl
    : (data: VerticalLink | UniversalLink) => {
      return isVerticalLink(data)
        ? `/${data.verticalKey}?query=${data.query}`
        :`/?query=${data.query}`;
    };

  function buildVerticalSuggestions(
    verticalConfigMap: VerticalLabelMap,
    alternativeVerticals: VerticalResultsData[]): VerticalSuggestion[] {

    return alternativeVerticals
      .filter((alternativeResults: VerticalResultsData) => {
        return !!verticalConfigMap[alternativeResults.verticalKey];
      })
      .map((alternativeResults: VerticalResultsData) => {
        return {
          label: verticalConfigMap[alternativeResults.verticalKey].label,
          verticalKey: alternativeResults.verticalKey,
          resultsCount: alternativeResults.resultsCount
        };
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
        <div className='pt-4 text-primary'>
          <div className={cssClasses.categoriesText}>
            <span>
              {processTranslation({
                phrase: 'The following category yielded results for - ',
                pluralForm: 'The following categories yielded results for - ',
                count: verticalSuggestions.length
              })}
            </span>
            <strong>{query}</strong>
          </div>
          <ul className='pt-4'>
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
    const href = getSuggestionUrl({ verticalKey: suggestion.verticalKey, query });
    return (
      <li key={suggestion.verticalKey} className={cssClasses.suggestion}>
        <a className='inline-flex items-center hover:underline focus:underline' href={href}>
          <div className={cssClasses.verticalIcon}><StarIcon/></div>
          <span className='font-bold'>{suggestion.label}</span>
        </a>
      </li>
    );
  }

  function renderUniversalDetails() {
    const href = getSuggestionUrl({ query });
    return (
      <div className={cssClasses.categoriesText}>
        <span>View results across </span>
        <a className='text-primary hover:underline focus:underline' href={href}>
          all search categories.
        </a>
      </div>
    );
  }
}