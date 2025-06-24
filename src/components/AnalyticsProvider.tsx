import React, {PropsWithChildren} from 'react';
import {analytics, AnalyticsConfig} from '@yext/analytics';
import {AnalyticsContext} from '../hooks/useAnalytics';
import {CloudRegion, Environment} from "@yext/search-core";

/**
 * A higher-order component which provides analytics for its children.
 *
 * @public
 *
 * @param props - The configuration for the analytics service
 * @returns A React element that provides analytics context
 */
export function AnalyticsProvider(props: PropsWithChildren<SearchAnalyticsConfig>): JSX.Element {
    const {children, ...searchAnalyticsConfig} = props;

    const analyticsConfig: AnalyticsConfig = {
        authorizationType: 'apiKey',
        authorization: searchAnalyticsConfig.apiKey,
        env: searchAnalyticsConfig.environment &&
            searchAnalyticsConfig.environment === Environment.PROD ? "PRODUCTION" :
            searchAnalyticsConfig.environment === Environment.SANDBOX ? "SANDBOX" : undefined,
        region: searchAnalyticsConfig.cloudRegion && searchAnalyticsConfig.cloudRegion === CloudRegion.US ? "US" : "EU",
        sessionTrackingEnabled: searchAnalyticsConfig.sessionTrackingEnabled
    }
    const analyticsReporter = analytics(analyticsConfig);

    return (
        <AnalyticsContext.Provider value={analyticsReporter}>
            {children}
        </AnalyticsContext.Provider>
    );
}

export interface SearchAnalyticsConfig {
    /** The apiKey of the App with Events SDK access. */
    apiKey: string
    /** The Yext environment to send requests to. Defaults to 'PRODUCTION'. */
    environment?: Environment
    /** The region to send requests to. Defaults to 'US'. */
    cloudRegion?: CloudRegion;
    /** Whether to enable session tracking for analytics events. */
    sessionTrackingEnabled?: boolean;
}
