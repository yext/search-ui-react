import { AnswersHeadless } from '@yext/answers-headless-react';

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
