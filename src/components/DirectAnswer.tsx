import { useAnswersState, DirectAnswerType, DirectAnswer as DirectAnswerData } from '@yext/answers-headless-react';
import { renderHighlightedValue } from './utils/renderHighlightedValue';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useComposedCssClasses } from '../hooks/useComposedCssClasses';
import {
  ThumbsFeedbackCssClasses,
  ThumbsFeedback,
  builtInCssClasses as thumbsFeedbackCssClasses
} from './ThumbsFeedback';

import { useCardAnalyticsCallback } from '../hooks/useCardAnalyticsCallback';
import { useCardFeedbackCallback } from '../hooks/useCardFeedbackCallback';

/**
 * Props for {@link DirectAnswer}.
 *
 * @public
 */
export interface DirectAnswerProps {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: DirectAnswerCssClasses
}

/**
 *  The CSS class interface for {@link DirectAnswer}.
 *
 * @public
 */
export interface DirectAnswerCssClasses extends ThumbsFeedbackCssClasses {
  container?: string,
  container___loading?: string,
  fieldValueTitle?: string,
  featuredSnippetTitle?: string,
  content?: string,
  fieldValueDescription?: string,
  featuredSnippetDescription?: string,
  viewDetailsLink?: string,
  viewDetailsLinkContainer?: string,
  highlighted?: string,
  answerContainer?: string
}

const builtInCssClasses: Readonly<DirectAnswerCssClasses> = {
  container: '',
  container___loading: 'opacity-50',
  fieldValueTitle: 'mb-4 text-neutral',
  featuredSnippetTitle: 'mb-4 font-bold text-xl text-neutral-dark',
  content: '',
  fieldValueDescription: 'font-bold text-xl text-neutral-dark',
  featuredSnippetDescription: '',
  viewDetailsLink: 'text-primary',
  viewDetailsLinkContainer: 'pt-4 text-neutral',
  highlighted: 'bg-primary-light',
  answerContainer: 'p-4 border rounded-lg shadow-sm',
  feedbackButtonsContainer: thumbsFeedbackCssClasses.feedbackButtonsContainer,
  thumbsUpIcon: thumbsFeedbackCssClasses.thumbsUpIcon,
  thumbsDownIcon: thumbsFeedbackCssClasses.thumbsDownIcon
};

/**
 * Renders Direct Answers provided by the Answers API.
 *
 * @public
 *
 * @param props - {@link DirectAnswerProps}
 * @returns A react element for DirectAnswer
 */
export function DirectAnswer(props: DirectAnswerProps): JSX.Element | null {
  const directAnswerResult = useAnswersState(state => state.directAnswer.result);
  const isLoading = useAnswersState(state => state.searchStatus.isLoading || false);
  const composedCssClasses = useComposedCssClasses(builtInCssClasses, props.customCssClasses);

  const handleClickViewDetails = useCardAnalyticsCallback(directAnswerResult as DirectAnswerData, 'CTA_CLICK');
  const handleClickFeedbackButton = useCardFeedbackCallback(directAnswerResult as DirectAnswerData);

  if (!directAnswerResult) {
    return null;
  }

  const cssClasses = getCssClassesForAnswerType(composedCssClasses, directAnswerResult.type);
  const title = directAnswerResult.type === DirectAnswerType.FeaturedSnippet
    ? directAnswerResult.value
    : `${directAnswerResult.entityName} / ${directAnswerResult.fieldName}`;
  const description: ReactNode = directAnswerResult.type === DirectAnswerType.FeaturedSnippet
    ? renderHighlightedValue(directAnswerResult.snippet, { highlighted: cssClasses.highlighted })
    : directAnswerResult.value;
  const link = directAnswerResult.relatedResult.link;

  function getLinkText(directAnswerResult: DirectAnswerData) {
    const isSnippet = directAnswerResult.type === DirectAnswerType.FeaturedSnippet;
    const name = directAnswerResult.relatedResult.name;

    return (<>
      {isSnippet && name && <div className={cssClasses.viewDetailsLinkContainer}>
        Read more about
        <a
          className={cssClasses.viewDetailsLink}
          href={link}
          onClick={handleClickViewDetails}
        >
          {name}
        </a>
      </div>}
      {!isSnippet && link && <div className={cssClasses.viewDetailsLinkContainer}>
        <a
          href={link}
          className={cssClasses.viewDetailsLink}
          onClick={handleClickViewDetails}
        >
          View Details
        </a>
      </div>}
    </>);
  }

  const containerCssClasses = classNames(cssClasses.container, {
    [cssClasses.container___loading ?? '']: isLoading
  });

  return (
    <div className={containerCssClasses}>
      <div className={cssClasses.answerContainer}>
        {title &&
          <div className={cssClasses.title}>{title}</div>}
        <div className={cssClasses.content}>
          <div className={cssClasses.description}>{description}</div>
          {link && getLinkText(directAnswerResult)}
        </div>
      </div>
      <ThumbsFeedback
        onClick={handleClickFeedbackButton}
        cssClasses={composedCssClasses}
      />
    </div>
  );
}

function getCssClassesForAnswerType(cssClasses: DirectAnswerCssClasses, type: DirectAnswerType) {
  const isSnippet = type === DirectAnswerType.FeaturedSnippet;
  return {
    ...cssClasses,
    title: isSnippet ? cssClasses.featuredSnippetTitle : cssClasses.fieldValueTitle,
    description: isSnippet ? cssClasses.featuredSnippetDescription : cssClasses.fieldValueDescription
  };
}
