import { Meta, StoryFn } from '@storybook/react';
import { SearchHeadlessContext, State } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { GenerativeDirectAnswer, GenerativeDirectAnswerProps } from '../../src/components/GenerativeDirectAnswer';
import { RecursivePartial } from '../__utils__/mocks';
import { verticalResults } from '../__fixtures__/data/universalresults';
import { generativeDirectAnswerResponse } from '../__fixtures__/data/generativeDirectAnswer';
import React from 'react';

const meta: Meta<typeof GenerativeDirectAnswer> = {
  title: 'GenerativeDirectAnswer',
  component: GenerativeDirectAnswer,
  args: {
    answerHeader: 'Answer Title',
    citationsHeader: 'Citation Title',
  }
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  universal: {
    verticals: verticalResults
  },
  generativeDirectAnswer: {
    isLoading: false,
    response: generativeDirectAnswerResponse
  }
};

export const Primary: StoryFn<GenerativeDirectAnswerProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <GenerativeDirectAnswer {...args} />
    </SearchHeadlessContext.Provider>
  );
};
