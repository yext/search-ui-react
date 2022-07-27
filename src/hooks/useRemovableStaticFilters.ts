import { useSearchState, useSearchActions, SelectableFilter } from '@yext/search-headless-react';
import { useMemo } from 'react';
import { RemovableFilter } from '../components/AppliedFiltersDisplay';
import { executeSearch } from '../utils/search-operations';
import { useStateUpdatedOnSearch } from './useStateUpdatedOnSearch';

/**
 * @internal
 */
export function useRemovableStaticFilters(hiddenFields: string[]): RemovableFilter[] {
  const staticFilters = useStateUpdatedOnSearch(state => state.filters.static);
  const hasResults = !!useSearchState(state => state.vertical.results);
  const searchActions = useSearchActions();

  return useMemo(() => {
    if (!hasResults || !staticFilters) {
      return [];
    }

    function handleRemoveStaticFilterOption(filter: SelectableFilter) {
      searchActions.setOffset(0);
      searchActions.setFilterOption({ ...filter, selected: false });
      executeSearch(searchActions);
    }

    return staticFilters
      .filter(f => f.selected && !hiddenFields.includes(f.fieldId))
      .map(f => ({
        displayName: f.displayName ?? '',
        handleRemove: () => handleRemoveStaticFilterOption(f),
        filter: f
      }));
  }, [hasResults, hiddenFields, searchActions, staticFilters]);
}
