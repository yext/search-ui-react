import {
  useSearchState,
  DirectAnswerType,
  DirectAnswer as DirectAnswerData,
} from '@yext/search-headless-react';
import {
  ThumbsFeedbackCssClasses,
  ThumbsFeedback,
  builtInCssClasses as thumbsFeedbackCssClasses
} from './ThumbsFeedback';
import { twMerge, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { useCardAnalyticsCallback } from '../hooks/useCardAnalyticsCallback';
import { useCardFeedbackCallback } from '../hooks/useCardFeedbackCallback';
import { FieldValueDirectAnswer } from './FieldValueDirectAnswer';
import { FeaturedSnippetDirectAnswer } from './FeaturedSnippetDirectAnswer';

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
  directAnswerContainer?: string,
  directAnswerLoading?: string,
  answer?: string,
  description?: string,
  content?: string,
  highlighted?: string,
  answerContainer?: string
}

const builtInCssClasses: Readonly<DirectAnswerCssClasses> = {
  directAnswerContainer: '',
  directAnswerLoading: 'opacity-50',
  answer: 'font-bold text-xl text-neutral-dark',
  description: 'text-neutral',
  content: 'mt-4',
  highlighted: 'bg-primary-light',
  answerContainer: 'p-4 border rounded-lg shadow-sm',
  thumbsFeedbackContainer: thumbsFeedbackCssClasses.thumbsFeedbackContainer,
  thumbsUpIcon: thumbsFeedbackCssClasses.thumbsUpIcon,
  thumbsDownIcon: thumbsFeedbackCssClasses.thumbsDownIcon
};

/**
 * Renders Direct Answers provided by the Search API.
 *
 * @public
 *
 * @param props - {@link DirectAnswerProps}
 * @returns A react element for DirectAnswer
 */
export function DirectAnswer(props: DirectAnswerProps): JSX.Element | null {
  const directAnswerResult = useSearchState(state => state.directAnswer.result);
  const isLoading = useSearchState(state => state.searchStatus.isLoading || false);
  const composedCssClasses = useComposedCssClasses(builtInCssClasses, props.customCssClasses);

  const handleClickViewDetails = useCardAnalyticsCallback(directAnswerResult as DirectAnswerData, 'CTA_CLICK');
  const handleClickFeedbackButton = useCardFeedbackCallback(directAnswerResult as DirectAnswerData);

  if (!directAnswerResult) {
    return null;
  }

  const cssClasses = getCssClassesForAnswerType(composedCssClasses, directAnswerResult.type);
  const containerCssClasses = twMerge(
    cssClasses.directAnswerContainer,
    isLoading && cssClasses.directAnswerLoading
  );

  return (
    <div className={containerCssClasses}>
      {directAnswerResult.type === DirectAnswerType.FieldValue
        ? <FieldValueDirectAnswer
          result={directAnswerResult}
          cssClasses={cssClasses}
          viewDetailsClickHandler={handleClickViewDetails}
        />
        : <FeaturedSnippetDirectAnswer
          result={directAnswerResult}
          readMoreClickHandler={handleClickViewDetails}
          cssClasses={cssClasses}
        />
      }
      <ThumbsFeedback
        onClick={handleClickFeedbackButton}
        customCssClasses={composedCssClasses}
      />
    </div>
  );
}

function getCssClassesForAnswerType(cssClasses: DirectAnswerCssClasses, type: DirectAnswerType) {
  const isSnippet = type === DirectAnswerType.FeaturedSnippet;
  return {
    ...cssClasses,
    header: isSnippet ? cssClasses.answer : cssClasses.description,
    body: isSnippet ? cssClasses.description : cssClasses.answer
  };
}
