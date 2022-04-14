import {
  AnswersHeadless,
  provideAnswersHeadless,
  SearchTypeEnum,
  State
} from '@yext/answers-headless-react';
import { RecursivePartial } from '../__utils__/mocks';
import merge from 'lodash/merge';

export function generateMockedHeadless(state?: RecursivePartial<State>): AnswersHeadless {
  const emptyState: State = {
    query: {},
    universal: {},
    vertical: {},
    directAnswer: {},
    queryRules: {
      actions: []
    },
    filters: {},
    searchStatus: {},
    spellCheck: {
      enabled: true
    },
    sessionTracking: {},
    meta: {
      searchType: SearchTypeEnum.Universal
    },
    location: {},
  };
  const mergedState = merge(emptyState, state);

  /**
   * a mocked AnswersCore class will be use in provideAnswersHeadless:
   * - Storybook: through resolve.alias in storybook's webpack config
   * - Jest: through moduleNameMapper configuration
   */
  const headless = provideAnswersHeadless({
    apiKey: '',
    experienceKey: '',
    locale: ''
  });
  headless.setState(mergedState);
  return headless;
}