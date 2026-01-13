import React, { PropsWithChildren } from 'react';
import { AnalyticsContext } from '../hooks/useAnalytics';
import { CloudRegion, Environment } from '@yext/search-core';
import { SearchAnalyticsEventServiceImpl } from '../models/SearchAnalyticsEventServiceImpl';

/**
 * A higher-order component which provides analytics for its children.
 *
 * @public
 *
 * @param props - The configuration for the analytics service
 * @returns A React element that provides analytics context
 */
export function AnalyticsProvider(props: PropsWithChildren<SearchAnalyticsConfig>): React.JSX.Element {
  const { children, ...searchAnalyticsConfig } = props;
  const analyticsReporter =
      new SearchAnalyticsEventServiceImpl(searchAnalyticsConfig);

  return (
    <AnalyticsContext.Provider value={ analyticsReporter }>
      {children}
    </AnalyticsContext.Provider>
  );
}

/**
 * An interface representing the configuration for search analytics reporting.
 *
 * @public
 */
export interface SearchAnalyticsConfig {
  /** The apiKey of the App with Events SDK access. */
  apiKey: string,
  /** The Yext environment to send requests to. Defaults to 'PRODUCTION'. */
  environment?: Environment,
  /** The region to send requests to. Defaults to 'US'. */
  cloudRegion?: CloudRegion,
  /** Whether to enable session tracking for analytics events. */
  sessionTrackingEnabled?: boolean
}
