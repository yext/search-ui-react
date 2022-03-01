import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { SpellCheckState } from '@yext/answers-headless/lib/esm/models/slices/spellcheck';
import { VerticalSearchState } from '@yext/answers-headless/lib/esm/models/slices/vertical';
import { SpellCheck } from '../../src/components/SpellCheck';

import { SearchStatusState } from '@yext/answers-headless-react';

const mockedState: {
  spellCheck: SpellCheckState,
  vertical: VerticalSearchState,
  searchStatus: SearchStatusState } =
{
  spellCheck: {
    correctedQuery: 'Correction',
    enabled: false
  },
  vertical: {
    verticalKey: 'vertical'
  },
  searchStatus: {
    isLoading: false
  }
};

jest.mock('@yext/answers-headless-react', () => ({
  __esModule: true,
  useAnswersState: accessor => accessor(mockedState),
  useAnswersActions: () => {
    return {
      setQuery: jest.fn(),
      executeVerticalQuery: jest.fn()
    };
  }
}));

describe('SpellCheck', () => {
  it('Suggestion is formatted properly', () => {
    const { getByText } = render(<SpellCheck />);
    expect(getByText('Did you mean')).toBeDefined();
    expect(getByText(mockedState.spellCheck.correctedQuery)).toBeDefined();
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
    const useAnswersActions = jest.spyOn(require('@yext/answers-headless-react'), 'useAnswersActions');

    render(<SpellCheck {...props} />);
    fireEvent.click(screen.getByRole('button'));

    const answersActions = useAnswersActions.mock.results[0].value;
    const setQuery = jest.spyOn(answersActions, 'setQuery');

    const verticalKey = mockedState.vertical.verticalKey;
    const correctedQuery = mockedState.spellCheck.correctedQuery;
    expect(setQuery).toHaveBeenCalledWith(correctedQuery);
    expect(onClick).toHaveBeenCalledWith({ correctedQuery, verticalKey });

    useAnswersActions.mockRestore();
  });

  it('Fires executeSearch when no onClick is provided', () => {
    const useAnswersActions = jest.spyOn(require('@yext/answers-headless-react'), 'useAnswersActions');
    const executeSearch = jest.spyOn(require('../../src/utils/search-operations'), 'executeSearch');

    render(<SpellCheck />);
    fireEvent.click(screen.getByRole('button'));

    const answersActions = useAnswersActions.mock.results[0].value;
    const setQuery = jest.spyOn(answersActions, 'setQuery');

    const verticalKey = mockedState.vertical.verticalKey;
    const correctedQuery = mockedState.spellCheck.correctedQuery;
    expect(setQuery).toHaveBeenCalledWith(correctedQuery);
    expect(executeSearch).toHaveBeenCalledWith(answersActions, !!verticalKey);

    useAnswersActions.mockRestore();
  });
});