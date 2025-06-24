import { render, RenderResult, screen } from '@testing-library/react';
import { DirectAnswerState, SearchHeadlessContext } from '@yext/search-headless-react';
import { useAnalytics } from '../../src/hooks/useAnalytics';
import { DirectAnswer } from '../../src/components/DirectAnswer';
import { SearchI18nextProvider } from '../../src/components/SearchI18nextProvider';
import { RecursivePartial, ignoreLinkClickErrors } from '../__utils__/mocks';
import { fieldValueDAState, featuredSnippetDAState } from '../__fixtures__/data/directanswers';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('../../src/hooks/useAnalytics', () => {
  const report = jest.fn();
  return {
    useAnalytics: () => ({ report })
  };
});

function renderDirectAnswer(
  directAnswer: RecursivePartial<DirectAnswerState>,
  isLoading?: boolean,
  locale?: string
): RenderResult & { rerenderWithLocale: (newLocale?: string) => void } {
  const searcher = generateMockedHeadless({
    directAnswer,
    searchStatus: { isLoading },
    vertical: {},
    query: {
      queryId: '[queryId]'
    },
    meta: {
      locale
    }
  });

  const utils = render(<SearchHeadlessContext.Provider value={searcher}>
    <SearchI18nextProvider searcher={searcher}>
      <DirectAnswer />
    </SearchI18nextProvider>
  </SearchHeadlessContext.Provider>);

  function rerenderWithLocale(newLocale?: string) {
    const newSearcher = generateMockedHeadless({
      directAnswer,
      searchStatus: { isLoading },
      vertical: {},
      query: {
        queryId: '[queryId]'
      },
      meta: {
        locale: newLocale
      }
    });

    utils.rerender(<SearchHeadlessContext.Provider value={newSearcher}>
      <SearchI18nextProvider searcher={newSearcher}>
        <DirectAnswer />
      </SearchI18nextProvider>
    </SearchHeadlessContext.Provider>);
  }

  return {
    ...utils,
    rerenderWithLocale,
  };
}

it('renders null when there is no direct answer in state', () => {
  const { container } = renderDirectAnswer({ result: undefined });
  expect(container).toBeEmptyDOMElement();
});

describe('Field value direct answer analytics', () => {
  runAnalyticsTestSuite(fieldValueDAState);
});

describe('Featured snippet direct answer analytics', () => {
  runAnalyticsTestSuite(featuredSnippetDAState);
});

function runAnalyticsTestSuite(mockState: DirectAnswerState) {
  it('reports link click analytics', async () => {
    renderDirectAnswer(mockState);
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
    renderDirectAnswer(mockState);
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
    renderDirectAnswer(mockState);
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

function runTranslationTestSuite(mockState: DirectAnswerState) {
  it('translate the feedback button', async () => {
    const { rerenderWithLocale } = renderDirectAnswer(mockState);

    expect(screen.getByText('Feedback')).toBeDefined();

    const [thumbsUp, thumbsDown] = screen.queryAllByRole('button');
    expect(thumbsUp).toHaveAttribute('aria-label', 'This answered my question');
    expect(thumbsDown).toHaveAttribute('aria-label', 'This did not answer my question');

    await userEvent.click(thumbsUp);
    expect(screen.getByText('Thank you for your feedback!')).toBeDefined();

    rerenderWithLocale('es');

    expect(screen.getByText('Comentarios')).toBeDefined();

    const [localizedThumbsUp, localizedThumbsDown] = screen.queryAllByRole('button');
    expect(localizedThumbsUp).toHaveAttribute('aria-label', 'Esto respondió mi pregunta');
    expect(localizedThumbsDown).toHaveAttribute('aria-label', 'Esto no respondió mi pregunta');

    await userEvent.click(localizedThumbsDown);
    expect(screen.getByText('¡Gracias por tus comentarios!')).toBeDefined();
  });
}
