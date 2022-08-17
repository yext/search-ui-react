import { FieldValueFilter, useSearchState } from '@yext/search-headless-react';
import { useMemo } from 'react';
import { isDuplicateFieldValueFilter } from '../utils/filterutils';

/**
 * Returns a memoized array of nlp filter display values, with hiddenFields and duplicate filters removed.
 *
 * @internal
 */
export function useNlpFilterDisplayNames(
  removableFilters: FieldValueFilter[],
  hiddenFields: string[]
) {
  const nlpFilters = useSearchState(state => state.vertical.appliedQueryFilters);

  return useMemo(() => {
    return nlpFilters?.filter(({ filter }) => {
      if (hiddenFields.includes(filter.fieldId)) {
        return false;
      }
      const duplicateFilter = removableFilters.find(f => isDuplicateFieldValueFilter(f, filter));
      return !duplicateFilter;
    }).map(f => f.displayValue) ?? [];
  }, [hiddenFields, nlpFilters, removableFilters]);
}
