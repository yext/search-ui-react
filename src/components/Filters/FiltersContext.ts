import { Filter } from '@yext/answers-headless-react';
import { createContext, useContext } from 'react';

/**
 * The Context responsible for the Dropdown state.
 */
export type FiltersContextType = {
  handleFilterSelect: (filter: Filter, checked: boolean) => void
};

const FiltersContext = createContext<FiltersContextType | null>(null);
export default FiltersContext;

export function useFiltersContext(): FiltersContextType {
  const filtersContextInstance = useContext(FiltersContext);
  if (filtersContextInstance === null) {
    throw new Error('Tried to use FiltersContext when none exists.');
  }
  return filtersContextInstance;
}