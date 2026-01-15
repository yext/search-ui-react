import { Meta, StoryFn } from '@storybook/react';
import { RangeInput, RangeInputProps } from '../../src/components/Filters/RangeInput';
import { SearchHeadlessContext } from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { FiltersContext } from '../../src/components/Filters/FiltersContext';
import { FilterGroupProvider } from '../../src/components/Filters/FilterGroupProvider';
import { userEvent, within } from '@storybook/testing-library';
import { filterContextValue, filterContextValueDisabled } from '../__fixtures__/data/filtercontext';
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
      <FilterGroupProvider fieldId="123">
        <Story />
      </FilterGroupProvider>
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

export const DisabledForceDisplayTooltip: StoryFn<RangeInputProps> = Disabled.bind({});
DisabledForceDisplayTooltip.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const tooltip = canvas.getByText('Unselect an option to enter in a range.');
  tooltip.style.visibility = 'visible';
};

export const ValidValues: StoryFn<RangeInputProps> = Primary.bind({});
ValidValues.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const [minTextbox, maxTextbox] = canvas.getAllByRole('textbox');
  await userEvent.type(minTextbox, '10');
  await userEvent.type(maxTextbox, '20');
};

export const InvalidValues: StoryFn<RangeInputProps> = Primary.bind({});
InvalidValues.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const [minTextbox, maxTextbox] = canvas.getAllByRole('textbox');
  await userEvent.type(minTextbox, '20');
  await userEvent.type(maxTextbox, '10');
};
