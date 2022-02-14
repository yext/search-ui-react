import { createContext, useContext } from 'react';
import { UseCollapseOutput } from 'react-collapsed/dist/types';

/**
 * The Context responsible for the Dropdown state.
 */
export type GroupContextType = {
  searchValue: string,
  defaultFieldId?: string,
  setSearchValue: (value: string) => void,
  getCollapseProps: UseCollapseOutput['getCollapseProps'],
  getToggleProps: UseCollapseOutput['getToggleProps'],
  isExpanded: boolean
};

const GroupContext = createContext<GroupContextType | null>(null);
export default GroupContext;

export function useGroupContext(): GroupContextType {
  const GroupContextInstance = useContext(GroupContext);
  if (GroupContextInstance === null) {
    throw new Error('Tried to use GroupContext when none exists.');
  }
  return GroupContextInstance;
}