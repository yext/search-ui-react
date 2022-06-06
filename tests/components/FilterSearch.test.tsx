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
      {
        value: 'John Doe',
        filter: { fieldId: null, matcher: null, value: 'test' }
      },
      {
        value: 'Jane Doe',
        filter: { fieldId: null, matcher: null, value: 'test' }
      }
    ]
  },
  {
    label: 'Condiments',
    results: [
      {
        value: 'Jam',
        filter: { fieldId: null, matcher: null, value: 'test' }
      }
    ]
  }],
  uuid: null
};

const mockedFilterSearchResponseNoLabels: FilterSearchResponse = {
  sections: [{
    results: [
      {
        value: 'John Doe',
        filter: { fieldId: null, matcher: null, value: 'test' }
      },
      {
        value: 'Jane Doe',
        filter: { fieldId: null, matcher: null, value: 'test' }
      }
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

  it('tests that a filter bar and "Filter" title are rendered', () => {
    render(<FilterSearch searchFields={[searchFieldsProp]}/>);

    const label = 'Filter';
    const labelElement = screen.getByText(label);
    const searchBarElement = screen.getAllByRole('textbox');

    expect(labelElement).toBeDefined();
    expect(searchBarElement.length).toBe(1);
  });

  it('tests that executeFilterSearch is called once every time a charachter is entered', () => {
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

  it('tests that executeFilterSearch is called when characters changed by backspace', () => {
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

  it('tests that when a character is typed and an autocomplete is returned by useSynchronizedSearch, the autocomplete suggestions and their sections show in the dropdown menu', () => {
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

  it('tests users can navigate autocomplete dropdown using arrow keys, causing the textbox to fill with the selected autofill option', () => {
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

  it('tests that selecting an autocomplete suggestion using arrow keys and enter calls "executeSearch"', () => {
    render (<FilterSearch searchFields={[searchFieldsProp]}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'J');
    const firstAutocompleteSuggestion = screen.getByText('John Doe');
    expect(firstAutocompleteSuggestion).toBeDefined();

    userEvent.type(searchBarElement, '{arrowdown}{enter}');
    expect(setFilterOption).toBeCalled();
    expect(setOffset).toBeCalled();
    expect(searchOperations.executeSearch).toBeCalled();
  });

  it('tests that pressing "Enter" after providing input does not trigger executeSearch if an option is not selected with the arrow keys, even if autocomplete values are returned', () => {
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

  it('tests that selecting an autocomplete suggestion by clicking with a cursor calls "executeSearch"', () => {
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
  beforeEach(() => {
    mockAnswersActions({
      setFilterOption,
      setOffset
    });

    jest.spyOn(searchOperations, 'executeSearch').mockImplementation();
    jest.spyOn(useSynchronizedRequestFunctions, 'useSynchronizedRequest').mockImplementation(() => {
      return [mockedFilterSearchResponseNoLabels, mockedExecuteFilterSearch, null];
    });
  });

  it('tests that dropdown functionality is preserved even when no section label is provided', () => {
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

