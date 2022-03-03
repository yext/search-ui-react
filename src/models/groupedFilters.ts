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
  /** Filters that are applied to the search results from the backend's natural language processing. */
  nlpFilters?: DisplayableFilter[]
}

export type DisplayableHierarchicalFacet = Omit<DisplayableFilter, 'value'> & {
  parentFacet: DisplayableFacet,
  displayName: string,
  value: string,
  displayNameTokens: string[],
  lastDisplayNameToken: string
};