import { PropsWithChildren } from 'react';
import { provideAnalytics, AnalyticsConfig } from '@yext/analytics';
import { AnalyticsContext } from '../hooks/useAnalytics';

/**
 * A higher-order component which provides analytics for its children.
 *
 * @public
 *
 * @param props - The configuration for the analytics service
 * @returns A React element that provides analytics context
 */
export function AnalyticsProvider(props: PropsWithChildren<AnalyticsConfig>): JSX.Element {
  const { children, ...analyticsConfig } = props;
  const analyticsReporter = provideAnalytics(analyticsConfig);

  return (
    <AnalyticsContext.Provider value={analyticsReporter}>
      {children}
    </AnalyticsContext.Provider>
  );
}