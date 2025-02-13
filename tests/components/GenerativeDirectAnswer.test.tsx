import { render, screen } from '@testing-library/react';

import { GenerativeDirectAnswer, CitationsProps } from '../../src/components/GenerativeDirectAnswer';

import { State } from '@yext/search-headless-react';
import { mockAnswersState } from '../__utils__/mocks';
import { verticalResults } from '../__fixtures__/data/universalresults';
import { generativeDirectAnswerResponse } from '../__fixtures__/data/generativeDirectAnswer';
import React from 'react';

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

const CustomCitationsComponent = (props: CitationsProps) => {
  return (
      <>
        CustomCitationsComponentTest
      </>
  )
}

jest.mock('@yext/search-headless-react');

describe('GenerativeDirectAnswer with sufficient citation fields', () => {
  beforeEach(() => {
    mockAnswersState(mockedState);
  });
  it('answer text and all citations are displayed', () => {
    render(<GenerativeDirectAnswer />);
    expect(screen.getByText(generativeDirectAnswerResponse.directAnswer)).toBeDefined();
    expect(screen.getByText('Sources (2)')).toBeDefined();

    checkResultData(verticalResults[0].results[0].rawData, false); //not a citation
    checkResultData(verticalResults[0].results[1].rawData, true);
    checkResultData(verticalResults[1].results[0].rawData, true);
  });

  it('Citations component overridden with dummy text', () => {
    render(<GenerativeDirectAnswer
        CitationsContainer={CustomCitationsComponent}
    />);
    expect(screen.getByText(generativeDirectAnswerResponse.directAnswer)).toBeDefined();
    expect(screen.getByText("CustomCitationsComponentTest")).toBeTruthy();
  });
});

describe('GenerativeDirectAnswer without sufficient citation fields', () => {
  it('first citation does not have name field but second citation does', () => {
    verticalResults[0].results[1].rawData.name = undefined;
    mockAnswersState({...mockedState, universal: {verticals: verticalResults}});

    render(<GenerativeDirectAnswer />);
    expect(screen.getByText(generativeDirectAnswerResponse.directAnswer)).toBeDefined();
    expect(screen.getByText('Sources (1)')).toBeDefined();

    checkResultData(verticalResults[0].results[0].rawData, false); //not a citation
    checkResultData(verticalResults[0].results[1].rawData, false); //citation without name
    checkResultData(verticalResults[1].results[0].rawData, true);
  });

  it('all citations do not have name field', () => {
    verticalResults[1].results[0].rawData.name = undefined;
    mockAnswersState({...mockedState, universal: {verticals: verticalResults}});

    render(<GenerativeDirectAnswer />);
    expect(screen.getByText(generativeDirectAnswerResponse.directAnswer)).toBeDefined();
    expect(screen.queryByText('Sources')).toBeNull();

    checkResultData(verticalResults[0].results[0].rawData, false); //not a citation
    checkResultData(verticalResults[0].results[1].rawData, false); //citation without name
    checkResultData(verticalResults[1].results[0].rawData, false); //citation without name
  });
});

function checkResultData(resultData: Record<string, unknown>, shouldDisplay: boolean) {
  if (typeof resultData.name === 'string') {
    if (shouldDisplay) {
      expect(screen.getByText(resultData.name)).toBeTruthy();
    } else {
      expect(screen.queryByText(resultData.name)).toBeNull();
    }
  }
  if (typeof resultData.description === 'string') {
    if (shouldDisplay) {
      expect(screen.getByText(resultData.description)).toBeTruthy();
    } else {
      expect(screen.queryByText(resultData.description)).toBeNull();
    }
  } 
}