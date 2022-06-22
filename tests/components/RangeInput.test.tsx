import userEvent from '@testing-library/user-event';
import { State } from '@yext/answers-headless-react';
import { render, screen, waitFor } from '@testing-library/react';
import { RangeInput } from '../../src/components/Filters';
import { mockAnswersHooks, spyOnActions } from '../__utils__/mocks';
import { Matcher, SelectableFilter } from '@yext/answers-headless-react';
import { FiltersContext, FiltersContextType } from '../../src/components/Filters/FiltersContext';
import { FilterGroupContext, FilterGroupContextType } from '../../src/components/Filters/FilterGroupContext';

const mockedState: Partial<State> = {
  filters: {
    static: [],
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

const selectableFilter: SelectableFilter = {
  selected: true,
  fieldId: '123',
  matcher: Matcher.Between,
  value: 'test'
};

const filterContextValue: FiltersContextType = {
  selectFilter: () => null,
  applyFilters: () => null,
  filters: []
};

const filterContextValueDisabled: FiltersContextType = {
  selectFilter: () => null,
  applyFilters: () => null,
  filters: [selectableFilter]
};

const filterGroupContextValue: FilterGroupContextType = {
  searchValue: '',
  fieldId: '123',
  setSearchValue: () => null,
  getCollapseProps: null,
  getToggleProps: null,
  isExpanded: null,
  isOptionsDisabled: null,
  setIsOptionsDisabled: () => null
};

jest.mock('@yext/answers-headless-react');

describe('Renders correctly for min input', () => {
  beforeEach(() => {
    mockAnswersHooks({ mockedState, mockedActions });
  });
  it('renders input value, clear, and apply option when inputing min value', async () => {
    render(
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput />
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>);
    const minTextbox = screen.getAllByRole('textbox')[0];
    userEvent.type(minTextbox, '10');
    await waitFor(() => {
      expect(minTextbox).toHaveValue('10');
    });
    expect(screen.getByText('Clear min and max')).toBeDefined();
    expect(screen.getByText('Apply')).toBeDefined();
  });

  it('record proper values in state when applying min', async () => {
    render(
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput />
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>);
    const actions = spyOnActions();
    const minTextbox = screen.getAllByRole('textbox')[0];
    userEvent.type(minTextbox, '10');
    await waitFor(() => {
      expect(minTextbox).toHaveValue('10');
    });
    expect(screen.getByText('Apply')).toBeDefined();
    userEvent.click(screen.getByText('Apply'));
    expect(actions.setFilterOption).toHaveBeenCalledWith({
      displayName: 'Over 10',
      fieldId: '123',
      matcher: '$between',
      selected: true,
      value: {
        start: {
          matcher: '$ge',
          value: 10
        },
      }
    });
  });

  it('renders correctly when clearing input', async () => {
    render(
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput />
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>);
    const minTextbox = screen.getAllByRole('textbox')[0];
    userEvent.type(minTextbox, '10');
    await waitFor(() => {
      expect(minTextbox).toHaveValue('10');
    });
    expect(screen.getByText('Clear min and max')).toBeDefined();
    userEvent.click(screen.getByText('Clear min and max'));
    expect(minTextbox).toHaveValue('');
  });
});

describe('Renders correctly for max input', () => {
  beforeEach(() => {
    mockAnswersHooks({ mockedState, mockedActions });
  });
  it('renders input value, clear, and apply option when inputing max value', async () => {
    render(
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput />
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>);
    const maxTextbox = screen.getAllByRole('textbox')[1];
    userEvent.type(maxTextbox, '20');
    await waitFor(() => {
      expect(maxTextbox).toHaveValue('20');
    });
    expect(screen.getByText('Clear min and max')).toBeDefined();
    expect(screen.getByText('Apply')).toBeDefined();
  });

  it('record proper values in state when applying max', async () => {
    render(
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput />
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>);
    const actions = spyOnActions();
    const maxTextbox = screen.getAllByRole('textbox')[1];
    userEvent.type(maxTextbox, '20');
    await waitFor(() => {
      expect(maxTextbox).toHaveValue('20');
    });
    expect(screen.getByText('Apply')).toBeDefined();
    userEvent.click(screen.getByText('Apply'));
    expect(actions.setFilterOption).toHaveBeenCalledWith({
      displayName: 'Up to 20',
      fieldId: '123',
      matcher: '$between',
      selected: true,
      value: {
        end: {
          matcher: '$le',
          value: 20
        },
      }
    });
  });

  it('renders correctly when clearing input', async () => {
    render(
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput />
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>);
    const maxTextbox = screen.getAllByRole('textbox')[1];
    userEvent.type(maxTextbox, '20');
    await waitFor(() => {
      expect(maxTextbox).toHaveValue('20');
    });
    expect(screen.getByText('Clear min and max')).toBeDefined();
    userEvent.click(screen.getByText('Clear min and max'));
    expect(maxTextbox).toHaveValue('');
  });
});

describe('Renders correctly for min and max inputs', () => {
  beforeEach(() => {
    mockAnswersHooks({ mockedState, mockedActions });
  });
  it('renders input value, clear, and apply option when inputing min and max values', async () => {
    render(
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput />
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>);
    const [minTextbox, maxTextbox] = screen.getAllByRole('textbox');
    userEvent.type(minTextbox, '10');
    userEvent.type(maxTextbox, '20');
    await waitFor(() => {
      expect(minTextbox).toHaveValue('10');
    });
    expect(maxTextbox).toHaveValue('20');
    expect(screen.getByText('Clear min and max')).toBeDefined();
    expect(screen.getByText('Apply')).toBeDefined();
  });

  it('record proper values in state when applying min and max', async () => {
    render(
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput />
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>);
    const actions = spyOnActions();
    const [minTextbox, maxTextbox] = screen.getAllByRole('textbox');
    userEvent.type(minTextbox, '10');
    userEvent.type(maxTextbox, '20');
    await waitFor(() => {
      expect(minTextbox).toHaveValue('10');
    });
    expect(maxTextbox).toHaveValue('20');
    expect(screen.getByText('Apply')).toBeDefined();
    userEvent.click(screen.getByText('Apply'));
    expect(actions.setFilterOption).toHaveBeenCalledWith({
      displayName: '10 - 20',
      fieldId: '123',
      matcher: '$between',
      selected: true,
      value: {
        start: {
          matcher: '$ge',
          value: 10
        },
        end: {
          matcher: '$le',
          value: 20
        },
      }
    });
  });

  it('renders correctly when clearing inputs', async () => {
    render(
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput />
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>);
    const [minTextbox, maxTextbox] = screen.getAllByRole('textbox');
    userEvent.type(minTextbox, '10');
    userEvent.type(maxTextbox, '20');
    await waitFor(() => {
      expect(minTextbox).toHaveValue('10');
    });
    expect(maxTextbox).toHaveValue('20');
    expect(screen.getByText('Clear min and max')).toBeDefined();
    userEvent.click(screen.getByText('Clear min and max'));
    expect(minTextbox).toHaveValue('');
    expect(maxTextbox).toHaveValue('');
  });

  it('renders correctly when input range is invalid and no filter is set in state', async () => {
    render(
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <FiltersContext.Provider value={filterContextValue}>
          <RangeInput />
        </FiltersContext.Provider>
      </FilterGroupContext.Provider>);
    const [minTextbox, maxTextbox] = screen.getAllByRole('textbox');
    userEvent.type(minTextbox, '20');
    userEvent.type(maxTextbox, '10');
    const actions = spyOnActions();
    await waitFor(() => {
      expect(minTextbox).toHaveValue('20');
    });
    expect(maxTextbox).toHaveValue('10');
    expect(screen.getByText('Invalid range')).toBeDefined();
    expect(actions.setFilterOption).toHaveBeenCalledTimes(0);
  });
});

it('renders correctly when disabled', () => {
  render(<FilterGroupContext.Provider value={filterGroupContextValue}>
    <FiltersContext.Provider value={filterContextValueDisabled}>
      <RangeInput />
    </FiltersContext.Provider>
  </FilterGroupContext.Provider>);
});