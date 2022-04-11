import { render, screen } from '@testing-library/react';

import { SpellCheck } from '../../src/components/SpellCheck';
import { State } from '@yext/answers-headless-react';
import { spyOnActions } from '../__utils__/mocks';
import userEvent from '@testing-library/user-event';

const mockedState: Partial<State> = {
  spellCheck: {
    correctedQuery: 'Correction',
    enabled: false
  },
  vertical: {
    verticalKey: 'vertical'
  },
  searchStatus: {
    isLoading: false
  },
  meta: {
    searchType: 'vertical'
  }
};

jest.mock('@yext/answers-headless-react', () => {
  const originalModule = jest.requireActual('@yext/answers-headless-react');
  return {
    __esModule: true,
    ...originalModule,
    useAnswersState: accessor => accessor(mockedState),
    useAnswersActions: () => {
      return {
        state: mockedState,
        setQuery: jest.fn(),
        executeVerticalQuery: jest.fn()
      };
    }
  };
});

describe('SpellCheck', () => {
  it('Suggestion is formatted properly', () => {
    render(<SpellCheck />);
    expect(screen.getByText('Did you mean')).toBeDefined();
    expect(screen.getByText(mockedState.spellCheck.correctedQuery)).toBeDefined();
  });

  it('Button\'s label is correct', () => {
    render(<SpellCheck />);
    expect(screen.getByRole('button')).toHaveTextContent(mockedState.spellCheck.correctedQuery);
  });

  it('Fires onClick when provided', () => {
    const props = {
      onClick: jest.fn()
    };
    const onClick = jest.spyOn(props, 'onClick');
    const actions = spyOnActions();

    render(<SpellCheck {...props} />);
    userEvent.click(screen.getByRole('button'));

    const verticalKey = mockedState.vertical.verticalKey;
    const correctedQuery = mockedState.spellCheck.correctedQuery;
    expect(actions.setQuery).toHaveBeenCalledWith(correctedQuery);
    expect(onClick).toHaveBeenCalledWith({ correctedQuery, verticalKey });
  });

  it('Fires executeSearch when no onClick is provided', () => {
    const actions = spyOnActions();
    const executeSearch = jest.spyOn(require('../../src/utils/search-operations'), 'executeSearch');

    render(<SpellCheck />);
    userEvent.click(screen.getByRole('button'));

    const correctedQuery = mockedState.spellCheck.correctedQuery;
    expect(actions.setQuery).toHaveBeenCalledWith(correctedQuery);
    expect(executeSearch).toHaveBeenCalledTimes(1);
  });
});