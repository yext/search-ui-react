import { useTranslation } from 'react-i18next';
import {
  SearchTypeEnum,
  useSearchState,
  VerticalResults,
  VerticalSearchState
} from '@yext/search-headless-react';
import classNames from 'classnames';
import { useComposedCssClasses } from '../hooks';
import React from 'react';

/**
 *  The CSS class interface for {@link ResultsCount}.
 *
 * @public
 */
export interface ResultsCountCssClasses {
  resultsCountContainer?: string,
  resultsCountLoading?: string
}

/**
 * Props for {@link ResultsCount}.
 *
 * @public
 */
export interface ResultsCountProps {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: ResultsCountCssClasses
}

const builtInCssClasses: Readonly<ResultsCountCssClasses> = {
  resultsCountContainer: 'font-semibold text-neutral mb-4 py-2 mr-2.5 whitespace-nowrap',
  resultsCountLoading: 'opacity-50'
};

/**
 * Renders results count of a universal/vertical search.
 *
 * @public
 *
 * @param props - {@link ResultsCountProps}
 */
export function ResultsCount({ customCssClasses }: ResultsCountProps): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const isLoading = useSearchState(state => state.searchStatus.isLoading);
  const resultsCountText = useResultsCount();

  const resultsCountClassnames = classNames(cssClasses.resultsCountContainer, {
    [cssClasses.resultsCountLoading ?? '']: isLoading
  });
  return <div className={resultsCountClassnames}>{resultsCountText}</div>;
}

/**
 * Generates a string for the results count of the recent universal/vertical search.
 */
function useResultsCount() {
  const { t } = useTranslation();
  const isVertical = useSearchState(state => state.meta.searchType) === SearchTypeEnum.Vertical;
  const results = useSearchState(state => isVertical ? state.vertical : state.universal.verticals);
  const offset = useSearchState(state => state.vertical.offset) || 0;
  const limit = useSearchState(state => state.vertical.limit) || 20;
  let resultsCount = 0;
  if (results) {
    if (isUniversalSearchResults(results)) {
      results.forEach(resultsOfAVertical => resultsCount += resultsOfAVertical.resultsCount);
    } else {
      resultsCount = results.resultsCount ?? 0;
    }
  }
  if (resultsCount === 0) {
    return null;
  }

  if (resultsCount > limit && isVertical){
    const paginateStart = offset + 1;
    const paginateEnd = Math.min((offset + limit), resultsCount);
    return t('resultsCountWithPaginationText', { paginateStart, paginateEnd, resultsCount });
  } else {
    return t('resultsCountText', { count: resultsCount });
  }
}

function isUniversalSearchResults(data: VerticalResults[] | VerticalSearchState): data is VerticalResults[] {
  return Array.isArray(data);
}
