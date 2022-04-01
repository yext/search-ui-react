import { Filter, Matcher, NumberRangeValue } from '@yext/answers-headless-react';
import { isNumberRangeValue } from '../utils/filterutils';

export interface NumberRangeFilter extends Filter {
  value: NumberRangeValue,
  matcher: Matcher.Between
}

export function isNumberRangeFilter(unknownFilter: unknown = {}): unknownFilter is NumberRangeFilter {
  const filter = unknownFilter as NumberRangeFilter;
  if (filter.matcher !== Matcher.Between) {
    return false;
  }
  if (!isNumberRangeValue(filter.value)) {
    return false;
  }
  return true;
}