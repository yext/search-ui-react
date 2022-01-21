import { createContext, useContext } from 'react';

/**
 * The Context responsible for the currently focused item in a Dropdown.
 */
export type FocusContextType = {
  focusedIndex: number,
  setFocusedIndex: (index: number) => void,
  focusedValue: string | null,
  setFocusedValue: (value: string) => void
}

const focusContext = createContext<FocusContextType | null>(null);
export default focusContext;

export function useFocusContext(): FocusContextType {
  const focusContextInstance = useContext(focusContext);
  if (focusContextInstance === null) {
    throw new Error('Tried to use FocusContext when none exists.')
  }
  return focusContextInstance;
}
