import { useContext, createContext } from 'react';

/**
 * A Context for a string state value.
 */
export type InputContextType = {
  value: string,
  setValue: (newValue: string) => void,
  lastTypedOrSubmittedValue: string,
  setLastTypedOrSubmittedValue: (newValue: string) => void
};

export const InputContext = createContext<InputContextType | null>(null);

export function useInputContext(): InputContextType {
  const inputContextInstance = useContext(InputContext);
  if (inputContextInstance === null) {
    throw new Error('Tried to use InputContext when none exists.');
  }
  return inputContextInstance;
}