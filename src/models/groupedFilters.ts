import { DisplayableFilter } from '@yext/answers-headless-react';

/**
 * Types of filters (static, facet, and nlp) displayable by AppliedFilters.
 *
 * @public
 */
export interface GroupedFilters {
  /**
   * Filters that applied to the search results from {@link Filters.StaticFilters} and {@link FilterSearch}.
   */
  staticFilters?: DisplayableFilter[],
  /**
   * Filters that applied to the search results from {@link Filters.Facets}.
   */
  facets?: DisplayableFilter[],
  /**
   * Filters that is applied to the search results from backend.
   */
  nlpFilters?: DisplayableFilter[]
}