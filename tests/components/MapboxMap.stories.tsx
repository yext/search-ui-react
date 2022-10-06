import { useCallback } from 'react';
import { ComponentMeta } from '@storybook/react';
import { SearchHeadlessContext, Source } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { MapboxMap, MapboxMapProps } from '../../src/components/MapboxMap';

const meta: ComponentMeta<typeof MapboxMap<Location>> = {
  title: 'MapboxMap',
  component: MapboxMap,
  argTypes: {
    mapboxAccessToken: {
      defaultValue: process.env.REACT_APP_MAPBOX_API_KEY,
      control: {
        type: null,
      }
    }
  },
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => (<div className="h-screen"><Story /></div>)]
};
export default meta;

const mockedHeadlessState = {
  vertical: {
    results: [
      {
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

// Deep copy state to make an alternative with multiple locations
let mockedHeadlessStateMultiple = JSON.parse(JSON.stringify(mockedHeadlessState));
mockedHeadlessStateMultiple.vertical.results.push(
  {
    rawData: {
      name: 'title1',
      description: 'text1',
      yextDisplayCoordinate: {
        latitude: 40.641611,
        longitude: -74.005371,
      }
    },
    source: Source.KnowledgeManager,
    id: 'id2'
  }
);

export const Primary = (args: MapboxMapProps<Location>) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <MapboxMap {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const MultiplePins = (args: MapboxMapProps<Location>) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessStateMultiple)}>
      <MapboxMap {...args} />
    </SearchHeadlessContext.Provider>
  );
};

