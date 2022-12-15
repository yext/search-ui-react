import { Source } from '@yext/search-headless-react';

export const locationVerticalSingle = {
  vertical: {
    results: [
      {
        name: 'title1',
        rawData: {
          name: 'title1',
          description: 'text1',
          yextDisplayCoordinate: {
            latitude: 40.741611,
            longitude: -74.005371,
          }
        },
        source: Source.KnowledgeManager,
        id: 'id1'
      }
    ],
    resultsCount: 1,
    limit: 1
  }
};

export const locationVerticalMultiple = {
  vertical: {
    results: [
      locationVerticalSingle.vertical.results[0],
      {
        name: 'title2',
        rawData: {
          name: 'title2',
          description: 'text2',
          yextDisplayCoordinate: {
            latitude: 40.710000,
            longitude: -74.005371,
          }
        },
        source: Source.KnowledgeManager,
        id: 'id2'
      },
      {
        name: 'title3',
        rawData: {
          name: 'title3',
          description: 'text3',
          yextDisplayCoordinate: {
            latitude: 40.741611,
            longitude: -73.980000,
          }
        },
        source: Source.KnowledgeManager,
        id: 'id3'
      }
    ],
    resultsCount: 3
  }
};
