import { Trans } from 'react-i18next';
import { FeaturedSnippetDirectAnswer as FeaturedSnippetDirectAnswerType } from '@yext/search-headless-react';
import { renderHighlightedValue } from './utils/renderHighlightedValue';
import React, { useMemo } from 'react';

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

const unsupportedTextFormats: string[] = ['rich_text', 'rich_text_v2', 'markdown'];

export function FeaturedSnippetDirectAnswer({
  result,
  readMoreClickHandler,
  cssClasses = {}
}: FeaturedSnippetDirectAnswerProps): React.JSX.Element {
  const answer = result.fieldType === 'multi_line_text' && result.value;
  if (unsupportedTextFormats.includes(result.fieldType)) {
    console.warn('Rendering ' + result.fieldType + ' direct answer is currently not supported. ' +
        'You can modify your search configuration to convert ' + result.fieldType + ' to HTML to be rendered '
        + 'on the page.');
  }
  let snippet: React.JSX.Element;
  const snippetValue = useMemo(() =>
  { return { __html: result.snippet?.value }; }, [result.snippet?.value]);

  if (result.fieldType === 'html') {
    snippet = (
      <div dangerouslySetInnerHTML={snippetValue}></div>
    );
  }
  else {
    snippet = renderHighlightedValue(result.snippet, { highlighted: cssClasses.highlighted });
  }
  const link = result.relatedResult.link || result.relatedResult.rawData.landingPageUrl as string;
  const name = result.relatedResult.name;

  const readMoreComponents = useMemo(() => ({
    a: (
      <a
        className="text-primary"
        href={link}
        onClick={readMoreClickHandler}
        aria-label={name}
      />
    )
  }), [link, name, readMoreClickHandler]);
  const readMoreValues = useMemo(() => ({ name }), [name]);

  return (
    <div className={cssClasses.answerContainer}>
      {answer &&
        <div className={cssClasses.header}>{answer}</div>}
      <div className={cssClasses.content}>
        <div className={cssClasses.body}>{snippet}</div>
        {link && name && <div className='pt-4 text-neutral'>
          <Trans
            i18nKey='readMoreAbout'
            components={readMoreComponents}
            values={readMoreValues}
          />
        </div>}
      </div>
    </div>
  );
}
