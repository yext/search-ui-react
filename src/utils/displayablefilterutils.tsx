import {
  AppliedQueryFilter,
  DisplayableFacet,
  SelectableFilter as DisplayableFilter,
  DisplayableFacetOption
} from '@yext/answers-headless-react';

export type DisplayableHierarchicalFacet = DisplayableFilter & {
  isHierarchical: true
  parentFacet: DisplayableFacet
  value: string
};

/**
 * Convert a list of facets to DisplayableFilter format.
 */
export function getDisplayableFacets(
  facets: DisplayableFacet[] | undefined,
  hierarchicalFacetFieldIds?: string[]
): [DisplayableFilter[], DisplayableHierarchicalFacet[]] {
  const displayableFilters: DisplayableFilter[] = [];
  const displayableHierarchicalFacets: DisplayableHierarchicalFacet[] = [];

  facets?.forEach(facet => {
    const isHierarchical = hierarchicalFacetFieldIds?.includes(facet.fieldId);
    if (isHierarchical) {
      facet.options.forEach((option: DisplayableFacetOption) => {
        if (typeof option.value !== 'string') {
          console.error('Ignoring hierarchical facet with non-string type of', typeof option.value, 'for field id', facet.fieldId);
          return;
        }
        const displayableHierarchicalFacet: DisplayableHierarchicalFacet = {
          ...convertToDisplayable(facet.fieldId, option),
          value: option.value,
          isHierarchical,
          parentFacet: facet
        };
        displayableHierarchicalFacets.push(displayableHierarchicalFacet);
      });
    } else {
      facet.options.forEach((option: DisplayableFacetOption) => {
        displayableFilters.push(convertToDisplayable(facet.fieldId, option));
      });
    }
  });

  function convertToDisplayable(
    fieldId: string, option: DisplayableFacetOption
  ): DisplayableFilter {
    return {
      fieldId: fieldId,
      matcher: option.matcher,
      value: option.value,
      displayName: option.displayName,
      selected: option.selected
    };
  }

  return [displayableFilters, displayableHierarchicalFacets];
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