import React from 'react';
import { render, screen } from '@testing-library/react';
import { Matcher, SearchActions, State } from '@yext/search-headless-react';
import { mockAnswersHooks, spyOnActions } from '../__utils__/mocks';
import { FilterOptionConfig } from '../../src/components/Filters';
import userEvent from '@testing-library/user-event';
import { StaticFilters, StaticFiltersProps } from '../../src/components';
import { staticFilters, staticFiltersProps } from '../__fixtures__/data/filters';
import { testSSR } from '../ssr/utils';

const hoursFilterProps: StaticFiltersProps = {
  fieldId: 'builtin.hours',
  title: 'Open Now',
  filterOptions: [
    {
      value: 'now',
      matcher: Matcher.OpenAt
    }
  ]
};

const mockedState: Partial<State> = {
  filters: {
    static: staticFilters
  },
  vertical: {
    verticalKey: 'vertical1',
  },
  meta: {
    searchType: 'vertical'
  }
};

const mockedActions = {
  state: mockedState,
  setOffset: jest.fn(),
  setFilterOption: jest.fn(),
  resetFacets: jest.fn(),
  executeVerticalQuery: jest.fn()
};

const mockedUtils = {
  isCloseMatch: (_label: string, searchValue: string) => {
    return searchValue ? false : true;
  }
};

jest.mock('@yext/search-headless-react');

describe('Static Filters', () => {
  beforeEach(() => {
    mockAnswersHooks({ mockedState, mockedActions, mockedUtils });
  });

  it('renders identical content between the server and the client.', () => {
    testSSR(<StaticFilters {...staticFiltersProps} />);
  });

  it('Properly renders default, basic static filters', () => {
    render(<StaticFilters {...staticFiltersProps} />);

    expect(screen.getByRole('button', { name: 'Puppy Preference' })).toBeDefined();
    expect(screen.queryByRole('textbox')).toBeNull();

    expect(screen.queryByText('Marty')).toBeNull();
    expect(screen.getByText('MARTY!')).toBeDefined();
    expect(screen.getByText('Frodo')).toBeDefined();
    expect(screen.getByText('Bleecker')).toBeDefined();
    expect(screen.getByText('Clifford')).toBeDefined();
  });

  it('Properly renders static filters with Matchers other than Equals', () => {
    render(<StaticFilters {...hoursFilterProps} />);

    expect(screen.getByRole('button', { name: 'Open Now' })).toBeDefined();
    expect(screen.queryByRole('textbox')).toBeNull();

    expect(screen.getByText('Open Now')).toBeDefined();
  });

  it('Clicking an unselected filter option checkbox selects it', async () => {
    const actions = spyOnActions();
    render(<StaticFilters {...staticFiltersProps} />);

    const martyFilter = staticFiltersProps.filterOptions[0];
    const martyCheckbox: HTMLInputElement = screen.getByLabelText(
      martyFilter.displayName ?? martyFilter.value.toString()
    );
    expect(martyCheckbox.checked).toBeFalsy();

    await userEvent.click(martyCheckbox);
    expectFilterOptionSet(actions, staticFiltersProps.fieldId, martyFilter, true);
  });

  it('Clicking an unselected openAt filter option checkbox selects it', async () => {
    const actions = spyOnActions();
    render(<StaticFilters {...hoursFilterProps} />);

    const hoursFilter = hoursFilterProps.filterOptions[0];
    const hoursCheckbox: HTMLInputElement = screen.getByLabelText(
      hoursFilter.displayName ?? hoursFilter.value.toString()
    );
    expect(hoursCheckbox.checked).toBeFalsy();

    await userEvent.click(hoursCheckbox);
    expectFilterOptionSet(actions, hoursFilterProps.fieldId, hoursFilter, true);
  });

  it('Clicking a selected filter option checkbox unselects it', async () => {
    const actions = spyOnActions();
    render(<StaticFilters {...staticFiltersProps} />);

    const bleeckerFilter = staticFiltersProps.filterOptions[2];
    const bleeckerCheckbox: HTMLInputElement = screen.getByLabelText(bleeckerFilter.value.toString());
    expect(bleeckerCheckbox.checked).toBeTruthy();

    await userEvent.click(bleeckerCheckbox);
    expectFilterOptionSet(actions, staticFiltersProps.fieldId, bleeckerFilter, false);
  });

  it('selectedByDefault sets filters that are not in state', () => {
    const actions = spyOnActions();
    render(<StaticFilters {...staticFiltersProps} />);

    const frodoFilter = staticFiltersProps.filterOptions[1];
    expectFilterOptionSet(actions, staticFiltersProps.fieldId, frodoFilter, true);
  });

  it('selectedByDefault does not set a filter already in state', () => {
    const actions = spyOnActions();
    render(<StaticFilters {...staticFiltersProps} />);

    const cliffordFilter = staticFiltersProps.filterOptions[3];
    expect(actions.setFilterOption).not.toHaveBeenCalledWith({
      fieldId: staticFiltersProps.fieldId,
      matcher: '$eq',
      value: cliffordFilter.value,
      displayName: cliffordFilter.value,
      selected: true
    });
  });

  it('Starts collapsed when defaultExpanded is false', () => {
    render(<StaticFilters {...staticFiltersProps} defaultExpanded={false} />);

    expect(screen.getByRole('button', { name: 'Puppy Preference' })).toBeDefined();
    expect(screen.queryByRole('checkbox', { name: 'Clifford' })).toBeNull();
    expect(screen.getByRole('checkbox', { name: 'Clifford', hidden: true })).toBeDefined();
  });

  it('When collapsible is false, only collapsible label button is removed', () => {
    render(<StaticFilters {...staticFiltersProps} collapsible={false} />);

    expect(screen.queryByRole('button', { name: 'Puppy Preference' })).toBeNull();
    expect(screen.getByText('Puppy Preference')).toBeDefined();
    expect(screen.getByRole('checkbox', { name: 'Clifford' })).toBeDefined();
  });

  it('Stays expanded whenever collapsible is false, even if defaultExpanded is false', () => {
    render(<StaticFilters {...staticFiltersProps} collapsible={false} defaultExpanded={false} />);

    expect(screen.getByText('Puppy Preference')).toBeDefined();
    expect(screen.getByRole('checkbox', { name: 'Clifford' })).toBeDefined();
  });

  it('Search input is added when searchable is true', async () => {
    render(<StaticFilters {...staticFiltersProps} searchable={true} />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeDefined();
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
    await userEvent.type(searchInput, 'dog');
    expect(screen.queryByRole('checkbox')).toBeNull();
  });

  it('Clicking a filter option executes a search when searchOnChange is true', async () => {
    const actions = spyOnActions();
    render(<StaticFilters {...staticFiltersProps} />);

    const martyCheckbox: HTMLInputElement = screen.getByLabelText('MARTY!');
    await userEvent.click(martyCheckbox);
    expect(actions.executeVerticalQuery).toBeCalled();
  });

  it('Clicking a filter option does not execute a search when searchOnChange is false', async () => {
    const actions = spyOnActions();
    render(<StaticFilters {...staticFiltersProps} searchOnChange={false} />);

    const martyCheckbox: HTMLInputElement = screen.getByLabelText('MARTY!');
    await userEvent.click(martyCheckbox);
    expect(actions.executeVerticalQuery).not.toBeCalled();
  });
});

function expectFilterOptionSet(
  actions: SearchActions,
  fieldId: string,
  filterOption: FilterOptionConfig,
  selected: boolean
) {
  expect(actions.setFilterOption).toHaveBeenLastCalledWith({
    filter: {
      kind: 'fieldValue',
      fieldId,
      matcher: filterOption.matcher ?? '$eq',
      value: filterOption.value
    },
    displayName: filterOption.displayName ?? filterOption.value,
    selected
  });
}
