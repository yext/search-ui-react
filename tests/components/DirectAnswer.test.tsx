import { render, screen, fireEvent } from '@testing-library/react';
import { DirectAnswerType, FeaturedSnippetDirectAnswer, FieldValueDirectAnswer } from '@yext/answers-headless-react';
import { useAnalytics } from '../../src/hooks/useAnalytics';
import { DirectAnswer } from '../../src/components/DirectAnswer';
import { RecursivePartial, spyOnAnswersState } from '../__utils__/spies';

jest.mock('@yext/answers-headless-react', () => {
  const originalModule = jest.requireActual('@yext/answers-headless-react');
  return {
    __esModule: true,
    ...originalModule
  };
});

jest.mock('../../src/components/utils/renderHighlightedValue', () => {
  jest.requireActual('../../src/components/utils/renderHighlightedValue');
  return {
    renderHighlightedValue: ({ value, matchedSubstrings }) =>
      <strong data-testid='highlighted-value'>
        {value}
        {JSON.stringify(matchedSubstrings)}
      </strong>
  };
});

jest.mock('../../src/hooks/useAnalytics', () => {
  const report = jest.fn();
  return {
    useAnalytics: () => ({ report })
  };
});

it('does not render when no direct answer result', () => {
  spyOnState();
  const { container } = render(<DirectAnswer />);
  expect(container).toBeEmptyDOMElement();
});

describe('FieldValue direct answer', () => {
  beforeEach(() => {
    spyOnFieldValueDA();
    render(<DirectAnswer />);
  });

  it('title text', () => {
    const expectedTitle = '[entityName] / [fieldName]';
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });

  it('description text', () => {
    const expectedDescription = '[value]';
    expect(screen.getByText(expectedDescription)).toBeInTheDocument();
  });

  it('link', () => {
    const directAnswerLink = screen.getByRole('link');
    expect(directAnswerLink).toHaveTextContent('View Details');
    expect(directAnswerLink).toHaveAttribute('href', '[relatedResult.link]');
  });

  it('reports link click analytics', () => {
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(useAnalytics().report).toHaveBeenCalledTimes(1);
    expect(useAnalytics().report).toHaveBeenCalledWith(expect.objectContaining({
      type: 'CTA_CLICK',
      queryId: '[queryId]',
      searcher: 'UNIVERSAL',
      directAnswer: true
    }));
  });

  it('reports THUMBS_UP feedback', () => {
    const thumbsUp = screen.queryAllByRole('button')[0];
    fireEvent.click(thumbsUp);
    expect(useAnalytics().report).toHaveBeenCalledTimes(1);
    expect(useAnalytics().report).toHaveBeenCalledWith(expect.objectContaining({
      type: 'THUMBS_UP',
      queryId: '[queryId]',
      searcher: 'UNIVERSAL',
      directAnswer: true
    }));
  });

  it('reports THUMBS_DOWN feedback', () => {
    const thumbsDown = screen.queryAllByRole('button')[1];
    fireEvent.click(thumbsDown);
    expect(useAnalytics().report).toHaveBeenCalledTimes(1);
    expect(useAnalytics().report).toHaveBeenCalledWith(expect.objectContaining({
      type: 'THUMBS_DOWN',
      queryId: '[queryId]',
      searcher: 'UNIVERSAL',
      directAnswer: true
    }));
  });
});

describe('FeaturedSnippet direct answer', () => {
  beforeEach(() => {
    spyOnFeaturedSnippetDA();
    render(<DirectAnswer />);
  });

  it('title text', () => {
    const expectedTitle = '[value]';
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });

  it('description text', () => {
    const expectedValue = '[snippet.value]' + JSON.stringify([{ length: 4, offset: 1 }]);
    expect(screen.getByTestId('highlighted-value')).toHaveTextContent(expectedValue);
  });

  it('link', () => {
    const directAnswerLink = screen.getByRole('link');
    expect(directAnswerLink).toHaveTextContent('[relatedResult.name]');
    expect(directAnswerLink).toHaveAttribute('href', '[relatedResult.link]');
  });

  it('reports link click analytics', () => {
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(useAnalytics().report).toHaveBeenCalledTimes(1);
    expect(useAnalytics().report).toHaveBeenCalledWith(expect.objectContaining({
      type: 'CTA_CLICK',
      queryId: '[queryId]',
      searcher: 'UNIVERSAL',
      directAnswer: true
    }));
  });

  it('reports THUMBS_UP feedback', () => {
    const thumbsUp = screen.queryAllByRole('button')[0];
    fireEvent.click(thumbsUp);
    expect(useAnalytics().report).toHaveBeenCalledTimes(1);
    expect(useAnalytics().report).toHaveBeenCalledWith(expect.objectContaining({
      type: 'THUMBS_UP',
      queryId: '[queryId]',
      searcher: 'UNIVERSAL',
      directAnswer: true
    }));
  });

  it('reports THUMBS_DOWN feedback', () => {
    const thumbsDown = screen.queryAllByRole('button')[1];
    fireEvent.click(thumbsDown);
    expect(useAnalytics().report).toHaveBeenCalledTimes(1);
    expect(useAnalytics().report).toHaveBeenCalledWith(expect.objectContaining({
      type: 'THUMBS_DOWN',
      queryId: '[queryId]',
      searcher: 'UNIVERSAL',
      directAnswer: true
    }));
  });
});

function spyOnFeaturedSnippetDA() {
  spyOnState({
    type: DirectAnswerType.FeaturedSnippet,
    snippet: {
      value: '[snippet.value]',
      matchedSubstrings: [{ length: 4, offset: 1 }]
    },
    value: '[value]',
    relatedResult: {
      link: '[relatedResult.link]',
      name: '[relatedResult.name]',
      id: '[relatedResult.id]'
    }
  });
}

function spyOnFieldValueDA() {
  spyOnState({
    type: DirectAnswerType.FieldValue,
    entityName: '[entityName]',
    fieldName: '[fieldName]',
    value: '[value]',
    relatedResult: {
      link: '[relatedResult.link]',
      id: '[relatedResult.id]'
    }
  });
}

function spyOnState(
  result?: RecursivePartial<FeaturedSnippetDirectAnswer | FieldValueDirectAnswer>,
  isLoading?: boolean,
  verticalKey?: string,
) {
  return spyOnAnswersState({
    directAnswer: { result },
    searchStatus: { isLoading },
    vertical: { verticalKey },
    query: {
      queryId: '[queryId]'
    }
  });
}