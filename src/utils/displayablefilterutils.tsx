import { AppliedQueryFilter, DisplayableFacet, DisplayableFilter, DisplayableFacetOption } from '@yext/answers-headless-react';

/**
 * Convert a list of facets to DisplayableFilter format.
 */
export function getDisplayableAppliedFacets(facets: DisplayableFacet[] | undefined): DisplayableFilter[] {
  const appliedFacets: DisplayableFilter[] = [];
  facets?.forEach(facet => {
    facet.options.forEach((option: DisplayableFacetOption) => {
      appliedFacets.push({
        fieldId: facet.fieldId,
        matcher: option.matcher,
        value: option.value,
        displayName: option.displayName,
        selected: option.selected
      });
    });
  });
  return appliedFacets;
}

/**
 * Convert a list of nlp filters to DisplayableFilter format.
 */
export function getDisplayableNlpFilters(filters: AppliedQueryFilter[]): DisplayableFilter[] {
  const appliedNlpFilters: DisplayableFilter[] = [];
  filters?.forEach(filter => {
    appliedNlpFilters.push({
      ...filter.filter,
      displayName: filter.displayValue,
      selected: true
    });
  });
  return appliedNlpFilters;
}