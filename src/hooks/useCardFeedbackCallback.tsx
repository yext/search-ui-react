import { Result, DirectAnswer as DirectAnswerData } from '@yext/search-headless-react';
import { useCallback } from 'react';
import { FeedbackType } from '../components/ThumbsFeedback';
import { DefaultRawDataType } from '../models';
import { useCardAnalytics } from './useCardAnalytics';

/**
 * Creates a memoized function for reporting card feedback analytics.
 *
 * @public
 *
 * @param result - card result that contains data use in the feedback analytics event.
 */
export function useCardFeedbackCallback<T = DefaultRawDataType>(
  result: Result<T> | DirectAnswerData,
): (analyticsType: FeedbackType) => void {
  const reportAnalyticsEvent = useCardAnalytics<T>();
  return useCallback((analyticsType: FeedbackType) => {
    reportAnalyticsEvent(result, analyticsType);
  }, [reportAnalyticsEvent, result]);
}

