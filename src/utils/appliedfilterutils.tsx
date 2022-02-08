import { AppliedQueryFilter, FiltersState } from "@yext/answers-headless-react";
import { DisplayableFilter } from "../models/displayableFilter";
import { GroupedFilters } from "../models/groupedFilters";
import { mapArrayToObject } from "./arrayutils";
import { isDuplicateFilter } from './filterutils';
import { 
  getDisplayableStaticFilters,
  getDisplayableAppliedFacets,
  getDisplayableNlpFilters
} from "./displayablefilterutils";

/**
 * Returns a new list of nlp filters with duplicates of other filters and 
 * filter listed in hiddenFields removed from the given nlp filter list.
 */
function pruneNlpFilters (
  nlpFilters: DisplayableFilter[], 
  appliedFilters: DisplayableFilter[], 
  hiddenFields: string[]
): DisplayableFilter[] {
  const duplicatesRemoved = nlpFilters.filter(nlpFilter => {
    const isDuplicate = appliedFilters.find(appliedFilter =>
      isDuplicateFilter(nlpFilter.filter, appliedFilter.filter)
    );
    return !isDuplicate;
  });
  return pruneAppliedFilters(duplicatesRemoved, hiddenFields);
}

/**
 * Returns a new list of applied filters with filter on hiddenFields removed 
 * from the given applied filter list.
 */
function pruneAppliedFilters(
  appliedFilters: DisplayableFilter[], hiddenFields: string[]): DisplayableFilter[] {
  return appliedFilters.filter(appliedFilter => {
    return !hiddenFields.includes(appliedFilter.filter.fieldId);
  });
}

/**
 * Combine all of the applied filters into a list of GroupedFilters where each contains a label and 
 * list of filters under that same label or category.
 */
function createGroupedFilters(
  appliedFilters: DisplayableFilter[],
  nlpFilters: DisplayableFilter[]
): Array<GroupedFilters> {
  const getGroupLabel = (filter: DisplayableFilter) => filter.groupLabel;
  const allFilters = [...appliedFilters, ...nlpFilters];
  const groupedFilters: Record<string, DisplayableFilter[]> = mapArrayToObject(allFilters, getGroupLabel);
  return Object.keys(groupedFilters).map(label => ({
    label: label,
    filters: groupedFilters[label]
  }));
}

/**
 * Process all applied filter types (facets, static filters, and nlp filters) by removing 
 * duplicates and specified hidden fields, and grouped the applied filters into categories.
 */
export function getGroupedAppliedFilters(
  appliedFiltersState: FiltersState,
  nlpFilters: AppliedQueryFilter[],
  hiddenFields: string[],
  staticFiltersGroupLabels: Record<string, string>
): Array<GroupedFilters>  {
  const displayableStaticFilters = getDisplayableStaticFilters(appliedFiltersState?.static, staticFiltersGroupLabels);
  const displayableFacets = getDisplayableAppliedFacets(appliedFiltersState?.facets);
  const displayableNlpFilters = getDisplayableNlpFilters(nlpFilters);
  
  const appliedFilters = [...displayableStaticFilters, ...displayableFacets];
  const prunedAppliedFilters = pruneAppliedFilters(appliedFilters, hiddenFields);
  const prunedNlpFilters = pruneNlpFilters (displayableNlpFilters, prunedAppliedFilters, hiddenFields);

  return createGroupedFilters(appliedFilters, prunedNlpFilters);
}