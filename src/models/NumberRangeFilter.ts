import { Filter, Matcher, NumberRangeValue } from '@yext/answers-headless-react';

export interface NumberRangeFilter extends Filter {
  value: NumberRangeValue,
  matcher: Matcher.Between
}