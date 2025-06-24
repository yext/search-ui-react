import { render, RenderResult, screen } from '@testing-library/react';
import { DirectAnswerState, SearchHeadlessContext } from '@yext/search-headless-react';
import { useAnalytics } from '../../src/hooks/useAnalytics';
import { DirectAnswer } from '../../src/components/DirectAnswer';
import { SearchI18nextProvider, SearchTranslationOverrides } from '../../src/components/SearchI18nextProvider';
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
  locale?: string,
  translationOverrides?: SearchTranslationOverrides
): RenderResult & { rerenderWithLocale: (newLocale?: string) => void } {
  const searcher = generateMockedHeadless({
    directAnswer,
    vertical: {},
    query: {
      queryId: '[queryId]'
    },
    meta: {
      locale
    }
  });

  const utils = render(<SearchHeadlessContext.Provider value={searcher}>
    <SearchI18nextProvider searcher={searcher} translationOverrides={translationOverrides}>
      <DirectAnswer />
    </SearchI18nextProvider>
  </SearchHeadlessContext.Provider>);

  function rerenderWithLocale(newLocale?: string) {
    const newSearcher = generateMockedHeadless({
      directAnswer,
      vertical: {},
      query: {
        queryId: '[queryId]'
      },
      meta: {
        locale: newLocale
      }
    });

    utils.rerender(<SearchHeadlessContext.Provider value={newSearcher}>
      <SearchI18nextProvider searcher={newSearcher} translationOverrides={translationOverrides}>
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
  runTranslationTestSuite(fieldValueDAState);
});

describe('Featured snippet direct answer analytics', () => {
  runAnalyticsTestSuite(featuredSnippetDAState);
  runTranslationTestSuite(featuredSnippetDAState);
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
  it('translate the feedback button based on the default translations', async () => {
    const { rerenderWithLocale } = renderDirectAnswer(mockState);

    expect(screen.getByText('Feedback')).toBeDefined();

    const [thumbsUp, thumbsDown] = screen.queryAllByRole('button');
    expect(thumbsUp).toHaveAttribute('aria-label', 'This answered my question');
    expect(thumbsDown).toHaveAttribute('aria-label', 'This did not answer my question');

    rerenderWithLocale('el');

    expect(screen.getByText('Σχόλια')).toBeDefined();

    const [localizedThumbsUp, localizedThumbsDown] = screen.queryAllByRole('button');
    expect(localizedThumbsUp).toHaveAttribute('aria-label', 'Αυτό απάντησε στην ερώτησή μου');
    expect(localizedThumbsDown).toHaveAttribute('aria-label', 'Αυτό δεν απάντησε στην ερώτησή μου');

    await userEvent.click(localizedThumbsDown);
    expect(screen.getByText('Ευχαριστούμε για τα σχόλιά σας!')).toBeDefined();
  });

  it('overrides the default translations when a locale is supported', async () => {
    const translationOverrides: SearchTranslationOverrides = {
      es: {
        feedback: 'cOm3nt4rio5',
        thisAnsweredMyQuestion: '✅'
      }
    };

    renderDirectAnswer(mockState, 'es', translationOverrides);

    expect(screen.getByText('cOm3nt4rio5')).toBeDefined();

    const [thumbsUp, thumbsDown] = screen.queryAllByRole('button');
    expect(thumbsUp).toHaveAttribute('aria-label', '✅');

    // Defaults to Spanish translation because the overrides did not contain this key
    expect(thumbsDown).toHaveAttribute('aria-label', 'Esto no respondió mi pregunta');
    await userEvent.click(thumbsUp);
    expect(screen.getByText('¡Gracias por tus comentarios!')).toBeDefined();
  });

  it('set the translations when a locale is unsupported', async () => {
    const translationOverrides: SearchTranslationOverrides = {
      unsupportedLocale: {
        feedback: 'Overriden Feedback'
      }
    };

    renderDirectAnswer(mockState, 'unsupportedLocale', translationOverrides);

    expect(screen.getByText('Overriden Feedback')).toBeDefined();

    const [thumbsUp, thumbsDown] = screen.queryAllByRole('button');
    // Defaults to English translation because the overrides did not contain this key and the locale key is not supported
    expect(thumbsUp).toHaveAttribute('aria-label', 'This answered my question');
    expect(thumbsDown).toHaveAttribute('aria-label', 'This did not answer my question');

    await userEvent.click(thumbsUp);
    expect(screen.getByText('Thank you for your feedback!')).toBeDefined();
  });
}
