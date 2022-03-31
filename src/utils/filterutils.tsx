import { NearFilterValue, Filter, SelectableFilter, NumberRangeValue } from '@yext/answers-headless-react';
import isEqual from 'lodash/isEqual';

/**
 * Check if the object follows NearFilterValue interface.
 */
export function isNearFilterValue(obj: unknown): obj is NearFilterValue {
  return typeof obj === 'object' && !!obj && 'radius' in obj && 'lat' in obj && 'long' in obj;
}

/**
 * Checks if the object follows the NumberRangeValue interface.
 */
export function isNumberRangeValue(obj: unknown): obj is NumberRangeValue {
  return typeof obj === 'object' && !!obj && ('start' in obj || 'end' in obj);
}

/**
 * Returns true if the two given filters are the same.
 */
export function isDuplicateFilter(thisFilter: Filter, otherFilter: Filter): boolean {
  if (thisFilter.fieldId !== otherFilter.fieldId) {
    return false;
  }
  if (thisFilter.matcher !== otherFilter.matcher) {
    return false;
  }
  if (!isEqual(thisFilter.value, otherFilter.value)) {
    return false;
  }
  return true;
}

/**
 * Finds the {@link SelectableFilter} from the list provided that matches the given {@link Filter}.
 * If no matching {@link SelectableFilter} can be found, undefined is returned.
 *
 * @param filter - The filter to match against.
 * @param selectableFilters - The list of {@link SelectableFilters} to search against.
 */
export function findSelectableFilter(
  filter: Filter,
  selectableFilters: SelectableFilter[]
): SelectableFilter | undefined {
  return selectableFilters.find(selectableFilter => {
    const { displayName:_, ...storedFilter } = selectableFilter;
    return isDuplicateFilter(storedFilter, filter);
  });
}
