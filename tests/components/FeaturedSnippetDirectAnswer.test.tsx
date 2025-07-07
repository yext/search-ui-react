import { render, RenderResult, screen } from '@testing-library/react';
import { FeaturedSnippetDirectAnswer as FeaturedSnippetDirectAnswerType, Source, DirectAnswer, SearchHeadlessContext } from '@yext/search-headless-react';
import { FeaturedSnippetDirectAnswer } from '../../src/components/FeaturedSnippetDirectAnswer';
import { SearchI18nextProvider } from '../../src/components/SearchI18nextProvider';
import { featuredSnippetDAState } from '../__fixtures__/data/directanswers';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ignoreLinkClickErrors } from '../__utils__/mocks';

const featuredSnippetDAResult = featuredSnippetDAState.result as FeaturedSnippetDirectAnswerType;

function renderFeaturedSnippetDirectAnswer(
  result: FeaturedSnippetDirectAnswerType,
  readMoreClickHandler?: () => void,
  locale?: string
): RenderResult & { rerenderWithLocale: (newLocale?: string) => void } {
  const searcher = generateMockedHeadless({
    directAnswer: {
      result
    },
    meta: {
      locale
    }
  });

  const utils = render(<SearchHeadlessContext.Provider value={searcher}>
    <SearchI18nextProvider searcher={searcher}>
      <FeaturedSnippetDirectAnswer result={result} readMoreClickHandler={readMoreClickHandler} />
    </SearchI18nextProvider>
  </SearchHeadlessContext.Provider>);

  function rerenderWithLocale(newLocale?: string) {
    const newSearcher = generateMockedHeadless({
    directAnswer: {
      result
    },
    meta: {
      locale: newLocale
    }
  });

    utils.rerender(<SearchHeadlessContext.Provider value={newSearcher}>
      <SearchI18nextProvider searcher={newSearcher}>
        <FeaturedSnippetDirectAnswer result={result} readMoreClickHandler={readMoreClickHandler} />
      </SearchI18nextProvider>
    </SearchHeadlessContext.Provider>);
  }

  return {
    ...utils,
    rerenderWithLocale,
  };
}

describe('FeaturedSnippet direct answer', () => {
  it('uses relatedResult.link url for "Read more about" link', () => {
    render(<FeaturedSnippetDirectAnswer result={featuredSnippetDAResult} />);
    const directAnswerLink = screen.getByRole('link');
    expect(directAnswerLink).toHaveTextContent('[relatedResult.name]');
    expect(directAnswerLink).toHaveAttribute('href', '[relatedResult.link]');
  });

  it('uses landingPageUrl as fallback url for "Read more about" link', () => {
    renderFeaturedSnippetDirectAnswer({
      ...featuredSnippetDAResult,
      relatedResult: {
        name: '[landingPageName]',
        rawData: {
          landingPageUrl: '[landingPageUrl]'
        },
        source: Source.KnowledgeManager
      }
    });
    const directAnswerLink = screen.getByRole('link');
    expect(directAnswerLink).toHaveTextContent('[landingPageName]');
    expect(directAnswerLink).toHaveAttribute('href', '[landingPageUrl]');
  });

  it('executes readMoreClickHandler when click on "Read more about" link', async () => {
    const readMoreClickHandler = jest.fn();
    renderFeaturedSnippetDirectAnswer(featuredSnippetDAResult,readMoreClickHandler);
    ignoreLinkClickErrors();
    await userEvent.click(screen.getByRole('link', { name: '[relatedResult.name]' }));
    expect(readMoreClickHandler).toHaveBeenCalledTimes(1);
  });

  // TODO: SLAP-2340, add rich text tests
});