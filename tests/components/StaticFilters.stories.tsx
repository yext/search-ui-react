import { ComponentMeta } from '@storybook/react';
import { SearchHeadlessContext } from '@yext/search-headless-react';
import { userEvent, within } from '@storybook/testing-library';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { staticFilters } from '../__fixtures__/data/filters';
import { StaticFilters, StaticFiltersProps } from '../../src';
import { getSelectableFieldValueFilters } from '../../src/utils/filterutils';

const meta: ComponentMeta<typeof StaticFilters> = {
  title: 'StaticFilters',
  component: StaticFilters
};
export default meta;

export const Primary = (args: StaticFiltersProps) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless()}>
      <StaticFilters
        fieldId={staticFilters[0].filter.fieldId}
        title='Puppy Preference'
        filterOptions={getSelectableFieldValueFilters(staticFilters)}
        {...args}
      />
    </SearchHeadlessContext.Provider>
  );
};

Primary.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.click(canvas.getByText('Clifford'));
};

export const Searchable = (args: StaticFiltersProps) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless()}>
      <StaticFilters
        fieldId={staticFilters[0].filter.fieldId}
        title='Puppy Preference'
        filterOptions={getSelectableFieldValueFilters(staticFilters)}
        searchable={true}
        {...args}
      />
    </SearchHeadlessContext.Provider>
  );
};
