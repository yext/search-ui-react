import { createContext, useContext } from 'react';

export type FocusedItemData = Record<string, unknown>;

/**
 * The Context responsible for the currently focused item in a Dropdown.
 */
export type FocusContextType = {
  focusedIndex: number,
  focusedValue: string | null,
  focusedItemData: FocusedItemData | undefined,
  updateFocusedItem: (index: number, value?: string) => void
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
