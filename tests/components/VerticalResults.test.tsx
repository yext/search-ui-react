import { render, screen, within } from '@testing-library/react';
import { VerticalResults, VerticalResultsProps } from '../../src/components/VerticalResults';
import { State, Source, VerticalSearchState } from '@yext/answers-headless-react';
import { StandardCard } from '../../src/components/cards/StandardCard';
import { spyOnActions, mockAnswersState } from '../__utils__/mocks';
import userEvent from '@testing-library/user-event';

const ctas = {
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
};

const mockedResults = [
  {
    rawData: {
      name: 'title1',
      description: 'text1',
      ...ctas
    },
    source: Source.KnowledgeManager,
    id: 'id1'
  },
  {
    rawData: {
      name: 'title2',
      description: 'text2',
      ...ctas
    },
    source: Source.KnowledgeManager,
    id: 'id2'
  },
  {
    rawData: {
      name: 'title3',
      description: 'text3',
      ...ctas
    },
    source: Source.KnowledgeManager,
    id: 'id3'
  }
];

const mockedState: Partial<State> = {
  vertical: {
    verticalKey: 'vertical',
    results: mockedResults,
    resultsCount: mockedResults.length,
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

jest.mock('@yext/answers-headless-react', () => {
  const originalModule = jest.requireActual('@yext/answers-headless-react');
  return {
    __esModule: true,
    ...originalModule,
    useAnswersState: accessor => accessor(mockedState),
    useAnswersActions: () => {
      return {
        setOffset: jest.fn()
      };
    }
  };
});

jest.mock('../../src/utils/search-operations', () => ({
  __esModule: true,
  executeSearch: jest.fn()
}));

describe('VerticalResults', () => {
  it('Results are displayed', () => {
    const verticalResultsProps: VerticalResultsProps = {
      CardComponent: StandardCard
    };
    render(<VerticalResults {...verticalResultsProps}/>);
    mockedState.vertical.results.forEach(result =>
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
        results: mockedResults,
        resultsCount: mockedResults.length
      },
      alternativeVerticals: []
    };
    mockVerticalSearchState({
      noResults: mockedNoResults
    });
    render(<VerticalResults {...verticalResultsProps}/>);
    mockedNoResults.allResultsForVertical.results.forEach(result =>
      expect(screen.getByText(result.rawData.name as string)).toBeDefined()
    );
  });
});

describe('Pagination', () => {
  it('Don\'t display pagination component when allowPagination is false', () => {
    const verticalResultsProps: VerticalResultsProps = {
      CardComponent: StandardCard,
      allowPagination: false
    };
    render(<VerticalResults {...verticalResultsProps}/>);
    const paginationNavEl = screen.queryByRole('navigation', { name: 'Pagination' });
    expect(paginationNavEl).toBeNull();
  });

  it('Don\'t display pagination component when there\'s no results', () => {
    const verticalResultsProps: VerticalResultsProps = {
      CardComponent: StandardCard,
      allowPagination: true,
    };
    mockVerticalSearchState({
      results: [],
      resultsCount: 0
    });
    render(<VerticalResults {...verticalResultsProps}/>);
    const paginationNavEl = screen.queryByRole('navigation', { name: 'Pagination' });
    expect(paginationNavEl).toBeNull();
  });

  it('Pagination component is displayed without ellipses label', () => {
    const verticalResultsProps: VerticalResultsProps = {
      CardComponent: StandardCard,
      allowPagination: true
    };
    const mockedVerticalSearchState: VerticalSearchState = {
      results: [mockedResults[0]],
      resultsCount: 3,
      verticalKey: 'vertical',
      limit: 1,
      offset: 0
    };
    mockVerticalSearchState(mockedVerticalSearchState);
    render(<VerticalResults {...verticalResultsProps}/>);
    const paginationNavEl = screen.getByRole('navigation', { name: 'Pagination' });
    expect(paginationNavEl).toBeDefined();
    const totalPaginationButtons = within(paginationNavEl).queryAllByRole('button').length;
    const numIconNavButtons = 2;
    const numLabelNavButtons = mockedVerticalSearchState.resultsCount;
    expect(totalPaginationButtons).toEqual(numIconNavButtons + numLabelNavButtons);
  });

  it('Pagination component is displayed with ellipses label', () => {
    const verticalResultsProps: VerticalResultsProps = {
      CardComponent: StandardCard,
      allowPagination: true,
      customCssClasses: {
        leftIconContainer: 'leftNavButton',
        rightIconContainer: 'rightNavButton'
      }
    };
    const mockedVerticalSearchState: VerticalSearchState = {
      results: [mockedResults[0]],
      resultsCount: 5,
      verticalKey: 'vertical',
      limit: 1,
      offset: 0
    };
    mockVerticalSearchState(mockedVerticalSearchState);
    render(<VerticalResults {...verticalResultsProps}/>);
    const paginationNavEl = screen.getByRole('navigation', { name: 'Pagination' });
    expect(paginationNavEl).toBeDefined();
    const paginationButtons = within(paginationNavEl).queryAllByRole('button');
    const numIconNavButtons = 2;
    const numLabelNavButtons = 3;
    // expected pagination layout with n results: [<] [1] [2] [...] [n] [>]
    expect(paginationButtons.length).toEqual(numIconNavButtons + numLabelNavButtons);
    expect(paginationButtons[0].classList.contains('leftNavButton')).toBeTruthy();
    expect(paginationButtons[1].textContent).toEqual('1');
    expect(paginationButtons[2].textContent).toEqual('2');
    expect(paginationButtons[3].textContent).toEqual(`${mockedVerticalSearchState.resultsCount}`);
    expect(paginationButtons[4].classList.contains('rightNavButton')).toBeTruthy();
    expect(screen.getByText('...')).toBeDefined();
  });

  it('Pagination component navigation buttons trigger new search', () => {
    const verticalResultsProps: VerticalResultsProps = {
      CardComponent: StandardCard,
      allowPagination: true
    };
    const mockedVerticalSearchState: VerticalSearchState = {
      results: [mockedResults[0]],
      resultsCount: 5,
      verticalKey: 'vertical',
      limit: 1,
      offset: 0
    };
    mockVerticalSearchState(mockedVerticalSearchState);
    const actions = spyOnActions();
    render(<VerticalResults {...verticalResultsProps}/>);

    const paginationNavEl = screen.getByRole('navigation', { name: 'Pagination' });
    expect(paginationNavEl).toBeDefined();
    const executeSearch = jest.spyOn(require('../../src/utils/search-operations'), 'executeSearch');

    // navigate to the last results page
    userEvent.click(screen.getByText(`${mockedVerticalSearchState.resultsCount}`));
    expect(actions.setOffset).toHaveBeenCalledWith(mockedVerticalSearchState.resultsCount - 1);
    expect(executeSearch).toHaveBeenCalledTimes(1);
  });
});

function mockVerticalSearchState(vertical: VerticalSearchState) {
  return mockAnswersState({
    ...mockedState,
    vertical
  });
}
