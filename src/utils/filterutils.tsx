import { NearFilterValue, FieldValueFilter, NumberRangeValue, Matcher, SearchActions, DisplayableFacet, SelectableStaticFilter, StaticFilter } from '@yext/search-headless-react';
import { isEqual } from 'lodash';
import { isNumberRangeFilter } from '../models/NumberRangeFilter';
import { SelectableFieldValueFilter } from '../models/SelectableFieldValueFilter';

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
 * Checks if the facet is a numerical facet with number range filter options.
 */
export function isNumericalFacet(facet: DisplayableFacet): boolean {
  return facet.options.length > 0 && isNumberRangeFilter(facet.options[0]);
}

/**
 * Returns true if the two given field value filters are the same.
 */
export function isDuplicateFieldValueFilter(
  thisFilter: FieldValueFilter,
  otherFilter: FieldValueFilter
): boolean {
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
 * Returns true if the two given static filters are the same.
 */
export function isDuplicateStaticFilter(thisFilter: StaticFilter, otherFilter: StaticFilter): boolean {
  if (thisFilter.kind === 'fieldValue') {
    return otherFilter.kind === 'fieldValue'
      ? isDuplicateFieldValueFilter(thisFilter, otherFilter)
      : false;
  }

  if (otherFilter.kind === 'fieldValue') {
    return false;
  }

  return thisFilter.combinator === otherFilter.combinator
    && thisFilter.filters.length === otherFilter.filters.length
    && thisFilter.filters.every(t => otherFilter.filters.some(o => isDuplicateStaticFilter(t, o)))
    && otherFilter.filters.every(o => thisFilter.filters.some(t => isDuplicateStaticFilter(o, t)));
}

/**
 * Finds the {@link SelectableFieldValueFilter} from the list provided that matches
 * the given {@link FieldValueFilter}. If no matching {@link SelectableFieldValueFilter}
 * can be found, undefined is returned.
 *
 * @param filter - The filter to match against
 * @param selectableFilters - The list of {@link SelectableFieldValueFilter}s to search against
 */
export function findSelectableFieldValueFilter(
  filter: FieldValueFilter,
  selectableFilters: SelectableFieldValueFilter[]
): SelectableFieldValueFilter | undefined {
  return selectableFilters.find(selectableFilter => {
    const { displayName: _, ...storedFilter } = selectableFilter;
    return isDuplicateFieldValueFilter(storedFilter, filter);
  });
}

/**
 * Creates a number range value based on a min and max from user input.
 */
export function parseNumberRangeInput(minRangeInput: string, maxRangeInput: string): NumberRangeValue {
  const minRange = parseNumber(minRangeInput);
  const maxRange = parseNumber(maxRangeInput);

  return {
    ...(minRange !== undefined && {
      start: {
        matcher: Matcher.GreaterThanOrEqualTo,
        value: minRange
      }
    }),
    ...(maxRange !== undefined && {
      end: {
        matcher: Matcher.LessThanOrEqualTo,
        value: maxRange
      }
    })
  };
}

/**
 * Given a string, returns the corresponding number, or undefined if it is NaN.
 */
function parseNumber(num: string) {
  const parsedNum = parseFloat(num);
  if (isNaN(parsedNum)) {
    return undefined;
  }
  return parsedNum;
}

/**
 * Deselects the selected static number range filters in state. If fieldIds are
 * provided, only filters corresponding to one of those fieldIds are deselected.
 * Otherwise, all selected filters are deselected.
 */
export function clearStaticRangeFilters(searchActions: SearchActions, fieldIds?: Set<string>) {
  const selectedStaticRangeFilters = searchActions.state?.filters?.static?.filter(filter =>
    isNumberRangeFilter(filter)
    && filter.selected === true
    && (!fieldIds || fieldIds.has(filter.fieldId))
  );
  selectedStaticRangeFilters?.forEach(filter => {
    searchActions.setFilterOption({
      ...filter,
      selected: false
    });
  });
}

/**
 * Returns a set of fieldIds of the numerical facets in state that have at
 * least one option selected.
 */
export function getSelectedNumericalFacetFields(searchActions: SearchActions): Set<string> {
  const selectedNumericalFacets = searchActions.state.filters.facets?.filter(
    f => isNumericalFacet(f) && f.options.some(o => o.selected)
  ) ?? [];
  return new Set(selectedNumericalFacets.map(f => f.fieldId));
}

/**
 * Goes through the provided static filters and returns all that are field value
 * filters.
 *
 * @param staticFilters - The list of {@link SelectableStaticFilter}s to search through
 * @returns All filters that are {@link SelectableFieldValueFilter}s
 */
export function getSelectableFieldValueFilters(
  staticFilters: SelectableStaticFilter[]
): SelectableFieldValueFilter[] {
  return staticFilters.map(s => {
    const { filter: { kind, ...filterFields }, ...displayFields } = s;
    if (kind === 'fieldValue') {
      return {
        ...displayFields,
        ...filterFields
      };
    }
    return undefined;
  }).filter((s): s is SelectableFieldValueFilter => !!s);
}
