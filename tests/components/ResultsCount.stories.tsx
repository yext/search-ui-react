import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

import { ResultsCount } from '../../src/components/ResultsCount';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';

const meta: ComponentMeta<typeof ResultsCount> = {
  title: 'ResultsCount',
  component: ResultsCount,
};
export default meta;

export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 5
      }
    })}>
      <ResultsCount />
    </AnswersHeadlessContext.Provider>
  );
};

export const Loading = () => {
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
      <ResultsCount />
    </AnswersHeadlessContext.Provider>
  );
};
