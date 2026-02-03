import React, { PropsWithChildren } from 'react';
import { useDropdownContext } from './DropdownContext';

/**
 * DropdownMenu is a container for the overlay portion of a Dropdown.
 */
export function DropdownMenu(
  { children }: PropsWithChildren<unknown>
): React.JSX.Element | null {
  const { isActive, dropdownListUUID } = useDropdownContext();
  if (!isActive) {
    return null;
  }

  return <div id={dropdownListUUID} role="listbox">{children}</div>;
}
