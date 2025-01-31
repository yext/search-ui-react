import {render, screen, waitFor} from '@testing-library/react';
import { SearchActions, FacetOption, Matcher, NumberRangeValue, SelectableStaticFilter, Source, State } from '@yext/search-headless-react';
import { mockAnswersHooks, mockAnswersState, spyOnActions } from '../__utils__/mocks';
import userEvent from '@testing-library/user-event';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { NumericalFacets } from '../../src/components';
import React from 'react';

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
  setFilterOption: jest.fn(),
  executeVerticalQuery: jest.fn()
};

const mockedUtils = {
  isCloseMatch: () => true
};

jest.mock('@yext/search-headless-react');

async function type(element : HTMLElement, input: string) {
  return waitFor(() => userEvent.type(element, input));
}

async function click(element : HTMLElement) {
  return waitFor(() => userEvent.click(element));
}

describe('NumericalFacets', () => {
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
      expect(screen.queryByText(`${o.displayName} (${o.count})}`)).toBeNull();
    });
  });

  it('Clicking a selected number range facet option checkbox unselects it', async () => {
    const actions = spyOnActions();
    render(<NumericalFacets />);

    const priceFacet = DisplayableFacets[1];
    const expensiveCheckbox: HTMLInputElement = screen.getByLabelText(priceFacet.options[0].displayName);
    expect(expensiveCheckbox.checked).toBeTruthy();

    await click(expensiveCheckbox);
    expectFacetOptionSet(actions, priceFacet.fieldId, priceFacet.options[0], false);
  });

  it('Clicking an unselected number range facet option checkbox selects it', async () => {
    const actions = spyOnActions();
    render(<NumericalFacets />);

    const priceFacet = DisplayableFacets[1];
    const cheapCheckbox: HTMLInputElement = screen.getByLabelText(priceFacet.options[1].displayName);
    expect(cheapCheckbox.checked).toBeFalsy();

    await click(cheapCheckbox);
    expectFacetOptionSet(actions, priceFacet.fieldId, priceFacet.options[1], true);
  });

  it('getFilterDisplayName field works as expected', async () => {
    const displayableFacets = [{
      ...DisplayableFacets[1],
      options: DisplayableFacets[1].options.map(o => ({ ...o, selected: false }))
    }];
    mockAnswersState({
      ...mockedState,
      filters: {
        facets: displayableFacets
      }
    });
    const getFilterDisplayName = (value: NumberRangeValue) => {
      return 'start-' + value.start?.value + ' end-' + value.end?.value;
    };
    const actions = spyOnActions();
    render(<NumericalFacets getFilterDisplayName={getFilterDisplayName}/>);
    await type(screen.getByPlaceholderText('Min'), '1');
    await type(screen.getByPlaceholderText('Max'), '5');
    await click(screen.getByText('Apply'));

    const expectedSelectableFilter: SelectableStaticFilter = {
      displayName: 'start-1 end-5',
      selected: true,
      filter: {
        kind: 'fieldValue',
        fieldId: 'price',
        value: {
          start: {
            matcher: Matcher.GreaterThanOrEqualTo,
            value: 1
          },
          end: {
            matcher: Matcher.LessThanOrEqualTo,
            value: 5
          }
        },
        matcher: Matcher.Between
      }
    };
    expect(actions.setFilterOption).toHaveBeenCalledWith(expectedSelectableFilter);
  });

  it('inputPrefix field works as expected', () => {
    render(<NumericalFacets inputPrefix={<>some prefix</>}/>);
    expect(screen.getAllByText('some prefix').length).toEqual(2);
  });

  it('includedFieldIds field works as expected', () => {
    const productFacet = DisplayableFacets[0];
    const priceFacet = DisplayableFacets[1];
    render(<NumericalFacets includedFieldIds={[priceFacet.fieldId]}/>);

    productFacet.options.forEach(o => {
      expect(screen.queryByText(o.displayName)).toBeNull();
    });
    priceFacet.options.forEach(o => {
      expect(screen.getByText(o.displayName)).toBeDefined();
    });
  });
});

function expectFacetOptionSet(
  actions: SearchActions,
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
