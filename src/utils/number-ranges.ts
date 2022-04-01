import { AnswersHeadless } from '@yext/answers-headless-react';
import { isNumberRangeFilter } from '../models/NumberRangeFilter';

export function clearStaticRangeFilters(answersActions: AnswersHeadless){
  const selectedStaticRangeFilters = answersActions.state.filters.static?.filter(filter =>
    isNumberRangeFilter(filter) && filter.selected === true
  );
  selectedStaticRangeFilters?.forEach(filter => {
    answersActions.setFilterOption({
      ...filter,
      selected: false
    });
  });
}