import { FilterSearch } from '../../src/components/FilterSearch';
import { render, screen } from '@testing-library/react';
import * as useSynchronizedRequestFunctions from '../../src/hooks/useSynchronizedRequest';
import userEvent from '@testing-library/user-event';
import * as searchOperations from '../../src/utils/search-operations';
import { mockAnswersActions } from '../__utils__/mocks';
import { sectionedFilterSearchResponse, unsectionedFilterSearchResponse, noResultsFilterSearchResponse} from '../../tests/__fixtures__/data/filtersearch';

jest.mock('@yext/answers-headless-react');

const mockedExecuteFilterSearch = jest.fn();
const setFilterOption = jest.fn();
const setOffset = jest.fn();
const searchFieldsProp = [{
  fieldApiName: 'name',
  entityType: 'ce-person'
}];

describe('search with section labels', () => {
  beforeEach(() => {
    mockAnswersActions({
      setFilterOption,
      setOffset
    });

    jest.spyOn(searchOperations, 'executeSearch').mockImplementation();
    jest.spyOn(useSynchronizedRequestFunctions, 'useSynchronizedRequest').mockImplementation(() => {
      return [sectionedFilterSearchResponse, mockedExecuteFilterSearch, null];
    });
  });

  it('renders the filter search bar and the "Filter" label', () => {
    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const label = 'Filter';
    const labelElement = screen.getByText(label);
    const searchBarElement = screen.getAllByRole('textbox');

    expect(labelElement).toBeDefined();
    expect(searchBarElement.length).toBe(1);
  });

  it('calls executeFilterSearch every time a character is typed or backspaced', () => {
    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    expect(searchBarElement).toHaveValue('n');
    expect(mockedExecuteFilterSearch).toHaveBeenLastCalledWith('n');

    userEvent.type(searchBarElement, 'a');
    expect(searchBarElement).toHaveValue('na');
    expect(mockedExecuteFilterSearch).toHaveBeenLastCalledWith('na');

    userEvent.type(searchBarElement, '{backspace}');
    expect(searchBarElement).toHaveValue('n');
    expect(mockedExecuteFilterSearch).toHaveBeenLastCalledWith('n');

    expect(mockedExecuteFilterSearch).toHaveBeenCalledTimes(3);
  });

  it('does not trigger executeFilterSearch when backspacing on an empty text box', () => {
    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, '{backspace}');
    expect(searchBarElement).toHaveValue('');

    expect(mockedExecuteFilterSearch).toHaveBeenCalledTimes(0);
  });

  it('shows autocomplete suggestions when a character is typed and suggestions are returned by useSynchronizedSearch', () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    expect(mockedExecuteFilterSearch).toBeCalledWith('n');

    const firstAutocompleteSection= screen.getByText('First name');
    expect(firstAutocompleteSection).toBeDefined();

    const firstAutocompleteSuggestion = screen.getByText('first name 1');
    expect(firstAutocompleteSuggestion).toBeDefined();

    const secondAutocompleteSuggestion = screen.getByText('first name 2');
    expect(secondAutocompleteSuggestion).toBeDefined();

    const secondAutocompleteSection= screen.getByText('Last name');
    expect(secondAutocompleteSection).toBeDefined();

    const thirdAutocompleteSuggestion = screen.getByText('last name 1');
    expect(thirdAutocompleteSuggestion).toBeDefined();
  });

  it('populates the search bar with selected suggestions when users navigate to populated autocomplete suggestions using arrow keys', () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');

    const firstAutocompleteSuggestion = screen.getByText('first name 1');
    expect(firstAutocompleteSuggestion).toBeDefined();

    const secondAutocompleteSuggestion = screen.getByText('first name 2');
    expect(secondAutocompleteSuggestion).toBeDefined();

    userEvent.type(searchBarElement, '{arrowdown}');
    expect(searchBarElement).toHaveValue('first name 1');

    userEvent.type(searchBarElement, '{arrowdown}');
    expect(searchBarElement).toHaveValue('first name 2');
  });

  it('calls executeSearch when an autocomplete suggestion is selected using the arrow keys and "Enter"', () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');

    const firstAutocompleteSuggestion = screen.getByText('first name 1');
    expect(firstAutocompleteSuggestion).toBeDefined();

    userEvent.type(searchBarElement, '{arrowdown}');
    expect(searchBarElement).toHaveValue('first name 1');
    userEvent.type(searchBarElement, '{enter}');
    expect(setFilterOption).toBeCalled();
    expect(setOffset).toBeCalled();
    expect(searchOperations.executeSearch).toBeCalled();
  });

  it('does not trigger executeSearch when "Enter" is pressed if no autocomplete suggestion is selected with the arrow keys first', () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');

    const firstAutocompleteSuggestion = screen.getByText('first name 1');
    expect(firstAutocompleteSuggestion).toBeDefined();

    const secondAutocompleteSuggestion = screen.getByText('first name 2');
    expect(secondAutocompleteSuggestion).toBeDefined();

    userEvent.type(searchBarElement, '{enter}');
    expect(setFilterOption).not.toBeCalled();
    expect(setOffset).not.toBeCalled();
    expect(searchOperations.executeSearch).not.toBeCalled();
  });

  it('calls executeSearch when an autocomplete suggestion is clicked with a cursor', () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    const firstAutocompleteSuggestion = screen.getByText('first name 1');
    expect(firstAutocompleteSuggestion).toBeDefined();

    userEvent.click(firstAutocompleteSuggestion);
    expect(setFilterOption).toBeCalled();
    expect(setOffset).toBeCalled();
    expect(searchOperations.executeSearch).toBeCalled();
  });
});

describe('search without section labels', () => {
  it('populates the dropdown menu with autocomplete results', () => {
    mockAnswersActions({
      setFilterOption,
      setOffset
    });

    jest.spyOn(searchOperations, 'executeSearch').mockImplementation();
    jest.spyOn(useSynchronizedRequestFunctions, 'useSynchronizedRequest').mockImplementation(() => {
      return [unsectionedFilterSearchResponse, mockedExecuteFilterSearch, null];
    });

    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    expect(mockedExecuteFilterSearch).toBeCalledWith('n');

    const firstAutocompleteSuggestion = screen.getByText('first name 1');
    expect(firstAutocompleteSuggestion).toBeDefined();

    const secondAutocompleteSuggestion = screen.getByText('first name 2');
    expect(secondAutocompleteSuggestion).toBeDefined();

    const thirdAutocompleteSuggestion = screen.getByText('last name 1');
    expect(thirdAutocompleteSuggestion).toBeDefined();
  });
});

describe('screen reader', () => {
  it('renders ScreenReader autocomplete result messages with section labels if they are provided', () => {
    mockAnswersActions({
      setFilterOption,
      setOffset
    });

    jest.spyOn(useSynchronizedRequestFunctions, 'useSynchronizedRequest').mockImplementation(() => {
      return [sectionedFilterSearchResponse, mockedExecuteFilterSearch, null];
    });

    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    expect(mockedExecuteFilterSearch).toBeCalledWith('n');

    const expectedScreenReaderMessage = '2 First name autocomplete options found. 1 Last name autocomplete option found.';
    const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
    expect(screenReaderMessage).toBeInTheDocument();

  });

  it('renders ScreenReader autocomplete result messages and omits section labels if they are not provided', () => {
    mockAnswersActions({
      setFilterOption,
      setOffset
    });

    jest.spyOn(useSynchronizedRequestFunctions, 'useSynchronizedRequest').mockImplementation(() => {
      return [unsectionedFilterSearchResponse, mockedExecuteFilterSearch, null];
    });

    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    expect(mockedExecuteFilterSearch).toBeCalledWith('n');

    const expectedScreenReaderMessage = '3 autocomplete options found.';
    const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
    expect(screenReaderMessage).toBeInTheDocument();
  });

  it('renders ScreenReader autocomplete result messages even if there are no autocomplete suggestions', () => {
    mockAnswersActions({
      setFilterOption,
      setOffset
    });

    jest.spyOn(useSynchronizedRequestFunctions, 'useSynchronizedRequest').mockImplementation(() => {
      return [noResultsFilterSearchResponse, mockedExecuteFilterSearch, null];
    });

    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');
    expect(mockedExecuteFilterSearch).toBeCalledWith('n');

    const expectedScreenReaderMessage = '0 autocomplete options found.';
    const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
    expect(screenReaderMessage).toBeInTheDocument();
  });
});