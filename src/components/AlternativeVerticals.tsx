import { useTranslation, Trans } from 'react-i18next';
import { StarIcon } from '../icons/StarIcon';
import { useSearchState, VerticalResults as VerticalResultsData } from '@yext/search-headless-react';
import { useComposedCssClasses } from '../hooks';
import classNames from 'classnames';
import { VerticalConfig } from '../models';
import React, { useMemo } from 'react';

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
  alternativeVerticalsContainer: 'flex flex-col justify-between border border-gray-200 rounded-lg mb-4 p-4 shadow-sm',
  alternativeVerticalsLoading: 'opacity-50',
  noResultsText: 'text-lg text-neutral-dark pb-2',
  categoriesText: 'text-neutral',
  suggestion: 'pb-4 flex items-center',
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
  customCssClasses
}: AlternativeVerticalsProps): React.JSX.Element | null {
  const { t } = useTranslation();
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

  const values = useMemo(() => ({ query }), [query]);
  const components = useMemo(() => ({ strong: <strong /> }), []);

  if (verticalSuggestions.length <= 0) {
    return null;
  }

  const count = verticalSuggestions.length;

  return (
    <div className={containerClassNames}>
      {renderNoResultsInfo()}
      {verticalSuggestions &&
        <div className='pt-4 text-neutral-dark'>
          <div className={cssClasses.categoriesText}>
            <Trans
              i18nKey='categoriesText'
              count={count}
              values={values}
              components={components}
            />
          </div>
          <ul className='pt-4'>
            {verticalSuggestions.map(renderSuggestion)}
          </ul>
        </div>
      }
    </div>
  );

  function renderNoResultsInfo() {
    return (
      <div className={cssClasses.noResultsText}>
        <span>{t('noResultsFoundIn', { currentVerticalLabel })}</span>
        {isShowingAllResults &&
          <span> {t('showingAllInstead', { currentVerticalLabel })}</span>
        }
      </div>
    );
  }

  function renderSuggestion(suggestion: VerticalSuggestion) {
    const { verticalKey, resultsCount, label } = suggestion;
    return (
      <li key={verticalKey} className={cssClasses.suggestion}>
        <div className={cssClasses.verticalIcon}><StarIcon/></div>
        <span className='font-bold'>{
          t('suggestionResultsCount', {
            label,
            count: resultsCount,
          })}
        </span>
      </li>
    );
  }
}
