import {
  AnswersHeadless,
  State,
  StateSelector,
  useAnswersState,
  useAnswersActions,
  AnswersUtilities,
  useAnswersUtilities
} from '@yext/answers-headless-react';

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

export function mockAnswersState(
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

export function mockAnswersActions(
  customActions: RecursivePartial<AnswersHeadless>
): jest.SpyInstance<typeof useAnswersActions, unknown[]> {
  function mockImpl() {
    return customActions as AnswersHeadless;
  }
  return jest
    .spyOn(require('@yext/answers-headless-react'), 'useAnswersActions')
    .mockImplementation(mockImpl as () => unknown);
}

export function mockAnswersUtils(
  customUtils: RecursivePartial<AnswersUtilities>
): jest.SpyInstance<typeof useAnswersUtilities, unknown[]> {
  function mockImpl() {
    return customUtils as AnswersUtilities;
  }
  return jest
    .spyOn(require('@yext/answers-headless-react'), 'useAnswersUtilities')
    .mockImplementation(mockImpl as () => unknown);
}

export function mockAnswersHooks({
  mockedState, mockedActions, mockedUtils
}: {
  mockedState?: RecursivePartial<State>,
  mockedActions?: RecursivePartial<AnswersHeadless>,
  mockedUtils?: RecursivePartial<AnswersUtilities>
}
) {
  mockedUtils && mockAnswersUtils(mockedUtils);
  mockedState && mockAnswersState(mockedState);
  mockedActions && mockAnswersActions(mockedActions);
}