import { ComponentMeta, Story } from '@storybook/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';
import { userEvent, within } from '@storybook/testing-library';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { staticFiltersProps } from '../__fixtures__/data/filters';
import { StaticFilters, StaticFiltersProps } from '../../src';

const meta: ComponentMeta<typeof StaticFilters> = {
  title: 'StaticFilters',
  component: StaticFilters,
  argTypes: {
    fieldId: {
      control: false
    }
  }
};
export default meta;

export const Primary: Story<StaticFiltersProps> = (args) => {
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

export const Searchable = Primary.bind({});
Searchable.args = {
  ...Primary.args,
  searchable: true
};
