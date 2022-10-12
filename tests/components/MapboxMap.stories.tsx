import { ComponentMeta, Story } from '@storybook/react';
import _ from 'lodash';
import { SearchHeadlessContext, Source } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { MapboxMap, MapboxMapProps } from '../../src/components/MapboxMap';
import { MapPin } from '../../test-site/src/components/MapPin';
import { Location } from '../../test-site/src/pages/LocationsPage';

const meta: ComponentMeta<typeof MapboxMap> = {
  title: 'MapboxMap',
  component: MapboxMap,
  argTypes: {
    mapboxAccessToken: {
      defaultValue: process.env.REACT_APP_MAPBOX_API_KEY,
      control: false,
    },
    PinComponent: {
      control: false,
    },
  },
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => (<div style={{ height: '100vh' }}><Story /></div>)]
};
export default meta;

const mockedHeadlessState = {
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

// Deep copy state to make an alternative with multiple locations
const mockedHeadlessStateMultiple = _.cloneDeep(mockedHeadlessState);
mockedHeadlessStateMultiple.vertical.results.push(
  {
    name: 'title2',
    rawData: {
      name: 'title2',
      description: 'text2',
      yextDisplayCoordinate: {
        latitude: 40.641611,
        longitude: -74.005371,
      }
    },
    source: Source.KnowledgeManager,
    id: 'id2'
  }
);

export const Primary: Story<MapboxMapProps<Location>> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <MapboxMap {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const MultiplePins: Story<MapboxMapProps<Location>> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessStateMultiple)}>
      <MapboxMap {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const CustomPin = (args: MapboxMapProps<Location>) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <MapboxMap PinComponent={MapPin} {...args} />
    </SearchHeadlessContext.Provider>
  );
};

