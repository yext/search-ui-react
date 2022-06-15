import { Source, State } from '@yext/answers-headless-react';
import { render, screen } from '@testing-library/react';
import { ResultsCount } from '../../src/components/ResultsCount';
import { mockAnswersState } from '../__utils__/mocks';


const mockedStateUniversal: Partial<State> = {
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'universal'
  },
  universal: {
    verticals: [{
      appliedQueryFilters: [],
      queryDurationMillis: 2,
      results: [],
      resultsCount: 2,
      source: Source.Google,
      verticalKey: 'string'
    },

    {
      appliedQueryFilters: [],
      queryDurationMillis: 2,
      results: [],
      resultsCount: 3,
      source: Source.Google,
      verticalKey: 'string'
    }
    ] }
};

const mockedStateVertical: Partial<State> = {
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'vertical'
  },
  vertical: {
    resultsCount: 2
  }
};

const mockedStateNoResult: Partial<State> = {
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'vertical'
  },
  vertical: {
    resultsCount: 0
  }
};

jest.mock('@yext/answers-headless-react');

describe('ResultsCount', () => {
  describe('Result count for vertical search', () => {
    beforeEach(() => {
      mockAnswersState(mockedStateVertical);
    });

    it('Results count for vertical search is displayed correctly', () => {
      render(<ResultsCount />);
      const expectedResultsCountNumber = mockedStateVertical.vertical.resultsCount;
      expect(screen.getByText(expectedResultsCountNumber + ' Results')).toBeDefined();
    });
  });

  describe('Results count for universal search', () => {
    beforeEach(() => {
      mockAnswersState(mockedStateUniversal);
    });

    it('Results count for universal search is displayed correctly', () => {
      render(<ResultsCount />);
      let expectedResultsCountNumber = 0;
      const results = mockedStateUniversal.universal.verticals;
      results.forEach(resultsOfAVertical => expectedResultsCountNumber += resultsOfAVertical.resultsCount);
      expect(screen.getByText(expectedResultsCountNumber + ' Results')).toBeDefined();
    });
  });

  it('Renders nothing if there is no results' , () => {
    mockAnswersState(mockedStateNoResult);
    render(<ResultsCount />);
    const expectedResultsCountNumber = mockedStateNoResult.vertical.resultsCount;
    expect(screen.queryByText(expectedResultsCountNumber + ' Results')).toBeNull();
  });
});