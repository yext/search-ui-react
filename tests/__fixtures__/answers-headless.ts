import { AnswersCore, AnswersHeadless, SearchTypeEnum, State } from '@yext/answers-headless-react';
import { MockedAutocompleteService } from './core/autocomplete-service';
import { MockedQuestionSubmissionService } from './core/question-submission-service';
import { MockedSearchService } from './core/search-service';
import { generateMockedStateManager } from './state-manager';
import { RecursivePartial } from '../__utils__/mocks';
import merge from 'lodash/merge';

const MockedCore: AnswersCore =
  new AnswersCore(MockedSearchService, MockedQuestionSubmissionService, MockedAutocompleteService);

export function generateMockedHeadless(state: RecursivePartial<State>): AnswersHeadless {
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
  const mockedStateManager = generateMockedStateManager(mergedState);
  return new AnswersHeadless(MockedCore, mockedStateManager, null);
}