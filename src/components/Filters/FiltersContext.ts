import { Filter, SelectableFilter } from '@yext/answers-headless-react';
import { createContext, useContext } from 'react';

/**
 * FiltersContext is responsible for handling filter selection.
 * 
 * @public
 */
export interface FiltersContextType {
  handleFilterSelect: (filter: Filter, checked: boolean) => void
  filters: SelectableFilter[]
};

/**
 * Filters context which provides the filters to render and a handler for selecting a filter.
 * 
 * @public
 */
const FiltersContext = createContext<FiltersContextType | null>(null);
export default FiltersContext;

/**
 * A hook used to access the FiltersContext.
 * 
 * @public
 */
export function useFiltersContext(): FiltersContextType {
  const filtersContextInstance = useContext(FiltersContext);
  if (filtersContextInstance === null) {
    throw new Error('Tried to use FiltersContext when none exists.');
  }
  return filtersContextInstance;
}