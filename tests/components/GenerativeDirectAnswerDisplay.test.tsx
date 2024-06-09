import { render, screen } from '@testing-library/react';

import { State } from '@yext/search-headless-react';
import { mockAnswersState } from '../__utils__/mocks';
import { verticalResults } from '../__fixtures__/data/universalresults';
import { generativeDirectAnswerResponse } from '../__fixtures__/data/generativeDirectAnswer';
import React from 'react';
import { GenerativeDirectAnswerDisplay } from '../../dist';

const mockedState: Partial<State> = {
  generativeDirectAnswer: {
    isLoading: false,
    response: generativeDirectAnswerResponse,
  },
  universal: {
    verticals: verticalResults
  },
  query: {
    mostRecentSearch: 'test'
  },
  meta: {
    searchType: 'universal'
  }
};

jest.mock('@yext/search-headless-react');

describe('GenerativeDirectAnswer', () => {
  beforeEach(() => {
    mockAnswersState(mockedState);
  });

  it('Answer text and citations are displayed', () => {
    render(<GenerativeDirectAnswerDisplay />);
    const verticals = mockedState.universal?.verticals ?? [];
    expect(screen.getByText(generativeDirectAnswerResponse.directAnswer)).toBeDefined();

    function checkResultData(resultData: Record<string, unknown>, isCitation: boolean) {
      if (isCitation) { 
        expect(typeof resultData.name === 'string' && screen.getByText(resultData.name)).toBeTruthy();
        expect(typeof resultData.description === 'string' && screen.getByText(resultData.description)).toBeTruthy();
      } else {
        expect(typeof resultData.name === 'string' && screen.queryByText(resultData.name)).toBeNull();
        expect(typeof resultData.description === 'string' && screen.queryByText(resultData.description)).toBeNull();
      }
    }

    checkResultData(verticals[0].results[0].rawData, false);
    checkResultData(verticals[0].results[1].rawData, true);
    checkResultData(verticals[1].results[0].rawData, true);
  });
});
