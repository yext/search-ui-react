import React from 'react';
import { render } from '@testing-library/react';

import { UniversalResults } from '../../src/components/UniversalResults';

import { Matcher, Source, State, VerticalResults } from '@yext/answers-headless-react';
import { CtaData } from '../../src/components/cards/StandardCard';

const mockedVertical1: VerticalResults = {
  appliedQueryFilters: [{
    displayKey: 'Job Category',
    displayValue: 'Sales',
    filter: {
      fieldId: 'c_jobCategory',
      matcher: Matcher.Equals,
      value: 'Sales'
    }
  }],
  queryDurationMillis: 500,
  results: [{
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
    source: Source.KnowledgeManager
  }, {
    rawData: {
      name: 'title2',
      description: 'text2'
    },
    source: Source.KnowledgeManager
  }],
  resultsCount: 2,
  source: Source.KnowledgeManager,
  verticalKey: 'vertical1'
}

const mockedVertical2: VerticalResults = {
  appliedQueryFilters: [],
  queryDurationMillis: 500,
  results: [{
    rawData: {
      name: 'title3',
      description: 'text3'
    },
    source: Source.KnowledgeManager
  }],
  resultsCount: 1,
  source: Source.KnowledgeManager,
  verticalKey: 'vertical2'
}

const mockedVertical3: VerticalResults = {
  appliedQueryFilters: [],
  queryDurationMillis: 500,
  results: [],
  resultsCount: 0,
  source: Source.KnowledgeManager,
  verticalKey: 'vertical3'
}

const mockedState: Partial<State> = {
  universal: {
    verticals: [
      mockedVertical1,
      mockedVertical2,
      mockedVertical3
    ]
  },
  query: {
    mostRecentSearch: 'test'
  },
  vertical: {},
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'universal'
  }
};

jest.mock('@yext/answers-headless-react', () => ({
  __esModule: true,
  useAnswersState: accessor => accessor(mockedState),
  useAnswersActions: () => {},
  SearchTypeEnum: {
    Vertical: 'vertical',
    Universal: 'universal'
  },
  Source: {
    KnowledgeManager: 'KNOWLEDGE_MANAGER'
  },
  Matcher: {
    Equals: '$eq'
  }
}));

describe('UniversalResults', () => {
  it('Results are displayed', () => {
    const { getByText, queryByText } = render(<UniversalResults verticalConfigMap={{}} />);
    const verticals = mockedState.universal.verticals;
    expect(getByText(verticals[0].verticalKey)).toBeDefined();
    expect(getByText(verticals[1].verticalKey)).toBeDefined();
    expect(queryByText(verticals[2].verticalKey)).toBeNull();

    expect(queryByText(verticals[0].appliedQueryFilters[0].displayValue)).toBeNull();

    function checkResultData(resultData: Record<string, unknown>, hasCtas?: boolean) {
      expect(getByText(resultData.name.toString())).toBeDefined();
      expect(getByText(resultData.description.toString())).toBeDefined();
      if (hasCtas) {
        const cta1 = resultData.c_primaryCTA as CtaData;
        const cta2 = resultData.c_secondaryCTA as CtaData;
        expect(getByText(cta1.label)).toBeDefined();
        expect(getByText(cta2.label)).toBeDefined();
      }
    }

    checkResultData(verticals[0].results[0].rawData, true);
    checkResultData(verticals[0].results[1].rawData);
    checkResultData(verticals[1].results[0].rawData);
  });

  it('Vertical label is used when specified', () => {
    const { getByText, queryByText } = render(<UniversalResults verticalConfigMap={{ vertical1: { label: 'Jobs' } }} />);
    expect(getByText('Jobs')).toBeDefined();
    expect(queryByText(mockedState.universal.verticals[0].verticalKey)).toBeNull();
  });

  it('View all button is displayed only when specified', () => {
    const { getAllByText } = render(<UniversalResults verticalConfigMap={{ vertical1: { viewAllButton: true } }} />);
    expect(getAllByText('View all')).toHaveLength(1);
  });

  it('View all button uses getViewAllUrl when specified to set the link', () => {
    const { getAllByRole } = render(<UniversalResults verticalConfigMap={{
      vertical1: { viewAllButton: true },
      vertical2: {
        viewAllButton: true,
        getViewAllUrl: (data) => {
          return `/${data.verticalKey}?input=${data.query}`;
        }
      }
    }} />);
    const links = getAllByRole('link');
    expect(links[0].getAttribute('href')).toBe('/vertical1?query=test');
    expect(links[1].getAttribute('href')).toBe('/vertical2?input=test');
  });

  it('Applied filters are displayed when specified', () => {
    const { getByText } = render(<UniversalResults verticalConfigMap={{}} showAppliedFilters={true} />);
    const filters = mockedState.universal.verticals[0].appliedQueryFilters;
    expect(getByText(filters[0].displayValue)).toBeDefined();
  });
});
