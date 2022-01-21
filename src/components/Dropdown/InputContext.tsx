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

const inputContext = createContext<InputContextType | null>(null);
export default inputContext;

export function useInputContext(): InputContextType {
  const inputContextInstance = useContext(inputContext);
  if (inputContextInstance === null) {
    throw new Error('Tried to use InputContext when none exists.')
  }
  return inputContextInstance;
}