import { render, screen } from '@testing-library/react';
import { AnswersHeadless, State } from '@yext/answers-headless-react';
import { mockAnswersHooks, spyOnActions } from '../__utils__/mocks';
import { FilterOptionConfig } from '../../src/components/Filters';
import userEvent from '@testing-library/user-event';
import { StaticFilters, StaticFiltersProps } from '../../src/components';
import { staticFilters } from '../__fixtures__/data/filters';

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

const staticFiltersProps: StaticFiltersProps = {
  fieldId: 'c_puppyPreference',
  title: 'Puppy Preference',
  filterOptions: [
    {
      value: 'Marty',
      displayName: 'MARTY!'
    },
    {
      value: 'Frodo',
      selectedByDefault: true
    },
    {
      value: 'Bleecker'
    },
    {
      value: 'Clifford',
      selectedByDefault: true
    }
  ]
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

jest.mock('@yext/answers-headless-react');

describe('Static Filters', () => {
  beforeEach(() => {
    mockAnswersHooks({ mockedState, mockedActions, mockedUtils });
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
});

function expectFilterOptionSet(
  actions: AnswersHeadless,
  fieldId: string,
  filterOption: FilterOptionConfig,
  selected: boolean
) {
  expect(actions.setFilterOption).toHaveBeenCalledWith({
    fieldId,
    matcher: '$eq',
    value: filterOption.value,
    displayName: filterOption.displayName ?? filterOption.value,
    selected
  });
}
