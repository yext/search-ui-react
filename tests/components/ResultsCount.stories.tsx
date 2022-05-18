import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

import { ResultsCount, ResultsCountProps } from '../../src/components/ResultsCount';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';

const meta: ComponentMeta<typeof ResultsCount> = {
  title: 'ResultsCount',
  component: ResultsCount,
};
export default meta;

export const Primary = (args: ResultsCountProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 5
      }
    })}>
      <ResultsCount {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const Loading = (args: ResultsCountProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 5
      },
      searchStatus: {
        isLoading: true
      }
    })}>
      <ResultsCount {...args} />
    </AnswersHeadlessContext.Provider>
  );
};
