import { createContext, useContext } from 'react';
import { UseCollapseOutput } from 'react-collapsed/dist/types';

/**
 * FilterGroupContext is responsible for searchable filters and also collapsible filter groups.
 */
export type FilterGroupContextType = {
  searchValue: string,
  defaultFieldId?: string,
  setSearchValue: (value: string) => void,
  getCollapseProps: UseCollapseOutput['getCollapseProps'],
  getToggleProps: UseCollapseOutput['getToggleProps'],
  isExpanded: boolean
};

const FilterGroupContext = createContext<FilterGroupContextType | null>(null);
export default FilterGroupContext;

export function useFilterGroupContext(): FilterGroupContextType {
  const filterGroupContextInstance = useContext(FilterGroupContext);
  if (filterGroupContextInstance === null) {
    throw new Error('Tried to use FilterGroupContext when none exists.');
  }
  return filterGroupContextInstance;
}