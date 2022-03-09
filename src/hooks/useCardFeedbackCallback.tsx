import { Result, DirectAnswer as DirectAnswerData } from '@yext/answers-headless-react';
import { useCallback } from 'react';
import { FeedbackType } from '../components/ThumbsFeedback';
import { useCardAnalytics } from './useCardAnalytics';

/**
 * Creates a memoized function for reporting card feedback analytics.
 */
export function useCardFeedbackCallback(
  result: Result | DirectAnswerData,
): (analyticsType: FeedbackType) => void {
  const reportAnalyticsEvent = useCardAnalytics();
  return useCallback((analyticsType: FeedbackType) => {
    reportAnalyticsEvent(result, analyticsType);
  }, [reportAnalyticsEvent, result]);
}

