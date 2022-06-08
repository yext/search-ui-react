import { FilterSearch } from '../../src/components/FilterSearch';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as searchOperations from '../../src/utils/search-operations';
import { mockAnswersActions, spyOnActions } from '../__utils__/mocks';
import { sectionedFilterSearchResponse, unsectionedFilterSearchResponse, noResultsFilterSearchResponse } from '../../tests/__fixtures__/data/filtersearch';
import { Matcher } from '@yext/answers-headless-react';

jest.mock('@yext/answers-headless-react');
const actions = spyOnActions();

const setFilterOption = jest.fn();
const setOffset = jest.fn();
const searchFieldsProp = [{
  fieldApiName: 'name',
  entityType: 'ce-person'
}];

const expectedFilterSearchFields = [{
  entityType: 'ce-person',
  fetchEntities: false,
  fieldApiName: 'name'
}];

describe('search with section labels', () => {
  beforeEach(() => {
    mockAnswersActions({
      setFilterOption,
      setOffset,
      executeFilterSearch: jest.fn().mockResolvedValue(sectionedFilterSearchResponse)
    });

    jest.spyOn(searchOperations, 'executeSearch').mockImplementation();
  });

  it('renders the filter search bar and the "Filter" label', () => {
    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const label = 'Filter';
    const labelElement = screen.getByText(label);
    const searchBarElement = screen.getAllByRole('textbox');

    expect(labelElement).toBeDefined();
    expect(searchBarElement.length).toBe(1);
  });

  it('triggers a filter search every time a character is typed or backspaced', () => {
    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    expect(searchBarElement).toHaveValue('n');
    expect(actions.executeFilterSearch).toHaveBeenLastCalledWith('n', false, expectedFilterSearchFields);

    userEvent.type(searchBarElement, 'a');
    expect(searchBarElement).toHaveValue('na');
    expect(actions.executeFilterSearch).toHaveBeenLastCalledWith('na', false, expectedFilterSearchFields);

    userEvent.type(searchBarElement, '{backspace}');
    expect(searchBarElement).toHaveValue('n');
    expect(actions.executeFilterSearch).toHaveBeenLastCalledWith('n', false, expectedFilterSearchFields);

    expect(actions.executeFilterSearch).toHaveBeenCalledTimes(3);
  });

  it('does not trigger a filter search when backspacing in an empty text box', () => {
    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, '{backspace}');
    expect(searchBarElement).toHaveValue('');

    expect(actions.executeFilterSearch).toHaveBeenCalledTimes(0);
  });

  it('shows autocomplete results, if they exist, when a character is typed', async () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    expect(actions.executeFilterSearch).toBeCalledWith('n', false, expectedFilterSearchFields);

    await waitFor(() => {
      const firstAutocompleteSection= screen.getByText('First name');
      expect(firstAutocompleteSection).toBeDefined();
    });

    await waitFor(() => {
      const firstAutocompleteSuggestion = screen.getByText('first name 1');
      expect(firstAutocompleteSuggestion).toBeDefined();
    });

    await waitFor(() => {
      const secondAutocompleteSuggestion = screen.getByText('first name 2');
      expect(secondAutocompleteSuggestion).toBeDefined();
    });

    await waitFor(() => {
      const secondAutocompleteSection= screen.getByText('Last name');
      expect(secondAutocompleteSection).toBeDefined();
    });

    await waitFor(() => {
      const thirdAutocompleteSuggestion = screen.getByText('last name 1');
      expect(thirdAutocompleteSuggestion).toBeDefined();
    });
  });

  it('fills the search bar with an autocomplete result when a user selects it', async () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');

    await waitFor(() => {
      const firstAutocompleteSuggestion = screen.getByText('first name 1');
      expect(firstAutocompleteSuggestion).toBeDefined();
    });

    await waitFor(() => {
      const secondAutocompleteSuggestion = screen.getByText('first name 2');
      expect(secondAutocompleteSuggestion).toBeDefined();
    });

    userEvent.type(searchBarElement, '{arrowdown}');
    expect(searchBarElement).toHaveValue('first name 1');

    userEvent.type(searchBarElement, '{arrowdown}');
    expect(searchBarElement).toHaveValue('first name 2');
  });

  it('triggers a search on pressing "enter" when an autocomplete result is selected', async () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');

    await waitFor(() => {
      const firstAutocompleteSuggestion = screen.getByText('first name 1');
      expect(firstAutocompleteSuggestion).toBeDefined();
    });

    userEvent.type(searchBarElement, '{arrowdown}');
    expect(searchBarElement).toHaveValue('first name 1');

    userEvent.type(searchBarElement, '{enter}');
    const expectedSetFilterOptionParam = {
      fieldId: 'ce_person',
      matcher: Matcher.Equals,
      value: 'first name 1' ,
      displayName: 'first name 1',
      selected: true
    };
    const expectedSetOffsetParam = 0;
    expect(setFilterOption).toBeCalledWith(expectedSetFilterOptionParam);
    expect(setOffset).toBeCalledWith(expectedSetOffsetParam);

    const setFilterOptionCallOrder = setFilterOption.mock.invocationCallOrder[0];
    const setOffsetCallOrder = setOffset.mock.invocationCallOrder[0];
    expect(setFilterOptionCallOrder).toBeLessThan(setOffsetCallOrder);

    expect(searchOperations.executeSearch).toBeCalled();
  });

  it('does not trigger a search on pressing "enter" if no autocomplete result is selected', async () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');

    await waitFor(() => {
      const firstAutocompleteSuggestion = screen.getByText('first name 1');
      expect(firstAutocompleteSuggestion).toBeDefined();
    });

    await waitFor(() => {
      const secondAutocompleteSuggestion = screen.getByText('first name 2');
      expect(secondAutocompleteSuggestion).toBeDefined();
    });

    userEvent.type(searchBarElement, '{enter}');
    expect(setFilterOption).not.toBeCalled();
    expect(setOffset).not.toBeCalled();
    expect(searchOperations.executeSearch).not.toBeCalled();
  });

  it('triggers a search when an autocomplete result is clicked', async () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');

    let firstAutocompleteSuggestion;

    await waitFor(() => {
      firstAutocompleteSuggestion = screen.getByText('first name 1');
      expect(firstAutocompleteSuggestion).toBeDefined();
    });

    userEvent.click(firstAutocompleteSuggestion);
    expect(setFilterOption).toBeCalled();
    expect(setOffset).toBeCalled();
    expect(searchOperations.executeSearch).toBeCalled();
  });
});

describe('search without section labels', () => {
  it('shows autocomplete results, if they exist, when a character is typed', async () => {
    mockAnswersActions({
      setFilterOption,
      setOffset,
      executeFilterSearch: jest.fn().mockResolvedValue(unsectionedFilterSearchResponse)
    });

    jest.spyOn(searchOperations, 'executeSearch').mockImplementation();

    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    expect(actions.executeFilterSearch).toBeCalledWith('n', false, expectedFilterSearchFields);

    await waitFor(() => {
      const firstAutocompleteSuggestion = screen.getByText('first name 1');
      expect(firstAutocompleteSuggestion).toBeDefined();
    });

    await waitFor(() => {
      const secondAutocompleteSuggestion = screen.getByText('first name 2');
      expect(secondAutocompleteSuggestion).toBeDefined();
    });

    await waitFor(() => {
      const thirdAutocompleteSuggestion = screen.getByText('last name 1');
      expect(thirdAutocompleteSuggestion).toBeDefined();
    });
  });
});

describe('screen reader', () => {
  it('renders ScreenReader messages with section labels', async () => {
    mockAnswersActions({
      setFilterOption,
      setOffset,
      executeFilterSearch: jest.fn().mockResolvedValue(sectionedFilterSearchResponse)
    });

    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    expect(actions.executeFilterSearch).toBeCalledWith('n', false, expectedFilterSearchFields);

    const expectedScreenReaderMessage = '2 First name autocomplete options found. 1 Last name autocomplete option found.';
    await waitFor(() => {
      const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
      expect(screenReaderMessage).toBeInTheDocument();
    });
  });

  it('renders ScreenReader messages without section labels', async () => {
    mockAnswersActions({
      setFilterOption,
      setOffset,
      executeFilterSearch: jest.fn().mockResolvedValue(unsectionedFilterSearchResponse)
    });

    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    expect(actions.executeFilterSearch).toBeCalledWith('n', false, expectedFilterSearchFields);

    const expectedScreenReaderMessage = '3 autocomplete options found.';
    await waitFor(() => {
      const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
      expect(screenReaderMessage).toBeInTheDocument();
    });
  });

  it('renders 0 results ScreenReader message when there are no results', async () => {
    mockAnswersActions({
      setFilterOption,
      setOffset,
      executeFilterSearch: jest.fn().mockResolvedValue(noResultsFilterSearchResponse)
    });

    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    expect(actions.executeFilterSearch).toBeCalledWith('n', false, expectedFilterSearchFields);

    const expectedScreenReaderMessage = '0 autocomplete options found.';
    await waitFor(() => {
      const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
      expect(screenReaderMessage).toBeInTheDocument();
    });
  });
});