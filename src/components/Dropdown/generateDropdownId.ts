/**
 * Generates an id for a {@link DropdownItem}, for use with aria
 * attributes like aria-activedescendant.
 *
 * @param screenReaderUUID - the shared UUID for the {@link Dropdown} instance
 * @param index - the index of the dropdown item in question
 */
export function generateDropdownId(screenReaderUUID: string | undefined, index: number): string {
  if (!screenReaderUUID) return '';
  return screenReaderUUID + '_' + index;
}