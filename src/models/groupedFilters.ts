import { DisplayableFilter } from "@yext/answers-headless-react";

/**
 * Types of filters (static, facet, and nlp) displayable by AppliedFilters.
 *
 * @public
 */
export interface GroupedFilters {
  /**
   * Filters that can be applied to the search results from {@link StaticFilters}.
   */
  staticFilters?: DisplayableFilter[],
  facets?: DisplayableFilter[],
  nlpFilters?: DisplayableFilter[]
}