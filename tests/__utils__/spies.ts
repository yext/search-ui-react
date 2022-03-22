import { AnswersHeadless, State, StateSelector, useAnswersState } from '@yext/answers-headless-react';

export function spyOnActions(): jest.Mocked<AnswersHeadless> {
  const spy = jest.spyOn(require('@yext/answers-headless-react'), 'useAnswersActions');
  const proxyHandler = {
    get: (_, prop) => spy.mock.results[0].value[prop]
  };
  return new Proxy(spy, proxyHandler);
}

export type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    // eslint-disable-next-line @typescript-eslint/ban-types
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};

export function spyOnAnswersState(
  customState: RecursivePartial<State>
): jest.SpyInstance<typeof useAnswersState, unknown[]> {
  function mockImpl<T>(stateAccessor: StateSelector<T>) {
    return stateAccessor({
      ...customState
    } as State);
  }

  return jest
    .spyOn(require('@yext/answers-headless-react'), 'useAnswersState')
    .mockImplementation(mockImpl as (...args: unknown[]) => unknown);
}
