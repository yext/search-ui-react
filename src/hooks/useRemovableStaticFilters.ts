import { useSearchState, useSearchActions } from '@yext/search-headless-react';
import { useMemo } from 'react';
import { RemovableFilter } from '../components/AppliedFiltersDisplay';
import { SelectableFieldValueFilter } from '../models/SelectableFieldValueFilter';
import { getSelectableFieldValueFilters } from '../utils/filterutils';
import { useStateUpdatedOnSearch } from './useStateUpdatedOnSearch';

/**
 * Returns a RemovableFilter[] sourced from the static filters state.
 *
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

    function handleRemoveStaticFilterOption(filter: SelectableFieldValueFilter) {
      searchActions.setFilterOption({
        filter: { ...filter, kind: 'fieldValue' },
        selected: false
      });
    }

    return getSelectableFieldValueFilters(staticFilters)
      .filter(f => f.selected && !hiddenFields.includes(f.fieldId))
      .map(f => ({
        displayName: f.displayName ?? '',
        handleRemove: () => handleRemoveStaticFilterOption(f),
        filter: f
      }));
  }, [hasResults, hiddenFields, searchActions, staticFilters]);
}
