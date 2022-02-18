import { PropsWithChildren } from 'react';
import { useDropdownContext } from './DropdownContext';

/**
 * DropdownMenu is a container for the overlay portion of a Dropdown.
 */
export function DropdownMenu(
  { children }: PropsWithChildren<unknown>
): JSX.Element | null {
  const { isActive } = useDropdownContext();
  if (!isActive) {
    return null;
  }

  return <>{children}</>;
}
