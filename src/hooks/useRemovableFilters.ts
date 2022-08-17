import { FieldValueFilter, useSearchState, useSearchActions, DisplayableFacet, DisplayableFacetOption, SearchActions, Matcher } from '@yext/search-headless-react';
import { isEqual } from 'lodash';
import { useMemo } from 'react';
import { isNearFilterValue } from '../utils/filterutils';
import { isDescendantHierarchicalFacet } from '../utils/isDescendantHierarchicalFacet';
import { useStateUpdatedOnSearch } from './useStateUpdatedOnSearch';
import { useRemovableStaticFilters } from './useRemovableStaticFilters';
import { RemovableFilter } from '../components/AppliedFiltersDisplay';

/**
 * Returns a memoized RemovableFilter[], with handling for static filters,
 * hierarchical facets, and non-hierarchical facets.
 *
 * Duplicates are kept.
 *
 * @internal
 */
export function useRemovableFilters(
  hierarchicalFieldIds: string[] | undefined,
  hierarchicalDelimiter: string,
  hiddenFields: string[]
): RemovableFilter[] {
  const facets = useStateUpdatedOnSearch(state => state.filters.facets);
  const hasResults = !!useSearchState(state => state.vertical.results);
  const searchActions = useSearchActions();
  const removableStaticFilters = useRemovableStaticFilters(hiddenFields);

  return useMemo(() => {
    if (!hasResults) {
      return [];
    }

    const removableFacets = facets
      ?.filter(f => !hiddenFields.includes(f.fieldId))
      .flatMap((f: DisplayableFacet) => {
        if (hierarchicalFieldIds?.includes(f.fieldId)) {
          return processHierarchicalFacet(f, hierarchicalDelimiter, searchActions, facets);
        }
        return processRegularFacet(f, searchActions);
      }) ?? [];

    return [...removableStaticFilters, ...removableFacets];
  }, [
    facets,
    hasResults,
    hiddenFields,
    hierarchicalDelimiter,
    hierarchicalFieldIds,
    searchActions,
    removableStaticFilters
  ]);
}

function processRegularFacet(f: DisplayableFacet, searchActions: SearchActions) {
  return f.options.filter(o => o.selected).map(option => {

    const filter: FieldValueFilter = {
      value: option.value,
      matcher: option.matcher,
      fieldId: f.fieldId
    };

    return {
      displayName: option.displayName,
      handleRemove: () => handleRemoveFacetOption(filter, searchActions),
      filter
    };
  });
}

function processHierarchicalFacet(
  f: DisplayableFacet,
  delimiter: string,
  searchActions: SearchActions,
  facets: DisplayableFacet[] | undefined
): RemovableFilter[] {
  function createAppliedFilter(o: DisplayableFacetOption, tokens: string[]) {
    const filter = {
      matcher: o.matcher,
      value: o.value,
      fieldId: f.fieldId
    };

    const handleRemove =
      () => handleRemoveHierarchicalFacetOption(filter, tokens, delimiter, searchActions, facets);

    return {
      displayName: tokens[tokens.length - 1],
      handleRemove,
      filter,
      tokens
    };
  }

  return f.options.filter(o => o.selected).flatMap(selectedOption => {
    const displayNameTokens = splitDisplayName(selectedOption.displayName, delimiter);
    const appliedFacets: {
      displayName: string,
      handleRemove: () => void,
      filter: FieldValueFilter,
      tokens: string[]
    }[] = [createAppliedFilter(selectedOption, displayNameTokens)];

    // Create an object for each facet that is a parent of the currently selected option,
    // despite them not being explicitly selected
    f.options.forEach(option => {
      const tokens = splitDisplayName(option.displayName, delimiter);
      const isDescendant = isDescendantHierarchicalFacet(
        displayNameTokens,
        tokens
      );
      if (!isDescendant) {
        return;
      }
      appliedFacets.push(createAppliedFilter(option, tokens));
    });
    appliedFacets.sort((a, b) => a.tokens.length - b.tokens.length);
    return appliedFacets;
  });
}

function handleRemoveHierarchicalFacetOption(
  filter: {
    value: DisplayableFacetOption['value'],
    fieldId: string,
    matcher: Matcher
  },
  displayNameTokens: string[],
  delimiter: string,
  searchActions: SearchActions,
  facets: DisplayableFacet[] | undefined
) {
  searchActions.setFacetOption(filter.fieldId, {
    matcher: filter.matcher,
    value: filter.value
  }, false);

  // Uncheck all descendant options in the hierarchy
  facets
    ?.filter(f => f.fieldId === filter.fieldId)
    .flatMap(f => f.options)
    .forEach(o => {
      if (!o.selected) {
        return;
      }
      const tokensToCheck = splitDisplayName(o.displayName, delimiter);
      if (isDescendantHierarchicalFacet(tokensToCheck, displayNameTokens)) {
        searchActions.setFacetOption(filter.fieldId, {
          matcher: o.matcher,
          value: o.value
        }, false);
      }
    });
  const parentTokens = displayNameTokens.slice(0, -1);
  const parentOption = facets
    ?.filter(f => f.fieldId === filter.fieldId)
    .flatMap(f => f.options)
    .find(o => {
      const tokens = splitDisplayName(o.displayName, delimiter);
      return isEqual(tokens, parentTokens);
    });

  parentOption && searchActions.setFacetOption(filter.fieldId, {
    matcher: parentOption.matcher,
    value: parentOption.value
  }, true);
}

function handleRemoveFacetOption(
  { fieldId, matcher, value }: FieldValueFilter,
  searchActions: SearchActions
) {
  if (isNearFilterValue(value)) {
    console.error('A FieldValueFilter with a NearFilterValue is not a supported RemovableFilter.');
    return;
  }
  searchActions.setFacetOption(fieldId, { matcher, value }, false);
}

function splitDisplayName(displayName: string, delimiter: string): string[] {
  return displayName.split(delimiter).map(s => s.trim());
}
