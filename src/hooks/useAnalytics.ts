import {AnalyticsEventService } from '@yext/analytics';
import { createContext, useContext } from 'react';

export const AnalyticsContext = createContext<AnalyticsEventService | null>(null);

/**
 * Returns a service that can be used to report analytics events.
 *
 * @public
 */
export function useAnalytics(): AnalyticsEventService | null {
  return useContext(AnalyticsContext);
}
