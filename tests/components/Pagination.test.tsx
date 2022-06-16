import { render, screen, within } from '@testing-library/react';
import { VerticalResults, VerticalResultsProps } from '../../src/components/VerticalResults';
import { State, VerticalSearchState } from '@yext/answers-headless-react';
import { StandardCard } from '../../src/components/cards/standard/StandardCard';
import { spyOnActions, mockAnswersState, mockAnswersHooks } from '../__utils__/mocks';
import { mockedVerticalResults } from '../__fixtures__/data/verticalresults';
import userEvent from '@testing-library/user-event';

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

it('Don\'t display pagination component when allowPagination is false', () => {
  const verticalResultsProps: VerticalResultsProps = {
    CardComponent: StandardCard,
    allowPagination: false
  };
  render(<VerticalResults {...verticalResultsProps} />);
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
  render(<VerticalResults {...verticalResultsProps} />);
  const paginationNavEl = screen.queryByRole('navigation', { name: 'Pagination' });
  expect(paginationNavEl).toBeNull();
});

it('Pagination component is displayed without ellipses label', () => {
  const verticalResultsProps: VerticalResultsProps = {
    CardComponent: StandardCard,
    allowPagination: true
  };
  const mockedVerticalSearchState: VerticalSearchState = {
    results: [mockedVerticalResults[0]],
    resultsCount: 3,
    verticalKey: 'vertical',
    limit: 1,
    offset: 0
  };
  mockVerticalSearchState(mockedVerticalSearchState);
  render(<VerticalResults {...verticalResultsProps} />);
  const paginationNavEl = screen.getByRole('navigation', { name: 'Pagination' });
  expect(paginationNavEl).toBeDefined();
  const totalPaginationButtons = within(paginationNavEl).queryAllByRole('button').length;
  const numIconNavButtons = 2;
  const numLabelNavButtons = mockedVerticalSearchState.resultsCount;
  expect(totalPaginationButtons - numIconNavButtons).toEqual(numLabelNavButtons);
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
    results: [mockedVerticalResults[0]],
    resultsCount: 5,
    verticalKey: 'vertical',
    limit: 1,
    offset: 0
  };
  mockVerticalSearchState(mockedVerticalSearchState);
  render(<VerticalResults {...verticalResultsProps} />);
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
    results: [mockedVerticalResults[0]],
    resultsCount: 5,
    verticalKey: 'vertical',
    limit: 1,
    offset: 0
  };
  mockVerticalSearchState(mockedVerticalSearchState);
  const actions = spyOnActions();
  render(<VerticalResults {...verticalResultsProps} />);

  const paginationNavEl = screen.getByRole('navigation', { name: 'Pagination' });
  expect(paginationNavEl).toBeDefined();

  // navigate to the last results page
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const lastResultsPage: number = mockedVerticalSearchState.resultsCount!;
  userEvent.click(screen.getByText(`${lastResultsPage}`));
  expect(actions.setOffset).toHaveBeenCalledWith(lastResultsPage - 1);
  expect(actions.executeVerticalQuery).toHaveBeenCalledTimes(1);
});


function mockVerticalSearchState(vertical: VerticalSearchState) {
  return mockAnswersState({
    ...mockedState,
    vertical
  });
}
