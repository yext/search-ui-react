import {
  AppliedQueryFilter,
  DisplayableFacet,
  SelectableFilter as DisplayableFilter,
  DisplayableFacetOption
} from '@yext/answers-headless-react';
import { DisplayableHierarchicalFacet } from '../models/groupedFilters';

/**
 * Convert a list of facets to DisplayableFilter format.
 */
export function getDisplayableFacets(
  facets: DisplayableFacet[] | undefined,
  hierarchicalFacetFieldIds: string[]
): DisplayableFilter[] {
  const displayableFilters: DisplayableFilter[] = [];

  facets?.forEach(facet => {
    if (hierarchicalFacetFieldIds.includes(facet.fieldId)) {
      return;
    }
    facet.options.forEach(option => {
      displayableFilters.push(convertFacetOption(facet.fieldId, option));
    });
  });

  return displayableFilters;
}

export function getDisplayableHierarchicalFacets(
  facets: DisplayableFacet[] | undefined,
  hierarchicalFieldIds: string[],
  delimiter: string
): DisplayableHierarchicalFacet[] {
  return facets?.filter(f => hierarchicalFieldIds.includes(f.fieldId)).flatMap(facet => {
    const sortedOptions = [...facet.options].sort((a, b) => {
      return a.displayName.length - b.displayName.length;
    });

    const facetsForCurrentFieldId: DisplayableHierarchicalFacet[] = sortedOptions.filter(o => {
      if (typeof o.value !== 'string') {
        console.error('Hierarchical Facets must have value of type "string", found', o.value);
        return false;
      }
      return true;
    }).map((option) => {
      const displayNameTokens = option.displayName.split(delimiter).map(t => t.trim());
      return {
        ...convertFacetOption(facet.fieldId, option),
        parentFacet: facet,
        lastDisplayNameToken: displayNameTokens[displayNameTokens.length - 1],
        displayNameTokens
      };
    });

    return facetsForCurrentFieldId;
  }) ?? [];
}

function convertFacetOption<F extends DisplayableFilter>(fieldId: string, option: DisplayableFacetOption) {
  return {
    fieldId: fieldId,
    matcher: option.matcher,
    value: option.value,
    displayName: option.displayName,
    selected: option.selected
  } as F;
}

/**
 * Convert a list of nlp filters to DisplayableFilter format.
 */
export function getDisplayableNlpFilters(filters: AppliedQueryFilter[]): DisplayableFilter[] {
  const displayableFilters: DisplayableFilter[] = [];

  filters?.forEach(filter => {
    displayableFilters.push({
      ...filter.filter,
      displayName: filter.displayValue,
      selected: true
    });
  });

  return displayableFilters;
}