import { ComponentMeta, Story } from '@storybook/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';

import { ResultsCount, ResultsCountProps } from '../../src/components/ResultsCount';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';

const meta: ComponentMeta<typeof ResultsCount> = {
  title: 'ResultsCount',
  component: ResultsCount,
};
export default meta;

export const Primary: Story<ResultsCountProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 5
      }
    })}>
      <ResultsCount {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const PaginationRange: Story<ResultsCountProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 30
      }
    })}>
      <ResultsCount {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const Loading: Story<ResultsCountProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 5
      },
      searchStatus: {
        isLoading: true
      }
    })}>
      <ResultsCount {...args} />
    </SearchHeadlessContext.Provider>
  );
};
