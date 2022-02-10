import { ReactChild, ReactChildren } from 'react';
import { provideAnalytics, AnalyticsConfig } from '@yext/analytics';
import { AnalyticsContext } from '../hooks/useAnalytics';

type Props = AnalyticsConfig & {
  children?: ReactChildren | ReactChild | (ReactChildren | ReactChild)[]
};

export function AnalyticsProvider(props: Props): JSX.Element {
  const { children, ...analyticsConfig } = props;
  const analyticsReporter = provideAnalytics(analyticsConfig);

  return (
    <AnalyticsContext.Provider value={analyticsReporter}>
      {children}
    </AnalyticsContext.Provider>
  );
}