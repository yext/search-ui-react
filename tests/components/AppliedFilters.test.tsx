import { fireEvent, render, screen } from '@testing-library/react';
import { DisplayableFacet, FiltersState, Matcher, Source, State } from '@yext/answers-headless-react';
import { AppliedFilters } from '../../src/components/AppliedFilters';
import { spyOnActions, mockAnswersState } from '../__utils__/mocks';

const mockedStaticFilters = [{
  selected: true,
  fieldId: 'name',
  matcher: Matcher.Equals,
  value: 'Yext Answers',
  displayName: 'Yext Answers'
}, {
  selected: true,
  fieldId: 'name',
  matcher: Matcher.Equals,
  value: 'Yext Sites',
  displayName: 'Yext Sites'
}, {
  selected: true,
  fieldId: 'builtin.entityType',
  matcher: Matcher.Equals,
  value: 'Yext Pagebuilder',
  displayName: 'Yext Pagebuilder'
}];

const mockedFacets = [{
  fieldId: 'test',
  options: [{
    value: 'val',
    matcher: Matcher.Equals,
    count: 1,
    displayName: 'Yext Reviews',
    selected: true
  }],
  displayName: 'Product'
}];

const mockedState: Partial<State> = {
  filters: {
    static: mockedStaticFilters,
    facets: mockedFacets
  },
  vertical: {
    verticalKey: 'vertical',
    results: [{
      source: Source.KnowledgeManager,
      rawData: {}
    }],
    appliedQueryFilters: [{
      displayKey: 'Product Type',
      displayValue: 'Yext Listings',
      filter: {
        fieldId: 'produt',
        matcher: Matcher.Equals,
        value: 'Yext Listings'
      }
    }]
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
    }
  };
});

jest.mock('../../src/utils/search-operations', () => ({
  __esModule: true,
  executeSearch: jest.fn()
}));

describe('AppliedFilters', () => {
  it('Static filters are rendered', () => {
    render(<AppliedFilters />);
    const staticFilterDisplayName = mockedState.filters.static[0].value as string;
    expect(screen.getByText(staticFilterDisplayName)).toBeDefined();
  });

  it('Facets are rendered', () => {
    render(<AppliedFilters />);
    const facetOptionDisplayName = mockedState.filters.facets[0].options[0].displayName;
    expect(screen.getByText(facetOptionDisplayName)).toBeDefined();
  });

  it('Applied query filters are rendered', () => {
    render(<AppliedFilters />);
    const appliedFilterDisplayName = mockedState.vertical.appliedQueryFilters[0].displayValue;
    expect(screen.getByText(appliedFilterDisplayName)).toBeDefined();
  });

  it('Filters with the fieldId of "builtin.entityType" are hidden by default', () => {
    render(<AppliedFilters />);
    const staticFilterDisplayName = mockedState.filters.static[2].value as string;
    expect(screen.queryByText(staticFilterDisplayName)).toBeFalsy();
  });

  it('The hiddenFields prop prevents filters with a corresponding fieldId from rendering', () => {
    render(<AppliedFilters hiddenFields={['name']} />);
    const staticFilterDisplayName = mockedState.filters.static[0].value as string;
    expect(screen.queryByText(staticFilterDisplayName)).toBeFalsy();
  });

  it('The "X" button for an applied static filter deselects the filter option', () => {
    const actions = spyOnActions();

    render(<AppliedFilters />);
    const removeFilterButton = screen.getByRole('button', { name: 'Remove "Yext Sites" filter' });
    fireEvent.click(removeFilterButton);

    expect(actions.setFilterOption).toHaveBeenCalledWith(expect.objectContaining({
      selected: false
    }));
  });

  it('The "X" button for an applied facet deselects the facet option', () => {
    const actions = spyOnActions();

    render(<AppliedFilters />);
    const removeFilterButton = screen.getByRole('button', { name: 'Remove "Yext Reviews" filter' });
    fireEvent.click(removeFilterButton);

    const isSelected = actions.setFacetOption.mock.calls[0][2];
    expect(isSelected).toBe(false);
  });

  it('The clear all button clears all filters', () => {
    const actions = spyOnActions();

    render(<AppliedFilters />);
    const clearAllButton = screen.getByRole('button', { name: 'Clear All' });
    fireEvent.click(clearAllButton);

    expect(actions.resetFacets).toHaveBeenCalled();
    expect(actions.setStaticFilters).toHaveBeenCalledWith([]);
  });
});

describe('AppliedFilters with hierarchical facets', () => {
  it('renders hierarchical facets in the correct order, with same fieldId facets adjacent to each other', () => {
    mockFiltersState({
      facets: [
        createHierarchicalFacet([
          'food > fruit > banana',
          'food > fruit',
          'food > fruit > apple',
          'food'
        ]),
        createHierarchicalFacet([
          'fool > bb',
          'fool > verylonglongman',
          'fool',
          'fool > a',
          'fool > longlong',
        ]),
      ]
    });

    render(<AppliedFilters hierarchicalFacetsFieldIds={['hier']}/>);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(10);
    expect(buttons[0]).toHaveAttribute('aria-label', 'Remove "food" filter');
    expect(buttons[1]).toHaveAttribute('aria-label', 'Remove "fruit" filter');
    expect(buttons[2]).toHaveAttribute('aria-label', 'Remove "apple" filter');
    expect(buttons[3]).toHaveAttribute('aria-label', 'Remove "banana" filter');

    expect(buttons[4]).toHaveAttribute('aria-label', 'Remove "fool" filter');
    expect(buttons[5]).toHaveAttribute('aria-label', 'Remove "a" filter');
    expect(buttons[6]).toHaveAttribute('aria-label', 'Remove "bb" filter');
    expect(buttons[7]).toHaveAttribute('aria-label', 'Remove "longlong" filter');
    expect(buttons[8]).toHaveAttribute('aria-label', 'Remove "verylonglongman" filter');

    expect(buttons[9]).toHaveTextContent('Clear All');
  });

  it('does not render unselected hierarchical facets', () => {
    mockFiltersState({
      facets: [
        createHierarchicalFacet([
          'food',
          'food > fruit',
          'games',
          'games > steinsgate',
          { value: 'games > nier', selected: false }
        ])
      ]
    });

    render(<AppliedFilters hierarchicalFacetsFieldIds={['hier']}/>);
    expect(screen.queryAllByLabelText(/Remove "[a-zA_Z]+" filter/)).toHaveLength(4);
    const nierButton = screen.queryByLabelText('Remove "nier" filter');
    expect(nierButton).toBeNull();
  });

  it('can use a custom delimiter', () => {
    mockFiltersState({
      facets: [
        createHierarchicalFacet([
          'games',
          'games ! steinsgate'
        ])
      ]
    });

    render(<AppliedFilters
      hierarchicalFacetsFieldIds={['hier']}
      hierarchicalFacetsDelimiter='!'
    />);
    const filterPills = screen.queryAllByLabelText(/Remove "[a-zA_Z]+" filter/);
    expect(filterPills).toHaveLength(2);
    expect(filterPills[0]).toHaveAttribute('aria-label', 'Remove "games" filter');
    expect(filterPills[1]).toHaveAttribute('aria-label', 'Remove "steinsgate" filter');
  });

  it('removing a hierarchical applied filter removes all descendants in the hierarchy', () => {
    mockFiltersState({
      facets: [
        createHierarchicalFacet([
          'food',
          'food > fruit',
          'food > fruit > banana',
          'food > fruit > apple',
          'food > meat',
          'food > meat > cow',
          'food > meat > pig',
          'food > cookies'
        ]),
        createHierarchicalFacet([
          'fool',
          'fool > a',
        ]),
      ]
    });
    const actions = spyOnActions();

    render(<AppliedFilters hierarchicalFacetsFieldIds={['hier']}/>);
    const filterPills = screen.queryAllByLabelText(/Remove "[a-zA_Z]+" filter/);
    expect(filterPills).toHaveLength(10);

    const fruitButton = screen.queryByLabelText('Remove "fruit" filter');
    fireEvent.click(fruitButton);

    expect(actions.setFacetOption).toHaveBeenCalledTimes(3);
    expect(actions.setFacetOption).toHaveBeenCalledWith(
      'hier',
      { matcher: Matcher.Equals, value: 'food > fruit > banana' },
      false
    );
    expect(actions.setFacetOption).toHaveBeenCalledWith(
      'hier',
      { matcher: Matcher.Equals, value: 'food > fruit > apple' },
      false
    );
    expect(actions.setFacetOption).toHaveBeenCalledWith(
      'hier',
      { matcher: Matcher.Equals, value: 'food > fruit' },
      false
    );
  });
});

function createHierarchicalFacet(
  options: (string | { value: string, selected?: boolean })[],
  fieldId = 'hier'
): DisplayableFacet {
  const transformedOptions = options
    .map(o => typeof o === 'string' ? { value: o, selected: true } : o)
    .map(o => ({
      value: o.value,
      displayName: o.value,
      selected: o.selected,
      count: 82,
      matcher: Matcher.Equals
    }));

  return {
    fieldId,
    displayName: '_unused',
    options: transformedOptions
  };
}

function mockFiltersState(filters: FiltersState) {
  return mockAnswersState({
    ...mockedState,
    filters
  });
}
