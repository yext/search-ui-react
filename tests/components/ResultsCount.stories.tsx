import { Meta, StoryFn } from '@storybook/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';

import { ResultsCount, ResultsCountProps } from '../../src/components/ResultsCount';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';
import React, { useMemo } from 'react';

const meta: Meta<typeof ResultsCount> = {
  title: 'ResultsCount',
  component: ResultsCount,
};
export default meta;

export const Primary: StoryFn<ResultsCountProps> = (args) => {
  const headless = useMemo(() => generateMockedHeadless({
    ...VerticalSearcherState,
    vertical: { resultsCount: 5 },
  }), []);
  return (
    <SearchHeadlessContext.Provider value={headless}>
      <ResultsCount {...args} />
    </SearchHeadlessContext.Provider>
  );
};


export const PaginationRange: StoryFn<ResultsCountProps> = (args) => {
  const headless = useMemo(() => generateMockedHeadless({
    ...VerticalSearcherState,
    vertical: {
      resultsCount: 30
    }
  }), []);
  return (
    <SearchHeadlessContext.Provider value={headless}>
      <ResultsCount {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const Loading: StoryFn<ResultsCountProps> = (args) => {
  const headless = useMemo(() => generateMockedHeadless({
    ...VerticalSearcherState,
    vertical: {
      resultsCount: 5
    },
    searchStatus: {
      isLoading: true
    }
  }), []);
  return (
    <SearchHeadlessContext.Provider value={headless}>
      <ResultsCount {...args} />
    </SearchHeadlessContext.Provider>
  );
};
