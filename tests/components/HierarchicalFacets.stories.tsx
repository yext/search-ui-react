import { Meta, StoryFn } from '@storybook/react';
import { SearchHeadlessContext, State } from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { createHierarchicalFacet } from '../__utils__/hierarchicalfacets';
import { RecursivePartial } from '../__utils__/mocks';
import { HierarchicalFacets, HierarchicalFacetsProps } from '../../src';
import React from 'react';

const meta: Meta<typeof HierarchicalFacets> = {
  title: 'HierarchicalFacets',
  component: HierarchicalFacets
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: [
      createHierarchicalFacet([
        'food',
        'food > fruit',
        { value: 'food > fruit > banana', selected: true },
        'food > fruit > apple',
      ])
    ]
  }
};

export const Primary: StoryFn<HierarchicalFacetsProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <HierarchicalFacets {...args} />
    </SearchHeadlessContext.Provider>
  );
};
Primary.args = {
  includedFieldIds: ['hier']
};
