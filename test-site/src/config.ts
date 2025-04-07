import { CloudRegion, CloudChoice, Environment } from '@yext/search-headless-react';
import {AnalyticsConfig} from "@yext/analytics";

export const config = {
  apiKey: process.env.REACT_APP_LIVE_API_KEY || 'REPLACE_ME',
  experienceKey: 'slanswers-hier-facets',
  locale: 'en',
  experienceVersion: 'STAGING',
  businessId: 3350634,
  cloudRegion: CloudRegion.US,
  cloudChoice: CloudChoice.GLOBAL_MULTI,
  environment: Environment.PROD,
};

export const analyticsConfig: AnalyticsConfig = {
  authorizationType: 'apiKey',
  authorization: process.env.REACT_APP_EVENTS_API_KEY || 'REPLACE_ME',
};
