import { AppliedQueryFilter, DisplayableFacet, SelectableFilter } from '@yext/answers-headless-react';
import { DisplayableFilter } from '../models/displayableFilter';
import { getFilterDisplayValue } from './filterutils';

/**
 * Convert a list of facets to DisplayableFilter format with only selected facets returned.
 */
export function getDisplayableAppliedFacets(facets: DisplayableFacet[] | undefined): DisplayableFilter[] {
  let appliedFacets: DisplayableFilter[] = [];
  facets?.forEach(facet => {
    facet.options.forEach(option => {
      if(option.selected) {
        appliedFacets.push({
          filterType: 'FACET',
          filter: {
            fieldId: facet.fieldId,
            matcher: option.matcher,
            value: option.value
          },
          groupLabel: facet.displayName,
          label: option.displayName
        });
      }
    });
  });
  return appliedFacets;
}

/**
 * Convert an array of Selectablefilter to DisplayableFilter format with only selected filters returned.
 */
export function getDisplayableStaticFilters(
  staticFilters: SelectableFilter[] | undefined,
  groupLabels: Record<string, string>
): DisplayableFilter[] {
  let appliedStaticFilters: DisplayableFilter[] = [];
  staticFilters && staticFilters.forEach(selectableFilter => {
    const { selected, ...filter } = selectableFilter;
    if (selected) {
      appliedStaticFilters.push({
        filterType: 'STATIC_FILTER',
        filter: filter,
        groupLabel: groupLabels?.[filter.fieldId] || filter.fieldId,
        label: getFilterDisplayValue(filter)
      });
    }
  });
  return appliedStaticFilters;
}

/**
 * Convert a list of nlp filters to DisplayableFilter format.
 */
export function getDisplayableNlpFilters(filters: AppliedQueryFilter[]): DisplayableFilter[] {
  let appliedNlpFilters: DisplayableFilter[] = [];
  filters?.forEach(filter => {
    appliedNlpFilters.push({
      filterType: 'NLP_FILTER',
      filter: filter.filter,
      groupLabel: filter.displayKey,
      label: filter.displayValue,
    });
  });
  return appliedNlpFilters;
}