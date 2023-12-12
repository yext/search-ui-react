import { Meta, StoryFn } from '@storybook/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';

import { Pagination, PaginationProps } from '../../src/components/Pagination';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';
import React from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Pagination',
  component: Pagination,
};
export default meta;

export const Primary: StoryFn<PaginationProps> = (args) => {
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

export const PaginateAllOnNoResults: StoryFn<PaginationProps> = (args) => {
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

export const OnMidPageWithEllipses: StoryFn<PaginationProps> = (args) => {
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

export const OnMidPage: StoryFn<PaginationProps> = (args) => {
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

export const OnLastPage: StoryFn<PaginationProps> = (args) => {
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

export const Loading: StoryFn<PaginationProps> = (args) => {
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
