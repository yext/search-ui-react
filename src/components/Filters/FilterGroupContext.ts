import { createContext, useContext } from 'react';
import { UseCollapseOutput } from 'react-collapsed/dist/types';

/** 
 * FilterGroupContext is responsible for searchable filters and collapsible filter groups.
 *
 * @public
 */
export interface FilterGroupContextType {
  searchValue: string,
  defaultFieldId?: string,
  setSearchValue: (value: string) => void,
  getCollapseProps: UseCollapseOutput['getCollapseProps'],
  getToggleProps: UseCollapseOutput['getToggleProps'],
  isExpanded: boolean
};

/**
 * Filter context to support searchable filters and collapsible filter groups. 
 * 
 * @public
 */
const FilterGroupContext = createContext<FilterGroupContextType | null>(null);
export default FilterGroupContext;

/**
 * A hook used to access the FilterGroup context.
 * 
 * @public
 */
export function useFilterGroupContext(): FilterGroupContextType {
  const filterGroupContextInstance = useContext(FilterGroupContext);
  if (filterGroupContextInstance === null) {
    throw new Error('Tried to use FilterGroupContext when none exists.');
  }
  return filterGroupContextInstance;
}