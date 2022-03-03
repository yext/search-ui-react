/* eslint-disable @typescript-eslint/no-unused-vars */
import { QuestionSubmissionRequest, QuestionSubmissionResponse, QuestionSubmissionService } from '@yext/answers-core';

/* A sample Question Submission response. */
const mockedResponse: QuestionSubmissionResponse = {
  uuid: '123'
};

/**
 * Generates a mocked QuestionSubmissionService using the provided response.
 *
 * @param respose - The QuestionSubmissionResponse to return for all requests. If one is not
 * provided, a default will be used.
 */
export function generateMockedQuestionSubmissionService(
  respose?: QuestionSubmissionResponse): QuestionSubmissionService
{
  return {
    submitQuestion: (request: QuestionSubmissionRequest) => {
      const response = respose ? respose : mockedResponse;
      return Promise.resolve(response);
    }
  };
}

export const MockedQuestionSubmissionService: QuestionSubmissionService =
  generateMockedQuestionSubmissionService();