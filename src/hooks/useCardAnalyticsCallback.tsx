import { useCallback } from 'react';
import { DefaultRawDataType } from '../models';
import {
  CardAnalyticsDataType,
  CardAnalyticsType,
  useCardAnalytics
} from './useCardAnalytics';

/**
 * Creates a memoized function for reporting card analytics.
 *
 * @public
 *
 * @param result - result that contains data use in the card analytics event.
 * @param analyticsType - the card analytics event type to report.
 */
export function useCardAnalyticsCallback<T = DefaultRawDataType>(
  result: CardAnalyticsDataType<T>,
  analyticsType: CardAnalyticsType
): () => void {
  const reportAnalyticsEvent = useCardAnalytics<T>();
  return useCallback(() => {
    reportAnalyticsEvent(result, analyticsType);
  }, [analyticsType, reportAnalyticsEvent, result]);
}

