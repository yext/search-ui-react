import { ComponentMeta, Story } from '@storybook/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';

import { decorator as LocationOperationDecorator } from '../__fixtures__/utils/location-operations';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { VerticalSearcherState } from '../__fixtures__/headless-state';
import { userEvent, within } from '@storybook/testing-library';
import { Geolocation, GeolocationProps } from '../../src/components/Geolocation';

const meta: ComponentMeta<typeof Geolocation> = {
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

export const Primary: Story<GeolocationProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(VerticalSearcherState)}>
      <Geolocation {...args} />
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
Loading.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.click(canvas.getByText('Use my location'));
};
