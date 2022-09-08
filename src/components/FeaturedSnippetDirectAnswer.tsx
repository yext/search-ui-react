import { FeaturedSnippetDirectAnswer as FeaturedSnippetDirectAnswerType } from '@yext/search-headless-react';
import { renderHighlightedValue } from './utils/renderHighlightedValue';

/**
 * Props for {@link FeaturedSnippetDirectAnswer}.
 */
interface FeaturedSnippetDirectAnswerProps {
  /** A featured snippet direct answer result. */
  result: FeaturedSnippetDirectAnswerType,
  /** Handle onClick event for "Read more about" link. */
  readMoreClickHandler?: () => void,
  /** CSS classes for customizing the component styling. */
  cssClasses?: FeaturedSnippetDirectAnswerCssClasses
}

/**
 *  The CSS class interface for {@link FeaturedSnippetDirectAnswer}.
 */
interface FeaturedSnippetDirectAnswerCssClasses {
  header?: string,
  body?: string,
  content?: string,
  answerContainer?: string,
  highlighted?: string
}

/**
 * Renders a featured snippet direct answer provided by the Search API.
 *
 * @internal
 */
export function FeaturedSnippetDirectAnswer({
  result,
  readMoreClickHandler,
  cssClasses = {}
}: FeaturedSnippetDirectAnswerProps): JSX.Element {
  const answer = result.fieldType === 'multi_line_text' && result.value;
  // TODO: SLAP-2340, update rich text snippets to convert the markdown
  if (result.fieldType === 'rich_text') {
    console.warn('Rendering markdown for rich text direct answer is currently not supported. Displaying the unrendered markdown string as is.');
  }
  const snippet = renderHighlightedValue(result.snippet, { highlighted: cssClasses.highlighted });
  const link = result.relatedResult.link || result.relatedResult.rawData.landingPageUrl as string;
  const name = result.relatedResult.name;
  const snippetLinkMessage = 'Read more about ';

  return (
    <div className={cssClasses.answerContainer}>
      {answer &&
        <div className={cssClasses.header}>{answer}</div>}
      <div className={cssClasses.content}>
        <div className={cssClasses.body}>{snippet}</div>
        {link && name && <div className='pt-4 text-neutral'>
          {snippetLinkMessage}
          <a
            className='text-primary'
            href={link}
            onClick={readMoreClickHandler}
          >
            {name}
          </a>
        </div>}
      </div>
    </div>
  );
}
