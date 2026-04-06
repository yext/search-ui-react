import React, { PropsWithChildren } from 'react';
import { useDropdownContext } from './DropdownContext';

type DropdownMenuProps = PropsWithChildren<{
  className?: string
}>;

/**
 * DropdownMenu is a container for the overlay portion of a Dropdown.
 */
export function DropdownMenu(
  { children, className }: DropdownMenuProps
): React.JSX.Element | null {
  const { isActive, dropdownListUUID } = useDropdownContext();
  if (!isActive) {
    return null;
  }

  return (
    <div
      id={dropdownListUUID}
      className={className}
      role='listbox'
    >
      {children}
    </div>
  );
}
