import { createContext, useContext } from 'react';

/**
 * The Context responsible for the Dropdown state.
 */
export type DropdownContextType = {
  isActive: boolean,
  screenReaderUUID?: string,
  toggleDropdown: (visible: boolean) => void,
  onSelect?: (value: string, index: number, focusedItemData: Record<string, unknown> | undefined) => void
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export function useDropdownContext(): DropdownContextType {
  const dropdownContextInstance = useContext(DropdownContext);
  if (dropdownContextInstance === null) {
    throw new Error('Tried to use DropdownContext when none exists.');
  }
  return dropdownContextInstance;
}