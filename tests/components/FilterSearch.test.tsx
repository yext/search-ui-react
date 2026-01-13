import { FilterSearch, FilterSearchProps } from '../../src/components/FilterSearch';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as searchOperations from '../../src/utils/search-operations';
import { SearchI18nextProvider } from '../../src/components/SearchI18nextProvider';
import {
  labeledFilterSearchResponse,
  unlabeledFilterSearchResponse,
  noResultsFilterSearchResponse
} from '../../tests/__fixtures__/data/filtersearch';
import {
  Matcher,
  SearchHeadless,
  SearchHeadlessContext,
  useSearchActions,
  SelectableStaticFilter,
  FiltersState
} from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import React from 'react';

const searchFieldsProp = [{
  fieldApiName: 'name',
  entityType: 'ce_person'
}];

const mockedStateWithSingleFilter: FiltersState = {
  static: [{
    filter: {
      kind: 'fieldValue',
      fieldId: 'name',
      matcher: Matcher.Equals,
      value: 'Real Person'
    },
    selected: true,
    displayName: 'Real Person'
  }]
};

const mockedStateWithMultipleFilters: FiltersState = {
  static: [...(mockedStateWithSingleFilter.static ?? []), {
    filter: {
      kind: 'fieldValue',
      fieldId: 'name',
      matcher: Matcher.Equals,
      value: 'Fake Person'
    },
    selected: true,
    displayName: 'Fake Person'
  }]
};

const pause = (millis: number) => new Promise(resolve => setTimeout(resolve, millis));
// wait for debounce period + extra buffer to address flakiness
const waitForDebounce = () => pause(200 + 200);

function renderFilterSearch(
  props: FilterSearchProps = { searchFields: searchFieldsProp },
  filters?: FiltersState,
  locale?: string
): RenderResult & { rerenderWithLocale: (newLocale?: string) => void } {
  const searcher = generateMockedHeadless({
    vertical: {
      verticalKey: 'vertical',
    },
    meta: {
      searchType: 'vertical',
      locale
    },
    filters
  });

  const utils = render(<SearchHeadlessContext.Provider value={searcher}>
    <SearchI18nextProvider searcher={searcher}>
      <FilterSearch {...props} />
    </SearchI18nextProvider>
  </SearchHeadlessContext.Provider>);

  function rerenderWithLocale(newLocale?: string) {
    const newSearcher = generateMockedHeadless({
      vertical: {
        verticalKey: 'vertical',
      },
      meta: {
        searchType: 'vertical',
        locale: newLocale
      },
      filters
    });

    utils.rerender(<SearchHeadlessContext.Provider value={newSearcher}>
      <SearchI18nextProvider searcher={newSearcher}>
        <FilterSearch {...props} />
      </SearchI18nextProvider>
    </SearchHeadlessContext.Provider>);
  }

  return {
    ...utils,
    rerenderWithLocale,
  };
}

describe('search with section labels', () => {
  it('renders the filter search bar, "Filter" label, and default placeholder text translated based on the locale', () => {
    const { rerenderWithLocale } = renderFilterSearch({ searchFields: searchFieldsProp, label: 'Filter' });
    const label = 'Filter';
    const labelElement = screen.getByText(label);
    const searchBarElement = screen.getAllByRole<HTMLInputElement>('combobox');

    expect(labelElement).toBeDefined();
    expect(searchBarElement.length).toBe(1);
    expect(searchBarElement[0].placeholder).toBe('Search here...');

    rerenderWithLocale('ja');
    const localizedSearchBarElement = screen.getAllByRole<HTMLInputElement>('combobox');
    expect(localizedSearchBarElement[0].placeholder).toBe('ここで検索…');
  });

  it('sets the placeholder text to the specified value regardless of the search locale', () => {
    const { rerenderWithLocale } = renderFilterSearch({ searchFields: searchFieldsProp, placeholder: 'Search...' });
    const searchBarElement = screen.getByRole<HTMLInputElement>('combobox');
    expect(searchBarElement.placeholder).toBe('Search...');

    rerenderWithLocale('ja');
    const localizedSearchBarElement = screen.getAllByRole<HTMLInputElement>('combobox');
    expect(localizedSearchBarElement[0].placeholder).toBe('Search...');
  });

  it('displays characters typed in search bar correctly', async () => {
    renderFilterSearch();
    const searchBarElement = screen.getByRole('combobox');

    await userEvent.type(searchBarElement, 'na');
    expect(searchBarElement).toHaveValue('na');

    await userEvent.type(searchBarElement, '{backspace}');
    expect(searchBarElement).toHaveValue('n');
  });

  it('triggers a filter search only when user stops typing', async () => {
    // Async debouncing can leak a delayed call from a different test.
    await waitForDebounce();
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    renderFilterSearch();
    const searchBarElement = screen.getByRole('combobox');
    const expectedFilterSearchFields = [{
      entityType: 'ce_person',
      fetchEntities: false,
      fieldApiName: 'name'
    }];

    await userEvent.type(searchBarElement, 'test');
    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenCalledTimes(1);
    expect(executeFilterSearch).toHaveBeenLastCalledWith('test', false, expectedFilterSearchFields);

    await userEvent.type(searchBarElement, '{backspace}');
    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenLastCalledWith('tes', false, expectedFilterSearchFields);
    expect(executeFilterSearch).toHaveBeenCalledTimes(2);
  });

  it('does not trigger a filter search when backspacing in an empty text box', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    renderFilterSearch();
    const searchBarElement = screen.getByRole('combobox');

    await userEvent.type(searchBarElement, '{backspace}');
    expect(searchBarElement).toHaveValue('');
    expect(executeFilterSearch).toHaveBeenCalledTimes(0);
  });

  it('shows autocomplete results, if they exist, when a character is typed', async () => {
    renderFilterSearch();
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    const searchBarElement = screen.getByRole('combobox');

    await userEvent.type(searchBarElement, 'n');
    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenCalled();

    const autocompleteSection = screen.getByText('First name');
    expect(autocompleteSection).toBeDefined();

  });

  it('input value stays the same when a user selects a filter', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    renderFilterSearch();
    const searchBarElement = screen.getByRole('combobox');

    await userEvent.type(searchBarElement, 'n');
    await screen.findByText('first name 1');

    await userEvent.type(searchBarElement, '{arrowdown}');
    expect(executeFilterSearch).toHaveBeenCalled();
    expect(searchBarElement).toHaveValue('n');
  });

  it('remove old filter value when a new one is entered', async () => {
    renderFilterSearch();
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
    const searchBarElement = screen.getByRole('combobox');

    await userEvent.type(searchBarElement, 'n');
    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenCalled();
    await screen.findByText('first name 1');
    await userEvent.type(searchBarElement, '{enter}');
    expect(setFilterOption).toHaveBeenCalledWith({
      filter: {
        kind: 'fieldValue',
        fieldId: 'name',
        matcher: Matcher.Equals,
        value: 'first name 1'
      },
      displayName: 'first name 1',
      selected: true
    });

    await userEvent.clear(searchBarElement);
    await userEvent.type(searchBarElement, 'n');
    await waitForDebounce();
    await screen.findByText('first name 2');
    await userEvent.type(searchBarElement, '{arrowdown}');
    await userEvent.type(searchBarElement, '{enter}');

    expect(setFilterOption).toHaveBeenCalledWith({
      filter: {
        kind: 'fieldValue',
        fieldId: 'name',
        matcher: Matcher.Equals,
        value: 'first name 1'
      },
      selected: false
    });

    expect(setFilterOption).toHaveBeenCalledWith({
      filter: {
        kind: 'fieldValue',
        fieldId: 'name',
        matcher: Matcher.Equals,
        value: 'first name 2'
      },
      displayName: 'first name 2',
      selected: true
    });
  });

  it('displays name of matching filter in state when no filter is selected from component', async () => {
    renderFilterSearch(undefined, mockedStateWithSingleFilter);
    const searchBarElement = screen.getByRole('combobox');
    expect(searchBarElement).toHaveValue('Real Person');
  });

  it('logs a warning when multiple matching filters in state and no current filter selected', async () => {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
    renderFilterSearch(undefined, mockedStateWithMultipleFilters);
    const searchBarElement = screen.getByRole('combobox');
    expect(searchBarElement).toHaveValue('Real Person');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'More than one selected static filter found that matches the filter search fields: [name].'
      + ' Please update the state to remove the extra filters.'
      + ' Picking one filter to display in the input.'
    );
  });

  it('does not log a warning for multiple matching filters in state if onSelect is passed', async () => {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
    const mockedOnSelect = jest.fn();
    renderFilterSearch(
      { searchFields: searchFieldsProp, onSelect: mockedOnSelect },
      mockedStateWithMultipleFilters
    );
    const searchBarElement = screen.getByRole('combobox');
    expect(searchBarElement).toHaveValue('Real Person');
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('unselects single matching filter in state when a new filter is selected and doesn\'t log warning', async () => {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
    renderFilterSearch(undefined, mockedStateWithSingleFilter);
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
    const searchBarElement = screen.getByRole('combobox');

    userEvent.clear(searchBarElement);
    await userEvent.type(searchBarElement, 'n');
    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenCalled();
    await screen.findByText('first name 1');
    await userEvent.type(searchBarElement, '{enter}');
    expect(setFilterOption).toHaveBeenCalledWith({
      filter: {
        kind: 'fieldValue',
        fieldId: 'name',
        matcher: Matcher.Equals,
        value: 'Real Person'
      },
      selected: false
    });

    expect(setFilterOption).toHaveBeenCalledWith({
      filter: {
        kind: 'fieldValue',
        fieldId: 'name',
        matcher: Matcher.Equals,
        value: 'first name 1'
      },
      displayName: 'first name 1',
      selected: true
    });

    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('unselects multiple matching filters in state when a new filter is selected and logs warning', async () => {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
    renderFilterSearch(undefined, mockedStateWithMultipleFilters);
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
    const searchBarElement = screen.getByRole('combobox');

    userEvent.clear(searchBarElement);
    await userEvent.type(searchBarElement, 'n');
    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenCalled();
    await screen.findByText('first name 1');
    await userEvent.type(searchBarElement, '{enter}');
    expect(setFilterOption).toHaveBeenCalledWith({
      filter: {
        kind: 'fieldValue',
        fieldId: 'name',
        matcher: Matcher.Equals,
        value: 'Real Person'
      },
      selected: false
    });
    expect(setFilterOption).toHaveBeenCalledWith({
      filter: {
        kind: 'fieldValue',
        fieldId: 'name',
        matcher: Matcher.Equals,
        value: 'Fake Person'
      },
      selected: false
    });
    expect(setFilterOption).toHaveBeenCalledWith({
      filter: {
        kind: 'fieldValue',
        fieldId: 'name',
        matcher: Matcher.Equals,
        value: 'first name 1'
      },
      displayName: 'first name 1',
      selected: true
    });
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'More than one selected static filter found that matches the filter search fields: [name].'
      + ' Unselecting all existing matching filters and selecting the new filter.'
    );
  });

  it('executes onSelect function when a filter is selected', async () => {
    const mockedOnSelect = jest.fn();
    const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    renderFilterSearch({ searchFields: searchFieldsProp, onSelect: mockedOnSelect });
    const searchBarElement = screen.getByRole('combobox');

    await userEvent.type(searchBarElement, 'n');
    await screen.findByText('first name 1');

    await userEvent.type(searchBarElement, '{enter}');
    expect(executeFilterSearch).toHaveBeenCalled();

    expect(mockedOnSelect).toBeCalled();
    expect(setFilterOption).not.toBeCalled();
  });

  describe('searching on builtin.location', () => {
    const locationSearchFieldsProp = [
      ...searchFieldsProp,
      {
        fieldApiName: 'builtin.location',
        entityType: 'ce_person'
      }
    ];
    const mockedStateWithLocationFilters: FiltersState = {
      static: [{
        filter: {
          kind: 'fieldValue',
          fieldId: 'builtin.region',
          matcher: Matcher.Equals,
          value: 'VA'
        },
        selected: true,
        displayName: 'Virginia'
      }, {
        filter: {
          kind: 'fieldValue',
          fieldId: 'address.countryCode',
          matcher: Matcher.Equals,
          value: 'US'
        },
        selected: true,
        displayName: 'United States'
      }, {
        filter: {
          kind: 'fieldValue',
          fieldId: 'builtin.location',
          matcher: Matcher.Equals,
          value: 'P-place.2618194975855570'
        },
        selected: true,
        displayName: 'New York City, New York, United States'
      }]
    };

    it('displays text of other location fields in state and lists all fields in the warning', async () => {
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
      renderFilterSearch({ searchFields: locationSearchFieldsProp }, mockedStateWithLocationFilters);
      const searchBarElement = screen.getByRole('combobox');
      expect(searchBarElement).toHaveValue('Virginia');
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'More than one selected static filter found that matches the filter search fields:'
        + ' [name, builtin.location, builtin.region, address.countryCode].'
        + ' Please update the state to remove the extra filters.'
        + ' Picking one filter to display in the input.'
      );
    });

    it('unselects all location filters in state and lists all location fields in the warning', async () => {
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
      renderFilterSearch({ searchFields: locationSearchFieldsProp }, mockedStateWithLocationFilters);
      const executeFilterSearch = jest
        .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
        .mockResolvedValue(labeledFilterSearchResponse);
      const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
      const searchBarElement = screen.getByRole('combobox');

      userEvent.clear(searchBarElement);
      await userEvent.type(searchBarElement, 'f');
      await waitForDebounce();
      expect(executeFilterSearch).toHaveBeenCalled();
      await screen.findByText('first name 1');
      await userEvent.type(searchBarElement, '{enter}');
      expect(setFilterOption).toHaveBeenCalledWith({
        filter: {
          kind: 'fieldValue',
          fieldId: 'builtin.region',
          matcher: Matcher.Equals,
          value: 'VA'
        },
        selected: false
      });
      expect(setFilterOption).toHaveBeenCalledWith({
        filter: {
          kind: 'fieldValue',
          fieldId: 'address.countryCode',
          matcher: Matcher.Equals,
          value: 'US'
        },
        selected: false
      });
      expect(setFilterOption).toHaveBeenCalledWith({
        filter: {
          kind: 'fieldValue',
          fieldId: 'address.countryCode',
          matcher: Matcher.Equals,
          value: 'US'
        },
        selected: false
      });
      expect(setFilterOption).toHaveBeenCalledWith({
        filter: {
          kind: 'fieldValue',
          fieldId: 'name',
          matcher: Matcher.Equals,
          value: 'first name 1'
        },
        displayName: 'first name 1',
        selected: true
      });
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'More than one selected static filter found that matches the filter search fields:'
        + ' [name, builtin.location, builtin.region, address.countryCode].'
        + ' Unselecting all existing matching filters and selecting the new filter.'
      );
    });
  });

  describe('searchOnSelect = true', () => {
    it('triggers a search on pressing "enter" when an autocomplete result is selected', async () => {
      const mockExecuteSearch = jest.spyOn(searchOperations, 'executeSearch');
      const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
      const setOffset = jest.spyOn(SearchHeadless.prototype, 'setOffset');
      const resetFacets = jest.spyOn(SearchHeadless.prototype, 'resetFacets');
      const executeFilterSearch = jest
        .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
        .mockResolvedValue(labeledFilterSearchResponse);
      renderFilterSearch({ searchFields: searchFieldsProp, searchOnSelect: true });
      const searchBarElement = screen.getByRole('combobox');

      await userEvent.type(searchBarElement, 'n');
      await waitForDebounce();
      expect(executeFilterSearch).toHaveBeenCalled();
      await screen.findByText('first name 1');

      const expectedSetFilterOptionParam = {
        filter: {
          kind: 'fieldValue',
          fieldId: 'name',
          matcher: Matcher.Equals,
          value: 'first name 1'
        },
        displayName: 'first name 1',
        selected: true
      };
      const expectedSetOffsetParam = 0;

      await userEvent.type(searchBarElement, '{enter}');
      expect(setFilterOption).toHaveBeenCalledWith(expectedSetFilterOptionParam);
      expect(setOffset).toHaveBeenCalledWith(expectedSetOffsetParam);
      expect(resetFacets).toBeCalled();

      const setFilterOptionCallOrder = setFilterOption.mock.invocationCallOrder[0];
      const setOffsetCallOrder = setOffset.mock.invocationCallOrder[0];
      const resetFacetsCallOrder = resetFacets.mock.invocationCallOrder[0];
      const mockExecuteSearchCallOrder = mockExecuteSearch.mock.invocationCallOrder[0];
      expect(setFilterOptionCallOrder).toBeLessThan(mockExecuteSearchCallOrder);
      expect(setOffsetCallOrder).toBeLessThan(mockExecuteSearchCallOrder);
      expect(resetFacetsCallOrder).toBeLessThan(mockExecuteSearchCallOrder);
    });

    it('does not trigger a search on pressing "enter" if no autocomplete result is selected', async () => {
      const mockExecuteSearch = jest.spyOn(searchOperations, 'executeSearch');
      const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
      const setOffset = jest.spyOn(SearchHeadless.prototype, 'setOffset');
      const resetFacets = jest.spyOn(SearchHeadless.prototype, 'resetFacets');
      renderFilterSearch({ searchFields: searchFieldsProp, searchOnSelect: true });
      const searchBarElement = screen.getByRole('combobox');

      await userEvent.type(searchBarElement, 'n{enter}');

      expect(setFilterOption).not.toHaveBeenCalled();

      expect(setOffset).not.toHaveBeenCalled();
      expect(resetFacets).not.toHaveBeenCalled();
      expect(mockExecuteSearch).not.toHaveBeenCalled();
    });

    it('triggers a search when an autocomplete result is clicked', async () => {
      const mockExecuteSearch = jest.spyOn(searchOperations, 'executeSearch');
      const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
      const setOffset = jest.spyOn(SearchHeadless.prototype, 'setOffset');
      const resetFacets = jest.spyOn(SearchHeadless.prototype, 'resetFacets');
      const executeFilterSearch = jest
        .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
        .mockResolvedValue(labeledFilterSearchResponse);
      renderFilterSearch({ searchFields: searchFieldsProp, searchOnSelect: true });
      const searchBarElement = screen.getByRole('combobox');

      await userEvent.type(searchBarElement, 'n');
      await waitForDebounce();
      expect(executeFilterSearch).toHaveBeenCalled();
      const autocompleteSuggestion = await screen.findByText('first name 1');


      const expectedSetFilterOptionParam = {
        filter: {
          kind: 'fieldValue',
          fieldId: 'name',
          matcher: Matcher.Equals,
          value: 'first name 1'
        },
        displayName: 'first name 1',
        selected: true
      };
      const expectedSetOffsetParam = 0;

      await userEvent.click(autocompleteSuggestion);
      expect(setFilterOption).toHaveBeenCalledWith(expectedSetFilterOptionParam);
      expect(setOffset).toHaveBeenCalledWith(expectedSetOffsetParam);
      expect(resetFacets).toHaveBeenCalled();

      const setFilterOptionCallOrder = setFilterOption.mock.invocationCallOrder[0];
      const setOffsetCallOrder = setOffset.mock.invocationCallOrder[0];
      const resetFacetsCallOrder = setOffset.mock.invocationCallOrder[0];
      const mockExecuteSearchCallOrder = mockExecuteSearch.mock.invocationCallOrder[0];
      expect(setFilterOptionCallOrder).toBeLessThan(mockExecuteSearchCallOrder);
      expect(setOffsetCallOrder).toBeLessThan(mockExecuteSearchCallOrder);
      expect(resetFacetsCallOrder).toBeLessThan(mockExecuteSearchCallOrder);
    });

    describe('onSelect prop is passed', () => {
      it('ignores searchOnSelect, gives a warning, and calls onSelect when a filter is selected', async () => {
        const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
        const mockedOnSelect = jest.fn();
        const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
        const mockExecuteSearch = jest.spyOn(searchOperations, 'executeSearch');
        const executeFilterSearch = jest
          .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
          .mockResolvedValue(labeledFilterSearchResponse);
        renderFilterSearch({
          searchFields: searchFieldsProp,
          searchOnSelect: true,
          onSelect: mockedOnSelect
        });
        const searchBarElement = screen.getByRole('combobox');

        await userEvent.type(searchBarElement, 'n');
        await screen.findByText('first name 1');

        await userEvent.type(searchBarElement, '{enter}');
        expect(executeFilterSearch).toHaveBeenCalled();

        expect(mockedOnSelect).toBeCalled();
        expect(setFilterOption).not.toBeCalled();
        expect(mockExecuteSearch).not.toBeCalled();
        expect(consoleWarnSpy).toHaveBeenCalledWith('Both searchOnSelect and onSelect props were passed to the component.'
          + ' Using onSelect instead of searchOnSelect as the latter is deprecated.');
      });
    });
  });

  describe('searchOnSelect = false', () => {
    it('does not trigger a search when an autocomplete result is selected', async () => {
      const mockExecuteSearch = jest.spyOn(searchOperations, 'executeSearch');
      const setOffset = jest.spyOn(SearchHeadless.prototype, 'setOffset');
      const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
      const resetFacets = jest.spyOn(SearchHeadless.prototype, 'resetFacets');
      const executeFilterSearch = jest
        .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
        .mockResolvedValue(labeledFilterSearchResponse);
      renderFilterSearch({ searchFields: searchFieldsProp, searchOnSelect: false });
      const searchBarElement = screen.getByRole('combobox');

      await userEvent.type(searchBarElement, 'n');
      await screen.findByText('first name 1');

      await userEvent.type(searchBarElement, '{enter}');
      expect(executeFilterSearch).toHaveBeenCalled();

      expect(setFilterOption).toHaveBeenCalledWith({
        filter: {
          kind: 'fieldValue',
          fieldId: 'name',
          matcher: Matcher.Equals,
          value: 'first name 1'
        },
        displayName: 'first name 1',
        selected: true
      });
      expect(setOffset).not.toHaveBeenCalled();
      expect(resetFacets).not.toHaveBeenCalled();
      expect(mockExecuteSearch).not.toHaveBeenCalled();
    });
  });
});

describe('search without section labels', () => {
  it('shows autocomplete results, if they exist, when a character is typed', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(unlabeledFilterSearchResponse);
    renderFilterSearch();

    const searchBarElement = screen.getByRole('combobox');

    await userEvent.type(searchBarElement, 'n');
    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenCalled();

    const autocompleteSuggestion = screen.getByText('first name 1');
    expect(autocompleteSuggestion).toBeDefined();
  });

  it('pressing enter without navigating selects first filter in input', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(unlabeledFilterSearchResponse);
    renderFilterSearch();
    const inputNode = screen.getByRole('combobox');
    await userEvent.type(inputNode, 'n');
    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenCalled();

    await userEvent.keyboard('{enter}');
    expect(inputNode).toHaveValue('first name 1');
  });

  it('when an onDropdownInputChange prop is specified, it gets called each time after the input changes and executeFilterSearch does not', async () => {
    const mockedOnDropdownInputChange = jest.fn();
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch');
    renderFilterSearch({
      searchFields: searchFieldsProp,
      onDropdownInputChange: mockedOnDropdownInputChange
    });
    await userEvent.type(screen.getByRole('combobox'), 'a');
    expect(mockedOnDropdownInputChange).toHaveBeenCalledTimes(1);
    expect(executeFilterSearch).toHaveBeenCalledTimes(0);
  });

  it('when an afterDropdownInputFocus prop is provided, invokes it in addition to the original ' +
    'behavior when input gains focus', async () => {
    // Async debouncing can leak a delayed call from a different test.
    await waitForDebounce();
    const mockedAfterDropdownInputFocus = jest.fn();
    const executeFilterSearch = jest.spyOn(SearchHeadless.prototype, 'executeFilterSearch');
    renderFilterSearch({
      searchFields: searchFieldsProp,
      afterDropdownInputFocus: mockedAfterDropdownInputFocus
    });

    // Click into input. ExecuteFilterSearch wouldn't be triggered since the input is empty.
    await userEvent.click(screen.getByRole('combobox'));
    expect(mockedAfterDropdownInputFocus).toHaveBeenCalledTimes(1);
    expect(executeFilterSearch).toHaveBeenCalledTimes(0);

    // Update input.
    await userEvent.type(screen.getByRole('combobox'), 'a');
    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenCalledTimes(1);

    // Click out of input and then click into input.
    // ExecuteFilterSearch would be triggered since input no longer empty.
    await userEvent.click(document.body);
    await userEvent.click(screen.getByRole('combobox'));
    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenCalledTimes(2);
    expect(mockedAfterDropdownInputFocus).toHaveBeenCalledTimes(2);
  });
});

describe('screen reader', () => {
  it('renders ScreenReader messages with section labels', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    const { rerenderWithLocale } = renderFilterSearch();

    const searchBarElement = screen.getByRole('combobox');

    await userEvent.type(searchBarElement, 'n');
    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenCalled();

    const expectedScreenReaderMessage = '2 First name autocomplete options found. 1 Last name autocomplete option found.';

    const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
    expect(screenReaderMessage).toBeDefined();

    rerenderWithLocale('fr');
    const expectedLocalizedScreenReaderMessage = '2 options d\'autocomplétion First name trouvées. 1 option d\'autocomplétion Last name trouvée.';

    const rerenderedScreenReaderMessage = screen.getByText(expectedLocalizedScreenReaderMessage);
    expect(rerenderedScreenReaderMessage).toBeDefined();
  });

  it('renders ScreenReader messages without section labels', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(unlabeledFilterSearchResponse);
    renderFilterSearch();

    const searchBarElement = screen.getByRole('combobox');

    await userEvent.type(searchBarElement, 'n');

    await waitForDebounce();
    expect(executeFilterSearch).toHaveBeenCalled();

    const expectedScreenReaderMessage = '3 autocomplete options found.';
    const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);

    expect(screenReaderMessage).toBeDefined();
  });

  it('renders 0 results ScreenReader message when there are no results', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(noResultsFilterSearchResponse);
    renderFilterSearch();

    const searchBarElement = screen.getByRole('combobox');
    await userEvent.type(searchBarElement, 'n');
    await waitForDebounce();
    await pause(50); // wait for the screen reader message to be updated
    expect(executeFilterSearch).toHaveBeenCalled();

    const expectedScreenReaderMessage = '0 autocomplete options found.';
    const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);

    expect(screenReaderMessage).toBeDefined();
  });
});


it('clears input when old filters are removed', async () => {
  const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
  const executeFilterSearch = jest
    .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
    .mockResolvedValue(labeledFilterSearchResponse);

  const deselectedFilter: SelectableStaticFilter = {
    filter: {
      kind: 'fieldValue',
      fieldId: 'name',
      matcher: Matcher.Equals,
      value: 'first name 1'
    },
    displayName: 'first name 1',
    selected: false
  };
  function DeselectFiltersButton(): React.JSX.Element {
    const answerAction = useSearchActions();

    const handleClickDeselectFilter = () => {
      answerAction.setFilterOption(deselectedFilter);
    };
    return (
      <button onClick={handleClickDeselectFilter}>
        Deselect Filter
      </button>
    );

  }

  render(
    <SearchHeadlessContext.Provider value={generateMockedHeadless()}>
      <FilterSearch searchFields={searchFieldsProp} />
      <DeselectFiltersButton />
    </SearchHeadlessContext.Provider>
  );

  const searchBarElement = screen.getByRole('combobox');
  expect(searchBarElement).toHaveValue('');
  await userEvent.type(searchBarElement, 'first name 1');
  await waitForDebounce();

  expect(await screen.findByRole('combobox')).toHaveDisplayValue('first name 1');
  await userEvent.type(searchBarElement, '{enter}');

  expect(executeFilterSearch).toHaveBeenCalled();

  expect(setFilterOption).toHaveBeenCalledWith({ ...deselectedFilter, selected: true });

  const mockDeselectButton = screen.getByRole('button');
  await userEvent.click(mockDeselectButton);

  expect(setFilterOption).toHaveBeenCalledWith(deselectedFilter);

  expect(searchBarElement).toHaveValue('');
});

it('toggling the dropdown does not change selected filters', async () => {
  const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
  const executeFilterSearch = jest
    .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
    .mockResolvedValue(labeledFilterSearchResponse);

  render(
    <div>
      <SearchHeadlessContext.Provider value={generateMockedHeadless()}>
        <FilterSearch searchFields={searchFieldsProp} />
      </SearchHeadlessContext.Provider>
      <div>external div</div>
    </div>
  );

  const searchBarElement = screen.getByRole('combobox');
  const externalDiv = screen.getByText('external div');
  await userEvent.type(searchBarElement, 'first name 1');
  await waitForDebounce();
  expect(await screen.findByRole('combobox')).toHaveDisplayValue('first name 1');
  await userEvent.type(searchBarElement, '{enter}');

  expect(executeFilterSearch).toHaveBeenCalled();

  expect(setFilterOption).toHaveBeenCalledTimes(1);

  userEvent.click(searchBarElement);
  userEvent.click(externalDiv);

  expect(setFilterOption).toHaveBeenCalledTimes(1);
});

it('displays near me button when showCurrentLocationButton is true', () => {
  const { rerenderWithLocale } = renderFilterSearch({
    searchFields: searchFieldsProp,
    showCurrentLocationButton: true
  });
  const nearMeButton = screen.getByRole('button', { name: 'Use Current Location' });
  expect(nearMeButton).toBeDefined();

  rerenderWithLocale('vi');
  const localizedNearMeButton = screen.getByRole('button', { name: 'Dùng vị trí hiện tại' });
  expect(localizedNearMeButton).toBeDefined();
});
