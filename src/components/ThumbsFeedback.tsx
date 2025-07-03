import { useTranslation } from 'react-i18next';
import { useSearchState } from '@yext/search-headless-react';
import React, { useCallback, useState } from 'react';
import { ThumbIcon } from '../icons/ThumbIcon';
import { useComposedCssClasses } from '../hooks';
import { useLayoutEffect } from '../hooks/useLayoutEffect';

/**
 * Analytics event types for quality feedback.
 *
 * @public
 */
export type FeedbackType = 'THUMBS_UP' | 'THUMBS_DOWN';

/**
 * The CSS class interface used for {@link ThumbsFeedback}.
 *
 * @public
 */
export interface ThumbsFeedbackCssClasses {
  thumbsFeedbackContainer?: string,
  thumbsUpIcon?: string,
  thumbsDownIcon?: string
}

/**
 * Props for {@link ThumbsFeedback}.
 *
 * @public
 */
export interface ThumbsFeedbackProps {
  /** A function which is called when a quality feedback button is clicked. */
  onClick: (feedbackType: FeedbackType) => void,
  /** Text to display alongside the quality feedback buttons. */
  feedbackText?: string,
  /** Text to display after a quality feedback button is clicked. */
  feedbackTextOnSubmission?: string,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: ThumbsFeedbackCssClasses
}

export const builtInCssClasses: Readonly<ThumbsFeedbackCssClasses> = {
  thumbsFeedbackContainer: 'flex justify-end mt-2 text-sm text-gray-500 font-medium',
  thumbsUpIcon: 'ml-3 w-5',
  thumbsDownIcon: 'w-5 ml-1 transform rotate-180'
};

/**
 * Renders a quality feedback widget composed of thumbs up and thumbs down buttons.
 *
 * @public
 *
 * @param props - The configuration for the the feedback component.
 * @returns A React element for quality feedback widget.
 */
export function ThumbsFeedback(props: ThumbsFeedbackProps): JSX.Element {
  const { t } = useTranslation();
  const {
    onClick,
    feedbackText,
    feedbackTextOnSubmission,
  } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, props.customCssClasses);
  const query = useSearchState(state => state.query.mostRecentSearch);
  const [isFeedbackProvided, setIsFeedbackProvided] = useState(false);

  const handleClickThumbsUp = useCallback(() => {
    onClick('THUMBS_UP');
    setIsFeedbackProvided(true);
  }, [onClick]);

  const handleClickThumbsDown = useCallback(() => {
    onClick('THUMBS_DOWN');
    setIsFeedbackProvided(true);
  }, [onClick]);

  // Changes to most recent search query will trigger re-render to reset quality feedback submission.
  useLayoutEffect(() => {
    setIsFeedbackProvided(false);
  }, [query]);

  return (
    <div className={cssClasses.thumbsFeedbackContainer}>
      {isFeedbackProvided
        ? feedbackTextOnSubmission ?? t('thankYouForYourFeedback')
        : <>
          {feedbackText ?? t('feedback', 'Feedback')}
          <button
            className={cssClasses.thumbsUpIcon}
            onClick={handleClickThumbsUp}
            aria-label={t('thisAnsweredMyQuestion')}
          >
            <ThumbIcon/>
          </button>
          <button
            className={cssClasses.thumbsDownIcon}
            onClick={handleClickThumbsDown}
            aria-label={t('thisDidNotAnswerMyQuestion')}
          >
            <ThumbIcon/>
          </button>
        </>
      }
    </div>
  );
}