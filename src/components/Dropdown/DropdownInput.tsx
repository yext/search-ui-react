import React, { ChangeEvent, KeyboardEvent, useCallback, useRef } from 'react';
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
  inputId?: string,
  ariaLabel?: string,
  ariaLabelledBy?: string,
  ariaDescribedBy?: string,
  onSubmit?: (value: string, index: number, focusedItemData: FocusedItemData | undefined ) => void,
  onFocus?: (value: string) => void,
  onChange?: (value: string) => void,
  submitCriteria?: (index: number) => boolean
}): React.JSX.Element {
  const {
    className,
    placeholder,
    inputId,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    onSubmit,
    onFocus,
    onChange,
    submitCriteria
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const {
    toggleDropdown,
    onSelect,
    screenReaderUUID,
    dropdownListUUID,
    isExpanded
  } = useDropdownContext();
  const { value = '', setLastTypedOrSubmittedValue } = useInputContext();
  const {
    focusedIndex = -1,
    focusedItemData,
    focusedValue,
    updateFocusedItem
  } = useFocusContext();
  const resolvedAriaLabel = ariaLabelledBy ? undefined : ariaLabel;

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    toggleDropdown(true);
    onChange?.(e.target.value);
    updateFocusedItem(-1, e.target.value);
    setLastTypedOrSubmittedValue(e.target.value);
  }, [onChange, setLastTypedOrSubmittedValue, toggleDropdown, updateFocusedItem]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && (!submitCriteria || submitCriteria(focusedIndex))) {
      const submittedValue = focusedIndex >= 0 ? focusedValue ?? value : value;
      toggleDropdown(false);
      inputRef.current?.blur();
      setLastTypedOrSubmittedValue(submittedValue);
      onSubmit?.(submittedValue, focusedIndex, focusedItemData);
      if (focusedIndex >= 0) {
        onSelect?.(submittedValue, focusedIndex, focusedItemData);
      }
      updateFocusedItem(-1, submittedValue);
    }
  }, [
    focusedIndex,
    focusedValue,
    focusedItemData,
    onSelect,
    onSubmit,
    setLastTypedOrSubmittedValue,
    submitCriteria,
    toggleDropdown,
    updateFocusedItem,
    value
  ]);

  const handleFocus = useCallback(() => {
    toggleDropdown(true);
    updateFocusedItem(-1);
    onFocus?.(value);
  }, [onFocus, toggleDropdown, updateFocusedItem, value]);

  return (
    <input
      ref={inputRef}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      id={inputId ?? generateDropdownId(screenReaderUUID, -1)}
      autoComplete='off'
      aria-describedby={ariaDescribedBy}
      aria-activedescendant={
        focusedIndex >= 0 ? generateDropdownId(screenReaderUUID, focusedIndex) : undefined
      }
      aria-label={resolvedAriaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-autocomplete="list"
      role="combobox"
      aria-controls={dropdownListUUID}
      aria-expanded={isExpanded ? 'true' : 'false'}
      aria-haspopup="listbox"
    />
  );
}
