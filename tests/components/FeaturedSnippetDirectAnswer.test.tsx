import { render, screen } from '@testing-library/react';
import { FeaturedSnippetDirectAnswer as FeaturedSnippetDirectAnswerType, Source } from '@yext/search-headless-react';
import { FeaturedSnippetDirectAnswer } from '../../src/components/FeaturedSnippetDirectAnswer';
import { featuredSnippetDAState } from '../__fixtures__/data/directanswers';
import userEvent from '@testing-library/user-event';
import React from 'react';

const featuredSnippetDAResult = featuredSnippetDAState.result as FeaturedSnippetDirectAnswerType;

describe('FeaturedSnippet direct answer', () => {
  it('uses relatedResult.link url for "Read more about" link', () => {
    render(<FeaturedSnippetDirectAnswer result={featuredSnippetDAResult} />);
    const directAnswerLink = screen.getByRole('link');
    expect(directAnswerLink).toHaveTextContent('[relatedResult.name]');
    expect(directAnswerLink).toHaveAttribute('href', '[relatedResult.link]');
  });

  it('uses landingPageUrl as fallback url for "Read more about" link', () => {
    render(<FeaturedSnippetDirectAnswer
      result={{
        ...featuredSnippetDAResult,
        relatedResult: {
          name: '[landingPageName]',
          rawData: {
            landingPageUrl: '[landingPageUrl]'
          },
          source: Source.KnowledgeManager
        }
      }}
    />);
    const directAnswerLink = screen.getByRole('link');
    expect(directAnswerLink).toHaveTextContent('[landingPageName]');
    expect(directAnswerLink).toHaveAttribute('href', '[landingPageUrl]');
  });

  it('executes readMoreClickHandler when click on "Read more about" link', () => {
    const readMoreClickHandler = jest.fn();
    render(<FeaturedSnippetDirectAnswer
      result={featuredSnippetDAResult}
      readMoreClickHandler={readMoreClickHandler}
    />);
    userEvent.click(screen.getByRole('link', { name: '[relatedResult.name]' }));
    expect(readMoreClickHandler).toHaveBeenCalledTimes(1);
  });

  // TODO: SLAP-2340, add rich text tests
});