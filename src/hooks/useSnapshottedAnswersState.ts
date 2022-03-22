import { StateSelector, useAnswersState } from '@yext/answers-headless-react';
import { useRef } from 'react';

/**
 * Returns some Answers State, but snapshotted to the last time a search was completed.
 */
export function useSnapshottedAnswersState<T>(
  stateSelector: StateSelector<T>
): T | undefined {
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const wasLoading = useRef<boolean | undefined>(isLoading);
  const currentState = useAnswersState(stateSelector);
  const snapshottedState = useRef<T>();
  if (!isLoading && wasLoading.current) {
    snapshottedState.current = currentState;
  }
  wasLoading.current = isLoading;

  return snapshottedState.current;
}