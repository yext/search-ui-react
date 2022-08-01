import { useSearchActions, useSearchState } from '@yext/search-headless-react';
import { useCallback } from 'react';
import { executeSearch } from '../utils/search-operations';

/**
 * Clears static filters and facets, resets the search offset to 0, and runs a search.
 *
 * @internal
 */
export function useClearFiltersCallback() {
  const searchActions = useSearchActions();
  const staticFilters = useSearchState(state => state.filters.static);

  return useCallback(() => {
    searchActions.setOffset(0);
    searchActions.resetFacets();
    staticFilters && searchActions.setStaticFilters(staticFilters.map(f => {
      return {
        ...f,
        selected: false
      };
    }));
    executeSearch(searchActions);
  }, [searchActions, staticFilters]);
}