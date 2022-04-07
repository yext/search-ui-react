import { generateMockedSearchService } from './search-service';
import { generateMockedQuestionSubmissionService } from './question-submission-service';
import { generateMockedAutocompleteService } from './autocomplete-service';
import {
  AutocompleteService,
  QuestionSubmissionService,
  SearchService,
  UniversalSearchRequest,
  UniversalSearchResponse,
  VerticalSearchRequest,
  VerticalSearchResponse,
  QuestionSubmissionRequest,
  QuestionSubmissionResponse,
  UniversalAutocompleteRequest,
  AutocompleteResponse,
  VerticalAutocompleteRequest,
  FilterSearchRequest,
  FilterSearchResponse
} from '@yext/answers-headless-react';

/**
 * Mock AnswersCore class
 */
export class AnswersCore {
  searchService: SearchService;
  questionSubmissionService: QuestionSubmissionService;
  autoCompleteService: AutocompleteService;
  
  constructor() {
    this.searchService = generateMockedSearchService();
    this.questionSubmissionService = generateMockedQuestionSubmissionService();
    this.autoCompleteService = generateMockedAutocompleteService();
  }

  universalSearch(request: UniversalSearchRequest): Promise<UniversalSearchResponse> {
    return this.searchService.universalSearch(request);
  }

  verticalSearch(request: VerticalSearchRequest): Promise<VerticalSearchResponse> {
    return this.searchService.verticalSearch(request);
  }

  submitQuestion(request: QuestionSubmissionRequest): Promise<QuestionSubmissionResponse> {
    return this.questionSubmissionService.submitQuestion(request);
  }

  universalAutocomplete(request: UniversalAutocompleteRequest): Promise<AutocompleteResponse> {
    return this.autoCompleteService.universalAutocomplete(request);
  }

  verticalAutocomplete(request: VerticalAutocompleteRequest): Promise<AutocompleteResponse> {
    return this.autoCompleteService.verticalAutocomplete(request);
  }

  filterSearch(request: FilterSearchRequest): Promise<FilterSearchResponse> {
    return this.autoCompleteService.filterSearch(request);
  }
}
