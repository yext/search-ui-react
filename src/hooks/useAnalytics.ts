import { createContext, useContext } from 'react';
import { SearchAnalyticsEventService } from '../models/SearchAnalyticsEventService';

export const AnalyticsContext = createContext<SearchAnalyticsEventService | null>(null);

/**
 * Returns a service that can be used to report analytics events.
 *
 * @public
 */
export function useAnalytics(): SearchAnalyticsEventService | null {
  return useContext(AnalyticsContext);
}
