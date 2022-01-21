import { PropsWithChildren, useLayoutEffect } from 'react'
import { useDropdownContext } from './DropdownContext'
import { useFocusContext } from './FocusContext';
import generateDropdownId from './generateDropdownId';
import { useInputContext } from './InputContext';

export default function DropdownItem(props: PropsWithChildren<{
  value: string,
  index: number,
  className?: string,
  focusedClassName?: string
}>) {
  const {
    children,
    value,
    index,
    className,
    focusedClassName,
  } = props;

  const { toggleDropdown, onSelect, screenReaderUUID } = useDropdownContext();
  const { focusedIndex, focusedValue, setFocusedValue, setFocusedIndex } = useFocusContext();
  const { setValue, setLastTypedOrSubmittedValue } = useInputContext();

  const needsFocusedValueUpdate = focusedIndex === index && focusedValue !== value;
  useLayoutEffect(() => {
    if (needsFocusedValueUpdate) {
      setFocusedValue(value);
      setValue(value);
    }
  }, [needsFocusedValueUpdate, setFocusedValue, value, setValue])

  const handleClick = () => {
    toggleDropdown(false);
    setFocusedIndex(-1);
    setLastTypedOrSubmittedValue(value);
    setValue(value);
    onSelect?.(value);
  };

  const computedClassName = focusedIndex === index ? focusedClassName : className;

  return (
    <div
      id={screenReaderUUID && generateDropdownId(screenReaderUUID, index)}
      tabIndex={0}
      className={computedClassName}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}