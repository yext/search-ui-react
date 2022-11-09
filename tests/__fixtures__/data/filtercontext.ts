import { FiltersContextType } from '../../../src/components/Filters/FiltersContext';
import { SelectableFieldValueFilter } from '../../../src/models/SelectableFieldValueFilter';
import { FilterGroupContextType } from '../../../src/components/Filters/FilterGroupContext';
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

export const filterGroupContextValue: FilterGroupContextType = {
  searchValue: '',
  fieldId: '123',
  setSearchValue: () => null,
  getCollapseProps: () => ({
    id: 'id',
    onTransitionEnd: () => null,
    style: {},
    'aria-hidden': 'false'
  }),
  getToggleProps: () => ({
    disabled: false,
    type: 'button',
    role: 'role',
    id: 'id',
    'aria-controls': 'element',
    'aria-expanded': 'true',
    tabIndex: 0,
    onClick: () => null
  }),
  isExpanded: true,
  isOptionsDisabled: false,
  setIsOptionsDisabled: () => null
};
