import { render, screen } from '@testing-library/react';
import { FiltersState, Matcher, Source, State } from '@yext/answers-headless-react';
import { createHierarchicalFacet } from '../../__utils__/hierarchicalfacets';
import { spyOnActions, mockAnswersState } from '../../__utils__/mocks';
import userEvent from '@testing-library/user-event';
import { HierarchicalFacets } from '../../__compound-components__/Filters/HierarchicalFacet';

const mockedState: Partial<State> = {
  filters: {
    static: [],
    facets: []
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
        executeVerticalQuery: jest.fn(),
        setOffset: jest.fn(),
        setFilterOption: jest.fn(),
        setFacetOption: jest.fn(),
        resetFacets: jest.fn(),
        setStaticFilters: jest.fn()
      };
    },
    useAnswersUtilities: () => {
      return {
        isCloseMatch: jest.fn()
      };
    }
  };
});

jest.mock('../../../src/utils/search-operations', () => ({
  __esModule: true,
  executeSearch: jest.fn()
}));

describe('Hierarchical facets', () => {

  it('Properly renders hierarchical facets', () => {
    mockFiltersState({
      facets: [
        createHierarchicalFacet([
          'food',
          'food > fruit',
          { value: 'food > fruit > banana', selected: true },
          'food > fruit > apple',
        ])
      ]
    });
    render(<HierarchicalFacets />);

    expect(screen.getByRole('button', { name: /food/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /fruit/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /banana/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /apple/i })).toBeTruthy();
  });

  it('Clicking the currently selected option deselects it and selects its parent', () => {
    mockFiltersState({
      facets: [
        createHierarchicalFacet([
          'food',
          'food > fruit',
          { value: 'food > fruit > banana', selected: true },
          'food > fruit > apple',
        ])
      ]
    });
    const actions = spyOnActions();


    render(<HierarchicalFacets />);

    const bananaButton = screen.getByRole('button', { name: /banana/i });
    userEvent.click(bananaButton);

    expectFacetOptionSet(actions, { value: 'food > fruit > banana', selected: false });
    expectFacetOptionSet(actions, { value: 'food > fruit', selected: true });
  });
  it('Clicking a non-selected option selects it and deselects its siblings', () => {
    mockFiltersState({
      facets: [
        createHierarchicalFacet([
          'food',
          'food > fruit',
          { value: 'food > fruit > banana', selected: true },
          'food > fruit > apple',
        ])
      ]
    });
    const actions = spyOnActions();

    render(<HierarchicalFacets />);

    const appleButton = screen.getByRole('button', { name: /apple/i });
    userEvent.click(appleButton);

    expectFacetOptionSet(actions, { value: 'food > fruit > apple', selected: true });
    expectFacetOptionSet(actions, { value: 'food > fruit > banana', selected: false });
  });
  it('Clicking the current category with a selected child selects the category and deselects the child', () => {
    mockFiltersState({
      facets: [
        createHierarchicalFacet([
          'food',
          'food > fruit',
          { value: 'food > fruit > banana', selected: true },
          'food > fruit > apple',
        ])
      ]
    });
    const actions = spyOnActions();


    render(<HierarchicalFacets />);

    const currentCategoryButton = screen.getByRole('button', { name: /fruit/i });
    userEvent.click(currentCategoryButton);

    expectFacetOptionSet(actions, { value: 'food > fruit', selected: true });
    expectFacetOptionSet(actions, { value: 'food > fruit > banana', selected: false });
  });

  it('Clicking a selected current category deselects it and selects its parent', () => {
    mockFiltersState({
      facets: [
        createHierarchicalFacet([
          'food',
          { value: 'food > fruit', selected: true },
          'food > fruit > banana',
          'food > fruit > apple',
        ])
      ]
    });
    const actions = spyOnActions();


    render(<HierarchicalFacets />);

    const currentCategoryButton = screen.getByRole('button', { name: /fruit/i });
    userEvent.click(currentCategoryButton);

    expectFacetOptionSet(actions, { value: 'food > fruit', selected: false });
    expectFacetOptionSet(actions, { value: 'food', selected: true });
  });
  it('Clicking a parent category selects it and deselects its children', () => {
    mockFiltersState({
      facets: [
        createHierarchicalFacet([
          'food',
          'food > fruit',
          { value: 'food > fruit > banana', selected: true },
          'food > fruit > apple',
        ])
      ]
    });
    const actions = spyOnActions();

    render(<HierarchicalFacets />);

    const parentCategoryButton = screen.getByRole('button', { name: /food/i });
    userEvent.click(parentCategoryButton);

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

function mockFiltersState(filters: FiltersState) {
  return mockAnswersState({
    ...mockedState,
    filters
  });
}