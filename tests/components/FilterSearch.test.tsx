import { FilterSearch, FilterSearchProps } from '../../src/components/FilterSearch';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as searchOperations from '../../src/utils/search-operations';
import {
  labeledFilterSearchResponse,
  unlabeledFilterSearchResponse,
  noResultsFilterSearchResponse
} from '../../tests/__fixtures__/data/filtersearch';
import { Matcher, State, SearchHeadless, SearchHeadlessContext, useSearchActions, SelectableStaticFilter } from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';

const searchFieldsProp = [{
  fieldApiName: 'name',
  entityType: 'ce_person'
}];

const mockedState: Partial<State> = {
  vertical: {
    verticalKey: 'vertical',
  },
  meta: {
    searchType: 'vertical'
  }
};

const mockedStateWithSingleFilter: Partial<State> = {
  ...mockedState,
  filters: {
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
  }
};

const mockedStateWithMultipleFilters: Partial<State> = {
  ...mockedState,
  filters: {
    static: [...(mockedStateWithSingleFilter.filters?.static ?? []), {
      filter: {
        kind: 'fieldValue',
        fieldId: 'name',
        matcher: Matcher.Equals,
        value: 'Fake Person'
      },
      selected: true,
      displayName: 'Fake Person'
    }]
  }
};

describe('search with section labels', () => {
  it('renders the filter search bar, "Filter" label, and default placeholder text', () => {
    renderFilterSearch({ searchFields: searchFieldsProp, label: 'Filter' });
    const label = 'Filter';
    const labelElement = screen.getByText(label);
    const searchBarElement = screen.getAllByRole<HTMLInputElement>('textbox');

    expect(labelElement).toBeDefined();
    expect(searchBarElement.length).toBe(1);
    expect(searchBarElement[0].placeholder).toBe('Search here...');
  });

  it('sets the placeholder text to the specified value', () => {
    renderFilterSearch({ searchFields: searchFieldsProp, placeholder: 'Search...' });
    const searchBarElement = screen.getByRole<HTMLInputElement>('textbox');
    expect(searchBarElement.placeholder).toBe('Search...');
  });

  it('displays characters typed in search bar correctly', async () => {
    renderFilterSearch();
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'na');
    await waitFor(() => {
      expect(searchBarElement).toHaveValue('na');
    });

    userEvent.type(searchBarElement, '{backspace}');
    await waitFor(() => {
      expect(searchBarElement).toHaveValue('n');
    });
  });

  it('triggers a filter search every time a character is typed or backspaced', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    renderFilterSearch();
    const searchBarElement = screen.getByRole('textbox');
    const expectedFilterSearchFields = [{
      entityType: 'ce_person',
      fetchEntities: false,
      fieldApiName: 'name'
    }];

    userEvent.type(searchBarElement, 'na');
    await waitFor(() => {
      expect(executeFilterSearch).toHaveBeenLastCalledWith('na', false, expectedFilterSearchFields);
    });

    userEvent.type(searchBarElement, '{backspace}');
    await waitFor(() => {
      expect(executeFilterSearch).toHaveBeenLastCalledWith('n', false, expectedFilterSearchFields);
    });
    expect(executeFilterSearch).toHaveBeenCalledTimes(3);
  });

  it('does not trigger a filter search when backspacing in an empty text box', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    renderFilterSearch();
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, '{backspace}');
    await waitFor(() => {
      expect(searchBarElement).toHaveValue('');
    });
    expect(executeFilterSearch).toHaveBeenCalledTimes(0);
  });

  it('shows autocomplete results, if they exist, when a character is typed', async () => {
    renderFilterSearch();
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    await waitFor(() => {
      expect(executeFilterSearch).toHaveBeenCalled();
    });
    await waitFor(() => {
      const autocompleteSection = screen.getByText('First name');
      expect(autocompleteSection).toBeDefined();
    });
  });

  it('input value stays the same when a user selects a filter', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    renderFilterSearch();
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    await waitFor(() => screen.findByText('first name 1'));

    userEvent.type(searchBarElement, '{arrowdown}');
    await waitFor(() => expect(executeFilterSearch).toHaveBeenCalled());
    expect(searchBarElement).toHaveValue('n');
  });

  it('remove old filter value when a new one is entered', async () => {
    renderFilterSearch();
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    await waitFor(() => expect(executeFilterSearch).toHaveBeenCalled());
    await waitFor(() => screen.findByText('first name 1'));
    userEvent.type(searchBarElement, '{enter}');
    await waitFor(() => {
      expect(setFilterOption).toBeCalledWith({
        filter: {
          kind: 'fieldValue',
          fieldId: 'name',
          matcher: Matcher.Equals,
          value: 'first name 1'
        },
        displayName: 'first name 1',
        selected: true
      });
    });

    userEvent.clear(searchBarElement);
    userEvent.type(searchBarElement, 'n');
    await waitFor(() => screen.findByText('first name 2'));
    userEvent.type(searchBarElement, '{arrowdown}{enter}');
    await waitFor(() => {
      expect(setFilterOption).toBeCalledWith({
        filter: {
          kind: 'fieldValue',
          fieldId: 'name',
          matcher: Matcher.Equals,
          value: 'first name 1'
        },
        selected: false
      });
    });
    expect(setFilterOption).toBeCalledWith({
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
    const searchBarElement = screen.getByRole('textbox');
    expect(searchBarElement).toHaveValue('Real Person');
  });

  it('logs a warning when multiple matching filters in state and no current filter selected', async () => {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
    renderFilterSearch(undefined, mockedStateWithMultipleFilters);
    const searchBarElement = screen.getByRole('textbox');
    expect(searchBarElement).toHaveValue('Real Person');
    expect(consoleWarnSpy).toBeCalledWith(
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
    const searchBarElement = screen.getByRole('textbox');
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
    const searchBarElement = screen.getByRole('textbox');

    userEvent.clear(searchBarElement);
    userEvent.type(searchBarElement, 'n');
    await waitFor(() => expect(executeFilterSearch).toHaveBeenCalled());
    await waitFor(() => screen.findByText('first name 1'));
    userEvent.type(searchBarElement, '{enter}');
    await waitFor(() => {
      expect(setFilterOption).toBeCalledWith({
        filter: {
          kind: 'fieldValue',
          fieldId: 'name',
          matcher: Matcher.Equals,
          value: 'Real Person'
        },
        selected: false
      });
    });
    expect(setFilterOption).toBeCalledWith({
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
    const searchBarElement = screen.getByRole('textbox');

    userEvent.clear(searchBarElement);
    userEvent.type(searchBarElement, 'n');
    await waitFor(() => expect(executeFilterSearch).toHaveBeenCalled());
    await waitFor(() => screen.findByText('first name 1'));
    userEvent.type(searchBarElement, '{enter}');
    await waitFor(() => {
      expect(setFilterOption).toBeCalledWith({
        filter: {
          kind: 'fieldValue',
          fieldId: 'name',
          matcher: Matcher.Equals,
          value: 'Real Person'
        },
        selected: false
      });
    });
    expect(setFilterOption).toBeCalledWith({
      filter: {
        kind: 'fieldValue',
        fieldId: 'name',
        matcher: Matcher.Equals,
        value: 'Fake Person'
      },
      selected: false
    });
    expect(setFilterOption).toBeCalledWith({
      filter: {
        kind: 'fieldValue',
        fieldId: 'name',
        matcher: Matcher.Equals,
        value: 'first name 1'
      },
      displayName: 'first name 1',
      selected: true
    });
    expect(consoleWarnSpy).toBeCalledWith(
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
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    await waitFor(() => screen.findByText('first name 1'));

    userEvent.type(searchBarElement, '{enter}');
    await waitFor(() => {
      expect(executeFilterSearch).toHaveBeenCalled();
    });
    expect(mockedOnSelect).toBeCalled();
    expect(setFilterOption).not.toBeCalled();
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
      const searchBarElement = screen.getByRole('textbox');

      userEvent.type(searchBarElement, 'n');
      await waitFor(() => expect(executeFilterSearch).toHaveBeenCalled());
      await waitFor(() => screen.findByText('first name 1'));

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

      userEvent.type(searchBarElement, '{enter}');
      await waitFor(() => {
        expect(setFilterOption).toBeCalledWith(expectedSetFilterOptionParam);
      });
      expect(setOffset).toBeCalledWith(expectedSetOffsetParam);
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
      const searchBarElement = screen.getByRole('textbox');

      userEvent.type(searchBarElement, 'n{enter}');

      await waitFor(() => {
        expect(setFilterOption).not.toBeCalled();
      });
      expect(setOffset).not.toBeCalled();
      expect(resetFacets).not.toBeCalled();
      expect(mockExecuteSearch).not.toBeCalled();
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
      const searchBarElement = screen.getByRole('textbox');

      userEvent.type(searchBarElement, 'n');
      await waitFor(() => expect(executeFilterSearch).toHaveBeenCalled());
      const autocompleteSuggestion = await waitFor(() => screen.findByText('first name 1'));

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

      userEvent.click(autocompleteSuggestion);
      expect(setFilterOption).toBeCalledWith(expectedSetFilterOptionParam);
      expect(setOffset).toBeCalledWith(expectedSetOffsetParam);
      expect(resetFacets).toBeCalled();

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
        const searchBarElement = screen.getByRole('textbox');

        userEvent.type(searchBarElement, 'n');
        await waitFor(() => screen.findByText('first name 1'));

        userEvent.type(searchBarElement, '{enter}');
        await waitFor(() => {
          expect(executeFilterSearch).toHaveBeenCalled();
        });
        expect(mockedOnSelect).toBeCalled();
        expect(setFilterOption).not.toBeCalled();
        expect(mockExecuteSearch).not.toBeCalled();
        expect(consoleWarnSpy).toBeCalledWith('Both searchOnSelect and onSelect props were passed to the component.'
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
      const searchBarElement = screen.getByRole('textbox');

      userEvent.type(searchBarElement, 'n');
      await waitFor(() => screen.findByText('first name 1'));

      userEvent.type(searchBarElement, '{enter}');
      await waitFor(() => {
        expect(executeFilterSearch).toHaveBeenCalled();
      });
      expect(setFilterOption).toBeCalledWith({
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

    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    await waitFor(() => {
      expect(executeFilterSearch).toHaveBeenCalled();
    });
    const autocompleteSuggestion = screen.getByText('first name 1');
    expect(autocompleteSuggestion).toBeDefined();
  });

  it('pressing enter without navigating selects first filter in input', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(unlabeledFilterSearchResponse);
    renderFilterSearch();
    const inputNode = screen.getByRole('textbox');
    userEvent.type(inputNode, 'n');
    await waitFor(() => {
      expect(executeFilterSearch).toHaveBeenCalled();
    });
    userEvent.keyboard('{enter}');
    expect(inputNode).toHaveValue('first name 1');
  });
});

describe('screen reader', () => {
  it('renders ScreenReader messages with section labels', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(labeledFilterSearchResponse);
    renderFilterSearch();

    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    await waitFor(() => {
      expect(executeFilterSearch).toHaveBeenCalled();
    });
    const expectedScreenReaderMessage = '2 First name autocomplete options found. 1 Last name autocomplete option found.';
    await waitFor(() => {
      const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
      expect(screenReaderMessage).toBeDefined();
    });
  });

  it('renders ScreenReader messages without section labels', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(unlabeledFilterSearchResponse);
    renderFilterSearch();

    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    await waitFor(() => {
      expect(executeFilterSearch).toHaveBeenCalled();
    });
    const expectedScreenReaderMessage = '3 autocomplete options found.';
    await waitFor(() => {
      const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
      expect(screenReaderMessage).toBeDefined();
    });
  });

  it('renders 0 results ScreenReader message when there are no results', async () => {
    const executeFilterSearch = jest
      .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
      .mockResolvedValue(noResultsFilterSearchResponse);
    renderFilterSearch();

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    await waitFor(() => {
      expect(executeFilterSearch).toHaveBeenCalled();
    });
    const expectedScreenReaderMessage = '0 autocomplete options found.';
    await waitFor(() => {
      const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
      expect(screenReaderMessage).toBeDefined();
    });
  });
});

function renderFilterSearch(
  props: FilterSearchProps = { searchFields: searchFieldsProp },
  state = mockedState
): RenderResult {
  return render(<SearchHeadlessContext.Provider value={generateMockedHeadless(state)}>
    <FilterSearch {...props} />
  </SearchHeadlessContext.Provider>);
}

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
  function DeselectFiltersButton(): JSX.Element {
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

  render(<SearchHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
    <FilterSearch searchFields={searchFieldsProp} />
    <DeselectFiltersButton />
  </SearchHeadlessContext.Provider>);

  const searchBarElement = screen.getByRole('textbox');
  userEvent.type(searchBarElement, 'first name 1');
  expect(await screen.findByRole('textbox')).toHaveDisplayValue('first name 1');
  userEvent.type(searchBarElement, '{enter}');

  await waitFor(() => {
    expect(executeFilterSearch).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(setFilterOption).toHaveBeenCalledWith({ ...deselectedFilter, selected: true });
  });

  const mockDeselectButton = screen.getByRole('button');
  userEvent.click(mockDeselectButton);

  await waitFor(() => {
    expect(setFilterOption).toBeCalledWith(deselectedFilter);
  });
  await waitFor(() => {
    expect(searchBarElement).toHaveValue('');
  });
});

it('toggling the dropdown does not change selected filters', async () => {
  const setFilterOption = jest.spyOn(SearchHeadless.prototype, 'setFilterOption');
  const executeFilterSearch = jest
    .spyOn(SearchHeadless.prototype, 'executeFilterSearch')
    .mockResolvedValue(labeledFilterSearchResponse);

  render(
    <div>
      <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedState)}>
        <FilterSearch searchFields={searchFieldsProp} />
      </SearchHeadlessContext.Provider>
      <div>external div</div>
    </div>
  );

  const searchBarElement = screen.getByRole('textbox');
  const externalDiv = screen.getByText('external div');
  userEvent.type(searchBarElement, 'first name 1');
  expect(await screen.findByRole('textbox')).toHaveDisplayValue('first name 1');
  userEvent.type(searchBarElement, '{enter}');

  await waitFor(() => {
    expect(executeFilterSearch).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(setFilterOption).toBeCalledTimes(1);
  });

  userEvent.click(searchBarElement);
  userEvent.click(externalDiv);

  expect(setFilterOption).toBeCalledTimes(1);
});
