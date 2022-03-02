import { DisplayableFacet, SelectableFilter as DisplayableFilter } from '@yext/answers-headless-react';

/**
 * Types of filters (static, facet, and nlp) displayable by AppliedFilters.
 */
export interface GroupedFilters {
  /** Filters that are applied to the search results from static filters and filter search. */
  staticFilters?: DisplayableFilter[],
  /** Filters that are applied to the search results from facets. */
  facets?: DisplayableFilter[],
  /** Filters that are applied to the search results from hierarchical facets. */
  hierarchicalFacets?: DisplayableHierarchicalFacet[],
  /** Filters that are applied to the search results from backend. */
  nlpFilters?: DisplayableFilter[]
}

export type DisplayableHierarchicalFacet = DisplayableFilter & {
  parentFacet: DisplayableFacet,
  value: string,
  displayNameTokens: string[]
};