import { CloudRegion, Environment } from '@yext/search-headless-react';

export const config = {
  apiKey: process.env.REACT_APP_LIVE_API_KEY || '01db1d1e5ebbaa7ea2e6807ad2196ab3',
  experienceKey: 'hh-vector-testing',
  locale: 'en',
  experienceVersion: 'STAGING',
  businessId: 919871,
  cloudRegion: CloudRegion.US,
  environment: Environment.PROD,
};