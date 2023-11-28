import { ComponentMeta, Story } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { fireEvent } from '@testing-library/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { MapboxMap, MapboxMapProps } from '../../src/components/MapboxMap';
import { MapPin } from '../../test-site/src/components/MapPin';
import { Location } from '../../test-site/src/pages/LocationsPage';
import { locationVerticalSingle, locationVerticalMultiple } from '../__fixtures__/data/mapbox';
import React from 'react';

const meta: ComponentMeta<typeof MapboxMap> = {
  title: 'MapboxMap',
  component: MapboxMap,
  argTypes: {
    mapboxAccessToken: {
      control: false,
    },
    PinComponent: {
      control: false,
    },
  },
  args: {
    mapboxAccessToken: process.env.REACT_APP_MAPBOX_API_KEY,
  },
  parameters: { layout: 'fullscreen', percy: { enableJavascript: true } },
  decorators: [(Story) => (<div style={{ height: '100vh' }}><Story /></div>)]
};
export default meta;

const Template: Story<MapboxMapProps<Location>> = (args) => (
  <SearchHeadlessContext.Provider value={generateMockedHeadless(locationVerticalSingle)}>
    <MapboxMap {...args} />
  </SearchHeadlessContext.Provider>
);

export const Primary: any = Template.bind({});

export const MultiplePins: Story<MapboxMapProps<Location>> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(locationVerticalMultiple)}>
      <MapboxMap {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const CustomPin: any = Template.bind({});

CustomPin.args = {
  PinComponent: MapPin,
};

CustomPin.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const mapPin = await canvas.findByLabelText('Show pin details', undefined, {
    timeout: 30000
  });
  fireEvent.click(mapPin);
  await canvas.findByText('title1');
};
