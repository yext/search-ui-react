import { Filter, useSearchState } from '@yext/search-headless-react';
import { useMemo } from 'react';
import { isDuplicateFilter } from '../utils/filterutils';

/**
 * Returns a memoized array of nlp filter display values, with hiddenFields and duplicate filters removed.
 *
 * @internal
 */
export function useNlpFilterDisplayNames(
  removableFilters: Filter[],
  hiddenFields: string[]
) {
  const nlpFilters = useSearchState(state => state.vertical.appliedQueryFilters);

  return useMemo(() => {
    return nlpFilters?.filter(({ filter }) => {
      if (hiddenFields.includes(filter.fieldId)) {
        return false;
      }
      const duplicateFilter = removableFilters.find(f => isDuplicateFilter(f, filter));
      return !duplicateFilter;
    }).map(f => f.displayValue) ?? [];
  }, [hiddenFields, nlpFilters, removableFilters]);
}
