import { PropsWithChildren, useMemo, useRef, useState } from 'react';
import DropdownContext, { DropdownContextType } from './DropdownContext';
import InputContext, { InputContextType } from './InputContext';
import useGlobalListener from '@restart/hooks/useGlobalListener';
import useRootClose from '@restart/ui/useRootClose';
import FocusContext, { FocusContextType } from './FocusContext';
import { v4 as uuid } from 'uuid';
import ScreenReader from '../ScreenReader';

/**
 * Dropdown is the parent component for a set of Dropdown-related components.
 *
 * It provides multiple shared contexts, which are consumed by its child components,
 * and also registers some global event listeners.
 */
export default function Dropdown(props: PropsWithChildren<{
  numItems: number,
  screenReaderText: string,
  screenReaderInstructions?: string,
  initialValue?: string,
  onSelect?: (value?: string, index?: number) => void,
  onToggle?: (isActive?: boolean, value?: string) => void,
  className?: string,
  activeClassName?: string
}>) {
  const {
    children,
    numItems,
    screenReaderText,
    screenReaderInstructions = 'When autocomplete results are available, use up and down arrows to review and enter to select.',
    initialValue,
    onSelect,
    onToggle,
    className,
    activeClassName
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const screenReaderUUID: string = useMemo(() => uuid(), []);

  const inputContext = useInputContextInstance(initialValue);
  const { value, setValue, lastTypedOrSubmittedValue } = inputContext;
  const focusContext = useFocusContextInstance();
  const { focusedIndex, setFocusedIndex, setFocusedValue } = focusContext;
  const dropdownContext = useDropdownContextInstance(value, screenReaderUUID, onToggle, onSelect);
  const { toggleDropdown, isActive } = dropdownContext;

  useRootClose(containerRef, () => {
    toggleDropdown(false);
  }, { disabled: !isActive });

  useGlobalListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
    }
    if (!isActive) {
      return;
    }
    if (e.key === 'ArrowDown') {
      const updatedFocusedIndex = focusedIndex + 1;
      if (updatedFocusedIndex >= numItems) {
        setFocusedIndex(-1);
        setFocusedValue(lastTypedOrSubmittedValue);
        setValue(lastTypedOrSubmittedValue);
      } else {
        setFocusedIndex(updatedFocusedIndex);
      }
    } else if (e.key === 'ArrowUp') {
      const updatedFocusedIndex = focusedIndex - 1;
      if (updatedFocusedIndex === -1) {
        setFocusedIndex(updatedFocusedIndex);
        setFocusedValue(lastTypedOrSubmittedValue);
        setValue(lastTypedOrSubmittedValue);
      } else if (updatedFocusedIndex < -1){
        setFocusedIndex((numItems + updatedFocusedIndex + 1) % numItems);
      } else {
        setFocusedIndex(updatedFocusedIndex);
      }
    }
  });

  return (
    <div ref={containerRef} className={isActive ? activeClassName : className}>
      <DropdownContext.Provider value={dropdownContext}>
        <InputContext.Provider value={inputContext}>
          <FocusContext.Provider value={focusContext}>
            {children}
          </FocusContext.Provider>
        </InputContext.Provider>
      </DropdownContext.Provider>

      <ScreenReader
        announcementKey={value}
        announcementText={isActive ? screenReaderText : ''}
        instructionsId={screenReaderUUID}
        instructions={screenReaderInstructions}
      />
    </div>
  );
}

function useInputContextInstance(initialValue = ''): InputContextType {
  const [value, setValue] = useState(initialValue);
  const [lastTypedOrSubmittedValue, setLastTypedOrSubmittedValue] = useState(initialValue);
  return {
    value,
    setValue,
    lastTypedOrSubmittedValue,
    setLastTypedOrSubmittedValue
  };
}

function useFocusContextInstance(): FocusContextType {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [focusedValue, setFocusedValue] = useState<string>('');
  return {
    focusedIndex,
    setFocusedIndex,
    focusedValue,
    setFocusedValue
  };
}

function useDropdownContextInstance(
  value: string,
  screenReaderUUID: string,
  onToggle?: (isActive?: boolean, value?: string) => void,
  onSelect?: (value?: string, index?: number) => void,
): DropdownContextType {
  const [isActive, _toggleDropdown] = useState(false);
  const toggleDropdown = (willBeOpen: boolean) => {
    _toggleDropdown(willBeOpen);
    onToggle?.(willBeOpen, value);
  };
  return {
    isActive,
    toggleDropdown,
    onSelect,
    screenReaderUUID
  };
}