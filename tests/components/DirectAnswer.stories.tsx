import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

import { DirectAnswer, DirectAnswerProps } from '../../src/components/DirectAnswer';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { featuredSnippetDAState, fieldValueDAState } from '../__fixtures__/data/directanswers';

const meta: ComponentMeta<typeof DirectAnswer> = {
  title: 'DirectAnswer',
  component: DirectAnswer,
};
export default meta;

export const FieldValue = (args: DirectAnswerProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      directAnswer: fieldValueDAState
    })}>
      <DirectAnswer {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const FeaturedSnippet = (args: DirectAnswerProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      directAnswer: featuredSnippetDAState
    })}>
      <DirectAnswer {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const Loading = (args: DirectAnswerProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      directAnswer: featuredSnippetDAState,
      searchStatus: { isLoading: true }
    })}>
      <DirectAnswer {...args} />
    </AnswersHeadlessContext.Provider>
  );
};
