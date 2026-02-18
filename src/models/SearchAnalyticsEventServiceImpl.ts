import { analytics, AnalyticsConfig, AnalyticsEventService, EventPayload } from '@yext/analytics';
import { SearchAnalyticsConfig } from '../components';
import { CloudRegion, Environment } from '@yext/search-core';
import { SearchEventPayload } from './SearchEventPayload';
import { SearchAnalyticsEventService } from './SearchAnalyticsEventService';

/** An implementation of {@link SearchAnalyticsEventService} which makes calls to the Analytics Events API */
export class SearchAnalyticsEventServiceImpl implements SearchAnalyticsEventService {
  private internalService: AnalyticsEventService;
  private analyticsEnabled: boolean;
  /**
   * @param searchAnalyticsConfig - configuration for analytics reporting.
   */
  constructor(searchAnalyticsConfig: SearchAnalyticsConfig) {
    const analyticsConfig: AnalyticsConfig = {
      authorizationType: 'apiKey',
      authorization: searchAnalyticsConfig.apiKey,
      env: searchAnalyticsConfig.environment &&
            searchAnalyticsConfig.environment === Environment.PROD ? 'PRODUCTION' :
        searchAnalyticsConfig.environment === Environment.SANDBOX ? 'SANDBOX' : undefined,
      region: searchAnalyticsConfig.cloudRegion && searchAnalyticsConfig.cloudRegion === CloudRegion.US ? 'US' : 'EU',
      sessionTrackingEnabled: searchAnalyticsConfig.sessionTrackingEnabled
    };
    this.internalService = analytics(analyticsConfig);
    // if requireOptIn is undefined or set to false, analytics are enabled
    this.analyticsEnabled = !searchAnalyticsConfig.requireOptIn;
  }

  public optIn(): void {
    this.analyticsEnabled = true;
  }

  public optOut(): void {
    this.analyticsEnabled = false;
  }

  public isYextAnalyticsEnabled(): boolean {
    return this.analyticsEnabled;
  }

  public async report(payload: SearchEventPayload): Promise<string> {
    if (!this.analyticsEnabled) {
      return Promise.resolve('');
    }
    const eventPayload: EventPayload = {
      action: payload.action,
      destinationUrl: payload.destinationUrl,
      entity: payload.entity,
      locale: payload.locale,
      search: {
        searchId: payload.searchId,
        queryId: payload.queryId,
        experienceKey: payload.experienceKey,
        verticalKey: payload.verticalKey,
        versionLabel: payload.versionLabel,
        versionNumber: payload.versionNumber,
        isDirectAnswer: payload.isDirectAnswer,
        isGenerativeDirectAnswer: payload.isGenerativeDirectAnswer
      },
      searchTerm: payload.searchTerm
    };
    return this.internalService.report(eventPayload);
  }
}
