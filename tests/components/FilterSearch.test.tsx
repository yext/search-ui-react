import { FilterSearch } from '../../src/components/FilterSearch';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as searchOperations from '../../src/utils/search-operations';
import { mockAnswersActions, spyOnActions } from '../__utils__/mocks';
import { labeledFilterSearchResponse, unlabeledFilterSearchResponse, noResultsFilterSearchResponse } from '../../tests/__fixtures__/data/filtersearch';
import { Matcher } from '@yext/answers-headless-react';

jest.mock('@yext/answers-headless-react');
const actions = spyOnActions();

const setFilterOption = jest.fn();
const setOffset = jest.fn();
const searchFieldsProp = [{
  fieldApiName: 'name',
  entityType: 'ce_person'
}];

describe('search with section labels', () => {
  beforeEach(() => {
    mockAnswersActions({
      setFilterOption,
      setOffset,
      executeFilterSearch: jest.fn().mockResolvedValue(labeledFilterSearchResponse)
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

  it('displays characters typed in search bar correctly',() => {
    render(<FilterSearch searchFields={searchFieldsProp}/>);
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'na');
    expect(searchBarElement).toHaveValue('na');
    userEvent.type(searchBarElement, '{backspace}');
    expect(searchBarElement).toHaveValue('n');
  });

  it('triggers a filter search every time a character is typed or backspaced', () => {
    render(<FilterSearch searchFields={searchFieldsProp}/>);
    const searchBarElement = screen.getByRole('textbox');
    const expectedFilterSearchFields = [{
      entityType: 'ce_person',
      fetchEntities: false,
      fieldApiName: 'name'
    }];

    userEvent.type(searchBarElement, 'na');
    expect(actions.executeFilterSearch).toHaveBeenLastCalledWith('na', false, expectedFilterSearchFields);
    userEvent.type(searchBarElement, '{backspace}');
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
    await waitFor(() => {
      const autocompleteSection= screen.getByText('First name');
      expect(autocompleteSection).toBeDefined();
    });
  });

  it('fills the search bar with an autocomplete result when a user selects it', async () => {
    render (<FilterSearch searchFields={searchFieldsProp}/>);
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    await waitFor(() => screen.findByText('first name 1'));

    userEvent.type(searchBarElement, '{arrowdown}');
    expect(searchBarElement).toHaveValue('first name 1');
    userEvent.type(searchBarElement, '{arrowdown}');
    expect(searchBarElement).toHaveValue('first name 2');
  });

  it('triggers a search on pressing "enter" when an autocomplete result is selected', async () => {
    const mockExecuteSearch = jest.spyOn(searchOperations, 'executeSearch').mockImplementation();
    render (<FilterSearch searchFields={searchFieldsProp}/>);
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    await waitFor(() => screen.findByText('first name 1'));

    const expectedSetFilterOptionParam = {
      fieldId: 'name',
      matcher: Matcher.Equals,
      value: 'first name 1' ,
      displayName: 'first name 1',
      selected: true
    };
    const expectedSetOffsetParam = 0;

    userEvent.type(searchBarElement, '{arrowdown}{enter}');
    expect(setFilterOption).toBeCalledWith(expectedSetFilterOptionParam);
    expect(setOffset).toBeCalledWith(expectedSetOffsetParam);

    const setFilterOptionCallOrder = setFilterOption.mock.invocationCallOrder[0];
    const setOffsetCallOrder = setOffset.mock.invocationCallOrder[0];
    const mockExecuteSearchCallOrder = mockExecuteSearch.mock.invocationCallOrder[0];
    expect(setFilterOptionCallOrder).toBeLessThan(mockExecuteSearchCallOrder);
    expect(setOffsetCallOrder).toBeLessThan(mockExecuteSearchCallOrder);
  });

  it('does not trigger a search on pressing "enter" if no autocomplete result is selected', async () => {
    const mockExecuteSearch = jest.spyOn(searchOperations, 'executeSearch').mockImplementation();
    render (<FilterSearch searchFields={searchFieldsProp}/>);
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n{enter}');
    expect(setFilterOption).not.toBeCalled();
    expect(setOffset).not.toBeCalled();
    expect(mockExecuteSearch).not.toBeCalled();
  });

  it('triggers a search when an autocomplete result is clicked', async () => {
    const mockExecuteSearch = jest.spyOn(searchOperations, 'executeSearch').mockImplementation();
    render (<FilterSearch searchFields={searchFieldsProp}/>);
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    const autocompleteSuggestion = await waitFor(() => screen.findByText('first name 1'));


    const expectedSetFilterOptionParam = {
      fieldId: 'name',
      matcher: Matcher.Equals,
      value: 'first name 1' ,
      displayName: 'first name 1',
      selected: true
    };
    const expectedSetOffsetParam = 0;

    userEvent.click(autocompleteSuggestion);
    expect(setFilterOption).toBeCalledWith(expectedSetFilterOptionParam);
    expect(setOffset).toBeCalledWith(expectedSetOffsetParam);

    const setFilterOptionCallOrder = setFilterOption.mock.invocationCallOrder[0];
    const setOffsetCallOrder = setOffset.mock.invocationCallOrder[0];
    const mockExecuteSearchCallOrder = mockExecuteSearch.mock.invocationCallOrder[0];
    expect(setFilterOptionCallOrder).toBeLessThan(mockExecuteSearchCallOrder);
    expect(setOffsetCallOrder).toBeLessThan(mockExecuteSearchCallOrder);
  });
});

describe('search without section labels', () => {
  it('shows autocomplete results, if they exist, when a character is typed', async () => {
    mockAnswersActions({
      setFilterOption,
      setOffset,
      executeFilterSearch: jest.fn().mockResolvedValue(unlabeledFilterSearchResponse)
    });
    jest.spyOn(searchOperations, 'executeSearch').mockImplementation();

    render (<FilterSearch searchFields={searchFieldsProp}/>);
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    await waitFor(() => {
      const autocompleteSuggestion = screen.getByText('first name 1');
      expect(autocompleteSuggestion).toBeDefined();
    });
  });
});

describe('screen reader', () => {
  it('renders ScreenReader messages with section labels', async () => {
    mockAnswersActions({
      setFilterOption,
      setOffset,
      executeFilterSearch: jest.fn().mockResolvedValue(labeledFilterSearchResponse)
    });

    render(<FilterSearch searchFields={searchFieldsProp}/>);
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    const expectedScreenReaderMessage = '2 First name autocomplete options found. 1 Last name autocomplete option found.';
    await waitFor(() => {
      const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
      expect(screenReaderMessage).toBeDefined();
    });
  });

  it('renders ScreenReader messages without section labels', async () => {
    mockAnswersActions({
      setFilterOption,
      setOffset,
      executeFilterSearch: jest.fn().mockResolvedValue(unlabeledFilterSearchResponse)
    });

    render(<FilterSearch searchFields={searchFieldsProp}/>);
    const searchBarElement = screen.getByRole('textbox');

    userEvent.type(searchBarElement, 'n');
    const expectedScreenReaderMessage = '3 autocomplete options found.';
    await waitFor(() => {
      const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
      expect(screenReaderMessage).toBeDefined();
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
    const expectedScreenReaderMessage = '0 autocomplete options found.';
    await waitFor(() => {
      const screenReaderMessage = screen.getByText(expectedScreenReaderMessage);
      expect(screenReaderMessage).toBeDefined();
    });
  });
});