import { DisplayableFilter } from '@yext/answers-headless-react';

/**
 * Types of filters (static, facet, and nlp) displayable by AppliedFilters.
 *
 * @public
 */
export interface GroupedFilters {
  /**
   * Filters that is applied to the search results from static filters and filter search.
   */
  staticFilters?: DisplayableFilter[],
  /**
   * Filters that is applied to the search results from facets.
   */
  facets?: DisplayableFilter[],
  /**
   * Filters that is applied to the search results from backend.
   */
  nlpFilters?: DisplayableFilter[]
}