import { ComponentMeta, Story } from '@storybook/react';
import { SearchHeadlessContext, State } from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { RecursivePartial } from '../__utils__/mocks';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { Facets, FacetsProps } from '../../src';
import { createHierarchicalFacet } from '../__utils__/hierarchicalfacets';
import React from 'react';

const meta: ComponentMeta<typeof Facets> = {
  title: 'Facets',
  component: Facets
};
export default meta;

const mockedHeadlessState: RecursivePartial<State> = {
  filters: {
    facets: [
      ...DisplayableFacets,
      createHierarchicalFacet([
        'food',
        'food > fruit',
        { value: 'food > fruit > banana', selected: true },
        'food > fruit > apple',
      ])
    ]
  }
};

export const Primary: Story<FacetsProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <Facets {...args} />
    </SearchHeadlessContext.Provider>
  );
};