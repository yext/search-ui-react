import { Meta, StoryFn } from '@storybook/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';
import { userEvent, within } from '@storybook/testing-library';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { staticFiltersProps } from '../__fixtures__/data/filters';
import { StaticFilters, StaticFiltersProps } from '../../src';
import React from 'react';

const meta: Meta<typeof StaticFilters> = {
  title: 'StaticFilters',
  component: StaticFilters,
  argTypes: {
    fieldId: {
      control: false
    }
  }
};
export default meta;

export const Primary: StoryFn<StaticFiltersProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless()}>
      <StaticFilters
        {...args}
      />
    </SearchHeadlessContext.Provider>
  );
};
Primary.args = {
  title: staticFiltersProps.title,
  filterOptions: staticFiltersProps.filterOptions.slice(2),
  fieldId: staticFiltersProps.fieldId
};
Primary.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.click(canvas.getByText('Clifford'));
};

export const Searchable: any = Primary.bind({});
Searchable.args = {
  ...Primary.args,
  searchable: true
};
