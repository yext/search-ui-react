import { render, screen } from '@testing-library/react';
import { AnswersHeadless, FacetOption, NumberRangeValue, Source, State } from '@yext/answers-headless-react';
import { mockAnswersHooks, spyOnActions } from '../__utils__/mocks';
import userEvent from '@testing-library/user-event';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { NumericalFacets } from '../../src/components';

const mockedState: Partial<State> = {
  filters: {
    static: [],
    facets: DisplayableFacets
  },
  vertical: {
    verticalKey: 'vertical',
    results: [{
      source: Source.KnowledgeManager,
      rawData: {}
    }],
    appliedQueryFilters: []
  },
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'vertical'
  }
};

const mockedActions = {
  state: mockedState,
  setOffset: jest.fn(),
  setFacetOption: jest.fn(),
  executeVerticalQuery: jest.fn()
};

const mockedUtils = {
  isCloseMatch: () => true
};

jest.mock('@yext/answers-headless-react');

describe('Facets', () => {
  beforeEach(() => {
    mockAnswersHooks({ mockedState, mockedActions, mockedUtils });
  });

  it('Properly renders number range facets only', () => {
    render(<NumericalFacets />);

    const regularFilter = DisplayableFacets[0];
    const numericalFilter = DisplayableFacets[1];

    expect(screen.getByText(numericalFilter.displayName)).toBeDefined();
    numericalFilter.options.forEach(o => {
      expect(screen.getByText(o.displayName)).toBeDefined();
    });

    expect(screen.queryByText(regularFilter.displayName)).toBeNull();
    regularFilter.options.forEach(o => {
      expect(screen.queryByText(o.displayName)).toBeNull();
    });
  });

  it('Clicking a selected number range facet option checkbox unselects it', () => {
    const actions = spyOnActions();
    render(<NumericalFacets />);

    const priceFacet = DisplayableFacets[1];
    const expensiveCheckbox: HTMLInputElement = screen.getByLabelText(priceFacet.options[0].displayName);
    expect(expensiveCheckbox.checked).toBeTruthy();

    userEvent.click(expensiveCheckbox);
    expectFacetOptionSet(actions, priceFacet.fieldId, priceFacet.options[0], false);
  });

  it('Clicking an unselected number range facet option checkbox selects it', () => {
    const actions = spyOnActions();
    render(<NumericalFacets />);

    const priceFacet = DisplayableFacets[1];
    const cheapCheckbox: HTMLInputElement = screen.getByLabelText(priceFacet.options[1].displayName);
    expect(cheapCheckbox.checked).toBeFalsy();

    userEvent.click(cheapCheckbox);
    expectFacetOptionSet(actions, priceFacet.fieldId, priceFacet.options[1], true);
  });

  // it('getFilterDisplayName field works as expected', () => {
  //   const getFilterDisplayName = (value: NumberRangeValue) => {
  //     return 'start-' + value.start.value + ' end-' + value.end.value;
  //   };

  //   render(<NumericalFacets getFilterDisplayName={getFilterDisplayName}/>);
  //   const priceFacet = DisplayableFacets[1];
  //   priceFacet.options.forEach(o => {
  //     const expectedDisplayName = getFilterDisplayName(o.value as NumberRangeValue);
  //     expect(screen.getByText(expectedDisplayName)).toBeDefined();
  //   });
  // });

  it('inputPrefix field works as expected', () => {
    render(<NumericalFacets inputPrefix={<>some prefix</>}/>);
    expect(screen.getAllByText('some prefix').length).toEqual(2);
  });
});

function expectFacetOptionSet(
  actions: AnswersHeadless,
  fieldId: string,
  option: FacetOption,
  selected: boolean
) {
  expect(actions.setFacetOption).toHaveBeenCalledWith(
    fieldId,
    { matcher: option.matcher, value: option.value },
    selected
  );
}
