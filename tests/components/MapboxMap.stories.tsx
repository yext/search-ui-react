import { ComponentMeta, Story } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { SearchHeadlessContext } from '@yext/search-headless-react';

import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { MapboxMap, MapboxMapProps } from '../../src/components/MapboxMap';
import { MapPin } from '../../test-site/src/components/MapPin';
import { Location } from '../../test-site/src/pages/LocationsPage';
import { locationVerticalSingle, locationVerticalMultiple } from '../__fixtures__/data/mapbox';
import { MapboxStaticImage, MapboxStaticImageProps } from '../../src/components/MapboxStaticImage';

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
    getCoordinate: {
      control: false,
    },
    onDrag: {
      control: false,
    }
  },
  parameters: {
    layout: 'fullscreen',
    percy: {
      enableJavascript: true,
    }
  },
  decorators: [(Story) => (<div style={{ height: '100vh' }}><Story /></div>)]
};
export default meta;

const Template: Story<MapboxMapProps<Location>> = (args) => (
  <SearchHeadlessContext.Provider value={generateMockedHeadless(locationVerticalSingle)}>
    <MapboxMap {...args} />
  </SearchHeadlessContext.Provider>
);

export const Primary = Template.bind({});

export const MultiplePins: Story<MapboxMapProps<Location>> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(locationVerticalMultiple)}>
      <MapboxMap {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const CustomPin = Template.bind({});
CustomPin.args = {
  PinComponent: MapPin,
};
CustomPin.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const mapPin = await canvas.findByLabelText('Show pin details', undefined, {
    timeout: 30000
  });
  userEvent.click(mapPin);
  await canvas.findByText('title1');
};

export const StaticImageBeforeLoad: Story<MapboxStaticImageProps> = (args) => (
  <SearchHeadlessContext.Provider value={generateMockedHeadless(locationVerticalSingle)}>
    <div className='grid h-full w-full'>
      <MapboxStaticImage {...args} />
    </div>
  </SearchHeadlessContext.Provider>
);
StaticImageBeforeLoad.args = {
  mapboxOptions: {
    style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
    center: [-74.005371, 40.741611],
    zoom: 9
  }
};
