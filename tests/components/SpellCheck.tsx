import { shallow } from 'enzyme';

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
    const component = shallow(<SpellCheck />);
    expect(component.text()).toEqual('Did you mean Correction');
  });

  it('Button\'s label is correct', () => {
    const component = shallow(<SpellCheck />);
    const button = component.find('button');
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('Correction');
  });

  it('Fires onClick when provided', () => {
    const props = {
      onClick: jest.fn()
    };
    const onClick = jest.spyOn(props, 'onClick');
    const useAnswersActions = jest.spyOn(require('@yext/answers-headless-react'), 'useAnswersActions');

    const component = shallow(<SpellCheck {...props} />);
    const button = component.find('button');
    button.simulate('click');

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

    const component = shallow(<SpellCheck />);
    const button = component.find('button');
    button.simulate('click');

    const answersActions = useAnswersActions.mock.results[0].value;
    const setQuery = jest.spyOn(answersActions, 'setQuery');

    const verticalKey = mockedState.vertical.verticalKey;
    const correctedQuery = mockedState.spellCheck.correctedQuery;
    expect(setQuery).toHaveBeenCalledWith(correctedQuery);
    expect(executeSearch).toHaveBeenCalledWith(answersActions, !!verticalKey);

    useAnswersActions.mockRestore();
  });
});