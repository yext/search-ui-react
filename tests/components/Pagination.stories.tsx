import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext } from '@yext/answers-headless-react';

import { Pagination } from '../../src/components/Pagination';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';

const meta: ComponentMeta<typeof Pagination> = {
  title: 'Pagination',
  component: Pagination,
};
export default meta;

export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 7,
        limit: 1
      }
    })}>
      <Pagination />
    </AnswersHeadlessContext.Provider>
  );
};

export const PaginateAllOnNoResults = () => {
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
      <Pagination paginateAllOnNoResults={true} />
    </AnswersHeadlessContext.Provider>
  );
};

export const OnMidPageWithEllipses = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 10,
        limit: 1,
        offset: 4
      }
    })}>
      <Pagination />
    </AnswersHeadlessContext.Provider>
  );
};

export const OnMidPage = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 7,
        limit: 1,
        offset: 3
      }
    })}>
      <Pagination />
    </AnswersHeadlessContext.Provider>
  );
};

export const OnLastPage = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      vertical: {
        resultsCount: 7,
        limit: 1,
        offset: 6
      }
    })}>
      <Pagination />
    </AnswersHeadlessContext.Provider>
  );
};

export const Loading = () => {
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
      <Pagination />
    </AnswersHeadlessContext.Provider>
  );
};
