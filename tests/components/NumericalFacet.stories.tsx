import { Meta, StoryFn } from '@storybook/react';
import { Facets, NumericalFacetProps, NumericalFacet } from '../../src';
import { SearchHeadlessContext, State } from '@yext/search-headless-react';
import { generateMockedHeadless } from '../__fixtures__/search-headless';
import { RecursivePartial } from '../__utils__/mocks';
import { DisplayableFacets } from '../__fixtures__/data/filters';
import { createHierarchicalFacet } from '../__utils__/hierarchicalfacets';
import React from 'react';

const meta: Meta<typeof Facets> = {
  title: 'Filters/Facets/Numerical',
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

export const Primary: StoryFn<NumericalFacetProps> = (args) => {
  return (
    <SearchHeadlessContext.Provider value={generateMockedHeadless(mockedHeadlessState)}>
      <Facets>
        <NumericalFacet {...args} />
      </Facets>
    </SearchHeadlessContext.Provider>
  );
};
