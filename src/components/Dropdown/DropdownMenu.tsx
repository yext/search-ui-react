import { PropsWithChildren } from 'react';
import { useDropdownContext } from './DropdownContext';

/**
 * DropdownMenu is a container for the overlay portion of a Dropdown.
 */
export default function DropdownMenu({ children }: PropsWithChildren<{}>) {
  const { isActive } = useDropdownContext();
  if (!isActive) {
    return null;
  }

  return <>{children}</>;
}
