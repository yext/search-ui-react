import { createContext, useContext } from 'react';

/**
 * The data associated with the currently focused item.
 *
 * @public
 */
export type FocusedItemData = Record<string, unknown>;

/**
 * The Context responsible for the currently focused item in a Dropdown.
 */
export type FocusContextType = {
  focusedIndex: number,
  focusedValue: string | null,
  focusedItemData: FocusedItemData | undefined,
  updateFocusedItem: (index: number, value?: string) => void
};

export const FocusContext = createContext<FocusContextType | null>(null);

export function useFocusContext(): FocusContextType {
  const focusContextInstance = useContext(FocusContext);
  if (focusContextInstance === null) {
    throw new Error('Tried to use FocusContext when none exists.');
  }
  return focusContextInstance;
}
