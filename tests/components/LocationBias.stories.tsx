import { ComponentMeta, Story } from '@storybook/react';
import { SearchHeadlessContext, LocationBiasMethod } from '@yext/search-headless-react';

import { LocationBias, LocationBiasProps } from '../../src/components/LocationBias';

import { decorator as LocationOperationDecorator } from '../__fixtures__/utils/location-operations';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';
import { userEvent, within } from '@storybook/testing-library';

const meta: ComponentMeta<typeof LocationBias> = {
  title: 'LocationBias',
  component: LocationBias,
  argTypes: {
    geolocationOptions: {
      control: false
    }
  },
  parameters: {
    status: {
      type: 'deprecated',
    }
  },
};
export default meta;

const mockedLocationData = {
  locationBias: {
    latitude: 38.9072,
    longitude: -77.0369,
    displayName: 'Washington, DC',
    method: LocationBiasMethod.Device
  }
};

export const Primary: Story<LocationBiasProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      location: mockedLocationData
    })}>
      <LocationBias {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const Loading = Primary.bind({});
Loading.decorators = [LocationOperationDecorator];
Loading.parameters = {
  geoLocation: {
    isFetching: true
  }
};
Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByText('Update your location'));
};
