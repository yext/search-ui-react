import { GenerativeDirectAnswerResponse } from '@yext/search-headless-react';

export const generativeDirectAnswerText = 'answer text';
export const generativeDirectAnswerLink = 'answer-text-link';
export const generativeDirectAnswerResponse: GenerativeDirectAnswerResponse = {
  directAnswer: `[${generativeDirectAnswerText}](${generativeDirectAnswerLink})`,
  resultStatus: 'SUCCESS',
  citations: ['uid2', 'uid3']
};
