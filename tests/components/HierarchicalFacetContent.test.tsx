import { render, screen } from '@testing-library/react';
import { Matcher, Source, State } from '@yext/search-headless-react';
import { spyOnActions, mockAnswersState, mockAnswersHooks } from '../__utils__/mocks';
import userEvent from '@testing-library/user-event';
import { HierarchicalFacetProps } from '../../src';
import { HierarchicalFacetContent } from '../../src/components/HierarchicalFacetContent';
import { FacetsProvider } from '../../src/components/Filters';
import { createHierarchicalFacet } from '../__utils__/hierarchicalfacets';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import React from 'react';

const hierarchicalFacet = DisplayableFacets[2];

const mockedState: Partial<State> = {
  filters: {
    static: [],
    facets: [hierarchicalFacet]
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
  executeVerticalQuery: jest.fn(),
  setOffset: jest.fn(),
  setFilterOption: jest.fn(),
  setFacetOption: jest.fn(),
  resetFacets: jest.fn(),
  setStaticFilters: jest.fn()
};

jest.mock('@yext/search-headless-react');

const mockHierarchicalFacet = (props?: HierarchicalFacetProps) => {
  return (
    <FacetsProvider>
      {facets => facets.map(facet => (
        <HierarchicalFacetContent {...props} fieldId={facet.fieldId} facet={facet} key={facet.fieldId} />))}
    </FacetsProvider>);
};

describe('HierarchicalFacetsContent', () => {
  beforeEach(() => {
    mockAnswersHooks({ mockedState, mockedActions });
  });

  it('Properly renders hierarchical facets', () => {
    render(mockHierarchicalFacet());

    expect(screen.getByRole('button', { name: /food/i })).toBeTruthy();
    expect(screen.getAllByRole('button', { name: /fruit/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /banana/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /apple/i })).toBeTruthy();
  });
  it('Clicking the currently selected option deselects it and selects its parent', async () => {
    const actions = spyOnActions();
    render(mockHierarchicalFacet());

    const bananaButton = screen.getByRole('button', { name: /banana/i });
    await userEvent.click(bananaButton);

    expectFacetOptionSet(actions, { value: 'food > fruit > banana', selected: false });
    expectFacetOptionSet(actions, { value: 'food > fruit', selected: true });
  });
  it('Clicking a non-selected option selects it and deselects its siblings', async () => {
    const actions = spyOnActions();
    render(mockHierarchicalFacet());

    const appleButton = screen.getByRole('button', { name: /apple/i });
    await userEvent.click(appleButton);

    expectFacetOptionSet(actions, { value: 'food > fruit > apple', selected: true });
    expectFacetOptionSet(actions, { value: 'food > fruit > banana', selected: false });
  });
  it('Clicking the current category with a selected child selects the category and deselects the ' +
    'child', async () => {
    const actions = spyOnActions();
    render(mockHierarchicalFacet());

    const currentCategoryButton = screen.getAllByRole('button', { name: /fruit/i })[1];
    await userEvent.click(currentCategoryButton);

    expectFacetOptionSet(actions, { value: 'food > fruit', selected: true });
    expectFacetOptionSet(actions, { value: 'food > fruit > banana', selected: false });
  });
  it('Clicking a selected current category deselects it and selects its parent', async () => {
    const facets = [
      createHierarchicalFacet([
        'food',
        { value: 'food > fruit', selected: true },
        'food > fruit > banana',
        'food > fruit > apple',
      ])
    ];

    mockAnswersState({
      ...mockedState,
      filters: { facets: facets }
    });

    const actions = spyOnActions();
    render(mockHierarchicalFacet());

    const currentCategoryButton = screen.getAllByRole('button', { name: /fruit/i })[1];
    await userEvent.click(currentCategoryButton);

    expectFacetOptionSet(actions, { value: 'food > fruit', selected: false });
    expectFacetOptionSet(actions, { value: 'food', selected: true });
  });
  it('Clicking a parent category selects it and deselects its children', async () => {
    const actions = spyOnActions();
    render(mockHierarchicalFacet());

    const parentCategoryButton = screen.getByRole('button', { name: /food/i });
    await userEvent.click(parentCategoryButton);

    expectFacetOptionSet(actions, { value: 'food', selected: true });
    expectFacetOptionSet(actions, { value: 'food > fruit', selected: false });
    expectFacetOptionSet(actions, { value: 'food > fruit > banana', selected: false });
  });
});

function expectFacetOptionSet(actions, facet: { value: string, selected: boolean }) {
  expect(actions.setFacetOption).toHaveBeenCalledWith(
    'hier',
    { matcher: Matcher.Equals, value: facet.value },
    facet.selected
  );
}
