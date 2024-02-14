import { render, screen } from '@testing-library/react';
import { DirectAnswerState } from '@yext/search-headless-react';
import { useAnalytics } from '../../src/hooks/useAnalytics';
import { DirectAnswer } from '../../src/components/DirectAnswer';
import { RecursivePartial, ignoreLinkClickErrors, mockAnswersState } from '../__utils__/mocks';
import { fieldValueDAState, featuredSnippetDAState } from '../__fixtures__/data/directanswers';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('@yext/search-headless-react');

jest.mock('../../src/hooks/useAnalytics', () => {
  const report = jest.fn();
  return {
    useAnalytics: () => ({ report })
  };
});

it('renders null when there is no direct answer in state', () => {
  mockState({ result: undefined });
  const { container } = render(<DirectAnswer />);
  expect(container).toBeEmptyDOMElement();
});

describe('Field value direct answer analytics', () => {
  beforeEach(() => mockState(fieldValueDAState));
  runAnalyticsTestSuite();
});

describe('Featured snippet direct answer analytics', () => {
  beforeEach(() => mockState(featuredSnippetDAState));
  runAnalyticsTestSuite();
});

async function runAnalyticsTestSuite() {
  it('reports link click analytics', async () => {
    render(<DirectAnswer />);
    ignoreLinkClickErrors();
    const link = screen.getByRole('link');
    await userEvent.click(link);
    expect(useAnalytics()?.report).toHaveBeenCalledTimes(1);
    expect(useAnalytics()?.report).toHaveBeenCalledWith(expect.objectContaining({
      type: 'CTA_CLICK',
      queryId: '[queryId]',
      searcher: 'UNIVERSAL',
      directAnswer: true
    }));
  });

  it('reports THUMBS_UP feedback', async () => {
    render(<DirectAnswer />);
    const thumbsUp = screen.queryAllByRole('button')[0];
    await userEvent.click(thumbsUp);
    expect(useAnalytics()?.report).toHaveBeenCalledTimes(1);
    expect(useAnalytics()?.report).toHaveBeenCalledWith(expect.objectContaining({
      type: 'THUMBS_UP',
      queryId: '[queryId]',
      searcher: 'UNIVERSAL',
      directAnswer: true
    }));
  });

  it('reports THUMBS_DOWN feedback', async () => {
    render(<DirectAnswer />);
    const thumbsDown = screen.queryAllByRole('button')[1];
    await userEvent.click(thumbsDown);
    expect(useAnalytics()?.report).toHaveBeenCalledTimes(1);
    expect(useAnalytics()?.report).toHaveBeenCalledWith(expect.objectContaining({
      type: 'THUMBS_DOWN',
      queryId: '[queryId]',
      searcher: 'UNIVERSAL',
      directAnswer: true
    }));
  });
}

function mockState(
  directAnswer: RecursivePartial<DirectAnswerState>,
  isLoading?: boolean
) {
  return mockAnswersState({
    directAnswer,
    searchStatus: { isLoading },
    vertical: {},
    query: {
      queryId: '[queryId]'
    }
  });
}
