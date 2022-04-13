import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext, Source } from '@yext/answers-headless-react';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { VerticalResults, VerticalResultsProps } from '../../src/components/VerticalResults';
import { StandardCard } from '../../src/components/cards/StandardCard';

const meta: ComponentMeta<typeof VerticalResults> = {
  title: 'VerticalResults',
  component: VerticalResults,
};
export default meta;

const mockedHeadlessState = {
  vertical: {
    results: [
      {
        rawData: {
          name: 'title1',
          description: 'text1',
          c_primaryCTA: {
            link: 'link1',
            label: 'job1',
            linkType: 'link'
          },
          c_secondaryCTA: {
            link: 'link2',
            label: 'job2',
            linkType: 'link'
          }
        },
        source: Source.KnowledgeManager,
        id: 'id1'
      }
    ],
    resultsCount: 5,
    limit: 1
  }
};

export const NoResults = () => {
  const verticalResultsProps: VerticalResultsProps = {
    CardComponent: StandardCard
  };
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({})}>
      <VerticalResults {...verticalResultsProps} />
    </AnswersHeadlessContext.Provider>
  );
};

export const HasResultsWithoutPagination = () => {
  const verticalResultsProps: VerticalResultsProps = {
    CardComponent: StandardCard,
    allowPagination: false
  };
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <VerticalResults {...verticalResultsProps} />
    </AnswersHeadlessContext.Provider>
  );
};

export const HasResultsWithPagination = () => {
  const verticalResultsProps: VerticalResultsProps = {
    CardComponent: StandardCard,
    allowPagination: true
  };
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <VerticalResults {...verticalResultsProps} />
    </AnswersHeadlessContext.Provider>
  );
};

export const Loading = () => {
  const verticalResultsProps: VerticalResultsProps = {
    CardComponent: StandardCard
  };
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...mockedHeadlessState,
      searchStatus: { isLoading: true }
    })}>
      <VerticalResults {...verticalResultsProps} />
    </AnswersHeadlessContext.Provider>
  );
};
