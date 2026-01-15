import { render, screen } from '@testing-library/react';

import { GenerativeDirectAnswer, CitationsProps } from '../../src/components/GenerativeDirectAnswer';
import { useAnalytics } from '../../src/hooks/useAnalytics';

import { State } from '@yext/search-headless-react';
import { mockAnswersState, ignoreLinkClickErrors } from '../__utils__/mocks';
import {
  verticalResults,
  verticalResultsWithDuplicateEntity
} from '../__fixtures__/data/universalresults';
import { generativeDirectAnswerText, generativeDirectAnswerLink, generativeDirectAnswerResponse } from '../__fixtures__/data/generativeDirectAnswer';
import userEvent from '@testing-library/user-event';
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
    queryId: '[queryId]',
    mostRecentSearch: 'test'
  },
  meta: {
    searchType: 'universal',
    experienceKey: 'experienceKey',
    locale: 'en',
    uuid: 'searchId'
  }
};

const mockedStateWithDuplicateEntity: Partial<State> = {
  generativeDirectAnswer: {
    isLoading: false,
    response: generativeDirectAnswerResponse,
  },
  universal: {
    verticals: verticalResultsWithDuplicateEntity
  },
  query: {
    queryId: '[queryId]',
    mostRecentSearch: 'test'
  },
  meta: {
    searchType: 'universal'
  }
};

const CustomCitationsComponent = (_props: CitationsProps) => {
  return (
    <>
      CustomCitationsComponentTest
    </>
  );
};

jest.mock('@yext/search-headless-react');

jest.mock('../../src/hooks/useAnalytics', () => {
  const report = jest.fn();
  return {
    useAnalytics: () => ({ report })
  };
});

describe('Generative direct answer analytics', () => {
  beforeEach(() => {
    mockAnswersState(mockedState);
    ignoreLinkClickErrors();
  });
  runAnalyticsTestSuite();
});

function runAnalyticsTestSuite() {
  it('reports cta click analytics', async () => {
    render(<GenerativeDirectAnswer />);
    const link = screen.getByRole('link', { name: generativeDirectAnswerText });
    await userEvent.click(link);
    expect(useAnalytics()?.report).toHaveBeenCalledTimes(1);
    expect(useAnalytics()?.report).toHaveBeenCalledWith({
      'action': 'CTA_CLICK',
      'destinationUrl': generativeDirectAnswerLink,
      'entity': undefined,
      'locale': 'en',
      'experienceKey': 'experienceKey',
      'isDirectAnswer': true,
      'isGenerativeDirectAnswer': true,
      'queryId': '[queryId]',
      'searchId': 'searchId',
      'verticalKey': '',
      'searchTerm': 'test'
    });
  });
  it('reports citation click analytics', async () => {
    render(<GenerativeDirectAnswer />);
    const links = screen.getAllByRole('link').filter(l => l.textContent?.includes('title2'));
    expect(links.length).toEqual(1);
    await userEvent.click(links[0]);
    expect(useAnalytics()?.report).toHaveBeenCalledTimes(1);
    expect(useAnalytics()?.report).toHaveBeenCalledWith({
      'action': 'CITATION_CLICK',
      'destinationUrl': verticalResults[0].results[1].rawData.link,
      'entity': verticalResults[0].results[1].id,
      'locale': 'en',
      'experienceKey': 'experienceKey',
      'isDirectAnswer': true,
      'isGenerativeDirectAnswer': true,
      'queryId': '[queryId]',
      'searchId': 'searchId',
      'verticalKey': '',
      'searchTerm': 'test'
    });
  });
}

describe('GenerativeDirectAnswer with sufficient citation fields', () => {
  beforeEach(() => {
    mockAnswersState(mockedState);
  });
  it('answer text and all citations are displayed', () => {
    render(<GenerativeDirectAnswer />);
    expect(screen.getByText(generativeDirectAnswerText)).toBeDefined();
    expect(screen.getByText('Sources (2)')).toBeDefined();

    checkResultData(verticalResults[0].results[0].rawData, false); //not a citation
    checkResultData(verticalResults[0].results[1].rawData, true);
    checkResultData(verticalResults[1].results[0].rawData, true);
  });

  it('Citations component overridden with dummy text', () => {
    render(<GenerativeDirectAnswer
      CitationsContainer={CustomCitationsComponent}
    />);
    expect(screen.getByText(generativeDirectAnswerText)).toBeDefined();
    expect(screen.getByText('CustomCitationsComponentTest')).toBeTruthy();
  });

  it('citations are deduplicated', () => {
    mockAnswersState(mockedStateWithDuplicateEntity);
    render(<GenerativeDirectAnswer />);
    expect(screen.getByText(generativeDirectAnswerText)).toBeDefined();
    expect(screen.getByText('Sources (2)')).toBeDefined();

    checkResultData(verticalResultsWithDuplicateEntity[0].results[0].rawData, false); //not a citation
    checkResultData(verticalResultsWithDuplicateEntity[0].results[1].rawData, true);
    checkResultData(verticalResultsWithDuplicateEntity[1].results[0].rawData, true);
  });
});

describe('GenerativeDirectAnswer without sufficient citation fields', () => {
  it('first citation does not have name field but second citation does', () => {
    verticalResults[0].results[1].rawData.name = undefined;
    mockAnswersState({ ...mockedState, universal: { verticals: verticalResults } });

    render(<GenerativeDirectAnswer />);
    expect(screen.getByText(generativeDirectAnswerText)).toBeDefined();
    expect(screen.getByText('Source')).toBeDefined();

    checkResultData(verticalResults[0].results[0].rawData, false); //not a citation
    checkResultData(verticalResults[0].results[1].rawData, false); //citation without name
    checkResultData(verticalResults[1].results[0].rawData, true);
  });

  it('all citations do not have name field', () => {
    verticalResults[1].results[0].rawData.name = undefined;
    mockAnswersState({ ...mockedState, universal: { verticals: verticalResults } });

    render(<GenerativeDirectAnswer />);
    expect(screen.getByText(generativeDirectAnswerText)).toBeDefined();
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
