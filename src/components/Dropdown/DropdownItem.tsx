import { PropsWithChildren, useCallback } from 'react';
import { useDropdownContext } from './DropdownContext';
import { FocusedItemData, useFocusContext } from './FocusContext';
import { generateDropdownId } from './generateDropdownId';
import { useInputContext } from './InputContext';

/**
 * Props for the {@link DropdownItem}.
 *
 * @public
 */
export type DropdownItemProps = PropsWithChildren<{
  /** The value associated with the dropdown item. */
  value: string,
  /** The CSS classes which put on the dropdown item. */
  className?: string,
  /** The CSS classes put on the dropdown item when it is focused. */
  focusedClassName?: string,
  /** Data associated with the dropdown item which is passed to the onClick and the onSelect handlers. */
  itemData?: Record<string, unknown> | undefined,
  /** A function which is fired when the item is clicked. */
  onClick?: (value: string, index: number, focusedItemData: FocusedItemData | undefined ) => void
}>;

/**
 * A wrapper component for specifying a DropdownItemWithIndex.
 * The index will be automatically provided by the Dropdown component instance.
 *
 * @public
 */
export function DropdownItem(_props: DropdownItemProps): JSX.Element | null { return null; }

export function DropdownItemWithIndex(props: DropdownItemProps & { index: number }): JSX.Element {
  const {
    children,
    value,
    index,
    className,
    focusedClassName,
    itemData,
    onClick
  } = props;

  const { toggleDropdown, onSelect, screenReaderUUID } = useDropdownContext();
  const { focusedIndex, updateFocusedItem } = useFocusContext();
  const { setValue, setLastTypedOrSubmittedValue } = useInputContext();

  const isFocused = focusedIndex === index;

  const handleClick = useCallback(() => {
    toggleDropdown(false);
    updateFocusedItem(-1);
    setLastTypedOrSubmittedValue(value);
    setValue(value);
    onSelect?.(value, index, itemData);
    onClick?.(value, index, itemData);
  }, [
    index,
    itemData,
    onClick,
    onSelect,
    setLastTypedOrSubmittedValue,
    setValue,
    toggleDropdown,
    updateFocusedItem,
    value
  ]);

  return (
    <div
      id={screenReaderUUID && generateDropdownId(screenReaderUUID, index)}
      tabIndex={0}
      className={isFocused ? focusedClassName : className}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}