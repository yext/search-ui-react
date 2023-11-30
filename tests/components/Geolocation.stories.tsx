import { Meta, StoryFn } from '@storybook/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';

import { decorator as LocationOperationDecorator } from '../__fixtures__/utils/location-operations';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';
import { userEvent, within } from '@storybook/testing-library';
import { Geolocation, GeolocationProps } from '../../src/components/Geolocation';
import React from 'react';

const meta: Meta<typeof Geolocation> = {
  title: 'Geolocation',
  component: Geolocation,
  argTypes: {
    geolocationOptions: {
      control: false
    },
    GeolocationIcon: {
      control: false
    },
    handleClick: {
      control: false
    },
  }
};
export default meta;

export const Primary: StoryFn<GeolocationProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(VerticalSearcherState)}>
      <Geolocation {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const Loading: StoryFn<GeolocationProps> = Primary.bind({});
Loading.decorators = [LocationOperationDecorator];
Loading.parameters = {
  geoLocation: {
    isFetching: true
  }
};
Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByText('Use my location'));
};
