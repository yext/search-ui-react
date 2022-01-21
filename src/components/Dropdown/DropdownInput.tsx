import { ChangeEvent, KeyboardEvent, useRef } from 'react'
import { useDropdownContext } from './DropdownContext'
import { useFocusContext } from './FocusContext';
import generateDropdownId from './generateDropdownId';
import { useInputContext } from './InputContext';

/**
 * An input component for use within a Dropdown.
 */
export default function DropdownInput(props: {
  className?: string,
  placeholder?: string,
  onSubmit?: (value?: string) => void,
  onFocus?: (value?: string) => void,
  onChange?: (value?: string) => void
}) {
  const {
    className,
    placeholder,
    onSubmit,
    onFocus,
    onChange
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const { toggleDropdown, onSelect, screenReaderUUID } = useDropdownContext();
  const { value = '', setValue, setLastTypedOrSubmittedValue } = useInputContext();
  const { focusedIndex = -1, setFocusedIndex } = useFocusContext();

  const handleClick = () => {
    toggleDropdown(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleDropdown(true);
    setFocusedIndex(-1);
    setLastTypedOrSubmittedValue(e.target.value);
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      toggleDropdown(false);
      setFocusedIndex(-1);
      onSubmit?.(value);
      setLastTypedOrSubmittedValue(value);
      if (focusedIndex >= 0) {
        onSelect?.(value, focusedIndex);
      }
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    toggleDropdown(true);
    onFocus?.(value);
  };

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
      aria-describedby={screenReaderUUID}
      aria-activedescendant={screenReaderUUID && generateDropdownId(screenReaderUUID, focusedIndex)}
    />
  )
}