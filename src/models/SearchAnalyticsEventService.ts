import { SearchEventPayload } from "./SearchEventPayload";

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
    report(payload: SearchEventPayload): Promise<string>;
}
