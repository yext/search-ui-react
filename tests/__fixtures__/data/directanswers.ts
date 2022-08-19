import { BuiltInFieldType, DirectAnswerState, DirectAnswerType, Source } from '@yext/search-headless-react';

export const featuredSnippetDAState: DirectAnswerState = {
  result: {
    type: DirectAnswerType.FeaturedSnippet,
    snippet: {
      value: '[snippet.value]',
      matchedSubstrings: [{ length: 4, offset: 1 }]
    },
    verticalKey: '[verticalKey]',
    value: '[value]',
    relatedResult: {
      link: '[relatedResult.link]',
      name: '[relatedResult.name]',
      id: '[relatedResult.id]',
      rawData: {},
      source: Source.KnowledgeManager
    },
    fieldType: 'multi_line_text'
  }
};

export const fieldValueDAState: DirectAnswerState = {
  result: {
    type: DirectAnswerType.FieldValue,
    entityName: '[entityName]',
    fieldName: '[fieldName]',
    fieldType: BuiltInFieldType.SingleLineText,
    fieldApiName: '[fieldApiName]',
    verticalKey: '[verticalKey]',
    value: '[value]',
    relatedResult: {
      link: '[relatedResult.link]',
      id: '[relatedResult.id]',
      rawData: {},
      source: Source.KnowledgeManager
    }
  }
};