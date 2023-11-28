import { Meta, StoryFn } from '@storybook/react';
import { RangeInput, RangeInputProps } from '../../src/components/Filters/RangeInput';
import { SearchHeadlessContext } from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { FiltersContext } from '../../src/components/Filters/FiltersContext';
import { FilterGroupContext } from '../../src/components/Filters/FilterGroupContext';
import { userEvent, within } from '@storybook/testing-library';
import { filterContextValue, filterContextValueDisabled, filterGroupContextValue } from '../__fixtures__/data/filtercontext';
import React from 'react';

const meta: Meta<typeof RangeInput> = {
  title: 'RangeInput',
  component: RangeInput,
  argTypes: {
    inputPrefix: {
      control: false
    }
  },
  decorators: [(Story) => (
    <SearchHeadlessContext.Provider value={generateMockedHeadless()}>
      <FilterGroupContext.Provider value={filterGroupContextValue}>
        <Story />
      </FilterGroupContext.Provider>
    </SearchHeadlessContext.Provider>
  )]
};
export default meta;

export const Primary: StoryFn<RangeInputProps> = (args) => {
  return (
    <FiltersContext.Provider value={filterContextValue}>
      <RangeInput {...args}/>
    </FiltersContext.Provider>
  );
};

export const Disabled: StoryFn<RangeInputProps> = (args) => {
  return (
    <FiltersContext.Provider value={filterContextValueDisabled}>
      <RangeInput {...args}/>
    </FiltersContext.Provider>
  );
};

export const DisabledForceDisplayTooltip: any = Disabled.bind({});
DisabledForceDisplayTooltip.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const tooltip = canvas.getByText('Unselect an option to enter in a range.');
  tooltip.style.visibility = 'visible';
};

export const ValidValues: any = Primary.bind({});
ValidValues.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const [minTextbox, maxTextbox] = canvas.getAllByRole('textbox');
  userEvent.type(minTextbox, '10');
  userEvent.type(maxTextbox, '20');
};

export const InvalidValues: any = Primary.bind({});
InvalidValues.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const [minTextbox, maxTextbox] = canvas.getAllByRole('textbox');
  userEvent.type(minTextbox, '20');
  userEvent.type(maxTextbox, '10');
};
