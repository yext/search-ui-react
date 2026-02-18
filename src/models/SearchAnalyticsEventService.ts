import { SearchEventPayload } from './SearchEventPayload';

/**
 * A service for reporting Yext Search analytics events
 *
 * @public
 */
export interface SearchAnalyticsEventService {
    /**
     * Reports an analytics event
     *
     * @param payload - desired values to be applied
     */
  report(payload: SearchEventPayload): Promise<string>,
  /** Allows analytics reporting */
  enableYextAnalytics(): void,
  /** Disallows analytics reporting */
  disableYextAnalytics(): void,
  /** Returns whether analytics reporting is currently enabled*/
  getYextAnalyticsEnabled(): boolean
}
