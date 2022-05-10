import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AllResultsForVertical, AnswersHeadlessContext, Source, VerticalResults } from '@yext/answers-headless-react';

import { AlternativeVerticals } from '../../src/components/AlternativeVerticals';

import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';

const meta: ComponentMeta<typeof AlternativeVerticals> = {
  title: 'AlternativeVerticals',
  component: AlternativeVerticals,
};
export default meta;

const alternativeVerticals: VerticalResults[] = [
  {
    verticalKey: 'events',
    source: Source.KnowledgeManager,
    resultsCount: 2,
    results: [{
      description: 'How to make coffee',
      name: 'Coffee Workshop',
      rawData: {},
      source: Source.KnowledgeManager,
    }, {
      description: 'How to taste coffee like a pro',
      name: 'Coffee Tasting',
      rawData: {},
      source: Source.KnowledgeManager,
    }],
    queryDurationMillis: 30,
    appliedQueryFilters: []
  },
  {
    verticalKey: 'faqs',
    source: Source.KnowledgeManager,
    resultsCount: 1,
    results: [{
      description: 'Lots and lots of cleaning.',
      name: 'What extra precautions are you taking for covid-19?',
      rawData: {},
      source: Source.KnowledgeManager,
    }],
    queryDurationMillis: 30,
    appliedQueryFilters: []
  }
];

const allResultsForVertical: AllResultsForVertical = {
  facets: [],
  results: [{
    name: 'Software Engineer',
    rawData: {},
    source: Source.KnowledgeManager,
    description: 'Create software for computers and applications'
  },
  {
    name: 'Product Manager',
    rawData: {},
    source: Source.KnowledgeManager,
    description: 'Identifies the customer need and product\'s objectives'
  }],
  resultsCount: 2
};

const mockedHeadlessState = {
  ...VerticalSearcherState,
  vertical: {
    noResults: {
      alternativeVerticals,
      allResultsForVertical
    }
  }
};

export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <AlternativeVerticals
        currentVerticalLabel='Jobs'
        verticalConfigMap={{
          faqs: { label: 'FAQs' },
          events: { label: 'Events' },
          locations: { label: 'Locations' }
        }}
        displayAllOnNoResults={false}
      />
    </AnswersHeadlessContext.Provider>
  );
};

export const DisplayAllOnNoResults = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <AlternativeVerticals
        currentVerticalLabel='Jobs'
        verticalConfigMap={{
          faqs: { label: 'FAQs' },
          events: { label: 'Events' },
          locations: { label: 'Locations' }
        }}
        displayAllOnNoResults={true}
      />
    </AnswersHeadlessContext.Provider>
  );
};


export const Loading = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...mockedHeadlessState,
      searchStatus: {
        isLoading: true
      }
    })}>
      <AlternativeVerticals
        currentVerticalLabel='Jobs'
        verticalConfigMap={{
          faqs: { label: 'FAQs' },
          events: { label: 'Events' },
          locations: { label: 'Locations' }
        }}
        displayAllOnNoResults={true}
      />
    </AnswersHeadlessContext.Provider>
  );
};
