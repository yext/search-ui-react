import { useAnswersState } from '@yext/answers-headless-react';
import { useLayoutEffect, useState } from 'react';
import ThumbIcon from '../icons/ThumbIcon';

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
  feedbackButtonsContainer?: string,
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
  cssClasses: ThumbsFeedbackCssClasses
}

export const builtInCssClasses: ThumbsFeedbackCssClasses = {
  feedbackButtonsContainer: 'flex justify-end mt-2 text-sm text-gray-400 font-medium',
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
  const {
    onClick,
    feedbackText = 'Feedback',
    feedbackTextOnSubmission = 'Thank you for your feedback!',
    cssClasses = builtInCssClasses
  } = props;
  const query = useAnswersState(state => state.query.mostRecentSearch);
  const [isFeedbackProvided, setIsFeedbackProvided] = useState(false);
  useLayoutEffect(() => {
    setIsFeedbackProvided(false);
  }, [query, setIsFeedbackProvided]);

  return (
    <div className={cssClasses.feedbackButtonsContainer}>
      {isFeedbackProvided
        ? feedbackTextOnSubmission
        : <>
          {feedbackText}
          <button
            className={cssClasses.thumbsUpIcon}
            onClick={() => {
              onClick('THUMBS_UP');
              setIsFeedbackProvided(true);
            }}
          >
            <ThumbIcon/>
          </button>
          <button
            className={cssClasses.thumbsDownIcon}
            onClick={() => {
              onClick('THUMBS_DOWN');
              setIsFeedbackProvided(true);
            }}
          >
            <ThumbIcon/>
          </button>
        </>
      }
    </div>
  );
}