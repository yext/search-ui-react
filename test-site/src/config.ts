import { CloudRegion, CloudChoice, Environment } from '@yext/search-headless-react';
import {SearchAnalyticsConfig} from "../../src";

export const config = {
  apiKey: process.env.REACT_APP_LIVE_API_KEY || '722d20ad53157666ea2df0d3831433c2',
  experienceKey: 'max-test',
  locale: 'en',
  experienceVersion: 'STAGING',
  businessId: 70452,
  cloudRegion: CloudRegion.US,
  cloudChoice: CloudChoice.GLOBAL_MULTI,
  environment: Environment.PROD,
};

export const analyticsConfig: SearchAnalyticsConfig = {
  apiKey: process.env.REACT_APP_EVENTS_API_KEY || 'REPLACE_ME',
  environment: Environment.PROD,
  cloudRegion: CloudRegion.US,
  requireOptIn: false,
};
