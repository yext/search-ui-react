import { FilterSearch } from '../../src/components/FilterSearch';
import { FilterSearchResponse } from '@yext/answers-headless-react';
import { render, screen } from '@testing-library/react';
import * as useSynchronizedRequestFunctions from '../../src/hooks/useSynchronizedRequest';
import userEvent from '@testing-library/user-event';
import * as searchOperations from '../../src/utils/search-operations';
import { mockAnswersActions } from '../__utils__/mocks';

jest.mock('@yext/answers-headless-react');

const mockedFilterSearchResponse: FilterSearchResponse = {
  sections: [{
    label: 'People',
    results: [
      { value: 'John Doe',
        filter: { fieldId: null, matcher: null, value: 'test' } },
      { value: 'Jane Doe',
        filter: { fieldId: null, matcher: null, value: 'test' } }
    ]
  },
  {
    label: 'Condiments',
    results: [
      { value: 'Jam',
        filter: { fieldId: null, matcher: null, value: 'test' } }
    ]
  }],
  uuid: null
};

const mockedFilterSearchResponseNoLabels: FilterSearchResponse = {
  sections: [{
    results: [
      { value: 'John Doe',
        filter: { fieldId: null, matcher: null, value: 'test' } },
      { value: 'Jane Doe',
        filter: { fieldId: null, matcher: null, value: 'test' } }
    ]
  }],
  uuid: null
};

const mockedFilterSearchResponseNoResults: FilterSearchResponse = {
  sections: [{
    results:[]
  }],
  uuid: null
};

const mockedExecuteFilterSearch = jest.fn();
const setFilterOption = jest.fn();
const setOffset = jest.fn();
const searchFieldsProp = {
  fieldApiName: 'name',
  entityType: 'ce-person'
};

describe('tests using data with section labels', () => {
  beforeEach(() => {
    mockAnswersActions({
      setFilterOption,
      setOffset
    });

    jest.spyOn(searchOperations, 'executeSearch').mockImplementation();
    jest.spyOn(useSynchronizedRequestFunctions, 'useSynchronizedRequest').mockImplementation(() => {
      return [mockedFilterSearchResponse, mockedExecuteFilterSearch, null];
    });
  });

  it('renders the filter search bar and the "Filter" label', () => {
    render(<FilterSearch searchFields={[searchFieldsProp]}/>);

    const label = 'Filter';
    const labelElement = screen.getByText(label);
    const searchBarElement = screen.getAllByRole('textbox');

    expect(labelElement).toBeDefined();
    expect(searchBarElement.length).toBe(1);
  });

  it('calls executeFilterSearch every time a charachter is entered', () => {
    render(<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    expect(searchBarElement).toBeDefined();

    userEvent.type(searchBarElement, 'J');
    expect(searchBarElement).toHaveValue('J');
    expect(mockedExecuteFilterSearch).toBeCalledWith('J');

    userEvent.type(searchBarElement, 'o');
    expect(searchBarElement).toHaveValue('Jo');
    expect(mockedExecuteFilterSearch).toBeCalledWith('Jo');

    expect(mockedExecuteFilterSearch.mock.calls.length).toBe(2);
  });

  it('calls executeFilterSearch when characters changed by backspace', () => {
    render(<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    expect(searchBarElement).toBeDefined();

    userEvent.type(searchBarElement, 'J');
    expect(searchBarElement).toHaveValue('J');
    expect(mockedExecuteFilterSearch).toBeCalledWith('J');

    userEvent.type(searchBarElement, '{backspace}');
    expect(searchBarElement).toHaveValue('');
    expect(mockedExecuteFilterSearch).toBeCalledWith('');

    // backspace on an empty text box should not trigger a search.
    userEvent.type(searchBarElement, '{backspace}');
    expect(searchBarElement).toHaveValue('');

    expect(mockedExecuteFilterSearch.mock.calls.length).toBe(2);
  });

  it('shows autocomplete suggestions when a character is typed and suggestions are returned by useSynchronizedSearch', () => {
    render (<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'J');
    expect(mockedExecuteFilterSearch).toBeCalledWith('J');

    const firstAutocompleteSection= screen.getByText('People');
    expect(firstAutocompleteSection).toBeDefined();

    const firstAutocompleteSuggestion = screen.getByText('John Doe');
    expect(firstAutocompleteSuggestion).toBeDefined();

    const secondAutocompleteSuggestion = screen.getByText('Jane Doe');
    expect(secondAutocompleteSuggestion).toBeDefined();

    const secondAutocompleteSection= screen.getByText('Condiments');
    expect(secondAutocompleteSection).toBeDefined();

    const thirdAutocompleteSuggestion = screen.getByText('Jam');
    expect(thirdAutocompleteSuggestion).toBeDefined();
  });

  it('fills the search bar with selected suggestions when users navigate to populated autocomplete suggestions using arrow keys', () => {
    render (<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'J');

    const firstAutocompleteSuggestion = screen.getByText('John Doe');
    expect(firstAutocompleteSuggestion).toBeDefined();

    userEvent.type(searchBarElement, '{arrowdown}');
    expect(searchBarElement).toHaveValue('John Doe');

    userEvent.type(searchBarElement, '{arrowdown}');
    expect(searchBarElement).toHaveValue('Jane Doe');
  });

  it('calls executeSearch when an autocomplete suggestion is selected using the arrow keys and "Enter"', () => {
    render (<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'J');

    const firstAutocompleteSuggestion = screen.getByText('John Doe');
    expect(firstAutocompleteSuggestion).toBeDefined();

    userEvent.type(searchBarElement, '{arrowdown}');
    expect(searchBarElement).toHaveValue('John Doe');
    userEvent.type(searchBarElement, '{enter}');
    expect(setFilterOption).toBeCalled();
    expect(setOffset).toBeCalled();
    expect(searchOperations.executeSearch).toBeCalled();
  });

  it('does not trigger executeSearch when "Enter" is pressed if an autocomplete suggestion is not selected with the arrow keys first, even if autocomplete values are returned', () => {
    render (<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'J');

    const firstAutocompleteSuggestion = screen.getByText('John Doe');
    expect(firstAutocompleteSuggestion).toBeDefined();

    const secondAutocompleteSuggestion = screen.getByText('Jane Doe');
    expect(secondAutocompleteSuggestion).toBeDefined();

    userEvent.type(searchBarElement, '{enter}');
    expect(setFilterOption).not.toBeCalled();
    expect(setOffset).not.toBeCalled();
    expect(searchOperations.executeSearch).not.toBeCalled();
  });

  it('calls executeSearch when an autocomplete suggestion is clicked with a cursor', () => {
    render (<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'J');
    const firstAutocompleteSuggestion = screen.getByText('John Doe');
    expect(firstAutocompleteSuggestion).toBeDefined();

    userEvent.click(firstAutocompleteSuggestion);
    expect(setFilterOption).toBeCalled();
    expect(setOffset).toBeCalled();
    expect(searchOperations.executeSearch).toBeCalled();
  });
});

describe('tests using data without section labels', () => {
  it('populates the dropdown menu with autocomplete results without section labels if they are not provided', () => {
    mockAnswersActions({
      setFilterOption,
      setOffset
    });

    jest.spyOn(searchOperations, 'executeSearch').mockImplementation();
    jest.spyOn(useSynchronizedRequestFunctions, 'useSynchronizedRequest').mockImplementation(() => {
      return [mockedFilterSearchResponseNoLabels, mockedExecuteFilterSearch, null];
    });

    render (<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'J');
    expect(mockedExecuteFilterSearch).toBeCalledWith('J');

    const firstAutocompleteSuggestion = screen.getByText('John Doe');
    expect(firstAutocompleteSuggestion).toBeDefined();

    const secondAutocompleteSuggestion = screen.getByText('Jane Doe');
    expect(secondAutocompleteSuggestion).toBeDefined();
  });
});

describe('tests screen reader functionality', () => {
  it('renders ScreenReader autocomplete result messages with section labels if they are provided', () => {
    mockAnswersActions({
      setFilterOption,
      setOffset
    });

    jest.spyOn(useSynchronizedRequestFunctions, 'useSynchronizedRequest').mockImplementation(() => {
      return [mockedFilterSearchResponse, mockedExecuteFilterSearch, null];
    });

    render(<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'J');
    expect(mockedExecuteFilterSearch).toBeCalledWith('J');

    const expectedScreenReaderMessage = '2 People autocomplete options found. 1 Condiments autocomplete option found.';
    const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
    expect(screenReaderMessage).toBeInTheDocument();

  });

  it('renders ScreenReader autocomplete result messages and omits section labels if they are not provided', () => {
    mockAnswersActions({
      setFilterOption,
      setOffset
    });

    jest.spyOn(useSynchronizedRequestFunctions, 'useSynchronizedRequest').mockImplementation(() => {
      return [mockedFilterSearchResponseNoLabels, mockedExecuteFilterSearch, null];
    });

    render(<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'J');
    expect(mockedExecuteFilterSearch).toBeCalledWith('J');

    const expectedScreenReaderMessage = '2 autocomplete options found.';
    const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
    expect(screenReaderMessage).toBeInTheDocument();
  });

  it('renders ScreenReader autocomplete result messages even if there is are no autocomplete suggestions', () => {
    mockAnswersActions({
      setFilterOption,
      setOffset
    });

    jest.spyOn(useSynchronizedRequestFunctions, 'useSynchronizedRequest').mockImplementation(() => {
      return [mockedFilterSearchResponseNoResults, mockedExecuteFilterSearch, null];
    });

    render(<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'J');
    expect(mockedExecuteFilterSearch).toBeCalledWith('J');

    const expectedScreenReaderMessage = '0 autocomplete options found.';
    const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
    expect(screenReaderMessage).toBeInTheDocument();
  });
});