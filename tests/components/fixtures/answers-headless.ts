import { AnswersCore, AnswersHeadless } from '@yext/answers-headless';
import { MockedAutocompleteService } from './core/autocomplete-service';
import { MockedQuestionSubmissionService } from './core/question-submission-service';
import { MockedSearchService } from './core/search-service';
import { MockedStateManager } from './state-manager';

const MockedCore: AnswersCore =
  new AnswersCore(MockedSearchService, MockedQuestionSubmissionService, MockedAutocompleteService);

export const MockedHeadless: AnswersHeadless = new AnswersHeadless(MockedCore, MockedStateManager, null);