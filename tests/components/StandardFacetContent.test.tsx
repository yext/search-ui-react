import { render, screen } from '@testing-library/react';
import { FacetOption, Source, State, SearchActions } from '@yext/search-headless-react';
import { mockAnswersHooks, spyOnActions } from '../__utils__/mocks';
import userEvent from '@testing-library/user-event';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { getOptionLabelTextWithCount } from '../__utils__/facets';
import { StandardFacetContent } from '../../src/components/StandardFacetContent';
import { StandardFacetProps } from '../../src/components';
import { FacetsProvider } from '../../src/components/Filters';
import React from 'react';

const standardFacet = DisplayableFacets[0];

const mockedState: Partial<State> = {
  filters: {
    static: [],
    facets: [standardFacet]
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

jest.mock('@yext/search-headless-react');

const mockStandardFacet = (props?: StandardFacetProps) => {
  return (
    <FacetsProvider>
      {facets => facets.map(facet => (
        <StandardFacetContent {...props} fieldId={facet.fieldId} facet={facet} key={facet.fieldId} />))}
    </FacetsProvider>);
};

describe('StandardFacetContent', () => {
  beforeEach(() => {
    mockAnswersHooks({ mockedState, mockedActions, mockedUtils });
  });

  it('Display option counts by default', () => {
    render(mockStandardFacet());

    const coffeeLabel = screen.queryByLabelText(standardFacet.options[0].displayName);
    const coffeeLabelAndCount =
      screen.queryByLabelText(getOptionLabelTextWithCount(standardFacet.options[0]));

    expect(coffeeLabel).toBeNull();
    expect(coffeeLabelAndCount).toBeDefined();
  });

  it('Does not display option counts if showOptionCounts is set to false', () => {
    render(mockStandardFacet({ fieldId: standardFacet.fieldId, showOptionCounts: false }));

    const coffeeLabel = screen.queryByLabelText(standardFacet.options[0].displayName);
    const coffeeLabelAndCount =
      screen.queryByLabelText(getOptionLabelTextWithCount(standardFacet.options[0]));

    expect(coffeeLabel).toBeDefined();
    expect(coffeeLabelAndCount).toBeNull();
  });

  it('Clicking an unselected facet option label selects it', async () => {
    const actions = spyOnActions();
    render(mockStandardFacet());

    const coffeeFacetOption = standardFacet.options[0];
    const labelText = getOptionLabelTextWithCount(coffeeFacetOption);
    const coffeeCheckbox: HTMLInputElement = screen.getByLabelText(labelText);
    expect(coffeeCheckbox.checked).toBeFalsy();

    const coffeeLabel = screen.getByText(labelText);
    await userEvent.click(coffeeLabel);
    expectFacetOptionSet(actions, standardFacet.fieldId, coffeeFacetOption, true);
  });

  it('Clicking a selected facet option checkbox unselects it', async () => {
    const actions = spyOnActions();
    render(mockStandardFacet());

    const teaCheckbox: HTMLInputElement = screen.getByLabelText(
      getOptionLabelTextWithCount(standardFacet.options[1]));
    expect(teaCheckbox.checked).toBeTruthy();

    await userEvent.click(teaCheckbox);
    expectFacetOptionSet(actions, standardFacet.fieldId, standardFacet.options[1], false);
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
