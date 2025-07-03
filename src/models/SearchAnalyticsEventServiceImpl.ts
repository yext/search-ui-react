import {analytics, AnalyticsConfig, AnalyticsEventService, EventPayload} from "@yext/analytics";
import {SearchAnalyticsConfig} from "../components";
import {CloudRegion, Environment} from "@yext/search-core";
import {SearchEventPayload} from "./SearchEventPayload";
import {SearchAnalyticsEventService} from "./SearchAnalyticsEventService";


/** An implementation of {@link SearchAnalyticsEventService} which makes calls to the Analytics Events API */
export class SearchAnalyticsEventServiceImpl implements SearchAnalyticsEventService {
    private internalService: AnalyticsEventService;
    /**
     * @param searchAnalyticsConfig
     */
    constructor(searchAnalyticsConfig: SearchAnalyticsConfig) {
        const analyticsConfig: AnalyticsConfig = {
            authorizationType: 'apiKey',
            authorization: searchAnalyticsConfig.apiKey,
            env: searchAnalyticsConfig.environment &&
            searchAnalyticsConfig.environment === Environment.PROD ? "PRODUCTION" :
                searchAnalyticsConfig.environment === Environment.SANDBOX ? "SANDBOX" : undefined,
            region: searchAnalyticsConfig.cloudRegion && searchAnalyticsConfig.cloudRegion === CloudRegion.US ? "US" : "EU",
            sessionTrackingEnabled: searchAnalyticsConfig.sessionTrackingEnabled
        }
        this.internalService = analytics(analyticsConfig);
    }

    public async report(payload: SearchEventPayload): Promise<string> {
        const eventPayload: EventPayload = {
            action: payload.action,
            destinationUrl: payload.destinationUrl,
            entity: payload.entity,
            locale: payload.locale,
            search: {
                searchId: payload.searchId,
                queryId: payload.queryId,
                verticalKey: payload.verticalKey,
                isDirectAnswer: payload.isDirectAnswer,
                versionLabel: payload.versionLabel,
                versionNumber: payload.versionNumber,
                experienceKey: payload.experienceKey,
                isGenerativeDirectAnswer: payload.isGenerativeDirectAnswer
            },
            searchTerm: payload.searchTerm
        }
        return this.internalService.report(eventPayload);
    }
}
