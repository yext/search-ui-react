import { FieldValueFilter, Matcher, NumberRangeValue } from '@yext/search-headless-react';
import { isNumberRangeValue } from '../utils/filterutils';

export interface NumberRangeFilter extends FieldValueFilter {
  value: NumberRangeValue,
  matcher: Matcher.Between
}

export function isNumberRangeFilter(unknownFilter: unknown = {}): unknownFilter is NumberRangeFilter {
  const filter = unknownFilter as NumberRangeFilter;
  return (filter.matcher === Matcher.Between) && isNumberRangeValue(filter.value);
}