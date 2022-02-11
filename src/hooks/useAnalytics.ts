import { AnalyticsService } from '@yext/analytics';
import { createContext, useContext } from 'react';

export const AnalyticsContext = createContext<AnalyticsService | null>(null);

/**
 * Returns a service that can be used to report analytics events.
 */
export function useAnalytics(): AnalyticsService | null {
  return useContext(AnalyticsContext);
}
