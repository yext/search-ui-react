import { FiltersContextType} from '../../../src/components/Filters/FiltersContext';
import { SelectableFieldValueFilter } from '../../../src/models/SelectableFieldValueFilter';
import { Matcher } from '@yext/search-headless-react';

const selectableFilter: SelectableFieldValueFilter = {
  selected: true,
  fieldId: '123',
  matcher: Matcher.Equals,
  value: 'test'
};

export const filterContextValue: FiltersContextType = {
  selectFilter: () => null,
  applyFilters: () => null,
  filters: []
};

export const filterContextValueDisabled: FiltersContextType = {
  selectFilter: () => null,
  applyFilters: () => null,
  filters: [selectableFilter]
};
