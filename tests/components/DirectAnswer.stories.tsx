import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

import { DirectAnswer } from '../../src/components/DirectAnswer';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { featuredSnippetDAState, fieldValueDAState } from './DirectAnswer.fixtures';

export default {
  title: 'DirectAnswer',
  component: DirectAnswer,
} as ComponentMeta<typeof DirectAnswer>;

export const FieldValue = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      directAnswer: fieldValueDAState
    })}>
      <DirectAnswer />
    </AnswersHeadlessContext.Provider>
  );
};

export const FeaturedSnippet = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      directAnswer: featuredSnippetDAState
    })}>
      <DirectAnswer />
    </AnswersHeadlessContext.Provider>
  );
};
