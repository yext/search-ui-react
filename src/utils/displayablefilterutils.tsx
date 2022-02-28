import { AppliedQueryFilter, DisplayableFacet, DisplayableFilter, DisplayableFacetOption } from '@yext/answers-headless-react';

/**
 * Convert a list of facets to DisplayableFilter format.
 */
export function getDisplayableFacets(facets: DisplayableFacet[] | undefined): DisplayableFilter[] {
  const displayablefilters: DisplayableFilter[] = [];
  facets?.forEach(facet => {
    facet.options.forEach((option: DisplayableFacetOption) => {
      displayablefilters.push({
        fieldId: facet.fieldId,
        matcher: option.matcher,
        value: option.value,
        displayName: option.displayName,
        selected: option.selected
      });
    });
  });
  return displayablefilters;
}

/**
 * Convert a list of nlp filters to DisplayableFilter format.
 */
export function getDisplayableNlpFilters(filters: AppliedQueryFilter[]): DisplayableFilter[] {
  const displayablefilters: DisplayableFilter[] = [];
  filters?.forEach(filter => {
    displayablefilters.push({
      ...filter.filter,
      displayName: filter.displayValue,
      selected: true
    });
  });
  return displayablefilters;
}