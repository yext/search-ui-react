import { State } from '@yext/answers-headless-react';
import { render, screen } from '@testing-library/react';
import { ResultsCount } from '../../src/components/ResultsCount';
import { mockAnswersState } from '../__utils__/mocks';
import { RecursivePartial } from '../__utils__/mocks';

const mockedStateUniversalMultiple: RecursivePartial<State> = {
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'universal'
  },
  universal: {
    verticals: [{
      resultsCount: 2,
    },

    {
      resultsCount: 3,
    }
    ] }
};

const mockedStateUniversalSingle: RecursivePartial<State> = {
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'universal'
  },
  universal: {
    verticals: [{
      resultsCount: 1,
    }
    ] }
};

const mockedStateUniversalNoResult: RecursivePartial<State> = {
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'universal'
  },
  universal: {
    verticals: [{
      resultsCount: 0,
    }
    ] }
};

const mockedStateVerticalMultiple: Partial<State> = {
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

const mockedStateVerticalSingle: Partial<State> = {
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'vertical'
  },
  vertical: {
    resultsCount: 1
  }
};

const mockedStateVerticalNoResult: Partial<State> = {
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

describe('Result count for vertical search', () => {
  it('Results count is displayed correctly for multiple results', () => {
    mockAnswersState(mockedStateVerticalMultiple);
    render(<ResultsCount />);
    const expectedResultsCountNumber = mockedStateVerticalMultiple.vertical.resultsCount;
    expect(screen.getByText(expectedResultsCountNumber + ' Results')).toBeDefined();
  });

  it('Results count is displayed correctly for single result', () => {
    mockAnswersState(mockedStateVerticalSingle);
    render(<ResultsCount />);
    expect(screen.getByText('1 Result')).toBeDefined();
  });

  it('Renders nothing if there is no result', () => {
    mockAnswersState(mockedStateVerticalNoResult);
    render(<ResultsCount />);
    expect(screen.queryByText('0 Results')).toBeNull();
  });
});

describe('Results count for universal search', () => {
  it('Results count is displayed correctly for multiple results', () => {
    mockAnswersState(mockedStateUniversalMultiple);
    render(<ResultsCount />);
    let expectedResultsCountNumber = 0;
    const results = mockedStateUniversalMultiple.universal.verticals;
    results.forEach(resultsOfAVertical => expectedResultsCountNumber += resultsOfAVertical.resultsCount);
    expect(screen.getByText(expectedResultsCountNumber + ' Results')).toBeDefined();
  });

  it('Results count is displayed correctly for single result', () => {
    mockAnswersState(mockedStateUniversalSingle);
    render(<ResultsCount />);
    expect(screen.getByText('1 Result')).toBeDefined();
  });

  it('Renders nothing if there is no result', () => {
    mockAnswersState(mockedStateUniversalNoResult);
    render(<ResultsCount />);
    expect(screen.queryByText('0 Results')).toBeNull();
  });
});


