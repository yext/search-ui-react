import { render, screen } from '@testing-library/react';
import { SearchActions, FacetOption, Matcher, NumberRangeValue, SelectableStaticFilter, Source, State } from '@yext/search-headless-react';
import { mockAnswersHooks, mockAnswersState, spyOnActions } from '../__utils__/mocks';
import userEvent from '@testing-library/user-event';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { NumericalFacetProps } from '../../src';
import { NumericalFacetContent } from '../../src/components/NumericalFacetContent';
import { FacetsProvider } from '../../src/components/Filters';
import { getOptionLabelTextWithCount } from '../__utils__/facets';
import React from 'react';

const numericalFacet = DisplayableFacets[1];

const mockedState: Partial<State> = {
  filters: {
    static: [],
    facets: [numericalFacet]
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

const mockNumericalFacet = (props?: NumericalFacetProps) => {
  return (
    <FacetsProvider>
      {facets => facets.map(facet => (
        <NumericalFacetContent {...props} fieldId={facet.fieldId} facet={facet} key={facet.fieldId} />))}
    </FacetsProvider>);
};

describe('NumericalFacetContent', () => {
  beforeEach(() => {
    mockAnswersHooks({ mockedState, mockedActions, mockedUtils });
  });

  it('Properly renders number range facets', () => {
    render(mockNumericalFacet());

    expect(screen.getByText(numericalFacet.displayName)).toBeDefined();
    numericalFacet.options.forEach(o => {
      expect(screen.getByText(o.displayName)).toBeDefined();
    });
  });

  it('Clicking a selected number range facet option checkbox unselects it', async () => {
    const actions = spyOnActions();
    render(mockNumericalFacet());

    const expensiveCheckbox: HTMLInputElement =
      screen.getByLabelText(numericalFacet.options[0].displayName);
    expect(expensiveCheckbox.checked).toBeTruthy();

    await userEvent.click(expensiveCheckbox);
    expectFacetOptionSet(actions, numericalFacet.fieldId, numericalFacet.options[0], false);
  });

  it('Clicking an unselected number range facet option checkbox selects it', async () => {
    const actions = spyOnActions();
    render(mockNumericalFacet());

    const cheapCheckbox: HTMLInputElement =
      screen.getByLabelText(numericalFacet.options[1].displayName);
    expect(cheapCheckbox.checked).toBeFalsy();

    await userEvent.click(cheapCheckbox);
    expectFacetOptionSet(actions, numericalFacet.fieldId, numericalFacet.options[1], true);
  });

  it('getFilterDisplayName field works as expected', async () => {
    const facets = [{
      ...numericalFacet,
      options: numericalFacet.options.map(o => ({ ...o, selected: false }))
    }];
    mockAnswersState({
      ...mockedState,
      filters: { facets: facets }
    });
    const getFilterDisplayName = (value: NumberRangeValue) => {
      return 'start-' + value.start?.value + ' end-' + value.end?.value;
    };
    const actions = spyOnActions();
    render(mockNumericalFacet(
      { fieldId: numericalFacet.fieldId, getFilterDisplayName: getFilterDisplayName }));

    await userEvent.type(screen.getByPlaceholderText('Min'), '1');
    await userEvent.type(screen.getByPlaceholderText('Max'), '5');
    await userEvent.click(screen.getByText('Apply'));

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
    render(mockNumericalFacet({ fieldId: numericalFacet.fieldId, inputPrefix: <>some prefix</> }));

    expect(screen.getAllByText('some prefix').length).toEqual(2);
  });

  it('Does not display option counts by default', () => {
    render(mockNumericalFacet());

    const label = screen.queryByLabelText(numericalFacet.options[0].displayName);
    const labelAndCount =
      screen.queryByLabelText(getOptionLabelTextWithCount(numericalFacet.options[0]));

    expect(label).toBeDefined();
    expect(labelAndCount).toBeNull();
  });

  it('Display option counts if showOptionCounts is set to true', () => {
    render(mockNumericalFacet({ fieldId: numericalFacet.fieldId, showOptionCounts: true }));

    const label = screen.queryByLabelText(numericalFacet.options[0].displayName);
    const labelAndCount =
      screen.queryByLabelText(getOptionLabelTextWithCount(numericalFacet.options[0]));

    expect(label).toBeNull();
    expect(labelAndCount).toBeDefined();
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
