import { FilterSearch } from '../../src/components/FilterSearch';
import { render, screen } from '@testing-library/react';
import * as useSynchronizedRequestFunctions from '../../src/hooks/useSynchronizedRequest';
import userEvent from '@testing-library/user-event';
import * as searchOperations from '../../src/utils/search-operations';
import { mockAnswersActions } from '../__utils__/mocks';
import { sectionedFilterSearchResponse, unsectionedFilterSearchResponse, noResultsFilterSearchResponse } from '../../tests/__fixtures__/data/filtersearch';
import { Matcher } from '@yext/answers-headless-react';

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

  it('does not trigger executeFilterSearch when backspacing in an empty text box', () => {
    render(<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, '{backspace}');
    expect(searchBarElement).toHaveValue('');

    expect(mockedExecuteFilterSearch).toHaveBeenCalledTimes(0);
  });

  it('shows autocomplete results, if they exist, when a character is typed', () => {
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

  it('fills the search bar with an autocomplete result when a user selects it', () => {
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

  it('calls executeSearch when an autocomplete result is selected and "Enter" is pressed', () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);

    const searchBarElement = screen.getByRole('textbox');
    userEvent.type(searchBarElement, 'n');

    const firstAutocompleteSuggestion = screen.getByText('first name 1');
    expect(firstAutocompleteSuggestion).toBeDefined();

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

  it('does not trigger executeSearch on "Enter" if no autocomplete result is selected', () => {
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

  it('calls executeSearch when an autocomplete result is clicked with a cursor', () => {
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
  it('renders ScreenReader messages with section labels', () => {
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

  it('renders ScreenReader messages without section labels', () => {
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

  it('renders 0 results ScreenReader message when there are no results', () => {
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