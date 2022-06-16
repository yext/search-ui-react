import { render, screen } from '@testing-library/react';
import { VerticalResults, VerticalResultsProps } from '../../src/components/VerticalResults';
import { State, VerticalSearchState } from '@yext/answers-headless-react';
import { StandardCard } from '../../src/components/cards/standard/StandardCard';
import { mockAnswersState, mockAnswersHooks } from '../__utils__/mocks';
import { mockedVerticalResults } from '../__fixtures__/data/verticalresults';

const mockedState: Partial<State> = {
  vertical: {
    verticalKey: 'vertical',
    results: mockedVerticalResults,
    resultsCount: mockedVerticalResults.length,
    offset: 0
  },
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'vertical'
  },
  query: {}
};

const mockedActions = {
  state: mockedState,
  setOffset: jest.fn(),
  executeVerticalQuery: jest.fn()
};

jest.mock('@yext/answers-headless-react');

beforeEach(() => {
  mockAnswersHooks({ mockedState, mockedActions });
});

it('Results are displayed', () => {
  const verticalResultsProps: VerticalResultsProps = {
    CardComponent: StandardCard
  };
  render(<VerticalResults {...verticalResultsProps} />);
  mockedState.vertical?.results?.forEach(result =>
    expect(screen.getByText(result.rawData.name as string)).toBeDefined()
  );
});

it('All results are displayed when there\'s no result correspond to the search', () => {
  const verticalResultsProps: VerticalResultsProps = {
    CardComponent: StandardCard,
    displayAllOnNoResults: true
  };
  const mockedNoResults = {
    allResultsForVertical: {
      facets: [],
      results: mockedVerticalResults,
      resultsCount: mockedVerticalResults.length
    },
    alternativeVerticals: []
  };
  mockVerticalSearchState({
    noResults: mockedNoResults
  });
  render(<VerticalResults {...verticalResultsProps} />);
  mockedNoResults.allResultsForVertical.results.forEach(result =>
    expect(screen.getByText(result.rawData.name as string)).toBeDefined()
  );
});

function mockVerticalSearchState(vertical: VerticalSearchState) {
  return mockAnswersState({
    ...mockedState,
    vertical
  });
}
