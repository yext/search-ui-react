import { CloudRegion, CloudChoice, Environment } from '@yext/search-headless-react';

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