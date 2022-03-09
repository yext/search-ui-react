import { Result, DirectAnswer as DirectAnswerData } from '@yext/answers-headless-react';
import { useCallback } from 'react';
import { CardAnalyticsType, useCardAnalytics } from './useCardAnalytics';

/**
 * Creates a memoized function for reporting card analytics.
 */
export function useCardAnalyticsCallback(
  result: Result | DirectAnswerData,
  analyticsType: CardAnalyticsType
): () => void {
  const reportAnalyticsEvent = useCardAnalytics();
  return useCallback(() => {
    reportAnalyticsEvent(result, analyticsType);
  }, [analyticsType, reportAnalyticsEvent, result]);
}

