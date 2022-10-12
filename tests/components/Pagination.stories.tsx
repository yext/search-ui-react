import { ComponentMeta, Story } from '@storybook/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';

import { Pagination, PaginationProps } from '../../src/components/Pagination';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';

const meta: ComponentMeta<typeof Pagination> = {
  title: 'Pagination',
  component: Pagination,
};
export default meta;

export const Primary: Story<PaginationProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 7,
        limit: 1
      }
    })}>
      <Pagination {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const PaginateAllOnNoResults: Story<PaginationProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 0,
        noResults: {
          allResultsForVertical: {
            resultsCount: 550
          }
        }
      }
    })}>
      <Pagination {...args} />
    </SearchHeadlessContext.Provider>
  );
};
PaginateAllOnNoResults.args = {
  paginateAllOnNoResults: true
};

export const OnMidPageWithEllipses: Story<PaginationProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 10,
        limit: 1,
        offset: 4
      }
    })}>
      <Pagination {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const OnMidPage: Story<PaginationProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 7,
        limit: 1,
        offset: 3
      }
    })}>
      <Pagination {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const OnLastPage: Story<PaginationProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 7,
        limit: 1,
        offset: 6
      }
    })}>
      <Pagination {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const Loading: Story<PaginationProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 7,
        limit: 1
      },
      searchStatus: {
        isLoading: true
      }
    })}>
      <Pagination {...args} />
    </SearchHeadlessContext.Provider>
  );
};
