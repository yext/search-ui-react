import { AnalyticsService } from '@yext/analytics';
import { createContext, useContext } from 'react';

export const AnalyticsContext = createContext<AnalyticsService>({} as AnalyticsService);

export function useAnalytics(): AnalyticsService {
  const analyticsReporter = useContext(AnalyticsContext);
  if (analyticsReporter.report === undefined) {
    throw new Error('Attempted to call useAnalytics() outside of AnalyticsProvider.'
     + ' Please ensure that \'useAnalytics()\' is called within an AnalyticsProvider component.');
  }
  return analyticsReporter;
}
