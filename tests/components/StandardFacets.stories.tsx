import { ComponentMeta, Story } from '@storybook/react';
import { SearchHeadlessContext, State } from '@yext/search-headless-react';
import { userEvent, within } from '@storybook/testing-library';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { RecursivePartial } from '../__utils__/mocks';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { StandardFacets, StandardFacetsProps } from '../../src';
import React from 'react';

const meta: ComponentMeta<typeof StandardFacets> = {
  title: 'StandardFacets',
  component: StandardFacets
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: DisplayableFacets
  }
};

export const Primary: Story<StandardFacetsProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <StandardFacets {...args} />
    </SearchHeadlessContext.Provider>
  );
};

export const NoOptionCounts: any = Primary.bind({});
NoOptionCounts.args = {
  showOptionCounts: false
};

export const ShowMoreLimit: any = Primary.bind({});
ShowMoreLimit.args = {
  showMoreLimit: 1
};

export const ShowMoreLimitClicked: any = Primary.bind({});
ShowMoreLimitClicked.args = {
  ...ShowMoreLimit.args
};
ShowMoreLimitClicked.play = ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.click(canvas.queryAllByText('Show More')[0]);
};
