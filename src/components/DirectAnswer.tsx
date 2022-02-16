import { useAnswersState, DirectAnswerType, DirectAnswer as DirectAnswerModel } from '@yext/answers-headless-react';
import renderHighlightedValue from './utils/renderHighlightedValue';
import classNames from 'classnames';
import { ReactNode, useState, useLayoutEffect } from 'react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import ThumbIcon from '../icons/ThumbIcon';
import { FeedbackType, useDirectAnswersAnalytics } from '../hooks/useDirectAnswerAnalytics';

/**
 * Props for {@link DirectAnswer}.
 *
 * @public
 */
export interface DirectAnswerProps {
  /** CSS classes for customizing the component styling. */
  customCssClasses?: DirectAnswerCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod
}

/**
 *  The CSS class interface for {@link DirectAnswer}.
 *
 * @public
 */
export interface DirectAnswerCssClasses {
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
  answerContainer?: string,
  feedbackButtonsContainer?: string,
  feedbackButton?: string,
  thumbsUpIcon?: string,
  thumbsDownIcon?: string
}

const builtInCssClasses: DirectAnswerCssClasses = {
  container: '',
  container___loading: 'opacity-50',
  fieldValueTitle: 'mb-4 text-gray-500',
  featuredSnippetTitle: 'mb-4 font-bold text-xl text-gray-800',
  content: '',
  fieldValueDescription: 'font-bold text-xl text-gray-800',
  featuredSnippetDescription: '',
  viewDetailsLink: 'text-blue-600',
  viewDetailsLinkContainer: 'pt-4 text-gray-500',
  highlighted: 'bg-blue-100',
  answerContainer: 'p-4 border rounded-lg shadow-sm',
  feedbackButtonsContainer: 'flex justify-end mt-2 text-sm text-gray-400 font-medium',
  thumbsUpIcon: 'ml-3 w-5',
  thumbsDownIcon: 'w-5 ml-1 transform rotate-180',
};

/**
 * Renders Direct Answers provided by the Answers API
 *
 * @public
 *
 * @param props - {@link DirectAnswerProps}
 * @returns A react element for DirectAnswer
 */
export default function DirectAnswer(props: DirectAnswerProps): JSX.Element | null {
  const directAnswerResult = useAnswersState(state => state.directAnswer.result);
  const isLoading = useAnswersState(state => state.searchStatus.isLoading || false);
  const composedCssClasses = useComposedCssClasses(
    builtInCssClasses, props.customCssClasses, props.cssCompositionMethod);
  const reportAnalyticsEvent = useDirectAnswersAnalytics();
  const [isFeedbackProvided, updateFeedbackStatus] = useState(false);
  useLayoutEffect(() => {
    updateFeedbackStatus(false);
  }, [directAnswerResult, updateFeedbackStatus]);

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

  function getLinkText(directAnswerResult: DirectAnswerModel) {
    const isSnippet = directAnswerResult.type === DirectAnswerType.FeaturedSnippet;
    const name = directAnswerResult.relatedResult.name;
    const onClick = () => {
      reportAnalyticsEvent(directAnswerResult, 'CTA_CLICK');
    };

    return (<>
      {isSnippet && name && <div className={cssClasses.viewDetailsLinkContainer}>
        Read more about <a className={cssClasses.viewDetailsLink} href={link} onClick={onClick}>
          {directAnswerResult.relatedResult.name}
        </a>
      </div>}
      {!isSnippet && link && <div className={cssClasses.viewDetailsLinkContainer}>
        <a href={link} className={cssClasses.viewDetailsLink} onClick={onClick}>View Details</a>
      </div>}
    </>);
  }

  const containerCssClasses = classNames(cssClasses.container, {
    [cssClasses.container___loading ?? '']: isLoading
  });

  const onClickFeedbackButton = (feedbackType: FeedbackType) => {
    updateFeedbackStatus(true);
    reportAnalyticsEvent(directAnswerResult, feedbackType);
  };

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
      <div className={cssClasses.feedbackButtonsContainer}>
        {isFeedbackProvided
          ? 'Thank you for your feedback!'
          : <>
            Feedback
            <button
              className={cssClasses.thumbsUpIcon}
              onClick={() => onClickFeedbackButton('THUMBS_UP')}
            >
              <ThumbIcon/>
            </button>
            <button
              className={cssClasses.thumbsDownIcon}
              onClick={() => onClickFeedbackButton('THUMBS_DOWN')}
            >
              <ThumbIcon/>
            </button>
          </>
        }
      </div>
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