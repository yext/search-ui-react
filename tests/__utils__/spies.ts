import { AnswersHeadless, State, StateSelector } from '@yext/answers-headless-react';

export type AnswersActionsMock = {
  [x in keyof AnswersHeadless]: jest.MockInstance<AnswersHeadless[x], unknown[]>
};

export function spyOnActions(): AnswersActionsMock {
  const spy = jest.spyOn(require('@yext/answers-headless-react'), 'useAnswersActions');
  const proxyHandler = {
    get: (_, prop) => spy.mock.results[0].value[prop]
  };
  return new Proxy(spy, proxyHandler);
}

type UseAnswersState = <T extends unknown>(stateSelector: StateSelector<T>) => T;

export function spyOnAnswersState(
  customState: Partial<State>
): jest.SpyInstance<UseAnswersState, unknown[]> {
  function mockImpl<T>(stateAccessor: StateSelector<T>) {
    return stateAccessor({
      ...customState
    } as State);
  }

  return jest
    .spyOn(require('@yext/answers-headless-react'), 'useAnswersState')
    .mockImplementation(mockImpl as (...args: unknown[]) => unknown);
}
