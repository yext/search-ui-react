import { PropsWithChildren } from 'react'
import { useDropdownContext } from './DropdownContext'
import { FocusedItemData, useFocusContext } from './FocusContext';
import generateDropdownId from './generateDropdownId';
import { useInputContext } from './InputContext';

export type DropdownItemProps = PropsWithChildren<{
  value: string,
  className?: string,
  focusedClassName?: string,
  itemData?: Record<string, unknown> | undefined,
  onClick?: (value: string, index: number, focusedItemData: FocusedItemData | undefined ) => void
}>

/**
 * A wrapper component for specifying a DropdownItemWithIndex.
 * The index will be automatically provided by the {@link Dropdown} component instance.
 */
export default function DropdownItem(_props: DropdownItemProps) { return null; }

export function DropdownItemWithIndex(props: DropdownItemProps & { index: number }) {
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

  const handleClick = () => {
    toggleDropdown(false);
    updateFocusedItem(-1);
    setLastTypedOrSubmittedValue(value);
    setValue(value);
    onSelect?.(value, index, itemData);
    onClick?.(value, index, itemData);
  };

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