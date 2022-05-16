import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

import { Pagination, PaginationProps } from '../../src/components/Pagination';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';

const meta: ComponentMeta<typeof Pagination> = {
  title: 'Pagination',
  component: Pagination,
};
export default meta;

export const Primary = (args: PaginationProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 7,
        limit: 1
      }
    })}>
      <Pagination {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const PaginateAllOnNoResults = (args: PaginationProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
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
      <Pagination paginateAllOnNoResults={true} {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const OnMidPageWithEllipses = (args: PaginationProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 10,
        limit: 1,
        offset: 4
      }
    })}>
      <Pagination {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const OnMidPage = (args: PaginationProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 7,
        limit: 1,
        offset: 3
      }
    })}>
      <Pagination {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const OnLastPage = (args: PaginationProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 7,
        limit: 1,
        offset: 6
      }
    })}>
      <Pagination {...args} />
    </AnswersHeadlessContext.Provider>
  );
};

export const Loading = (args: PaginationProps) => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
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
    </AnswersHeadlessContext.Provider>
  );
};
