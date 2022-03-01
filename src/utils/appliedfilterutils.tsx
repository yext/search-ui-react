import {
  AppliedQueryFilter,
  FiltersState,
  SelectableFilter as DisplayableFilter
} from '@yext/answers-headless-react';
import { GroupedFilters } from '../models/groupedFilters';
import { getDisplayableFacets, getDisplayableNlpFilters } from './displayablefilterutils';
import { isDuplicateFilter } from './filterutils';

/**
 * Returns a new list of nlp filters with duplicates of other filters and
 * filter listed in hiddenFields removed from the given nlp filter list.
 */
function pruneNlpFilters(
  nlpFilters: DisplayableFilter[],
  appliedFilters: DisplayableFilter[],
  hiddenFields: string[]
): DisplayableFilter[] {
  const duplicatesRemoved = nlpFilters.filter(nlpFilter => {
    const isDuplicate = appliedFilters.find(appliedFilter => {
      return isDuplicateFilter(nlpFilter, appliedFilter);
    });
    return !isDuplicate;
  });
  return filterHiddenFields(duplicatesRemoved, hiddenFields);
}

/**
 * Returns a new list of applied filters with filter on hiddenFields removed
 * from the given applied filter list.
 */
function filterHiddenFields(
  appliedFilters: DisplayableFilter[], hiddenFields: string[]): DisplayableFilter[] {
  return appliedFilters.filter(appliedFilter => {
    return !hiddenFields.includes(appliedFilter.fieldId);
  });
}

/**
 * Process all applied filter types (facets, static filters, and nlp filters) by removing
 * duplicates and specified hidden fields.
 */
export function pruneAppliedFilters(
  appliedFiltersState: FiltersState,
  nlpFilters: AppliedQueryFilter[],
  hiddenFields: string[]
): GroupedFilters {
  const displayableStaticFilters = appliedFiltersState?.static?.filter(filter => filter.selected) || [];
  const displayableFacets = getDisplayableFacets(appliedFiltersState?.facets).filter(facet => facet.selected);
  const displayableNlpFilters = getDisplayableNlpFilters(nlpFilters);

  const prunedStaticFilters = filterHiddenFields(displayableStaticFilters, hiddenFields);
  const prunedFacets = filterHiddenFields(displayableFacets, hiddenFields);
  const prunedNlpFilters = pruneNlpFilters(
    displayableNlpFilters,
    [...prunedStaticFilters, ...prunedFacets],
    hiddenFields
  );

  return {
    staticFilters: prunedStaticFilters,
    facets: prunedFacets,
    nlpFilters: prunedNlpFilters
  };
}
