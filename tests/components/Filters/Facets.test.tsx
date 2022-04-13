import { render, screen } from '@testing-library/react';
import { AnswersHeadless, FacetOption, Source, State } from '@yext/answers-headless-react';
import { spyOnActions } from '../../__utils__/mocks';
import userEvent from '@testing-library/user-event';
import { DisplayableFacets } from '../../__fixtures__/data/filters';
import { Facets } from '../../__fixtures__/components/Filters/Facets';

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

jest.mock('@yext/answers-headless-react', () => {
  const originalModule = jest.requireActual('@yext/answers-headless-react');
  return {
    __esModule: true,
    ...originalModule,
    useAnswersState: accessor => accessor(mockedState),
    useAnswersActions: () => {
      return {
        setOffset: jest.fn(),
        setFacetOption: jest.fn()
      };
    },
    useAnswersUtilities: () => {
      return {
        isCloseMatch: jest.fn(() => true)
      };
    }
  };
});

const mockedSearch = jest.fn();

jest.mock('../../../src/utils/search-operations', () => ({
  __esModule: true,
  executeSearch: () => mockedSearch()
}));

describe('Facets', () => {
  it('Properly renders regular and number range facets', () => {
    render(<Facets />);

    DisplayableFacets.forEach(f => {
      expect(screen.getByText(f.displayName)).toBeDefined();
      f.options.forEach(o => {
        expect(screen.getByText(o.displayName)).toBeDefined();
      });
    });
  });

  it('Clicking an unselected facet option checkbox selects it', () => {
    const actions = spyOnActions();
    render(<Facets />);

    const productFacet = DisplayableFacets[0];
    const coffeeCheckbox: HTMLInputElement = screen.getByLabelText(productFacet.options[0].displayName);
    expect(coffeeCheckbox.checked).toBeFalsy();

    userEvent.click(coffeeCheckbox);
    expectFacetOptionSet(actions, productFacet.fieldId, productFacet.options[0], true);
  });

  it('Clicking an unselected facet option label selects it', () => {
    const actions = spyOnActions();
    render(<Facets />);

    const productFacet = DisplayableFacets[0];
    const coffeeFacetOption = productFacet.options[0];
    const coffeeCheckbox: HTMLInputElement = screen.getByLabelText(coffeeFacetOption.displayName);
    expect(coffeeCheckbox.checked).toBeFalsy();

    const coffeeLabel = screen.getByText(coffeeFacetOption.displayName);
    userEvent.click(coffeeLabel);
    expectFacetOptionSet(actions, productFacet.fieldId, coffeeFacetOption, true);
  });

  it('Clicking an unselected number range facet option checkbox selects it', () => {
    const actions = spyOnActions();
    render(<Facets />);

    const priceFacet = DisplayableFacets[1];
    const cheapCheckbox: HTMLInputElement = screen.getByLabelText(priceFacet.options[1].displayName);
    expect(cheapCheckbox.checked).toBeFalsy();

    userEvent.click(cheapCheckbox);
    expectFacetOptionSet(actions, priceFacet.fieldId, priceFacet.options[1], true);
  });

  it('Clicking a selected facet option checkbox unselects it', () => {
    const actions = spyOnActions();
    render(<Facets />);

    const productFacet = DisplayableFacets[0];
    const teaCheckbox: HTMLInputElement = screen.getByLabelText(productFacet.options[1].displayName);
    expect(teaCheckbox.checked).toBeTruthy();

    userEvent.click(teaCheckbox);
    expectFacetOptionSet(actions, productFacet.fieldId, productFacet.options[1], false);
  });

  it('Clicking a selected number range facet option checkbox unselects it', () => {
    const actions = spyOnActions();
    render(<Facets />);

    const priceFacet = DisplayableFacets[1];
    const expensiveCheckbox: HTMLInputElement = screen.getByLabelText(priceFacet.options[0].displayName);
    expect(expensiveCheckbox.checked).toBeTruthy();

    userEvent.click(expensiveCheckbox);
    expectFacetOptionSet(actions, priceFacet.fieldId, priceFacet.options[0], false);
  });

  it('Clicking a facet option executes a search when searchOnChange is true', () => {
    const actions = spyOnActions();
    render(<Facets />);

    const productFacet = DisplayableFacets[0];
    const coffeeCheckbox: HTMLInputElement = screen.getByLabelText(productFacet.options[0].displayName);
    expect(coffeeCheckbox.checked).toBeFalsy();

    userEvent.click(coffeeCheckbox);
    expectFacetOptionSet(actions, productFacet.fieldId, productFacet.options[0], true);
    expect(mockedSearch).toBeCalled();
  });

  it('Only clicking the apply button executes a search when searchOnChange is false', () => {
    const actions = spyOnActions();
    render(<Facets searchOnChange={false} />);

    const productFacet = DisplayableFacets[0];
    const coffeeCheckbox: HTMLInputElement = screen.getByLabelText(productFacet.options[0].displayName);
    expect(coffeeCheckbox.checked).toBeFalsy();

    userEvent.click(coffeeCheckbox);
    expectFacetOptionSet(actions, productFacet.fieldId, productFacet.options[0], true);
    expect(mockedSearch).toBeCalledTimes(0);

    const applyButton = screen.getAllByRole('button', { name: 'Apply Filters' })[0];
    userEvent.click(applyButton);
    expect(mockedSearch).toBeCalledTimes(1);
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
