import React from 'react';
import { FiltersContextType} from '../../../src/components/Filters/FiltersContext';
import { SelectableFieldValueFilter } from '../../../src/models/SelectableFieldValueFilter';
import { FilterGroupContextType, UseCollapseOutput } from '../../../src/components/Filters/FilterGroupContext';
import { Matcher } from '@yext/search-headless-react';

const selectableFilter: SelectableFieldValueFilter = {
  selected: true,
  fieldId: '123',
  matcher: Matcher.Equals,
  value: 'test'
};

type GetCollapsePropsType = ReturnType<UseCollapseOutput['getCollapseProps']>;
const getDefaultCollapseProps = (): GetCollapsePropsType => ({
  id: "1",
  style: "display: none",
  'aria-hidden': false
});

type GetTogglePropsType = ReturnType<UseCollapseOutput['getToggleProps']>;
const getDefaultToggleProps = (): GetTogglePropsType => ({
  disabled : false,
  type : 'button',
  role : 'button',
  id: '1',
  'aria-controls': "1",
  onClick: () => null,
});


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
  getCollapseProps: getDefaultCollapseProps(),
  getToggleProps: getDefaultToggleProps(),
  isExpanded: true,
  isOptionsDisabled: false,
  setIsOptionsDisabled: () => null
};
