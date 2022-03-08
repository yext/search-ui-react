import { ChangeEvent, KeyboardEvent, useCallback, useRef } from 'react';
import { useDropdownContext } from './DropdownContext';
import { useFocusContext, FocusedItemData } from './FocusContext';
import { generateDropdownId } from './generateDropdownId';
import { useInputContext } from './InputContext';

/**
 * An input component for use within a Dropdown.
 */
export function DropdownInput(props: {
  className?: string,
  placeholder?: string,
  onSubmit?: (value: string, index: number, focusedItemData: FocusedItemData | undefined ) => void,
  onFocus?: (value: string) => void,
  onChange?: (value: string) => void,
  submitCriteria?: (index: number) => boolean
}): JSX.Element {
  const {
    className,
    placeholder,
    onSubmit,
    onFocus,
    onChange,
    submitCriteria
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const { toggleDropdown, onSelect, screenReaderUUID } = useDropdownContext();
  const { value = '', setLastTypedOrSubmittedValue } = useInputContext();
  const {
    focusedIndex = -1,
    focusedItemData,
    updateFocusedItem
  } = useFocusContext();

  const handleClick = useCallback(() => toggleDropdown(true), [toggleDropdown]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    toggleDropdown(true);
    updateFocusedItem(-1, e.target.value);
    setLastTypedOrSubmittedValue(e.target.value);
    onChange?.(e.target.value);
  }, [onChange, setLastTypedOrSubmittedValue, toggleDropdown, updateFocusedItem ]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && (!submitCriteria || submitCriteria(focusedIndex))) {
      toggleDropdown(false);
      updateFocusedItem(-1, value);
      inputRef.current?.blur();
      onSubmit?.(value, focusedIndex, focusedItemData);
      if (focusedIndex >= 0) {
        onSelect?.(value, focusedIndex, focusedItemData);
      }
    }
  }, [
    focusedIndex,
    focusedItemData,
    onSelect,
    onSubmit,
    submitCriteria,
    toggleDropdown,
    updateFocusedItem,
    value
  ]);

  const handleFocus = useCallback(() => {
    toggleDropdown(true);
    onFocus?.(value);
  }, [onFocus, toggleDropdown, value]);

  return (
    <input
      ref={inputRef}
      className={className}
      placeholder={placeholder}
      value={value}
      onClick={handleClick}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      id={screenReaderUUID && generateDropdownId(screenReaderUUID, -1)}
      aria-describedby={screenReaderUUID}
      aria-activedescendant={screenReaderUUID && generateDropdownId(screenReaderUUID, focusedIndex)}
    />
  );
}