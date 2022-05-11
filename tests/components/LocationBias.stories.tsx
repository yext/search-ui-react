import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { AnswersHeadlessContext, LocationBiasMethod } from '@yext/answers-headless-react';

import { LocationBias } from '../../src/components/LocationBias';

import { decorator as LocationOperationDecorator } from '../__fixtures__/utils/location-operations';
import { generateMockedHeadless } from '../__fixtures__/answers-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';
import { userEvent, within } from '@storybook/testing-library';

const meta: ComponentMeta<typeof LocationBias> = {
  title: 'LocationBias',
  component: LocationBias,
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

export const Primary = () => {
  return (
    <AnswersHeadlessContext.Provider value={generateMockedHeadless({
      ...VerticalSearcherState,
      location: mockedLocationData
    })}>
      <LocationBias />
    </AnswersHeadlessContext.Provider>
  );
};

export const Loading = Primary.bind({});
Loading.decorators = [LocationOperationDecorator];
Loading.parameters = {
  geoLocation: {
    isFetching: true
  }
};
Loading.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.click(canvas.getByText('Update your location'));
};
