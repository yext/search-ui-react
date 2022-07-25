import { useCallback } from 'react';
import { FeedbackType } from '../components/ThumbsFeedback';
import { DefaultRawDataType } from '../models';
import { CardAnalyticsDataType, useCardAnalytics } from './useCardAnalytics';

/**
 * Creates a memoized function for reporting card feedback analytics.
 *
 * @public
 *
 * @param result - card result that contains data use in the feedback analytics event.
 */
export function useCardFeedbackCallback<T = DefaultRawDataType>(
  result: CardAnalyticsDataType<T>,
): (analyticsType: FeedbackType) => void {
  const reportAnalyticsEvent = useCardAnalytics<T>();
  return useCallback((analyticsType: FeedbackType) => {
    reportAnalyticsEvent(result, analyticsType);
  }, [reportAnalyticsEvent, result]);
}

