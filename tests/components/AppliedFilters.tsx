import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FiltersState } from '@yext/answers-headless/lib/esm/models/slices/filters';
import { VerticalSearchState } from '@yext/answers-headless/lib/esm/models/slices/vertical';
import { AppliedFilters } from '../../src/components/AppliedFilters';
import { SearchStatusState, Matcher, MetaState, Source } from '@yext/answers-headless-react';

const mockedState: {
  filters: FiltersState,
  vertical: VerticalSearchState,
  searchStatus: SearchStatusState,
  meta: MetaState
} = {
  filters: {
    static: [{
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
    }],
    facets: [{
      fieldId: 'test',
      options: [{
        value: 'val',
        matcher: Matcher.Equals,
        count: 1,
        displayName: 'Yext Reviews',
        selected: true
      }],
      displayName: 'Product'
    }]
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

describe('AppliedFilters', () => {
  it('Static filters are rendered', () => {
    const { getByText } = render(<AppliedFilters />);
    expect(getByText('Yext Answers')).toBeDefined();
    expect(mockedState.filters.static[0].value).toEqual('Yext Answers');
  });

  it('Facets are rendered', () => {
    const { getByText } = render(<AppliedFilters />);
    expect(getByText('Yext Reviews')).toBeDefined();
    expect(mockedState.filters.facets[0].options[0].displayName).toEqual('Yext Reviews');
  });

  it('Applied query filters are rendered', () => {
    const { getByText } = render(<AppliedFilters />);
    expect(getByText('Yext Listings')).toBeDefined();
    expect(mockedState.vertical.appliedQueryFilters[0].displayValue).toEqual('Yext Listings');
  });

  it('Filters with the fieldId of "builtin.entityType" are hidden by default', () => {
    const { queryByText } = render(<AppliedFilters />);
    expect(queryByText('Yext Pagebuilder')).toBeFalsy();
    expect(mockedState.filters.static[2].value).toEqual('Yext Pagebuilder');
  });

  it('The hiddenFields prop prevents filters with a corresponding fieldId from rendering', () => {
    const { queryByText } = render(<AppliedFilters hiddenFields={['name']}/>);
    expect(queryByText('Yext Answers')).toBeFalsy();
    expect(mockedState.filters.static[0].value).toEqual('Yext Answers');
  });

  it('The "X" button for an applied static filter deselects the filter option', () => {
    const useAnswersActions = jest.spyOn(require('@yext/answers-headless-react'), 'useAnswersActions');

    render(<AppliedFilters />);
    const removeFilterButton = screen.getByRole('button', { name: 'Remove "Yext Sites" filter' });
    fireEvent.click(removeFilterButton);

    const answersActions = useAnswersActions.mock.results[0].value;
    const setFilterOption = jest.spyOn(answersActions, 'setFilterOption');

    expect(setFilterOption).toHaveBeenCalledWith(expect.objectContaining({
      selected: false
    }));
    useAnswersActions.mockRestore();
  });

  it('The "X" button for an applied facet deselects the facet option', () => {
    const useAnswersActions = jest.spyOn(require('@yext/answers-headless-react'), 'useAnswersActions');

    render(<AppliedFilters />);
    const removeFilterButton = screen.getByRole('button', { name: 'Remove "Yext Reviews" filter' });
    fireEvent.click(removeFilterButton);

    const answersActions = useAnswersActions.mock.results[0].value;
    const setFacetOption = jest.spyOn(answersActions, 'setFacetOption');

    const isSelected = setFacetOption.mock.calls[0][2];
    expect(isSelected).toBe(false);
    useAnswersActions.mockRestore();
  });

  it('The clear all button clears all filters', () => {
    const useAnswersActions = jest.spyOn(require('@yext/answers-headless-react'), 'useAnswersActions');

    render(<AppliedFilters />);
    const clearAllButton = screen.getByRole('button', { name: 'Clear All' });
    fireEvent.click(clearAllButton);

    const answersActions = useAnswersActions.mock.results[0].value;
    const resetFacets = jest.spyOn(answersActions, 'resetFacets');
    const setStaticFilters = jest.spyOn(answersActions, 'setStaticFilters');

    expect(resetFacets).toHaveBeenCalled();
    expect(setStaticFilters).toHaveBeenCalledWith([]);
    useAnswersActions.mockRestore();
  });
});