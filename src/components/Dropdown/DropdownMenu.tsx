import React, { PropsWithChildren } from 'react';
import { useDropdownContext } from './DropdownContext';
import { useLayoutEffect } from '../../hooks/useLayoutEffect';

type DropdownMenuProps = PropsWithChildren<{
  className?: string
}>;

/**
 * DropdownMenu is a container for the overlay portion of a Dropdown.
 */
export function DropdownMenu(
  { children, className }: DropdownMenuProps
): React.JSX.Element | null {
  const {
    isActive,
    dropdownListUUID,
    setDropdownListVisible
  } = useDropdownContext();

  useLayoutEffect(() => {
    setDropdownListVisible(isActive);
    return () => setDropdownListVisible(false);
  }, [isActive, setDropdownListVisible]);

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
